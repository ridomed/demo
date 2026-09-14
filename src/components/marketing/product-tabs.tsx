"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { MarketingCopy } from "./i18n/dictionaries";
import styles from "./marketing.module.css";

export function ProductTabs({ panels, tabs, label, locale }: { panels: ReactNode[]; tabs: MarketingCopy["tabs"]; label: string; locale: Locale }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  return <>
    <div className={styles.tabs} role="tablist" aria-label={label}>
      {tabs.map((tab,i) => <button key={tab.name} ref={el => { refs.current[i] = el; }} id={`product-tab-${i}`} role="tab" aria-selected={active === i} aria-controls={`product-panel-${i}`} tabIndex={active === i ? 0 : -1}
        onClick={() => setActive(i)} onKeyDown={e => {
          let next = i;
          if (e.key === "ArrowRight") next = (i + (locale === "ar" ? tabs.length-1 : 1))%tabs.length;
          else if (e.key === "ArrowLeft") next = (i + (locale === "ar" ? 1 : tabs.length-1))%tabs.length;
          else if (e.key === "Home") next = 0;
          else if (e.key === "End") next = tabs.length-1;
          else return;
          e.preventDefault(); setActive(next); refs.current[next]?.focus();
        }}>{tab.name}<ArrowUpRight size={14} /></button>)}
    </div>
    {tabs.map((tab,i) => <div key={tab.name} role="tabpanel" id={`product-panel-${i}`} aria-labelledby={`product-tab-${i}`} hidden={active !== i} tabIndex={0} className={styles.tabPanel}>
      <div className={styles.tabDescription}><p>{tab.text}</p><ul>{tab.benefits.map(b => <li key={b}><Check size={14} />{b}</li>)}</ul></div>
      {panels[i]}
    </div>)}
  </>;
}
