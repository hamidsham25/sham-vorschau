import type { Lead } from "@/lib/lead";

/**
 * Beispiel-Lead für die Garten-Demo unter /demo/garten.
 * Nicht in content/leads/index.ts registrieren (kein /[slug]).
 */
const demoGarten = {
  slug: "demo-garten",
  familie: "garten",
  branche: "garten-und-landschaftsbau",
  firma: "Gartenwerk Hannover",
  inhaber: "Thomas Berger",
  ort: "Hannover",
  adresse: "Beispielweg 12, 30159 Hannover",
  telefon: "0511 1234567",
  whatsapp: "0511 1234567",
  email: "info@gartenwerk-hannover.example",
  einzugsgebiet: "Hannover und Umland",
  variante: "klar",
} satisfies Lead;

export default demoGarten;
