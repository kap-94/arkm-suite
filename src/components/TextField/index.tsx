"use client";

import React, {
  FC,
  InputHTMLAttributes,
  useState,
  useCallback,
  useRef,
} from "react";
import { useField } from "formik";
import classNames from "classnames/bind";
import { inter } from "@/fonts";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Search,
  Phone,
  Calendar,
  CreditCard,
  Link as LinkIcon,
} from "lucide-react";
import styles from "./TextField.module.scss";

const cx = classNames.bind(styles);

const iconMap = {
  email: Mail,
  password: Lock,
  text: User,
  search: Search,
  tel: Phone,
  date: Calendar,
  number: CreditCard,
  url: LinkIcon,
};

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string | JSX.Element;
  name: string;
  icon?: keyof typeof iconMap;
  variant?: "primary" | "secondary";
  placeholder?: string;
  className?: string; // Agregar className prop
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export const TextField: FC<TextFieldProps> = ({
  label,
  name,
  icon,
  type = "text",
  variant = "primary",
  placeholder,
  className,
  labelClassName,
  inputClassName,
  errorClassName,
  ...props
}) => {
  const [field, meta] = useField(name);
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isTogglingPassword = useRef(false);
  const cursorPosition = useRef<number | null>(null);

  const containerClasses = cx(
    "form-control",
    `form-control--${variant}`,
    className,
    {
      "form-control--error":
        !isTogglingPassword.current && meta.touched && meta.error,
      "form-control--not-empty": field.value !== "",
      "form-control--focused": focused,
      "form-control--with-icon": icon || type === "password",
    }
  );

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isTogglingPassword.current) {
      setFocused(false);
      field.onBlur(e);
    }
    setTimeout(() => {
      isTogglingPassword.current = false;
    }, 100);
  };

  const togglePasswordVisibility = (
    e: React.MouseEvent | React.KeyboardEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Guardar la posición actual del cursor antes de cambiar el tipo
    if (inputRef.current) {
      cursorPosition.current = inputRef.current.selectionStart;
    }

    isTogglingPassword.current = true;
    setPasswordVisible((prev) => !prev);

    // Restaurar el foco y la posición del cursor después del cambio
    if (inputRef.current) {
      inputRef.current.focus();

      // Necesitamos usar setTimeout porque el cambio de tipo necesita completarse
      setTimeout(() => {
        if (inputRef.current && cursorPosition.current !== null) {
          inputRef.current.setSelectionRange(
            cursorPosition.current,
            cursorPosition.current
          );
        }
      }, 0);
    }
  };

  const handleIconKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      togglePasswordVisibility(e);
    }
  };

  const IconComponent =
    type === "password"
      ? passwordVisible
        ? Eye
        : EyeOff
      : icon
      ? iconMap[icon]
      : undefined;

  return (
    <div className={containerClasses}>
      <div className={cx("form-control__input-container")}>
        <label
          className={cx(
            "form-control__label",
            inter.className,
            labelClassName,
            {
              "form-control__label--focused":
                variant === "secondary" && (focused || field.value),
            }
          )}
          htmlFor={name}
        >
          {label}
        </label>

        <input
          ref={inputRef}
          id={name}
          className={cx("form-control__input", inter.className, inputClassName)}
          {...field}
          {...props}
          placeholder={variant === "primary" ? placeholder : ""}
          type={type === "password" && passwordVisible ? "text" : type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={meta.touched && meta.error ? "true" : "false"}
          aria-describedby={
            meta.touched && meta.error ? `${name}-error` : undefined
          }
        />

        {IconComponent && (
          <div
            className={cx("form-control__icon")}
            onClick={type === "password" ? togglePasswordVisibility : undefined}
            onMouseDown={(e) => {
              if (type === "password") {
                e.preventDefault();
              }
            }}
            onKeyDown={type === "password" ? handleIconKeyDown : undefined}
            style={{ cursor: type === "password" ? "pointer" : "default" }}
            role={type === "password" ? "button" : undefined}
            tabIndex={type === "password" ? 0 : undefined}
            aria-label={
              type === "password"
                ? passwordVisible
                  ? "Hide password"
                  : "Show password"
                : undefined
            }
          >
            <IconComponent
              size={18}
              strokeWidth={1.5}
              className={cx("form-control__icon-svg", {
                "form-control__icon-svg--error":
                  !isTogglingPassword.current && meta.touched && meta.error,
              })}
            />
          </div>
        )}
      </div>

      {meta.touched && meta.error && !isTogglingPassword.current && (
        <div
          className={cx("form-control__error", inter.className, errorClassName)}
          id={`${name}-error`}
          role="alert"
        >
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default TextField;
