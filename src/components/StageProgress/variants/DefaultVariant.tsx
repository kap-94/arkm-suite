import React from "react";
import classNames from "classnames/bind";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import styles from "../StageProgress.module.scss";
import { VariantProps } from "../types";
import { getProgressBarStyle } from "../gradients";
import { getStageColor } from "../utils";

const cx = classNames.bind(styles);

export const DefaultVariant: React.FC<VariantProps> = ({
  progress,
  stages,
  gradientVariant = "progressive",
  size = "default",
}) => {
  const stagesWithColors = stages.map((stage, index) => ({
    ...stage,
    color: stage.color || getStageColor(stage, index),
  }));

  return (
    <div className={cx("stage-progress__track")}>
      <div
        className={cx("stage-progress__fill")}
        style={getProgressBarStyle(stagesWithColors, progress, gradientVariant)}
      />
      <div className={cx("stage-progress__stages")}>
        {stagesWithColors.map((stage) => (
          <div
            key={stage.name}
            className={cx("stage-progress__stage", {
              "stage-progress__stage--active": progress >= stage.threshold,
            })}
          >
            <ThemedTypography 
              variant="p3" 
              className={cx("stage-progress__stage-label")}
            >
              {stage.name}
            </ThemedTypography>
          </div>
        ))}
      </div>
    </div>
  );
};