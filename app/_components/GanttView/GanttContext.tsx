"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface GanttContextType {
  selectedStageId: string | null;
  setSelectedStageId: (id: string | null) => void;
  isStageSelected: (stageId: string) => boolean;
  toggleStageSelection: (stageId: string) => void;
  stageCardHeights: Record<string, number>;
  registerStageCardHeight: (stageId: string, height: number) => void;
}

const GanttContext = createContext<GanttContextType | undefined>(undefined);

export const GanttProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [stageCardHeights, setstageCardHeights] = useState<
    Record<string, number>
  >({});

  const isStageSelected = useCallback(
    (stageId: string) => {
      return selectedStageId === stageId;
    },
    [selectedStageId]
  );

  const toggleStageSelection = useCallback((stageId: string) => {
    setSelectedStageId((prev) => (prev === stageId ? null : stageId));
  }, []);

  const registerStageCardHeight = useCallback(
    (stageId: string, height: number) => {
      setstageCardHeights((prev) => {
        if (prev[stageId] === height) return prev;
        return { ...prev, [stageId]: height };
      });
    },
    []
  );

  const contextValue = React.useMemo(
    () => ({
      selectedStageId,
      setSelectedStageId,
      isStageSelected,
      toggleStageSelection,
      stageCardHeights,
      registerStageCardHeight,
    }),
    [
      selectedStageId,
      isStageSelected,
      toggleStageSelection,
      stageCardHeights,
      registerStageCardHeight,
    ]
  );

  return (
    <GanttContext.Provider value={contextValue}>
      {children}
    </GanttContext.Provider>
  );
};

export const useGanttContext = () => {
  const context = useContext(GanttContext);
  if (context === undefined) {
    throw new Error("useGanttContext must be used within a GanttProvider");
  }
  return context;
};
