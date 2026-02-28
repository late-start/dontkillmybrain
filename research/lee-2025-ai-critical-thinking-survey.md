# The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers

## Citation

Lee, H.-P. H., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N. (2025). The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers. In *Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems* (CHI '25). Association for Computing Machinery. https://doi.org/10.1145/3706598.3713778

- **Presented:** April 26 -- May 1, 2025, Yokohama, Japan
- **Affiliations:** Microsoft Research, Carnegie Mellon University
- **PDF:** https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf

---

## Abstract / Summary

This study examines when and how knowledge workers perceive the enaction of critical thinking when using generative AI, and what factors influence their cognitive effort. Through a survey of 319 knowledge workers who provided 936 first-hand examples of GenAI use in work tasks, the researchers find that a user's task-specific self-confidence and confidence in GenAI are predictive of whether critical thinking is enacted and the effort of doing so. Higher confidence in GenAI is associated with less critical thinking, while higher self-confidence is associated with more critical thinking. The study identifies that GenAI shifts the nature of critical thinking toward information verification, response integration, and task stewardship. The authors propose design recommendations for GenAI tools that support critical thinking by addressing awareness, motivation, and ability barriers.

---

## Methodology

### Study Design
- **Type:** Mixed-methods survey study
- **Sample:** 319 knowledge workers
- **Data:** 936 first-hand examples of GenAI use in work tasks
- **Framework:** Critical thinking conceptualized through Bloom's taxonomy levels

### Participant Onboarding
Participants were introduced to critical thinking in the GenAI context through concrete examples mapped to Bloom's taxonomy levels:
- Checking tone of generated emails
- Verifying accuracy of code snippets
- Assessing potential biases in data insights

This sensitized participants to multiple dimensions of critical thinking without narrowing the definition.

### Data Collection
For each GenAI use example, participants reported:
- Task description and context
- Their task-specific self-confidence
- Their confidence in GenAI for that task
- Whether and how they engaged in critical thinking
- The cognitive effort involved
- Outcomes and reflections

---

## Key Findings

### The Confidence Model (Central Finding)

Two confidence variables predict critical thinking behavior:

| Confidence Type | Effect on Critical Thinking |
|---|---|
| **Higher confidence in GenAI** | Associated with **less** critical thinking |
| **Higher task-specific self-confidence** | Associated with **more** critical thinking |

When both factors are considered together, they are predictive of:
1. Whether critical thinking is enacted at all
2. The effort invested in critical thinking when it occurs

**The paradox:** Users who trust the AI most think least critically about its output. Users who trust themselves most think more critically -- they have the domain knowledge to evaluate effectively.

### The Shift in Critical Thinking Nature

GenAI does not eliminate critical thinking but **redirects** it. The nature of cognitive work shifts:

| From (Pre-AI) | To (With AI) |
|---|---|
| Information gathering | **Information verification** |
| Problem-solving from scratch | **AI response integration** |
| Task execution | **Task stewardship / supervision** |

This shift represents a fundamental change in what critical thinking *means* in AI-assisted work -- from generative cognitive effort to evaluative cognitive effort.

### Self-Reported Cognitive Effort Reduction

Heavy GenAI users report investing less cognitive effort in their work, even when accuracy and sound judgment remain important. This reduction is self-reported and perceived as a feature (efficiency) rather than a bug (skill erosion).

### Three-Step Process for "Thinking With AI"

Workers who do engage critically with AI follow a three-step sequence:
1. **Setting goals and creating prompts** -- defining what they want from the AI
2. **Evaluating whether AI output meets requirements** -- assessing quality and correctness
3. **Selecting and modifying output** -- adapting AI output to fit specific needs

### Motivators for Critical Thinking

Key factors that motivate workers to think critically when using GenAI:
- Desire to enhance work quality
- Need to avoid negative outcomes (stakes awareness)
- Interest in developing and maintaining skills
- Professional accountability

### Barriers to Critical Thinking

Factors that inhibit critical thinking in GenAI-assisted tasks:
- **Lack of awareness:** Not recognizing when critical thinking is needed
- **Limited motivation:** Time pressure, narrow job scope, perceived low stakes
- **Difficulty improving AI responses:** Particularly in unfamiliar domains where the user lacks the knowledge to evaluate or redirect
- **Automation complacency:** Confidence in AI capability leading to reduced vigilance

### Mechanized Convergence

The study identifies "mechanized convergence" -- a reduction in output diversity when users passively accept AI suggestions. When multiple workers use GenAI for similar tasks without critical engagement, their outputs converge toward the AI's default patterns, reducing the diversity of thought that characterizes healthy organizational knowledge work.

---

## Core Concepts Introduced

### The Dual Confidence Model
The central theoretical contribution: critical thinking in AI-assisted work is governed by two independent confidence variables operating in opposite directions. This is not a single dimension of "trust" but two distinct psychological mechanisms:
- **GenAI confidence** acts as a *suppressor* of critical thinking (why check what you trust?)
- **Self-confidence** acts as an *enabler* of critical thinking (domain knowledge gives you the tools to evaluate)

### Critical Thinking as Shifted, Not Eliminated
The paper reframes the narrative from "AI kills critical thinking" to "AI changes what critical thinking requires." The cognitive demands are different, not absent -- but the new demands (verification, integration, stewardship) require different skills and awareness.

### The Awareness-Motivation-Ability Framework
Barriers to critical thinking are categorized into three types, each requiring different design interventions:
- **Awareness barriers:** Users don't realize critical thinking is needed
- **Motivation barriers:** Users know but don't invest the effort
- **Ability barriers:** Users want to evaluate but lack domain knowledge to do so effectively

### Design Recommendations
The authors propose that GenAI tools should be designed to support critical thinking by:
- Including verification nudges
- Supporting human-AI collaboration with explicit accountability
- Reinforcing claim verification habits
- Positioning AI as a "challenger" requiring professional judgment validation

---

## Relevance to dontkillmybrain

### Direct Mappings to Our Taxonomy

1. **The dual confidence model maps to our active/passive signal polarity:**
   - High self-confidence + low GenAI confidence = more `steering`, `friction`, `evaluation`, `contribution` (the user trusts themselves to evaluate and redirect)
   - Low self-confidence + high GenAI confidence = more `passive_acceptance`, `capitulation` (the user trusts the AI more than themselves)
   - This is not just a behavioral observation -- it is a *psychological mechanism* that explains why our signals cluster the way they do

2. **The three-step process maps to our signal sequence:**
   - Step 1 (goals/prompts) = `steering`
   - Step 2 (evaluate output) = `evaluation`
   - Step 3 (select/modify) = `contribution` or `friction`
   - When this sequence is absent, the user is in `passive_acceptance` or `capitulation`

3. **The shift from generation to verification validates our `evaluation` signal:**
   - Lee et al. confirm that the primary critical thinking demand in AI-assisted work is evaluation/verification, not original generation
   - Our taxonomy's explicit tracking of `evaluation` as a distinct signal is well-aligned with this finding

4. **Awareness-motivation-ability barriers inform narrator design:**
   - **Awareness barriers** = the narrator should help users *see* their patterns (they may not realize they're not thinking critically)
   - **Motivation barriers** = the narrator should surface stakes without preaching
   - **Ability barriers** = the narrator should note when users may lack domain knowledge to evaluate (the jagged frontier problem)

### What This Paper Adds Beyond Our Existing Framework

- **The confidence mechanism:** Our framework detects behaviors but doesn't model the *why*. Lee et al.'s dual confidence model explains the underlying psychology: people stop thinking critically not because they're lazy but because they trust the AI and/or doubt their own ability to improve on it. The narrator could reference this: "When the AI sounds confident and you're in unfamiliar territory, it's natural to stop questioning."

- **Mechanized convergence as an organizational risk:** Our tool currently analyzes individual conversations. Lee et al. show that passive acceptance has a collective effect -- multiple workers accepting AI defaults produces convergent, less diverse organizational output. This is a future direction: could dontkillmybrain aggregate patterns across a team?

- **The awareness barrier is the primary barrier:** Many knowledge workers simply don't realize when they should be thinking more critically. This validates our tool's entire value proposition -- making engagement patterns visible is the first step to changing them.

- **Difficulty evaluating in unfamiliar domains:** Lee et al. found that ability barriers are particularly strong when users lack domain knowledge. This connects to Dell'Acqua's jagged frontier: users cannot evaluate what they don't understand. Our narrator should flag moments where users accept complex AI output in domains where they may lack expertise.
