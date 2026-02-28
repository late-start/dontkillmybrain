import { parseInput } from "../src/lib/parsers";
async function main() {
  const transcript = await parseInput("https://claude.ai/share/677bd915-fafe-4ef1-825a-937c7d6e2ac5");
  const fs = await import("fs");
  fs.writeFileSync("/Users/kalyandudala/dontkillmybrain/test-real-conv.json", JSON.stringify(transcript, null, 2));
  console.log(`Scraped ${transcript.turns.length} turns (${transcript.turns.filter(t => t.role === "human").length} human)`);
}
main().catch(console.error);
