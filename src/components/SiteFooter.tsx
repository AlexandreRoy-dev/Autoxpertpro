import { ServixaLogo } from "@/components/ServixaLogo";
import { Link } from "@/i18n/navigation";
import { servixaAsset } from "@/lib/servixa";
import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  return (
    <footer className="site-footer">
      <div
        className="site-footer__bg-shape"
        style={{ backgroundImage: `url(${servixaAsset("images/shapes/site-footer-bg-shape.png")})` }}
      />
      <div className="site-footer__top">
        <div className="container">
          <div className="site-footer__top-inner">
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                <div className="footer-widget__column footer-widget__about">
                  <div className="footer-widget__logo">
                    <ServixaLogo />
                  </div>
                  <p className="footer-widget__about-text">{t("blurb")}</p>
                  <div className="site-footer__social">
                    <a href="#" aria-label="Facebook">
                      <i className="icon-facebook-app-symbol" />
                    </a>
                    <a href="#" aria-label="Instagram">
                      <i className="icon-instagram" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                <div className="footer-widget__column footer-widget__quick-link">
                  <div className="footer-widget__title-box">
                    <h3 className="footer-widget__title">{t("company")}</h3>
                  </div>
                  <ul className="footer-widget__quick-link-list list-unstyled">
                    <li>
                      <Link href="/">
                        <span className="fas fa-angle-right" />
                        {tn("home")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/pieces">
                        <span className="fas fa-angle-right" />
                        {t("parts")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog">
                        <span className="fas fa-angle-right" />
                        {tn("blog")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/compte/vehicules">
                        <span className="fas fa-angle-right" />
                        {t("garage")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/compte/entretien">
                        <span className="fas fa-angle-right" />
                        {t("entretien")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/compte">
                        <span className="fas fa-angle-right" />
                        {tn("account")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                <div className="footer-widget__column footer-widget__services">
                  <div className="footer-widget__title-box">
                    <h3 className="footer-widget__title">{t("services")}</h3>
                  </div>
                  <ul className="footer-widget__quick-link-list list-unstyled">
                    <li>
                      <Link href="/pieces/freins">
                        <span className="fas fa-angle-right" />
                        {t("brakes")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/pieces/huile">
                        <span className="fas fa-angle-right" />
                        {t("oil")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/pieces/filtres">
                        <span className="fas fa-angle-right" />
                        {t("filters")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/pieces/batterie">
                        <span className="fas fa-angle-right" />
                        {t("battery")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/pieces">
                        <span className="fas fa-angle-right" />
                        {t("parts")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                <div className="footer-widget__column footer-widget__contact">
                  <div className="footer-widget__title-box">
                    <h3 className="footer-widget__title">{t("contact")}</h3>
                  </div>
                  <ul className="footer-widget__contact-list list-unstyled">
                    <li>
                      <div className="icon">
                        <span className="icon-location" />
                      </div>
                      <div className="content">
                        <span>{tn("region")}</span>
                        <p>Québec, Canada</p>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-clock" />
                      </div>
                      <div className="content">
                        <span>{tn("hours")}</span>
                        <p>{tn("hours")}</p>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-phone-call" />
                      </div>
                      <div className="content">
                        <span>{t("contact")}</span>
                        <p>
                          <a href={`tel:${t("phone").replace(/\s/g, "")}`}>{t("phone")}</a>
                          <br />
                          <a href={`mailto:${t("email")}`}>{t("email")}</a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container">
          <div className="site-footer__bottom-inner">
            <p className="site-footer__bottom-text">{t("rights")}</p>
            <ul className="list-unstyled site-footer__bottom-menu">
              <li>
                <Link href="/compte">{t("vendors")}</Link>
              </li>
              <li>
                <Link href="/pieces">{t("shipping")}</Link>
              </li>
              <li>
                <Link href="/pieces">{t("privacy")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
