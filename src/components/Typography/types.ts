// src/components/Typography/types.ts
import { ElementType, ReactNode, CSSProperties } from "react";

export type ThemeType = "light" | "dark" | "custom";

export interface TypographyTheme {
  type: ThemeType;
  customValues?: {
    text?: string;
    textSecondary?: string;
    textTertiary?: string;
  };
}

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "p1"
  | "p2"
  | "p3"
  | "button"
  | "label";

export type TypographyColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "tertiary"
  | "disabled"
  | "link"
  | "success"
  | "error"
  | "warning"
  | "info";

export type TypographyAlign =
  | "inherit"
  | "left"
  | "center"
  | "right"
  | "justify";
export type TypographyTransform =
  | "none"
  | "capitalize"
  | "uppercase"
  | "lowercase";
export type TypographyWeight = 400 | 500 | 600 | 700;

export interface TypographyProps<T extends ElementType> {
  as?: T;
  align?: TypographyAlign;
  children: ReactNode;
  className?: string;
  color?: TypographyColor;
  fontWeight?: TypographyWeight;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  style?: CSSProperties;
  textTransform?: TypographyTransform;
  variant?: TypographyVariant;
  theme?: TypographyTheme | ThemeType;
}
