import { ChatApp } from "@/components/ChatApp";
import { JsonLd } from "@/components/JsonLd";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata, storeSchema } from "@/lib/seo";
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
  const t = await getTranslations({ locale: lang, namespace: "meta" });
  return pageMetadata({
    locale: lang,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang: Locale = locale === "en" ? "en" : "fr";
  setRequestLocale(lang);

  return (
    <div className="h-full overflow-hidden">
      <JsonLd data={storeSchema(lang)} />
      <ChatApp />
    </div>
  );
}
