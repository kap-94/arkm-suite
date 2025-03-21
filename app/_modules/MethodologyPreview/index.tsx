import classNames from "classnames/bind";
import { Typography } from "@/app/_components/Typography";
import {
  ResearchIcon,
  VisualDirectionIcon,
  UIDesignIcon,
  DevelopmentIcon,
  LaunchIcon,
  MaintenanceIcon,
} from "./MethodologyIcons";
import styles from "./MethodologyPreview.module.scss";

const cx = classNames.bind(styles);

interface MethodologyStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface MethodologyDictionary {
  title: string;
  steps: {
    research: {
      title: string;
      description: string;
    };
    visualDirection: {
      title: string;
      description: string;
    };
    uiDesign: {
      title: string;
      description: string;
    };
    development: {
      title: string;
      description: string;
    };
    launch: {
      title: string;
      description: string;
    };
    maintenance: {
      title: string;
      description: string;
    };
  };
}

interface MethodologyPreviewProps {
  dictionary?: MethodologyDictionary;
}

export const MethodologyPreview = ({ dictionary }: MethodologyPreviewProps) => {
  const methodologySteps: MethodologyStep[] = [
    {
      title: dictionary?.steps.research.title || "Research",
      description:
        dictionary?.steps.research.description ||
        "We analyze your brand essence and market position via targeted dialogues to create a strong foundation, identifying opportunities that set your brand apart.",
      icon: <ResearchIcon />,
    },
    {
      title: dictionary?.steps.visualDirection.title || "Visual Direction",
      description:
        dictionary?.steps.visualDirection.description ||
        "Our team crafts an exceptional visual identity by exploring colors, graphics, and UI patterns that resonate with your audience and express your brand values.",
      icon: <VisualDirectionIcon />,
    },
    {
      title: dictionary?.steps.uiDesign.title || "UI Design",
      description:
        dictionary?.steps.uiDesign.description ||
        "We create a robust design system and refine each page until the interface is visually harmonious and usable, ensuring every element functions effectively.",
      icon: <UIDesignIcon />,
    },
    {
      title: dictionary?.steps.development.title || "Development",
      description:
        dictionary?.steps.development.description ||
        "Using the React ecosystem, we deliver an exceptionally pixel-perfect website that works flawlessly on all devices, with code fully optimized for speed and SEO.",
      icon: <DevelopmentIcon />,
    },
    {
      title: dictionary?.steps.launch.title || "Launch",
      description:
        dictionary?.steps.launch.description ||
        "ARKM guides you through deployment with support on hosting, CI/CD pipelines, and content migration, implementing testing to ensure peak performance.",
      icon: <LaunchIcon />,
    },
    {
      title: dictionary?.steps.maintenance.title || "Maintenance",
      description:
        dictionary?.steps.maintenance.description ||
        "Our partnership continues with technical support, updates, and improvements to keep your site cutting-edge, providing analytics to evolve your digital presence.",
      icon: <MaintenanceIcon />,
    },
  ];

  // Dividir los pasos en dos filas
  const firstRowSteps = methodologySteps.slice(0, 3);
  const secondRowSteps = methodologySteps.slice(3);

  return (
    <section className={cx("methodology")}>
      <div className={cx("methodology__backdrop")} aria-hidden="true">
        <div className={cx("methodology__grid")}></div>
      </div>

      <div className={cx("methodology__container")}>
        <div className={cx("methodology__header")}>
          <Typography
            variant="h2"
            color="primary"
            fontFamily="sofia"
            fontWeight={400}
            theme="dark"
            className={cx("methodology__title")}
            align="center"
          >
            {dictionary?.title ||
              "A step-by-step look at the process behind the result."}
          </Typography>
        </div>

        <div className={cx("methodology__rows-container")}>
          {/* Primera fila */}
          <div className={cx("methodology__row")}>
            {firstRowSteps.map((step, index) => (
              <div key={index} className={cx("methodology__step")}>
                <div className={cx("methodology__step-icon-container")}>
                  <div className={cx("methodology__step-icon")}>
                    {step.icon}
                  </div>
                </div>
                <div className={cx("methodology__step-content")}>
                  <div className={cx("methodology__step-header")}>
                    <Typography
                      variant="h3"
                      color="primary"
                      fontFamily="sofia"
                      fontWeight={500}
                      theme="dark"
                      className={cx("methodology__step-title")}
                    >
                      <span className={cx("methodology__step-number-inline")}>
                        {index + 1}.
                      </span>{" "}
                      {step.title}
                    </Typography>
                  </div>
                  <Typography
                    variant="p1"
                    color="secondary"
                    theme="dark"
                    fontWeight={400}
                    fontFamily="sofia"
                    className={cx("methodology__step-description")}
                  >
                    {step.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>

          {/* Segunda fila - Ahora con la misma estructura que la primera */}
          <div className={cx("methodology__row")}>
            {secondRowSteps.map((step, index) => (
              <div key={index} className={cx("methodology__step")}>
                <div className={cx("methodology__step-icon-container")}>
                  <div className={cx("methodology__step-icon")}>
                    {step.icon}
                  </div>
                </div>
                <div className={cx("methodology__step-content")}>
                  <div className={cx("methodology__step-header")}>
                    <Typography
                      variant="h3"
                      color="primary"
                      fontFamily="sofia"
                      fontWeight={500}
                      theme="dark"
                      className={cx("methodology__step-title")}
                    >
                      <span className={cx("methodology__step-number-inline")}>
                        {index + 4}.
                      </span>{" "}
                      {step.title}
                    </Typography>
                  </div>
                  <Typography
                    variant="p1"
                    color="secondary"
                    theme="dark"
                    fontWeight={400}
                    fontFamily="sofia"
                    className={cx("methodology__step-description")}
                  >
                    {step.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologyPreview;
