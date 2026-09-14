import "server-only";
import type { Locale } from "@/i18n/config";
import type en from "./en.json";

export type MarketingCopy = typeof en;

const loaders = {
  en: () => import("./en.json").then(module => module.default),
  fr: () => import("./fr.json").then(module => module.default),
  ar: () => import("./ar.json").then(module => module.default),
} satisfies Record<Locale, () => Promise<MarketingCopy>>;

export function getMarketingCopy(locale: Locale): Promise<MarketingCopy> {
  return loaders[locale]();
}
