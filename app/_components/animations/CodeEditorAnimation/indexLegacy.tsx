"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
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

  // Determine which code lines to show based on active tab
  const CODE_LINES =
    activeTab === "proyecto" ? PROJECT_CODE_LINES : CLIENT_CODE_LINES;

  // Función para manejar el cambio de tab
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  // Efecto para animar el código cuando cambia la tab (solo si esa tab no ha sido animada antes)
  useEffect(() => {
    if (!initialAnimationDone) return;

    // Check if this tab needs animation
    if (animatedTabs[activeTab]) {
      return; // Skip animation if this tab has already been animated
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
        });

        codeLines.forEach((line, index) => {
          const textElement = line.querySelector(`.${cx("editor__code-text")}`);

          codeTimeline.fromTo(
            line,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4 },
            index * 0.03
          );

          if (textElement) {
            codeTimeline.fromTo(
              textElement,
              { width: "0%", opacity: 0 },
              { width: "100%", opacity: 1, duration: 0.3 },
              "-=0.2"
            );
          }
        });
      }, containerRef);

      // Mark this tab as animated
      setAnimatedTabs((prev) => ({ ...prev, [activeTab]: true }));

      return () => ctx.revert();
    };

    animateCodeLines();
  }, [activeTab, initialAnimationDone, cx, animatedTabs]);

  // Detectar cuando el componente está visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldAnimate) {
            setShouldAnimate(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -100px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldAnimate]);

  // Ejecutar la animación inicial cuando el componente es visible
  useEffect(() => {
    if (!shouldAnimate) return;

    const ctx = gsap.context(() => {
      // Elementos principales
      const tabs = document.querySelector(`.${cx("editor__tabs")}`);
      const editor = document.querySelector(`.${cx("editor__content")}`);
      const footer = footerRef.current;

      // Timeline principal
      const mainTimeline = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
        onComplete: () => {
          setInitialAnimationDone(true);
          // Mark the initial tab as animated
          setAnimatedTabs((prev) => ({ ...prev, [activeTab]: true }));
        },
      });

      // Animación de los elementos principales (solo una vez)
      mainTimeline
        .fromTo(
          tabs,
          { x: "-100%", opacity: 0 },
          { x: "0", opacity: 1, duration: 0.5 }
        )
        .fromTo(
          editor,
          { y: "50", opacity: 0 },
          { y: "0", opacity: 1, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          footer,
          { y: "20", opacity: 0 },
          { y: "0", opacity: 1, duration: 0.5 },
          "-=0.6"
        );

      // Animación de las líneas de código iniciales
      const codeLines = document.querySelectorAll(
        `.${cx("editor__code-line")}`
      );
      const codeTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      codeLines.forEach((line, index) => {
        const textElement = line.querySelector(`.${cx("editor__code-text")}`);

        codeTimeline.fromTo(
          line,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4 },
          index * 0.03
        );

        if (textElement) {
          codeTimeline.fromTo(
            textElement,
            { width: "0%", opacity: 0 },
            { width: "100%", opacity: 1, duration: 0.3 },
            "-=0.2"
          );
        }
      });

      mainTimeline.add(codeTimeline, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, [shouldAnimate, cx, activeTab]);

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

  return (
    <div ref={containerRef} className={cx("editor")}>
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
