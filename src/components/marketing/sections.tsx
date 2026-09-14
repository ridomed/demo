import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, Boxes, Check, ChevronDown, ClipboardList, FileScan, History, Languages, Layers3, Package, ReceiptText, RotateCcw, ScanLine, ShieldCheck, ShoppingCart, Store, Truck, Users } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { MarketingCopy } from "./i18n/dictionaries";
import { DashboardPreview, PosPreview, ProductTable, PurchasePreview, TrendChart } from "./product-preview";
import { SectionImage } from "./section-image";
import { ProductTabs } from "./product-tabs";
import { ScannerDemo } from "./scanner-demo";
import styles from "./marketing.module.css";

type CopyProps = { copy: MarketingCopy; locale: Locale };

const outcomeIcons = [Package, ShoppingCart, Truck, BarChart3];
const trustIcons = [ShieldCheck, History, Languages, Layers3, Check];
export function TrustAndOutcomes({ copy }: CopyProps) {
  const t = copy.outcomes;
  return <>
    <div className={`${styles.container} ${styles.trustStrip}`}>{copy.trust.map((label,i) => { const Icon = trustIcons[i]; return <span key={label}><Icon size={18} />{label}</span>; })}</div>
    <section className={`${styles.container} ${styles.section}`} aria-labelledby="outcomes-title"><div className={styles.sectionIntro}><div><span className={styles.eyebrow}>{t.eyebrow}</span><h2 id="outcomes-title">{t.title}</h2></div><p>{t.intro}</p></div><SectionImage name="outcomes" alt={t.title} /><div className={styles.outcomes}>{t.items.map(([title,text],i) => { const Icon = outcomeIcons[i]; return <article key={title}><Icon size={24} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p></article>; })}</div></section>
  </>;
}

export function ProductShowcase({ brandName, copy, locale }: CopyProps & { brandName: string }) {
  const t = copy.product;
  return <section id="product" className={`${styles.section} ${styles.productSection}`} aria-labelledby="product-title"><div className={styles.container}><div className={styles.centerHeading}><span className={styles.eyebrow}>{t.eyebrow}</span><h2 id="product-title">{t.title}</h2><p>{t.description}</p></div><ProductTabs tabs={copy.tabs} label={copy.hero.explore} locale={locale} panels={(["Dashboard","Orders","Inventory","Purchases","Reports"] as const).map((kind,i) => <SectionImage key={kind} name={(["system","orders","inventory","purchases","reports"] as const)[i]} alt={copy.tabs[i].name}><DashboardPreview kind={kind} brandName={brandName} copy={copy.preview} locale={locale} /></SectionImage>)} /><aside className={styles.moreModules}><div className={styles.moreModuleIcon}><Layers3 size={26} aria-hidden="true" /></div><div className={styles.moreModuleCopy}><h3>{t.more.title}</h3><p>{t.more.description}</p><div className={styles.moduleHighlights}>{t.more.highlights.map(label => <span key={label}><Check size={13} aria-hidden="true" />{label}</span>)}</div></div><a href="#features" className={styles.moreModuleLink}>{t.more.cta}<ArrowRight size={17}/></a></aside></div></section>;
}

export function ScannerShowcase({ copy, locale }: CopyProps) {
  const t = copy.scanner;
  return <section id="ai-scanner" className={`${styles.section} ${styles.scannerSection}`} aria-labelledby="scanner-title"><div className={styles.container}><div className={styles.scannerIntro}><div><span className={styles.eyebrow}><ScanLine size={16} />{t.eyebrow}</span><h2 id="scanner-title">{t.title}</h2></div><div><p>{t.description}</p><span className={styles.humanNote}><ShieldCheck size={17} />{t.human}</span></div></div><SectionImage name="scanner" alt={t.title}><ScannerDemo copy={t} locale={locale} /></SectionImage><div className={styles.scanWorkflow}>{t.workflow.map((text,i) => <span key={text}>{text}{i < 4 && <ArrowRight size={14} />}</span>)}</div></div></section>;
}

const workflowIds = ["pos", "inventory", "purchases", "reports"] as const;
export function WorkflowShowcases({ copy, locale }: CopyProps) {
  const p = copy.preview;
  const visuals = [
    <PosPreview key="pos" copy={p} locale={locale} />,
    <div key="inventory"><ProductTable copy={p} locale={locale} inventory /><div className={styles.movementFlow}>{[Truck,ShoppingCart,RotateCcw].map((Icon,i) => <span key={i}><Icon size={16} />{p.movements[i]}</span>)}</div></div>,
    <PurchasePreview key="purchases" copy={p} locale={locale} />,
    <div key="reports"><div className={styles.panelHeading}><strong>{p.salesOverview}</strong><span>{p.weekSample}</span></div><TrendChart copy={p} locale={locale} /><div className={styles.reportTags}>{p.reports.map(label => <span key={label}>{label}</span>)}</div></div>,
  ];
  return <div className={`${styles.container} ${styles.workflows}`}>{copy.workflows.map(({eyebrow,title,text,points,caption},i) => {
    const id = workflowIds[i];
    return <section id={id} key={id} className={`${styles.splitSection} ${i%2 ? styles.reversed : ""}`} aria-labelledby={`${id}-title`}><div className={styles.splitCopy}><span className={styles.eyebrow}>{eyebrow}</span><h2 id={`${id}-title`}>{title}</h2><p>{text}</p><ul className={styles.checkList}>{points.map(point => <li key={point}><Check size={16} />{point}</li>)}</ul><Link href={id === "pos" ? "/caisse" : "/dashboard"} className={styles.textLink}>{id === "pos" ? copy.tryCaisse : copy.tryDashboard}<ArrowUpRight size={16} /></Link></div><figure className={styles.workflowVisual}><SectionImage name={id === "reports" ? "statistics" : id} alt={title}><div>{visuals[i]}</div><figcaption>{caption}</figcaption></SectionImage></figure></section>;
  })}</div>;
}

const featureIcons = [BarChart3,Package,Layers3,FileScan,ClipboardList,ShoppingCart,Boxes,History,ReceiptText,Users,ClipboardList,Truck,Truck,FileScan,RotateCcw,RotateCcw,ReceiptText,BarChart3,ShieldCheck,Store];
const featureGroups = [[5,4,8,14],[1,2,3,6,7],[9,10,11],[12,13,15,16],[0,17,18,19]];

export function FeatureGrid({ copy }: CopyProps) {
  const t = copy.features;
  return <section id="features" className={`${styles.section} ${styles.featureSection}`} aria-labelledby="features-title">
    <div className={styles.container}>
      <div className={styles.sectionIntro}><div><span className={styles.eyebrow}>{t.eyebrow}</span><h2 id="features-title">{t.title}</h2></div><p>{t.description}</p></div>
      <SectionImage name="features" alt={t.title} />
      {featureGroups.map((indices, group) => <div className={styles.featureGroup} key={t.groups[group]}>
        <h3 className={styles.featureGroupTitle}>{t.groups[group]}</h3>
        <div className={styles.featureGrid}>{indices.map(i => {
          const [title, text] = t.items[i];
          const Icon = featureIcons[i];
          return <article key={title} className={i === 5 ? styles.caisseFeature : undefined}>
            <span className={styles.featureIcon}><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
            <div><h4>{title}</h4><p>{text}</p>{i === 5 && <Link href="/caisse" className={styles.textLink}>{copy.tryCaisse}<ArrowUpRight size={16}/></Link>}</div>
          </article>;
        })}</div>
      </div>)}
    </div>
  </section>;
}

export function GettingStarted({ copy, locale }: CopyProps) {
  const t = copy.steps;
  return <section id="about" className={`${styles.container} ${styles.section}`} aria-labelledby="steps-title"><div className={styles.centerHeading}><span className={styles.eyebrow}>{t.eyebrow}</span><h2 id="steps-title">{t.title}</h2></div><SectionImage name="about" alt={t.title} /><ol className={styles.steps}>{t.items.map(([title,text],i) => <li key={title}><span>{new Intl.NumberFormat(locale,{minimumIntegerDigits:2}).format(i+1)}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><div className={styles.businessTypes}><div><Store size={23} /><h3>{t.businessTitle}</h3><p>{t.businessDescription}</p></div><div>{t.businesses.map((type, i) => { const Icon = [Store, Boxes, Package, Layers3][i]; return <span key={type}><Icon size={21} aria-hidden="true"/>{type}</span>; })}</div></div></section>;
}

export function Faq({ copy }: CopyProps) {
  const t = copy.faq;
  return <section id="faq" className={`${styles.container} ${styles.section} ${styles.faqSection}`} aria-labelledby="faq-title"><div><span className={styles.eyebrow}>{t.eyebrow}</span><h2 id="faq-title">{t.title}</h2><p>{t.description}</p><SectionImage name="faq" alt={t.title} /></div><div className={styles.accordion}>{t.items.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown size={17} /></summary><p>{a}</p></details>)}</div></section>;
}

export function FinalCta({ copy }: CopyProps) {
  const t = copy.cta;
  return <section className={styles.finalCta} aria-labelledby="cta-title"><div className={styles.container}><span className={styles.eyebrow}>{t.eyebrow}</span><h2 id="cta-title">{t.title}</h2><p>{t.description}</p><div className={styles.trialActions}><Link className={styles.primary} href="/dashboard">{copy.tryDashboard}<ArrowUpRight size={17} /></Link><Link className={styles.secondary} href="/caisse">{copy.tryCaisse}<ArrowUpRight size={17} /></Link></div><SectionImage name="cta" alt={t.title} /></div></section>;
}

export function Footer({ brand, brandName, copy, locale }: CopyProps & { brand: React.ReactNode; brandName: string }) {
  const t = copy.footer;
  return <footer className={`${styles.container} ${styles.footer}`}><div className={styles.footerMain}><div><Link className={styles.brand} href={`/${locale}`}>{brand}</Link><p>{t.description}</p></div><nav aria-label={t.productLinks}><span>{t.product}</span><a href="#product">{t.overview}</a><a href="#ai-scanner">{t.scanner}</a><a href="#features">{t.features}</a></nav><nav aria-label={t.workflowLinks}><span>{t.workflows}</span><a href="#pos">{t.pos}</a><a href="#inventory">{t.inventory}</a><a href="#purchases">{t.purchases}</a><a href="#reports">{t.reports}</a></nav><nav aria-label={t.helpLinks}><span>{t.help}</span><a href="#about">{copy.nav.links[4]}</a><a href="#faq">{t.faq}</a></nav></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} {brandName}. {t.rights}</span><span>{t.tagline}</span></div></footer>;
}

export function LanguageSupport({ copy }: CopyProps) {
  const t = copy.languageSupport;
  return <section className={styles.languageSupport} aria-labelledby="language-title"><div className={styles.languageIntro}><Languages size={28} aria-hidden="true"/><div><h2 id="language-title">{t.title}</h2><p>{t.description}</p></div></div><div className={styles.languageBadges}><span lang="ar" dir="rtl"><b>ع</b>العربية</span><span lang="fr"><b>FR</b>Français</span><span lang="en"><b>EN</b>English</span></div></section>;
}
