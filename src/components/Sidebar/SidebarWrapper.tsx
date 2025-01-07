// src/components/Sidebar/ClientSidebarWrapper.tsx
"use client";

import { SidebarProvider } from "./context/SidebarContext";
import { SidebarState } from "./types/sidebar.types";
import { useSidebarLogic } from "./hooks/useSidebarLogic";

interface SidebarWrapperProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  onStateChange?: (state: SidebarState) => void;
}

export function SidebarWrapper({
  children,
  defaultExpanded = false,
  onStateChange,
}: SidebarWrapperProps) {
  const sidebarLogic = useSidebarLogic({
    defaultExpanded,
    onStateChange,
  });

  return (
    <SidebarProvider value={sidebarLogic} onStateChange={onStateChange}>
      {children}
    </SidebarProvider>
  );
}

export default SidebarWrapper;
