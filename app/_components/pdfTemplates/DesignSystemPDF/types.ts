export interface ColorGroup {
  [key: string]: string;
}

interface ColorPalette {
  [group: string]: ColorGroup;
}

export interface ColorPaletteProps {
  title: string;
  colors: ColorPalette;
}

export interface TypographyStyle {
  name: string;
  size: string;
  lineHeight: string;
  weight: number;
  specs: string;
}

export interface SpacingItem {
  name: string;
  value: number;
  description: string;
}

export interface DesignSystemData {
  colorPalette: ColorPalette;
  typographyStyles: TypographyStyle[];
  spacingScale: SpacingItem[];
  dictionary?: any;
}

export interface DesignSystemPDFProps {
  data: DesignSystemData;
  dictionary: any;
}
