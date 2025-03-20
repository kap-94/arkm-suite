"use client";

import { useEffect, useRef, useState } from "react";
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
  const [hasAnimated, setHasAnimated] = useState(false);

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
      !timeline.current
    )
      return;

    timeline.current.clear();

    // Establecer animaciones pero pausarlas inicialmente
    // Animación del Header
    timeline.current
      .fromTo(
        headerRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0", opacity: 1 }
      )
      // Animación del Hero
      .fromTo(
        heroRef.current,
        { y: "50", opacity: 0 },
        { y: "0", opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      // Animación del Features Header
      .fromTo(
        featuresRef.current,
        { y: "30", opacity: 0 },
        { y: "0", opacity: 1, duration: 0.5 },
        "-=0.3"
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
        `-=${index ? 0.2 : 0.2}`
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
          duration: 0.8,
        },
      });

      // Preparar la animación
      setupAnimation();

      // Configurar el IntersectionObserver para detectar cuando el componente está visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Si el componente es visible aproximadamente a la mitad del viewport o un poco antes
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
              // Iniciar la animación
              startAnimation();

              // Hacer visibles los elementos
              if (headerRef.current) {
                headerRef.current.style.visibility = "visible";
              }
              if (heroRef.current) {
                heroRef.current.style.visibility = "visible";
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
          // Configurar el umbral para que se active cuando al menos el 35% del componente esté visible
          threshold: [0.35],
          // Configurar rootMargin para activar la animación un poco antes (100px antes de llegar al centro)
          rootMargin: "0px 0px -100px 0px",
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
  }, []);

  return (
    <div ref={containerRef} className={cx("landing", "wireframe")}>
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
                  id="neoGradient1A"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#18181f" />
                </linearGradient>
                <filter id="neoShadow1A">
                  <feDropShadow
                    dx="5"
                    dy="5"
                    stdDeviation="3"
                    floodColor="#000"
                    floodOpacity="0.3"
                  />
                  <feDropShadow
                    dx="-5"
                    dy="-5"
                    stdDeviation="3"
                    floodColor="#6366f1"
                    floodOpacity="0.1"
                  />
                </filter>
                <filter id="glow1A">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grupo principal con animación de rotación */}
              <g className={cx("rotating-group")}>
                {/* Formas neomórficas - Dos triángulos (más grandes) */}
                <polygon
                  points="150,80 420,120 300,320"
                  // fill="url(#neoGradient1A)"
                  fill="url(#neoGradient1A)"
                  filter="url(#neoShadow1A)"
                />

                <polygon
                  points="180,100 400,140 280,300"
                  fill="#1f1f2c"
                  filter="url(#neoShadow1A)"
                  opacity="0.7"
                />

                {/* Vértices brillantes del triángulo principal (círculos perfectos) */}
                <circle
                  cx="150"
                  cy="80"
                  r="8"
                  fill="#6366f1"
                  filter="url(#glow1A)"
                />
                <circle
                  cx="420"
                  cy="120"
                  r="8"
                  fill="#818cf8"
                  filter="url(#glow1A)"
                />
                <circle
                  cx="300"
                  cy="320"
                  r="8"
                  fill="#4f46e5"
                  filter="url(#glow1A)"
                />

                {/* Vértices brillantes del triángulo secundario (círculos perfectos) */}
                <circle
                  cx="180"
                  cy="100"
                  r="5"
                  fill="#6366f1"
                  filter="url(#glow1A)"
                  opacity="0.7"
                />
                <circle
                  cx="400"
                  cy="140"
                  r="5"
                  fill="#818cf8"
                  filter="url(#glow1A)"
                  opacity="0.7"
                />
                <circle
                  cx="280"
                  cy="300"
                  r="5"
                  fill="#4f46e5"
                  filter="url(#glow1A)"
                  opacity="0.7"
                />

                {/* Líneas conectoras sutiles */}
                <line
                  x1="150"
                  y1="80"
                  x2="420"
                  y2="120"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />
                <line
                  x1="420"
                  y1="120"
                  x2="300"
                  y2="320"
                  stroke="#818cf8"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />
                <line
                  x1="300"
                  y1="320"
                  x2="150"
                  y2="80"
                  stroke="#4f46e5"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />

                {/* Líneas conectoras entre los dos triángulos */}
                <line
                  x1="150"
                  y1="80"
                  x2="180"
                  y2="100"
                  stroke="#6366f1"
                  strokeWidth="1.5"
                  strokeOpacity="0.2"
                  strokeDasharray="3,2"
                />
                <line
                  x1="420"
                  y1="120"
                  x2="400"
                  y2="140"
                  stroke="#818cf8"
                  strokeWidth="1.5"
                  strokeOpacity="0.2"
                  strokeDasharray="3,2"
                />
                <line
                  x1="300"
                  y1="320"
                  x2="280"
                  y2="300"
                  stroke="#4f46e5"
                  strokeWidth="1.5"
                  strokeOpacity="0.2"
                  strokeDasharray="3,2"
                />
              </g>
            </svg>
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
