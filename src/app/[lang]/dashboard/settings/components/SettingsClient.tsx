"use client";

import classNames from "classnames/bind";
import { SettingsIcon } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { PageHeader } from "@/components/PageHeader";
import { AppearanceToggle, LanguageToggle } from "./SettingsToggleGroup";
import styles from "../page.module.scss";
import type { SettingsDictionary } from "@/types/dictionary";

const cx = classNames.bind(styles);

interface Section {
  id: keyof typeof SECTIONS;
  Component: React.ComponentType<{ settings: SettingsDictionary }>;
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
        <ThemedTypography variant="h4" gutterBottom>
          {title}
        </ThemedTypography>
        <ThemedTypography variant="p2" color="secondary" gutterBottom>
          {description}
        </ThemedTypography>
      </div>
      <div className={cx("settings__section-content")}>{children}</div>
    </div>
  );
}

interface SettingsClientProps {
  settings: SettingsDictionary;
}

export function SettingsClient({ settings }: SettingsClientProps) {
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

  return (
    <div className={cx("settings")}>
      <PageHeader
        icon={<SettingsIcon size={22} />}
        title={settings.title}
        subtitle={settings.subtitle}
        theme={{ type: theme }}
      />
      <div className={cx("settings__content")}>
        {SETTINGS_SECTIONS.map(({ id, Component }) => (
          <SettingsSection
            key={id}
            title={settings[id].title}
            description={settings[id].description}
          >
            <Component settings={settings} />
          </SettingsSection>
        ))}
      </div>
    </div>
  );
}
