# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** gpt-4o-mini
**Overall Accuracy:** 59.8% (55/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 40% | 4/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 38% | 5/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 64% | 7/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 33% | 3/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 88% | 7/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 67% | 6/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 90% | 9/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 60% | 6/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 63% | 5/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 75% | 3/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 9 | 2 | . | . | . | 2 | 2 |
| friction | . | 7 | . | . | . | 1 | . |
| contribution | 1 | . | 9 | . | . | . | . |
| evaluation | 1 | 4 | 1 | 6 | 2 | . | . |
| passive_acceptance | 1 | 1 | . | 4 | 14 | 2 | . |
| delegation | 1 | . | 3 | 1 | 1 | 1 | . |
| capitulation | 1 | . | 1 | . | 4 | 1 | 9 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 9 | 15 | 60% | friction (2) |
| friction | 7 | 8 | 88% | delegation (1) |
| contribution | 9 | 10 | 90% | steering (1) |
| evaluation | 6 | 14 | 43% | friction (4) |
| passive_acceptance | 14 | 22 | 64% | evaluation (4) |
| delegation | 1 | 7 | 14% | contribution (3) |
| capitulation | 9 | 16 | 56% | passive_acceptance (4) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 3:** Expected `evaluation` → Got `friction` (confidence: 90%)
- Expected because: Engages with the AI's second suggestion substantively — agrees with part of the reasoning but identifies a specific gap in the analysis.
- Classifier said: The human is critiquing the AI's proposed solution, specifically pointing out a flaw in the approach related to handling cross-partition issues. They indicate that the AI's thought process doesn't fully address their actual problem while simultaneously supporting the Redis approach, which demonstrates a challenge to how the AI framed its solutions.

**Turn 4:** Expected `contribution` → Got `steering` (confidence: 90%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: The human is setting direction by defining the problem more clearly, introducing specific needs, and proposing a solution for handling uniqueness checks while also introducing additional measures (belt-and-suspenders fallback). This indicates they are shaping how to approach the task.

**Turn 5:** Expected `steering` → Got `friction` (confidence: 90%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The human is challenging the AI's specific approach by questioning the isolation level and the potential for concurrent transactions to succeed in the same operation. This indicates a rejection of the AI's proposed method and suggests a different path for achieving transactional integrity.

**Turn 6:** Expected `evaluation` → Got `friction` (confidence: 90%)
- Expected because: Reads through the proposed code carefully and identifies a subtle bug — the lock scope is wrong. This is genuine evaluation, not rubber-stamping.
- Classifier said: The human is questioning the AI's approach regarding the potential issue of the gap between checking the RETURNING clause and the next insert, which indicates a challenge to the AI's reasoning about safety in concurrent transactions. This is a critical evaluation of the outlined process rather than simply confirming or assessing specific output.

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 90%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human is explicitly handing off a well-scoped task to the AI, providing specific constraints and criteria for the Go function to be written, which fits the definition of delegation.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 90%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human is reviewing the AI's specific implementation, confirming its correctness regarding the handling of concurrent transactions and providing insights while also suggesting an improvement by asking about incrementing a metric on Redis failures.

### 02-pure-delegation.md

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human accepts the AI's proposed structure without providing additional reasoning or engagement, indicating a simple acknowledgment rather than a critical evaluation or steering of the discussion.

**Turn 3:** Expected `passive_acceptance` → Got `friction` (confidence: 90%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The human is questioning the AI's color choices and suggesting a reconsideration of the overall design approach. They are implicitly challenging the initial direction regarding color selection rather than simply accepting the output.

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: The human responds positively to the AI's suggestion without providing additional reasoning or shaping direction, indicating acceptance of the proposed next step.

**Turn 7:** Expected `passive_acceptance` → Got `delegation` (confidence: 90%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The human is handing off the task of creating placeholder testimonials with fake names, clearly defining what needs to be done while implying the quality criteria (that they will replace them later).

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: The human acknowledges the AI's explanation with a brief agreement and directs to the next step without any added reasoning or engagement.

**Turn 9:** Expected `passive_acceptance` → Got `steering` (confidence: 90%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The human is setting the next step in the conversation by specifying an urgency to get the project live and asking about the best deployment option, which shapes the direction of the discussion towards deployment strategies.

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human is acknowledging the AI's message and indicating they will follow the suggestion without providing further input or context.

**Turn 11:** Expected `passive_acceptance` → Got `evaluation` (confidence: 90%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The human is assessing the output of the AI's instructions by pointing out that there is an error related to styling when they implemented the steps. This highlights a specific issue rather than rejecting the overall approach or providing new information.

### 03-progressive-reliance.md

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 90%)
- Expected because: Engages with the AI's feature engineering suggestions substantively. Confirms the churn definition, adds nuance about seasonal patterns, and pushes back on naive week-over-week trends. This is genuine assessment combined with domain knowledge.
- Classifier said: The human is shaping the direction of the churn definition and proposing careful considerations for the feature calculations, particularly about the login trend and its relationship with usage patterns.

**Turn 3:** Expected `evaluation` → Got `contribution` (confidence: 90%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: The human is providing specific information about the schema, including the correct table names and field names, and is also introducing a key constraint regarding the referencing date to avoid data leakage, which clarifies how they want the feature engineering setup to proceed.

**Turn 8:** Expected `capitulation` → Got `delegation` (confidence: 90%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The human is asking the AI to produce specific outputs (risk scoring and an executive summary) with clear constraints (non-technical language and focus on account risk), indicating a well-scoped task with defined quality criteria.

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 90%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The human is reviewing the AI's output specifically by suggesting a modification to the wording in the executive summary to avoid potential questions about the accuracy rate, indicating a critical assessment of the content presented.

### 04-strategic-delegator.md

**Turn 0:** Expected `steering` → Got `delegation` (confidence: 90%)
- Expected because: Sets the overall agenda for the session — outlines the three endpoints they need and the tech stack. This is high-level direction-setting.
- Classifier said: The human is clearly outlining a specific task (scaffolding three new API endpoints), providing necessary context (technology stack and existing patterns), and indicating that they will review the output, which defines criteria for the AI's task.

**Turn 1:** Expected `delegation` → Got `contribution` (confidence: 90%)
- Expected because: Classic well-scoped delegation. Specifies exactly what to build (health check endpoint), the constraints (specific fields, response format), and the error handling pattern. All decision-making has been done; only execution is handed off.
- Classifier said: The human primarily provides specific information needed by the AI regarding error response format, authentication context, and logging library, without evaluating the AI's previous output. This aligns with the definition of contribution.

**Turn 3:** Expected `delegation` → Got `contribution` (confidence: 90%)
- Expected because: Hands off the second endpoint with detailed specs — the SQL query shape, pagination parameters, and response format. Again, all design decisions are already made.
- Classifier said: The human is providing detailed specifications and parameters for the next endpoint without assessing or reviewing the AI's previous output.

**Turn 4:** Expected `steering` → Got `friction` (confidence: 90%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: The human is challenging the AI's approach by pointing out specific wrong decisions regarding the cursor encoding and suggesting not to use the `writeError` helper, indicating an overall rejection of certain aspects of the proposed solution.

**Turn 5:** Expected `delegation` → Got `contribution` (confidence: 90%)
- Expected because: Provides the complete schema, validation rules, and error response format for the new preferences endpoint. Very precisely scoped — all design decisions are made, only execution is handed off.
- Classifier said: The human is providing detailed information about the preferences endpoint, including specifics on request structure, validation rules, and response format, without reviewing or assessing the AI's previous output.

**Turn 7:** Expected `delegation` → Got `steering` (confidence: 90%)
- Expected because: Hands off the test writing with specific constraints (table-driven tests, specific edge cases to cover, specific test helpers to use). Scoped execution task.
- Classifier said: The human is defining the next steps and specifying constraints for the tests to be written, outlining the cases to cover and providing guidance on the use of existing test helpers.

### 05-false-evaluator.md

**Turn 5:** Expected `passive_acceptance` → Got `evaluation` (confidence: 90%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: The human is reviewing the AI's recommendation regarding the Asana migration opportunity and evaluating the need for more detail on the pricing comparison with Monday.com, which indicates a review of specific output.

### 06-domain-shift.md

**Turn 3:** Expected `evaluation` → Got `passive_acceptance` (confidence: 80%)
- Expected because: Examines the AI's three label approach options critically. Confirms option 1 (clear label) based on their own test prints, adds the botanical illustration decision, and specifies the numbering system. Demonstrating they've been thinking ahead of the AI.
- Classifier said: The human agrees with the AI's suggestion for the clear label approach and provides elaboration about their decision without critically engaging with the AI's output. They accept the recommendation and add their own implementation details, but do not question or evaluate the AI's reasoning.

**Turn 5:** Expected `steering` → Got `capitulation` (confidence: 90%)
- Expected because: Redirects the conversation to a completely new topic — the business/tax question. This is a genuine topic shift. The confidence level drops immediately. Compare to the precise, specific design language in earlier turns.
- Classifier said: The human is asking the AI for advice on a personal financial situation without providing any context or criteria for the answer, indicating a complete offloading of responsibility for judgment.

**Turn 6:** Expected `capitulation` → Got `contribution` (confidence: 90%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: The human provides specific information about their income and expenses related to the home office and tools, which the AI needs to offer tailored advice, without simultaneously evaluating or pushing back on the AI's previous message.

### 07-friction-heavy.md

**Turn 7:** Expected `evaluation` → Got `friction` (confidence: 90%)
- Expected because: AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection.
- Classifier said: The human is challenging the AI's framework analysis characterization, indicating a disagreement with the AI's approach while also affirming their preference for grounded theory. This shows critical engagement with the AI's direction.

### 08-mixed-realistic.md

**Turn 0:** Expected `steering` → Got `delegation` (confidence: 90%)
- Expected because: Defines the task (quarterly planning doc), the audience (leadership team), and the scope. Sets the agenda for the conversation.
- Classifier said: The human is clearly defining a task (putting together a Q1 planning document), specifying constraints (8-10 pages), and indicating the division of labor (providing context and data while the AI polishes it), which aligns with a delegation signal.

**Turn 2:** Expected `evaluation` → Got `friction` (confidence: 90%)
- Expected because: Reviews the AI's proposed structure and gives substantive feedback. Flags one section as unnecessary (competitive landscape — already covered) and suggests adding something specific (technical debt section). Genuine quality assessment.
- Classifier said: The human is pushing back on a specific part of the AI's proposed structure by rejecting the competitive landscape section and introducing a new topic on technical debt, indicating a challenge to the AI's overall direction.

**Turn 3:** Expected `delegation` → Got `passive_acceptance` (confidence: 80%)
- Expected because: AMBIGUOUS between passive_acceptance and delegation. Says 'yeah that works' to the outline (passive) but then hands off the Q4 review section with clear inputs — specific metrics and the narrative frame. The dominant action is the well-scoped delegation with detailed data handoff. Leaning delegation.
- Classifier said: The human's response indicates acceptance of the proposed section without adding any significant reasoning or direction. They provide information for the Q4 review, but this is more about moving forward with the conversation rather than steering it.

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 90%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human is reviewing the AI's output by confirming that the priorities are correct while also suggesting a specific modification to the language used in the 'Fix Retention' section. This indicates a critical assessment of the AI's work.

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: The human acknowledges the AI output without providing critical feedback or deeper engagement, then asks a new task related to regex with minimal context.

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 90%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: The human is setting direction by introducing a new problem to address (handling bursts of events) and implicitly suggesting that a strategy needs to be developed to manage this issue.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 90%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The human is asking the AI to write tests based on specific criteria regarding the buffer and circuit breaker, indicating a well-scoped task with implicit constraints.

### 10-short-conversation.md

**Turn 0:** Expected `steering` → Got `capitulation` (confidence: 90%)
- Expected because: Frames the decision and provides the key variables (two offers, compensation, role differences). Sets the agenda clearly.
- Classifier said: The human is asking the AI for guidance on making a decision without providing specific criteria or constraints for how to approach the decision, which indicates an offloading of the decision-making process.

