import { DesignSystemData } from "@/components/pdfTemplates/DesignSystemPDF/types";

export interface BaseData {
  [key: string]: any;
}

export interface DefaultTemplateData extends BaseData {
  content?: any;
  metadata?: Record<string, any>;
}

export interface CustomTemplateData extends BaseData {
  [key: string]: any;
}

export type PDFTemplateData =
  | DesignSystemData
  | DefaultTemplateData
  | CustomTemplateData;

export interface PDFGenerationOptions {
  title: string;
  type: string;
  data: PDFTemplateData;
  theme?: string;
  dictionary?: any;
  metadata?: {
    author?: string;
    subject?: string;
    keywords?: string[];
    creator?: string;
    creationDate?: string | Date;
    modificationDate?: string | Date;
    [key: string]: any;
  };
  styling?: {
    fonts?: {
      [key: string]: string;
    };
    colors?: {
      header?: string;
      text?: string;
      accent?: string;
    };
  };
}
