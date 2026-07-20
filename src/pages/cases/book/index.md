---
layout: livro
title: "Designing Trust in Agentic Experiences"
subtitle: "A book about design, AI, and trust"
collection: Book
status: revisado
date: 2026-07-12T22:45:00-03:00
contact: "danieliscoding@gmail.com"
preface: "@danielsouza"
permalink: /cases/book/
---

## Introduction

This is a book for those who do design. Design in the sense of creating. Giving intentional form to an experience, a product, a service, a system. And doing it in a _designerly_[^1] way. Nigel Cross coined this term in 1982 to name a way of knowing that is neither the scientist's nor the philosopher's. Thinking by doing: sketching, modeling, prototyping, comparing alternatives, learning from the provisional forms that emerge from making.

Nigel Cross argued that there is a distinctive form of knowledge in design. An intelligence that cannot be reduced to science, art, or engineering, but dialogues with all three.

The designer's work thrives in this back-and-forth. Formulating the problem while seeking a solution. Making visible what is still vague. Creating conditions for a decision to be discussed, tested, and improved.

I want to invite you to have a design conversation about a current and urgent topic. In common parlance, we might say it's about AI that hallucinates. But it's somewhat more than that. We'll explore a _wicked problem_[^2] of global scale: how do we design automated systems that are more useful, faster, and convenient without impoverishing humanity's capacity to formulate questions, evaluate alternatives, and decide responsibly?

This challenge applies regardless of your title: product designer, content designer, product manager, or even a weekend vibe coder[^3]. A few things you should know before you begin:

- It's likely that some new language model or technology will soon be able to answer several of the questions we address in this book.
- If you already have experience in software engineering, MLOps, or Machine Learning, this content might seem basic to you. If that's the case, at the end of the book there's a list of resources that might be useful.

Even if the sociotechnical problem is solved by technology, I believe the vocabulary and ideas in this book can help you continue thinking, deciding, and designing a world mediated by AI, particularly in the context of generative interfaces and agents[^4].

The book is structured in three parts:

- A theoretical introduction that defines the qualities of a trustworthy system
- A set of practices, disciplines, and resources for non-technical profiles to design trust
- A catalog of design patterns[^5] for user interfaces and generative journeys

This book is the result of several months of research and curation of the knowledge of various authors I admire, who never shied away from complex themes or settled for simplistic answers. To their voices I added my own perspective and some personal experiences to defend a thesis: trustworthy agents don't result solely from better, faster models or even more polished interfaces. They result from a harder combination: clear language, explicit limits, good interaction decisions, verifiable criteria, and distributed responsibility.

It is not my goal to try to turn designers, product managers, researchers, or strategists into engineers. The proposal is different: to offer language, criteria, and tools so that non-technical profiles can participate better in building these systems.

I've tried to use the simplest language possible. The book includes examples, footnotes, and glossary items designed to make reading more fluid. The book's website offers additional tools, interviews, and articles.

I have three commitments to you: be clear enough to begin, rigorous enough to be worth the effort, and open enough for the conversation to continue after the last page.

Happy reading!

## Preface

On a cold night in Vancouver, in November 2022, Jake Moffatt received news of his grandmother's death. He went to the Air Canada website with a practical question: if he bought last-minute tickets for the funeral, could he request the bereavement fare discount[^6] after he returned?

Before buying the ticket, he wanted to confirm the rules. He asked the website's chatbot and took a screenshot of the response, which confirmed that he could request the refund up to ninety days after the trip. He bought the tickets that same day, made the trip, and when he returned he requested the refund. Air Canada refused.

Jake Moffatt didn't leave it at that. In the months that followed, he exchanged emails with the company and received negative responses. In February 2023, the company admitted: the chatbot had used "misleading words," and it refused again to pay.

Moffatt decided to take his case to the Civil Resolution Tribunal of British Columbia[^7]. In the proceedings, the defense surprised everyone: Air Canada argued that it was not responsible for what its representatives say, chatbot included, as if the tool were a separate legal entity. In February 2024, the tribunal called the argument "remarkable," rejected it, and ordered the company to pay 812 Canadian dollars.

The tribunal pointed out that Moffatt had no reason to know that one part of the website deserved more credibility than another. The company never explained why the fare page was more trustworthy. The chatbot never revealed where its answers came from, nor could it be verified. It sounded too convincing to question.

Air Canada never explained how its chatbot worked. Neither to Moffatt nor to the tribunal: the decision notes that the company provided no information about the nature of its chatbot[^8]. What is known is what it did: it invented a policy that didn't exist.

This is an emblematic case for its disproportion: 812 dollars in damages, headlines around the world. The decision named what the industry already knew and avoided saying. The risk isn't in the system failing; it's in the system failing while appearing infallible.

This distrust has backing in numbers. A survey of AI incidents cataloged 233 cases in 2024, up 56.4% from the previous year, many of them following the same pattern as the Moffatt case: a convincing response taken as truth before being checked[^9].

The same decision established a second understanding, that of responsibility. The separate entity thesis lost in Canada and lost again when it reappeared: in 2026, a German court condemned a clinic for what its chatbot said about its own doctors[^10]. No jurisdiction has yet accepted that the software acts alone.

In 2026, AI assistants are everywhere: ChatGPT alone has 900 million weekly users and receives 2.5 billion prompts per day. Nearly 29 thousand every second[^11].

The somewhat dumb chatbots we used to joke about became fluent and convincing. In Brazil, this shift didn't arrive as new technology—it arrived as a new way to chat. Brazilian life already thrived within WhatsApp: the good morning in the family group, the three-minute voice message, the bill payment, the doctor's consultation, the sale[^12]. When the machine learned to converse, it entered through the space where Brazilians spend their days: the messaging window. The blue circle of Meta AI appeared there in October 2024, without invitation and without a way to exit.

And when a conversational interface (a chatbot, an assistant) replaces consulting information, official documents, and even task execution autonomously, the design of these systems must anticipate new consequences and risks.

In regulated domains—healthcare, finance, government—this confusion between fluency and trustworthiness isn't just inconvenient. The person who receives an answer from a chatbot about when to take a medicine, or whether they can make a financial investment, is making a real decision.

What the interface shows is the conversation. What's sometimes not transparent is the rest: where the response comes from, why it came out that way, whether it's true, what it means, who answers when it fails. Of these five questions, courts have already resolved the last one, from Vancouver to Hamm. The other four seem to me a good design problem. Making visible what fluency hides is part of the answer, and this book gives a name to each part: transparency, explainability, verifiability, comprehensibility.


[^1]: It is the ability to think through design. The designer puts a hypothesis into the world (a sketch, a prototype, a journey) and uses that provisional form to learn, discuss, decide, and transform one's own understanding of the problem.

[^2]: Wicked problems are complex, ambiguous, and socially situated problems that have no definitive formulation or final solution. Each attempt to solve them changes one's own understanding of the problem. The term was coined by **Horst W. J. Rittel** and **Melvin M. Webber** in the article **"Dilemmas in a General Theory of Planning"** (2025).

[^3]: A vibe coder is someone who uses AI to transform an idea or goal into software, guiding the process through prompts, adjustments, tests, and feedback, without necessarily controlling every technical detail of the code produced.

[^4]: An AI agent is a system that, in addition to conversing, can interpret an objective, plan steps, use tools, make intermediate decisions, and execute actions on behalf of the user within certain limits.

[^5]: A design pattern captures the relationship between context, problem, and solution, offering a reusable way to solve a recurrent situation without prescribing a single implementation.

[^6]: Air Canada offered a bereavement fare discount for those who purchased airfare after the loss of a close relative, but with specific rules about timing and verification. The official "Bereavement travel" page excluded retroactive requests, made after the trip: the exact opposite of what the chatbot stated.

[^7]: _Moffatt v. Air Canada_, 2024 BCCRT 149, Civil Resolution Tribunal of British Columbia. Judgment: February 14, 2024. Decision available on [CanLII](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html). Case timeline: chatbot inquiry and first purchase on November 11, 2022; refund request on November 17, 2022; admission of "misleading words" by Air Canada on February 8, 2023; case opened in tribunal in February 2023.

[^8]: Later analyses presume a generative model: inventing a policy is incompatible with deterministic systems, which always respond with pre-approved texts (St-Hilaire, _UBC Law Review_, v. 58, n. 2, 2025).

[^9]: AI Incident Database (Stanford HAI, AI Index Report 2025).

[^10]: On May 12, 2026, the Oberlandesgericht Hamm, the appellate court of North Rhine-Westphalia, condemned the company Aesthetify GmbH to cease attributing to its two partners medical specialist titles that the website's chatbot had invented. Case I-4 UKl 3/25; appealable to the Bundesgerichtshof, the highest civil court in Germany.

[^11]: 2026 Statistics: ChatGPT (900M weekly users), Gemini (900M+ monthly). Source: public company reports. Prompt frequency: industry estimate.

[^12]: Ipsos/Google research (2024, 21 countries): 54% of Brazilians reported already having used generative AI, compared to 48% of the global average.
