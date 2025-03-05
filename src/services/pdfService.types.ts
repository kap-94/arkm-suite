// types/pdf.types.ts

import { ReactNode } from "react";

export interface PDFSection {
  id: string;
  Component: React.ComponentType<any>;
  data: any;
  startNewPage?: boolean;
  minHeight?: number;
  maxHeight?: number;
  scale?: number;
}

export interface PDFMetadata {
  author?: string;
  subject?: string;
  keywords?: string[];
  creator?: string;
  creationDate?: string;
  modificationDate?: string;
  [key: string]: any;
}

export interface PDFStyling {
  colors?: {
    header?: string;
    text?: string;
    accent?: string;
    background?: string;
  };
  fonts?: {
    header?: string;
    body?: string;
  };
}

export interface PDFGenerationOptions {
  title: string;
  project: string;
  sections: PDFSection[];
  metadata?: PDFMetadata;
  styling?: PDFStyling;
  dictionary?: Record<string, any>;
  theme?: string;
}

export interface BaseTemplateProps {
  data: any;
  dictionary?: Record<string, any>;
  theme?: string;
}
