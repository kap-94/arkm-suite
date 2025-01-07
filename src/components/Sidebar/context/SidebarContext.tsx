// src/components/Sidebar/context/SidebarContext.tsx
import {
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { SidebarContextValue, SidebarState } from "../types/sidebar.types";

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

interface SidebarProviderProps {
  value: SidebarContextValue;
  onStateChange?: (state: SidebarState) => void;
}

export const SidebarProvider = ({
  children,
  value,
  onStateChange,
}: PropsWithChildren<SidebarProviderProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(value.state);
    }

    const container = containerRef.current;
    if (container) {
      const isExpandedState = value.state.isExpanded && !value.state.isMobile;
      const isCollapsedState = !value.state.isExpanded && !value.state.isMobile;

      container.classList.toggle("sidebar-expanded", isExpandedState);
      container.classList.toggle("sidebar-collapsed", isCollapsedState);
    }

    return () => {
      if (container) {
        container.classList.remove("sidebar-expanded", "sidebar-collapsed");
      }
    };
  }, [value.state, onStateChange]);

  return (
    <div ref={containerRef}>
      <SidebarContext.Provider value={value}>
        {children}
      </SidebarContext.Provider>
    </div>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};
