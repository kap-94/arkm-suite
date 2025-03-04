// "use client";
// import { useEffect, useRef } from "react";
// import classNames from "classnames/bind";
// import gsap from "gsap";
// import styles from "./CodeEditorAnimation.module.scss";

// const cx = classNames.bind(styles);

// const CODE_LINES = [
//   { content: "import { WebApp } from '@studio/core'", type: "import" },
//   { content: "", type: "blank" },
//   {
//     content: "export function CreateProject(config) {",
//     type: "function",
//   },
//   { content: "  const { clientName, type } = config", type: "const" },
//   { content: "  const deadline = calculateDeadline(type)", type: "const" },
//   { content: "", type: "blank" },
//   { content: "  try {", type: "try" },
//   {
//     content: "    const project = WebApp.create({",
//     type: "content",
//   },
//   { content: "      client: clientName,", type: "content" },
//   { content: "      responsive: true,", type: "content" },
//   { content: "      seo: true", type: "content" },
//   { content: "    })", type: "content" },
//   { content: "", type: "blank" },
//   { content: "    return {", type: "return" },
//   { content: "      success: true,", type: "content" },
//   { content: "      delivery: deadline", type: "content" },
//   { content: "    }", type: "content" },
//   { content: "  } catch (error) {", type: "catch" },
//   { content: "    notifyTeam(error)", type: "return" },
//   { content: "  }", type: "end" },
//   { content: "}", type: "end" },
// ];

// const TERMINAL_COMMANDS = [
//   { prompt: "$", command: "studio init my-client-website", status: "command" },
//   {
//     prompt: "🚀",
//     command: "Creando proyecto personalizado...",
//     status: "info",
//   },
//   {
//     prompt: "✅",
//     command: "Proyecto configurado con éxito",
//     status: "success",
//   },
//   {
//     prompt: "$",
//     command: "studio add analytics seo contact",
//     status: "command",
//   },
//   { prompt: "✨", command: "Módulos añadidos al proyecto", status: "success" },
//   { prompt: "$", command: "studio deploy", status: "command" },
//   {
//     prompt: "🌐",
//     command: "Web disponible en: client-site.studio.io",
//     status: "info",
//   },
// ];

// export const CodeEditorAnimation = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const tabsRef = useRef<HTMLDivElement>(null);
//   const editorRef = useRef<HTMLDivElement>(null);
//   const linesRef = useRef<HTMLDivElement[]>([]);
//   const terminalRef = useRef<HTMLDivElement>(null);
//   const commandsRef = useRef<HTMLDivElement[]>([]);
//   const timeline = useRef<gsap.core.Timeline | null>(null);

//   const addToLinesRefs = (el: HTMLDivElement | null, index: number) => {
//     if (el && !linesRef.current.includes(el)) {
//       linesRef.current[index] = el;
//     }
//   };

//   const addToCommandsRefs = (el: HTMLDivElement | null, index: number) => {
//     if (el && !commandsRef.current.includes(el)) {
//       commandsRef.current[index] = el;
//     }
//   };

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       timeline.current = gsap.timeline({
//         defaults: {
//           ease: "power3.out",
//           duration: 0.8,
//         },
//       });

//       const createAnimation = () => {
//         if (!timeline.current) return;

//         timeline.current.clear();

//         // Tabs Animation
//         timeline.current.fromTo(
//           tabsRef.current,
//           {
//             y: -20,
//             opacity: 0,
//           },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.5,
//           }
//         );

//         // Code Lines Animation with typing effect
//         linesRef.current.forEach((line, index) => {
//           if (!line) return;
//           const textElement = line.querySelector(`.${cx("editor__code-text")}`);

//           timeline.current?.fromTo(
//             line,
//             {
//               x: -20,
//               opacity: 0,
//             },
//             {
//               x: 0,
//               opacity: 1,
//               duration: 0.4,
//             },
//             `-=${index ? 0.3 : 0}`
//           );

//           if (textElement) {
//             timeline.current?.fromTo(
//               textElement,
//               {
//                 width: "0%",
//                 opacity: 0,
//               },
//               {
//                 width: "100%",
//                 opacity: 1,
//                 duration: 0.3,
//               },
//               "-=0.2"
//             );
//           }
//         });

//         // Terminal Animation
//         timeline.current.fromTo(
//           terminalRef.current,
//           {
//             y: 20,
//             opacity: 0,
//           },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 0.5,
//           },
//           "-=0.3"
//         );

//         // Commands Animation
//         commandsRef.current.forEach((command, index) => {
//           if (!command) return;
//           timeline.current?.fromTo(
//             command,
//             {
//               y: 10,
//               opacity: 0,
//             },
//             {
//               y: 0,
//               opacity: 1,
//               duration: 0.3,
//               delay: index * 0.15,
//             },
//             "-=0.2"
//           );
//         });
//       };

//       createAnimation();

//       const handleRestart = () => {
//         createAnimation();
//       };

//       containerRef.current?.addEventListener("restartAnimation", handleRestart);

//       return () => {
//         containerRef.current?.removeEventListener(
//           "restartAnimation",
//           handleRestart
//         );
//       };
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={containerRef} className={cx("editor")}>
//       {/* Editor Tabs */}
//       <div ref={tabsRef} className={cx("editor__tabs")}>
//         <div className={cx("editor__tab", "editor__tab--active")}>
//           <div className={cx("editor__tab-icon", "editor__tab-icon--ts")} />
//           <div className={cx("editor__tab-name")}>proyecto.js</div>
//         </div>
//         <div className={cx("editor__tab")}>
//           <div className={cx("editor__tab-icon", "editor__tab-icon--prisma")} />
//           <div className={cx("editor__tab-name")}>diseño.css</div>
//         </div>
//       </div>

//       {/* Code Editor */}
//       <div ref={editorRef} className={cx("editor__content")}>
//         <div className={cx("editor__line-numbers")}>
//           {CODE_LINES.map((_, index) => (
//             <div key={`number-${index}`} className={cx("editor__line-number")}>
//               {index + 1}
//             </div>
//           ))}
//         </div>
//         <div className={cx("editor__code")}>
//           {CODE_LINES.map((line, index) => (
//             <div
//               key={`line-${index}`}
//               ref={(el) => addToLinesRefs(el, index)}
//               className={cx(
//                 "editor__code-line",
//                 `editor__code-line--${line.type}`
//               )}
//             >
//               {line.content && (
//                 <pre className={cx("editor__code-text")}>{line.content}</pre>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Terminal */}
//       <div ref={terminalRef} className={cx("editor__terminal")}>
//         <div className={cx("editor__terminal-header")}>
//           <div className={cx("editor__terminal-title")}>Terminal</div>
//           <div className={cx("editor__terminal-actions")}>
//             <div className={cx("editor__terminal-action")} />
//             <div className={cx("editor__terminal-action")} />
//           </div>
//         </div>
//         <div className={cx("editor__terminal-content")}>
//           {TERMINAL_COMMANDS.map((cmd, index) => (
//             <div
//               key={`cmd-${index}`}
//               ref={(el) => addToCommandsRefs(el, index)}
//               className={cx("editor__terminal-line")}
//             >
//               <span className={cx("editor__terminal-prompt")}>
//                 {cmd.prompt}
//               </span>
//               <span
//                 className={cx(
//                   "editor__terminal-command",
//                   `editor__terminal-command--${cmd.status}`
//                 )}
//               >
//                 {cmd.command}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeEditorAnimation;

"use client";
import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./CodeEditorAnimation.module.scss";

const cx = classNames.bind(styles);

const CODE_LINES = [
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
  // {
  //   prompt: "$",
  //   command: "studio add analytics seo contact",
  //   status: "command",
  // },
  // { prompt: "✨", command: "Módulos añadidos al proyecto", status: "success" },
  // { prompt: "$", command: "studio deploy", status: "command" },
  // {
  //   prompt: "🌐",
  //   command: "Web disponible en: client-site.studio.io",
  //   status: "info",
  // },
];

export const CodeEditorAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandsRef = useRef<HTMLDivElement[]>([]);
  const timeline = useRef<gsap.core.Timeline | null>(null);

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
        timeline.current.fromTo(
          tabsRef.current,
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          }
        );

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
        timeline.current.fromTo(
          terminalRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          "-=0.3"
        );

        // Commands Animation
        commandsRef.current.forEach((command, index) => {
          if (!command) return;
          timeline.current?.fromTo(
            command,
            {
              y: 10,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              delay: index * 0.15,
            },
            "-=0.2"
          );
        });
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
  }, []);

  return (
    <div ref={containerRef} className={cx("editor")}>
      {/* Editor Tabs */}
      <div ref={tabsRef} className={cx("editor__tabs")}>
        <div className={cx("editor__tab", "editor__tab--active")}>
          <div className={cx("editor__tab-icon", "editor__tab-icon--ts")} />
          <div className={cx("editor__tab-name")}>proyecto.js</div>
        </div>
        <div className={cx("editor__tab")}>
          <div className={cx("editor__tab-icon", "editor__tab-icon--prisma")} />
          <div className={cx("editor__tab-name")}>diseño.css</div>
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
    </div>
  );
};

export default CodeEditorAnimation;
