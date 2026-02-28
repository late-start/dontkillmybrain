# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** gpt-5-mini
**Overall Accuracy:** 44.6% (41/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 60% | 6/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 8% | 1/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 27% | 3/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 56% | 5/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 25% | 2/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 56% | 5/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 50% | 5/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 50% | 5/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 75% | 6/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 75% | 3/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 9 | . | . | 1 | . | 2 | . |
| friction | 1 | 4 | . | 1 | . | 1 | . |
| contribution | . | . | 7 | . | . | . | . |
| evaluation | 4 | . | . | 8 | . | 1 | . |
| passive_acceptance | 3 | . | 1 | 5 | 4 | 3 | 2 |
| delegation | 1 | . | 1 | 1 | . | 3 | . |
| capitulation | 1 | . | . | . | 2 | 2 | 6 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 9 | 15 | 60% | unknown (3) |
| friction | 4 | 8 | 50% | delegation (1) |
| contribution | 7 | 10 | 70% | unknown (3) |
| evaluation | 8 | 14 | 57% | steering (4) |
| passive_acceptance | 4 | 22 | 18% | evaluation (5) |
| delegation | 3 | 7 | 43% | evaluation (1) |
| capitulation | 6 | 16 | 38% | unknown (5) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 4:** Expected `contribution` → Got `unknown` (confidence: 0%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 5:** Expected `steering` → Got `evaluation` (confidence: 93%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The user directly critiques a specific part of the AI's output (step 2a), identifies a correctness/race condition under READ COMMITTED, and requests a change (use SERIALIZABLE or a row-level lock). This is reviewing and asking for a specific fix to the AI's proposal.

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 95%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human supplies schema and explicit constraints and asks the AI to write a specific Go function with defined inputs, outputs, libraries, and error-wrapping — handing off a well-scoped task with success criteria.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 95%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human reviews and verifies the implementation (mentally traces the concurrent case and confirms behavior) and requests a specific improvement (increment a Prometheus metric on Redis fallback), which is evaluation of the AI's output.

### 02-pure-delegation.md

**Turn 0:** Expected `capitulation` → Got `delegation` (confidence: 92%)
- Expected because: Extremely vague request with no constraints, structure, or scoping. 'I need a landing page' gives the AI total decision-making authority over implementation.
- Classifier said: The user hands off a clear task (build a landing page for their meal-planning app) and asks the assistant to do most of the work because they lack HTML knowledge — i.e., delegating execution rather than just providing info or critiquing an approach.

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 92%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The user supplies the requested information (app name, target audience, CTA, lack of brand colors, and features) without critiquing the AI's approach or redirecting the task—purely providing context the AI needs.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 94%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The user simply accepts the proposed structure and asks to proceed without adding constraints, critique, or new information—moving forward without shaping the approach.

**Turn 3:** Expected `passive_acceptance` → Got `capitulation` (confidence: 92%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The user accepts the output and explicitly asks the AI to choose which colors to use without giving constraints or criteria, effectively offloading the design decision to the AI.

**Turn 5:** Expected `passive_acceptance` → Got `capitulation` (confidence: 91%)
- Expected because: Agrees to add a testimonials section simply because the AI suggested it. No consideration of whether this is right for their product.
- Classifier said: The user accepts the AI's suggestions and then asks the AI to determine what else is needed or missing, handing off decision-making without providing constraints or criteria.

**Turn 6:** Expected `capitulation` → Got `unknown` (confidence: 0%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 7:** Expected `passive_acceptance` → Got `delegation` (confidence: 90%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The user hands the task back to the AI with clear constraints (make placeholder testimonials with fake names) and intends to replace them later — a well-scoped assignment to complete.

**Turn 8:** Expected `capitulation` → Got `unknown` (confidence: 0%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 9:** Expected `passive_acceptance` → Got `steering` (confidence: 88%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The user sets the immediate goal (get the site live soon) and asks which deployment option to choose — i.e., directing the next steps and requesting guidance on approach rather than merely providing data or passively accepting the AI's output.

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 98%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The user simply acknowledges and says they'll try it ('Ok I'll try that. thanks') without directing next steps, providing new info, critiquing the approach, or delegating work — a straightforward acceptance.

**Turn 11:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The user reports a problem after following the AI's instructions and asks what they did wrong — they're testing and seeking diagnosis of the AI's specific output (mobile styling), which is reviewing/checking the assistant's work.

**Turn 12:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: Final acknowledgment. Confirms the fix with no curiosity about what was wrong or how to avoid it next time. No learning, just outcome-based acceptance.
- Classifier said: The user confirmed they applied the suggested change and that it fixed the issue, effectively verifying and validating the AI's troubleshooting guidance.

### 03-progressive-reliance.md

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 92%)
- Expected because: Engages with the AI's feature engineering suggestions substantively. Confirms the churn definition, adds nuance about seasonal patterns, and pushes back on naive week-over-week trends. This is genuine assessment combined with domain knowledge.
- Classifier said: The human defines the churn label (explicit cancellation) and directs how to compute temporal features (compare same-week-of-month rather than week-over-week) and which feature to omit (seat_count). These are decisions shaping approach and constraints, not just raw data or evaluation.

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 93%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: The human corrected schema details and explicitly set a constraint/approach (use a reference-date to generate features looking backward to avoid data leakage), thus directing how the pipeline should be built rather than merely providing raw info or critiquing a specific output.

**Turn 5:** Expected `passive_acceptance` → Got `unknown` (confidence: 0%)
- Expected because: This is the inflection point. The human receives a large block of code and modeling logic, and responds with 'ok that makes sense' followed by 'what's next' without engaging with any specifics. Compare to their detailed engagement in earlier turns. The complexity increased but their processing did not.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 6:** Expected `passive_acceptance` → Got `steering` (confidence: 94%)
- Expected because: Receives a full evaluation framework and responds with 'yeah let's do that.' No engagement with the choice of metrics, the threshold, or the cross-validation strategy. Earlier, they would have had opinions about this.
- Classifier said: The user is directing the next step of the work by requesting cross-validation be added (changing the approach/next action), i.e., setting direction for the modeling pipeline.

**Turn 7:** Expected `capitulation` → Got `unknown` (confidence: 0%)
- Expected because: 'Can you just interpret these for me' — explicitly asking the AI to do the thinking. They received model results but are not even attempting to interpret them. This is a clear shift from earlier turns where they were actively analyzing.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 8:** Expected `capitulation` → Got `delegation` (confidence: 93%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The user is handing off a well-scoped task with clear constraints and success criteria (create risk-scoring output and a non-technical executive summary for the VP by Friday), which is classic delegation.

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The user reviewed the executive summary, approved it, and requested a specific wording change ('83% accuracy' → 'high degree of confidence'), i.e., a targeted modification based on quality review of the AI's output.

**Turn 10:** Expected `capitulation` → Got `unknown` (confidence: 0%)
- Expected because: 'What should I say if they ask about [complex question]' — preparing their own responses to stakeholder questions by asking the AI. They've fully outsourced their understanding of their own analysis.
- Classifier said: Classification failed: Unexpected end of JSON input

### 04-strategic-delegator.md

**Turn 0:** Expected `steering` → Got `delegation` (confidence: 95%)
- Expected because: Sets the overall agenda for the session — outlines the three endpoints they need and the tech stack. This is high-level direction-setting.
- Classifier said: The user assigns a concrete task (scaffold three API endpoints), provides stack and pattern constraints (Go + chi, sqlc, follow existing patterns), and asks the AI to generate code while they will review—this is handing off a well-scoped task with criteria.

**Turn 1:** Expected `delegation` → Got `steering` (confidence: 92%)
- Expected because: Classic well-scoped delegation. Specifies exactly what to build (health check endpoint), the constraints (specific fields, response format), and the error handling pattern. All decision-making has been done; only execution is handed off.
- Classifier said: The human defines the next task and its constraints (error format, auth/logging patterns, and detailed spec for the GET /health endpoint), setting direction and requirements for implementation.

**Turn 4:** Expected `steering` → Got `unknown` (confidence: 0%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 5:** Expected `delegation` → Got `unknown` (confidence: 0%)
- Expected because: Provides the complete schema, validation rules, and error response format for the new preferences endpoint. Very precisely scoped — all design decisions are made, only execution is handed off.
- Classifier said: Classification failed: Unexpected end of JSON input

### 05-false-evaluator.md

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 94%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: The user is reviewing and confirming the AI's specific output (feature mapping and competitor analysis) and providing corroborating evidence — this is assessment of the AI's work.

**Turn 3:** Expected `passive_acceptance` → Got `unknown` (confidence: 0%)
- Expected because: 'Makes sense, that's a good point' and 'I agree with your assessment' — the AI raised a nuanced pricing analysis and SWOT. The human agrees with everything including the weaknesses section about their own product without pushback. Evaluative language masking passive acceptance.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 4:** Expected `passive_acceptance` → Got `steering` (confidence: 86%)
- Expected because: 'That's exactly right' — the AI made specific strategic recommendations. No indication they assessed whether these recommendations fit their actual company situation. The pattern of unquestioning agreement continues.
- Classifier said: The user accepts the SWOT but emphasizes AI as a priority and requests the next section (strategic recommendations), thereby setting direction for the conversation and indicating where to focus efforts.

**Turn 5:** Expected `passive_acceptance` → Got `unknown` (confidence: 0%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 6:** Expected `capitulation` → Got `steering` (confidence: 93%)
- Expected because: 'What do you think we should lead with?' — asking the AI to make a strategic framing decision about how to present to the board. This goes beyond passive acceptance into actively offloading judgment.
- Classifier said: The user is asking how to frame the final document and what opening narrative to lead with — explicitly setting direction and goals for the next step of the task.

**Turn 7:** Expected `passive_acceptance` → Got `unknown` (confidence: 0%)
- Expected because: 'Great recommendation' — accepts the recommended framing and asks to compile the full document, with no engagement about whether the board would actually respond well to that framing. Also 'I'll review it' is a promise of future evaluation that offloads current evaluation.
- Classifier said: Classification failed: Unexpected end of JSON input

### 06-domain-shift.md

**Turn 1:** Expected `friction` → Got `steering` (confidence: 92%)
- Expected because: Pushes back on the AI's color suggestion. Provides a specific design-informed reason (rose gold is overdone in this space) and redirects toward their own aesthetic preference with a specific hex code.
- Classifier said: The user isn't just supplying data — they reject the rose gold accent, explain why, and set a clear design constraint and alternative (deep forest green #2D5F2D) to guide the next direction of the project.

**Turn 2:** Expected `contribution` → Got `unknown` (confidence: 0%)
- Expected because: Brings specific knowledge about the client's products and the physical packaging constraint (amber glass jars already sourced). The AI cannot know any of this and it fundamentally changes the design direction.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 90%)
- Expected because: Examines the AI's three label approach options critically. Confirms option 1 (clear label) based on their own test prints, adds the botanical illustration decision, and specifies the numbering system. Demonstrating they've been thinking ahead of the AI.
- Classifier said: The user chooses the clear-label direction, reports a test result, and defines how SKUs will be differentiated (botanical illustrations + numbering), thereby setting the design approach and constraints for next steps.

**Turn 6:** Expected `capitulation` → Got `unknown` (confidence: 0%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: Classification failed: Unexpected end of JSON input

### 07-friction-heavy.md

**Turn 4:** Expected `contribution` → Got `unknown` (confidence: 0%)
- Expected because: Provides specific knowledge about their institutional context (existing panel of 200+, IRB pre-approval) that changes the feasibility analysis. Also adds a theoretically grounded stratification dimension (AI expertise level). This is adding information the AI couldn't have known.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 5:** Expected `friction` → Got `unknown` (confidence: 0%)
- Expected because: Challenges the proposed interview protocol. Rejects the semi-structured format and argues for a narrative-based approach with detailed methodological reasoning. They're not just disagreeing — they articulate a philosophy of data collection that is opposed to the AI's suggestion.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 7:** Expected `evaluation` → Got `unknown` (confidence: 0%)
- Expected because: AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 8:** Expected `steering` → Got `delegation` (confidence: 94%)
- Expected because: Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work.
- Classifier said: The user hands off a well-scoped writing task with clear quality criteria and constraints (publishable-quality, target journals) and specifies required subsections — classic delegation.

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 95%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: The human reviews the AI's specific draft methods text, points out concrete issues (uniform sentence structure, performative phrasing, awkward citation placement) and requests revisions to the writing style—i.e., direct evaluation of the AI's output.

### 08-mixed-realistic.md

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 95%)
- Expected because: Reviews the AI's proposed structure and gives substantive feedback. Flags one section as unnecessary (competitive landscape — already covered) and suggests adding something specific (technical debt section). Genuine quality assessment.
- Classifier said: The human is directing the structure: removing the competitive landscape, adding a technical-debt section with rationale from the CTO, and approving the rest—setting goals and constraints for the next draft.

**Turn 3:** Expected `delegation` → Got `contribution` (confidence: 93%)
- Expected because: AMBIGUOUS between passive_acceptance and delegation. Says 'yeah that works' to the outline (passive) but then hands off the Q4 review section with clear inputs — specific metrics and the narrative frame. The dominant action is the well-scoped delegation with detailed data handoff. Leaning delegation.
- Classifier said: The user supplies concrete data and context the AI requested (revenue, NRR breakdown, customer counts, product shipments, hiring status) to draft the Q4 review. They do not challenge the AI's approach or evaluate its output beyond a brief tonal note, so this is primarily information provision.

**Turn 5:** Expected `steering` → Got `unknown` (confidence: 0%)
- Expected because: Accepts the revision with 'ok that's better' (brief) then redirects to a new section and provides the strategic frame for Q1 priorities. The dominant action is direction-setting for the next piece of work.
- Classifier said: Classification failed: Unexpected end of JSON input

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 95%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The user reviewed the AI's output and requested a specific wording change (replace 'Fix Retention' with 'Restore Retention Health') with an explanation about CEO sensitivity, while otherwise approving the content.

**Turn 9:** Expected `passive_acceptance` → Got `delegation` (confidence: 95%)
- Expected because: Accepts the AI-generated risk assessment with 'yeah those are the right ones.' Acknowledges one good point (cannibalization) but doesn't engage with the mitigation strategies or the risk severity assessments. For a quarterly planning doc that leadership will read, this is notably low engagement.
- Classifier said: The user accepts the identified risks and then hands off a clearly scoped task with constraints and desired quality: draft a tight one‑page executive summary that pulls everything together — this is a delegation rather than mere acceptance or steering.

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `delegation` (confidence: 93%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: After a brief acceptance of the JSON, the user hands off a new, well-scoped task (write a basic email regex) and provides constraints/quality criteria (basic validation, handle common formats, not full RFC coverage).

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 95%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The user accepted the recommended approach and handed off a concrete, well-scoped task (write tests) with explicit success criteria: flush on size and time triggers, and circuit-breaker fallback captures events — this is delegation rather than open-ended questioning or mere info.

### 10-short-conversation.md

**Turn 0:** Expected `steering` → Got `unknown` (confidence: 0%)
- Expected because: Frames the decision and provides the key variables (two offers, compensation, role differences). Sets the agenda clearly.
- Classifier said: Classification failed: Unexpected end of JSON input

