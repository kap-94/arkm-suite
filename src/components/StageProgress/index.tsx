// StageProgress.tsx
import React from "react";
import classNames from "classnames/bind";
import styles from "./StageProgress.module.scss";
import { StageProgressProps } from "./types";
import { VARIANTS } from "./variants";
import { sortStages } from "./utils";

const cx = classNames.bind(styles);

const StageProgress: React.FC<StageProgressProps> = ({
  progress,
  stages = [],
  variant = "default",
  type = "Generic",
  labelStyle = "default",
  size = "default",
  gradientVariant = "progressive",
}) => {
  const sortedStages = sortStages(stages);
  const SelectedVariant = VARIANTS[variant];

  return (
    <div
      className={cx(
        "stage-progress",
        `stage-progress--${variant}`,
        labelStyle !== "default" ? `stage-progress--${labelStyle}` : "",
        size === "small" ? "stage-progress--small" : ""
      )}
    >
      <div className={cx("stage-progress__header")}>
        <span className={cx("stage-progress__type")}>{type}</span>
        <span className={cx("stage-progress__progress")}>{progress}%</span>
      </div>
      <SelectedVariant
        progress={progress}
        stages={sortedStages}
        gradientVariant={gradientVariant}
        size={size}
      />
    </div>
  );
};

export default StageProgress;
