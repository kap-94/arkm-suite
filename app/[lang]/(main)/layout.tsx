import { Language } from "../../_lib/config/i18n";
import {
  getPageDictionary,
  mainLayoutDictionary,
} from "../../_utils/dictionary";
import Header from "../../_components/Header";
import { headerConfig } from "../../_lib/config/header.config";
import { Footer } from "../../_components/Footer";
import { MainLayoutDictionary } from "../../_types/dictionary/mainLayout.types";

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
