import { ReactNode } from "react";

export interface MethodologyStep {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface MethodologyDictionary {
  title: string;
  subtitle?: string;
  steps: {
    research: {
      title: string;
      description: string;
    };
    visualDirection: {
      title: string;
      description: string;
    };
    uiDesign: {
      title: string;
      description: string;
    };
    development: {
      title: string;
      description: string;
    };
    launch: {
      title: string;
      description: string;
    };
    maintenance: {
      title: string;
      description: string;
    };
  };
}

export interface MethodologyPreviewProps {
  dictionary?: MethodologyDictionary;
  customAnchorId?: string;
  backgroundImage?: string; // New prop for the background image
}

export interface BulbConfig {
  wordIndex: number;
  letterIndex: number;
}
