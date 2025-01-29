// src/app/[lang]/dashboard/DashboardContent.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useSettings, SettingsProvider } from "@/context/SettingsContext";
import classNames from "classnames/bind";
import { generateNavigation } from "@/components/Sidebar/config/navigation";
import SidebarWrapper from "@/components/Sidebar/SidebarWrapper";
import DashboardHeader from "@/components/DashboardHeader";
import { Sidebar } from "@/components/Sidebar";
import type {
  NavItem,
  ThemeType,
} from "@/components/Sidebar/types/sidebar.types";

import {
  DashboardNavigation,
  HeaderSection,
} from "@/types/dictionary/dashboardLayout.types";
import styles from "./DashboardLayout.module.scss";
import { DashboardProvider, useDashboard } from "./DashboardContext";

const cx = classNames.bind(styles);

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  initialTheme: ThemeType;
  header: HeaderSection;
  navigation: DashboardNavigation;
}

export function DashboardLayoutClient({
  children,
  initialTheme,
  header,
  navigation,
}: DashboardLayoutClientProps) {
  const [mounted, setMounted] = useState(false);
  const { MAIN_NAVIGATION_ITEMS, BOTTOM_NAVIGATION_ITEMS } =
    generateNavigation(navigation);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <SettingsProvider defaultTheme={initialTheme}>
        <DashboardProvider>
          <DashboardUI
            header={header}
            mainNavigation={MAIN_NAVIGATION_ITEMS}
            bottomNavigation={BOTTOM_NAVIGATION_ITEMS}
          >
            {children}
          </DashboardUI>
        </DashboardProvider>
      </SettingsProvider>
    );
  }

  const clientTheme =
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as ThemeType) || initialTheme
      : initialTheme;

  return (
    <SettingsProvider defaultTheme={clientTheme}>
      <DashboardProvider>
        <DashboardUI
          header={header}
          mainNavigation={MAIN_NAVIGATION_ITEMS}
          bottomNavigation={BOTTOM_NAVIGATION_ITEMS}
        >
          {children}
        </DashboardUI>
      </DashboardProvider>
    </SettingsProvider>
  );
}

interface DashboardUIProps {
  children: React.ReactNode;
  header: HeaderSection;
  mainNavigation: NavItem[];
  bottomNavigation: NavItem[];
}
function DashboardUI({
  children,
  header,
  mainNavigation,
  bottomNavigation,
}: DashboardUIProps) {
  const { theme } = useSettings();
  const headerRef = useRef<HTMLDivElement>(null);
  const { updateDimensions } = useDashboard();

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

    // Medición inicial
    updateHeaderDimensions();

    // Configurar observer para cambios de tamaño
    const resizeObserver = new ResizeObserver(updateHeaderDimensions);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDimensions]);

  return (
    <div className={cx("layout", `layout--${theme}`)}>
      <SidebarWrapper defaultExpanded={false}>
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
          />
          <main className={cx("layout__content")}>{children}</main>
        </div>
      </SidebarWrapper>
    </div>
  );
}
