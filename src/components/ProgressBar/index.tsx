type GradientStop = { color: string; position: number };

import React from "react";
import classNames from "classnames/bind";
import { ProgressBarProps, ProgressBarTheme } from "./types";
import styles from "./ProgressBar.module.scss";
import { getProgressBarStyle } from "./progressGradients";

const cx = classNames.bind(styles);

const defaultThemeColor = {
  light: {
    connector: "rgba(0, 0, 0, 0.15)",
    progress: "#818cf8", // Indigo claro
  },
  dark: {
    connector: "rgba(255, 255, 255, 0.2)",
    progress: ["#9698fd", "#6366f1"], // primary-light - primary
  },
};

export const getThemeColors = (
  theme: ProgressBarTheme,
  defaultThemes: any,
  variant: string = "progressive"
): string | GradientStop[] => {
  let progressValue =
    theme.type === "custom" && theme.colors
      ? theme.colors.progress
      : defaultThemes[theme.type]?.progress || defaultThemes.light.progress;

  // For progressive variant with single color, return the color string
  if (variant === "progressive" && typeof progressValue === "string") {
    return progressValue;
  }

  // Convert single color to array
  const colors = Array.isArray(progressValue) ? progressValue : [progressValue];

  // If only one color in array, duplicate it
  const colorArray = colors.length === 1 ? [colors[0], colors[0]] : colors;

  // Create gradient stops
  return colorArray.map((color, index) => ({
    color,
    position: (index / (colorArray.length - 1)) * 100,
  }));
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  gradientVariant = "progressive",
  size = "default",
  theme = { type: "light" },
}) => {
  const stops = getThemeColors(theme, defaultThemeColor);
  console.log({ stops });

  return (
    <div
      className={cx(
        "progress-bar",
        `progress-bar--theme-${theme.type}`,
        size === "small" ? "timeline--small" : ""
      )}
    >
      <div className={cx("progress-bar__track", `theme-${theme}`)}>
        <div
          className={cx("progress-bar__fill")}
          style={getProgressBarStyle(progress, stops, gradientVariant)}
        />
      </div>
    </div>
  );
};
