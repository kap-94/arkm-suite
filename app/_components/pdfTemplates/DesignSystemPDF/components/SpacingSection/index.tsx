// components/DesignSystemPDF/sections/Spacing.tsx
import React, { FC } from "react";
import classnames from "classnames/bind";
import { BaseTemplateProps } from "../../../../../_services/pdfService.types";
import Typography from "../../../../Typography";
import styles from "./SpacingSection.module.scss";

interface SpacingItem {
  name: string;
  value: number;
  description: string;
}

interface SpacingSectionProps extends BaseTemplateProps {
  data: {
    title: string;
    spacingScale: SpacingItem[];
    unitsLabel: string;
  };
}

const cx = classnames.bind(styles);

export const SpacingSection: FC<SpacingSectionProps> = ({ data }) => {
  const { title, spacingScale, unitsLabel } = data;

  return (
    <div className={cx("spacing")}>
      <Typography
        variant="h3"
        fontWeight={400}
        className={cx("spacing__title")}
      >
        {title}
      </Typography>

      <div className={cx("spacing__grid")}>
        {spacingScale.map((item) => (
          <div key={item.name} className={cx("spacing__item")}>
            <div className={cx("spacing__preview-container")}>
              <div
                className={cx("spacing__preview")}
                style={{ width: `${item.value}px` }}
              />
            </div>
            <div className={cx("spacing__info")}>
              <Typography
                variant="p3"
                fontWeight={500}
                color="secondary"
                className={cx("spacing__value")}
              >
                {item.value}
                {unitsLabel}
              </Typography>
              <Typography
                variant="p3"
                color="tertiary"
                className={cx("spacing__description")}
              >
                {item.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
