import React from "react";
import moment from "moment";
import { Target } from "lucide-react";
import classNames from "classnames/bind";
import { GanttStage } from "../../types";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import {
  calculateBarPosition,
  calculateMilestonePosition,
  isDateInRange,
} from "../../gantt-date-calculations";
import styles from "./StageBar.module.scss";

const cx = classNames.bind(styles);

interface StageBarProps {
  stage: GanttStage;
  isSelected: boolean;
  timelineData: {
    gridItems: Date[];
    totalUnits: number;
  };
  getStagePosition: (stage: GanttStage) => {
    left: string;
    width: string;
    visibility: "visible" | "hidden";
  };
  view: "year" | "month" | "week";
  theme?: {
    type: "light" | "dark" | "custom";
  };
  onClick?: (stage: GanttStage) => void;
}

export const StageBar: React.FC<StageBarProps> = ({
  stage,
  isSelected,
  timelineData,
  view,
  theme = { type: "light" },
  onClick,
}) => {
  const timelineStartDate = timelineData.gridItems[0];
  const timelineEndDate =
    timelineData.gridItems[timelineData.gridItems.length - 1];

  // Calcular la posición de la barra
  const stageStart = moment.utc(stage.startDate).startOf("day").toDate();
  const stageEnd = moment.utc(stage.endDate).endOf("day").toDate();
  const viewStart = moment.utc(timelineStartDate).startOf("day").toDate();
  const viewEnd = moment.utc(timelineEndDate).endOf("day").toDate();

  const position = calculateBarPosition(
    stageStart,
    stageEnd,
    viewStart,
    viewEnd,
    view
  );

  // Si la barra está fuera del rango visible, no renderizar
  if (position.visibility === "hidden") {
    return null;
  }

  const renderMilestones = () => {
    if (!stage.milestones?.length) return null;

    return stage.milestones.map((milestone, index) => {
      const milestoneDate = moment
        .utc(milestone.dueDate)
        .startOf("day")
        .toDate();

      // Verificar si el milestone está en el rango visible
      if (!isDateInRange(milestoneDate, viewStart, viewEnd)) {
        return null;
      }

      const { position: milestonePosition, visible } =
        calculateMilestonePosition(milestoneDate, stageStart, stageEnd, view);
      if (!visible) return null;

      return (
        <div
          key={index}
          className={cx("stage-bar__milestone", {
            [`stage-bar__milestone--${stage.status.value}`]: true,
          })}
          style={{ left: `${milestonePosition}%` }}
        >
          <Target className={cx("stage-bar__milestone-icon")} />
          <ThemedTypography
            variant="p3"
            className={cx("stage-bar__milestone-tooltip")}
            noWrap
          >
            {milestone.title}
          </ThemedTypography>
        </div>
      );
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick(stage);
    }
  };

  return (
    <div
      className={cx(
        "stage-bar",
        `stage-bar--theme-${theme.type}`,
        `stage-bar--${stage.status.value}`,
        {
          "stage-bar--selected": isSelected,
          "stage-bar--clickable": !!onClick,
        }
      )}
      style={{
        left: position.left,
        width: position.width,
      }}
      onClick={handleClick}
    >
      {renderMilestones()}
    </div>
  );
};

export default StageBar;
