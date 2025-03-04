"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./LandingWireframe6.module.scss";

const cx = classNames.bind(styles);

export const LandingWireframe6 = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contentLeftRef = useRef(null);
  const contentRightRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    // Asegurar que los elementos sean visibles inicialmente
    setTimeout(() => {
      // Comprobamos que las referencias existen antes de continuar
      if (headerRef.current) {
        headerRef.current.style.visibility = "visible";
        headerRef.current.style.opacity = "1";
      }
      if (contentLeftRef.current) {
        contentLeftRef.current.style.visibility = "visible";
        contentLeftRef.current.style.opacity = "1";
      }
      if (contentRightRef.current) {
        contentRightRef.current.style.visibility = "visible";
        contentRightRef.current.style.opacity = "1";
      }
    }, 100);

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
          !contentLeftRef.current ||
          !contentRightRef.current
        )
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
          // Left Content Animation
          .fromTo(
            contentLeftRef.current,
            {
              x: "-30",
              opacity: 0.8,
            },
            {
              x: "0",
              opacity: 1,
              duration: 0.7,
            },
            "-=0.5"
          )
          // Right Content Animation
          .fromTo(
            contentRightRef.current,
            {
              x: "30",
              opacity: 0.8,
            },
            {
              x: "0",
              opacity: 1,
              duration: 0.7,
              onStart: () => {
                contentRightRef.current.classList.add(cx("animate-shine"));
              },
              onComplete: () => {
                setTimeout(() => {
                  contentRightRef.current.classList.remove(cx("animate-shine"));
                }, 1000);
              },
            },
            "-=0.5"
          );
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
      <div className={cx("minimal__content")}>
        {/* Left Content */}
        <div
          ref={contentLeftRef}
          className={cx("minimal__content-left")}
          style={{ visibility: "visible", opacity: 1 }}
        >
          <div className={cx("minimal__content-left-pretitle")} />
          <div className={cx("minimal__content-left-title")} />
          <div className={cx("minimal__content-left-subtitle")} />
          <div className={cx("minimal__content-left-text")} />
          <div className={cx("minimal__content-left-text")} />
          <div className={cx("minimal__content-left-buttons")}>
            <div
              className={cx(
                "minimal__content-left-button",
                "minimal__content-left-button--primary"
              )}
            />
            <div
              className={cx(
                "minimal__content-left-button",
                "minimal__content-left-button--secondary"
              )}
            />
          </div>
        </div>

        {/* Right Content */}
        <div
          ref={contentRightRef}
          className={cx("minimal__content-right")}
          style={{ visibility: "visible", opacity: 1 }}
        >
          <div className={cx("minimal__content-right-image")} />
        </div>
      </div>
    </div>
  );
};

export default LandingWireframe6;
