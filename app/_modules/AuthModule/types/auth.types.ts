import { Language } from "../../../_components/LanguageSelector";
import { SignInDictionary } from "../../../_types/dictionary/signin.types";

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
  dictionary: SignInDictionary;
  lang: Language;
}
