// components/DesignSystemPDF/sections/Typography.tsx
import React, { FC } from "react";
import classnames from "classnames/bind";
import { BaseTemplateProps } from "../../../../../_services/pdfService.types";
import { TypographyVariant } from "../../../../Typography/types";
import Typography from "../../../../Typography";
import styles from "./TypographySection.module.scss";

interface TypographyStyle {
  name: string;
  label: string;
  variant: TypographyVariant;
  specs: string;
}

interface TypographySectionProps extends BaseTemplateProps {
  data: {
    title: string;
    typographyStyles: TypographyStyle[];
    sampleText: string;
  };
}

const cx = classnames.bind(styles);

export const TypographySection: FC<TypographySectionProps> = ({ data }) => {
  const { title, typographyStyles, sampleText } = data;

  return (
    <div className={cx("typography")}>
      <Typography
        variant="h3"
        fontWeight={400}
        className={cx("typography__title")}
      >
        {title}
      </Typography>

      <div className={cx("typography__content")}>
        {typographyStyles.map((style) => (
          <div key={style.name} className={cx("typography__item")}>
            <div className={cx("typography__meta")}>
              <Typography
                variant="p2"
                color="secondary"
                fontWeight={600}
                className={cx("typography__label")}
              >
                {style.label}
              </Typography>
              <Typography
                variant="p3"
                color="secondary"
                fontWeight={500}
                className={cx("typography__specs")}
              >
                {style.specs}
              </Typography>
            </div>
            <div className={cx("typography__preview")}>
              <Typography variant={style.variant}>{sampleText}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
