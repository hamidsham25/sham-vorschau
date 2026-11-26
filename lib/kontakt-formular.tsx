"use client";

import { useState, type FormEvent } from "react";

export type KontaktFormularProps = {
  firma: string;
  /** Optionaler Klassenname für äußeres Element (Templates liefern das Styling). */
  className?: string;
};

/**
 * Formular ohne eigenes Styling. Beim Absenden erscheint nur eine Danke-Meldung.
 * Kein Versand an einen Server.
 */
export function KontaktFormular({ firma, className }: KontaktFormularProps) {
  const [gesendet, setGesendet] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGesendet(true);
  }

  if (gesendet) {
    return (
      <p role="status">
        Vielen Dank. Ihre Nachricht an {firma} ist eingegangen. Wir melden uns
        in Kürze bei Ihnen.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <label>
        Name
        <input name="name" type="text" required autoComplete="name" />
      </label>
      <label>
        Telefon
        <input name="telefon" type="tel" autoComplete="tel" />
      </label>
      <label>
        E-Mail
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Nachricht
        <textarea name="nachricht" required rows={4} />
      </label>
      <button type="submit">Nachricht senden</button>
    </form>
  );
}
