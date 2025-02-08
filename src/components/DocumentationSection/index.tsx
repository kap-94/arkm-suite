// components/DocumentationSection/DocumentationSection.tsx
import React from "react";
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
            <div key={index} className={cx("section__feature-card")}>
              <ThemedTypography
                variant="h5"
                // color="secondary"
                fontWeight={500}
                className={cx("section__feature-title")}
              >
                {feature.title}
              </ThemedTypography>
              <ThemedTypography
                variant="p2"
                color="secondary"
                className={cx("section__feature-description")}
              >
                {feature.description}
              </ThemedTypography>
              {/* {feature.image && (
                <img
                  src={feature.image}
                  alt={feature.title}
                  className={cx("section__feature-image")}
                />
              )} */}
            </div>
          ))}
        </div>
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
