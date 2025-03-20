"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SolutionCardExpandable from "@/app/_components/SolutionCard/SolutionCardExpandable";
import styles from "./Solution.module.scss";

gsap.registerPlugin(ScrollTrigger);

export type SolutionLayout = "card-left" | "card-right";

export interface SolutionProps {
  word?: string;
  className?: string;
  solution: any;
  solutionNumber: number; // Agregamos el número de solución como prop
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
  solutionNumber, // Añadimos esta prop
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
  const [isInViewport, setIsInViewport] = useState(false);
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
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Detectar si estamos en móvil para optimizaciones
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useLayoutEffect(() => {
    let ctx: gsap.Context | null = null;

    if (typeof window !== "undefined") {
      // Configuración común para todos los dispositivos
      ctx = gsap.context(() => {
        // Configuración inicial - con verificación para elementos null
        if (cardRef.current) {
          gsap.set(cardRef.current, {
            y: 60,
            rotationX: 10,
            transformOrigin: "center center",
            opacity: 0,
          });
        }

        if (wireframeRef.current) {
          gsap.set(wireframeRef.current, {
            autoAlpha: 0,
            y: 60,
            rotationX: 10,
            transformOrigin: "center center",
          });
        }

        // Filtrar elementos nulos antes de aplicar animaciones
        const initialValidFloatingElements =
          floatingElements.current.filter(Boolean);
        if (initialValidFloatingElements.length > 0) {
          gsap.set(initialValidFloatingElements, {
            autoAlpha: 0,
            scale: 0.8,
          });
        }

        const initialValidConnectors = connectors.current.filter(Boolean);
        if (initialValidConnectors.length > 0) {
          gsap.set(initialValidConnectors, {
            autoAlpha: 0,
            scaleX: 0,
          });
        }

        // Animación de entrada con un efecto revelador 3D que termina cuando el card llega a la mitad del viewport
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%", // Comienza cuando el contenedor entra en el viewport
            end: "top 50%", // Termina cuando el top del contenedor llega a la mitad del viewport
            scrub: isMobile ? false : 0.5, // En móvil no usamos scrub para mejor rendimiento
            toggleActions: "play none none none",
          },
          onComplete: () => setIsLightActive(true),
        });

        // Secuencia de aparición ajustada para completarse al 50% del viewport
        // Aplicar animaciones solo a elementos válidos (no nulos)
        const entranceValidConnectors = connectors.current.filter(Boolean);
        const entranceValidFloatingElements =
          floatingElements.current.filter(Boolean);

        if (entranceValidConnectors.length > 0) {
          entranceTl.to(
            entranceValidConnectors,
            {
              autoAlpha: 0.7,
              scaleX: 1,
              duration: 0.8,
              stagger: 0.05,
              ease: "power3.inOut",
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
              duration: 0.8,
              stagger: 0.05,
              ease: "power2.out",
            },
            0.2
          );
        }

        if (layout === "card-left" && cardRef.current) {
          entranceTl.to(
            cardRef.current,
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              ease: "power3.out",
            },
            0.3
          );
        } else if (layout !== "card-left" && wireframeRef.current) {
          entranceTl.to(
            wireframeRef.current,
            {
              autoAlpha: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              ease: "power3.out",
            },
            0.3
          );
        }

        if (layout === "card-left" && wireframeRef.current) {
          entranceTl.to(
            wireframeRef.current,
            {
              autoAlpha: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              ease: "power3.out",
            },
            0.5
          );
        } else if (layout !== "card-left" && cardRef.current) {
          entranceTl.to(
            cardRef.current,
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              ease: "power3.out",
            },
            0.5
          );
        }

        // Solo aplicamos parallax y efectos avanzados en desktop para mejor rendimiento en móvil
        if (!isMobile) {
          // Efecto parallax para el scroll continuo hacia arriba después de la animación inicial
          const parallaxMultiplier = layout === "card-left" ? 1 : -1;

          // Timeline para el scroll continuo después de que el componente ya está visible
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top 50%", // Comienza cuando el componente está a la mitad del viewport
              end: "bottom top",
              scrub: 0.8,
            },
          });

          // Verificar que cada elemento exista antes de aplicar animaciones
          if (cardRef.current) {
            scrollTl.to(
              cardRef.current,
              {
                y: -70,
                x: 25 * parallaxMultiplier,
                rotationY: 5 * parallaxMultiplier,
                rotationX: -2,
                ease: "none",
              },
              0
            );
          }

          if (wireframeRef.current) {
            scrollTl.to(
              wireframeRef.current,
              {
                y: -70,
                x: -25 * parallaxMultiplier,
                rotationY: -7 * parallaxMultiplier,
                rotationX: 3,
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
                y: (i) => -80 + i * 15,
                x: (i) => (i % 2 === 0 ? 40 : -40) * parallaxMultiplier,
                rotation: (i) => (i % 2 === 0 ? 10 : -10) * parallaxMultiplier,
                ease: "none",
                stagger: 0.1,
              },
              0
            );
          }

          const scrollValidConnectors = connectors.current.filter(Boolean);
          if (scrollValidConnectors.length > 0) {
            scrollTl.to(
              scrollValidConnectors,
              {
                y: -50,
                rotation: (i) => i * 5 * parallaxMultiplier,
                ease: "none",
                stagger: 0.1,
              },
              0
            );
          }

          // Crear un observador para detectar cuando el componente está completamente visible
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                // Actualizamos el estado solo cuando cambia la visibilidad completa
                if (entry.isIntersecting && entry.intersectionRatio > 0.9) {
                  setIsInViewport(true);
                } else {
                  setIsInViewport(false);
                }
              });
            },
            {
              threshold: 0.9, // Necesitamos al menos el 90% visible para activar el efecto del mouse
              rootMargin: "0px",
            }
          );

          if (container.current) {
            observer.observe(container.current);
          }

          // "Focus effect" cuando el elemento está en el centro de la pantalla
          ScrollTrigger.create({
            trigger: container.current,
            start: "top 60%",
            end: "bottom 40%",
            onUpdate: (self) => {
              // Calcula la proximidad al centro (0 = centro exacto, 1 = extremos)
              const proximityToCenter = Math.abs(self.progress - 0.5) * 2;
              const centerEffect = 1 - proximityToCenter;

              // Efecto sutil de "enfoque" cuando está en el centro
              if (cardRef.current && wireframeRef.current) {
                gsap.to([cardRef.current, wireframeRef.current], {
                  scale: 1 + 0.05 * centerEffect,
                  filter: `brightness(${1 + 0.1 * centerEffect})`,
                  duration: 0.3,
                });
              }

              // Ajusta la opacidad de los elementos flotantes (si existen)
              const focusValidFloatingElements =
                floatingElements.current.filter(Boolean);
              if (focusValidFloatingElements.length > 0) {
                gsap.to(focusValidFloatingElements, {
                  autoAlpha: 0.5 + 0.5 * centerEffect,
                  duration: 0.3,
                });
              }
            },
            toggleClass: {
              targets: ambientLight.current,
              className: cx("solution__ambient-light--active"),
            },
          });

          // Nueva animación para el componente de animación con el mouse
          // Solo se activa cuando el componente está completamente visible
          const mouseParallax = (e: MouseEvent) => {
            if (!container.current || !isInViewport || !wireframeRef.current)
              return;

            // Calcula la posición relativa del mouse
            const rect = container.current.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

            // Distancia desde el centro (0-1)
            const distanceFromCenter = Math.sqrt(
              mouseX * mouseX + mouseY * mouseY
            );

            // Ángulo desde el centro
            const angle = Math.atan2(mouseY, mouseX);

            // Efecto parallax avanzado para el componente de animación
            gsap.to(wireframeRef.current, {
              rotationY:
                -5 * parallaxMultiplier - mouseX * 15 * parallaxMultiplier,
              rotationX: mouseY * 10,
              rotationZ: mouseX * 3 * parallaxMultiplier,
              scale: 1 + distanceFromCenter * 0.08,
              transformOrigin: `${50 + mouseX * 20}% ${50 + mouseY * 20}%`,
              filter: `brightness(${1 + distanceFromCenter * 0.15})`,
              duration: 0.8,
              ease: "power2.out",
            });

            // Efecto para los elementos flotantes (verificando que existan)
            const mouseValidFloatingElements =
              floatingElements.current.filter(Boolean);
            if (mouseValidFloatingElements.length > 0) {
              gsap.to(mouseValidFloatingElements, {
                x: (i) => {
                  const baseX = (i % 2 === 0 ? 40 : -40) * parallaxMultiplier;
                  return (
                    baseX -
                    mouseX * 80 * (i % 2 === 0 ? 1 : -1) * parallaxMultiplier
                  );
                },
                y: (i) => {
                  const baseY = -120 + i * 15;
                  return baseY + Math.sin(angle) * 20 * ((i % 3) + 1);
                },
                rotationZ: (i) => mouseY * 12 * (i % 2 === 0 ? 1 : -1),
                rotationX: (i) => mouseY * 18 * (i % 2 === 0 ? 1 : -1),
                rotationY: (i) => mouseX * 18 * (i % 2 === 0 ? 1 : -1),
                scale: (i) =>
                  1 + distanceFromCenter * 0.15 * ((i % 3) + 1) * 0.1,
                filter: (i) =>
                  `brightness(${1 + distanceFromCenter * 0.2 * ((i % 2) + 1)})`,
                duration: 1,
                ease: "power2.out",
                stagger: 0.05,
              });
            }
          };

          // Añadir/eliminar event listener
          document.addEventListener("mousemove", mouseParallax);

          return () => {
            document.removeEventListener("mousemove", mouseParallax);
            observer.disconnect();
          };
        }

        ScrollTrigger.refresh();
      }, container);
    }

    return () => {
      ctx?.revert();
    };
  }, [layout, isInViewport, isMobile]);

  // Función para manejar las referencias de los elementos flotantes
  const setFloatingElementRef = (el: HTMLDivElement | null, index: number) => {
    // Asegurarse de que el array está inicializado
    if (!floatingElements.current) {
      floatingElements.current = [];
    }
    floatingElements.current[index] = el;
  };

  // Función para manejar las referencias de los conectores
  const setConnectorRef = (el: HTMLDivElement | null, index: number) => {
    // Asegurarse de que el array está inicializado
    if (!connectors.current) {
      connectors.current = [];
    }
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
              solutionNumber={solutionNumber} // Pasamos el número de solución al componente
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

export default Solution;
