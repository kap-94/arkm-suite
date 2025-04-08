// src/components/Button/variants/PrismaVariants.tsx
import React from "react";

export const renderPrismaVariantElements = (variant: string, cx: Function) => {
  switch (variant) {
    case "prisma-multiple":
      return (
        <>
          <span className={cx("button__border")} />
          <span className={cx("button__flare")} />
        </>
      );
    case "prisma-refraction":
      return (
        <>
          <span className={cx("button__border")} />
          <span className={cx("button__refraction")} />
        </>
      );
    default:
      return null;
  }
};
