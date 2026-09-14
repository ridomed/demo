import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./marketing.module.css";

export type MarketingImageName = "statistics" | "system" | "orders" | "pos" | "inventory" | "purchases" | "reports" | "scanner" | "outcomes" | "features" | "about" | "faq" | "cta";

/** Missing optional screenshots retain the existing section visual. */
export function SectionImage({ name, alt, children }: { name: MarketingImageName; alt: string; children?: ReactNode }) {
  if (!existsSync(path.join(process.cwd(), "public", "marketing", `${name}.png`))) return <>{children}</>;
  return <Image src={`/marketing/${name}.png`} alt={alt} width={1833} height={957} sizes="(max-width: 767px) 100vw, 75vw" className={styles.sectionScreenshot} />;
}
