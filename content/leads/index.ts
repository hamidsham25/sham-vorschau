import type { Lead } from "@/lib/lead";
import gartenwerkHannover from "./gartenwerk-hannover";

/**
 * Echte Vorschau-Leads für /[slug].
 * Demo-Inhalte gehören nicht hierher, sondern nach content/demos.ts (/demo/[familie]).
 */
export const leads: Record<string, Lead> = {
  [gartenwerkHannover.slug]: gartenwerkHannover,
};
