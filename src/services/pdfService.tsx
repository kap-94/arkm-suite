"use client";

import jsPDF from "jspdf";
import html2canvas, { Options as Html2CanvasOptions } from "html2canvas";
import React from "react";
import { createRoot } from "react-dom/client";
import {
  BaseData,
  CustomTemplateData,
  DefaultTemplateData,
  PDFGenerationOptions,
  PDFTemplateData,
} from "./pdfService.types";

interface PDFTemplate {
  Component: React.ComponentType<{
    data: PDFTemplateData;
    dictionary?: any;
    theme?: string;
  }>;
  styles?: string;
  options?: {
    scale?: number;
    quality?: number;
    background?: string;
    waitForFonts?: boolean;
    waitForImages?: boolean;
  };
}

// Constants
const DEFAULT_PDF_SCALE = 2;

// Template Registry
class PDFTemplateRegistry {
  private static templates: Record<string, PDFTemplate> = {};
  private static initialized = false;

  static register(type: string, template: PDFTemplate): void {
    this.templates[type] = template;
    this.initialized = true;
  }

  static get(type: string): PDFTemplate | undefined {
    if (!this.initialized) {
      throw new Error(
        "PDFTemplateRegistry is not initialized. Please register templates before use."
      );
    }
    return this.templates[type];
  }

  static has(type: string): boolean {
    return type in this.templates;
  }

  static remove(type: string): void {
    delete this.templates[type];
  }

  static getTypes(): string[] {
    return Object.keys(this.templates);
  }

  static clear(): void {
    this.templates = {};
    this.initialized = false;
  }
}

// Template Generator
class TemplatePDFGenerator {
  async generateContent(
    pdf: jsPDF,
    options: PDFGenerationOptions,
    element?: HTMLElement
  ): Promise<void> {
    try {
      const template = PDFTemplateRegistry.get(options.type);
      if (!template) {
        throw new Error(`No template registered for type: ${options.type}`);
      }

      const containerDiv = element || document.createElement("div");

      if (!element) {
        containerDiv.style.width = `${PDFService.CONTENT_WIDTH}mm`;
        containerDiv.style.margin = "0";
        containerDiv.style.padding = "0";
        containerDiv.style.position = "absolute";
        containerDiv.style.left = "-9999px";
        containerDiv.style.top = "0";
        containerDiv.style.backgroundColor =
          template.options?.background || "#ffffff";

        const componentContainer = document.createElement("div");
        containerDiv.appendChild(componentContainer);

        const root = createRoot(componentContainer);
        root.render(
          React.createElement(template.Component, {
            data: options.data,
            dictionary: options.dictionary,
            theme: options.theme,
          })
        );

        document.body.appendChild(containerDiv);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      try {
        if (template.options?.waitForFonts) {
          await document.fonts.ready;
        }

        if (template.options?.waitForImages) {
          const images = Array.from(containerDiv.getElementsByTagName("img"));
          await Promise.all(
            images.map((img) =>
              img.complete
                ? Promise.resolve()
                : new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                  })
            )
          );
        }

        const html2CanvasOptions: Html2CanvasOptions = {
          backgroundColor: template.options?.background || "#ffffff",
          foreignObjectRendering: false,
          scale: template.options?.scale || PDFService.DEFAULT_SCALE,
          useCORS: true,
          logging: false,
          windowWidth: containerDiv.scrollWidth,
          windowHeight: containerDiv.scrollHeight,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0,
          width: containerDiv.offsetWidth,
          height: containerDiv.offsetHeight,
          removeContainer: false,
          allowTaint: true,
          imageTimeout: 15000,
          onclone: (clonedDoc: Document, element: HTMLElement) => {
            const navElements =
              element.getElementsByClassName("navigation-section");
            Array.from(navElements).forEach((nav) => nav.remove());
          },
        };

        const canvas = await html2canvas(containerDiv, html2CanvasOptions);
        await new Promise((resolve) => setTimeout(resolve, 100));
        await PDFService.addPagesStatic(pdf, canvas);
      } finally {
        if (!element && document.body.contains(containerDiv)) {
          const componentContainer = containerDiv.firstElementChild;
          if (componentContainer) {
            const root = (componentContainer as any)._reactRootContainer;
            if (root) {
              root.unmount();
            }
          }
          document.body.removeChild(containerDiv);
        }
      }
    } catch (error) {
      console.error("Error generating PDF content:", error);
      throw error;
    }
  }
}

// Main PDF Service
export class PDFService {
  // Constants
  static readonly PAGE_MARGIN = 20;
  static readonly PAGE_MARGIN_TOP = 24;
  static readonly PAGE_MARGIN_BOTTOM = 64;
  static readonly PAGE_WIDTH = 210;
  static readonly CONTENT_WIDTH = 170;
  static readonly DEFAULT_SCALE = DEFAULT_PDF_SCALE;
  private static readonly MAX_HEIGHT = 260;
  private static readonly MAX_HEIGHT_SUBSEQUENT = 275;

  private static readonly generator = new TemplatePDFGenerator();

  static registerTemplate(
    type: string,
    Component: React.ComponentType<any>,
    styles?: string,
    options?: PDFTemplate["options"]
  ): void {
    PDFTemplateRegistry.register(type, { Component, styles, options });
  }

  static removeTemplate(type: string): void {
    PDFTemplateRegistry.remove(type);
  }

  static hasTemplate(type: string): boolean {
    return PDFTemplateRegistry.has(type);
  }

  static getRegisteredTemplates(): string[] {
    return PDFTemplateRegistry.getTypes();
  }

  static async generatePDF(
    element: HTMLElement | null,
    options: PDFGenerationOptions
  ): Promise<void> {
    try {
      const pdf = this.initializePDF();

      if (options.metadata) {
        this.setMetadata(pdf, options.metadata);
      }

      this.addHeader(pdf, options);

      if (element) {
        await this.generator.generateContent(pdf, options, element);
      } else {
        await this.generator.generateContent(pdf, options);
      }

      this.savePDF(pdf, options.title, options.type);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error generating PDF:", error);
      throw new Error(`Failed to generate PDF: ${errorMessage}`);
    }
  }

  static async addPagesStatic(
    pdf: jsPDF,
    canvas: HTMLCanvasElement,
    totalPadding: number = 0
  ): Promise<void> {
    const scale = canvas.width / this.CONTENT_WIDTH;
    const totalHeight = (canvas.height + totalPadding) / scale;
    let remainingHeight = totalHeight;
    let sourceY = 0;
    let currentY = this.PAGE_MARGIN_TOP + 24;
    let pageNumber = 1;

    const getMaxHeight = (pageNum: number) => {
      return (
        this.MAX_HEIGHT -
        (this.PAGE_MARGIN_TOP + this.PAGE_MARGIN_BOTTOM) / scale
      );
      // if (pageNum === 1) {
      // } else {
      //   const topMargin = 20;
      //   const bottomMargin = 16;
      //   return this.MAX_HEIGHT_SUBSEQUENT - (topMargin + bottomMargin) / scale;
      // }
    };

    while (remainingHeight > 0) {
      const currentPageHeight = Math.min(
        remainingHeight,
        getMaxHeight(pageNumber)
      );
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      if (!tempCtx) {
        throw new Error("Could not get canvas context");
      }

      tempCanvas.width = canvas.width;
      tempCanvas.height = currentPageHeight * scale;

      tempCtx.drawImage(
        canvas,
        0,
        sourceY * scale,
        canvas.width,
        currentPageHeight * scale,
        0,
        0,
        canvas.width,
        currentPageHeight * scale
      );

      const imageData = tempCanvas.toDataURL("image/png", 1.0);
      const pageY = pageNumber === 1 ? currentY : this.PAGE_MARGIN_TOP - 4;

      pdf.addImage(
        imageData,
        "PNG",
        this.PAGE_MARGIN,
        pageY,
        this.CONTENT_WIDTH,
        currentPageHeight,
        `page-${pageNumber}`,
        "FAST"
      );

      remainingHeight -= currentPageHeight;
      this.addPageNumber(pdf, pageNumber);

      if (remainingHeight > 0) {
        pdf.addPage();
        sourceY += currentPageHeight;
        pageNumber++;
      }

      tempCanvas.remove();
    }
  }

  private static initializePDF(): jsPDF {
    return new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
  }

  private static setMetadata(
    pdf: jsPDF,
    metadata: NonNullable<PDFGenerationOptions["metadata"]>
  ): void {
    const properties: Record<string, any> = {};

    if (metadata.author) properties.author = metadata.author;
    if (metadata.subject) properties.subject = metadata.subject;
    if (metadata.keywords) properties.keywords = metadata.keywords.join(", ");
    if (metadata.creator) properties.creator = metadata.creator;
    if (metadata.creationDate)
      properties.creationDate = new Date(metadata.creationDate);
    if (metadata.modificationDate)
      properties.modDate = new Date(metadata.modificationDate);

    Object.entries(metadata).forEach(([key, value]) => {
      if (
        ![
          "author",
          "subject",
          "keywords",
          "creator",
          "creationDate",
          "modificationDate",
        ].includes(key)
      ) {
        properties[key] = value;
      }
    });

    pdf.setProperties(properties);
  }

  private static addHeader(pdf: jsPDF, options: PDFGenerationOptions): void {
    const headerColor = options.styling?.colors?.header || "#212121";
    const textColor = options.styling?.colors?.text || "#646464";
    const accentColor = options.styling?.colors?.accent || "#c8c8c8";

    pdf.setFontSize(24);
    pdf.setTextColor(headerColor);
    pdf.text(options.title, this.PAGE_MARGIN, this.PAGE_MARGIN_TOP);

    pdf.setFontSize(12);
    pdf.setTextColor(textColor);
    pdf.text(
      `Type: ${options.type}`,
      this.PAGE_MARGIN,
      this.PAGE_MARGIN_TOP + 10
    );

    const dateText = new Date().toLocaleDateString();
    const textWidth = pdf.getTextWidth(dateText);
    pdf.text(
      dateText,
      this.PAGE_WIDTH - this.PAGE_MARGIN - textWidth,
      this.PAGE_MARGIN_TOP + 10
    );

    pdf.setDrawColor(accentColor);
    pdf.line(
      this.PAGE_MARGIN,
      this.PAGE_MARGIN_TOP + 16,
      this.PAGE_WIDTH - this.PAGE_MARGIN,
      this.PAGE_MARGIN_TOP + 16
    );
  }

  private static addPageNumber(pdf: jsPDF, pageNumber: number): void {
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    // const bottomMargin = pageNumber === 1 ? this.PAGE_MARGIN_BOTTOM : 12;
    const bottomMargin = 16;
    pdf.text(
      `Page ${pageNumber}`,
      this.PAGE_WIDTH - 30,
      pdf.internal.pageSize.getHeight() - bottomMargin
    );
  }

  private static savePDF(pdf: jsPDF, title: string, type: string): void {
    const formattedTitle = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    pdf.save(`${formattedTitle}-${type}.pdf`);
  }
}

export type {
  BaseData,
  DefaultTemplateData,
  CustomTemplateData,
  PDFTemplateData,
  PDFGenerationOptions,
};
