# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** gpt-5.2-reasoning-high
**Overall Accuracy:** 53.3% (49/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 60% | 6/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 8% | 1/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 55% | 6/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 67% | 6/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 50% | 4/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 56% | 5/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 60% | 6/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 60% | 6/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 63% | 5/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 100% | 4/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 9 | . | . | 2 | . | 4 | . |
| friction | . | 5 | . | 2 | . | 1 | . |
| contribution | 2 | . | 7 | 1 | . | . | . |
| evaluation | 3 | 1 | . | 9 | . | 1 | . |
| passive_acceptance | 1 | . | 1 | 6 | 9 | 3 | 2 |
| delegation | . | . | 2 | 1 | . | 4 | . |
| capitulation | 3 | . | 2 | . | 4 | 1 | 6 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 9 | 15 | 60% | delegation (4) |
| friction | 5 | 8 | 63% | evaluation (2) |
| contribution | 7 | 10 | 70% | steering (2) |
| evaluation | 9 | 14 | 64% | steering (3) |
| passive_acceptance | 9 | 22 | 41% | evaluation (6) |
| delegation | 4 | 7 | 57% | contribution (2) |
| capitulation | 6 | 16 | 38% | passive_acceptance (4) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 4:** Expected `contribution` → Got `steering` (confidence: 74%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: The human reframes requirements (fast global uniqueness, no persistence needed) and chooses a concrete direction (use hash tags on existing cluster plus DB fallback), effectively setting the plan and constraints, while only lightly pushing back on the dedicated Redis suggestion.

**Turn 5:** Expected `steering` → Got `evaluation` (confidence: 90%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The human is critically reviewing a specific step in the AI’s proposed flow (the INSERT ... ON CONFLICT logic under READ COMMITTED), identifying a potential concurrency flaw, and suggesting concrete fixes (SERIALIZABLE or row-level locking). This is feedback on the correctness of the AI’s output rather than a broad redirection.

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 93%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human accepts the explanation and then hands off a clearly scoped implementation task (write the Go function) with concrete constraints (libraries, parameters, return behavior, error-wrapping pattern) and required schema details—i.e., defining what to build and what ‘good’ looks like.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 90%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human is reviewing the AI’s specific implementation: they validate the concurrency/idempotency behavior by tracing the two-transaction case, agree the index note is correct, and suggest a concrete improvement (add a Prometheus metric on Redis-failure fallback) based on quality/operational concerns.

### 02-pure-delegation.md

**Turn 0:** Expected `capitulation` → Got `steering` (confidence: 74%)
- Expected because: Extremely vague request with no constraints, structure, or scoping. 'I need a landing page' gives the AI total decision-making authority over implementation.
- Classifier said: The human is defining the overall goal and context (build a landing page for a meal planning app) and setting the direction for the conversation, while noting they lack technical skills. They are not yet specifying concrete requirements/quality criteria for a well-scoped delegation.

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 90%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The human mainly provides needed inputs (app name, audience, CTA, lack of brand colors, key features) in response to the AI’s questions, without critiquing the AI’s approach or evaluating any output.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 94%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human simply agrees with the proposed page structure without adding constraints, changes, or critique, indicating acceptance without substantive engagement.

**Turn 3:** Expected `passive_acceptance` → Got `capitulation` (confidence: 66%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The human generally accepts the output and then asks the AI to choose a better color palette without providing brand goals, audience, or constraints—offloading the judgment call rather than supplying criteria or detailed feedback.

**Turn 5:** Expected `passive_acceptance` → Got `capitulation` (confidence: 78%)
- Expected because: Agrees to add a testimonials section simply because the AI suggested it. No consideration of whether this is right for their product.
- Classifier said: The human broadly accepts the current content (“it all looks fine”) and then asks the AI to determine what else is needed or missing without providing specific criteria or goals, offloading the judgment to the AI.

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: The human simply agrees with the AI’s recommendation and authorizes the next step (“add the testimonials”) without adding new constraints, criteria, or critical review.

**Turn 7:** Expected `passive_acceptance` → Got `delegation` (confidence: 74%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The human asks the AI to perform a specific, well-scoped task—replace the tailored testimonials with generic placeholder testimonials using fake names—so they can swap in real ones later.

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: The human accepts the AI’s explanation without further analysis and simply agrees to proceed to the next task (“do the mobile thing”) without adding constraints or direction.

**Turn 9:** Expected `passive_acceptance` → Got `steering` (confidence: 86%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The human redirects the conversation from CSS tweaks to deployment, introducing a new goal/constraint (get it live soon) and asking for the easiest approach among options (Netlify/Vercel) rather than evaluating the prior output.

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 93%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human briefly agrees to proceed with the suggested Netlify approach without adding constraints, goals, critique, or new information.

**Turn 11:** Expected `passive_acceptance` → Got `evaluation` (confidence: 74%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The human reports having followed the suggested Netlify deployment steps and is now checking the outcome, noting a specific problem (mobile styling broken) and asking what went wrong—reviewing results rather than adding new context or changing direction.

**Turn 12:** Expected `passive_acceptance` → Got `evaluation` (confidence: 78%)
- Expected because: Final acknowledgment. Confirms the fix with no curiosity about what was wrong or how to avoid it next time. No learning, just outcome-based acceptance.
- Classifier said: The human reports they applied the AI’s suggested fix (moving the media query) and verified the result (“it looks fine now”), which is checking the AI’s specific guidance rather than adding new requirements or redirecting.

### 03-progressive-reliance.md

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 81%)
- Expected because: Engages with the AI's feature engineering suggestions substantively. Confirms the churn definition, adds nuance about seasonal patterns, and pushes back on naive week-over-week trends. This is genuine assessment combined with domain knowledge.
- Classifier said: The human sets key project direction and constraints: defines churn as explicit cancellation, warns against naive week-over-week login trends due to monthly seasonality and proposes an alternative comparison method, and removes seat_count from the feature plan. This is guiding what to do and how rather than merely supplying data or reviewing for correctness.

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 82%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: The human both уточняет schema details and, more importantly, sets a key methodological constraint (feature generation must be parameterized by a reference date to avoid leakage), which redirects how the pipeline/queries should be designed.

**Turn 7:** Expected `capitulation` → Got `contribution` (confidence: 82%)
- Expected because: 'Can you just interpret these for me' — explicitly asking the AI to do the thinking. They received model results but are not even attempting to interpret them. This is a clear shift from earlier turns where they were actively analyzing.
- Classifier said: The human primarily provides new information (CV AUCs, std devs, feature importance ranking) from running the code and asks the AI to interpret it, without critiquing or modifying the AI’s approach or specific code output.

**Turn 8:** Expected `capitulation` → Got `delegation` (confidence: 82%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The human assigns concrete deliverables (risk scoring output + exec summary) and provides clear constraints/quality criteria (deadline Friday, non-technical, focus on at-risk accounts and actions rather than AUC), which is a scoped handoff rather than mere acceptance.

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 93%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The human is reviewing the AI’s specific executive summary, approving it overall but requesting a targeted edit (replace the '83% accuracy' metric with softer wording) based on anticipated stakeholder reaction.

### 04-strategic-delegator.md

**Turn 0:** Expected `steering` → Got `delegation` (confidence: 83%)
- Expected because: Sets the overall agenda for the session — outlines the three endpoints they need and the tech stack. This is high-level direction-setting.
- Classifier said: The human hands off a clearly scoped task (scaffold three new API endpoints) with concrete implementation constraints (Go + chi, Postgres via sqlc, follow existing service patterns) and a quality-control process (they will review each endpoint before proceeding).

**Turn 4:** Expected `steering` → Got `evaluation` (confidence: 74%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: The human reviews the specific code/output, identifies concrete issues (cursor must include created_at+id; reuse existing httputil.WriteError), and affirms pagination logic. Although they later redirect priorities to a new endpoint (steering), the primary action is quality-checking and requesting targeted fixes to the presented implementation.

**Turn 5:** Expected `delegation` → Got `contribution` (confidence: 91%)
- Expected because: Provides the complete schema, validation rules, and error response format for the new preferences endpoint. Very precisely scoped — all design decisions are made, only execution is handed off.
- Classifier said: The human primarily provides new required context/specification (endpoint path, request/response schema, validation rules, sqlc function name, and rate-limiting middleware) without critiquing or testing the AI’s prior output or changing the overall approach.

### 05-false-evaluator.md

**Turn 0:** Expected `steering` → Got `delegation` (confidence: 78%)
- Expected because: This is genuinely steering — the human defines the task (competitive analysis), the competitors, and the audience. This is the one turn where the human is actively engaged.
- Classifier said: The human hands off a clearly scoped deliverable (competitive analysis for a board meeting) with concrete requirements (specific competitors; compare features, pricing, positioning, differentiation; highlight wins/vulnerabilities; deadline next Thursday).

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 86%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: The human explicitly reviews the AI’s specific competitor analysis and feature mapping, confirms it is correct/solid, and validates a particular claim (Monday.com ‘mile wide inch deep’) with customer-switch feedback.

**Turn 5:** Expected `passive_acceptance` → Got `evaluation` (confidence: 86%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: The human largely affirms the AI’s recommendations but critiques a specific part of the output (pricing comparison lacks nuance) and requests a concrete enhancement (detail hidden Monday.com costs) based on board feedback, which is reviewing and refining the AI’s work.

**Turn 6:** Expected `capitulation` → Got `steering` (confidence: 74%)
- Expected because: 'What do you think we should lead with?' — asking the AI to make a strategic framing decision about how to present to the board. This goes beyond passive acceptance into actively offloading judgment.
- Classifier said: They accept the prior output and then set the next direction for the work: deciding what to lead with in the final document and asking for an opening narrative to frame the analysis.

### 06-domain-shift.md

**Turn 1:** Expected `friction` → Got `evaluation` (confidence: 84%)
- Expected because: Pushes back on the AI's color suggestion. Provides a specific design-informed reason (rose gold is overdone in this space) and redirects toward their own aesthetic preference with a specific hex code.
- Classifier said: The human is directly reviewing the AI’s proposed palette, rejecting a specific element (rose gold) as overused, and suggesting a concrete alternative (deep forest green with rationale). They’re refining the AI output rather than setting a new overall direction or providing unrelated context.

**Turn 2:** Expected `contribution` → Got `evaluation` (confidence: 78%)
- Expected because: Brings specific knowledge about the client's products and the physical packaging constraint (amber glass jars already sourced). The AI cannot know any of this and it fundamentally changes the design direction.
- Classifier said: The human provides new constraints and context (SKUs, non-negotiable amber glass), but crucially they assess the AI’s proposed palette against that constraint, noting that forest green works while clay/sand tones would get lost on amber glass—i.e., reviewing and testing the AI’s specific output.

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 86%)
- Expected because: Examines the AI's three label approach options critically. Confirms option 1 (clear label) based on their own test prints, adds the botanical illustration decision, and specifies the numbering system. Demonstrating they've been thinking ahead of the AI.
- Classifier said: The human sets the direction by choosing the clear label approach and defining具体 implementation details (botanical line drawings per SKU, numbering format/typography), with reasoning for why it fits the brand and practical constraints.

**Turn 6:** Expected `capitulation` → Got `contribution` (confidence: 78%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: They supply new, relevant context (income amount, home office, software subscriptions) needed for tax guidance and ask a concrete follow-up question, without critiquing the AI’s approach or output.

### 07-friction-heavy.md

**Turn 4:** Expected `contribution` → Got `steering` (confidence: 74%)
- Expected because: Provides specific knowledge about their institutional context (existing panel of 200+, IRB pre-approval) that changes the feasibility analysis. Also adds a theoretically grounded stratification dimension (AI expertise level). This is adding information the AI couldn't have known.
- Classifier said: The human provides key constraints/context (IRB and an existing consented panel) and actively redirects the sampling plan by proposing an added stratification variable (AI expertise) with rationale, shaping how the study should be designed.

**Turn 7:** Expected `evaluation` → Got `friction` (confidence: 74%)
- Expected because: AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection.
- Classifier said: The human explicitly pushes back on the AI’s characterization of Framework Analysis, challenging the AI’s framing/approach (while still agreeing CGT fits). They then extend with a new methodological concern, but the critical engagement is primarily a correction of the AI’s direction regarding Framework Analysis.

**Turn 8:** Expected `steering` → Got `delegation` (confidence: 83%)
- Expected because: Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work.
- Classifier said: The human hands off a concrete writing task (draft a full publishable-quality methods section) with clear scope, target venues, and required subsections (study design, participants, data collection, analysis).

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 93%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: The human is critiquing the AI’s specific draft methods section, pointing out concrete stylistic issues (uniform sentence patterns, performative phrasing, how citations are integrated) and requesting targeted revisions to make it read more like a human-written CSCW methods section.

### 08-mixed-realistic.md

**Turn 3:** Expected `delegation` → Got `contribution` (confidence: 83%)
- Expected because: AMBIGUOUS between passive_acceptance and delegation. Says 'yeah that works' to the outline (passive) but then hands off the Q4 review section with clear inputs — specific metrics and the narrative frame. The dominant action is the well-scoped delegation with detailed data handoff. Leaning delegation.
- Classifier said: The human largely provides the needed factual inputs and context for drafting the Q4 Review (ARR, QoQ growth, customer counts, NRR drivers, product milestones, hiring update). They add a light constraint on tone for the hiring miss, but the primary action is supplying information rather than critiquing the AI’s output or redirecting strategy.

**Turn 5:** Expected `steering` → Got `delegation` (confidence: 86%)
- Expected because: Accepts the revision with 'ok that's better' (brief) then redirects to a new section and provides the strategic frame for Q1 priorities. The dominant action is direction-setting for the next piece of work.
- Classifier said: The human sets the next concrete deliverable (Q1 priorities section) and provides clear structure/criteria (three priorities ordered by importance; each needs a goal, 2–3 key results, and a resource ask), effectively handing off a well-scoped writing task with constraints.

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 86%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human reviews the AI’s drafted priorities, confirms they look right, and requests a specific wording change based on framing concerns ("Fix Retention" -> "Restore Retention Health"), while approving the rest.

**Turn 9:** Expected `passive_acceptance` → Got `delegation` (confidence: 83%)
- Expected because: Accepts the AI-generated risk assessment with 'yeah those are the right ones.' Acknowledges one good point (cannibalization) but doesn't engage with the mitigation strategies or the risk severity assessments. For a quarterly planning doc that leadership will read, this is notably low engagement.
- Classifier said: The human largely accepts the AI’s risk list and then hands off a clearly scoped next task: drafting an executive summary with a constraint/quality criterion (“tight one-pager that pulls it all together”).

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `delegation` (confidence: 83%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: After a brief acceptance of the JSON output, the human assigns a new, well-scoped task (write an email-validation regex) with clear constraints/quality criteria (basic/common formats, not full RFC coverage).

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 86%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: The human briefly accepts the implementation, then redirects the conversation to a new design concern (handling burst traffic / backpressure when DB can’t keep up), setting the next problem to solve rather than reviewing the existing code in detail.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 86%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The human accepts the proposed approach and then hands off a clearly scoped task (write tests) with specific quality criteria: verify buffer flush on size and time triggers, and verify circuit breaker fallback captures events.

