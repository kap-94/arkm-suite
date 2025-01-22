import { User } from "@/types/User.types";
import { ProfileDictionary } from "@/types/dictionary/profile.types";

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
  user: User;
  dictionary: ProfileDictionary;
}
