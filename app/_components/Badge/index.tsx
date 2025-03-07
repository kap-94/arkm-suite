"use client";

import classNames from "classnames/bind";
import { ThemedTypography } from "../Typography/ThemedTypography";
import styles from "./Badge.module.scss";

const cx = classNames.bind(styles);

const Badge: React.FC<BadgeProps> = ({
  variant = "status",
  status = "default",
  label,
  size = "medium",
  theme = { type: "light" },
  icon,
  className,
  onClick,
  disabled = false,
  removable = false,
  onRemove,
}) => {
  const getTypographyVariant = (size: BadgeSize) => {
    switch (size) {
      case "small":
        return "p3";
      case "medium":
        return "p2";
      case "large":
        return "p1";
    }
  };

  return (
    <div
      className={cx(
        "badge",
        `badge--${variant}`,
        `badge--${status}`,
        `badge--${size}`,
        `badge--theme-${theme.type}`,
        {
          "badge--clickable": !!onClick && !disabled,
          "badge--disabled": disabled,
        },
        className
      )}
      style={
        theme.type === "custom"
          ? ({
              "--badge-background": theme.colors?.background,
              "--badge-text": theme.colors?.text,
              "--badge-border": theme.colors?.border,
              "--badge-icon": theme.colors?.icon,
            } as React.CSSProperties)
          : undefined
      }
      onClick={!disabled ? onClick : undefined}
      role={onClick ? "button" : undefined}
    >
      {icon && <span className={cx("badge__icon")}>{icon}</span>}
      {label && (
        <ThemedTypography
          noWrap
          fontWeight={500}
          variant={getTypographyVariant(size)}
          className={cx("badge__text")}
        >
          {label}
        </ThemedTypography>
      )}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className={cx("badge__remove")}
          disabled={disabled}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Badge;
