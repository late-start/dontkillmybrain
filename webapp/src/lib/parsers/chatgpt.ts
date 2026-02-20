import { Transcript, Turn } from "@/lib/engine/types";
import { Parser } from "@/lib/parsers/types";
import { scrapeConversationPage } from "@/lib/scraper";

const CHATGPT_URL_PATTERN =
  /^https?:\/\/(www\.)?(chat\.openai\.com|chatgpt\.com)\/share\//;

export const chatgptParser: Parser = {
  canParse(input: string): boolean {
    return CHATGPT_URL_PATTERN.test(input.trim());
  },

  async parse(input: string): Promise<Transcript> {
    const url = input.trim();

    // First try a simple fetch — ChatGPT share pages sometimes have data in HTML
    try {
      const turns = await fetchAndParse(url);
      if (turns.length >= 2) {
        return { turns, platform: "chatgpt", url };
      }
    } catch {
      // Fall through to headless browser
    }

    // Fall back to headless browser scraping
    const scraped = await scrapeConversationPage(url, "chatgpt");

    if (scraped.turns.length < 2) {
      throw new Error(
        "Could not extract conversation turns from the ChatGPT share page. " +
          "Try copying and pasting the conversation text directly."
      );
    }

    return {
      turns: scraped.turns.map((t, i) => ({ ...t, index: i })),
      platform: "chatgpt",
      url,
    };
  },
};

async function fetchAndParse(url: string): Promise<Turn[]> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "text/html",
    },
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const html = await response.text();
  const turns: Turn[] = [];

  // Try __NEXT_DATA__ extraction
  const scriptMatch = html.match(
    /<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/
  );

  if (scriptMatch) {
    try {
      const data = JSON.parse(scriptMatch[1]);
      const messages = findMessages(data);

      if (messages && messages.length >= 2) {
        let index = 0;
        for (const msg of messages) {
          const role = msg.author?.role || msg.role;
          if (role === "system") continue;

          const content = extractContent(msg);
          if (!content) continue;

          turns.push({
            role: role === "assistant" ? "ai" : "human",
            content,
            index: index++,
          });
        }
      }
    } catch {
      // Parse failed
    }
  }

  return turns;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractContent(msg: any): string {
  if (msg.content?.parts) {
    return msg.content.parts
      .filter((p: unknown) => typeof p === "string")
      .join("\n")
      .trim();
  }
  if (msg.content?.text) {
    return typeof msg.content.text === "string"
      ? msg.content.text
      : String(msg.content.text);
  }
  if (typeof msg.content === "string") {
    return msg.content;
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findMessages(obj: any): any[] | null {
  if (!obj || typeof obj !== "object") return null;

  if (Array.isArray(obj)) {
    if (
      obj.length >= 2 &&
      obj[0] &&
      (obj[0].author?.role || obj[0].role) &&
      obj[0].content !== undefined
    ) {
      return obj;
    }
    for (const item of obj) {
      const found = findMessages(item);
      if (found) return found;
    }
    return null;
  }

  // Handle ChatGPT's mapping tree structure
  if ("mapping" in obj && typeof obj.mapping === "object") {
    const messages = Object.values(obj.mapping)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((node: any) => node?.message)
      .filter(Boolean)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort((a: any, b: any) => (a.create_time || 0) - (b.create_time || 0));
    if (messages.length >= 2) return messages;
  }

  for (const key of Object.keys(obj)) {
    const found = findMessages(obj[key]);
    if (found) return found;
  }

  return null;
}
