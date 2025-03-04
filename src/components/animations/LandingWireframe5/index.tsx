"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./LandingWireframe5.module.scss";

const cx = classNames.bind(styles);

export const LandingWireframe5 = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const mainContentRef = useRef(null);
  const visualRef = useRef(null);
  const featureItemsRef = useRef([]);
  const timeline = useRef(null);

  const addToFeatureRefs = (el, index) => {
    if (el && !featureItemsRef.current.includes(el)) {
      featureItemsRef.current[index] = el;
    }
  };

  useEffect(() => {
    // Asegurar que los elementos sean visibles inicialmente
    setTimeout(() => {
      // Comprobamos que las referencias existen antes de continuar
      if (headerRef.current) {
        headerRef.current.style.visibility = "visible";
        headerRef.current.style.opacity = "1";
      }
      if (mainContentRef.current) {
        mainContentRef.current.style.visibility = "visible";
        mainContentRef.current.style.opacity = "1";
      }
      if (visualRef.current) {
        visualRef.current.style.visibility = "visible";
        visualRef.current.style.opacity = "1";
      }

      featureItemsRef.current.forEach((item) => {
        if (item) {
          item.style.visibility = "visible";
          item.style.opacity = "1";
        }
      });
    }, 100);

    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.7,
        },
      });

      const createAnimation = () => {
        if (!headerRef.current || !mainContentRef.current || !visualRef.current)
          return;

        timeline.current.clear();

        // Header Animation - modificado para comenzar con opacidad parcial
        timeline.current
          .fromTo(
            headerRef.current,
            {
              y: "-100%",
              opacity: 0.8,
            },
            {
              y: "0",
              opacity: 1,
            }
          )
          // Main Content Animation
          .fromTo(
            mainContentRef.current,
            {
              y: "30",
              opacity: 0.8,
            },
            {
              y: "0",
              opacity: 1,
            },
            "-=0.4"
          )
          // Visual Animation
          .fromTo(
            visualRef.current,
            {
              scale: 0.9,
              opacity: 0.8,
            },
            {
              scale: 1,
              opacity: 1,
              onStart: () => {
                visualRef.current.classList.add(cx("animate-shine"));
              },
              onComplete: () => {
                setTimeout(() => {
                  visualRef.current.classList.remove(cx("animate-shine"));
                }, 1000);
              },
            },
            "-=0.3"
          );

        // Feature Items Animation
        featureItemsRef.current.forEach((item, index) => {
          if (!item || !timeline.current) return;

          timeline.current.fromTo(
            item,
            {
              x: index % 2 === 0 ? "-20" : "20",
              opacity: 0.8,
            },
            {
              x: "0",
              opacity: 1,
              duration: 0.5,
              delay: index * 0.1,
            },
            "-=0.3"
          );
        });
      };

      // Retrasamos la animación inicial
      setTimeout(createAnimation, 300);

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
    <div ref={containerRef} className={cx("minimal")}>
      {/* Header */}
      <header
        ref={headerRef}
        className={cx("minimal__header")}
        style={{ visibility: "visible", opacity: 1 }}
      >
        <div className={cx("minimal__header-logo")} />
        <div className={cx("minimal__header-nav")}>
          <div className={cx("minimal__header-nav-item")} />
          <div className={cx("minimal__header-nav-item")} />
          <div className={cx("minimal__header-nav-item")} />
        </div>
      </header>

      {/* Main Content */}
      <div className={cx("minimal__main")}>
        <div
          ref={mainContentRef}
          className={cx("minimal__main-content")}
          style={{ visibility: "visible", opacity: 1 }}
        >
          <div className={cx("minimal__main-pretitle")} />
          <div className={cx("minimal__main-title")} />
          <div className={cx("minimal__main-subtitle")} />
          <div className={cx("minimal__main-cta")} />
        </div>

        <div
          ref={visualRef}
          className={cx("minimal__main-visual")}
          style={{ visibility: "visible", opacity: 1 }}
        />

        <div className={cx("minimal__features")}>
          {[...Array(2)].map((_, index) => (
            <div
              key={`feature-${index}`}
              ref={(el) => addToFeatureRefs(el, index)}
              className={cx("minimal__features-item")}
              style={{ visibility: "visible", opacity: 1 }}
            >
              <div className={cx("minimal__features-item-icon")} />
              <div className={cx("minimal__features-item-content")}>
                <div className={cx("minimal__features-item-title")} />
                <div className={cx("minimal__features-item-text")} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingWireframe5;
