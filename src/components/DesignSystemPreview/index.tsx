import React, { FC, useState } from "react";
import classNames from "classnames/bind";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { ColorSection } from "./components/ColorSection/ColorSection";
import { TypographySection } from "./components/TypographySection/TypographySection";
import { SpacingSection } from "./components/SpacingSection/SpacingSection";
import { ComponentsSection } from "./components/ComponentsSection/ComponentsSection";
import { ThemeConfig } from "./types";
import { DesignSystemContent } from "@/types/models/ComponentContent";
import styles from "./DesignSystemPreview.module.scss";

const cx = classNames.bind(styles);

interface DesignSystemPreviewProps {
  data: DesignSystemContent;
  theme: ThemeConfig;
  initialSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

export const DesignSystemPreview: FC<DesignSystemPreviewProps> = ({
  data,
  theme,
  initialSection = "colors",
  onSectionChange,
}) => {
  const [activeSection, setActiveSection] = useState(initialSection);

  const sections = [
    { id: "colors", title: data.labels.colors.title },
    { id: "typography", title: data.labels.typography.title },
    { id: "spacing", title: data.labels.spacing.title },
    { id: "components", title: data.labels.components.buttons.title },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    onSectionChange?.(sectionId);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "colors":
        return (
          <ColorSection
            theme={theme}
            colorPalette={data.colorPalette}
            labels={data.labels.colors}
          />
        );
      case "typography":
        return (
          <TypographySection
            theme={theme}
            typographyStyles={data.typographyStyles}
            labels={data.labels.typography}
          />
        );
      case "spacing":
        return (
          <SpacingSection
            theme={theme}
            spacingScale={data.spacingScale}
            labels={data.labels.spacing}
          />
        );
      case "components":
        return (
          <ComponentsSection theme={theme} labels={data.labels.components} />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cx("design-system", `design-system--theme-${theme.type}`)}
      style={
        theme.type === "custom"
          ? ({
              "--ds-background": theme.colors?.background,
              "--ds-text": theme.colors?.text,
              "--ds-border": theme.colors?.border,
            } as React.CSSProperties)
          : undefined
      }
    >
      <nav className={cx("design-system__nav")}>
        {sections.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionChange(item.id)}
            className={cx("design-system__nav-item", {
              "design-system__nav-item--active": activeSection === item.id,
            })}
          >
            <ThemedTypography
              variant="h5"
              color="tertiary"
              fontWeight={300}
              noWrap
            >
              {item.title}
            </ThemedTypography>
          </button>
        ))}
      </nav>
      <div className={cx("design-system__content")}>{renderSection()}</div>
    </div>
  );
};

export default DesignSystemPreview;
