// src/types/dictionary.d.ts
interface NavigationItem {
  title: string;
  path: string;
  children?: Record<string, NavigationItem>;
}

interface NavigationSection {
  [key: string]: NavigationItem;
}

export interface NavigationDictionary {
  main: NavigationSection;
  bottom: NavigationSection;
}

export interface SearchDictionary {
  placeholder: string;
  label: string;
  button: string;
  loading: string;
  types: {
    project: string;
    task: string;
    file: string;
  };
  noResults: string;
}

export interface UserInfoDictionary {
  options: {
    [key: string]:
      | {
          label: string;
          href?: string;
        }
      | "divider";
  };
  roles: {
    admin: string;
    user: string;
    manager: string;
    developer: string;
    designer: string;
    productOwner: string;
  };
  accessibility: {
    userMenu: string;
    userAvatar: string;
    userSettings: string;
  };
  status: {
    online: string;
    offline: string;
    away: string;
    busy: string;
  };
}

export interface SettingsDictionary {
  title: string;
  subtitle: string;
  appearance: {
    title: string;
    description: string;
    options: Record<string, string>;
  };
  language: {
    title: string;
    description: string;
    options: Record<string, string>;
  };
}

export interface HeroDictionary {
  headline: {
    create: string;
    scale: string;
    transform: string;
  };
  agency: {
    subtitle: string;
    description: string;
    cta: string;
  };
  scroll: string;
}

export interface SolutionsDictionary {
  title: string;
  web: {
    title: string;
    description: string;
  };
  automation: {
    title: string;
    description: string;
  };
}

export interface ContactDictionary {
  title: string;
  form: {
    name: string;
    email: string;
    message: string;
    submit: string;
  };
}

export interface FooterDictionary {
  rights: string;
  privacy: string;
  terms: string;
}

export interface AuthDictionary {
  signin: {
    title: string;
    clientAccess: string;
    enterDashboard: string;
    adminNote: string;
    clientSuite: {
      title: string;
      subtitle: string;
    };
    features: {
      projectControl: {
        title: string;
        description: string;
      };
      assetManagement: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
    };
    form: {
      email: {
        label: string;
        placeholder: string;
      };
      password: {
        label: string;
        placeholder: string;
      };
      errors: {
        invalidEmail: string;
        emailRequired: string;
        passwordMin: string;
        passwordUppercase: string;
        passwordLowercase: string;
        passwordNumber: string;
        passwordSpecial: string;
        passwordRequired: string;
        invalidCredentials: string;
        unexpected: string;
      };
      buttons: {
        access: string;
        or: string;
        google: string;
        resetPassword: string;
      };
    };
  };
  resetPassword: {
    title: string;
    instructions: string;
    securityNote: string;
    form: {
      email: {
        label: string;
        placeholder: string;
      };
      token: {
        label: string;
        placeholder: string;
      };
      newPassword: {
        label: string;
        placeholder: string;
      };
      confirmPassword: {
        label: string;
        placeholder: string;
      };
    };
    errors: {
      invalidEmail: string;
      emailRequired: string;
      tokenRequired: string;
      passwordMin: string;
      passwordUppercase: string;
      passwordLowercase: string;
      passwordNumber: string;
      passwordSpecial: string;
      passwordRequired: string;
      confirmRequired: string;
      passwordMatch: string;
      unexpected: string;
    };
    success: string;
    buttons: {
      reset: string;
      backToLogin: string;
    };
  };
}

export interface CommonDictionary {
  loading: string;
  error: string;
  try_again: string;
}

export interface Dictionary {
  navigation: NavigationDictionary;
  hero: HeroDictionary;
  solutions: SolutionsDictionary;
  contact: ContactDictionary;
  footer: FooterDictionary;
  auth: AuthDictionary;
  settings: SettingsDictionary;
  search: SearchDictionary;
  userInfo: UserInfoDictionary;
  common: CommonDictionary;
}
