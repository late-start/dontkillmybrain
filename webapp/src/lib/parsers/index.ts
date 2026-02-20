import { Transcript } from "@/lib/engine/types";
import { claudeParser } from "@/lib/parsers/claude";
import { chatgptParser } from "@/lib/parsers/chatgpt";
import { geminiParser } from "@/lib/parsers/gemini";
import { grokParser } from "@/lib/parsers/grok";
import { rawTextParser } from "@/lib/parsers/raw-text";
import { Parser } from "@/lib/parsers/types";

const parsers: Parser[] = [claudeParser, chatgptParser, geminiParser, grokParser, rawTextParser];

export async function parseInput(input: string): Promise<Transcript> {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error("No input provided. Please paste a conversation or share URL.");
  }

  for (const parser of parsers) {
    if (parser.canParse(trimmed)) {
      return parser.parse(trimmed);
    }
  }

  // Should never reach here since rawTextParser.canParse always returns true
  return rawTextParser.parse(trimmed);
}
