"use client";

import classNames from "classnames/bind";
import {
  FileText,
  FileImage,
  FileSpreadsheet,
  PenTool,
  File,
  Component as ComponentIcon,
  LayoutTemplate,
  LineChart,
  Users,
  FileIcon,
} from "lucide-react";
import type { ContentItemProps, ContentItemType } from "./types";
import { defaultContentItemTheme } from "./types";
import { formatCustomDateUTC } from "@/app/_utils/date-utils";
import { ThemedTypography } from "../Typography/ThemedTypography";
import styles from "./ContentItem.module.scss";

const cx = classNames.bind(styles);

const ContentIcons: Record<ContentItemType | string, React.ElementType> = {
  Document: FileText,
  Design: PenTool,
  Spreadsheet: FileSpreadsheet,
  Image: FileImage,
  Component: ComponentIcon,
  // "design-system": LayoutTemplate,
  "design-system": PenTool,
  "market-research": LineChart,
  "user-personas": Users,
  Other: File,
};

export const ContentItem: React.FC<ContentItemProps> = ({
  content,
  onClick,
  theme = defaultContentItemTheme,
  className,
}) => {
  const { id, title, description, project, type, updatedAt } = content;

  let IconComponent;
  let contentType;
  let size;

  if (content.type === "file") {
    IconComponent = ContentIcons[content.fileType] || ContentIcons.Other;
    contentType = content.fileType;
    size = content.size;
  } else {
    IconComponent =
      ContentIcons[content.componentType] || ContentIcons.Component;
    contentType = "Component";
    size = 0;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Just call onClick with the id, let parent handle navigation
    onClick?.(id);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div
      className={cx(
        "content-item",
        className,
        `content-item--theme-${theme.type}`,
        `content-item--type-${type}`
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      style={
        theme.type === "custom"
          ? ({
              "--content-item-background": theme.colors?.background,
              "--content-item-background-hover": theme.colors?.backgroundHover,
              "--content-item-border": theme.colors?.border,
              "--content-item-icon-color": theme.colors?.iconColor,
              "--content-item-text": theme.colors?.text,
              "--content-item-text-secondary": theme.colors?.textSecondary,
              "--content-item-type-background": theme.colors?.typeBackground,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className={cx("content-item__content")}>
        <div className={cx("content-item__main")}>
          <div className={cx("content-item__icon")}>
            <IconComponent size={14} />
          </div>
          <ThemedTypography
            variant="p2"
            fontWeight={500}
            color="secondary"
            className={cx("content-item__name")}
            noWrap
          >
            {title}
          </ThemedTypography>
          <ThemedTypography
            variant="p3"
            fontWeight={500}
            color="tertiary"
            className={cx("content-item__date")}
          >
            {project.name}
          </ThemedTypography>
        </div>
        <div className={cx("content-item__meta")}>
          {/* <div className={cx("content-item__meta-row")}>
          {type && (
              <ThemedTypography
                variant="p3"
                color="tertiary"
                fontWeight={500}
                className={cx("content-type")}
              >
                {type}
              </ThemedTypography>
            )}
            {size > 0 && (
              <ThemedTypography
                variant="p3"
                color="secondary"
                className={cx("content-item__size")}
              >
                {formatFileSize(size)}
              </ThemedTypography>
            )}
          </div> */}
          <div className={cx("content-item__meta-row")}>
            {description && (
              <ThemedTypography
                variant="p3"
                color="tertiary"
                fontWeight={500}
                className={cx("content-item__description")}
              >
                {description}
              </ThemedTypography>
            )}
            <ThemedTypography
              variant="p3"
              color="tertiary"
              fontWeight={500}
              noWrap
              align="right"
            >
              {formatCustomDateUTC(updatedAt)}
            </ThemedTypography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
