# Thinking -- Fast, Slow, and Artificial: How AI is Reshaping Human Reasoning and the Rise of Cognitive Surrender

## Citation

Shaw, S. D., & Nave, G. (2026). Thinking -- Fast, Slow, and Artificial: How AI is Reshaping Human Reasoning and the Rise of Cognitive Surrender. *SSRN Working Paper* #6097646. The Wharton School, University of Pennsylvania.

- **Published:** January 11, 2026
- **SSRN:** https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646
- **DOI:** 10.31234/osf.io/yk25n

---

## Abstract / Summary

Shaw and Nave extend Daniel Kahneman's dual-process theory (System 1: intuitive; System 2: deliberative) by introducing **System 3: artificial cognition** -- external, automated, data-driven cognitive processes that operate outside the brain. They propose **Tri-System Theory** as a framework for understanding human reasoning in the age of AI. A key prediction of this theory is **cognitive surrender**: the tendency to adopt AI-generated outputs with minimal scrutiny, overriding both intuition (System 1) and deliberation (System 2). Across three preregistered experiments using an adapted Cognitive Reflection Test, they demonstrate that cognitive surrender is robust, difficult to counteract, and disproportionately affects individuals with higher AI trust, lower need for cognition, and lower fluid intelligence.

---

## Methodology

### Design
- **Three preregistered experiments** using an adapted Cognitive Reflection Test (CRT)
- **Total sample:** N = 1,372 participants across 9,593 trials
- **Key manipulation:** AI accuracy was randomized via hidden seed prompts -- participants received either accurate or deliberately faulty AI assistance

### Study Structure

**Study 1 (Baseline):**
- Participants solved logic/reasoning problems with optional AI access
- AI accuracy was randomly varied (correct vs. incorrect)
- Measured: accuracy, AI consultation rate, AI adoption rate, confidence

**Study 2 (Time Pressure):**
- Same task structure with added time pressure condition
- Tested whether urgency moderates cognitive surrender

**Study 3 (Incentives and Feedback):**
- Added per-item financial incentives for correct answers and immediate accuracy feedback
- Tested whether stakes and learning signals moderate cognitive surrender

### Individual Difference Measures
- Trust in AI
- Need for cognition
- Fluid intelligence

---

## Key Findings

### Core Behavioral Results

| Condition | Accuracy |
|---|---|
| Without AI access (baseline) | ~46% |
| With **accurate** AI guidance | ~71% (+25 percentage points) |
| With **faulty** AI guidance | ~31% (-15 percentage points below unaided) |

- **AI consultation rate:** Participants consulted AI on >50% of trials
- **AI adoption rate:** ~80% compliance with AI recommendations even when AI was incorrect
- **Effect size:** Cohen's h = 0.81 (large)

### The Confidence Paradox

- AI boosted participants' confidence by over 10%, **even when it led them to wrong answers**
- The subjective experience of insight was indistinguishable whether the person had actually reasoned through a problem or simply adopted the AI's answer
- Confidence after consulting AI was identical regardless of AI accuracy -- participants felt equally certain about correct answers (from accurate AI) and wrong answers (from faulty AI)

### Robustness to Interventions (Studies 2 & 3)

- **Time pressure:** Shifted baseline performance but did not eliminate cognitive surrender. When accurate, AI buffered time-pressure costs; when faulty, it consistently reduced accuracy
- **Financial incentives:** Per-item incentives amplified performance gains from accurate AI but did not protect against faulty AI
- **Feedback:** Immediate accuracy feedback did not eliminate the surrender pattern
- **Key finding:** No intervention eliminated cognitive surrender. Faulty AI consistently degraded performance regardless of situational moderators

### Individual Differences in Surrender

Most susceptible to cognitive surrender:
- **Higher trust in AI** (strongest predictor)
- **Lower need for cognition** (preference for effortless thinking)
- **Lower fluid intelligence**

This creates a compounding disadvantage: those who most need sharp critical thinking are most likely to abandon it.

---

## Core Concepts Introduced

### Tri-System Theory
An extension of Kahneman's dual-process model:
- **System 1:** Fast, intuitive, automatic thinking
- **System 2:** Slow, deliberative, effortful reasoning
- **System 3:** Artificial cognition -- external, automated, data-driven processes operating outside the brain

System 3 can supplement or supplant internal processes, introducing novel cognitive pathways. It characterizes a "triadic cognitive ecology" where human reasoning is fundamentally reshaped by the availability of external artificial reasoning.

### Cognitive Surrender
The act of adopting AI outputs with minimal scrutiny, overriding both intuition and deliberation. Key properties:
1. **Robust:** Persists across time pressure, incentives, and feedback conditions
2. **Invisible:** Feels like genuine insight, not reliance -- confidence is indistinguishable from earned understanding
3. **Asymmetric:** When AI is right, it helps substantially (+25pp); when wrong, it hurts more than no AI at all (-15pp below baseline)
4. **Unequal:** Disproportionately affects those with higher AI trust and lower cognitive engagement tendencies

---

## Relevance to dontkillmybrain

### Direct Mappings

1. **Cognitive surrender maps to `capitulation` + `passive_acceptance`:** The paper's core concept -- adopting AI outputs with minimal scrutiny -- is precisely what our taxonomy tracks with these two signals. However, Shaw & Nave show this behavior is more insidious than simple laziness: it *feels* like understanding.

2. **The confidence paradox challenges our detection approach:** If users feel equally confident whether they reasoned through a problem or adopted the AI's answer, then the *subjective markers* of genuine engagement may be absent. A user experiencing cognitive surrender may produce responses that *look* like evaluation ("Yes, that's correct") because they genuinely believe they evaluated it.

3. **The 80% adoption rate validates the need for turn-level tracking:** Even in a controlled experiment with obvious manipulation, 80% of AI recommendations were adopted. In real conversations where AI output is generally high quality, the adoption rate is likely even higher, making signal detection critical.

4. **Robustness to interventions is a warning:** If financial incentives and immediate feedback don't eliminate cognitive surrender, simple nudges in our narrator output may face the same limitation. The paper suggests the mechanism is deeper than motivation -- it may be perceptual (the AI answer *looks right* before System 2 can engage).

5. **Individual differences predict vulnerability:** The finding that higher AI trust and lower need for cognition predict greater surrender suggests our tool could benefit from calibrating its feedback to the user's demonstrated engagement pattern, not just their current turn.

### What This Paper Adds Beyond Our Existing Framework

- **The confidence illusion:** Our framework detects passive acceptance and capitulation but doesn't account for the possibility that cognitive surrender is *experientially invisible* to the user. The narrator should address this: helping users see patterns they cannot feel.
- **The asymmetric harm:** The -15pp below baseline when AI is wrong (vs. +25pp when right) means passive acceptance is not just "neutral" -- it actively degrades performance below what the user would achieve alone. This stakes framing should inform narrator output.
- **System 3 as a theoretical anchor:** Tri-System Theory provides a clean framework for explaining *why* our signals matter -- the user is navigating a three-system cognitive ecology, and our tool helps them see which system is doing the work.
