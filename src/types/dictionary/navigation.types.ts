import { MetaContent } from "./base.types";

// Tipos base
export interface NavigationMeta {
  version: string;
  lastUpdated: string;
  description: string;
  maintainer: string;
}

export interface SectionMeta {
  title: string;
  description: string;
}

export interface ItemMeta {
  description: string;
  keywords?: string[];
}

export interface NavigationItem {
  title: string;
  path: string;
  aria: string;
  icon: string;
  meta?: ItemMeta;
}

export interface NavigationItemWithActions extends NavigationItem {
  actions?: {
    create?: string;
    filter?: string;
    sort?: string;
    upload?: string;
  };
  children?: Record<string, NavigationItem>;
}

export interface FooterGroup {
  title: string;
  aria: string;
  children: Record<string, NavigationItem>;
}

// Estructuras específicas
export interface LandingNavigation {
  main: Record<string, NavigationItem>;
  footer: Record<string, FooterGroup>;
}

export interface DashboardNavigation {
  main: Record<string, NavigationItemWithActions>;
  bottom: Record<string, NavigationItem>;
}

// Accesibilidad
export interface NavigationAccessibility {
  skipLinks: {
    main: string;
    navigation: string;
  };
  aria: {
    mainNav: string;
    footerNav: string;
    dashboardNav: string;
  };
}

// Mensajes
export interface NavigationMessages {
  errors: {
    notFound: string;
    unauthorized: string;
    forbidden: string;
  };
}

// Estructura principal
export interface NavigationDictionary {
  meta: NavigationMeta;
  navigation: {
    public: {
      meta: SectionMeta;
      landing: LandingNavigation;
    };
    private: {
      meta: SectionMeta;
      dashboard: DashboardNavigation;
    };
  };
  accessibility: NavigationAccessibility;
  messages: NavigationMessages;
}

// Type helper para validar rutas
export type NavigationPaths =
  | "/"
  | "/features"
  | "/pricing"
  | "/about"
  | "/careers"
  | "/blog"
  | "/legal"
  | "/dashboard"
  | "/dashboard/projects"
  | "/dashboard/projects/web-design"
  | "/dashboard/projects/web-development"
  | "/dashboard/projects/ux-research"
  | "/dashboard/documents"
  | "/dashboard/settings"
  | "/dashboard/profile";

// Type helper para los iconos disponibles
export type NavigationIcons =
  | "home"
  | "features"
  | "pricing"
  | "info"
  | "briefcase"
  | "book"
  | "shield"
  | "dashboard"
  | "projects"
  | "design"
  | "code"
  | "analytics"
  | "document"
  | "settings"
  | "user";
