import { pruefeKontraste } from "./farben";
import type { Farben } from "./lead";

const paletten: { name: string; farben: Farben }[] = [
  {
    name: "Garten (Dunkelgrün)",
    farben: {
      dunkel: "#1a2e1a",
      hell: "#f7f5f0",
      akzent: "#4a7c3f",
    },
  },
  {
    name: "Bau (Anthrazit / Orange)",
    farben: {
      dunkel: "#1c1c1c",
      hell: "#ffffff",
      akzent: "#c45c26",
    },
  },
  {
    name: "Technik (Marine / Cyan)",
    farben: {
      dunkel: "#0f172a",
      hell: "#f1f5f9",
      akzent: "#0e7490",
    },
  },
];

let fehler = 0;

for (const palette of paletten) {
  const ergebnis = pruefeKontraste(palette.farben);
  if (ergebnis.ok) {
    console.log(`OK  ${palette.name}`);
  } else {
    fehler += 1;
    console.error(`FEHLER  ${palette.name}`);
    for (const meldung of ergebnis.meldungen) {
      console.error(`  - ${meldung}`);
    }
  }
}

if (fehler > 0) {
  console.error(`\n${fehler} Palette(n) unter 4,5:1 Kontrast.`);
  process.exit(1);
}

console.log("\nAlle Textpaare erreichen mindestens 4,5:1.");
