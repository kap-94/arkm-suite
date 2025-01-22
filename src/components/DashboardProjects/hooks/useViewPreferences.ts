"use client";

import { useState, useEffect } from "react";
import { ViewMode } from "../types";

const COOKIE_NAME = "preferredView";
const MAX_AGE = 60 * 60 * 24 * 365; // 1 año

const getInitialViewMode = (initialMode: ViewMode): ViewMode => {
  if (typeof window === "undefined") {
    return initialMode;
  }

  const savedView = localStorage.getItem(COOKIE_NAME);
  if (savedView === "grid" || savedView === "list") {
    return savedView as ViewMode;
  }

  return initialMode;
};

export function useViewPreference(initialMode: ViewMode = "list") {
  // Siempre declaramos los estados primero
  const [viewMode, setViewModeState] = useState<ViewMode>(() =>
    getInitialViewMode(initialMode)
  );
  const [isLoading, setIsLoading] = useState(true);

  // Un solo useEffect para manejar la sincronización
  useEffect(() => {
    // Actualizar localStorage
    localStorage.setItem(COOKIE_NAME, viewMode);

    // Actualizar cookie
    document.cookie = `${COOKIE_NAME}=${viewMode};path=/;max-age=${MAX_AGE};SameSite=Lax`;

    // Marcar como cargado
    setIsLoading(false);
  }, [viewMode]);

  // Función para actualizar el modo de vista
  const setViewMode = (newMode: ViewMode) => {
    setViewModeState(newMode);
  };

  return {
    viewMode,
    setViewMode,
    isLoading,
  };
}
