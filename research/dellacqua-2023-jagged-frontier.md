# Dell'Acqua et al. (2023) — Navigating the Jagged Technological Frontier

## Citation

Dell'Acqua, F., McFowland, E. III, Mollick, E. R., Lifshitz-Assaf, H., Kellogg, K., Rajendran, S., Krayer, L., Candelon, F., & Lakhani, K. R. (2023). *Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of AI on Knowledge Worker Productivity and Quality.* Harvard Business School Working Paper No. 24-013. September 2023.

- **SSRN:** https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321
- **HBS Working Paper page:** https://www.hbs.edu/faculty/Pages/item.aspx?num=64700
- **PDF:** https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-9e74-42d6-a1c6-c72fb70c7282.pdf

### Authors and Affiliations

- **Fabrizio Dell'Acqua** — Harvard Business School (postdoctoral researcher at time of study)
- **Edward McFowland III** — Harvard Business School
- **Ethan R. Mollick** — The Wharton School, University of Pennsylvania
- **Hila Lifshitz-Assaf** — Warwick Business School
- **Katherine Kellogg** — MIT Sloan School of Management
- **Saran Rajendran** — Boston Consulting Group
- **Lisa Krayer** — Boston Consulting Group
- **Francois Candelon** — Boston Consulting Group
- **Karim R. Lakhani** — Harvard Business School

This was a cross-institutional collaboration with direct participation from BCG leadership, making it one of the few field experiments where the organization under study was also a research partner.

---

## Abstract / Summary

The paper examines the performance implications of GPT-4 on realistic, complex, knowledge-intensive professional tasks using a pre-registered field experiment with 758 Boston Consulting Group consultants. Consultants were randomly assigned to three conditions: no AI access, GPT-4 access, or GPT-4 access with a prompt engineering overview. They completed 18 consulting tasks involving creativity, analytical thinking, writing, and persuasion — all centered on a realistic scenario for a fictional footwear company.

The study's central finding is the "jagged technological frontier" concept: AI capabilities are not uniformly distributed across task types. For tasks within AI's capability frontier, consultants using GPT-4 significantly outperformed controls on every metric (speed, quality, and completion rate). For a task specifically designed to fall outside the frontier, consultants using GPT-4 performed significantly *worse* than those without AI access. The same tool that elevated performance by over 40% on in-frontier tasks produced a 19-percentage-point accuracy drop on out-of-frontier tasks.

The study also documented two qualitatively distinct human-AI collaboration patterns — Centaurs and Cyborgs — and found that both high- and low-performing consultants benefited from AI within the frontier, with lower performers showing the largest absolute gains.

---

## Methodology

### Study Design

Pre-registered field experiment. Three conditions:

1. **No AI (Control)** — Standard consulting work without AI tools
2. **GPT-4 alone** — Access to GPT-4 via standard API without special instructions
3. **GPT-4 with prompt engineering overview** — Same GPT-4 access plus a briefing on prompt engineering techniques

The pre-registration, use of baseline controls, and the direct partnership with BCG (allowing access to actual professionals doing real work) distinguish this from laboratory studies.

### Participants

- **758 BCG consultants** — approximately 7% of all individual contributor-level employees at BCG
- All participants were professional management consultants; the study targeted the core knowledge worker population rather than students or general-population participants
- A baseline task was completed before randomization to establish prior performance levels, enabling heterogeneous treatment effect analysis

### Task Design: Inside the Frontier

The 18 core tasks were designed around a realistic consulting engagement for a fictional shoe company entering a new market. Tasks spanned the core competencies of consulting work:

- **Creative ideation:** "Propose at least 10 ideas for a new shoe targeting an underserved market or sport"
- **Analytical segmentation:** "Segment the footwear industry market based on users"
- **Marketing content:** "Draft a press release marketing copy for your product"
- **Persuasive communication:** "Pen an inspirational memo to employees detailing why your product would outshine competitors"

These tasks were selected because they represent typical high-value consulting deliverables and were hypothesized to fall within GPT-4's capability frontier.

### Task Design: Outside the Frontier

A single task was specifically designed to fall outside the AI's frontier. This task involved a business problem with intentional logical ambiguities and complexities that required integrating contextual judgment, where confident-sounding AI output was likely to be incorrect. The outside-frontier task was the key diagnostic: it allowed the researchers to test whether consultants could recognize when AI outputs should not be trusted.

Consultants without AI access solved the outside-frontier problem correctly **84% of the time**. Consultants using GPT-4 alone solved it correctly approximately **60-70% of the time**. This is the source of the 19-percentage-point accuracy penalty.

### Quality Measurement

Output quality was assessed by a panel of evaluators who were blind to condition assignment. The evaluation rubric covered multiple dimensions appropriate to consulting work. The 40%+ quality improvement finding reflects this blinded external evaluation, not self-assessment.

---

## Key Findings

### Performance Inside the Frontier

For the 18 in-frontier tasks, consultants with GPT-4 access demonstrated improvements across every performance dimension:

| Metric | AI-Assisted vs. Control |
|--------|------------------------|
| Tasks completed | +12.2% more on average |
| Task speed | 25.1% faster |
| Output quality | >40% higher (blinded external evaluation) |

These are large effects for a professional population on realistic work tasks. The quality improvement is particularly notable: 40%+ quality gains in professional consulting output represents a substantial capability shift, not a marginal productivity improvement.

### Performance Outside the Frontier

| Condition | Correct Solutions |
|-----------|------------------|
| No AI     | ~84%             |
| GPT-4 alone | ~60-70%        |
| GPT-4 with prompt engineering | even lower (approximately 60%) |

The outside-frontier result: **consultants using AI were 19 percentage points less likely to produce correct solutions** than those working without AI. The prompt engineering condition may have performed worst because prompt engineering skills made consultants more confident in their AI-generated outputs, reducing the probability they would apply skeptical judgment.

This finding is counterintuitive and important: knowing how to use AI better (prompt engineering) did not help — and may have hurt — when the task was outside the frontier. The harm came from inappropriate trust, and greater AI fluency did not calibrate that trust.

### Skill Leveling Effect

The study stratified consultants by baseline performance (above vs. below median on the baseline task) and analyzed heterogeneous treatment effects:

- **Below-median performers with AI:** +43% performance gain vs. their own baseline
- **Above-median performers with AI:** +17% performance gain vs. their own baseline

AI compressed the performance distribution at BCG: the weakest consultants gained the most, closing a substantial portion of the gap with top performers. This has significant organizational implications — AI acts as a force multiplier on lower-performing employees more than on top performers.

### Behavioral Patterns: Centaurs and Cyborgs

Through qualitative observation of how consultants used AI, the researchers identified two distinct collaboration strategies:

**Centaurs** (named after the half-human, half-horse mythological creature):
- Maintain a clear strategic division between human and AI work
- Make deliberate decisions about which parts of a task to delegate to AI and which to retain
- Human does what humans do best (judgment, contextual reasoning, client knowledge); AI does what AI does best (drafting, formatting, ideation)
- Example: Decide on the analytical framework yourself, then have AI generate the supporting text

**Cyborgs** (deeply fused human-machine collaboration):
- Continuously interweave human and AI contributions throughout task execution
- Constant back-and-forth iteration rather than distinct handoffs
- Human might begin a sentence, have AI complete it, then revise the AI's completion, then feed that back to the AI
- The boundary between human and AI contribution is blurred by design

Both Centaurs and Cyborgs outperformed the control condition significantly on in-frontier tasks. The distinction is stylistic and strategic rather than a quality difference — both patterns represent effective human-AI collaboration. The key feature they share: both maintained meaningful human cognitive engagement throughout the process, rather than deferring entirely to AI outputs.

### The "Falling Asleep at the Wheel" Pattern

A critical behavioral observation documented in the study: when AI output quality is high and consistent, humans tend to disengage critical evaluation. This was particularly documented in a related study of recruiters using AI-generated candidate evaluations. Recruiters using higher-quality AI "became lazy, careless, and less skilled in their own judgment" — they stopped applying their own evaluative expertise because the AI's confident presentation reduced their felt need to verify.

Paradoxically, recruiters using *lower-quality* AI performed better in some conditions because the AI's errors were obvious enough to force active engagement. When the AI made mistakes that recruiters could catch, they remained alert and applied their own judgment. When the AI was consistently good, they turned off critical evaluation — and performed worse on edge cases where the AI's errors were subtle.

This "automation complacency" dynamic is separate from the jagged frontier finding but reinforces it: the frontier problem is not just about whether AI can do a task, but about whether users *correctly perceive* when to trust AI outputs.

---

## Core Concepts Introduced

### The Jagged Technological Frontier

The paper's central contribution is this conceptual framework. The frontier is "jagged" because AI capability does not vary smoothly or predictably across task dimensions. Tasks that appear similar in difficulty, domain, or cognitive demand may fall on opposite sides of AI's capability boundary. The frontier is also invisible from the outside: it is not possible to look at a task description and reliably predict whether GPT-4 will handle it well or poorly without testing.

The jaggedness has practical implications:
- Users cannot rely on surface-level task similarity to predict AI performance
- Expertise in one task type does not predict AI capability for superficially similar tasks
- The same model that excels at creative writing may fail at tasks that *look* analytical but actually require contextual judgment the model lacks

The frontier metaphor implies exploration and uncertainty: users must develop mental models of where the frontier lies through experience and experimentation, not through instruction alone.

### Centaur vs. Cyborg Collaboration Modes

These are not prescriptive recommendations but descriptive observations of how effective AI users naturally organize their collaboration. The Centaur pattern emphasizes explicit task decomposition and strategic handoff; the Cyborg pattern emphasizes tight iterative feedback. Both represent substantively different approaches to human-AI integration, and the existence of both effective patterns suggests there is no single "right way" to collaborate with AI — the choice depends on the task, the individual's strengths, and the nature of the AI tool.

### Automation Complacency at the Frontier Boundary

The study provides field evidence for the theoretical construct of "automation bias" (the tendency to over-rely on automated systems) in a realistic knowledge-worker context. Automation complacency is most dangerous precisely at the jagged frontier boundary — where AI performance degrades but its outputs remain confident and polished. A fluent, well-formatted wrong answer from GPT-4 is harder to catch than an obvious error.

### Skill Leveling as Organizational Dynamic

The heterogeneous effects finding reframes AI in organizational terms: AI tools may reduce skill stratification within organizations by providing larger absolute benefits to lower-performing employees. This has implications for how organizations should think about AI adoption — not just as a productivity tool for top performers, but as a potential equalizer. The 43% vs. 17% gain differential is large enough to have real effects on organizational performance distributions over time.

---

## Relevance to dontkillmybrain

### The Jagged Frontier as the Theoretical Basis for Frontier-Crossing Moments

The evaluation.md analysis identified "frontier-crossing moments" as a category the narrator should detect: "points where the user's engagement level dropped precisely when the task became more complex or moved outside familiar territory." This observation directly derives from Dell'Acqua et al.'s empirical finding.

The frontier is not fixed — it varies by domain, model version, and task framing. A user who shows consistent `evaluation` and `friction` while discussing code may shift to `passive_acceptance` when the conversation moves to legal interpretation, legal risk assessment, or financial modeling. This shift is not a character flaw; it may rationally track the user's own domain expertise. But it's exactly the situation where passive acceptance is most costly, because both the user's expertise and the AI's reliability may be degraded at the same time.

### Centaurs Map to `delegation`; Cyborgs Map to the Full Signal Mix

The Centaur pattern — deliberate, strategic handoff of scoped tasks to AI — is the paradigm case for what dontkillmybrain classifies as `delegation` (as opposed to `capitulation`). A Centaur-style move looks like: "I've analyzed the market structure and identified three segments. Now write a press release positioning us against each." This is explicit scoping + execution handoff — the human has done the cognitive work of strategy; the AI is executing against a clear spec.

The Cyborg pattern distributes across multiple signal types within a single task: the user might `steer` the direction, `contribute` domain knowledge the AI can't have, `evaluate` a draft, apply `friction` to a weak section, then `delegate` the final polish. The Cyborg is not a single signal but a high-frequency alternation between active signals.

Both patterns represent effective AI use. Dontkillmybrain's narrator should be able to recognize both as positive when the overall balance of active signals is high — the distinction from harmful behavior is not Centaur vs. Cyborg, but active vs. passive engagement within either mode.

### The 19pp Out-of-Frontier Drop Quantifies the Stakes of Passive Acceptance

When dontkillmybrain shows a user a high concentration of `passive_acceptance` signals, the Dell'Acqua study provides the stakes: in a professional context with expert consultants working on real tasks, passive AI acceptance on out-of-frontier tasks produced a 19-percentage-point accuracy drop compared to working without AI at all. The user would have been better off not using the AI.

This is the research basis for the narrator's stakes-awareness instruction: "You are not judging the reader, but you are not pretending the patterns don't matter either." The patterns matter because of findings like this.

### The Prompt Engineering Paradox Informs the `evaluation` Signal Design

The finding that consultants with prompt engineering training performed *worse* on out-of-frontier tasks than those with raw GPT-4 access is a subtle but important design implication. Greater fluency with AI tools did not improve judgment about when to trust AI output — it may have increased confidence without improving calibration.

This is directly relevant to the `evaluation` signal. The signal tracks whether users are actively checking AI output, but the Dell'Acqua finding suggests that the *form* of evaluation matters: confident, fluent engagement with AI output (what a prompt-engineering-trained user might do) can coexist with poor evaluation quality. The narrator should be alert to users who engage extensively with AI outputs but do so in ways that are iterative-without-checking rather than genuinely critical.

### Skill Leveling as Context for Heterogeneous User Experience

The 43% vs. 17% performance gain differential by baseline skill level suggests that users who are less expert in the conversation's domain may benefit more from AI assistance overall — but are also more vulnerable to the frontier problem because they may have less ability to detect when AI output is wrong.

This creates a tension the narrator should be sensitive to: a user showing high `passive_acceptance` rates might be doing so because they are a lower-skill user in a domain where AI is genuinely helpful and mostly right, or because they are a lower-skill user who cannot tell when AI is wrong. The same signal pattern has different implications depending on domain. The narrator's instruction to notice domain/topic shifts (from evaluation.md) is directly grounded in this finding.

### "Falling Asleep at the Wheel" as the Dynamic the Product Exists to Prevent

The automation complacency pattern — where high-quality AI output reduces user vigilance — is the core behavioral failure that dontkillmybrain is designed to address. The product's value proposition is making this invisible drift visible: showing users when they have moved from active to passive engagement without noticing.

The Dell'Acqua finding that this drift occurred even in highly paid, expert professionals doing their core job is important for the product's positioning. This is not a problem for people who don't know how to use AI. It is a structural feature of high-quality AI output: fluent, confident, plausible text reduces the felt need to verify. Dontkillmybrain's turn-by-turn classification makes this drift visible in a way that users cannot achieve through introspection alone.

---

*Sources consulted: [SSRN abstract](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321), [HBS working paper page](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700), [Ethan Mollick's Substack analysis](https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged), [Harvard Crimson coverage](https://www.thecrimson.com/article/2023/10/13/jagged-edge-ai-bcg/), [VentureBeat coverage](https://venturebeat.com/ai/enterprise-workers-gain-40-percent-performance-boost-from-gpt-4-harvard-study-finds)*
