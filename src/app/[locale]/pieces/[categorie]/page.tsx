import { CategoryListing } from "@/components/CategoryListing";
import { categories, getCategory } from "@/data/categories";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((category) => ({ locale, categorie: category.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorie: string }>;
}): Promise<Metadata> {
  const { locale, categorie } = await params;
  const lang: Locale = locale === "en" ? "en" : "fr";
  setRequestLocale(lang);
  const category = getCategory(categorie);
  if (!category) return {};
  const names = await getTranslations({ locale: lang, namespace: "categories" });
  const home = await getTranslations({ locale: lang, namespace: "home" });
  const name = names(category.id);
  return pageMetadata({
    locale: lang,
    path: `/pieces/${category.slug}`,
    title: `${name} | AutoXpert`,
    description: `${name}. ${home("lead")}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; categorie: string }>;
}) {
  const { locale, categorie } = await params;
  setRequestLocale(locale === "en" ? "en" : "fr");
  const category = getCategory(categorie);
  if (!category) notFound();
  return <CategoryListing category={category} />;
}
