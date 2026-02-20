# Bastani et al. (2024) — Generative AI Can Harm Learning

## Citation

Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakci, O., & Mariman, R. (2024). *Generative AI Can Harm Learning.* SSRN Working Paper No. 4895486. Published July 2024. Revised and published as: Bastani et al. (2025). "Generative AI without guardrails can harm learning: Evidence from high school mathematics." *Proceedings of the National Academy of Sciences (PNAS)*, 122(26), e2422633122. https://doi.org/10.1073/pnas.2422633122

- **SSRN preprint:** https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4895486
- **PNAS published version:** https://www.pnas.org/doi/10.1073/pnas.2422633122
- **Edited by:** Emma Brunskill (Stanford University)
- **Received:** November 3, 2024; **Accepted:** May 5, 2025

### Authors and Affiliations

- **Hamsa Bastani** — The Wharton School, University of Pennsylvania
- **Osbert Bastani** — Department of Computer and Information Science, University of Pennsylvania
- **Alp Sungu** — The Wharton School, University of Pennsylvania (corresponding author)
- **Haosen Ge** — The Wharton School, University of Pennsylvania
- **Ozge Kabakci** — High school collaborator (Turkey)
- **Rei Mariman** — The Wharton School, University of Pennsylvania

---

## Abstract / Summary

The paper reports a large-scale randomized controlled trial (RCT) conducted at a high school in Turkey during the Fall 2023–2024 academic year. Nearly 1,000 9th, 10th, and 11th grade students across approximately 50 classes participated in four 90-minute math sessions. Students were randomly assigned to one of three conditions: no AI access (control), access to GPT Base (an unrestricted ChatGPT-4 interface), or access to GPT Tutor (a carefully guardrailed version of ChatGPT-4 designed with teacher input to provide hints rather than direct answers).

The core finding is a paradox: access to GPT Base significantly improved performance during AI-assisted practice sessions (48% higher than control), but when the AI was removed and students took an unassisted exam, GPT Base students performed 17% worse than students who had never had AI access. The mechanism is the "crutch effect" — students relied on the AI to solve problems rather than developing their own understanding. GPT Tutor largely eliminated this harm while maintaining substantial practice-period gains (127% higher than control during assisted sessions, no significant deficit on unassisted exams).

---

## Methodology

### Study Design

Pre-registered randomized controlled trial. Three treatment arms:

1. **Control** — No technology access. Students used only textbooks and handwritten notes.
2. **GPT Base** — A chat interface with minimal system prompting, functionally similar to a standard ChatGPT-4 deployment. Students could ask any question and receive direct answers including full solutions.
3. **GPT Tutor** — A chat interface built on GPT-4 but with a detailed system prompt of 500+ words, designed in collaboration with the classroom teacher. The prompt instructs the AI to provide pedagogically appropriate hints and to guide students toward solutions rather than providing direct answers. The teacher also supplied the AI with the correct solutions and common student mistakes for each session's problem set, allowing the AI to tailor guidance to known error patterns.

### Session Structure

Four sessions, each 90 minutes, structured identically:

1. **Teacher review** (~25 min): Classroom instruction on the session's mathematical topic
2. **Assisted practice** (~35 min): Students work on practice problems with or without AI access, depending on condition
3. **Unassisted exam** (~30 min): All students, regardless of condition, complete the same exam without any AI access or other assistance

This within-session design is critical: it isolates the exam as a direct measure of learning acquired during the assisted practice period, not prior knowledge.

### Setting and Population

- Large public high school in Turkey
- Academic year: Fall semester 2023–2024
- Approximately 1,000 students
- Grades 9, 10, and 11
- ~50 classes across grade levels
- Topics covered: standard high school mathematics curriculum (algebra, geometry, etc.)

### Outcome Measurement

Performance was measured as normalized scores (0 to 1 scale) on both practice problems and exams. The primary outcome of interest is exam performance (unassisted), since this measures actual learning rather than AI-assisted task completion.

### Statistical Approach

OLS regression with class-level fixed effects to control for teacher and classroom variation. Heterogeneous treatment effects analyzed by prior GPA (proxy for baseline ability), access to private tutoring, and self-reported study hours. Mechanism analysis compared the effect of GPT Base's error rate on specific problem types against exam performance on corresponding problems.

---

## Key Findings

### Practice Session Performance (AI-Assisted)

| Condition | Mean Normalized Score | vs. Control |
|-----------|----------------------|-------------|
| Control   | 0.28                 | —           |
| GPT Base  | 0.42                 | +48%        |
| GPT Tutor | 0.65                 | +127%       |

All differences significant at the 1% level. GPT Tutor substantially outperformed GPT Base during practice, suggesting the guardrails did not reduce the AI's ability to help students work through problems — they changed how students engaged with that help.

### Unassisted Exam Performance

- **GPT Base vs. Control:** GPT Base students performed **17% worse** on the unassisted exam than control students. This is statistically significant.
- **GPT Tutor vs. Control:** GPT Tutor students showed no significant difference from control on the unassisted exam. The harm was "essentially eradicated."
- **GPT Tutor vs. Control (signed):** While the negative effect is eradicated, the GPT Tutor group also did not significantly *outperform* control on exams — meaning the tutor condition preserved but did not exceed natural learning.

### The Crutch Effect (Mechanism)

The researchers tested two candidate mechanisms for the exam performance decline:

**Candidate 1: AI error contamination.** If students were reading and internalizing AI solutions, then problems where the AI made errors should produce worse exam performance on those same problem types. GPT Base achieved only **51% accuracy** on practice problems (primarily logical errors). The researchers tested whether problems where GPT Base made errors predicted worse exam performance on corresponding exam problems. **Result: No significant effect.** The AI's error rate on specific problems did not predict exam performance degradation on those problems.

**Candidate 2: The crutch effect.** If students were simply copying answers without understanding, they would fail to learn regardless of whether the AI was right or wrong. The practice-to-exam performance gap would be consistent across problem types rather than tracking AI error rates. **This is what was found.** The evidence supports the crutch: students used AI output as a substitute for cognitive engagement, not as a learning tool.

### Engagement Evidence for the Crutch Mechanism

- By Session 4, GPT Tutor students asked **twice as many questions per problem** as GPT Base students.
- GPT Tutor students spent **13% more total time** on practice problems.
- GPT Tutor students engaged in substantially more "non-superficial" conversations — sharing their attempted answers and reasoning, rather than directly requesting solutions.
- These patterns suggest GPT Tutor's guardrails changed the quality of student-AI interaction, inducing the kind of elaborative engagement associated with learning.

### Heterogeneous Effects by Student Ability

- **Weaker students** (lower prior GPA) benefited *more* from GPT Base on assisted practice problems than stronger students.
- **Students with private tutoring** also showed larger GPT Base practice benefits.
- However, these practice-session gains did not translate to exam performance for any subgroup — the 17% exam deficit was not significantly moderated by ability level.
- This suggests the crutch effect operates across the ability distribution, not only for already-struggling students.

### Session Trajectory

The study tracked engagement patterns across all four sessions. Key observation: GPT Tutor students showed *increasing* engagement over time (asking more questions, spending more time), while GPT Base patterns did not show this trajectory. This temporal dynamic — engagement growing or declining over repeated sessions — is a critical finding about how different tool designs shape learning habits.

---

## Core Concepts Introduced

### The Crutch Effect

The term the paper uses to describe the mechanism: students use AI-generated answers as a direct substitute for cognitive work, rather than as scaffolding that supports learning. When the crutch is removed (unassisted exam), the lack of underlying understanding is revealed. The crutch effect is distinguished from the harm of AI errors because it operates even when the AI is correct: copying a correct answer without understanding it produces the same learning deficit as copying a wrong answer.

### Guardrails-as-Learning-Design

The paper operationalizes AI guardrails not as censorship or refusal behavior, but as pedagogically informed constraints on *how* the AI responds. GPT Tutor's guardrails redirect AI output from answer-delivery to Socratic guidance. The 500+ word system prompt represents a design intervention that changes the cognitive demands placed on the student: instead of receiving an answer, the student must think through hints. This transforms the AI from an answer machine into an interaction partner.

### The Practice-Exam Gap

The methodological innovation of measuring both assisted practice performance and unassisted exam performance in the same session creates a diagnostic instrument for detecting crutch effects. High assisted performance + low exam performance = AI-as-crutch. High assisted performance + high exam performance = AI-as-scaffold. This within-session design is a template for evaluating any AI-assisted learning intervention.

### Socratic Tutoring as AI Safeguard

GPT Tutor's effectiveness suggests that Socratic pedagogical principles — guiding learners to answers through questions and hints, never providing direct answers — can be systematically encoded in AI system prompts. This is a design pattern, not just a feature: the guardrails were co-designed with the teacher and informed by common student mistakes, making the tutor contextually intelligent rather than generically restrictive.

---

## Relevance to dontkillmybrain

### Direct Mapping: Crutch Effect = Passive Acceptance + Capitulation

The crutch effect in Bastani et al. is behaviorally identical to what dontkillmybrain classifies as `passive_acceptance` and `capitulation`. Students who used GPT Base as a crutch were, in the turn-by-turn language of the classifier:

- **Submitting questions and accepting answers** without evaluating, modifying, or building on them (`passive_acceptance`)
- **Asking the AI to decide** (solve the problem) **without scoping or constraining the request** (`capitulation`)

The 17% exam performance drop is empirical proof that these signal patterns have real consequences. When the system shows a user that a conversation consists primarily of `passive_acceptance` and `capitulation`, this paper provides the causal mechanism: the user is not just engaging passively — they are actively substituting AI cognition for their own, with measurable downstream costs.

### The Contrast with GPT Tutor = Active Signals

GPT Tutor students showed higher rates of question-asking, sharing attempted answers, and iterating on problems. In dontkillmybrain signal terms:

- Sharing a attempted answer before asking for help = `contribution` (bringing something the AI didn't have — the student's own reasoning)
- Questioning why a hint points in a particular direction = `friction` or `evaluation`
- Decomposing a complex problem into parts and asking about each = `steering`

The 127% practice improvement with no exam deficit demonstrates that these active signal patterns are compatible with high productivity — they do not sacrifice performance for engagement. This directly addresses a concern a user might have: "Am I being asked to engage more actively at the cost of efficiency?" The GPT Tutor group answers no.

### The Crutch Effect Validates the Stakes-Awareness Design Choice

The evaluation.md analysis recommended adding "stakes-awareness" to the narrator prompt without being judgmental. Bastani et al. provides the concrete stakes: accepting AI output passively doesn't just feel intellectually unsatisfying — it produces measurable skill atrophy. The narrator's observation that "for most of this conversation, you took what the AI gave you and moved on — that works when the AI is right, but you'd have no way to tell if it wasn't" is understated but accurate. The study quantifies how much "no way to tell" costs.

### Heterogeneous Effects Inform the Trajectory Analysis

The finding that weaker students relied more on GPT Base (larger practice gains, same exam deficit) suggests that the crutch effect may be strongest precisely for users who have the most to gain from engaged collaboration. Dontkillmybrain's trajectory analysis in the narrator should be sensitive to this: a user who shows high `passive_acceptance` rates may be doing so partly because they are operating outside their domain expertise — the very situation where cognitive engagement matters most and is hardest to sustain.

### The 51% AI Accuracy Statistic is Crucial for Evaluation Signal Design

GPT Base achieved only 51% accuracy on practice problems. Students were crutching on an AI that was wrong half the time and couldn't tell. This is the core case for the `evaluation` signal: the dontkillmybrain system should draw particular attention to moments where the user accepted AI output without checking it, because the AI may well be wrong. The Bastani data provides a calibration: in a realistic math tutoring context with a state-of-the-art model, task-level error rates of ~50% are plausible.

### Session Trajectory Mirrors the "Engagement Decay" Pattern

The finding that GPT Base students did not show increasing engagement over four sessions — while GPT Tutor students asked twice as many questions by Session 4 — maps directly to the trajectory pattern the evaluation.md analysis identified as most important for the narrator. A conversation where early turns show `steering` and `evaluation` but later turns drift toward `passive_acceptance` may be exhibiting session-level crutch formation. The narrator should be explicitly looking for this drift.

### Design Principle: Guardrails Redirect Rather Than Restrict

The most actionable design insight from this paper for dontkillmybrain is that guardrails work by changing what the system produces in response to a given input, not by refusing inputs. GPT Tutor didn't tell students they couldn't ask for answers — it responded to those requests with hints. Applied to dontkillmybrain: the system can notice `capitulation` or `passive_acceptance` patterns and respond in ways that invite re-engagement, rather than lecturing users about engagement quality. The nudge at the end of the narrator is one implementation of this principle.

---

## Notes on Publication Status

The paper originated as SSRN Working Paper #4895486 (July 2024) and was subsequently published in PNAS (2025) as "Generative AI without guardrails can harm learning: Evidence from high school mathematics." The PNAS version is the peer-reviewed final version. The evaluation.md in the dontkillmybrain repo cites the SSRN version; both report the same core findings. The PNAS title change — adding "without guardrails" — reflects the paper's conclusion that the harm is design-contingent, not inherent to generative AI in education.

---

*Sources consulted: [SSRN abstract](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4895486), [PNAS published version](https://www.pnas.org/doi/10.1073/pnas.2422633122), [Knowledge at Wharton coverage](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education/), [Gary Liang detailed analysis](https://garyliang.substack.com/p/generative-ai-can-harm-learning)*
