import type { Metadata } from "next";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

export const SITE = "https://autoxpertpro.com";

/** Portrait already used for Marc on the site. */
export const OG_IMAGE = {
  path: "/stock/mechanic.jpg",
  width: 1400,
  height: 787,
} as const;

export type SiteLocale = "fr" | "en";

const copy = { fr, en } as const;

export function messagesFor(locale: SiteLocale) {
  return copy[locale];
}

export function clip(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const last = slice.lastIndexOf(" ");
  return (last > 80 ? slice.slice(0, last) : slice).trim();
}

export function withSlash(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function localePath(locale: SiteLocale, path: string) {
  const suffix = withSlash(path);
  return suffix === "/" ? `/${locale}/` : `/${locale}${suffix}`;
}

export function absoluteUrl(pathname: string) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE}${path}`;
}

export function pageUrl(pathname: string) {
  return absoluteUrl(withSlash(pathname));
}

export function langTag(locale: SiteLocale) {
  return locale === "en" ? "en-CA" : "fr-CA";
}

function ogLocale(locale: SiteLocale) {
  return locale === "en" ? "en_CA" : "fr_CA";
}

type PageSeo = {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  image?: string;
  imageAlt?: string;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  noindex,
  image,
  imageAlt,
}: PageSeo): Metadata {
  const descriptionText = clip(description);
  const pathname = localePath(locale, path);
  const url = pageUrl(pathname);
  const frUrl = pageUrl(localePath("fr", path));
  const enUrl = pageUrl(localePath("en", path));
  const imagePath = image ?? OG_IMAGE.path;
  const imageUrl = absoluteUrl(imagePath);
  const alt = imageAlt ?? copy[locale].chat.portraitAlt;

  return {
    title: { absolute: title },
    description: descriptionText,
    alternates: {
      canonical: url,
      languages: {
        "fr-CA": frUrl,
        "en-CA": enUrl,
        "x-default": frUrl,
      },
    },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description: descriptionText,
      url,
      siteName: "AutoXpert",
      locale: ogLocale(locale),
      alternateLocale: [locale === "fr" ? "en_CA" : "fr_CA"],
      type: "website",
      images: [
        {
          url: imageUrl,
          alt,
          ...(image ? {} : { width: OG_IMAGE.width, height: OG_IMAGE.height }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: descriptionText,
      images: [imageUrl],
    },
  };
}

/**
 * AutoPartsStore is the schema.org type that matches the catalogue.
 * TODO(Alexandre): no street address is published. Do not add one until it is real.
 * TODO(Alexandre): phone "514 555-0198" and email "bonjour@autoxpert.example" in the
 * unused footer strings are placeholders. Leave them out of JSON-LD until confirmed.
 * TODO(Alexandre): hours exist only as unused copy ("Lun – Ven : 9 h – 17 h"). Confirm
 * before publishing openingHours.
 * TODO(Alexandre): AutoRepair was not used. The site compares parts; it does not
 * describe a repair shop. Add AutoRepair only if that is actually offered.
 */
export function storeSchema(locale: SiteLocale) {
  const messages = copy[locale];
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "AutoXpert",
    url: `${SITE}/`,
    image: absoluteUrl(OG_IMAGE.path),
    description: messages.meta.description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: messages.nav.region,
    },
    currenciesAccepted: "CAD",
    inLanguage: langTag(locale),
  };
}
