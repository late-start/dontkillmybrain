# Research Evaluation: dontkillmybrain Classification Taxonomy & Narrative Generation

**Date:** 2026-02-20
**Evaluator:** Claude (Opus 4.6)
**Codebase files reviewed:**
- `webapp/src/lib/engine/classifier.ts`
- `webapp/src/lib/engine/narrator.ts`
- `webapp/src/lib/engine/types.ts`

**Research papers evaluated against:**
1. Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakci, O., & Mariman, R. (2024). *Generative AI Can Harm Learning.* SSRN Working Paper #4895486.
2. Dell'Acqua, F., McFowland, E., Mollick, E., et al. (2023). *Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of AI on Knowledge Worker Productivity and Quality.* Harvard Business School Working Paper #24-013.
3. Tankelevitch, L., Kewenig, V., Simkute, A., Scott, A.E., Sarkar, A., Sellen, A., & Rintel, S. (2024). *The Metacognitive Demands and Opportunities of Generative AI.* CHI '24.

---

## 1. Summary of the Current System

The classifier assigns each human turn in a conversation exactly one of six signals:

| Signal | Definition (from classifier prompt) |
|---|---|
| `steering` | Deciding direction -- introducing goals, constraints, or redirecting the conversation |
| `friction` | Pushing back -- questioning, rejecting, challenging, or raising the bar |
| `contribution` | Bringing something the AI doesn't have -- domain knowledge, personal experience, context, taste, or judgment |
| `evaluation` | Assessing the AI's output -- probing, verifying, modifying, or testing what the AI produced |
| `passive_acceptance` | Accepting without meaningful engagement -- short acknowledgments like "ok", "thanks", "got it" |
| `delegation` | Asking the AI to make judgments or decisions -- offloading thinking, asking "what should I do?" |

The narrator then generates a narrative analysis (intro, body, highlights, nudge) based on the signal timeline.

---

## 2. Evaluation of the 6-Signal Taxonomy Against the Research

### 2.1 What the Taxonomy Gets Right

**The core polarity is well-grounded.** The taxonomy implicitly models a spectrum from high cognitive engagement (`steering`, `friction`, `contribution`, `evaluation`) to low cognitive engagement (`passive_acceptance`, `delegation`). This maps directly to the central finding across all three papers:

- **Bastani et al.** found that students who used GPT-4 as a "crutch" (accepting answers without doing the cognitive work) performed 17% worse on exams than students with no AI access. Students using the guardrailed GPT Tutor -- which forced them to engage rather than copy -- showed no such learning deficit. The paper's core mechanism is precisely the difference between your active signals and your passive ones.

- **Dell'Acqua et al.** found that consultants who "fell asleep at the wheel" (blindly adopting AI output) were 19 percentage points less likely to produce correct solutions on tasks outside the AI's capability frontier. Successful users were "Centaurs" (strategically delegating specific subtasks) or "Cyborgs" (continuously interweaving human and AI effort) -- both patterns that require the active behaviors your taxonomy captures.

- **Tankelevitch et al.** frame the entire interaction as requiring metacognitive monitoring and control. Their framework explicitly identifies output evaluation, prompt formulation, prompt iteration, and automation strategy as distinct metacognitive demands. Your `evaluation`, `steering`, and `friction` signals correspond to the monitoring side; your `delegation` and `passive_acceptance` signals correspond to failures of metacognitive control.

**The `evaluation` signal is especially well-supported.** Tankelevitch et al. identify output evaluation as a primary metacognitive demand of GenAI. Dell'Acqua et al. found that the critical behavioral difference between successful and unsuccessful AI users was whether they interrogated AI output. Bastani et al. found students were "either unable to detect AI failures or unwilling to spend the effort needed to check correctness." Your taxonomy's explicit tracking of evaluation behavior is one of its strongest features.

**The `delegation` signal captures a real and documented risk.** Tankelevitch et al. frame AI reliance as a "metacognitive control decision" -- the decision to offload cognitive work follows from metacognitive monitoring of one's own ability. Dell'Acqua's "falling asleep at the wheel" research found that higher-quality AI paradoxically made recruiters *less* accurate because they stopped exerting effort. Your `delegation` signal captures this offloading behavior directly.

**The `contribution` signal captures what makes Centaurs/Cyborgs successful.** Dell'Acqua et al. found that both Centaurs and Cyborgs maintained value by bringing human judgment, domain knowledge, and varied perspectives that AI lacked. Your `contribution` signal -- defined as "bringing something the AI doesn't have" -- directly models this.

---

### 2.2 What the Taxonomy Misses or Under-Specifies

#### ISSUE 1: `delegation` conflates strategic delegation with harmful offloading

**Problem:** The current definition treats all delegation as a single signal: "asking the AI to make judgments or decisions for them -- offloading thinking." But Dell'Acqua et al.'s most important finding is that *strategic* delegation is the hallmark of the most effective AI users.

- **Centaurs** deliberately delegate tasks that fall inside the AI's capability frontier while retaining tasks where human judgment is stronger. This is *skilled* delegation based on accurate mental models of AI capability.
- The "falling asleep at the wheel" pattern, by contrast, is *undiscriminating* delegation -- handing over judgment without assessing whether the task is inside or outside the AI's frontier.

Tankelevitch et al. frame this as the "automation strategy" metacognitive demand: knowing "whether, when, and how to apply GenAI to one's workflows." They explicitly argue that optimal offloading to GenAI may constitute an emerging kind of expertise or "meta-expertise."

**Your current taxonomy treats the Centaur's most sophisticated move (strategic delegation to the AI for a well-scoped subtask) the same as the crutch user's capitulation (asking the AI to decide everything). This is a significant gap.**

**Recommendation:** Split `delegation` into two signals, or add a qualifying dimension:
- `delegation` (or `strategic_delegation`): The human deliberately scopes a task for the AI, with evidence of understanding what they're delegating and why. Example: "Write the SQL query for this -- I've specified the schema and the join logic, you handle the syntax."
- `capitulation` (or `blind_delegation`): The human hands over judgment without scoping, without evidence of understanding, or in a domain where they should be exercising judgment. Example: "What should I do?" or "Just pick whichever one you think is best."

Alternatively, keep `delegation` as a single signal but add a sub-classification: `delegation_strategic` vs `delegation_abdication`.

---

#### ISSUE 2: No signal for metacognitive self-monitoring or confidence calibration

**Problem:** Tankelevitch et al. identify a critical metacognitive behavior that your taxonomy does not capture: the user's monitoring and articulation of their own understanding, uncertainty, or confidence.

Examples of this behavior:
- "I think this is right but I'm not sure about the edge case with null values"
- "Wait, I don't actually understand why this works"
- "I'm out of my depth on the tax implications here -- can you explain the reasoning?"
- "Let me think about this before you continue"

This is distinct from all six of your current signals. It is not `evaluation` (which assesses the *AI's* output), not `contribution` (which brings knowledge the AI lacks), not `friction` (which pushes back), and not `steering` (which sets direction). It is the user monitoring their *own* cognitive state.

**Why this matters:** Bastani et al. found that the primary mechanism of harm was not AI errors but students' failure to recognize gaps in their own understanding. Students using GPT Tutor asked twice as many questions per problem by Session 4 -- they were developing self-monitoring habits. Tankelevitch et al. explicitly argue that "well-adjusted confidence" (accurate calibration between subjective confidence and actual performance) is the critical metacognitive demand at every stage of GenAI interaction.

Dell'Acqua et al. found that recruiters with lower-quality AI "exerted more effort" and "learned to interact better with their assigned AI" precisely because the imperfect AI forced metacognitive monitoring -- they had to attend to their own uncertainty.

**Recommendation:** Consider adding a `self_monitoring` signal (or `metacognitive_check`):
- **Definition:** The human is attending to their own understanding, articulating uncertainty, checking their own reasoning, or pausing to reflect before proceeding. They are monitoring their own cognitive state, not the AI's output.
- This is the behavior that Tankelevitch et al. call "metacognitive monitoring" and that Bastani et al. found was the crucial difference between the GPT Tutor group (which developed it) and the GPT Base group (which did not).

If adding a 7th or 8th signal feels like taxonomy bloat, this could alternatively be tracked as a modifier on other signals (e.g., a `with_self_monitoring` boolean flag on any turn).

---

#### ISSUE 3: `steering` is too broad -- it combines goal-setting with task decomposition and prompt crafting

**Problem:** Tankelevitch et al. distinguish between several metacognitive demands at the prompt formulation stage:
1. **Self-awareness of task goals** -- knowing what you want to achieve
2. **Task decomposition** -- breaking a goal into subtasks appropriate for AI
3. **Prompt iteration / metacognitive flexibility** -- recognizing when a prompting strategy isn't working and adjusting

Your `steering` signal lumps all three together as "deciding direction -- introducing goals, constraints, or redirecting the conversation." While this simplification may be practical for a v1 taxonomy, it obscures an important distinction the research highlights.

Tankelevitch et al. argue that the *decomposition* and *iteration* aspects are where the real metacognitive skill lies. Simply stating a goal ("help me write a business plan") is very different from skillfully decomposing that goal into AI-appropriate subtasks ("First, let's outline the market analysis section -- here are the three competitors I want to compare, and here's the data I have on each").

**Recommendation:** This is lower priority than Issues 1 and 2, but consider whether `steering` should be annotated with a sub-type:
- `steering_goal`: Setting or changing the high-level objective
- `steering_decomposition`: Breaking the task into subtasks, scoping what the AI should work on
- `steering_iteration`: Adjusting the approach based on what's working or not

At minimum, update the `steering` definition to explicitly call out task decomposition and prompt iteration as high-value forms of steering, so the classifier prompt gives appropriate weight to these behaviors.

---

#### ISSUE 4: No signal for the trajectory of engagement over time

**Problem:** All three papers emphasize that the *pattern over time* matters more than any single turn.

- **Bastani et al.** found the learning harm accumulated over four sessions. The critical observation was that GPT Base students showed *decreasing* engagement over time while GPT Tutor students showed *increasing* engagement.
- **Dell'Acqua et al.** found that the centaur/cyborg distinction was visible in the *sequence* of interactions, not individual turns.
- **Tankelevitch et al.** emphasize "metacognitive flexibility" -- the ability to adapt one's strategy *over the course of interaction*.

Your classifier operates turn-by-turn with no temporal context. Each human turn is classified against only the immediately preceding AI turn. The classifier prompt provides no information about what signals have been assigned to prior turns.

**Recommendation:** This is an architecture-level change rather than a taxonomy change, but it has significant implications for accuracy:
1. **Pass prior classifications as context to the classifier.** When classifying turn N, include a summary like: "Prior signals in this conversation: [steering, contribution, evaluation, passive_acceptance, passive_acceptance, passive_acceptance]." This allows the classifier to detect drift patterns and distinguish, for example, an isolated "ok" (which might be `steering` -- the user is satisfied and moving on) from a string of "ok"s (which is clearly `passive_acceptance`).
2. **Add trajectory-level signals to the narrator prompt.** The narrator already receives the full classification list, but the prompt does not specifically instruct it to analyze trajectory patterns like "declining engagement," "shift from active to passive after turn N," or "consistent evaluation throughout." Make this explicit.

---

#### ISSUE 5: The `passive_acceptance` definition may be too narrow

**Problem:** The current definition focuses on *short* responses: "short acknowledgments like 'ok', 'thanks', 'got it', moving on without evaluation." But Bastani et al. and Dell'Acqua et al. both document a more insidious form of passive acceptance: users who engage in *lengthy* interactions with the AI while still failing to do the cognitive work.

In the Bastani study, students using GPT Base had conversations that appeared active on the surface -- they were typing messages and receiving responses -- but they were simply requesting and copying answers. The behavioral signal was not brevity but the *absence of cognitive processing* between the AI's output and the student's next move.

In Dell'Acqua's recruiter study, some recruiters spent significant time reading AI recommendations but still defaulted to the AI's choice without applying their own judgment. The behavior *looked* engaged but was cognitively passive.

**Recommendation:** Expand the `passive_acceptance` definition to explicitly cover:
- Short acknowledgments ("ok", "thanks", "got it")
- Reformulations that add no new information ("So you're saying X" where X is just a restatement)
- Moving to the next step without any evidence of processing the current output
- Accepting a complex or consequential AI output with only superficial engagement (e.g., "Looks good, let's move on" after receiving a detailed analysis)

This is important because the classifier currently keys on *brevity* as the primary signal. A user who says "Great, that looks right, let's continue to the next section" is exhibiting passive acceptance of a potentially complex output, but the message is long enough that the classifier might code it as something else.

---

### 2.3 What the Taxonomy Gets Right and Should Keep

Despite the gaps above, several design decisions are well-supported by the research:

1. **One signal per turn is the right granularity.** While a turn may contain multiple behaviors, forcing a single classification per turn creates a clean timeline that supports the pattern-over-time analysis all three papers emphasize.

2. **The active/passive polarity is the right organizing principle.** All three papers converge on the finding that the critical variable is whether the human maintains cognitive engagement. Your four active signals (`steering`, `friction`, `contribution`, `evaluation`) versus two passive signals (`passive_acceptance`, `delegation`) captures this.

3. **`friction` as a distinct signal is important and often overlooked.** Tankelevitch et al.'s concept of "metacognitive flexibility" -- recognizing when something isn't working and adjusting -- maps directly to friction. Dell'Acqua et al. found that the most successful consultants *interrogated* AI output rather than accepting it. Bastani et al. found that GPT Tutor's guardrails essentially *forced* friction by refusing to give direct answers. Your taxonomy's explicit tracking of pushback behavior is well-grounded.

4. **Separating `evaluation` from `friction` is a good call.** Evaluation (probing, verifying) and friction (challenging, rejecting) are related but distinct metacognitive behaviors. Evaluation can be confirmatory ("Let me check this is right"); friction is inherently adversarial ("I don't think this is right"). Both are valuable but for different reasons, and tracking them separately provides a richer signal.

---

## 3. Evaluation of the Narrative Prompt Against the Research

### 3.1 What the Narrative Prompt Gets Right

**The voice and framing are well-aligned with metacognitive support strategies.** Tankelevitch et al. propose three types of metacognitive support: planning, self-evaluation, and self-management. Your narrator prompt's design choices map to these:

- **"Second person: address the reader as 'you'"** -- This is a self-evaluation support strategy. Research on metacognitive prompting shows that second-person framing activates self-referential processing, making users more likely to engage in self-reflection.

- **"Non-judgmental: observe patterns without declaring them good or bad"** -- This avoids the reactance effect documented in educational psychology. Bastani et al. found that the GPT Tutor's approach of guiding rather than prescribing was more effective. A judgmental tone risks making users defensive rather than reflective.

- **"Specific: reference actual moments in the conversation"** -- This is critical for metacognitive calibration. Tankelevitch et al. argue that one reason users struggle with AI is that they lack specific, grounded feedback about their own behavior. General advice ("be more critical") is less actionable than specific observation ("In turn 7, you accepted a complex tax calculation without checking the math").

- **The "nudge" as "a door opening, not a finger wagging"** -- This is well-designed as a metacognitive prompt. It invites the user to engage in prospective metacognition (thinking about future behavior) without prescribing specific actions.

**The "highlights" feature has strong research grounding.** By annotating 2-3 specific moments on the timeline, the narrator creates what Tankelevitch et al. would call "metacognitive cues" -- specific points that invite the user to reflect on their behavior in context. This is substantially more effective than summary-level feedback.

### 3.2 What the Narrative Prompt Should Change

#### ISSUE 6: The narrative prompt does not instruct the narrator to identify trajectory patterns

**Problem:** As noted in Issue 4, all three papers emphasize that the *pattern over time* is the most important signal. The narrative prompt tells the narrator to "notice patterns, shifts, and interesting choices" but does not specifically instruct it to look for:

- **Engagement decay:** A shift from active to passive signals as the conversation progresses (the "crutch" pattern from Bastani et al.)
- **Engagement growth:** Increasing sophistication of steering, evaluation, or contribution over time
- **Frontier-crossing moments:** Points where the user's engagement level dropped precisely when the task became more complex or moved outside familiar territory (the "jagged frontier" problem from Dell'Acqua et al.)
- **Mode shifts:** Transitions between Centaur-style delegation (strategic handoffs) and passive acceptance, which may indicate the user losing track of the frontier

**Recommendation:** Add explicit instructions to the narrator prompt to identify and comment on trajectory patterns. Suggested addition to the narrator system prompt:

```
Pay special attention to how engagement changes over the course of the conversation:
- Does the human start strong but gradually accept more without checking?
- Does the human become more engaged and precise as the conversation progresses?
- Are there moments where the complexity of the task increases and the human's engagement level shifts in response?
- Does the human maintain consistent evaluation throughout, or does verification drop off after the first few turns?
These trajectory patterns are often more revealing than any single turn.
```

---

#### ISSUE 7: The narrative prompt says "No jargon" but should use *some* accessible framing of the underlying concepts

**Problem:** The prompt instructs "don't use terms like 'cognitive offloading' or 'engagement metrics.'" This is appropriate for avoiding opaque academic language, but it may go too far. The entire value proposition of this tool is helping users understand their cognitive engagement with AI. If the narrative never names the *concepts* (in plain language), users may miss the deeper pattern.

Tankelevitch et al. argue that metacognition is "both measurable and teachable." But teachability requires that the user develops vocabulary for what they're observing. A narrative that says "you stopped checking the AI's work around turn 8" is good. A narrative that also says "this is a common pattern -- when AI output looks polished and confident, it's easy to stop questioning it" gives the user a transferable insight.

**Recommendation:** Keep the no-jargon instruction but add:

```
You may name common patterns in plain language when doing so gives the reader a transferable insight. For example:
- "When AI output sounds confident, it's easy to stop questioning it"
- "You handled the parts you knew well yourself and handed off the rest -- that's a strong pattern"
- "The more the AI did for you, the less you checked its work -- that's worth noticing"
Do not use academic terms like "cognitive offloading," "metacognitive monitoring," or "automation bias." Use plain language that makes the insight stick.
```

---

#### ISSUE 8: The narrator does not contextualize the stakes of the observed patterns

**Problem:** Bastani et al.'s core finding is that passive AI use *harms learning* -- not just in the moment but in future performance when the AI is unavailable. Dell'Acqua et al. found that passive acceptance led to *worse outcomes* than no AI at all on tasks outside the frontier. The stakes are concrete and documented.

Your narrator prompt says "Non-judgmental: observe patterns without declaring them good or bad." This is the right tone, but "non-judgmental" should not mean "stakes-free." The research is clear that these patterns have real consequences, and a tool designed to help people think about their AI use should help them understand *why* the patterns matter.

**Recommendation:** Add a subtle stakes-awareness instruction:

```
You are not judging the reader, but you are not pretending the patterns don't matter either. If someone consistently accepted without evaluating, you might observe: "For most of this conversation, you took what the AI gave you and moved on. That works fine when the AI is right -- but you'd have no way to tell if it wasn't." Let the reader draw their own conclusions from honest observation.
```

This aligns with Bastani et al.'s finding that the harm wasn't the AI being wrong -- it was that students *couldn't tell* when it was wrong because they hadn't done the cognitive work.

---

#### ISSUE 9: The highlights feature should prioritize specific moment types

**Problem:** The narrator prompt says "pick 2-3 of the most interesting or revealing moments" without specific guidance on what types of moments are most valuable to highlight per the research.

**Recommendation:** Add prioritization guidance based on the research:

```
When selecting highlights, prioritize these types of moments (in rough order of value):
1. Mode shifts: where the human's engagement pattern changes noticeably (e.g., from evaluating to accepting)
2. Frontier moments: where the task complexity increased and the human either rose to meet it or deferred to the AI
3. Missed verification: where the AI produced something complex or consequential and the human moved past it quickly
4. Strong contribution: where the human brought something only they could bring -- expertise, context, judgment
5. Effective friction: where the human pushed back and it changed the direction or quality of the conversation
```

---

## 4. Additional Recommendations

### 4.1 Consider the "Jagged Frontier" in the Classifier Context

Dell'Acqua et al.'s most actionable insight for this tool is that the *same user* may exhibit very different engagement patterns depending on whether the task falls inside or outside their domain expertise. A software engineer discussing architecture (inside their frontier) may show consistent `steering`, `evaluation`, and `contribution`. The same person asking about tax law (outside their frontier) may shift to `delegation` and `passive_acceptance`.

**Recommendation:** The narrator prompt should be instructed to notice when the *topic* or *task type* shifts within a conversation and whether engagement patterns shift with it. This is a low-cost, high-value addition:

```
If the conversation covers multiple topics or task types, notice whether the human's engagement pattern changes between them. A person who carefully evaluates code suggestions but passively accepts legal advice may be confident in one domain but not the other -- that boundary is worth observing.
```

### 4.2 Default-to-`passive_acceptance` on Classification Failure is a Research-Informed Risk

In `classifier.ts` (line 62-63), when the classifier returns an invalid signal, the system defaults to `passive_acceptance`. When the classification call fails entirely (line 83-84), it also defaults to `passive_acceptance` with confidence 0.

This is a design choice that could systematically inflate the count of passive acceptance signals. If the tool is meant to help users understand their engagement, false positives for the most concerning signal could undermine trust.

**Recommendation:** Consider defaulting to a neutral `unknown` signal (which would need to be added to the type system) rather than to the signal that carries the most negative implication.

### 4.3 Single-Turn Classification Without Conversation Window

The classifier sees only one AI-human turn pair at a time. Tankelevitch et al.'s framework emphasizes that metacognitive behavior is contextual -- the same response ("sounds good") might be `passive_acceptance` after a trivial suggestion or `evaluation` after a long deliberative exchange where the user has already thoroughly vetted the approach and is confirming agreement.

**Recommendation (lower priority):** Consider providing a sliding window of 2-3 prior turns as context to the classifier, rather than just the immediately preceding AI turn. This would allow the classifier to distinguish "sounds good" as terminal acceptance vs. "sounds good" as confirmatory closure of an evaluative sequence.

---

## 5. Summary of Recommendations by Priority

### High Priority (directly impacts accuracy of the core product)

| # | Recommendation | Research Basis |
|---|---|---|
| 1 | Split `delegation` into strategic vs. abdication variants | Dell'Acqua (Centaurs vs. falling asleep); Tankelevitch (automation strategy as meta-expertise) |
| 2 | Add trajectory pattern detection to the narrator prompt | All three papers (engagement decay, crutch effect, metacognitive flexibility) |
| 3 | Expand `passive_acceptance` definition beyond short messages | Bastani (lengthy but cognitively passive AI use); Dell'Acqua (surface engagement without judgment) |
| 4 | Add stakes-awareness to narrator without being judgmental | Bastani (17% exam performance harm); Dell'Acqua (19pp accuracy drop on frontier tasks) |

### Medium Priority (strengthens alignment with research)

| # | Recommendation | Research Basis |
|---|---|---|
| 5 | Consider a `self_monitoring` signal for metacognitive check-ins | Tankelevitch (metacognitive monitoring as core demand); Bastani (self-monitoring as key differentiator) |
| 6 | Add plain-language naming of common patterns to narrator | Tankelevitch (metacognition is teachable; requires vocabulary) |
| 7 | Prioritize highlight moment types in narrator prompt | All three papers (mode shifts and frontier moments are most diagnostic) |
| 8 | Add domain/topic shift awareness to narrator | Dell'Acqua (jagged frontier varies by domain) |

### Lower Priority (architecture improvements)

| # | Recommendation | Research Basis |
|---|---|---|
| 9 | Pass prior signal context to the classifier | Tankelevitch (metacognitive flexibility is temporal); Bastani (engagement trajectory matters) |
| 10 | Add sub-types to `steering` (goal, decomposition, iteration) | Tankelevitch (distinct metacognitive demands at each stage) |
| 11 | Change default-on-failure from `passive_acceptance` to `unknown` | General measurement validity concern |
| 12 | Provide sliding window of prior turns to classifier | Tankelevitch (context-dependent metacognitive behavior) |

---

## 6. Overall Assessment

The dontkillmybrain taxonomy is a strong v1 framework with genuine grounding in the research literature. Its core insight -- that tracking the character of human cognitive engagement turn-by-turn reveals meaningful patterns about how a person uses AI -- is directly supported by all three papers evaluated here. The four active signals (`steering`, `friction`, `contribution`, `evaluation`) capture the behaviors that Bastani et al., Dell'Acqua et al., and Tankelevitch et al. all identify as protective of human learning and judgment. The two passive signals (`passive_acceptance`, `delegation`) capture the behaviors all three papers identify as harmful.

The most significant gap is the conflation of strategic and harmful delegation. Dell'Acqua et al.'s Centaur pattern -- the most effective mode of human-AI collaboration in their study -- would currently be classified with the same signal as the "falling asleep at the wheel" pattern that produced the worst outcomes. Resolving this should be the top priority.

The narrative prompt is thoughtfully designed with a voice that aligns well with what the research says about effective metacognitive feedback. The main improvements needed are making trajectory analysis explicit, adding proportionate stakes-awareness, and giving the narrator specific guidance on what types of moments are most revealing.

The tool's approach of classifying then narrating is structurally sound. The classification provides the data; the narrative provides the meaning. This two-stage architecture naturally supports the kind of metacognitive reflection that Tankelevitch et al. argue is both needed and teachable.
