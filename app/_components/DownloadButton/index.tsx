"use client";
// components/DownloadButton.tsx
import React from "react";
import { pdf } from "@react-pdf/renderer";
import { DesignSystemContent } from "@/app/_types/models/ComponentContent";
import { DesignSystemDocument } from "../pdfTemplates/DesignSystemDocument";
import { useSettings } from "../../_context/SettingsContext";

interface DownloadButtonProps {
  data: DesignSystemContent;
  title: string;
  project: string;
  className?: string;
  children?: React.ReactNode;
  onStart?: () => void;
  onComplete?: () => void;
  onError?: (error: string) => void;
}

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ñ]/g, "n")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  data,
  title,
  project,
  className,
  children,
  onStart,
  onComplete,
  onError,
}) => {
  const { language } = useSettings();
  const handleDownload = async () => {
    try {
      onStart?.();

      const blob = await pdf(
        <DesignSystemDocument
          data={data}
          title={title}
          project={project}
          language={language}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${normalizeText(title)}-${normalizeText(project)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onComplete?.();
    } catch (error) {
      console.error("Error generating PDF:", error);
      onError?.(
        error instanceof Error ? error.message : "Error generating PDF"
      );
    }
  };

  return (
    <button onClick={handleDownload} className={className} type="button">
      {children}
    </button>
  );
};
