import { BarChart3, Boxes, CircleDollarSign, LayoutDashboard, Package, Search, ShoppingBag, ShoppingCart, Truck, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { MarketingCopy } from "./i18n/dictionaries";
import styles from "./marketing.module.css";

export type PreviewKind = "Dashboard" | "Orders" | "Inventory" | "Purchases" | "Reports";
type PreviewProps = { copy: MarketingCopy["preview"]; locale: Locale };
const navigation = [LayoutDashboard, ShoppingCart, Boxes, Truck, BarChart3];
const kinds: PreviewKind[] = ["Dashboard", "Orders", "Inventory", "Purchases", "Reports"];
const products = [
  { sku: "ACC-001", quantity: 48, price: 35 },
  { sku: "HOM-012", quantity: 24, price: 60 },
  { sku: "STA-008", quantity: 8, price: 25 },
];
const number = (value: number, locale: Locale, decimals = 0) => new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);

export function TrendChart({ copy, locale }: PreviewProps) {
  return <div className={styles.chart} dir="ltr">
    <div className={styles.chartAxis}>{[12000,8000,4000,0].map(value => <span key={value}>{new Intl.NumberFormat(locale,{notation:"compact"}).format(value)}</span>)}</div>
    <div className={styles.chartPlot}>
      <svg viewBox="0 0 600 150" role="img" aria-label={copy.chartLabel} preserveAspectRatio="none">
        {[20, 60, 100, 140].map(y => <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#e9edf3" strokeDasharray="4 5" />)}
        <path d="M0 130 C40 130 48 108 80 115 S130 138 170 91 S210 120 260 75 S310 96 355 56 S420 84 455 40 S525 68 600 12 L600 150 L0 150 Z" fill="#eff2ff" />
        <path d="M0 130 C40 130 48 108 80 115 S130 138 170 91 S210 120 260 75 S310 96 355 56 S420 84 455 40 S525 68 600 12" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
      <div className={styles.chartDays}>{copy.days.map(d => <span key={d}>{d}</span>)}</div>
    </div>
  </div>;
}

export function ProductTable({ inventory = false, copy, locale }: PreviewProps & { inventory?: boolean }) {
  return <div className={styles.tableScroll}><table className={styles.previewTable}>
    <caption className={styles.srOnly}>{copy.records}</caption>
    <thead><tr><th>{copy.product}</th><th>{inventory ? copy.inStock : copy.quantity}</th><th>{inventory ? copy.status : copy.unitPrice}</th></tr></thead>
    <tbody>{products.map(({sku,quantity,price}, i) => <tr key={sku}>
      <td><span className={styles.productName}><span className={styles.productIcon}><Package size={17} /></span><span>{copy.products[i]}<small><bdi>{sku}</bdi></small></span></span></td>
      <td>{number(inventory ? quantity : [2, 1, 3][i],locale)}</td><td>{inventory ? <span className={i === 2 ? styles.warning : styles.success}>{i === 2 ? copy.low : copy.available}</span> : <bdi>{number(price,locale,2)} {copy.currency}</bdi>}</td>
    </tr>)}</tbody>
  </table></div>;
}

export function PosPreview({ copy, locale }: PreviewProps) {
  return <div className={styles.posGrid}>
    <div><div className={styles.searchLabel}><Search size={15} />{copy.search}</div>
      <div className={styles.posProducts}>{products.map(({sku,price},i) => <div key={sku} className={styles.posProduct}><div><ShoppingBag size={29} strokeWidth={1.3} /></div><strong>{copy.products[i]}</strong><span><bdi>{number(price,locale,2)} {copy.currency}</bdi></span></div>)}</div>
    </div>
    <div className={styles.receipt}><span className={styles.miniLabel}>{copy.currentSale}</span><h4>{copy.cart}</h4><p>{copy.products[0]}<span>× {number(2,locale)}</span></p><p>{copy.products[1]}<span>× {number(1,locale)}</span></p><div className={styles.receiptTotal}><span>{copy.total}</span><strong><bdi>{number(130,locale,2)} {copy.currency}</bdi></strong></div><span className={styles.previewAction}>{copy.checkout}<ArrowUpRight size={14} /></span></div>
  </div>;
}

export function PurchasePreview({ copy, locale }: PreviewProps) {
  return <div className={styles.purchasePreview}>
    <div className={styles.purchaseHeading}><div><span className={styles.miniLabel}>{copy.purchaseOrder} · <bdi>PO-0042</bdi></span><h4>{copy.supplier}<span className={styles.sampleTag}>{copy.sampleSupplier}</span></h4></div><span className={styles.warning}>{copy.pending}</span></div>
    <ProductTable copy={copy} locale={locale} />
    <div className={styles.purchaseFoot}><Truck size={16} /><span>{copy.receive}</span></div>
  </div>;
}

export function DashboardPreview({ kind = "Dashboard", brandName, copy, locale }: PreviewProps & { kind?: PreviewKind; brandName: string }) {
  return <div className={styles.appFrame}>
    <div className={styles.frameTop}><span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span><span><bdi>{brandName}</bdi> / {copy.workspace}</span><span className={styles.sampleTag}>{copy.sample}</span></div>
    <div className={styles.appBody}>
      <aside className={styles.appSidebar} aria-label={copy.sidebar}><span className={styles.sidebarBrand}><Boxes size={21} /><bdi>{brandName}</bdi></span><span className={styles.sidebarLabel}>{copy.workspaceLabel}</span>{kinds.map((label,i) => { const Icon = navigation[i]; return <div key={label} className={kind === label ? styles.activeSidebar : ""}><Icon size={15} />{copy.labels[i]}</div>; })}<span className={styles.sidebarBottom}>{copy.connected}</span></aside>
      <div className={styles.appContent}>
        <div className={styles.appTitle}><div><span className={styles.miniLabel}>{copy.glance}</span><h3>{kind === "Dashboard" ? copy.overview : copy.labels[kinds.indexOf(kind)]}</h3></div><span className={styles.dateChip}>{copy.week}</span></div>
        {(kind === "Dashboard" || kind === "Reports") && <>
          <div className={styles.metrics}>{[CircleDollarSign,ShoppingBag,Package].map((Icon,i) => <div key={i}><span>{copy.metrics[i]}<Icon size={15} /></span><strong><bdi>{number([24850,124,286][i],locale)}{i === 0 ? ` ${copy.currency}` : ""}</bdi></strong><small>{copy.sampleMetric}</small></div>)}</div>
          <div className={styles.chartCard}><div className={styles.panelHeading}><strong>{copy.salesOverview}</strong><span><i />{copy.sales}</span></div><TrendChart copy={copy} locale={locale} /></div>
          {kind === "Dashboard" ? <div className={styles.activity}><span className={styles.successDot} /><span>{copy.received}</span><span>{copy.movement}</span><small>{copy.activity}</small></div> : <div className={styles.reportTags}>{copy.reportTags.map(label => <span key={label}>{label}</span>)}</div>}
        </>}
        {kind === "Orders" && <div className={styles.tableScroll}><table className={styles.previewTable}><caption className={styles.srOnly}>{copy.records}</caption><thead><tr>{copy.orderColumns.map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{[130,240,375].map((total,i) => <tr key={i}><td><bdi>ORD-00{i+1}</bdi></td><td>{copy.sampleCustomer} {number(i+1,locale)}</td><td><bdi>{number(total,locale,2)} {copy.currency}</bdi></td><td><span className={styles.warning}>{copy.pending}</span></td></tr>)}</tbody></table></div>}
        {kind === "Inventory" && <><div className={styles.searchLabel}><Search size={15} />{copy.inventorySearch}</div><ProductTable copy={copy} locale={locale} inventory /><div className={styles.purchaseFoot}><Boxes size={16} />{copy.history}</div></>}
        {kind === "Purchases" && <PurchasePreview copy={copy} locale={locale} />}
      </div>
    </div>
  </div>;
}
