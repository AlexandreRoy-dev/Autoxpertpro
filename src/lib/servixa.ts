import { withBase } from "@/lib/paths";

export const servixaCss = [
  "/servixa/assets/css/bootstrap.min.css",
  "/servixa/assets/css/animate.min.css",
  "/servixa/assets/css/custom-animate.css",
  "/servixa/assets/css/swiper.min.css",
  "/servixa/assets/css/font-awesome-all.css",
  "/servixa/assets/css/jarallax.css",
  "/servixa/assets/css/jquery.magnific-popup.css",
  "/servixa/assets/css/flaticon.css",
  "/servixa/assets/css/owl.carousel.min.css",
  "/servixa/assets/css/owl.theme.default.min.css",
  "/servixa/assets/css/nice-select.css",
  "/servixa/assets/css/jquery-ui.css",
  "/servixa/assets/css/aos.css",
  "/servixa/assets/css/odometer.min.css",
  "/servixa/assets/css/twentytwenty.css",
  "/servixa/assets/css/style.css",
  "/servixa/assets/css/responsive.css",
  "/servixa/adapt.css",
] as const;

export const servixaScripts = [
  "/servixa/assets/js/jquery-latest.js",
  "/servixa/assets/js/bootstrap.bundle.min.js",
  "/servixa/assets/js/jarallax.min.js",
  "/servixa/assets/js/jquery.appear.min.js",
  "/servixa/assets/js/swiper.min.js",
  "/servixa/assets/js/jquery.magnific-popup.min.js",
  "/servixa/assets/js/wow.js",
  "/servixa/assets/js/owl.carousel.min.js",
  "/servixa/assets/js/jquery-ui.js",
  "/servixa/assets/js/jquery.nice-select.min.js",
  "/servixa/assets/js/marquee.min.js",
  "/servixa/assets/js/aos.js",
  "/servixa/assets/js/odometer.min.js",
  "/servixa/assets/js/twentytwenty.js",
  "/servixa/assets/js/jquery.event.move.js",
  "/servixa/assets/js/gsap/gsap.js",
  "/servixa/assets/js/gsap/ScrollTrigger.js",
  "/servixa/assets/js/gsap/SplitText.js",
  "/servixa/assets/js/script.js",
] as const;

export function servixaAsset(path: string) {
  return withBase(`/servixa/assets/${path.replace(/^\//, "")}`);
}

export function servixaHref(path: string) {
  return withBase(path);
}
