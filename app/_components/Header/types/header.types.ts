// types/header.types.ts
import { ReactNode } from "react";
import type { Variants } from "framer-motion";
import { HeaderDictionary } from "../../../_types/dictionary/mainLayout.types";
import { CursorStyle } from "../../../_context/UIContext";
import { ButtonVariant } from "../../Button";

// Variantes y Posiciones
export type HeaderVariant = "solid" | "transparent" | "glass";
export type HeaderPosition = "left" | "right" | "center";

export type PublicPaths =
  | "/"
  | "/features"
  | "/pricing"
  | "/about"
  | "/careers"
  | "/blog"
  | "/legal";
// Items de Navegación
export interface HeaderNavItem {
  label: string;
  href: string;
  aria: string;
  icon: string;
  meta?: {
    description: string;
    keywords?: string[];
  };
}

export interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: HeaderNavItem[];
  onCursor?: (cursorType: CursorStyle) => void;
}

export interface HeaderState {
  isNavOpen: boolean;
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

// Acciones del Header
export interface HeaderAction {
  href: string;
  text?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  order?: number;
}

// Configuración General
export interface HeaderConfig {
  appearance: HeaderAppearance;
  settings: {
    variant: HeaderVariant;
    breakpoint: number;
    menuPosition: HeaderPosition;
  };
}

// Props
export interface HeaderProps {
  dictionary: HeaderDictionary;
  variant?: HeaderVariant;
  appearance?: HeaderAppearance;
  breakpoint?: number;
  menuPosition?: HeaderPosition;
  className?: string;
}

// Tipo del Contexto
export interface HeaderContextType extends Omit<HeaderProps, "className"> {
  isScrolled: boolean;
  isNavOpen: boolean;
  setIsNavOpen: (value: boolean) => void;
  onCursor?: (state: CursorStyle) => void;
}

// Props de Componentes Internos
export interface AnimatedTextProps {
  text: string;
  className?: string;
}

export interface NavigationProps {
  items: HeaderNavItem[];
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
  variant: "glass" as const,
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
} as const;

export type HeaderDefaultVariant = typeof DEFAULT_HEADER_CONFIG.variant;
export type HeaderDefaultPosition = typeof DEFAULT_HEADER_CONFIG.menuPosition;
