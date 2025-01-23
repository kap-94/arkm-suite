import type {
  NavigationItem,
  FooterGroup,
  NavigationAccessibility,
  NavigationMeta,
  NavigationMessages,
} from "./navigation.types";

// Navigation Section
export interface MainNavigation {
  main: Record<string, NavigationItem>;
  footer: Record<string, FooterGroup>;
}

// Main Layout Structure
export interface MainLayoutDictionary {
  meta: NavigationMeta;
  navigation: MainNavigation;
  accessibility: NavigationAccessibility;
  messages: NavigationMessages;
}
