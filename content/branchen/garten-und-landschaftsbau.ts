import type { Branche } from "@/lib/lead";

const gartenUndLandschaftsbau = {
  name: "garten-und-landschaftsbau",
  familie: "garten",
  claim: "Gärten, die mitwachsen und bleiben.",
  intro:
    "Von der ersten Skizze bis zur fertigen Pflanzung gestalten wir Außenanlagen, die zu Ihrem Grundstück und Ihrem Alltag passen. Wir arbeiten mit regionalen Pflanzen, klaren Linien und Materialien, die Wind und Wetter standhalten.",
  leistungen: [
    {
      titel: "Gartenneuanlage",
      text: "Wir planen und bauen Ihren Garten von Grund auf: Wege, Beete, Rasenflächen und Sitzplätze. Dabei achten wir auf Boden, Sonne und den Pflegeaufwand, den Sie wirklich leisten möchten.",
      bild: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200",
    },
    {
      titel: "Pflaster- und Wegebau",
      text: "Terrassen, Einfahrten und Gartenwege aus Naturstein oder Betonpflaster. Sauber verlegt, gut entwässert und so angelegt, dass Sie sie jahrelang nutzen können.",
      bild: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    },
    {
      titel: "Pflanzungen und Beete",
      text: "Stauden, Gehölze und Hecken, die zur Lage Ihres Grundstücks passen. Wir setzen auf Arten, die Insekten fördern und über die Jahre schöner werden, statt nur im ersten Sommer zu blühen.",
      bild: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
    },
    {
      titel: "Pflege und Saisonschnitt",
      text: "Regelmäßige Pflege hält Ihren Garten in Form: Rasenschnitt, Heckenschnitt, Unkrautkontrolle und die Vorbereitung auf Frühjahr und Winter.",
      bild: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=1200",
    },
  ],
  ablauf: [
    {
      titel: "Gespräch vor Ort",
      text: "Wir schauen uns Ihr Grundstück an, hören Ihre Wünsche und klären, was machbar und sinnvoll ist.",
    },
    {
      titel: "Angebot und Planung",
      text: "Sie erhalten ein klares Angebot mit Leistungen, Materialien und Zeitplan. Bei Bedarf skizzieren wir die Anlage vorab.",
    },
    {
      titel: "Umsetzung",
      text: "Unser Team setzt die Arbeiten vor Ort um. Wir halten Sie über den Fortschritt auf dem Laufenden und räumen am Ende ordentlich auf.",
    },
    {
      titel: "Übergabe und Pflegehinweise",
      text: "Zum Abschluss gehen wir die Anlage mit Ihnen durch und erklären, was Sie selbst tun können und wo wir gerne weiterhelfen.",
    },
  ],
  faq: [
    {
      frage: "Wie lange dauert eine typische Gartenneuanlage?",
      antwort:
        "Kleine Umgestaltungen sind oft in wenigen Tagen erledigt. Eine komplette Neuanlage mit Pflaster und Pflanzung braucht je nach Größe ein bis drei Wochen. Den genauen Zeitraum nennen wir Ihnen im Angebot.",
    },
    {
      frage: "Arbeiten Sie auch in Bestandsanlagen?",
      antwort:
        "Ja. Viele Aufträge betreffen die Erneuerung von Beeten, den Austausch von Platten oder die Neupflanzung vorhandener Flächen. Wir bauen auf dem auf, was schon da ist, soweit es sinnvoll ist.",
    },
    {
      frage: "Übernehmen Sie die Pflege nach der Fertigstellung?",
      antwort:
        "Auf Wunsch übernehmen wir die regelmäßige Pflege oder kommen zu Saisonterminen für Schnitt und Kontrolle. Das vereinbaren wir flexibel nach Ihrem Bedarf.",
    },
    {
      frage: "In welchem Umkreis sind Sie unterwegs?",
      antwort:
        "Wir sind schwerpunktmäßig in und um Hannover tätig. Ob Ihr Ort dazugehört, klären wir kurz per Telefon oder Nachricht.",
    },
  ],
  bilder: {
    hero: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600",
    galerie: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=1200",
      "https://images.unsplash.com/photo-1466692476866-aef1dfb1e735?w=1200",
    ],
  },
  farben: {
    dunkel: "#1a2e1a",
    hell: "#f7f5f0",
    akzent: "#4a7c3f",
  },
} satisfies Branche;

export default gartenUndLandschaftsbau;
