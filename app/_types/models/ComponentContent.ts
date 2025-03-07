import { TypographyVariant } from "../../_components/Typography/types";
import { BaseContent } from "./Common";
import { ThemeConfig } from "../../_components/DesignSystemPreview/types";

export interface ComponentContent extends BaseContent {
  type: "component";
  title: string;
  componentType:
    | "design-system"
    | "market-research"
    | "user-personas"
    | "component-status"
    | "api-status"
    | "test-coverage"
    | "deployment-status"
    | "launch-checklist";
  data: Record<string, any>;
}

export interface DesignSystemContent extends ComponentContent {
  theme?: ThemeConfig;
  colorPalette: {
    [category: string]: {
      colors: {
        [name: string]: string;
      };
      label: string;
    };
  };
  typographyStyles: Array<{
    name: string;
    variant: TypographyVariant;
    specs: string;
    label: string;
    displayText: string;
  }>;
  spacingScale: Array<{
    name: string;
    value: number;
    description: string;
    label: string;
  }>;
  labels: {
    spacing: {
      title: string;
      unitsLabel: string;
    };
    typography: {
      title: string;
      sampleText: string;
    };
    colors: {
      title: string;
      copiedText: string;
    };
    components: {
      buttons: {
        title: string;
        variants: {
          primary: string;
          secondary: string;
        };
        sizes: {
          large: string;
          default: string;
          small: string;
        };
        states: {
          withIcon: string;
          loading: string;
          disabled: string;
        };
      };
      formControls: {
        title: string;
        labels: {
          default: string;
          withIcon: string;
          floating: string;
          error: string;
          disabled: string;
        };
        placeholders: {
          default: string;
        };
        errorMessage: string;
      };
    };
  };
}

export interface MarketResearchContent extends ComponentContent {
  sections: Array<{
    id: string;
    title: string;
    content: {
      summary: string;
      keyFindings: string[];
      charts?: Array<{
        type: string;
        data: Record<string, any>;
        config: Record<string, any>;
      }>;
      tables?: Array<{
        headers: string[];
        rows: any[][];
        caption?: string;
      }>;
    };
  }>;
  metrics: {
    marketSize?: number;
    targetAudience?: string[];
    competitors?: Array<{
      name: string;
      strengths: string[];
      weaknesses: string[];
    }>;
  };
}
