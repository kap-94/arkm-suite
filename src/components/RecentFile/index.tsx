import React from "react";
import classNames from "classnames/bind";
import {
  FileText,
  FileImage,
  FileSpreadsheet,
  PenTool,
  File,
} from "lucide-react";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import styles from "./RecentFile.module.scss";
import type { RecentFileProps, FileType } from "./types";
import { formatDistanceToNow } from "date-fns";
import { defaultTheme } from "./types";

const cx = classNames.bind(styles);

const FileIcons: Record<FileType, React.ElementType> = {
  Document: FileText,
  Design: PenTool,
  Spreadsheet: FileSpreadsheet,
  Image: FileImage,
  Other: File,
};

export const RecentFile: React.FC<RecentFileProps> = ({
  file,
  onClick,
  theme = defaultTheme,
  className,
}) => {
  const { id, name, size, type, lastModified } = file;
  const IconComponent = FileIcons[type] || FileIcons.Other;

  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div
      className={cx(
        "recent-file",
        className,
        `recent-file--theme-${theme.type}`
      )}
      onClick={handleClick}
      style={
        theme.type === "custom"
          ? ({
              "--recent-file-background": theme.colors?.background,
              "--recent-file-background-hover": theme.colors?.backgroundHover,
              "--recent-file-border": theme.colors?.border,
              "--recent-file-icon-color": theme.colors?.iconColor,
              "--recent-file-text": theme.colors?.text,
              "--recent-file-text-secondary": theme.colors?.textSecondary,
              "--recent-file-type-background": theme.colors?.typeBackground,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className={cx("recent-file__content")}>
        <div className={cx("recent-file__main")}>
          <ThemedTypography
            variant="p2"
            className={cx("recent-file__name")}
            noWrap
          >
            {name}
          </ThemedTypography>
          <ThemedTypography
            variant="p3"
            color="tertiary"
            fontWeight={500}
            className={cx("recent-file__type")}
          >
            {type}
          </ThemedTypography>
        </div>
        <div className={cx("recent-file__meta")}>
          <ThemedTypography variant="p3" className={cx("recent-file__size")}>
            {size}
          </ThemedTypography>
          <ThemedTypography variant="p3" className={cx("recent-file__date")}>
            {formatDistanceToNow(lastModified, { addSuffix: true })}
          </ThemedTypography>
        </div>
      </div>
    </div>
  );
};

export default RecentFile;
