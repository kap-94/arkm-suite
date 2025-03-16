// src/components/Button/variants/HybridVariants.tsx
import React from "react";

export const renderHybridVariantElements = (variant: string, cx: Function) => {
  switch (variant) {
    case "modern-glow-hologram":
      return (
        <>
          <span className={cx("button__glow-effect")} />
          <span className={cx("button__hologram-flare")} />
          <span className={cx("button__hologram-noise")} />
          <span className={cx("button__hologram-glitch")} />
        </>
      );
    case "modern-shape-rainbow":
      return (
        <>
          <span className={cx("button__shape-glow")} />
        </>
      );
    case "modern-glow-cosmic":
      return (
        <>
          <span className={cx("button__glow-effect")} />
          <span className={cx("button__cosmic-nebula")} />
          <span className={cx("button__cosmic-star")} />
        </>
      );
    case "modern-pulse-neon":
      return (
        <>
          <span className={cx("button__pulse-glow")} />
          <span className={cx("button__pulse-flash")} />
          <span className={cx("button__neon-glow")} />
          <span className={cx("button__neon-reflection")} />
        </>
      );
    case "modern-shape-hologram":
      return (
        <>
          <span className={cx("button__shape-glow")} />
          <span className={cx("button__hologram-flare")} />
          <span className={cx("button__hologram-noise")} />
          <span className={cx("button__hologram-glitch")} />
        </>
      );
    default:
      return null;
  }
};
