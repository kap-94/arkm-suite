import { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRadius = "sm" | "md" | "lg" | "full";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  icon?: ReactNode;
  className?: string;
  href?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export interface ButtonStyleProps {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  hasIcon: boolean;
}
