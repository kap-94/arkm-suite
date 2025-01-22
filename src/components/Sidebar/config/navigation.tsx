// src/app/components/Sidebar/config/navigation.ts
import { createElement } from "react";
import type { NavItem } from "../types/sidebar.types";
import type { LucideIcon } from "lucide-react";

import {
  LayoutDashboard,
  Layout,
  Library,
  Settings,
  Code,
  EyeIcon,
  FileText,
  Palette,
  Layers,
} from "lucide-react";

// Definimos los IDs válidos como un tipo
type NavigationIconId =
  | "overview"
  | "dashboard"
  | "projects"
  | "documents"
  | "settings"
  | "webDesign"
  | "webDevelopment"
  | "uxResearch"
  | "contentStrategy";

// Mapeo de IDs a iconos con tipo explícito
export const navigationIcons: Record<NavigationIconId, LucideIcon> = {
  dashboard: LayoutDashboard,
  overview: Layers,
  projects: Layout,
  documents: Library,
  settings: Settings,
  webDesign: Palette,
  webDevelopment: Code,
  uxResearch: EyeIcon,
  contentStrategy: FileText,
};

// Configuración de tamaños y propiedades de iconos
export const iconProps = {
  main: {
    size: 24,
    strokeWidth: 1.65,
  },
  child: {
    size: 24,
    strokeWidth: 1.65,
  },
} as const;

interface NavigationItem {
  title: string;
  path: string;
  children?: Record<string, NavigationItem>;
}

interface NavigationSection {
  [key: string]: NavigationItem;
}

interface NavigationDictionary {
  main: NavigationSection;
  bottom: NavigationSection;
}

function isValidIconId(id: string): id is NavigationIconId {
  return id in navigationIcons;
}

function createNavItems(
  items: NavigationSection,
  isChild: boolean = false
): NavItem[] {
  return Object.entries(items).map(([id, item]) => {
    const props = isChild ? iconProps.child : iconProps.main;

    const icon = isValidIconId(id)
      ? createElement(navigationIcons[id], props)
      : null;

    const navItem: NavItem = {
      id,
      title: item.title,
      path: item.path,
      icon,
    };

    if (item.children) {
      navItem.children = createNavItems(item.children, true);
    }

    return navItem;
  });
}

export function generateNavigation(navigation: NavigationDictionary) {
  const mainNavigation = createNavItems(navigation.main);
  const bottomNavigation = createNavItems(navigation.bottom);

  return {
    MAIN_NAVIGATION_ITEMS: mainNavigation,
    BOTTOM_NAVIGATION_ITEMS: bottomNavigation,
  };
}
