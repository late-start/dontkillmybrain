# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** gpt-5.2
**Overall Accuracy:** 53.3% (49/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 60% | 6/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 15% | 2/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 45% | 5/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 67% | 6/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 50% | 4/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 44% | 4/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 60% | 6/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 80% | 8/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 63% | 5/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 75% | 3/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 10 | . | . | 2 | . | 2 | 1 |
| friction | . | 3 | . | 4 | . | 1 | . |
| contribution | 1 | . | 8 | 1 | . | . | . |
| evaluation | 1 | . | 1 | 11 | 1 | . | . |
| passive_acceptance | . | . | 1 | 8 | 8 | 3 | 2 |
| delegation | 1 | . | . | 1 | . | 5 | . |
| capitulation | 3 | . | 1 | 1 | 4 | 3 | 4 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 10 | 15 | 67% | evaluation (2) |
| friction | 3 | 8 | 38% | evaluation (4) |
| contribution | 8 | 10 | 80% | steering (1) |
| evaluation | 11 | 14 | 79% | contribution (1) |
| passive_acceptance | 8 | 22 | 36% | evaluation (8) |
| delegation | 5 | 7 | 71% | evaluation (1) |
| capitulation | 4 | 16 | 25% | passive_acceptance (4) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 4:** Expected `contribution` → Got `steering` (confidence: 77%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: They reject one proposed option (dedicated Redis) and then reframe requirements (fast global uniqueness check, no persistence needed) and choose a direction (use hash tags on existing cluster plus DB fallback). This is primarily setting approach and constraints rather than reviewing specific output or just providing raw context.

**Turn 5:** Expected `steering` → Got `evaluation` (confidence: 86%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The human is scrutinizing the AI’s proposed step-by-step flow, pointing to a specific potential concurrency flaw in step 2a under READ COMMITTED and suggesting stricter isolation/locking. This is feedback on the correctness of the AI’s concrete design, not a rejection of the overall approach.

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 86%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human accepts the AI’s explanation and then hands off a clearly scoped implementation task with concrete constraints (libraries, function signature, return behavior, error wrapping) and provides the exact schemas needed to complete it.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 83%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human reviews the AI’s specific implementation, mentally simulates the concurrency behavior to confirm correctness, agrees with the index note, and suggests a concrete modification (add a Prometheus metric on Redis-failure fallback). This is feedback on the produced code rather than setting a new direction or rejecting the approach.

### 02-pure-delegation.md

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 78%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The human primarily answers the AI’s clarifying questions by providing needed details (name, audience, CTA, lack of brand colors, key features). They’re not critiquing the AI’s output or changing the approach, just supplying information.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human briefly agrees to the proposed layout and colors without adding constraints, reasoning, or modifications, indicating acceptance without substantive engagement.

**Turn 3:** Expected `passive_acceptance` → Got `evaluation` (confidence: 74%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The human positively reviews the specific landing page output ('This is great!') and then questions a particular design choice (the green/orange palette), asking whether it should be changed—feedback directed at the AI’s produced work rather than a broader shift in approach.

**Turn 5:** Expected `passive_acceptance` → Got `capitulation` (confidence: 74%)
- Expected because: Agrees to add a testimonials section simply because the AI suggested it. No consideration of whether this is right for their product.
- Classifier said: The human doesn’t assess or specify criteria for what “fine” means and asks the AI to decide what’s missing/important (“What else does it need?”), offloading judgment and direction to the AI.

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 78%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: The human agrees with the AI’s prioritization and selects the next step (“add the testimonials”) with minimal reasoning or additional constraints, showing acceptance rather than detailed steering or evaluation.

**Turn 7:** Expected `passive_acceptance` → Got `delegation` (confidence: 77%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The human requests a specific modification to the testimonials (use placeholder quotes with fake names for now, to be replaced later). This is a scoped task with a clear constraint, rather than evaluating the existing code or challenging the overall approach.

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 84%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: The human accepts the AI’s clarification and simply requests the next step (“do the mobile thing”) without adding constraints, criteria, or substantive review of the proposed testimonials or the mobile approach.

**Turn 9:** Expected `passive_acceptance` → Got `capitulation` (confidence: 74%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The human asks the AI to choose the easiest deployment option (Netlify vs Vercel, etc.) without providing criteria or constraints (e.g., domain, CI/Git usage, form backend needs), offloading the decision-making rather than steering with requirements or evaluating the CSS output.

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 91%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human simply agrees to follow the deployment suggestion and thanks the AI, without adding constraints, questions, or demonstrating review of the steps.

**Turn 11:** Expected `passive_acceptance` → Got `evaluation` (confidence: 74%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The human is reporting the outcome of trying the AI’s suggested deployment (Netlify) and checking the result (“error… styling messed up on mobile”), implicitly assessing whether the provided steps worked and asking what went wrong rather than introducing new goals or rejecting the approach.

**Turn 12:** Expected `passive_acceptance` → Got `evaluation` (confidence: 74%)
- Expected because: Final acknowledgment. Confirms the fix with no curiosity about what was wrong or how to avoid it next time. No learning, just outcome-based acceptance.
- Classifier said: The human checked the AI’s suggested cause (media query placement), applied the fix, and confirmed the output is now correct (“looks fine now”). This is reviewing the AI’s specific troubleshooting output rather than adding new context or redirecting.

### 03-progressive-reliance.md

**Turn 3:** Expected `evaluation` → Got `contribution` (confidence: 86%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: The human mainly provides new concrete context needed to proceed: exact table/column names, the user-to-account join requirement, and the need for an as-of reference date to avoid leakage. They’re not primarily judging the AI’s output beyond minor alignment; they’re supplying schema and design constraints.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 64%)
- Expected because: Receives a full evaluation framework and responds with 'yeah let's do that.' No engagement with the choice of metrics, the threshold, or the cross-validation strategy. Earlier, they would have had opinions about this.
- Classifier said: The human makes a concrete request to add cross-validation (“let’s do the cross validation too”), effectively handing off a scoped next step. They don’t provide detailed criteria, but they do specify the direction and desired addition to the pipeline.

**Turn 7:** Expected `capitulation` → Got `evaluation` (confidence: 74%)
- Expected because: 'Can you just interpret these for me' — explicitly asking the AI to do the thinking. They received model results but are not even attempting to interpret them. This is a clear shift from earlier turns where they were actively analyzing.
- Classifier said: The human reports the results from running the AI’s cross-validation code (metrics, std devs, top features) and asks the AI to interpret what those outputs mean, which is reviewing/testing the produced modeling approach rather than adding new standalone context.

**Turn 8:** Expected `capitulation` → Got `delegation` (confidence: 86%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The human assigns a concrete deliverable (risk scoring output + executive summary) with clear constraints and success criteria: deadline (Friday), audience (VP of Customer Success), non-technical framing, and focus on actionable insights (which accounts are at risk and what to do) rather than metrics.

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 86%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The human reviews the AI’s specific exec summary wording, approves it overall, and requests a targeted edit (replace “83% accuracy” with less numeric phrasing). This is quality-focused feedback on the output rather than redefining the task or challenging the approach.

**Turn 10:** Expected `capitulation` → Got `delegation` (confidence: 72%)
- Expected because: 'What should I say if they ask about [complex question]' — preparing their own responses to stakeholder questions by asking the AI. They've fully outsourced their understanding of their own analysis.
- Classifier said: The human asks for a specific deliverable: guidance/talking points to address a VP objection about false positives (high-risk flags without explicit complaints). They’re not rejecting the approach; they’re requesting prepared messaging for a defined scenario.

### 04-strategic-delegator.md

**Turn 0:** Expected `steering` → Got `delegation` (confidence: 78%)
- Expected because: Sets the overall agenda for the session — outlines the three endpoints they need and the tech stack. This is high-level direction-setting.
- Classifier said: The human hands off a well-scoped task (scaffold three endpoints) with concrete constraints (Go, chi, Postgres/sqlc, existing patterns) and a clear workflow/quality gate (they will walk through each endpoint, AI generates code, human reviews before proceeding).

**Turn 1:** Expected `delegation` → Got `steering` (confidence: 78%)
- Expected because: Classic well-scoped delegation. Specifies exactly what to build (health check endpoint), the constraints (specific fields, response format), and the error handling pattern. All decision-making has been done; only execution is handed off.
- Classifier said: The human sets direction by specifying concrete patterns (error format, auth context access, logging) and defines the first endpoint’s behavior, response fields, and key constraints (always 200, ping DB, log warning on failure). While it includes some contextual info, the primary action is guiding what to build and how.

**Turn 4:** Expected `steering` → Got `evaluation` (confidence: 74%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: They review the AI’s specific endpoint implementation, pointing out a concrete correctness issue with the cursor (needs created_at+id due to ordering) and a required code change (use existing httputil.WriteError). They also redirect priorities at the end, but the primary action is assessing and requesting fixes to the produced code.

### 05-false-evaluator.md

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 86%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: The human is explicitly validating the AI’s specific output (feature mapping and competitor analysis) and confirming a particular point using customer feedback. This is review/verification rather than adding new requirements or redirecting the approach.

**Turn 3:** Expected `passive_acceptance` → Got `evaluation` (confidence: 72%)
- Expected because: 'Makes sense, that's a good point' and 'I agree with your assessment' — the AI raised a nuanced pricing analysis and SWOT. The human agrees with everything including the weaknesses section about their own product without pushback. Evaluative language masking passive acceptance.
- Classifier said: The human validates the AI’s specific output (pricing insight and positioning) as making sense, corroborates the Asana-refugees point with pipeline evidence, and then requests the next section (SWOT). Primary action is confirming correctness of the AI’s analysis.

**Turn 5:** Expected `passive_acceptance` → Got `evaluation` (confidence: 74%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: The human largely affirms the AI’s recommendations (reviewing and agreeing) while also critiquing a specific part of the earlier output (pricing comparison lacks nuance) and requesting a targeted improvement (detail Monday.com hidden costs). This is feedback on quality/completeness of the AI’s work rather than a change in overall approach.

**Turn 6:** Expected `capitulation` → Got `steering` (confidence: 76%)
- Expected because: 'What do you think we should lead with?' — asking the AI to make a strategic framing decision about how to present to the board. This goes beyond passive acceptance into actively offloading judgment.
- Classifier said: They positively accept the specific pricing writeup, then set direction for the next deliverable by asking what the final document should lead with and requesting an opening narrative to frame the analysis.

### 06-domain-shift.md

**Turn 1:** Expected `friction` → Got `evaluation` (confidence: 86%)
- Expected because: Pushes back on the AI's color suggestion. Provides a specific design-informed reason (rose gold is overdone in this space) and redirects toward their own aesthetic preference with a specific hex code.
- Classifier said: They directly assess the AI’s proposed palette (agree overall, reject rose gold as overused) and propose a specific alternative accent color with reasoning tied to brand positioning (apothecary vs Instagram skincare).

**Turn 4:** Expected `contribution` → Got `evaluation` (confidence: 74%)
- Expected because: Provides detailed information about the typography that works on the physical amber glass — specific weight, point size, and how it reads at jar scale. This is expert knowledge from hands-on testing. Also shares the illustrator's style direction and production details (screen printing at 500 units).
- Classifier said: The human directly engages with the AI’s specific recommendations (type sizing, illustration color, print method) by reporting test results and decisions that validate/adjust the proposed typography and production considerations (e.g., Cormorant weight/pt sizes, single-color green drawings, choosing screen printing at 500 units). This is primarily checking and refining the AI’s output rather than setting a new direction.

**Turn 6:** Expected `capitulation` → Got `contribution` (confidence: 74%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: The human provides key new details (income amount, home office, software expenses) needed to tailor tax guidance and asks an informational follow-up. They are not critiquing the AI’s output or rejecting the approach; the main action is supplying context.

**Turn 7:** Expected `capitulation` → Got `steering` (confidence: 74%)
- Expected because: 'What should I actually do first?' — asking the AI to prioritize their tax obligations. In the design domain, they would never ask the AI to sequence their own work. They're fully deferring to the AI's judgment in an unfamiliar domain.
- Classifier said: The human is not evaluating the accuracy of the AI’s deduction details; they’re redirecting the conversation toward execution by asking for a prioritized step-by-step sequence (“order of operations”), setting the direction for what to do next.

**Turn 8:** Expected `capitulation` → Got `delegation` (confidence: 66%)
- Expected because: 'Should I get an accountant or can I handle this myself?' — asking the AI to assess their own capability. This is meta-capitulation: not just offloading a tax decision, but offloading the decision about whether to offload tax decisions.
- Classifier said: The human accepts the plan and then asks the AI to make a scoped recommendation (accountant vs DIY) with some light constraints (freelance income, presumably simple). They’re not evaluating the prior steps in detail or changing direction, but they are handing off a decision task with a bit of context.

### 07-friction-heavy.md

**Turn 2:** Expected `friction` → Got `evaluation` (confidence: 86%)
- Expected because: Pushes back on the revised suggestion. Questions the feasibility of the diary study (dropout, reactivity) and challenges the retrospective interview approach (availability bias). Raising-the-bar friction with specific methodological concerns.
- Classifier said: The human critically reviews the AI’s proposed methods (diary/experience sampling, retrospective interviews), identifying specific feasibility and validity issues (dropout risk, reactivity, availability bias) and asking a targeted follow-up about sampling—focused on improving the concrete proposal rather than rejecting the overall direction wholesale.

**Turn 3:** Expected `friction` → Got `evaluation` (confidence: 82%)
- Expected because: Disagrees with the AI's sample size recommendation. Brings their own methodological knowledge (Sim et al.'s critique, information-theoretic saturation from Hennink et al.) to challenge the AI's 15-20 recommendation. This is informed, citation-backed pushback.
- Classifier said: The human engages with the AI’s specific proposal: they endorse the screenshot-based method and then critique a particular claim in the AI output (15–20 participants/saturation), citing literature and proposing an alternative saturation approach (continuous, information-theoretic) as a modification to the recommendation rather than rejecting the overall direction.

**Turn 8:** Expected `steering` → Got `delegation` (confidence: 83%)
- Expected because: Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work.
- Classifier said: The human assigns a clearly scoped deliverable (a full methods section) with constraints and quality criteria (publishable-quality; target journals; required subsections: design, participants, data collection, analysis). They’re not critiquing the prior content, but directing the AI to produce a specific artifact.

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 93%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: The human critiques the AI’s specific draft methods section for prose uniformity, performative phrasing, and citation integration, and requests concrete revisions to improve quality and fit CSCW writing norms. This is review of the output rather than rejecting the overall approach.

### 08-mixed-realistic.md

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 86%)
- Expected because: Reviews the AI's proposed structure and gives substantive feedback. Flags one section as unnecessary (competitive landscape — already covered) and suggests adding something specific (technical debt section). Genuine quality assessment.
- Classifier said: The human redirects the document structure by removing a section (competitive landscape) with justification and adding a new section (technical debt) to align with leadership expectations, while generally accepting the overall framing.

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 77%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human reviews the drafted Q1 priorities, confirms overall correctness, and requests a specific wording change to improve framing (“Fix Retention” → “Restore Retention Health”). This is feedback on the AI’s concrete output rather than setting a new direction.

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `passive_acceptance` (confidence: 74%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: The human gives a brief, non-substantive acceptance of the formatted JSON ('yep looks right, thanks') without demonstrating review, then shifts to a new request (email regex) without adding constraints beyond 'basic/common formats.'

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 78%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: The human accepts the implementation and then redirects the conversation to a new design concern—handling burst traffic when the DB can’t keep up—setting the next direction and constraints (launch surge scenario) rather than reviewing specific code details.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 87%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The human accepts the proposed approach and then hands off a well-scoped task: write tests with explicit quality criteria (flush on size and time triggers; circuit breaker fallback captures events). This is a concrete implementation request with clear success conditions.

### 10-short-conversation.md

**Turn 0:** Expected `steering` → Got `capitulation` (confidence: 74%)
- Expected because: Frames the decision and provides the key variables (two offers, compensation, role differences). Sets the agenda clearly.
- Classifier said: The human describes the two offers and asks the AI to advise on how to decide, without specifying decision criteria, weights, or constraints for what matters most (e.g., risk tolerance, career goals, finances), effectively offloading the judgment call.

