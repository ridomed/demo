import type { MetadataRoute } from "next";
import { getMarketingOrigin } from "@/components/marketing/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/caisse", "/choose", "/login", "/api/"] },
    sitemap: new URL("/sitemap.xml", getMarketingOrigin()).href,
  };
}
