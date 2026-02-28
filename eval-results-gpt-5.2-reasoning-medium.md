# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** gpt-5.2-reasoning-medium
**Overall Accuracy:** 59.8% (55/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 60% | 6/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 23% | 3/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 73% | 8/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 78% | 7/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 38% | 3/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 56% | 5/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 70% | 7/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 70% | 7/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 63% | 5/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 100% | 4/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 11 | . | . | 2 | . | 2 | . |
| friction | . | 5 | . | 2 | . | 1 | . |
| contribution | 1 | . | 8 | 1 | . | . | . |
| evaluation | 2 | 1 | . | 10 | . | 1 | . |
| passive_acceptance | 1 | . | 1 | 6 | 8 | 4 | 2 |
| delegation | . | . | 1 | 1 | . | 5 | . |
| capitulation | 3 | . | . | . | 4 | 1 | 8 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 11 | 15 | 73% | evaluation (2) |
| friction | 5 | 8 | 63% | evaluation (2) |
| contribution | 8 | 10 | 80% | steering (1) |
| evaluation | 10 | 14 | 71% | steering (2) |
| passive_acceptance | 8 | 22 | 36% | evaluation (6) |
| delegation | 5 | 7 | 71% | evaluation (1) |
| capitulation | 8 | 16 | 50% | passive_acceptance (4) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 4:** Expected `contribution` → Got `steering` (confidence: 86%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: The human clarifies the real requirements (fast global uniqueness check, no persistence needed beyond ~60s), rejects one option as overkill, and sets the new direction: use hash tags on the existing Redis cluster plus an unpartitioned DB fallback in-transaction.

**Turn 5:** Expected `steering` → Got `evaluation` (confidence: 86%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The human is reviewing the AI’s proposed step-by-step flow and pointing out a potential concurrency/correctness issue (transaction isolation and race conditions in step 2a), requesting a specific fix rather than rejecting the overall direction.

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 94%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human accepts the explanation and then hands off a well-scoped implementation task: write a Go function, providing exact libraries, function inputs/outputs, error-wrapping pattern, and full table schemas/constraints.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 90%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human reviews the AI’s specific implementation, mentally traces the concurrent/idempotency behavior to confirm it works, agrees on the indexing note, and suggests a concrete improvement (add Prometheus metric on Redis failure) based on assessing the code’s quality.

### 02-pure-delegation.md

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 86%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The human primarily supplies requested details (app name, audience, CTA, lack of branding, key features) without critiquing the AI’s output or redirecting the approach.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human simply agrees to the proposed structure without adding reasoning, constraints, or feedback; they accept and move forward with no substantive engagement.

**Turn 3:** Expected `passive_acceptance` → Got `capitulation` (confidence: 78%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The human generally accepts the output and asks the AI to choose whether different colors should be used, without providing brand goals, audience, or constraints that would define decision criteria.

**Turn 5:** Expected `passive_acceptance` → Got `capitulation` (confidence: 74%)
- Expected because: Agrees to add a testimonials section simply because the AI suggested it. No consideration of whether this is right for their product.
- Classifier said: The human gives a broad acceptance (“it all looks fine”) and then asks the AI to decide what’s missing (“is it missing anything important?”) without providing goals or evaluation criteria, effectively offloading judgment to the AI.

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 86%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: The human agrees with the AI’s prioritization and gives a simple go-ahead (“Yeah add the testimonials”) without adding new constraints, criteria, or critical review.

**Turn 7:** Expected `passive_acceptance` → Got `delegation` (confidence: 78%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The human assigns a specific, bounded task (replace current testimonials with generic placeholder ones using fake names) and indicates they will swap in real testimonials later, setting clear constraints on what to produce.

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 88%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: The human briefly acknowledges the AI’s explanation and approves the placeholders without analysis, then simply asks to proceed to the next step (“do the mobile thing”) without adding constraints or direction.

**Turn 9:** Expected `passive_acceptance` → Got `steering` (confidence: 83%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The human redirects the conversation from CSS tweaks to the next goal (getting the site live soon) and frames a new decision/problem—choosing the easiest deployment method for a single HTML file—setting direction and constraints (speed, simplicity).

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human briefly agrees to follow the suggested steps ('Ok I'll try that') and thanks the AI without adding constraints, questions, or feedback on the approach.

**Turn 11:** Expected `passive_acceptance` → Got `evaluation` (confidence: 78%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The human reports the outcome of following the AI’s instructions (Netlify deployment) and identifies a specific problem (mobile styling messed up), asking what went wrong—i.e., checking/debugging the AI-guided result rather than setting new goals or providing unrelated context.

### 03-progressive-reliance.md

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 78%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: The human refines the task direction by adding a key methodological constraint (reference-date feature generation to avoid leakage) and clarifying how queries should be structured. They also provide schema corrections, but the main impact is redirecting how the pipeline should be designed.

**Turn 8:** Expected `capitulation` → Got `delegation` (confidence: 86%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The human accepts the proposal and assigns a concrete next task (produce risk scoring output and an executive summary) with clear constraints/quality criteria (non-technical, focus on at-risk accounts and actions, audience is VP CS, deadline Friday).

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 90%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The human reviews the AI’s specific executive summary, approves it, and requests a targeted wording change (removing the explicit 83% accuracy figure) based on how the audience might interpret it.

### 04-strategic-delegator.md

**Turn 4:** Expected `steering` → Got `evaluation` (confidence: 72%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: The human reviews the AI’s specific code/output, pointing out a correctness issue with the cursor (needs created_at + id), requesting a concrete implementation change (use existing httputil.WriteError), and affirming pagination logic. They also add a brief direction change at the end, but the primary action is quality-checking and specifying fixes to the produced endpoint.

**Turn 5:** Expected `delegation` → Got `contribution` (confidence: 83%)
- Expected because: Provides the complete schema, validation rules, and error response format for the new preferences endpoint. Very precisely scoped — all design decisions are made, only execution is handed off.
- Classifier said: The human primarily supplies new required context/specification for the preferences endpoint (route, request/response schema, validation rules, sqlc function name, rate-limiting middleware) without critiquing the AI’s prior output or debating approach.

### 05-false-evaluator.md

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 86%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: The human explicitly reviews and validates the AI’s specific competitor analysis and feature mapping (“that’s correct… looks right… analysis… is solid”) and adds a confirming customer anecdote, which is assessment of the output rather than new standalone context or redirection.

**Turn 3:** Expected `passive_acceptance` → Got `evaluation` (confidence: 68%)
- Expected because: 'Makes sense, that's a good point' and 'I agree with your assessment' — the AI raised a nuanced pricing analysis and SWOT. The human agrees with everything including the weaknesses section about their own product without pushback. Evaluative language masking passive acceptance.
- Classifier said: The human explicitly validates a specific insight from the AI (“good point about the Asana refugees”) and corroborates it with their pipeline experience, then simply asks to proceed to the next section (SWOT). The core engagement is confirming the AI’s output rather than adding new standalone context or redirecting the approach.

**Turn 5:** Expected `passive_acceptance` → Got `evaluation` (confidence: 78%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: The human largely validates the AI’s recommendations (‘exactly right’, board will resonate) while also critiquing a specific part as needing more nuance and requests a targeted revision (flesh out Monday.com hidden costs). This is review of the AI output with a concrete improvement request.

**Turn 6:** Expected `capitulation` → Got `steering` (confidence: 74%)
- Expected because: 'What do you think we should lead with?' — asking the AI to make a strategic framing decision about how to present to the board. This goes beyond passive acceptance into actively offloading judgment.
- Classifier said: They affirm the output and then set the next direction for the work by asking how to structure the final document—specifically requesting the opening narrative to frame the analysis for the board.

**Turn 7:** Expected `passive_acceptance` → Got `delegation` (confidence: 72%)
- Expected because: 'Great recommendation' — accepts the recommended framing and asks to compile the full document, with no engagement about whether the board would actually respond well to that framing. Also 'I'll review it' is a promise of future evaluation that offloads current evaluation.
- Classifier said: The human approves the proposed opening and hands off a specific next task—compile the full document—adding a timeline for their review, without offering substantive critique or new strategic direction.

### 06-domain-shift.md

**Turn 1:** Expected `friction` → Got `evaluation` (confidence: 81%)
- Expected because: Pushes back on the AI's color suggestion. Provides a specific design-informed reason (rose gold is overdone in this space) and redirects toward their own aesthetic preference with a specific hex code.
- Classifier said: The human directly reviews the AI’s proposed palette (agrees overall, rejects rose gold as overused, and critiques the branding implication), then suggests a specific alternative accent color with justification.

**Turn 2:** Expected `contribution` → Got `evaluation` (confidence: 72%)
- Expected because: Brings specific knowledge about the client's products and the physical packaging constraint (amber glass jars already sourced). The AI cannot know any of this and it fundamentally changes the design direction.
- Classifier said: The human both supplies new context (6-product range, amber glass is non-negotiable) and explicitly evaluates the AI’s proposed palette against that constraint, confirming forest green works and noting clay/sand tones fail on amber.

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 86%)
- Expected because: Examines the AI's three label approach options critically. Confirms option 1 (clear label) based on their own test prints, adds the botanical illustration decision, and specifies the numbering system. Demonstrating they've been thinking ahead of the AI.
- Classifier said: The human makes key decisions and sets the direction (chooses clear label, selects botanical line drawings + numbering system, specifies typography placement), adding reasoning and concrete implementation details rather than merely accepting or critiquing the AI’s output.

**Turn 6:** Expected `capitulation` → Got `steering` (confidence: 63%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: The human acknowledges the info and then directs the conversation to a specific next focus (how to handle the home office deduction), while providing relevant context (income amount and software used) to shape what the AI should address next.

### 07-friction-heavy.md

**Turn 7:** Expected `evaluation` → Got `friction` (confidence: 74%)
- Expected because: AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection.
- Classifier said: The human explicitly pushes back on the AI’s characterization of Framework Analysis as insufficiently flexible, challenging the AI’s framing/approach. They then reaffirm CGT and introduce a related methodological concern (integrating screenshots with verbal data), but the defining move is the pushback on direction/characterization rather than merely adding context or evaluating specific output details.

**Turn 8:** Expected `steering` → Got `delegation` (confidence: 83%)
- Expected because: Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work.
- Classifier said: The human assigns a well-scoped writing task (draft a full, publishable-quality methods section) with clear quality criteria (journal submission) and required components (study design, participants, data collection, analysis).

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 93%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: The human is critiquing the AI’s specific draft methods section—commenting on prose uniformity, performative phrasing, and how citations are integrated—and requesting targeted revisions to improve human-like academic style, which is direct review of the output rather than redefining the task or rejecting the overall approach.

### 08-mixed-realistic.md

**Turn 5:** Expected `steering` → Got `delegation` (confidence: 78%)
- Expected because: Accepts the revision with 'ok that's better' (brief) then redirects to a new section and provides the strategic frame for Q1 priorities. The dominant action is direction-setting for the next piece of work.
- Classifier said: The human accepts the revision and then hands off a clearly scoped next task (write the Q1 priorities section) with explicit content framing and quality criteria (priority ordering, goal + 2–3 key results + resource ask for each).

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 90%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human reviews the AI’s drafted priorities, confirms they look right, and requests a specific wording change to improve framing; this is feedback on the specific output rather than redirecting the overall approach.

**Turn 9:** Expected `passive_acceptance` → Got `delegation` (confidence: 86%)
- Expected because: Accepts the AI-generated risk assessment with 'yeah those are the right ones.' Acknowledges one good point (cannibalization) but doesn't engage with the mitigation strategies or the risk severity assessments. For a quarterly planning doc that leadership will read, this is notably low engagement.
- Classifier said: The human mostly accepts the identified risks, then hands off a clearly scoped next task: draft an executive summary as a tight one-page synthesis. The 'tight one-pager' is a concrete constraint/quality criterion, indicating delegation rather than passive acceptance.

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `delegation` (confidence: 72%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: The human briefly approves the simple JSON and then hands off a clearly scoped new task (write an email-validation regex) with constraints/quality criteria (basic validation, common formats, not full RFC coverage).

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 86%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: The human briefly accepts the implementation, then redirects the conversation toward a new goal: designing for burst traffic/backpressure when the DB can’t keep up during event spikes (a scaling/architecture edge case).

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 86%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The human accepts the proposed approach and hands off a well-scoped task (write tests) with explicit quality criteria: verify flush on size and time triggers and verify circuit breaker fallback captures events.

