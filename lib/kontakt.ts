/** Erzeugt einen tel:-Link aus einer deutschen Telefonnummer. */
export function telLink(telefon: string): string {
  const ziffern = telefon.replace(/[^\d+]/g, "");
  return `tel:${ziffern}`;
}

/**
 * WhatsApp-Deep-Link mit vorbefülltem Text.
 * Nummer ohne Sonderzeichen, mit Ländervorwahl (z. B. 4915123456789).
 */
export function whatsappLink(telefon: string, text: string): string {
  const ziffern = telefon.replace(/\D/g, "");
  const mitVorwahl = ziffern.startsWith("0")
    ? `49${ziffern.slice(1)}`
    : ziffern;
  const params = new URLSearchParams({ text });
  return `https://wa.me/${mitVorwahl}?${params.toString()}`;
}

export { KontaktFormular, type KontaktFormularProps } from "./kontakt-formular";
