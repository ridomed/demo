import type { Locale } from "@/i18n/config";
import { getDemoCredentials } from "@/lib/demo";

const labels = {
  en: { title: "Try the demo", note: "Demo version only. The login form is already filled in.", email: "Email", password: "Password", deletion: "Deletion confirmation password" },
  fr: { title: "Essayez la démo", note: "Version démo uniquement. Le formulaire de connexion est déjà rempli.", email: "E-mail", password: "Mot de passe", deletion: "Mot de passe de confirmation de suppression" },
  ar: { title: "جرّب النسخة التجريبية", note: "للنسخة التجريبية فقط. بيانات الدخول معبأة تلقائياً.", email: "البريد الإلكتروني", password: "كلمة المرور", deletion: "كلمة مرور تأكيد الحذف" },
};

export function DemoCredentials({ locale }: { locale: Locale }) {
  const demo = getDemoCredentials();
  if (!demo) return null;
  const t = labels[locale];
  return <aside className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-start text-slate-900">
    <h2 className="text-lg font-semibold">{t.title}</h2>
    <p className="mt-2 text-sm text-slate-600">{t.note}</p>
    <dl className="mt-4 grid gap-3 text-sm">
      {[[t.email, demo.email], [t.password, demo.password], [t.deletion, demo.deletePassword]].map(([label, value]) =>
        <div key={label} className="flex flex-wrap items-center justify-between gap-2">
          <dt>{label}</dt><dd><code dir="ltr" className="inline-block select-all rounded-md border border-blue-100 bg-white px-3 py-1.5">{value}</code></dd>
        </div>
      )}
    </dl>
  </aside>;
}
