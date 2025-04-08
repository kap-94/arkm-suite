"use client";

import React, { useRef, useMemo, memo } from "react";
import classNames from "classnames/bind";
import { SectionHeading } from "@/app/_components/SectionHeading";
import { useMethodologyAnimation } from "./useMethodologyAnimation";
import { MethodologyStep } from "./MethodologyStep";
import { MethodologyPreviewProps } from "./types";
import { DEFAULT_TITLE, DEFAULT_SUBTITLE } from "./constants";
import { buildMethodologySteps, generateBulbConfig } from "./utils";
import styles from "./MethodologyPreview.module.scss";

const cx = classNames.bind(styles);

const MethodologyPreviewComponent = ({
  dictionary,
  customAnchorId,
}: MethodologyPreviewProps) => {
  // Refs for essential elements
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Prepare data with defaults
  const steps = useMemo(() => buildMethodologySteps(dictionary), [dictionary]);

  const title = dictionary?.title || DEFAULT_TITLE;
  const subtitle = dictionary?.subtitle || DEFAULT_SUBTITLE;

  // Configure bulb icon
  const bulbConfig = useMemo(() => generateBulbConfig(title), [title]);

  // Use animation hook
  const { setStepRef } = useMethodologyAnimation(cx, {
    sectionRef,
    gridRef,
    headerRef,
    stepsRefs,
  });

  return (
    <section id={customAnchorId} ref={sectionRef} className={cx("methodology")}>
      <div className={cx("methodology__backdrop")} aria-hidden="true">
        <div ref={gridRef} className={cx("methodology__grid")}></div>
      </div>

      <div className={cx("methodology__container")}>
        <div ref={headerRef} className={cx("methodology__header")}>
          <SectionHeading
            title={title}
            subtitle={subtitle}
            variant="bulb"
            align="center"
            bulbConfig={bulbConfig}
            className={cx("methodology__heading")}
            titleProps={{
              className: cx("methodology__title"),
            }}
            subtitleProps={{
              className: cx("methodology__subtitle"),
            }}
          />
        </div>

        <div className={cx("methodology__steps-grid")}>
          {steps.map((step, index) => (
            <MethodologyStep
              key={`step-${index}`}
              ref={(el) => setStepRef(el, index)}
              step={step}
              index={index}
              cx={cx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Memoize to avoid unnecessary re-renders
export const MethodologyPreview = memo(MethodologyPreviewComponent);

export default MethodologyPreview;
