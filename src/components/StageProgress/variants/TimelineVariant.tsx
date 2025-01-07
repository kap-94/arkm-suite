import React, { useState } from "react";
import classNames from "classnames/bind";
import { CheckCircle2, Circle } from "lucide-react";
import styles from "../StageProgress.module.scss";
import { VariantProps } from "../types";
import { getIconSize } from "../utils";
import { getProgressBarStyle } from "../gradients";

const cx = classNames.bind(styles);

export const TimelineVariant: React.FC<VariantProps> = ({
  progress,
  stages,
  size = "default",
  gradientVariant = "progressive",
}) => {
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  return (
    <div
      className={cx("stage-progress__track", "stage-progress__track--timeline")}
    >
      <div className={cx("stage-progress__timeline-container")}>
        <div className={cx("stage-progress__timeline-line-wrapper")}>
          <div className={cx("stage-progress__timeline-line")} />
          <div
            className={cx("stage-progress__timeline-progress")}
            style={getProgressBarStyle(stages, progress, gradientVariant)}
          />
        </div>

        {stages.map((stage, index) => (
          <div
            key={`marker-${stage.name}`}
            className={cx("stage-progress__timeline-item", {
              "stage-progress__timeline-item--active":
                progress >= stage.threshold,
              "stage-progress__timeline-item--small": size === "small",
            })}
            style={{ left: `${stage.threshold}%` }}
            onMouseEnter={() => setHoveredMarker(index)}
            onMouseLeave={() => setHoveredMarker(null)}
          >
            <div className={cx("stage-progress__timeline-marker")}>
              {progress >= stage.threshold ? (
                <CheckCircle2
                  size={getIconSize(size)}
                  style={{ color: stage.color }}
                  strokeWidth={2}
                />
              ) : (
                <div className={cx("stage-progress__timeline-circle-wrapper")}>
                  <Circle size={getIconSize(size)} />
                </div>
              )}
            </div>
            <div
              className={cx("stage-progress__timeline-tooltip", {
                "stage-progress__timeline-tooltip--visible":
                  hoveredMarker === index,
              })}
            >
              {stage.name}
            </div>
          </div>
        ))}

        {size === "default" &&
          stages.map((stage, index) => {
            const previousThreshold =
              index === 0 ? 0 : stages[index - 1].threshold;
            const centerPosition = (stage.threshold + previousThreshold) / 2;

            return (
              <div
                key={`label-${stage.name}`}
                className={cx("stage-progress__timeline-label")}
              >
                <span
                  className={cx("stage-progress__timeline-title")}
                  style={{
                    left: `${centerPosition}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {stage.name}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
