import classNames from "classnames/bind";
import Solution, { SolutionLayout } from "../Solution";
import styles from "./SolutionsModule.module.scss";
import Typography from "../../_components/Typography";
import {
  DesignIcon,
  DevelopmentIcon,
  RocketIllustration,
} from "../../_components/SolutionCard/SolutionIcons";
import CodeEditorAnimation from "../../_components/animations/CodeEditorAnimation";
import LandingWireframe from "../../_components/animations/LandingWireframe";

const cx = classNames.bind(styles);

const getIconComponent = (id: string) => {
  switch (id) {
    case "web-design-solution":
      return <DesignIcon />;
    case "web-development-solution":
      return <RocketIllustration />;
    default:
      return <DesignIcon />;
  }
};

const getAnimationComponent = (id: string) => {
  switch (id) {
    case "web-design-solution":
      return LandingWireframe;
    case "web-development-solution":
      return CodeEditorAnimation;
    default:
      return LandingWireframe;
  }
};

// Define types for solution data structure
interface SolutionFeature {
  title: string;
  description: string;
}

interface SolutionData {
  id: string;
  title: string;
  description: string;
  features: SolutionFeature[];
  icon?: React.ReactNode;
  AnimationComponent?: React.ComponentType<any>;
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
}

export const SolutionsModule = ({
  alternateLayouts = true,
  solutionLayout,
  dictionary,
}: SolutionsModuleProps) => {
  // Use dictionary data when available, otherwise use hardcoded defaults
  const solutionsData = dictionary?.solutions || [
    {
      id: "web-design-solution",
      title: "Web Design",
      description:
        "Design to us is not only effective, efficient and visually pleasing screens, but motion design with its live animations as well as entertaining illustrations.",
      features: [
        {
          title: "Advanced UX/UI Design",
          description:
            "User-focused design, refined via research, wireframing, and prototyping to achieve seamless form and function.",
        },
        {
          title: "Design Systems",
          description:
            "Consistent frameworks with reusable components and style guides ensuring scalability across all touchpoints.",
        },
        {
          title: "Custom Animations",
          description:
            "Purposeful motion design that enhances interactions and brings interfaces to life while improving usability.",
        },
      ],
    },
    {
      id: "web-development-solution",
      title: "Web Development",
      description:
        "We build robust and scalable web solutions using cutting-edge technologies and best practices.",
      features: [
        {
          title: "Modern Architecture",
          description:
            "Future-proof solutions using microservices and cloud-native tech for maximum scalability and maintainability.",
        },
        {
          title: "Clean Code",
          description:
            "Clean, documented code with automated tests and CI ensures long-term quality.",
        },
        {
          title: "Optimized Performance",
          description:
            "Lightning-fast web experiences via code splitting, caching, and performance monitoring.",
        },
      ],
    },
  ];

  // Calculamos el offset global para cada solución
  // Sumamos la cantidad de features de las soluciones anteriores
  let globalFeatureOffset = 0;

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
          {dictionary?.title || "Solutions that drive impact"}
        </Typography>
        <Typography
          variant="p1"
          color="tertiary"
          theme="dark"
          fontWeight={300}
          fontFamily="usual"
          className={cx("solutions__subtitle")}
        >
          {dictionary?.subtitle ||
            "Each project is an opportunity to create lasting impact"}
        </Typography>
      </div>

      <ul className={cx("solutions")}>
        {solutionsData.map((solution, index) => {
          // Calculamos el offset sumando las features de las soluciones anteriores
          const offset = globalFeatureOffset;
          globalFeatureOffset += solution.features.length;

          let itemLayout = solutionLayout;
          if (!itemLayout && alternateLayouts) {
            itemLayout = index % 2 === 0 ? "card-left" : "card-right";
          } else if (!itemLayout) {
            itemLayout = "card-left";
          }

          // Add the icon based on solution id
          const solutionWithIcon: SolutionData = {
            ...solution,
            icon: getIconComponent(solution.id),
            AnimationComponent: getAnimationComponent(solution.id),
          };

          return (
            <li key={index} className={cx("solutions__item")}>
              <Solution
                word="with gsap"
                solution={solutionWithIcon}
                // layout={itemLayout}
                AnimationComponent={
                  solutionWithIcon.AnimationComponent || LandingWireframe
                }
                featureOffset={offset} // Pasamos el offset global a cada solución
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SolutionsModule;
