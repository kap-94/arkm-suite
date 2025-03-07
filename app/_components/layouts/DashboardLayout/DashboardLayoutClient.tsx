"use client";

import { useRef, useEffect } from "react";
import classNames from "classnames/bind";
import type { Language } from "../../../_lib/config/i18n";
import { HeaderSection } from "../../../_types/dictionary/dashboardLayout.types";
import type { NavItem, ThemeType } from "../../Sidebar/types/sidebar.types";
import {
  useSettings,
  SettingsProvider,
} from "../../../_context/SettingsContext";
import {
  DashboardProvider,
  useDashboard,
} from "../../../_context/DashboardContext";
import { NavigationProvider } from "../../../_context/NavigationContext";
import DashboardHeader from "../../DashboardHeader";
import { Sidebar } from "../../Sidebar";
import { UserProfile } from "../../../[lang]/dashboard/account/profile/ProfileClient";

import styles from "./DashboardLayout.module.scss";

const cx = classNames.bind(styles);

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  initialTheme: ThemeType;
  header: HeaderSection;
  initialNavigation: {
    mainNavigation: NavItem[];
    bottomNavigation: NavItem[];
  };
  defaultSidebarExpanded?: boolean;
  customConfig?: any;
  user: UserProfile;
  lang: Language;
}

export function DashboardLayoutClient({
  children,
  initialTheme,
  header,
  initialNavigation,
  defaultSidebarExpanded = false,
  customConfig,
  user,
  lang,
}: DashboardLayoutClientProps) {
  const allNavigationItems = [
    ...initialNavigation.mainNavigation,
    ...initialNavigation.bottomNavigation,
  ];

  const clientTheme =
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as ThemeType) || initialTheme
      : initialTheme;

  return (
    <SettingsProvider defaultTheme={clientTheme}>
      <DashboardProvider
        defaultSidebarExpanded={defaultSidebarExpanded}
        customConfig={customConfig}
        initialLang={lang}
      >
        <NavigationProvider items={allNavigationItems}>
          <DashboardUI
            header={header}
            user={user}
            mainNavigation={initialNavigation.mainNavigation}
            bottomNavigation={initialNavigation.bottomNavigation}
          >
            {children}
          </DashboardUI>
        </NavigationProvider>
      </DashboardProvider>
    </SettingsProvider>
  );
}

interface DashboardUIProps {
  children: React.ReactNode;
  header: HeaderSection;
  mainNavigation: NavItem[];
  bottomNavigation: NavItem[];
  user: UserProfile;
}

function DashboardUI({
  children,
  header,
  mainNavigation,
  bottomNavigation,
  user,
}: DashboardUIProps) {
  const { theme, language } = useSettings();
  const { state, updateDimensions } = useDashboard();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeaderDimensions = () => {
      if (headerRef.current) {
        const { height } = headerRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(headerRef.current);
        const zIndex = parseInt(computedStyle.zIndex) || 99;

        updateDimensions({
          headerHeight: height,
          headerZIndex: zIndex,
        });
      }
    };

    updateHeaderDimensions();

    const resizeObserver = new ResizeObserver(updateHeaderDimensions);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDimensions]);

  return (
    <div
      className={cx("layout", `layout--${theme}`, {
        "layout--sidebar-expanded": state.isSidebarExpanded,
        "layout--sidebar-mobile": state.isMobileSidebar,
      })}
    >
      <Sidebar
        theme={{ type: theme }}
        mainNavigation={mainNavigation}
        bottomNavigation={bottomNavigation}
      />
      <div className={cx("layout__main")}>
        <div className={cx("header-spacer")} aria-hidden="true" />
        <DashboardHeader
          ref={headerRef}
          theme={{ type: theme }}
          config={header}
          user={user}
          lang={language}
        />
        <main className={cx("layout__content")}>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayoutClient;
