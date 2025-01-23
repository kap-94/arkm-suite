// src/app/[lang]/dashboard/DashboardContent.tsx
"use client";

import { useEffect, useState } from "react";
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
import styles from "./DashboardContent.module.scss";

const cx = classNames.bind(styles);

interface DashboardContentProps {
  children: React.ReactNode;
  initialTheme: ThemeType;
  header: HeaderSection;
  navigation: DashboardNavigation;
}

export function DashboardContent({
  children,
  initialTheme,
  header,
  navigation,
}: DashboardContentProps) {
  const [mounted, setMounted] = useState(false);
  const { MAIN_NAVIGATION_ITEMS, BOTTOM_NAVIGATION_ITEMS } =
    generateNavigation(navigation);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <SettingsProvider defaultTheme={initialTheme}>
        <DashboardUI
          header={header}
          mainNavigation={MAIN_NAVIGATION_ITEMS}
          bottomNavigation={BOTTOM_NAVIGATION_ITEMS}
        >
          {children}
        </DashboardUI>
      </SettingsProvider>
    );
  }

  const clientTheme =
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as ThemeType) || initialTheme
      : initialTheme;

  return (
    <SettingsProvider defaultTheme={clientTheme}>
      <DashboardUI
        header={header}
        mainNavigation={MAIN_NAVIGATION_ITEMS}
        bottomNavigation={BOTTOM_NAVIGATION_ITEMS}
      >
        {children}
      </DashboardUI>
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

  return (
    <div className={cx("layout", `layout--${theme}`)}>
      <SidebarWrapper defaultExpanded={false}>
        <Sidebar
          theme={{ type: theme }}
          mainNavigation={mainNavigation}
          bottomNavigation={bottomNavigation}
        />
        <div className={cx("layout__main")}>
          <DashboardHeader theme={{ type: theme }} config={header} />
          <main className={cx("layout__content")}>{children}</main>
        </div>
      </SidebarWrapper>
    </div>
  );
}
