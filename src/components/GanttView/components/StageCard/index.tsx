import React, { forwardRef } from "react";
import classNames from "classnames/bind";
import { GanttStage } from "../../types";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { ProgressBar } from "@/components/ProgressBar";
import { LinkIcon, Target, Circle } from "lucide-react";
import styles from "./StageCard.module.scss";
import { formatCustomDate, formatDateRangeSafe } from "@/utils/date-utils";
import { StageCardLabels } from "@/types/dictionary/projectDetails.types";
import { useDashboard } from "@/context/DashboardContext";

const cx = classNames.bind(styles);

interface StageCardProps {
  stage: GanttStage;
  dictionary: StageCardLabels;
  isSelected: boolean;
  theme?: {
    type: "light" | "dark" | "custom";
    colors?: {
      background?: string;
      border?: string;
      text?: string;
      secondaryText?: string;
      divider?: string;
      gradient?: string;
    };
  };
}

export const StageCard = forwardRef<HTMLDivElement, StageCardProps>(
  ({ stage, isSelected, dictionary, theme = { type: "light" } }, ref) => {
    const { language } = useDashboard();

    const dateRange = formatDateRangeSafe(stage.startDate, stage.endDate, {
      format: "D [de] MMM",
      locale: language,
      fallback:
        language === "es" ? "Fechas no especificadas" : "Dates not specified",
    });

    return (
      <div
        ref={ref}
        className={cx("stage-card", `stage-card--theme-${theme.type}`, {
          "stage-card--active": isSelected,
        })}
      >
        <div className={cx("stage-card__header")}>
          <ThemedTypography variant="p2" color="secondary" fontWeight={500}>
            {stage.name}
          </ThemedTypography>
        </div>

        <div className={cx("stage-card__progress")}>
          <ProgressBar
            progress={stage.progress}
            gradientVariant={theme.type === "dark" ? "multi" : "current"}
            size="small"
            theme={theme}
          />
          <ThemedTypography variant="p3" color="secondary" fontWeight={500}>
            {stage.progress}%
          </ThemedTypography>
        </div>

        <div
          className={cx("stage-card__details", { "is-visible": isSelected })}
        >
          <ThemedTypography
            variant="p3"
            color="primary"
            fontWeight={500}
            className={cx("stage-card__date-range")}
          >
            {dateRange}
          </ThemedTypography>

          <ThemedTypography variant="p2" color="secondary" fontWeight={400}>
            {stage.description}
          </ThemedTypography>

          <div className={cx("stage-card__assignees")}>
            <div className={cx("stage-card__assignee-avatars")}>
              {stage.assignees.map((assignee, index) => (
                <img
                  key={index}
                  src={
                    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  }
                  alt={assignee.name}
                  className={cx("stage-card__assignee-avatar")}
                />
              ))}
            </div>
            <ThemedTypography variant="p3" color="primary">
              {stage.assignees.map((a) => a.name).join(", ")}
            </ThemedTypography>
          </div>

          {stage.dependencies && stage.dependencies.length > 0 && (
            <div className={cx("stage-card__dependencies")}>
              <div className={cx("stage-card__dependency-item")}>
                <LinkIcon size={14} />
                <ThemedTypography variant="p3">
                  {dictionary.dependencies} {stage.dependencies.join(", ")}
                </ThemedTypography>
              </div>
            </div>
          )}

          {stage.milestones && stage.milestones.length > 0 && (
            <div className={cx("stage-card__milestones")}>
              <div className={cx("stage-card__milestone-header")}>
                <Target size={12} />
                <ThemedTypography variant="p3" color="primary">
                  {dictionary.milestones}
                </ThemedTypography>
              </div>
              {stage.milestones.map((milestone, index) => (
                <div key={index} className={cx("stage-card__milestone-item")}>
                  <Circle
                    size={4}
                    className={cx("stage-card__milestone-icon")}
                  />
                  <ThemedTypography variant="p3">
                    {milestone.title} (
                    {formatCustomDate(
                      milestone.dueDate,
                      language === "es" ? "D [de] MMMM" : "MMMM D"
                    )}
                    )
                  </ThemedTypography>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

StageCard.displayName = "StageCard";
