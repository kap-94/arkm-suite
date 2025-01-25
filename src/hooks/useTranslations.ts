"use client";

import { useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function useTranslations<T extends Record<string, any>>(
  translations: T
) {
  const { language } = useLanguage();

  const t = useCallback(
    (key: string): string => {
      try {
        const keys = key.split(".");
        let value: any = translations;

        for (const k of keys) {
          value = value?.[k];
          if (!value) break;
        }

        return value || key;
      } catch (error) {
        console.error(`Translation error for key: ${key}`, error);
        return key;
      }
    },
    [translations]
  );

  return { t, language };
}
