// TimelineVariant.tsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import { CheckCircle2, Circle } from "lucide-react";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import styles from "../StageProgress.module.scss";
import { VariantProps } from "../types";
import { getIconSize, getThemeColors } from "../utils";
import { getProgressBarStyle } from "../gradients";

const cx = classNames.bind(styles);

const defaultThemeColors = {
  // light: {
  //   markerIncomplete: "#e5e7eb",
  //   connector: "rgba(0, 0, 0, 0.15)",
  //   progress: [
  //     "#fcd34d", // Amarillo brillante inicial
  //     "#f3c136", // Amarillo ligeramente más oscuro
  //     "#e8a324", // Amarillo dorado
  //     "#cc8e44", // Ámbar/dorado más oscuro con un sutil toque lavanda
  //     "#9698fd", // Azul lavanda final
  //   ],
  // },
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
      className={cx("stage-progress__track", "stage-progress__track--timeline")}
    >
      <div className={cx("stage-progress__timeline-container")}>
        <div
          className={cx("stage-progress__timeline-line-wrapper")}
          style={{ background: themeColors.connector }}
        >
          <div className={cx("stage-progress__timeline-line")} />
          <div
            className={cx("stage-progress__timeline-progress")}
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
              className={cx("stage-progress__timeline-item", {
                "stage-progress__timeline-item--active": isCompleted,
                "stage-progress__timeline-item--small": size === "small",
              })}
              style={{ left: `${stage.threshold}%` }}
              onMouseEnter={() => setHoveredMarker(index)}
              onMouseLeave={() => setHoveredMarker(null)}
            >
              <div className={cx("stage-progress__timeline-marker")}>
                {isCompleted ? (
                  <CheckCircle2
                    size={getIconSize(size)}
                    style={{ color: stage.color }}
                    strokeWidth={2}
                  />
                ) : (
                  <div
                    className={cx("stage-progress__timeline-circle-wrapper")}
                  >
                    <Circle
                      size={getIconSize(size)}
                      style={{ color: themeColors.markerIncomplete }}
                    />
                  </div>
                )}
              </div>
              <div
                className={cx("stage-progress__timeline-tooltip", {
                  "stage-progress__timeline-tooltip--visible":
                    hoveredMarker === index,
                })}
              >
                <ThemedTypography variant="p3" color="secondary">
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
                className={cx("stage-progress__timeline-label")}
              >
                <ThemedTypography
                  variant="p3"
                  color="secondary"
                  className={cx("stage-progress__timeline-title")}
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
  );
};
