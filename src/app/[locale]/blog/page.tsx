import { PageHeader } from "@/components/PageHeader";
import { StorefrontChrome } from "@/components/StorefrontChrome";
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
    <StorefrontChrome>
      <PageHeader title={t("title")} lead={t("lead")} />
      <section className="blog-one ax-store-page">
        <div className="container">
          <div className="row">
            {posts.map((post, index) => (
              <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${(index % 3) + 1}00ms`} key={post.slug}>
                <div className="blog-one__single">
                  <div className="blog-one__single-inner">
                    <div className="blog-one__img-box">
                      <div className="blog-one__img">
                        <img src={withBase(post.image)} alt="" />
                        <div className="blog-one__tags">
                          <span>{post.tag[lang]}</span>
                        </div>
                      </div>
                      <div className="blog-one__date">
                        <p>
                          {post.day} <span>{post.month[lang]}</span>
                        </p>
                      </div>
                    </div>
                    <div className="blog-one__content">
                      <ul className="blog-one__meta list-unstyled">
                        <li>
                          <span className="fas fa-user" /> {t("by")}
                        </li>
                      </ul>
                      <h3 className="blog-one__title">
                        <Link href={`/blog/${post.slug}`}>{post.title[lang]}</Link>
                      </h3>
                      <p className="blog-one__text">{post.excerpt[lang]}</p>
                    </div>
                  </div>
                  <div className="blog-one__read-more-box">
                    <Link href={`/blog/${post.slug}`} className="blog-one__read-more">
                      {t("read")} <span className="fas fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </StorefrontChrome>
  );
}
