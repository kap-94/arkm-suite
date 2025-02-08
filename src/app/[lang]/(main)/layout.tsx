import { Language } from "@/lib/config/i18n";
import { getPageDictionary, mainLayoutDictionary } from "@/utils/dictionary";
import Header from "@/components/Header";
import { headerConfig } from "@/lib/config/header.config";

export default async function MainLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  const dictionary = await getPageDictionary(mainLayoutDictionary, lang);

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
    </main>
  );
}
