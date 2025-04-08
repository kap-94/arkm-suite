"use client";

import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  memo,
  useState,
} from "react";
import classNames from "classnames/bind";
import { gsap, ScrollTrigger } from "@/app/_lib/gsap-init";
import styles from "./DynamicLayout.module.scss";

const cx = classNames.bind(styles);

export type LayoutType = "left-right" | "right-left";

interface DynamicLayoutProps {
  leftComponent: React.ReactNode;
  rightComponent: React.ReactNode;
  layout?: LayoutType;
  itemNumber: number;
  containerClassName?: string;
  disableParallax?: boolean;
}

// Define types for parallax values
interface ParallaxValues {
  y: number;
  x: number;
  rotationY: number;
}

// Optimizamos el rendimiento de GSAP para scroll
// Nota: añadir esto solo si no está configurado globalmente en tu aplicación
if (typeof window !== "undefined") {
  // Limitar la tasa de frames puede mejorar rendimiento en scroll
  gsap.ticker.fps(50);
}

const DynamicLayout: React.FC<DynamicLayoutProps> = ({
  leftComponent,
  rightComponent,
  layout = "left-right",
  itemNumber,
  containerClassName,
  disableParallax = false,
}) => {
  // Refs para elementos
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<string>(
    `dynamic-layout-${itemNumber}-${Date.now()}`
  );
  const floatingElements = useRef<Array<HTMLDivElement | null>>([]);
  const connectors = useRef<Array<HTMLDivElement | null>>([]);
  const ambientLight = useRef<HTMLDivElement | null>(null);

  // Ref para almacenar animaciones para limpiar
  const animations = useRef<Array<gsap.core.Animation | ScrollTrigger>>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [isAdaptive, setIsAdaptive] = useState(false);
  const MOBILE_BREAKPOINT = 768;
  const ADAPTIVE_BREAKPOINT = 830;

  // Implementamos la funcionalidad de useScrollVisibility directamente
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let timeout: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (timeout) clearTimeout(timeout);

        if (entry.isIntersecting) {
          timeout = setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "none";
            element.style.visibility = "visible";
          }, 50);
        }
      },
      { threshold: 0.1, rootMargin: "100px 0px" }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  // Debounced resize handler para mejorar rendimiento
  useEffect(() => {
    const checkViewportSize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth <= MOBILE_BREAKPOINT);
      setIsAdaptive(
        windowWidth <= ADAPTIVE_BREAKPOINT && windowWidth > MOBILE_BREAKPOINT
      );
    };

    // Llamada inicial
    checkViewportSize();

    // Versión con debounce para mejor rendimiento
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkViewportSize, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Configuración inicial de elementos
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Configuración inicial optimizada
    gsap.set(containerRef.current, {
      visibility: "visible",
      autoAlpha: 1,
      force3D: true, // Forzar aceleración GPU
      immediateRender: true,
    });

    gsap.set([leftRef.current, rightRef.current], {
      opacity: 1,
      y: 0,
      rotationX: 0,
      force3D: true, // Forzar aceleración GPU
      immediateRender: true,
    });

    floatingElements.current.forEach((el) => {
      if (el)
        gsap.set(el, {
          opacity: 0,
          scale: 0.95,
          force3D: true,
          immediateRender: true,
        });
    });

    connectors.current.forEach((el) => {
      if (el)
        gsap.set(el, {
          opacity: 0,
          scaleX: 0.5,
          force3D: true,
          immediateRender: true,
        });
    });

    if (ambientLight.current) {
      gsap.set(ambientLight.current, {
        opacity: 0.3,
        force3D: true,
        immediateRender: true,
      });
    }
  }, []);

  // Configuración de animaciones
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Limpiar animaciones anteriores
    animations.current.forEach((anim) => {
      if (anim && "kill" in anim) anim.kill();
    });
    animations.current = [];

    const ctx = gsap.context(() => {
      // Timeline principal optimizado
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power2.out",
          force3D: true, // Fuerza aceleración GPU
          overwrite: "auto", // Evitar conflictos entre animaciones
        },
        onComplete: () => {
          if (ambientLight.current) {
            const ambientAnim = gsap.to(ambientLight.current, {
              opacity: 1,
              duration: 0.3,
              force3D: true,
            });
            animations.current.push(ambientAnim);
          }
        },
      });
      animations.current.push(tl);

      // Animaciones de elementos flotantes
      if (!isAdaptive) {
        floatingElements.current.forEach((el, i) => {
          if (el) {
            tl.to(
              el,
              {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                delay: i * 0.03,
                force3D: true,
              },
              0
            );
          }
        });

        connectors.current.forEach((el, i) => {
          if (el) {
            tl.to(
              el,
              {
                opacity: 0.7,
                scaleX: 1,
                duration: 0.3,
                delay: i * 0.02,
                force3D: true,
              },
              0
            );
          }
        });
      }

      const secondDelay = isAdaptive ? 0.4 : 0.2;

      // Animaciones de los componentes principales
      if (leftRef.current) {
        tl.to(
          leftRef.current,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.4,
            force3D: true,
          },
          0.1
        );
      }

      if (rightRef.current) {
        tl.to(
          rightRef.current,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.4,
            force3D: true,
          },
          secondDelay
        );
      }

      // ScrollTrigger para la animación inicial
      const mainTrigger = ScrollTrigger.create({
        id: animationId.current,
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.progress(1),
        onLeaveBack: () => tl.progress(0),
        // Añadimos markers para depuración si es necesario
        // markers: process.env.NODE_ENV === 'development',
      });
      animations.current.push(mainTrigger);

      // Animación de parallax optimizada
      if (!isMobile && !isAdaptive && !disableParallax) {
        const parallaxMultiplier = layout === "left-right" ? 1 : -1;

        // PRE-CALCULAMOS las posiciones para cada % de progreso
        // Fix: Explicitly type the arrays
        const leftParallaxValues: ParallaxValues[] = [];
        const rightParallaxValues: ParallaxValues[] = [];

        // Precalcular valores para 100 pasos (optimización)
        for (let i = 0; i <= 100; i++) {
          const progress = i / 100;
          leftParallaxValues[i] = {
            y: -20 * progress,
            x: 10 * parallaxMultiplier * progress,
            rotationY: 2 * parallaxMultiplier * progress,
          };

          rightParallaxValues[i] = {
            y: -20 * progress,
            x: -10 * parallaxMultiplier * progress,
            rotationY: -2 * parallaxMultiplier * progress,
          };
        }

        // Configuración ScrollTrigger optimizada
        const parallaxTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1.2, // Aumentamos a 1.2 para animaciones más suaves
          invalidateOnRefresh: true, // Recalcular en cambios de tamaño
          fastScrollEnd: true, // Optimización para scroll rápido
          // Usamos batch para optimizar las actualizaciones
          onUpdate: (self: ScrollTrigger) => {
            const progressIndex = Math.round(self.progress * 100);
            const safeIndex = Math.max(0, Math.min(100, progressIndex));

            if (leftRef.current) {
              gsap.set(leftRef.current, {
                ...leftParallaxValues[safeIndex],
                force3D: true,
              });
            }

            if (rightRef.current) {
              gsap.set(rightRef.current, {
                ...rightParallaxValues[safeIndex],
                force3D: true,
              });
            }
          },
        });
        animations.current.push(parallaxTrigger);
      }
    }, containerRef);

    return () => {
      // Limpieza mejorada
      ctx.revert();
      ScrollTrigger.getById(animationId.current)?.kill();

      animations.current.forEach((anim) => {
        if (anim && "kill" in anim) anim.kill();
      });
      animations.current = [];
    };
  }, [layout, isMobile, isAdaptive, disableParallax]);

  // Funciones para manejar refs
  const setFloatingElementRef = (el: HTMLDivElement | null, index: number) => {
    floatingElements.current[index] = el;
  };

  const setConnectorRef = (el: HTMLDivElement | null, index: number) => {
    connectors.current[index] = el;
  };

  return (
    <div
      ref={containerRef}
      className={cx(
        "dynamic-layout",
        `dynamic-layout--${layout}`,
        {
          "dynamic-layout--mobile": isMobile,
          "dynamic-layout--adaptive": isAdaptive,
        },
        containerClassName
      )}
      style={{
        opacity: 0,
        transform: "translateY(20px) translateZ(0)", // Añadimos translateZ para forzar GPU
        visibility: "visible",
        transition: "opacity 0.35s ease-out, transform 0.35s ease-out", // Ligeramente más lento para mayor suavidad
        willChange: "transform, opacity",
      }}
    >
      {!isMobile && !isAdaptive && (
        <>
          {[1, 2, 3, 4].map((num, index) => (
            <div
              key={`float-${num}`}
              ref={(el) => setFloatingElementRef(el, index)}
              className={cx(
                "dynamic-layout__floating-element",
                `dynamic-layout__floating-element--${num}`
              )}
              style={{
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)", // Forzar GPU
              }}
            />
          ))}

          <div
            ref={(el) => setConnectorRef(el, 0)}
            className={cx(
              "dynamic-layout__connector",
              "dynamic-layout__connector--horizontal"
            )}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)", // Forzar GPU
            }}
          />
          <div
            ref={(el) => setConnectorRef(el, 1)}
            className={cx(
              "dynamic-layout__connector",
              "dynamic-layout__connector--diagonal-1"
            )}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)", // Forzar GPU
            }}
          />
          <div
            ref={(el) => setConnectorRef(el, 2)}
            className={cx(
              "dynamic-layout__connector",
              "dynamic-layout__connector--diagonal-2"
            )}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)", // Forzar GPU
            }}
          />

          <div
            ref={ambientLight}
            className={cx("dynamic-layout__ambient-light")}
            style={{
              willChange: "opacity",
              transform: "translate3d(0, 0, 0)", // Forzar GPU
            }}
          />
        </>
      )}

      <div className={cx("dynamic-layout__container")}>
        <div className={cx("dynamic-layout__content-wrapper")}>
          <div
            ref={leftRef}
            className={cx(
              "dynamic-layout__left-wrapper",
              "dynamic-layout__card-container"
            )}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)", // Forzar GPU
              contain: "content", // Limitar el repintado
            }}
          >
            {leftComponent}
          </div>

          <div
            ref={rightRef}
            className={cx(
              "dynamic-layout__right-wrapper",
              "dynamic-layout__images-container"
            )}
            style={{
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)", // Forzar GPU
              contain: "content", // Limitar el repintado
            }}
          >
            {rightComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export const layoutOptions = {
  LEFT_RIGHT: "left-right" as const,
  RIGHT_LEFT: "right-left" as const,
};

export default memo(DynamicLayout);
