"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./LandingWireframe3.module.scss";

const cx = classNames.bind(styles);

export const LandingWireframe3 = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const featureItemsRef = useRef([]);
  const ctaRef = useRef(null);
  const timeline = useRef(null);

  const addToFeatureRefs = (el, index) => {
    if (el && !featureItemsRef.current.includes(el)) {
      featureItemsRef.current[index] = el;
    }
  };

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
          !featuresRef.current ||
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
              scale: 0.95,
              opacity: 0,
              visibility: "hidden",
            },
            {
              scale: 1,
              opacity: 1,
              visibility: "visible",
            },
            "-=0.3"
          )
          // Features Header Animation
          .fromTo(
            featuresRef.current,
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

        // Feature Items Animation
        featureItemsRef.current.forEach((item, index) => {
          if (!item || !timeline.current) return;

          timeline.current.fromTo(
            item,
            {
              y: "20",
              opacity: 0,
              visibility: "hidden",
            },
            {
              y: "0",
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
            "-=0.35"
          );
        });

        // CTA Animation
        timeline.current.fromTo(
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

  // Floating elements animation
  useEffect(() => {
    const decorElements = document.querySelectorAll(
      `.${cx("decorative-element")}`
    );

    decorElements.forEach((elem) => {
      const randomX = Math.random() * 10 - 5;
      const randomY = Math.random() * 10 - 5;
      const randomDuration = 2 + Math.random() * 2;

      gsap.to(elem, {
        x: randomX,
        y: randomY,
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <div ref={containerRef} className={cx("landing")}>
      {/* Decorative Elements */}
      <div className={cx("decorative-element", "decorative-element--1")} />
      <div className={cx("decorative-element", "decorative-element--2")} />
      <div className={cx("decorative-element", "decorative-element--3")} />

      {/* Header */}
      <header ref={headerRef} className={cx("landing__header")}>
        <div className={cx("landing__header-logo")} />
        <div className={cx("landing__header-nav")}>
          <div className={cx("landing__header-nav-item")} />
          <div className={cx("landing__header-nav-item")} />
          <div className={cx("landing__header-nav-item")} />
        </div>
        <div className={cx("landing__header-cta")} />
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className={cx("landing__hero")}>
        <div className={cx("landing__hero-badge")} />
        <div className={cx("landing__hero-title")} />
        <div className={cx("landing__hero-subtitle")} />
        <div className={cx("landing__hero-visual")} />
      </section>

      {/* Features Section */}
      <section className={cx("landing__features")}>
        <div ref={featuresRef} className={cx("landing__features-header")}>
          <div className={cx("landing__features-title")} />
          <div className={cx("landing__features-subtitle")} />
        </div>

        <div className={cx("landing__features-grid")}>
          {[...Array(4)].map((_, index) => (
            <div
              key={`feature-${index}`}
              ref={(el) => addToFeatureRefs(el, index)}
              className={cx("landing__features-item")}
            >
              <div className={cx("landing__features-item-icon")} />
              <div className={cx("landing__features-item-title")} />
              <div className={cx("landing__features-item-text")} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className={cx("landing__cta")}>
        <div className={cx("landing__cta-badge")} />
        <div className={cx("landing__cta-title")} />
        <div className={cx("landing__cta-text")} />
        <div className={cx("landing__cta-button")} />
      </section>
    </div>
  );
};

export default LandingWireframe3;
