// src/app/[lang]/settings/page.tsx
import { getMultipleDictionaries } from "@/utils/getDictionary";
import type { Language } from "@/config/i18n";
import { SettingsClient } from "./components/SettingsClient";

// Server Component que solo obtiene los datos
export default async function SettingsPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const { settings } = await getMultipleDictionaries(lang, [
    "settings",
    "common",
  ]);

  return <SettingsClient settings={settings} />;
}
