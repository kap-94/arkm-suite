// src/app/[lang]/dashboard/layout.tsx
import { cookies } from "next/headers";
import type { ThemeType } from "@/components/Sidebar/types/sidebar.types";

import type { Language } from "@/config/i18n";
import {
  dashboardLayoutDictionary,
  getPageDictionary,
} from "@/utils/dictionary";
import { DashboardLayoutClient } from "./_components/DashboardLayoutClient";

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

  const { navigation, header } = await getPageDictionary(
    dashboardLayoutDictionary,
    lang
  );

  return (
    <DashboardLayoutClient
      initialTheme={initialTheme}
      header={header}
      navigation={navigation}
    >
      {children}
    </DashboardLayoutClient>
  );
}
