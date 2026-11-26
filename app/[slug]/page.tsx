import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllLeadSlugs, getVorschau } from "@/lib/lead";
import { getTemplate } from "@/templates";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllLeadSlugs()
    .filter((slug) => !slug.startsWith("demo-"))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug.startsWith("demo-")) {
    return {
      title: "Vorschau",
      robots: { index: false, follow: false },
    };
  }
  try {
    const vorschau = getVorschau(slug);
    return {
      title: vorschau.firma,
      robots: { index: false, follow: false },
    };
  } catch {
    return {
      title: "Vorschau",
      robots: { index: false, follow: false },
    };
  }
}

export default async function LeadPage({ params }: Props) {
  const { slug } = await params;

  // Demo-Inhalte nur unter /demo/[familie]
  if (slug.startsWith("demo-")) {
    notFound();
  }

  let vorschau;
  try {
    vorschau = getVorschau(slug);
  } catch {
    notFound();
  }

  const Template = getTemplate(vorschau.familie);
  return <Template data={vorschau} vorschauHinweis />;
}
