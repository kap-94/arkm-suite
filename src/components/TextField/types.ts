import { ElementType, InputHTMLAttributes } from "react";

export interface TextFieldTheme {
  type: "light" | "dark" | "custom";
  customValues?: {
    primary?: string;
    secondary?: string;
    background?: string;
    border?: string;
    text?: string;
    label?: string;
    error?: string;
    placeholder?: string;
    focus?: string;
  };
}

export interface TextFieldBaseProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string | JSX.Element;
  name: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  theme?: TextFieldTheme;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  error?: string;
  showError?: boolean;
}

export type TextFieldProps<T extends ElementType = "div"> =
  TextFieldBaseProps & {
    as?: T;
    className?: string;
    disabled?: boolean;
  };
