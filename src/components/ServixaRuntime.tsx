"use client";

import { usePathname } from "@/i18n/navigation";
import { servixaHref, servixaScripts } from "@/lib/servixa";
import { useEffect } from "react";

declare global {
  interface Window {
    jQuery?: JQueryStatic;
    AOS?: { init: (opts?: Record<string, unknown>) => void; refreshHard?: () => void };
    WOW?: new (opts?: Record<string, unknown>) => { init: () => void };
    Swiper?: new (el: Element, opts: Record<string, unknown>) => { destroy: (a?: boolean, b?: boolean) => void };
    jarallax?: (els: NodeListOf<Element> | Element[], opts?: Record<string, unknown>) => void;
    __axServixaBooted?: boolean;
    __axServixaLoading?: Promise<void>;
  }
}

type JQueryStatic = ((sel?: unknown) => {
  length: number;
  marquee?: (opts: Record<string, unknown>) => unknown;
  trigger: (name: string) => void;
  each: (fn: (this: Element) => void) => void;
  data: (key: string, val?: unknown) => unknown;
  parent: () => { hasClass: (name: string) => boolean };
}) & { fn?: Record<string, unknown> };

function loadScript(src: string) {
  const href = servixaHref(src);
  if (document.querySelector(`script[data-servixa="${href}"]`)) {
    return Promise.resolve();
  }
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = href;
    script.async = false;
    script.dataset.servixa = href;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${href}`));
    document.body.appendChild(script);
  });
}

async function ensureScripts() {
  if (window.__axServixaLoading) return window.__axServixaLoading;
  window.__axServixaLoading = (async () => {
    for (const src of servixaScripts) {
      await loadScript(src);
    }
  })();
  return window.__axServixaLoading;
}

function cloneMenus() {
  const list = document.querySelector(".main-menu__list");
  const mobile = document.querySelector(".mobile-nav__container");
  if (list && mobile) mobile.innerHTML = list.outerHTML;
}

function refreshMotion() {
  const $ = window.jQuery;
  if (window.AOS) {
    if (window.AOS.refreshHard) window.AOS.refreshHard();
    else window.AOS.init({ duration: 1200, easing: "ease", mirror: true });
  }
  if (window.WOW) {
    new window.WOW({ boxClass: "wow", animateClass: "animated", mobile: true, live: true }).init();
  }
  if (window.Swiper) {
    document.querySelectorAll(".thm-swiper__slider").forEach((el) => {
      const existing = (el as HTMLElement & { swiper?: { destroy: (a?: boolean, b?: boolean) => void } }).swiper;
      existing?.destroy(true, true);
      const raw = el.getAttribute("data-swiper-options") || "{}";
      try {
        new window.Swiper!(el, JSON.parse(raw));
      } catch {
        new window.Swiper!(el, { slidesPerView: 1, loop: true, effect: "fade" });
      }
    });
  }
  if (window.jarallax) {
    window.jarallax(document.querySelectorAll(".jarallax"), { speed: 0.2 });
  }
  if ($ && $.fn?.marquee) {
    const nodes = document.querySelectorAll(".marquee_mode-3");
    nodes.forEach((node) => {
      if (node.parentElement?.classList.contains("js-marquee-wrapper")) return;
      $(node).marquee?.({
        speed: 30,
        gap: 30,
        delayBeforeStart: 0,
        direction: "left",
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
      });
    });
  }
}

export function ServixaRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.remove("custom-cursor");
    let cancelled = false;
    void ensureScripts().then(() => {
      if (cancelled) return;
      cloneMenus();
      if (!window.__axServixaBooted) {
        window.__axServixaBooted = true;
        window.jQuery?.(window).trigger("load");
      } else {
        refreshMotion();
      }
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
