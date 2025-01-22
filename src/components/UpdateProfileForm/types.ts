// types.ts
import { ProfileDictionary } from "@/types/dictionary/profile.types";
import { User } from "@/types/User.types";

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

// export interface User {
//   fullName: string;
//   email: string;
//   nationality: string;
//   nationalID: string;
//   countryFlag: string;
// }
export interface UpdateProfileFormProps {
  user: User;
  children?: React.ReactNode;
  theme?: ProfileTheme;
  onSubmit?: (values: User) => Promise<void>;
  dictionary: ProfileDictionary;
}
