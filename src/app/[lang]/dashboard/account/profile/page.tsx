import type { Language } from "@/config/i18n";
import { ProfileClient } from "./ProfileClient";
import { getPageDictionary, profileDictionary } from "@/utils/dictionary";

// Server Component that fetches data
export default async function ProfilePage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const profile = await getPageDictionary(profileDictionary, lang);

  return <ProfileClient dictionary={profile} />;
}
