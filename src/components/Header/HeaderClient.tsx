import React from "react";
import classnames from "classnames/bind";
import { useHeaderScroll } from "./hooks";
import { useLanguage } from "@/context/LanguageContext";
import { useUIContext } from "@/context/UIContext";
import { Header } from "./Header";
import { HeaderContext } from "./context";
import { Brand } from "./components";
import { NavMenu } from "./components/NavMenu";
import { HeaderProps, HeaderState } from "./types/header.types";
import { DEFAULT_HEADER_CONFIG } from "./types/header.types";
import styles from "./styles/Header.module.scss";
import LanguageSelector from "../LanguageSelector";
import { Button } from "../Button";
import { Users2 } from "lucide-react";

const cx = classnames.bind(styles);

const HeaderClient: React.FC<HeaderProps> = ({
  items,
  variant = DEFAULT_HEADER_CONFIG.variant,
  appearance = DEFAULT_HEADER_CONFIG.appearance,
  breakpoint = DEFAULT_HEADER_CONFIG.breakpoint,
  menuPosition = DEFAULT_HEADER_CONFIG.menuPosition,
  languageConfig = DEFAULT_HEADER_CONFIG.languageConfig,
  className,
}) => {
  const { onCursor } = useUIContext();
  const { t, language, setLanguage } = useLanguage();
  const isScrolled = useHeaderScroll(appearance?.height ?? 50);
  const [menuState, setMenuState] = React.useState<HeaderState>({
    isNavOpen: false,
    isMobileMenuOpen: false,
  });

  const setIsNavOpen = (isOpen: boolean) =>
    setMenuState((prev) => ({ ...prev, isNavOpen: isOpen }));

  const contextValue = React.useMemo(
    () => ({
      items,
      variant,
      appearance,
      breakpoint,
      menuPosition,
      languageConfig: {
        ...languageConfig,
        currentLanguage: language,
        onLanguageChange: setLanguage,
      },
      isScrolled,
      isNavOpen: menuState.isNavOpen,
      setIsNavOpen,
      isMobileMenuOpen: false,
      setIsMobileMenuOpen: () => {},
      onCursor,
      language,
      setLanguage,
    }),
    [
      items,
      variant,
      appearance,
      breakpoint,
      menuPosition,
      languageConfig,
      isScrolled,
      menuState.isNavOpen,
      onCursor,
      language,
      setLanguage,
    ]
  );

  React.useEffect(() => {
    document.body.style.overflow = menuState.isNavOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuState.isNavOpen]);

  if (!items?.length) return null;

  return (
    <HeaderContext.Provider value={contextValue}>
      <Header.Root
        className={cx(
          "header",
          {
            "header--glass": menuState.isNavOpen,
            "header--scrolled": isScrolled,
          },
          className
        )}
      >
        <Header.Content>
          <Header.Nav>
            <Brand
            // variant="double-border"
            />
            <div className={cx("header__actions-group")}>
              <Button
                variant="secondary"
                href="/dashboard"
                icon={<Users2 size={16} />}
                className={cx("header__portal-button")}
              >
                {t("navigation.clientSuite")}
              </Button>
              <Header.MenuToggle />
              <div className={cx("header__divider")} />
              <LanguageSelector
                className={cx("header__language-selector")}
                variant={languageConfig.variant || "split-line"}
                currentLanguage={languageConfig.currentLanguage || language}
                onLanguageChange={
                  languageConfig.onLanguageChange || setLanguage
                }
              />
            </div>
          </Header.Nav>
        </Header.Content>

        <NavMenu
          items={items}
          isOpen={menuState.isNavOpen}
          onClose={() => setIsNavOpen(false)}
          onCursor={onCursor}
        />
      </Header.Root>
    </HeaderContext.Provider>
  );
};

export default HeaderClient;
