import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDemoVorschau } from "@/content/demos";
import { FAMILIEN, type Familie } from "@/lib/lead";
import { getTemplate } from "@/templates";

type Props = {
  params: Promise<{ familie: string }>;
};

function istFamilie(wert: string): wert is Familie {
  return (FAMILIEN as string[]).includes(wert);
}

export function generateStaticParams() {
  return FAMILIEN.map((familie) => ({ familie }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { familie } = await params;
  if (!istFamilie(familie)) {
    return {
      title: "Demo",
      robots: { index: false, follow: false },
    };
  }
  const demo = getDemoVorschau(familie);
  return {
    title: demo.firma,
    robots: { index: false, follow: false },
  };
}

export default async function DemoPage({ params }: Props) {
  const { familie } = await params;
  if (!istFamilie(familie)) {
    notFound();
  }

  const data = getDemoVorschau(familie);
  const Template = getTemplate(familie);
  return <Template data={data} vorschauHinweis />;
}
