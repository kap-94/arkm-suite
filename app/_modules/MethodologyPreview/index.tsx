"use client";

import { useEffect, useRef, useCallback, memo, useState } from "react";
import classNames from "classnames/bind";
import { gsap, ScrollTrigger } from "@/app/_lib/gsap-init";
import { Typography } from "@/app/_components/Typography";
import {
  ResearchIcon,
  VisualDirectionIcon,
  UIDesignIcon,
  DevelopmentIcon,
  LaunchIcon,
  MaintenanceIcon,
} from "./MethodologyIcons";
import styles from "./MethodologyPreview.module.scss";

const cx = classNames.bind(styles);

interface MethodologyStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface MethodologyDictionary {
  title: string;
  steps: {
    research: {
      title: string;
      description: string;
    };
    visualDirection: {
      title: string;
      description: string;
    };
    uiDesign: {
      title: string;
      description: string;
    };
    development: {
      title: string;
      description: string;
    };
    launch: {
      title: string;
      description: string;
    };
    maintenance: {
      title: string;
      description: string;
    };
  };
}

interface MethodologyPreviewProps {
  dictionary?: MethodologyDictionary;
}

// Datos por defecto
const DEFAULT_STEPS: MethodologyStep[] = [
  {
    title: "Research",
    description:
      "We analyze your brand essence and market position via targeted dialogues to create a strong foundation, identifying opportunities that set your brand apart.",
    icon: <ResearchIcon />,
  },
  {
    title: "Visual Direction",
    description:
      "Our team crafts an exceptional visual identity by exploring colors, graphics, and UI patterns that resonate with your audience and express your brand values.",
    icon: <VisualDirectionIcon />,
  },
  {
    title: "UI Design",
    description:
      "We create a robust design system and refine each page until the interface is visually harmonious and usable, ensuring every element functions effectively.",
    icon: <UIDesignIcon />,
  },
  {
    title: "Development",
    description:
      "Using the React ecosystem, we deliver an exceptionally pixel-perfect website that works flawlessly on all devices, with code fully optimized for speed and SEO.",
    icon: <DevelopmentIcon />,
  },
  {
    title: "Launch",
    description:
      "ARKM guides you through deployment with support on hosting, CI/CD pipelines, and content migration, implementing testing to ensure peak performance.",
    icon: <LaunchIcon />,
  },
  {
    title: "Maintenance",
    description:
      "Our partnership continues with technical support, updates, and improvements to keep your site cutting-edge, providing analytics to evolve your digital presence.",
    icon: <MaintenanceIcon />,
  },
];

// Función auxiliar para detectar si estamos en un dispositivo de alto rendimiento
const isHighPerformanceDevice = (): boolean => {
  // Comprobación básica de dispositivo móvil
  const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

  // Comprobación de memoria
  const hasHighMemory =
    typeof navigator !== "undefined" &&
    "deviceMemory" in navigator &&
    // @ts-ignore - ignorar error de TypeScript para navegadores que soportan esta API
    (navigator as any).deviceMemory > 4;

  return !isMobileDevice && (hasHighMemory || true);
};

const MethodologyPreviewComponent = ({
  dictionary,
}: MethodologyPreviewProps) => {
  // Refs para elementos esenciales
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Flag para prevenir animaciones duplicadas
  const animationExecutedRef = useRef(false);
  // Flag para controlar si las posiciones finales ya se han fijado
  const positionsFixedRef = useRef(false);

  // Preparar datos de pasos con valores predeterminados
  const methodologySteps = useCallback(() => {
    if (!dictionary?.steps) return DEFAULT_STEPS;

    return [
      {
        title: dictionary.steps.research.title || DEFAULT_STEPS[0].title,
        description:
          dictionary.steps.research.description || DEFAULT_STEPS[0].description,
        icon: <ResearchIcon />,
      },
      {
        title: dictionary.steps.visualDirection.title || DEFAULT_STEPS[1].title,
        description:
          dictionary.steps.visualDirection.description ||
          DEFAULT_STEPS[1].description,
        icon: <VisualDirectionIcon />,
      },
      {
        title: dictionary.steps.uiDesign.title || DEFAULT_STEPS[2].title,
        description:
          dictionary.steps.uiDesign.description || DEFAULT_STEPS[2].description,
        icon: <UIDesignIcon />,
      },
      {
        title: dictionary.steps.development.title || DEFAULT_STEPS[3].title,
        description:
          dictionary.steps.development.description ||
          DEFAULT_STEPS[3].description,
        icon: <DevelopmentIcon />,
      },
      {
        title: dictionary.steps.launch.title || DEFAULT_STEPS[4].title,
        description:
          dictionary.steps.launch.description || DEFAULT_STEPS[4].description,
        icon: <LaunchIcon />,
      },
      {
        title: dictionary.steps.maintenance.title || DEFAULT_STEPS[5].title,
        description:
          dictionary.steps.maintenance.description ||
          DEFAULT_STEPS[5].description,
        icon: <MaintenanceIcon />,
      },
    ];
  }, [dictionary]);

  // Memoizar los pasos para evitar recálculos
  const steps = methodologySteps();

  // Callback de referencia optimizado
  const setStepRef = useCallback((el: HTMLDivElement | null, index: number) => {
    stepsRefs.current[index] = el;
  }, []);

  // Detectar preferencias de reducción de movimiento
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Función para establecer estados iniciales usando GSAP
  const setInitialStates = useCallback(() => {
    if (prefersReducedMotion.current) return;

    // 1. Grid y header
    if (gridRef.current) {
      gsap.set(gridRef.current, {
        opacity: 0,
        scale: 1.05,
        force3D: true,
        visibility: "visible",
      });
    }

    if (headerRef.current) {
      gsap.set(headerRef.current, {
        opacity: 0,
        y: 25,
        force3D: true,
        visibility: "visible",
      });
    }

    // 2. Pasos y sus contenidos
    stepsRefs.current.forEach((step) => {
      if (!step) return;

      // El paso en sí
      gsap.set(step, {
        opacity: 0,
        y: 30,
        force3D: true,
        visibility: "visible",
      });

      // Contenidos del paso
      const iconContainer = step.querySelector(
        `.${cx("methodology__step-icon-container")}`
      );
      const iconSvg = step.querySelector(
        `.${cx("methodology__step-icon")} svg`
      );
      const title = step.querySelector(`.${cx("methodology__step-title")}`);
      const description = step.querySelector(
        `.${cx("methodology__step-description")}`
      );

      if (iconContainer) {
        gsap.set(iconContainer, {
          opacity: 0,
          scale: 0.6,
          force3D: true,
          visibility: "visible",
        });
      }

      if (iconSvg) {
        gsap.set(iconSvg, {
          opacity: 0,
          scale: 0.8,
          rotation: -5,
          force3D: true,
          visibility: "visible",
        });
      }

      if (title) {
        gsap.set(title, {
          opacity: 0,
          y: 10,
          force3D: true,
          visibility: "visible",
        });
      }

      if (description) {
        gsap.set(description, {
          opacity: 0,
          y: 10,
          force3D: true,
          visibility: "visible",
        });
      }
    });
  }, [cx]);

  // Fijar la posición final de los elementos SOLO UNA VEZ al terminar la animación
  const fixFinalPositions = useCallback(() => {
    if (!sectionRef.current || positionsFixedRef.current) return;

    // Marcar que ya hemos fijado las posiciones finales
    positionsFixedRef.current = true;

    // Aplicar clase animation-completed a la sección principal
    if (sectionRef.current) {
      sectionRef.current.classList.add(cx("completed-section"));
    }

    // No hay necesidad de manipular cada elemento individualmente
    // La clase CSS .completed-section se encargará de todo
  }, [cx]);

  // Función optimizada para crear animación
  const createAnimation = useCallback(() => {
    if (!sectionRef.current || animationExecutedRef.current) return;

    // Prevenir múltiples configuraciones
    animationExecutedRef.current = true;

    // Verificar preferencia de reducción de movimiento
    if (prefersReducedMotion.current) {
      // Simplemente hacemos que todo sea visible sin animación
      fixFinalPositions();
      return;
    }

    // Establecer estados iniciales antes de la animación
    setInitialStates();

    // Crear contexto GSAP
    const ctx = gsap.context(() => {
      // Preparar elementos
      const stepElements = stepsRefs.current.filter(Boolean);

      // Agrupar selectores por tipo para animación
      const elements = {
        grid: gridRef.current,
        header: headerRef.current,
        steps: stepElements,
        iconContainers: stepElements
          .map((step) =>
            step?.querySelector(`.${cx("methodology__step-icon-container")}`)
          )
          .filter(Boolean),
        iconSvgs: stepElements
          .map((step) =>
            step?.querySelector(`.${cx("methodology__step-icon")} svg`)
          )
          .filter(Boolean),
        titles: stepElements
          .map((step) =>
            step?.querySelector(`.${cx("methodology__step-title")}`)
          )
          .filter(Boolean),
        descriptions: stepElements
          .map((step) =>
            step?.querySelector(`.${cx("methodology__step-description")}`)
          )
          .filter(Boolean),
      };

      // Timeline principal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: {
          duration: 0.65,
          ease: "power2.out",
        },
        onComplete: () => {
          // Al finalizar la animación, fijamos las posiciones finales una sola vez
          fixFinalPositions();

          // Eliminar ScrollTrigger para liberar recursos
          const triggers = ScrollTrigger.getAll().filter(
            (trigger) => trigger.vars.trigger === sectionRef.current
          );
          triggers.forEach((trigger) => trigger.kill());
        },
      });

      // Timeline con tiempos ajustados
      tl
        // Grid primero (fondo)
        .fromTo(
          elements.grid,
          { opacity: 0, scale: 1.05 },
          { opacity: 0.35, scale: 1, duration: 0.8 },
          0
        )
        // Header sincronizado con el grid
        .fromTo(
          elements.header,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.1
        )
        // Animar steps
        .fromTo(
          elements.steps,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: {
              each: 0.08,
              from: "start",
            },
            duration: 0.7,
          },
          0.3
        )
        // Iconos
        .fromTo(
          elements.iconContainers,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: "back.out(1.2)", // Reducido para prevenir rebote
          },
          0.4
        )
        .fromTo(
          elements.iconSvgs,
          { opacity: 0, scale: 0.8, rotation: -5 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          0.5
        )
        // Títulos y descripciones
        .fromTo(
          elements.titles,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          0.55
        )
        .fromTo(
          elements.descriptions,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          0.6
        );

      // Efecto shimmer mejorado
      const isHighEnd = isHighPerformanceDevice() && window.innerWidth > 768;

      if (isHighEnd) {
        const maxShimmers = window.innerWidth > 1200 ? stepElements.length : 3;

        for (let i = 0; i < Math.min(maxShimmers, stepElements.length); i++) {
          const step = stepElements[i];
          if (!step) continue;

          const stepContent = step.querySelector(
            `.${cx("methodology__step-content")}`
          );
          if (!stepContent) continue;

          // Retraso reducido
          const delay = 1200 + i * 80;

          setTimeout(() => {
            if (!step.isConnected) return;

            const shimmer = document.createElement("div");
            shimmer.className = cx("methodology__step-shimmer");
            stepContent.appendChild(shimmer);

            gsap.fromTo(
              shimmer,
              { x: "-100%", opacity: 0.3 },
              {
                x: "100%",
                opacity: 0,
                duration: 0.9,
                ease: "power1.inOut",
                onComplete: () => {
                  if (shimmer.parentNode) {
                    shimmer.parentNode.removeChild(shimmer);
                  }
                },
              }
            );
          }, delay);
        }
      }
    }, sectionRef);

    return () => {
      if (ctx) ctx.revert();
    };
  }, [cx, setInitialStates, fixFinalPositions]);

  // Configurar observador de intersección optimizado
  useEffect(() => {
    if (typeof window === "undefined" || animationExecutedRef.current) return;

    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -5% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animationExecutedRef.current) {
        requestAnimationFrame(createAnimation);
        observer.disconnect();
      }
    }, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [createAnimation]);

  return (
    <section ref={sectionRef} className={cx("methodology")}>
      <div className={cx("methodology__backdrop")} aria-hidden="true">
        <div ref={gridRef} className={cx("methodology__grid")}></div>
      </div>

      <div className={cx("methodology__container")}>
        <div ref={headerRef} className={cx("methodology__header")}>
          <Typography
            variant="h2"
            color="primary"
            fontFamily="sofia"
            fontWeight={400}
            theme="dark"
            className={cx("methodology__title")}
            align="center"
          >
            {dictionary?.title ||
              "A step-by-step look at the process behind the result."}
          </Typography>
        </div>

        <div className={cx("methodology__steps-grid")}>
          {steps.map((step, index) => (
            <div
              key={`step-${index}`}
              ref={(el: HTMLDivElement | null) => setStepRef(el, index)}
              className={cx("methodology__step")}
            >
              <div className={cx("methodology__step-icon-container")}>
                <div className={cx("methodology__step-icon")}>{step.icon}</div>
              </div>
              <div className={cx("methodology__step-content")}>
                <div className={cx("methodology__step-header")}>
                  <Typography
                    variant="h5"
                    color="primary"
                    fontFamily="sofia"
                    fontWeight={500}
                    theme="dark"
                    className={cx("methodology__step-title")}
                  >
                    <span className={cx("methodology__step-number-inline")}>
                      {index + 1}.
                    </span>{" "}
                    {step.title}
                  </Typography>
                </div>
                <Typography
                  variant="p1"
                  color="secondary"
                  theme="dark"
                  fontWeight={400}
                  fontFamily="sofia"
                  className={cx("methodology__step-description")}
                >
                  {step.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Memoización para evitar re-renders innecesarios
export const MethodologyPreview = memo(MethodologyPreviewComponent);

export default MethodologyPreview;
