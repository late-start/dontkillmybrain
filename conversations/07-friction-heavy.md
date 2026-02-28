---
title: "Skeptical researcher challenging AI on methodology"
platform: "claude"
scenario: "Friction-heavy pattern. A social science researcher who pushes back on almost everything, challenges assumptions, and requests alternatives. Tests whether the classifier can distinguish genuine intellectual friction from unproductive contrarianism."
expected_signals:
  - turn: 0
    signal: "steering"
    rationale: "Defines the research question and context. This is direction-setting, not friction — no pushback yet because there's nothing to push back on."
  - turn: 1
    signal: "friction"
    rationale: "Rejects the suggested approach (survey-based) with a substantive methodological critique. Provides specific reasons why surveys won't capture what they need. Also dismisses the experimental approach for lacking ecological validity."
  - turn: 2
    signal: "friction"
    rationale: "Pushes back on the revised suggestion. Questions the feasibility of the diary study (dropout, reactivity) and challenges the retrospective interview approach (availability bias). Raising-the-bar friction with specific methodological concerns."
  - turn: 3
    signal: "friction"
    rationale: "Disagrees with the AI's sample size recommendation. Brings their own methodological knowledge (Sim et al.'s critique, information-theoretic saturation from Hennink et al.) to challenge the AI's 15-20 recommendation. This is informed, citation-backed pushback."
  - turn: 4
    signal: "contribution"
    rationale: "Provides specific knowledge about their institutional context (existing panel of 200+, IRB pre-approval) that changes the feasibility analysis. Also adds a theoretically grounded stratification dimension (AI expertise level). This is adding information the AI couldn't have known."
  - turn: 5
    signal: "friction"
    rationale: "Challenges the proposed interview protocol. Rejects the semi-structured format and argues for a narrative-based approach with detailed methodological reasoning. They're not just disagreeing — they articulate a philosophy of data collection that is opposed to the AI's suggestion."
  - turn: 6
    signal: "steering"
    rationale: "Redirects the conversation toward the analysis approach. Preemptively warns against a surface-level answer ('don't just say thematic analysis'). This is direction-setting with a quality bar embedded."
  - turn: 7
    signal: "evaluation"
    rationale: "AMBIGUOUS between evaluation and friction. Partially accepts the AI's recommendation (grounded theory) while pushing back on its characterization of Framework Analysis. Also contributes by specifying the exact coding sequence they want. Leaning evaluation because the primary action is assessing the AI's suggestion and building on it, with a correction rather than a rejection."
  - turn: 8
    signal: "steering"
    rationale: "Redirects the conversation to writing the methods section. Specifies the target venues (HCI, CSCW) and quality standard (publishable). Direction-setting for the next phase of work."
  - turn: 9
    signal: "friction"
    rationale: "Critiques the draft methods section for being too generic and 'AI-sounding.' Points out specific phrases that signal AI-generated writing and demands a more discipline-appropriate tone. Even in the writing phase, they maintain high standards and push back on quality."
---

**Human:** I'm designing a study on how remote workers develop trust in AI-generated recommendations. Specifically, I want to understand the cognitive process — not just whether they trust, but how they decide to trust or distrust. The population is knowledge workers who use AI tools daily in their work. What methodology would you suggest?

**AI:** This is an interesting research question that sits at the intersection of HCI, organizational psychology, and cognitive science. Here are some methodological approaches:

**Quantitative Approaches:**
1. **Survey with validated scales** — You could use adapted versions of the Trust in Automation scale (Jian et al., 2000) combined with the Cognitive Reflection Test (Frederick, 2005) to measure the relationship between analytical thinking and AI trust calibration.
2. **Experimental design** — Present participants with AI-generated recommendations of varying quality in a simulated work task. Measure trust calibration (did they accept good recommendations and reject bad ones?) and response time as a proxy for cognitive effort.

**Mixed Methods:**
3. **Think-aloud protocol** — Have participants use an AI tool while narrating their thought process. Code the verbalizations for trust-related cognitive processes (checking, confirming, deferring, questioning).
4. **Experience sampling** — Ping participants during their actual workday when they're interacting with AI tools. Capture in-the-moment trust decisions.

**Qualitative:**
5. **In-depth interviews** — Semi-structured interviews with workers who use AI tools daily, focusing on critical incidents where they had to decide whether to trust or override an AI recommendation.

Given your focus on the cognitive *process*, I'd suggest either the think-aloud protocol (#3) or a mixed-methods approach combining surveys for breadth and think-aloud or interviews for depth. Would you like me to develop any of these further?

**Human:** I'm not convinced surveys will get at what I'm interested in. Trust calibration scales measure the outcome — how much someone trusts — not the process of how they arrive at that trust judgment. And the Jian scale is from 2000, it was designed for automation trust in manufacturing contexts, not AI-generated content in knowledge work. The context matters enormously here. The experimental approach is better but a simulated task strips out the ecological validity. I care about how people make trust decisions in their actual messy real-world work, not in a controlled setting. I'm more interested in the qualitative end. But I have concerns about think-aloud too.

**AI:** Fair pushback on all counts. The Jian scale point is especially well-taken — the automation trust literature doesn't map cleanly onto generative AI, where the "output" is a complex artifact (text, analysis, code) rather than a binary action.

For the think-aloud concern — I imagine you're worried about reactivity? The act of narrating a trust decision changes the decision itself. When people verbalize "I'm checking this because...", they may engage in more deliberate evaluation than they normally would. This is a well-documented limitation (Ericsson & Simon, 1993).

Alternatives that preserve ecological validity while getting at process:

1. **Diary study / experience sampling hybrid** — Participants log their AI interactions over 2-3 weeks in a structured diary. Each entry captures: what the AI produced, what they did with it (accepted/modified/rejected), and a brief reflection on why. You analyze for patterns in trust decision-making over time.

2. **Retrospective interviews with artifact elicitation** — Interview participants about recent AI interactions, but ask them to show you the actual artifacts (the AI output, their modifications, the final product). The artifact grounds the conversation in specifics rather than abstract self-report.

3. **Stimulated recall** — Screen-record participants' actual work sessions, then review the recordings together. At key moments (when they paused, when they edited AI output, when they accepted it quickly), ask "what were you thinking here?"

The diary study + retrospective interview combination might be your sweet spot. The diary captures the breadth of interactions in situ, and the interviews let you probe depth on specific episodes. Thoughts?

**Human:** The diary study is interesting but three weeks is a big ask for working professionals. You'll get massive dropout, especially from the high-performers who are the most interesting population for this study. And the structured diary format introduces the same reactivity problem as think-aloud — once people know they have to log their trust decisions, they'll start making them differently. The retrospective interviews are more promising, but how do you handle sampling? If you interview people about "recent" AI interactions, you're subject to availability bias — they'll remember the dramatic cases (the AI was completely wrong, the AI saved them hours) and forget the mundane daily interactions that might be where the real trust calibration happens.

**AI:** These are all valid concerns. Let me address the sampling issue specifically because I think that's the crux:

You're right about availability bias in retrospective recall. The dramatic cases are interesting but they're outliers — the everyday, low-stakes trust decisions (do I edit this email draft or send it as-is?) might be more revealing of habitual cognitive patterns.

Possible solutions:

1. **Time-bounded recall** — Instead of "tell me about a time you trusted/distrusted AI," ask about "your AI interactions from yesterday" or "the last 3 AI interactions you had." This reduces availability bias by anchoring to a specific, recent time window. You lose some flexibility in what participants talk about, but you gain ecological representativeness.

2. **Prompted recall via tool logs** — Many AI tools have interaction histories (ChatGPT conversation list, Copilot suggestions accepted/rejected). Ask participants to review their actual interaction log during the interview and walk you through several. The log serves as a memory aid and reduces bias.

3. **Light-touch diary + follow-up interview** — I hear your concern about dropout and reactivity with a 3-week diary. What about a very minimal version: participants just screenshot their AI interactions for one week (no reflection, no structured format — just screenshots). Then you use those screenshots as interview prompts. This minimizes the reactivity problem because there's no reflective component during the week, and the screenshots capture mundane interactions that wouldn't be recalled later.

4. **Sampling strategy for interviews**: Instead of convenience sampling, recruit from a panel where you can pre-screen for frequency and type of AI use. Stratified purposive sampling across:
   - AI tool type (generative text, code completion, analytical)
   - Usage frequency (daily vs. occasional)
   - Role type (creative, analytical, managerial)
   - Tenure with AI tools (new adopters vs. established users)

For sample size, I'd suggest 15-20 participants if you're doing in-depth interviews — that's typically where qualitative saturation occurs in this type of study (Guest et al., 2006).

How does the screenshot-based approach sound?

**Human:** The screenshot approach is clever — it captures the mundane interactions without the reactivity of a structured diary. I can work with that. But I'm skeptical of the 15-20 sample size recommendation. Guest et al.'s saturation claim has been heavily critiqued — Sim et al. (2018) showed that saturation depends on the heterogeneity of the population and the complexity of the phenomenon, not on some magic number. For a complex cognitive phenomenon like trust calibration across diverse AI tools, you might need more. Or you might need fewer if the population is more homogeneous. I'd rather use information-theoretic saturation (Hennink et al., 2017) and assess it continuously during data collection rather than set a number in advance.

**AI:** You're absolutely right, and I should have been more careful with that recommendation. Citing Guest et al. as a basis for sample size is exactly the kind of uncritical shorthand that weakens methodology sections. The 12-20 range has become a received wisdom that often substitutes for actual engagement with saturation.

Hennink et al.'s information-theoretic approach is more rigorous for your design:
- **Code saturation** (when no new codes emerge) can happen relatively early — maybe 9-12 interviews
- **Meaning saturation** (when you fully understand the dimensions of each code) takes longer and depends on the conceptual complexity

For your study, the trust calibration process likely has multiple distinct dimensions (source credibility assessment, output plausibility checking, contextual anchoring, effort-based heuristics). Meaning saturation across all these dimensions in a heterogeneous population could require more than 20 interviews, or it could require fewer if strong patterns emerge early.

Practical approach:
- Set a **minimum** of 12 interviews (below which you almost certainly haven't saturated)
- Conduct interviews in batches of 4
- After each batch, do preliminary open coding
- Track new code emergence and meaning development
- Stop when two consecutive batches produce no new codes and the meaning of existing codes is fully articulated
- Set a **maximum** of 30 for planning/budgeting purposes

This gives you methodological rigor AND practical bounds for IRB approval and timeline planning. You can report the actual saturation trajectory in your methods section.

Does this sampling strategy work? What about the IRB timeline — is that a constraint?

**Human:** IRB won't be an issue — I have a standing protocol for this type of study through our lab's ongoing research program on AI and work. I already have a panel of 200+ knowledge workers who've consented to participate in studies. I can screen from that panel, which solves the recruitment problem too. For the stratification, I'd add self-reported AI expertise level — the trust process might look fundamentally different for someone who understands how LLMs work versus someone who thinks of it as a "smart search engine."

**AI:** Having a standing panel of 200+ is a huge advantage — it means you can do the stratified purposive sampling properly and recruit specifically for the cells you need, rather than taking whoever responds to a Craigslist ad.

Adding AI expertise level to the stratification is a great call. This connects to Sundar's (2020) MAIN model — the "machine heuristic" operates differently when people have mental models of how the technology actually works. A developer who understands transformer attention patterns may evaluate AI output through a fundamentally different cognitive lens than a marketing manager who just sees "the AI said."

Updated stratification matrix:

| Dimension | Categories |
|-----------|-----------|
| AI tool type | Generative text / Code assist / Analytical |
| Usage frequency | Daily / 2-3x weekly / Weekly |
| AI expertise | Technical understanding / Functional user / Naive user |
| Role type | Creative / Analytical / Managerial |

That's 3 × 3 × 3 × 3 = 81 cells, which is obviously too many for qualitative research. You'd want to focus on the most theoretically interesting contrasts. I'd suggest:
- **Priority cells**: Technical + daily + code assist vs. Naive + daily + generative text. These are the extremes that should produce the most divergent trust processes.
- **Middle ground**: Functional users across different tool types — these are the majority of AI users and the most practically relevant.

You could recruit 4-5 from each priority cell and 2-3 from each middle-ground cell to ensure theoretical sampling across the spectrum.

Want to develop the interview protocol next?

**Human:** Yes, but I want to think about this carefully. I don't want a standard semi-structured interview guide with predetermined questions. That would impose my assumptions about what the trust calibration process looks like before I've actually observed it. I'd rather use a narrative-based approach — open with something like "walk me through how you worked with [AI tool] yesterday" and let the participant's own framing reveal the cognitive structure. The screenshots serve as prompts but I follow the participant's narrative, not my question list. I'll probe for cognitive process when it comes up naturally, but I'm not going to ask "did you evaluate the AI's output" because that presupposes evaluation is a discrete step in their process. Maybe it is, maybe it isn't — that's what I'm trying to find out.

**AI:** This is a really important methodological point. A semi-structured protocol would essentially embed a theory of trust calibration into the data collection instrument — you'd end up confirming your preconceptions rather than discovering the actual cognitive process.

The narrative approach you're describing aligns with what Mishler (1986) calls "research interviewing as joint construction of meaning" — you're letting the participant's own categories and framings emerge rather than imposing yours.

Here's how I'd structure this:

**Interview Protocol (Narrative-Based):**

**Opening (5 min):**
- Rapport, logistics, remind them about the screenshots
- "I'm interested in how you work with AI tools in your day-to-day. There are no right or wrong answers — I just want to understand your experience."

**Narrative Phase (25-35 min):**
- Primary prompt: "Can you walk me through your AI interactions from [yesterday/this morning]? Start from the beginning — what were you working on, what did you use the AI for?"
- Follow the participant's narrative thread
- Screenshot prompts when needed: "I noticed you took a screenshot of this interaction — can you tell me more about what was happening here?"

**Probing toolkit (use responsively, not sequentially):**
- Process probes: "What happened next?" / "And then?"
- Cognitive probes: "What was going through your mind at that point?" / "How did you decide to [action they described]?"
- Contrast probes: "Was that different from how you usually handle it?"
- Emotion probes: "How did that feel?" (trust has an affective component)

**Closing (5-10 min):**
- "Is there anything about how you work with AI that we haven't talked about?"
- "Looking at all these interactions, do you notice any patterns?"

**What to NOT do:**
- Don't ask directly about "trust" until the participant introduces the concept
- Don't impose a sequential model ("first you evaluated, then you decided...")
- Don't ask leading questions ("Did you feel uncertain about...")
- Don't redirect away from "irrelevant" tangents — the participant's framing of what's relevant IS the data

The risk with this approach is inconsistency across interviews — each will go in a different direction. But that's actually a feature for inductive qualitative research. You analyze across narratives for common structures and divergent patterns.

How does this protocol feel? And should we talk about the analysis approach?

**Human:** Let's talk about analysis. What coding approach do you think is appropriate? And don't just say "thematic analysis" — that's become a meaningless catch-all that people use to avoid specifying their actual analytic procedure.

**AI:** Ha, fair. "We used thematic analysis (Braun & Clarke, 2006)" has become the qualitative equivalent of "p < .05" — technically says something, practically says nothing about what was actually done.

Given your research design — inductive, narrative-based, exploring a cognitive process you don't want to pre-theorize — here are three genuinely distinct options:

**1. Interpretive Phenomenological Analysis (IPA)**
- Focus: How individuals make sense of their lived experience
- Process: Idiographic analysis of each case first (within-case), then cross-case patterns
- Strength for your study: Takes the cognitive/experiential process seriously. Each participant's trust process is analyzed as a coherent whole before comparing across people.
- Limitation: Works best with small, homogeneous samples (6-10). Your stratified design with diverse cells might be too heterogeneous.

**2. Constructivist Grounded Theory (Charmaz, 2014)**
- Focus: Building theory from data through iterative coding (initial coding → focused coding → theoretical coding)
- Process: Constant comparative method — each new interview is analyzed against emerging categories. Memo-writing throughout.
- Strength for your study: Explicitly designed for theory building about processes. The iterative nature integrates naturally with your rolling saturation assessment. You're literally building a theory of trust calibration from the ground up.
- Limitation: Requires genuine openness to the data — if you already have a strong hypothesis, grounded theory becomes performative.

**3. Framework Analysis (Ritchie & Spencer, 1994)**
- Focus: Applied research, policy-relevant findings
- Process: Charting data into a matrix organized by case and theme. More structured than grounded theory.
- Strength: Transparency and auditability. Good if you need to show stakeholders exactly how you got from data to findings.
- Limitation: The framework can become a straitjacket if applied too rigidly. Less suited to purely exploratory work.

For your study, I'd lean toward **constructivist grounded theory**. Your design is explicitly exploratory, you don't want to impose pre-existing categories, and you're trying to build a process model. CGT is designed exactly for this.

The deductive coding frameworks (like the one you'd use in framework analysis) would re-introduce the assumption problem you're avoiding in your interview protocol — you'd be coding for "evaluation," "delegation," "calibration" as if those are the natural categories. Maybe they are. But you should discover that, not assume it.

**Human:** Grounded theory is where I was leaning too. Though I'd push back on your characterization of Framework Analysis — Ritchie and Spencer designed it for applied policy research specifically because they needed rigor and transparency without sacrificing flexibility. It's more flexible than you suggested. But for this study, CGT is right. I want initial coding that stays close to the data, then focused codes that start to abstract, then theoretical codes that articulate the process model. One thing I want to be careful about: how do I handle the analysis of the screenshots alongside the verbal data? The screenshot is a visual artifact and the narrative is a verbal account of the same event — they're different data types that need to be analyzed in relationship to each other.

**AI:** Good correction on Framework Analysis — I was reductive. Ritchie and Lewis (2003) specifically argue it's more adaptable than people give it credit for. The matrix format creates an *appearance* of rigidity that doesn't reflect how skilled analysts actually use it.

On the screenshot + narrative analysis question — this is a genuine methodological challenge. You have two data streams representing the same interaction:

1. **The screenshot** — A visual record of what *actually happened* (the AI output, the interface state, the user's edit)
2. **The narrative** — The participant's *retrospective account* of what happened and why

These can converge or diverge, and both cases are analytically interesting:
- **Convergence**: The narrative accurately describes the screenshot interaction → reinforces the finding
- **Divergence**: The participant's account differs from what the screenshot shows → reveals rationalization, implicit processes, or cognitive phenomena they're not aware of

**Analytical approach for multi-modal data in CGT:**

**During coding:**
- Code the narrative transcript as primary data
- For each interview segment that references a screenshot, create a "visual memo" — write a brief description of what the screenshot shows, then note the correspondence or gap between the visual evidence and the verbal account
- The screenshot functions as a **triangulation point**, not a separate data source to code independently

**Specific techniques:**
- **Artifact analysis coding**: When the screenshot shows the participant made 12 edits to an AI output but they said "I mostly used it as-is," code this discrepancy as a "minimizing modification" pattern. This could reveal unconscious trust processes.
- **Sequence mapping**: Use the screenshot to reconstruct the actual behavioral sequence (AI output → edit → edit → accept), then compare to the narrative sequence. Where people restructure the sequence in recall is theoretically interesting.
- **Visual elicitation prompts in coding**: During analysis (not just the interview), return to screenshots when a code feels ambiguous. The visual evidence can disambiguate.

**In your methods section**, frame this as "artifact-elicited narrative analysis within a constructivist grounded theory framework" — the screenshots serve as elicitation devices during data collection AND as triangulation devices during analysis.

This approach is methodologically defensible and addresses the multi-modal challenge without requiring a separate visual analysis methodology (like visual discourse analysis) that might not integrate well with CGT.

Want to move to writing up the methods section?

**Human:** Yeah, let's draft the methods section. I want it to be publishable-quality — this is going in a journal submission, probably to Human-Computer Interaction or CSCW. Give me a full methods section with the study design, participants, data collection, and analysis subsections.

**AI:** Here's a draft methods section:

---

## Method

### Study Design

This study employed a constructivist grounded theory approach (Charmaz, 2014) to investigate the cognitive processes through which knowledge workers develop, calibrate, and enact trust in AI-generated recommendations. We chose a qualitative, inductive design because existing models of trust in automation (Lee & See, 2004) were developed in contexts (manufacturing, aviation) that differ substantively from generative AI in knowledge work, where the "output" is a complex artifact requiring domain-specific evaluation. Rather than test existing trust frameworks, we sought to build a process model grounded in workers' actual experiences.

Data collection combined artifact-elicited narrative interviews with visual documentation of AI interactions. This multi-modal approach addressed a known limitation of retrospective accounts — availability bias toward dramatic or memorable interactions — by grounding narratives in visual records of routine interactions.

### Participants

We recruited participants from an existing research panel of knowledge workers (N = 223) who had previously consented to participate in studies on AI and work. Eligibility required participants to (a) use AI tools (generative text, code assistance, or analytical AI) in their daily work, (b) have used these tools for at least three months, and (c) work remotely or in a hybrid arrangement at least three days per week.

We employed stratified purposive sampling across three dimensions: AI tool type (generative text, code assistance, analytical), self-reported AI expertise (technical understanding of underlying models, functional proficiency, or naive use), and organizational role (creative, analytical, or managerial). This stratification was informed by preliminary evidence that trust processes vary across tool modalities (Yin et al., 2019) and user expertise levels (Sundar, 2020).

Following Hennink et al.'s (2017) approach to information-theoretic saturation, we did not set a fixed sample size a priori. Instead, we conducted interviews in batches of four, performing preliminary open coding after each batch and tracking code emergence and meaning development. We established a minimum of 12 interviews and a maximum of 30 for planning purposes, with the expectation that we would cease recruitment when two consecutive batches produced no new codes and the meaning of existing codes was fully articulated.

[Final sample: N participants were interviewed. Saturation was reached at interview N. Include demographic table.]

### Data Collection

Data collection proceeded in two phases for each participant.

**Phase 1: Visual documentation (1 week).** Participants were asked to screenshot their AI interactions during one normal work week. They received no instructions to reflect on or annotate these screenshots, minimizing reactivity. This low-burden protocol was designed to capture routine, mundane interactions that would not be recalled in a traditional retrospective interview.

**Phase 2: Narrative interview (45-60 minutes, via video call, audio-recorded).** Interviews followed a narrative-based protocol rather than a semi-structured question guide. The primary elicitation prompt was: "Can you walk me through your AI interactions from [recent day]? Start from the beginning — what were you working on, what did you use the AI for?" Participants were then invited to share relevant screenshots as they narrated.

The interviewer followed the participant's narrative thread rather than imposing a predetermined topic sequence. This design choice was critical: a structured protocol would have embedded assumptions about the components and sequence of trust calibration (e.g., presupposing that "evaluation" is a discrete cognitive step) that the study aimed to discover rather than confirm. Responsive probes were used to elicit cognitive process detail ("What was going through your mind at that point?"), temporal sequence ("What happened next?"), and contrast ("Was that different from how you usually handle it?"). Direct questions about "trust" were withheld until the participant introduced the concept to avoid priming.

All interviews were transcribed verbatim. Screenshots were catalogued and linked to corresponding interview segments.

### Analysis

Analysis followed Charmaz's (2014) constructivist grounded theory procedures: initial coding, focused coding, and theoretical coding, with constant comparison and memo-writing throughout.

**Initial coding** was conducted line-by-line on interview transcripts, staying close to participants' own language and framings. Gerunds were used as codes to preserve the processual nature of the data (e.g., "checking against own knowledge," "deferring under time pressure" rather than static labels). For segments referencing screenshots, the visual artifact was analyzed alongside the verbal account. Discrepancies between the visual record and the narrative account — for instance, a participant describing minimal engagement with AI output when the screenshot revealed extensive editing — were coded as analytically significant and explored in memos.

**Focused coding** identified the most frequent and theoretically significant initial codes, which were then applied across the full dataset. During this phase, constant comparison between cases enabled identification of patterns that cut across tool types, expertise levels, and roles, as well as dimensions of variation.

**Theoretical coding** articulated relationships between focused codes to construct a process model of trust calibration. We employed Charmaz's (2014) recommendation to use theoretical codes that emerge from the data rather than importing external frameworks (e.g., we did not impose Lee and See's [2004] three-layer trust model).

Throughout analysis, **memo-writing** served as the primary vehicle for theoretical development. Memos tracked code definitions, comparisons across cases, emerging hypotheses, and analytical decisions. The memo corpus constituted an audit trail supporting the credibility and confirmability of findings (Lincoln & Guba, 1985).

**Rigor and reflexivity.** The first author conducted all interviews and led the analysis. A second coder independently coded a subset of transcripts (20%) during the focused coding phase; discrepancies were resolved through discussion rather than inter-rater reliability metrics, consistent with constructivist epistemology (Charmaz, 2014, p. 133). The research team maintained a reflexive journal documenting preconceptions about AI trust that could influence analysis, including the first author's prior experience with [relevant background]. Member checking was conducted by sharing preliminary process models with a subset of participants and incorporating their feedback.

---

This follows the reporting standards for qualitative research in HCI/CSCW (McDonald et al., 2019) and includes enough procedural detail for reviewers to evaluate rigor. Let me know what needs adjustment — particularly the reflexivity section, which will need your actual background details.

**Human:** The methods section is solid but it reads too much like it was written by a language model. The sentence structure is too uniform — everything follows the same pattern of "We did X. This addressed Y. It was designed to Z." Real methods sections in CSCW have more varied prose rhythm. Also, some of the phrasing is giving "AI" — "this design choice was critical" is the kind of performative emphasis that language models default to. And the parenthetical citations feel dropped in rather than integrated. In CSCW, you weave the citations into the argument, like "Following Charmaz's (2014) recommendation to..." not "which were developed in contexts that differ substantively (Lee & See, 2004)." Tighten it up and make it sound like a human researcher wrote it.
