import "server-only";
import type { Metadata } from "next";
import { marketingBrand } from "./branding";
import { locales, type Locale } from "@/i18n/config";
import type { MarketingCopy } from "./i18n/dictionaries";

/** A trusted origin, never derived from request Host or forwarding headers. */
export function getMarketingOrigin(): URL {
  const url = new URL(process.env.SITE_URL || "https://demo.sytemano.com");
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error("SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment");
  }
  return url;
}

export function marketingAlternates() {
  const origin = getMarketingOrigin();
  return Object.fromEntries([
    ...locales.map(locale => [locale, new URL(`/${locale}`, origin).href]),
    ["x-default", origin.href],
  ]);
}

const ogLocales: Record<Locale, string> = { ar: "ar_MA", fr: "fr_FR", en: "en_US" };

export function marketingMetadata(locale: Locale, appName: string, copy: MarketingCopy): Metadata {
  const origin = getMarketingOrigin();
  const url = new URL(`/${locale}`, origin).href;
  const title = `${appName} — ${copy.seo.title}`;
  return {
    metadataBase: origin,
    applicationName: marketingBrand.shortName,
    icons: { icon: marketingBrand.icon, shortcut: marketingBrand.icon },
    title: { absolute: title },
    description: copy.seo.description,
    alternates: { canonical: url, languages: marketingAlternates() },
    robots: { index: true, follow: true },
    openGraph: {
      title, description: copy.seo.description, url, siteName: appName,
      type: "website", locale: ogLocales[locale],
      alternateLocale: locales.filter(value => value !== locale).map(value => ogLocales[value]),
    },
    twitter: { card: "summary", title, description: copy.seo.description },
  };
}

export function marketingStructuredData(locale: Locale, appName: string, copy: MarketingCopy) {
  const origin = getMarketingOrigin();
  const url = new URL(`/${locale}`, origin).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${origin.href}#website`, url: origin.href, name: appName, alternateName: marketingBrand.shortName, inLanguage: locales },
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url,
        name: `${appName} — ${copy.seo.title}`, description: copy.seo.description,
        inLanguage: locale, isPartOf: { "@id": `${origin.href}#website` },
        about: { "@type": "SoftwareApplication", name: appName, alternateName: marketingBrand.shortName, applicationCategory: "BusinessApplication", operatingSystem: "Web", description: copy.seo.description },
      },
    ],
  };
}
