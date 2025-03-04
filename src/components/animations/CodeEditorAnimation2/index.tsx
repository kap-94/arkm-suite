// CodeEditorAnimation.tsx
import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./CodeEditorAnimation.module.scss";

const cx = classNames.bind(styles);

export const CodeEditorAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const addToLinesRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current[index] = el;
    }
  };

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
          timeline.current?.fromTo(
            line,
            {
              x: -20,
              opacity: 0,
              width: "0%",
            },
            {
              x: 0,
              opacity: 1,
              width: "100%",
              duration: 0.4,
              delay: index * 0.1,
            },
            "-=0.2"
          );
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
          <div className={cx("editor__tab-icon")} />
          <div className={cx("editor__tab-name")} />
        </div>
        {[...Array(2)].map((_, index) => (
          <div key={`tab-${index}`} className={cx("editor__tab")}>
            <div className={cx("editor__tab-icon")} />
            <div className={cx("editor__tab-name")} />
          </div>
        ))}
      </div>

      {/* Code Editor */}
      <div ref={editorRef} className={cx("editor__content")}>
        <div className={cx("editor__line-numbers")}>
          {[...Array(8)].map((_, index) => (
            <div key={`number-${index}`} className={cx("editor__line-number")}>
              {index + 1}
            </div>
          ))}
        </div>
        <div className={cx("editor__code")}>
          {[...Array(8)].map((_, index) => (
            <div
              key={`line-${index}`}
              ref={(el) => addToLinesRefs(el, index)}
              className={cx("editor__code-line", {
                "editor__code-line--import": index === 0,
                "editor__code-line--function": index === 2,
                "editor__code-line--return": index === 6,
              })}
            />
          ))}
        </div>
      </div>

      {/* Terminal */}
      <div ref={terminalRef} className={cx("editor__terminal")}>
        <div className={cx("editor__terminal-header")}>
          <div className={cx("editor__terminal-title")} />
          <div className={cx("editor__terminal-actions")}>
            <div className={cx("editor__terminal-action")} />
            <div className={cx("editor__terminal-action")} />
          </div>
        </div>
        <div className={cx("editor__terminal-content")}>
          <div className={cx("editor__terminal-line")}>
            <span className={cx("editor__terminal-prompt")}>$</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorAnimation;
