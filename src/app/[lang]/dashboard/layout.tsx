// src/app/[lang]/dashboard/layout.tsx
import { cookies } from "next/headers";
import type { ThemeType } from "@/components/Sidebar/types/sidebar.types";
import { DashboardContent } from "./DashboardContent";
import { getMultipleDictionaries } from "@/utils/getDictionary";
import type { Language } from "@/config/i18n";

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

  const { search, userInfo, navigation } = await getMultipleDictionaries(lang, [
    "search",
    "userInfo",
    "navigation",
  ]);

  return (
    <DashboardContent
      initialTheme={initialTheme}
      search={search}
      userInfo={userInfo}
      navigation={navigation}
    >
      {children}
    </DashboardContent>
  );
}
