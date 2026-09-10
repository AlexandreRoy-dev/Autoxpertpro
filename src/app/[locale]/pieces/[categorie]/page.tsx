import { CategoryListing } from "@/components/CategoryListing";
import { categories, getCategory } from "@/data/categories";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((category) => ({ locale, categorie: category.slug })),
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie } = await params;
  const category = getCategory(categorie);
  if (!category) notFound();
  return <CategoryListing category={category} />;
}
