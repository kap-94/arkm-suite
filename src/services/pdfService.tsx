// services/PDFService.ts

import jsPDF from "jspdf";
import html2canvas, { Options as Html2CanvasOptions } from "html2canvas";
import React from "react";
import { createRoot } from "react-dom/client";
import {
  PDFGenerationOptions,
  PDFMetadata,
  PDFSection,
} from "./pdfService.types";

interface FontConfig {
  size: number;
  weight: number;
  lineHeight: number;
  letterSpacing: number;
}

export class PDFService {
  // Constants
  static readonly PAGE_MARGIN = 20;
  static readonly PAGE_MARGIN_TOP = 22;
  static readonly PAGE_MARGIN_BOTTOM = 64;
  static readonly PAGE_WIDTH = 210;
  static readonly CONTENT_WIDTH = 170;
  static readonly DEFAULT_SCALE = 2;
  private static readonly MAX_HEIGHT = 260;
  private static readonly HEADER_HEIGHT = 24;

  private static readonly TYPOGRAPHY_CONFIG: Record<string, FontConfig> = {
    h1: { size: 64, weight: 700, lineHeight: 1, letterSpacing: 0.01 },
    h2: { size: 32, weight: 600, lineHeight: 1, letterSpacing: 0.01 },
    h3: { size: 24, weight: 600, lineHeight: 1.4, letterSpacing: 0.01 },
    h4: { size: 20, weight: 500, lineHeight: 1.5, letterSpacing: 0.01 },
    h5: { size: 16, weight: 600, lineHeight: 1.4, letterSpacing: 0.01 },
    p1: { size: 16, weight: 400, lineHeight: 1.6, letterSpacing: 0.01 },
    p2: { size: 14, weight: 400, lineHeight: 1.5, letterSpacing: 0.01 },
    p3: { size: 12, weight: 400, lineHeight: 1.4, letterSpacing: 0.01 },
    label: { size: 14, weight: 400, lineHeight: 1.4, letterSpacing: 0.01 },
  };

  private static normalizeText(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[ñ]/g, "n")
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ""); // Remove hyphens from start and end
  }

  private static getColorFromTheme(
    color: string | undefined,
    theme: string
  ): string {
    const colorMap = {
      light: {
        text: "#000000",
        secondary: "rgba(0, 0, 0, 0.7)",
        tertiary: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.4)",
        success: "#16a34a",
        error: "#dc2626",
        warning: "#d97706",
        info: "#2563eb",
      },
      dark: {
        text: "rgba(241, 228, 228, 0.96)",
        secondary: "rgba(241, 228, 228, 0.9)",
        tertiary: "rgba(241, 228, 228, 0.7)",
        disabled: "rgba(241, 228, 228, 0.4)",
        success: "#22c55e",
        error: "#ef4444",
        warning: "#fbbf24",
        info: "#60a5fa",
      },
    };

    return color
      ? colorMap[theme as keyof typeof colorMap][
          color as keyof (typeof colorMap)["light"]
        ] || colorMap[theme as keyof typeof colorMap].text
      : colorMap[theme as keyof typeof colorMap].text;
  }

  private static getTypographyStyles(element: HTMLElement): {
    variant: string;
    color?: string;
    fontWeight?: number;
    customStyles: CSSStyleDeclaration;
  } {
    const classList = Array.from(element.classList);
    const customStyles = window.getComputedStyle(element);

    const variantClass = classList.find(
      (className) =>
        className.startsWith("typography--") &&
        !className.startsWith("typography--theme-") &&
        !className.startsWith("typography--truncate") &&
        !className.startsWith("typography--gutterBottom") &&
        !className.startsWith("typography--paragraph")
    );
    const variant = variantClass
      ? variantClass.replace("typography--", "")
      : "p1";

    const colorClass = classList.find((className) =>
      [
        "secondary",
        "tertiary",
        "disabled",
        "success",
        "error",
        "warning",
        "info",
      ].some((color) => className === `typography--${color}`)
    );
    const color = colorClass
      ? colorClass.replace("typography--", "")
      : undefined;

    return {
      variant,
      color,
      fontWeight: customStyles.fontWeight
        ? parseInt(customStyles.fontWeight)
        : undefined,
      customStyles,
    };
  }

  private static async renderSection(
    section: PDFSection,
    options: PDFGenerationOptions
  ): Promise<{ element: HTMLElement; textElements: HTMLElement[] }> {
    const containerDiv = document.createElement("div");
    containerDiv.id = `pdf-section-${section.id}`;
    containerDiv.style.width = `${this.CONTENT_WIDTH}mm`;
    containerDiv.style.margin = "0";
    containerDiv.style.padding = "0";
    containerDiv.style.position = "absolute";
    containerDiv.style.left = "-9999px";
    containerDiv.style.top = "0";
    containerDiv.style.backgroundColor =
      options.styling?.colors?.background || "#ffffff";

    if (section.minHeight) {
      containerDiv.style.minHeight = `${section.minHeight}mm`;
    }
    if (section.maxHeight) {
      containerDiv.style.maxHeight = `${section.maxHeight}mm`;
    }

    const componentContainer = document.createElement("div");
    containerDiv.appendChild(componentContainer);

    const root = createRoot(componentContainer);
    root.render(
      React.createElement(section.Component, {
        data: section.data,
        dictionary: options.dictionary,
        theme: options.theme,
      })
    );

    document.body.appendChild(containerDiv);

    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 500)),
      document.fonts.ready,
      ...Array.from(containerDiv.getElementsByTagName("img")).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            })
      ),
    ]);

    const textElements = Array.from(
      containerDiv.getElementsByClassName("typography")
    ).filter(
      (element): element is HTMLElement => element instanceof HTMLElement
    );

    return { element: containerDiv, textElements };
  }

  private static async generateSectionCanvas(
    element: HTMLElement,
    scale: number = this.DEFAULT_SCALE
  ): Promise<HTMLCanvasElement> {
    const options: Html2CanvasOptions = {
      backgroundColor: "#ffffff",
      foreignObjectRendering: false,
      scale: scale,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      width: element.offsetWidth,
      height: element.offsetHeight,
      removeContainer: false,
      allowTaint: true,
      imageTimeout: 15000,
      onclone: (clonedDoc: Document, element: HTMLElement) => {
        const navElements =
          element.getElementsByClassName("navigation-section");
        Array.from(navElements).forEach((nav) => nav.remove());
      },
    };

    const canvas = await html2canvas(element, options);
    await new Promise((resolve) => setTimeout(resolve, 100));
    return canvas;
  }

  private static async addSectionToPDF(
    pdf: jsPDF,
    sectionData: { element: HTMLElement; textElements: HTMLElement[] },
    canvas: HTMLCanvasElement,
    startNewPage: boolean,
    currentY: number,
    isFirstSection: boolean,
    options: PDFGenerationOptions
  ): Promise<number> {
    const scale = canvas.width / this.CONTENT_WIDTH;
    const contentHeight = canvas.height / scale;

    if (startNewPage && !isFirstSection) {
      pdf.addPage();
      currentY = this.PAGE_MARGIN_TOP;
    }

    const maxPageHeight = isFirstSection
      ? this.MAX_HEIGHT - this.HEADER_HEIGHT
      : this.MAX_HEIGHT;
    const availableSpace = maxPageHeight - (currentY - this.PAGE_MARGIN_TOP);

    if (contentHeight > availableSpace) {
      if (!isFirstSection) {
        pdf.addPage();
        currentY = this.PAGE_MARGIN_TOP;
      }
    }

    pdf.addImage(
      canvas.toDataURL("image/png", 1.0),
      "PNG",
      this.PAGE_MARGIN,
      currentY,
      this.CONTENT_WIDTH,
      contentHeight,
      undefined,
      "FAST"
    );

    sectionData.textElements.forEach((el) => {
      const { variant, color, fontWeight, customStyles } =
        this.getTypographyStyles(el);

      const config = this.TYPOGRAPHY_CONFIG[variant];
      if (!config) return;

      const rect = el.getBoundingClientRect();
      const x = rect.left / scale + this.PAGE_MARGIN;
      let y = rect.top / scale + currentY;

      y += (config.size * config.lineHeight * (72 / 96)) / 2;

      pdf.setFontSize(config.size * (72 / 96));
      const effectiveWeight = fontWeight || config.weight;
      pdf.setFont("helvetica", effectiveWeight >= 600 ? "bold" : "normal");

      const effectiveColor = this.getColorFromTheme(
        color,
        options.theme || "light"
      );
      const tempDiv = document.createElement("div");
      tempDiv.style.color = effectiveColor;
      document.body.appendChild(tempDiv);
      const computedColor = window.getComputedStyle(tempDiv).color;
      document.body.removeChild(tempDiv);
      const [r, g, b] = computedColor.match(/\d+/g)!.map(Number);
      pdf.setTextColor(r, g, b);

      const text = el.textContent?.trim() || "";
      const textWidth = pdf.getTextWidth(text);
      let xPos = x;

      switch (customStyles.textAlign) {
        case "center":
          xPos = x + (rect.width / scale - textWidth) / 2;
          break;
        case "right":
          xPos = x + (rect.width / scale - textWidth);
          break;
      }

      pdf.text(text, xPos, y);
    });

    return currentY + contentHeight + this.PAGE_MARGIN_BOTTOM;
  }

  static async generatePDF(options: PDFGenerationOptions): Promise<void> {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      if (options.metadata) {
        this.setMetadata(pdf, options.metadata);
      }

      this.addHeader(pdf, options);
      let currentY = this.PAGE_MARGIN_TOP + 24;

      for (let i = 0; i < options.sections.length; i++) {
        const section = options.sections[i];
        const sectionData = await this.renderSection(section, options);
        const canvas = await this.generateSectionCanvas(
          sectionData.element,
          section.scale || this.DEFAULT_SCALE
        );

        currentY = await this.addSectionToPDF(
          pdf,
          sectionData,
          canvas,
          section.startNewPage ?? true,
          currentY,
          i === 0,
          options
        );

        if (document.body.contains(sectionData.element)) {
          const root = (sectionData.element.firstElementChild as any)
            ?._reactRootContainer;
          if (root) {
            root.unmount();
          }
          document.body.removeChild(sectionData.element);
        }
      }

      for (let i = 1; i <= pdf.getNumberOfPages(); i++) {
        pdf.setPage(i);
        this.addPageNumber(pdf, i);
      }

      this.savePDF(pdf, options.title, options.project);
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw new Error(
        `Failed to generate PDF: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private static setMetadata(pdf: jsPDF, metadata: PDFMetadata): void {
    const properties: Record<string, any> = {};

    Object.entries(metadata).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "creationDate" || key === "modificationDate") {
          properties[key === "creationDate" ? "creationDate" : "modDate"] =
            new Date(value);
        } else if (key === "keywords" && Array.isArray(value)) {
          properties.keywords = value.join(", ");
        } else {
          properties[key] = value;
        }
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
    pdf.text(`${options.project}`, this.PAGE_MARGIN, this.PAGE_MARGIN_TOP + 10);

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
    const text = `Page ${pageNumber}`;
    const textWidth = pdf.getTextWidth(text);
    pdf.text(
      text,
      this.PAGE_WIDTH - this.PAGE_MARGIN - textWidth,
      pdf.internal.pageSize.getHeight() - 16
    );
  }

  private static savePDF(pdf: jsPDF, title: string, project: string): void {
    const formattedTitle = this.normalizeText(title);
    const formattedProject = this.normalizeText(project);

    pdf.save(`${formattedTitle}-${formattedProject}.pdf`);
  }
}
