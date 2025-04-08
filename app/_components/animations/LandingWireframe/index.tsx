"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./LandingWireframe.module.scss";
import dynamic from "next/dynamic";

// Importar el componente Earth3D con dynamic import para evitar problemas de SSR
const Earth3D = dynamic(() => import("./Earth3D"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "#4f46e5",
          opacity: 0.5,
        }}
      ></div>
    </div>
  ),
});

const cx = classNames.bind(styles);

export const LandingWireframe = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const earthContainerRef = useRef<HTMLDivElement | null>(null);
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detectar cambios en el tamaño de la ventana para responsividad
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      setIsTablet(window.innerWidth > 480 && window.innerWidth <= 768);
    };

    // Verificar tamaño al montar
    handleResize();

    // Escuchar cambios de tamaño
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addToGridRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !gridItemsRef.current.includes(el)) {
      gridItemsRef.current[index] = el;
    }
  };

  // Configurar la animación pero no ejecutarla todavía
  const setupAnimation = () => {
    if (
      !headerRef.current ||
      !heroRef.current ||
      !featuresRef.current ||
      !timeline.current ||
      !earthContainerRef.current
    )
      return;

    timeline.current.clear();

    // Adaptar la animación según el tamaño de pantalla
    const animationConfig = {
      headerX: isMobile ? "-50%" : "-100%",
      heroY: isMobile ? "30" : "50",
      earthScale: isMobile ? 0.9 : 0.8,
      featuresY: isMobile ? "20" : "30",
      itemDelay: isMobile ? 0.03 : 0.05,
    };

    // Establecer animaciones pero pausarlas inicialmente
    // Animación del Header
    timeline.current
      .fromTo(
        headerRef.current,
        { x: animationConfig.headerX, opacity: 0 },
        { x: "0", opacity: 1 }
      )
      // Animación del Hero
      .fromTo(
        heroRef.current,
        { y: animationConfig.heroY, opacity: 0 },
        { y: "0", opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      // Animación del Earth Container - versión adaptada para responsividad
      .fromTo(
        earthContainerRef.current,
        {
          scale: animationConfig.earthScale,
          opacity: 0,
          transformOrigin: "center center",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          onComplete: () => {
            // No limpiamos la propiedad transform para evitar reajustes visuales
            if (earthContainerRef.current) {
              // Mantener la transformación final explícitamente en lugar de limpiarla
              gsap.set(earthContainerRef.current, {
                scale: 1,
                transformOrigin: "center center",
              });
            }
            // Marcar como no animando
            setIsAnimating(false);
          },
          onStart: () => {
            setIsAnimating(true);
          },
        },
        "-=0.3"
      )
      // Animación del Features Header
      .fromTo(
        featuresRef.current,
        { y: animationConfig.featuresY, opacity: 0 },
        { y: "0", opacity: 1, duration: 0.5 },
        "-=0.2"
      );

    // Animación de los Items de Features con efecto "shine"
    gridItemsRef.current.forEach((item, index) => {
      if (!item || !timeline.current) return;
      timeline.current.fromTo(
        item,
        { scale: 0.9, opacity: 0 },
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
        `-=${index ? animationConfig.itemDelay : animationConfig.itemDelay}`
      );
    });

    // Pausar la timeline hasta que sea visible
    timeline.current.pause();
  };

  // Iniciar animación
  const startAnimation = () => {
    if (timeline.current && !hasAnimated) {
      timeline.current.play();
      setHasAnimated(true);
    }
  };

  useEffect(() => {
    // Configuración inicial - ocultar los elementos
    if (headerRef.current) {
      headerRef.current.style.visibility = "hidden";
      headerRef.current.style.opacity = "0";
    }
    if (heroRef.current) {
      heroRef.current.style.visibility = "hidden";
      heroRef.current.style.opacity = "0";
    }
    if (earthContainerRef.current) {
      earthContainerRef.current.style.visibility = "hidden";
      earthContainerRef.current.style.opacity = "0";
    }
    if (featuresRef.current) {
      featuresRef.current.style.visibility = "hidden";
      featuresRef.current.style.opacity = "0";
    }
    gridItemsRef.current.forEach((item) => {
      if (item) {
        item.style.visibility = "hidden";
        item.style.opacity = "0";
      }
    });

    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: isMobile ? 0.7 : 0.8, // Animaciones ligeramente más rápidas en móvil
        },
      });

      // Preparar la animación
      setupAnimation();

      // Configurar el IntersectionObserver para detectar cuando el componente está visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Ajustar el umbral de intersección según el dispositivo
            const thresholdRatio = isMobile ? 0.25 : 0.35;

            // Si el componente es visible aproximadamente a la mitad del viewport o un poco antes
            if (
              entry.isIntersecting &&
              entry.intersectionRatio >= thresholdRatio
            ) {
              // Iniciar la animación
              startAnimation();

              // Hacer visibles los elementos
              if (headerRef.current) {
                headerRef.current.style.visibility = "visible";
              }
              if (heroRef.current) {
                heroRef.current.style.visibility = "visible";
              }
              if (earthContainerRef.current) {
                earthContainerRef.current.style.visibility = "visible";
              }
              if (featuresRef.current) {
                featuresRef.current.style.visibility = "visible";
              }
              gridItemsRef.current.forEach((item) => {
                if (item) {
                  item.style.visibility = "visible";
                }
              });

              // Desconectar el observer una vez que la animación ha sido iniciada
              observer.disconnect();
            }
          });
        },
        {
          // Configurar el umbral para que se active según el dispositivo
          threshold: [isMobile ? 0.25 : 0.35],
          // Configurar rootMargin para activar la animación un poco antes
          rootMargin: isMobile ? "0px 0px -50px 0px" : "0px 0px -100px 0px",
        }
      );

      // Observar el contenedor
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      // Función para reiniciar la animación manualmente (por ejemplo, con un evento)
      const handleRestart = () => {
        setHasAnimated(false);
        setupAnimation();
        startAnimation();
      };

      containerRef.current?.addEventListener(
        "restartAnimation",
        handleRestart as EventListener
      );

      return () => {
        observer.disconnect();
        containerRef.current?.removeEventListener(
          "restartAnimation",
          handleRestart as EventListener
        );
      };
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, isTablet]);

  // Recrear las animaciones si cambia el tamaño del dispositivo
  useEffect(() => {
    if (hasAnimated) {
      setupAnimation();
    }
  }, [isMobile, isTablet]);

  return (
    <div
      ref={containerRef}
      className={cx("landing", "wireframe", {
        "landing--mobile": isMobile,
        "landing--tablet": isTablet,
      })}
    >
      <header ref={headerRef} className={cx("landing__header")}>
        <div className={cx("landing__header-content")}>
          {/* Logo Minimalista */}
          <div className={cx("landing__header-logo")} />

          {/* Sólo dos elementos de navegación */}
          <div className={cx("landing__header-nav")}>
            <div
              className={cx(
                "landing__header-nav-item",
                "landing__header-nav-item--active"
              )}
            />
            <div className={cx("landing__header-nav-item")} />
          </div>
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

        {/* Reemplazando el SVG con el componente 3D Earth */}
        <div
          ref={earthContainerRef}
          className={cx("landing__hero-image")}
          data-animating={isAnimating ? "true" : "false"} // Atributo para gestionar estado
        >
          <div className={cx("landing__hero-image-overlay", "earth-container")}>
            <Earth3D />
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
          {[...Array(4)].map((_, index) => (
            <div
              key={`feature-${index}`}
              ref={(el) => addToGridRefs(el as HTMLDivElement | null, index)}
              className={cx("landing__features-item")}
            >
              {/* Sin contenido, solo fondo */}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingWireframe;
