import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Typography from "@/app/_components/Typography";
import styles from "./SolutionsModule.module.scss";
import SectionHeading from "@/app/_components/SectionHeading";

const DynamicSolution = dynamic(() => import("@/app/_modules/Solution"), {
  ssr: false,
  loading: () => <SolutionSkeleton />,
});

const SolutionSkeleton = ({
  layout = "card-left",
}: { layout?: SolutionLayout } = {}) => (
  <div
    className={`${styles["solution-skeleton"]} ${
      styles[`solution-skeleton--${layout}`]
    }`}
    aria-hidden="true"
  >
    <div className={styles["solution-skeleton__card"]}></div>
    <div className={styles["solution-skeleton__wireframe"]}></div>
  </div>
);

export type SolutionLayout = "card-left" | "card-right";
interface SolutionFeature {
  title: string;
  description: string;
}

interface SolutionData {
  id: string;
  title: string;
  description: string;
  features: SolutionFeature[];
}

interface SolutionsDictionary {
  title?: string;
  subtitle?: string;
  solutions?: SolutionData[];
}

interface SolutionsModuleProps {
  alternateLayouts?: boolean;
  solutionLayout?: SolutionLayout;
  dictionary?: SolutionsDictionary;
  customAnchorId?: string;
}

const animationComponentMap: Record<string, string> = {
  "fullstack-skills": "LandingWireframe",
  "frontend-development": "CodeEditorAnimation",
};

export function SolutionsModule({
  alternateLayouts = true,
  solutionLayout,
  dictionary,
  customAnchorId,
}: SolutionsModuleProps) {
  const solutionsData = dictionary?.solutions || [];

  return (
    <section id={customAnchorId} className={styles.container}>
      <div className={styles.solutions__header}>
        {/* <Typography
          variant="h2"
          fontFamily="sofia"
          fontWeight={500}
          color="primary"
          align="center"
          theme="dark"
          className={styles.solutions__title}
        >
          {dictionary?.title || "Solutions that drive impact"}
        </Typography> */}
        <SectionHeading
          title={dictionary?.title || "Solutions that drive impact"}
          subtitle={dictionary?.subtitle || "Paths Forged with Passion"}
          align="center"
          className={styles.methodology__heading}
        />
      </div>

      <ul className={styles.solutions}>
        {solutionsData.map((solution, index) => {
          const layout =
            solutionLayout ||
            (alternateLayouts
              ? index % 2 === 0
                ? "card-left"
                : "card-right"
              : "card-left");

          const animationComponentName =
            animationComponentMap[solution.id] || "LandingWireframe";

          return (
            <li key={solution.id} className={styles.solutions__item}>
              <div className={styles["solution-wrapper"]}>
                <DynamicSolution
                  solution={solution}
                  solutionNumber={index + 1}
                  // layout={layout}
                  animationComponentName={animationComponentName}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default SolutionsModule;
