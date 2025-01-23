"use client";

import React from "react";
import classNames from "classnames/bind";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import type { ProjectCardProps } from "./types";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import StageProgress from "../StageProgress";
import Typography from "../Typography";
import styles from "./ProjectCard.module.scss";

const cx = classNames.bind(styles);

const DEFAULT_STAGES = [
  { name: "initiation", threshold: 20 },
  { name: "planning", threshold: 40 },
  { name: "execution", threshold: 60 },
  { name: "review", threshold: 80 },
  { name: "completion", threshold: 100 },
];

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  size = "default",
  theme = { type: "light" },
  dictionary,
}) => {
  const {
    id,
    description,
    lastUpdated,
    name,
    priority,
    progress,
    stages,
    status,
    type,
  } = project;

  const statusClassName = cx("project-card__header-status", {
    "project-card__header-status--inProgress": ["inProgress"].includes(
      status.value
    ),
    "project-card__header-status--onHold": ["onHold"].includes(status.value),
    "project-card__header-status--completed": ["completed"].includes(
      status.value
    ),
  });

  const priorityClassName =
    priority &&
    cx("project-card__priority", `project-card__priority--${priority}`);

  const formattedStages =
    stages ||
    DEFAULT_STAGES.map((stage) => ({
      ...stage,
      name: stage.name,
    }));

  return (
    <div
      className={cx(
        "project-card",
        `project-card--${size}`,
        `project-card--theme-${theme.type}`
      )}
    >
      <div className={cx("project-card__header")}>
        <div className={cx("project-card__header-top")}>
          <Typography as="span" variant="p3" className={statusClassName}>
            {status.label}
          </Typography>
          {priority && (
            <ThemedTypography
              as="span"
              variant="label"
              className={priorityClassName}
              noWrap
            >
              {priority.label}
            </ThemedTypography>
          )}
        </div>
        <ThemedTypography
          variant={size === "default" ? "h4" : "h5"}
          className={cx("project-card__header-title")}
          noWrap
        >
          {name}
        </ThemedTypography>
      </div>

      {size === "default" && (
        <ThemedTypography
          variant="p1"
          className={cx("project-card__description")}
        >
          {description}
        </ThemedTypography>
      )}

      <StageProgress
        progress={progress}
        stages={formattedStages}
        gradientVariant="progressive"
        variant="timeline"
        type={type.label || "Other"}
        size={size}
        theme={{ type: theme.type }}
      />

      <div className={cx("project-card__footer")}>
        <div className={cx("project-card__footer-details")}>
          <ThemedTypography
            variant="p2"
            color="secondary"
            className={cx("project-card__footer-updated")}
          >
            {lastUpdated && typeof lastUpdated === "string"}
            {format(new Date(lastUpdated), "MMM d, yyyy")}
          </ThemedTypography>
        </div>

        <Link
          href={`/dashboard/project/${id}`}
          className={cx("project-card__footer-link")}
        >
          <ThemedTypography variant="p2">
            {dictionary.links.view.label}
          </ThemedTypography>
          <ArrowRight
            className={cx("project-card__footer-link-icon")}
            size={20}
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
