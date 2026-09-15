"use client";

import { ChatPanel } from "@/components/ChatPanel";
import { SectionTitle } from "@/components/SectionTitle";
import { StorefrontChrome } from "@/components/StorefrontChrome";
import { VehiclePicker } from "@/components/VehiclePicker";
import { categories } from "@/data/categories";
import { getVehicle } from "@/data/vehicles";
import { Link, useRouter } from "@/i18n/navigation";
import { servixaAsset } from "@/lib/servixa";
import { useStore } from "@/lib/store";
import { withBase } from "@/lib/paths";
import { useTranslations } from "next-intl";

const serviceIcons = ["icon-tire-1", "icon-oil", "icon-diagnostic", "icon-fan", "icon-shield", "icon-mechanical"];
const serviceBgs = [
  "images/backgrounds/service-two-single-bg.jpg",
  "images/backgrounds/service-two-single-bg-2.jpg",
  "images/backgrounds/service-two-single-bg-3.jpg",
  "images/backgrounds/service-two-single-bg-4.jpg",
  "images/backgrounds/service-two-single-bg.jpg",
  "images/backgrounds/service-two-single-bg-2.jpg",
];

export default function HomePage() {
  const t = useTranslations("home");
  const tc = useTranslations("categories");
  const tp = useTranslations("picker");
  const { setSelectedFitment, selectedFitmentId } = useStore();
  const router = useRouter();
  const selected = selectedFitmentId ? getVehicle(selectedFitmentId) : null;
  const shortcuts = categories.filter((c) => c.shortcut);

  const slides = [
    { kicker: t("kicker"), title: t("title"), lead: t("lead") },
    { kicker: t("slide2Kicker"), title: t("slide2Title"), lead: t("slide2Lead") },
  ];

  return (
    <StorefrontChrome>
      <section className="main-slider-two">
        <div
          className="swiper-container thm-swiper__slider"
          data-swiper-options={JSON.stringify({
            slidesPerView: 1,
            loop: true,
            effect: "fade",
            pagination: { el: "#main-slider-pagination", type: "bullets", clickable: true },
            autoplay: { delay: 8000 },
          })}
        >
          <div className="swiper-wrapper">
            {slides.map((slide) => (
              <div className="swiper-slide" key={slide.title}>
                <div className="main-slider-two__bg-box">
                  <div
                    className="main-slider-two__bg"
                    style={{ backgroundImage: `url(${withBase("/hero/workshop.jpg")})` }}
                  />
                </div>
                <div className="main-slider-two__img-box">
                  <div className="main-slider-two__man">
                    <img src={withBase("/hero/mechanic.png")} alt="" />
                  </div>
                  <div className="main-slider-two__img">
                    <img src={servixaAsset("images/resources/main-slider-two-img-1-1.png")} alt="" />
                  </div>
                </div>
                <div className="main-slider-two__shape-1">
                  <img src={servixaAsset("images/shapes/main-slider-two-shape-1.png")} alt="" />
                </div>
                <div className="main-slider-two__shape-2">
                  <img src={servixaAsset("images/shapes/main-slider-two-shape-2.png")} alt="" />
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="main-slider-two__content">
                        <div className="main-slider-two__content-inner">
                          <h4 className="main-slider-two__sub-title">{slide.kicker}</h4>
                          <h2 className="main-slider-two__title">{slide.title}</h2>
                          <p className="main-slider-two__text">{slide.lead}</p>
                          <div className="main-slider-two__btn-and-video-box">
                            <div className="main-slider-two__btn-box">
                              <Link href="/pieces" className="thm-btn">
                                {t("shop")}
                                <span>
                                  <i className="icon-next" />
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination" id="main-slider-pagination" />
        </div>
        <div className="ax-hero-chat">
          <ChatPanel variant="hero" />
        </div>
      </section>
      <div className="container">
        <div className="ax-hero-picker hero-form">
          <VehiclePicker
            dark
            submitLabel={tp("continue")}
            onSelect={(id) => {
              setSelectedFitment(id);
              router.push("/pieces");
            }}
          />
          <p className="main-slider-two__text" style={{ marginTop: 8, marginBottom: 12 }}>
            {selected ? `${selected.year} ${selected.make} ${selected.model} · ${selected.engine}` : t("vehicleNeeded")}
          </p>
        </div>
      </div>

      <section className="feature-one">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 wow fadeInLeft" data-wow-delay="100ms">
              <div className="feature-one__single">
                <div className="feature-one__arrow">
                  <Link href="/pieces">
                    <span className="icon-next" />
                  </Link>
                </div>
                <div className="feature-one__single-inner">
                  <div
                    className="feature-one__single-bg-shape"
                    style={{ backgroundImage: `url(${servixaAsset("images/shapes/feature-one-single-bg-shape.png")})` }}
                  />
                  <div className="feature-one__icon-and-title">
                    <div className="feature-one__icon">
                      <span className="icon-shield" />
                    </div>
                    <h3 className="feature-one__title">{t("howTitle")}</h3>
                  </div>
                  <p className="feature-one__text">{t("howBody")}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 wow fadeInRight" data-wow-delay="200ms">
              <div className="feature-one__single">
                <div className="feature-one__arrow">
                  <Link href="/compte/entretien">
                    <span className="icon-next" />
                  </Link>
                </div>
                <div className="feature-one__single-inner">
                  <div
                    className="feature-one__single-bg-shape"
                    style={{ backgroundImage: `url(${servixaAsset("images/shapes/feature-one-single-bg-shape.png")})` }}
                  />
                  <div className="feature-one__icon-and-title">
                    <div className="feature-one__icon">
                      <span className="icon-affordable" />
                    </div>
                    <h3 className="feature-one__title">{t("trustTitle")}</h3>
                  </div>
                  <p className="feature-one__text">{t("trustBody")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sliding-text-two">
        <div className="sliding-text-two__inner">
          <ul className="sliding-text-two__list marquee_mode-3 list-unstyled">
            <li>
              <div className="icon">
                <span className="icon-mechanical" />
              </div>
              <h2>{t("marquee1")}</h2>
            </li>
            <li>
              <div className="icon">
                <span className="icon-mechanical" />
              </div>
              <h2>{t("marquee2")}</h2>
            </li>
          </ul>
        </div>
      </section>

      <section className="about-two">
        <div className="about-two__shape-1 float-bob-y">
          <img src={servixaAsset("images/shapes/about-two-shape-1.png")} alt="" />
        </div>
        <div className="about-two__shape-2 img-bounce">
          <img src={servixaAsset("images/shapes/about-two-shape-2.png")} alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="about-two__left wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms">
                <div className="about-two__img-box">
                  <div className="about-two__img">
                    <img src={withBase("/hero/workshop.jpg")} alt="" />
                  </div>
                  <div className="about-two__img-2">
                    <img src={withBase("/hero/mechanic.png")} alt="" />
                  </div>
                  <div className="about-two__experience-box">
                    <div className="about-two__experience-count">
                      <h3 className="odometer" data-count="4">
                        00
                      </h3>
                      <span>+</span>
                    </div>
                    <p className="about-two__experience-count-text">{t("vendorsCount")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="about-two__right">
                <SectionTitle tag={t("aboutTag")} title={t("aboutTitle")} animation="2" />
                <p className="about-two__text">{t("aboutBody")}</p>
                <ul className="about-two__points-box">
                  <li>
                    <div className="icon">
                      <span className="icon-tools-1" />
                    </div>
                    <div className="content">
                      <h3 className="about-two__points-title">{t("aboutPoint1Title")}</h3>
                      <p className="about-two__points-text">{t("aboutPoint1Text")}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-technician" />
                    </div>
                    <div className="content">
                      <h3 className="about-two__points-title">{t("aboutPoint2Title")}</h3>
                      <p className="about-two__points-text">{t("aboutPoint2Text")}</p>
                    </div>
                  </li>
                </ul>
                <div className="about-two__btn-and-review-box">
                  <div className="about-two__btn-box">
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

      <section className="service-two">
        <div className="service-two__wrap">
          <div className="container">
            <SectionTitle tag={t("servicesTag")} title={t("categoriesTitle")} center animation="1" />
            <div className="service-two__inner">
              <div className="row">
                {shortcuts.map((category, index) => (
                  <div
                    className={`col-xl-3 col-lg-6 col-md-6 wow ${index < 2 ? "fadeInLeft" : "fadeInRight"}`}
                    data-wow-delay={`${(index % 2) + 1}00ms`}
                    key={category.id}
                  >
                    <div className="service-two__single">
                      <div className="service-two__single-inner">
                        <div
                          className="service-two__single-bg"
                          style={{
                            backgroundImage: `url(${servixaAsset(serviceBgs[index] ?? serviceBgs[0])})`,
                          }}
                        />
                        <h3 className="service-two__title">
                          <Link href={`/pieces/${category.slug}`}>{tc(category.id)}</Link>
                        </h3>
                        <div className="service-two__count" />
                        <p className="service-two__text">{t("serviceCard")}</p>
                        <div className="service-two__read-more">
                          <Link href={`/pieces/${category.slug}`}>
                            <span className="icon-next" />
                            {t("shop")}
                          </Link>
                        </div>
                      </div>
                      <div className="service-two__icon">
                        <span className={serviceIcons[index] ?? "icon-mechanical"} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="service-two__see-more">
          <Link href="/pieces">
            {t("allCategories")}
            <span className="icon-next" />
          </Link>
        </div>
      </section>

      <section className="why-choose-two">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 wow fadeInLeft" data-wow-delay="100ms">
              <div className="why-choose-two__left">
                <SectionTitle tag={t("whyTag")} title={t("whyTitle")} animation="2" />
                <p className="why-choose-two__text">{t("howBody")}</p>
                <ul className="why-choose-two__points">
                  <li>
                    <div className="icon">
                      <span className="icon-professional-services" />
                    </div>
                    <div className="content">
                      <h3>{t("trustTitle")}</h3>
                      <p>{t("trustBody")}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-24-hours" />
                    </div>
                    <div className="content">
                      <h3>{t("marcTitle")}</h3>
                      <p>{t("marcBody")}</p>
                    </div>
                  </li>
                </ul>
                <div className="why-choose-two__btn-and-call-box">
                  <div className="why-choose-two__btn-box">
                    <Link href="/pieces" className="thm-btn">
                      {t("shop")}
                      <span className="icon-next" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="why-choose-two__right">
                <div className="why-choose-two__img-box">
                  <div className="why-choose-two__img">
                    <img src={withBase("/hero/workshop.jpg")} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </StorefrontChrome>
  );
}
