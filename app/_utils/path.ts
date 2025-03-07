import type { Language } from "../_lib/config/i18n";

/**
 * Construye una ruta localizada añadiendo el locale al inicio
 */
export const buildLocalizedPath = (path: string, locale: Language): string => {
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
};

/**
 * Normaliza una ruta eliminando el locale y asegurando que comience con /dashboard
 */
export const normalizePathForComparison = (path: string): string => {
  // Elimina el locale y normaliza la ruta
  const withoutLocale = path.replace(/^\/[a-z]{2}\//, "/");

  // Asegura que la ruta comience con /dashboard si no lo hace
  if (!withoutLocale.startsWith("/dashboard")) {
    return `/dashboard${
      withoutLocale.startsWith("/") ? withoutLocale : `/${withoutLocale}`
    }`;
  }

  return withoutLocale;
};

/**
 * Obtiene el segmento de proyecto de una ruta si existe
 */
const getProjectSegment = (path: string): string | null => {
  const projectMatch = path.match(/\/project\/([^/?#]+)/);
  return projectMatch ? projectMatch[1] : null;
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

  // Si es una ruta de proyecto, manejo especial
  if (normalizedItem.includes("/project/")) {
    // Si el item es la ruta base de proyectos
    if (normalizedItem === "/dashboard/project") {
      return normalizedCurrent.startsWith("/dashboard/project/");
    }

    // Para rutas específicas de proyecto
    const currentProjectSegment = getProjectSegment(normalizedCurrent);
    const itemProjectSegment = getProjectSegment(normalizedItem);

    if (currentProjectSegment && itemProjectSegment) {
      return currentProjectSegment === itemProjectSegment;
    }
  }

  // Para la ruta raíz del dashboard
  if (isDashboardRoot(itemPath)) {
    return normalizedCurrent === "/dashboard";
  }

  if (exact) {
    return normalizedCurrent === normalizedItem;
  }

  // Manejo especial para rutas de documentación y otras secciones principales
  if (
    normalizedItem === "/dashboard/documentation" ||
    normalizedItem === "/dashboard/settings" ||
    normalizedItem === "/dashboard/profile"
  ) {
    return normalizedCurrent.startsWith(normalizedItem);
  }

  // Para otras rutas, verifica que sean iguales o que sea una subruta directa
  if (normalizedCurrent === normalizedItem) return true;

  // Verificación de subrutas teniendo en cuenta la profundidad
  const currentParts = normalizedCurrent.split("/").filter(Boolean);
  const itemParts = normalizedItem.split("/").filter(Boolean);

  // Si la ruta actual es más corta que la del item, no puede ser activa
  if (currentParts.length < itemParts.length) return false;

  // Compara los segmentos relevantes
  for (let i = 0; i < itemParts.length; i++) {
    if (currentParts[i] !== itemParts[i]) return false;
  }

  return true;
};

/**
 * Verifica si una ruta es la raíz del dashboard
 */
export const isDashboardRoot = (path: string): boolean => {
  const normalized = normalizePathForComparison(path);
  return normalized === "/dashboard";
};
