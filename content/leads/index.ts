import type { Lead } from "@/lib/lead";
import demoGarten from "./demo-garten";

export const leads: Record<string, Lead> = {
  [demoGarten.slug]: demoGarten,
};
