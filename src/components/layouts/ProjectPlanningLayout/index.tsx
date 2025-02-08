// components/ProjectPlanning/ProjectPlanning.tsx
import React from "react";
import { Filter, Download, Plus } from "lucide-react";
import classNames from "classnames/bind";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { ProjectPlanningProps } from "./types";
import styles from "./ProjectPlanningLayout.module.scss";

const cx = classNames.bind(styles);

export const ProjectPlanningLayout: React.FC<ProjectPlanningProps> = ({
  theme = { type: "light" },
  children,
  title,
}) => {
  return (
    <div className={cx("planning", `planning--theme-${theme.type}`)}>
      <div className={cx("planning__header")}>
        <div className={cx("planning__title")}>
          <ThemedTypography variant="p2" color="secondary">
            {title}
          </ThemedTypography>
        </div>

        <div className={cx("planning__actions")}></div>
      </div>

      {children}
    </div>
  );
};
