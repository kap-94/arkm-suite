import React, { FC, useState } from "react";
import classNames from "classnames/bind";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { ThemeConfig } from "../../types";
import styles from "./ColorSection.module.scss";
import Typography from "@/components/Typography";

const cx = classNames.bind(styles);

interface ColorSectionProps {
  theme: ThemeConfig;
  colorPalette: {
    [category: string]: {
      colors: {
        [name: string]: string;
      };
      label: string;
    };
  };
  labels: {
    title: string;
    copiedText: string;
  };
}

export const ColorSection: FC<ColorSectionProps> = ({
  theme,
  colorPalette,
  labels,
}) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = (color: string): void => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <section className={cx("color-section")}>
      <div className={cx("color-section__content")}>
        {Object.entries(colorPalette).map(([category, { colors, label }]) => (
          <div key={category} className={cx("color-section__category")}>
            <ThemedTypography
              variant="h4"
              fontWeight={500}
              color="secondary"
              textTransform="capitalize"
              noWrap
              className={cx("color-section__category-title")}
            >
              {label}
            </ThemedTypography>
            <div className={cx("color-section__grid")}>
              {Object.entries(colors).map(([name, value]) => (
                <div
                  key={name}
                  className={cx("color-section__item")}
                  onClick={() => handleCopyColor(value)}
                >
                  <div
                    className={cx("color-section__preview")}
                    style={{ backgroundColor: value }}
                  >
                    {copiedColor === value && (
                      <Typography
                        theme={{ type: "dark" }}
                        variant="p1"
                        fontWeight={400}
                        className={cx("color-section__copied")}
                      >
                        {labels.copiedText}
                      </Typography>
                    )}
                  </div>
                  <div className={cx("color-section__info")}>
                    <ThemedTypography
                      variant="p2"
                      fontWeight={500}
                      color="tertiary"
                    >
                      {name}
                    </ThemedTypography>
                    <ThemedTypography
                      variant="p2"
                      fontWeight={500}
                      color="tertiary"
                    >
                      {value}
                    </ThemedTypography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
