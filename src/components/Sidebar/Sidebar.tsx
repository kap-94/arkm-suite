// src/components/Sidebar/Sidebar.tsx
"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { useSidebarContext } from "./context/SidebarContext";
import { SidebarProps } from "./types/sidebar.types";
import { SidebarItem } from "./components/SidebarItem";
import { Typography } from "../Typography";
import { Hamburger } from "../Hamburger";
import styles from "./styles/Sidebar.module.scss";
import { Brand } from "../Header/components";

const cx = classNames.bind(styles);

export function Sidebar({
  mainNavigation,
  bottomNavigation,
  theme = { type: "dark" },
  className,
  onStateChange,
}: SidebarProps) {
  const { state, actions } = useSidebarContext();
  const sidebarRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Manejar tema
  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    if (theme.type === "custom" && theme.customValues) {
      const sidebarStyle = {
        background: theme.customValues.bg,
        color: theme.customValues.text,
        borderColor: theme.customValues.border,
      };

      const overlayStyle = {
        background: `rgba(${theme.customValues.overlayBg}, ${theme.customValues.overlayOpacity})`,
        backdropFilter: `blur(${theme.customValues.overlayBlur})`,
      };

      Object.assign(sidebarRef.current.style, sidebarStyle);
      Object.assign(overlayRef.current.style, overlayStyle);

      sidebarRef.current.removeAttribute("data-theme");
      overlayRef.current.removeAttribute("data-theme");
    } else {
      const themeType = theme.type || "dark";
      sidebarRef.current.dataset.theme = themeType;
      overlayRef.current.dataset.theme = themeType;

      sidebarRef.current.removeAttribute("style");
      overlayRef.current.removeAttribute("style");
    }
  }, [theme]);

  // Notificar cambios de estado
  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  return (
    <>
      <div
        ref={overlayRef}
        className={cx("sidebar-overlay", {
          "sidebar-overlay--visible": state.isExpanded,
        })}
        onClick={actions.collapse}
        role="presentation"
        data-theme={theme.type}
      />

      <aside
        ref={sidebarRef}
        className={cx(
          "sidebar",
          {
            "sidebar--expanded": state.isExpanded,
            "sidebar--collapsed": !state.isExpanded,
          },
          className
        )}
        aria-expanded={state.isExpanded}
        role="navigation"
        data-theme={theme.type}
      >
        <div
          className={cx("sidebar__header", {
            "sidebar__header--expanded": state.isExpanded,
            "sidebar__header--collapsed": !state.isExpanded,
          })}
        >
          {state.isExpanded ? (
            <>
              <Brand size="sm" />
              <Hamburger
                variant="morph"
                onClick={actions.toggle}
                isOpen={true}
                className={cx("sidebar__toggle")}
                theme={{ type: theme.type }}
              />
            </>
          ) : (
            <Hamburger
              variant="morph"
              onClick={actions.toggle}
              isOpen={false}
              className={cx("sidebar__toggle")}
              theme={{ type: theme.type }}
            />
          )}
        </div>
        <nav className={cx("sidebar__nav")}>
          <ul className={cx("sidebar__list")} role="menu">
            {mainNavigation.map((item) => (
              <SidebarItem key={item.id} item={item} theme={theme.type} />
            ))}
          </ul>

          {bottomNavigation && bottomNavigation.length > 0 && (
            <ul
              className={cx("sidebar__list", "sidebar__list--bottom")}
              role="menu"
            >
              {bottomNavigation.map((item) => (
                <SidebarItem key={item.id} item={item} theme={theme.type} />
              ))}
            </ul>
          )}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
