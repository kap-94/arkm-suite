// src/app/[lang]/dashboard/layout.tsx
import { cookies } from "next/headers";
import type { ThemeType } from "@/app/_components/Sidebar/types/sidebar.types";
import type { Language } from "@/app/_lib/config/i18n";
import {
  dashboardLayoutDictionary,
  getPageDictionary,
} from "@/app/_utils/dictionary";
import { getServerNavigation } from "../../_services/navigationService";
import { DashboardLayoutClient } from "@/app/_components/layouts/DashboardLayout/DashboardLayoutClient";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { lang: Language };
}

export default async function DashboardLayout({
  children,
  params: { lang },
}: DashboardLayoutProps) {
  const cookieStore = cookies();
  const initialTheme = (cookieStore.get("theme")?.value as ThemeType) || "dark";

  // Get header config from dictionary
  const { header } = await getPageDictionary(dashboardLayoutDictionary, lang);

  // Get dynamic navigation from service
  const { mainNavigation, bottomNavigation } = await getServerNavigation(lang);

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

  const guestUser = lang === "en" ? mockGuestUserEn : mockGuestUserEs;

  return (
    <DashboardLayoutClient
      initialTheme={initialTheme}
      header={header}
      initialNavigation={{
        mainNavigation,
        bottomNavigation,
      }}
      user={guestUser}
      lang={lang}
    >
      {children}
    </DashboardLayoutClient>
  );
}
