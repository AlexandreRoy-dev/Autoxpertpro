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
  const t = await getTranslations({ locale: lang, namespace: "account" });
  return pageMetadata({
    locale: lang,
    path: "/compte",
    title: `${t("title")} | AutoXpert`,
    description: t("lead"),
    noindex: true,
  });
}

export default function CompteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
