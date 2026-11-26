import type { ComponentType } from "react";
import type { Familie, Vorschau } from "@/lib/lead";
import { AutoTemplate } from "@/templates/auto";
import { BauTemplate } from "@/templates/bau";
import { BeratungTemplate } from "@/templates/beratung";
import { BetreuungTemplate } from "@/templates/betreuung";
import { ErlebnisTemplate } from "@/templates/erlebnis";
import { GartenTemplate } from "@/templates/garten";
import { HausdiensteTemplate } from "@/templates/hausdienste";
import { TechnikTemplate } from "@/templates/technik";

export type TemplateKomponente = ComponentType<{
  data: Vorschau;
  vorschauHinweis?: boolean;
}>;

export const templates: Record<Familie, TemplateKomponente> = {
  garten: GartenTemplate,
  bau: BauTemplate,
  technik: TechnikTemplate,
  hausdienste: HausdiensteTemplate,
  betreuung: BetreuungTemplate,
  beratung: BeratungTemplate,
  auto: AutoTemplate,
  erlebnis: ErlebnisTemplate,
};

export function getTemplate(familie: Familie): TemplateKomponente {
  return templates[familie];
}
