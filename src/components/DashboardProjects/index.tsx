"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Grid, List, ChevronDown } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { Dropdown } from "@/components/Dropdown";
import Spinner from "@/components/Spinner";
import { useProjectFilters } from "./hooks/useProjectFilters";
import { DashboardProjectsProps, ViewMode } from "./types";
import styles from "./DashboardProjects.module.scss";

const cx = classNames.bind(styles);

export const DashboardProjects: React.FC<DashboardProjectsProps> = ({
  projects,
  title,
  theme = { type: "light" },
  initialViewMode = "list",
  viewOptions,
  dictionary,
  className,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const filterConfig = {
    status: dictionary.filters.status,
    priority: dictionary.filters.priority,
    empty: dictionary.empty,
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const {
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
  } = useProjectFilters({
    projects,
    initialViewMode,
    filterConfig,
  });

  const handleViewChange = (mode: ViewMode) => setViewMode(mode);

  return (
    <div
      className={cx(
        "dashboard-projects",
        `dashboard-projects--theme-${theme.type}`,
        className
      )}
    >
      <div className={cx("dashboard-projects__header")}>
        <div className={cx("dashboard-projects__title-wrapper")}>
          <ThemedTypography
            variant="h4"
            className={cx("dashboard-projects__title")}
            noWrap
          >
            {title}
          </ThemedTypography>
        </div>

        <div className={cx("dashboard-projects__controls")}>
          <div className={cx("dashboard-projects__filters")}>
            <Dropdown
              options={statusOptions}
              selected={selectedStatus}
              onSelectedChange={setSelectedStatus}
              theme={theme}
              icon={<ChevronDown size={18} />}
              id="status-filter"
              variant="filter"
              className={cx("dashboard-projects__dropdown")}
              closeOnScroll
            />
            <Dropdown
              options={priorityOptions}
              selected={selectedPriority}
              onSelectedChange={setSelectedPriority}
              theme={theme}
              icon={<ChevronDown size={18} />}
              id="priority-filter"
              variant="filter"
              className={cx("dashboard-projects__dropdown")}
              closeOnScroll
            />
          </div>

          <div className={cx("dashboard-projects__view-toggles")}>
            <button
              className={cx("dashboard-projects__view-button", {
                "dashboard-projects__view-button--active": viewMode === "grid",
              })}
              onClick={() => handleViewChange("grid")}
              aria-label={viewOptions.grid}
            >
              <Grid size={18} strokeWidth={1.55} />
              <span className={cx("dashboard-projects__view-button-tooltip")}>
                <ThemedTypography color="secondary" variant="p3">
                  {viewOptions.grid}
                </ThemedTypography>
              </span>
            </button>

            <button
              className={cx("dashboard-projects__view-button", {
                "dashboard-projects__view-button--active": viewMode === "list",
              })}
              onClick={() => handleViewChange("list")}
              aria-label={viewOptions.list}
            >
              <List size={18} strokeWidth={1.55} />
              <span className={cx("dashboard-projects__view-button-tooltip")}>
                <ThemedTypography color="secondary" variant="p3">
                  {viewOptions.list}
                </ThemedTypography>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={cx("dashboard-projects__content", {
          "dashboard-projects__content--loading": isLoading,
        })}
      >
        {isLoading ? (
          <div className={cx("dashboard-projects__spinner-wrapper")}>
            <Spinner theme={theme} />
          </div>
        ) : (
          <div
            className={cx("dashboard-projects__list", {
              "dashboard-projects__list--grid":
                viewMode === "grid" && filteredProjects.length > 0,
              "dashboard-projects__list--list":
                viewMode === "list" || filteredProjects.length === 0,
            })}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  size={
                    isMobile
                      ? "small"
                      : viewMode === "grid"
                      ? "small"
                      : "default"
                  }
                  theme={theme}
                  dictionary={dictionary}
                />
              ))
            ) : (
              <ThemedTypography
                variant="p2"
                color="secondary"
                className={cx("dashboard-projects__list--empty")}
              >
                {dictionary.empty}
              </ThemedTypography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardProjects;
