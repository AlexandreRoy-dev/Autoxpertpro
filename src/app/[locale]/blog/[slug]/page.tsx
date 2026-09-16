import { PageHeader } from "@/components/PageHeader";
import { StorefrontChrome } from "@/components/StorefrontChrome";
import { getPost, posts } from "@/data/posts";
import { Link } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import { withBase } from "@/lib/paths";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
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
    <StorefrontChrome>
      <PageHeader
        title={post.title[lang]}
        crumbs={[{ href: "/blog", label: t("title") }]}
      />
      <section className="blog-details">
        <div className="container">
          <div className="blog-details__inner">
            <div className="blog-details__img-box-1">
              <div className="blog-details__img">
                <img src={withBase(post.image)} alt="" />
              </div>
              <div className="blog-details__date">
                <p>
                  {post.day} <span>{post.month[lang]}</span>
                </p>
              </div>
            </div>
            <div className="blog-details__content">
              <div className="blog-details__user-and-meta">
                <div className="blog-details__user">
                  <p>{t("by")}</p>
                </div>
                <ul className="blog-details__meta list-unstyled">
                  <li>{post.tag[lang]}</li>
                </ul>
              </div>
              <h2 className="blog-details__title">{post.title[lang]}</h2>
              {post.body[lang].map((paragraph) => (
                <p className="blog-details__text-1" key={paragraph.slice(0, 24)}>
                  {paragraph}
                </p>
              ))}
              <div className="blog-details__tag-and-share">
                <div className="blog-details__tag">
                  <h3 className="blog-details__tag-title">{t("relatedParts")}</h3>
                  <ul className="blog-details__tag-list list-unstyled">
                    <li>
                      <Link href={post.href as "/pieces"}>{post.tag[lang]}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {related.length ? (
              <div className="row" style={{ marginTop: 48 }}>
                {related.map((item) => (
                  <div className="col-xl-6 col-lg-6" key={item.slug}>
                    <h3 className="blog-one__title">
                      <Link href={`/blog/${item.slug}`}>{item.title[lang]}</Link>
                    </h3>
                    <p className="blog-one__text">{item.excerpt[lang]}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </StorefrontChrome>
  );
}
