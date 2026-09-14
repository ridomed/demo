import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getMarketingOrigin, marketingAlternates } from "@/components/marketing/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map(locale => ({
    url: new URL(`/${locale}`, getMarketingOrigin()).href,
    alternates: { languages: marketingAlternates() },
  }));
}
