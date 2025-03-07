import React from "react";
import classNames from "classnames/bind";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./StatsCard.module.scss";

const cx = classNames.bind(styles);

interface StatsCardProps {
  title: string;
  value: string;
  trend: {
    value: number;
    isPositive: boolean;
  };
  icon: IconProp;
  color: "indigo" | "purple" | "emerald" | "pink";
  chartType: "bars" | "grouped-bars" | "wave" | "pulses";
  className?: string;
}

interface ChartProps {
  color: StatsCardProps["color"];
}

const BarChart: React.FC<ChartProps> = ({ color }) => (
  <div className={cx("stat-card__chart")}>
    <div
      className={cx(
        "stat-card__chart-background",
        `stat-card__chart-background--${color}`
      )}
    />
    <div className={cx("stat-card__bars")}>
      {[40, 60, 75, 65, 85, 95, 100].map((height, index) => (
        <div
          key={index}
          className={cx("stat-card__bar", `stat-card__bar--${color}`)}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  </div>
);

const GroupedBarChart: React.FC<ChartProps> = ({ color }) => (
  <div className={cx("stat-card__chart")}>
    <div
      className={cx(
        "stat-card__chart-background",
        `stat-card__chart-background--${color}`
      )}
    />
    <div className={cx("stat-card__grouped-bars")}>
      {[
        [40, 60, 50],
        [70, 90, 80],
        [85, 100, 95],
      ].map((group, groupIndex) => (
        <div key={groupIndex} className={cx("stat-card__bar-group")}>
          {group.map((height, barIndex) => (
            <div
              key={`${groupIndex}-${barIndex}`}
              className={cx("stat-card__bar", `stat-card__bar--${color}`)}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const WaveChart: React.FC<ChartProps> = ({ color }) => (
  <div className={cx("stat-card__chart")}>
    <div
      className={cx(
        "stat-card__chart-background",
        `stat-card__chart-background--${color}`
      )}
    />
    <svg className={cx("stat-card__wave")} preserveAspectRatio="none">
      <defs>
        <linearGradient
          id={`gradient-${color}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            className={cx(`stat-card__wave-gradient-start--${color}`)}
          />
          <stop
            offset="100%"
            className={cx(`stat-card__wave-gradient-end--${color}`)}
          />
        </linearGradient>
      </defs>
      <path
        d="M0,96 C100,80 200,88 300,64 C400,40 500,56 600,48 L600,96 L0,96 Z"
        fill={`url(#gradient-${color})`}
      />
    </svg>
  </div>
);

const PulseChart: React.FC<ChartProps> = ({ color }) => (
  <div className={cx("stat-card__chart")}>
    <div
      className={cx(
        "stat-card__chart-background",
        `stat-card__chart-background--${color}`
      )}
    />
    <div className={cx("stat-card__pulses")}>
      {[20, 40, 60, 80, 100].map((opacity, index) => (
        <div
          key={index}
          className={cx("stat-card__pulse", `stat-card__pulse--${color}`)}
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  </div>
);

const chartComponents = {
  bars: BarChart,
  "grouped-bars": GroupedBarChart,
  wave: WaveChart,
  pulses: PulseChart,
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  trend,
  icon,
  color,
  chartType,
  className,
}) => {
  const ChartComponent = chartComponents[chartType];

  return (
    <div className={cx("stat-card", `stat-card--${color}`, className)}>
      <div className={cx("stat-card__glow")} />
      <div className={cx("stat-card__content")}>
        <div className={cx("stat-card__header")}>
          <h3 className={cx("stat-card__title")}>{title}</h3>
          <div
            className={cx(
              "stat-card__icon-wrapper",
              `stat-card__icon-wrapper--${color}`
            )}
          >
            <FontAwesomeIcon icon={icon} className={cx("stat-card__icon")} />
          </div>
        </div>

        <div className={cx("stat-card__metrics")}>
          <span className={cx("stat-card__value")}>{value}</span>
          <div
            className={cx("stat-card__trend", {
              "stat-card__trend--positive": trend.isPositive,
              "stat-card__trend--negative": !trend.isPositive,
            })}
          >
            <FontAwesomeIcon
              icon={trend.isPositive ? "arrow-trend-up" : "arrow-trend-down"}
              className={cx("stat-card__trend-icon")}
            />
            <span className={cx("stat-card__trend-value")}>{trend.value}%</span>
          </div>
        </div>

        <div className={cx("stat-card__chart-wrapper")}>
          <ChartComponent color={color} />
        </div>

        <div className={cx("stat-card__footer")}>
          <button
            className={cx("stat-card__button", `stat-card__button--${color}`)}
          >
            <FontAwesomeIcon
              icon="download"
              className={cx("stat-card__button-icon")}
            />
            <span className={cx("stat-card__button-text")}>Export</span>
          </button>
          <button
            className={cx("stat-card__button", `stat-card__button--${color}`)}
          >
            <FontAwesomeIcon
              icon="chart-line"
              className={cx("stat-card__button-icon")}
            />
            <span className={cx("stat-card__button-text")}>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
