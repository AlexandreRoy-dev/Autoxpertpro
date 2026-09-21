import { PageIntro } from "@/components/PageIntro";
import { posts } from "@/data/posts";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { withBase } from "@/lib/paths";
import { getTranslations, setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Locale;
  const t = await getTranslations("blog");

  return (
    <div className="wrap py-12">
      <PageIntro title={t("title")} lead={t("lead")} />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="card overflow-hidden">
            <img src={withBase(post.image)} alt="" className="h-40 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs text-muted">{post.tag[lang]}</p>
              <h2 className="mt-2 font-semibold">
                <Link href={`/blog/${post.slug}`}>{post.title[lang]}</Link>
              </h2>
              <p className="mt-2 text-sm text-muted">{post.excerpt[lang]}</p>
              <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm text-accent">
                {t("read")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
