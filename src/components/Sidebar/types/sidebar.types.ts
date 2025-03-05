// src/components/Sidebar/types/sidebar.types.ts
import { ReactNode } from "react";

export type ThemeType = "light" | "dark" | "custom";

export interface SidebarThemeValues {
  bg?: string;
  text?: string;
  textSecondary?: string;
  textTertiary?: string;
  border?: string;
  overlayBg?: string;
  overlayOpacity?: string;
  overlayBlur?: string;
  overlayMobileOpacity?: string;
  overlayMobileBlur?: string;
}

export interface SidebarTheme {
  type: ThemeType;
  customValues?: SidebarThemeValues;
}

export interface NavItem {
  id: string;
  title: string;
  icon: ReactNode;
  path: string;
  aria: string; // Added aria property
  children?: NavItem[];
  disabled?: boolean;
  meta?: {
    description?: string;
    projectId?: string;
    status?: string;
    progress?: number;
  };
  actions?: {
    create?: string;
    filter?: string;
    sort?: string;
    upload?: string;
  };
}

export interface DashboardConfig {
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  animations: {
    duration: number;
    timing: string;
  };
  width: {
    expanded: number;
    collapsed: number;
  };
}

export interface SidebarProps {
  mainNavigation: NavItem[];
  bottomNavigation: NavItem[];
  theme?: SidebarTheme;
  className?: string;
}

export interface SidebarItemProps {
  item: NavItem;
  theme?: ThemeType;
}

// Tipos helper para el manejo de CSS variables
export type CSSVariableName<T extends string> = `--sidebar-${T}`;

export type ThemeCSSVariables = {
  [K in keyof SidebarThemeValues as CSSVariableName<K>]: string;
};

// Configuración por defecto
export const DEFAULT_DASHBOARD_CONFIG: DashboardConfig = {
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
  },
  animations: {
    duration: 300,
    timing: "ease",
  },
  width: {
    expanded: 256,
    collapsed: 80,
  },
};

// Valores por defecto para temas
export const DEFAULT_THEME_VALUES: Record<ThemeType, SidebarThemeValues> = {
  dark: {
    bg: "linear-gradient(180deg, #0a0a0a, #141426)",
    text: "rgba(242, 232, 232, 0.965)",
    textSecondary: "rgba(242, 232, 232, 0.7)",
    textTertiary: "rgba(242, 232, 232, 0.5)",
    border: "rgba(242, 232, 232, 0.1)",
    overlayBg: "0, 0, 0",
    overlayOpacity: "0.5",
    overlayBlur: "4px",
    overlayMobileOpacity: "0.7",
    overlayMobileBlur: "2px",
  },
  light: {
    bg: "#ffffff",
    text: "#444444",
    textSecondary: "rgba(0, 0, 0, 0.7)",
    textTertiary: "rgba(0, 0, 0, 0.5)",
    border: "rgba(0, 0, 0, 0.1)",
    overlayBg: "255, 255, 255",
    overlayOpacity: "0.8",
    overlayBlur: "4px",
    overlayMobileOpacity: "0.9",
    overlayMobileBlur: "2px",
  },
  custom: {},
};

// Función helper para obtener valores del tema
export const getThemeValue = (
  theme: ThemeType,
  key: keyof SidebarThemeValues
): string => {
  return (
    DEFAULT_THEME_VALUES[theme]?.[key] || DEFAULT_THEME_VALUES.dark[key] || ""
  );
};
