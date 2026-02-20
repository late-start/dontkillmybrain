export type Signal =
  | "steering"
  | "friction"
  | "contribution"
  | "evaluation"
  | "passive_acceptance"
  | "delegation"
  | "capitulation"
  | "unknown";

export interface Turn {
  role: "human" | "ai";
  content: string;
  index: number;
}

export interface Transcript {
  turns: Turn[];
  platform: string;
  url?: string;
}

export interface TurnClassification {
  turnIndex: number;
  signal: Signal;
  confidence: number;
  rationale: string;
}

export interface HighlightedMoment {
  turnIndex: number;
  annotation: string;
  humanMessage: string;
}

export interface AnalysisResult {
  sessionTitle: string;
  humanTurnCount: number;
  turnSignals: TurnClassification[];
  introNarrative: string;
  narrative: string;
  highlights: HighlightedMoment[];
  nudge: string;
  platform: string;
  turns: Turn[];
}
