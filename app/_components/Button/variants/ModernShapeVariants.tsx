// src/components/Button/variants/ModernShapeVariants.tsx
import React from "react";

export const renderModernShapeVariantElements = (
  variant: string,
  cx: Function
) => {
  // All modern shape variants have the same elements but with different styling
  return (
    <>
      <span className={cx("button__shape-glow")} />
    </>
  );
};
