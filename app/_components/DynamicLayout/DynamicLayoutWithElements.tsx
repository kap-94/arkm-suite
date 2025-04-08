"use client";

import React, {
  useRef,
  useEffect,
  useState,
  Suspense,
  ReactNode,
  memo,
} from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "@/app/_lib/gsap-init";
import { useGSAP } from "@gsap/react";
import styles from "./DynamicLayoutWithElements.module.scss";

// Registrar el plugin de useGSAP para evitar discrepancias entre versiones de React
gsap.registerPlugin(useGSAP);

const cx = classNames.bind(styles);

export type LayoutType = "left-right" | "right-left";

export interface DynamicLayoutProps {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
  layout?: LayoutType;
  itemNumber: number;
  containerClassName?: string;
  disableParallax?: boolean;
}

export const DynamicLayout: React.FC<DynamicLayoutProps> = ({
  leftComponent,
  rightComponent,
  layout = "left-right",
  itemNumber,
  containerClassName,
  disableParallax = false,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<string>(
    `dynamic-layout-${itemNumber}-${Date.now()}`
  );
  const floatingElements = useRef<Array<HTMLDivElement | null>>([]);
  const connectors = useRef<Array<HTMLDivElement | null>>([]);
  const ambientLight = useRef<HTMLDivElement | null>(null);
  const isInitialized = useRef<boolean>(false);
  const scrollTriggerInstances = useRef<ScrollTrigger[]>([]);

  // State to detect if we're on mobile or in adaptive mode
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isAdaptive, setIsAdaptive] = useState<boolean>(false);
  const MOBILE_BREAKPOINT = 768;
  const ADAPTIVE_BREAKPOINT = 830;

  // Detect changes in window size
  useEffect(() => {
    const checkViewportSize = (): void => {
      const windowWidth = window.innerWidth;
      const newIsMobile = windowWidth <= MOBILE_BREAKPOINT;

      // Si cambiamos a móvil, desactivar todas las animaciones existentes
      if (!isMobile && newIsMobile && isInitialized.current) {
        // Matar cualquier animación en curso
        gsap.killTweensOf([
          container.current,
          leftRef.current,
          rightRef.current,
        ]);
        floatingElements.current.forEach((el) => {
          if (el) gsap.killTweensOf(el);
        });
        connectors.current.forEach((el) => {
          if (el) gsap.killTweensOf(el);
        });
        if (ambientLight.current) gsap.killTweensOf(ambientLight.current);

        // Restablecer los elementos a su estado visible final
        if (container.current) {
          container.current.style.visibility = "visible";
          container.current.style.opacity = "1";
        }

        if (leftRef.current) {
          leftRef.current.style.opacity = "1";
          leftRef.current.style.transform = "none";
          leftRef.current.style.filter = "none";
        }

        if (rightRef.current) {
          rightRef.current.style.opacity = "1";
          rightRef.current.style.transform = "none";
          rightRef.current.style.filter = "none";
        }

        // Matar todos los ScrollTriggers
        scrollTriggerInstances.current.forEach((instance) => {
          if (instance && instance.kill) {
            instance.kill();
          }
        });
        scrollTriggerInstances.current = [];

        // También matar el ScrollTrigger específico por ID
        const specificTrigger = ScrollTrigger.getById(animationId.current);
        if (specificTrigger) {
          specificTrigger.kill();
        }
      }

      setIsMobile(newIsMobile);
      setIsAdaptive(
        windowWidth <= ADAPTIVE_BREAKPOINT && windowWidth > MOBILE_BREAKPOINT
      );
    };

    checkViewportSize();
    window.addEventListener("resize", checkViewportSize);

    return () => {
      window.removeEventListener("resize", checkViewportSize);

      // Matar todas las animaciones y ScrollTriggers al desmontar
      if (isInitialized.current) {
        gsap.killTweensOf([
          container.current,
          leftRef.current,
          rightRef.current,
        ]);
        floatingElements.current.forEach((el) => {
          if (el) gsap.killTweensOf(el);
        });
        connectors.current.forEach((el) => {
          if (el) gsap.killTweensOf(el);
        });
        if (ambientLight.current) gsap.killTweensOf(ambientLight.current);

        scrollTriggerInstances.current.forEach((instance) => {
          if (instance && instance.kill) {
            instance.kill();
          }
        });

        const specificTrigger = ScrollTrigger.getById(animationId.current);
        if (specificTrigger) {
          specificTrigger.kill();
        }
      }
    };
  }, [isMobile]);

  // Usando useGSAP para la configuración inicial de la animación
  useGSAP(
    () => {
      if (!container.current || isInitialized.current) return;

      // Si estamos en móvil, usar directamente el DOM sin GSAP
      if (isMobile) {
        container.current.style.visibility = "visible";
        container.current.style.opacity = "1";

        if (leftRef.current) {
          leftRef.current.style.opacity = "1";
          leftRef.current.style.transform = "none";
        }

        if (rightRef.current) {
          rightRef.current.style.opacity = "1";
          rightRef.current.style.transform = "none";
        }

        isInitialized.current = true;
        return;
      }

      // Solo aplicar animaciones si no estamos en móvil
      // Ocultar inicialmente pero mantener en el DOM
      gsap.set(container.current, {
        visibility: "visible",
        autoAlpha: 1,
        willChange: "transform, opacity",
      });

      // Set initial state for components
      gsap.set([leftRef.current, rightRef.current], {
        opacity: 0,
        y: 20,
        rotationX: 2,
        willChange: "transform, opacity",
        force3D: true,
      });

      floatingElements.current.forEach((el) => {
        if (el)
          gsap.set(el, {
            opacity: 0,
            scale: 0.95,
            willChange: "transform, opacity",
            force3D: true,
          });
      });

      connectors.current.forEach((el) => {
        if (el)
          gsap.set(el, {
            opacity: 0,
            scaleX: 0.5,
            willChange: "transform, opacity",
          });
      });

      if (ambientLight.current) {
        gsap.set(ambientLight.current, {
          opacity: 0.3,
          willChange: "opacity",
        });
      }

      isInitialized.current = true;
    },
    { scope: container, dependencies: [isMobile] }
  );

  // Usando useGSAP para la animación principal
  const { contextSafe } = useGSAP(
    () => {
      // No realizar ninguna animación si estamos en móvil
      if (!container.current || !isInitialized.current || isMobile) return;

      // Limpiamos cualquier ScrollTrigger existente antes de crear nuevos
      scrollTriggerInstances.current.forEach((instance) => {
        if (instance && instance.kill) {
          instance.kill();
        }
      });
      scrollTriggerInstances.current = [];

      const specificTrigger = ScrollTrigger.getById(animationId.current);
      if (specificTrigger) {
        specificTrigger.kill();
      }

      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power2.out",
          overwrite: "auto",
        },
        onComplete: () => {
          if (ambientLight.current) {
            gsap.to(ambientLight.current, {
              opacity: 1,
              duration: 0.3,
              clearProps: "willChange",
            });
          }

          // Limpiar willChange después de la animación
          gsap.set([leftRef.current, rightRef.current], {
            clearProps: "willChange",
          });
        },
      });

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
              },
              0
            );
          }
        });
      }

      // Always show leftComponent on the left and rightComponent on the right
      const firstElement = leftRef.current;
      const secondElement = rightRef.current;

      const secondDelay = isAdaptive ? 0.4 : 0.2;

      if (firstElement) {
        tl.to(
          firstElement,
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

      if (secondElement) {
        tl.to(
          secondElement,
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

      // Creamos un ScrollTrigger con margen para precargar
      const mainTrigger = ScrollTrigger.create({
        id: animationId.current,
        trigger: container.current,
        start: "top bottom-=100", // Comienza antes de entrar en viewport
        onEnter: () => {
          tl.play();
        },
        once: true,
      });

      scrollTriggerInstances.current.push(mainTrigger);

      if (!isMobile && !isAdaptive && !disableParallax) {
        const parallaxMultiplier = layout === "left-right" ? 1 : -1;

        const parallaxTrigger = ScrollTrigger.create({
          trigger: container.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.3, // Reducido para suavizar el efecto
          onUpdate: (self: ScrollTrigger) => {
            if (leftRef.current) {
              gsap.to(leftRef.current, {
                y: -20 * self.progress,
                x: 10 * parallaxMultiplier * self.progress,
                rotationY: 2 * parallaxMultiplier * self.progress,
                force3D: true,
                overwrite: "auto",
              });
            }
            if (rightRef.current) {
              gsap.to(rightRef.current, {
                y: -20 * self.progress,
                x: -10 * parallaxMultiplier * self.progress,
                rotationY: -2 * parallaxMultiplier * self.progress,
                force3D: true,
                overwrite: "auto",
              });
            }
          },
        });

        scrollTriggerInstances.current.push(parallaxTrigger);

        // Aplicamos un debounce para el efecto de brillo
        let brightnessTimeout: any;

        const brightnessTrigger = ScrollTrigger.create({
          trigger: container.current,
          start: "top 60%",
          end: "bottom 40%",
          onUpdate: (self: ScrollTrigger) => {
            clearTimeout(brightnessTimeout);

            brightnessTimeout = setTimeout(() => {
              const progress = Math.abs(self.progress - 0.5) * 2;
              const scale = 1 + 0.02 * (1 - progress);
              const brightness = 1 + 0.05 * (1 - progress);

              gsap.to([leftRef.current, rightRef.current], {
                scale,
                filter: `brightness(${brightness})`,
                duration: 0.2,
                overwrite: "auto",
              });
            }, 50); // Pequeño delay para evitar demasiadas actualizaciones
          },
        });

        scrollTriggerInstances.current.push(brightnessTrigger);
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
      dependencies: [layout, isMobile, isAdaptive, disableParallax],
    }
  );

  const setFloatingElementRef = (
    el: HTMLDivElement | null,
    index: number
  ): void => {
    floatingElements.current[index] = el;
  };

  const setConnectorRef = (el: HTMLDivElement | null, index: number): void => {
    connectors.current[index] = el;
  };

  return (
    <div
      ref={container}
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
        visibility: "visible",
        opacity: isMobile ? 1 : "auto",
        transform: isMobile ? "none" : "translateZ(0)", // Force hardware acceleration solo en desktop
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
            />
          ))}

          <div
            ref={(el) => setConnectorRef(el, 0)}
            className={cx(
              "dynamic-layout__connector",
              "dynamic-layout__connector--horizontal"
            )}
          />
          <div
            ref={(el) => setConnectorRef(el, 1)}
            className={cx(
              "dynamic-layout__connector",
              "dynamic-layout__connector--diagonal-1"
            )}
          />
          <div
            ref={(el) => setConnectorRef(el, 2)}
            className={cx(
              "dynamic-layout__connector",
              "dynamic-layout__connector--diagonal-2"
            )}
          />

          <div
            ref={ambientLight}
            className={cx("dynamic-layout__ambient-light")}
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
            style={isMobile ? { opacity: 1, transform: "none" } : undefined}
          >
            {leftComponent}
          </div>

          <div
            ref={rightRef}
            className={cx(
              "dynamic-layout__right-wrapper",
              "dynamic-layout__images-container"
            )}
            style={isMobile ? { opacity: 1, transform: "none" } : undefined}
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
