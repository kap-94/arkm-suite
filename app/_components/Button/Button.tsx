"use client";

import { forwardRef } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import { Loader } from "lucide-react";
import { ButtonProps } from "./button.types";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      radius = "full",
      icon,
      className,
      href,
      isLoading = false,
      disabled = false,
      onClick,
      fullWidth = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const buttonClasses = cx(
      "button",
      `button--${variant}`,
      `button--${size}`,
      `button--radius-${radius}`,
      {
        "button--disabled": disabled,
        "button--loading": isLoading,
        "button--with-icon": !!icon,
        "button--fullWidth": fullWidth,
      },
      className
    );

    const content = (
      <>
        {isLoading ? (
          <Loader className={cx("button__spinner")} size={20} />
        ) : (
          <>
            <span className={cx("button__text")}>{children}</span>
            {icon && <span className={cx("button__icon")}>{icon}</span>}
          </>
        )}
      </>
    );

    if (href && !disabled) {
      return (
        <Link
          href={href}
          className={buttonClasses}
          ref={ref as any}
          onClick={onClick}
          {...props}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as any}
        className={buttonClasses}
        disabled={disabled || isLoading}
        onClick={onClick}
        type={type}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
