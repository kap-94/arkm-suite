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

export interface ProfileDictionary {
  // Page Header
  title: string;
  subtitle: string;

  // Profile Image
  image: {
    upload: {
      label: string;
      button: string;
      dragDrop: string;
      sizeLimit: string;
      formats: string;
    };
    errors: {
      invalidFormat: string;
      sizeExceeded: string;
      uploadFailed: string;
    };
  };
  profileImage: {
    changePhoto: string;
  };
  // Update Profile Form
  form: {
    fields: {
      fullName: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      nationality: {
        label: string;
        placeholder: string;
      };
      nationalID: {
        label: string;
        placeholder: string;
      };
    };
    validation: {
      required: string;
      fullNameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      emailTooLong: string;
      nationalityRequired: string;
      nationalIDRequired: string;
    };
    buttons: {
      submit: string;
      submitting: string;
      cancel: string;
    };
  };

  // Country Selection
  countries: {
    mexico: string;
    unitedStates: string;
    canada: string;
    spain: string;
    brazil: string;
  };

  // Status Messages
  status: {
    loading: string;
    success: string;
    error: string;
    updating: string;
    updated: string;
  };

  // Error Messages
  errors: {
    imageUpdate: string;
    profileUpdate: string;
    unexpected: string;
    network: string;
  };

  // Accessibility
  aria: {
    profileImage: string;
    emailInput: string;
    countrySelect: string;
    uploadButton: string;
    submitButton: string;
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

export interface DashboardDictionaryOld {
  title: string;
  subtitle: string;
  stats: {
    activeProjects: {
      label: string;
      tooltip: string;
    };
    completed: {
      label: string;
      tooltip: string;
    };
    overallProgress: {
      label: string;
      tooltip: string;
    };
    notifications: {
      label: string;
      tooltip: string;
    };
  };
  projects: {
    title: string;
    data: Array<{
      id: string;
      name: string;
      description: string;
      status: string;
      progress: number;
      lastUpdated: string;
      priority?: "low" | "medium" | "high";
      client?: string;
    }>;
  };
  recentFiles: {
    title: string;
    empty: string;
  };
  notifications: {
    title: string;
    empty: string;
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
  profile: ProfileDictionary;
  dashboard: DashboardDictionary;
  common: CommonDictionary;
}
