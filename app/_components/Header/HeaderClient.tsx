"use client";

import React, { useEffect, useMemo, useState } from "react";
import classnames from "classnames/bind";
import {
  DEFAULT_HEADER_CONFIG,
  HeaderProps,
  HeaderState,
} from "./types/header.types";
import { createIconElement } from "../../_utils/iconUtils";

import { HeaderContext } from "./context";
import { useLanguage } from "../../_context/LanguageContext";

import { useHeaderScroll } from "./hooks";

import { Header } from "./Header";
import LanguageSelector from "../LanguageSelector";

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
  const { language, setLanguage } = useLanguage();

  const isScrolled = useHeaderScroll(0);
  const [menuState, setMenuState] = useState<HeaderState>({
    isNavOpen: false,
  });

  // Extraer las opciones de idioma del diccionario
  const languageOptions = useMemo(() => {
    return [
      {
        code: "en",
        label: dictionary.languageOptions.english.label,
        aria: dictionary.languageOptions.english.aria,
        countryCode: "GB", // Código ISO para Reino Unido
      },
      {
        code: "es",
        label: dictionary.languageOptions.spanish.label,
        aria: dictionary.languageOptions.spanish.aria,
        countryCode: "ES", // Código ISO para España
      },
    ];
  }, [dictionary.languageOptions]);

  // Process primary navigation items to map icon strings to React components
  const primaryNavigationItems = useMemo(() => {
    return Object.values(dictionary.navigation.primary).map((item) => {
      // Create icon component if an icon name is provided
      const iconElement =
        typeof item.icon === "string"
          ? createIconElement(item.icon, { size: 18, strokeWidth: 2 })
          : item.icon;

      // If the element has showDropdownIcon, create a dropdown icon
      const dropdownIcon = item.showDropdownIcon
        ? createIconElement("dropDown", { size: 14, strokeWidth: 2 })
        : undefined;

      return {
        ...item,
        icon: iconElement,
        dropdownIcon,
      };
    });
  }, [dictionary.navigation.primary]);

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
    }),
    [
      dictionary,
      variant,
      appearance,
      breakpoint,
      menuPosition,
      isScrolled,
      menuState.isNavOpen,
    ]
  );

  useEffect(() => {
    document.body.style.overflow = menuState.isNavOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuState.isNavOpen]);

  if (!primaryNavigationItems?.length) return null;

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
            {/* Mobile Language Selector (left) */}
            {/* <div className={cx("header__logo")}>
              <Brand size="md" variant="minimal" />
            </div> */}
            <div className={cx("header__mobile-language-toggle")}>
              <LanguageSelector
                className={cx("header__mobile-language-selector")}
                variant="rounded-dropdown-with-icon"
                currentLanguage={language}
                onLanguageChange={setLanguage}
                options={languageOptions}
              />
            </div>

            {/* Desktop Actions */}
            <div
              className={cx("header__actions-group", "header__desktop-actions")}
            >
              <LanguageSelector
                className={cx("header__language-selector")}
                variant="rounded-dropdown-with-icon"
                currentLanguage={language}
                onLanguageChange={setLanguage}
                options={languageOptions}
              />
            </div>
          </Header.Nav>
        </Header.Content>
      </Header.Root>
    </HeaderContext.Provider>
  );
};

export default HeaderClient;
