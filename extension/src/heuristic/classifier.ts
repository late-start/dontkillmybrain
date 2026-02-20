import { Turn, EngagementLevel, Signal } from "../lib/types";

// Passive acceptance phrases
const PASSIVE_PHRASES = [
  "ok",
  "okay",
  "sure",
  "sounds good",
  "go ahead",
  "yes",
  "yeah",
  "yep",
  "continue",
  "next",
  "got it",
  "thanks",
  "thank you",
  "perfect",
  "great",
  "nice",
  "cool",
  "fine",
  "right",
  "alright",
  "k",
  "kk",
  "yup",
  "uh huh",
  "mm",
  "mhm",
];

// Delegation phrases — the user is deferring decisions to the AI
const DELEGATION_PHRASES = [
  "which do you think",
  "what would you recommend",
  "you decide",
  "what do you suggest",
  "up to you",
  "your choice",
  "whatever you think",
  "i'll leave it to you",
  "you pick",
  "what's best",
  "which is better",
  "you tell me",
];

// Steering/friction words — signs of engaged redirection
const STEERING_WORDS = [
  "no",
  "instead",
  "actually",
  "but",
  "however",
  "not what i meant",
  "let's try",
  "what about",
  "i disagree",
  "that's wrong",
  "not quite",
  "let me clarify",
  "i think",
  "my view",
  "i believe",
  "i want",
  "change",
  "modify",
  "different",
  "rather",
  "alternatively",
  "on the contrary",
  "wait",
  "hold on",
  "scratch that",
];

// Coasting follow-up patterns
const COASTING_PATTERNS = [
  "what about",
  "can you also",
  "and also",
  "yes, and",
  "yeah, and",
  "also add",
  "one more thing",
  "how about",
  "could you also",
  "and what about",
  "tell me more",
  "go on",
  "elaborate",
  "more details",
  "explain more",
];

/**
 * Classify the overall engagement level based on recent human turns.
 * Looks at the last 3-5 human turns to determine a weighted engagement score.
 */
export function classifyEngagement(turns: Turn[]): EngagementLevel {
  const humanTurns = turns.filter((t) => t.role === "human");

  if (humanTurns.length === 0) {
    return "passive";
  }

  // Look at the last 5 human turns (or fewer if not enough)
  const recentHumanTurns = humanTurns.slice(-5);

  let engagedScore = 0;
  let coastingScore = 0;
  let passiveScore = 0;

  // Weight more recent turns more heavily
  const weights = recentHumanTurns.map((_, i) => {
    const position = i + 1;
    return position / recentHumanTurns.length;
  });

  for (let i = 0; i < recentHumanTurns.length; i++) {
    const turn = recentHumanTurns[i];
    const weight = weights[i];
    const msg = turn.content.trim().toLowerCase();
    const msgLength = turn.content.trim().length;

    // Check passive signals
    if (isPassiveMessage(msg, msgLength)) {
      passiveScore += weight;
      continue;
    }

    // Check delegation signals
    if (isDelegation(msg)) {
      passiveScore += weight * 0.8;
      continue;
    }

    // Check engaged signals
    const engagedSignals = countEngagedSignals(msg, msgLength);
    if (engagedSignals >= 2) {
      engagedScore += weight;
    } else if (engagedSignals === 1) {
      engagedScore += weight * 0.5;
      coastingScore += weight * 0.5;
    }

    // Check coasting signals
    if (isCoasting(msg, msgLength)) {
      coastingScore += weight;
    }

    // Substantial messages lean toward engaged
    if (msgLength > 100) {
      engagedScore += weight * 0.3;
    } else if (msgLength > 50) {
      engagedScore += weight * 0.15;
    }
  }

  const totalScore = engagedScore + coastingScore + passiveScore;
  if (totalScore === 0) {
    return "coasting";
  }

  const engagedRatio = engagedScore / totalScore;
  const passiveRatio = passiveScore / totalScore;

  if (engagedRatio >= 0.5) {
    return "engaged";
  } else if (passiveRatio >= 0.5) {
    return "passive";
  } else {
    return "coasting";
  }
}

/**
 * Classify a single human turn into a signal category.
 * This is a simpler per-turn classifier using the same heuristics.
 */
export function classifyTurn(
  humanMessage: string,
  _aiMessage?: string
): Signal {
  const msg = humanMessage.trim().toLowerCase();
  const msgLength = humanMessage.trim().length;

  // Check passive acceptance first
  if (isPassiveMessage(msg, msgLength)) {
    return "passive_acceptance";
  }

  // Check delegation
  if (isDelegation(msg)) {
    return "delegation";
  }

  // Check steering (redirection, disagreement, changing course)
  if (hasSteering(msg)) {
    return "steering";
  }

  // Check friction (questioning, pushing back)
  if (hasFriction(msg)) {
    return "friction";
  }

  // Check evaluation (assessing AI output critically)
  if (hasEvaluation(msg)) {
    return "evaluation";
  }

  // Check contribution (adding new ideas, constraints, domain knowledge)
  if (hasContribution(msg, msgLength)) {
    return "contribution";
  }

  // Default: if the message is substantial but doesn't match other signals
  if (msgLength > 50) {
    return "contribution";
  }

  // Short messages that aren't clearly passive default to coasting-like
  return "passive_acceptance";
}

// --- Helper functions ---

function isPassiveMessage(msg: string, length: number): boolean {
  // Very short messages
  if (length < 20) {
    // Check if it matches a passive phrase
    const normalized = msg.replace(/[.!?,]/g, "").trim();
    if (PASSIVE_PHRASES.includes(normalized)) {
      return true;
    }
    // Very short messages that are just a word or two
    if (normalized.split(/\s+/).length <= 3 && !msg.includes("?")) {
      return true;
    }
  }
  return false;
}

function isDelegation(msg: string): boolean {
  return DELEGATION_PHRASES.some((phrase) => msg.includes(phrase));
}

function hasSteering(msg: string): boolean {
  const steeringCount = STEERING_WORDS.filter((word) => {
    // For short words, check word boundaries
    if (word.length <= 3) {
      const regex = new RegExp(`\\b${word}\\b`, "i");
      return regex.test(msg);
    }
    return msg.includes(word);
  }).length;

  return steeringCount >= 1;
}

function hasFriction(msg: string): boolean {
  const frictionPatterns = [
    "why did you",
    "why would",
    "that doesn't",
    "that's not",
    "are you sure",
    "i don't think",
    "i'm not sure",
    "that seems wrong",
    "can you explain why",
    "what's the reason",
    "i question",
    "is that correct",
    "double check",
    "verify",
    "re-examine",
  ];
  return frictionPatterns.some((pattern) => msg.includes(pattern));
}

function hasEvaluation(msg: string): boolean {
  const evalPatterns = [
    "let me check",
    "looking at this",
    "comparing",
    "the tradeoff",
    "trade-off",
    "pros and cons",
    "advantage",
    "disadvantage",
    "what if we",
    "have you considered",
    "another approach",
    "benchmark",
    "test this",
    "validate",
    "does this account for",
    "edge case",
    "what happens when",
  ];
  return evalPatterns.some((pattern) => msg.includes(pattern));
}

function hasContribution(msg: string, length: number): boolean {
  // Substantial message with original content
  if (length < 30) return false;

  const contributionSignals = [
    msg.includes("?"), // Asking specific questions
    /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b/.test(msg), // Proper nouns / domain terms
    msg.includes("because"), // Providing reasoning
    msg.includes("for example"), // Giving examples
    msg.includes("specifically"), // Being specific
    msg.includes("the requirement"), // Adding constraints
    msg.includes("constraint"),
    msg.includes("must"),
    msg.includes("should not"),
    msg.includes("here's"), // Contributing content
    msg.includes("here is"),
    msg.includes("i've found"),
    msg.includes("i noticed"),
    msg.includes("based on"),
    msg.includes("in my experience"),
    length > 100, // Long messages generally indicate contribution
  ];

  return contributionSignals.filter(Boolean).length >= 2;
}

function countEngagedSignals(msg: string, length: number): number {
  let count = 0;

  if (length > 50) count++;
  if (msg.includes("?")) count++;
  if (STEERING_WORDS.some((w) => msg.includes(w))) count++;
  if (hasContribution(msg, length)) count++;
  if (hasFriction(msg)) count++;
  if (hasEvaluation(msg)) count++;

  return count;
}

function isCoasting(msg: string, length: number): boolean {
  if (length < 20 || length > 100) return false;
  return COASTING_PATTERNS.some((pattern) => msg.includes(pattern));
}
