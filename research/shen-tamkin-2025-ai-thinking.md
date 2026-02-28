# How AI Impacts Skill Formation

## Citation

Shen, J. H., & Tamkin, A. (2026). How AI Impacts Skill Formation. *arXiv preprint* arXiv:2601.20245. Anthropic.

- **Published:** February 3, 2026
- **arXiv:** https://arxiv.org/abs/2601.20245
- **HTML:** https://arxiv.org/html/2601.20245

---

## Abstract / Summary

This Anthropic study investigates how AI assistance affects skill development when workers learn new technical competencies. Through a randomized controlled trial with 52 software developers learning the Trio asynchronous programming library, the researchers find that AI use impairs conceptual understanding, code reading, and debugging abilities, without delivering significant efficiency gains on average. However, the study identifies six distinct AI interaction patterns, three of which preserve learning outcomes despite AI availability. The critical variable is not whether AI is used, but *how* -- patterns involving active cognitive engagement (conceptual inquiry, explanation-seeking, generation-then-comprehension) preserve skill formation, while patterns involving delegation and progressive reliance degrade it.

---

## Methodology

### Design
- **Type:** Randomized controlled trial, between-subjects design
- **Sample:** 52 participants (26 control, 26 treatment)
- **Participants:** Python developers with 1+ year experience
- **Duration:** Maximum 1 hour 15 minutes per participant
- **Compensation:** $150 USD flat rate
- **Pre-registration:** Yes
- **Verification:** Screen recordings of all sessions

### Participant Characteristics
- 38% had 4-6 years coding experience; 54% had 7+ years
- 69% use Python regularly/frequently; 31% daily/extensively
- 69% had some prior asyncio exposure
- Predominantly aged 25-35
- Mix of freelance and professional developers

### Task Structure

**Phase 1 -- Warm-up (4 min average):**
- Python coding task unrelated to async concepts
- No AI access for either group
- Purpose: calibrate baseline Python familiarity

**Phase 2 -- Main Tasks (35-min maximum):**
- Two coding tasks using the Trio asynchronous library
- Task 1: Timer printing seconds while functions run (introduces nurseries, concurrent tasks)
- Task 2: Record retrieval with error handling (introduces error handling, memory channels)
- Treatment group: access to GPT-4o-based coding assistant
- Control group: instructions and web search only

**Phase 3 -- Evaluation:**
- 14-question quiz (27 points total) covering 7 core Trio concepts
- Question types: debugging, code reading, conceptual understanding
- No AI access during evaluation for either group
- Post-quiz survey

### Data Collection
- Keystroke logging
- Screen recordings (51 annotated)
- AI conversation transcripts
- Survey responses
- Error logs

---

## Key Findings

### Primary Outcomes

**Quiz Performance (Main Finding):**

| Group | Mean Score | Percentage |
|---|---|---|
| Control (no AI) | 19.15 points | 70.9% |
| Treatment (AI) | 15.0 points | 55.6% |
| **Difference** | **4.15 points** | **17% reduction** |

- **Effect size:** Cohen's d = 0.738 (medium-large)
- **Statistical significance:** p = 0.010
- **Controlling for warm-up time:** d = 0.725, p = 0.016

**Task Completion Time:**
- Control group median: 23 minutes
- Treatment group median: 19.5 minutes
- Difference: **Not statistically significant**
- 100% of treatment participants completed both tasks vs. some control participants who did not finish task 2

### Performance by Question Type
- **Debugging questions:** Largest performance gap between groups
- **Conceptual questions:** Moderate gap
- **Code reading:** Smallest gap

### Error Analysis
- **Control group median errors:** 3 per participant (2 per task)
- **Treatment group median errors:** 1 per participant (0 per task)
- **Error-free completion:** 12 participants total; only 2 from control
- Critical errors (requiring Trio concept understanding) were almost exclusively encountered by the control group
- **Key insight:** Errors are a learning mechanism. Encountering and resolving errors builds the conceptual understanding that AI assistance bypasses.

### No Meaningful Productivity Gains
Despite AI generating complete correct solutions:
- No significant speed improvement observed overall
- Time shifted from coding to query composition and reading AI output
- Some participants spent up to 6 minutes composing a single query
- 30%+ of available task time spent on AI interaction for some participants

---

## Six AI Interaction Patterns

The researchers analyzed 51 screen recordings and identified six behavioral clusters:

### Low-Scoring Patterns (Average <40% quiz score)

**1. AI Delegation (n=4):**
- Wholly delegated code writing to AI
- Fastest completion: 19.5 minutes
- Few to no errors encountered
- Quiz scores: 24-39%

**2. Progressive AI Reliance (n=4):**
- Started with 1-2 questions, escalated to full delegation
- Poor mastery of second task concepts
- Quiz scores: 26-37%

**3. Iterative AI Debugging (n=4):**
- Relied on AI for code verification/debugging
- Higher query count, slower than delegation
- Quiz scores: 24-39%

### High-Scoring Patterns (Average 65%+ quiz score)

**4. Generation-Then-Comprehension (n=2):**
- Generated code via AI, manually copied, then asked follow-up conceptual questions
- Quiz scores: 78-82%

**5. Hybrid Code-Explanation (n=3):**
- Asked for code generation WITH explanations simultaneously
- Time-intensive (reading explanations)
- Quiz scores: 65-81%

**6. Conceptual Inquiry (n=7):**
- Asked ONLY conceptual questions -- no code generation requests
- Independently resolved all encountered errors
- Second-fastest overall after full delegation
- Most errors encountered, but self-resolved
- Quiz scores: 71-86%

### Query Analysis (25 AI participants)
- **Explanation queries:** 79 (76% of treatment group asked these)
- **Code generation queries:** 51 (64% asked; only 4 used exclusively)
- **Debugging queries:** 9
- **Capability questions:** 4

---

## Core Concepts Introduced

### The Productivity-Learning Tradeoff Is Not Simple
- Not a straightforward tradeoff between speed and learning
- Depends entirely on interaction pattern
- Full delegation sacrifices learning for *minimal* time gains (not statistically significant)
- Cognitive engagement patterns preserve learning without major time cost

### Active Cognitive Engagement as the Differentiator
High-performing AI users shared a common trait: maintained cognitive engagement through:
- Asking for explanations alongside or instead of code
- Asking conceptual questions without requesting code generation
- Independently resolving errors
- Manually reviewing AI output

Low-performing users delegated cognitive effort to AI, resulting in:
- Faster task completion (marginal)
- Reduced skill acquisition (substantial)
- Gaps in conceptual understanding
- Weakened debugging abilities

### Debugging Skills as Critical for AI Oversight
- Debugging showed the largest performance gap between groups
- Humans responsible for verifying AI-generated code need the ability to identify errors
- AI assistance that bypasses error encounter removes the primary mechanism for building verification skills

### Self-Reported Awareness of the Problem
Treatment group participants reported:
- Wishing they had "paid more attention to Trio library details"
- Feeling "lazy"
- Acknowledging "lots of gaps in understanding"
- Control group reported finding tasks "fun" and instructions helpful

---

## Relevance to dontkillmybrain

### Direct Mappings to Our Taxonomy

1. **The six interaction patterns map cleanly to our signal types:**
   - *AI Delegation* = `capitulation` (offloading thinking entirely)
   - *Progressive AI Reliance* = trajectory from `delegation` to `capitulation` over time
   - *Iterative AI Debugging* = `passive_acceptance` disguised as engagement (asking AI to check rather than checking yourself)
   - *Generation-Then-Comprehension* = `delegation` followed by `evaluation` (strategic handoff with verification)
   - *Hybrid Code-Explanation* = `contribution` + `evaluation` (actively integrating AI output with understanding)
   - *Conceptual Inquiry* = `steering` + `contribution` (using AI as a knowledge resource while maintaining ownership)

2. **Progressive AI Reliance validates trajectory tracking:** This pattern (starting with limited AI use, escalating to full delegation) is exactly the engagement decay pattern our narrator prompt now instructs the narrator to detect. The Shen & Tamkin data shows this decay happens within a single 35-minute session.

3. **Debugging as the canary in the coal mine:** The largest performance gap was on debugging questions. This maps to `evaluation` in our taxonomy -- the ability to assess and verify AI output. Shen & Tamkin show that AI assistance that bypasses error encounter *specifically* degrades the skills needed to evaluate AI output. This is a vicious cycle: less evaluation leads to less evaluation capacity.

4. **Self-reported awareness without behavior change:** Treatment participants *knew* they hadn't learned well, but the AI usage patterns persisted. This mirrors Shaw & Nave's confidence paradox -- users may recognize the problem intellectually but still feel like the AI-assisted path was productive in the moment.

### What This Paper Adds Beyond Our Existing Framework

- **Six interaction patterns as a taxonomy validation:** Our 7 signals map well to their 6 patterns, providing empirical grounding for our classification scheme. The pattern-to-signal mapping above could be used as classifier training data.
- **The error-as-learning mechanism:** Our framework tracks `friction` but doesn't explicitly recognize that encountering errors (and the friction of resolving them) is a primary skill-building mechanism. Removing errors through AI assistance removes the training signal for evaluation skills.
- **Quantified learning harm:** The 17% score reduction (Cohen's d = 0.738) provides a concrete number for what passive AI use costs. This is not a marginal effect -- it is a substantial impairment from a single 35-minute session.
- **Agentic tools as greater risk:** The paper notes their chat-based interface is a "lower bound for cognitive offloading" compared to agentic tools that require even less participation. As AI tools become more autonomous, our tool becomes more important.
