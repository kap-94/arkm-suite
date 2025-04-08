// src/components/Button/variants/ModernGlowVariants.tsx
import React from "react";

export const renderModernGlowVariantElements = (
  variant: string,
  cx: Function
) => {
  switch (variant) {
    case "modern-glow":
      return (
        <>
          <span className={cx("button__glow-effect")} />
        </>
      );
    case "modern-glow-pro":
      return (
        <>
          <span className={cx("button__primary-glow")} />
          <span className={cx("button__secondary-glow")} />
        </>
      );
    case "modern-glow-glass":
      return (
        <>
          <span className={cx("button__glass-highlight")} />
          <span className={cx("button__glass-glow")} />
        </>
      );
    case "modern-glow-pulse":
      return (
        <>
          <span className={cx("button__pulse-glow")} />
          <span className={cx("button__pulse-flash")} />
        </>
      );
    default:
      return null;
  }
};
