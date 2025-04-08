"use client";

import React, { ElementType, useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import { useField } from "formik";
import type { TextAreaProps } from "./types";
import { Typography } from "../Typography";
import styles from "./TextArea.module.scss";

const cx = classNames.bind(styles);

export const TextArea = <T extends ElementType = "div">({
  as,
  className,
  label,
  name,
  icon,
  variant = "primary",
  theme = { type: "dark" },
  disabled = false,
  labelClassName,
  inputClassName,
  errorClassName,
  showError = false,
  required = false,
  placeholder,
  fontFamily,
  error,
  value,
  onChange,
  rows = 5,
  ...rest
}: TextAreaProps<T>) => {
  const [field, meta, helpers] = useField({
    name,
    ...(value !== undefined ? { value } : {}),
    ...(onChange ? { onChange } : {}),
  });

  const [focused, setFocused] = useState(false);
  const [fieldTouched, setFieldTouched] = useState(false);
  const [valueChanged, setValueChanged] = useState(false);
  const [lastValue, setLastValue] = useState(field.value);

  const Component = as || "div";
  const themeType = typeof theme === "string" ? theme : theme.type;
  const customValues =
    typeof theme === "object" ? theme.customValues : undefined;

  // Error handling with support for clearing when value changes
  const errorMessage = valueChanged
    ? null
    : error || (meta.error && meta.touched ? meta.error : null);
  const shouldDisplayError = showError && !!errorMessage;

  // Memoized handlers to avoid unnecessary recreations
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      if (rest.onFocus) {
        rest.onFocus(e);
      }
    },
    [rest]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      setFieldTouched(true);
      setValueChanged(false); // Allow errors to show again after losing focus
      field.onBlur(e);
      if (rest.onBlur) {
        rest.onBlur(e);
      }
    },
    [field, rest]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // If there's already an error shown, mark that the value has changed
      if (showError && (error || meta.error)) {
        setValueChanged(true);
      }
      field.onChange(e);
      if (onChange) {
        onChange(e);
      }
    },
    [field, showError, error, meta.error, onChange]
  );

  // Effect to detect changes in value
  useEffect(() => {
    if (field.value !== lastValue && showError) {
      setValueChanged(true);
    }
    setLastValue(field.value);
  }, [field.value, lastValue, showError]);

  // Effect to reset valueChanged when showError changes
  useEffect(() => {
    if (showError === false) {
      setValueChanged(false);
    }
  }, [showError]);

  // Effect to reset valueChanged when error changes
  useEffect(() => {
    if (error || meta.error) {
      setValueChanged(false);
    }
  }, [error, meta.error]);

  const rootClassName = cx(
    "textarea",
    `textarea--${variant}`,
    {
      "textarea--disabled": disabled,
      "textarea--error": shouldDisplayError,
      "textarea--not-empty": field.value,
      "textarea--focused": focused,
      "textarea--with-icon": icon,
      [`textarea--theme-${themeType}`]: themeType,
    },
    className
  );

  const style = customValues
    ? ({
        "--textarea-primary": customValues.primary,
        "--textarea-secondary": customValues.secondary,
        "--textarea-background": customValues.background,
        "--textarea-border": customValues.border,
        "--textarea-text": customValues.text,
        "--textarea-label": customValues.label,
        "--textarea-error": customValues.error,
        "--textarea-placeholder": customValues.placeholder,
        "--textarea-focus": customValues.focus,
        "--textarea-autofill-bg": customValues.autofillBg,
        "--textarea-disabled": customValues.disabled,
        "--textarea-disabled-bg": customValues.disabledBg,
      } as React.CSSProperties)
    : undefined;

  return (
    <Component className={rootClassName} style={style}>
      <div className={cx("textarea__input-container")}>
        {label && (
          <Typography
            theme={{ type: themeType }}
            as="label"
            fontWeight={500}
            variant="label"
            color={shouldDisplayError ? "error" : undefined}
            fontFamily={fontFamily}
            className={cx("textarea__label", labelClassName, {
              "textarea__label--focused":
                variant === "secondary" && (focused || field.value),
            })}
            htmlFor={name}
          >
            {label}
            {required && <span className={cx("textarea__required")}> *</span>}
          </Typography>
        )}

        <div className={cx("textarea__input-wrapper")}>
          <textarea
            {...rest}
            id={name}
            name={name}
            value={field.value}
            onChange={handleChange}
            className={cx("textarea__input", inputClassName)}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={variant === "primary" ? placeholder : ""}
            aria-invalid={shouldDisplayError ? "true" : "false"}
            aria-required={required ? "true" : "false"}
            rows={rows}
          />

          {icon && (
            <div
              className={cx("textarea__icon", {
                "textarea__icon--error": shouldDisplayError,
              })}
            >
              {icon}
            </div>
          )}
        </div>
      </div>

      {shouldDisplayError && (
        <Typography
          variant="p3"
          color="error"
          theme={{ type: themeType }}
          fontFamily={fontFamily}
          className={cx("textarea__error", errorClassName)}
        >
          {errorMessage}
        </Typography>
      )}
    </Component>
  );
};

TextArea.displayName = "TextArea";

export default TextArea;
