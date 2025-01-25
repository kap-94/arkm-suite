export interface Meta {
  version: string;
  lastUpdated: string;
  description: string;
  maintainer: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  aria: string;
  icon: string;
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
  navigation: Record<string, NavigationItem>;
  clientPortal: {
    label: string;
    href: string;
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

export interface Footer {
  company: {
    title: string;
    aria: string;
  };
  legends: FooterLegends;
  navigation: Record<string, NavigationItem>;
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
  footer: Footer;
  accessibility: Accessibility;
  messages: Messages;
}
