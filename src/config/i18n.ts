export const languages = ["es", "en"] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage = "en" as const;

export const i18n = {
  defaultLocale: defaultLanguage,
  locales: languages,
} as const;
