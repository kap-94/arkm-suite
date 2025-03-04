"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./LandingWireframe2.module.scss";

const cx = classNames.bind(styles);

export const LandingWireframe2 = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const featureRef = useRef(null);
  const showcaseRef = useRef(null);
  const ctaRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.6,
        },
      });

      const createAnimation = () => {
        if (
          !headerRef.current ||
          !heroRef.current ||
          !featureRef.current ||
          !showcaseRef.current ||
          !ctaRef.current
        )
          return;

        timeline.current.clear();

        // Header Animation
        timeline.current
          .fromTo(
            headerRef.current,
            {
              y: "-100%",
              opacity: 0,
              visibility: "hidden",
            },
            {
              y: "0",
              opacity: 1,
              visibility: "visible",
            }
          )
          // Hero Animation
          .fromTo(
            heroRef.current,
            {
              opacity: 0,
              visibility: "hidden",
            },
            {
              opacity: 1,
              visibility: "visible",
            },
            "-=0.3"
          )
          // Feature Animation
          .fromTo(
            featureRef.current,
            {
              x: "-30",
              opacity: 0,
              visibility: "hidden",
            },
            {
              x: "0",
              opacity: 1,
              visibility: "visible",
              onStart: () => {
                featureRef.current.classList.add(cx("animate-shine"));
              },
              onComplete: () => {
                setTimeout(() => {
                  featureRef.current.classList.remove(cx("animate-shine"));
                }, 1000);
              },
            },
            "-=0.3"
          )
          // Showcase Animation
          .fromTo(
            showcaseRef.current,
            {
              x: "30",
              opacity: 0,
              visibility: "hidden",
            },
            {
              x: "0",
              opacity: 1,
              visibility: "visible",
              onStart: () => {
                showcaseRef.current.classList.add(cx("animate-shine"));
              },
              onComplete: () => {
                setTimeout(() => {
                  showcaseRef.current.classList.remove(cx("animate-shine"));
                }, 1000);
              },
            },
            "-=0.3"
          )
          // CTA Animation
          .fromTo(
            ctaRef.current,
            {
              y: "20",
              opacity: 0,
              visibility: "hidden",
            },
            {
              y: "0",
              opacity: 1,
              visibility: "visible",
            },
            "-=0.3"
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
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className={cx("landing__hero")}>
        <div className={cx("landing__hero-title")} />
        <div className={cx("landing__hero-subtitle")} />
        <div className={cx("landing__hero-cta")} />
      </section>

      {/* Feature Section */}
      <section ref={featureRef} className={cx("landing__feature")}>
        <div className={cx("landing__feature-image")} />
        <div className={cx("landing__feature-content")}>
          <div className={cx("landing__feature-badge")} />
          <div className={cx("landing__feature-title")} />
          <div className={cx("landing__feature-text")} />
          <div className={cx("landing__feature-text")} />
        </div>
      </section>

      {/* Showcase Section */}
      <section ref={showcaseRef} className={cx("landing__showcase")}>
        <div className={cx("landing__showcase-content")}>
          <div className={cx("landing__showcase-badge")} />
          <div className={cx("landing__showcase-title")} />
          <div className={cx("landing__showcase-text")} />
          <div className={cx("landing__showcase-text")} />
        </div>
        <div className={cx("landing__showcase-image")} />
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className={cx("landing__cta")}>
        <div className={cx("landing__cta-title")} />
        <div className={cx("landing__cta-text")} />
        <div className={cx("landing__cta-buttons")}>
          <div
            className={cx(
              "landing__cta-button",
              "landing__cta-button--primary"
            )}
          />
          <div
            className={cx(
              "landing__cta-button",
              "landing__cta-button--secondary"
            )}
          />
        </div>
      </section>
    </div>
  );
};

export default LandingWireframe2;
