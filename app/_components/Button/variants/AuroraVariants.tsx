// src/components/Button/variants/AuroraVariants.tsx
import React from "react";

export const renderAuroraVariantElements = (variant: string, cx: Function) => {
  switch (variant) {
    case "aurora-waves":
      return (
        <>
          <span className={cx("button__waves")} />
          <span className={cx("button__border")} />
        </>
      );
    case "aurora-curtain":
      return (
        <>
          <span className={cx("button__curtain")} />
          <span className={cx("button__wave")} />
          <span className={cx("button__border")} />
        </>
      );
    case "aurora-plasma":
      return (
        <>
          <span className={cx("button__plasma")} />
          <span className={cx("button__plasma-waves")} />
          <span className={cx("button__glow")} />
          <span className={cx("button__border")} />
        </>
      );
    default:
      return null;
  }
};
