// types.ts
import { ReactNode } from "react";

export interface ProfileTheme {
  type: "light" | "dark" | "custom";
  customValues?: {
    background?: string;
    inputBackground?: string;
    text?: string;
    buttonBackground?: string;
    buttonText?: string;
    borderColor?: string;
    labelColor?: string;
  };
}

export interface User {
  fullName: string;
  email: string;
  nationality: string;
  nationalID: string;
  countryFlag: string;
}

export interface UpdateProfileFormProps {
  user: User;
  children: ReactNode;
  theme?: ProfileTheme;
  onSubmit?: (values: User) => void;
}
