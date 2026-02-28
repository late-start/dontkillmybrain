import type { AnalysisResult } from "@/lib/engine/types";

/**
 * Pre-computed sample report for the landing page.
 * Based on a realistic React debugging conversation.
 */
export const sampleReport: AnalysisResult = {
  sessionTitle: "Debugging a React state management issue",
  platform: "Claude",
  humanTurnCount: 12,
  introNarrative:
    "You started strong \u2014 you described the bug precisely and proposed a hypothesis about stale closures. But midway through, when Claude suggested refactoring to useReducer, you accepted without evaluating whether it actually addressed your root cause. By the end, you were copy-pasting solutions instead of reasoning about them.",
  narrative:
    "The conversation opened with genuine problem-solving. You laid out the symptoms clearly: the counter component was showing stale values after rapid clicks, and you suspected the closure over the setState callback was capturing an outdated reference. This was solid diagnostic thinking \u2014 you were framing the problem in your own terms rather than asking Claude to figure it out.\n\nWhen Claude proposed the functional updater pattern (prevCount => prevCount + 1), you pushed back thoughtfully. You\u2019d already tried that, and it didn\u2019t help because the real issue was in the effect cleanup, not the state update. This was your strongest moment \u2014 you were applying domain knowledge to reject a plausible-sounding but incorrect suggestion.\n\nThe shift happened around turn 6. Claude suggested a larger refactor to useReducer with a centralized action dispatch. Instead of asking why this would solve the closure issue \u2014 which it wouldn\u2019t, directly \u2014 you said \u201cyeah that makes sense, let\u2019s try it.\u201d The refactor was elegant code, but it sidestepped your original problem.\n\nFrom there, the pattern accelerated. You accepted the useReducer implementation, then asked Claude to also add the effect cleanup, then asked it to write the tests. Each step was reasonable in isolation, but collectively you\u2019d gone from debugging a specific issue to having Claude rewrite the component while you watched.\n\nThe final exchange was telling: when the tests passed, you said \u201cperfect, thanks!\u201d without checking whether the original stale-closure bug was actually fixed or just masked by the rewrite.",
  highlights: [
    {
      turnIndex: 0,
      annotation:
        "Strong opening \u2014 you framed the problem precisely and proposed your own hypothesis before asking for help.",
      humanMessage:
        "I have a React counter component that shows stale values after rapid clicks. I think the closure over setState is capturing an outdated ref.",
    },
    {
      turnIndex: 4,
      annotation:
        "Your strongest moment \u2014 you rejected a plausible suggestion because you\u2019d already tested it and knew the real issue was elsewhere.",
      humanMessage:
        "I already tried the functional updater pattern. The issue isn\u2019t in the setState call, it\u2019s in the effect cleanup. The interval ref is stale.",
    },
    {
      turnIndex: 10,
      annotation:
        "This is where you stopped reasoning. You accepted a full rewrite without checking if it fixed the original bug.",
      humanMessage:
        "Yeah that looks good. Can you also write the test cases for this?",
    },
  ],
  nudge:
    "Next time you hit a wall, try explaining why you disagree before asking for alternatives. Your pushback on the functional updater was the most productive turn in this conversation \u2014 do more of that.",
  turnSignals: [
    {
      turnIndex: 0,
      signal: "steering",
      confidence: 0.92,
      rationale:
        "Opens with a clear problem statement and proposes own hypothesis. Sets the debugging direction.",
    },
    {
      turnIndex: 2,
      signal: "contribution",
      confidence: 0.87,
      rationale:
        "Provides specific reproduction steps and component structure the AI needs to diagnose the issue.",
    },
    {
      turnIndex: 4,
      signal: "friction",
      confidence: 0.94,
      rationale:
        "Rejects the AI\u2019s functional updater suggestion based on direct testing. Redirects to the real cause.",
    },
    {
      turnIndex: 6,
      signal: "evaluation",
      confidence: 0.82,
      rationale:
        "Reviews the proposed useRef approach and confirms the ref pattern addresses the stale closure.",
    },
    {
      turnIndex: 8,
      signal: "contribution",
      confidence: 0.78,
      rationale:
        "Shares the actual effect code and cleanup logic for Claude to examine.",
    },
    {
      turnIndex: 10,
      signal: "passive_acceptance",
      confidence: 0.91,
      rationale:
        "Accepts the useReducer refactor without evaluating whether it solves the original closure issue.",
    },
    {
      turnIndex: 12,
      signal: "delegation",
      confidence: 0.88,
      rationale:
        "Hands off test writing with implicit constraints from the prior implementation.",
    },
    {
      turnIndex: 14,
      signal: "passive_acceptance",
      confidence: 0.85,
      rationale:
        "Accepts passing tests as proof the bug is fixed without verifying the original symptom.",
    },
    {
      turnIndex: 16,
      signal: "delegation",
      confidence: 0.83,
      rationale:
        "Asks Claude to clean up the component and add error boundaries. Scoped but no quality criteria.",
    },
    {
      turnIndex: 18,
      signal: "passive_acceptance",
      confidence: 0.9,
      rationale:
        "Accepts final version with no review. The conversation ends without confirming the original bug is resolved.",
    },
    {
      turnIndex: 20,
      signal: "capitulation",
      confidence: 0.76,
      rationale:
        "Asks Claude what else should be refactored, offloading judgment about code quality entirely.",
    },
    {
      turnIndex: 22,
      signal: "passive_acceptance",
      confidence: 0.88,
      rationale:
        "Accepts the refactoring suggestions without questioning scope or necessity.",
    },
  ],
  turns: [
    {
      role: "human",
      content:
        "I have a React counter component that shows stale values after rapid clicks. I think the closure over setState is capturing an outdated ref. Here\u2019s the component structure...",
      index: 0,
    },
    {
      role: "ai",
      content:
        "That\u2019s a common issue with closures in React. The most likely cause is that your click handler is closing over a stale state value. Try using the functional updater pattern: setCount(prev => prev + 1) instead of setCount(count + 1).",
      index: 1,
    },
    {
      role: "human",
      content:
        "Here\u2019s the actual code. The component uses useEffect to set up an interval, and there\u2019s a cleanup function that should clear it. The counter displays in a header component that receives count as a prop.",
      index: 2,
    },
    {
      role: "ai",
      content:
        "I see the structure. The interval setup in useEffect with the empty dependency array means the callback captures the initial count value. The functional updater should fix this. Let me show you the corrected version...",
      index: 3,
    },
    {
      role: "human",
      content:
        "I already tried the functional updater pattern. The issue isn\u2019t in the setState call, it\u2019s in the effect cleanup. The interval ref is stale because the cleanup runs with the old ref value.",
      index: 4,
    },
    {
      role: "ai",
      content:
        "You\u2019re right, I apologize for the misdirection. If the interval ref itself is stale, you need to use useRef to hold the interval ID so the cleanup always has the current value. Here\u2019s the pattern...",
      index: 5,
    },
    {
      role: "human",
      content:
        "Yes, that\u2019s the right direction. The useRef for the interval ID should persist across renders. Let me check if that handles the rapid click case where multiple intervals could stack up.",
      index: 6,
    },
    {
      role: "ai",
      content:
        "Good thinking about the stacking. To prevent that, you should clear the existing interval before setting a new one. Here\u2019s a more robust version that also handles the component unmount case...",
      index: 7,
    },
    {
      role: "human",
      content:
        "Here\u2019s my actual effect code with the cleanup. The clearInterval is in the return function but it\u2019s using a local variable instead of the ref.",
      index: 8,
    },
    {
      role: "ai",
      content:
        "That\u2019s exactly the bug. The local variable captures the interval ID at the time the effect runs, but by cleanup time it\u2019s stale. I\u2019d suggest a bigger refactor here \u2014 move to useReducer with a centralized action dispatch. This eliminates the closure issue entirely.",
      index: 9,
    },
    {
      role: "human",
      content:
        "Yeah that looks good. Can you also write the test cases for this?",
      index: 10,
    },
    {
      role: "ai",
      content:
        "Sure! Here\u2019s the full useReducer implementation with the interval management moved into the reducer, plus a comprehensive test suite using React Testing Library...",
      index: 11,
    },
    {
      role: "human",
      content:
        "Can you write the test cases? I want to make sure rapid clicking is covered.",
      index: 12,
    },
    {
      role: "ai",
      content:
        "Here are the test cases covering: single increment, rapid sequential clicks, interval cleanup on unmount, and the stale closure regression test...",
      index: 13,
    },
    {
      role: "human",
      content: "Tests pass. Looks good, thanks!",
      index: 14,
    },
    {
      role: "ai",
      content:
        "Great! The key fix was moving from a local variable to useRef for the interval ID, and the useReducer pattern gives you a cleaner state management model going forward.",
      index: 15,
    },
    {
      role: "human",
      content:
        "Can you also clean up the component and add error boundaries around it?",
      index: 16,
    },
    {
      role: "ai",
      content:
        "Sure, here\u2019s the cleaned up version with an ErrorBoundary wrapper, proper TypeScript types, and the interval logic extracted into a custom useInterval hook...",
      index: 17,
    },
    {
      role: "human",
      content: "That looks clean. Let\u2019s go with that.",
      index: 18,
    },
    {
      role: "ai",
      content:
        "Looks like we\u2019ve got a solid solution. The custom hook makes the interval logic reusable and the error boundary will catch any rendering issues gracefully.",
      index: 19,
    },
    {
      role: "human",
      content:
        "What else do you think should be refactored in this component tree?",
      index: 20,
    },
    {
      role: "ai",
      content:
        "A few things I\u2019d suggest: extract the display logic into a presentational component, add memoization with React.memo on the header, and consider moving the counter state up to a context if other components need it...",
      index: 21,
    },
    {
      role: "human",
      content: "Sure, let\u2019s do all of that. Go ahead.",
      index: 22,
    },
    {
      role: "ai",
      content:
        "Here\u2019s the refactored component tree with all three changes applied...",
      index: 23,
    },
  ],
};
