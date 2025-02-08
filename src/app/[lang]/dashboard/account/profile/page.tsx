import type { Language } from "@/lib/config/i18n";
import { ProfileClient } from "./ProfileClient";
import { getPageDictionary, profileDictionary } from "@/utils/dictionary";

// Server Component that fetches data
export default async function ProfilePage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const profile = await getPageDictionary(profileDictionary, lang);
  const mockGuestUserEn = {
    fullName: "Guest User",
    email: "guest@example.com",
    role: "Product Owner",
    nationality: "International",
    nationalID: "GUEST-000",
    countryFlag: "https://flagcdn.com/un.svg",
    profileImage: "/guest-avatar.png",
  };

  const mockGuestUserEs = {
    fullName: "Usuario Invitado",
    email: "invitado@example.com",
    role: "Propietario del producto",
    nationality: "Internacional",
    nationalID: "INVITADO-000",
    countryFlag: "https://flagcdn.com/un.svg",
    profileImage: "/guest-avatar.png",
  };

  let guestUser = lang === "en" ? mockGuestUserEn : mockGuestUserEs;

  return <ProfileClient dictionary={profile} user={guestUser} />;
}
