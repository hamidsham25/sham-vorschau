import type { Branche } from "@/lib/lead";
import gartenUndLandschaftsbau from "./garten-und-landschaftsbau";

export const branchen: Record<string, Branche> = {
  [gartenUndLandschaftsbau.name]: gartenUndLandschaftsbau,
};
