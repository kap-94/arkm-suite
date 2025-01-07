import React from "react";
import classNames from "classnames/bind";
import { FileText, LucideIcon } from "lucide-react";
import styles from "./StatsCard.module.scss";

const cx = classNames.bind(styles);

interface StatsCardProps {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon: Icon = FileText,
  className,
}) => {
  return (
    <div className={cx("stats-card", className)}>
      <div className={cx("stats-card__content")}>
        <div className={cx("stats-card__icon-wrapper")}>
          <Icon className={cx("stats-card__icon")} aria-hidden="true" />
        </div>
        <div className={cx("stats-card__text")}>
          <h2 className={cx("stats-card__label")}>{label}</h2>
          <p className={cx("stats-card__value")}>{value}</p>
        </div>
      </div>
    </div>
  );
};
