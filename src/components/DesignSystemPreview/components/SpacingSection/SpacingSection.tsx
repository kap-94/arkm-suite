import React, { FC } from "react";
import classNames from "classnames/bind";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { ThemeConfig } from "../../types";
import styles from "./SpacingSection.module.scss";

const cx = classNames.bind(styles);

interface SpacingSectionProps {
  theme: ThemeConfig;
  spacingScale: Array<{
    name: string;
    value: number;
    description: string;
    label: string;
  }>;
  labels: {
    title: string;
    unitsLabel: string;
  };
}

export const SpacingSection: FC<SpacingSectionProps> = ({
  theme,
  spacingScale,
  labels,
}) => {
  return (
    <section className={cx("spacing-section")}>
      <ThemedTypography
        variant="h4"
        fontWeight={500}
        color="secondary"
        noWrap
        className={cx("spacing-section__title")}
      >
        {labels.title}
      </ThemedTypography>
      <div className={cx("spacing-section__content")}>
        {spacingScale.map((token) => (
          <div key={token.name} className={cx("spacing-section__item")}>
            <ThemedTypography variant="p2" color="secondary" fontWeight={400}>
              {token.label}
            </ThemedTypography>
            <div
              className={cx("spacing-section__preview")}
              style={{ width: token.value, height: token.value }}
            />
            <ThemedTypography variant="p3" fontWeight={500} color="secondary">
              {token.value}
              {labels.unitsLabel}
            </ThemedTypography>
            <ThemedTypography
              variant="p3"
              color="tertiary"
              className={cx("spacing-section__description")}
            >
              {token.description}
            </ThemedTypography>
          </div>
        ))}
      </div>
    </section>
  );
};
