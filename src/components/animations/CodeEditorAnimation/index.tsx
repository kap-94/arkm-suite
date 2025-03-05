"use client";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./CodeEditorAnimation.module.scss";

const cx = classNames.bind(styles);

const PROJECT_CODE_LINES = [
  { content: "import { WebApp } from '@studio/core'", type: "import" },
  { content: "", type: "blank" },
  {
    content: "export function CreateProject(config) {",
    type: "function",
  },
  { content: "  const { clientName, type } = config", type: "const" },
  { content: "  const deadline = calculateDeadline(type)", type: "const" },
  { content: "", type: "blank" },
  { content: "  try {", type: "try" },
  {
    content: "    const project = WebApp.create({",
    type: "content",
  },
  { content: "      client: clientName,", type: "content" },
  { content: "      responsive: true,", type: "content" },
  { content: "      seo: true", type: "content" },
  { content: "    })", type: "content" },
  { content: "", type: "blank" },
  { content: "    return {", type: "return" },
  { content: "      success: true,", type: "content" },
  { content: "      delivery: deadline", type: "content" },
  { content: "    }", type: "content" },
  { content: "  } catch (error) {", type: "catch" },
  { content: "    notifyTeam(error)", type: "return" },
  { content: "  }", type: "end" },
  { content: "}", type: "end" },
];

const CLIENT_CODE_LINES = [
  { content: "import { Analytics } from '@studio/metrics'", type: "import" },
  {
    content: "import { ClientPortal } from '@studio/dashboard'",
    type: "import",
  },
  { content: "", type: "blank" },
  {
    content: "export async function ClientAnalytics(clientId) {",
    type: "function",
  },
  {
    content: "  const client = await getClientDetails(clientId)",
    type: "const",
  },
  { content: "  const { projects, lastVisit } = client", type: "const" },
  { content: "", type: "blank" },
  { content: "  try {", type: "try" },
  {
    content: "    const metrics = await Analytics.gather({",
    type: "content",
  },
  { content: "      visits: true,", type: "content" },
  { content: "      conversions: true,", type: "content" },
  { content: "      engagement: true", type: "content" },
  { content: "    })", type: "content" },
  { content: "", type: "blank" },
  { content: "    const insights = {", type: "content" },
  {
    content:
      "      conversionRate: metrics.conversions / metrics.visits * 100,",
    type: "content",
  },
  {
    content: "      avgTimeOnSite: metrics.engagement.timeSpent,",
    type: "content",
  },
  {
    content: "      performanceScore: calculateScore(metrics)",
    type: "content",
  },
  { content: "    }", type: "content" },
  { content: "", type: "blank" },
  { content: "    return {", type: "return" },
  { content: "      data: insights,", type: "content" },
  {
    content: "      recommendations: generateRecommendations(insights)",
    type: "content",
  },
  { content: "    }", type: "content" },
  { content: "  } catch (error) {", type: "catch" },
  { content: "    logAnalyticsError(error, clientId)", type: "return" },
  {
    content: "    return { error: true, message: 'Could not load analytics' }",
    type: "content",
  },
  { content: "  }", type: "end" },
  { content: "}", type: "end" },
];

const TERMINAL_COMMANDS = [
  { prompt: "$", command: "studio init my-client-website", status: "command" },
  {
    prompt: "🚀",
    command: "Creando proyecto personalizado...",
    status: "info",
  },
  {
    prompt: "✅",
    command: "Proyecto configurado con éxito",
    status: "success",
  },
];

export const CodeEditorAnimation = () => {
  const [activeTab, setActiveTab] = useState("proyecto");
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandsRef = useRef<HTMLDivElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // Determine which code lines to show based on active tab
  const CODE_LINES =
    activeTab === "proyecto" ? PROJECT_CODE_LINES : CLIENT_CODE_LINES;

  const addToLinesRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current[index] = el;
    }
  };

  const addToCommandsRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !commandsRef.current.includes(el)) {
      commandsRef.current[index] = el;
    }
  };

  const handleTabChange = (tab: string) => {
    // Clear previous refs
    linesRef.current = [];

    setActiveTab(tab);

    // Restart animation for the new tab content
    const event = new CustomEvent("restartAnimation");
    containerRef.current?.dispatchEvent(event);
  };

  // Scroll synchronization
  useEffect(() => {
    const codeContainer = codeContainerRef.current;
    const lineNumbers = lineNumbersRef.current;

    if (!codeContainer || !lineNumbers) return;

    const handleScroll = () => {
      if (lineNumbers) {
        lineNumbers.scrollTop = codeContainer.scrollTop;
      }
    };

    codeContainer.addEventListener("scroll", handleScroll);
    return () => codeContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      const createAnimation = () => {
        if (!timeline.current) return;

        timeline.current.clear();

        // Tabs Animation
        // timeline.current.fromTo(
        //   tabsRef.current,
        //   {
        //     y: -20,
        //     opacity: 0,
        //   },
        //   {
        //     y: 0,
        //     opacity: 1,
        //     duration: 0.5,
        //   }
        // );

        // Code Lines Animation with typing effect
        linesRef.current.forEach((line, index) => {
          if (!line) return;
          const textElement = line.querySelector(`.${cx("editor__code-text")}`);

          timeline.current?.fromTo(
            line,
            {
              x: -20,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
            },
            `-=${index ? 0.3 : 0}`
          );

          if (textElement) {
            timeline.current?.fromTo(
              textElement,
              {
                width: "0%",
                opacity: 0,
              },
              {
                width: "100%",
                opacity: 1,
                duration: 0.3,
              },
              "-=0.2"
            );
          }
        });

        // Terminal Animation
        // if (terminalRef.current) {
        //   timeline.current.fromTo(
        //     terminalRef.current,
        //     {
        //       y: 20,
        //       opacity: 0,
        //     },
        //     {
        //       y: 0,
        //       opacity: 1,
        //       duration: 0.5,
        //     },
        //     "-=0.3"
        //   );

        //   // Commands Animation
        //   commandsRef.current.forEach((command, index) => {
        //     if (!command) return;
        //     timeline.current?.fromTo(
        //       command,
        //       {
        //         y: 10,
        //         opacity: 0,
        //       },
        //       {
        //         y: 0,
        //         opacity: 1,
        //         duration: 0.3,
        //         delay: index * 0.15,
        //       },
        //       "-=0.2"
        //     );
        //   });
        // }

        // Footer Animation
        // timeline.current.fromTo(
        //   footerRef.current,
        //   {
        //     y: 20,
        //     opacity: 0,
        //   },
        //   {
        //     y: 0,
        //     opacity: 1,
        //     duration: 0.5,
        //   },
        //   "-=0.3"
        // );
      };

      createAnimation();

      const handleRestart = () => {
        createAnimation();
      };

      containerRef.current?.addEventListener("restartAnimation", handleRestart);

      return () => {
        containerRef.current?.removeEventListener(
          "restartAnimation",
          handleRestart
        );
      };
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div ref={containerRef} className={cx("editor")}>
      {/* Editor Tabs */}
      <div ref={tabsRef} className={cx("editor__tabs")}>
        <div
          className={cx("editor__tab", {
            "editor__tab--active": activeTab === "client",
          })}
          onClick={() => handleTabChange("client")}
        >
          <div className={cx("editor__tab-icon", "editor__tab-icon--prisma")} />
          <div className={cx("editor__tab-name")}>Tecnologies.ts</div>
        </div>
        <div
          className={cx("editor__tab", {
            "editor__tab--active": activeTab === "proyecto",
          })}
          onClick={() => handleTabChange("proyecto")}
        >
          <div className={cx("editor__tab-icon", "editor__tab-icon--ts")} />
          <div className={cx("editor__tab-name")}>Projects.ts</div>
        </div>
      </div>

      {/* Code Editor */}
      <div ref={editorRef} className={cx("editor__content")}>
        <div ref={lineNumbersRef} className={cx("editor__line-numbers")}>
          {CODE_LINES.map((_, index) => (
            <div key={`number-${index}`} className={cx("editor__line-number")}>
              {index + 1}
            </div>
          ))}
        </div>
        <div ref={codeContainerRef} className={cx("editor__code")}>
          {CODE_LINES.map((line, index) => (
            <div
              key={`line-${index}`}
              ref={(el) => addToLinesRefs(el, index)}
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

      {/* Terminal */}
      {/* <div ref={terminalRef} className={cx("editor__terminal")}>
        <div className={cx("editor__terminal-header")}>
          <div className={cx("editor__terminal-title")}>Terminal</div>
          <div className={cx("editor__terminal-actions")}>
            <div className={cx("editor__terminal-action")} />
            <div className={cx("editor__terminal-action")} />
          </div>
        </div>
        <div className={cx("editor__terminal-content")}>
          {TERMINAL_COMMANDS.map((cmd, index) => (
            <div
              key={`cmd-${index}`}
              ref={(el) => addToCommandsRefs(el, index)}
              className={cx("editor__terminal-line")}
            >
              <span className={cx("editor__terminal-prompt")}>
                {cmd.prompt}
              </span>
              <span
                className={cx(
                  "editor__terminal-command",
                  `editor__terminal-command--${cmd.status}`
                )}
              >
                {cmd.command}
              </span>
            </div>
          ))}
        </div>
      </div> */}

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
              <span>Connected</span>
            </div>
            {/* <div className={cx("editor__footer-status-item")}>
              <span className={cx("editor__footer-status-dot")}></span>
              <span>TypeScript</span>
            </div> */}
          </div>
        </div>
        <div className={cx("editor__footer-right")}>
          <div className={cx("editor__footer-info")}>
            <span>Ln {activeTab === "proyecto" ? "21" : "28"}</span>
            <span>Col 1</span>
            {/* <span>Spaces: 2</span> */}
          </div>

          {/* <div className={cx("editor__footer-branch")}>
            <span>🔄</span>
            <span>main</span>
          </div>
          <div className={cx("editor__footer-action")}>Problems: 0</div>
          <div
            className={cx(
              "editor__footer-action",
              "editor__footer-action--accent"
            )}
          >
            Preview
          </div>
          <div className={cx("editor__footer-action")}>Deploy</div> */}
        </div>
      </div>
    </div>
  );
};

export default CodeEditorAnimation;
