import { Transcript, Turn } from "@/lib/engine/types";
import { Parser } from "@/lib/parsers/types";

/**
 * Patterns that identify speaker labels at the start of a line.
 * Each entry maps a regex to the role it represents.
 */
const SPEAKER_PATTERNS: { pattern: RegExp; role: "human" | "ai" }[] = [
  { pattern: /^Human:\s*/i, role: "human" },
  { pattern: /^Assistant:\s*/i, role: "ai" },
  { pattern: /^User:\s*/i, role: "human" },
  { pattern: /^AI:\s*/i, role: "ai" },
  { pattern: /^Me:\s*/i, role: "human" },
  { pattern: /^ChatGPT:\s*/i, role: "ai" },
  { pattern: /^You:\s*/i, role: "human" },
  { pattern: /^Claude:\s*/i, role: "ai" },
];

function detectLabeledFormat(input: string): Turn[] | null {
  const lines = input.split("\n");
  const turns: Turn[] = [];
  let currentRole: "human" | "ai" | null = null;
  let currentContent: string[] = [];
  let turnIndex = 0;

  for (const line of lines) {
    let matched = false;

    for (const { pattern, role } of SPEAKER_PATTERNS) {
      if (pattern.test(line)) {
        // Save previous turn
        if (currentRole !== null && currentContent.length > 0) {
          turns.push({
            role: currentRole,
            content: currentContent.join("\n").trim(),
            index: turnIndex++,
          });
        }

        currentRole = role;
        currentContent = [line.replace(pattern, "")];
        matched = true;
        break;
      }
    }

    if (!matched) {
      currentContent.push(line);
    }
  }

  // Don't forget the last turn
  if (currentRole !== null && currentContent.length > 0) {
    turns.push({
      role: currentRole,
      content: currentContent.join("\n").trim(),
      index: turnIndex,
    });
  }

  // Only return if we found at least one labeled turn
  return turns.length >= 2 ? turns : null;
}

function detectQuotedAiFormat(input: string): Turn[] | null {
  // Lines starting with ">" are AI responses, others are human
  const lines = input.split("\n");
  const hasQuotedLines = lines.some((l) => l.startsWith("> "));

  if (!hasQuotedLines) return null;

  const turns: Turn[] = [];
  let currentRole: "human" | "ai" | null = null;
  let currentContent: string[] = [];
  let turnIndex = 0;

  for (const line of lines) {
    const isAi = line.startsWith("> ");
    const role: "human" | "ai" = isAi ? "ai" : "human";
    const content = isAi ? line.slice(2) : line;

    if (role !== currentRole) {
      if (currentRole !== null && currentContent.length > 0) {
        const text = currentContent.join("\n").trim();
        if (text) {
          turns.push({
            role: currentRole,
            content: text,
            index: turnIndex++,
          });
        }
      }
      currentRole = role;
      currentContent = [content];
    } else {
      currentContent.push(content);
    }
  }

  if (currentRole !== null && currentContent.length > 0) {
    const text = currentContent.join("\n").trim();
    if (text) {
      turns.push({
        role: currentRole,
        content: text,
        index: turnIndex,
      });
    }
  }

  return turns.length >= 2 ? turns : null;
}

function detectAlternatingParagraphs(input: string): Turn[] {
  // Split by blank lines, assume human starts
  const paragraphs = input
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return paragraphs.map((content, i) => ({
    role: (i % 2 === 0 ? "human" : "ai") as "human" | "ai",
    content,
    index: i,
  }));
}

export const rawTextParser: Parser = {
  canParse(): boolean {
    // Fallback parser — always accepts
    return true;
  },

  async parse(input: string): Promise<Transcript> {
    // Try labeled format first
    const labeled = detectLabeledFormat(input);
    if (labeled) {
      return { turns: labeled, platform: "other" };
    }

    // Try quoted AI format
    const quoted = detectQuotedAiFormat(input);
    if (quoted) {
      return { turns: quoted, platform: "other" };
    }

    // Fall back to alternating paragraphs
    const alternating = detectAlternatingParagraphs(input);
    if (alternating.length < 2) {
      throw new Error(
        "Could not parse the input. Please provide a conversation with at least two turns."
      );
    }

    return { turns: alternating, platform: "other" };
  },
};
