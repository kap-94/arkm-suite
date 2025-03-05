// src/app/[lang]/settings/page.tsx
import type { Language } from "@/lib/config/i18n";
import { SettingsClient } from "./components/SettingsClient";
import { getPageDictionary, settingsDictionary } from "@/utils/dictionary";

export default async function SettingsPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const dict = await getPageDictionary(settingsDictionary, lang);

  return <SettingsClient dictionary={dict} />;
}
