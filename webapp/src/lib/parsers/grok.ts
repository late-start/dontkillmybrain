import { Transcript } from "@/lib/engine/types";
import { Parser } from "@/lib/parsers/types";
import { scrapeConversationPage } from "@/lib/scraper";

const GROK_URL_PATTERN = /^https?:\/\/(www\.)?(grok\.com|grok\.x\.ai)\/share\//;

export const grokParser: Parser = {
  canParse(input: string): boolean {
    return GROK_URL_PATTERN.test(input.trim());
  },

  async parse(input: string): Promise<Transcript> {
    const url = input.trim();

    const scraped = await scrapeConversationPage(url, "grok");

    if (scraped.turns.length < 2) {
      throw new Error(
        "Could not extract conversation turns from the Grok share page. " +
          "Try copying and pasting the conversation text directly."
      );
    }

    return {
      turns: scraped.turns.map((t, i) => ({ ...t, index: i })),
      platform: "grok",
      url,
    };
  },
};
