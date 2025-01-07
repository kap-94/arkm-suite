"use client";

import { Sun, Moon } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { ToggleGroup } from "@/components/ToggleGroup";
import type { Language } from "@/config/i18n";
import type { ThemeType } from "@/components/Sidebar/types/sidebar.types";
import classNames from "classnames/bind";
import styles from "../page.module.scss";

const cx = classNames.bind(styles);

interface ToggleProps {
  settings: {
    appearance?: {
      options: Record<string, string>;
    };
    language?: {
      options: Record<string, string>;
    };
  };
}

// Definimos un tipo específico para las claves de los temas
type ThemeIconKeys = "light" | "dark";

// Aseguramos que themeIcons solo acepte las claves definidas
const themeIcons: Record<ThemeIconKeys, JSX.Element> = {
  light: <Sun size={18} />,
  dark: <Moon size={18} />,
} as const;

// Función helper para validar el valor del tema
function isValidTheme(theme: string): theme is ThemeIconKeys {
  return theme in themeIcons;
}

export function AppearanceToggle({ settings }: ToggleProps) {
  const { theme, updateTheme } = useSettings();

  const options = Object.entries(settings.appearance?.options ?? {}).map(
    ([key, label]) => {
      const themeValue = key.replace("Mode", "").toLowerCase();
      // Validamos que el tema sea válido
      const validThemeValue = isValidTheme(themeValue) ? themeValue : "light";

      return {
        value: validThemeValue as ThemeType,
        label: label,
        ariaLabel: `Switch to ${label.toLowerCase()} theme`,
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

// Definimos un tipo específico para las claves de los idiomas
type LanguageKeys = "es" | "en";

// Aseguramos que languageAriaLabels solo acepte las claves definidas
const languageAriaLabels: Record<LanguageKeys, string> = {
  es: "Español",
  en: "English",
};

// Función helper para validar el valor del idioma
function isValidLanguage(lang: string): lang is LanguageKeys {
  return lang in languageAriaLabels;
}

export function LanguageToggle({ settings }: ToggleProps) {
  const { theme, language, updateLanguage } = useSettings();

  const options = Object.entries(settings.language?.options ?? {}).map(
    ([key, label]) => {
      let langValue =
        key === "spanish" ? "es" : key === "english" ? "en" : key.toLowerCase();
      // Validamos que el idioma sea válido
      const validLangValue = isValidLanguage(langValue) ? langValue : "en";

      return {
        value: validLangValue as Language,
        label: label,
        ariaLabel: languageAriaLabels[validLangValue],
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
