import "server-only";
import { cache } from "react";
import type { Language } from "@/lib/config/i18n";
import type { DashboardDictionary } from "@/types/dictionary/dashboard.types";
import type { SettingsDictionary } from "@/types/dictionary/settings.types";
import type { ProfileDictionary } from "@/types/dictionary/profile.types";
import { DashboardLayoutDictionary } from "@/types/dictionary/dashboardLayout.types";
import { SignInDictionary } from "@/types/dictionary/signin.types";
import { AuthLayoutDictionary } from "@/types/dictionary/authLayout.types";
import { HomeDictionary } from "@/types/dictionary/home.types";
import { MainLayoutDictionary } from "@/types/dictionary/mainLayout.types";
import { ProjectDetailsDictionary } from "@/types/dictionary/projectDetails.types";
import { ContentPreviewDictionary } from "@/types/dictionary/contentPreview.types";
import { DesignSystemDictionary } from "@/types/dictionary/designSystemPreview.types";

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

// Layout dictionaries

export const mainLayoutDictionary = new DictionaryService<MainLayoutDictionary>(
  {
    en: () => import("@/lib/locales/en/main-layout.json"),
    es: () => import("@/lib/locales/es/main-layout.json"),
  },
  (dict) =>
    validateDictionary<MainLayoutDictionary>({} as MainLayoutDictionary, dict)
);

export const authLayoutDictionary = new DictionaryService<AuthLayoutDictionary>(
  {
    en: () => import("@/lib/locales/en/auth-layout.json"),
    es: () => import("@/lib/locales/es/auth-layout.json"),
  },
  (dict) =>
    validateDictionary<AuthLayoutDictionary>({} as AuthLayoutDictionary, dict)
);

export const dashboardLayoutDictionary =
  new DictionaryService<DashboardLayoutDictionary>(
    {
      en: () => import("@/lib/locales/en/dashboard-layout.json"),
      es: () => import("@/lib/locales/es/dashboard-layout.json"),
    },
    (dict) =>
      validateDictionary<DashboardLayoutDictionary>(
        {} as DashboardLayoutDictionary,
        dict
      )
  );

// Page dictionaries

export const homeDictionary = new DictionaryService<HomeDictionary>(
  {
    en: () => import("@/lib/locales/en/home.json"),
    es: () => import("@/lib/locales/es/home.json"),
  },
  (dict) => validateDictionary<HomeDictionary>({} as HomeDictionary, dict)
);

export const projectDetailsDictionary =
  new DictionaryService<ProjectDetailsDictionary>(
    {
      en: () => import("@/lib/locales/en/project-details.json"),
      es: () => import("@/lib/locales/es/project-details.json"),
    },
    (dict) =>
      validateDictionary<ProjectDetailsDictionary>(
        {} as ProjectDetailsDictionary,
        dict
      )
  );

export const contentPreviewDictionary =
  new DictionaryService<ContentPreviewDictionary>(
    {
      en: () => import("@/lib/locales/en/content-preview.json"),
      es: () => import("@/lib/locales/es/content-preview.json"),
    },
    (dict) =>
      validateDictionary<ContentPreviewDictionary>(
        {} as ContentPreviewDictionary,
        dict
      )
  );

export const designSystemDictionary =
  new DictionaryService<DesignSystemDictionary>(
    {
      en: () => import("@/lib/locales/en/design-system-preview.json"),
      es: () => import("@/lib/locales/es/design-system-preview.json"),
    },
    (dict) =>
      validateDictionary<DesignSystemDictionary>(
        {} as DesignSystemDictionary,
        dict
      )
  );

export const signInDictionary = new DictionaryService<SignInDictionary>(
  {
    en: () => import("@/lib/locales/en/sign-in.json"),
    es: () => import("@/lib/locales/es/sign-in.json"),
  },
  (dict) => validateDictionary<SignInDictionary>({} as SignInDictionary, dict)
);

export const dashboardDictionary = new DictionaryService<DashboardDictionary>(
  {
    en: () => import("@/lib/locales/en/dashboard.json"),
    es: () => import("@/lib/locales/es/dashboard.json"),
  },
  (dict) =>
    validateDictionary<DashboardDictionary>({} as DashboardDictionary, dict)
);

export const settingsDictionary = new DictionaryService<SettingsDictionary>(
  {
    en: () => import("@/lib/locales/en/settings.json"),
    es: () => import("@/lib/locales/es/settings.json"),
  },
  (dict) =>
    validateDictionary<SettingsDictionary>({} as SettingsDictionary, dict)
);

export const profileDictionary = new DictionaryService<ProfileDictionary>(
  {
    en: () => import("@/lib/locales/en/profile.json"),
    es: () => import("@/lib/locales/es/profile.json"),
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
