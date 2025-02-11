import classNames from "classnames/bind";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import styles from "./DocumentationSection.module.scss";
import { DocumentationSectionProps } from "../pages/DocumentationPage/types";

const cx = classNames.bind(styles);

export function DocumentationSection({
  section,
  commonLabels,
  theme,
}: DocumentationSectionProps) {
  const handleFeatureClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 88;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cx("section", `section--theme-${theme.type}`)}>
      {/* Section Header */}
      <div className={cx("section__header")}>
        <ThemedTypography
          variant="h2"
          fontWeight={500}
          className={cx("section__title")}
        >
          {section.title}
        </ThemedTypography>
        <ThemedTypography
          variant="p1"
          color="secondary"
          className={cx("section__description")}
        >
          {section.description}
        </ThemedTypography>
      </div>

      {/* Features */}
      <div className={cx("section__features")}>
        <ThemedTypography
          variant="h3"
          fontWeight={500}
          className={cx("section__features-title")}
        >
          {commonLabels.features}
        </ThemedTypography>
        <div className={cx("section__features-grid")}>
          {section.features.map((feature, index) => (
            <div
              key={index}
              className={cx("section__feature-card")}
              onClick={() => handleFeatureClick(`feature-${index}`)} // Manejador de clic
              role="button" // Para indicar que es clickeable
              tabIndex={0} // Para hacerlo enfocable
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleFeatureClick(`feature-${index}`);
                }
              }}
            >
              <ThemedTypography
                variant="p2"
                fontWeight={500}
                className={cx("section__feature-title")}
              >
                {feature.title}
              </ThemedTypography>
              <ThemedTypography
                variant="p2"
                color="tertiary"
                className={cx("section__feature-description")}
              >
                {feature.description}
              </ThemedTypography>
            </div>
          ))}
        </div>
      </div>

      {/* Extended Description and Images */}
      <div className={cx("section__extended-content")}>
        {section.features.map((feature, index) => (
          <div
            key={index}
            id={`feature-${index}`} // ID único para cada bloque
            className={cx("section__extended-item")}
          >
            {/* Extended Title */}
            {feature.extendedTitle && (
              <div className={cx("section__extended-title-wrapper")}>
                <ThemedTypography
                  variant="h4"
                  fontWeight={500}
                  className={cx("section__extended-title")}
                >
                  {feature.extendedTitle}
                </ThemedTypography>
              </div>
            )}

            {/* Extended Description */}
            {feature.extendedDescription && (
              <div className={cx("section__extended-description-wrapper")}>
                <ThemedTypography
                  variant="p1"
                  color="secondary"
                  className={cx("section__extended-description")}
                >
                  {feature.extendedDescription}
                </ThemedTypography>
              </div>
            )}

            {/* Images */}
            {feature.image && (
              <div className={cx("section__feature-image-wrapper")}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className={cx("section__feature-image")}
                />
              </div>
            )}

            {theme.type === "light" && feature.imageLight && (
              <div className={cx("section__feature-image-wrapper")}>
                <img
                  src={feature.imageLight}
                  alt={feature.title}
                  className={cx("section__feature-image")}
                />
              </div>
            )}

            {theme.type === "dark" && feature.imageDark && (
              <div className={cx("section__feature-image-wrapper")}>
                <img
                  src={feature.imageDark}
                  alt={feature.title}
                  className={cx("section__feature-image")}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Usage Guide */}
      <div className={cx("section__usage")}>
        <ThemedTypography
          variant="h3"
          fontWeight={500}
          className={cx("section__usage-title")}
        >
          {commonLabels.usage}
        </ThemedTypography>
        <div className={cx("section__steps")}>
          {section.usage.map((step, index) => (
            <div key={index} className={cx("section__step")}>
              <div className={cx("section__step-number")}>
                <ThemedTypography variant="p2" color="primary">
                  {index + 1}
                </ThemedTypography>
              </div>
              <div className={cx("section__step-content")}>
                <ThemedTypography
                  variant="h5"
                  fontWeight={500}
                  color="secondary"
                  className={cx("section__step-title")}
                >
                  {step.step}
                </ThemedTypography>
                <ThemedTypography
                  variant="p2"
                  color="secondary"
                  className={cx("section__step-description")}
                >
                  {step.description}
                </ThemedTypography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DocumentationSection;
