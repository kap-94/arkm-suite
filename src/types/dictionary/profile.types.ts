import {
  MetaContent,
  AccessibilityLabels,
  ActionButton,
  StatusMessages,
  PageHeader,
} from "./base.types";

export interface ProfileImage {
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
}

export interface ProfileForm {
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
}

export interface ProfileDictionary {
  meta: MetaContent;
  header: PageHeader;
  image: ProfileImage;
  form: ProfileForm;
  countries: Record<string, string>;
  status: StatusMessages & {
    updating: string;
    updated: string;
  };
  errors: {
    imageUpdate: string;
    profileUpdate: string;
    unexpected: string;
    network: string;
  };
  aria: Record<string, string>;
}
