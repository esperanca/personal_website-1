---
title: "When Data Is Clean: Semantic Failures and Grice's Maxims in Agent Evaluation"
description: "How to evaluate agent responses after your tool layer guarantees data integrity. A framework for catching semantic failures through Grice's conversational maxims, deterministic checks, and calibrated human judgment."
date: 2026-09-21
tags: ["evaluation", "agents", "ai-quality", "grice", "design"]
status: "[awaiting human review]"
lang: "en"
pt_url: "/posts/falhas-semanticas-grice-avaliacao-agentes/"
---

# When Data Is Clean: Semantic Failures and Grice's Maxims in Agent Evaluation

> [awaiting human review]
>
> Portuguese version: [Falhas Semânticas e as Máximas de Grice em Avaliação de Agentes](/posts/falhas-semanticas-grice-avaliacao-agentes/)

## Introduction: Grice and the Invisible Violation

In 1975, Paul Grice described how humans cooperate through language (Grice, 1975). Speakers follow four unspoken rules—the maxims of Conversation—and listeners infer meaning based on the assumption that those rules are being followed. When someone breaks a rule without marking it, the listener experiences the response as deceptive, even if the words are literally true.

An agent that returns data matching a tool's result, but structures that data in a way that answers the wrong question, violates Grice's maxim of Relation. It looks cooperative. The data is correct. The sentence is clear. Yet it misleads.

Sekuj's September 2026 analysis of evaluation failure modes at Monte Carlo identified five cases where standard evals—tests run against transcripts alone—catch nothing. The common thread across all five: each violation is a maxim breach disguised as fluent output. The response reads as cooperative when it should not.

But here is the critical distinction: three of those five failures belong upstream, in your tool execution layer. This article addresses the two that remain.

## Why Grice for Agent Evals: The Pragmatics Problem

Grice's maxims have been applied to agent evaluation in recent years—Krause & Vossen (2024) survey their widespread use in NLP, and frameworks like GriceBench (2026) and Lamoids (AAMAS 2025, Zhi-Xuan et al.) show measurable improvements (27–95% better detection of semantic failures) when agents explicitly adhere to the maxims. Miehling et al. (2024) documented that LLMs frequently violate the Relation and Quality maxims in human-AI conversations.

However, earlier eval attempts conflated two distinct problems:

1. **Maxim violations as structural failures** (detectable, deterministic)
2. **Pragmatic interpretation** (inferring user intent from context, requires ground truth)

Pragmatics—the discipline of understanding how context shapes meaning—is where these frameworks have stumbled. A user writes "Show me revenue." Pragmatically, you infer they mean *their* current context's revenue, not a generic aggregate. But your eval layer cannot infer this without trusting your identity system and tool layer. If either is noisy, you will mislabel the agent's response.

This framework **brackets pragmatics entirely**. It assumes your tool layer is the oracle: data is clean, identity is resolved, parameters are logged. With these guarantees, Grice's maxims become purely *structural* checks—consistency, deictic resolution, provenance tracking—not intent inference.

Pragmatic interpretation of user goals remains an open research area, especially in Portuguese-language contexts with conversational agents. This framework does not attempt to solve it. Instead, it creates the foundation—a clean semantic eval layer—on which pragmatic reasoning can later be built.

## Verified Premises: Before You Evaluate Semantics

This framework assumes your tool layer guarantees data integrity. Any eval framework built on top of corrupted data will misattribute failures. Before proceeding, verify you have:

**On tool execution:**
- [ ] Every tool call is logged with: name, arguments (exact values passed), return status (success/error/timeout), and result payload
- [ ] Tool schema validation happens at execution time—numeric ranges, date formats, required fields are checked *before* the result leaves the tool
- [ ] Errors are surfaced, not silenced. A failed call returns `{status: "error", message: "..."}`, not an empty or partial result
- [ ] Tool results are stored per turn, not cached across turns without a timestamp or parameter change flag

**On the trace structure:**
- [ ] Each turn is a self-contained record: user input, parameters passed to tools, tool calls with their status and results, agent response
- [ ] Sessions group turns in order with timestamps in a shared timezone (América/São_Paulo for Brazilian deployments)
- [ ] User identity is resolved once per session and stated in the trace, not inferred from context

**On the tool layer's output contract:**
- [ ] Numeric data in results is already validated (sums match, percentages are 0–100, dates parse)
- [ ] If a tool returns a number, that number is ground truth for that tool's domain. Downstream evaluation cannot second-guess it
- [ ] If a tool returns `null` or empty, it is marked as such in the result, not treated as a missing call

If you cannot answer yes to all of these, stop here. Your tool layer is the source of truth. Build the logging and validation layer first. Everything below assumes these are true.

## What Remains: Three Semantic Failures

With data guaranteed clean, three failure modes persist. All are maxim violations invisible to transcript-only evaluation.

### Failure 1: Context Rot (Relation)

The agent cites data from the wrong context. A user asks "Show me Q3 revenue" while logged in to the São Paulo office. The agent returns national Q3 data instead. The tool call was correct—the *arguments* matched the user's words. But the user's session context changed three turns ago, and the agent did not re-apply it.

**Maxim violated:** Relation (maxim of relevance). The response is accurate but answers yesterday's question with today's parameters.

**Example:**
- Turn 1: "Show revenue for São Paulo office." → Agent calls revenue_by_region(region="SP", period="Q3") → returns R$ 10M
- Turn 2: "Switch to Rio." → User changes context
- Turn 3: "What about Q3?" → Agent calls revenue_by_region(period="Q3") without region, or uses cached SP result

The transcript reads naturally. The data is correct. The violation is Relation.

### Failure 2: Parameter Misalignment (Relation)

The agent's tool arguments do not match the user's current parameters. A user asks for data "in USD" but the tool is called with currency="BRL". The tool returns correct data—in the wrong currency. The response cites the number without marking the currency mismatch.

**Maxim violated:** Relation. The agent answered a different question than what was asked.

**Example:**
- User: "Show me that in USD." (current parameter: currency="USD")
- Agent calls: revenue(currency="BRL") [using prior turn's setting or default]
- Agent response: "Q3 revenue was R$ 10M" [correct number, wrong currency; no note about the discrepancy]

### Failure 3: Inappropriate Clarification (Quantity)

The agent asks for clarification when the input was unambiguous. Grice's maxim of Quantity says be as informative as necessary, no more, no less. A clarification is cooperative *only* if the input is genuinely ambiguous. If the user specified a parameter clearly, asking "which region did you mean?" violates Quantity—it undermines rather than supports the conversation.

**Maxim violated:** Quantity. The agent provides less information than it could without good reason, and forces the user to repeat themselves.

**Example:**
- User: "Show me revenue for São Paulo, Q3, in USD."
- Agent: "Which region would you like to see?" [inputs are fully specified; asking wastes a turn]

Conversely, if a user says "revenue data" without specifying a region or period, asking for clarification is *not* a violation—it is cooperative and necessary.

## Remapping the Failures

The original Five Failures now map as follows:

| Original | Now caught where | Eval's role |
|---|---|---|
| Ghost answer (no tool call) | Tool layer (logs missing calls) | — |
| Self-contradiction (data → two formats) | Tool layer (schema validation) + Response assembly (Manner) | Manner-02 (consistency in response) |
| Context-dependent (wrong profile) | Relation-05 (identity binding) | Track A + Track B |
| Multi-turn decay (stale data) | Relation-02 (provenance check) | Track A + Track B |
| False-positive eval (clarification judged wrong) | Quantity-01 (clarification legitimacy) | Track A + Track B |

Three failures belong upstream (in your tool layer, which is the source of truth). Two remain for the eval layer, plus one new predicate (Manner consistency). With this distinction clear, your eval layer becomes focused and testable.

## Track A: Deterministic Semantic Checks

With tool data guaranteed clean, deterministic checks become purely semantic. They verify that the response *structure* is consistent and that parameters are *resolved* and *stated*.

### Quality Predicates (Simplified)

These check the response against its own internal logic and against the tool results it cites.

**QLT-05 [D]:** Internal consistency. If a number appears twice in the response, it appears with the same value both times. A region mentioned twice is the same region. A date stated in two formats (12/09/2026 and setembro 12, 2026) is the same date.
- Gate: Fail if inconsistent (rule R11 applies; turn fails).
- Test: Parse all numbers, dates, and proper nouns. Check for duplicates with different values.

**QLT-06 [D]:** Deictic resolution. Temporal expressions ("today", "last month", "Q3") are resolved to a specific date or range *once* in the response and stated explicitly.
- Gate: Fail if resolved to different dates in different sentences, or if not stated explicitly at least once.
- Test: Extract temporal expressions. Use turn timestamp and session timezone. Verify all cite the same range.

**QLT-07 [J]:** Wording fidelity. When citing a specific number from a tool result, the response states that number accurately. "R$ 1.234,56" is not paraphrased as "roughly R$ 1.2k" without a marker ("approximately").
- Gate: Jev question (binary): Does the response cite the tool's number without material distortion?
- Test: Extract numbers from tool results. Find citations in response. Check for "about", "roughly", "approximately", etc.

**QLT-08 [J]:** Estimates marked. Claims not derived from a tool call in the current turn are marked as estimates, forecasts, or based on historical data.
- Gate: Fail if an unverified claim is stated as fact. Mark for human review if borderline.
- Test: Jev question: Is every claim in the response either (a) from a tool result this turn, (b) from prior session data with a source stated, or (c) marked as an estimate?

### Relation Predicates (Core)

These verify that the response answers the current question with current parameters.

**REL-02 [D]:** Data provenance. If a number appears in the response, it comes from a tool call *this turn* with the current parameters. If it comes from an earlier turn or a cached result, the response states the date it was retrieved or notes that it is historical.
- Gate: Fail if a number is cited without a turn reference and the parameters have changed.
- Test: Extract each number from the response. Trace it back to a tool call. Check: (1) is the call in the current turn? (2) do the call's arguments match current parameters? (3) if not, is the staleness noted?

**REL-03 [J]:** Current question answered. Does this response answer the question the user *just asked*, or does it address a prior turn's question?
- Gate: Jev question: Does the response directly address the current user message, or does it answer a prior question?
- Test: Jev receives current message, prior two messages, and response. Returns yes/no with confidence.

**REL-04 [D/J]:** Parameter tracking. The user's current parameters (region, currency, period, etc.) are explicitly stated in the response at least once in the first two sentences.
- Gate: Fail if parameters are left implicit or if the response does not confirm what was asked.
- Test: Extract parameters from tool arguments. Check if they appear in the response. Jev confirms they're stated upfront.

**REL-05 [D]:** Identity binding. First-person references in the response ("I", "we", "your") resolve to the correct user or entity. A statement like "Your Q3 revenue was R$ 10M" must be accurate for the logged user, not for a different entity or profile.
- Gate: Fail if identity is wrong.
- Test: Trace the user ID from the turn. Verify it matches the entity to which data is attributed.

### Quantity and Manner Predicates (Sparse)

**QTY-01 [J]:** Clarification legitimacy. If the response asks for clarification, was the user's input genuinely ambiguous or underspecified?
- Gate: Fail if the user gave full parameters and the agent asks "which region?" anyway.
- Test: Jev question: Given the user message, are the necessary parameters present (region, period, currency, etc.) or absent? Is the agent's request for clarification warranted?

**MNR-01 [D]:** Implicit confirmation. The response opens with a statement of what is being answered, using the user's language.
- Not a gate (fail without it), but flagged for human review.
- Test: Jev: Does the first sentence confirm the request? "You asked for Q3 revenue in São Paulo..." or "Here is São Paulo's Q3 revenue..." vs. opening with data directly.

**MNR-02 [D]:** Action receipt. If the response confirms an action (e.g., "I've updated your settings"), it includes an identifier or timestamp.
- Not a gate, but flagged.
- Test: Simple regex: if verb is "saved", "updated", "changed", does the response include an ID or timestamp?

### The Tier's Gate Rules (Updated)

**R10 (Relation/Quality gate):** Without a clean trace, the turn gets `insumo_insuficiente`. Eval stops.

**R11 (Quality failure is turn failure):** A fail on QLT-05, QLT-06, or REL-02 fails the entire turn. Internal inconsistency means the response cannot be trusted.

**R12 ("Not found" as Quality 4):** If a tool returns an empty result (status: "not_found"), Quality is capped at 4 (satisfactory but limited). If the tool errors or times out, Quality is 2 or below.

**R13 (Clarification turns):** If the response is a clarification question, evaluate it only by QTY-01. Do not apply Relation predicates (there is no data to check, no parameters to verify).

**R14 (Test isolation per profile):** One golden answer is insufficient. A question must be tested against at least three distinct profiles (different regions, roles, data access levels) to catch REL-05 and context rot failures.

## Track B: Human Calibration Without Data Noise

Since your tool layer validates data, human raters can focus on what they do best: judging whether the response *fits* the question and whether the structure supports clarity.

### Lay Rater Protocol

Restrict lay raters to these questions:

1. **Does this response answer the question the user just asked?** (REL-03)
   - Provide the user's message and the prior two messages for context.
   - Do not provide tool results or trace details.
   - Do not ask them to verify numbers.

2. **Should the agent have asked for clarification instead?** (QTY-01)
   - Show the user's message.
   - Ask: "Is everything the user asked for clear, or are there missing details (which region, what date, what currency)?"
   - If clear: clarification is a violation. If unclear: clarification is cooperative.

3. **Does the response state the region, date, and currency at the start?** (REL-04)
   - Show just the response (not the question).
   - Do not ask them to verify accuracy; assume numbers are correct.
   - Ask: "Can you tell what region, period, and currency this is about in the first two sentences?"

### Expert Rater Protocol

Experts with access to traces evaluate:

- QLT-05 (internal consistency)
- QLT-06 (deictic resolution)
- REL-02 (data provenance)
- REL-05 (identity binding)

This is a smaller set than before. No arithmetic, no date parsing—just structural logic.

### Two-Tier Labeling Workflow

1. **Build a seeded set** of 100–150 turns with known faults injected:
   - Inject context rot (use prior region in current turn).
   - Inject parameter drift (change currency mid-session, cite old currency).
   - Inject inappropriate clarifications (ask for data that was provided).
   - Inject identity mismatches (cite data for user A when logged in as user B).
   - Add hard negatives (correct responses, edge cases, ambiguous input).

2. **Expert label first.** Label the entire seeded set for Relation, Quality, and Quantity predicates. This is your ground truth.

3. **Lay raters label blind.** Show lay raters the same turns without tool traces. Ask only about Relation (REL-03, REL-04) and Quantity (QTY-01). Measure agreement with expert labels.

4. **Measure per-predicate recall and false-alert rate.**
   - How many of the injected faults did lay raters catch?
   - How many correct responses did lay raters wrongly flag?
   - Shankar et al. (UIST 2024) show this matters; raters drift over time. Measure and correct.

5. **Expand to production.** Once calibrated, run lay raters on a random sample (~50 turns per week) and experts on flagged cases. Budget allocation (lay vs. expert) is an open decision.

### Bias Correction

Lee et al. (arXiv:2511.21140, 2026) show that LLM-as-judge and human judge both have biases. Correct for these using sensitivity and specificity:

- **Sensitivity:** Of the truly bad turns, how many did the judge catch?
- **Specificity:** Of the truly good turns, how many did the judge accept?

A judge that catches 100% of bad turns but flags 50% of good ones as bad (high sensitivity, low specificity) is not useful. Measure both. If a rater is biased toward flagging, reweight their later labels or re-brief them.

## Jev's Role: Pure Semantic Judgment

With data guaranteed clean and deterministic checks removed, Jev becomes a classifier for three questions that require judgment but not reasoning:

1. **REL-03 (binary, Noul):** "Does this response answer the user's current question, or does it address a prior turn?"
   - Input: current user message, prior two messages, response
   - Output: probability the response is on-topic for the current turn
   - Confidence threshold: 0.75 (above threshold = act; 0.5–0.75 = human review; below = flag as off-topic)

2. **QTY-01 (binary, Noul):** "Is the user's input specific enough that asking for clarification is a violation?"
   - Input: user message alone
   - Output: probability the input specifies region, period, and currency
   - Confidence threshold: 0.80 (high specificity required; ambiguity should trigger the agent's question)

3. **QLT-07 (binary, Noul):** "Does the response cite the tool's number without material distortion?"
   - Input: tool result excerpt, response excerpt
   - Output: probability the number is cited accurately
   - Confidence threshold: 0.85 (numbers are objective; "roughly" or "about" changes the semantic)

**Why not use Jev for QLT-05, QLT-06, REL-02?** Those are code-over-trace questions. Regex or simple parsing gives you certainty. A model gives you a probability. For a gate that fails the turn, certainty wins.

**Why not use Jev for REL-04, REL-05?** REL-04 is a deterministic parse (do the parameters appear in the response?). REL-05 requires an identity oracle (is this data for this user?). Code is faster and more defensible.

**Jev's constraints:**
- One question per call. Evaluating several at once causes the model to conflate them (Miehling et al., EMNLP Findings 2024).
- No free-text rationale. When a turn scores badly, read your own criteria to debug. Anything customer-facing still needs a generative model on top.
- Context rot. Accuracy drops as the input state fills with irrelevant material. Pare the input to the specific claim being checked.
- Cannot abstain. Jev defaults to the least wrong answer if forced into a binary. Provide a "cannot tell" option if your domain has genuinely ambiguous cases, and send that band to humans.

## Implementation: A Phased Approach

### Phase 1: Build the Deterministic Tier (Week 1–2)

1. Instrument your Golang engine to log tool calls with arguments, status, and results.
2. Implement schema validation at tool execution time (numeric ranges, date formats).
3. Build a trace extractor that creates structured turn records: user input, parameters, tool calls, response.
4. Code up the deterministic predicates: QLT-05, QLT-06, REL-02, REL-04.
5. Test against 50 hand-labeled turns from production. Aim for 95%+ agreement (these are logic, not judgment).

### Phase 2: Calibrate Human Raters (Week 3–4)

1. Inject 100–150 faults into a seeded set.
2. Have experts label the full set (ground truth).
3. Have lay raters label Relation and Quantity questions only.
4. Measure recall and specificity per rater. Re-brief if biased.
5. Deploy to production with weekly samples.

### Phase 3: Add Jev Decisions (Week 5)

1. Set up Jev access (waitlist, OpenRouter, or Vercel AI Gateway).
2. Call Jev for REL-03, QTY-01, QLT-07 with the three thresholds (0.75, 0.80, 0.85).
3. Log Jev's confidence. Send middle-band turns (0.5–threshold) to human review.
4. Measure Jev's recall and false-alert rate against expert labels.
5. Adjust thresholds based on production feedback.

### Phase 4: Iterate and Calibrate (Ongoing)

- Run weekly samples of 50 turns: deterministic tier (code), human raters (lay + expert), Jev (automated).
- Measure correlation between the three. Identify systematic misalignment (e.g., "Jev flags 20% of turns Jev; humans accept 95%").
- Re-calibrate rater instructions or Jev thresholds monthly.

## Limits and Open Decisions

**Not solved here:**

- **QLT-09 (truth per profile).** Whether the response is true for a specific user requires ground truth you may not have. If user A and user B have different access levels and see different data, is the response "true"? This requires an oracle per profile (Phase 2).
- **REL-05 (identity binding).** Requires your identity system to map users to data domains reliably. If your system conflates roles or access levels, this predicate will fail even if your eval is sound. Audit your identity layer first.
- **Lay rater variability.** Shankar et al. show that raters drift. Monthly calibration checks are a floor, not a ceiling. Budget for re-briefing or replacement.
- **Jev's context rot.** Accuracy drops if the input state is long. Trimming the input to the specific claim helps, but you may hit a wall on very long traces. Test before deploying at scale.

**Open parameters:**

- **ε (tolerance for number matching).** If the tool returns R$ 1.234,56 and the response says "R$ 1.235", is that a violation? Define your tolerance upfront (0%, 1%, 5%).
- **θ1 (reformulation similarity).** If a user reformulates their question ("Show me Q3 revenue" → "What was Q3?"), is that a new context or the same question? This affects REL-03 and REL-04 scoring. Use semantic similarity (cosine on embeddings) with a threshold; test against your domain first.
- **Budget split (lay vs. expert).** If you have 1000 turns to label per month, split 800 lay + 200 expert, or 500/500? Depends on your fault injection rate and rater fatigue. Start 80/20; adjust monthly.
- **Sample strategy.** Every turn, or random weekly sample? Continuous evals cost more but catch drift faster. Sampling is cheaper but risks missing systematic failures. Hybrid: daily deterministic tier (code, no cost), weekly sampling for humans.

**When to declare success:**

You have a working semantic eval layer when:
1. Your deterministic predicates (code) achieve >95% recall on injected faults.
2. Your lay raters (humans) agree with experts on Relation at >80% (Cohen's kappa ≥ 0.70).
3. Your Jev classifier agrees with experts on REL-03 at >75%.
4. A turn flagged by any of the three correlates with actual production complaints (tracked via user feedback).

## References

**Grice and conversational maxims:**
- Grice, H. P. (1975). "Logic and Conversation." *Syntax and Semantics*, Vol. 3, pp. 41–58.
- Krause, S., & Vossen, G. (2024). "Grice in the time of LLMs: A survey of conversational maxims in natural language processing." *Proceedings of INLG*, 2024.
- Khayrallah, H., & Sedoc, J. (2021). "The power and limitations of unsupervised neural abstractive summarization." *Proceedings of NAACL*.
- Setlur, V., & Tory, M. (2022). "Towards design patterns for ambiguity resolution in analytical chatbots." *Proceedings of CHI*.

**LLM-as-judge and Gricean frameworks:**
- Miehling, D., Shao, R., Zhao, Y., et al. (2024). "How LLMs conflate sub-maxims: The cost of principle aggregation in multi-criteria judgment." *EMNLP Findings*.
- Zhou, Y., Frank, M., & Sap, M. (2025). "Graders should cheat: Using privileged information in LLM evaluation." *Proceedings of EMNLP*.
- Zhi-Xuan, T., et al. (2025). "Gricean Norms as a Basis for Effective Collaboration." *Proceedings of AAMAS 2025*.

**Human calibration:**
- Shankar, S., Halpern, Y., Breck, E., et al. (2024). "EvalGen: Towards human-aligned automatic rubric generation." *Proceedings of UIST*.
- Lee, M., Tao, Y., & Dreyer, M. (2026). "Bias correction in LLM-as-a-judge via sensitivity and specificity." *arXiv:2511.21140*.

**Practical evals at scale:**
- Langfuse. (2026). "Using TypeSafe's Jev for evals." Blog post. https://langfuse.com/blog/2026-09-18-using-typesafes-jev-for-evals.md
- Arize AI. (2026). "Can decision models replace LLM judges?" Blog post. https://arize.com/blog/typesafe-jev-llm-judge/

**Data quality and tool logging:**
- Goodstart Labs. (2026). "Verification is the bottleneck." Research report. https://goodstartlabs.com/research/verification-is-the-bottleneck

---

**Next steps:**

This framework is designed for teams with a clean tool layer and a clear semantic surface to evaluate. If you are building that layer now, the Verified Premises section is your checklist. If you already have one, start with Phase 1 (deterministic tier) and measure from there.

Questions about this approach? Reach out. The eval layer is where design meets data; it should be as intentional as the interface itself.
