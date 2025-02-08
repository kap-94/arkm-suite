// src/types/dictionary/dashboardLayout.types.ts

// Base types
export type MenuItemType = "link" | "action" | "divider" | string;
export type UserRole =
  | "admin"
  | "manager"
  | "productOwner"
  | "developer"
  | "designer"
  | "user"
  | string;
export type UserStatus =
  | "online"
  | "offline"
  | "away"
  | "busy"
  | "inMeeting"
  | string;
export type StatusIcon = "circle" | "clock" | "minus-circle" | "video";
export type SearchIcon = "folder" | "check-square" | "file";
export type MenuIcon = "user" | "settings" | "log-out";
export type AllIcons = SearchIcon | MenuIcon | StatusIcon;

// Base interfaces
export interface ItemMeta {
  description: string;
  keywords?: string[];
}

// Search related interfaces
export interface SearchConfig {
  placeholder: string;
  label: string;
  buttonText: string;
  loadingText: string;
  debounceMs: number;
  minSearchLength: number;
}

export interface SearchCategory {
  label: string;
  icon: SearchIcon | string;
  priority: number;
}

export interface SearchResults {
  empty: {
    message: string;
    suggestion: string;
  };
  error: {
    message: string;
    action: string;
  };
  maxItems: number;
  groupByCategory: boolean;
}

export interface SearchSection {
  config: SearchConfig;
  categories: {
    project: SearchCategory;
    task: SearchCategory;
    file: SearchCategory;
  };
  results: SearchResults;
}

// User related interfaces
export interface UserMenuItem {
  id: string;
  label: string;
  icon?: AllIcons | string;
  type: MenuItemType;
  href?: string;
}

export interface Role {
  label: string;
  level: number;
  permissions: string[];
}

export interface UserStatusConfig {
  label: string;
  icon: AllIcons | string;
}

export interface UserAccessibility {
  labels: {
    userMenu: string;
    userAvatar: string;
    userSettings: string;
    statusSelector: string;
    searchInput: string;
  };
  keyboardShortcuts: {
    toggleMenu: string;
    focusSearch: string;
    closeMenu: string;
  };
}

export interface UserSection {
  menu: {
    options: UserMenuItem[];
  };
  roles: {
    types: Record<UserRole, Role>;
    default: UserRole;
    productOwner: UserRole;
  };
  status: {
    types: Record<UserStatus, UserStatusConfig>;
    default: UserStatus;
    autoUpdate: boolean;
  };
  accessibility: UserAccessibility;
}

// Header Section
export interface HeaderSection {
  search: SearchSection;
  user: UserSection;
}

// Main Layout Structure
export interface DashboardLayoutDictionary {
  meta: ItemMeta;
  header: HeaderSection;
  accessibility: {
    skipLinks: {
      main: string;
      navigation: string;
    };
    aria: {
      mainNav: string;
      dashboardNav: string;
    };
  };
  messages: {
    errors: {
      notFound: string;
      unauthorized: string;
      forbidden: string;
    };
  };
}
