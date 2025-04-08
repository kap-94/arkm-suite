"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import { ScrollTrigger } from "@/app/_lib/gsap-init";
import styles from "./CodeEditorAnimation.module.scss";

const cx = classNames.bind(styles);

const PROJECT_CODE_LINES = [
  { content: "{", type: "bracket" },
  { content: '  "project": {', type: "property" },
  { content: '    "name": "E-commerce Platform",', type: "nested-property" },
  { content: '    "client": "NexTech Solutions",', type: "nested-property" },
  { content: '    "status": "In Progress",', type: "nested-property" },
  { content: '    "deadline": "2025-06-15",', type: "nested-property" },
  { content: '    "priority": "High",', type: "nested-property" },
  { content: '    "features": {', type: "nested-property" },
  { content: '      "responsive": true,', type: "nested-property" },
  {
    content: '      "paymentGateways": ["Stripe", "PayPal"],',
    type: "nested-property",
  },
  { content: '      "multiLanguage": true,', type: "nested-property" },
  { content: '      "analytics": true', type: "nested-property" },
  { content: "    },", type: "nested" },
  { content: '    "team": [', type: "nested-property" },
  {
    content: '      {"name": "Alex", "role": "Lead Developer"},',
    type: "nested-value",
  },
  {
    content: '      {"name": "Sam", "role": "UX Designer"},',
    type: "nested-value",
  },
  {
    content: '      {"name": "Jordan", "role": "Backend Developer"}',
    type: "nested-value",
  },
  { content: "    ],", type: "nested" },
  { content: '    "technologies": {', type: "nested-property" },
  {
    content: '      "frontend": ["React", "TypeScript", "TailwindCSS"],',
    type: "nested-property",
  },
  {
    content: '      "backend": ["Node.js", "Express", "MongoDB"],',
    type: "nested-property",
  },
  { content: '      "deployment": "AWS",', type: "nested-property" },
  { content: '      "testing": ["Jest", "Cypress"]', type: "nested-property" },
  { content: "    },", type: "nested" },
  { content: '    "milestones": [', type: "nested-property" },
  {
    content:
      '      {"phase": "Design", "date": "2025-02-15", "completed": true},',
    type: "nested-value",
  },
  {
    content:
      '      {"phase": "Frontend", "date": "2025-04-01", "completed": true},',
    type: "nested-value",
  },
  {
    content:
      '      {"phase": "Backend", "date": "2025-05-15", "completed": false},',
    type: "nested-value",
  },
  {
    content:
      '      {"phase": "Testing", "date": "2025-06-01", "completed": false}',
    type: "nested-value",
  },
  { content: "    ]", type: "nested" },
  { content: "  }", type: "bracket" },
  { content: "}", type: "bracket" },
];

const CLIENT_CODE_LINES = [
  { content: "{", type: "bracket" },
  { content: '  "client": {', type: "property" },
  { content: '    "id": "CLT-2025-0042",', type: "nested-property" },
  { content: '    "name": "NexTech Solutions",', type: "nested-property" },
  { content: '    "industry": "Technology",', type: "nested-property" },
  { content: '    "since": 2018,', type: "nested-property" },
  { content: '    "tier": "Enterprise",', type: "nested-property" },
  { content: '    "contact": {', type: "nested-property" },
  {
    content: '      "primary": "contact@nextech.example",',
    type: "nested-property",
  },
  { content: '      "phone": "+1-555-123-4567",', type: "nested-property" },
  {
    content: '      "address": "123 Innovation St, San Francisco, CA"',
    type: "nested-property",
  },
  { content: "    },", type: "nested" },
  { content: '    "representatives": [', type: "nested-property" },
  {
    content:
      '      {"name": "Emma Johnson", "position": "CTO", "phone": "+1-555-987-6543"},',
    type: "nested-value",
  },
  {
    content:
      '      {"name": "David Chen", "position": "Product Manager", "phone": "+1-555-456-7890"}',
    type: "nested-value",
  },
  { content: "    ],", type: "nested" },
  { content: '    "projects": [', type: "nested-property" },
  {
    content:
      '      {"id": "PRJ-0125", "name": "E-commerce Platform", "status": "In Progress"},',
    type: "nested-value",
  },
  {
    content:
      '      {"id": "PRJ-0089", "name": "CRM Integration", "status": "Completed"},',
    type: "nested-value",
  },
  {
    content:
      '      {"id": "PRJ-0110", "name": "Mobile App Development", "status": "Planning"}',
    type: "nested-value",
  },
  { content: "    ],", type: "nested" },
  { content: '    "billing": {', type: "nested-property" },
  { content: '      "method": "Credit Card",', type: "nested-property" },
  { content: '      "cycle": "Monthly",', type: "nested-property" },
  { content: '      "lastPayment": "2025-02-15",', type: "nested-property" },
  { content: '      "nextInvoice": "2025-03-15"', type: "nested-property" },
  { content: "    },", type: "nested" },
  { content: '    "analytics": {', type: "nested-property" },
  { content: '      "totalSpend": 287500,', type: "nested-property" },
  { content: '      "activeProjects": 3,', type: "nested-property" },
  { content: '      "completedProjects": 12,', type: "nested-property" },
  { content: '      "averageProjectDuration": 78.5,', type: "nested-property" },
  { content: '      "satisfaction": 4.8', type: "nested-property" },
  { content: "    }", type: "nested" },
  { content: "  }", type: "bracket" },
  { content: "}", type: "bracket" },
];

export const CodeEditorAnimation = () => {
  const [activeTab, setActiveTab] = useState("proyecto");
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  // Keep track of which tabs have been animated
  const [animatedTabs, setAnimatedTabs] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const animationId = useRef(`code-editor-${Date.now()}`);

  // Estado para detectar tamaño de pantalla
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

  // Determine which code lines to show based on active tab
  const CODE_LINES =
    activeTab === "proyecto" ? PROJECT_CODE_LINES : CLIENT_CODE_LINES;

  // Función para manejar el cambio de tab
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  // Función para asegurar que el texto sea visible después de animaciones
  const resetCodeVisibility = () => {
    // Asegurar que el texto siempre esté visible al final
    setTimeout(() => {
      const codeTexts = document.querySelectorAll(
        `.${cx("editor__code-text")}`
      );
      codeTexts.forEach((el) => {
        gsap.set(el, { opacity: 1, width: "100%" });
      });
    }, 100);
  };

  // Efecto para animar el código cuando cambia la tab (solo si esa tab no ha sido animada antes)
  useEffect(() => {
    if (!initialAnimationDone) return;

    // Check if this tab needs animation
    if (animatedTabs[activeTab]) {
      // Para tabs ya animados, solo asegurar que el código sea visible
      resetCodeVisibility();
      return;
    }

    // Animate the code for this tab
    const animateCodeLines = () => {
      const ctx = gsap.context(() => {
        // Líneas de código
        const codeLines = document.querySelectorAll(
          `.${cx("editor__code-line")}`
        );
        const codeTimeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: resetCodeVisibility,
        });

        // Ajustar velocidad y desplazamiento según tamaño de pantalla
        const xOffset = isMobile ? -10 : isTablet ? -15 : -20;
        const staggerDelay = isMobile ? 0.01 : isTablet ? 0.015 : 0.02;
        const duration = isMobile ? 0.25 : isTablet ? 0.3 : 0.35;

        codeLines.forEach((line, index) => {
          const textElement = line.querySelector(`.${cx("editor__code-text")}`);

          codeTimeline.fromTo(
            line,
            { x: xOffset, opacity: 0 },
            { x: 0, opacity: 1, duration },
            index * staggerDelay
          );

          if (textElement) {
            codeTimeline.fromTo(
              textElement,
              { width: "0%", opacity: 0 },
              {
                width: "100%",
                opacity: 1,
                duration: duration - 0.05,
                onComplete: () => {
                  // Garantizar que cada elemento se mantenga visible con verificación de tipo
                  gsap.set(textElement, { opacity: 1, width: "100%" });
                },
              },
              "-=0.15"
            );
          }
        });
      }, containerRef);

      // Mark this tab as animated
      setAnimatedTabs((prev) => ({ ...prev, [activeTab]: true }));

      return () => ctx.revert();
    };

    animateCodeLines();
  }, [activeTab, initialAnimationDone, cx, animatedTabs, isMobile, isTablet]);

  // Detectar cuando el componente está visible
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldAnimate) {
            setShouldAnimate(true);
            observer.disconnect();
          }
        });
      },
      // Configuración adaptativa por dispositivo
      {
        threshold: isMobile ? 0.2 : isTablet ? 0.25 : 0.35,
        rootMargin: isMobile
          ? "0px 0px -30px 0px"
          : isTablet
          ? "0px 0px -50px 0px"
          : "0px 0px -100px 0px",
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [shouldAnimate, isMobile, isTablet]);

  // Ejecutar la animación inicial cuando el componente es visible
  useLayoutEffect(() => {
    if (!shouldAnimate || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Elementos principales
      const tabs = document.querySelector(`.${cx("editor__tabs")}`);
      const editor = document.querySelector(`.${cx("editor__content")}`);
      const footer = footerRef.current;

      // Ajuste de valores de animación según dispositivo
      const animConfig = {
        duration: isMobile ? 0.4 : isTablet ? 0.5 : 0.6,
        tabsX: isMobile ? "-40%" : isTablet ? "-70%" : "-100%",
        editorY: isMobile ? "20" : isTablet ? "30" : "40",
        footerY: isMobile ? "10" : isTablet ? "15" : "20",
        rotationX: isMobile ? 3 : isTablet ? 4 : 5,
      };

      // Timeline principal
      const mainTimeline = gsap.timeline({
        defaults: { ease: "power3.out", duration: animConfig.duration },
        onComplete: () => {
          setInitialAnimationDone(true);
          setAnimatedTabs((prev) => ({ ...prev, [activeTab]: true }));

          // Garantizar que el código sea visible después de la animación principal
          resetCodeVisibility();
        },
      });

      // Primero hacer visible el contenedor
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.2 });

      // Animación de los elementos principales
      mainTimeline
        .fromTo(
          tabs,
          { x: animConfig.tabsX, opacity: 0 },
          { x: "0", opacity: 1, duration: animConfig.duration * 0.9 }
        )
        .fromTo(
          editor,
          {
            y: animConfig.editorY,
            opacity: 0,
            rotationX: animConfig.rotationX,
          },
          { y: "0", opacity: 1, rotationX: 0, duration: animConfig.duration },
          "-=0.3"
        )
        .fromTo(
          footer,
          { y: animConfig.footerY, opacity: 0 },
          { y: "0", opacity: 1, duration: animConfig.duration * 0.9 },
          "-=0.6"
        );

      // Animación de las líneas de código
      const codeLines = document.querySelectorAll(
        `.${cx("editor__code-line")}`
      );
      const codeTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: resetCodeVisibility, // Garantiza que el código sea visible al finalizar
      });

      // Ajustar stagger según dispositivo
      const staggerDelay = isMobile ? 0.01 : isTablet ? 0.015 : 0.02;
      const xOffset = isMobile ? -10 : isTablet ? -15 : -20;
      const duration = isMobile ? 0.25 : isTablet ? 0.3 : 0.35;

      codeLines.forEach((line, index) => {
        const textElement = line.querySelector(`.${cx("editor__code-text")}`);

        codeTimeline.fromTo(
          line,
          { x: xOffset, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration,
            clearProps: "x", // Limpiar la propiedad x para prevenir problemas
          },
          index * staggerDelay
        );

        if (textElement) {
          codeTimeline.fromTo(
            textElement,
            { width: "0%", opacity: 0 },
            {
              width: "100%",
              opacity: 1,
              duration: duration - 0.05,
              onComplete: () => {
                // Verificar y convertir el elemento correctamente para acceder a style
                if (textElement instanceof HTMLElement) {
                  textElement.style.opacity = "1";
                  textElement.style.width = "100%";
                } else {
                  // Si no es un HTMLElement, usar gsap.set como alternativa
                  gsap.set(textElement, { opacity: 1, width: "100%" });
                }
              },
            },
            "-=0.15"
          );
        }
      });

      mainTimeline.add(codeTimeline, "-=0.5");

      // Configurar ScrollTrigger para móviles
      if (isMobile || isTablet) {
        ScrollTrigger.create({
          id: animationId.current,
          trigger: containerRef.current,
          start: isMobile ? "top 90%" : "top 85%",
          onEnter: () => {
            mainTimeline.play();
          },
          once: true,
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      if (isMobile || isTablet) {
        ScrollTrigger.getById(animationId.current)?.kill();
      }
    };
  }, [shouldAnimate, cx, activeTab, isMobile, isTablet]);

  // Para sincronizar el scroll entre números de línea y el código
  useEffect(() => {
    const codeElement = document.querySelector(`.${cx("editor__code")}`);
    const lineNumbers = document.querySelector(
      `.${cx("editor__line-numbers")}`
    );

    if (!codeElement || !lineNumbers) return;

    const handleScroll = () => {
      lineNumbers.scrollTop = codeElement.scrollTop;
    };

    codeElement.addEventListener("scroll", handleScroll);
    return () => codeElement.removeEventListener("scroll", handleScroll);
  }, [cx, activeTab]);

  // Recrear animaciones cuando cambia el tamaño de pantalla
  useEffect(() => {
    if (initialAnimationDone) {
      // Asegurar que el texto sea visible si ya se ha completado la animación
      resetCodeVisibility();
    }
  }, [isMobile, isTablet, initialAnimationDone]);

  return (
    <div
      ref={containerRef}
      className={cx("editor", {
        "editor--mobile": isMobile,
        "editor--tablet": isTablet,
      })}
    >
      {/* Editor Tabs */}
      <div className={cx("editor__tabs")}>
        <div
          className={cx("editor__tab", {
            "editor__tab--active": activeTab === "proyecto",
          })}
          onClick={() => handleTabChange("proyecto")}
        >
          <div className={cx("editor__tab-icon")} />
          <div className={cx("editor__tab-name")}>project.json</div>
        </div>
        <div
          className={cx("editor__tab", {
            "editor__tab--active": activeTab === "client",
          })}
          onClick={() => handleTabChange("client")}
        >
          <div className={cx("editor__tab-icon")} />
          <div className={cx("editor__tab-name")}>client.json</div>
        </div>
      </div>

      {/* Code Editor */}
      <div className={cx("editor__content")}>
        <div className={cx("editor__line-numbers")}>
          {CODE_LINES.map((_, index) => (
            <div
              key={`number-${activeTab}-${index}`}
              className={cx("editor__line-number")}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className={cx("editor__code")}>
          {CODE_LINES.map((line, index) => (
            <div
              key={`line-${activeTab}-${index}`}
              className={cx(
                "editor__code-line",
                `editor__code-line--${line.type}`
              )}
            >
              {line.content && (
                <pre className={cx("editor__code-text")}>{line.content}</pre>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef} className={cx("editor__footer")}>
        <div className={cx("editor__footer-left")}>
          <div className={cx("editor__footer-status")}>
            <div
              className={cx(
                "editor__footer-status-item",
                "editor__footer-status-item--active"
              )}
            >
              <span className={cx("editor__footer-status-dot")}></span>
              <span>JSON</span>
            </div>
          </div>
        </div>
        <div className={cx("editor__footer-right")}>
          <div className={cx("editor__footer-info")}>
            <span>Ln {CODE_LINES.length}</span>
            <span>Col 1</span>
            <span>
              {activeTab === "proyecto" ? "project.json" : "client.json"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorAnimation;
