import { pageMetadata, type SiteLocale } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: SiteLocale = locale === "en" ? "en" : "fr";
  setRequestLocale(lang);
  const favorites = await getTranslations({ locale: lang, namespace: "favorites" });
  const account = await getTranslations({ locale: lang, namespace: "account" });
  return pageMetadata({
    locale: lang,
    path: "/compte/favoris",
    title: `${favorites("title")} | AutoXpert`,
    description: account("savedHint"),
    noindex: true,
  });
}

export default function FavorisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
