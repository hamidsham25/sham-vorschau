/**
 * Erzeugt aus einem Lead ein eigenständiges Next.js-Kundenprojekt
 * neben dem Ordner sham-vorschau: <slug>-website
 *
 * Aufruf: npm run ausgliedern -- <slug>
 */

import { execSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getVorschau, type Familie, type Vorschau } from "../lib/lead";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const parent = path.resolve(root, "..");

const slug = process.argv[2];

if (!slug) {
  console.error("Bitte einen Slug angeben: npm run ausgliedern -- <slug>");
  process.exit(1);
}

let vorschau: Vorschau;
try {
  vorschau = getVorschau(slug);
} catch (fehler) {
  console.error(fehler instanceof Error ? fehler.message : fehler);
  process.exit(1);
}

const ziel = path.join(parent, `${slug}-website`);
const familie = vorschau.familie;

if (existsSync(ziel)) {
  console.error(`Zielordner existiert bereits: ${ziel}`);
  process.exit(1);
}

mkdirSync(ziel, { recursive: true });

function schreiben(relPfad: string, inhalt: string) {
  const voll = path.join(ziel, relPfad);
  mkdirSync(path.dirname(voll), { recursive: true });
  writeFileSync(voll, inhalt, "utf8");
}

function kopiereDatei(vonRel: string, nachRel = vonRel) {
  const von = path.join(root, vonRel);
  const nach = path.join(ziel, nachRel);
  mkdirSync(path.dirname(nach), { recursive: true });
  cpSync(von, nach);
}

function alsTsObjekt(wert: unknown, einzug = 0): string {
  const pad = "  ".repeat(einzug);
  const padInnen = "  ".repeat(einzug + 1);

  if (wert === null || wert === undefined) {
    return "undefined";
  }
  if (typeof wert === "string") {
    return JSON.stringify(wert);
  }
  if (typeof wert === "number" || typeof wert === "boolean") {
    return String(wert);
  }
  if (Array.isArray(wert)) {
    if (wert.length === 0) return "[]";
    const zeilen = wert.map((eintrag) => `${padInnen}${alsTsObjekt(eintrag, einzug + 1)},`);
    return `[\n${zeilen.join("\n")}\n${pad}]`;
  }
  if (typeof wert === "object") {
    const eintraege = Object.entries(wert as Record<string, unknown>).filter(
      ([, v]) => v !== undefined,
    );
    if (eintraege.length === 0) return "{}";
    const zeilen = eintraege.map(
      ([k, v]) => `${padInnen}${k}: ${alsTsObjekt(v, einzug + 1)},`,
    );
    return `{\n${zeilen.join("\n")}\n${pad}}`;
  }
  return "undefined";
}

const packageJson: {
  name: string;
  version: string;
  private: boolean;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
} = {
  name: `${slug}-website`,
  version: "0.1.0",
  private: true,
  scripts: {
    dev: "next dev",
    build: "next build",
    start: "next start",
    lint: "eslint",
  },
  dependencies: {
    motion: "^12.23.24",
    next: "16.0.3",
    react: "19.2.0",
    "react-dom": "19.2.0",
  },
  devDependencies: {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    eslint: "^9",
    "eslint-config-next": "16.0.3",
    tailwindcss: "^4",
    typescript: "^5",
  },
};

// Versionen aus dem Quellprojekt übernehmen, soweit vorhanden
try {
  const quellPkg = JSON.parse(
    readFileSync(path.join(root, "package.json"), "utf8"),
  ) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  packageJson.dependencies = {
    motion: quellPkg.dependencies?.motion ?? packageJson.dependencies.motion,
    next: quellPkg.dependencies?.next ?? packageJson.dependencies.next,
    react: quellPkg.dependencies?.react ?? packageJson.dependencies.react,
    "react-dom":
      quellPkg.dependencies?.["react-dom"] ??
      packageJson.dependencies["react-dom"],
  };
  packageJson.devDependencies = {
    "@tailwindcss/turbopack":
      quellPkg.devDependencies?.["@tailwindcss/turbopack"] ?? "^4",
    "@types/node": quellPkg.devDependencies?.["@types/node"] ?? "^20",
    "@types/react": quellPkg.devDependencies?.["@types/react"] ?? "^19",
    "@types/react-dom":
      quellPkg.devDependencies?.["@types/react-dom"] ?? "^19",
    eslint: quellPkg.devDependencies?.eslint ?? "^9",
    "eslint-config-next":
      quellPkg.devDependencies?.["eslint-config-next"] ??
      packageJson.devDependencies["eslint-config-next"],
    tailwindcss: quellPkg.devDependencies?.tailwindcss ?? "^4",
    typescript: quellPkg.devDependencies?.typescript ?? "^5",
  };
} catch {
  // Fallback-Versionen behalten
}

schreiben("package.json", `${JSON.stringify(packageJson, null, 2)}\n`);

schreiben(
  "tsconfig.json",
  `${JSON.stringify(
    {
      compilerOptions: {
        target: "ES2017",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "react-jsx",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./*"] },
      },
      include: [
        "next-env.d.ts",
        "**/*.ts",
        "**/*.tsx",
        ".next/types/**/*.ts",
        ".next/dev/types/**/*.ts",
        "**/*.mts",
      ],
      exclude: ["node_modules"],
    },
    null,
    2,
  )}\n`,
);

schreiben(
  "next.config.ts",
  `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
`,
);

schreiben(
  "next-env.d.ts",
  `/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
`,
);

schreiben(
  ".gitignore",
  `node_modules
.next
out
.env*
.DS_Store
*.tsbuildinfo
next-env.d.ts
`,
);

schreiben(
  "eslint.config.mjs",
  `import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
`,
);

// Schlanke Typen ohne Lead-Registry
schreiben(
  "lib/lead.ts",
  `export type Familie =
  | "garten"
  | "bau"
  | "technik"
  | "hausdienste"
  | "betreuung"
  | "beratung"
  | "auto"
  | "erlebnis";

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

/** Feste Kundendaten der Website */
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
`,
);

kopiereDatei("lib/farben.ts");
kopiereDatei("lib/kontakt.ts");
kopiereDatei("lib/kontakt-formular.tsx");

schreiben(
  "content/daten.ts",
  `import type { Vorschau } from "@/lib/lead";

export const daten: Vorschau = ${alsTsObjekt(vorschau)};
`,
);

// Template der Familie + gemeinsamer Platzhalter
kopiereDatei("templates/platzhalter.tsx");
kopiereDatei(`templates/${familie}/index.tsx`);

const templateExportName = templateName(familie);

schreiben(
  "templates/index.ts",
  `import type { ComponentType } from "react";
import type { Vorschau } from "@/lib/lead";
import { ${templateExportName} } from "@/templates/${familie}";

export type TemplateKomponente = ComponentType<{
  data: Vorschau;
  vorschauHinweis?: boolean;
}>;

export const Template: TemplateKomponente = ${templateExportName};
`,
);

schreiben(
  "app/globals.css",
  `@import "tailwindcss";

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: var(--farbe-hell, #ffffff);
  color: var(--farbe-text, #171717);
}
`,
);

schreiben(
  "app/layout.tsx",
  `import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: ${JSON.stringify(vorschau.firma)},
  description: ${JSON.stringify(vorschau.claim)},
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
`,
);

schreiben(
  "app/page.tsx",
  `import { daten } from "@/content/daten";
import { Template } from "@/templates";

export default function Home() {
  return <Template data={daten} vorschauHinweis={false} />;
}
`,
);

schreiben(
  "README.md",
  `# ${vorschau.firma}

Eigenständiges Website-Projekt, ausgegliedert aus sham-vorschau (Lead \`${slug}\`).

\`\`\`bash
npm install
npm run dev
\`\`\`

Dieses Projekt ist unabhängig von sham-vorschau und kann frei bearbeitet werden.
`,
);

mkdirSync(path.join(ziel, "public"), { recursive: true });

console.log(`Projekt angelegt: ${ziel}`);
console.log("Installiere Abhängigkeiten …");

try {
  execSync("npm install", { cwd: ziel, stdio: "inherit" });
} catch {
  console.warn(
    "npm install ist fehlgeschlagen. Bitte im Zielordner manuell ausführen.",
  );
}

console.log(`\nFertig. Start: cd "${ziel}" && npm run dev`);

function templateName(f: Familie): string {
  const map: Record<Familie, string> = {
    garten: "GartenTemplate",
    bau: "BauTemplate",
    technik: "TechnikTemplate",
    hausdienste: "HausdiensteTemplate",
    betreuung: "BetreuungTemplate",
    beratung: "BeratungTemplate",
    auto: "AutoTemplate",
    erlebnis: "ErlebnisTemplate",
  };
  return map[f];
}
