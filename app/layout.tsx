import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sham Studio Vorschau",
  description: "Vorschau-Websites für lokale Betriebe",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
