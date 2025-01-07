import { Language } from "@/components/LanguageSelector";

export enum AuthScreenType {
  LOGIN = "login",
  SIGN_IN = "sign-in",
  FORGOT_PASSWORD = "forgot-password",
  RESET_PASSWORD = "reset-password",
}

export interface AuthScreenProps {
  screen?: AuthScreenType;
  nameFormat?: string;
  title?: string;
  subtitle?: string;
  lang: Language;
}

export interface AuthScreenBackgroundOptions {
  boxDropshadow: boolean;
  backgroundColor: string;
  backgroundImage: { url: string; alt: string };
}

export interface SigninFormValues {
  email: string;
  password: string;
}

export interface SigninFormProps {
  className?: string;
  nameFormat?: string;
}
