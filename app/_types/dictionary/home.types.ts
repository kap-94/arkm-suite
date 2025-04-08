// types/dictionary/home.types.ts

interface Meta {
  title: string;
  description: string;
  keywords: string[];
  authors: { name: string }[];
  creator: string;
  publisher: string;
}

export interface HeroDictionary {
  description: {
    description: string;
    cta: string;
  };
  title: {
    main: string;
    secondary: string;
    connector: string;
  };
  scroll: string;
}

export interface SolutionFeature {
  title: string;
  description: string;
}

export interface SolutionData {
  id: string;
  title: string;
  description: string;
  features: SolutionFeature[];
}

export interface SolutionsDictionary {
  title: string;
  subtitle: string;
  solutions: SolutionData[];
}

export interface BenefitData {
  title: string;
  description: string;
}

export interface MethodologyDictionary {
  title: string;
  subtitle: string;
  steps: {
    research: {
      title: string;
      description: string;
    };
    visualDirection: {
      title: string;
      description: string;
    };
    uiDesign: {
      title: string;
      description: string;
    };
    development: {
      title: string;
      description: string;
    };
    testing: {
      title: string;
      description: string;
    };
    launch: {
      title: string;
      description: string;
    };
  };
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface ProjectFormDictionary {
  title: string;
  subtitle: string;
  steps: {
    step1: {
      title: string;
      subtitle: string;
      projectType: string;
      pleaseSpecify: string;
      specifyPlaceholder: string;
    };
    step2: {
      title: string;
      subtitle: string;
      budgetRange: string;
      timeline: string;
    };
    step3: {
      title: string;
      subtitle: string;
      companyName: string;
      companyNamePlaceholder: string;
      emailAddress: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      preferredContact: string;
    };
    step4: {
      title: string;
      subtitle: string;
      projectDetails: string;
      contactInformation: string;
      terms: {
        type: string;
        budget: string;
        timeline: string;
        company: string;
        email: string;
        phone: string;
        preferredContact: string;
      };
    };
  };
  controls: {
    back: string;
    continue: string;
    complete: string;
  };
  options: {
    projectType: DropdownOption[];
    budget: DropdownOption[];
    timeline: DropdownOption[];
    contactMethod: DropdownOption[];
  };
  validation: {
    projectTypeRequired: string;
    customTypeRequired: string;
    budgetRequired: string;
    timelineRequired: string;
    companyNameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    preferredContactRequired: string;
  };
  success: string;
  error: string;
}

// About Me section for WorkExperience
export interface AboutMeData {
  title: string;
  subtitle: string;
  roles: string[];
  description: string;
  paragraphs?: string[];
  skills?: string[];
  skillsTitle?: string;
  careerTitle?: string;
  imageUrl?: string;
}

export interface JobExperience {
  id: number;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  imageUrl: string;
}

// Interface for work experience positions
export interface WorkPosition {
  id: number;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  technologies?: string[];
  imageUrl: string;
  industry: string;
  iconType: string;
}

// WorkExperience section dictionary
export interface WorkExperienceDictionary {
  title: string;
  subtitle: string;
  aboutMe: AboutMeData;
  positions: WorkPosition[];
}

// Removed ContactFormDictionary and included links and navigation for the contact section
export interface ContactDictionary {
  title: string;
  subtitle: string;
  cta: string;
  links: Record<string, string>;
  navigation: Record<string, NavigationItem>;
}

// Defined NavigationItem interface here to avoid circular dependencies
export interface NavigationItem {
  menu_item_id: number;
  menu_item_parent: number;
  label: string;
  title: string;
  href: string;
  url: string;
  aria: string;
  showDropdownIcon: boolean;
  meta?: {
    description: string;
    keywords?: string[];
  };
}

export interface HomeDictionary {
  meta: Meta;
  hero: HeroDictionary;
  solutions: SolutionsDictionary;
  methodology: MethodologyDictionary;
  workExperience: WorkExperienceDictionary;
  contact: ContactDictionary;
  forms: {
    projectForm: ProjectFormDictionary;
  };
}
