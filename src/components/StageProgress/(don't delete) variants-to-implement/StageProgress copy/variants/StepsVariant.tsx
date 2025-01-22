// variants/StepsVariant.tsx
import React from "react";
import classNames from "classnames/bind";
import styles from "../StageProgress.module.scss";
import { VariantProps } from "../types";

const cx = classNames.bind(styles);

export const StepsVariant: React.FC<VariantProps> = ({
  progress,
  stages,
  activeStageIndex,
  onStageHover,
}) => (
  <div className={cx("stage-progress__track", "stage-progress__track--steps")}>
    <div className={cx("stage-progress__steps-container")}>
      {stages.map((stage, index) => (
        <div
          key={stage.name}
          className={cx("stage-progress__step", {
            "stage-progress__step--active": progress >= stage.threshold,
            "stage-progress__step--current":
              progress >= stage.threshold &&
              (!stages[index + 1] || progress < stages[index + 1].threshold),
          })}
          onMouseEnter={() => onStageHover?.(index)}
          onMouseLeave={() => onStageHover?.(null)}
        >
          <div
            className={cx("stage-progress__step-circle")}
            style={{ backgroundColor: stage.color }}
          >
            <span>{index + 1}</span>
          </div>
          <div className={cx("stage-progress__step-content")}>
            <span className={cx("stage-progress__step-name")}>
              {stage.name}
            </span>
            <span className={cx("stage-progress__step-threshold")}>
              {stage.threshold}%
            </span>
          </div>
          {activeStageIndex === index && (
            <div className={cx("stage-progress__step-tooltip")}>
              <strong>{stage.name}</strong>
              <span>Progress needed: {stage.threshold}%</span>
              {progress >= stage.threshold && <span>✓ Completed</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
