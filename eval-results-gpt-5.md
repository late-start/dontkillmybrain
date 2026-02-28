# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** gpt-5
**Overall Accuracy:** 40.2% (37/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 60% | 6/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 15% | 2/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 27% | 3/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 56% | 5/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 38% | 3/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 33% | 3/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 50% | 5/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 30% | 3/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 50% | 4/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 75% | 3/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 9 | . | . | 1 | . | . | . |
| friction | 2 | 4 | . | 1 | . | . | . |
| contribution | 1 | . | 2 | . | . | . | . |
| evaluation | 4 | . | . | 8 | . | . | . |
| passive_acceptance | 3 | . | 1 | 5 | 7 | 1 | . |
| delegation | . | . | . | 1 | . | 2 | . |
| capitulation | 2 | . | . | . | 4 | . | 5 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 9 | 15 | 60% | unknown (5) |
| friction | 4 | 8 | 50% | steering (2) |
| contribution | 2 | 10 | 20% | unknown (7) |
| evaluation | 8 | 14 | 57% | steering (4) |
| passive_acceptance | 7 | 22 | 32% | unknown (5) |
| delegation | 2 | 7 | 29% | unknown (4) |
| capitulation | 5 | 16 | 31% | unknown (5) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 4:** Expected `contribution` → Got `unknown` (confidence: 0%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 5:** Expected `steering` → Got `evaluation` (confidence: 90%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: They review a specific step of the AI’s design (2a), identify a potential race under READ COMMITTED, and propose corrections (SERIALIZABLE or row-level lock). This is checking and refining the AI’s specific output, not rejecting the overall approach.

**Turn 7:** Expected `friction` → Got `unknown` (confidence: 0%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 90%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: They reviewed and confirmed the implementation’s behavior (concurrency path, Redis impact), and suggested a specific improvement (add Prometheus metric on Redis fallback). This is checking specific output and proposing a targeted change.

### 02-pure-delegation.md

**Turn 0:** Expected `capitulation` → Got `steering` (confidence: 86%)
- Expected because: Extremely vague request with no constraints, structure, or scoping. 'I need a landing page' gives the AI total decision-making authority over implementation.
- Classifier said: They set the task and goal (build a landing page for a meal planning app) and note constraints (they don’t know HTML, want the AI to do most work). This defines direction without critiquing output or providing detailed criteria.

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 90%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The human primarily supplies requested information (name, audience, CTA, features, brand colors) without critiquing the AI’s approach or evaluating output. They are informing the AI to proceed with those details.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 93%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human simply agrees to proceed with the AI’s proposed structure without providing reasoning, modifications, or criteria.

**Turn 3:** Expected `passive_acceptance` → Got `unknown` (confidence: 0%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 5:** Expected `passive_acceptance` → Got `unknown` (confidence: 0%)
- Expected because: Agrees to add a testimonials section simply because the AI suggested it. No consideration of whether this is right for their product.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 86%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: They simply agree to proceed with adding testimonials, accepting the AI’s suggestion without adding criteria, feedback, or new direction.

**Turn 7:** Expected `passive_acceptance` → Got `steering` (confidence: 86%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: They redirect the task from audience-matched testimonials to generic placeholders and explain why, shaping what the AI should produce next.

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 86%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: They briefly accept the placeholders as fine and simply agree to proceed to the next step (“do the mobile thing”) without adding criteria, reasoning, or directing the approach.

**Turn 9:** Expected `passive_acceptance` → Got `steering` (confidence: 76%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: They redirect the conversation from styling to deployment, state the goal (get live soon), specify constraints (single HTML file, easiest path), and ask for a recommendation on approach (Netlify vs Vercel).

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human briefly agrees to try the suggested approach without adding information, evaluating the advice, or steering the direction.

**Turn 11:** Expected `passive_acceptance` → Got `unknown` (confidence: 0%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: Classification failed: Unexpected end of JSON input

### 03-progressive-reliance.md

**Turn 1:** Expected `contribution` → Got `unknown` (confidence: 0%)
- Expected because: Provides specific domain knowledge about the data — which features are messy, what the sales team told them, and business context about the trial period. The AI cannot know any of this.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 86%)
- Expected because: Engages with the AI's feature engineering suggestions substantively. Confirms the churn definition, adds nuance about seasonal patterns, and pushes back on naive week-over-week trends. This is genuine assessment combined with domain knowledge.
- Classifier said: They define churn as explicit cancellation, constrain how to compute temporal trends due to monthly usage cycles (compare same week-of-month), and set a constraint to skip seat_count. This sets direction and requirements rather than merely providing info or critiquing specific output.

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 86%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: They provide schema corrections and explicitly set methodological constraints (reference date to prevent leakage, look-back queries), shaping how the pipeline should be built.

**Turn 4:** Expected `contribution` → Got `unknown` (confidence: 0%)
- Expected because: Provides the actual date format and additional context about a data pipeline migration that the AI would have no way of knowing. This is domain knowledge from direct experience.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 6:** Expected `passive_acceptance` → Got `steering` (confidence: 79%)
- Expected because: Receives a full evaluation framework and responds with 'yeah let's do that.' No engagement with the choice of metrics, the threshold, or the cross-validation strategy. Earlier, they would have had opinions about this.
- Classifier said: They choose between the AI’s proposed options (add TimeSeriesSplit cross-validation), directing the next step of the approach.

**Turn 7:** Expected `capitulation` → Got `unknown` (confidence: 0%)
- Expected because: 'Can you just interpret these for me' — explicitly asking the AI to do the thinking. They received model results but are not even attempting to interpret them. This is a clear shift from earlier turns where they were actively analyzing.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 8:** Expected `capitulation` → Got `unknown` (confidence: 0%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 89%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: They reviewed the specific output and requested a targeted modification (change the 83% figure to a qualitative phrase) with reasoning, while approving the rest.

### 04-strategic-delegator.md

**Turn 1:** Expected `delegation` → Got `unknown` (confidence: 0%)
- Expected because: Classic well-scoped delegation. Specifies exactly what to build (health check endpoint), the constraints (specific fields, response format), and the error handling pattern. All decision-making has been done; only execution is handed off.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 4:** Expected `steering` → Got `unknown` (confidence: 0%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 5:** Expected `delegation` → Got `unknown` (confidence: 0%)
- Expected because: Provides the complete schema, validation rules, and error response format for the new preferences endpoint. Very precisely scoped — all design decisions are made, only execution is handed off.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 7:** Expected `delegation` → Got `unknown` (confidence: 0%)
- Expected because: Hands off the test writing with specific constraints (table-driven tests, specific edge cases to cover, specific test helpers to use). Scoped execution task.
- Classifier said: Classification failed: Unexpected end of JSON input

### 05-false-evaluator.md

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 90%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: They review and confirm the AI’s feature mapping and competitor analysis, and validate a specific point (Monday.com) using their own customer feedback, which is checking the AI’s output rather than steering or just providing info.

**Turn 3:** Expected `passive_acceptance` → Got `evaluation` (confidence: 73%)
- Expected because: 'Makes sense, that's a good point' and 'I agree with your assessment' — the AI raised a nuanced pricing analysis and SWOT. The human agrees with everything including the weaknesses section about their own product without pushback. Evaluative language masking passive acceptance.
- Classifier said: They explicitly validate a specific output point (“Asana refugees”) with their own pipeline data, then proceed to next step. That’s confirming correctness of a specific insight rather than just accepting or steering.

**Turn 4:** Expected `passive_acceptance` → Got `unknown` (confidence: 0%)
- Expected because: 'That's exactly right' — the AI made specific strategic recommendations. No indication they assessed whether these recommendations fit their actual company situation. The pattern of unquestioning agreement continues.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 5:** Expected `passive_acceptance` → Got `evaluation` (confidence: 90%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: They reviewed the AI’s recommendations (affirming overall fit), identified a specific shortcoming (pricing comparison lacks nuance), and requested a concrete improvement (detail Monday.com hidden costs) based on board expectations.

**Turn 6:** Expected `capitulation` → Got `unknown` (confidence: 0%)
- Expected because: 'What do you think we should lead with?' — asking the AI to make a strategic framing decision about how to present to the board. This goes beyond passive acceptance into actively offloading judgment.
- Classifier said: Classification failed: Unexpected end of JSON input

### 06-domain-shift.md

**Turn 1:** Expected `friction` → Got `steering` (confidence: 90%)
- Expected because: Pushes back on the AI's color suggestion. Provides a specific design-informed reason (rose gold is overdone in this space) and redirects toward their own aesthetic preference with a specific hex code.
- Classifier said: They refine the design direction by rejecting rose gold, proposing deep forest green with a hex and rationale (differentiation, apothecary vibe), thus setting constraints and guiding next steps.

**Turn 2:** Expected `contribution` → Got `unknown` (confidence: 0%)
- Expected because: Brings specific knowledge about the client's products and the physical packaging constraint (amber glass jars already sourced). The AI cannot know any of this and it fundamentally changes the design direction.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 90%)
- Expected because: Examines the AI's three label approach options critically. Confirms option 1 (clear label) based on their own test prints, adds the botanical illustration decision, and specifies the numbering system. Demonstrating they've been thinking ahead of the AI.
- Classifier said: They choose a direction (clear label), define differentiation (botanical illustrations + numbering), and specify styling details, thereby setting the plan and constraints rather than merely accepting or evaluating the AI’s output.

**Turn 4:** Expected `contribution` → Got `unknown` (confidence: 0%)
- Expected because: Provides detailed information about the typography that works on the physical amber glass — specific weight, point size, and how it reads at jar scale. This is expert knowledge from hands-on testing. Also shares the illustrator's style direction and production details (screen printing at 500 units).
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 6:** Expected `capitulation` → Got `unknown` (confidence: 0%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 7:** Expected `capitulation` → Got `unknown` (confidence: 0%)
- Expected because: 'What should I actually do first?' — asking the AI to prioritize their tax obligations. In the design domain, they would never ask the AI to sequence their own work. They're fully deferring to the AI's judgment in an unfamiliar domain.
- Classifier said: Classification failed: Unexpected end of JSON input

### 07-friction-heavy.md

**Turn 4:** Expected `contribution` → Got `steering` (confidence: 86%)
- Expected because: Provides specific knowledge about their institutional context (existing panel of 200+, IRB pre-approval) that changes the feasibility analysis. Also adds a theoretically grounded stratification dimension (AI expertise level). This is adding information the AI couldn't have known.
- Classifier said: They set constraints and direction: confirm IRB and recruitment availability, and propose a specific stratification factor (self-reported AI expertise) with rationale for how it affects the trust process. This shapes the study design rather than merely providing info or evaluating the AI’s output.

**Turn 5:** Expected `friction` → Got `steering` (confidence: 90%)
- Expected because: Challenges the proposed interview protocol. Rejects the semi-structured format and argues for a narrative-based approach with detailed methodological reasoning. They're not just disagreeing — they articulate a philosophy of data collection that is opposed to the AI's suggestion.
- Classifier said: They define how to proceed with the interview protocol, set methodological constraints (narrative-based, no predetermined questions), and explain the rationale (avoid imposing assumptions). This shapes direction rather than critiquing a specific AI output or approach previously proposed.

**Turn 7:** Expected `evaluation` → Got `unknown` (confidence: 0%)
- Expected because: AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 8:** Expected `steering` → Got `unknown` (confidence: 0%)
- Expected because: Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 90%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: They critically review the AI’s specific draft (style, rhythm, phrasing, citation integration) and request targeted revisions to improve it, which is feedback on the concrete output rather than a change in overall approach.

### 08-mixed-realistic.md

**Turn 1:** Expected `contribution` → Got `unknown` (confidence: 0%)
- Expected because: Provides specific company context — actual OKR progress numbers, the hiring delay, and the pipeline situation. This is domain knowledge the AI cannot have.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 90%)
- Expected because: Reviews the AI's proposed structure and gives substantive feedback. Flags one section as unnecessary (competitive landscape — already covered) and suggests adding something specific (technical debt section). Genuine quality assessment.
- Classifier said: They redirect the plan by removing a section and adding a new one based on stakeholder preferences (CEO/CTO priorities), shaping the structure and focus while confirming the overall framing.

**Turn 3:** Expected `delegation` → Got `unknown` (confidence: 0%)
- Expected because: AMBIGUOUS between passive_acceptance and delegation. Says 'yeah that works' to the outline (passive) but then hands off the Q4 review section with clear inputs — specific metrics and the narrative frame. The dominant action is the well-scoped delegation with detailed data handoff. Leaning delegation.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 5:** Expected `steering` → Got `unknown` (confidence: 0%)
- Expected because: Accepts the revision with 'ok that's better' (brief) then redirects to a new section and provides the strategic frame for Q1 priorities. The dominant action is direction-setting for the next piece of work.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 6:** Expected `contribution` → Got `unknown` (confidence: 0%)
- Expected because: Provides specific numbers for each priority (NRR target, customer targets, enterprise deals, marketing budget) AND adds context from a conversation with the CEO about a new pricing tier. This is information the AI cannot have and it fundamentally changes the priority structure.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 93%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human reviewed the AI’s specific output, confirmed it looks right, and requested a concrete wording change with rationale about CEO sensitivity—precise feedback on the draft rather than changing approach or adding new context.

**Turn 9:** Expected `passive_acceptance` → Got `unknown` (confidence: 0%)
- Expected because: Accepts the AI-generated risk assessment with 'yeah those are the right ones.' Acknowledges one good point (cannibalization) but doesn't engage with the mitigation strategies or the risk severity assessments. For a quarterly planning doc that leadership will read, this is notably low engagement.
- Classifier said: Classification failed: Unexpected end of JSON input

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `unknown` (confidence: 0%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 3:** Expected `steering` → Got `unknown` (confidence: 0%)
- Expected because: Introduces a new, significantly more complex task (user activity tracking feature) and sets the direction. Moving from simple utilities to a full feature requiring data modeling and API design.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 73%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: They accept the implementation and then set a new direction: address burst traffic and DB backpressure during launches. This defines the next problem and asks for approach, not reviewing or rejecting prior work.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 91%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: They accept the approach and assign a concrete task: write tests with specific success criteria (flush on size and time triggers; circuit breaker fallback captures events).

### 10-short-conversation.md

**Turn 0:** Expected `steering` → Got `unknown` (confidence: 0%)
- Expected because: Frames the decision and provides the key variables (two offers, compensation, role differences). Sets the agenda clearly.
- Classifier said: Classification failed: Unexpected end of JSON input

