import { PageIntro } from "@/components/PageIntro";
import { getPost, posts } from "@/data/posts";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { withBase } from "@/lib/paths";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang = locale as Locale;
  const post = getPost(slug);
  if (!post) notFound();
  const t = await getTranslations("blog");
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <div className="wrap py-12">
      <PageIntro title={post.title[lang]} crumbs={[{ href: "/blog", label: t("title") }]} />
      <img src={withBase(post.image)} alt="" className="mb-8 h-72 w-full rounded-md object-cover" />
      <p className="text-sm text-muted">
        {t("by")} · {post.tag[lang]}
      </p>
      <div className="mt-6 max-w-3xl space-y-4 text-muted">
        {post.body[lang].map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-8">
        <Link href={post.href as "/pieces"} className="text-accent">
          {t("relatedParts")} · {post.tag[lang]}
        </Link>
      </p>
      {related.length ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {related.map((item) => (
            <div key={item.slug}>
              <h3 className="font-semibold">
                <Link href={`/blog/${item.slug}`}>{item.title[lang]}</Link>
              </h3>
              <p className="mt-2 text-sm text-muted">{item.excerpt[lang]}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
