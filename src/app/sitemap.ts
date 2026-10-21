import { categories, getCategory } from "@/data/categories";
import { posts } from "@/data/posts";
import { products } from "@/data/products";
import { localePath, pageUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

function entry(path: string, locale: "fr" | "en"): MetadataRoute.Sitemap[number] {
  const fr = pageUrl(localePath("fr", path));
  const en = pageUrl(localePath("en", path));
  return {
    url: locale === "fr" ? fr : en,
    alternates: {
      languages: {
        "fr-CA": fr,
        "en-CA": en,
        "x-default": fr,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/pieces", "/blog"];

  for (const category of categories) {
    paths.push(`/pieces/${category.slug}`);
  }

  for (const product of products) {
    const category = getCategory(product.categoryId);
    if (!category) continue;
    paths.push(`/pieces/${category.slug}/${product.slug}`);
  }

  for (const post of posts) {
    paths.push(`/blog/${post.slug}`);
  }

  return paths.flatMap((path) => [entry(path, "fr"), entry(path, "en")]);
}
