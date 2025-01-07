// HamburgerButton.tsx
"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import classNames from "classnames/bind";
import { HamburgerButtonProps } from "./types";
import { LINE_VARIANTS } from "./constants";
import styles from "./Hamburger.module.scss";

const cx = classNames.bind(styles);

/**
 * Animated hamburger button component with multiple variants
 *
 * @example
 * ```tsx
 * <Hamburger
 *   variant="slide"
 *   isOpen={isMenuOpen}
 *   onClick={() => setIsMenuOpen(!isMenuOpen)}
 * />
 * ```
 */
export const Hamburger = ({
  onClick,
  variant = "slide",
  className,
  isOpen = false,
  theme = { type: "light" },
}: HamburgerButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const getLineVariants = (
    variant: HamburgerButtonProps["variant"]
  ): Variants => {
    return LINE_VARIANTS[variant || "slide"];
  };

  const renderLines = () => {
    const lineVariants = getLineVariants(variant);
    const lineCount = variant === "slide" ? 3 : 2;

    return [...Array(lineCount)].map((_, i) => (
      <motion.span
        key={i}
        className={cx(
          "hamburger__line",
          `hamburger__line--${i + 1}`,
          `hamburger__line--${variant}`
        )}
        custom={i}
        variants={lineVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        whileHover="hover"
        data-testid={`hamburger-line-${i + 1}`}
      />
    ));
  };

  const customStyles = theme.customValues
    ? ({
        "--hamburger-primary": theme.customValues.primary,
        "--hamburger-secondary": theme.customValues.secondary,
        "--hamburger-background": theme.customValues.background,
        "--hamburger-hover": theme.customValues.hover,
      } as React.CSSProperties)
    : undefined;

  return (
    <motion.button
      ref={buttonRef}
      className={cx(
        "hamburger",
        `hamburger--${variant}`,
        `hamburger--theme-${theme.type}`,
        { "hamburger--open": isOpen },
        className
      )}
      style={customStyles}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      data-testid="hamburger-button"
    >
      <div className={cx("hamburger__lines-wrapper")}>{renderLines()}</div>
    </motion.button>
  );
};
