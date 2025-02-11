"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Users2 } from "lucide-react";
import classnames from "classnames/bind";
import {
  DEFAULT_HEADER_CONFIG,
  HeaderProps,
  HeaderState,
} from "./types/header.types";

import { HeaderContext } from "./context";
import { useLanguage } from "@/context/LanguageContext";

import { useHeaderScroll } from "./hooks";

import { Brand } from "./components";
import { Button } from "../Button";
import { Header } from "./Header";
import LanguageSelector from "../LanguageSelector";
import { NavMenu } from "./components/NavMenu";

import styles from "./styles/Header.module.scss";

const cx = classnames.bind(styles);

const HeaderClient: React.FC<HeaderProps> = ({
  dictionary,
  variant = DEFAULT_HEADER_CONFIG.variant,
  appearance = DEFAULT_HEADER_CONFIG.appearance,
  breakpoint = DEFAULT_HEADER_CONFIG.breakpoint,
  menuPosition = DEFAULT_HEADER_CONFIG.menuPosition,
  className,
}) => {
  // const { onCursor } = useUIContext();
  const { language, setLanguage } = useLanguage();

  const isScrolled = useHeaderScroll(appearance?.height ?? 50);
  const [menuState, setMenuState] = useState<HeaderState>({
    isNavOpen: false,
  });

  const navigationItems = Object.values(dictionary.navigation);

  const setIsNavOpen = (isOpen: boolean) =>
    setMenuState((prev) => ({ ...prev, isNavOpen: isOpen }));

  const contextValue = useMemo(
    () => ({
      dictionary,
      variant,
      appearance,
      breakpoint,
      menuPosition,
      isScrolled,
      isNavOpen: menuState.isNavOpen,
      setIsNavOpen,

      // onCursor,
    }),
    [
      dictionary,
      variant,
      appearance,
      breakpoint,
      menuPosition,
      isScrolled,
      menuState.isNavOpen,
      // onCursor,
    ]
  );

  useEffect(() => {
    document.body.style.overflow = menuState.isNavOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuState.isNavOpen]);

  if (!navigationItems?.length) return null;

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
            <Brand />
            <div className={cx("header__actions-group")}>
              <Button
                variant="secondary"
                href={dictionary.clientPortal.href}
                icon={<Users2 size={16} />}
                className={cx("header__portal-button")}
              >
                {dictionary.clientPortal.label}
              </Button>
              <Header.MenuToggle />
              <div className={cx("header__divider")} />
              <LanguageSelector
                className={cx("header__language-selector")}
                variant="split-line"
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>
          </Header.Nav>
        </Header.Content>

        <NavMenu
          menuItems={navigationItems}
          isOpen={menuState.isNavOpen}
          onClose={() => setIsNavOpen(false)}
          // // onCursor={onCursor}
        />
      </Header.Root>
    </HeaderContext.Provider>
  );
};

export default HeaderClient;
