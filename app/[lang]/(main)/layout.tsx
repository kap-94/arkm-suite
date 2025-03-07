import { Language } from "@/app/_lib/config/i18n";
import {
  getPageDictionary,
  mainLayoutDictionary,
} from "@/app/_utils/dictionary";
import Header from "@/app/_components/Header";
import { headerConfig } from "@/app/_lib/config/header.config";
import { Footer } from "@/app/_components/Footer";
import { MainLayoutDictionary } from "@/app/_types/dictionary/mainLayout.types";

export default async function MainLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  const dictionary = await getPageDictionary<MainLayoutDictionary>(
    mainLayoutDictionary,
    lang
  );

  return (
    <main lang={lang as Language}>
      <Header
        dictionary={dictionary.header}
        variant={headerConfig.settings.variant}
        appearance={headerConfig.appearance}
        breakpoint={headerConfig.settings.breakpoint}
        menuPosition={headerConfig.settings.menuPosition}
      />
      {children}
      <Footer dictionary={dictionary.footer} />
    </main>
  );
}
