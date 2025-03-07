"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./LandingWireframe.module.scss";

const cx = classNames.bind(styles);

export const LandingWireframe = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const addToGridRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !gridItemsRef.current.includes(el)) {
      gridItemsRef.current[index] = el;
    }
  };

  useEffect(() => {
    // Aseguramos que los elementos sean visibles inicialmente
    setTimeout(() => {
      if (headerRef.current) {
        headerRef.current.style.visibility = "visible";
        headerRef.current.style.opacity = "1";
      }
      if (heroRef.current) {
        heroRef.current.style.visibility = "visible";
        heroRef.current.style.opacity = "1";
      }
      if (featuresRef.current) {
        featuresRef.current.style.visibility = "visible";
        featuresRef.current.style.opacity = "1";
      }
      gridItemsRef.current.forEach((item) => {
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
          duration: 0.8,
        },
      });

      const createAnimation = () => {
        if (
          !headerRef.current ||
          !heroRef.current ||
          !featuresRef.current ||
          !timeline.current
        )
          return;

        timeline.current.clear();

        // Animación del Header
        timeline.current
          .fromTo(
            headerRef.current,
            { x: "-100%", opacity: 0.8 },
            { x: "0", opacity: 1 }
          )
          // Animación del Hero
          .fromTo(
            heroRef.current,
            { y: "50", opacity: 0.8 },
            { y: "0", opacity: 1, duration: 0.6 },
            "-=0.4"
          )
          // Animación del Features Header
          .fromTo(
            featuresRef.current,
            { y: "30", opacity: 0.8 },
            { y: "0", opacity: 1, duration: 0.5 },
            "-=0.3"
          );

        // Animación de los Items de Features con efecto "shine"
        gridItemsRef.current.forEach((item, index) => {
          if (!item || !timeline.current) return;
          timeline.current.fromTo(
            item,
            { scale: 0.9, opacity: 0.8 },
            {
              scale: 1,
              opacity: 1,
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

      // Retraso en la animación inicial
      setTimeout(createAnimation, 300);

      const handleRestart = () => {
        createAnimation();
      };

      // Define a custom event type
      type CustomEvent = Event & {
        detail?: any;
      };

      containerRef.current?.addEventListener(
        "restartAnimation",
        handleRestart as EventListener
      );

      return () => {
        containerRef.current?.removeEventListener(
          "restartAnimation",
          handleRestart as EventListener
        );
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cx("landing")}>
      {/* Header */}
      <header
        ref={headerRef}
        className={cx("landing__header")}
        style={{ visibility: "visible", opacity: 1 }}
      >
        <div className={cx("landing__header-content")}>
          <div className={cx("landing__header-logo")} />
          <div className={cx("landing__header-text")}>
            <div
              className={cx(
                "landing__header-text-line",
                "landing__header-text-line--short"
              )}
            />
            <div
              className={cx(
                "landing__header-text-line",
                "landing__header-text-line--medium"
              )}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={cx("landing__hero")}
        style={{ visibility: "visible", opacity: 1 }}
      >
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

        {/* Contenedor de la imagen del Hero con SVG inline */}
        <div className={cx("landing__hero-image")}>
          <div className={cx("landing__hero-image-overlay")}>
            <svg
              className={cx("landing__hero-image-svg")}
              width="100%"
              height="100%"
              viewBox="0 0 600 400"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="heroGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M0,200 C150,100 450,300 600,200 L600,400 L0,400 Z"
                fill="url(#heroGradient)"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={cx("landing__features")}>
        <div
          ref={featuresRef}
          className={cx("landing__features-header")}
          style={{ visibility: "visible", opacity: 1 }}
        >
          <div className={cx("landing__features-title")} />
          <div className={cx("landing__features-subtitle")} />
        </div>
        <div className={cx("landing__features-grid")}>
          {[...Array(3)].map((_, index) => (
            <div
              key={`feature-${index}`}
              ref={(el) => addToGridRefs(el as HTMLDivElement | null, index)}
              className={cx("landing__features-item")}
              style={{ visibility: "visible", opacity: 1 }}
            >
              <div className={cx("landing__features-item-content")}>
                <div className={cx("landing__features-item-icon")} />
                <div className={cx("landing__features-item-title")} />
                <div className={cx("landing__features-item-text")} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingWireframe;
