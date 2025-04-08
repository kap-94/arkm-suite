"use client";

import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  ReactNode,
  memo,
} from "react";
import classNames from "classnames/bind";
import { gsap } from "@/app/_lib/gsap-init";
import styles from "./DynamicLayout.module.scss";

const cx = classNames.bind(styles);

export type LayoutType = "left-right" | "right-left";

export interface DynamicLayoutProps {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
  layout?: LayoutType;
  itemNumber: number;
  containerClassName?: string;
  disableParallax?: boolean;
}

export const DynamicLayout: React.FC<DynamicLayoutProps> = ({
  leftComponent,
  rightComponent,
  layout = "left-right",
  itemNumber,
  containerClassName,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // State to detect if we're on mobile or in adaptive mode
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isAdaptive, setIsAdaptive] = useState<boolean>(false);
  const MOBILE_BREAKPOINT = 768;
  const ADAPTIVE_BREAKPOINT = 830;

  // Detect changes in window size
  useEffect(() => {
    const checkViewportSize = (): void => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth <= MOBILE_BREAKPOINT);
      setIsAdaptive(
        windowWidth <= ADAPTIVE_BREAKPOINT && windowWidth > MOBILE_BREAKPOINT
      );
    };

    checkViewportSize();
    window.addEventListener("resize", checkViewportSize);

    return () => {
      window.removeEventListener("resize", checkViewportSize);
    };
  }, []);

  useLayoutEffect(() => {
    if (!container.current) return;

    gsap.set(container.current, { visibility: "visible", autoAlpha: 1 });
    gsap.set([leftRef.current, rightRef.current], {
      opacity: 0.5,
      y: 20,
    });

    // Simple fade-in animation
    gsap.to([leftRef.current, rightRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.2,
      delay: 0.1,
    });
  }, []);

  return (
    <div
      ref={container}
      className={cx(
        "dynamic-layout",
        `dynamic-layout--${layout}`,
        {
          "dynamic-layout--mobile": isMobile,
          "dynamic-layout--adaptive": isAdaptive,
        },
        containerClassName
      )}
      style={{ visibility: "visible" }}
    >
      <div className={cx("dynamic-layout__container")}>
        <div className={cx("dynamic-layout__content-wrapper")}>
          <div
            ref={leftRef}
            className={cx(
              "dynamic-layout__left-wrapper",
              "dynamic-layout__card-container"
            )}
          >
            {leftComponent}
          </div>

          <div
            ref={rightRef}
            className={cx(
              "dynamic-layout__right-wrapper",
              "dynamic-layout__images-container"
            )}
          >
            {rightComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export const layoutOptions = {
  LEFT_RIGHT: "left-right" as const,
  RIGHT_LEFT: "right-left" as const,
};

export default memo(DynamicLayout);
