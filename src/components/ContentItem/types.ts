// types.ts

import { Content } from "@/types/models/Content";

export type ContentItemType =
  | "Document"
  // | "Design"
  // | "Spreadsheet"
  // | "Image"
  | "Component";
// | "Other"

export interface ContentItemTheme {
  type: "light" | "dark" | "custom";
  colors?: {
    background?: string;
    backgroundHover?: string;
    border?: string;
    iconColor?: string;
    text?: string;
    textSecondary?: string;
    typeBackground?: string;
  };
}

export const defaultContentItemTheme: ContentItemTheme = {
  type: "light",
};

// Base interface for common content properties
export interface ContentItemProps {
  content: Content;
  onClick?: (id: string) => void;
  theme?: ContentItemTheme;
  className?: string;
}
