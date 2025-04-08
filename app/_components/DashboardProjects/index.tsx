"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Grid, List, ChevronDown } from "lucide-react";
import ProjectCard from "../ProjectCard";
import { ThemedTypography } from "../Typography/ThemedTypography";
import { ThemedDropdown } from "../Dropdown";
import Spinner from "../Spinner";
import { useProjectFilters } from "./hooks/useProjectFilters";
import { DashboardProjectsProps, ViewMode } from "./types";
import { useDashboard } from "../../_context/DashboardContext";
import { VIEW_PREFERENCES } from "@/app/_lib/constants/viewPreferences";
import styles from "./DashboardProjects.module.scss";

const cx = classNames.bind(styles);

export const DashboardProjects: React.FC<DashboardProjectsProps> = ({
  projects,
  title,
  theme = { type: "light" },
  initialViewMode = VIEW_PREFERENCES.DEFAULT_VIEW,
  viewOptions,
  dictionary,
  className,
}) => {
  const { language } = useDashboard();
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
    selectedStatus,
    setSelectedStatus,
    filteredProjects,
    isLoading,
  } = useProjectFilters({
    projects,
    initialViewMode,
    filterConfig,
  });

  const handleViewChange = (mode: ViewMode) => setViewMode(mode);

  const getOppositeView = () => {
    return viewMode === "list" ? "grid" : "list";
  };

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
            variant="h5"
            fontWeight={400}
            className={cx("dashboard-projects__title")}
            noWrap
          >
            {title}
          </ThemedTypography>
        </div>

        <div className={cx("dashboard-projects__controls")}>
          <div className={cx("dashboard-projects__filters")}>
            <ThemedDropdown
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
          </div>

          <div className={cx("dashboard-projects__view-toggles")}>
            <button
              className={cx("dashboard-projects__view-button")}
              onClick={() => handleViewChange(getOppositeView())}
              aria-label={viewOptions[getOppositeView()]}
            >
              {getOppositeView() === "grid" ? (
                <Grid size={18} strokeWidth={1.55} />
              ) : (
                <List size={18} strokeWidth={1.55} />
              )}
              <span className={cx("dashboard-projects__view-button-tooltip")}>
                <ThemedTypography color="secondary" variant="p3">
                  {viewOptions[getOppositeView()]}
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
                !isLoading &&
                viewMode === "grid" &&
                filteredProjects.length > 0,
              "dashboard-projects__list--list":
                !isLoading &&
                (viewMode === "list" || filteredProjects.length === 0),
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
                  language={language}
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
