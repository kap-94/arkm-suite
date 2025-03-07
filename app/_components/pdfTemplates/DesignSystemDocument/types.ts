// types.ts
export interface ColorDefinition {
  colors: Record<string, string>;
  label: string;
}

export interface ColorPalette {
  [category: string]: ColorDefinition;
}

export interface TypographyStyle {
  name: string;
  label: string;
  specs: string;
  variant: string;
}

export interface SpacingItem {
  name: string;
  value: number;
  description: string;
}

export interface DesignSystemLabels {
  colors: {
    title: string;
  };
  typography: {
    title: string;
    sampleText: string;
  };
  spacing: {
    title: string;
    unitsLabel: string;
  };
}

export interface DesignSystemData {
  colorPalette: ColorPalette;
  typographyStyles: TypographyStyle[];
  spacingScale: SpacingItem[];
  labels: DesignSystemLabels;
}

export interface PDFSectionProps {
  data: DesignSystemData;
  theme?: string;
  styles: Record<string, any>;
}

export interface DesignSystemDocumentProps {
  title: string;
  project: string;
  data: DesignSystemData;
  language: string;
  theme?: "light" | "dark";
}
