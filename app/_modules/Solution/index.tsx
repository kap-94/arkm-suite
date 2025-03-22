"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import { gsap, ScrollTrigger } from "@/app/_lib/gsap-init"; // Importación centralizada
import SolutionCardExpandable from "@/app/_components/SolutionCard/SolutionCardExpandable";
import styles from "./Solution.module.scss";

// No necesitamos registrar ScrollTrigger aquí, ya se hace en gsap-init

export type SolutionLayout = "card-left" | "card-right";

export interface SolutionProps {
  word?: string;
  className?: string;
  solution: any;
  solutionNumber: number;
  layout?: SolutionLayout;
  cardWidth?: number;
  backgroundWidth?: number;
  backgroundHeight?: number;
  AnimationComponent: React.ComponentType;
  featureOffset?: number;
}

const cx = classNames.bind(styles);

export const Solution: React.FC<SolutionProps> = ({
  word,
  solution,
  solutionNumber,
  className,
  layout = "card-left",
  cardWidth = 500,
  backgroundWidth = 490,
  backgroundHeight = 500,
  AnimationComponent,
  featureOffset = 0,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const wireframeRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const floatingElements = useRef<(HTMLDivElement | null)[]>([]);
  const connectors = useRef<(HTMLDivElement | null)[]>([]);
  const ambientLight = useRef<HTMLDivElement>(null);
  const [isLightActive, setIsLightActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Inicializar las referencias de arrays
  useEffect(() => {
    floatingElements.current = [];
    connectors.current = [];
  }, []);

  // Aseguramos que los componentes de animación estén listos antes de intentar renderizarlos
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Pequeño retraso para asegurar que el DOM esté completamente cargado
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 20); // Reducido a 20ms para acelerar la inicialización

    return () => clearTimeout(timer);
  }, []);

  // Detectar si estamos en móvil para optimizaciones con ResizeObserver
  useEffect(() => {
    // ResizeObserver es más eficiente que window.resize
    if (typeof ResizeObserver === "undefined") {
      // Fallback para navegadores que no soportan ResizeObserver
      setIsMobile(window.innerWidth <= 768);
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      // Solo actualizar el estado si realmente cambia el tamaño relevante
      const width = entries[0]?.contentRect.width || window.innerWidth;
      const newIsMobile = width <= 768;
      if (isMobile !== newIsMobile) {
        setIsMobile(newIsMobile);
      }
    });

    // Observar el documento o container si está disponible
    if (document.documentElement) {
      resizeObserver.observe(document.documentElement);
    } else if (container.current) {
      resizeObserver.observe(container.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  // GSAP animations setup
  useLayoutEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | null = null;

    if (typeof window !== "undefined" && isReady) {
      // Configuración común para todos los dispositivos
      ctx = gsap.context(() => {
        // Aplicación de valores iniciales más eficiente con un solo set
        if (cardRef.current) {
          gsap.set(cardRef.current, {
            y: 40,
            rotationX: 5,
            transformOrigin: "center center",
            opacity: 0,
          });
        }

        if (wireframeRef.current) {
          gsap.set(wireframeRef.current, {
            autoAlpha: 0,
            y: 40,
            rotationX: 5,
            transformOrigin: "center center",
          });
        }

        // Filtrar elementos nulos antes de aplicar animaciones
        const initialValidFloatingElements =
          floatingElements.current.filter(Boolean);
        if (initialValidFloatingElements.length > 0) {
          gsap.set(initialValidFloatingElements, {
            autoAlpha: 0,
            scale: 0.9,
          });
        }

        const initialValidConnectors = connectors.current.filter(Boolean);
        if (initialValidConnectors.length > 0) {
          gsap.set(initialValidConnectors, {
            autoAlpha: 0,
            scaleX: 0,
          });
        }

        // Timeline única de entrada para mejor rendimiento
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            end: "top 50%",
            scrub: isMobile ? false : 0.3,
            toggleActions: "play none none none",
            once: isMobile, // Mejorar rendimiento en móvil ejecutando solo una vez
          },
          onComplete: () => setIsLightActive(true),
        });

        // Secuencia optimizada de aparición
        const entranceValidConnectors = connectors.current.filter(Boolean);
        const entranceValidFloatingElements =
          floatingElements.current.filter(Boolean);

        if (entranceValidConnectors.length > 0) {
          entranceTl.to(
            entranceValidConnectors,
            {
              autoAlpha: 0.7,
              scaleX: 1,
              duration: 0.5,
              stagger: 0.03,
              ease: "power2.inOut",
            },
            0
          );
        }

        if (entranceValidFloatingElements.length > 0) {
          entranceTl.to(
            entranceValidFloatingElements,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.03,
              ease: "power1.out",
            },
            0.2
          );
        }

        // Optimización: uso del mismo patrón para ambos layouts pero con condiciones
        const firstElement =
          layout === "card-left" ? cardRef.current : wireframeRef.current;
        const secondElement =
          layout === "card-left" ? wireframeRef.current : cardRef.current;

        if (firstElement) {
          entranceTl.to(
            firstElement,
            {
              opacity: 1,
              autoAlpha: 1, // Usar autoAlpha para combinar opacity y visibility
              y: 0,
              rotationX: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            0.3
          );
        }

        if (secondElement) {
          entranceTl.to(
            secondElement,
            {
              opacity: 1,
              autoAlpha: 1,
              y: 0,
              rotationX: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            0.5
          );
        }

        // Solo aplicamos parallax en desktop para mejor rendimiento en móvil
        if (!isMobile) {
          // Parallax optimizado con menos valores y cálculos
          const parallaxMultiplier = layout === "card-left" ? 1 : -1;

          // Timeline simplificada
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top 60%",
              end: "bottom 20%",
              scrub: 0.4,
              invalidateOnRefresh: false, // Mejora rendimiento
              fastScrollEnd: true, // Mejora rendimiento
            },
          });

          // Optimización: animaciones con menos propiedades y valores menores
          if (cardRef.current) {
            scrollTl.to(
              cardRef.current,
              {
                y: -40,
                x: 15 * parallaxMultiplier,
                rotationY: 3 * parallaxMultiplier,
                rotationX: -1,
                ease: "none",
              },
              0
            );
          }

          if (wireframeRef.current) {
            scrollTl.to(
              wireframeRef.current,
              {
                y: -40,
                x: -15 * parallaxMultiplier,
                rotationY: -4 * parallaxMultiplier,
                rotationX: 2,
                ease: "none",
              },
              0
            );
          }

          // Filtrar elementos nulos antes de aplicar animaciones
          const scrollValidFloatingElements =
            floatingElements.current.filter(Boolean);
          if (scrollValidFloatingElements.length > 0) {
            scrollTl.to(
              scrollValidFloatingElements,
              {
                y: (i) => -50 + i * 10,
                x: (i) => (i % 2 === 0 ? 25 : -25) * parallaxMultiplier,
                rotation: (i) => (i % 2 === 0 ? 5 : -5) * parallaxMultiplier,
                ease: "none",
                stagger: 0.05,
              },
              0
            );
          }

          const scrollValidConnectors = connectors.current.filter(Boolean);
          if (scrollValidConnectors.length > 0) {
            scrollTl.to(
              scrollValidConnectors,
              {
                y: -30,
                rotation: (i) => i * 3 * parallaxMultiplier,
                ease: "none",
                stagger: 0.05,
              },
              0
            );
          }

          // "Focus effect" optimizado: menos cálculos y valores más pequeños
          ScrollTrigger.create({
            trigger: container.current,
            start: "top 60%",
            end: "bottom 40%",
            onUpdate: (self) => {
              if (!cardRef.current || !wireframeRef.current) return;

              const proximityToCenter = Math.abs(self.progress - 0.5) * 2;
              const centerEffect = 1 - proximityToCenter;

              gsap.to([cardRef.current, wireframeRef.current], {
                scale: 1 + 0.03 * centerEffect,
                filter: `brightness(${1 + 0.07 * centerEffect})`,
                duration: 0.2,
                overwrite: "auto", // Mejora rendimiento
              });

              const focusValidFloatingElements =
                floatingElements.current.filter(Boolean);
              if (focusValidFloatingElements.length > 0) {
                gsap.to(focusValidFloatingElements, {
                  autoAlpha: 0.6 + 0.4 * centerEffect,
                  duration: 0.2,
                  overwrite: "auto",
                });
              }
            },
            toggleClass: {
              targets: ambientLight.current,
              className: cx("solution__ambient-light--active"),
            },
          });
        }

        // Solo refrescar cuando sea necesario
        ScrollTrigger.refresh();
      }, container);
    }

    return () => {
      if (ctx) {
        ctx.revert(); // Limpiar todas las animaciones
      }
    };
  }, [layout, isReady, isMobile]);

  // Funciones para manejar referencias optimizadas
  const setFloatingElementRef = (el: HTMLDivElement | null, index: number) => {
    floatingElements.current[index] = el;
  };

  const setConnectorRef = (el: HTMLDivElement | null, index: number) => {
    connectors.current[index] = el;
  };

  return (
    <div
      ref={container}
      className={cx("solution", className, `solution--${layout}`, {
        "solution--mobile": isMobile,
        "solution--ready": isReady,
      })}
      style={
        {
          "--card-width": `${cardWidth}px`,
          "--background-width": `${backgroundWidth}px`,
          "--background-height": `${backgroundHeight}px`,
        } as React.CSSProperties
      }
    >
      {/* Solo renderizamos elementos de efectos decorativos en desktop */}
      {!isMobile && (
        <>
          {/* Elementos flotantes para el efecto parallax */}
          {[1, 2, 3, 4].map((num, index) => (
            <div
              key={`float-${num}`}
              ref={(el) => setFloatingElementRef(el, index)}
              className={cx(
                "solution__floating-element",
                `solution__floating-element--${num}`
              )}
            ></div>
          ))}

          {/* Líneas conectoras */}
          <div
            ref={(el) => setConnectorRef(el, 0)}
            className={cx(
              "solution__connector",
              "solution__connector--horizontal"
            )}
          ></div>
          <div
            ref={(el) => setConnectorRef(el, 1)}
            className={cx(
              "solution__connector",
              "solution__connector--diagonal-1"
            )}
          ></div>
          <div
            ref={(el) => setConnectorRef(el, 2)}
            className={cx(
              "solution__connector",
              "solution__connector--diagonal-2"
            )}
          ></div>

          {/* Efecto de luz ambiental */}
          <div
            ref={ambientLight}
            className={cx("solution__ambient-light", {
              "solution__ambient-light--active": isLightActive,
            })}
          ></div>
        </>
      )}

      <div className={cx("solution__container")}>
        <div
          ref={contentWrapperRef}
          className={cx("solution__content-wrapper")}
        >
          <div ref={cardRef} className={cx("solution__card-wrapper")}>
            <SolutionCardExpandable
              {...solution}
              solutionNumber={solutionNumber}
              className={cx("solution__card")}
            />
          </div>

          <div ref={wireframeRef} className={cx("solution__wireframe-wrapper")}>
            <AnimationComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoización para prevenir re-renders innecesarios
export default React.memo(Solution);
