import { JsonLd } from "@/components/JsonLd";
import { categories, getCategory } from "@/data/categories";
import { posts } from "@/data/posts";
import fr from "@/messages/fr.json";
import { greeting, recommendParts } from "@/lib/chatbot";
import { pageMetadata, storeSchema } from "@/lib/seo";
import { getVehicle } from "@/data/vehicles";
import type { Metadata } from "next";
import Link from "next/link";

const vehicle = getVehicle("honda-civic-2018-15t") ?? null;
const chatContext = {
  locale: "fr" as const,
  vehicle,
  cartCount: 0,
  cart: [],
  orders: [],
};

export const metadata: Metadata = pageMetadata({
  locale: "fr",
  path: "/",
  title: fr.meta.title,
  description: fr.meta.description,
});

export default function RootPage() {
  const hello = greeting(chatContext);
  const picks = recommendParts("", chatContext);
  const starters = [fr.chat.s1, fr.chat.s2, fr.chat.s3, fr.chat.s4];

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <meta httpEquiv="refresh" content="0; url=/fr/" />
      <p className="mb-1 text-xs uppercase tracking-wide text-muted">{fr.chat.title}</p>
      <div className="rounded-md bg-card px-4 py-3">
        <h1 className="plain-copy">{hello.text}</h1>
      </div>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {starters.map((starter) => (
          <li key={starter} className="card px-4 py-3 text-sm">
            {starter}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm">
        <Link href="/fr/">{fr.nav.home}</Link>
        {" · "}
        <Link href="/en/">{fr.locale.en}</Link>
      </p>
      <nav className="mt-8" aria-label={fr.nav.parts}>
        <h2 className="text-lg font-semibold">{fr.home.categoriesTitle}</h2>
        <ul className="mt-3 space-y-1 text-sm">
          <li>
            <Link href="/fr/pieces/">{fr.nav.parts}</Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/fr/pieces/${category.slug}/`}>{fr.categories[category.id]}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {picks.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">{fr.rail.title}</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {picks.map((product) => {
              const category = getCategory(product.categoryId);
              if (!category) return null;
              return (
                <li key={product.id}>
                  <Link href={`/fr/pieces/${category.slug}/${product.slug}/`}>{product.name.fr}</Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">{fr.blog.title}</h2>
        <ul className="mt-3 space-y-1 text-sm">
          <li>
            <Link href="/fr/blog/">{fr.nav.blog}</Link>
          </li>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/fr/blog/${post.slug}/`}>{post.title.fr}</Link>
            </li>
          ))}
        </ul>
      </section>
      <p className="mt-8 text-sm text-muted">{fr.home.lead}</p>
      <JsonLd data={storeSchema("fr")} />
      <script dangerouslySetInnerHTML={{ __html: 'location.replace("/fr/")' }} />
    </main>
  );
}
