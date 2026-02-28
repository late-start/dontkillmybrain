# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** claude-haiku-4-5-20251001
**Overall Accuracy:** 57.6% (53/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 50% | 5/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 23% | 3/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 55% | 6/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 56% | 5/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 75% | 6/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 56% | 5/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 80% | 8/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 80% | 8/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 50% | 4/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 75% | 3/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 12 | . | . | 2 | . | . | 1 |
| friction | . | 5 | . | 2 | . | 1 | . |
| contribution | . | 1 | 8 | 1 | . | . | . |
| evaluation | . | 2 | 1 | 10 | 1 | . | . |
| passive_acceptance | 3 | 1 | 1 | 5 | 11 | 1 | . |
| delegation | 2 | . | 3 | 1 | . | 1 | . |
| capitulation | 1 | . | 2 | . | 5 | 2 | 6 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 12 | 15 | 80% | evaluation (2) |
| friction | 5 | 8 | 63% | evaluation (2) |
| contribution | 8 | 10 | 80% | friction (1) |
| evaluation | 10 | 14 | 71% | friction (2) |
| passive_acceptance | 11 | 22 | 50% | evaluation (5) |
| delegation | 1 | 7 | 14% | contribution (3) |
| capitulation | 6 | 16 | 38% | passive_acceptance (5) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 3:** Expected `evaluation` → Got `friction` (confidence: 92%)
- Expected because: Engages with the AI's second suggestion substantively — agrees with part of the reasoning but identifies a specific gap in the analysis.
- Classifier said: The human is rejecting the AI's proposed approach (specifically the CTE solution and expressing qualified doubt about Redis as the primary solution) by identifying a fundamental flaw (cross-partition NOT EXISTS limitation) and introducing a critical constraint the AI missed (existing Redis cluster instability). This is not evaluation of specific output quality—it's challenging the overall direction/strategy with domain evidence. The human is saying 'your approach won't work at our scale given our constraints,' which is classic friction.

**Turn 4:** Expected `contribution` → Got `friction` (confidence: 87%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: The human is rejecting the AI's suggested approach (dedicated Redis instance) and reframing the problem with different criteria (ephemeral check, 60-second TTL acceptable). This is a directional challenge: 'overkill' + 'let me think about what we actually need' signals the human is reassessing the strategy itself, not just tweaking implementation details. The human then proposes an alternative direction (hash tags + DB fallback) rather than asking for fixes to the dedicated instance proposal. This is approaching/friction territory, not evaluation of the Redis suggestion's technical details.

**Turn 5:** Expected `steering` → Got `evaluation` (confidence: 92%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The human is reviewing the AI's specific architectural proposal and catching a concrete correctness issue: the isolation level and locking behavior within the transaction. They're pointing out that step 2a has a race condition under READ COMMITTED isolation. This is targeted feedback on the AI's OUTPUT (the specific transaction design), not a rejection of the overall approach (which they accepted with 'Almost'). They're verifying the logic and noting a missing constraint.

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 95%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human is handing off a well-scoped, concrete task with clear constraints and quality criteria: specific libraries (pgx/v5, go-redis/v9), required function signature and parameters, exact schema, error handling pattern, and success/failure return behavior. This is a classic delegation — the human has defined the problem, constraints, and success criteria, and is asking the AI to execute.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 92%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human is reviewing the AI's specific code output. They verify the concurrent logic by tracing through it ('I traced through the concurrent case mentally'), confirm correctness ('This looks right'), acknowledge a specific design choice (the Redis layer preventing contention), and then identify a missing element in the implementation (lack of Prometheus metric increment on Redis failure). All of this is checking and assessing the AI's work against their own domain knowledge and operational requirements. The metric request is a specific modification based on quality review, not a redirect of overall approach.

### 02-pure-delegation.md

**Turn 0:** Expected `capitulation` → Got `delegation` (confidence: 85%)
- Expected because: Extremely vague request with no constraints, structure, or scoping. 'I need a landing page' gives the AI total decision-making authority over implementation.
- Classifier said: The human is handing off a well-scoped task (build a landing page for a meal planning app) with a clear constraint (human lacks technical skills and needs AI to 'do most of the heavy lifting'). However, confidence is 0.85 rather than higher because there are no explicit quality criteria, design preferences, or content specifications provided — only the task and acknowledgment of capability gap. This sits at the boundary between delegation (task + constraint acknowledged) and mild capitulation (no quality criteria defined). The human is clearly expecting the AI to make judgments about what a good landing page looks like, which slightly lowers confidence.

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 85%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The human is providing factual information the AI requested: app name (MealMate), target audience (busy professionals), call-to-action (waitlist signup), features (meal planning, grocery lists, recipes), and constraints (no brand colors yet). The human is answering the AI's discovery questions to supply necessary context. The phrase 'just go with that' is casual acceptance of the information handoff, not steering (no reasoning about direction) or delegation (the human isn't defining quality criteria or constraints for how to build it). This is pure information provision.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human accepts the AI's proposed structure without meaningful engagement. 'Looks good' is brief acknowledgment that moves forward without processing, reasoning, or shaping the direction. There's no evaluation of specific elements, no steering that adds constraints or reasoning, and no contribution of new information. This is pure sequencing approval.

**Turn 3:** Expected `passive_acceptance` → Got `friction` (confidence: 85%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The human is challenging the AI's design choice (the color palette) by questioning whether the approach is right. This isn't about reviewing the code quality or catching a bug — it's about rejecting or reconsidering the overall direction the AI chose. The human is asking 'should we do this differently?' rather than 'here's what's wrong with your output.' This is friction with the color/branding strategy, not evaluation of code correctness.

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: The human accepts the AI's prioritization and delegates the next task ('add the testimonials') without adding reasoning, constraints, or shaping how the work should be done. They confirm agreement ('that makes sense') but don't steer direction, evaluate the specific output, or contribute domain knowledge. This is a brief acknowledgment that moves forward without meaningful engagement beyond accepting the AI's framing.

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The human is reviewing the AI's specific output (the testimonials section) and providing targeted feedback about one aspect: the personas used. They're asking for a modification to the existing work based on their assessment that real testimonials aren't ready yet. This is quality review and refinement of the concrete output, not rejection of the overall approach or direction (which would be friction). The human accepts the structure and styling but wants the content adjusted.

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: Human acknowledges the placeholder names are fine (brief, unreasoned acceptance of the AI's explanation) and then simply names the next task ('do the mobile thing') without shaping HOW to approach it or adding reasoning about priorities/constraints. This is sequencing without engagement.

**Turn 9:** Expected `passive_acceptance` → Got `steering` (confidence: 92%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The human is introducing a new goal/constraint (getting the site live soon) and asking the AI to help evaluate deployment options. This is setting direction for the next phase of work, shifting from local development to production deployment. The question 'What's the easiest way?' is asking the AI to help prioritize among options, but the human is defining the problem space (deploy soon, single HTML file).

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human acknowledges the AI's suggestion and accepts the direction without adding meaningful engagement. They don't ask clarifying questions, provide constraints, evaluate the specifics, or reshape the approach. 'Ok I'll try that. thanks' is a brief acknowledgment that moves forward without processing or shaping the work.

**Turn 11:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The human is reporting a specific issue with the AI's output (styling broken on mobile) and implicitly asking the AI to review/debug. They're checking whether the provided solution works as intended. This is evaluation of the AI's deliverable, not steering (no new direction), friction (not rejecting the approach), or contribution (not providing new context). The 'what did I do wrong' phrasing suggests they're looking for verification/debugging of the implementation, which is evaluation.

### 03-progressive-reliance.md

**Turn 3:** Expected `evaluation` → Got `contribution` (confidence: 92%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: The human is providing domain knowledge about their actual schema (table names, column names, join paths) and introducing a constraint (reference date for temporal correctness). They're not evaluating the AI's proposed approach — they're accepting it and adding context the AI needs to proceed. The reference date requirement is important context, but it's framed as a constraint to incorporate going forward, not as criticism of what the AI suggested. This is pure information provision to unblock implementation.

**Turn 6:** Expected `passive_acceptance` → Got `steering` (confidence: 92%)
- Expected because: Receives a full evaluation framework and responds with 'yeah let's do that.' No engagement with the choice of metrics, the threshold, or the cross-validation strategy. Earlier, they would have had opinions about this.
- Classifier said: The human is setting direction by deciding to add cross-validation to the pipeline. They're making a choice about what to include in the modeling approach ('let's do the cross validation too') and implicitly defining the scope of work going forward. This is directional — they're saying 'we should include this' — rather than evaluating the existing code, contributing new context, or passively accepting. The brevity doesn't change the classification; the human is actively steering what happens next.

**Turn 7:** Expected `capitulation` → Got `contribution` (confidence: 92%)
- Expected because: 'Can you just interpret these for me' — explicitly asking the AI to do the thinking. They received model results but are not even attempting to interpret them. This is a clear shift from earlier turns where they were actively analyzing.
- Classifier said: The human is providing concrete experimental results and observed outputs (AUC scores, standard deviations, feature importance rankings) without simultaneously assessing or evaluating the quality of the AI's code or approach. They're supplying domain-specific data that the AI needs to interpret — the raw observations from running the model. This is pure information provision to enable the next step of analysis, not review of the AI's work.

**Turn 8:** Expected `capitulation` → Got `delegation` (confidence: 92%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The human is handing off two well-scoped, concrete tasks (risk scoring output + exec summary) with clear constraints ('non-technical', 'Friday deadline', 'VP audience focus on accounts at risk and actions'). The human is not simultaneously assessing the AI's prior work or providing new context — they're commissioning next-phase deliverables with quality criteria. This is textbook delegation.

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The human is reviewing the AI's specific output (the executive summary text) and requesting a targeted modification based on quality assessment. They're identifying a potential issue with how the metric is presented — not rejecting the approach or analysis, but refining how a specific claim is worded to improve stakeholder communication. This is classic evaluation: 'I checked your work and here's what needs to change.'

### 04-strategic-delegator.md

**Turn 1:** Expected `delegation` → Got `contribution` (confidence: 92%)
- Expected because: Classic well-scoped delegation. Specifies exactly what to build (health check endpoint), the constraints (specific fields, response format), and the error handling pattern. All decision-making has been done; only execution is handed off.
- Classifier said: The human is providing domain-specific context and constraints that the AI needs to proceed: error response format, auth patterns, logging library, and detailed endpoint specification. This is information provision without simultaneous assessment of the AI's work. The human is answering the AI's earlier questions and laying out patterns/requirements for implementation.

**Turn 3:** Expected `delegation` → Got `steering` (confidence: 92%)
- Expected because: Hands off the second endpoint with detailed specs — the SQL query shape, pagination parameters, and response format. Again, all design decisions are already made.
- Classifier said: The human is laying out the next task with specific requirements: endpoint definition, parameters, pagination strategy, response format, database function signatures, and struct field names. This is directive — defining what needs to be built and how. The human is not evaluating the previous output (they didn't acknowledge or check it), nor contributing context retroactively. They're moving the conversation forward by establishing the problem scope for the next piece of work.

**Turn 4:** Expected `steering` → Got `evaluation` (confidence: 92%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: The human is reviewing the AI's specific code output and catching two concrete bugs/issues: (1) the cursor encoding is incomplete—it should include created_at and id, not just id, which will cause pagination errors; (2) there's a duplicate helper function that should use an existing utility. Both are specific output problems, not objections to the approach itself. The pagination logic is affirmed as correct. The final statement about pivoting to a different endpoint is steering (redirecting conversation), but the primary cognitive action is evaluation of the code.

**Turn 5:** Expected `delegation` → Got `contribution` (confidence: 92%)
- Expected because: Provides the complete schema, validation rules, and error response format for the new preferences endpoint. Very precisely scoped — all design decisions are made, only execution is handed off.
- Classifier said: The human is providing domain-specific information needed for the AI to proceed: endpoint specification, request/response schema, validation rules, database function name, and rate limiting details. This is pure information provision without simultaneous evaluation of the AI's previous work. The human is not reviewing the cursor code or assessing its correctness — they're moving forward by supplying the next piece of context the AI needs to build the endpoint.

### 05-false-evaluator.md

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: The human is reviewing the AI's specific output (competitor profiles and feature matrix) and confirming its accuracy. They're checking the AI's work ('looks right'), validating specific claims ('especially the Monday.com point'), and grounding the evaluation in their own domain knowledge ('that's what we hear from customers'). This is evaluation, not contribution — they're not introducing new information to reshape the analysis, but rather verifying what the AI produced and noting where it aligns with their market experience.

**Turn 5:** Expected `passive_acceptance` → Got `steering` (confidence: 78%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: The human is accepting the overall direction but redirecting focus within it. They're identifying a specific gap in the strategic narrative ('pricing comparison needs more nuance') and explicitly requesting the AI add depth to a particular section ('flesh out the hidden costs for Monday.com'). This is goal-refinement within the existing frame — shaping what the deliverable should contain and emphasizing which elements matter most to their audience (board's recurring question). Not evaluation (not checking the AI's work), not passive_acceptance (actively redirecting), not friction (supporting the approach, just asking for better support of one argument).

### 06-domain-shift.md

**Turn 1:** Expected `friction` → Got `evaluation` (confidence: 92%)
- Expected because: Pushes back on the AI's color suggestion. Provides a specific design-informed reason (rose gold is overdone in this space) and redirects toward their own aesthetic preference with a specific hex code.
- Classifier said: The human is reviewing the AI's specific design proposal and providing targeted feedback on particular elements: rejecting the rose gold accent with reasoning (market saturation), proposing a specific alternative (forest green) with a rationale (apothecary positioning), and confirming other elements work ('palette direction is right'). This is quality review of the AI's output with domain knowledge applied to verify/improve specific choices, not rejecting the overall approach or strategy.

**Turn 4:** Expected `contribution` → Got `evaluation` (confidence: 92%)
- Expected because: Provides detailed information about the typography that works on the physical amber glass — specific weight, point size, and how it reads at jar scale. This is expert knowledge from hands-on testing. Also shares the illustrator's style direction and production details (screen printing at 500 units).
- Classifier said: The human is reviewing the AI's specific technical recommendations and providing verification feedback based on their own testing and decisions. They're confirming what works (the Cormorant suggestion, but with modifications based on actual testing), specifying choices on the illustrations (single-color, fine line style with sketches approved), and confirming the printing method (screen printing justified by volume economics). This is checking the AI's output against real constraints and providing correction/confirmation on specific execution details.

**Turn 6:** Expected `capitulation` → Got `contribution` (confidence: 92%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: The human is providing specific financial data ($95K income) and naming their business setup (home office, Adobe CC, Figma) to the AI. This is pure information provision — they're giving the AI domain facts it needs to provide more tailored guidance. They acknowledge the AI's earlier advice but don't evaluate it; they're not pushing back on the approach. The question at the end ('Do I need to do anything special...?') is a follow-up seeking clarification, not an assessment of the AI's work.

**Turn 7:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: 'What should I actually do first?' — asking the AI to prioritize their tax obligations. In the design domain, they would never ask the AI to sequence their own work. They're fully deferring to the AI's judgment in an unfamiliar domain.
- Classifier said: The human accepts the AI's comprehensive tax guidance ('ok yeah I'll do that') without engaging critically with the content, verification, or reasoning. They then ask for sequencing of next steps without adding constraints, reasoning about priorities, or shaping HOW the approach should work. This is naming the next logical step without steering the direction or criteria.

### 07-friction-heavy.md

**Turn 7:** Expected `evaluation` → Got `friction` (confidence: 72%)
- Expected because: AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection.
- Classifier said: The human pushes back on the AI's characterization of Framework Analysis, asserting it's more flexible than presented and was deliberately designed to balance rigor with flexibility. This is friction at the level of approach/framing — correcting the AI's conceptual positioning of a methodology. However, the human simultaneously affirms the AI's core recommendation (CGT) and then pivots to a new steering question about multi-modal data analysis. The friction is real but contained; it's not wholesale rejection. Confidence is moderate because the human could alternatively be read as providing evaluative correction ("you got FA wrong"), but the framing — "I'd push back on your characterization" — targets the AI's judgment/positioning rather than a specific factual claim.

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 92%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: The human is reviewing the AI's specific output (the methods section) and identifying concrete issues: sentence structure uniformity, problematic phrasing ('this design choice was critical'), and citation integration style. They're checking the quality and tone of the writing against disciplinary norms in CSCW. This is evaluation of the AI's work product, not friction with the approach itself — they're not rejecting the methods design or research strategy, only the prose execution and stylistic choices.

### 08-mixed-realistic.md

**Turn 3:** Expected `delegation` → Got `contribution` (confidence: 95%)
- Expected because: AMBIGUOUS between passive_acceptance and delegation. Says 'yeah that works' to the outline (passive) but then hands off the Q4 review section with clear inputs — specific metrics and the narrative frame. The dominant action is the well-scoped delegation with detailed data handoff. Leaning delegation.
- Classifier said: The human is providing specific business data and context needed for the draft — revenue figures, retention breakdown, product milestones, hiring status — without simultaneously evaluating the AI's work or reshaping the approach. The phrase 'yeah that works' is passive acceptance of the structure; the substantive part is pure information provision (metrics, narrative framing guidance) that the AI needs to execute the requested section.

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 95%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human is reviewing the AI's specific output (the priorities section) and providing targeted feedback on a particular element — the wording of the first priority's title. This is quality review of the AI's work product with a specific modification request based on domain knowledge (CEO sensitivity to framing). The human also confirms the overall output is sound ('these are good'), which is part of the evaluation. This is not steering (no new direction being set) or friction (not rejecting the approach — the feedback is narrow and tactical).

### 09-complexity-scaling.md

**Turn 0:** Expected `delegation` → Got `steering` (confidence: 92%)
- Expected because: Simple, well-scoped task: format a JSON config file. The human knows exactly what they want and is handing off execution. Clean delegation.
- Classifier said: The human is defining a task with a clear goal (make JSON readable) and an implicit constraint (multi-line format). They're opening the conversation by specifying what needs to be done and what the desired outcome is. This is task setup, not pure information provision — the human is directing the AI toward a specific action.

**Turn 1:** Expected `evaluation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: The human confirms the config file with a brief 'yep looks right' — simple enough output to verify at a glance. Then they move to the next task without shaping HOW it should be approached. 'Just basic validation, doesn't need to cover every RFC edge case' is a constraint, but they're not defining what 'common formats' means or setting quality criteria beyond that minimal descriptor. This is sequencing to the next task rather than steering (which would include reasoning about why or how to approach it). The follow-up is task assignment without substantive directional input.

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 92%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: The human is accepting the code ('that works') but introducing a new problem direction and constraint — handling high-throughput burst scenarios. They're reframing what 'done' means by adding a concrete operational concern (product launch spike), which defines a new goal the system should handle. This is setting direction for the next phase of work, not evaluating the current implementation or asking the AI to make decisions unilaterally.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 92%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The human has accepted the AI's recommendation (buffered writes + circuit breaker) and is now delegating a well-scoped task: write tests for two specific behaviors (size-based flush, time-based flush, and fallback capture). This includes implicit quality criteria (the tests should verify these triggers work correctly). The human is not evaluating the previous output, not steering on approach, not contributing new information — they're handing off a bounded implementation task with clear success criteria.

### 10-short-conversation.md

**Turn 0:** Expected `steering` → Got `capitulation` (confidence: 95%)
- Expected because: Frames the decision and provides the key variables (two offers, compensation, role differences). Sets the agenda clearly.
- Classifier said: The human is asking the AI to make a judgment or decision without providing criteria for evaluation. They've described the tradeoffs (excitement vs. safety, equity timing, title level, compensation) but are asking 'how should I think about this?' — which offloads the cognitive work of weighing values and priorities to the AI. They're not asking for a framework or methodology; they're asking the AI to help them decide, implying they want input on what matters. True steering would be: 'Help me build a decision framework that weights: career growth, financial security, learning opportunities, and timeline' or 'I value X most — how do these stack up?'

