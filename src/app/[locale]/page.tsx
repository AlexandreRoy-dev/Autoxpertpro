"use client";

import { BrandStrip } from "@/components/BrandStrip";
import { ChatPanel } from "@/components/ChatPanel";
import { SectionTitle } from "@/components/SectionTitle";
import { StorefrontChrome } from "@/components/StorefrontChrome";
import { VehiclePicker } from "@/components/VehiclePicker";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";
import { categoryStock, stock } from "@/data/stock";
import { getVehicle } from "@/data/vehicles";
import { Link, useRouter } from "@/i18n/navigation";
import { servixaAsset } from "@/lib/servixa";
import { useStore } from "@/lib/store";
import { withBase } from "@/lib/paths";
import { useLocale, useTranslations } from "next-intl";

const serviceIcons = ["icon-tire-1", "icon-oil", "icon-diagnostic", "icon-fan", "icon-shield", "icon-mechanical"];

export default function HomePage() {
  const t = useTranslations("home");
  const tc = useTranslations("categories");
  const tp = useTranslations("picker");
  const tb = useTranslations("blog");
  const locale = useLocale() as "fr" | "en";
  const { setSelectedFitment, selectedFitmentId, garage } = useStore();
  const router = useRouter();
  const selected = selectedFitmentId ? getVehicle(selectedFitmentId) : null;
  const shortcuts = categories.filter((category) => category.shortcut);
  const featured = posts.slice(0, 3);

  return (
    <StorefrontChrome>
      <section className="main-slider">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide swiper-slide-active">
              <div className="main-slider__bg" />
              <div className="main-slider__img">
                <img src={withBase("/cutouts/hero-car.png")} alt="" />
              </div>
              <div className="main-slider__shape-1" />
              <div className="main-slider__shape-2" />
              <div className="main-slider__shape-3" />
              <div className="main-slider__shape-4" />
              <div className="main-slider__shape-5">
                <img src={servixaAsset("images/shapes/main-slider-shape-5.png")} alt="" />
              </div>
              <div className="main-slider__shape-6">
                <img src={servixaAsset("images/shapes/main-slider-shape-6.png")} alt="" className="rotate-me" />
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="main-slider__content">
                      <h4 className="main-slider__sub-title">{t("kicker")}</h4>
                      <h2 className="main-slider__title">{t("title")}</h2>
                      <p className="main-slider__text">{t("lead")}</p>
                      <div className="main-slider__btn-and-review-box">
                        <div className="main-slider__btn-box">
                          <Link href="/pieces" className="thm-btn">
                            {t("shop")}
                            <span>
                              <i className="icon-next" />
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="main-slider__picker hero-form">
                        <VehiclePicker
                          dark
                          initialFitmentId={selectedFitmentId}
                          presets={garage}
                          submitLabel={tp("continue")}
                          onSelect={(id) => {
                            setSelectedFitment(id);
                            router.push("/pieces");
                          }}
                        />
                        <p className="main-slider__picked">
                          {selected
                            ? `${selected.year} ${selected.make} ${selected.model} · ${selected.engine}`
                            : t("vehicleNeeded")}
                        </p>
                      </div>
                      <div className="main-slider__chat">
                        <ChatPanel variant="hero" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-one">
        <div className="about-one__shape-1 float-bob-x">
          <img src={servixaAsset("images/shapes/about-one-shape-1.png")} alt="" />
        </div>
        <div className="about-one__shape-2 float-bob-y">
          <img src={servixaAsset("images/shapes/about-one-shape-2.png")} alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="about-one__left wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms">
                <div className="about-one__img-box">
                  <div className="about-one__img">
                    <img src={withBase(stock.garage)} alt="" />
                  </div>
                  <div className="about-one__img-two">
                    <img src={withBase(stock.mechanic)} alt="" />
                  </div>
                  <div className="about-one__experience-box">
                    <div className="about-one__experience-count">
                      <h3>20</h3>
                      <span>+</span>
                    </div>
                    <p className="about-one__experience-count-text">{t("vendorsCount")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="about-one__right">
                <SectionTitle tag={t("aboutTag")} title={t("aboutTitle")} animation="2" />
                <p className="about-one__text">{t("aboutBody")}</p>
                <div className="about-one__point-box">
                  <ul className="about-one__point">
                    <li>
                      <div className="about-one__point-icon">
                        <span className="icon-affordable" />
                      </div>
                      <div className="about-one__point-content">
                        <h4>{t("aboutPoint1Title")}</h4>
                        <p>{t("aboutPoint1Text")}</p>
                      </div>
                    </li>
                    <li>
                      <div className="about-one__point-icon">
                        <span className="icon-24-hours" />
                      </div>
                      <div className="about-one__point-content">
                        <h4>{t("aboutPoint2Title")}</h4>
                        <p>{t("aboutPoint2Text")}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <ul className="about-one__point-two">
                  <li>
                    <div className="icon">
                      <span className="fas fa-check" />
                    </div>
                    <div className="text">
                      <p>{t("check1")}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="fas fa-check" />
                    </div>
                    <div className="text">
                      <p>{t("check2")}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="fas fa-check" />
                    </div>
                    <div className="text">
                      <p>{t("check3")}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="fas fa-check" />
                    </div>
                    <div className="text">
                      <p>{t("check4")}</p>
                    </div>
                  </li>
                </ul>
                <div className="about-one__btn-and-author-box">
                  <div className="about-one__btn-box">
                    <Link href="/pieces" className="thm-btn">
                      {t("shop")}
                      <span className="icon-next" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandStrip />

      <section className="services-one">
        <div className="container">
          <SectionTitle tag={t("servicesTag")} title={t("categoriesTitle")} center animation="2" />
          <div className="row">
            {shortcuts.map((category, index) => (
              <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${(index % 3) + 1}00ms`} key={category.id}>
                <div className="services-one__single">
                  <div className="services-one__img-box">
                    <div className="services-one__img">
                      <img src={withBase(categoryStock[category.id] ?? stock.garage)} alt="" />
                    </div>
                    <div className="services-one__count">{String(index + 1).padStart(2, "0")}</div>
                  </div>
                  <div className="services-one__content">
                    <div className="services-one__icon">
                      <span className={serviceIcons[index] ?? "icon-mechanical"} />
                    </div>
                    <h3 className="services-one__title">
                      <Link href={`/pieces/${category.slug}`}>{tc(category.id)}</Link>
                    </h3>
                    <p className="services-one__text">{t("serviceCard")}</p>
                    <div className="services-one__btn-box">
                      <Link href={`/pieces/${category.slug}`}>
                        {t("shop")} <span className="icon-next" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 20 }}>
            <Link href="/pieces" className="thm-btn">
              {t("allCategories")}
              <span className="icon-next" />
            </Link>
          </div>
        </div>
      </section>

      <section className="why-choose-one">
        <ul className="why-choose-one__sliding-text-list list-unstyled marquee_mode-1">
          <li>
            <h2 className="why-choose-one__sliding-text-title">{t("whyMarquee")}</h2>
          </li>
          <li>
            <h2 className="why-choose-one__sliding-text-title">{t("whyMarquee")}</h2>
          </li>
          <li>
            <h2 className="why-choose-one__sliding-text-title">{t("whyMarquee")}</h2>
          </li>
        </ul>
        <div className="why-choose-one__right-bg-color" />
        <div className="why-choose-one__right-bg" />
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="why-choose-one__left">
                <SectionTitle tag={t("whyTag")} title={t("whyTitle")} animation="2" />
                <p className="why-choose-one__text">{t("howBody")}</p>
                <div className="why-choose-one__points-box">
                  <div className="why-choose-one__points-list-shape-1" />
                  <ul className="why-choose-one__points-list list-unstyled">
                    <li>
                      <div className="icon">
                        <span className="icon-tools" />
                      </div>
                      <p>{t("whyP1")}</p>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-technician" />
                      </div>
                      <p>{t("whyP2")}</p>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-satisfaction" />
                      </div>
                      <p>{t("whyP3")}</p>
                    </li>
                  </ul>
                  <ul className="why-choose-one__points-list list-unstyled">
                    <li>
                      <div className="icon">
                        <span className="icon-clock-1" />
                      </div>
                      <p>{t("whyP4")}</p>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-affordable" />
                      </div>
                      <p>{t("whyP5")}</p>
                    </li>
                  </ul>
                </div>
                <div className="why-choose-one__author-box">
                  <div className="why-choose-one__author-img">
                    <img src={withBase(stock.mechanic)} alt="" />
                  </div>
                  <div className="why-choose-one__author-content">
                    <p>{t("needHelp")}</p>
                    <p>
                      <Link href="/pieces">{t("shop")}</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-one">
        <div className="container">
          <SectionTitle tag={t("blogTag")} title={t("blogTitle")} center animation="1" />
          <div className="row">
            {featured.map((post, index) => (
              <div
                className={`col-xl-4 col-lg-4 col-md-6 wow ${index === 1 ? "fadeInUp" : index === 0 ? "fadeInLeft" : "fadeInRight"}`}
                data-wow-delay={`${(index + 1) * 100}ms`}
                key={post.slug}
              >
                <div className="blog-one__single">
                  <div className="blog-one__single-inner">
                    <div className="blog-one__img-box">
                      <div className="blog-one__img">
                        <img src={withBase(post.image)} alt="" />
                        <div className="blog-one__tags">
                          <span>{post.tag[locale]}</span>
                        </div>
                      </div>
                      <div className="blog-one__date">
                        <p>
                          {post.day} <span>{post.month[locale]}</span>
                        </p>
                      </div>
                    </div>
                    <div className="blog-one__content">
                      <ul className="blog-one__meta list-unstyled">
                        <li>
                          <span className="fas fa-user" /> {tb("by")}
                        </li>
                      </ul>
                      <h3 className="blog-one__title">
                        <Link href={`/blog/${post.slug}`}>{post.title[locale]}</Link>
                      </h3>
                      <p className="blog-one__text">{post.excerpt[locale]}</p>
                    </div>
                  </div>
                  <div className="blog-one__read-more-box">
                    <Link href={`/blog/${post.slug}`} className="blog-one__read-more">
                      {tb("read")} <span className="fas fa-arrow-right" />
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
