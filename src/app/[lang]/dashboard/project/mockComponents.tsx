// app/dashboard/project/[id]/mockComponents.tsx
import React from "react";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import styles from "./mockComponents.module.scss";
import classNames from "classnames/bind";
import { Project } from "./[id]/ProjectClient";

const cx = classNames.bind(styles);

export const MockProjectHeader = ({ project }: { project: Project }) => (
  <div className={cx("mock-header")}>
    <ThemedTypography variant="h4" className={cx("mock-header__title")}>
      {project.name}
    </ThemedTypography>
    <div className={cx("mock-header__status")}>
      <ThemedTypography variant="p2" color="secondary">
        Status: {project.status}
      </ThemedTypography>
    </div>
    <div className={cx("mock-header__progress")}>
      <div
        className={cx("mock-header__progress-bar")}
        style={{ width: `${project.progress}%` }}
      />
    </div>
  </div>
);

export const MockProjectPlanning = ({ projectId }: { projectId: string }) => (
  <div className={cx("mock-planning")}>
    <ThemedTypography variant="h4" className={cx("mock-planning__title")}>
      Project Planning
    </ThemedTypography>
    <ThemedTypography variant="p2" color="secondary">
      Planning details for project {projectId}
    </ThemedTypography>
  </div>
);

export const MockDeliverableCard = ({
  deliverable,
  onAddComment,
}: {
  deliverable: any;
  onAddComment: (id: string, text: string) => void;
}) => (
  <div className={cx("mock-deliverable")}>
    <ThemedTypography variant="h5" className={cx("mock-deliverable__title")}>
      {deliverable.name}
    </ThemedTypography>
    <div className={cx("mock-deliverable__info")}>
      <ThemedTypography variant="p2" color="secondary">
        Status: {deliverable.status}
      </ThemedTypography>
      <ThemedTypography variant="p2" color="secondary">
        Due: {deliverable.dueDate}
      </ThemedTypography>
    </div>
    <div className={cx("mock-deliverable__progress")}>
      <div
        className={cx("mock-deliverable__progress-bar")}
        style={{ width: `${deliverable.progress}%` }}
      />
    </div>
  </div>
);

export const MockFileCard = ({
  file,
  projectId,
}: {
  file: any;
  projectId: string;
}) => (
  <div className={cx("mock-file")}>
    <ThemedTypography variant="p2" className={cx("mock-file__name")}>
      {file.name}
    </ThemedTypography>
    <ThemedTypography
      variant="p3"
      color="secondary"
      className={cx("mock-file__size")}
    >
      {file.size}
    </ThemedTypography>
  </div>
);
