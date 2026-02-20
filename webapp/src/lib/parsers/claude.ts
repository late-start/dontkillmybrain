import { Transcript } from "@/lib/engine/types";
import { Parser } from "@/lib/parsers/types";
import { scrapeConversationPage } from "@/lib/scraper";

const CLAUDE_URL_PATTERN = /^https?:\/\/(www\.)?claude\.ai\/share\//;

export const claudeParser: Parser = {
  canParse(input: string): boolean {
    return CLAUDE_URL_PATTERN.test(input.trim());
  },

  async parse(input: string): Promise<Transcript> {
    const url = input.trim();

    const scraped = await scrapeConversationPage(url, "claude");

    if (scraped.turns.length < 2) {
      throw new Error(
        "Could not extract conversation turns from the Claude share page. " +
          "The page may have changed its structure. " +
          "Try copying and pasting the conversation text directly."
      );
    }

    return {
      turns: scraped.turns.map((t, i) => ({ ...t, index: i })),
      platform: "claude",
      url,
    };
  },
};
