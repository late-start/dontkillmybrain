import { Transcript } from "@/lib/engine/types";

export interface Parser {
  canParse(input: string): boolean;
  parse(input: string): Promise<Transcript>;
}
