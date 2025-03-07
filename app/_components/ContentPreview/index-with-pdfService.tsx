"use client";

import React, { useState, useRef, useEffect } from "react";
import { Download, AlertCircle, Component } from "lucide-react";
import classNames from "classnames/bind";

import {
  ComponentContent,
  DesignSystemContent,
} from "../../_types/models/ComponentContent";
import { ContentPreviewProps } from "./types";

import { useSettings } from "../../_context/SettingsContext";
import { PDFService } from "../../_services/pdfService";

import { ThemedTypography } from "../Typography/ThemedTypography";
import { DesignSystemPreview } from "../DesignSystemPreview";
import { FilePreviewFactory } from "./PreviewComponents";

import { formatCustomDateUTC } from "../../_utils/date-utils";
import { downloadFile } from "./utils";

import styles from "./ContentPreview.module.scss";
import { PDFSection } from "../../_services/pdfService.types";
import {
  ColorPalette,
  TypographySection,
  SpacingSection,
} from "../pdfTemplates/DesignSystemPDF/DesignSystemPDF";
import { DOMWrapper } from "../pdfTemplates/DOMWrapper";

const cx = classNames.bind(styles);

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  dictionary,
  content,
  onError,
  onDownloadStart,
  onDownloadComplete,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useSettings();
  const componentRef = useRef<HTMLDivElement>(null);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    onError?.(errorMessage);
  };

  const generatePDFSections = (data: DesignSystemContent): PDFSection[] => {
    return [
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
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      setError(null);
      onDownloadStart?.();

      if (content.type === "file") {
        await downloadFile(content.url, content.title);
      } else {
        const pdfOptions = {
          title: content.title,
          project: content.project.name,
          metadata: {
            author: content.createdBy?.name,
            creator: "Design System Generator",
            creationDate: content.createdAt,
            modificationDate: content.updatedAt,
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
          dictionary,
          theme,
        };

        if (content.componentType === "design-system") {
          await PDFService.generatePDF({
            ...pdfOptions,
            sections: generatePDFSections(content.data as DesignSystemContent),
          });
        } else {
          // Para otros tipos de componentes
          const element = componentRef.current;
          if (!element) {
            throw new Error("Component reference not found");
          }

          const ComponentToPDF: React.FC = () => (
            <DOMWrapper content={element} />
          );

          await PDFService.generatePDF({
            ...pdfOptions,
            sections: [
              {
                id: "main",
                Component: ComponentToPDF,
                data: {},
                startNewPage: false,
              },
            ],
          });
        }
      }

      onDownloadComplete?.();
    } catch (err) {
      const errorMessage =
        content.type === "file"
          ? dictionary.preview.errors.downloadError
          : dictionary.preview.errors.pdfGenerationError;
      handleError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderComponentPreview = (componentContent: ComponentContent) => {
    const { componentType, data } = componentContent;

    switch (componentType) {
      case "design-system":
        return (
          <div className={cx("preview__view")}>
            <DesignSystemPreview
              theme={{ type: theme }}
              data={data as DesignSystemContent}
              initialSection="colors"
            />
          </div>
        );
      case "market-research":
        return (
          <div className={cx("preview__component-container")}>
            <ThemedTypography variant="p1" color="secondary">
              {dictionary.preview.components.marketResearch.title}
            </ThemedTypography>
          </div>
        );
      case "user-personas":
        return (
          <div className={cx("preview__component-container")}>
            <ThemedTypography variant="p1" color="secondary">
              {dictionary.preview.components.userPersonas.title}
            </ThemedTypography>
          </div>
        );
      default:
        return (
          <div className={cx("preview__placeholder")}>
            <Component size={48} />
            <ThemedTypography variant="p1" color="secondary">
              {dictionary.preview.components.unavailable.message}
            </ThemedTypography>
          </div>
        );
    }
  };

  return (
    <div className={cx("preview", `preview--theme-${theme}`)}>
      <div className={cx("preview__header")}>
        <div className={cx("preview__title-section")}>
          <div className={cx("preview__title-content")}>
            <ThemedTypography
              variant="h3"
              color="secondary"
              fontWeight={400}
              className={cx("preview__filename")}
            >
              <Component
                className={cx("preview__title-icon")}
                strokeWidth={2.3}
                size={20}
              />
              {content.title}
            </ThemedTypography>
            {content.description && (
              <ThemedTypography
                variant="p1"
                color="tertiary"
                fontWeight={300}
                className={cx("preview__description")}
              >
                {content.description}
              </ThemedTypography>
            )}
          </div>
        </div>
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className={cx("preview__download-button")}
          aria-label={dictionary.header.download.ariaLabel}
        >
          <Download size={20} />
          <ThemedTypography variant="p2">
            {isLoading
              ? dictionary.header.download.loading
              : dictionary.header.download.label}
          </ThemedTypography>
        </button>
      </div>

      <div className={cx("preview__metadata")}>
        <div className={cx("preview__metadata-item", "preview__project")}>
          <ThemedTypography
            variant="p3"
            fontWeight={400}
            color="tertiary"
            className={cx("preview__project-text")}
          >
            {dictionary.header.metadata.project}
          </ThemedTypography>
          <ThemedTypography variant="p3" fontWeight={400} color="tertiary">
            {content.project.name}
          </ThemedTypography>
        </div>

        <div className={cx("preview__metadata-item")}>
          <ThemedTypography variant="p3" fontWeight={400} color="tertiary">
            {dictionary.header.metadata.updated}
          </ThemedTypography>
          <ThemedTypography variant="p3" fontWeight={400} color="tertiary">
            {content.updatedAt
              ? formatCustomDateUTC(content.updatedAt, "MMM D, YYYY")
              : formatCustomDateUTC(content.createdAt, "MMM D, YYYY")}
          </ThemedTypography>
        </div>

        {content.type === "file" && (
          <ThemedTypography
            variant="p2"
            color="secondary"
            className={cx("preview__size")}
          >
            {(content.size / (1024 * 1024)).toFixed(1)}{" "}
            {dictionary.header.metadata.size}
          </ThemedTypography>
        )}
      </div>

      <div ref={componentRef} className={cx("preview__viewer")}>
        {error ? (
          <div className={cx("preview__error")}>
            <AlertCircle size={24} />
            <ThemedTypography variant="p1" color="error">
              {error}
            </ThemedTypography>
          </div>
        ) : content.type === "file" ? (
          FilePreviewFactory.createPreview(content, handleError)
        ) : (
          renderComponentPreview(content)
        )}
      </div>
    </div>
  );
};

export default ContentPreview;
