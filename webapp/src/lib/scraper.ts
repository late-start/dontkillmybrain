import puppeteer from "puppeteer";

export interface ScrapedConversation {
  turns: { role: "human" | "ai"; content: string }[];
  title?: string;
}

/**
 * Launches a headless browser, navigates to the URL, waits for conversation
 * content to render, and extracts the turns from the DOM.
 */
export async function scrapeConversationPage(
  url: string,
  platform: "claude" | "chatgpt" | "gemini" | "grok"
): Promise<ScrapedConversation> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });

    // Wait for conversation content
    const waitSelector =
      platform === "claude"
        ? '[data-testid="user-message"]'
        : platform === "chatgpt"
          ? "[data-message-author-role]"
          : platform === "grok"
            ? '[class*="message"]'
            : "response-container";

    try {
      await page.waitForSelector(waitSelector, { timeout: 10000 });
    } catch {
      // Fallback: wait a bit and hope it loaded
    }
    // Extra time for full conversation to render
    await new Promise((r) => setTimeout(r, 2000));

    const extractFn =
      platform === "claude"
        ? extractClaude
        : platform === "chatgpt"
          ? extractChatGPT
          : platform === "grok"
            ? extractGrok
            : extractGemini;

    const result = await page.evaluate(extractFn);
    result.title = result.title || (await page.title()) || undefined;

    return result;
  } finally {
    await browser.close();
  }
}

// --- Extraction functions run inside page.evaluate ---

function extractClaude(): ScrapedConversation {
  const conv: ScrapedConversation = {
    turns: [],
    title: document.title?.replace(/ \| Claude$/, "") || undefined,
  };

  // Claude share pages use:
  //   [data-testid="user-message"] for human turns
  //   [data-is-streaming] for AI turns
  // Both are children (at varying depths) of a common container.
  // We need to interleave them in document order.

  const userEls = document.querySelectorAll('[data-testid="user-message"]');
  const aiEls = document.querySelectorAll("[data-is-streaming]");

  if (userEls.length === 0 && aiEls.length === 0) {
    return conv;
  }

  // Collect all with their DOM position for ordering
  const all: { el: Element; role: "human" | "ai" }[] = [];
  userEls.forEach((el) => all.push({ el, role: "human" }));
  aiEls.forEach((el) => all.push({ el, role: "ai" }));

  // Sort by document order
  all.sort((a, b) => {
    const pos = a.el.compareDocumentPosition(b.el);
    return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });

  for (const item of all) {
    const text = item.el.textContent?.trim();
    if (text) {
      conv.turns.push({ role: item.role, content: text });
    }
  }

  return conv;
}

function extractChatGPT(): ScrapedConversation {
  const conv: ScrapedConversation = {
    turns: [],
    title: document.title || undefined,
  };

  // Strategy 1: data-message-author-role
  const messages = document.querySelectorAll("[data-message-author-role]");
  if (messages.length >= 2) {
    messages.forEach((el) => {
      const role = el.getAttribute("data-message-author-role");
      const text = el.textContent?.trim();
      if (text && (role === "user" || role === "assistant")) {
        conv.turns.push({
          role: role === "user" ? "human" : "ai",
          content: text,
        });
      }
    });
    if (conv.turns.length >= 2) return conv;
  }

  // Strategy 2: conversation-turn elements
  const turnEls = document.querySelectorAll(
    '[data-testid^="conversation-turn"]'
  );
  if (turnEls.length >= 2) {
    conv.turns = [];
    let currentRole: "human" | "ai" = "human";
    turnEls.forEach((el) => {
      const text = el.textContent?.trim();
      if (text) {
        conv.turns.push({ role: currentRole, content: text });
        currentRole = currentRole === "human" ? "ai" : "human";
      }
    });
  }

  return conv;
}

function extractGemini(): ScrapedConversation {
  const conv: ScrapedConversation = {
    turns: [],
    title: document.title || undefined,
  };

  // Strategy 1: Gemini uses custom HTML elements for turns
  const queries = document.querySelectorAll("user-query-content");
  const responses = document.querySelectorAll("response-container");

  if (queries.length > 0 || responses.length > 0) {
    const len = Math.max(queries.length, responses.length);
    for (let i = 0; i < len; i++) {
      if (i < queries.length) {
        const text = queries[i].textContent?.replace(/^You said\s*/, "").trim();
        if (text) conv.turns.push({ role: "human", content: text });
      }
      if (i < responses.length) {
        const text = responses[i].textContent?.trim();
        if (text) conv.turns.push({ role: "ai", content: text });
      }
    }
    if (conv.turns.length >= 2) return conv;
  }

  // Strategy 2: Fallback to class-based matching with deduplication
  conv.turns = [];
  const queryEls = document.querySelectorAll(".query-text");
  const responseEls = document.querySelectorAll("model-response");
  const len2 = Math.max(queryEls.length, responseEls.length);
  for (let i = 0; i < len2; i++) {
    if (i < queryEls.length) {
      const text = queryEls[i].textContent?.trim();
      if (text) conv.turns.push({ role: "human", content: text });
    }
    if (i < responseEls.length) {
      const text = responseEls[i].textContent?.trim();
      if (text) conv.turns.push({ role: "ai", content: text });
    }
  }

  return conv;
}

function extractGrok(): ScrapedConversation {
  const conv: ScrapedConversation = {
    turns: [],
    title: document.title || undefined,
  };

  // Strategy 1: Look for message containers with role indicators
  const allMessages = document.querySelectorAll(
    '[class*="message"], [class*="turn"], [class*="chat"]'
  );

  if (allMessages.length >= 2) {
    allMessages.forEach((el) => {
      const text = el.textContent?.trim();
      if (!text) return;
      const classes = el.className || "";
      const isHuman =
        classes.includes("user") ||
        classes.includes("human") ||
        classes.includes("request");
      const isAi =
        classes.includes("assistant") ||
        classes.includes("bot") ||
        classes.includes("response") ||
        classes.includes("grok");
      if (isHuman) {
        conv.turns.push({ role: "human", content: text });
      } else if (isAi) {
        conv.turns.push({ role: "ai", content: text });
      }
    });
    if (conv.turns.length >= 2) return conv;
  }

  // Strategy 2: Alternating block extraction
  conv.turns = [];
  const blocks = document.querySelectorAll(
    'div[class*="message"], div[class*="content"], article'
  );
  let currentRole: "human" | "ai" = "human";
  blocks.forEach((el) => {
    const text = el.textContent?.trim();
    if (text && text.length > 5) {
      conv.turns.push({ role: currentRole, content: text });
      currentRole = currentRole === "human" ? "ai" : "human";
    }
  });

  return conv;
}
