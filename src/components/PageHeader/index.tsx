import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import { ThemedTypography } from "../Typography/ThemedTypography";
import styles from "./PageHeader.module.scss";

const cx = classNames.bind(styles);

export interface Theme {
  type: "light" | "dark" | "custom";
  customValues?: {
    background?: string;
    border?: string;
    glow?: string;
    icon?: string;
  };
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  theme?: Theme;
  icon?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className,
  icon,
  theme = { type: "dark" },
}) => {
  const themeType = typeof theme === "string" ? theme : theme.type;
  const customValues =
    typeof theme === "object" ? theme.customValues : undefined;

  return (
    <header
      className={cx(
        "page-header",
        `page-header--theme-${themeType}`,
        className
      )}
      style={
        customValues
          ? ({
              "--custom-background": customValues.background,
              "--custom-border": customValues.border,
              "--custom-glow": customValues.glow,
              "--custom-icon": customValues.icon,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className={cx("page-header__container")}>
        <div className={cx("page-header__content")}>
          <div className={cx("page-header__title-container")}>
            {icon && (
              <div className={cx("page-header__title-icon")}>{icon}</div>
            )}
            <ThemedTypography variant="h4">{title}</ThemedTypography>
          </div>
          {subtitle && (
            <ThemedTypography variant="p2">{subtitle}</ThemedTypography>
          )}
        </div>
        {actions && <div className={cx("page-header__actions")}>{actions}</div>}
      </div>
    </header>
  );
};
