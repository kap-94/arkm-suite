export interface Meta {
  version: string;
  lastUpdated: string;
  description: string;
  maintainer: string;
}

export interface NavigationItem {
  menu_item_id: number;
  menu_item_parent: number;
  label: string;
  title: string;
  href: string;
  url: string;
  aria: string;
  showDropdownIcon: boolean;
  icon?: string;
  meta?: {
    description: string;
    keywords?: string[];
  };
}

export interface LanguageOption {
  label: string;
  aria: string;
  code: string;
  countryCode: string;
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

export interface FooterDictionary {
  copyright: string;
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

// Added contact form dictionary interfaces
export interface ContactFormValidation {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  messageRequired: string;
}

export interface ContactFormDictionary {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  success: string;
  error: string;
  validation: ContactFormValidation;
}

export interface ContactDictionary {
  title: string;
  subtitle: string;
  cta: string;
  forms: {
    contactForm: ContactFormDictionary;
  };
}

export interface MainLayoutDictionary {
  meta: Meta;
  header: HeaderDictionary;
  footer: FooterDictionary;
  accessibility: Accessibility;
  messages: Messages;
  contact: ContactDictionary; // Added contact dictionary to main layout
}
