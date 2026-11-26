import type { ReactNode } from "react";
import { farbenAlsCssVars } from "@/lib/farben";
import type { Vorschau } from "@/lib/lead";
import { KontaktFormular, telLink, whatsappLink } from "@/lib/kontakt";

export const STANDARD_ABSCHNITTE = [
  "hero",
  "leistungen",
  "ablauf",
  "galerie",
  "faq",
  "kontakt",
] as const;

export type TemplateProps = {
  data: Vorschau;
  /** Standardreihenfolge, wenn der Lead keine abschnitte setzt */
  abschnitteStandard?: readonly string[];
  /** Zeigt den Hinweis „Vorschau von Sham Studio“ im Footer */
  vorschauHinweis?: boolean;
};

function AbschnittHero({ data }: { data: Vorschau }) {
  return (
    <section>
      <h1>{data.firma}</h1>
      <p>{data.claim}</p>
      <p>{data.intro}</p>
    </section>
  );
}

function AbschnittLeistungen({ data }: { data: Vorschau }) {
  return (
    <section>
      <h2>Leistungen</h2>
      <ul>
        {data.leistungen.map((leistung) => (
          <li key={leistung.titel}>
            <strong>{leistung.titel}</strong>
            <p>{leistung.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AbschnittAblauf({ data }: { data: Vorschau }) {
  return (
    <section>
      <h2>Ablauf</h2>
      <ol>
        {data.ablauf.map((schritt) => (
          <li key={schritt.titel}>
            <strong>{schritt.titel}</strong>
            <p>{schritt.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function AbschnittGalerie({ data }: { data: Vorschau }) {
  return (
    <section>
      <h2>Galerie</h2>
      <ul>
        {data.bilder.galerie.map((src) => (
          <li key={src}>{src}</li>
        ))}
      </ul>
    </section>
  );
}

function AbschnittFaq({ data }: { data: Vorschau }) {
  return (
    <section>
      <h2>Häufige Fragen</h2>
      <dl>
        {data.faq.map((eintrag) => (
          <div key={eintrag.frage}>
            <dt>{eintrag.frage}</dt>
            <dd>{eintrag.antwort}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function AbschnittKontakt({ data }: { data: Vorschau }) {
  const nachricht = `Guten Tag, ich interessiere mich für eine Anfrage an ${data.firma}.`;
  return (
    <section>
      <h2>Kontakt</h2>
      <p>
        {data.ort}
        {data.adresse ? `, ${data.adresse}` : null}
      </p>
      <p>
        <a href={telLink(data.telefon)}>{data.telefon}</a>
      </p>
      {data.whatsapp ? (
        <p>
          <a href={whatsappLink(data.whatsapp, nachricht)}>WhatsApp</a>
        </p>
      ) : null}
      {data.email ? (
        <p>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </p>
      ) : null}
      <KontaktFormular firma={data.firma} />
    </section>
  );
}

const ABSCHNITT_KOMPONENTEN: Record<
  string,
  (props: { data: Vorschau }) => ReactNode
> = {
  hero: AbschnittHero,
  leistungen: AbschnittLeistungen,
  ablauf: AbschnittAblauf,
  galerie: AbschnittGalerie,
  faq: AbschnittFaq,
  kontakt: AbschnittKontakt,
};

/**
 * Neutrales Platzhalter-Template ohne Design.
 * Rendert Abschnitte in der Reihenfolge aus data.abschnitte
 * bzw. abschnitteStandard.
 */
export function PlatzhalterTemplate({
  data,
  abschnitteStandard = STANDARD_ABSCHNITTE,
  vorschauHinweis = true,
}: TemplateProps) {
  const reihenfolge = data.abschnitte ?? [...abschnitteStandard];
  const stil = farbenAlsCssVars(data.farben);

  return (
    <div style={stil}>
      <main>
        {reihenfolge.map((id) => {
          const Komponente = ABSCHNITT_KOMPONENTEN[id];
          if (!Komponente) return null;
          return <Komponente key={id} data={data} />;
        })}
      </main>
      <footer>
        {vorschauHinweis ? <p>Vorschau von Sham Studio</p> : null}
      </footer>
    </div>
  );
}
