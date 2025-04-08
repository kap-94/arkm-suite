// src/app/[lang]/auth/layout.tsx
import { MainLayoutDictionary } from "@/app/_types/dictionary/mainLayout.types";
import {
  getPageDictionary,
  mainLayoutDictionary,
} from "@/app/_utils/dictionary";
import { headerConfig } from "@/app/_lib/config/header.config";
import Header from "@/app/_components/Header";
import { Language } from "@/app/_lib/config/i18n";

export default async function AuthLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Obtener el diccionario para el header
  const dictionary = await getPageDictionary<MainLayoutDictionary>(
    mainLayoutDictionary,
    lang as Language
  );

  return (
    <>
      <Header
        dictionary={dictionary.header}
        variant={headerConfig.settings.variant}
        appearance={headerConfig.appearance}
        breakpoint={headerConfig.settings.breakpoint}
        menuPosition={headerConfig.settings.menuPosition}
      />
      <main>{children}</main>
    </>
  );
}
