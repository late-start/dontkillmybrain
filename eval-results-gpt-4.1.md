# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** gpt-4.1
**Overall Accuracy:** 57.6% (53/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 50% | 5/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 15% | 2/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 55% | 6/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 67% | 6/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 75% | 6/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 67% | 6/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 60% | 6/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 80% | 8/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 63% | 5/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 75% | 3/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 9 | 1 | 1 | 2 | . | 1 | 1 |
| friction | . | 5 | . | 2 | . | 1 | . |
| contribution | . | 1 | 6 | 3 | . | . | . |
| evaluation | 1 | 1 | . | 11 | 1 | . | . |
| passive_acceptance | 1 | . | 1 | 6 | 10 | 1 | 3 |
| delegation | . | . | 2 | 1 | . | 4 | . |
| capitulation | 2 | . | . | 1 | 4 | 1 | 8 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 9 | 15 | 60% | evaluation (2) |
| friction | 5 | 8 | 63% | evaluation (2) |
| contribution | 6 | 10 | 60% | evaluation (3) |
| evaluation | 11 | 14 | 79% | steering (1) |
| passive_acceptance | 10 | 22 | 45% | evaluation (6) |
| delegation | 4 | 7 | 57% | contribution (2) |
| capitulation | 8 | 16 | 50% | passive_acceptance (4) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 0:** Expected `steering` → Got `contribution` (confidence: 97%)
- Expected because: Opens with a clear problem statement and frames the debugging direction. Sets the agenda for the conversation.
- Classifier said: The human is providing detailed contextual information about the problem — system behavior, symptoms, code language, and a hypothesis — to enable the AI to help. They are not evaluating the AI's output or shaping the approach yet, just laying out facts and observations.

**Turn 4:** Expected `contribution` → Got `friction` (confidence: 95%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: The human is pushing back on the AI's suggestion of a dedicated Redis instance, calling it overkill. They articulate a different understanding of requirements and reframe the approach: use a hash tag approach on the existing cluster and also add a fallback unpartitioned table in the DB transaction. This is a clear rejection of the AI's approach and argument for an alternative direction.

**Turn 5:** Expected `steering` → Got `evaluation` (confidence: 98%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The human is reviewing a specific step (step 2a) of the AI's proposed output, questioning the correctness and highlighting a potential race condition. They are concerned about the transaction isolation level and suggest a change based on a concrete scenario, which is targeted feedback on the AI's architecture, not a rejection of the whole approach.

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 100%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human provides the schema, constraints, and explicit quality criteria, and asks the AI to write a Go function based on those. This is a clear handoff of a well-scoped implementation task with requirements and return value constraints, fitting delegation.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 100%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human is reviewing the AI's code, confirming the logic for concurrent cases, validating the Redis and DB interplay, and then providing constructive criticism (suggesting to increment a metric on Redis failure). This is classic evaluation: checking correctness, confirming understanding, and noting a missing quality.

### 02-pure-delegation.md

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 95%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The human is providing the specific information the AI requested: app name, target audience, desired user action, feature list, and state of branding. There is no assessment or guidance—just supplying answers to the AI's questions.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 100%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human offers brief, unelaborated acceptance of the AI's proposed structure and direction without additional reasoning or guidance. There is no indication of evaluation, steering, or shaping of the process.

**Turn 3:** Expected `passive_acceptance` → Got `capitulation` (confidence: 95%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The human is explicitly offloading the judgment about color selection to the AI and asking what they should do, without providing preferences or evaluative criteria. This matches capitulation: seeking the AI's decision on what is best.

**Turn 5:** Expected `passive_acceptance` → Got `capitulation` (confidence: 95%)
- Expected because: Agrees to add a testimonials section simply because the AI suggested it. No consideration of whether this is right for their product.
- Classifier said: The human is deferring to the AI to determine if anything is missing, offloading decision-making without providing criteria or direction.

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 95%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: The human accepts the AI's suggestion and moves forward without adding constraints, reasoning, or shaping the approach. They simply affirm the AI's recommendation and request action, showing acceptance without deeper engagement.

**Turn 7:** Expected `passive_acceptance` → Got `steering` (confidence: 90%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The human is redirecting the AI's output by specifying a preference for placeholder testimonials with fake names instead of ones targeting the audience personas, shaping what the AI should produce and explaining their intent to replace them later.

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 100%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: The human simply acknowledges the AI's previous output and moves on to the next task without providing feedback, new information, or shaping direction. The acceptance is casual and no evaluation or criteria are added.

**Turn 9:** Expected `passive_acceptance` → Got `capitulation` (confidence: 95%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The human is asking the AI to decide the deployment approach without providing any preferences, constraints, or criteria. They are seeking a judgment call from the AI on which platform is best or what the easiest route is, without shaping the decision themselves.

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 100%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human accepts the AI's suggested approach without further shaping, evaluation, or provision of information—just a brief acknowledgment and move to next action.

**Turn 11:** Expected `passive_acceptance` → Got `evaluation` (confidence: 95%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The human is reporting an issue encountered after following the AI's instructions, specifically that the styling appears broken on mobile after deployment to Netlify. They are evaluating the results of the AI's output/process and asking for help diagnosing the problem.

**Turn 12:** Expected `passive_acceptance` → Got `evaluation` (confidence: 95%)
- Expected because: Final acknowledgment. Confirms the fix with no curiosity about what was wrong or how to avoid it next time. No learning, just outcome-based acceptance.
- Classifier said: The human confirms having identified and fixed the specific issue discussed in the AI's output (the placement of the media query CSS). This is a review and confirmation of correctness after intervention.

### 03-progressive-reliance.md

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 95%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: The human is providing corrections on schema details (contribution) but also introduces a key methodological constraint — requiring a reference date approach to prevent data leakage, dictating how the pipeline should handle time and feature generation. This shapes both the scope and implementation philosophy, which is steering.

**Turn 4:** Expected `contribution` → Got `evaluation` (confidence: 97%)
- Expected because: Provides the actual date format and additional context about a data pipeline migration that the AI would have no way of knowing. This is domain knowledge from direct experience.
- Classifier said: The human provides specific information about the data type of 'event_timestamp' (varchar, ISO 8601) and points out that the provided SQL queries will need to cast those varchars appropriately, which is direct feedback on the AI's specific implementation details. Additionally, they confirm the reference date approach matches their intent—reviewing and verifying the AI's direction and output.

**Turn 7:** Expected `capitulation` → Got `delegation` (confidence: 95%)
- Expected because: 'Can you just interpret these for me' — explicitly asking the AI to do the thinking. They received model results but are not even attempting to interpret them. This is a clear shift from earlier turns where they were actively analyzing.
- Classifier said: The human provides specific results (metrics and feature importances) and asks the AI to interpret them, essentially delegating the task of analysis and interpretation with concrete inputs.

**Turn 8:** Expected `capitulation` → Got `steering` (confidence: 95%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The human is shaping the task by clarifying the audience, specifying what information matters (non-technical; actionable insights over technical metrics), and explaining the context (presentation to VP). This directs the AI on what to prioritize and how to frame the output.

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 98%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The human reviews the AI's executive summary, provides a specific change (replace '83% accuracy' with 'high degree of confidence'), and explains their reasoning (to avoid focus on the number). This is targeted review and modification of AI output, which is evaluation.

### 04-strategic-delegator.md

**Turn 3:** Expected `delegation` → Got `contribution` (confidence: 100%)
- Expected because: Hands off the second endpoint with detailed specs — the SQL query shape, pagination parameters, and response format. Again, all design decisions are already made.
- Classifier said: The human is providing detailed requirements and schema information for implementing the second endpoint, without explicitly assessing or referencing the AI's previous output. This is pure information provision to guide the next step.

**Turn 4:** Expected `steering` → Got `evaluation` (confidence: 98%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: The human is directly reviewing the AI's code output—pointing out a flaw in the cursor implementation and identifying unnecessary code duplication with the error helper, both concrete aspects of the output. The latter paragraph signals a change in direction for next steps, but the bulk of this message is specific review and modification requests based on what the AI just produced.

**Turn 5:** Expected `delegation` → Got `contribution` (confidence: 100%)
- Expected because: Provides the complete schema, validation rules, and error response format for the new preferences endpoint. Very precisely scoped — all design decisions are made, only execution is handed off.
- Classifier said: The human is providing detailed domain-specific information and requirements for the preferences endpoint without referencing or evaluating the AI's prior output. This is pure context and specification, fitting the definition of contribution.

### 05-false-evaluator.md

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 95%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: The human is reviewing the AI's competitor analysis and feature mapping, confirming that it is accurate, and highlighting agreement on a specific criticism based on their own customer insights. This is direct output checking and falls cleanly under evaluation.

**Turn 5:** Expected `passive_acceptance` → Got `evaluation` (confidence: 95%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: The human reviews the AI's suggestions, affirms their accuracy and utility, and then requests a specific modification (adding more nuance to the pricing comparison) based on their knowledge of what the board typically wants. This is targeted feedback on the AI's output, which fits the evaluation signal.

### 06-domain-shift.md

**Turn 1:** Expected `friction` → Got `evaluation` (confidence: 98%)
- Expected because: Pushes back on the AI's color suggestion. Provides a specific design-informed reason (rose gold is overdone in this space) and redirects toward their own aesthetic preference with a specific hex code.
- Classifier said: The human reviews the AI's specific color palette output, critiques the use of rose gold as unoriginal in the current market, and suggests a concrete alternative (deep forest green), explaining the impact of that choice. This is targeted, quality-focused feedback addressing elements of the AI's output.

**Turn 4:** Expected `contribution` → Got `evaluation` (confidence: 98%)
- Expected because: Provides detailed information about the typography that works on the physical amber glass — specific weight, point size, and how it reads at jar scale. This is expert knowledge from hands-on testing. Also shares the illustrator's style direction and production details (screen printing at 500 units).
- Classifier said: The human is responding directly to specific AI suggestions and technical considerations (e.g., type sizing, weight, print methods), describing what they've tested or decided, and confirming decisions based on firsthand review/testing. They comment on the suitability of Cormorant weight at different sizes, justify label color choices, and explain the reasoning behind print method choice, demonstrating review and assessment of concrete options raised by the AI.

**Turn 6:** Expected `capitulation` → Got `evaluation` (confidence: 90%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: The human is engaging with the AI's specific output by noting surprise about quarterly payments (confirming they were unaware), confirming their relevant income and expenses, and asking a clarifying question about a specific deduction the AI mentioned (home office). They are reviewing and responding to concrete details from the AI.

### 07-friction-heavy.md

**Turn 6:** Expected `steering` → Got `friction` (confidence: 98%)
- Expected because: Redirects the conversation toward the analysis approach. Preemptively warns against a surface-level answer ('don't just say thematic analysis'). This is direction-setting with a quality bar embedded.
- Classifier said: The human is pushing back on the common practice of invoking 'thematic analysis' without specificity, signaling that they want a more rigorous and precise analytic approach. They challenge a generic strategy and seek a more thoughtful direction.

**Turn 7:** Expected `evaluation` → Got `friction` (confidence: 92%)
- Expected because: AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection.
- Classifier said: The human is pushing back on the AI's characterization of Framework Analysis, arguing for its flexibility and correcting the AI's framing. They are challenging the AI's approach to describing the method, which fits the definition of friction. The rest of the message affirms grounded theory for this case and introduces a new analysis concern, but the key engagement is the correction of the AI's stance.

**Turn 8:** Expected `steering` → Got `delegation` (confidence: 97%)
- Expected because: Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work.
- Classifier said: The human is handing off a well-scoped writing task (draft a full methods section for a journal submission) with clear constraints (publishable quality, specified target journals, and defined subsections). These criteria provide quality expectations and structure, fitting the definition of delegation.

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 98%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: The human is reviewing the AI's specific draft methods section and providing feedback on style, prose rhythm, phrasing, and citation integration. They identify areas where the text sounds like it was generated by a language model and suggest specific improvements to make it more in line with CSCW standards. This is targeted, detailed feedback on the AI's output, characteristic of evaluation.

### 08-mixed-realistic.md

**Turn 1:** Expected `contribution` → Got `evaluation` (confidence: 93%)
- Expected because: Provides specific company context — actual OKR progress numbers, the hiring delay, and the pipeline situation. This is domain knowledge the AI cannot have.
- Classifier said: The human is reviewing the AI's proposed structure ('Structure is mostly right') and then proceeds to supply specific factual context reviewing their own Q4 results, highlighting particular points (OKR hits/misses and which miss matters most for leadership), thus both assessing the AI's work and providing necessary factual details for further steps.

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 95%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human reviews the AI's output, confirms its correctness, and requests a specific wording change based on sensitivity to executive preference. This is direct review and modification of the AI's work, which is evaluation.

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: The human accepts the AI's JSON output without substantive review or feedback ('yep looks right, thanks') and simply moves to a new task. They specify a basic requirement for the regex but do not shape the approach; their direction is minimal and does not rise to steering.

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 80%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: The human is setting a new direction for the conversation by introducing a real-world constraint about handling high write load during event bursts, prompting the AI to address scalability or resilience. This shapes what should be considered next in the API/system design.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 95%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The human is handing off a well-scoped task (writing tests) and specifies explicit quality criteria: verify flush on size and time triggers, and check circuit breaker fallback. This is targeted task delegation, not passive acceptance or capitulation.

### 10-short-conversation.md

**Turn 0:** Expected `steering` → Got `capitulation` (confidence: 95%)
- Expected because: Frames the decision and provides the key variables (two offers, compensation, role differences). Sets the agenda clearly.
- Classifier said: The human is providing detailed information about their situation but ultimately asks the AI to make the judgment on how they should approach the decision about the offers, without specifying decision criteria or constraints. They are seeking the AI's guidance on what factors to prioritize, offloading the thinking.

