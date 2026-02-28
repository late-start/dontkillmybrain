# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** gpt-5.1
**Overall Accuracy:** 53.3% (49/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 40% | 4/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 15% | 2/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 45% | 5/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 44% | 4/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 75% | 6/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 89% | 8/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 70% | 7/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 60% | 6/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 50% | 4/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 75% | 3/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 7 | 1 | 1 | 1 | . | 4 | 1 |
| friction | . | 6 | . | 1 | . | 1 | . |
| contribution | . | 1 | 9 | . | . | . | . |
| evaluation | 3 | 1 | 1 | 8 | 1 | . | . |
| passive_acceptance | 1 | 1 | 1 | 6 | 9 | 1 | 3 |
| delegation | 2 | . | 2 | 1 | . | 2 | . |
| capitulation | 1 | . | 2 | . | 4 | 1 | 8 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 7 | 15 | 47% | delegation (4) |
| friction | 6 | 8 | 75% | delegation (1) |
| contribution | 9 | 10 | 90% | friction (1) |
| evaluation | 8 | 14 | 57% | steering (3) |
| passive_acceptance | 9 | 22 | 41% | evaluation (6) |
| delegation | 2 | 7 | 29% | contribution (2) |
| capitulation | 8 | 16 | 50% | passive_acceptance (4) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 0:** Expected `steering` → Got `contribution` (confidence: 93%)
- Expected because: Opens with a clear problem statement and frames the debugging direction. Sets the agenda for the conversation.
- Classifier said: The human is providing detailed context (race condition description, symptoms, language, suspected area) to enable debugging, and setting up a collaborative walkthrough, but not yet assessing or correcting any specific AI output or approach.

**Turn 3:** Expected `evaluation` → Got `contribution` (confidence: 78%)
- Expected because: Engages with the AI's second suggestion substantively — agrees with part of the reasoning but identifies a specific gap in the analysis.
- Classifier said: The human briefly questions whether the CTE handles cross-partition behavior (light evaluation), but the main substance of the message is providing new operational context about their Redis setup and latency characteristics, which is information the AI needs to refine its advice. The focus is on sharing concrete system details (existing Redis usage, slot migrations, latency jitter), not on deeply critiquing the AI’s approach or specific output.

**Turn 4:** Expected `contribution` → Got `friction` (confidence: 89%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: The human pushes back on the AI’s suggested approach of a dedicated Redis instance as overkill and reframes the requirements (fast, ephemeral global check) to justify a different strategy (hash tags on existing cluster + DB fallback). They’re not just tweaking details but redirecting the overall solution design.

**Turn 5:** Expected `steering` → Got `friction` (confidence: 94%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The human is challenging the correctness of the proposed approach at the transaction/isolation level, arguing that the READ COMMITTED + ON CONFLICT pattern may not ensure idempotency and suggesting a different concurrency control (SERIALIZABLE or explicit locking). This is pushing back on the architectural approach rather than just pointing out a small bug in specific code.

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 97%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human is handing off a well-scoped implementation task with clear constraints (libraries, function signature, return behavior, error pattern) and schema details, asking the AI to write the Go function. They’re not critiquing prior output or redefining the approach, just specifying requirements for the next step.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 97%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human is actively reviewing the proposed implementation: they verify the concurrent case step-by-step, confirm that the overall behavior is correct ("This looks right"), and then suggest an improvement (adding a Prometheus metric on Redis failure). That is judgment of specific output plus a targeted modification, which fits evaluation rather than steering or contribution.

### 02-pure-delegation.md

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 93%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The human is directly answering the AI’s scoping questions by providing app name, audience, goal, and features. They are supplying context and requirements without critiquing or redirecting the AI’s approach, so this is pure information provision rather than steering or evaluation.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human simply agrees to proceed with the AI’s proposed structure without adding constraints, criteria, or directional changes. They are not evaluating specific elements or reshaping the plan, just accepting it and moving forward.

**Turn 3:** Expected `passive_acceptance` → Got `capitulation` (confidence: 73%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The human defers the design judgment to the AI without giving criteria or constraints, essentially asking the AI to decide what colors they should use. They are not steering with preferences or goals, just asking what to do.

**Turn 5:** Expected `passive_acceptance` → Got `capitulation` (confidence: 81%)
- Expected because: Agrees to add a testimonials section simply because the AI suggested it. No consideration of whether this is right for their product.
- Classifier said: The human does not provide criteria or direction, instead asking the AI to decide what might be missing or important on the page, effectively offloading judgment to the AI.

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 86%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: The human agrees with the AI’s proposed next step and allows it to proceed without adding new criteria, constraints, or substantive direction. They are not critiquing the approach or output, just accepting and moving forward.

**Turn 7:** Expected `passive_acceptance` → Got `friction` (confidence: 78%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The human is not just accepting the provided testimonials; they are redirecting the approach by asking for generic placeholder content instead of realistic persona-based testimonials. This changes the strategy/content type rather than merely tweaking details, so it’s friction rather than simple evaluation or steering.

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 85%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: The human casually accepts the AI’s existing approach (placeholders are fine) and simply agrees to proceed to the next step (mobile fixes) without shaping how or why. There’s no real review of quality (evaluation) or direction-setting (steering).

**Turn 9:** Expected `passive_acceptance` → Got `capitulation` (confidence: 84%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The user is asking the AI to choose or advise on the best deployment option without giving criteria beyond wanting it to be easy and fast. They are not defining constraints in detail or specifying what good looks like; they’re essentially asking the AI to decide what they should do.

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 97%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human agrees to follow the suggested approach without adding new constraints, feedback, or direction; they simply accept and proceed.

**Turn 11:** Expected `passive_acceptance` → Got `evaluation` (confidence: 82%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The human is reporting that the AI-guided deployment result is incorrect (styling broken on mobile) and implicitly asking for diagnosis. They are assessing the outcome of following the AI’s instructions rather than redefining goals or giving new info.

**Turn 12:** Expected `passive_acceptance` → Got `evaluation` (confidence: 75%)
- Expected because: Final acknowledgment. Confirms the fix with no curiosity about what was wrong or how to avoid it next time. No learning, just outcome-based acceptance.
- Classifier said: The human reports they identified and fixed the issue by moving the media query and verified that it now looks fine. They are directly assessing the AI’s diagnostic suggestion and confirming its correctness, which is evaluation rather than just passive acceptance.

### 03-progressive-reliance.md

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 88%)
- Expected because: Engages with the AI's feature engineering suggestions substantively. Confirms the churn definition, adds nuance about seasonal patterns, and pushes back on naive week-over-week trends. This is genuine assessment combined with domain knowledge.
- Classifier said: The human is shaping how the modeling should be done: clarifying the churn definition, constraining how temporal/login trend features should be engineered given a monthly usage cycle, suggesting a specific comparison strategy (same week of month), and excluding a feature (seat_count) due to data quality/utility concerns. This is directing the approach rather than just providing raw info or critiquing specific output.

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 91%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: The human both corrects/extends the schema (minor info contribution) and, more importantly, sets a key methodological constraint about using a reference date to avoid label leakage and ensure all features look backward. This is shaping *how* the pipeline should be designed, not just providing data or reviewing output, so it is primarily steering.

**Turn 6:** Expected `passive_acceptance` → Got `steering` (confidence: 86%)
- Expected because: Receives a full evaluation framework and responds with 'yeah let's do that.' No engagement with the choice of metrics, the threshold, or the cross-validation strategy. Earlier, they would have had opinions about this.
- Classifier said: The human is choosing between two alternative directions proposed by the AI (simple train/test vs. added time series cross-validation) and explicitly opts to include cross-validation, thereby steering the approach rather than just passively accepting.

**Turn 7:** Expected `capitulation` → Got `contribution` (confidence: 87%)
- Expected because: 'Can you just interpret these for me' — explicitly asking the AI to do the thinking. They received model results but are not even attempting to interpret them. This is a clear shift from earlier turns where they were actively analyzing.
- Classifier said: The human is providing concrete results (metrics and feature importances) from having run the code so the AI can interpret them. They are not critiquing the AI’s approach or output, just supplying data and asking for interpretation, which is pure information provision plus a follow-up request.

**Turn 8:** Expected `capitulation` → Got `delegation` (confidence: 93%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The human is handing off a well-scoped task (create risk scoring output and a non-technical executive summary for a VP), specifying audience, tone, and focus (no AUC, focus on at-risk accounts and actions). This defines clear constraints and success criteria without challenging the AI’s prior approach.

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 90%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The human has reviewed the AI’s specific output, judged it as good overall, and requested a precise, targeted modification (changing the specific accuracy metric wording). This is quality review of the output, not changing the overall direction or providing new context.

### 04-strategic-delegator.md

**Turn 0:** Expected `steering` → Got `delegation` (confidence: 94%)
- Expected because: Sets the overall agenda for the session — outlines the three endpoints they need and the tech stack. This is high-level direction-setting.
- Classifier said: The human is assigning a well-scoped coding task (scaffold three API endpoints) with clear constraints (Go, chi, Postgres via sqlc, match existing patterns) and defining a workflow (they will describe each endpoint, AI generates code, then they review). This is structured task handoff with criteria, not just acceptance or general direction-setting.

**Turn 3:** Expected `delegation` → Got `contribution` (confidence: 97%)
- Expected because: Hands off the second endpoint with detailed specs — the SQL query shape, pagination parameters, and response format. Again, all design decisions are already made.
- Classifier said: The human is supplying detailed specs, parameters, and function signatures for endpoint #2 without commenting on or assessing the previous AI output. This is pure context/information provision to enable the next task, not evaluation or steering of approach.

**Turn 4:** Expected `steering` → Got `evaluation` (confidence: 84%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: The human is reviewing the specific endpoint implementation, pointing out two concrete issues (cursor contents and redundant error helper), confirming that the pagination logic is otherwise correct, and asking for fixes. That’s detailed quality review of the AI’s output, i.e., evaluation. The later note about changing priorities is secondary and follows from that review, not primarily steering the whole conversation.

**Turn 5:** Expected `delegation` → Got `contribution` (confidence: 97%)
- Expected because: Provides the complete schema, validation rules, and error response format for the new preferences endpoint. Very precisely scoped — all design decisions are made, only execution is handed off.
- Classifier said: The human is supplying detailed specs and context for the preferences endpoint (request/response schema, validation rules, SQL function, rate limiting) without critiquing or redirecting the AI’s prior output. This is primarily adding information the AI needs, not evaluating or steering its approach.

**Turn 7:** Expected `delegation` → Got `steering` (confidence: 97%)
- Expected because: Hands off the test writing with specific constraints (table-driven tests, specific edge cases to cover, specific test helpers to use). Scoped execution task.
- Classifier said: The human is defining the next task (write tests), specifying structure (table-driven), enumerating exact cases to cover, and naming specific helpers to use. This sets direction and constraints rather than merely accepting or critiquing existing output.

### 05-false-evaluator.md

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 86%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: The human is explicitly checking and confirming the AI’s competitor analysis and feature mapping, and adds a small piece of corroborating evidence about Monday.com. This is reviewing and validating the AI’s specific output rather than setting new direction or just providing new info.

**Turn 5:** Expected `passive_acceptance` → Got `evaluation` (confidence: 86%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: The human is assessing the AI’s specific strategic recommendations (saying they’re right, predicting how the board will react) and then requesting a concrete modification (more nuanced pricing comparison and hidden costs for Monday.com). This is reviewing and refining the given output rather than redefining direction or just adding raw info.

### 06-domain-shift.md

**Turn 6:** Expected `capitulation` → Got `contribution` (confidence: 86%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: The human accepts the prior explanation and then provides concrete information about their income and situation (95K income, home office, Adobe/Figma usage) to enable more tailored advice, and asks a factual follow-up question. They’re not critiquing or redirecting the AI’s approach, just adding context and asking for more detail.

### 07-friction-heavy.md

**Turn 7:** Expected `evaluation` → Got `friction` (confidence: 71%)
- Expected because: AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection.
- Classifier said: The user is partially agreeing (leaning toward grounded theory) but explicitly pushing back on the assistant's characterization of Framework Analysis, arguing it is more flexible than described. That is a critique of the assistant's framing/approach, not just a correction of a detail, which fits friction. They then continue the discussion with a new methodological question.

**Turn 8:** Expected `steering` → Got `delegation` (confidence: 97%)
- Expected because: Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work.
- Classifier said: The human is handing off a well-scoped task (draft a full, publishable-quality methods section with specified subsections for particular venues) and providing clear constraints and quality expectations, without critiquing prior output or redefining the overall research direction.

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 95%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: The human is closely reviewing the AI-written methods section and giving specific, qualitative feedback on style, rhythm, phrasing, and citation integration. They are not redirecting the task itself, but assessing and critiquing the quality of this particular output and asking for revisions, which is evaluation.

### 08-mixed-realistic.md

**Turn 0:** Expected `steering` → Got `delegation` (confidence: 95%)
- Expected because: Defines the task (quarterly planning doc), the audience (leadership team), and the scope. Sets the agenda for the conversation.
- Classifier said: The human clearly hands off a well-scoped task (structuring and drafting a Q1 planning doc), specifies purpose, audience, length, and collaboration mode (they provide context/data; AI polishes). This defines constraints and quality expectations, which is characteristic of delegation rather than generic steering or capitulation.

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 96%)
- Expected because: Reviews the AI's proposed structure and gives substantive feedback. Flags one section as unnecessary (competitive landscape — already covered) and suggests adding something specific (technical debt section). Genuine quality assessment.
- Classifier said: The human is actively reshaping the structure and focus of the document by removing one section (competitive landscape) and adding another (technical debt), with reasons tied to stakeholder needs. They are directing what the work should include and why, not just accepting or reviewing specific output.

**Turn 3:** Expected `delegation` → Got `steering` (confidence: 90%)
- Expected because: AMBIGUOUS between passive_acceptance and delegation. Says 'yeah that works' to the outline (passive) but then hands off the Q4 review section with clear inputs — specific metrics and the narrative frame. The dominant action is the well-scoped delegation with detailed data handoff. Leaning delegation.
- Classifier said: The human accepts the proposed structure and then directs how to draft the Q4 review, specifying which metrics to emphasize and how to frame the hiring miss. They are shaping the content and tone (what to do and why), while also providing data, but the primary action is guiding the AI’s direction for the next output.

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 95%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human reviews the AI’s drafted priorities, confirms they are generally correct, and suggests a specific wording change based on CEO sensitivity. This is quality review of the concrete output, not setting new direction or just accepting passively.

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: The human briefly acknowledges the config as correct without detailed engagement and immediately moves to a new, separate task (regex request). There is no substantive review of the prior output, so this is acceptance plus a new request, not evaluation or steering.

**Turn 3:** Expected `steering` → Got `delegation` (confidence: 96%)
- Expected because: Introduces a new, significantly more complex task (user activity tracking feature) and sets the direction. Moving from simple utilities to a full feature requiring data modeling and API design.
- Classifier said: The human closes out the previous topic and assigns a new, well-scoped task: design a data model and API for user activity tracking, with clear goals (log actions, query for analytics). They define what is needed but are not primarily setting broad direction for an ongoing process or critiquing prior output.

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 86%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: The human accepts the implementation and then sets a new direction by introducing a scalability/throughput concern and asking how to handle burst traffic. They are defining a new problem for the AI to solve, not evaluating or critiquing the existing code.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 91%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The human accepts the proposed approach and then hands off a well-scoped follow-up task: write tests with specific behaviors to validate (flush on size trigger, flush on time trigger, and circuit breaker fallback capturing events). They define what needs to be tested and the criteria for success, which is characteristic of delegation rather than passive acceptance or steering.

### 10-short-conversation.md

**Turn 0:** Expected `steering` → Got `capitulation` (confidence: 87%)
- Expected because: Frames the decision and provides the key variables (two offers, compensation, role differences). Sets the agenda clearly.
- Classifier said: The human is asking the AI to guide their decision on a personal tradeoff (risk vs safety, comp vs title) without providing decision criteria beyond a basic description of options. They are effectively asking, "How should I think about this?" and deferring the judgment framework to the AI, rather than defining their own priorities or constraints. This fits capitulation more than steering or delegation.

