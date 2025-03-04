"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./LandingWireframe1.module.scss";

const cx = classNames.bind(styles);

export const LandingWireframe1 = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const gridItemsRef = useRef([]);
  const timeline = useRef(null);

  const addToGridRefs = (el, index) => {
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
        if (!headerRef.current || !heroRef.current || !featuresRef.current)
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
          // Hero Animation
          .fromTo(
            heroRef.current,
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
          // Features Header Animation
          .fromTo(
            featuresRef.current,
            {
              y: "30",
              opacity: 0,
              visibility: "hidden",
            },
            {
              y: "0",
              opacity: 1,
              visibility: "visible",
              duration: 0.5,
            },
            "-=0.3"
          );

        // Features Items Animation with shine effect
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
    <div ref={containerRef} className={cx("landing")}>
      {/* Header */}
      <header ref={headerRef} className={cx("landing__header")}>
        <div className={cx("landing__header-content")}>
          <div className={cx("landing__header-logo")} />
          <div className={cx("landing__header-nav")}>
            <div className={cx("landing__header-nav-item")} />
            <div className={cx("landing__header-nav-item")} />
            <div className={cx("landing__header-nav-item")} />
          </div>
          <div className={cx("landing__header-cta")} />
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className={cx("landing__hero")}>
        <div className={cx("landing__hero-content")}>
          <div className={cx("landing__hero-title")} />
          <div className={cx("landing__hero-subtitle")} />
          <div className={cx("landing__hero-buttons")}>
            <div
              className={cx(
                "landing__hero-button",
                "landing__hero-button--primary"
              )}
            />
            <div
              className={cx(
                "landing__hero-button",
                "landing__hero-button--secondary"
              )}
            />
          </div>
        </div>
        <div className={cx("landing__hero-image")}>
          <div className={cx("landing__hero-image-overlay")}>
            <div className={cx("landing__hero-image-icon")} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={cx("landing__features")}>
        <div ref={featuresRef} className={cx("landing__features-header")}>
          <div className={cx("landing__features-title")} />
          <div className={cx("landing__features-subtitle")} />
        </div>

        <div className={cx("landing__features-grid")}>
          {[...Array(3)].map((_, index) => (
            <div
              key={`feature-${index}`}
              ref={(el) => addToGridRefs(el, index)}
              className={cx("landing__features-item")}
            >
              <div className={cx("landing__features-item-icon")} />
              <div className={cx("landing__features-item-title")} />
              <div className={cx("landing__features-item-text")} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingWireframe1;
