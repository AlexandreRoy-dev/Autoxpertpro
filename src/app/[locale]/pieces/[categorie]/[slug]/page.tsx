import { ProductDetail } from "@/components/ProductDetail";
import { categories, getCategory } from "@/data/categories";
import { getProduct, products } from "@/data/products";
import { routing } from "@/i18n/routing";
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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ categorie: string; slug: string }>;
}) {
  const { categorie, slug } = await params;
  if (!categories.some((c) => c.slug === categorie)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
