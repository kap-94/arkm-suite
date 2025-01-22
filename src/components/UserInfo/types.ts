// src/app/components/UserInfo/types.ts
import { ReactNode } from "react";

export interface UserInfoTheme {
  type: "light" | "dark" | "custom";
  customValues?: {
    background?: string;
    text?: string;
    initialsColor?: string;
    hoverBackground?: string;
    borderColor?: string;
    dropdownBackground?: string;
    dropdownBorderColor?: string;
    dropdownText?: string;
  };
}

export type DropdownOption =
  | {
      id: string;
      divider: true;
    }
  | {
      id: string;
      label: string;
      icon?: ReactNode;
      href?: string;
      onClick?: () => void;
      divider?: never;
    };

export interface UserInfoProps {
  userName: string;
  userRole: string;
  className?: string;
  options: DropdownOption[];
  theme?: UserInfoTheme;
  closeOnScroll?: boolean;
}
