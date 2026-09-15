import type { Locale } from "@/i18n/config";
import { getDemoCredentials } from "@/lib/demo";
import { DemoCredentialsCard } from "./demo-credentials-card";

export function DemoCredentials({ locale, wide = false }: { locale: Locale; wide?: boolean }) {
  const demo = getDemoCredentials();
  if (!demo) return null;
  return <DemoCredentialsCard locale={locale} demo={demo} wide={wide} />;
}
