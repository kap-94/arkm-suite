import { Language } from "@/app/_lib/config/i18n";
import {
  getPageDictionary,
  mainLayoutDictionary,
} from "@/app/_utils/dictionary";
import Header from "@/app/_components/Header";
import { headerConfig } from "@/app/_lib/config/header.config";
import Footer from "@/app/_components/Footer";
import { MainLayoutDictionary } from "@/app/_types/dictionary/mainLayout.types";
import styles from "./layout.module.scss"; // Añadir estilos específicos para el layout
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

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
    <main lang={lang as Language} className="main-layout">
      <Header
        dictionary={dictionary.header}
        variant={headerConfig.settings.variant}
        appearance={headerConfig.appearance}
        breakpoint={headerConfig.settings.breakpoint}
        menuPosition={headerConfig.settings.menuPosition}
      />
      <div className={cx("main-layout__content")}>{children}</div>
      {/* <Footer
        dictionary={dictionary.footer}
        className={cx("main-layout__footer")}
      /> */}
    </main>
  );
}
