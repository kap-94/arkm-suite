import { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { TypographyFontFamily } from "../Typography/types";

// Definiciones de tipos más estrictas
type ThemeType = "dark" | "light";

interface CustomThemeValues {
  primary?: string;
  secondary?: string;
  background?: string;
  border?: string;
  text?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  focus?: string;
  autofillBg?: string;
  disabled?: string;
  disabledBg?: string;
}

type ThemeOption =
  | ThemeType
  | {
      type: ThemeType;
      customValues?: CustomThemeValues;
    };

export interface TextFieldOwnProps<T extends ElementType> {
  as?: T;
  className?: string;
  label?: string;
  name: string;
  icon?: ReactNode;
  type?: string;
  variant?: "primary" | "secondary";
  theme?: ThemeOption;
  disabled?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  showError?: boolean;
  required?: boolean;
  placeholder?: string;
  fontFamily?: TypographyFontFamily;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
}

type TextFieldProps<T extends ElementType> = TextFieldOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextFieldOwnProps<T>>;

export type { TextFieldProps };
