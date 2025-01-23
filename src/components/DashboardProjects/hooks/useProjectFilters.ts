"use client";

import { useState, useMemo } from "react";
import type { Option } from "@/components/Dropdown/types";
import { useViewPreference } from "./useViewPreferences";
import { ViewMode } from "../types";
import { Project, ProjectPriority } from "@/models/project";

export interface FilterConfig {
  status: {
    allStatus: string;
    inProgress: string;
    completed: string;
    onHold: string;
  };
  priority: {
    allPriority: string;
    high: string;
    medium: string;
    low: string;
  };
  empty: string;
}

export interface UseProjectFiltersProps {
  projects: Project[];
  initialViewMode?: ViewMode;
  filterConfig: FilterConfig;
}

export const useProjectFilters = ({
  projects,
  initialViewMode = "list",
  filterConfig,
}: UseProjectFiltersProps) => {
  const { viewMode, setViewMode, isLoading } =
    useViewPreference(initialViewMode);

  const { statusOptions, priorityOptions } = useMemo(() => {
    const statusOpts: Option[] = [
      { label: filterConfig.status.allStatus, value: "" },
      { label: filterConfig.status.inProgress, value: "inProgress" },
      { label: filterConfig.status.completed, value: "completed" },
      { label: filterConfig.status.onHold, value: "onHold" },
    ];

    const priorityOpts: Option[] = [
      { label: filterConfig.priority.allPriority, value: "" },
      { label: filterConfig.priority.high, value: "high" },
      { label: filterConfig.priority.medium, value: "medium" },
      { label: filterConfig.priority.low, value: "low" },
    ];

    return {
      statusOptions: statusOpts,
      priorityOptions: priorityOpts,
    };
  }, [filterConfig]);

  const [selectedStatus, setSelectedStatus] = useState<Option>(
    statusOptions[0]
  );
  const [selectedPriority, setSelectedPriority] = useState<Option>(
    priorityOptions[0]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const statusMatch =
        !selectedStatus.value || project.status.value === selectedStatus.value;
      const priorityMatch =
        !selectedPriority.value ||
        project.priority?.value === selectedPriority.value;
      return statusMatch && priorityMatch;
    });
  }, [projects, selectedStatus, selectedPriority]);

  return {
    viewMode,
    setViewMode,
    statusOptions,
    priorityOptions,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    filteredProjects,
    isLoading,
  };
};
