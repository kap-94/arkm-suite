// TimelineVariant.tsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import { CheckCircle2, Circle } from "lucide-react";
import { ThemedTypography } from "../../../Typography/ThemedTypography";
import { VariantProps } from "../../types";
import { getIconSize, getThemeColors } from "../../utils";
import { getProgressBarStyle } from "../../stepGradients";
import styles from "./TimelineVariant.module.scss";

const cx = classNames.bind(styles);

const defaultThemeColors = {
  light: {
    markerIncomplete: "#e5e7eb",
    connector: "rgba(0, 0, 0, 0.15)",
    progress: [
      "#c7d2fe", // Indigo súper claro/pastel
      "#818cf8", // Indigo claro
      "#6366f1", // Indigo medio
      "#4f46e5", // Indigo fuerte
      "#3730a3", // Indigo muy oscuro/profundo
    ],
  },
  dark: {
    markerIncomplete: "#1f2937",
    connector: "rgba(255, 255, 255, 0.2)",
    progress: [
      "#93c5fd", // Light blue
      "#60a5fa", // Blue
      "#4d7fff", // Medium blue
      "#14b8a6", // Teal
      "#4ade80", // Green
    ],
  },
};

export const TimelineVariant: React.FC<VariantProps> = ({
  progress,
  stages,
  type,
  size = "default",
  gradientVariant = "progressive",
  theme = { type: "light" },
}) => {
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  // Get theme colors based on theme type and any custom colors
  const themeColors = getThemeColors(theme, defaultThemeColors);

  // Assign default colors to stages if not provided
  const stagesWithColors = stages.map((stage, index) => ({
    ...stage,
    color:
      stage.color || themeColors.progress[index % themeColors.progress.length],
  }));

  return (
    <div
      className={cx(
        "timeline",
        `timeline--theme-${theme.type}`,
        size === "small" ? "timeline--small" : ""
      )}
    >
      <div className={cx("timeline__track")}>
        <div className={cx("timeline__header")}>
          <ThemedTypography
            variant="p2"
            color="secondary"
            className={cx("timeline__type")}
          >
            {type}
          </ThemedTypography>
          <ThemedTypography
            variant="p2"
            color="secondary"
            className={cx("timeline__progress-text")}
          >
            {progress}%
          </ThemedTypography>
        </div>

        <div className={cx("timeline__container")}>
          <div
            className={cx("timeline__line-wrapper")}
            style={{ background: themeColors.connector }}
          >
            <div className={cx("timeline__line")} />
            <div
              className={cx("timeline__progress")}
              style={getProgressBarStyle(
                stagesWithColors,
                progress,
                gradientVariant
              )}
            />
          </div>

          {stagesWithColors?.map((stage, index) => {
            const isCompleted = progress >= stage.threshold;

            return (
              <div
                key={`marker-${stage.name}`}
                className={cx("timeline__item", {
                  "timeline__item--active": isCompleted,
                  "timeline__item--small": size === "small",
                })}
                style={{ left: `${stage.threshold}%` }}
                onMouseEnter={() => setHoveredMarker(index)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                <div className={cx("timeline__marker")}>
                  {isCompleted ? (
                    <CheckCircle2
                      size={getIconSize(size)}
                      style={{ color: stage.color }}
                      strokeWidth={2}
                    />
                  ) : (
                    <div className={cx("timeline__circle-wrapper")}>
                      <Circle
                        size={getIconSize(size)}
                        style={{ color: themeColors.markerIncomplete }}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={cx("timeline__tooltip", {
                    "timeline__tooltip--visible": hoveredMarker === index,
                  })}
                >
                  <ThemedTypography
                    variant="p3"
                    color="tertiary"
                    fontWeight={500}
                  >
                    {stage.name}
                  </ThemedTypography>
                </div>
              </div>
            );
          })}

          {size === "default" &&
            stagesWithColors.map((stage, index) => {
              const previousThreshold =
                index === 0 ? 0 : stages[index - 1].threshold;
              const centerPosition = (stage.threshold + previousThreshold) / 2;

              return (
                <div
                  key={`label-${stage.name}`}
                  className={cx("timeline__label")}
                >
                  <ThemedTypography
                    variant="p3"
                    color="tertiary"
                    fontWeight={500}
                    className={cx("timeline__title")}
                    style={{
                      left: `${centerPosition}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {stage.name}
                  </ThemedTypography>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
