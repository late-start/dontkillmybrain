import { readFileSync, existsSync } from "fs";
import { join } from "path";

function readPrompt(filename: string): string {
  // Try ../prompts (local dev: cwd is webapp/, prompts/ is sibling)
  const localPath = join(process.cwd(), "..", "prompts", filename);
  if (existsSync(localPath)) {
    return readFileSync(localPath, "utf-8");
  }

  // Try /prompts (Docker: prompts copied to /prompts)
  const dockerPath = join("/prompts", filename);
  if (existsSync(dockerPath)) {
    return readFileSync(dockerPath, "utf-8");
  }

  throw new Error(`Prompt file not found: ${filename}`);
}

export const CLASSIFIER_PROMPT = readPrompt("classifier.md");
export const NARRATOR_PROMPT = readPrompt("narrator.md");
