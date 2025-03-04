"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./WireframeAnimation.module.scss";

const cx = classNames.bind(styles);

export const WireframeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const gridItemsRef = useRef<HTMLDivElement[]>([]);
  const fabRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const addToGridRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !gridItemsRef.current.includes(el)) {
      gridItemsRef.current[index] = el;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      const createAnimation = () => {
        if (
          !headerRef.current ||
          !sidebarRef.current ||
          !mainRef.current ||
          !fabRef.current ||
          !timeline.current
        )
          return;

        timeline.current.clear();

        // Header Animation
        timeline.current
          .fromTo(
            headerRef.current,
            {
              x: "-100%",
              opacity: 0,
              visibility: "hidden",
            },
            {
              x: "0",
              opacity: 1,
              visibility: "visible",
            }
          )
          // Sidebar Animation
          .fromTo(
            sidebarRef.current,
            {
              y: "50",
              opacity: 0,
              visibility: "hidden",
            },
            {
              y: "0",
              opacity: 1,
              visibility: "visible",
              duration: 0.6,
            },
            "-=0.4"
          )
          // Main Content Header Animation
          .fromTo(
            mainRef.current,
            {
              y: "30",
              opacity: 0,
              visibility: "hidden",
            },
            {
              y: "0",
              opacity: 1,
              visibility: "visible",
              duration: 0.6,
            },
            "-=0.3"
          );

        // Grid Items Animation with shine effect
        gridItemsRef.current.forEach((item, index) => {
          if (!item || !timeline.current) return;

          timeline.current.fromTo(
            item,
            {
              scale: 0.9,
              opacity: 0,
              visibility: "hidden",
            },
            {
              scale: 1,
              opacity: 1,
              visibility: "visible",
              duration: 0.4,
              onStart: () => {
                item.classList.add(cx("animate-shine"));
              },
              onComplete: () => {
                setTimeout(() => {
                  item.classList.remove(cx("animate-shine"));
                }, 1000);
              },
            },
            `-=${index ? 0.2 : 0.2}`
          );
        });

        // FAB Animation
        timeline.current.fromTo(
          fabRef.current,
          {
            scale: 0,
            opacity: 0,
            visibility: "hidden",
          },
          {
            scale: 1,
            opacity: 1,
            visibility: "visible",
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
      };

      // Initial animation
      createAnimation();

      // Listen for restart events
      const handleRestart = () => {
        createAnimation();
      };

      containerRef.current?.addEventListener("restartAnimation", handleRestart);

      return () => {
        containerRef.current?.removeEventListener(
          "restartAnimation",
          handleRestart
        );
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cx("wireframe")}>
      <header ref={headerRef} className={cx("wireframe__header")}>
        <div className={cx("wireframe__header-content")}>
          <div className={cx("wireframe__header-logo")} />
          <div className={cx("wireframe__header-text")}>
            <div
              className={cx(
                "wireframe__header-text-line",
                "wireframe__header-text-line--short"
              )}
            />
            <div
              className={cx(
                "wireframe__header-text-line",
                "wireframe__header-text-line--medium"
              )}
            />
          </div>
        </div>
      </header>

      <div className={cx("wireframe__content")}>
        <aside ref={sidebarRef} className={cx("wireframe__sidebar")}>
          {[...Array(4)].map((_, index) => (
            <div
              key={`sidebar-item-${index}`}
              className={cx("wireframe__sidebar-item")}
            />
          ))}
        </aside>

        <main ref={mainRef} className={cx("wireframe__main")}>
          <div className={cx("wireframe__main-header")}>
            <div className={cx("wireframe__main-header-title")} />
            <div className={cx("wireframe__main-header-subtitle")} />
          </div>

          <div className={cx("wireframe__main-grid")}>
            {[...Array(4)].map((_, index) => (
              <div
                key={`grid-item-${index}`}
                ref={(el) => addToGridRefs(el, index)}
                className={cx("wireframe__main-item")}
              />
            ))}
          </div>
        </main>
      </div>

      <button ref={fabRef} className={cx("wireframe__fab")}>
        <div className={cx("wireframe__fab-icon")} />
      </button>
    </div>
  );
};

export default WireframeAnimation;
