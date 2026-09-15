"use client";

import { useState } from "react";
import { Check, Copy, KeyRound, Mail, ShieldCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";
import styles from "./demo-credentials.module.css";

const labels = {
  en: {
    badge: "PUBLIC DEMO",
    title: "Everything you need to try sytemano.",
    note: "Use these demo credentials to explore the dashboard and caisse. The login form is already filled in.",
    email: "Login email",
    password: "Login password",
    deletion: "Deletion password",
    help: "Enter 3956 when the demo asks you to confirm a deletion.",
    copy: "Copy",
    copied: "Copied",
    failed: "Copy unavailable. Select the value and copy it manually.",
  },
  fr: {
    badge: "DÉMO PUBLIQUE",
    title: "Tout pour essayer sytemano.",
    note: "Utilisez ces identifiants de démonstration pour explorer le tableau de bord et la caisse. Le formulaire de connexion est déjà rempli.",
    email: "E-mail de connexion",
    password: "Mot de passe de connexion",
    deletion: "Mot de passe de suppression",
    help: "Saisissez 3956 lorsque la démo demande de confirmer une suppression.",
    copy: "Copier",
    copied: "Copié",
    failed:
      "Copie indisponible. Sélectionnez la valeur et copiez-la manuellement.",
  },
  ar: {
    badge: "نسخة تجريبية عامة",
    title: "كل ما تحتاجه لتجربة sytemano.",
    note: "استخدم هذه البيانات لاستكشاف لوحة التحكم والصندوق. بيانات الدخول معبأة تلقائياً في صفحة تسجيل الدخول.",
    email: "البريد الإلكتروني للدخول",
    password: "كلمة مرور الدخول",
    deletion: "كلمة مرور الحذف",
    help: "أدخل 3956 عندما تطلب النسخة التجريبية تأكيد عملية الحذف.",
    copy: "نسخ",
    copied: "تم النسخ",
    failed: "النسخ غير متاح. حدّد القيمة وانسخها يدوياً.",
  },
};

export function DemoCredentialsCard({
  locale,
  demo,
  wide,
}: {
  locale: Locale;
  demo: { email: string; password: string; deletePassword: string };
  wide: boolean;
}) {
  const t = labels[locale];
  const [copied, setCopied] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const fields = [
    { key: "email", label: t.email, value: demo.email, icon: Mail },
    {
      key: "password",
      label: t.password,
      value: demo.password,
      icon: KeyRound,
    },
    {
      key: "delete",
      label: t.deletion,
      value: demo.deletePassword,
      icon: ShieldCheck,
    },
  ];
  async function copyValue(key: string, value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setMessage(`${label}: ${t.copied}`);
    } catch {
      setCopied(null);
      setMessage(t.failed);
    }
  }
  return (
    <aside
      id="demo-credentials"
      className={`${styles.card} ${wide ? styles.wide : ""}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <header className={styles.header}>
        <h2>{t.title}</h2>
        <p>{t.note}</p>
      </header>
      <dl className={styles.fields}>
        {fields.map(({ key, label, value, icon: Icon }) => (
          <div key={key} className={styles.field}>
            <dt>
              <Icon size={18} aria-hidden="true" />
              {label}
            </dt>
            {key === "delete" && (
              <dd className={styles.variable}>
                <code dir="ltr">DELETE_CONFIRM_PASSWORD</code>
              </dd>
            )}
            <dd className={styles.value}>
              <code dir="ltr">{value}</code>
              <button
                type="button"
                onClick={() => copyValue(key, value, label)}
                aria-label={`${t.copy}: ${label}`}
                title={t.copy}
              >
                {copied === key ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </dd>
          </div>
        ))}
      </dl>
      <p className={styles.help}>
        <ShieldCheck size={16} aria-hidden="true" />
        {t.help}
      </p>
      <p className={styles.status} role="status" aria-live="polite">
        {message}
      </p>
    </aside>
  );
}
