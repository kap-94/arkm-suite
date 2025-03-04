// DashboardWireframe.tsx
import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./DashboardWireframe.module.scss";

const cx = classNames.bind(styles);

export const DashboardWireframe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const addToStatsRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current[index] = el;
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
        }
      );

      // Stats Cards Animation
      statsRef.current.forEach((stat, index) => {
        tl.fromTo(
          stat,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            onStart: () => {
              stat.classList.add(cx("animate-shine"));
            },
            onComplete: () => {
              setTimeout(() => {
                stat.classList.remove(cx("animate-shine"));
              }, 1000);
            },
          },
          `-=${index ? 0.3 : 0}`
        );
      });

      // Chart Animation
      tl.fromTo(
        chartRef.current,
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
        },
        "-=0.2"
      );

      // Table Animation
      tl.fromTo(
        tableRef.current,
        {
          x: 30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
        },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cx("wireframe")}>
      {/* Header */}
      <header ref={headerRef} className={cx("wireframe__header")}>
        <div className={cx("wireframe__header-content")}>
          <div className={cx("wireframe__header-logo")} />
          <div className={cx("wireframe__nav-items")}>
            {[...Array(4)].map((_, index) => (
              <div
                key={`nav-item-${index}`}
                className={cx("wireframe__nav-item")}
              />
            ))}
          </div>
          <div className={cx("wireframe__header-actions")}>
            <div className={cx("wireframe__header-action")} />
            <div className={cx("wireframe__header-action")} />
          </div>
        </div>
      </header>

      <div className={cx("wireframe__content")}>
        {/* Stats Row */}
        <div className={cx("wireframe__stats")}>
          {[...Array(4)].map((_, index) => (
            <div
              key={`stat-${index}`}
              ref={(el) => addToStatsRefs(el, index)}
              className={cx("wireframe__stat-card")}
            >
              <div className={cx("wireframe__stat-icon")} />
              <div className={cx("wireframe__stat-content")}>
                <div className={cx("wireframe__stat-value")} />
                <div className={cx("wireframe__stat-label")} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className={cx("wireframe__main-area")}>
          {/* Chart Section */}
          <div ref={chartRef} className={cx("wireframe__chart-section")}>
            <div className={cx("wireframe__chart-header")}>
              <div className={cx("wireframe__chart-title")} />
              <div className={cx("wireframe__chart-actions")}>
                <div className={cx("wireframe__chart-action")} />
                <div className={cx("wireframe__chart-action")} />
              </div>
            </div>
            <div className={cx("wireframe__chart-content")} />
          </div>

          {/* Table Section */}
          <div ref={tableRef} className={cx("wireframe__table-section")}>
            <div className={cx("wireframe__table-header")}>
              {[...Array(4)].map((_, index) => (
                <div
                  key={`header-${index}`}
                  className={cx("wireframe__table-col")}
                />
              ))}
            </div>
            {[...Array(5)].map((_, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={cx("wireframe__table-row")}
              >
                {[...Array(4)].map((_, colIndex) => (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={cx("wireframe__table-cell")}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWireframe;
