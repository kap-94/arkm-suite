// components/DesignSystemPDF/index.tsx

import { DesignSystemContent } from "@/types/models/ComponentContent";
import { PDFService } from "@/services/pdfService";
import { PDFSection } from "@/services/pdfService.types";
import { ColorPalette } from "./components/ColorPalette";
import { SpacingSection } from "./components/SpacingSection";
import { TypographySection } from "./components/TypographySection";

interface DesignSystemPDFProps {
  data: DesignSystemContent;
  projectName: string; // Nueva prop para el nombre del proyecto
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const generateDesignSystemPDF = async ({
  data,
  projectName,
  onSuccess,
  onError,
}: DesignSystemPDFProps) => {
  try {
    const sections: PDFSection[] = [
      {
        id: "colors",
        Component: ColorPalette,
        data: {
          title: data.labels.colors.title,
          colorPalette: data.colorPalette,
        },
        startNewPage: true,
        minHeight: 100,
      },
      {
        id: "typography",
        Component: TypographySection,
        data: {
          title: data.labels.typography.title,
          typographyStyles: data.typographyStyles,
          sampleText: data.labels.typography.sampleText,
        },
        startNewPage: true,
      },
      {
        id: "spacing",
        Component: SpacingSection,
        data: {
          title: data.labels.spacing.title,
          spacingScale: data.spacingScale,
          unitsLabel: data.labels.spacing.unitsLabel,
        },
        startNewPage: true,
      },
    ];

    await PDFService.generatePDF({
      title: "Design System Documentation",
      project: projectName, // Usamos el nombre del proyecto proporcionado
      sections,
      metadata: {
        author: "Design Team",
        creator: "Design System Generator",
        creationDate: new Date().toISOString(),
      },
      styling: {
        colors: {
          header: "#212121",
          text: "#646464",
          accent: "#c8c8c8",
          background: "#ffffff",
        },
        fonts: {
          header: "Helvetica",
          body: "Arial",
        },
      },
    });

    onSuccess?.();
  } catch (error) {
    console.error("Error generating design system PDF:", error);
    onError?.(error instanceof Error ? error : new Error("Unknown error"));
  }
};

// Export individual section components for testing and reuse
export { ColorPalette } from "./components/ColorPalette";
export { TypographySection } from "./components/TypographySection";
export { SpacingSection } from "./components/SpacingSection";
