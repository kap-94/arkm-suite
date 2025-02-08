import React from "react";
import classNames from "classnames/bind";
import { FileText } from "lucide-react";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { Area, Line, Bar, ComposedChart, ResponsiveContainer } from "recharts";
import type {
  StatsCardProps,
  StatsCardTheme,
  GraphConfig,
  AreaGraphConfig,
  LineGraphConfig,
  BarGraphConfig,
} from "./types";
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
  color: null,
  curveType: "monotone",
  isAnimationActive: true,
  animationDuration: 1000,
  gradientOpacity: {
    start: 0.2,
    end: 0,
  },
  areaProps: {
    strokeWidth: 2,
  },
};

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon: Icon = FileText,
  className,
  theme = defaultTheme,
  graphData,
  graphConfig: userGraphConfig,
  illustration,
}) => {
  const graphConfig = React.useMemo(
    () => ({
      ...defaultGraphConfig,
      ...(userGraphConfig || {}),
    }),
    [userGraphConfig]
  );

  const getThemeColor = (): string => {
    if (theme.type === "custom" && theme.colors?.text) {
      return theme.colors.text;
    }
    return graphConfig.color ?? (theme.type === "dark" ? "#27AE60" : "#4F46E5");
  };

  const renderChart = (): JSX.Element | null => {
    if (!graphData) return null;

    const color = getThemeColor();
    const {
      height,
      dataKey,
      type,
      curveType,
      isAnimationActive,
      animationDuration,
    } = graphConfig;

    const commonProps = {
      dataKey,
      stroke: color,
      isAnimationActive,
      animationDuration,
      type: curveType,
    };

    return (
      <ResponsiveContainer width="100%" height={height ?? 120}>
        <ComposedChart
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
                stopOpacity={
                  (graphConfig as AreaGraphConfig).gradientOpacity?.start ?? 0.2
                }
              />
              <stop
                offset="95%"
                stopColor={color}
                stopOpacity={
                  (graphConfig as AreaGraphConfig).gradientOpacity?.end ?? 0
                }
              />
            </linearGradient>
          </defs>

          {type === "area" && (
            <Area
              {...commonProps}
              {...(graphConfig as AreaGraphConfig).areaProps}
              fill={`url(#graphGradient-${label})`}
            />
          )}
          {type === "line" && (
            <Line
              {...commonProps}
              {...(graphConfig as LineGraphConfig).lineProps}
              dot={
                (graphConfig as LineGraphConfig).showDots
                  ? { fill: color, strokeWidth: 2 }
                  : false
              }
            />
          )}
          {type === "bar" && (
            <Bar
              {...commonProps}
              {...(graphConfig as BarGraphConfig).barProps}
              fill={color}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  const renderIllustration = () => {
    if (!illustration?.node) return null;

    return (
      <div
        className={cx(
          "stats-card__illustration",
          `stats-card__illustration--${illustration.position || "bottom"}`,
          illustration.className
        )}
      >
        {illustration.node}
      </div>
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
      {illustration?.position === "background" && renderIllustration()}
      {illustration?.position === "top" && renderIllustration()}
      <div className={cx("stats-card__content")}>
        <div className={cx("stats-card__text")}>
          <ThemedTypography
            variant="label"
            color="primary"
            className={cx("stats-card__label")}
            fontWeight={600}
          >
            {label}
          </ThemedTypography>
          <div className={cx("stats-card__footer")}>
            {/* <div className={cx("stats-card__icon-wrapper")}>
              <Icon
                className={cx("stats-card__icon")}
                size={22}
                aria-hidden="true"
              />
            </div> */}
            <ThemedTypography
              variant="h3"
              fontWeight={600}
              // color="secondary"
              className={cx("stats-card__value")}
            >
              {value}
            </ThemedTypography>
          </div>
        </div>
      </div>
      {graphData && (
        <div className={cx("stats-card__graph")}>{renderChart()}</div>
      )}
      {illustration?.position !== "top" &&
        illustration?.position !== "background" && (
          <div className={cx("stats-card__illustration-wrapper")}>
            {renderIllustration()}
          </div>
        )}
    </div>
  );
};

export default StatsCard;
