"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./LandingWireframe4.module.scss";

const cx = classNames.bind(styles);

export const LandingWireframe4 = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    // Asegurar que los elementos sean visibles inicialmente - añadimos un tiempo
    // para permitir que el navegador renderice correctamente
    setTimeout(() => {
      // Comprobamos que las referencias existen antes de continuar
      if (logoRef.current && contentRef.current && visualRef.current) {
        // Aseguramos que los elementos son visibles inicialmente
        logoRef.current.style.visibility = "visible";
        contentRef.current.style.visibility = "visible";
        visualRef.current.style.visibility = "visible";
        logoRef.current.style.opacity = "1";
        contentRef.current.style.opacity = "1";
        visualRef.current.style.opacity = "1";
      }
    }, 100);

    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.7,
        },
      });

      const createAnimation = () => {
        if (!logoRef.current || !contentRef.current || !visualRef.current)
          return;

        timeline.current.clear();

        // Logo Animation - modificado para asegurar que comience visible
        timeline.current
          .fromTo(
            logoRef.current,
            {
              scale: 0.8,
              opacity: 0.8, // Comienza parcialmente visible
            },
            {
              scale: 1,
              opacity: 1,
            }
          )
          // Content Animation - modificado para asegurar que comience visible
          .fromTo(
            contentRef.current,
            {
              x: "-30",
              opacity: 0.8, // Comienza parcialmente visible
            },
            {
              x: "0",
              opacity: 1,
            },
            "-=0.4"
          )
          // Visual Animation - modificado para asegurar que comience visible
          .fromTo(
            visualRef.current,
            {
              y: "30",
              opacity: 0.8, // Comienza parcialmente visible
            },
            {
              y: "0",
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
            "-=0.4"
          );
      };

      // Retrasamos la animación inicial para permitir que el navegador renderice correctamente
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
      {/* Logo */}
      <div
        ref={logoRef}
        className={cx("minimal__logo")}
        style={{ visibility: "visible", opacity: 1 }} // Aseguramos visibilidad inicial
      />

      {/* Main Container */}
      <div className={cx("minimal__container")}>
        {/* Content */}
        <div
          ref={contentRef}
          className={cx("minimal__content")}
          style={{ visibility: "visible", opacity: 1 }} // Aseguramos visibilidad inicial
        >
          <div className={cx("minimal__content-badge")} />
          <div className={cx("minimal__content-title")} />
          <div className={cx("minimal__content-subtitle")} />
          <div className={cx("minimal__content-text")} />
          <div className={cx("minimal__content-button")} />
        </div>

        {/* Visual */}
        <div
          ref={visualRef}
          className={cx("minimal__visual")}
          style={{ visibility: "visible", opacity: 1 }} // Aseguramos visibilidad inicial
        >
          <div className={cx("minimal__visual-accent")} />
          <div className={cx("minimal__visual-image")} />
        </div>
      </div>
    </div>
  );
};

export default LandingWireframe4;
