---
title: "Detecting Comprehension Failures Beyond LLM Judges: An Experimental Three-Track Evaluation Framework for Agent Responses"
date: 2026-09-22
timestamp: "12:00 UTC"
wordcount: "~12,000"
status: "experimental proposal draft"
draft: true
---

**Daniel Vieira Souza**

## Abstract {#abstract}

LLM-based judges are increasingly used to evaluate agent responses, but they are not sufficient for detecting all comprehension failures. A response can be technically correct, traceable to valid data, and fluent, while still failing pragmatically: the user may not understand which metric was used, which context applies, whether an action actually executed, or how to use the answer in a decision. This article reframes the problem as an experimental evaluation question: can disagreement among stratified human raters—especially target users with lower functional-literacy profiles and limited financial-domain familiarity—reveal comprehension failures that deterministic telemetry and generic LLM-as-a-judge evaluation miss? The proposed study tests a three-track evaluation framework: deterministic telemetry checks, stratified human judgment, and a comprehension-focused judge trained or calibrated on human disagreement patterns. The framework treats target-user disagreement not as annotation noise, but as a candidate signal of comprehension risk. It is designed for domains in which factual correctness, execution correctness, and user understanding must be evaluated separately, with particular attention to financial-service contexts and Brazilian users with varied functional-literacy profiles.

## Table of Contents {#table-of-contents}

1. [Introduction: Comprehension Failure as an Evaluation Problem](#introduction)
2. [Related Work and Evidence Base](#related-work)
3. [Failure Taxonomy](#failure-taxonomy)
4. [Three-Track Evaluation Framework](#three-track-framework)
5. [Experimental Design: Annotation and Disagreement Methodology](#annotation-methodology)
6. [Implementation Considerations](#implementation-considerations)
7. [Limitations](#limitations)
8. [Future Work](#future-work)
9. [References](#references)

---

## 1. Introduction: Comprehension Failure as an Evaluation Problem {#introduction}

Organizations building agentic AI systems increasingly invest in robust validation layers. Agents can fetch correct data, transform it accurately, and return numbers that are mathematically sound. Yet users may still report confusion. They ask the same question twice. They misunderstand which parameters apply to which result. They feel misled by accurate data presented in the wrong context.

This is not only a data-truth problem. It is a pragmatic failure: a gap between what the agent *says* and what users *understand*.

Modern LLM-based judges can detect many semantic issues, but they have an important limitation: pragmatic competence in language models appears **evaluation-design-dependent**, not stable across task formats [1]. Results can vary depending on whether models are tested through direct probability measurement, explicit metalinguistic prompts, or task-specific pragmatic judgments. The same model can appear competent under one evaluation design and fragile under another, which makes "pragmatic competence" a construct that must be measured carefully rather than assumed [1].

This article proposes an experimental three-track evaluation framework for detecting comprehension failures in agent responses. The framework combines deterministic telemetry, stratified human judgment, and a comprehension-focused judge trained or calibrated against human disagreement patterns. Its central claim is simple: technical correctness, factual accuracy, and user comprehension are related but distinct constructs. A reliable evaluation system must measure them separately, and the proposed experiment is designed to test whether these constructs diverge in practice.

### 1.1 Contribution

The contribution is methodological and experimental. The article does not claim that telemetry, human annotation, or LLM judges are sufficient in isolation. Instead, it proposes a testable evaluation architecture in which each layer addresses a different class of failure:

- deterministic telemetry checks whether the system did what the response claims it did;
- stratified human judgment identifies where factual correctness, language clarity, and target-user comprehension diverge;
- a calibrated comprehension judge scales part of the human signal while preserving human grounding.

### 1.2 Research questions, evidence base, and design choices

The proposed study is organized around three research questions:

- **RQ1:** Do target users with lower functional-literacy profiles and limited financial-domain familiarity identify comprehension failures that are missed by domain experts, language experts, and generic LLM-based judges?
- **RQ2:** Which response features—jargon density, missing metric definitions, ambiguous temporal scope, response length, unexplained assumptions, or unclear action status—are most associated with target-user comprehension failures?
- **RQ3:** Can disagreement patterns from stratified human raters be used to train or calibrate an automated comprehension-risk scorer?

The framework separates three layers of argument. First, it uses prior research as **empirical grounding**: work on pragmatic evaluation, conversational maxims, functional literacy, cognitive load, annotator disagreement, self-contradiction, tool hallucination, long-context use, temporal consistency, and LLM-as-a-judge limitations.

Second, it proposes a **framework contribution**: a three-track evaluation architecture that combines deterministic telemetry, stratified human judgment, and a comprehension-focused judge trained or calibrated against human disagreement patterns.

Third, it includes **operational design choices**: rater tiers, pilot sample sizes, cost-sensitive weighting, thresholds, telemetry gates, and rollout phases. These choices are not presented as universal empirical findings. They are starting points to be calibrated in the deployment context through pilot data, inter-rater agreement, validation performance, and production monitoring.

The initial hypotheses are:

- **H1:** Responses rated as correct by domain experts will still produce measurable comprehension failures among target-user raters.
- **H2:** Target-user disagreement will be more strongly associated with jargon density, missing definitions, and ambiguous scope than with factual incorrectness alone.
- **H3:** A judge calibrated on target-user disagreement will identify comprehension-risk cases more effectively than three comparison conditions: deterministic telemetry alone, deterministic telemetry plus a generic text-only LLM judge, and expert consensus without target-user raters.

---

## 2. Related Work and Evidence Base {#related-work}

### 2.1 Pragmatics and conversational maxims {#pragmatics-maxims}

Paul Grice's four conversational maxims—Quantity, Quality, Relation, Manner—have been studied in NLP for decades [3]. Recent work connects them directly to the problems modern AI systems face, including whether a system gives enough information, too much information, or the wrong kind of information for the user's task [3][4]. The Quantity maxim is especially relevant in high-stakes domains such as financial services, where both under-explanation and over-explanation can impair user understanding.

But Grice's maxims alone are abstract. The question is: **How do you operationalize them to catch real comprehension failures in the deployment context?**

---

### 2.2 LLM judges and comprehension failures {#llm-judges}

Empirical work on conversational maxims for human-AI interaction suggests that models internally prioritize some conversational principles over others, including safety-oriented principles such as **Benevolence** [2]. This does not mean that safety is the problem. It means that a judge optimized around some conversational dimensions may be less reliable on others—such as **Relevance** (communicating clearly) or **Relation** (answering the user's actual question)—unless those dimensions are explicitly represented in the evaluation design [2].

The mechanism is not that safety evaluation is wrong; it is that comprehension is a different construct. A response can satisfy safety constraints and still violate the **Relation** maxim (are you answering the right question for this user?) or the **Manner** maxim (can this specific user parse the answer?). If those dimensions are not separately measured, the judge may approve a response that is harmless but still difficult to use [2].

A general-purpose judge may be optimized or evaluated for safety and helpfulness without being explicitly calibrated for comprehension.

Most evidence of this hierarchy comes from English-language model evaluation. Whether Portuguese-language LLMs—particularly those trained on Brazilian corpora or fine-tuned for financial services—exhibit the same maxim prioritization remains an empirical question. This ambiguity motivates context-specific evaluation: testing with Brazilian raters from the intended user population can help determine whether the problem manifests identically, differently, or not at all in this deployment context.

---

### 2.3 Functional literacy, domain jargon, and cognitive load {#literacy-jargon}

The Brazilian deployment context makes the problem concrete. In Brazil, 29% of people aged 15 to 64 are functionally illiterate—unable to reliably extract or synthesize information from written text, even with formal schooling completion [5]. Another large share operates at an elementary literacy level; public reporting of the INAF 2024 results places this group around 36% of the 15–64 population [5]. Formal schooling does not guarantee functional literacy: INAF also reports that a meaningful share of people who reached or completed *Ensino Médio* can still be characterized as functionally illiterate [5].

The target user population is not uniformly high-literacy professionals. It includes micro-entrepreneurs, small business owners, and administrative staff whose formal education does not match their actual reading capacity.

Add financial domain jargon—*conciliação, inadimplência, faturamento, provisão*—to a response directed at this audience, and something worse than difficulty can occur: the same informational structure that helps an expert may hinder a novice. Cognitive load theory and the Expertise Reversal Effect suggest that instructional or explanatory formats interact with the user's prior knowledge [6]. When domain knowledge is absent but domain terminology is dense, the user cannot reliably infer meaning from context. They cannot rely on prior knowledge to fill gaps. They stop reading.

A standard LLM judge does not experience this audience-specific friction. Unless the evaluation task is grounded in judgments from the relevant user population, the judge may fail to recognize comprehension risk in responses that are technically fluent but too domain-heavy for the intended reader.

---

### 2.4 Annotator disagreement as an evaluation signal {#disagreement-signal}

Research on annotation quality and crowdsourced labels has established a key insight: **disagreement among annotators is not noise. It is signal** [7]. When diverse raters disagree on whether a response is clear, their disagreement reflects genuine *semantic ambiguity* in the response itself—or, crucially, legitimate *comprehension gaps* for specific audiences [7].

Building on CrowdTruth, this framework treats disagreement across rater groups as a diagnostic signal [7][8]. Raters with different forms of expertise may disagree for meaningful reasons: a linguist may parse a syntactic construction that a general reader finds opaque; a data scientist may accept financial jargon that a micro-entrepreneur cannot use. Their disagreement helps locate where comprehension breaks for a specific audience.

The framework reframes the traditional evaluation paradigm: instead of seeking only rater agreement as a sign of quality, we measure **disagreement from target-population, non-domain-expert raters as a signal of comprehension risk** [7][8].

This leads to a practical implementation: maintain three rater tiers—data scientists (domain expertise), linguists or language designers (language craft), and target users sampled through the Tier 3A/3B/3C strata. In this framework, target-reader judgments determine the ground truth **for the specific construct of comprehension risk**. Experts remain authoritative for factual accuracy, data correctness, and domain reasoning; target users are authoritative for whether the response is understandable to them.

The proposed next step is to train or calibrate a judge to predict this specific signal: *"Will a target user struggle to understand or use this response?"* as a binary classification task. Annotated disagreement patterns provide the training signal. When the judge learns to predict target-reader comprehension risk rather than expert consensus alone, it becomes better aligned with the comprehension construct this framework cares about [7][8].

Operationally, this becomes a calibration task: collect an initial planning range of 500–1,000 annotated responses with expert and target-reader verdicts, label disagreement patterns, and train either a supervised classifier or an LLM-based judge against that signal. The 500–1,000 range is a practical starting point, not a universal sample-size rule. The judge shifts from "Is this response technically correct?" to "Will the intended user population understand and use this response?"

This calibrated judge can then be integrated into LangFuse evals as a custom scorer that flags comprehension risks before deployment.

---

## 3. Failure Taxonomy {#failure-taxonomy}

The five core problems the team identified can be mapped to Grice's conversational maxims. The mapping distinguishes problems that are **candidates for telemetry-based checks** (operational layer), problems that require **human judgment** (semantic layer), and residual comprehension failures that may persist after both are deployed.

### Problem Mapping Table

| # | Problem | Grice Maxim Violated | Telemetry Coverage | Human Judgment Coverage | Traditional LLM Judge | Solution |
|---|---------|----------------------|-------------------|----------------------|----------------------------------|---------|
| **1** | Self-Contradicting Output [9] | MANNER (clarity), QUALITY (truth) | ✅ YES, when values are traceable — lineage comparison can detect parameter divergence | ✅ YES — user may notice "$10k vs $15k" | ⚠️ PARTIAL — text-only judges may catch surface contradictions but cannot verify source lineage | Deterministic check: validate consistency across payload sources |
| **2** | Ghost Answer / Execution Hallucination [10] | QUALITY (be truthful), RELATION (answer the real question: "did this execute?") | ✅ YES, when tool/action traces are complete — execution lineage requires confirmation | ✅ YES — but only if user can verify externally | ⚠️ LIMITED — text alone cannot distinguish "claimed" from "executed" | Deterministic check: every execution claim must have a correlated trace event |
| **3** | Context-Dependent Failures | RELATION (are you answering *for this user's context*?), QUANTITY (provide info relevant to *this user's role*) | ⚠️ PARTIAL — telemetry can capture context (RBAC, tenant, role), but only if test environments vary those contexts | ✅ YES — different users may catch different failures | ⚠️ PARTIAL — a judge without user-context metadata cannot know whether the answer fits this user's permissions or role | Requires multi-user testing; static golden datasets are insufficient on their own |
| **4** | Multi-Turn Context Decay [11][13] | RELATION (still addressing current question?), MANNER (presenting stale data as current is confusing) | ✅ YES, for system-state errors — session tracking and cache-lineage monitoring can detect stale reuse | ✅ YES — user may recognize repetition or outdated data | ⚠️ PARTIAL — may miss if summaries are subtly reworded or if temporal scope is implicit | Deterministic check: validate cache invalidation and temporal scope across turn boundaries |
| **5** | False Positive Eval Alert [12][14] | QUALITY (the judge's claim of error is false), RELATION (judge evaluating the right thing?) | ❌ NO — telemetry validates execution, not semantic correctness of eval logic | ✅ YES — expert + target-reader disagreement can reveal when the judge is wrong | ⚠️ PARTIAL — LLM judges can be useful, but need human grounding for this construct | Requires recalibration: train or calibrate the judge to predict target-reader disagreement, not expert consensus alone |

### Residual Comprehension Failures

After telemetry addresses operational failures and human judgment exposes comprehension gaps, **a residual class of failures persists**:

| Failure Type | Example | Why Telemetry Fails | Why Traditional Eval Fails | Why Human Expert Fails |
|---|---|---|---|---|
| **Intent Misalignment** | User: "Top clients this year" → Agent ranks by revenue, while the business decision requires profit margin | Execution is valid (SQL runs, API returns 200) | Text appears coherent and data-backed | Expert may approve the metric unless the business definition of "top" was specified |
| **Semantic Grounding** | Agent retrieves the correct document passage but applies it incorrectly | Trace proves retrieval, not interpretation | Text is fluent and grammatical | Expert review may miss the specific interpretation unless that clause was annotated |
| **Pragmatic Ambiguity** [1] | Agent takes literal interpretation, user meant figurative/contextual | Response is technically accurate | Reads fluently | No financial background to catch nuance |
| **Domain Reasoning Error** | Agent uses correct source data but applies the wrong business rule or formula | Telemetry validates the data path, not the reasoning rule | Number looks reasonable | Requires domain-rule validation, not just data validation |

---

## 4. Three-Track Evaluation Framework {#three-track-framework}

### Track 1: Deterministic Telemetry Checks
**Addresses:** Problems 1, 2, 4  
**Mechanism:** Automated validation at execution time
- Payload consistency checks (multi-source reconciliation)
- Execution lineage validation (every claim has trace confirmation)
- Cache invalidation tracking (cross-turn state integrity)
- RBAC context capture (but only detects *that* permission failed, not semantic appropriateness)

**Gap:** Cannot evaluate if the retrieved information *means* what the user thinks it means.

### Track 2: Human Judgment (Multi-Tier Raters)
**Addresses:** Problems 3, 5, and residual comprehension failures  
**Mechanism:** Disagreement-as-signal with rater diversity [7][8]
- **Tier 1 (Data Scientists):** Domain expertise, identifies domain reasoning errors
- **Tier 2 (Language Designers/Linguists):** Pragmatic clarity, identifies Manner/Relation violations
- **Tier 3 (General Users, Elementary Literacy):** Actual comprehension, identifies what breaks for the target audience

**Ground truth for comprehension risk:** Target-reader judgments determine the ground truth for target-user understandability.
- If Tier 3 participants cannot understand or use the response, the response should fail the comprehension-risk criterion, regardless of Tier 1's factual validation
- Tier disagreement patterns reveal *which aspects* fail *for which audiences*
- Experts remain authoritative for data correctness and domain-rule validity

**Gap:** Requires an initial annotated dataset. A 500–1,000-response corpus is a practical planning range, but the final size should depend on pilot variance, inter-rater agreement, class balance, and validation performance.

### Track 3: Comprehension-Focused Judge
**Addresses:** Enables partial automation of comprehension-risk detection; reduces dependence on continuous manual review  
**Mechanism:** Train a supervised classifier or calibrate an LLM judge on disagreement patterns, not expert consensus alone
- **Binary task:** "Will a general reader (elementary literacy, no domain expertise) struggle with or disagree about this response?"
- **Training data:** Annotated disagreement patterns from multi-tier raters
- **Cost-sensitive tuning:** Weight the positive class more heavily if missed comprehension failures are more costly than unnecessary review
- **Output:** Comprehension risk score (0–1) before deployment

**Why this works:**
- Text-only judges are not enough to verify execution or audience-specific comprehension
- A calibrated judge predicts "did this reach the user's understanding?" rather than only "does this look technically correct?"
- Disagreement patterns from target-population raters teach the judge what confuses the intended user population

**Remaining Gap:** Doesn't solve intent misalignment (user meant profit margin, but agent correctly retrieved revenue—semantically grounded, but pragmatically wrong).

### Baselines and Comparison Conditions {#baselines-comparison}

Phase 3 requires explicit baselines. The proposed experiment should not evaluate the comprehension-focused judge only against held-out Tier 3 labels in isolation. It should compare the calibrated judge against the evaluation approaches that a team would plausibly use without this framework.

The primary comparison target is **Tier 3 comprehension failure on a held-out test set**. A response is labeled as a comprehension-risk case when target-user raters struggle to understand, explain, or use the answer, according to the Tier 3 annotation schema. Against that target, the study compares four conditions:

| Condition | Description | What it tests | Expected limitation |
|---|---|---|---|
| **B0: Track 1 only** | Deterministic telemetry checks without semantic or human judgment | Whether execution traces alone detect comprehension-risk cases | Should catch operational failures, but miss responses that are technically valid and still confusing |
| **B1: Track 1 + generic LLM judge** | Telemetry plus a standard text-only LLM judge using a general clarity/helpfulness rubric | Whether a generic judge improves over telemetry alone | May detect obvious clarity issues, but is not calibrated to the target population |
| **B2: Expert consensus only** | Tier 1 domain experts and Tier 2 language experts, without Tier 3 raters | Whether expert review is sufficient without target-user grounding | May approve accurate and well-written responses that remain difficult for non-expert users |
| **B3: Proposed comprehension-focused judge** | Judge or classifier trained/calibrated on Tier 3 disagreement patterns | Whether target-user disagreement can be partially automated | Still depends on annotation quality, sample composition, and domain transfer |

The experimental question is therefore not whether Track 3 performs well in the abstract. It is whether **B3 improves detection of Tier 3 comprehension-risk cases** relative to plausible alternatives:

- telemetry alone;
- telemetry plus a generic LLM-as-a-judge;
- expert consensus without target-user raters.

This comparison also clarifies the role of each track. Track 1 is a baseline for operational correctness. Expert consensus is a baseline for factual and linguistic correctness. A generic LLM judge is a baseline for scalable text evaluation. The proposed judge is evaluated only on its intended construct: predicting target-user comprehension risk.

### System Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THREE-TRACK EVALUATION SYSTEM                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AGENT EXECUTION                                                            │
│  ├─ Fetch data (API calls)                                                  │
│  ├─ Transform (SQL, calculations)                                           │
│  └─ Generate response (LLM text)                                            │
│                                                                             │
│  ↓                                                                           │
│                                                                             │
│  TRACK 1: DETERMINISTIC TELEMETRY CHECKS                                    │
│  ├─ [Problem 1] Self-Contradicting Output       → Payload consistency      │
│  ├─ [Problem 2] Ghost Answer / Hallucination    → Execution lineage        │
│  └─ [Problem 4] Multi-Turn Context Decay        → Cache invalidation       │
│                                                                             │
│  ↓                                                                           │
│  (All technical checks pass? → Continue to next track)                      │
│                                                                             │
│  TRACK 2: HUMAN JUDGMENT (Multi-Tier Raters)                                │
│  ├─ [Problem 3] Context-Dependent Failures      → Multi-user testing       │
│  ├─ [Problem 5] False Positive Eval Alert       → Tier 1/2/3 disagreement  │
│  └─ [Residual] Comprehension Errors             → Tier 3 comprehension label│
│                                                                             │
│  ↓                                                                           │
│  (Annotation patterns collected → Train or calibrate comprehension-focused judge)                    │
│                                                                             │
│  TRACK 3: COMPREHENSION-FOCUSED JUDGE (Comprehension-Focused)                       │
│  ├─ Input: Response + Context                                               │
│  ├─ Task: "Will a general reader disagree?"                                │
│  ├─ Output: Comprehension risk (0–1)                                       │
│  └─ Action: Flag for human review if risk > threshold                      │
│                                                                             │
│  ↓                                                                           │
│  DEPLOYMENT                                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Experimental Design: Annotation and Disagreement Methodology {#annotation-methodology}

**Scope:** Experimental annotation workflow to test whether disagreement patterns reveal comprehension failures missed by telemetry, experts, and generic LLM-based judges. Addresses problems 3, 5, and residual comprehension failures.

**Key Insight:** Tier 3 raters provide ground truth for **target-user comprehension**, not for factual accuracy or domain correctness. Expert disagreement reveals where domain expertise and user understanding diverge [7][8].

### Rater Tiers and Roles

| Tier | Profile | Expertise | Role in Eval | Pilot sample |
|------|---------|-----------|--------------|------------|
| **Tier 1** | Data Scientist / Domain Expert | High domain knowledge (financial systems, SQL, data semantics) | Validate accuracy of facts, domain reasoning, and whether the data answer is correct | 5–8 raters |
| **Tier 2** | Content Designer, Linguist, Writer | NLP, communication design, pragmatics | Evaluate clarity, ambiguity, structure, and whether the response follows Grice's maxims | 5–8 raters |
| **Tier 3A** | Target user: lower functional-literacy band + low financial-domain familiarity | Practical comprehension risk | Evaluate whether the response can be understood without background knowledge | 10–15 raters |
| **Tier 3B** | Target user: elementary/intermediate functional-literacy band + low financial-domain familiarity | Comparison within target population | Identify whether comprehension failures persist beyond the lowest-literacy group | 10–15 raters |
| **Tier 3C** | Small-business or administrative user with moderate practical financial familiarity | Practical domain exposure, non-specialist | Test whether operational familiarity reduces comprehension failures | 10–15 raters |

**Hypothesis:** When Tier 3 raters disagree with Tier 1/2, their disagreement should be treated as decisive for the comprehension-risk label. Tier 1 and Tier 2 remain decisive for accuracy, domain validity, and language-craft diagnosis.

**Sampling principle:** Tier 3 is a purposive stratified sample, not a statistically representative sample of the Brazilian population. The goal is not to estimate national prevalence. The goal is diagnostic: to test whether responses that pass expert or automated evaluation still fail for user profiles likely to experience comprehension risk.

### Recruitment and Pre-Screening

**Goal:** Construct a purposive stratified sample of target users whose literacy profile, financial-domain familiarity, and practical business context make them relevant for detecting comprehension failures. The sample should not be described as nationally representative unless a separate population-sampling design is used.

**Screening Protocol:**

1. **Literacy Pre-Test (5 min):**
   - Short functional-literacy screening task inspired by INAF-style items [5]
   - Example: Read a paragraph about "atraso de pagamento" (payment delay) and answer 3 questions
   - Target: Raters who fall into the study's operational comprehension bands for Tier 3A, 3B, or 3C
   - Important: Do not claim equivalence to the official INAF scale unless a validated INAF instrument is used

2. **Financial Domain Baseline (3 min):**
   - Ask: "What does 'faturamento' mean?" (billing/revenue)
   - Expect: Vague or incorrect answers (this confirms "not domain expert")
   - Exclude from Tier 3A/3B: Anyone with banking/accounting expertise; consider for a separate comparison group if analytically useful

3. **Attention Check (2 min):**
   - Show a confusing response intentionally and ask "Can you explain this?"
   - Measure: Do they try, or give up?
   - Target: Raters who attempt comprehension despite difficulty

**Tier 3 Stratification Axes:**

- **Functional comprehension band:** lower, elementary/intermediate, or moderate comprehension based on study-specific screening tasks.
- **Financial-domain familiarity:** none, low practical familiarity, or moderate operational familiarity.
- **Use context:** micro-entrepreneurs, small business owners, service providers, administrative staff, or people who handle payments, receivables, invoices, or statements without being financial specialists.

The INAF data motivates the relevance of this design, but the study should not claim equivalence to INAF categories unless it uses a validated INAF instrument.

**Recruitment Channel:**
- Partner with SEBRAE-linked entrepreneur programs, financial-inclusion NGOs, microcredit institutions, community business associations, and local entrepreneurship networks
- Offer fair compensation (R$20–30 per 30-min rating session, to be validated against local recruiting norms)
- Focus on micro-entrepreneurs, small business owners, administrative staff, and other profiles that resemble the intended user base

**Tier 1/2 Recruitment:**
- Tier 1: Hire financial domain experts (data scientists, domain engineers)
- Tier 2: Hire UX writers, content designers, or linguists familiar with financial communications

### Annotation Workflow and Schema

**Task Setup:**

Each rater sees:
1. **User Question:** (e.g., "Quais são meus principais clientes?")
2. **Agent Response:** (the full text response)
3. **Rating Questions:** (tier-specific)
4. **Disagreement Reasoning:** (optional free-text)

**Tier 1 Rating Questions:**

```
1. Is the data factually correct?
   - [Yes] The numbers and facts are accurate
   - [No] Contains factual errors
   - [Unsure] Hard to verify

2. Does the agent address the user's actual business need?
   - [Yes] This directly answers what they asked for
   - [No] Answers something else
   - [Partially] Answers part of the need

3. What could be clearer?
   - [Nothing] Clear as-is
   - [Domain jargon] Uses terms without explanation
   - [Missing context] Doesn't say which metric/time period
   - [Too much detail] Overwhelming
   - [Other] ___
```

**Tier 2 Rating Questions:**

```
1. Is this response clear and well-structured?
   - [Yes] Easy to follow
   - [No] Confusing or poorly organized
   - [Partially] Some parts are clear, others aren't

2. Does it follow Grice's conversational maxims?
   a) Quantity: Is information complete without being excessive?
      - [Good] Right amount
      - [Under-explain] Missing details
      - [Over-explain] Too much detail
   
   b) Relation: Does it actually answer the question?
      - [On-topic] Yes, stays focused
      - [Off-topic] Drifts
      - [Ambiguous] Hard to tell
   
   c) Manner: Is language clear and unambiguous?
      - [Clear] Easy to parse
      - [Jargony] Uses unexplained terms
      - [Vague] Ambiguous phrasing
   
   d) Quality: Is it truthful and avoids speculation?
      - [Factual] Sticks to data
      - [Speculative] Makes assumptions

3. For a general user (not a domain expert), what's unclear?
   - [Nothing] A general person would understand this
   - [Terminology] Words they wouldn't know
   - [Concepts] Ideas that need explanation
   - [Structure] Don't understand why it's organized this way
```

**Tier 3 Rating Questions:**

```
1. Can you understand this response?
   - [Yes, completely] I get it
   - [Mostly] Some parts are unclear
   - [No] I'm lost

2. What parts were hard to understand?
   - [None] All clear
   - [Words] Some words don't make sense to me
   - [Sentences] Sentences are too complex
   - [Meaning] I don't understand what it's trying to say
   - [Other] ___

3. If you had to explain this to a friend, what would you say?
   - [Tier 3 writes free-text explanation]
   - [Used as comprehension check: if explanation diverges from agent's intent, comprehension failed]

4. Would you trust this answer to make a business decision?
   - [Yes] I'd use this
   - [No] I'd ask for help
   - [Unsure] Depends
```

### Disagreement Labeling Schema

**Definition:** Disagreement occurs when raters diverge on core questions.

**Labeling Logic:**

```
For each response R:
  Collect ratings from Tier 1, Tier 2, Tier 3
  
  Compute disagreement:
    TIER_3_COMPREHENSION_LABEL = [
      "Can you understand?" → If Tier 3 = "No" or "Mostly", 
                             LABEL = "Comprehension Failure"
                             Applies to comprehension risk, even if Tier 1 = "Yes, accurate"
    ]
    
    CROSS_TIER_CONFLICT = [
      Tier 1 = "Factually correct" ∧ Tier 3 = "I'm lost"
        → LABEL = "Accuracy-Comprehension Gap"
        → Note which concepts caused confusion
      
      Tier 2 = "Clear, follows Manner" ∧ Tier 3 = "Words confusing"
        → LABEL = "Jargon Barrier"
        → Extract terminology Tier 3 flagged
      
      Tier 1 = "Addresses business need" ∧ Tier 3 = "Unsure how to use this"
        → LABEL = "Intent Misalignment"
        → Reasoning: Tier 3 doesn't see how this helps their decision
    ]
    
  AGREEMENT = [
    All tiers = "Yes" or "Clear"
      → LABEL = "No Concern"
  ]

  Store tuple: (response_id, [tier_ratings], disagreement_label, tier_reasoning)
```

### Pilot Phase (Phase 1): Feasibility Study Without Generalization Claims

**Goal:** Test feasibility, refine the annotation protocol, and look for initial evidence that Tier 3 disagreement exposes comprehension risks missed by expert review or automated evaluation.

**Generalization boundary:** Phase 1 is a pilot. It should not make claims about the prevalence of comprehension failures in the Brazilian population, in the bank's full customer base, or across all agent responses. Its purpose is to validate the study design: whether the tasks are understandable, whether the rater tiers produce interpretable disagreement patterns, whether the annotation schema captures useful signals, and whether the observed variance justifies a larger study.

**Design Note:** The 100-response pilot size is a practical compromise between signal detection and manageable cost. It is not a sample-size claim for population inference. Adjust based on budget, recruitment feasibility, observed class balance, and variance in the first annotation batches.

**Steps:**

1. **Selection:** Pick 100 diverse agent responses
   - 20 responses flagged by Track 1 (telemetry detected issues)
   - 30 responses rated as "expert consensus = good" by Tier 1
   - 30 random responses (baseline)
   - 20 responses with known user complaints (ground truth of failures)

2. **Annotation:** 
   - Recruit 5–8 Tier 1 raters (internal domain experts)
   - Recruit 5–8 Tier 2 raters (UX writers, content designers, linguists)
   - Recruit 30–45 Tier 3 raters across Tier 3A, 3B, and 3C
   - Each response should be rated by a manageable subset of raters from each tier, using a balanced assignment plan rather than requiring every rater to rate every response
   
   **Design Note:** Tier 3 is oversampled because the experiment is designed to detect target-user comprehension risk. Tier 1/2 serve as comparison baselines. The pilot should report recruitment feasibility, annotation completion time, fatigue, missing data, and disagreement patterns before scaling.

3. **Analysis:**
   - Measure inter-rater agreement (Cohen's kappa per tier)
   - Count Tier 3 comprehension failures when Tier 1/2 rate the response as acceptable
   - Extract top 10 jargon terms flagged by Tier 3
   - Compare Track 1 errors + Tier 3 comprehension failures (do they overlap or complementary?)

4. **Output:**
   - Disagreement matrix (100 responses × 3 tiers × 5 questions each)
   - Pilot estimate: proportion of expert-approved responses in the pilot set that produced Tier 3 comprehension concerns, reported explicitly as non-generalizable
   - Glossary of jargon to simplify

**Cost:** To be estimated during recruitment. Phase 1 should record actual cost per completed annotation, dropout rate, and rater time-on-task rather than treating early estimates as stable.

### Scale Phase (Phase 2): Larger Experimental Dataset for Judge Training

**Goal:** Build an initial training dataset for a comprehension-risk classifier or calibrated LLM judge. The 500–1,000 annotation target should be treated as an operational planning range, not a universal sample-size rule. The final number should be determined by Phase 1 variance, inter-rater agreement, class balance, recruitment feasibility, and held-out validation performance.

**Steps:**

1. **Recruitment:** Scale Tier 3 recruitment across the same purposive strata, increasing diversity within each stratum rather than claiming national representativeness

2. **Response Selection:**
   - 300–400 responses from production (mix of Track 1 pass/fail)
   - 150–200 responses with known user feedback (labeled as problems)
   - 50–100 responses Tier 1 rated as "good" but Tier 3 might disagree (hypothesis validation)

3. **Annotation Process:**
   - Tier 1 raters: Rate all 500–1,000 (spot-checking, not all detail)
   - Tier 2 raters: Rate all 500–1,000 (Manner/Relation focus)
   - Tier 3 raters: Rate 500–1,000, stratified (each response by 2–3 Tier 3 raters to validate inter-rater agreement among Tier 3 strata)

4. **Quality Assurance:**
   - Re-review 10% of Tier 3 ratings (catch fatigue/error)
   - Attention checks embedded in survey
   - Exclude raters with >15% contradiction with their own prior responses

5. **Output:**
   - 500–1,000 annotated responses in JSON format
   - Disagreement patterns by response type (context-dependent vs. jargon-heavy vs. factual errors)
   - Tier 3 agreement metrics (kappa among low-literacy raters)

**Cost:** ~R$15,000–30,000 for Tier 3 annotations depending on sample size and assignment plan, plus Tier 1/2 review time

---

## 6. Implementation Considerations {#implementation-considerations}

This section translates the framework into operational mechanisms. The implementation details should be treated as reference architecture rather than universal requirements. In particular, latency, thresholds, annotation volumes, class weights, and review gates should be calibrated through pilot data and production monitoring.

### 6.1 Deterministic telemetry checks {#deterministic-telemetry}

**Scope:** Automated validation of execution correctness. Addresses problems 1, 2, and 4 when trace coverage and event schemas are adequate.

**Tech Stack:** Jev (or equivalent job execution framework) + Golang tracing. The specific technology is less important than trace coverage. The relevant criterion is whether the system can connect response claims to execution evidence.

### Check 1.1: Payload Consistency (Problem 1)

**Problem:** Agent generates contradictory data in the same response (e.g., $10k in a table, $15k in a summary). Self-contradictory hallucinations are a documented failure mode in LLM-generated text [9]. In agentic systems, this failure can also arise when different parts of a response are assembled from different traces, timestamps, filters, or parameter resolutions.

**Check Logic:**
```
For each response R:
  For each field F in R (table, summary, descriptive text):
    Extract numeric/categorical values using regex or schema parser
    Cross-reference all extracted values against source traces
    If value(F_table) ≠ value(F_summary) but both claim to represent same entity:
      Flag inconsistency + trace IDs of divergent executions
      Alert: "Contradictory data sources for [entity]"
```

**Implementation:**
- Maintain a mapping of response fields → trace spans that generated them
- At response assembly time, validate that all references to the same entity use the same execution trace (same timestamp, same parameter set)
- If execution diverges (e.g., "this month" resolved differently in two sub-queries), block response or escalate to human

**Operational value:** Reduces dependence on semantic eval for explicit numeric or categorical contradictions. Latency should be measured in the deployed tracing architecture.

### Check 1.2: Execution Lineage Validation (Problem 2)

**Problem:** Agent claims it executed an action without an actual API call, SQL execution, or tool confirmation. This is a form of tool hallucination—when LLMs confidently report tool invocations that never occurred [10]. Recent work suggests that reasoning enhancements can amplify tool hallucination in some settings [10].

**Check Logic:**
```
For each claim C in response (e.g., "I updated the database"):
  Extract action verb (updated, created, deleted, fetched)
  Search execution trace for corresponding event:
    - HTTP call to API endpoint (status 200–299)
    - SQL COMMIT/INSERT/UPDATE (success log entry)
    - Tool invocation with confirmation (e.g., Slack message sent)
  If claim(C) exists but trace event(C) does NOT:
    Flag as "Hallucinated Action"
    Alert: "Agent claims '[action]' but no trace confirms execution"
```

**Implementation:**
- Every tool invocation should emit a span with:
  - Tool name
  - Input parameters
  - HTTP/SQL status code
  - Timestamp
- Before returning response, scan response text for action verbs
- Match against span events in trace
- If no match, reject response or append disclaimer: "This summary describes a planned action, not one executed yet"

**Operational value:** Prevents ghost answers from reaching users when execution traces are complete enough to validate action claims. Latency should be measured in the deployed tracing architecture.

### Check 1.3: Cache Invalidation Tracking (Problem 4)

**Problem:** Multi-turn conversation where the agent reuses stale cached data from turn 1 after turn 4 changes the scope. Multi-turn failures can arise from both model-level context-use limitations and system-level state-management errors. "Lost in the Middle" supports the former—models may fail to use relevant information depending on where it appears in long context [11]. Temporal-consistency work shows that models can also lose or alter temporal scope across turns [13]. Stale cache reuse is the system-level version: the state changes, but the data lineage does not.

**Check Logic:**
```
For each turn T in conversation:
  Record input parameters and cache keys used
  Track cache hit/miss for each data source
  On turn T+1:
    If any parameter changed (e.g., date range, filter, user role):
      Validate that cache was invalidated
      Check if data fetched in T+1 reflects new parameters
      If T+1 reuses T's cached values despite parameter change:
        Flag as "Stale Cache Reuse"
        Alert: "Turn 4 used data from Turn 1 despite scope change"
```

**Implementation:**
- Assign cache keys versioned by [user_id, date_range, filters, permissions]
- At turn boundary, check if cache key changed
- If key changed, verify that old cache entries were not used
- Log cache lineage in trace (which turn fetched this data, when was it cached, when was it reused)
- If reuse detected across different key versions, escalate

**Operational value:** Detects some forms of context drift automatically and reduces repeated manual turn-by-turn testing. Coverage depends on cache-key design and trace completeness.

### Check 1.4: RBAC Context Capture (Problem 3 - Partial)

**Problem:** Response works for User A (admin) but fails for User B (analyst) because role, tenant, account state, permissions, product access, or prior interaction history differ. This is an evaluation-design issue: if the test environment does not vary user context, the evaluation will not reveal whether the same response pattern behaves differently across permission profiles. Static golden dataset testing is insufficient on its own; multi-user scenario testing is needed for this class of failure.

**Check Logic:**
```
For each response R:
  Extract user context: user_id, role, tenant_id
  Log all SQL WHERE clauses and API permission checks applied
  On failure F:
    Check if F only occurs for specific role combinations
    Correlate F with permission scope (e.g., "analyst can't see supplier_cost column")
    Store pattern: [user_role, forbidden_field, failure_type]
  
At test time:
  Run response through multiple permission profiles
  If response succeeds for [admin, finance_manager] but fails for [analyst]:
    Alert: "Context-dependent failure detected under role=[analyst]"
```

**Implementation:**
- Require every data access to be wrapped with permission check
- Log [attempted_resource, user_role, permission_result] tuple
- Build permission failure matrix (rows = roles, cols = data fields)
- Compare test results across permission profiles
- Note: Requires test suite to explicitly cover multiple user profiles (not static golden dataset)

**Operational value:** Identifies permission-sensitive failures earlier and reduces production RBAC surprises when the test suite covers the relevant permission profiles.

### Track 1 Integration: Automated Gate Before Eval

**Latency and coverage:** These should be treated as engineering targets, not empirical claims. The team should define latency budgets and false-negative targets during implementation, then measure them under the actual tracing architecture.

Suggested measurement targets:
- Payload consistency: high recall for explicit numeric/categorical contradictions
- Execution lineage: near-complete coverage for claims tied to tool calls, API requests, database reads/writes, and external actions
- Cache invalidation: high recall for parameter-change reuse errors
- RBAC: coverage proportional to the number and realism of permission profiles represented in the test suite

**Key Assumption:** Telemetry is instrumented across all data fetches, tool calls, and SQL execution. Without this foundation, checks 1.2–1.4 are unlikely to provide reliable coverage.

---

### 6.2 Comprehension-focused judge {#comprehension-judge}

**Scope:** Train or calibrate a model to estimate whether target-user raters are likely to struggle with a response, instead of asking only whether the response is technically correct.

**Scientific Grounding:** CrowdTruth work by Aroyo & Welty [7] and Dumitrache et al. [8] establishes disagreement as a meaningful signal in crowdsourced ground truth. This section applies that idea as a methodological proposal: train or calibrate a judge to predict target-user comprehension risk rather than expert consensus alone.

### Task Definition

The traditional judge task asks whether a response is technically or factually correct, usually by comparing the response with traces, retrieved evidence, rubric criteria, or expert expectations. The proposed comprehension-focused task asks a different question: whether target-user raters are likely to struggle to understand or use the response.

The target label should be derived from Tier 3 ratings on a held-out annotation set. A positive label indicates that Tier 3 raters show comprehension difficulty, such as reporting that they only partially understood the response, could not explain it back accurately, or would not trust it for a business decision. The aggregation rule should be specified before analysis: for example, majority vote among Tier 3 raters, or a stricter rule when the study wants high sensitivity to comprehension risk.

### Training Data Preparation

From Phase 2, each training example should include:

- the user question;
- the agent response;
- relevant execution and context metadata;
- Tier 1 factual/domain-validity ratings;
- Tier 2 clarity, structure, and pragmatic ratings;
- Tier 3 comprehension ratings and explanation-back responses;
- derived response features such as length, jargon density, missing metric definitions, ambiguity markers, and temporal-scope markers;
- the final comprehension-risk label and confidence score.

The annotated corpus should be split into train, validation, and test sets. Similar prompts, duplicate templates, and near-identical responses should not leak across splits. A simple starting split is 80% training, 10% validation, and 10% held-out test, but the final split should preserve enough positive comprehension-risk examples in each partition.

### Modeling Recipe

**Modeling Options:** Use one of two implementation paths:

1. **Supervised classifier:** Train a lightweight BERT-style Portuguese or domain-adapted model to predict comprehension risk.
2. **Calibrated LLM judge:** Use an LLM-as-a-judge, but calibrate its prompt, rubric, examples, and thresholds against human-labeled disagreement patterns.

FinBERT-style models are classifiers, not LLM judges. They are appropriate for path 1, not path 2.

**Cost-sensitive tuning:** The positive class should represent target-user comprehension risk. If missing a comprehension failure is more costly than sending a response to review, the model or decision threshold can be tuned toward higher recall. This is a design choice, not a universal recommendation. The final trade-off should be selected using validation-set precision, recall, review capacity, and the observed cost of false positives.

### Model Training Procedure

The implementation should be described at the level of procedure rather than embedded code. The specific modeling stack may vary across organizations, and including framework-specific code in the main text would make the article read like a technical appendix rather than a methodological proposal.

A minimal implementation should:

1. Represent each example as a tuple containing the user question, agent response, relevant execution/context metadata, expert ratings, language ratings, and Tier 3 comprehension labels.
2. Split the annotated corpus into train, validation, and test sets, ensuring that similar prompts or duplicated response templates do not leak across splits.
3. Train either a supervised classifier or calibrate an LLM-based judge to predict the Tier 3 comprehension-risk label.
4. Tune the decision threshold on the validation set according to the desired precision-recall trade-off.
5. Report final performance only on the held-out test set and compare it against the predefined baselines.

The main methodological requirement is not a specific Python implementation, but preservation of the experimental comparison: the proposed scorer must be evaluated against telemetry-only checks, a generic LLM judge, and expert-only consensus using the same held-out Tier 3 labels.

### Validation Metrics

After training, evaluate on held-out test set (50–100 responses):

| Metric | Definition | Target | Why It Matters |
|--------|-----------|--------|----------------|
| **Precision (label=1)** | Of responses judge flagged as "risky", what % truly had Tier 3 disagree? | >0.70 | Fewer false positives = fewer unnecessary escalations |
| **Recall (label=1)** | Of responses where Tier 3 actually disagreed, what % did judge catch? | >0.80 | Fewer false negatives = catch comprehension failures before production |
| **F1 (label=1)** | Harmonic mean of precision & recall | >0.75 | Balanced metric combining both error types |
| **Threshold Tuning** | Vary decision boundary (default 0.5) to optimize for the cost function | Recall ≥ 0.80 if FN_cost >> FP_cost | If missing comprehension failures is very expensive, lower threshold to increase recall |

### Output: Comprehension Risk Score

The calibrated model should output a comprehension-risk score, a confidence estimate, and a short rationale or feature attribution that can support human review. The score should not be treated as a final truth label. It is a triage signal for review, monitoring, or release decisions.

The review threshold is a design choice. A lower threshold increases recall and sends more responses to review; a higher threshold reduces false positives but may allow more comprehension failures through. Thresholds should be selected on the validation set and reported against the held-out test set.

---

### 6.3 Four-phase implementation roadmap {#implementation-roadmap}

### Phase 1: Pilot / Feasibility Study (Weeks 1–3)

**What:** Annotate approximately 100 responses with Tier 1/2/3 raters using the proposed stratified protocol.

**Output:**
- Feasibility assessment: recruitment, completion time, fatigue, missing data, annotation clarity
- Pilot-only Tier 3 disagreement patterns, explicitly reported as non-generalizable
- Top jargon terms and response features flagged by Tier 3 raters
- Decision: Proceed to Phase 2, revise the protocol, or narrow the research question

### Phase 2: Scale Annotation (Weeks 3–8)

**What:** Annotate 500–1,000 responses. Build training dataset for judge.

**Output:**
- Tier 3 inter-rater agreement (kappa)
- Disagreement patterns by response type
- Training data in JSON format for fine-tuning
- Decision: Proceed to Phase 3

### Phase 3: Judge Calibration or Training (Weeks 9–14)

**What:** Train or calibrate the judge on disagreement patterns, then compare it against the explicit baseline conditions defined above.

**Primary target:** Tier 3 comprehension-risk labels on a held-out test set.

**Baseline comparison:**
- **B0:** Track 1 deterministic telemetry only
- **B1:** Track 1 + generic text-only LLM judge
- **B2:** Expert consensus from Tier 1 and Tier 2, without Tier 3
- **B3:** Proposed comprehension-focused judge trained or calibrated on Tier 3 disagreement

**Output:**
- Comprehension risk classifier or calibrated LLM judge
- Comparative validation metrics for B0, B1, B2, and B3
- Precision, recall, F1, and false-negative rate for Tier 3 comprehension-risk cases
- Decision: Proceed to Phase 4 only if the proposed condition improves meaningfully over plausible baselines

### What to Measure

| Phase | Metric | Purpose |
|-------|--------|---------|
| 1 | Feasibility + pilot Tier 3 disagreement patterns | Does the protocol produce interpretable signal without making generalization claims? |
| 2 | Inter-rater agreement (Tier 3) | Are low-literacy raters consistent? |
| 3 | Comparative recall/F1 against B0/B1/B2 baselines | Does the proposed judge improve over plausible alternatives? |

---

## 7. Limitations {#limitations}

This framework is intended as a methodological proposal and requires empirical validation in the deployment context.

First, Tier 3 raters provide ground truth for **target-user comprehension**, not for factual accuracy, data validity, or domain-rule correctness. Expert review remains necessary for those constructs.

Second, annotator disagreement is informative but not automatically meaningful. Disagreement may reflect genuine ambiguity, but it may also reflect fatigue, unclear annotation instructions, poor task design, insufficient context, or inconsistent rater calibration. The annotation workflow therefore needs attention checks, re-review, and inter-rater agreement analysis.

Third, the framework depends on adequate telemetry. Execution-lineage validation, cache-invalidation checks, and RBAC-context capture only work when tools, APIs, SQL operations, permissions, cache keys, and response assembly steps emit usable traces. Without that instrumentation, deterministic checks provide a false sense of coverage.

Fourth, the proposed sample sizes, thresholds, positive-class weights, and validation targets are operational starting points. They should not be treated as universal sample-size rules or benchmark claims. They must be tuned against pilot variance, class balance, review capacity, and the business cost of false positives and false negatives.

Fifth, a judge trained on human disagreement can reproduce the biases of the annotation process. If the rater pool is too narrow, poorly screened, or demographically misaligned with the target population, the model may learn a distorted version of comprehension risk.

Sixth, Phase 1 is explicitly a pilot and should not be used to estimate prevalence or make population-level generalization claims. Any percentages reported in Phase 1 should be described as pilot-set observations, not as estimates for Brazil, the bank's customer base, or production traffic.

Finally, results may not generalize across domains, languages, literacy profiles, or product contexts. A framework calibrated for Brazilian financial-service users should not be assumed to transfer unchanged to other countries, sectors, or interaction patterns.

---

## 8. Future Work {#future-work}

Several research and implementation questions remain open.

First, the framework should be validated empirically through a staged experimental study that begins with a non-generalizable pilot and then scales into a larger validation dataset comparing expert consensus, target-user comprehension labels, telemetry findings, and production feedback. The key question is whether Tier 3 disagreement predicts downstream indicators such as repeated questions, support tickets, task abandonment, or low trust in the response.

Second, the rater design should be refined. Future work should test how many target-population raters are needed per response, which screening tasks best approximate functional comprehension, and how disagreement patterns differ across literacy levels, financial familiarity, region, and role.

Third, the comprehension-risk judge should be compared against alternative approaches: text-only LLM judges, rubric-based LLM judges, lightweight supervised classifiers, retrieval-augmented evaluators, and hybrid systems that combine trace inspection with natural-language assessment.

Fourth, the framework should be extended from response-level evaluation to interaction-level evaluation. Many comprehension failures emerge only across turns: changing temporal scope, unresolved ambiguity, stale cached results, or user corrections that the agent fails to incorporate.

Fifth, future work should define clearer cost models. False positives create review burden; false negatives expose users to confusing or misleading responses. The right threshold depends on the relative cost of those errors, the volume of agent responses, and the operational capacity of human reviewers.

---

## 9. References {#references}

[1] Cho, Y.-E. (2026). "Evaluating Pragmatic Reasoning in Large Language Models: Evidence from Scalar Diversity." In *Proceedings of the 2nd Joint Workshop on Computational Approaches to Discourse, Context and Document-Level Inferences and Computational Models of Reference, Anaphora and Coreference (CODI-CRAC 2026)*, 120–129. Association for Computational Linguistics. doi: 10.18653/v1/2026.codi-1.17.

[2] Miehling, E., Nagireddy, M., Sattigeri, P., Daly, E. M., Padhi, I., Remy, S. L., Riemer, M., Dognin, P., & Das, P. (2024). "Language Models in Dialogue: Conversational Maxims for Human-AI Interactions." In *Findings of the Association for Computational Linguistics: EMNLP 2024*, 14420–14437. Association for Computational Linguistics. doi: 10.18653/v1/2024.findings-emnlp.843.

[3] Krause, L., & Vossen, P. T. J. M. (2024). "The Gricean Maxims in NLP — A Survey." In *Proceedings of the 17th International Natural Language Generation Conference (INLG 2024)*, 470–485. Association for Computational Linguistics.

[4] Khayrallah, H., & Sedoc, J. (2021). "Measuring the 'I don’t know' Problem through the Lens of Gricean Quantity." In *Proceedings of the 2021 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies*, 5659–5670. Association for Computational Linguistics. doi: 10.18653/v1/2021.naacl-main.450.

[5] Ação Educativa & INAF. (2024). *Indicador de Alfabetismo Funcional no Brasil 2024*. Ação Educativa / Indicador de Alfabetismo Funcional (INAF). Retrieved from https://alfabetismofuncional.org.br/.

[6] Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). "The Expertise Reversal Effect." *Educational Psychologist*, 38(1), 23–31. doi: 10.1207/S15326985EP3801_4.

[7] Aroyo, L., & Welty, C. (2015). "Truth Is a Lie: Crowd Truth and the Seven Myths of Human Annotation." *AI Magazine*, 36(1), 15–24. doi: 10.1609/aimag.v36i1.2564.

[8] Dumitrache, A., Inel, O., Timmermans, B., Ortiz, C., Sips, R.-J., Aroyo, L., & Welty, C. (2021). "Empirical Methodology for Crowdsourcing Ground Truth." *Semantic Web*, 12(3), 403–421. doi: 10.3233/SW-200415.

[9] Mündler, N., He, J., Jenko, S., & Vechev, M. (2024). "Self-Contradictory Hallucinations of Large Language Models: Evaluation, Detection and Mitigation." In *International Conference on Learning Representations (ICLR 2024)*.

[10] Yin, C., Sha, Z., Cui, S., Meng, C., & Li, Z. (2026). "The Reasoning Trap: How Enhancing LLM Reasoning Amplifies Tool Hallucination." In *Proceedings of the 64th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)*, 8310–8328. Association for Computational Linguistics. doi: 10.18653/v1/2026.acl-long.376.

[11] Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2024). "Lost in the Middle: How Language Models Use Long Contexts." *Transactions of the Association for Computational Linguistics*, 12, 157–173. doi: 10.1162/tacl_a_00638.

[12] Zheng, L., Chiang, W.-L., Sheng, Y., Zhuang, S., Wu, Z., Zhuang, Y., Lin, Z., Li, Z., Li, D., Xing, E. P., Zhang, H., Gonzalez, J. E., & Stoica, I. (2023). "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena." In *Advances in Neural Information Processing Systems 36 (NeurIPS 2023), Datasets and Benchmarks Track*.

[13] Atri, Y. K., Johnson, S. L., Liu, K., Mitchell, M., & Hartvigsen, T. (2026). "Evaluating Temporal Consistency in Multi-Turn Language Models." In *Proceedings of the 64th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)*. Association for Computational Linguistics.

[14] Krumdick, M., Lovering, C., Reddy, V., Ebner, S., & Tanner, C. (2025). "No Free Labels: Limitations of LLM-as-a-Judge Without Human Grounding." arXiv:2503.05061.

---

## Appendix: Critical Questions for Implementation {#appendix-critical-questions}

1. **Problem 3 (Context-Dependent Failures):** How many user permission profiles should the test suite cover? Static golden dataset is insufficient.

2. **Residual Intent Misalignment:** Business definition of "top clients" varies by stakeholder (CFO = profit margin, VP Sales = volume). How should this be captured in eval criteria *before* the agent responds?

3. **Tier 3 Rater Calibration:** Which purposive strata are necessary, and how many annotations per stratum are needed before the comprehension-focused judge achieves reliable prediction on the specific domain (financial jargon, business context)?

4. **False Negative Cost:** When the comprehension-focused judge *misses* a comprehension failure (predicts agreement when user will disagree), what's the business impact? Loss weighting should reflect this.

5. **Scale:** Tracks 2 and 3 require human annotation. How should teams scale comprehension evaluation beyond the 500–1,000 annotated responses used for initial judge training?

---

*This framework is designed for UX and content designers working with evaluation engineers and LLM specialists. It assumes familiarity with annotation workflows, LangFuse evals, and agentic AI architecture. Questions or feedback: danieliscoding@gmail.com*
