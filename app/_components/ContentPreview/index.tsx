// components/ContentPreview.tsx
"use client";

import React, { useState } from "react";
import { Download, AlertCircle, Component } from "lucide-react";
import classNames from "classnames/bind";
import {
  ComponentContent,
  DesignSystemContent,
} from "../../_types/models/ComponentContent";
import { ContentPreviewProps } from "./types";
import { useSettings } from "../../_context/SettingsContext";
import { ThemedTypography } from "../Typography/ThemedTypography";
import { DesignSystemPreview } from "../DesignSystemPreview";
import { FilePreviewFactory } from "./PreviewComponents";
import { DownloadButton } from "../DownloadButton";
import { downloadFile } from "./utils";
import { formatCustomDateUTC } from "../../_utils/date-utils";
import styles from "./ContentPreview.module.scss";

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
  const { theme, language } = useSettings();

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    onError?.(errorMessage);
  };

  const handleDownload = async () => {
    if (content.type === "file") {
      try {
        setIsLoading(true);
        onDownloadStart?.();
        await downloadFile(content.url, content.title);
        onDownloadComplete?.();
      } catch (err) {
        handleError(dictionary.preview.errors.downloadError);
      } finally {
        setIsLoading(false);
      }
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
        {content.type === "file" ? (
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
        ) : (
          <DownloadButton
            data={content.data as DesignSystemContent}
            title={content.title}
            project={content.project.name}
            className={cx("preview__download-button")}
            onStart={() => {
              setIsLoading(true);
              onDownloadStart?.();
            }}
            onComplete={() => {
              setIsLoading(false);
              onDownloadComplete?.();
            }}
            onError={(error) => {
              setIsLoading(false);
              handleError(error);
            }}
          >
            <Download size={20} />
            <ThemedTypography variant="p2">
              {isLoading
                ? dictionary.header.download.loading
                : dictionary.header.download.label}
            </ThemedTypography>
          </DownloadButton>
        )}
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

      <div className={cx("preview__viewer")}>
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
