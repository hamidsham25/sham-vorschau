import { branchen } from "@/content/branchen";
import { leads } from "@/content/leads";

export type Familie =
  | "garten"
  | "bau"
  | "technik"
  | "hausdienste"
  | "betreuung"
  | "beratung"
  | "auto"
  | "erlebnis";

export const FAMILIEN: Familie[] = [
  "garten",
  "bau",
  "technik",
  "hausdienste",
  "betreuung",
  "beratung",
  "auto",
  "erlebnis",
];

export type Leistung = {
  titel: string;
  text: string;
  bild?: string;
};

export type AblaufSchritt = {
  titel: string;
  text: string;
};

export type FaqEintrag = {
  frage: string;
  antwort: string;
};

export type Bilder = {
  hero: string;
  galerie: string[];
};

export type Farben = {
  dunkel: string;
  hell: string;
  akzent: string;
};

export type Branche = {
  name: string;
  familie: Familie;
  claim: string;
  intro: string;
  leistungen: Leistung[];
  ablauf: AblaufSchritt[];
  faq: FaqEintrag[];
  bilder: Bilder;
  farben: Farben;
};

export type Lead = {
  slug: string;
  familie: Familie;
  branche: string;
  firma: string;
  inhaber?: string;
  ort: string;
  adresse?: string;
  telefon: string;
  whatsapp?: string;
  email?: string;
  logo?: string;
  einzugsgebiet?: string;
  variante?: string;
  farben?: Partial<Farben>;
  claim?: string;
  intro?: string;
  leistungen?: Leistung[];
  ablauf?: AblaufSchritt[];
  faq?: FaqEintrag[];
  bilder?: Partial<Bilder>;
  abschnitte?: string[];
};

/** Zusammengeführte Vorschau: Lead-Angaben überschreiben Branchen-Defaults. */
export type Vorschau = {
  slug: string;
  familie: Familie;
  branche: string;
  firma: string;
  inhaber?: string;
  ort: string;
  adresse?: string;
  telefon: string;
  whatsapp?: string;
  email?: string;
  logo?: string;
  einzugsgebiet?: string;
  variante?: string;
  farben: Farben;
  claim: string;
  intro: string;
  leistungen: Leistung[];
  ablauf: AblaufSchritt[];
  faq: FaqEintrag[];
  bilder: Bilder;
  abschnitte?: string[];
};

export function getAllLeadSlugs(): string[] {
  return Object.keys(leads);
}

export function getLead(slug: string): Lead {
  const lead = leads[slug];
  if (!lead) {
    throw new Error(`Lead nicht gefunden: ${slug}`);
  }
  return lead;
}

export function getBranche(name: string): Branche {
  const branche = branchen[name];
  if (!branche) {
    throw new Error(`Branche nicht gefunden: ${name}`);
  }
  return branche;
}

export function mergeLead(lead: Lead, branche: Branche): Vorschau {
  return {
    slug: lead.slug,
    familie: lead.familie,
    branche: lead.branche,
    firma: lead.firma,
    inhaber: lead.inhaber,
    ort: lead.ort,
    adresse: lead.adresse,
    telefon: lead.telefon,
    whatsapp: lead.whatsapp,
    email: lead.email,
    logo: lead.logo,
    einzugsgebiet: lead.einzugsgebiet,
    variante: lead.variante,
    farben: {
      dunkel: lead.farben?.dunkel ?? branche.farben.dunkel,
      hell: lead.farben?.hell ?? branche.farben.hell,
      akzent: lead.farben?.akzent ?? branche.farben.akzent,
    },
    claim: lead.claim ?? branche.claim,
    intro: lead.intro ?? branche.intro,
    leistungen: lead.leistungen ?? branche.leistungen,
    ablauf: lead.ablauf ?? branche.ablauf,
    faq: lead.faq ?? branche.faq,
    bilder: {
      hero: lead.bilder?.hero ?? branche.bilder.hero,
      galerie: lead.bilder?.galerie ?? branche.bilder.galerie,
    },
    abschnitte: lead.abschnitte,
  };
}

export function getVorschau(slug: string): Vorschau {
  const lead = getLead(slug);
  const branche = getBranche(lead.branche);
  return mergeLead(lead, branche);
}
