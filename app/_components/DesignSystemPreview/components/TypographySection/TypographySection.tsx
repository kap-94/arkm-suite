import React, { FC } from "react";
import classNames from "classnames/bind";
import { ThemeConfig } from "../../types";
import { ThemedTypography } from "../../../Typography/ThemedTypography";
import styles from "./TypographySection.module.scss";
import { TypographyVariant } from "../../../Typography/types";

const cx = classNames.bind(styles);

interface TypographySectionProps {
  theme: ThemeConfig;
  typographyStyles: Array<{
    name: string;
    variant: TypographyVariant;
    specs: string;
    label: string;
    displayText: string;
  }>;
  labels: {
    title: string;
    sampleText: string;
  };
}

export const TypographySection: FC<TypographySectionProps> = ({
  theme,
  typographyStyles,
  labels,
}) => {
  return (
    <section className={cx("typography-section")}>
      <ThemedTypography
        variant="h5"
        fontWeight={500}
        color="secondary"
        noWrap
        className={cx("typography-section__title")}
      >
        {labels.title}
      </ThemedTypography>
      <div className={cx("typography-section__content")}>
        {typographyStyles.map((type) => (
          <div key={type.name} className={cx("typography-section__item")}>
            <div className={cx("typography-section__meta")}>
              <ThemedTypography variant="p2" color="secondary" fontWeight={600}>
                {type.label}
              </ThemedTypography>
              <ThemedTypography variant="p3" color="secondary" fontWeight={500}>
                {type.specs}
              </ThemedTypography>
            </div>
            <div className={cx("typography-section__preview")}>
              <ThemedTypography variant={type.variant}>
                {type.displayText || labels.sampleText}
              </ThemedTypography>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
