// src/components/Sidebar/hooks/useSidebarLogic.ts
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  SidebarConfig,
  SidebarState,
  SidebarActions,
  DEFAULT_CONFIG,
} from "../types/sidebar.types";

interface UseSidebarLogicProps {
  defaultExpanded?: boolean;
  customConfig?: Partial<SidebarConfig>;
  onStateChange?: (state: SidebarState) => void;
}

export const useSidebarLogic = ({
  defaultExpanded = false,
  customConfig,
  onStateChange,
}: UseSidebarLogicProps = {}) => {
  const config = { ...DEFAULT_CONFIG, ...customConfig };

  const [state, setState] = useState<SidebarState>({
    isExpanded: defaultExpanded,
    isMobile:
      typeof window !== "undefined"
        ? window.innerWidth < config.breakpoints.mobile
        : false,
    activeItemId: undefined,
  });

  const checkIfMobile = useCallback(() => {
    const isMobile = window.innerWidth < config.breakpoints.mobile;
    setState((prev) => ({
      ...prev,
      isMobile,
      // Solo colapsamos al cambiar a móvil, no al cambiar a desktop
      isExpanded: isMobile ? false : prev.isExpanded,
    }));
  }, [config.breakpoints.mobile]);

  // Efecto para detectar si es móvil
  useEffect(() => {
    // Verificar inmediatamente al montar
    checkIfMobile();

    // Debounce para el resize
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIfMobile, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [checkIfMobile]);

  // Notificar cambios de estado
  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  const actions: SidebarActions = useMemo(
    () => ({
      toggle: () =>
        setState((prev) => ({ ...prev, isExpanded: !prev.isExpanded })),
      setActiveItem: (id: string) =>
        setState((prev) => ({ ...prev, activeItemId: id })),
      collapse: () =>
        setState((prev) => {
          return { ...prev, isExpanded: false };
        }),
      expand: () => setState((prev) => ({ ...prev, isExpanded: true })),
    }),
    []
  );

  return {
    state,
    actions,
    config,
  };
};
