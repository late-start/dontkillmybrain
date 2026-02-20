import { Transcript } from "@/lib/engine/types";
import { Parser } from "@/lib/parsers/types";
import { scrapeConversationPage } from "@/lib/scraper";

const GEMINI_URL_PATTERN =
  /^https?:\/\/(www\.)?(gemini\.google\.com\/share\/|g\.co\/gemini\/share\/)/;

export const geminiParser: Parser = {
  canParse(input: string): boolean {
    return GEMINI_URL_PATTERN.test(input.trim());
  },

  async parse(input: string): Promise<Transcript> {
    const url = input.trim();

    const scraped = await scrapeConversationPage(url, "gemini");

    if (scraped.turns.length < 2) {
      throw new Error(
        "Could not extract conversation turns from the Gemini share page. " +
          "Try copying and pasting the conversation text directly."
      );
    }

    return {
      turns: scraped.turns.map((t, i) => ({ ...t, index: i })),
      platform: "gemini",
      url,
    };
  },
};
