import { FreeTrial, Technologies, FloatingWhatsApp } from "@/components/marketing/trial-and-technology";
import { DemoCredentials } from "@/components/shared/demo-credentials";
import { getDemoCredentials } from "@/lib/demo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { marketingBrand } from "@/components/marketing/branding";
import { isLocale, localeDirection } from "@/i18n/config";
import { Navigation } from "@/components/marketing/navigation";
import { getMarketingCopy } from "@/components/marketing/i18n/dictionaries";
import { marketingMetadata, marketingStructuredData } from "@/components/marketing/seo";
import { ReferenceHero } from "@/components/marketing/reference-hero";
import { LanguageSupport, TrustAndOutcomes, ProductShowcase, ScannerShowcase, WorkflowShowcases, FeatureGrid, GettingStarted, Faq, FinalCta, Footer } from "@/components/marketing/sections";
import styles from "@/components/marketing/marketing.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getMarketingCopy(locale);
  return marketingMetadata(locale, marketingBrand.name, copy);
}

export default async function MarketingPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getMarketingCopy(locale);
  const appName = marketingBrand.name;
  const brand = <><Image src={marketingBrand.icon} alt={marketingBrand.shortName} width={40} height={40} sizes="88px" className={styles.brandLogo} /><span><bdi>{appName}<span className={styles.brandDot}>.</span></bdi></span></>;
  const props = { locale, copy };
  return <div className={styles.marketing} lang={locale} dir={localeDirection[locale]}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(marketingStructuredData(locale,appName,copy)).replace(/</g, "\\u003c") }} />
    <a href="#main-content" className={styles.skipLink}>{copy.skip}</a>
    <Navigation brand={brand} copy={copy.nav} locale={locale} />
    <main id="main-content" tabIndex={-1}>
      <ReferenceHero {...props} />
      {getDemoCredentials() && <div className={styles.container}><DemoCredentials locale={locale} /></div>}
      <div className={styles.container}><LanguageSupport {...props} /></div>
      <TrustAndOutcomes {...props} />
      <ProductShowcase brandName={appName} {...props} />
      <ScannerShowcase {...props} />
      <WorkflowShowcases {...props} />
      <FeatureGrid {...props} />
      <GettingStarted {...props} />
      <div className={styles.container}><FreeTrial locale={locale} /><Technologies locale={locale} /></div>
      <Faq {...props} />
      <FinalCta {...props} />
    </main>
    <FloatingWhatsApp locale={locale} />
    <Footer brand={brand} brandName={appName} {...props} />
  </div>;
}
