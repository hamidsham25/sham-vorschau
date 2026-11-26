import type { Farben } from "@/lib/lead";
import type { CSSProperties } from "react";

export type AbgeleiteteFarben = {
  dunkel: string;
  hell: string;
  akzent: string;
  aufAkzent: string;
  akzentText: string;
  akzentHover: string;
  flaeche: string;
  flaecheAlt: string;
  linie: string;
  nebentext: string;
  text: string;
  textAufDunkel: string;
};

type Rgb = { r: number; g: number; b: number };

function hexZuRgb(hex: string): Rgb {
  const normalisiert = hex.replace("#", "").trim();
  const voll =
    normalisiert.length === 3
      ? normalisiert
          .split("")
          .map((z) => z + z)
          .join("")
      : normalisiert;

  if (!/^[0-9a-fA-F]{6}$/.test(voll)) {
    throw new Error(`Ungültige Hex-Farbe: ${hex}`);
  }

  return {
    r: parseInt(voll.slice(0, 2), 16),
    g: parseInt(voll.slice(2, 4), 16),
    b: parseInt(voll.slice(4, 6), 16),
  };
}

function rgbZuHex({ r, g, b }: Rgb): string {
  const kanal = (wert: number) =>
    Math.round(Math.min(255, Math.max(0, wert)))
      .toString(16)
      .padStart(2, "0");
  return `#${kanal(r)}${kanal(g)}${kanal(b)}`;
}

/** Relative Luminanz nach WCAG 2.1 */
export function relativeLuminanz(hex: string): number {
  const { r, g, b } = hexZuRgb(hex);
  const kanal = (wert: number) => {
    const s = wert / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * kanal(r) + 0.7152 * kanal(g) + 0.0722 * kanal(b);
}

/** Kontrastverhältnis nach WCAG 2.1 (größerer Wert zuerst) */
export function kontrastVerhaeltnis(a: string, b: string): number {
  const l1 = relativeLuminanz(a);
  const l2 = relativeLuminanz(b);
  const hell = Math.max(l1, l2);
  const dunkel = Math.min(l1, l2);
  return (hell + 0.05) / (dunkel + 0.05);
}

function mischen(a: string, b: string, anteilB: number): string {
  const rgbA = hexZuRgb(a);
  const rgbB = hexZuRgb(b);
  const t = Math.min(1, Math.max(0, anteilB));
  return rgbZuHex({
    r: rgbA.r + (rgbB.r - rgbA.r) * t,
    g: rgbA.g + (rgbB.g - rgbA.g) * t,
    b: rgbA.b + (rgbB.b - rgbA.b) * t,
  });
}

function aufhellen(hex: string, anteil: number): string {
  return mischen(hex, "#ffffff", anteil);
}

function abdunkeln(hex: string, anteil: number): string {
  return mischen(hex, "#000000", anteil);
}

/**
 * Wählt Schwarz oder Weiß (bzw. hell/dunkel der Palette), sodass
 * der Kontrast zum Hintergrund mindestens `minimum` beträgt.
 */
function lesbareTextfarbe(
  hintergrund: string,
  kandidaten: string[],
  minimum = 4.5,
): string {
  let beste = kandidaten[0];
  let bestesVerhaeltnis = 0;

  for (const kandidat of kandidaten) {
    const verhaeltnis = kontrastVerhaeltnis(hintergrund, kandidat);
    if (verhaeltnis >= minimum) {
      return kandidat;
    }
    if (verhaeltnis > bestesVerhaeltnis) {
      bestesVerhaeltnis = verhaeltnis;
      beste = kandidat;
    }
  }

  // Fallback: reines Schwarz oder Weiß, je nachdem was besser kontrastiert
  const schwarz = kontrastVerhaeltnis(hintergrund, "#000000");
  const weiss = kontrastVerhaeltnis(hintergrund, "#ffffff");
  return weiss >= schwarz ? "#ffffff" : "#000000";
}

/**
 * Passt eine Farbe schrittweise an, bis sie auf dem Hintergrund
 * mindestens `minimum` Kontrast erreicht (für Akzent als Textfarbe).
 */
function anpassenFuerKontrast(
  farbe: string,
  hintergrund: string,
  minimum = 4.5,
): string {
  if (kontrastVerhaeltnis(farbe, hintergrund) >= minimum) {
    return farbe;
  }

  const hintergrundHell = relativeLuminanz(hintergrund) > 0.5;
  let aktuell = farbe;

  for (let i = 0; i < 24; i++) {
    aktuell = hintergrundHell
      ? abdunkeln(aktuell, 0.08)
      : aufhellen(aktuell, 0.08);
    if (kontrastVerhaeltnis(aktuell, hintergrund) >= minimum) {
      return aktuell;
    }
  }

  return lesbareTextfarbe(hintergrund, ["#000000", "#ffffff"], minimum);
}

export function farbenAbleiten(basis: Farben): AbgeleiteteFarben {
  const { dunkel, hell, akzent } = basis;

  const aufAkzent = lesbareTextfarbe(akzent, [hell, dunkel, "#ffffff", "#000000"]);
  const text = lesbareTextfarbe(hell, [dunkel, "#000000"]);
  const textAufDunkel = lesbareTextfarbe(dunkel, [hell, "#ffffff"]);

  const akzentHover =
    relativeLuminanz(akzent) > 0.45
      ? abdunkeln(akzent, 0.12)
      : aufhellen(akzent, 0.12);

  const akzentText = anpassenFuerKontrast(akzent, hell);

  const flaeche = mischen(hell, dunkel, 0.04);
  const flaecheAlt = mischen(hell, dunkel, 0.08);
  const linie = mischen(hell, dunkel, 0.18);

  // Nebentext: abgedunkeltes bzw. aufgehelltes Mittel, dann Kontrast erzwingen
  const nebentextRoh = mischen(dunkel, hell, 0.35);
  const nebentext = anpassenFuerKontrast(nebentextRoh, hell);

  return {
    dunkel,
    hell,
    akzent,
    aufAkzent,
    akzentText,
    akzentHover,
    flaeche,
    flaecheAlt,
    linie,
    nebentext,
    text,
    textAufDunkel,
  };
}

/** CSS-Variablen für das Root-Layout der Vorschau */
export function farbenAlsCssVars(basis: Farben): CSSProperties {
  const f = farbenAbleiten(basis);
  return {
    "--farbe-dunkel": f.dunkel,
    "--farbe-hell": f.hell,
    "--farbe-akzent": f.akzent,
    "--farbe-auf-akzent": f.aufAkzent,
    "--farbe-akzent-text": f.akzentText,
    "--farbe-akzent-hover": f.akzentHover,
    "--farbe-flaeche": f.flaeche,
    "--farbe-flaeche-alt": f.flaecheAlt,
    "--farbe-linie": f.linie,
    "--farbe-nebentext": f.nebentext,
    "--farbe-text": f.text,
    "--farbe-text-auf-dunkel": f.textAufDunkel,
  } as CSSProperties;
}

export type KontrastPaar = {
  name: string;
  vordergrund: string;
  hintergrund: string;
};

export function textPaare(f: AbgeleiteteFarben): KontrastPaar[] {
  return [
    { name: "text auf hell", vordergrund: f.text, hintergrund: f.hell },
    {
      name: "text auf dunkel",
      vordergrund: f.textAufDunkel,
      hintergrund: f.dunkel,
    },
    {
      name: "aufAkzent auf akzent",
      vordergrund: f.aufAkzent,
      hintergrund: f.akzent,
    },
    {
      name: "akzentText auf hell",
      vordergrund: f.akzentText,
      hintergrund: f.hell,
    },
    {
      name: "nebentext auf hell",
      vordergrund: f.nebentext,
      hintergrund: f.hell,
    },
    {
      name: "text auf flaeche",
      vordergrund: f.text,
      hintergrund: f.flaeche,
    },
  ];
}

export function pruefeKontraste(
  basis: Farben,
  minimum = 4.5,
): { ok: boolean; meldungen: string[] } {
  const f = farbenAbleiten(basis);
  const meldungen: string[] = [];

  for (const paar of textPaare(f)) {
    const verhaeltnis = kontrastVerhaeltnis(paar.vordergrund, paar.hintergrund);
    if (verhaeltnis < minimum) {
      meldungen.push(
        `${paar.name}: ${verhaeltnis.toFixed(2)}:1 (mindestens ${minimum}:1)`,
      );
    }
  }

  return { ok: meldungen.length === 0, meldungen };
}
