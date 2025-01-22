// components/ProjectPlanning/ProjectPlanning.tsx
import React from "react";
import { Filter, Download, Plus } from "lucide-react";
import classNames from "classnames/bind";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { GanttView } from "../GanttView";
import { ProjectPlanningProps } from "./types";
import styles from "./ProjectPlanning.module.scss";

const cx = classNames.bind(styles);

export const ProjectPlanning: React.FC<ProjectPlanningProps> = ({
  projectId,
  theme = { type: "light" },
  onAddTask,
  onExport,
  onFilter,
}) => {
  return (
    <div className={cx("planning", `planning--theme-${theme.type}`)}>
      <div className={cx("planning__header")}>
        <div className={cx("planning__title")}>
          <ThemedTypography variant="h4">Project Timeline</ThemedTypography>
          <ThemedTypography variant="p2" color="secondary">
            Track project progress and milestones
          </ThemedTypography>
        </div>

        <div className={cx("planning__actions")}>
          <button
            className={cx("planning__button", "planning__button--secondary")}
            onClick={onFilter}
          >
            <Filter className={cx("planning__button-icon")} />
            Filter
          </button>
          <button
            className={cx("planning__button", "planning__button--secondary")}
            onClick={onExport}
          >
            <Download className={cx("planning__button-icon")} />
            Export
          </button>
        </div>
      </div>

      <GanttView projectId={projectId} theme={theme} />
    </div>
  );
};
