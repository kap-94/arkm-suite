"use client";

import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  Suspense,
  ReactNode,
  memo,
} from "react";
import classNames from "classnames/bind";
import { gsap, ScrollTrigger } from "@/app/_lib/gsap-init";
import styles from "./DynamicLayoutWithElements.module.scss";

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
  disableParallax = false,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<string>(
    `dynamic-layout-${itemNumber}-${Date.now()}`
  );
  const floatingElements = useRef<Array<HTMLDivElement | null>>([]);
  const connectors = useRef<Array<HTMLDivElement | null>>([]);
  const ambientLight = useRef<HTMLDivElement | null>(null);

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
      rotationX: 2,
    });

    floatingElements.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, scale: 0.95 });
    });

    connectors.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, scaleX: 0.5 });
    });

    if (ambientLight.current) {
      gsap.set(ambientLight.current, { opacity: 0.3 });
    }
  }, []);

  useLayoutEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      gsap.set(container.current, { autoAlpha: 1 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
        onComplete: () => {
          if (ambientLight.current) {
            gsap.to(ambientLight.current, { opacity: 1, duration: 0.3 });
          }
        },
      });

      if (!isAdaptive) {
        floatingElements.current.forEach((el, i) => {
          if (el) {
            tl.to(
              el,
              {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                delay: i * 0.03,
              },
              0
            );
          }
        });

        connectors.current.forEach((el, i) => {
          if (el) {
            tl.to(
              el,
              {
                opacity: 0.7,
                scaleX: 1,
                duration: 0.3,
                delay: i * 0.02,
              },
              0
            );
          }
        });
      }

      // Always show leftComponent on the left and rightComponent on the right
      // The layout prop determines the order in the DOM
      const firstElement = leftRef.current;
      const secondElement = rightRef.current;

      const secondDelay = isAdaptive ? 0.4 : 0.2;

      if (firstElement) {
        tl.to(
          firstElement,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.4,
          },
          0.1
        );
      }

      if (secondElement) {
        tl.to(
          secondElement,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.4,
          },
          secondDelay
        );
      }

      ScrollTrigger.create({
        id: animationId.current,
        trigger: container.current,
        start: "top 95%",
        onEnter: () => {
          tl.play();
        },
        once: true,
      });

      if (!isMobile && !isAdaptive && !disableParallax) {
        const parallaxMultiplier = layout === "left-right" ? 1 : -1;

        ScrollTrigger.create({
          trigger: container.current,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 0.5,
          onUpdate: (self: ScrollTrigger) => {
            if (leftRef.current) {
              gsap.to(leftRef.current, {
                y: -20 * self.progress,
                x: 10 * parallaxMultiplier * self.progress,
                rotationY: 2 * parallaxMultiplier * self.progress,
              });
            }
            if (rightRef.current) {
              gsap.to(rightRef.current, {
                y: -20 * self.progress,
                x: -10 * parallaxMultiplier * self.progress,
                rotationY: -2 * parallaxMultiplier * self.progress,
              });
            }
          },
        });

        ScrollTrigger.create({
          trigger: container.current,
          start: "top 60%",
          end: "bottom 40%",
          onUpdate: (self: ScrollTrigger) => {
            const progress = Math.abs(self.progress - 0.5) * 2;
            const scale = 1 + 0.02 * (1 - progress);
            const brightness = 1 + 0.05 * (1 - progress);

            gsap.to([leftRef.current, rightRef.current], {
              scale,
              filter: `brightness(${brightness})`,
              duration: 0.2,
            });
          },
        });
      }
    }, container);

    return () => {
      ctx.revert();
      const trigger = ScrollTrigger.getById(animationId.current);
      if (trigger) trigger.kill();
    };
  }, [layout, isMobile, isAdaptive, disableParallax]);

  const setFloatingElementRef = (
    el: HTMLDivElement | null,
    index: number
  ): void => {
    floatingElements.current[index] = el;
  };

  const setConnectorRef = (el: HTMLDivElement | null, index: number): void => {
    connectors.current[index] = el;
  };

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
      {!isMobile && !isAdaptive && (
        <>
          {[1, 2, 3, 4].map((num, index) => (
            <div
              key={`float-${num}`}
              ref={(el) => setFloatingElementRef(el, index)}
              className={cx(
                "dynamic-layout__floating-element",
                `dynamic-layout__floating-element--${num}`
              )}
            />
          ))}

          <div
            ref={(el) => setConnectorRef(el, 0)}
            className={cx(
              "dynamic-layout__connector",
              "dynamic-layout__connector--horizontal"
            )}
          />
          <div
            ref={(el) => setConnectorRef(el, 1)}
            className={cx(
              "dynamic-layout__connector",
              "dynamic-layout__connector--diagonal-1"
            )}
          />
          <div
            ref={(el) => setConnectorRef(el, 2)}
            className={cx(
              "dynamic-layout__connector",
              "dynamic-layout__connector--diagonal-2"
            )}
          />

          <div
            ref={ambientLight}
            className={cx("dynamic-layout__ambient-light")}
          />
        </>
      )}

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
