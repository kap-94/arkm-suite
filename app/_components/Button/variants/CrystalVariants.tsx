// src/components/Button/variants/CrystalVariants.tsx
import React from "react";

export const renderCrystalVariantElements = (variant: string, cx: Function) => {
  switch (variant) {
    case "crystal-frosted":
      return (
        <>
          <span className={cx("button__inner")} />
          <span className={cx("button__border")} />
          <span className={cx("button__hover")} />
        </>
      );
    case "crystal-prismatic":
      return (
        <>
          <span className={cx("button__prism")} />
          <span className={cx("button__reflections")} />
          <span className={cx("button__border")} />
        </>
      );
    case "crystal-liquid":
      return (
        <>
          <span className={cx("button__liquid")} />
          <span className={cx("button__ripple")} />
          <span className={cx("button__border")} />
        </>
      );
    default:
      return null;
  }
};
