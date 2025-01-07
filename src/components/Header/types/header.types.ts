// types/header.types.ts
import { ReactNode } from "react";
import {
  Language,
  LanguageSelectorVariant,
} from "@/components/LanguageSelector";
import { ButtonVariant } from "@/components/Button";
import { CursorStyle } from "@/context/UIContext";
import type { Variants } from "framer-motion";

// Variantes y Posiciones
export type HeaderVariant = "solid" | "transparent" | "glass";
export type HeaderPosition = "left" | "right" | "center";

// Items de Navegación
export interface NavItem {
  href: string;
  text: string;
  icon?: ReactNode;
  translationKey: string;
}

export interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  onCursor?: (cursorType: CursorStyle) => void;
}

export interface HeaderState {
  isNavOpen: boolean;
  isMobileMenuOpen: boolean;
}

// Configuración de Apariencia
export interface HeaderAppearance {
  blur?: boolean;
  height?: number;
  padding?: {
    desktop?: number;
    mobile?: number;
  };
}

// Configuración de Idiomas
export interface HeaderLanguageConfig {
  enabled?: boolean;
  variant?: LanguageSelectorVariant;
  position?: "inline" | "dropdown";
  showLabels?: boolean;
  accentColor?: string;
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
}

// Acciones del Header
export interface HeaderAction {
  href: string;
  text?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  translationKey: string;
  order?: number;
}

// Configuración General
export interface HeaderConfig {
  navigation: Omit<NavItem, "text">[];
  appearance: HeaderAppearance;
  settings: {
    variant: HeaderVariant;
    breakpoint: number;
    menuPosition: HeaderPosition;
  };
  language: Omit<HeaderLanguageConfig, "currentLanguage" | "onLanguageChange">;
  actions: Omit<HeaderAction, "text">[];
}

// Props del Componente Header
export interface HeaderProps {
  items: NavItem[];
  variant?: HeaderVariant;
  appearance?: HeaderAppearance;
  breakpoint?: number;
  menuPosition?: HeaderPosition;
  languageConfig?: HeaderLanguageConfig;
  actions?: HeaderAction[];
  className?: string;
}

// Tipo del Contexto
export interface HeaderContextType extends Omit<HeaderProps, "className"> {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  isNavOpen: boolean;
  setIsNavOpen: (value: boolean) => void;
  onCursor?: (state: CursorStyle) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Props de Componentes Internos
export interface AnimatedTextProps {
  text: string;
  className?: string;
}

export interface NavigationProps {
  items: NavItem[];
  languageConfig?: HeaderLanguageConfig;
  actions?: HeaderAction[];
}

export interface MobileMenuProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  position?: HeaderPosition;
  actions?: HeaderAction[];
  languageConfig?: HeaderLanguageConfig;
}

export interface BrandProps {
  className?: string;
}

// Tipos para Animaciones
export interface AnimationVariants extends Variants {
  hovered: {
    y: number[];
    textShadow: string[];
    transition: {
      duration: number;
      delay: number;
      repeat: number;
      repeatType: "mirror";
      ease: string;
    };
  };
  normal: {
    y: number;
    textShadow: string;
    transition: {
      duration: number;
      ease: [number, number, number, number];
    };
  };
}

// Configuración por Defecto
export const DEFAULT_HEADER_CONFIG = {
  variant: "solid" as const,
  breakpoint: 768,
  menuPosition: "right" as const,
  appearance: {
    blur: true,
    height: 80,
    padding: {
      desktop: 32,
      mobile: 24,
    },
  },
  languageConfig: {
    enabled: true,
    variant: "split-line" as const,
    position: "inline" as const,
    showLabels: false,
    accentColor: "#6366f1",
    currentLanguage: "en" as Language,
    onLanguageChange: (lang: Language) => {},
  },
} as const;

export type HeaderDefaultVariant = typeof DEFAULT_HEADER_CONFIG.variant;
export type HeaderDefaultPosition = typeof DEFAULT_HEADER_CONFIG.menuPosition;
