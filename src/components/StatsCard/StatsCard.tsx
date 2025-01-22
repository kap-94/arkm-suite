import React from "react";
import classNames from "classnames/bind";
import { FileText } from "lucide-react";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import type { StatsCardProps, StatsCardTheme, GraphConfig } from "./types";
import styles from "./StatsCard.module.scss";

const cx = classNames.bind(styles);

const defaultTheme: StatsCardTheme = {
  type: "dark",
  colors: {
    background:
      "linear-gradient(135deg, rgba(129, 140, 248, 0.75), rgba(99, 102, 241, 0.8))",
    border: "rgba(99, 102, 241, 0.9)",
    iconBackground: "rgba(255, 255, 255, 0.1)",
    iconBorder: "rgba(255, 255, 255, 0.2)",
    iconColor: "#f5f5f5",
    text: "#ffffff",
    secondaryText: "rgba(255, 255, 255, 0.9)",
    shadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
    pattern: "rgba(255, 255, 255, 0.05)",
    overlayGradient: "rgba(255, 255, 255, 0.1)",
  },
};

const defaultGraphConfig: GraphConfig = {
  type: "area",
  height: 120,
  dataKey: "value",
  showDots: false,
  curveType: "monotone",
  color: null,
  gradientOpacity: {
    start: 0.2,
    end: 0,
  },
  areaProps: {},
};

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon: Icon = FileText,
  className,
  theme = defaultTheme,
  graphData,
  graphConfig: userGraphConfig,
}) => {
  const graphConfig = React.useMemo(() => {
    return {
      ...defaultGraphConfig,
      ...(userGraphConfig || {}),
    } as GraphConfig;
  }, [userGraphConfig]);

  const getThemeColor = () => {
    if (theme.type === "custom" && theme.colors?.text) {
      return theme.colors.text;
    }
    return graphConfig.color ?? (theme.type === "dark" ? "#27AE60" : "#4F46E5");
  };

  const renderGraph = () => {
    if (!graphData) return null;

    const color = getThemeColor();
    const { height, dataKey, showDots, gradientOpacity, areaProps, curveType } =
      graphConfig;

    const areaDefaultProps = {
      type: curveType || "monotone",
      dataKey,
      stroke: color,
      strokeWidth: 2,
      fill: `url(#graphGradient-${label})`,
      isAnimationActive: true,
      animationDuration: 1000,
      dot: showDots,
    };

    return (
      <ResponsiveContainer width="100%" height={height ?? 120}>
        <AreaChart
          data={graphData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id={`graphGradient-${label}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={color}
                stopOpacity={gradientOpacity?.start ?? 0.2}
              />
              <stop
                offset="95%"
                stopColor={color}
                stopOpacity={gradientOpacity?.end ?? 0}
              />
            </linearGradient>
          </defs>
          <Area {...areaDefaultProps} {...(areaProps as any)} />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div
      className={cx("stats-card", className, `stats-card--theme-${theme.type}`)}
      style={
        theme.type === "custom"
          ? ({
              "--stats-card-background": theme.colors?.background,
              "--stats-card-border": theme.colors?.border,
              "--stats-card-icon-bg": theme.colors?.iconBackground,
              "--stats-card-icon-border": theme.colors?.iconBorder,
              "--stats-card-icon-color": theme.colors?.iconColor,
              "--stats-card-text": theme.colors?.text,
              "--stats-card-secondary-text": theme.colors?.secondaryText,
              "--stats-card-shadow": theme.colors?.shadow,
              "--stats-card-pattern": theme.colors?.pattern,
              "--stats-card-overlay": theme.colors?.overlayGradient,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className={cx("stats-card__content")}>
        <div className={cx("stats-card__icon-wrapper")}>
          <Icon className={cx("stats-card__icon")} aria-hidden="true" />
        </div>
        <div className={cx("stats-card__text")}>
          <ThemedTypography
            variant="label"
            className={cx("stats-card__label")}
            fontWeight={600}
          >
            {label}
          </ThemedTypography>
          <ThemedTypography variant="h3" className={cx("stats-card__value")}>
            {value}
          </ThemedTypography>
        </div>
      </div>
      {graphData && (
        <div className={cx("stats-card__graph")}>{renderGraph()}</div>
      )}
    </div>
  );
};

export default StatsCard;
