// KanbanWireframe.tsx
import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./KanbanWireframe.module.scss";

const cx = classNames.bind(styles);

const COLUMNS = ["To Do", "In Progress", "Review", "Done"];

export const KanbanWireframe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const fabRef = useRef<HTMLButtonElement>(null);

  const addToColumnRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !columnsRef.current.includes(el)) {
      columnsRef.current[index] = el;
    }
  };

  const addToCardRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      // Header Animation
      tl.fromTo(
        headerRef.current,
        {
          y: -50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        }
      );

      // Columns Animation
      columnsRef.current.forEach((column, index) => {
        tl.fromTo(
          column,
          {
            x: -30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
          },
          `-=${index ? 0.3 : 0}`
        );
      });

      // Cards Animation
      cardsRef.current.forEach((card, index) => {
        tl.fromTo(
          card,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            onStart: () => {
              card.classList.add(cx("animate-shine"));
            },
            onComplete: () => {
              setTimeout(() => {
                card.classList.remove(cx("animate-shine"));
              }, 1000);
            },
          },
          `-=${index ? 0.25 : 0.2}`
        );
      });

      // FAB Animation
      tl.fromTo(
        fabRef.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cx("wireframe")}>
      {/* Project Header */}
      <header ref={headerRef} className={cx("wireframe__header")}>
        <div className={cx("wireframe__project-info")}>
          <div className={cx("wireframe__project-icon")} />
          <div className={cx("wireframe__project-details")}>
            <div className={cx("wireframe__project-name")} />
            <div className={cx("wireframe__project-description")} />
          </div>
        </div>
        <div className={cx("wireframe__team")}>
          {[...Array(4)].map((_, index) => (
            <div
              key={`member-${index}`}
              className={cx("wireframe__team-member")}
            />
          ))}
          <div className={cx("wireframe__team-more")} />
        </div>
      </header>

      {/* Kanban Board */}
      <div className={cx("wireframe__board")}>
        {COLUMNS.map((column, colIndex) => (
          <div
            key={`column-${colIndex}`}
            ref={(el) => addToColumnRefs(el, colIndex)}
            className={cx("wireframe__column")}
          >
            <div className={cx("wireframe__column-header")}>
              <div className={cx("wireframe__column-title")} />
              <div className={cx("wireframe__column-count")} />
            </div>

            <div className={cx("wireframe__cards")}>
              {[...Array(3)].map((_, cardIndex) => (
                <div
                  key={`card-${colIndex}-${cardIndex}`}
                  ref={(el) => addToCardRefs(el, colIndex * 3 + cardIndex)}
                  className={cx("wireframe__card")}
                >
                  <div className={cx("wireframe__card-tags")}>
                    {[...Array(2)].map((_, tagIndex) => (
                      <div
                        key={`tag-${tagIndex}`}
                        className={cx("wireframe__card-tag")}
                      />
                    ))}
                  </div>
                  <div className={cx("wireframe__card-title")} />
                  <div className={cx("wireframe__card-content")} />
                  <div className={cx("wireframe__card-footer")}>
                    <div className={cx("wireframe__card-metrics")}>
                      <div className={cx("wireframe__card-metric")} />
                      <div className={cx("wireframe__card-metric")} />
                    </div>
                    <div className={cx("wireframe__card-assignee")} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Card FAB */}
      <button ref={fabRef} className={cx("wireframe__fab")}>
        <div className={cx("wireframe__fab-icon")} />
      </button>
    </div>
  );
};

export default KanbanWireframe;
