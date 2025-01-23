// Action types & Permissions
export type MenuItemType = "link" | "action" | "divider";

export type UserPermission =
  | "all"
  | "manage_team"
  | "manage_projects"
  | "manage_products"
  | "view_analytics"
  | "manage_code"
  | "manage_tasks"
  | "manage_designs"
  | "manage_assets"
  | "view_assigned";

// Icon types
export type StatusIcon = "circle" | "clock" | "minus-circle" | "video";
export type SearchIcon = "folder" | "check-square" | "file";
export type MenuIcon = "user" | "settings" | "log-out";
export type NavigationIcon =
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
  | "document";

export type AllIcons = SearchIcon | MenuIcon | StatusIcon | NavigationIcon;

// User types
export type UserRole =
  | "admin"
  | "manager"
  | "productOwner"
  | "developer"
  | "designer"
  | "user";
export type UserStatus = "online" | "offline" | "away" | "busy" | "inMeeting";

// Path types
export type PublicPaths =
  | "/"
  | "/features"
  | "/pricing"
  | "/about"
  | "/careers"
  | "/blog"
  | "/legal";

export type ClientPaths =
  | "/dashboard"
  | "/dashboard/projects"
  | "/dashboard/projects/web-design"
  | "/dashboard/projects/web-development"
  | "/dashboard/projects/ux-research"
  | "/dashboard/documents"
  | "/dashboard/settings"
  | "/dashboard/profile"
  | "/dashboard/account/profile"
  | "/dashboard/account/settings";

export type NavigationPaths = PublicPaths | ClientPaths;

// Base interfaces
export interface NavigationMeta {
  version: string;
  lastUpdated: string;
  description: string;
  maintainer: string;
}

export interface ItemMeta {
  description: string;
  keywords?: string[];
}

export interface NavigationItem {
  title: string;
  path: NavigationPaths | string;
  aria: string;
  icon: AllIcons | string;
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

// Accessibility
export interface NavigationAccessibility {
  skipLinks: {
    main: string;
    navigation: string;
  };
  aria: {
    mainNav: string;
    footerNav?: string;
    dashboardNav?: string;
  };
}

// Messages
export interface NavigationMessages {
  errors: {
    notFound: string;
    unauthorized: string;
    forbidden: string;
  };
}
