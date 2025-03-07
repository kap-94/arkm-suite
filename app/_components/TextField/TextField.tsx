"use client";

import React, { ElementType, useState } from "react";
import classNames from "classnames/bind";
import { useField } from "formik";
import type { TextFieldProps } from "./types";
import { Typography } from "../Typography";
import styles from "./TextField.module.scss";
import { getIconComponent } from "../../_utils/iconUtils";

const cx = classNames.bind(styles);

export const TextField = <T extends ElementType = "div">({
  as,
  className,
  label,
  name,
  icon,
  type = "text",
  variant = "primary",
  theme = { type: "light" },
  disabled = false,
  labelClassName,
  inputClassName,
  errorClassName,
  showError,
  placeholder,
  ...rest
}: TextFieldProps<T>) => {
  const [field, meta] = useField(name);
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [touched, setTouched] = useState(false);

  const Component = as || "div";
  const themeType = typeof theme === "string" ? theme : theme.type;
  const customValues =
    typeof theme === "object" ? theme.customValues : undefined;

  const passwordIcon = getIconComponent(
    passwordVisible ? "showPassword" : "hidePassword"
  );

  const showErrorState = touched && showError && meta.error && meta.touched;

  const rootClassName = cx(
    "textfield",
    `textfield--${variant}`,
    {
      "textfield--disabled": disabled,
      "textfield--error": showErrorState,
      "textfield--not-empty": field.value,
      "textfield--focused": focused,
      "textfield--with-icon": icon,
      [`textfield--theme-${themeType}`]: themeType,
    },
    className
  );

  const style = customValues
    ? ({
        "--textfield-primary": customValues.primary,
        "--textfield-secondary": customValues.secondary,
        "--textfield-background": customValues.background,
        "--textfield-border": customValues.border,
        "--textfield-text": customValues.text,
        "--textfield-label": customValues.label,
        "--textfield-error": customValues.error,
        "--textfield-placeholder": customValues.placeholder,
        "--textfield-focus": customValues.focus,
        "--textfield-autofill-bg": customValues.autofillBg,
        "--textfield-disabled": customValues.disabled,
        "--textfield-disabled-bg": customValues.disabledBg,
      } as React.CSSProperties)
    : undefined;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (rest.onFocus) {
      rest.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (field.value) {
      setTouched(true);
    }
    field.onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <Component className={rootClassName} style={style}>
      <div className={cx("textfield__input-container")}>
        {label && (
          <Typography
            theme={{ type: themeType }}
            as="label"
            variant="label"
            color={showErrorState ? "error" : undefined}
            className={cx("textfield__label", labelClassName, {
              "textfield__label--focused":
                variant === "secondary" && (focused || field.value),
            })}
            htmlFor={name}
          >
            {label}
          </Typography>
        )}

        <div className={cx("textfield__input-wrapper")}>
          <input
            {...field}
            {...rest}
            id={name}
            type={type === "password" && passwordVisible ? "text" : type}
            className={cx("textfield__input", inputClassName)}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={variant === "primary" ? placeholder : ""}
          />

          {(icon || type === "password") && (
            <div
              className={cx("textfield__icon", {
                "textfield__icon--clickable": type === "password",
                "textfield__icon--error": showErrorState,
              })}
              onClick={
                type === "password" ? togglePasswordVisibility : undefined
              }
            >
              {type === "password" ? passwordIcon : icon}
            </div>
          )}
        </div>
      </div>

      {showErrorState && (
        <Typography
          variant="p3"
          color="error"
          theme={{ type: "dark" }}
          className={cx("textfield__error", errorClassName)}
        >
          {meta.error}
        </Typography>
      )}
    </Component>
  );
};

TextField.displayName = "TextField";

export default TextField;
