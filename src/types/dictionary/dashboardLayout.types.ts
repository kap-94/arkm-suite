import type {
  NavigationItem,
  NavigationItemWithActions,
  NavigationAccessibility,
  NavigationMeta,
  NavigationMessages,
  MenuItemType,
  UserPermission,
  AllIcons,
  UserRole,
  UserStatus,
  ClientPaths,
  SearchIcon,
} from "./navigation.types";

// Search Types
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

// User Types
export interface UserMenuItem {
  id: string;
  label: string;
  icon?: AllIcons | string;
  type: MenuItemType | string;
  href?: ClientPaths | string;
}

export interface Role {
  label: string;
  level: number;
  permissions: UserPermission[] | string[];
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
    types: Record<UserRole | string, Role>;
    default: UserRole | string;
  };
  status: {
    types: Record<UserStatus, UserStatusConfig>;
    default: UserStatus | string;
    autoUpdate: boolean;
  };
  accessibility: UserAccessibility;
}

// Header Section
export interface HeaderSection {
  search: SearchSection;
  user: UserSection;
}

// Navigation Section
export interface DashboardNavigation {
  main: Record<string, NavigationItemWithActions>;
  bottom: Record<string, NavigationItem>;
}

// Main Layout Structure
export interface DashboardLayoutDictionary {
  meta: NavigationMeta;
  header: HeaderSection;
  navigation: DashboardNavigation;
  accessibility: NavigationAccessibility;
  messages: NavigationMessages;
}
