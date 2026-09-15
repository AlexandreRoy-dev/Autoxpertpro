import { ServixaLogo } from "@/components/ServixaLogo";
import { Link } from "@/i18n/navigation";
import { servixaAsset } from "@/lib/servixa";
import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  return (
    <footer className="site-footer-two">
      <div className="site-footer-two__shape-1 float-bob-x">
        <img src={servixaAsset("images/shapes/site-footer-two-shape-1.png")} alt="" />
      </div>
      <div className="container">
        <div className="site-footer-two__top">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
              <div className="footer-widget-two__column footer-widget-two__about">
                <div className="footer-widget-two__logo">
                  <ServixaLogo />
                </div>
                <p className="footer-widget-two__about-text">{t("blurb")}</p>
                <ul className="footer-widget-two__contact list-unstyled">
                  <li>
                    <div className="icon">
                      <span className="icon-phone-call" />
                    </div>
                    <div className="content">
                      <h5>{t("contact")}</h5>
                      <p>
                        <a href={`tel:${t("phone").replace(/\s/g, "")}`}>{t("phone")}</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-email" />
                    </div>
                    <div className="content">
                      <h5>{t("email")}</h5>
                      <p>
                        <a href={`mailto:${t("email")}`}>{t("email")}</a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
              <div className="footer-widget-two__column footer-widget-two__usefull-link">
                <div className="footer-widget-two__title-box">
                  <h3 className="footer-widget-two__title">{t("company")}</h3>
                </div>
                <div className="footer-widget-two__link-box">
                  <ul className="footer-widget-two__link list-unstyled">
                    <li>
                      <Link href="/">{tn("home")}</Link>
                    </li>
                    <li>
                      <Link href="/pieces">{t("parts")}</Link>
                    </li>
                    <li>
                      <Link href="/compte/vehicules">{t("garage")}</Link>
                    </li>
                    <li>
                      <Link href="/compte/entretien">{t("entretien")}</Link>
                    </li>
                    <li>
                      <Link href="/compte">{tn("account")}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
              <div className="footer-widget-two__column footer-widget-two__services">
                <div className="footer-widget-two__title-box">
                  <h3 className="footer-widget-two__title">{t("services")}</h3>
                </div>
                <ul className="footer-widget-two__link list-unstyled">
                  <li>
                    <Link href="/pieces/freins">{t("brakes")}</Link>
                  </li>
                  <li>
                    <Link href="/pieces/huile">{t("oil")}</Link>
                  </li>
                  <li>
                    <Link href="/pieces/filtres">{t("filters")}</Link>
                  </li>
                  <li>
                    <Link href="/pieces/batterie">{t("battery")}</Link>
                  </li>
                  <li>
                    <Link href="/pieces">{t("parts")}</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
              <div className="footer-widget-two__column footer-widget-two__newsletter">
                <h3 className="footer-widget-two__newsletter-title">{t("newsletter")}</h3>
                <p className="footer-widget-two__about-text">{t("newsletterNote")}</p>
                <div className="site-footer-two__social">
                  <a href="#" aria-label="Facebook">
                    <i className="icon-facebook-app-symbol" />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <i className="icon-instagram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer-two__bottom">
        <div className="container">
          <div className="site-footer-two__bottom-inner">
            <p className="site-footer-two__bottom-text">{t("rights")}</p>
            <ul className="list-unstyled site-footer-two__bottom-menu">
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
