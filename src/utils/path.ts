// src/utils/path.utils.ts
import type { Language } from "@/config/i18n";

export const buildLocalizedPath = (path: string, locale: Language): string => {
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
};

/**
 * Normaliza una ruta eliminando el locale y asegurando que comience con /dashboard
 */
export const normalizePathForComparison = (path: string): string => {
  // Elimina el locale y normaliza la ruta
  const withoutLocale = path.replace(/^\/[a-z]{}\//, "/");
  // Asegura que la ruta comience con /dashboard si no lo hace
  return withoutLocale.startsWith("/dashboard")
    ? withoutLocale
    : `/dashboard${withoutLocale}`;
};

/**
 * Verifica si una ruta está activa
 * @param currentPath - La ruta actual (pathname)
 * @param itemPath - La ruta del item a comparar
 * @param exact - Si debe ser una coincidencia exacta
 */
export const isPathActive = (
  currentPath: string,
  itemPath: string,
  exact: boolean = false
): boolean => {
  const normalizedCurrent = normalizePathForComparison(currentPath);
  const normalizedItem = normalizePathForComparison(itemPath);

  if (exact) {
    // Para rutas exactas (como /dashboard), solo coincide si son iguales
    return normalizedCurrent === normalizedItem;
  }

  // Para otras rutas, verifica que sean iguales o que sea una subruta directa
  if (normalizedCurrent === normalizedItem) return true;

  // Si la ruta actual es más larga, verifica que sea una subruta directa
  const currentParts = normalizedCurrent.split("/");
  const itemParts = normalizedItem.split("/");

  // Si la diferencia en la profundidad es mayor a 1, no es una subruta directa
  if (currentParts.length > itemParts.length + 1) return false;

  // Verifica que todos los segmentos de la ruta del item coincidan
  return normalizedCurrent.startsWith(normalizedItem + "/");
};

/**
 * Verifica si una ruta es la raíz del dashboard
 */
export const isDashboardRoot = (path: string): boolean => {
  return normalizePathForComparison(path) === "/dashboard";
};
