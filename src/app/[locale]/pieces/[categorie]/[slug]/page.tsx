import { ProductDetail } from "@/components/ProductDetail";
import { categories, getCategory } from "@/data/categories";
import { getProduct, products } from "@/data/products";
import { routing, type Locale } from "@/i18n/routing";
import { clip, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.flatMap((product) => {
      const category = getCategory(product.categoryId);
      if (!category) return [];
      return [{ locale, categorie: category.slug, slug: product.slug }];
    }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorie: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, categorie, slug } = await params;
  const lang: Locale = locale === "en" ? "en" : "fr";
  setRequestLocale(lang);
  const category = categories.find((item) => item.slug === categorie);
  const product = getProduct(slug);
  if (!category || !product) return {};
  return pageMetadata({
    locale: lang,
    path: `/pieces/${category.slug}/${product.slug}`,
    title: `${product.name[lang]} | AutoXpert`,
    description: clip(product.description[lang]),
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; categorie: string; slug: string }>;
}) {
  const { locale, categorie, slug } = await params;
  setRequestLocale(locale === "en" ? "en" : "fr");
  if (!categories.some((c) => c.slug === categorie)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
