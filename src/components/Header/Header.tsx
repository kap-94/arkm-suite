"use client";

import React from "react";
import classNames from "classnames/bind";
import { useHeaderContext } from "./context";
import { Hamburger } from "../Hamburger";
import styles from "./styles/Header.module.scss";

const cx = classNames.bind(styles);

interface HeaderRootProps {
  children: React.ReactNode;
  className?: string;
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

  Content: ({ children }: { children: React.ReactNode }) => (
    <div className={cx("header__content")}>{children}</div>
  ),

  Nav: ({ children }: { children: React.ReactNode }) => (
    <nav className={cx("header__nav")}>
      <div className={cx("header__nav-wrapper")}>{children}</div>
    </nav>
  ),

  MenuToggle: () => {
    const { setIsNavOpen, isNavOpen } = useHeaderContext();
    return (
      <div className={cx("header__menu-trigger")}>
        <Hamburger
          variant="morph"
          onClick={() => setIsNavOpen(!isNavOpen)}
          isOpen={isNavOpen}
          className={cx("header__menu-trigger-button")}
        />
      </div>
    );
  },
};
