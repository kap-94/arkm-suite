"use client";

import React, { useLayoutEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SolutionCard, { SolutionCardProps } from "@/components/SolutionCard";
import IllustrationSVG from "@/components/IllustrationSVG";
import styles from "./Solution.module.scss";
import AbstractIllustration from "@/components/illustrations/AbstractIllustration";
import SolutionCardExpandable from "@/components/SolutionCard/SolutionCardExpandable";

gsap.registerPlugin(ScrollTrigger);

export type SolutionLayout = "card-left" | "card-right";

export interface SolutionProps {
  word?: string;
  className?: string;
  solution: SolutionCardProps;
  layout?: SolutionLayout;
  cardWidth?: number;
  backgroundWidth?: number;
  backgroundHeight?: number;
  AnimationComponent: React.ComponentType;
  featureOffset?: number; // Nuevo prop para pasar el offset global de features
}

const cx = classNames.bind(styles);

export const Solution: React.FC<SolutionProps> = ({
  word,
  solution,
  className,
  layout = "card-left",
  cardWidth = 440,
  backgroundWidth = 490,
  backgroundHeight = 500,
  AnimationComponent,
  featureOffset = 0,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const wireframeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx: gsap.Context | null = null;

    if (window.innerWidth > 768) {
      ctx = gsap.context(() => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        });

        scrollTl
          .to(cardRef.current, { y: -100 }, 0)
          .to(wireframeRef.current, { y: -200 }, 0)
          .to(backgroundRef.current, { y: -50 }, 0);

        ScrollTrigger.create({
          trigger: wireframeRef.current,
          start: "top center+=100",
          onEnter: () => {
            const wireframeElement =
              wireframeRef.current?.querySelector(".wireframe");
            if (wireframeElement) {
              wireframeElement.dispatchEvent(
                new CustomEvent("restartAnimation")
              );
            }
          },
        });
      }, container);

      ScrollTrigger.refresh();
    }

    return () => {
      ctx?.revert();
      ScrollTrigger.refresh();
    };
  }, [layout]);

  return (
    <div
      ref={container}
      className={cx("solution", className, `solution--${layout}`)}
      style={
        {
          "--card-width": `${cardWidth}px`,
          "--background-width": `${backgroundWidth}px`,
          "--background-height": `${backgroundHeight}px`,
        } as React.CSSProperties
      }
    >
      <div className={cx("solution__container")}>
        <div ref={cardRef} className={cx("solution__card-wrapper")}>
          <SolutionCardExpandable
            {...solution}
            className={cx("solution__card")}
            // featureOffset={featureOffset}
          />
        </div>

        <div ref={backgroundRef} className={cx("solution__background")}>
          {solution.id == "web-design-solution" ? (
            <IllustrationSVG variant="orbital" />
          ) : (
            <IllustrationSVG variant="default" />
          )}
        </div>

        <div ref={wireframeRef} className={cx("solution__wireframe-wrapper")}>
          <AnimationComponent />
        </div>
      </div>
    </div>
  );
};

export default Solution;
