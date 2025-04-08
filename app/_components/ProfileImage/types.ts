import { ProfileDictionary } from "@/app/_types/dictionary/profile.types";
import { User } from "@/app/_types/models";

export type ThemeType = "light" | "dark" | "custom";

export interface ProfileImageTheme {
  type: ThemeType;
  colors?: {
    label?: string;
    border?: string;
    overlayBackground?: string;
    overlayText?: string;
    shadow?: string;
    text?: string;
    secondaryText?: string;
  };
}

export interface ProfileImageProps {
  imageUrl?: string;
  theme?: ProfileImageTheme;
  onImageChange?: (file: File) => Promise<void>;
  // user: User; // Corregir
  user: any;
  dictionary: ProfileDictionary;
}
