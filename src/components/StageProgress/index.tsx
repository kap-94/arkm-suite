import React from "react";
import classNames from "classnames/bind";
import { StageProgressProps } from "./types";
import { VARIANTS } from "./variants";
import { sortStages } from "./utils";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import styles from "./StageProgress.module.scss";
import { capitalizeAndFormat } from "@/utils/textUtils";

const cx = classNames.bind(styles);

const StageProgress: React.FC<StageProgressProps> = ({
  progress,
  stages = [],
  variant = "timeline",
  type = "Other",
  size = "default",
  theme = { type: "light" },
  gradientVariant = "progressive",
}) => {
  const sortedStages = sortStages(stages);
  const SelectedVariant = VARIANTS[variant];

  return (
    <div
      className={cx(
        "stage-progress",
        `stage-progress--${variant}`,
        `stage-progress--theme-${theme.type}`,
        size === "small" ? "stage-progress--small" : ""
      )}
    >
      <div className={cx("stage-progress__header")}>
        <ThemedTypography variant="p2" className={cx("stage-progress__type")}>
          {capitalizeAndFormat(type)}
        </ThemedTypography>
        <ThemedTypography
          variant="p2"
          className={cx("stage-progress__progress")}
        >
          {progress}%
        </ThemedTypography>
      </div>
      <SelectedVariant
        progress={progress}
        stages={sortedStages}
        gradientVariant={gradientVariant}
        size={size}
        theme={theme}
      />
    </div>
  );
};

export default StageProgress;
