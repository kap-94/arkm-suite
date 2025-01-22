import type { LucideIcon } from "lucide-react";

export type FileType =
  | "Document"
  | "Design"
  | "Spreadsheet"
  | "Image"
  | "Other";
export type ThemeType = "light" | "dark" | "custom";

export interface RecentFileTheme {
  type: ThemeType;
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

export interface RecentFileType {
  id: string;
  name: string;
  size: string;
  type: FileType;
  lastModified: Date;
}

export interface RecentFileProps {
  file: RecentFileType;
  onClick?: (id: string) => void;
  theme?: RecentFileTheme;
  className?: string;
}

export const defaultTheme: RecentFileTheme = {
  type: "dark",
  colors: {
    background: "rgba(241, 228, 228, 0.02)",
    backgroundHover: "rgba(241, 228, 228, 0.05)",
    border: "rgba(241, 228, 228, 0.05)",
    iconColor: "rgb(241, 228, 228)",
    text: "rgb(241, 228, 228)",
    textSecondary: "rgba(241, 228, 228, 0.65)",
    typeBackground: "rgba(241, 228, 228, 0.05)",
  },
};
