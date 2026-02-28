# Classifier Evaluation Report

**Date:** 2026-02-21
**Model:** gpt-5.2-reasoning-low
**Overall Accuracy:** 60.9% (56/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 60% | 6/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 15% | 2/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 55% | 6/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 89% | 8/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 75% | 6/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 67% | 6/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 70% | 7/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 60% | 6/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 63% | 5/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 100% | 4/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 12 | . | . | 2 | . | 1 | . |
| friction | . | 5 | . | 2 | . | 1 | . |
| contribution | . | 1 | 9 | . | . | . | . |
| evaluation | 5 | . | . | 8 | . | 1 | . |
| passive_acceptance | 2 | . | 1 | 5 | 10 | 2 | 2 |
| delegation | . | . | 1 | 1 | . | 5 | . |
| capitulation | 2 | . | 1 | . | 4 | 2 | 7 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 12 | 15 | 80% | evaluation (2) |
| friction | 5 | 8 | 63% | evaluation (2) |
| contribution | 9 | 10 | 90% | friction (1) |
| evaluation | 8 | 14 | 57% | steering (5) |
| passive_acceptance | 10 | 22 | 45% | evaluation (5) |
| delegation | 5 | 7 | 71% | evaluation (1) |
| capitulation | 7 | 16 | 44% | passive_acceptance (4) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 4:** Expected `contribution` → Got `friction` (confidence: 74%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: The human pushes back on the AI’s proposed direction (dedicated Redis instance is ‘overkill’) and redirects to a different approach (hash-tagging on existing cluster plus DB fallback), including reasoning about requirements (no persistence needed).

**Turn 5:** Expected `steering` → Got `evaluation` (confidence: 86%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The human is scrutinizing the AI’s proposed transaction logic (step 2a) and identifying a potential concurrency/isolation issue, suggesting specific corrections (SERIALIZABLE or row-level locking). This is feedback on the specific output rather than rejecting the overall architecture.

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 92%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human accepts the explanation and then hands off a clearly scoped implementation task: write a Go function with specified libraries (pgx/v5, go-redis/v9), inputs/outputs, error-wrapping convention, idempotency behavior, and exact table schemas/columns. They provide concrete constraints and success criteria rather than asking the AI to decide direction.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 78%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human reviews the provided implementation, confirms it "looks right" by mentally tracing a concurrency scenario, agrees with the indexing note, and suggests a specific improvement (add a Prometheus metric on Redis fallback). This is quality-checking and modifying the AI’s specific output rather than changing overall direction.

### 02-pure-delegation.md

**Turn 0:** Expected `capitulation` → Got `steering` (confidence: 72%)
- Expected because: Extremely vague request with no constraints, structure, or scoping. 'I need a landing page' gives the AI total decision-making authority over implementation.
- Classifier said: The human sets the overall direction and goal (build a landing page for a meal planning app) and provides basic context; they also note their low HTML expertise, but they are primarily defining what needs to be done rather than specifying detailed criteria or evaluating prior output.

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 86%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The human primarily supplies requested details (app name, target audience, CTA, lack of brand colors, key features) without critiquing the AI’s approach or evaluating any output.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 86%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human briefly approves the proposed layout without adding reasoning, constraints, or modifications, indicating acceptance rather than steering or evaluation.

**Turn 3:** Expected `passive_acceptance` → Got `capitulation` (confidence: 74%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The human accepts the output and asks the AI to decide whether to change the color scheme without providing goals, brand constraints, or evaluation criteria, effectively offloading the judgment call.

**Turn 5:** Expected `passive_acceptance` → Got `capitulation` (confidence: 74%)
- Expected because: Agrees to add a testimonials section simply because the AI suggested it. No consideration of whether this is right for their product.
- Classifier said: The human broadly accepts the content and then asks the AI to decide what’s missing (“is it missing anything important?”) without providing criteria or goals, effectively offloading judgment.

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 74%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: The human agrees with the AI’s recommendation and green-lights the next step (add testimonials) without adding new constraints, criteria, or deeper reasoning beyond brief assent.

**Turn 7:** Expected `passive_acceptance` → Got `steering` (confidence: 78%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The human redirects the task scope and requirements, asking to use generic placeholder testimonials with fake names for now and indicating they will replace them later.

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: The human accepts the AI’s explanation without adding constraints or critique and simply authorizes the next step (“do the mobile thing”) without shaping approach or criteria.

**Turn 9:** Expected `passive_acceptance` → Got `steering` (confidence: 78%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The human redirects from CSS/media queries to deployment planning, introducing a new goal (get it live soon) and asking for the easiest deployment approach for a single HTML file (Netlify vs Vercel).

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 90%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human briefly acknowledges the recommendation and plans to proceed without adding constraints, new information, or evaluating the specifics of the AI's guidance.

**Turn 11:** Expected `passive_acceptance` → Got `evaluation` (confidence: 74%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The human reports having tried the suggested Netlify deployment and observed a concrete problem (mobile styling messed up), implicitly testing the AI’s prior guidance and asking what went wrong.

### 03-progressive-reliance.md

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 84%)
- Expected because: Engages with the AI's feature engineering suggestions substantively. Confirms the churn definition, adds nuance about seasonal patterns, and pushes back on naive week-over-week trends. This is genuine assessment combined with domain knowledge.
- Classifier said: The human sets key constraints and redirects the feature-engineering approach: they define churn as explicit cancellation, caution against naive week-over-week login trends due to a monthly usage cycle, propose an alternative comparison (same-week-of-month), and remove seat_count from scope. This is primarily guiding what to do and how, not reviewing specific implementation output.

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 72%)
- Expected because: Reviews the proposed schema mapping and corrects specific details (table name, column name, join path). Still actively checking quality and catching issues in the AI's assumptions.
- Classifier said: They provide schema corrections, but most importantly they redirect how the pipeline should be built (reference-date/as-of feature generation to prevent leakage), adding a key constraint that shapes the overall approach.

**Turn 7:** Expected `capitulation` → Got `delegation` (confidence: 74%)
- Expected because: 'Can you just interpret these for me' — explicitly asking the AI to do the thinking. They received model results but are not even attempting to interpret them. This is a clear shift from earlier turns where they were actively analyzing.
- Classifier said: The human provides concrete results (AUCs, std devs, top features) and asks the AI to interpret them—handing off a specific, well-scoped task using supplied data rather than evaluating the AI’s prior code or changing direction.

**Turn 8:** Expected `capitulation` → Got `delegation` (confidence: 90%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The human accepts the proposed next steps and assigns a clear deliverable (risk scoring output + exec summary) with concrete constraints and quality criteria (non-technical, tailored to VP CS, focus on at-risk accounts and actions, deadline Friday).

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 86%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The human reviews the AI’s specific executive summary, approves it, and requests a precise edit (replace “83% accuracy” with more qualitative wording) while otherwise accepting the output.

### 04-strategic-delegator.md

**Turn 4:** Expected `steering` → Got `evaluation` (confidence: 66%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: The human primarily reviews the AI’s specific code output, identifying a concrete pagination/cursor correctness issue (needs created_at+id) and requesting a specific change (use existing httputil.WriteError). Although they also redirect priorities at the end, the core engagement is quality-checking and modifying the provided implementation.

### 05-false-evaluator.md

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 82%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: The human is explicitly reviewing and confirming the AI’s specific competitor analysis and feature mapping as correct, citing agreement with a particular point (Monday.com “mile wide, inch deep”) based on customer feedback.

**Turn 5:** Expected `passive_acceptance` → Got `evaluation` (confidence: 82%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: The human affirms the AI’s recommendations, then critiques a specific part (pricing comparison lacks nuance) and requests a concrete refinement (add Monday.com hidden costs) based on board feedback—reviewing and modifying the AI’s output rather than redefining the overall direction.

### 06-domain-shift.md

**Turn 1:** Expected `friction` → Got `evaluation` (confidence: 87%)
- Expected because: Pushes back on the AI's color suggestion. Provides a specific design-informed reason (rose gold is overdone in this space) and redirects toward their own aesthetic preference with a specific hex code.
- Classifier said: The human is reacting to and critiquing specific elements of the AI’s proposed palette (rejecting rose gold as overused, wanting to avoid an 'instagram skincare' look) and suggesting a concrete revision (deep forest green accent with specific hex guidance) based on brand fit.

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 78%)
- Expected because: Examines the AI's three label approach options critically. Confirms option 1 (clear label) based on their own test prints, adds the botanical illustration decision, and specifies the numbering system. Demonstrating they've been thinking ahead of the AI.
- Classifier said: The human makes key directional decisions (choose clear label, differentiation strategy, numbering system) and specifies how the design will be executed, effectively setting the plan forward. They also add some new context (test print, commissioned illustrator), but the primary function is setting direction.

**Turn 6:** Expected `capitulation` → Got `contribution` (confidence: 74%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: The human mainly provides new contextual data (income amount and deductible-related details like home office and software use) and asks a follow-up question to enable the AI to advise; they are not judging or critiquing the AI’s prior output.

### 07-friction-heavy.md

**Turn 7:** Expected `evaluation` → Got `steering` (confidence: 74%)
- Expected because: AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection.
- Classifier said: They largely align with the CGT direction but actively shape the approach: they correct the framing of Framework Analysis, specify a desired coding workflow (initial→focused→theoretical), introduce a key methodological constraint (integrating screenshots with verbal narratives), and ask how to handle the multi-modal analysis going forward.

**Turn 8:** Expected `steering` → Got `delegation` (confidence: 86%)
- Expected because: Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work.
- Classifier said: The human hands off a well-scoped task—draft a full, publishable-quality methods section—with clear deliverables (study design, participants, data collection, analysis) and target venues (HCI/CSCW), providing constraints/quality bar rather than merely accepting or critiquing the prior output.

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 90%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: The human is reviewing the AI’s specific draft methods section and providing concrete critique on prose uniformity, performative phrasing, and how citations are integrated, requesting targeted revisions to improve human-like academic writing.

### 08-mixed-realistic.md

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 86%)
- Expected because: Reviews the AI's proposed structure and gives substantive feedback. Flags one section as unnecessary (competitive landscape — already covered) and suggests adding something specific (technical debt section). Genuine quality assessment.
- Classifier said: The human is redirecting the document structure by removing a section (competitive landscape) and adding a new one (technical debt) with rationale tied to leadership preferences, while generally endorsing the overall framing.

**Turn 3:** Expected `delegation` → Got `contribution` (confidence: 84%)
- Expected because: AMBIGUOUS between passive_acceptance and delegation. Says 'yeah that works' to the outline (passive) but then hands off the Q4 review section with clear inputs — specific metrics and the narrative frame. The dominant action is the well-scoped delegation with detailed data handoff. Leaning delegation.
- Classifier said: The human largely accepts the proposed structure and supplies the concrete Q4 metrics, retention diagnosis details, product milestones, and a note on how to frame the hiring miss—primarily providing needed content/context rather than critiquing the AI’s output or changing the overall approach.

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 86%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human reviews the AI’s drafted priorities, confirms they look right, and requests a specific wording change (“Fix Retention” → “Restore Retention Health”) based on CEO framing sensitivity—feedback on the concrete output rather than redirecting the overall approach.

**Turn 9:** Expected `passive_acceptance` → Got `delegation` (confidence: 83%)
- Expected because: Accepts the AI-generated risk assessment with 'yeah those are the right ones.' Acknowledges one good point (cannibalization) but doesn't engage with the mitigation strategies or the risk severity assessments. For a quarterly planning doc that leadership will read, this is notably low engagement.
- Classifier said: The human largely agrees with the risk list (minimal evaluation) and then hands off a well-scoped next task: drafting an exec summary with a concrete constraint (a tight one-pager that pulls it all together).

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `delegation` (confidence: 78%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: The human briefly accepts the JSON output, then assigns a new, well-scoped task (write an email-validation regex) with clear constraints/quality criteria (basic validation, common formats, not full RFC edge cases).

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 74%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: The human briefly accepts the implementation, then redirects the conversation to a new concern—handling burst traffic when the DB can’t keep up—introducing a scaling/edge-case requirement that sets the next direction.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 91%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The human accepts the proposed approach and then hands off a well-scoped task (write tests) with clear quality criteria: verify flush behavior on size and time triggers and verify circuit breaker fallback captures events.

