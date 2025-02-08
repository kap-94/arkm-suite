// src/components/Sidebar/Sidebar.tsx
"use client";

import { useRef, useEffect } from "react";
import classNames from "classnames/bind";
import { SidebarProps } from "./types/sidebar.types";
import { SidebarItem } from "./components/SidebarItem";
import { Hamburger } from "../Hamburger";
import { Brand } from "../Header/components";
import { useDashboard } from "@/context/DashboardContext";
import styles from "./styles/Sidebar.module.scss";

const cx = classNames.bind(styles);

export function Sidebar({
  mainNavigation,
  bottomNavigation,
  theme = { type: "dark" },
  className,
}: SidebarProps) {
  const { state, toggleSidebar, collapseSidebar } = useDashboard();
  const sidebarRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div
        ref={overlayRef}
        className={cx("sidebar-overlay", {
          "sidebar-overlay--visible": state.isSidebarExpanded,
        })}
        onClick={collapseSidebar}
        role="presentation"
        data-theme={theme.type}
      />

      <aside
        ref={sidebarRef}
        className={cx(
          "sidebar",
          {
            "sidebar--expanded": state.isSidebarExpanded,
            "sidebar--collapsed": !state.isSidebarExpanded,
            "sidebar--mobile": state.isMobileSidebar,
          },
          className
        )}
        aria-expanded={state.isSidebarExpanded}
        role="navigation"
        data-theme={theme.type}
      >
        <div
          className={cx("sidebar__header", {
            "sidebar__header--expanded": state.isSidebarExpanded,
            "sidebar__header--collapsed": !state.isSidebarExpanded,
          })}
        >
          {state.isSidebarExpanded ? (
            <>
              <Brand size="sm" />
              <Hamburger
                variant="morph"
                onClick={toggleSidebar}
                isOpen={true}
                className={cx("sidebar__toggle")}
                theme={{ type: theme.type }}
              />
            </>
          ) : (
            <Hamburger
              variant="morph"
              onClick={toggleSidebar}
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
