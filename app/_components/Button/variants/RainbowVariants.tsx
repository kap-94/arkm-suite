// src/components/Button/variants/RainbowVariants.tsx
import React from "react";

export const renderRainbowVariantElements = (variant: string, cx: Function) => {
  switch (variant) {
    case "rainbow-gradient":
      return (
        <>
          <span className={cx("button__rainbow-glow")} />
        </>
      );
    case "rainbow-cosmic":
      return (
        <>
          <span className={cx("button__cosmic-nebula")} />
          <span className={cx("button__cosmic-star")} />
        </>
      );
    case "rainbow-hologram":
      return (
        <>
          <span className={cx("button__hologram-flare")} />
          <span className={cx("button__hologram-noise")} />
          <span className={cx("button__hologram-glitch")} />
        </>
      );
    case "rainbow-neon":
      return (
        <>
          <span className={cx("button__neon-reflection")} />
          <span className={cx("button__neon-glow")} />
          <span className={cx("button__neon-flicker")} />
        </>
      );
    default:
      return null;
  }
};
