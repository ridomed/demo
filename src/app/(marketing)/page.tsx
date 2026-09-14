import { redirect } from "next/navigation";
import { getLocale } from "@/i18n/server";

export default async function MarketingEntryPage() {
  redirect(`/${await getLocale()}`);
}
