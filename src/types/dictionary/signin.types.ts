import { MetaContent, StatusMessages, PageHeader } from "./base.types";

export interface SignInFormValidationMessages {
  emailRequired: string;
  emailInvalid: string;
  passwordMin: string;
  passwordUppercase: string;
  passwordLowercase: string;
  passwordNumber: string;
  passwordSpecial: string;
  passwordRequired: string;
  invalidCredentials: string;
  unexpected: string;
}

export interface SignInForm {
  fields: {
    email: {
      label: string;
      placeholder: string;
      icon: string;
    };
    password: {
      label: string;
      placeholder: string;
      icon: string;
    };
  };
  validation: SignInFormValidationMessages;
  buttons: {
    primary: {
      label: string;
      loading: string;
      cancel: string;
    };
    google: {
      label: string;
      loading: string;
    };
    separator: {
      text: string;
    };
  };
  note?: string;
}

export interface SignInStatus extends StatusMessages {
  invalidCredentials: string;
  network: string;
}

export interface SignInDictionary {
  meta: MetaContent;
  header: PageHeader;
  form: SignInForm;
  status: SignInStatus;
  errors: {
    email: string;
    password: string;
    unexpected: string;
  };
  aria: Record<string, string>;
}
