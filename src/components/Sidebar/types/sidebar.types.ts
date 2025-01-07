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
  children?: NavItem[];
  disabled?: boolean;
}

export interface SidebarConfig {
  width: {
    expanded: number;
    collapsed: number;
  };
  animation: {
    duration: number;
    timing: string;
  };
  breakpoints: {
    mobile: number;
  };
}

export interface SidebarState {
  isExpanded: boolean;
  isMobile: boolean;
  activeItemId?: string;
}

export interface SidebarActions {
  toggle: () => void;
  setActiveItem: (id: string) => void;
  collapse: () => void;
  expand: () => void;
}

export interface SidebarContextValue {
  state: SidebarState;
  actions: SidebarActions;
  config: SidebarConfig;
}

export interface SidebarProps {
  mainNavigation: NavItem[];
  bottomNavigation: NavItem[];
  theme?: SidebarTheme;
  className?: string;
  onStateChange?: (state: SidebarState) => void;
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
export const DEFAULT_CONFIG: SidebarConfig = {
  width: {
    expanded: 256,
    collapsed: 80,
  },
  animation: {
    duration: 300,
    timing: "ease",
  },
  breakpoints: {
    mobile: 768,
  },
};

// Valores por defecto para temas
export const DEFAULT_THEME_VALUES: Record<ThemeType, SidebarThemeValues> = {
  dark: {
    bg: "linear-gradient(180deg, #0a0a0a, #141426)",
    text: "rgba(242, 232, 232, 0.965)",
    textSecondary: "rgba(242, 232, 232, 0.7)",
    textTertiary: "rgba(242, 232, 232, 0.5)",
    border: "rgba(242, 232, 232, 0.2)",
    overlayBg: "0, 0, 0",
    overlayOpacity: "0.5",
    overlayBlur: "4px",
    overlayMobileOpacity: "0.2",
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
    overlayMobileOpacity: "0.2",
    overlayMobileBlur: "2px",
  },
  custom: {}, // Los valores personalizados se proporcionan a través de props
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
