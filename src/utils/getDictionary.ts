// src/utils/getDictionary.ts
import "server-only";
import type { Language } from "@/config/i18n";
import type { Dictionary } from "@/types/dictionary";

const dictionaries = {
  es: () =>
    import("@/locales/es/common.json").then((module) =>
      validateDictionary(module.default)
    ),
  en: () =>
    import("@/locales/en/common.json").then((module) =>
      validateDictionary(module.default)
    ),
} satisfies Record<Language, () => Promise<Dictionary>>;

// Función de validación para asegurar que el objeto coincide con el tipo Dictionary
function validateDictionary(dict: unknown): Dictionary {
  // Esta validación en tiempo de ejecución es opcional pero recomendada
  if (!dict || typeof dict !== "object") {
    throw new Error("Invalid dictionary format");
  }

  return dict as Dictionary;
}

export type DictionaryKey = keyof Dictionary;

export async function getDictionary<T extends DictionaryKey>(
  locale: Language,
  section: T
): Promise<Dictionary[T]> {
  const dict = await dictionaries[locale]();
  return dict[section];
}

// Helper para cargar múltiples secciones
export async function getMultipleDictionaries<T extends DictionaryKey>(
  locale: Language,
  sections: T[]
): Promise<Pick<Dictionary, T>> {
  const dict = await dictionaries[locale]();
  const result = {} as Pick<Dictionary, T>;

  for (const section of sections) {
    result[section] = dict[section];
  }

  return result;
}
