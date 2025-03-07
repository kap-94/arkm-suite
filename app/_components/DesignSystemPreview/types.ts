import { DesignSystemDictionary } from "../../_types/dictionary/designSystemPreview.types";

export interface ThemeConfig {
  type: "light" | "dark" | "custom";
  colors?: {
    background?: string;
    text?: string;
    textSecondary?: string;
    border?: string;
    cardBackground?: string;
    hoverBackground?: string;
  };
}

export interface ColorToken {
  value: string;
  name: string;
  description?: string;
}

export interface ColorCategory {
  name: string;
  colors: ColorToken[];
}

export interface TypographyToken {
  name: string;
  size: string;
  lineHeight: string;
  weight: number;
  specs: string;
}

export interface SpacingToken {
  name: string;
  value: number;
  description?: string;
}

// Props interface for the main component
export interface DesignSystemPreviewProps {
  data: Record<string, any>;
  dictionary: DesignSystemDictionary;
  theme: ThemeConfig;
  initialSection?: string;
  onSectionChange?: (sectionId: string) => void;
}
