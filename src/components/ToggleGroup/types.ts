// src/components/ToggleGroup/types.ts
import { ReactNode, ElementType } from "react";

export interface ToggleGroupTheme {
  type: "light" | "dark" | "custom";
  customValues?: {
    primary?: string;
    secondary?: string;
  };
}

export interface ToggleOption<T> {
  value: T;
  label: string;
  ariaLabel: string;
  icon?: ReactNode;
}

export interface ToggleGroupProps<
  T extends string,
  E extends ElementType = "div"
> {
  as?: E;
  className?: string;
  value: T;
  onChange: (value: T) => void;
  options: ToggleOption<T>[];
  theme?: ToggleGroupTheme;
  disabled?: boolean;
}
