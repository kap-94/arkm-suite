"use client";

import React, { useRef, useEffect, useState, Suspense, lazy } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "@/app/_lib/gsap-init";
import { useGSAP } from "@gsap/react";
import SolutionCardExpandable from "@/app/_components/SolutionCard/SolutionCardExpandable";
import styles from "./Solution.module.scss";

// Registrar el plugin useGSAP
gsap.registerPlugin(useGSAP);

const cx = classNames.bind(styles);

const LazyLandingWireframe = lazy(
  () => import("@/app/_components/animations/LandingWireframe")
);
const LazyCodeEditorAnimation = lazy(
  () => import("@/app/_components/animations/CodeEditorAnimation")
);

const AnimationWrapper = ({
  animationComponentName,
}: {
  animationComponentName: string;
}) => {
  const AnimationComponent =
    animationComponentName === "CodeEditorAnimation"
      ? LazyCodeEditorAnimation
      : LazyLandingWireframe;

  return (
    <Suspense fallback={<div className={cx("animation-placeholder")} />}>
      <AnimationComponent />
    </Suspense>
  );
};

const Solution = ({
  solution,
  solutionNumber,
  layout = "card-left",
  animationComponentName,
}: {
  solution: any;
  solutionNumber: number;
  layout?: "card-left" | "card-right";
  animationComponentName: string;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const wireframeRef = useRef<HTMLDivElement>(null);
  const animationId = useRef(`solution-${solutionNumber}-${Date.now()}`);
  const floatingElements = useRef<(HTMLDivElement | null)[]>([]);
  const connectors = useRef<(HTMLDivElement | null)[]>([]);
  const ambientLight = useRef<HTMLDivElement | null>(null);
  const isInitialized = useRef<boolean>(false);

  // Estado para detectar si estamos en móvil o en modo adaptativo
  const [isMobile, setIsMobile] = useState(false);
  const [isAdaptive, setIsAdaptive] = useState(false);
  const MOBILE_BREAKPOINT = 768;
  const ADAPTIVE_BREAKPOINT = 830;

  // Detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const checkViewportSize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth <= MOBILE_BREAKPOINT);

      // Solo aplicar modo adaptativo si estamos entre MOBILE_BREAKPOINT y ADAPTIVE_BREAKPOINT
      setIsAdaptive(
        windowWidth <= ADAPTIVE_BREAKPOINT && windowWidth > MOBILE_BREAKPOINT
      );
    };

    // Verificar al montar
    checkViewportSize();

    // Escuchar cambios de tamaño
    window.addEventListener("resize", checkViewportSize);

    return () => {
      window.removeEventListener("resize", checkViewportSize);
    };
  }, []);

  // Configuración inicial con useGSAP
  useGSAP(
    () => {
      if (!container.current || isInitialized.current) return;

      // Configuración inicial con mejores propiedades para rendimiento
      gsap.set(container.current, {
        visibility: "visible",
        autoAlpha: 0,
        willChange: "transform, opacity",
        force3D: true,
      });

      gsap.set([cardRef.current, wireframeRef.current], {
        opacity: 0,
        y: 40,
        rotationX: 5,
        willChange: "transform, opacity",
        force3D: true,
      });

      floatingElements.current.forEach((el) => {
        if (el)
          gsap.set(el, {
            opacity: 0,
            scale: 0.9,
            willChange: "transform, opacity",
            force3D: true,
          });
      });

      connectors.current.forEach((el) => {
        if (el)
          gsap.set(el, {
            opacity: 0,
            scaleX: 0,
            willChange: "transform",
          });
      });

      if (ambientLight.current) {
        gsap.set(ambientLight.current, {
          opacity: 0,
          willChange: "opacity",
        });
      }

      isInitialized.current = true;
    },
    { scope: container }
  );

  // Animación principal con useGSAP
  const { contextSafe } = useGSAP(
    () => {
      if (!container.current || !isInitialized.current) return;

      // Animación de entrada optimizada
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
          overwrite: "auto",
        },
        onComplete: () => {
          if (ambientLight.current) {
            gsap.to(ambientLight.current, {
              opacity: 1,
              duration: 0.5,
              clearProps: "willChange",
            });
          }

          // Limpiar willChange después de completar la animación
          gsap.set([cardRef.current, wireframeRef.current], {
            clearProps: "willChange",
          });
        },
      });

      // Elementos flotantes (No mostrarlos en modo adaptativo)
      if (!isAdaptive) {
        floatingElements.current.forEach((el, i) => {
          if (el) {
            tl.to(
              el,
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                delay: i * 0.05,
              },
              0
            );
          }
        });

        // Conectores
        connectors.current.forEach((el, i) => {
          if (el) {
            tl.to(
              el,
              {
                opacity: 0.7,
                scaleX: 1,
                duration: 0.5,
                delay: i * 0.03,
              },
              0
            );
          }
        });
      }

      // Tarjeta y wireframe
      const firstElement =
        layout === "card-left" ? cardRef.current : wireframeRef.current;
      const secondElement =
        layout === "card-left" ? wireframeRef.current : cardRef.current;

      // Ajustar timing para el flujo adaptativo pero mantener normal para móvil
      const secondDelay = isAdaptive ? 0.8 : 0.4;

      if (firstElement) {
        tl.to(
          firstElement,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            force3D: true,
          },
          0.2
        );
      }

      if (secondElement) {
        tl.to(
          secondElement,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            force3D: true,
          },
          secondDelay
        );
      }

      // ScrollTrigger optimizado con precarga
      ScrollTrigger.create({
        id: animationId.current,
        trigger: container.current,
        start: "top bottom-=100", // Comienza antes de entrar completamente en el viewport
        onEnter: () => {
          gsap.to(container.current, {
            autoAlpha: 1,
            duration: 0.2,
            onComplete: function () {
              tl.play();
            },
          });
        },
        once: true,
      });

      // Efectos de parallax solo en desktop y NO en modo adaptativo
      if (!isMobile && !isAdaptive) {
        const parallaxMultiplier = layout === "card-left" ? 1 : -1;

        // Parallax con mejor rendimiento
        ScrollTrigger.create({
          trigger: container.current,
          start: "top 80%", // Comienza antes para precargar
          end: "bottom 20%",
          scrub: 0.3, // Reducido para mejor rendimiento
          onUpdate: (self) => {
            if (cardRef.current) {
              gsap.to(cardRef.current, {
                y: -40 * self.progress,
                x: 15 * parallaxMultiplier * self.progress,
                rotationY: 3 * parallaxMultiplier * self.progress,
                force3D: true,
                overwrite: "auto",
              });
            }
            if (wireframeRef.current) {
              gsap.to(wireframeRef.current, {
                y: -40 * self.progress,
                x: -15 * parallaxMultiplier * self.progress,
                rotationY: -4 * parallaxMultiplier * self.progress,
                force3D: true,
                overwrite: "auto",
              });
            }
          },
        });

        // Efecto de enfoque con debounce
        let brightnessTimeout: any;

        ScrollTrigger.create({
          trigger: container.current,
          start: "top 60%",
          end: "bottom 40%",
          onUpdate: (self) => {
            clearTimeout(brightnessTimeout);

            brightnessTimeout = setTimeout(() => {
              const progress = Math.abs(self.progress - 0.5) * 2;
              const scale = 1 + 0.03 * (1 - progress);
              const brightness = 1 + 0.07 * (1 - progress);

              gsap.to([cardRef.current, wireframeRef.current], {
                scale,
                filter: `brightness(${brightness})`,
                duration: 0.2,
                overwrite: "auto",
              });
            }, 50);
          },
        });
      }

      // Limpieza de willChange al finalizar
      floatingElements.current.forEach((el) => {
        if (el) gsap.set(el, { clearProps: "willChange" });
      });

      connectors.current.forEach((el) => {
        if (el) gsap.set(el, { clearProps: "willChange" });
      });
    },
    {
      scope: container,
      dependencies: [layout, isMobile, isAdaptive],
    }
  );

  // Funciones helper para referencias
  const setFloatingElementRef = (el: HTMLDivElement | null, index: number) => {
    floatingElements.current[index] = el;
  };

  const setConnectorRef = (el: HTMLDivElement | null, index: number) => {
    connectors.current[index] = el;
  };

  return (
    <div
      ref={container}
      className={cx("solution", `solution--${layout}`, {
        "solution--mobile": isMobile,
        "solution--adaptive": isAdaptive,
      })}
      style={{
        visibility: "visible",
        opacity: 0,
        transform: "translateZ(0)", // Force hardware acceleration
      }}
    >
      {/* Elementos decorativos - solo visibles en modo normal, no en adaptativo ni en móvil */}
      {!isMobile && !isAdaptive && (
        <>
          {[1, 2, 3, 4].map((num, index) => (
            <div
              key={`float-${num}`}
              ref={(el) => setFloatingElementRef(el, index)}
              className={cx(
                "solution__floating-element",
                `solution__floating-element--${num}`
              )}
            />
          ))}

          <div
            ref={(el) => setConnectorRef(el, 0)}
            className={cx(
              "solution__connector",
              "solution__connector--horizontal"
            )}
          />
          <div
            ref={(el) => setConnectorRef(el, 1)}
            className={cx(
              "solution__connector",
              "solution__connector--diagonal-1"
            )}
          />
          <div
            ref={(el) => setConnectorRef(el, 2)}
            className={cx(
              "solution__connector",
              "solution__connector--diagonal-2"
            )}
          />

          <div ref={ambientLight} className={cx("solution__ambient-light")} />
        </>
      )}

      <div className={cx("solution__container")}>
        <div className={cx("solution__content-wrapper")}>
          <div ref={cardRef} className={cx("solution__card-wrapper")}>
            <SolutionCardExpandable
              {...solution}
              solutionNumber={solutionNumber}
              className={cx("solution__card")}
            />
          </div>

          <div ref={wireframeRef} className={cx("solution__wireframe-wrapper")}>
            <AnimationWrapper animationComponentName={animationComponentName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Solution);
