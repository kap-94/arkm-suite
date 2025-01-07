import React from "react";
import { ArrowRight } from "lucide-react";
import classNames from "classnames/bind";
import { format } from "date-fns";
import Link from "next/link";
import StageProgress from "../StageProgress";
import styles from "./ProjectCard.module.scss";

export type ProjectStatus = "In Progress" | "Completed" | "On Hold";
export type ProjectPriority = "Low" | "Medium" | "High";
export type ProjectSize = "default" | "small";

export interface Stage {
  name: string;
  threshold: number;
  color?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  lastUpdated: Date | string;
  team?: string[];
  priority?: ProjectPriority;
  client?: string;
  stages?: Stage[];
}

export interface ProjectCardProps {
  project: Project;
  size?: ProjectSize;
}

export const DEFAULT_STAGES: Stage[] = [
  { name: "Initiation", threshold: 20 },
  { name: "Planning", threshold: 40 },
  { name: "Execution", threshold: 60 },
  { name: "Review", threshold: 80 },
  { name: "Completion", threshold: 100 },
];

export const STATUS_CLASSES = {
  "In Progress": "project-card__header-status--in-progress",
  Completed: "project-card__header-status--completed",
  "On Hold": "project-card__header-status--on-hold",
} as const;

const cx = classNames.bind(styles);

const ProjectCard: React.FC<ProjectCardProps> = ({
  project: {
    id,
    name,
    description,
    status,
    progress,
    lastUpdated,
    priority,
    client,
    stages,
  },
  size = "default",
}) => {
  const statusClassName = cx(
    "project-card__header-status",
    STATUS_CLASSES[status]
  );

  const priorityClassName =
    priority &&
    cx(
      "project-card__priority",
      `project-card__priority--${priority.toLowerCase()}`
    );

  return (
    <div className={cx("project-card", `project-card--${size}`)}>
      <div className={cx("project-card__header")}>
        <div>
          <span className={statusClassName}>{status}</span>
          <h3 className={cx("project-card__header-title")}>{name}</h3>
        </div>
        {priority && (
          <span className={priorityClassName}>{priority} Priority</span>
        )}
      </div>

      {size === "default" && (
        <p className={cx("project-card__description")}>{description}</p>
      )}

      <StageProgress
        progress={progress}
        stages={stages || DEFAULT_STAGES}
        gradientVariant="progressive"
        variant="timeline"
        type={client || "Generic"}
        size={size}
      />

      <div className={cx("project-card__footer")}>
        <div className={cx("project-card__footer-details")}>
          <span className={cx("project-card__footer-updated")}>
            Updated {format(new Date(lastUpdated), "MMM d, yyyy")}
          </span>
        </div>
        <Link
          href={`/dashboard/project/${id}`}
          className={cx("project-card__footer-link")}
        >
          View Details
          <ArrowRight
            className={cx("project-card__footer-link-icon")}
            size={22}
            strokeWidth={1.75}
          />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
