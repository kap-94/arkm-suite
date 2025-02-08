// components/DesignSystemPDF/sections/ColorPalette.tsx
import React, { FC } from "react";
import classnames from "classnames/bind";
import Typography from "@/components/Typography";
import styles from "./ColorPalette.module.scss";
import { BaseTemplateProps } from "@/services/pdfService.types";

interface ColorPaletteProps extends BaseTemplateProps {
  data: {
    title: string;
    colorPalette: Record<
      string,
      {
        colors: Record<string, string>;
        label: string;
      }
    >;
  };
}

const cx = classnames.bind(styles);

export const ColorPalette: FC<ColorPaletteProps> = ({ data }) => {
  const { title, colorPalette } = data;

  return (
    <div className={cx("color-palette")}>
      <Typography
        variant="h3"
        fontWeight={400}
        className={cx("color-palette__title")}
      >
        {title}
      </Typography>

      <div className={cx("color-palette__content")}>
        {Object.entries(colorPalette).map(([category, { colors, label }]) => (
          <div key={category} className={cx("color-palette__category")}>
            <Typography
              variant="h5"
              fontWeight={500}
              color="secondary"
              className={cx("color-palette__category-title")}
            >
              {label}
            </Typography>

            <div className={cx("color-palette__grid")}>
              {Object.entries(colors).map(([name, value]) => (
                <div key={name} className={cx("color-palette__item")}>
                  <div
                    className={cx("color-palette__preview")}
                    style={{ backgroundColor: value }}
                  />
                  <div className={cx("color-palette__info")}>
                    <Typography variant="p2" fontWeight={500}>
                      {name}
                    </Typography>
                    <Typography variant="p2" fontWeight={500}>
                      {value}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
