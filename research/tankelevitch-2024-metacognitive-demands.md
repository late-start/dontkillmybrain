# Tankelevitch et al. (2024) — The Metacognitive Demands and Opportunities of Generative AI

## Citation

Tankelevitch, L., Kewenig, V., Simkute, A., Scott, A. E., Sarkar, A., Sellen, A., & Rintel, S. (2024). The Metacognitive Demands and Opportunities of Generative AI. *Proceedings of the 2024 CHI Conference on Human Factors in Computing Systems (CHI '24)*, Article 463, 1–24. ACM. https://doi.org/10.1145/3613904.3642902

- **ACM DL:** https://dl.acm.org/doi/10.1145/3613904.3642902
- **Full HTML:** https://dl.acm.org/doi/fullHtml/10.1145/3613904.3642902
- **arXiv preprint (December 2023):** https://arxiv.org/abs/2312.10893
- **Author PDF:** https://advait.org/files/tankelevitch_2024_GenAI_metacognition.pdf
- **Microsoft Research page:** https://www.microsoft.com/en-us/research/publication/the-metacognitive-demands-and-opportunities-of-generative-ai/
- **Award: CHI 2024 Best Paper**
- **Conference dates:** May 11–16, 2024, Honolulu, Hawaii
- **Submitted:** December 18, 2023; **Revised:** March 12, 2024

### Authors and Affiliations

All authors are affiliated with **Microsoft Research** (UK) at time of publication:

- **Lev Tankelevitch** — Microsoft Research (first author; now at other institution)
- **Viktor Kewenig** — Microsoft Research; background in AI, cognitive neuroscience, and philosophy
- **Auste Simkute** — Microsoft Research
- **Ava Elizabeth Scott** — Microsoft Research
- **Advait Sarkar** — Microsoft Research; also affiliated with University of Cambridge
- **Abigail Sellen** — Microsoft Research
- **Sean Rintel** — Microsoft Research

The paper originated from Microsoft Research, giving it both academic rigor and direct industry relevance to how GenAI products are designed and deployed.

---

## Abstract / Summary

Generative AI systems offer unprecedented opportunities for transforming professional and personal work, yet present usability challenges around prompting, evaluating and relying on outputs, and optimizing workflows. The paper argues that **metacognition** — the psychological ability to monitor and control one's own thoughts and behavior — provides a coherent and actionable framework for understanding these challenges.

The paper makes two primary contributions:
1. Current GenAI systems impose substantial **metacognitive demands** on users, requiring high-level metacognitive monitoring and control at every stage of interaction.
2. These demands can be addressed through two strategies: (a) integrating metacognitive support strategies into GenAI systems to help users develop better metacognitive skills, and (b) designing GenAI systems to reduce their intrinsic metacognitive demand by improving explainability and customizability.

This is a **conceptual and theoretical paper** — it does not report a primary empirical study. Instead, it synthesizes research from cognitive psychology, metacognition science, and recent GenAI user studies to build a novel framework for human-AI interaction research and design. The paper won the CHI 2024 Best Paper award, indicating peer recognition of the framework's originality and contribution to the HCI field.

---

## Methodology

### Paper Type and Approach

This is a conceptual framework paper — a mode of contribution that CHI explicitly recognizes alongside empirical papers. The methodology involves:

1. **Theoretical synthesis:** Drawing on established metacognition research from cognitive psychology (Flavell 1979, Nelson & Narens 1990, Dunning 2011, Dunlosky & Metcalfe 2009) to build a structured vocabulary for GenAI usability.

2. **Literature mapping:** Connecting metacognition concepts to the GenAI user research literature to identify where documented usability problems correspond to metacognitive demands.

3. **Framework articulation:** Specifying what types of metacognitive monitoring and control are required at each stage of GenAI interaction, and what can go wrong at each stage.

4. **Design implications derivation:** Using the framework to generate concrete, actionable design recommendations for both reducing metacognitive demand and supporting metacognitive skill development.

The paper explicitly draws on research methods used to measure metacognition in psychology (retrospective verbal reports, think-aloud protocols, confidence calibration tasks, self-assessment rubrics) as both a literature source and a set of methods the HCI community can adopt for GenAI research.

### Key Literature Synthesized

- **Metacognition foundations:** Flavell (1979) on metacognitive knowledge; Nelson & Narens (1990) on monitoring and control as dual processes; Dunlosky & Metcalfe (2009) on applied metacognition
- **Confidence calibration:** Dunning (2011) on the Dunning-Kruger effect as failure of metacognitive monitoring; research on well-calibrated vs. poorly-calibrated confidence
- **GenAI user studies:** Research on prompting challenges, output evaluation difficulties, over-reliance, automation bias, and workflow integration friction
- **Human-automation interaction:** Research on automation bias, appropriate reliance, and complacency effects

---

## Core Framework: Metacognition Applied to GenAI

### The Two Processes: Monitoring and Control

Metacognition consists of two interacting processes, both of which GenAI interaction demands:

**Metacognitive Monitoring** — assessing one's own cognitive states, knowledge, and performance:
- Am I understanding this correctly?
- Is my prompt capturing what I actually want?
- Is this AI output correct and relevant?
- Am I making good use of AI in this workflow?

**Metacognitive Control** — regulating cognitive processes based on monitoring:
- How should I reformulate this prompt?
- Should I accept, revise, or reject this output?
- Should I use AI for this task, or do it manually?
- Do I need to verify this with an external source?

The paper's central claim is that GenAI systems require substantially more metacognitive monitoring and control than most prior software tools, because GenAI outputs are:
- Variable (the same prompt may produce different outputs on different runs)
- Opaque (it is not possible to inspect why the AI produced a given output)
- Plausible-looking even when wrong (well-formatted, confident language regardless of accuracy)
- Scope-ambiguous (it is often unclear whether a given task falls within or outside AI capability)

### Four Metacognitive Demands in the User Workflow

The paper traces metacognitive demands through a simplified but representative user workflow:

#### 1. Prompt Formulation

**What the user must do:** Translate an internal goal into an explicit prompt.

**Metacognitive demands:**
- **Self-awareness of task goals:** The user must know what they want clearly enough to verbalize it, including sub-goals and implicit constraints they usually leave unstated. Much expert knowledge is tacit — knowing it exists and making it explicit for an AI prompt requires metacognitive self-examination.
- **Task decomposition:** Complex goals must be broken into AI-appropriate subtasks. This requires modeling the AI's capabilities and limitations accurately enough to know what to ask for.

**What can go wrong:** Users who don't know what they want (or don't know that they don't know) cannot write effective prompts. Users who overestimate AI capabilities will ask for things the AI cannot reliably deliver. Users who underestimate AI capabilities will unnecessarily limit what they request.

#### 2. Prompt Iteration

**What the user must do:** After receiving output, decide whether to revise the prompt, revise the output, or accept.

**Metacognitive demands:**
- **Well-adjusted confidence in prompting ability:** The user must distinguish between "this output is bad because my prompt was bad" and "this output is bad because the AI cannot do this task." This requires accurate metacognitive modeling of both one's own prompting skill and the AI's task-specific capabilities.
- **Metacognitive flexibility:** The ability to recognize that a prompting strategy is not working and adapt — trying a different approach rather than repeating the same prompt with minor variations.

**What can go wrong:** Users who blame themselves when the AI fails (low confidence) may iterate endlessly without recognizing a capability limit. Users who blame the AI when their prompting is insufficient (high confidence) may give up too soon. Both failure modes stem from miscalibrated confidence.

#### 3. Output Evaluation

**What the user must do:** Assess whether the AI's output is correct, relevant, high-quality, and appropriate for the intended use.

**Metacognitive demands:**
- **Well-adjusted confidence in output validity judgment:** Evaluating AI output requires both domain expertise (to know what a correct answer looks like) and metacognitive self-awareness (to know the limits of one's own domain expertise).
- **Domain expertise–system performance disentanglement:** A critical metacognitive challenge. If a user cannot evaluate output quality, they must recognize this limitation and seek verification elsewhere. This requires accurate self-assessment of one's own knowledge limits — a demanding metacognitive task.

**What can go wrong:** Users who overestimate their ability to evaluate output may accept incorrect answers without realizing it. Users operating outside their domain expertise may be unable to detect errors even when they try. The Dunning-Kruger dynamic is particularly relevant here: users who know the least about a domain may feel most confident in their evaluations, precisely because they lack the expertise to recognize what they're missing.

#### 4. Automation Strategy

**What the user must do:** At a higher level than individual interactions, decide whether, when, and how to incorporate GenAI into one's workflows overall.

**Metacognitive demands:**
- **Self-awareness of GenAI's applicability to one's workflow:** Understanding which parts of one's work are genuinely improved by AI assistance and which are not.
- **Well-adjusted confidence in manual vs. AI-supported task completion:** Accurately comparing the quality and efficiency of AI-assisted vs. non-AI approaches for different task types.
- **Metacognitive flexibility to adapt workflows:** As AI capabilities evolve and as the user's own proficiency with AI develops, the optimal automation strategy changes. Users must be able to recognize and respond to this.

**What can go wrong:** Users who underestimate AI capabilities miss opportunities for genuine productivity gains. Users who overestimate AI capabilities offload tasks the AI cannot handle well, producing degraded output. The failure to develop a calibrated automation strategy may be the most consequential metacognitive failure, because it affects all downstream interactions.

### Meta-Expertise as an Emerging Skill

The paper introduces the concept of **automation strategy as meta-expertise** — the idea that knowing how to optimally offload cognitive work to GenAI represents a new and learnable form of expertise. This is distinct from:
- Domain expertise (knowing the subject matter)
- AI technical expertise (understanding how models work)
- Prompting expertise (knowing how to phrase requests effectively)

Meta-expertise is about knowing *when and whether* to use AI, not just *how* to use it. The paper frames this as "optimal offloading" — the ability to accurately distinguish tasks where AI assistance is beneficial from tasks where it degrades performance or bypasses important cognitive work.

The term "meta-expertise" captures something important: it is expertise about deploying other expertise, including AI capability and one's own cognitive resources. Users who develop strong automation strategies are, in effect, becoming skilled orchestrators of a hybrid human-AI cognitive system.

### The Distinction: Metacognitive Demand vs. Cognitive Load

The paper explicitly distinguishes metacognitive demand from the more familiar concept of cognitive load:

- **Cognitive load** — the total mental effort required for a task (working memory demands, complexity, novelty)
- **Metacognitive demand** — the need to monitor and control one's own cognitive processes during a task

These can dissociate: a task may be cognitively simple (low load) but metacognitively demanding (requiring careful self-monitoring about whether to trust AI output). Or a task may be cognitively demanding (high load) but metacognitively routine (the user has extensive experience and well-calibrated mental models).

This distinction matters for design: reducing cognitive load (e.g., by making the interface simpler) may not reduce metacognitive demand. A smooth, easy-to-use AI interface can impose substantial metacognitive burden on users who must still decide what to ask for, how to evaluate outputs, and when to trust the AI.

---

## Key Findings and Claims

Because this is a conceptual paper, the "findings" are the framework's claims rather than empirical results. The paper asserts:

1. **GenAI uniquely elevates metacognitive demands** compared to prior software tools, because GenAI outputs are variable, opaque, plausible-looking, and scope-ambiguous in ways that prior task-specific software was not.

2. **All four stages of GenAI interaction** (prompt formulation, prompt iteration, output evaluation, automation strategy) impose distinct metacognitive demands, and failure at any stage propagates.

3. **Well-adjusted confidence** is the critical metacognitive variable across all stages. Both overconfidence (failing to detect errors or gaps) and underconfidence (excessive iterating, failure to leverage AI effectively) produce suboptimal outcomes.

4. **Metacognition is both measurable and teachable.** Existing psychology methods (confidence calibration tasks, retrospective verbal reports, think-aloud protocols) can be adapted to measure metacognitive demand in GenAI contexts. And metacognitive skills can be developed through training and system design.

5. **Explainability and customizability** are the highest-leverage design interventions for reducing metacognitive demand. Explainability allows users to ground their output evaluation in something other than aesthetic judgments. Customizability allows users to constrain AI behavior to domains where they have evaluation competence.

6. **Metacognitive support strategies** — planning prompts, self-evaluation checklists, self-management interventions — can be built into GenAI systems to help users develop stronger metacognitive skills over time.

---

## Core Concepts Introduced / Clarified

### Metacognitive Demand (defined for GenAI)

The specific metacognitive burden imposed by GenAI interaction — the requirement to monitor and control one's own cognitive engagement with AI outputs. Metacognitive demand is distinct from cognitive load, measurable (at least in principle), and designable: systems can increase or decrease the metacognitive demand they place on users through design choices.

### Well-Adjusted Confidence

A term the paper borrows from calibration research to describe accurate self-assessment: confidence that matches actual ability. Well-adjusted confidence in GenAI contexts means:
- Accurate beliefs about the AI's capability on a given task type
- Accurate beliefs about one's own ability to evaluate AI outputs
- Accurate beliefs about one's own prompting ability

The Dunning-Kruger effect represents the failure of well-adjusted confidence at low skill levels: users who know the least about a domain may be most confident in evaluating AI outputs in that domain. The opposite failure (underconfidence in expert users) is also documented and leads to under-utilization of AI capabilities.

### Automation Strategy as Meta-Expertise

The paper coins (or crystallizes) the concept that deciding when and how to use AI represents a distinct form of expertise that is neither domain knowledge nor AI technical knowledge. This meta-expertise involves:
- Accurate mental modeling of AI capabilities across task types
- Calibrated assessment of one's own comparative advantage vs. AI
- Flexibility to update both models as AI capabilities and personal proficiency evolve

### Metacognitive Flexibility

The ability to recognize when a cognitive strategy is not working and switch approaches. In GenAI contexts: recognizing that a prompting strategy is failing, that an output evaluation approach is insufficient, or that an automation strategy is misapplied — and adapting accordingly. Metacognitive flexibility is explicitly temporal and dynamic; it requires monitoring over time, not just at a single moment.

### Metacognitive Opportunities (the "Opportunities" half of the title)

The paper is careful to frame GenAI as creating not only metacognitive demands but metacognitive opportunities:
- GenAI can prompt reflection on implicit goals through the prompting process itself
- GenAI outputs can serve as concrete reference points for calibrating one's domain knowledge
- Iterating on AI outputs can develop metacognitive flexibility
- Observing where AI fails can calibrate mental models of AI capability

This optimistic framing is important: the paper is not arguing that GenAI is metacognitively harmful, but that its metacognitive demands are under-addressed in current design.

---

## Relevance to dontkillmybrain

### The Framework's Monitoring/Control Distinction Directly Maps to the Classifier/Narrator Split

Metacognitive monitoring (observing one's own cognitive state) and metacognitive control (regulating it) are the two halves of the metacognitive process. Dontkillmybrain implements a two-stage system that mirrors this structure:

- The **classifier** performs monitoring: it observes what the human did at each turn and assigns a signal. This is metacognitive monitoring applied to a conversation — making the user's engagement pattern legible.
- The **narrator** performs control support: it interprets the monitored pattern and frames it in ways that help the user regulate future behavior. The nudge at the end is explicitly a control invitation.

This structural alignment is not coincidental — the system was designed with this research in mind. But articulating the alignment explicitly (in reference materials like this document) helps explain why the two-stage architecture is the right one: it separates the observation function from the interpretation function, which is how metacognition itself works.

### Output Evaluation as the Signal with the Strongest Research Grounding

All three papers in the dontkillmybrain research corpus — and especially Tankelevitch et al. — converge on output evaluation as the most critical and most often-failing metacognitive behavior in GenAI interaction. The `evaluation` signal in the classifier is accordingly the most theory-grounded of all seven signals.

The evaluation.md analysis notes: "Tankelevitch et al. identify output evaluation as a primary metacognitive demand of GenAI." The specific mechanism they describe — users who cannot evaluate AI output may not know that they cannot — is why the narrator's job is hard: a user who consistently shows `passive_acceptance` may not realize their evaluation capability is limited in the domain at hand.

### Automation Strategy as the Theoretical Basis for `delegation` vs. `capitulation`

The paper's concept of automation strategy as meta-expertise provides the theoretical grounding for the evaluation.md recommendation to split `delegation` into two variants:

- Good automation strategy + task handoff = `delegation` (the skilled move; meta-expertise in action)
- Poor automation strategy + task handoff = `capitulation` (the failure mode; meta-expertise absent)

Tankelevitch et al. frame optimal offloading as "an emerging kind of meta-expertise" — something that can be learned and developed. This is the research basis for treating strategic delegation as a positive signal rather than conflating it with blind offloading. The current classifier prompt (as revised per evaluation.md) already makes this distinction; this paper provides the theoretical justification.

### Well-Adjusted Confidence Provides the Mechanism for Signal Drift

The paper's concept of well-adjusted confidence explains why engagement drift happens at the conversation level: as users interact with AI outputs that are consistently plausible and well-formatted, their confidence in the AI increases — and if that confidence becomes poorly calibrated (overconfident), they begin evaluating less critically. This is the metacognitive mechanism behind what the narrator's trajectory analysis is looking for.

Concretely: a user who starts a conversation with high `evaluation` rates and drifts toward `passive_acceptance` over the course of the session may be experiencing confidence miscalibration in real time. The narrator should be able to name this pattern (in plain language, not as "miscalibration"): something like "as the conversation went on, you relied more on the AI's judgment — that's a natural pattern when outputs consistently look right, but it makes the moments when AI is wrong harder to catch."

### The Four-Stage Workflow Maps to Signal Clusters

The Tankelevitch framework's four-stage workflow maps onto the signal taxonomy:

| Tankelevitch Stage | Primary dontkillmybrain Signals |
|--------------------|--------------------------------|
| Prompt formulation | `steering` (goal-setting, task decomposition) |
| Prompt iteration | `friction`, `steering` (redirecting when approach fails) |
| Output evaluation | `evaluation`, `friction` (checking, pushing back) |
| Automation strategy | `delegation` vs. `capitulation` (knowing when to hand off) |

This mapping suggests that signal distribution across a conversation can be read as a proxy for metacognitive health across all four stages. A conversation heavy in `steering` with weak `evaluation` may indicate good prompt formulation but poor output checking — a specific metacognitive gap, not just generalized passivity.

### The Narrator Voice as Metacognitive Support

Tankelevitch et al. propose three metacognitive support strategies that GenAI systems can implement:
1. **Planning support** — helping users clarify goals and decompose tasks before interacting with AI
2. **Self-evaluation support** — helping users assess their own performance and calibrate their confidence
3. **Self-management support** — helping users monitor and regulate their cognitive engagement over time

The dontkillmybrain narrator implements a variant of all three:
- The session title and intro narrative help users reflect on what the conversation was trying to accomplish (planning support, retrospective)
- The highlights annotate specific moments for the user to revisit and evaluate (self-evaluation support)
- The nudge invites users to adjust future behavior (self-management support)

The narrator's second-person voice and non-judgmental tone, described in narrator.md, are aligned with what metacognitive support research suggests works: self-referential framing (second person) activates self-reflection; non-judgmental framing reduces defensive reactance that would prevent the user from acting on the insight.

### "Metacognition is Teachable" Validates the Product's Core Hypothesis

The paper's claim that metacognition is "both measurable and teachable" is the fundamental justification for dontkillmybrain's existence. If metacognitive skills in AI interaction were innate or fixed, observing engagement patterns would be interesting but not actionable. The research consensus (which Tankelevitch et al. ground in a substantial psychology literature) is that metacognitive skills develop with practice, feedback, and explicit attention.

Dontkillmybrain is, in effect, a metacognitive feedback system: it provides the specific, grounded, turn-by-turn observations that allow users to develop more accurate mental models of their own AI interaction patterns. The research basis for believing this kind of feedback can improve behavior is strong — it is the same principle underlying effective tutoring (cf. Bastani et al.'s GPT Tutor guardrails, which forced metacognitive engagement and eliminated learning harm).

### The Metacognitive Flexibility Concept Supports Trajectory Analysis

The paper's emphasis on metacognitive flexibility — the ability to adapt strategies over time — provides the theoretical basis for the narrator's attention to how engagement changes across a conversation. A user who shows good flexibility will adapt their signals in response to what's working or not: escalating `friction` when outputs are weak, shifting to `delegation` when AI handles a subtask cleanly, returning to `steering` when the conversation drifts. A user without flexibility will maintain the same pattern regardless of context.

The narrator looking for "mode shifts" and "engagement changes over the course of the conversation" is operationalizing metacognitive flexibility as an observable behavioral sequence.

### The Plain-Language Instruction in narrator.md Implements the Paper's Design Recommendation

The narrator.md instruction — "You may name common patterns in plain language when doing so gives the reader a transferable insight. Do not use academic terms like 'cognitive offloading,' 'metacognitive monitoring,' or 'automation bias'" — directly implements the Tankelevitch et al. design recommendation to make metacognitive concepts accessible and actionable without requiring users to have prior knowledge of cognitive science.

The paper argues metacognition is teachable, but teachability requires accessible vocabulary. The narrator's instruction to use phrases like "when AI output sounds confident, it's easy to stop questioning it" translates the concept of automation complacency into transferable insight without requiring the user to know the term.

---

## Relationship to the Other Two Papers

Tankelevitch et al. provides the theoretical vocabulary that explains the empirical findings in Bastani et al. and Dell'Acqua et al.:

- **Bastani's crutch effect** = failure of metacognitive monitoring (students didn't monitor their own understanding) and metacognitive control (they didn't regulate their reliance on AI outputs). GPT Tutor's guardrails forced both.
- **Dell'Acqua's falling asleep at the wheel** = failure of well-adjusted confidence (overconfidence in AI outputs on out-of-frontier tasks) and automation strategy (consultants didn't adapt their workflow when the task crossed the frontier).
- **Dell'Acqua's Centaur pattern** = well-developed automation strategy (meta-expertise in action): accurate assessment of which tasks to delegate and which to retain.

The three papers form a coherent research cluster: Tankelevitch provides the framework, Bastani provides the learning science evidence, and Dell'Acqua provides the professional performance evidence. Together they establish that metacognitive engagement with AI is not an academic concern but a practical determinant of outcomes across educational and professional domains.

---

*Sources consulted: [ACM DL paper page](https://dl.acm.org/doi/10.1145/3613904.3642902), [arXiv preprint](https://arxiv.org/abs/2312.10893), [Microsoft Research page](https://www.microsoft.com/en-us/research/publication/the-metacognitive-demands-and-opportunities-of-generative-ai/), [CHI 2024 program listing](https://programs.sigchi.org/chi/2024/program/content/147504), [Viktor Kewenig's page](https://viktorkewenig.github.io/), [Advait Sarkar's publications](https://advait.org/publications)*
