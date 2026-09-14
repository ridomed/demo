import Link from "next/link";
import { ArrowUpRight, Check, Code2, Database, Layers3, Palette, ShieldCheck, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import styles from "./trial-and-technology.module.css";

const copy = {
  en: { badge: "FOR INDIVIDUALS & COMPANIES", title: "Your business. Your team. Try it for free.", text: "Explore sytemano for 10 days and see how it fits your daily work. Contact us to request your trial.", days: "days free", points: ["Explore the dashboard", "Try the caisse", "Discover connected inventory"], contact: "Request your free trial", demo: "Explore the demo", chat: "Chat on WhatsApp", message: "Hello, I would like to request a 10-day free trial of sytemano for myself or my company.", techBadge: "BEHIND SYTEMANO", techTitle: "Built with modern technology.", techText: "The technologies powering your workspace, from the interface to your business data.", tech: ["Application & navigation", "Interactive interfaces", "Typed application code", "Responsive design", "Business database", "Database access", "Account authentication", "Invoice extraction"] },
  fr: { badge: "POUR LES PARTICULIERS ET LES ENTREPRISES", title: "Votre activité. Votre équipe. Essayez gratuitement.", text: "Explorez sytemano pendant 10 jours et découvrez comment il s’intègre à votre quotidien. Contactez-nous pour demander votre essai.", days: "jours gratuits", points: ["Explorez le tableau de bord", "Testez la caisse", "Découvrez le stock connecté"], contact: "Demander mon essai gratuit", demo: "Explorer la démo", chat: "Discuter sur WhatsApp", message: "Bonjour, je souhaite demander un essai gratuit de 10 jours de sytemano pour moi ou mon entreprise.", techBadge: "LES TECHNOLOGIES DE SYTEMANO", techTitle: "Des technologies modernes à votre service.", techText: "Les technologies qui font fonctionner votre espace de travail, de l’interface aux données de votre activité.", tech: ["Application et navigation", "Interfaces interactives", "Code applicatif typé", "Design responsive", "Base de données métier", "Accès aux données", "Authentification", "Extraction de factures"] },
  ar: { badge: "للأفراد والشركات", title: "أعمالك وفريقك. جرّب النظام مجاناً.", text: "اكتشف sytemano لمدة 10 أيام وتعرّف على كيفية استخدامه في أعمالك اليومية. تواصل معنا لطلب تجربتك المجانية.", days: "أيام مجاناً", points: ["استكشف لوحة التحكم", "جرّب الصندوق", "اكتشف إدارة المخزون المتصلة"], contact: "اطلب تجربتك المجانية", demo: "استكشف النسخة التجريبية", chat: "تواصل عبر واتساب", message: "مرحباً، أود طلب تجربة مجانية لمدة 10 أيام لنظام sytemano لي أو لشركتي.", techBadge: "التقنيات وراء SYTEMANO", techTitle: "مبني بتقنيات حديثة.", techText: "التقنيات التي تشغّل مساحة عملك، من واجهة الاستخدام إلى بيانات أعمالك.", tech: ["التطبيق والتنقل", "واجهات تفاعلية", "كود برمجي محدد الأنواع", "تصميم متجاوب", "قاعدة بيانات الأعمال", "الوصول إلى البيانات", "تسجيل الدخول والتحقق", "استخراج بيانات الفواتير"] },
};

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" width="25" height="25" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.26-1.64a11.95 11.95 0 0 0 5.77 1.47h.01C18.63 23.83 24 18.48 24 11.9c0-3.19-1.24-6.18-3.48-8.42ZM12.04 21.8a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.9 9.9 0 0 1-1.52-5.25c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91A9.85 9.85 0 0 1 22 11.91c0 5.46-4.47 9.89-9.96 9.89Zm5.44-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>;
}

function contactUrl(locale: Locale) {
  const phone = (process.env.WHATSAPP_NUMBER ?? "212714922577").replace(/\D/g, "");
  return phone && /^[1-9]\d{7,14}$/.test(phone) ? `https://wa.me/${phone}?text=${encodeURIComponent(copy[locale].message)}` : null;
}

export function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const href = contactUrl(locale);
  if (!href) return null;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={styles.floating} aria-label={copy[locale].chat}><WhatsAppIcon/><span>{copy[locale].chat}</span></a>;
}

export function FreeTrial({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const href = contactUrl(locale);
  return <section id="free-trial" className={styles.trial} aria-labelledby="trial-title"><div className={styles.trialCopy}><span className={styles.eyebrow}>{t.badge}</span><h2 id="trial-title">{t.title}</h2><p>{t.text}</p><ul>{t.points.map(point => <li key={point}><Check size={16}/>{point}</li>)}</ul><div className={styles.actions}>{href && <a className={styles.contact} href={href} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/>{t.contact}</a>}<Link href="/dashboard" className={styles.demo}>{t.demo}<ArrowUpRight size={18}/></Link></div></div><div className={styles.trialNumber}><Sparkles size={25}/><strong>10</strong><span>{t.days}</span></div></section>;
}

const technologies = [
  { name: "Next.js", icon: Layers3 }, { name: "React", icon: Code2 },
  { name: "TypeScript", icon: Code2 }, { name: "Tailwind CSS", icon: Palette },
  { name: "PostgreSQL", icon: Database }, { name: "Prisma", icon: Database },
  { name: "Auth.js", icon: ShieldCheck }, { name: "DeepSeek", icon: Sparkles },
];
export function Technologies({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <section className={styles.technologies} aria-labelledby="technology-title"><header><span className={styles.eyebrow}>{t.techBadge}</span><h2 id="technology-title">{t.techTitle}</h2><p>{t.techText}</p></header><div className={styles.techGrid}>{technologies.map(({ name, icon: Icon }, i) => <article key={name}><Icon size={24} aria-hidden="true"/><h3>{name}</h3><p>{t.tech[i]}</p></article>)}</div></section>;
}
