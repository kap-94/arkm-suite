"use client";

import React from "react";
import classNames from "classnames/bind";
import { useHeaderContext } from "./context";
import { Hamburger } from "../Hamburger";
import { MobileMenu } from "./components/MobileMenu";
import styles from "./styles/Header.module.scss";

const cx = classNames.bind(styles);

interface HeaderRootProps {
  children: React.ReactNode;
  className?: string;
}

interface HeaderSimpleProps {
  children: React.ReactNode;
}

export const Header = {
  Root: ({ children, className }: HeaderRootProps) => {
    const { isScrolled, variant, appearance } = useHeaderContext();
    return (
      <header
        className={cx(
          "header",
          `header--${variant}`,
          {
            "header--scrolled": isScrolled,
            "header--blur": appearance?.blur,
          },
          className
        )}
        style={
          {
            "--header-height": appearance?.height
              ? `${appearance.height}px`
              : undefined,
            "--header-padding-desktop": appearance?.padding?.desktop
              ? `${appearance.padding.desktop}px`
              : undefined,
            "--header-padding-mobile": appearance?.padding?.mobile
              ? `${appearance.padding.mobile}px`
              : undefined,
          } as React.CSSProperties
        }
      >
        {children}
      </header>
    );
  },

  Content: ({ children }: HeaderSimpleProps) => (
    <div className={cx("header__content")}>{children}</div>
  ),

  Nav: ({ children }: HeaderSimpleProps) => (
    <nav className={cx("header__nav")}>
      <div className={cx("header__nav-wrapper")}>{children}</div>
    </nav>
  ),

  MenuToggle: () => {
    const { setIsNavOpen, isNavOpen } = useHeaderContext();
    return (
      <div className={cx("header__menu-trigger")}>
        <Hamburger
          variant="triple"
          theme={{ type: "dark" }}
          onClick={() => setIsNavOpen(!isNavOpen)}
          isOpen={isNavOpen}
          className={cx("header__menu-trigger-button")}
        />
      </div>
    );
  },

  MobileMenu: ({
    primaryNavigation,
    secondaryNavigation,
    locale,
  }: {
    primaryNavigation: any[];
    secondaryNavigation: any[];
    locale?: string;
  }) => {
    const { menuPosition, setIsNavOpen } = useHeaderContext();
    return (
      <MobileMenu
        position={menuPosition}
        primaryNavigation={primaryNavigation}
        secondaryNavigation={secondaryNavigation}
        onClose={() => setIsNavOpen(false)}
        locale={locale}
      />
    );
  },
};
