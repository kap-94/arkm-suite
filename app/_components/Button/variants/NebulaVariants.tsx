// src/components/Button/variants/NebulaVariants.tsx
import React from "react";

export const renderNebulaVariantElements = (variant: string, cx: Function) => {
  switch (variant) {
    case "nebula-stardust":
      return (
        <>
          <span className={cx("button__stars")} />
          <span className={cx("button__border")} />
        </>
      );
    case "nebula-vortex":
      return (
        <>
          <span className={cx("button__vortex")} />
          <span className={cx("button__particles")} />
          <span className={cx("button__glow")} />
        </>
      );
    case "nebula-quantum":
      return (
        <>
          <span className={cx("button__quantum")} />
          <span className={cx("button__energy")} />
          <span className={cx("button__border")} />
        </>
      );
    default:
      return null;
  }
};
