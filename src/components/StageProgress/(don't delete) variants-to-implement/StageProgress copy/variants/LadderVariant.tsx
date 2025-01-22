// variants/LadderVariant.tsx
import React from "react";
import classNames from "classnames/bind";
import styles from "../StageProgress.module.scss";
import { VariantProps } from "../types";
import { getProgressBarStyle } from "../gradients";

const cx = classNames.bind(styles);

export const LadderVariant: React.FC<VariantProps> = ({
  progress,
  stages,
  gradientVariant = "progressive",
}) => (
  <div className={cx("stage-progress__track", "stage-progress__track--ladder")}>
    <div className={cx("stage-progress__ladder-container")}>
      {stages.map((stage, index) => (
        <div
          key={stage.name}
          className={cx("stage-progress__ladder-step", {
            "stage-progress__ladder-step--active": progress >= stage.threshold,
          })}
        >
          <div
            className={cx("stage-progress__ladder-rung")}
            style={{ backgroundColor: stage.color }}
          >
            <span className={cx("stage-progress__ladder-name")}>
              {stage.name}
            </span>
            <span className={cx("stage-progress__ladder-threshold")}>
              {stage.threshold}%
            </span>
          </div>
          {index < stages.length - 1 && (
            <div className={cx("stage-progress__ladder-connector")} />
          )}
        </div>
      ))}
    </div>
    <div
      className={cx("stage-progress__ladder-progress")}
      style={getProgressBarStyle(stages, progress, gradientVariant)}
    />
  </div>
);
