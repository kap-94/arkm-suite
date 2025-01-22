"use client";

import { useState, useMemo } from "react";
import type { Option } from "@/components/Dropdown/types";
import { useViewPreference } from "./useViewPreferences";
import { ViewMode } from "../types";
import { Project, ProjectPriority } from "@/models/project";
import { capitalizeAndFormat } from "@/utils/textUtils";

export interface UseProjectFiltersProps {
  projects: Project[];
  initialViewMode?: ViewMode;
}

const ensureString = (value: string | undefined): string => value || "";

export const useProjectFilters = ({
  projects,
  initialViewMode = "list",
}: UseProjectFiltersProps) => {
  const { viewMode, setViewMode, isLoading } =
    useViewPreference(initialViewMode);

  // Generate filter options
  const { statusOptions, priorityOptions } = useMemo(() => {
    const uniqueStatuses = new Set(projects.map((project) => project.status));
    const uniquePriorities = new Set(
      projects
        .map((project) => project.priority)
        .filter((p): p is ProjectPriority => p !== undefined)
    );

    const statusOpts: Option[] = [
      { label: "All Status", value: "" },
      ...Array.from(uniqueStatuses).map((status) => ({
        label: capitalizeAndFormat(status),
        value: ensureString(status),
      })),
    ];

    const priorityOpts: Option[] = [
      { label: "All Priority", value: "" },
      ...Array.from(uniquePriorities).map((priority) => ({
        label: priority.charAt(0).toUpperCase() + priority.slice(1),
        value: priority,
      })),
    ];

    return {
      statusOptions: statusOpts,
      priorityOptions: priorityOpts,
    };
  }, [projects]);

  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<Option>(
    statusOptions[0]
  );
  const [selectedPriority, setSelectedPriority] = useState<Option>(
    priorityOptions[0]
  );

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const statusMatch =
        !selectedStatus.value || project.status === selectedStatus.value;
      const priorityMatch =
        !selectedPriority.value ||
        ensureString(project.priority) === selectedPriority.value;
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
