// MediaGalleryWireframe.tsx
import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";
import styles from "./MediaGalleryWireframe.module.scss";

const cx = classNames.bind(styles);

export const MediaGalleryWireframe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sidenavRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mediaCardsRef = useRef<HTMLDivElement[]>([]);
  const fabRef = useRef<HTMLButtonElement>(null);

  const addToMediaRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !mediaCardsRef.current.includes(el)) {
      mediaCardsRef.current[index] = el;
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

      // Sidenav Animation
      tl.fromTo(
        sidenavRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
        }
      );

      // Header Animation
      tl.fromTo(
        headerRef.current,
        {
          y: -30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        },
        "-=0.3"
      );

      // Media Cards Animation
      mediaCardsRef.current.forEach((card, index) => {
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
          `-=${index ? 0.3 : 0.2}`
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
      {/* Side Navigation */}
      <nav ref={sidenavRef} className={cx("wireframe__sidenav")}>
        <div className={cx("wireframe__logo")} />
        <div className={cx("wireframe__nav-menu")}>
          {[...Array(6)].map((_, index) => (
            <div key={`menu-${index}`} className={cx("wireframe__menu-item")}>
              <div className={cx("wireframe__menu-icon")} />
              <div className={cx("wireframe__menu-text")} />
            </div>
          ))}
        </div>
      </nav>

      <main className={cx("wireframe__main")}>
        {/* Search Header */}
        <header ref={headerRef} className={cx("wireframe__header")}>
          <div className={cx("wireframe__search")}>
            <div className={cx("wireframe__search-icon")} />
            <div className={cx("wireframe__search-bar")} />
          </div>
          <div className={cx("wireframe__filters")}>
            {[...Array(3)].map((_, index) => (
              <div
                key={`filter-${index}`}
                className={cx("wireframe__filter-chip")}
              />
            ))}
          </div>
        </header>

        {/* Media Grid */}
        <div className={cx("wireframe__media-grid")}>
          {[...Array(9)].map((_, index) => (
            <div
              key={`media-${index}`}
              ref={(el) => addToMediaRefs(el, index)}
              className={cx("wireframe__media-card")}
            >
              <div className={cx("wireframe__media-preview")} />
              <div className={cx("wireframe__media-info")}>
                <div className={cx("wireframe__media-title")} />
                <div className={cx("wireframe__media-meta")}>
                  <div className={cx("wireframe__media-date")} />
                  <div className={cx("wireframe__media-size")} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload FAB */}
        <button ref={fabRef} className={cx("wireframe__fab")}>
          <div className={cx("wireframe__fab-icon")} />
        </button>
      </main>
    </div>
  );
};

export default MediaGalleryWireframe;
