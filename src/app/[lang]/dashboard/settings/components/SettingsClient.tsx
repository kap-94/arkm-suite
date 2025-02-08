"use client";

import classNames from "classnames/bind";
import { SettingsIcon } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { PageHeader } from "@/components/PageHeader";
import { ModernPattern } from "@/components/ModernPattern";
import { AppearanceToggle, LanguageToggle } from "./SettingsToggleGroup";
import styles from "../page.module.scss";
import { PatternTheme, PatternVariant } from "@/components/ModernPattern/types";
import { SettingsDictionary } from "@/types/dictionary/settings.types";

const cx = classNames.bind(styles);

interface Section {
  id: keyof typeof SECTIONS;
  Component: React.ComponentType<{ dict: SettingsDictionary }>;
}

const SECTIONS = {
  appearance: AppearanceToggle,
  language: LanguageToggle,
} as const;

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <div className={cx("settings__section")}>
      <div className={cx("settings__section-header")}>
        <ThemedTypography variant="h4" color="primary" fontWeight={400}>
          {title}
        </ThemedTypography>
        <ThemedTypography variant="p1" fontWeight={400} color="secondary">
          {description}
        </ThemedTypography>
      </div>
      <div className={cx("settings__section-content")}>{children}</div>
    </div>
  );
}

interface SettingsClientProps {
  dictionary: SettingsDictionary;
}

export function SettingsClient({ dictionary }: SettingsClientProps) {
  const { theme } = useSettings();

  const SETTINGS_SECTIONS: Section[] = [
    {
      id: "appearance",
      Component: SECTIONS.appearance,
    },
    {
      id: "language",
      Component: SECTIONS.language,
    },
  ];

  const patternTheme: PatternTheme = {
    type: theme,
    variant: "neuralNetwork",
    colors: {
      dark: {
        background: "transparent",
        primary: "rgba(255, 255, 255, 0.15)",
        secondary: "rgba(255, 255, 255, 0.25)",
        accent: "rgba(255, 255, 255, 0.2)",
      },
      light: {
        background: "transparent",
        primary: "rgba(0, 0, 0, 0.15)",
        secondary: "rgba(0, 0, 0, 0.25)",
        accent: "rgba(0, 0, 0, 0.2)",
      },
    },
    opacity: {
      lines: 0.3,
      particles: 0.4,
      connections: 0.3,
      shapes: 0.35,
    },
  };

  return (
    <div className={cx("settings")}>
      {/* Patrón de fondo */}
      <div className={cx("settings__pattern-background")}>
        {/* <ModernPattern theme={patternTheme} /> */}
      </div>

      <PageHeader
        icon={<SettingsIcon size={22} />}
        title={dictionary.header.title}
        subtitle={dictionary.header.subtitle}
        theme={{ type: theme }}
      />
      <div className={cx("settings__content")}>
        {SETTINGS_SECTIONS.map(({ id, Component }) => (
          <SettingsSection
            key={id}
            title={dictionary.sections[id].title}
            description={dictionary.sections[id].description}
          >
            <Component dict={dictionary} />
          </SettingsSection>
        ))}
      </div>
    </div>
  );
}
