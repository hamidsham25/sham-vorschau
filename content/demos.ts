import type { Familie, Vorschau } from "@/lib/lead";

function demoFuer(
  familie: Familie,
  firma: string,
  claim: string,
  intro: string,
  leistungTitel: string,
  leistungText: string,
  farben: Vorschau["farben"],
): Vorschau {
  return {
    slug: `demo-${familie}`,
    familie,
    branche: `demo-${familie}`,
    firma,
    ort: "Hannover",
    telefon: "0511 0000000",
    farben,
    claim,
    intro,
    leistungen: [
      {
        titel: leistungTitel,
        text: leistungText,
      },
    ],
    ablauf: [
      {
        titel: "Erstgespräch",
        text: "Wir besprechen Ihr Anliegen und die nächsten Schritte.",
      },
      {
        titel: "Umsetzung",
        text: "Wir setzen die vereinbarten Leistungen zuverlässig um.",
      },
    ],
    faq: [
      {
        frage: "Wie erreiche ich Sie?",
        antwort:
          "Am einfachsten telefonisch oder über das Kontaktformular auf dieser Seite.",
      },
    ],
    bilder: {
      hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600",
      galerie: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
      ],
    },
  };
}

/** Neutrale Demo-Inhalte pro Familie für /demo/[familie] */
export const demoVorschaue: Record<Familie, Vorschau> = {
  garten: demoFuer(
    "garten",
    "Demo Garten",
    "Grünflächen mit Substanz.",
    "Beispielseite für die Template-Familie Garten: Gärten, Außenanlagen und Pflege.",
    "Gartengestaltung",
    "Planung und Umsetzung von Gartenanlagen für private und gewerbliche Grundstücke.",
    { dunkel: "#1a2e1a", hell: "#f7f5f0", akzent: "#4a7c3f" },
  ),
  bau: demoFuer(
    "bau",
    "Demo Bau",
    "Bauen, das hält.",
    "Beispielseite für die Template-Familie Bau: Sanierung, Ausbau und Rohbau.",
    "Sanierung",
    "Fachgerechte Sanierung und Modernisierung von Wohn- und Gewerberäumen.",
    { dunkel: "#1c1c1c", hell: "#ffffff", akzent: "#c45c26" },
  ),
  technik: demoFuer(
    "technik",
    "Demo Technik",
    "Technik, die sitzt.",
    "Beispielseite für die Template-Familie Technik: Installation, Wartung und Service.",
    "Installation",
    "Planung und Einbau technischer Anlagen mit klarem Service danach.",
    { dunkel: "#0f172a", hell: "#f1f5f9", akzent: "#0e7490" },
  ),
  hausdienste: demoFuer(
    "hausdienste",
    "Demo Hausdienste",
    "Haus und Hof im Griff.",
    "Beispielseite für die Template-Familie Hausdienste: Reinigung, Hilfe und Alltagsservice.",
    "Hausreinigung",
    "Zuverlässige Reinigung und Betreuung von Wohnungen und Häusern.",
    { dunkel: "#1e293b", hell: "#f8fafc", akzent: "#2563eb" },
  ),
  betreuung: demoFuer(
    "betreuung",
    "Demo Betreuung",
    "Nähe, die spürbar ist.",
    "Beispielseite für die Template-Familie Betreuung: Pflege, Begleitung und Alltagsunterstützung.",
    "Alltagsbegleitung",
    "Persönliche Unterstützung im Alltag, verlässlich und auf Augenhöhe.",
    { dunkel: "#3b2f2f", hell: "#faf7f5", akzent: "#b45309" },
  ),
  beratung: demoFuer(
    "beratung",
    "Demo Beratung",
    "Klarheit für Ihre Entscheidung.",
    "Beispielseite für die Template-Familie Beratung: Coaching, Beratung und Begleitung.",
    "Erstberatung",
    "Strukturierte Beratung zu Ihrem Anliegen mit konkreten nächsten Schritten.",
    { dunkel: "#1e1b4b", hell: "#f5f3ff", akzent: "#4f46e5" },
  ),
  auto: demoFuer(
    "auto",
    "Demo Auto",
    "Alles rund ums Fahrzeug.",
    "Beispielseite für die Template-Familie Auto: Werkstatt, Pflege und Service.",
    "Inspektion",
    "Wartung und Prüfung Ihres Fahrzeugs nach Herstellerangaben.",
    { dunkel: "#111827", hell: "#f9fafb", akzent: "#dc2626" },
  ),
  erlebnis: demoFuer(
    "erlebnis",
    "Demo Erlebnis",
    "Momente, die bleiben.",
    "Beispielseite für die Template-Familie Erlebnis: Events, Freizeit und Gastlichkeit.",
    "Veranstaltungen",
    "Organisation und Durchführung von Events für private und geschäftliche Anlässe.",
    { dunkel: "#292524", hell: "#fafaf9", akzent: "#ca8a04" },
  ),
};

export function getDemoVorschau(familie: Familie): Vorschau {
  return demoVorschaue[familie];
}
