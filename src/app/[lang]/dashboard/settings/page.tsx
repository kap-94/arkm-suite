// src/app/[lang]/settings/page.tsx
import { getMultipleDictionaries } from "@/utils/getDictionary";
import type { Language } from "@/config/i18n";
import { SettingsClient } from "./components/SettingsClient";
import { getPageDictionary, settingsDictionary } from "@/utils/dictionary";

// Server Component que solo obtiene los datos
export default async function SettingsPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  // const { settings } = await getMultipleDictionaries(lang, [
  //   "settings",
  //   "common",
  // ]);

  const [dict] = await Promise.all([
    getPageDictionary(settingsDictionary, lang),
  ]);

  return <SettingsClient dictionary={dict} />;
}
