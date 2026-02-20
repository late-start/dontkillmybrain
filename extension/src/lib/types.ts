export type Signal =
  | "steering"
  | "friction"
  | "contribution"
  | "evaluation"
  | "passive_acceptance"
  | "delegation";

export type EngagementLevel = "engaged" | "coasting" | "passive";

export interface Turn {
  role: "human" | "ai";
  content: string;
  index: number;
  timestamp?: number;
}

export interface SessionData {
  id: string;
  platform: string;
  url: string;
  turns: Turn[];
  startTime: number;
  lastActivity: number;
  engagementLevel: EngagementLevel;
  analyzed: boolean;
}

export interface AnalysisResult {
  sessionTitle: string;
  humanTurnCount: number;
  turnSignals: Array<{
    turnIndex: number;
    signal: Signal;
    confidence: number;
    rationale: string;
  }>;
  narrative: string;
  highlights: Array<{
    turnIndex: number;
    annotation: string;
    humanMessage: string;
  }>;
  nudge: string;
  platform: string;
}

export interface ExtensionSettings {
  apiKey: string | null;
  webAppUrl: string;
  autoSave: boolean;
  accountToken: string | null;
  onboardingComplete: boolean;
}

// Messages between content scripts and background
export type MessageType =
  | { type: "NEW_TURN"; turn: Turn; platform: string; url: string }
  | { type: "SESSION_END"; platform: string; url: string }
  | { type: "GET_SESSION"; platform: string }
  | { type: "GET_ENGAGEMENT" }
  | { type: "ANALYZE_SESSION"; sessionId: string }
  | { type: "GET_SETTINGS" }
  | { type: "SAVE_SETTINGS"; settings: Partial<ExtensionSettings> };
