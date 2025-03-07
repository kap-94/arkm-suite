// utils/headerUtils.ts
import { AnimationVariants } from "../types";

export const textAnimationVariants: AnimationVariants = {
  hovered: {
    y: [0, -4, 0],
    textShadow: ["0px 0px 0px #000", "3px 3px 5px #22D3EE"],
    transition: {
      duration: 0.5,
      delay: 0,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
  normal: {
    y: 0,
    textShadow: "0px 0px 0px #000",
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const DEFAULT_HEADER_CONFIG = {
  variant: "solid" as const,
  breakpoint: 768,
  menuPosition: "right" as const,
  appearance: {
    blur: true,
    height: 80,
    padding: {
      desktop: 32,
      mobile: 24,
    },
  },
} as const;

export const getAnimationDelay = (index: number) => index * 0.04;
