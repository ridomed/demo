import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Boxes,
  Check,
  ChevronDown,
  FileScan,
  FileText,
  LayoutDashboard,
  Package,
  Play,
  ReceiptText,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { MarketingCopy } from "./i18n/dictionaries";
import { marketingBrand } from "./branding";
import { TrendChart } from "./product-preview";
import styles from "./reference-hero.module.css";

type Props = { copy: MarketingCopy; locale: Locale };
const featureIcons = [
  ShoppingCart,
  Boxes,
  Truck,
  ReceiptText,
  BarChart3,
  Users,
];

/** Temporary, illustrative product UI. Set systemPreviewImage to replace it. */
function TemporarySystemPreview({ copy, locale }: Props) {
  const p = copy.preview;
  const t = copy.heroVisual;
  const navIcons = [
    LayoutDashboard,
    ShoppingCart,
    Boxes,
    Truck,
    BarChart3,
    Users,
    ReceiptText,
    RotateCcw,
    ShieldCheck,
    Settings,
  ];
  const labels = [
    ...p.labels,
    copy.features.items[9][0],
    copy.features.items[2][0],
    copy.features.items[6][0],
    copy.features.items[8][0],
    copy.features.items[7][0],
  ];
  const metricIcons = [ReceiptText, ShoppingCart, Package, Truck];
  const metrics = [...p.metrics, copy.footer.purchases];
  const number = (value: number) => new Intl.NumberFormat(locale).format(value);
  return (
    <div className={styles.systemPreview}>
      <div className={styles.systemTop}>
        <Image src={marketingBrand.icon} alt="" width={36} height={36} />
        <div className={styles.systemSearch}>
          <Search size={13} />
          {p.search}
        </div>
        <Bell size={16} />
        <span className={styles.avatar}>STM</span>
        <div className={styles.systemAccount}>
          <bdi>{marketingBrand.name}</bdi>
          <small>{p.sampleMetric}</small>
        </div>
        <ChevronDown size={11} />
      </div>
      <div className={styles.systemBody}>
        <aside className={styles.systemSidebar} aria-hidden="true">
          {labels.map((label, i) => {
            const Icon = navIcons[i];
            return (
              <span key={i} data-active={i === 0}>
                <Icon size={13} />
                {label}
              </span>
            );
          })}
        </aside>
        <div className={styles.systemContent}>
          <div className={styles.systemHeading}>
            <div>
              <h3>{p.labels[0]}</h3>
              <p>{copy.product.description}</p>
            </div>
            <span>
              {p.week}
              <ChevronDown size={10} />
            </span>
          </div>
          <div className={styles.systemMetrics}>
            {metrics.map((label, i) => {
              const Icon = metricIcons[i];
              return (
                <div key={label}>
                  <span className={styles.metricIcon}>
                    <Icon size={17} />
                  </span>
                  <div>
                    <span>{label}</span>
                    <strong>
                      <bdi>
                        {number([24850, 124, 286, 36150][i])}
                        {i === 0 || i === 3 ? ` ${p.currency}` : ""}
                      </bdi>
                    </strong>
                    <small>{p.sampleMetric}</small>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.systemPanels}>
            <div className={styles.systemChart}>
              <h4>
                {p.salesOverview}
                <span>{p.week}</span>
              </h4>
              <TrendChart copy={p} locale={locale} />
            </div>
            <div className={styles.systemActivity}>
              <h4>{t.activity}</h4>
              {[ReceiptText, Truck, Package, Users, FileText].map((Icon, i) => (
                <div key={i}>
                  <span>
                    <Icon size={15} />
                  </span>
                  <p>
                    {t.activities[i]}
                    <small>{p.activity}</small>
                  </p>
                  <Check size={12} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceFlow({ copy, locale }: Props) {
  const t = copy.heroVisual;
  const s = copy.scanner;
  const number = (n: number) => new Intl.NumberFormat(locale).format(n);
  return (
    <div className={styles.invoiceFlow}>
      <div className={styles.paper}>
        <div className={styles.paperHead}>
          <span className={styles.paperLines}>
            <i />
            <i />
          </span>
          <span>{t.supplierInvoice}</span>
        </div>
        <strong className={styles.pdf}>PDF</strong>
        <div className={styles.paperLines}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.paperTable}>
          <span>{s.columns[0]}</span>
          <span>{s.columns[1]}</span>
          <span>{s.columns[2]}</span>
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
      <svg
        className={styles.firstArrow}
        viewBox="0 0 110 55"
        aria-hidden="true"
      >
        <path
          d="M3 29Q60 6 100 37M86 19L102 38L80 42"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />
      </svg>
      <div className={styles.scannerCard}>
        <span className={styles.scanIllustration}>
          <Sparkles size={30} />
          <FileScan size={48} />
        </span>
        <h3>{copy.footer.scanner}</h3>
        <p>{t.scannerDescription}</p>
        <div className={styles.progress}>
          <span />
        </div>
        <div className={styles.progressText}>
          <span>{t.extraction}</span>
          <span>{number(70)}%</span>
        </div>
      </div>
      <ArrowRight className={styles.secondArrow} size={32} />
      <div className={styles.extractedCard}>
        <table>
          <caption>{s.caption}</caption>
          <thead>
            <tr>
              {s.columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.products.map((product, i) => (
              <tr key={product}>
                <td>{product}</td>
                <td>{number([12, 6, 4, 3][i])}</td>
                <td>
                  <bdi>
                    {number([89, 45, 38, 52][i])} {s.currency}
                  </bdi>
                </td>
                <td>
                  <span data-review={i === 2}>
                    {i === 2 ? <Sparkles size={10} /> : <Check size={10} />}
                    {i === 2 ? s.review : s.matched}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.handNote}>
        <span>{t.annotation}</span>
        <svg viewBox="0 0 80 36" aria-hidden="true">
          <path
            d="M75 3Q34 39 7 18M21 13L7 18L16 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function ReferenceHero({ copy, locale }: Props) {
  const t = copy.hero;
  return (
    <div className={styles.heroScene}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <div className={styles.pill}>
            <span />
            {t.eyebrow}
          </div>
          <h1 id="hero-title">
            {t.title}
            <span>{t.accent}</span>
          </h1>
          <p className={styles.description}>
            {t.intro}
            <br />
            {t.description}
          </p>
          <div className={styles.actions}>
            <Link href="/dashboard" className={styles.getStarted}>
              {copy.tryDashboard}
              <ArrowRight size={23} />
            </Link>
            <Link href="/caisse" className={styles.demo}>
              <span>
                <Play size={13} fill="currentColor" />
              </span>
              {copy.tryCaisse}
            </Link>
          </div>
          <ul className={styles.checks}>
            {copy.heroVisual.checks.map((text) => (
              <li key={text}>
                <Check size={17} />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <figure
          className={styles.device}
          data-screenshot={Boolean(marketingBrand.systemPreviewImage)}
        >
          <div className={styles.deviceFrame}>
            {marketingBrand.systemPreviewImage ? (
              <Image
                src={marketingBrand.systemPreviewImage}
                alt={copy.heroVisual.systemImageAlt}
                width={1833}
                height={957}
                sizes="(max-width: 900px) 95vw, 60vw"
                className={styles.systemImage}
              />
            ) : (
              <TemporarySystemPreview copy={copy} locale={locale} />
            )}
          </div>
          {!marketingBrand.systemPreviewImage && (
            <figcaption>{copy.hero.sample}</figcaption>
          )}
        </figure>
        <InvoiceFlow copy={copy} locale={locale} />
      </section>
      <nav
        className={styles.featureRail}
        aria-label={copy.footer.workflowLinks}
      >
        {copy.heroVisual.features.map(([title, description], i) => {
          const Icon = featureIcons[i];
          const href = [
            "#pos",
            "#inventory",
            "#purchases",
            "#features",
            "#reports",
            "#features",
          ][i];
          return (
            <a href={href} key={title}>
              <span>
                <Icon size={28} strokeWidth={1.8} />
              </span>
              <div>
                <strong>{title}</strong>
                <small>{description}</small>
              </div>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
