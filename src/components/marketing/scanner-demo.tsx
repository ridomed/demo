"use client";

import { useState } from "react";
import { ArrowRight, Check, FileText, ScanLine, RotateCcw } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { MarketingCopy } from "./i18n/dictionaries";
import styles from "./marketing.module.css";

export function ScannerDemo({ copy, locale }: { copy: MarketingCopy["scanner"]; locale: Locale }) {
  const [stage, setStage] = useState(0);
  const number = (value: number, decimals = 0) => new Intl.NumberFormat(locale,{minimumFractionDigits:decimals,maximumFractionDigits:decimals}).format(value);
  return <div className={styles.scannerDemo}>
    <div className={styles.scannerTop}><span><ScanLine size={16} />{copy.name}</span><span>{copy.sample}</span></div>
    <ol className={styles.scanSteps}>{copy.stages.map((name,i) => <li key={name} aria-current={stage === i ? "step" : undefined} data-done={i < stage}><span>{i < stage ? <Check size={12} /> : number(i+1)}</span>{name}</li>)}</ol>
    <div className={styles.scanDocument}><FileText size={28} strokeWidth={1.5} /><div><strong><bdi>{copy.file}</bdi></strong><span>{copy.supplier}</span></div><span className={styles.fileBadge}>PDF</span></div>
    <div className={styles.scanResult} aria-live="polite" aria-atomic="true">
      <div className={styles.scanMessage}><span className={styles.successDot} />{copy.messages[stage]}</div>
      {stage === 0 ? <div className={styles.paperLines} aria-hidden="true"><i /><i /><i /><i /></div> : <div className={styles.tableScroll}><table className={styles.previewTable}>
        <caption className={styles.srOnly}>{copy.caption}</caption>
        <thead><tr>{copy.columns.slice(0,stage >= 2 ? 4 : 3).map(column => <th key={column}>{column}</th>)}</tr></thead>
        <tbody>{copy.products.map((product,i) => <tr key={product}><td>{product}</td><td>{number([12,24][i])}</td><td><bdi>{number([20,38][i],2)} {copy.currency}</bdi></td>{stage >= 2 && <td><span className={i === 0 ? styles.success : styles.warning}>{i === 0 ? copy.matched : copy.review}</span></td>}</tr>)}</tbody>
      </table></div>}
    </div>
    <div className={styles.scanBottom}><p>{stage === 3 ? copy.safe : copy.control}</p><button className={styles.primary} onClick={() => setStage((stage+1)%4)}>{copy.buttons[stage]}{stage === 3 ? <RotateCcw size={15} /> : <ArrowRight size={15} />}</button></div>
  </div>;
}
