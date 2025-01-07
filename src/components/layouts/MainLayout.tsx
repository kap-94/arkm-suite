// components/layouts/MainLayout.tsx
"use client";

import { Language } from "@/config/i18n";
import { headerConfig } from "@/config/header.config";
import { useLanguage } from "@/context/LanguageContext";
import { UIProvider } from "@/context/UIContext";
import Header from "@/components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
  lang: Language;
}

export function MainLayout({ children, lang }: MainLayoutProps) {
  const { t, language, setLanguage } = useLanguage();

  const navigationItems = headerConfig.navigation.map((item) => ({
    ...item,
    text: t(item.translationKey),
  }));

  return (
    <UIProvider>
      <Header
        items={navigationItems}
        variant={headerConfig.settings.variant}
        appearance={headerConfig.appearance}
        breakpoint={headerConfig.settings.breakpoint}
        menuPosition={headerConfig.settings.menuPosition}
        languageConfig={{
          ...headerConfig.language,
          currentLanguage: language,
          onLanguageChange: setLanguage,
        }}
      />
      {children}
    </UIProvider>
  );
}
