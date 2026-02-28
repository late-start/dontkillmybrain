# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** claude-sonnet-4-6
**Overall Accuracy:** 62.0% (57/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 60% | 6/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 15% | 2/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 55% | 6/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 78% | 7/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 75% | 6/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 56% | 5/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 70% | 7/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 90% | 9/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 63% | 5/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 100% | 4/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 12 | . | . | 2 | . | 1 | . |
| friction | . | 4 | . | 3 | . | 1 | . |
| contribution | 1 | . | 7 | 2 | . | . | . |
| evaluation | . | . | 1 | 12 | . | . | . |
| passive_acceptance | 2 | . | 1 | 4 | 11 | 1 | 3 |
| delegation | . | . | 1 | 1 | . | 5 | . |
| capitulation | 3 | . | 1 | . | 5 | 1 | 6 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 12 | 15 | 80% | evaluation (2) |
| friction | 4 | 8 | 50% | evaluation (3) |
| contribution | 7 | 10 | 70% | evaluation (2) |
| evaluation | 12 | 14 | 86% | contribution (1) |
| passive_acceptance | 11 | 22 | 50% | evaluation (4) |
| delegation | 5 | 7 | 71% | evaluation (1) |
| capitulation | 6 | 16 | 38% | passive_acceptance (5) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 4:** Expected `contribution` → Got `steering` (confidence: 88%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: The human is rejecting one option (dedicated Redis), reasoning through the actual requirements, and defining a specific architectural approach with clear constraints and rationale. This goes beyond passive acceptance or evaluation — they're actively shaping direction: hash tags on existing cluster + unpartitioned fallback table in DB transaction. The 'let me think about what we actually need' framing and the articulation of why persistence isn't required shows deliberate problem decomposition, not just moving to the next step.

**Turn 5:** Expected `steering` → Got `evaluation` (confidence: 92%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The human is reviewing the AI's specific proposed flow and identifying a correctness issue in step 2a — specifically that READ COMMITTED isolation could allow two concurrent transactions to both succeed on the idempotency_keys insert. This is targeted critique of the AI's output (the transaction design), with domain knowledge applied to catch a concurrency bug. It's not rejecting the overall approach (dual Redis+DB layer remains intact), just flagging a specific technical flaw in the transaction isolation level and proposing a fix direction (SERIALIZABLE or row-level lock).

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 95%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human is handing off a well-scoped implementation task with explicit constraints and quality criteria: specific libraries (pgx/v5, go-redis/v9), function signature (parameters and return types), error wrapping pattern, exact table schemas, and behavioral requirements (return existing ID on duplicate). This is a fully specified delegation with clear criteria for what 'good' looks like.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 92%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human explicitly verified the concurrent execution path by tracing through it mentally ('I traced through the concurrent case mentally'), confirmed the overall logic is correct ('This looks right'), and then identified a specific gap in the Redis failure handling (missing Prometheus metric increment). This is reviewing the AI's specific output and noting what's missing — classic evaluation behavior, even though they're also providing context about their monitoring stack.

### 02-pure-delegation.md

**Turn 0:** Expected `capitulation` → Got `steering` (confidence: 95%)
- Expected because: Extremely vague request with no constraints, structure, or scoping. 'I need a landing page' gives the AI total decision-making authority over implementation.
- Classifier said: The human is opening the conversation by defining the problem (landing page for a meal planning app), establishing the goal, and setting a key constraint (they don't know HTML, so the AI needs to do most of the work). This is classic steering — setting direction and framing what needs to be done.

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 85%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The human is primarily providing the information the AI requested — app name, target audience, CTA, and features — without evaluating or steering beyond answering the questions. The casual 'just go with that' at the end leans slightly toward capitulation, but the overall response is answering the AI's specific questions with concrete information.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 95%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human offers no critique, modification, or reasoning — just brief approval of a detailed structural proposal. The complexity of the AI's output (5-section page layout with color palette) far exceeds what this response demonstrates engaging with.

**Turn 3:** Expected `passive_acceptance` → Got `capitulation` (confidence: 85%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The human is asking the AI to make a judgment call on color choices without providing any criteria — no brand identity, target audience preferences, mood, or other constraints. They're offloading the decision entirely to the AI with 'should I go with something different?' This is pure capitulation: no criteria for what 'good' looks like, just asking the AI to decide.

**Turn 5:** Expected `passive_acceptance` → Got `capitulation` (confidence: 82%)
- Expected because: Agrees to add a testimonials section simply because the AI suggested it. No consideration of whether this is right for their product.
- Classifier said: The human is offloading the judgment entirely to the AI — asking it to identify what's missing without providing any criteria for what 'important' means in this context. They've explicitly passed on the AI's invitation to evaluate specific elements ('looks fine') and are now asking the AI to decide what matters next. No constraints or quality criteria are provided.

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 85%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: The human agrees with the AI's prioritization without adding any criteria, constraints, or reasoning of their own. 'That makes sense' acknowledges the AI's logic but doesn't process or evaluate it meaningfully. They're simply rubber-stamping the AI's suggestion and moving forward.

**Turn 7:** Expected `passive_acceptance` → Got `steering` (confidence: 82%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The human is redirecting the approach — instead of using the realistic-looking testimonials the AI provided, they want placeholder/fake names instead. This changes the direction of what was produced, establishing a new constraint ('placeholder for now, real ones later'). It's not evaluating the specific output for quality issues, nor is it pure friction rejecting the overall approach — it's redirecting what the content should look like.

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: The human briefly acknowledges the AI's explanation without meaningfully processing it, then agrees to proceed. 'Yeah do the mobile thing' is simply moving to the next step without adding any constraints, criteria, or reasoning about how to approach it. Classic passive acceptance.

**Turn 9:** Expected `passive_acceptance` → Got `capitulation` (confidence: 82%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The human is asking the AI to make a decision for them ('Should I use Netlify or Vercel or something?') without providing any criteria for what 'best' or 'easiest' means beyond a vague preference for simplicity. They're offloading the judgment entirely. While 'easiest' is a mild constraint, they're not defining requirements, constraints, or quality criteria — they're asking the AI to pick and explain. The time pressure mention ('pretty soon') adds context but doesn't define criteria. This leans capitulation over delegation because there's no scoped task with quality criteria, just an open question about which path to take.

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 95%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human briefly acknowledges the AI's detailed instructions without engaging with the content, asking follow-up questions, or providing new direction. 'Ok I'll try that. thanks' shows no processing of the steps given and no shaping of next actions.

**Turn 11:** Expected `passive_acceptance` → Got `steering` (confidence: 72%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The human is introducing a new problem/issue that redirects the conversation from the completed checklist to troubleshooting. They're defining what needs to be done next ('fix this error') rather than evaluating specific AI output (no code was produced in the visible AI turn) or providing pure information. While there's some contribution element (describing the symptom), the primary action is redirecting toward a new goal.

### 03-progressive-reliance.md

**Turn 3:** Expected `evaluation` → Got `contribution` (confidence: 82%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: The human is primarily providing schema details the AI needs (table name corrections, field name differences, join path through users table) and adding a technical constraint (reference date approach for data leakage prevention). While the last part about the reference date approach has a directive quality, the human is not reviewing/evaluating AI output — they're supplying information and constraints to enable the next step. The reference date request reads more as a contribution of a design requirement than steering, since the human isn't decomposing the overall problem or redirecting, just adding a constraint alongside factual corrections.

**Turn 4:** Expected `contribution` → Got `evaluation` (confidence: 82%)
- Expected because: Provides the actual date format and additional context about a data pipeline migration that the AI would have no way of knowing. This is domain knowledge from direct experience.
- Classifier said: The human is reviewing the AI's code and identifying a specific issue that needs to be fixed (varchar timestamps requiring explicit casting in the queries). They confirm the overall approach is correct ('exactly what I had in mind') while pointing out a concrete modification needed — this is evaluation of specific output rather than pure information contribution, even though they're providing technical context about their schema.

**Turn 7:** Expected `capitulation` → Got `delegation` (confidence: 82%)
- Expected because: 'Can you just interpret these for me' — explicitly asking the AI to do the thinking. They received model results but are not even attempting to interpret them. This is a clear shift from earlier turns where they were actively analyzing.
- Classifier said: The human has run the code, collected results, and is now handing off the interpretation task with specific data provided (AUC scores, standard deviations, top features). They've defined the task clearly ('interpret these for me') and supplied the necessary inputs. This is delegation — a well-scoped task with the criteria implicit in 'interpret these results.' It's not capitulation because the human has provided concrete outputs to interpret, not asking the AI to make open-ended judgments without grounding.

**Turn 8:** Expected `capitulation` → Got `steering` (confidence: 82%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The human is accepting the AI's offer but actively shaping the direction of the next deliverable — specifying the audience (VP of Customer Success), the timeline (Friday), and a key constraint about framing (non-technical, focus on at-risk accounts and actions rather than model metrics). This goes beyond passive acceptance by providing meaningful direction about how to approach the exec summary, not just 'yes please.'

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The human reviewed the AI's specific output (the executive summary) and is requesting a targeted modification based on their assessment of how a specific phrase will land with the audience. They're catching a potential communication issue ('I don't want her fixating on the number') and requesting a concrete change to a specific element. This is evaluation — reviewing the output and noting what needs to change — not friction about the overall approach.

### 04-strategic-delegator.md

**Turn 1:** Expected `delegation` → Got `contribution` (confidence: 82%)
- Expected because: Classic well-scoped delegation. Specifies exactly what to build (health check endpoint), the constraints (specific fields, response format), and the error handling pattern. All decision-making has been done; only execution is handed off.
- Classifier said: The human is primarily providing the context and information the AI asked for (error format, auth pattern, logging library) and then scoping the first endpoint with specific requirements. They're answering the AI's questions and laying out constraints/patterns, not reviewing any AI-produced output. While there's some steering in defining the first task, the dominant action is providing the technical context the AI needed to proceed — making this primarily a contribution of domain/system knowledge.

**Turn 4:** Expected `steering` → Got `evaluation` (confidence: 92%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: The human is reviewing the AI's specific output and identifying concrete issues: (1) the cursor encoding is wrong because it only uses ID and not created_at+ID, causing incorrect pagination results, and (2) the writeError helper is redundant given an existing httputil package. They also confirm the pagination logic is correct. This is direct evaluation of the AI's code output — catching specific bugs and requesting targeted fixes. The pivot to a new endpoint at the end is passive sequencing but the dominant action is reviewing and correcting the code.

### 05-false-evaluator.md

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 85%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: The human is reviewing the AI's specific output (competitor profiles and feature matrix), confirming its accuracy ('the feature mapping looks right'), and validating a specific analytical point about Monday.com. They're also adding a piece of domain evidence (customer feedback about Monday.com switchers), but this is used to confirm the AI's analysis rather than introduce new context independently. The primary action is checking and affirming the AI's work.

**Turn 5:** Expected `passive_acceptance` → Got `evaluation` (confidence: 85%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: The human is reviewing the AI's output — confirming what works ('that's exactly right,' 'board will resonate') and identifying a specific gap ('pricing comparison needs more nuance'). The request to 'flesh out the hidden costs for Monday.com' is a targeted modification based on quality review of the existing content, not a rejection of the overall approach. Classic evaluation pattern: partial confirmation + specific correction/elaboration request.

### 06-domain-shift.md

**Turn 1:** Expected `friction` → Got `evaluation` (confidence: 92%)
- Expected because: Pushes back on the AI's color suggestion. Provides a specific design-informed reason (rose gold is overdone in this space) and redirects toward their own aesthetic preference with a specific hex code.
- Classifier said: The human is reviewing the AI's specific palette proposal — rejecting rose gold as an accent choice with clear reasoning, confirming the overall warm/clay direction is right, and proposing a specific alternative (#2D5F2D forest green). This is direct engagement with the AI's output: keeping some elements, discarding one specific element, and substituting with a concrete alternative. The scope is targeted at the AI's specific suggestions rather than rejecting the overall approach.

**Turn 4:** Expected `contribution` → Got `evaluation` (confidence: 92%)
- Expected because: Provides detailed information about the typography that works on the physical amber glass — specific weight, point size, and how it reads at jar scale. This is expert knowledge from hands-on testing. Also shares the illustrator's style direction and production details (screen printing at 500 units).
- Classifier said: The human is directly responding to the AI's specific output — testing the typography suggestion and reporting findings (Cormorant at light weight fails below 9pt, so they're adjusting to regular weight at 11pt), answering the single-color vs multi-color question, and confirming/rejecting the print method suggestion (choosing screen printing over the vinyl alternative). They're reviewing the AI's recommendations against their own testing and domain knowledge, which is evaluation even though it's largely confirmatory with some corrections.

**Turn 6:** Expected `capitulation` → Got `contribution` (confidence: 82%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: The human is primarily providing new information the AI requested (or that's needed to continue): their income figure ($95K), and the specific deductions they qualify for (home office, Adobe CC, Figma). They're also asking a follow-up question about the home office deduction. While they briefly acknowledge the AI's point about quarterly payments ('yikes'), they're not evaluating the AI's output — they're feeding in their specific details and asking for clarification on a topic the AI introduced. This is predominantly information provision with a question, which fits contribution best.

**Turn 7:** Expected `capitulation` → Got `passive_acceptance` (confidence: 72%)
- Expected because: 'What should I actually do first?' — asking the AI to prioritize their tax obligations. In the design domain, they would never ask the AI to sequence their own work. They're fully deferring to the AI's judgment in an unfamiliar domain.
- Classifier said: The human briefly acknowledges the tax picture ('ok yeah I'll do that') without engaging with the specifics — no verification of numbers, no questions about the methods, no pushback. Then they ask 'what's the order of operations?' which is sequencing/next-step, but without any shaping of HOW or WHY. This is essentially asking the AI to take over and structure their workflow for them, with no criteria provided. The response shows no evidence of processing the detailed tax breakdown.

### 07-friction-heavy.md

**Turn 3:** Expected `friction` → Got `evaluation` (confidence: 92%)
- Expected because: Disagrees with the AI's sample size recommendation. Brings their own methodological knowledge (Sim et al.'s critique, information-theoretic saturation from Hennink et al.) to challenge the AI's 15-20 recommendation. This is informed, citation-backed pushback.
- Classifier said: The human briefly accepts the screenshot approach ('clever... I can work with that') then critically reviews the AI's specific claim about sample size. They're not rejecting the overall research approach (friction), but rather targeting a specific output — the '15-20 participants' recommendation — by citing counter-evidence (Sim et al. 2018 critique of Guest et al.) and proposing an alternative metric (information-theoretic saturation). This is evaluation: checking the AI's specific recommendation, finding it inadequate, and offering a correction grounded in domain knowledge.

**Turn 8:** Expected `steering` → Got `delegation` (confidence: 88%)
- Expected because: Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work.
- Classifier said: The human is handing off a well-scoped writing task with clear constraints and quality criteria: publishable-quality, specific journal targets (HCI or CSCW), defined structure (study design, participants, data collection, analysis subsections). The 'yeah' opener is brief acceptance of the prior message, but the primary action is delegation with meaningful specification of deliverable requirements.

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 92%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: The human is reviewing the AI's specific output (the methods section draft) and identifying concrete issues: uniform sentence structure, specific phrases like 'this design choice was critical,' parenthetical citation style vs. integrated citations. These are targeted critiques of the text's quality and style, not a rejection of the overall approach or direction. The human even models the correct citation format. This is evaluation — checking the work and noting what needs fixing.

### 08-mixed-realistic.md

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 95%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human reviewed the AI's substantial output (a full priorities section) and responded with a specific modification request (rename 'Fix Retention' to 'Restore Retention Health') with a clear rationale (CEO sensitivity to framing). This is targeted feedback on specific output content, which is evaluation.

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `unknown` (confidence: 0%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: Classification failed: Unexpected non-whitespace character after JSON at position 940 (line 3 column 1)

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 72%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: The human briefly acknowledges the output ('nice, that works') and then introduces a new problem domain — burst traffic handling and queue/buffer strategies. This shifts the conversation's direction to a new technical challenge rather than evaluating the existing code. The acknowledgment is too brief to constitute meaningful evaluation of the complex code, and the core action is opening a new problem ('how should I handle...'), which is steering. It's not quite capitulation because they've provided meaningful context (product launch scenario, login bursts) that frames the problem, though they are asking the AI to propose solutions.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 92%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The human accepts the AI's recommendation without substantive evaluation, then hands off a well-scoped testing task with explicit quality criteria: verify size-triggered flush, time-triggered flush, and circuit breaker fallback capture. These are concrete, testable requirements — classic delegation with defined scope and success conditions.

