import { MenuItem } from "@/app/_components/MenuList";

export interface Meta {
  version: string;
  lastUpdated: string;
  description: string;
  maintainer: string;
}

export interface NavigationItem extends MenuItem {
  label: string;
  href: string;
  aria: string;
  meta?: {
    description: string;
    keywords?: string[];
  };
}

export interface LanguageOption {
  label: string;
  aria: string;
}

export interface HeaderDictionary {
  aria: string;
  navigation: {
    primary: Record<string, NavigationItem>;
    secondary: Record<string, NavigationItem>;
  };
  languageOptions: {
    english: LanguageOption;
    spanish: LanguageOption;
  };
}

export interface FooterLegends {
  rights: string;
  privacy: {
    label: string;
    aria: string;
    href: string;
  };
  terms: {
    label: string;
    aria: string;
    href: string;
  };
}

export interface FooterDictionary {
  company: {
    title: string;
    aria: string;
  };
  legends: FooterLegends;
  navigation: Record<string, NavigationItem>;
  // Additional properties for footer content
  description: string;
  cta: string;
  links: {
    showcase: string;
    solutions: string;
    clientSuite: string;
    journey: string;
  };
  copyright: string;
}

export interface Accessibility {
  skipLinks: {
    main: string;
    navigation: string;
  };
  aria: {
    mainNav: string;
    footerNav: string;
  };
}

export interface Messages {
  errors: {
    notFound: string;
    unauthorized: string;
    forbidden: string;
  };
}

export interface MainLayoutDictionary {
  meta: Meta;
  header: HeaderDictionary;
  footer: FooterDictionary;
  accessibility: Accessibility;
  messages: Messages;
}
