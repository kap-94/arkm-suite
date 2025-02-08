// types/documentation.ts

// Theme Types
export type ThemeType = "light" | "dark" | "custom";

export interface ThemeConfig {
  type: ThemeType;
  colors?: {
    background?: string;
    text?: string;
    secondaryText?: string;
    border?: string;
  };
}

// Feature Types
export interface DocumentationFeature {
  title: string;
  description: string;
  image?: string;
}

// Usage Step Types
export interface UsageStep {
  step: string;
  description: string;
  image?: string;
}

// Basic Section Type
export interface DocumentationSection {
  id: string;
  title: string;
  description: string;
  features: DocumentationFeature[];
  usage: UsageStep[];
}

// Common Labels
export interface CommonLabels {
  features: string;
  usage: string;
  nextSteps: string;
}

// Main Data Structure
export interface DocumentationData {
  sections: {
    dashboard: DocumentationSection;
    projectDetails: DocumentationSection;
    deliverables: DocumentationSection;
    contentPreview: DocumentationSection;
    designSystem: DocumentationSection;
  };
  commonLabels: CommonLabels;
}

// Component Props Types
export interface DocumentationPageProps {
  data: DocumentationData;
  theme?: ThemeConfig;
}

export interface DocumentationSectionProps {
  section: DocumentationSection;
  commonLabels: CommonLabels;
  theme: ThemeConfig;
}
