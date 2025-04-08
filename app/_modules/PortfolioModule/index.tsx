"use client";

import dynamic from "next/dynamic";
import classNames from "classnames/bind";
import { PortfolioDictionary } from "@/app/_types/dictionary/portfolio.types";
import { LayoutType } from "@/app/_components/DynamicLayout/DynamicLayoutWithElements";
import SectionHeading from "@/app/_components/SectionHeading";
import styles from "./PortfolioModule.module.scss";

const cx = classNames.bind(styles);

// Pre-renderizamos los esqueletos para que estén disponibles inmediatamente
// y evitar cambios en el layout
const ProjectSkeleton = ({
  layout = "left-right",
}: {
  layout?: LayoutType;
} = {}) => (
  <div
    className={cx("project-skeleton", `project-skeleton--${layout}`)}
    aria-hidden="true"
  >
    <div className={cx("project-skeleton__card")}></div>
    <div className={cx("project-skeleton__images")}></div>
  </div>
);

const ImagesGridSkeleton = () => (
  <div className={cx("images-grid-skeleton")}>
    <div className={cx("images-grid-skeleton__main")}></div>
    <div className={cx("images-grid-skeleton__secondary-container")}>
      <div className={cx("images-grid-skeleton__secondary")}></div>
      <div className={cx("images-grid-skeleton__secondary")}></div>
    </div>
  </div>
);

import type { DynamicLayoutProps } from "@/app/_components/DynamicLayout/DynamicLayoutWithElements";

// Dynamically import components with loading fallbacks and correct type
const DynamicLayout = dynamic<DynamicLayoutProps>(
  () => import("@/app/_components/DynamicLayout/DynamicLayoutWithElements"),
  {
    ssr: false,
    loading: () => <ProjectSkeleton />,
  }
);

const PortfolioCard = dynamic(() => import("@/app/_components/PortfolioCard"), {
  ssr: false,
});

const PortfolioImagesGrid = dynamic(
  () => import("@/app/_components/PortfolioImagesGrid"),
  {
    ssr: false,
    loading: () => <ImagesGridSkeleton />,
  }
);

export const layoutOptions = {
  LEFT_RIGHT: "left-right" as const,
  RIGHT_LEFT: "right-left" as const,
};

interface PortfolioModuleProps {
  alternateLayouts?: boolean;
  defaultLayout?: LayoutType;
  dictionary?: PortfolioDictionary;
  style?: React.CSSProperties;
  className?: string;
}

export function PortfolioModule({
  alternateLayouts = true,
  defaultLayout,
  dictionary,
  style,
  className,
}: PortfolioModuleProps) {
  const projectsData = dictionary?.projects || [];

  const dynamicHeight = Math.max(600, (projectsData.length || 1) * 550);

  if (projectsData.length === 0) {
    return (
      <section
        id="portfolio"
        className={cx("container", className)}
        style={{
          ...style,
          minHeight: dynamicHeight,
        }}
      >
        <SectionHeading
          title={dictionary?.title || "My Recent Projects"}
          subtitle={dictionary?.subtitle}
          align="center"
          className={cx("portfolio__header")}
          titleProps={{
            className: cx("portfolio__title"),
          }}
          subtitleProps={{
            className: cx("portfolio__subtitle"),
          }}
        />
        <div className={cx("projects-placeholder")}>
          <ProjectSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section
      className={cx("container", className)}
      style={{
        ...style,
        minHeight: dynamicHeight,
        height: "auto",
      }}
    >
      <SectionHeading
        title={dictionary?.title || "My Recent Projects"}
        subtitle={dictionary?.subtitle}
        align="center"
        className={cx("portfolio__header")}
        titleProps={{
          className: cx("portfolio__title"),
        }}
        subtitleProps={{
          className: cx("portfolio__subtitle"),
        }}
      />

      <ul className={cx("projects")}>
        {projectsData.map((project, index) => {
          const layout =
            defaultLayout ||
            (alternateLayouts
              ? index % 2 === 0
                ? layoutOptions.LEFT_RIGHT
                : layoutOptions.RIGHT_LEFT
              : layoutOptions.LEFT_RIGHT);

          // Determine if the card should be right-aligned based on layout
          const isCardRightAligned = layout === layoutOptions.RIGHT_LEFT;

          return (
            <li key={project.id} className={cx("projects__item")}>
              <div className={cx("project-wrapper")}>
                <DynamicLayout
                  leftComponent={
                    <PortfolioCard
                      {...project}
                      projectNumber={index + 1}
                      className={cx("project__card")}
                      isRightAligned={isCardRightAligned} // Pass alignment prop
                    />
                  }
                  rightComponent={
                    <PortfolioImagesGrid
                      overlay
                      images={project.images}
                      liveUrl={project.liveUrl}
                      className={cx("project__images")}
                    />
                  }
                  layout={layout}
                  itemNumber={index + 1}
                  containerClassName={cx("projectLayout", {
                    "projectLayout--card-left":
                      layout === layoutOptions.LEFT_RIGHT,
                    "projectLayout--card-right":
                      layout === layoutOptions.RIGHT_LEFT,
                  })}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default PortfolioModule;
