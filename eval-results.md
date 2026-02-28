# Classifier Evaluation Report

**Date:** 2026-02-21
**Overall Accuracy:** 53.3% (49/92 turns)

## Summary

| Conversation | Accuracy | Correct/Total | Scenario |
|---|---|---|---|
| 01-strong-collaborator.md | 50% | 5/10 | A strong collaborator who steers, contributes domain knowled... |
| 02-pure-delegation.md | 23% | 3/13 | Pure delegation/capitulation pattern. The human has no techn... |
| 03-progressive-reliance.md | 64% | 7/11 | Progressive reliance pattern (Shen & Tamkin). Starts with st... |
| 04-strategic-delegator.md | 56% | 5/9 | Strategic delegation pattern (Dell'Acqua 'Centaur' model). A... |
| 05-false-evaluator.md | 63% | 5/8 | False evaluator pattern (Shaw & Nave confidence paradox). Th... |
| 06-domain-shift.md | 44% | 4/9 | Domain shift pattern (Lee et al. dual confidence model). The... |
| 07-friction-heavy.md | 50% | 5/10 | Friction-heavy pattern. A social science researcher who push... |
| 08-mixed-realistic.md | 70% | 7/10 | Mixed realistic pattern. A typical knowledge worker using AI... |
| 09-complexity-scaling.md | 63% | 5/8 | Complexity-proportional evaluation test. Early turns involve... |
| 10-short-conversation.md | 75% | 3/4 | Short conversation (4 human turns) testing edge case of limi... |

## Confusion Matrix

| Expected \ Actual | steering | friction | contribution | evaluation | passive_acceptance | delegation | capitulation |
|---|---|---|---|---|---|---|---|
| steering | 10 | . | . | 2 | . | 1 | 2 |
| friction | . | 3 | . | 4 | . | 1 | . |
| contribution | 1 | . | 7 | 2 | . | . | . |
| evaluation | 3 | 2 | . | 9 | . | . | . |
| passive_acceptance | 2 | . | 1 | 4 | 11 | 2 | 2 |
| delegation | 2 | . | 2 | 1 | . | 2 | . |
| capitulation | 2 | . | 2 | . | 4 | 1 | 7 |

## Per-Signal Accuracy

| Signal | Correct | Total | Accuracy | Most Common Misclass |
|---|---|---|---|---|
| steering | 10 | 15 | 67% | evaluation (2) |
| friction | 3 | 8 | 38% | evaluation (4) |
| contribution | 7 | 10 | 70% | evaluation (2) |
| evaluation | 9 | 14 | 64% | steering (3) |
| passive_acceptance | 11 | 22 | 50% | evaluation (4) |
| delegation | 2 | 7 | 29% | contribution (2) |
| capitulation | 7 | 16 | 44% | passive_acceptance (4) |

## Misclassifications

### 01-strong-collaborator.md

**Turn 3:** Expected `evaluation` → Got `friction` (confidence: 92%)
- Expected because: Engages with the AI's second suggestion substantively — agrees with part of the reasoning but identifies a specific gap in the analysis.
- Classifier said: The human is rejecting the AI's proposed CTE approach by identifying a fundamental flaw in its reasoning (cross-partition visibility problem), and simultaneously steering away from a direction the AI was exploring (Redis) by surfacing a critical operational constraint (Redis cluster latency jitter). This is not evaluation of specific output quality — it's rejection of the underlying approach/strategy. The human provides domain knowledge (Redis metrics) to argue why a proposed direction won't work at their scale, which is characteristic of friction. The approval of 'Redis approach' as 'right direction' is a steering signal within the friction, but the primary signal is the rejection of the CTE approach's fundamental viability.

**Turn 4:** Expected `contribution` → Got `steering` (confidence: 92%)
- Expected because: Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem.
- Classifier said: The human is actively decomposing the problem space and setting direction: explicitly rejecting the dedicated Redis instance option, articulating the actual requirements (fast globally unique check, 60-second persistence acceptable), and defining a hybrid architecture (hash tags + unpartitioned table fallback). This is deliberate problem framing and constraint-setting that shapes what gets built next, not feedback on existing output. The phrase 'let me think about what we actually need' signals active reasoning about goals and approach, not evaluation of the AI's suggestion.

**Turn 5:** Expected `steering` → Got `evaluation` (confidence: 92%)
- Expected because: Redirects the investigation based on the new information. Decomposes the problem into a specific next step.
- Classifier said: The human is reviewing the AI's specific proposed architecture (step 2a of the transaction flow) and identifying a concrete correctness issue: the isolation level assumption creates a race condition window. This is targeted review of the AI's output—catching a bug in the logic by verifying it against transaction semantics. The human cites their own database expertise (understanding READ COMMITTED behavior) while reviewing the AI's work, which is characteristic of evaluation, not friction. They're not rejecting the overall approach (Redis + dual-layer idempotency), just fixing a specific flaw in the transaction handling within that approach.

**Turn 7:** Expected `friction` → Got `delegation` (confidence: 95%)
- Expected because: Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed.
- Classifier said: The human is handing off a well-scoped task to the AI with clear constraints and quality criteria. They've specified: exact libraries (pgx/v5, go-redis/v9), function signature requirements (context, order ID, amount, customer ID), expected return behavior (payment ID on success or duplicate), error handling pattern (fmt.Errorf wrapping), and exact schema definitions. They've provided all the information needed for the AI to execute, and they're asking the AI to write the implementation. This is a textbook delegation — the work is bounded, the success criteria are explicit, and the human has transferred responsibility for execution while retaining oversight.

**Turn 8:** Expected `delegation` → Got `evaluation` (confidence: 92%)
- Expected because: Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want.
- Classifier said: The human is reviewing the AI's code output. They verify the concurrent transaction logic by tracing through it ('Transaction A gets past...'), confirm correctness ('This looks right'), and then identify a specific missing element in the implementation (lack of Prometheus metric in the Redis failure fallback). This is classic output review — checking that the code handles the race condition correctly and noting what's missing. The mention of their own monitoring setup (Prometheus) is context for evaluating the completeness of the solution, not a separate contribution. They're assessing the AI's work and asking for a specific modification based on quality criteria.

### 02-pure-delegation.md

**Turn 0:** Expected `capitulation` → Got `delegation` (confidence: 92%)
- Expected because: Extremely vague request with no constraints, structure, or scoping. 'I need a landing page' gives the AI total decision-making authority over implementation.
- Classifier said: The human is handing off a well-scoped task (build a landing page for a meal planning app) with an explicit constraint (they lack HTML/technical skills, so the AI should do the primary work). This is delegation — the task is defined, the scope is clear, and the human has implicitly set a quality criterion (functional landing page). It's not capitulation because the task itself is concrete and the domain (meal planning app) provides natural constraints. It's not steering because they're not reshaping the approach or adding strategic direction — they're assigning work.

**Turn 1:** Expected `passive_acceptance` → Got `contribution` (confidence: 85%)
- Expected because: Agrees to the AI's entire proposed structure without engaging with any of the specifics. 'Yeah that sounds good' is textbook passive acceptance.
- Classifier said: The human is providing domain knowledge and context the AI needs to proceed: app name (MealMate), target audience (busy professionals), primary CTA (waitlist signup), key features (meal planning, grocery lists, recipes), and constraints (no brand colors yet). The closing 'just go with that' is passive acceptance of the AI's general approach, but the primary action is information provision to enable the AI to build the landing page. This is pure context/data the AI didn't have before, not evaluation of AI work or steering toward a specific direction—the human is letting the AI decide how to structure and present these elements.

**Turn 2:** Expected `capitulation` → Got `passive_acceptance` (confidence: 95%)
- Expected because: 'Whatever you think looks best' — explicitly offloading an aesthetic decision to the AI. No constraints, no preferences expressed.
- Classifier said: The human acknowledges the AI's proposed structure without meaningful engagement—no questions, no refinements, no reasoning about why this approach works. They accept the direction wholesale and move forward. This is a brief affirmation after the AI provided a complex structural proposal, which exceeds what a glance could verify, making this passive rather than genuine evaluation. The human is not steering (no new constraints or reasoning), not evaluating (no checking of specific elements), and not contributing new information.

**Turn 3:** Expected `passive_acceptance` → Got `capitulation` (confidence: 78%)
- Expected because: Approves a large block of HTML/CSS without any indication they read or understood it. 'This is great' with no specifics.
- Classifier said: The human is asking the AI to make a design decision (color choice) without providing criteria, constraints, or their own judgment. They've acknowledged the AI's color selection exists ('you picked green and orange') but are asking the AI what they should do instead, rather than stating preferences, constraints (brand guidelines, target audience perception, accessibility), or asking for options with trade-offs. This is offloading the decision-making entirely to the AI.

**Turn 6:** Expected `capitulation` → Got `passive_acceptance` (confidence: 92%)
- Expected because: 'Can you just make up some placeholder ones' — asking the AI to generate fake testimonials rather than providing real ones. Offloading content decisions.
- Classifier said: The human acknowledges the AI's suggestion ('that makes sense') and directs the next action ('add the testimonials'), but provides no new criteria, constraints, or reasoning about HOW to implement it. They are not evaluating the specific output — no review of the testimonial section structure, no quality criteria, no domain-specific feedback. They are simply accepting the AI's recommendation and moving to the next sequential step without shaping the direction. This is procedural sequencing without engagement.

**Turn 7:** Expected `passive_acceptance` → Got `steering` (confidence: 92%)
- Expected because: Accepts the placeholder testimonials without comment. No engagement with the names, quotes, or whether they fit the brand.
- Classifier said: The human is redirecting the approach to testimonials — specifying that they want placeholder/fake testimonials rather than the realistic ones the AI provided, and establishing a workflow constraint (replace them later). This sets direction on HOW to handle the testimonials task, not just accepting what was offered. It's a constraint on the solution path, which is characteristic of steering.

**Turn 8:** Expected `capitulation` → Got `passive_acceptance` (confidence: 95%)
- Expected because: 'Should I use Netlify or Vercel or something?' — asking the AI to choose their deployment platform. This is a strategic decision being fully offloaded.
- Classifier said: The human acknowledges the testimonials work ('those work fine') without engaging with the substance, then instructs the AI to proceed to the next task ('do the mobile thing') without adding any constraints, reasoning, or direction about HOW to approach mobile responsiveness. This is sequential task progression without shaping the approach — characteristic of passive acceptance rather than steering (which would include reasoning about priorities or constraints) or delegation (which would specify what 'good' looks like).

**Turn 9:** Expected `passive_acceptance` → Got `capitulation` (confidence: 85%)
- Expected because: Accepts the AI's deployment recommendation and deployment steps without question. 'Ok I'll try that' with no further engagement.
- Classifier said: The human is asking the AI to make a judgment call ('Should I use Netlify or Vercel or something?') without providing criteria for evaluation. They haven't specified constraints like budget, ease of use priority, custom domain needs, or deployment frequency. The question 'What's the easiest way' asks the AI to decide what 'easiest' means for them without the human defining it. Throughout this conversation, the human has consistently deferred decision-making to the AI on design choices ('Whatever you think looks best, you know more about design than I do'), which reinforces the pattern. This is pure handoff of a judgment call, not delegation with defined constraints.

**Turn 10:** Expected `capitulation` → Got `passive_acceptance` (confidence: 95%)
- Expected because: Returns with a problem and immediately asks for help without attempting to debug. 'It's showing some error' with no details about the error.
- Classifier said: The human acknowledges the AI's deployment advice with a brief confirmation ('Ok I'll try that') and gratitude, but provides no engagement with the content—no questions, no verification, no pushback on the approach, no new direction. This is a simple acknowledgment moving forward without processing or shaping the next step.

**Turn 11:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: Confirms the fix worked with no understanding of what was wrong or why the fix worked. Pure outcome-based acceptance.
- Classifier said: The human is reporting a specific problem with the AI's output (styling broken on mobile) and implicitly asking the AI to identify what went wrong. This is evaluation of the AI's generated code — the human is checking the work, found an issue, and is asking the AI to diagnose it. The phrasing 'What did I do wrong' is actually the human taking responsibility, but the core action is presenting evidence that the AI's code/guidance didn't work as expected on actual deployment. This is verification/quality review of the AI's specific deliverable.

### 03-progressive-reliance.md

**Turn 4:** Expected `contribution` → Got `evaluation` (confidence: 92%)
- Expected because: Provides the actual date format and additional context about a data pipeline migration that the AI would have no way of knowing. This is domain knowledge from direct experience.
- Classifier said: The human is reviewing the AI's proposed code and catching a specific technical issue: the AI assumed timestamps were already in a queryable datetime format, but they're actually stored as ISO 8601 varchar strings. The human is pointing out this gap in the AI's output ('you'll need to cast those varchars in the queries') and providing the exact format detail needed to fix it. This is classic evaluation — checking the AI's work against actual schema reality and noting what needs correction. The acknowledgment ('Also the reference date approach is exactly what I had in mind') is confirmatory, reinforcing that this is a review of the AI's specific output, not a redirect of approach.

**Turn 7:** Expected `capitulation` → Got `contribution` (confidence: 92%)
- Expected because: 'Can you just interpret these for me' — explicitly asking the AI to do the thinking. They received model results but are not even attempting to interpret them. This is a clear shift from earlier turns where they were actively analyzing.
- Classifier said: The human is providing empirical results from running the model — specific metrics (AUC-ROC scores, cross-val std devs, feature importance rankings) — without simultaneously evaluating or critiquing the AI's work. They're asking the AI to interpret/analyze these results, not reviewing the code quality or approach. This is pure information provision (the output of the modeling pipeline) paired with a request for analysis, not an assessment of whether the AI's code was correct or appropriate.

**Turn 8:** Expected `capitulation` → Got `steering` (confidence: 92%)
- Expected because: 'Can you write the exec summary too' — offloading the synthesis and communication to the AI entirely. They've now outsourced not just the technical work but the interpretation and storytelling.
- Classifier said: The human is defining the direction and constraints for the next phase of work. They're specifying WHAT to do (exec summary), WHO it's for (VP of Customer Success), WHEN (Friday), and crucially, HOW to approach it (non-technical, focus on actionable risk and mitigation rather than model metrics). This goes beyond passive sequencing—they're shaping the strategy based on audience and business context. The constraint about audience expectations ('she doesn't care about AUC scores, she cares about...') is directional guidance that changes how the AI should frame the output.

**Turn 9:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: Accepts the executive summary — a document that represents their analysis to leadership — with minimal review. 'This is perfect' with one minor tweak that doesn't engage with the substance.
- Classifier said: The human is reviewing the AI's specific output (the exec summary) and catching a presentation issue — the phrasing of '83% accuracy' could mislead the VP. The human is not rejecting the approach or asking for a fundamental redirect; they're noting a specific flaw in how a metric is communicated in the deliverable and requesting a targeted fix. This is quality review of the produced work. The 'Otherwise ship it' confirms the overall direction is sound — they're only tuning presentation.

### 04-strategic-delegator.md

**Turn 1:** Expected `delegation` → Got `contribution` (confidence: 92%)
- Expected because: Classic well-scoped delegation. Specifies exactly what to build (health check endpoint), the constraints (specific fields, response format), and the error handling pattern. All decision-making has been done; only execution is handed off.
- Classifier said: The human is providing domain knowledge and context needed for the AI to generate correct code: error response format, auth patterns, logging setup, and detailed endpoint specification with constraints (return 200 even on DB failure, log warning, no 503). This is pure information provision — the human is not reviewing or evaluating any AI output yet. They are setting up the AI to proceed correctly on the first of three endpoints.

**Turn 3:** Expected `delegation` → Got `steering` (confidence: 95%)
- Expected because: Hands off the second endpoint with detailed specs — the SQL query shape, pagination parameters, and response format. Again, all design decisions are already made.
- Classifier said: The human is laying out the specification for the next endpoint with detailed requirements: parameters, defaults, constraints (limit bounds, pagination strategy), response format, field names, and specific sqlc function signatures to use. This is classic steering — defining what needs to be built, why (keyset pagination for efficiency), and how the AI should approach it (use these sqlc functions, this response shape, these validation rules). The human is not evaluating prior work or contributing isolated context; they are setting direction for the next task.

**Turn 4:** Expected `steering` → Got `evaluation` (confidence: 92%)
- Expected because: AMBIGUOUS between evaluation and steering. Catches a subtle cursor pagination issue (evaluation) but then pivots to reprioritize the work plan based on a Slack message (steering). The dominant action is redirecting the conversation to a new endpoint based on new information. Leaning steering because the reprioritization is the primary move.
- Classifier said: The human is reviewing the AI's specific code output and catching two concrete bugs: (1) the cursor encoding is missing `created_at` which will cause incorrect pagination, and (2) the `writeError` helper is redundant when `httputil.WriteError` already exists. Both are specific defects in the AI's implementation. The final sentence redirects the workflow, but that's secondary to the primary action of evaluating and correcting the code. The evaluation happens first and comprises the bulk of the cognitive work.

**Turn 5:** Expected `delegation` → Got `steering` (confidence: 95%)
- Expected because: Provides the complete schema, validation rules, and error response format for the new preferences endpoint. Very precisely scoped — all design decisions are made, only execution is handed off.
- Classifier said: The human is defining the third endpoint specification with comprehensive constraints: request schema, validation rules (including the compound quiet_hours constraint), response format, database function, and rate-limiting middleware. This establishes what needs to be built, why (the quiet_hours validation logic is non-trivial), and how to approach it (use the specific sqlc function and ratelimit middleware). This is classic steering — laying out the problem definition and direction for the next task.

### 05-false-evaluator.md

**Turn 2:** Expected `passive_acceptance` → Got `evaluation` (confidence: 85%)
- Expected because: 'Yes that's correct' and 'your analysis is solid' — but the AI just produced a detailed competitive breakdown with specific claims about competitor pricing, feature gaps, and market positioning. A real evaluator would check the facts or question the sourcing. This person just confirms without verifying.
- Classifier said: The human is reviewing the AI's output ('feature mapping looks right', 'analysis of the competitors is solid') and validating specific claims against their domain knowledge ('that's what we hear from customers'). They are checking the work and confirming correctness with concrete evidence from their experience. This is evaluation — they cite their own knowledge WHILE reviewing the AI's output, not to reject the approach, but to verify and affirm specific elements of the analysis.

**Turn 5:** Expected `passive_acceptance` → Got `steering` (confidence: 92%)
- Expected because: AMBIGUOUS. 'I think the pricing comparison needs more nuance' could be evaluation — they're noting something needs improvement. But they immediately ask the AI to 'flesh it out' rather than specifying what nuance is missing. They identified a problem but delegated the thinking about what the problem actually is. Leaning passive_acceptance because the 'evaluation' is too vague to constitute real cognitive engagement.
- Classifier said: The human validates the AI's direction ('That's exactly right') but then redirects focus by identifying a gap: the pricing comparison needs more nuance, specifically hidden costs for Monday.com. They frame this as a board concern, providing reasoning for why this matters. This is not evaluation of existing output (they're not checking correctness), nor passive acceptance (they're actively shaping what comes next). The human is setting a new direction within the ongoing task — defining what content matters most and why it matters to the audience. This is steering: 'here's what we should focus on and why.'

**Turn 7:** Expected `passive_acceptance` → Got `delegation` (confidence: 92%)
- Expected because: 'Great recommendation' — accepts the recommended framing and asks to compile the full document, with no engagement about whether the board would actually respond well to that framing. Also 'I'll review it' is a promise of future evaluation that offloads current evaluation.
- Classifier said: The human is handing off a well-scoped task (compile the full document) with clear quality criteria (ready for board review, will be edited before Thursday). The human has defined what 'good' looks like through the entire conversation — they've validated the structure, content, framing, and now are asking for assembly. The stated intent to review and edit indicates they've set boundaries and know what they're evaluating for. This is delegation, not passive_acceptance, because constraints and success criteria are implicit in the conversation trajectory.

### 06-domain-shift.md

**Turn 1:** Expected `friction` → Got `evaluation` (confidence: 92%)
- Expected because: Pushes back on the AI's color suggestion. Provides a specific design-informed reason (rose gold is overdone in this space) and redirects toward their own aesthetic preference with a specific hex code.
- Classifier said: The human is reviewing the AI's specific color palette proposal. They affirm parts ('palette direction is right') and reject a specific element (rose gold) with reasoning grounded in market observation and brand differentiation. They then propose a concrete alternative (forest green #2D5F2D) with justification tied to positioning ('apothecary than beauty counter'). This is targeted critique of the AI's output, not a rejection of the overall design approach — the human is refining within the established direction, not saying 'we should do this differently fundamentally.' The criticism is specific to color choice execution, not methodology.

**Turn 3:** Expected `evaluation` → Got `steering` (confidence: 92%)
- Expected because: Examines the AI's three label approach options critically. Confirms option 1 (clear label) based on their own test prints, adds the botanical illustration decision, and specifies the numbering system. Demonstrating they've been thinking ahead of the AI.
- Classifier said: The human is not reviewing the AI's specific output or pushing back on its approach. Instead, they are decisively moving the project forward by committing to concrete directional choices—clear labels, botanical illustrations as differentiators, and a numbering system—while also providing new information (test print completed, illustrator already commissioned, ingredient-to-drawing mapping). This reshapes what the team is doing next and why. The phrase 'I'm going with' signals decision and direction-setting, not evaluation of the AI's work. They're defining the path forward with reasoning ('that apothecary authenticity you can't fake'), which is steering, not passive acceptance.

**Turn 4:** Expected `contribution` → Got `evaluation` (confidence: 92%)
- Expected because: Provides detailed information about the typography that works on the physical amber glass — specific weight, point size, and how it reads at jar scale. This is expert knowledge from hands-on testing. Also shares the illustrator's style direction and production details (screen printing at 500 units).
- Classifier said: The human is responding to the AI's technical questions about type sizing and printing method by reporting on their own testing and validation work. They're confirming decisions with evidence ('I've been testing that actually', 'The Cormorant at light weight gets unreadable below about 9pt'), citing specific measurements and rationale ('11pt', '500 units per SKU'), and verifying quality outcomes ('the sketches are beautiful', 'the quality difference is worth it'). This is classic evaluation: checking/validating the approach against real-world constraints and outcomes rather than just accepting the AI's suggestion. The human is demonstrating they've done the work to verify these decisions are sound.

**Turn 5:** Expected `steering` → Got `capitulation` (confidence: 92%)
- Expected because: Redirects the conversation to a completely new topic — the business/tax question. This is a genuine topic shift. The confidence level drops immediately. Compare to the precise, specific design language in earlier turns.
- Classifier said: The human is asking the AI to make a judgment call and provide guidance on a complex financial/tax situation without providing criteria, constraints, or context for evaluation. They're asking 'how screwed am I' and 'what do I need to know' — offloading the thinking entirely to the AI rather than providing information to be processed (contribution) or steering toward a specific approach. The human hasn't provided income figures, location, business structure, or other context that would let them evaluate the quality of the response. This is asking the AI to decide and advise without meaningful criteria from the human.

**Turn 6:** Expected `capitulation` → Got `contribution` (confidence: 92%)
- Expected because: Asks 'do I need to do anything special' about home office deductions — a completely open-ended question that hands all judgment to the AI. Also passively accepts the entire initial tax overview without questioning any specifics. Compare to how they engaged with design suggestions.
- Classifier said: The human is providing specific financial and business context (income amount, home office setup, software subscriptions) to inform the AI's next response about tax deductions. The primary action is supplying information the AI needs — not evaluating the AI's previous tax explanation (which they explicitly thanked), not steering the conversation direction, not pushing back on approach. They're laying out facts for the AI to work with.

### 07-friction-heavy.md

**Turn 2:** Expected `friction` → Got `evaluation` (confidence: 92%)
- Expected because: Pushes back on the revised suggestion. Questions the feasibility of the diary study (dropout, reactivity) and challenges the retrospective interview approach (availability bias). Raising-the-bar friction with specific methodological concerns.
- Classifier said: The human is systematically reviewing the AI's methodological proposal by identifying specific flaws in the diary study design (dropout risk, reactivity from structured logging) and sampling method (availability bias in retrospective recall). Each critique targets concrete weaknesses in the AI's approach—not rejecting the entire direction, but examining the execution. This is characteristic evaluation: checking the AI's work against research design principles and real-world constraints (working professional availability, cognitive biases). The human is applying domain expertise to assess what the AI proposed, not redirecting to a fundamentally different approach.

**Turn 3:** Expected `friction` → Got `evaluation` (confidence: 92%)
- Expected because: Disagrees with the AI's sample size recommendation. Brings their own methodological knowledge (Sim et al.'s critique, information-theoretic saturation from Hennink et al.) to challenge the AI's 15-20 recommendation. This is informed, citation-backed pushback.
- Classifier said: The human is reviewing specific elements of the AI's recommendation. They affirm the screenshot approach (positive evaluation of that component), then critically assess the sample size recommendation by citing methodological literature (Sim et al., Guest et al., Hennink et al.) to identify a flaw in the AI's reasoning. They're not rejecting the overall approach or strategy — they accept the screenshot method — but rather checking the quality and validity of a specific methodological claim and proposing a better criterion (information-theoretic saturation assessed continuously rather than a fixed number). This is targeted evaluation of the AI's output, supported by domain expertise in research methodology.

**Turn 7:** Expected `evaluation` → Got `friction` (confidence: 82%)
- Expected because: AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection.
- Classifier said: The human explicitly rejects the AI's characterization of Framework Analysis ('I'd push back on your characterization') and provides domain expertise to correct it. This is friction on APPROACH/framing, not just a point of detail. However, the human then agrees with the AI's core recommendation (CGT is right) and pivots to a new analytical question about multimodal data. The opening rejection of the AI's framing is friction; the subsequent steering toward a new problem creates ambiguity. The confidence is 0.82 rather than higher because ~60% of the turn is actually new problem-steering (the screenshot+verbal analysis question) rather than sustained friction. But the opening move — correcting the AI's theoretical characterization with domain knowledge and explicitly pushing back — is the primary engagement signal, making friction the best fit over pure steering.

**Turn 8:** Expected `steering` → Got `delegation` (confidence: 92%)
- Expected because: Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work.
- Classifier said: The human is handing off a well-scoped, concrete task (draft methods section) with clear quality criteria (publishable-quality, specific journal targets, explicit subsection structure: design, participants, data collection, analysis). The human has already shaped the approach through extensive prior steering and evaluation — they've rejected surveys, refined the diary method, clarified the interview approach, and committed to CGT analysis. Now they're delegating the execution of that refined design to the AI with enough constraints that the AI can produce what they need. This is not passive acceptance (no engagement) or steering (not setting new direction) — it's confident handoff of a bounded task.

**Turn 9:** Expected `friction` → Got `evaluation` (confidence: 92%)
- Expected because: Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality.
- Classifier said: The human is reviewing the AI's specific output (the methods section draft) and identifying concrete quality issues: sentence structure uniformity, problematic phrasing patterns ('this design choice was critical'), citation integration style that doesn't match CSCW conventions. These are specific critiques of the text produced, not rejections of the overall approach or methodology. The human acknowledges the content is 'solid' while targeting execution — prose rhythm, citation weaving, diction. This is textual evaluation grounded in disciplinary standards (CSCW publishing norms), not friction with the research direction.

### 08-mixed-realistic.md

**Turn 2:** Expected `evaluation` → Got `steering` (confidence: 92%)
- Expected because: Reviews the AI's proposed structure and gives substantive feedback. Flags one section as unnecessary (competitive landscape — already covered) and suggests adding something specific (technical debt section). Genuine quality assessment.
- Classifier said: The human is making specific, reasoned modifications to the document structure. They're removing a section (competitive landscape) with clear justification (CEO already covered it, leadership fatigue), and adding a section (technical debt) with explicit reasoning (CTO priority, business impact on velocity). These are directional decisions that reshape what the document should accomplish and why. The framing approval ('otherwise the framing is good') is secondary to the structural direction-setting.

**Turn 3:** Expected `delegation` → Got `contribution` (confidence: 92%)
- Expected because: AMBIGUOUS between passive_acceptance and delegation. Says 'yeah that works' to the outline (passive) but then hands off the Q4 review section with clear inputs — specific metrics and the narrative frame. The dominant action is the well-scoped delegation with detailed data handoff. Leaning delegation.
- Classifier said: The human is primarily providing domain knowledge and specific data context needed for the AI to draft the Q4 review section. They supply: revenue figures, customer acquisition metrics, retention diagnosis with root cause analysis, product ship details with adoption metrics, and strategic framing guidance ('honestly but not alarmingly'). The opening 'yeah that works' is brief acceptance of the structure, but the substantive content is informational — giving the AI the facts, context, and tonality it needs to execute. The human is not evaluating the AI's output, steering the overall approach (that was done in prior turns), or delegating with constraints; they're equipping the AI with the specific data and narrative nuance required for drafting.

**Turn 7:** Expected `passive_acceptance` → Got `evaluation` (confidence: 92%)
- Expected because: AMBIGUOUS. Accepts the priorities section with 'these look right' and one minor wording change ('Fix Retention' to 'Restore Retention Health'). The section is consequential (resource allocation for the quarter) but the review is surface-level. Could be evaluation if you believe the wording change demonstrates they read it carefully. Leaning passive_acceptance because the change is cosmetic framing, not substantive.
- Classifier said: The human is reviewing the AI's output and noting a specific issue: the framing of 'Fix Retention' doesn't align with CEO sensitivity about language. The human also confirms the rest of the output is correct ('These look right'). This is targeted review of the AI's specific work product with a concrete, scoped modification request based on quality/appropriateness assessment. The reasoning provided ('sounds like something is broken') shows the human is checking for correctness against organizational context, which is characteristic of evaluation. Not friction because the approach/direction isn't being rejected — just the word choice within the accepted direction.

### 09-complexity-scaling.md

**Turn 1:** Expected `evaluation` → Got `steering` (confidence: 92%)
- Expected because: Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary.
- Classifier said: The human accepts the prior output with a brief acknowledgment ('yep looks right, thanks'), then introduces a new task with explicit constraints: 'basic validation, doesn't need to cover every RFC edge case, but should handle the common formats.' This defines the problem scope, success criteria, and what NOT to do — classic steering behavior that sets direction for the next phase of work.

**Turn 5:** Expected `capitulation` → Got `steering` (confidence: 92%)
- Expected because: 'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions.
- Classifier said: The human is introducing a new constraint/requirement ('handle bursts of events'), defining a specific problem scenario ('product launch when everyone's logging in'), and implicitly asking the AI to reshape the approach to address this concern. This is directional — they're not evaluating the existing API code for correctness, but rather pivoting to a new design challenge and asking 'how should we handle this?' which sets a new goal for the conversation. The phrase 'nice, that works' is brief acceptance of the prior output, but the question that follows redefines what needs to be done.

**Turn 6:** Expected `passive_acceptance` → Got `delegation` (confidence: 92%)
- Expected because: Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex.
- Classifier said: The human is handing off a well-scoped task (write tests for the buffered writes + circuit breaker implementation) with explicit quality criteria: verify buffer flushes on size trigger, time trigger, and that circuit breaker fallback captures events. The criteria are specific and measurable, defining what 'correct' looks like. This is delegation, not steering (which would be 'let's add tests' without shaping how) or passive acceptance (which would lack criteria). The human also signals approval of the approach ('Makes sense, I'll go with...') before delegating the implementation task.

### 10-short-conversation.md

**Turn 0:** Expected `steering` → Got `capitulation` (confidence: 92%)
- Expected because: Frames the decision and provides the key variables (two offers, compensation, role differences). Sets the agenda clearly.
- Classifier said: The human is asking the AI to make a judgment or provide decision-making criteria without providing their own framework, constraints, or decision-relevant information. They've presented two options and asked 'how should I think about this?' — which offloads the cognitive work of weighing tradeoffs to the AI. They haven't defined what matters to them (risk tolerance, career goals, financial needs, timeline), nor are they asking for analysis of specific claims (evaluation). This is asking the AI to decide for them or establish the criteria by which they should decide.

