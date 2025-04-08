"use client";

import React from "react";
import { Typography } from "@/app/_components/Typography";
import { MethodologyStep as MethodologyStepType } from "./types";

interface MethodologyStepProps {
  step: MethodologyStepType;
  index: number;
  cx: (className: string, obj?: Record<string, boolean>) => string;
  ref: (el: HTMLDivElement | null) => void;
}

export const MethodologyStep = React.forwardRef<
  HTMLDivElement,
  MethodologyStepProps
>(({ step, index, cx }, ref) => {
  return (
    <div ref={ref} className={cx("methodology__step")}>
      <div className={cx("methodology__step-content")}>
        <div className={cx("methodology__step-header")}>
          <div className={cx("methodology__step-title-container")}>
            <Typography
              variant="h5"
              color="inherit"
              fontFamily="sofia"
              fontWeight={600}
              theme="dark"
              noWrap
              className={cx("methodology__step-title")}
            >
              <span className={cx("methodology__step-number-inline")}>
                {index + 1}.
              </span>{" "}
              {step.title}
            </Typography>
            <div className={cx("methodology__step-icon")}>{step.icon}</div>
          </div>
        </div>
        <Typography
          variant="p1"
          color="tertiary"
          theme="dark"
          fontWeight={500}
          fontFamily="sofia"
          className={cx("methodology__step-description")}
        >
          {step.description}
        </Typography>
      </div>
    </div>
  );
});

MethodologyStep.displayName = "MethodologyStep";
