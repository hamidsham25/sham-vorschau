<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# sham-vorschau

Vorschau-Websites für Leads von Sham Studio (Webdesign für lokale Betriebe, Region Hannover).
Jede Vorschau zeigt einem Betrieb, wie seine neue Website aussehen könnte. Rein optisch,
keine echte Funktionalität nötig, aber am Handy einwandfrei.

## Aufbau

- `templates/<familie>/` ist eine Template-Familie mit eigenem Layout, eigener Navigation,
  eigenen Abschnitten und eigenem Styling. Familien teilen kein Aussehen.
- `content/branchen/<branche>.ts` ist ein Branchen-Paket: Leistungen, Texte, Bildpfade,
  Standardfarben, passend zu einer Familie.
- `content/leads/<slug>.ts` ist eine konkrete Vorschau: Firmenname, Ort, Telefon, Farben,
  Logo, Familie, Branche. Fehlende Felder kommen aus dem Branchen-Paket.
- Beide Dateiarten exportieren ein Objekt mit `satisfies Lead` bzw. `satisfies Branche`.
  Kein zod, keine JSON-Dateien.
- `lib/lead.ts` enthält die Typen und die Funktionen zum Laden und Zusammenführen.
- `lib/kontakt.ts` enthält Anruf-, WhatsApp- und Formular-Logik ohne Aussehen.
- `app/[slug]/page.tsx` rendert eine Vorschau mit ihrem Template.
- `app/demo/[familie]/page.tsx` rendert eine neutrale Demo pro Familie fürs Portfolio.

## Zwei Stufen der Bearbeitung

1. Vorschau: Das allgemeine Template bleibt unverändert. Alles Individuelle steht in der
   Lead-Datei: Texte, Bilder, Farben, Stilvariante, Reihenfolge und Sichtbarkeit der
   Abschnitte.
2. Auftrag: `npm run ausgliedern <slug>` erzeugt ein eigenständiges Kundenprojekt, das
   frei bearbeitet wird. Änderungen dort fließen nie zurück ins allgemeine Template.

## Template-Familien

garten, bau, technik, hausdienste, betreuung, beratung, auto, erlebnis.
Reihenfolge des Aufbaus: garten, bau, technik, hausdienste.

## Wie diese Datei gemeint ist

Es gibt wenige feste Regeln und viele Leitlinien. Feste Regeln gelten immer. Leitlinien
sind der Normalfall, von dem du abweichen darfst, wenn das Design dadurch besser wird.
Sag in dem Fall kurz, wovon du abweichst und warum.

## Feste Regeln

- Alles ist `noindex, nofollow`. robots.txt sperrt alles. Keine Cookies, kein Tracking,
  keine externen Skripte.
- Keine Platzhalter wie Lorem ipsum. Immer echte, branchentypische Inhalte.
- Bilder nur lizenzfrei (Unsplash, Pexels) oder vom Kunden.
- Mobile zuerst. Jede Seite muss bei 375 px Breite einwandfrei aussehen.
- Text muss lesbar sein: mindestens 4,5 zu 1 Kontrast, bei großer Schrift 3 zu 1.
- Templates nutzen Farben nur über die Variablen aus `lib/farben.ts`, damit jede Vorschau
  die Farben des Betriebs übernehmen kann.
- Texte auf Deutsch, Anrede Sie, kein Gedankenstrich zwischen Satzteilen.

## Leitlinien

**Farben**

- Grundidee: zwei Grundfarben (`dunkel`, `hell`) und ein Akzent. Daraus leitet
  `lib/farben.ts` Abstufungen, Hover und lesbare Textfarben ab.
- `dunkel` kann Schwarz sein oder ein dunkler Ton passend zur Branche, etwa Dunkelgrün
  oder Marineblau. `hell` kann reines Weiß sein oder ein getöntes Off-White.
- Der Akzent wirkt am stärksten, wenn er sparsam eingesetzt wird, etwa für Buttons und
  einzelne Hervorhebungen. Ein klarer Hauptbutton pro Ansicht hilft bei der Orientierung.
- Verläufe und weitere Farben nur, wenn sie zum Stil des Templates gehören.

**Gestaltung**

- Jedes Template entscheidet selbst, ob es hell oder dunkel zuerst ist.
- Schriften lädt jedes Template selbst über next/font.
- Kurze Sätze, klare Hierarchie, großzügige Abstände.
- Im Footer eine kleine Zeile „Vorschau von Sham Studio“, sonst kein Sham-Studio-Branding.

## Skills

- Neue Templates, Abschnitte und Gestaltung: frontend-design.
- Animationen und Übergänge mit motion: animate.
- Vor jedem Commit an einem Template: vercel-react-best-practices und
  web-design-guidelines über die geänderten Dateien laufen lassen und Funde beheben.