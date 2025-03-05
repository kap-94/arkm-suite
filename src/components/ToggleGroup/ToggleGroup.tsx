// src/components/ToggleGroup/ToggleGroup.tsx
import React, { ElementType } from "react";
import classNames from "classnames/bind";
import styles from "./ToggleGroup.module.scss";
import type { ToggleGroupProps } from "./types";

const cx = classNames.bind(styles);

export const ToggleGroup = <T extends string, E extends ElementType = "div">({
  as,
  className,
  value,
  onChange,
  options,
  theme = { type: "light" },
  disabled = false,
  ...rest
}: ToggleGroupProps<T, E>) => {
  const Component = as || "div";
  const themeType = typeof theme === "string" ? theme : theme.type;
  const customValues =
    typeof theme === "object" ? theme.customValues : undefined;

  return (
    <Component
      className={cx(
        "toggle-group",
        {
          "toggle-group--disabled": disabled,
          [`toggle-group--theme-${themeType}`]: themeType,
        },
        className
      )}
      style={
        customValues
          ? ({
              "--custom-primary": customValues.primary,
              "--custom-secondary": customValues.secondary,
            } as React.CSSProperties)
          : undefined
      }
      {...rest}
    >
      {options.map((option) => {
        return (
          <button
            key={option.value}
            className={cx("toggle-button", {
              active: value === option.value,
            })}
            onClick={() => !disabled && onChange(option.value)}
            aria-label={option.ariaLabel}
            disabled={disabled}
            type="button"
          >
            {option.icon && (
              <span className={cx("toggle-button__icon")}>{option.icon}</span>
            )}
            <span className={cx("toggle-button__label")}>{option.label}</span>
          </button>
        );
      })}
    </Component>
  );
};

ToggleGroup.displayName = "ToggleGroup";
