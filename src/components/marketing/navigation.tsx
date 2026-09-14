"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { LOCALE_COOKIE, locales, localeLabels, type Locale } from "@/i18n/config";
import type { MarketingCopy } from "./i18n/dictionaries";
import styles from "./marketing.module.css";

const hrefs = ["#product", "#features", "#pos", "#ai-scanner", "#about", "#faq"];

export function Navigation({ brand, copy, locale }: { brand: React.ReactNode; copy: MarketingCopy["nav"]; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onResize = () => { if (window.innerWidth >= 1100) setOpen(false); };
    const onPointerDown = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const marketingLinks = copy.links.map((label, i) => [label, hrefs[i]]);

  return (
    <header ref={header} className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}>
      <div className={`${styles.container} ${styles.navbar}`}>
        <Link href={`/${locale}`} className={styles.brand} aria-label={copy.home}>{brand}</Link>
        <nav className={styles.desktopNav} aria-label={copy.main}>
          {marketingLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className={styles.navActions}>
          <Link href="/dashboard" className={styles.primary}>{copy.explore} <ArrowRight size={21} /></Link>
        </div>
        <nav className={styles.languages} aria-label={copy.language}>
          {locales.map(value => <a key={value} href={`/${value}`} hrefLang={value} lang={value}
            aria-label={localeLabels[value]} aria-current={locale === value ? "page" : undefined}
            onClick={() => { document.cookie = `${LOCALE_COOKIE}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`; }}>
            {value === "ar" ? "ع" : value.toUpperCase()}
          </a>)}
        </nav>
        <button ref={trigger} className={styles.menuToggle} aria-expanded={open} aria-controls="marketing-menu"
          aria-label={open ? copy.close : copy.open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav id="marketing-menu" aria-label={copy.mobile} className={styles.mobileNav} hidden={!open}>
        {marketingLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </header>
  );
}
