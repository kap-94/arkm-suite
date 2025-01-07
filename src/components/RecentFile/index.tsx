import React from "react";
import classNames from "classnames/bind";
import {
  FileText,
  FileImage,
  FileSpreadsheet,
  PenTool,
  File,
} from "lucide-react";
import styles from "./RecentFile.module.scss";
import type { RecentFileProps, FileType } from "./types";
import { formatDistanceToNow } from "date-fns";

const cx = classNames.bind(styles);

const FileIcons: Record<FileType, React.ElementType> = {
  Document: FileText,
  Design: PenTool,
  Spreadsheet: FileSpreadsheet,
  Image: FileImage,
  Other: File,
};

export const RecentFile: React.FC<RecentFileProps> = ({ file, onClick }) => {
  const { id, name, size, type, lastModified } = file;
  const IconComponent = FileIcons[type] || FileIcons.Other;

  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <div className={cx("recent-file")} onClick={handleClick}>
      {/* <div
        className={cx(
          "recent-file__icon-wrapper",
          `recent-file__icon-wrapper--${type.toLowerCase()}`
        )}
      >
        <IconComponent
          className={cx("recent-file__icon")}
          size={24}
          strokeWidth={1.65}
        />
      </div> */}
      <div className={cx("recent-file__content")}>
        <div className={cx("recent-file__main")}>
          <p className={cx("recent-file__name")}>{name}</p>
          <span className={cx("recent-file__type")}>{type}</span>
        </div>
        <div className={cx("recent-file__meta")}>
          <p className={cx("recent-file__size")}>{size}</p>
          <span className={cx("recent-file__date")}>
            {formatDistanceToNow(lastModified, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentFile;
