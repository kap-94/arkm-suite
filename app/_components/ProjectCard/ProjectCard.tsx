import Link from "next/link";
import classNames from "classnames/bind";
import { format } from "date-fns";
import type { ProjectCardProps, ProjectCardStage } from "./types";
import { ThemedTypography } from "../Typography/ThemedTypography";
import StageProgress from "../StageProgress";
import Badge from "../Badge";

import styles from "./ProjectCard.module.scss";
import { buildLocalizedPath } from "../../_utils/path";

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
  language,
  size = "default",
  theme = { type: "light" },
  dictionary,
}) => {
  const { slug, description, updatedAt, name, progress, stages, status, type } =
    project;

  // Helper function to format stages
  const formatProjectStages = (
    projectStages: ProjectCardStage[],
    currentProgress: number
  ) => {
    if (!projectStages || projectStages.length === 0) {
      return DEFAULT_STAGES.map((stage) => ({
        ...stage,
        completed: currentProgress >= stage.threshold,
      }));
    }

    // Sort stages by order
    const sortedStages = [...projectStages].sort((a, b) => a.order - b.order);
    const totalStages = sortedStages.length;

    return sortedStages.map((stage, index) => {
      // Calculate threshold based on stage position
      const threshold = Math.round(((index + 1) / totalStages) * 100);

      return {
        name: stage.name,
        threshold,
        completed: stage.status.value === "completed",
        // Optional color based on status
        color:
          stage.status.value === "completed"
            ? "#4ade80"
            : stage.status.value === "inProgress"
            ? "#60a5fa"
            : undefined,
      };
    });
  };

  // Format stages for StageProgress component
  const formattedStages = formatProjectStages(stages, progress);

  return (
    <div
      className={cx(
        "project-card",
        `project-card--${size}`,
        `project-card--theme-${theme.type}`
      )}
    >
      <div className={cx("project-card__header")}>
        <ThemedTypography
          variant={size === "default" ? "h4" : "h5"}
          // color="secondary"
          fontWeight={400}
          className={cx("project-card__header-title")}
          // noWrap
        >
          {name}
        </ThemedTypography>

        {/* {size === "default" && ( */}
        <Badge
          size="small"
          className={cx("project-card__badge")}
          label={status.label}
          status={status.value}
        />
        {/* )} */}
      </div>

      {size === "default" && (
        <ThemedTypography
          variant="p1"
          color="secondary"
          fontWeight={300}
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
            {dictionary.labels.lastUpdated}:
          </ThemedTypography>
          <ThemedTypography
            variant="p2"
            color="secondary"
            className={cx("project-card__footer-updated")}
          >
            {format(updatedAt, "dd/MM/yyyy")}
          </ThemedTypography>
        </div>

        <Link
          href={`${buildLocalizedPath("dashboard/project", language)}/${slug}`}
          className={cx("project-card__footer-link")}
        >
          <ThemedTypography variant="p2" color="secondary">
            {dictionary.links.view.label}
          </ThemedTypography>
          {/* <ArrowRight
            className={cx("project-card__footer-link-icon")}
            size={20}
            strokeWidth={1.5}
          /> */}
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
