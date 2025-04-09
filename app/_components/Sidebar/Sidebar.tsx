// src/components/Sidebar/Sidebar.tsx
"use client";

import { useRef, useEffect } from "react";
import classNames from "classnames/bind";
import { SidebarProps } from "./types/sidebar.types";
import { SidebarItem } from "./components/SidebarItem";
import { Hamburger } from "../Hamburger";
import { useDashboard } from "../../_context/DashboardContext";
import Brand from "../Brand";
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
              <Brand
                size="sm"
                variant="minimal"
                theme={theme.type}
                className={cx("sidebar__logo")}
              />

              {/* <div
                style={{ width: 88, height: 24, transform: "translateX(-8px)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100">
                  <rect width="300" height="100" fill="none" />

                  <path
                    d="M50 80 L70 20 L90 80 M60 55 L80 55"
                    fill="none"
                    stroke="rgb(241, 228, 228)"
                    stroke-width="5"
                  />

                  <path
                    d="M100 20 L100 80 M100 20 L130 20 Q150 20 150 40 T130 60 L100 60 L130 80"
                    fill="none"
                    stroke="rgb(241, 228, 228)"
                    stroke-width="5"
                  />

                  <path
                    d="M160 20 L160 80 M160 50 L190 20 M160 50 L190 80"
                    fill="none"
                    stroke="rgb(241, 228, 228)"
                    stroke-width="5"
                  />

                  <path
                    d="M200 80 L200 20 L220 50 L240 20 L240 80"
                    fill="none"
                    stroke="rgb(241, 228, 228)"
                    stroke-width="5"
                  />
                </svg>
              </div> */}

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
