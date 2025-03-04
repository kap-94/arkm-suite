// src/components/SolutionsModule/SolutionsModule.tsx
import classNames from "classnames/bind";
import Solution, { SolutionLayout } from "../Solution";
import styles from "./SolutionsModule.module.scss";
import Typography from "@/components/Typography";
import {
  DesignIcon,
  DevelopmentIcon,
  RocketIllustration,
} from "@/components/SolutionCard/SolutionIcons";
import WireframeAnimation from "@/components/animations/WireframeAnimation";
import CodeEditorAnimation from "@/components/animations/CodeEditorAnimation";

const cx = classNames.bind(styles);

export const solutionsData = [
  {
    id: "web-design-solution",
    icon: <DesignIcon />,
    title: "Web Design",
    description:
      "Design to us is not only effective, efficient and visually pleasing screens, but motion design with its live animations as well as entertaining illustrations.",
    features: [
      {
        title: "Advanced UX/UI Design",
        description:
          "Intuitive, user-centered designs that balance aesthetics and functionality through research, wireframing, and prototyping.",
      },
      {
        title: "Design Systems",
        description:
          "Consistent design frameworks with reusable components and style guides that ensure scalability across all touchpoints.",
      },
      {
        title: "Custom Animations",
        description:
          "Purposeful motion design that enhances interactions and brings interfaces to life while improving usability.",
      },
    ],
    AnimationComponent: WireframeAnimation,
  },
  {
    id: "web-development-solution",
    icon: <RocketIllustration />,
    title: "Web Development",
    description:
      "We build robust and scalable web solutions using cutting-edge technologies and best practices.",
    features: [
      {
        title: "Modern Architecture",
        description:
          "Future-proof solutions using microservices and cloud-native technologies for maximum scalability and maintainability.",
      },
      {
        title: "Clean Code",
        description:
          "Well-structured and documented code with automated testing and continuous integration for long-term quality.",
      },
      {
        title: "Optimized Performance",
        description:
          "Lightning-fast web experiences through code splitting, caching strategies, and performance monitoring.",
      },
    ],
    AnimationComponent: CodeEditorAnimation,
  },
];

interface SolutionsModuleProps {
  alternateLayouts?: boolean;
  solutionLayout?: SolutionLayout;
}

export const SolutionsModule = ({
  alternateLayouts = true,
  solutionLayout,
}: SolutionsModuleProps) => {
  return (
    <section id="showcase" className={cx("container")}>
      <div className={cx("solutions__header")}>
        <Typography
          variant="h2"
          fontFamily="kranto"
          fontWeight={400}
          color="primary"
          theme="dark"
          className={cx("solutions__title")}
        >
          Solutions that drive impact
        </Typography>
        <Typography
          variant="p1"
          color="tertiary"
          theme="dark"
          fontWeight={300}
          fontFamily="usual"
          className={cx("solutions__subtitle")}
        >
          Each project is an opportunity to create lasting impact
        </Typography>
      </div>

      <ul className={cx("solutions")}>
        {solutionsData.map((solution, index) => {
          let itemLayout = solutionLayout;
          if (!itemLayout && alternateLayouts) {
            itemLayout = index % 2 === 0 ? "card-left" : "card-right";
          } else if (!itemLayout) {
            itemLayout = "card-left";
          }

          return (
            <li key={index} className={cx("solutions__item")}>
              <Solution
                word="with gsap"
                solution={solution}
                // layout={itemLayout}
                layout="card-left"
                AnimationComponent={solution.AnimationComponent}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SolutionsModule;
