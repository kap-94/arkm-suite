// src/context/SettingsContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { ThemeType } from "@/components/Sidebar/types/sidebar.types";
import type { Language } from "@/lib/config/i18n";
import { useLanguage } from "./LanguageContext";

interface SettingsContextType {
  theme: ThemeType;
  language: Language;
  updateTheme: (theme: ThemeType) => void;
  updateLanguage: (language: Language) => void;
}

interface SettingsProviderProps {
  children: React.ReactNode;
  defaultTheme: ThemeType;
}

const MAX_AGE = 60 * 60 * 24 * 365;
const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
  defaultTheme,
}) => {
  const { language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme as ThemeType;
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.cookie = `theme=${theme};path=/;max-age=${MAX_AGE}`;
  }, [theme]);

  const updateTheme = useCallback((newTheme: ThemeType) => {
    setTheme(newTheme);
  }, []);

  const updateLanguage = useCallback(
    (newLanguage: Language) => {
      setLanguage(newLanguage);
    },
    [setLanguage]
  );

  const value = React.useMemo(
    () => ({
      theme,
      language,
      updateTheme,
      updateLanguage,
    }),
    [theme, language, updateTheme, updateLanguage]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
