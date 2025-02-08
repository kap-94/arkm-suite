"use client";

import classNames from "classnames/bind";
import { Sun, Moon } from "lucide-react";
import type { Language } from "@/lib/config/i18n";
import { useSettings } from "@/context/SettingsContext";
import type { SettingsDictionary } from "@/types/dictionary/settings.types";
import { ToggleGroup, ToggleOption } from "@/components/ToggleGroup";
import type { ThemeType } from "@/components/Sidebar/types/sidebar.types";
import styles from "../page.module.scss";

const cx = classNames.bind(styles);

interface ToggleProps {
  dict: SettingsDictionary;
}

type ThemeIconKeys = "light" | "dark";

const themeIcons: Record<ThemeIconKeys, JSX.Element> = {
  light: <Sun size={18} />,
  dark: <Moon size={18} />,
} as const;

function isValidTheme(theme: string): theme is ThemeIconKeys {
  return theme in themeIcons;
}

function getLabel(label: unknown): string {
  if (typeof label === "string") return label;
  if (typeof label === "object" && label !== null && "label" in label) {
    return String((label as { label: unknown }).label || "");
  }
  return "";
}

export function AppearanceToggle({ dict }: ToggleProps) {
  const { theme, updateTheme } = useSettings();

  const options = Object.entries(dict.sections.appearance.options).map(
    ([key, label]): ToggleOption<ThemeType> => {
      const themeValue = key.replace("Mode", "").toLowerCase();
      const validThemeValue = isValidTheme(themeValue) ? themeValue : "light";
      const finalLabel = getLabel(label);

      return {
        value: validThemeValue as ThemeType,
        label: finalLabel || validThemeValue,
        ariaLabel: `Switch to ${
          finalLabel.toLowerCase() || validThemeValue
        } theme`,
        icon: themeIcons[validThemeValue],
      };
    }
  );

  return (
    <ToggleGroup<ThemeType>
      value={theme}
      onChange={updateTheme}
      options={options}
      theme={{ type: theme }}
      className={cx("settings__selector")}
    />
  );
}

const LANGUAGE_MAP = {
  spanish: "es",
  english: "en",
} as const;

const languageAriaLabels: Record<Language, string> = {
  es: "Español",
  en: "English",
} as const;

function getLanguageValue(key: string): Language {
  const normalized = key.toLowerCase();
  return (LANGUAGE_MAP[normalized as keyof typeof LANGUAGE_MAP] ||
    normalized) as Language;
}

export function LanguageToggle({ dict }: ToggleProps) {
  const { theme, language, updateLanguage } = useSettings();

  const options = Object.entries(dict.sections.language.options).map(
    ([key, label]): ToggleOption<Language> => {
      const langValue = getLanguageValue(key);
      const finalLabel = getLabel(label);

      return {
        value: langValue,
        label: finalLabel || languageAriaLabels[langValue],
        ariaLabel: languageAriaLabels[langValue],
      };
    }
  );

  return (
    <ToggleGroup<Language>
      value={language}
      onChange={updateLanguage}
      options={options}
      theme={{ type: theme }}
      className={cx("settings__selector")}
    />
  );
}
