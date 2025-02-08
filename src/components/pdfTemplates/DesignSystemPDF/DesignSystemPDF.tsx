import { FC } from "react";
import classnames from "classnames/bind";
import styles from "./DesignSystemPDF.module.scss";
import { DesignSystemContent } from "@/types/models/ComponentContent";
import Typography from "@/components/Typography";

export interface DesignSystemPDFProps {
  data: DesignSystemContent;
}

const cx = classnames.bind(styles);

const ColorPalette: FC<{
  title: string;
  colorPalette: DesignSystemContent["colorPalette"];
}> = ({ title, colorPalette }) => {
  return (
    <div className={cx("design-system__section")}>
      <Typography
        variant="h3"
        fontWeight={400}
        className={cx("design-system__section-title")}
      >
        {title}
      </Typography>
      <div className={cx("design-system__color-content")}>
        {Object.entries(colorPalette).map(([category, { colors, label }]) => (
          <div key={category} className={cx("design-system__color-category")}>
            <Typography
              variant="h5"
              fontWeight={400}
              className={cx("design-system__color-category-title")}
            >
              {label}
            </Typography>
            <div className={cx("design-system__color-grid")}>
              {Object.entries(colors).map(([name, value]) => (
                <div key={name} className={cx("design-system__color-item")}>
                  <div
                    className={cx("design-system__color-preview")}
                    style={{ backgroundColor: value }}
                  />
                  <div className={cx("design-system__color-info")}>
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

const TypographySection: FC<{
  title: string;
  typographyStyles: DesignSystemContent["typographyStyles"];
  sampleText: string;
}> = ({ title, typographyStyles, sampleText }) => (
  <div className={cx("design-system__section")}>
    <Typography
      variant="h3"
      fontWeight={400}
      className={cx("design-system__section-title")}
    >
      {title}
    </Typography>
    {typographyStyles.map((style) => (
      <div key={style.name} className={cx("design-system__typography-item")}>
        <div className={cx("design-system__typography-item-info")}>
          <Typography variant="p2" color="secondary" fontWeight={600}>
            {style.label}
          </Typography>
          <Typography variant="p3" color="secondary" fontWeight={500}>
            {style.specs}
          </Typography>
        </div>

        <Typography variant={style.variant}>{title}</Typography>
        {/* <div className={cx("design-system__typography-preview")}>
          {style.displayText}
        </div> */}
      </div>
    ))}
  </div>
);

const Spacing: FC<{
  title: string;
  spacingScale: DesignSystemContent["spacingScale"];
  unitsLabel: string;
}> = ({ title, spacingScale, unitsLabel }) => (
  <div className={cx("design-system__section")}>
    <Typography
      variant="h3"
      fontWeight={400}
      className={cx("design-system__section-title")}
    >
      {title}
    </Typography>
    <div className={cx("design-system__spacing-grid")}>
      {spacingScale.map((item) => (
        <div key={item.name} className={cx("design-system__spacing-item")}>
          <div
            className={cx("design-system__spacing-item-box")}
            style={{ width: `${item.value}px` }}
          />
          <div className={cx("design-system__spacing-item-info")}>
            <Typography variant="p3" fontWeight={500} color="secondary">
              {item.value}
              {unitsLabel}
            </Typography>
            <Typography
              variant="p3"
              color="tertiary"
              className={cx("spacing-section__description")}
            >
              {item.description}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DesignSystemPDF: FC<DesignSystemPDFProps> = ({ data }) => {
  const { labels, colorPalette, typographyStyles, spacingScale } = data;

  return (
    <div className={cx("design-system__container")}>
      <ColorPalette title={labels.colors.title} colorPalette={colorPalette} />
      <TypographySection
        title={labels.typography.title}
        typographyStyles={typographyStyles}
        sampleText={labels.typography.sampleText}
      />
      <Spacing
        title={labels.spacing.title}
        spacingScale={spacingScale}
        unitsLabel={labels.spacing.unitsLabel}
      />
    </div>
  );
};

export default DesignSystemPDF;
