import { PiecesIndex } from "@/components/PiecesIndex";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = locale === "en" ? "en" : "fr";
  setRequestLocale(lang);
  const catalog = await getTranslations({ locale: lang, namespace: "catalog" });
  const home = await getTranslations({ locale: lang, namespace: "home" });
  return pageMetadata({
    locale: lang,
    path: "/pieces",
    title: `${catalog("title")} | AutoXpert`,
    description: home("lead"),
  });
}

export default async function PiecesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale === "en" ? "en" : "fr");
  return <PiecesIndex />;
}
