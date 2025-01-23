import "server-only";
import { cache } from "react";
import type { Language } from "@/config/i18n";
import type { DashboardDictionary } from "@/types/dictionary/dashboard.types";
import type { SettingsDictionary } from "@/types/dictionary/settings.types";
import type { ProfileDictionary } from "@/types/dictionary/profile.types";
import { DashboardLayoutDictionary } from "@/types/dictionary/dashboardLayout.types";

export type DictionaryFile = "dashboard" | "settings" | "profile";

type DictionaryImport<T> = {
  [K in Language]: () => Promise<{ default: T }>;
};

export class DictionaryService<T> {
  constructor(
    private dictionaries: DictionaryImport<T>,
    private validator: (dict: unknown) => T
  ) {}

  async load(locale: Language): Promise<T> {
    const dictionary = await this.dictionaries[locale]();
    return this.validator(dictionary.default);
  }
}

// Función genérica para validar el diccionario
function validateDictionary<T>(schema: T, dict: unknown): T {
  if (!dict || typeof dict !== "object") {
    throw new Error("Invalid dictionary format");
  }
  // Aquí podrías agregar más validaciones específicas
  return dict as T;
}

// Cache wrapper
const createCachedDictionaryLoader = cache(
  <T>(service: DictionaryService<T>, locale: Language) => service.load(locale)
);

// Servicios específicos para cada página
export const dashboardLayoutDictionary =
  new DictionaryService<DashboardLayoutDictionary>(
    {
      en: () => import("@/locales/en/dashboard-layout.json"),
      es: () => import("@/locales/es/dashboard-layout.json"),
    },
    (dict) =>
      validateDictionary<DashboardLayoutDictionary>(
        {} as DashboardLayoutDictionary,
        dict
      )
  );

export const dashboardDictionary = new DictionaryService<DashboardDictionary>(
  {
    en: () => import("@/locales/en/dashboard.json"),
    es: () => import("@/locales/es/dashboard.json"),
  },
  (dict) =>
    validateDictionary<DashboardDictionary>({} as DashboardDictionary, dict)
);

export const settingsDictionary = new DictionaryService<SettingsDictionary>(
  {
    en: () => import("@/locales/en/settings.json"),
    es: () => import("@/locales/es/settings.json"),
  },
  (dict) =>
    validateDictionary<SettingsDictionary>({} as SettingsDictionary, dict)
);

export const profileDictionary = new DictionaryService<ProfileDictionary>(
  {
    en: () => import("@/locales/en/profile.json"),
    es: () => import("@/locales/es/profile.json"),
  },
  (dict) => validateDictionary<ProfileDictionary>({} as ProfileDictionary, dict)
);

// Función helper para cargar cualquier diccionario
export async function getPageDictionary<T>(
  service: DictionaryService<T>,
  locale: Language
): Promise<T> {
  return createCachedDictionaryLoader(service, locale);
}
