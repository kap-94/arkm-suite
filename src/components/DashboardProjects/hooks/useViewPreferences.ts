"use client";
import { VIEW_PREFERENCES } from "@/lib/constants/viewPreferences";
import { useState, useEffect } from "react";
import { ViewMode } from "../types";

export function useViewPreference(
  initialMode: ViewMode = VIEW_PREFERENCES.DEFAULT_VIEW
) {
  // Siempre inicializar con initialMode para el primer render
  const [viewMode, setViewModeState] = useState<ViewMode>(initialMode);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    // Leer preferencias solo después del montaje
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${VIEW_PREFERENCES.COOKIE_NAME}=`))
      ?.split("=")[1] as ViewMode;

    const savedView = localStorage.getItem(
      VIEW_PREFERENCES.COOKIE_NAME
    ) as ViewMode;

    // Priorizar cookie sobre localStorage
    if (cookieValue === "grid" || cookieValue === "list") {
      setViewModeState(cookieValue);
    } else if (savedView === "grid" || savedView === "list") {
      setViewModeState(savedView);
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
      document.cookie = `${
        VIEW_PREFERENCES.COOKIE_NAME
      }=${viewMode};path=/;max-age=${VIEW_PREFERENCES.MAX_AGE};sameSite=Lax;${
        process.env.NODE_ENV === "production" ? "Secure;" : ""
      }`;
      localStorage.setItem(VIEW_PREFERENCES.COOKIE_NAME, viewMode);
    }
  }, [viewMode, hasMounted]);

  return {
    viewMode,
    setViewMode: setViewModeState,
    isLoading: !hasMounted,
  };
}
