import { TypographyFontFamily } from "../Typography/types";

export interface Option {
  label: string | React.ReactNode;
  value: string;
}

export interface DropdownTheme {
  type: "light" | "dark" | "custom";
  customValues?: {
    primary?: string;
    secondary?: string;
    background?: string;
    border?: string;
    text?: string;
    disabled?: string;
    disabledBg?: string;
  };
}

export interface DropdownProps {
  label?: string;
  id?: string;
  options: Option[];
  selected: Option;
  onSelectedChange?: (option: Option) => void;
  className?: string;
  closeOnScroll?: boolean;
  theme?: DropdownTheme;
  icon?: React.ReactNode;
  maxHeight?: string | number;
  disabled?: boolean;
  // Variantes: default, filter, tertiary y placeholderInput.
  variant?: "default" | "filter" | "tertiary" | "placeholderInput";
  // Nueva prop para definir la tipografía a usar en los Typography
  fontFamily?: TypographyFontFamily; // PROP NUEVA
}
