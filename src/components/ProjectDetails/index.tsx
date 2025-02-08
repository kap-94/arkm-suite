"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames/bind";
import { useSettings } from "@/context/SettingsContext";
import { ProjectPlanningLayout } from "@/components/layouts/ProjectPlanningLayout";
import ProjectHeader from "@/components/ProjectHeader";
import Tabs from "@/components/Tabs";
import { ProjectDetailsDictionary } from "@/types/dictionary/projectDetails.types";
import { DeliverablesView } from "@/components/DeliverablesView";
import { GanttView } from "@/components/GanttView";
import { TaskStatus } from "@/types/models/Common";
import { formatDateRangeSafe } from "@/utils/date-utils";
import { ProjectResponse } from "@/repositories/types";
import styles from "./ProjectDetails.module.scss";
import { buildLocalizedPath } from "@/utils/path";

const cx = classNames.bind(styles);

export interface ProjectDetailsProps {
  project: ProjectResponse;
  dictionary: ProjectDetailsDictionary;
  theme?: {
    type: "light" | "dark" | "custom";
    colors?: {
      background?: string;
      border?: string;
      text?: string;
      secondaryText?: string;
      gradient?: string;
      hover?: string;
    };
  };
}

export function ProjectDetails({ project, dictionary }: ProjectDetailsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, language } = useSettings();
  const [projectData, setProjectData] = useState<ProjectResponse>(project);

  // Get active tab from URL or default to 0
  const activeTab = Number(searchParams.get("tab") ?? "0");

  // Update URL when tab changes
  const handleTabChange = useCallback(
    (index: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("tab", index.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Calcular las métricas del proyecto
  const metrics = useMemo(() => {
    const completedDeliverables = projectData.deliverables.filter(
      (d) => d.status.value === TaskStatus.COMPLETED
    ).length;
    const totalDeliverables = projectData.deliverables.length;

    const timelineValue = formatDateRangeSafe(
      projectData.startDate,
      projectData.endDate,
      {
        locale: language,
        format: "D [de] MMM",
      }
    );

    return [
      {
        label: dictionary.projectHeader.metrics.timeline.label,
        value: timelineValue,
        icon: "Clock",
        variant: "info",
      },
      {
        label: dictionary.projectHeader.metrics.milestones.label,
        value: `${projectData.metrics.milestones.completed}/${projectData.metrics.milestones.total} ${dictionary.projectHeader.metrics.milestones.complete}`,
        icon: "GitPullRequest",
        variant: "success",
      },
      {
        label: dictionary.projectHeader.metrics.deliverables.label,
        value: `${completedDeliverables}/${totalDeliverables}`,
        icon: "Target",
        variant: "info",
      },
      {
        label: dictionary.projectHeader.metrics.teamMembers.label,
        value: `${projectData.teamMembers.length} ${dictionary.projectHeader.metrics.teamMembers.active}`,
        icon: "Users",
        variant: "info",
      },
    ];
  }, [projectData, dictionary, language]);

  // Formatear los datos para el ProjectHeader
  const headerProject = useMemo(() => {
    return {
      id: projectData.id,
      slug: projectData.slug,
      name: projectData.name,
      description: projectData.description,
      status: {
        label: projectData.status.label,
        value: projectData.status.value,
      },
      metrics: metrics,
      progress: projectData.progress,
      client: projectData.client,
      owner: projectData.owner,
      startDate: projectData.startDate,
    };
  }, [projectData, metrics]);

  const availableProjects = useMemo(
    () => [
      {
        id: "proj_naturaldog2025",
        name: "NaturalDog",
        slug: "naturaldog-food",
        status: {
          label: "In Progress",
          value: "inProgress",
        },
      },
      {
        id: "proj_pixelforge-studio_1",
        name: "PixelForge",
        slug: "pixelforge-studio",
        status: {
          label: "Completed",
          value: "completed",
        },
      },
      {
        id: "proj_codecrafters-dev_2",
        name: "CodeCrafters",
        slug: "codecrafters-dev",
        status: {
          label: "On Hold",
          value: "onHold",
        },
      },
      {
        id: "proj_visionaryux-design_3",
        name: "VisionaryUX",
        slug: "visionaryux-design",
        status: {
          label: "On Hold",
          value: "onHold",
        },
      },
      {
        id: "proj_devsphere-agency_4",
        name: "DevSphere",
        slug: "devsphere-agency",
        status: {
          label: "On Hold",
          value: "onHold",
        },
      },
    ],
    []
  );

  const handleProjectChange = useCallback(
    async (projectSlug: string) => {
      const params = new URLSearchParams(searchParams);
      const currentTab = params.get("tab") ?? "0";
      router.push(
        buildLocalizedPath(
          `/dashboard/project/${projectSlug}?tab=${currentTab}`,
          language
        )
      );
    },
    [router, searchParams]
  );

  const themeConfig = useMemo(
    () => ({
      type: theme,
      glassmorphism: {
        enabled: false,
        variant: "subtle" as const,
      },
    }),
    [theme]
  );

  return (
    <div className={cx("project-details", `project-details--theme-${theme}`)}>
      <ProjectHeader
        project={headerProject}
        availableProjects={availableProjects}
        onProjectChange={handleProjectChange}
        theme={themeConfig}
        dictionary={dictionary.projectHeader}
      />

      <Tabs
        theme={{ type: theme }}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      >
        <Tabs.TabList>
          <Tabs.Tab index={0} label={dictionary.tabs.timeline.label} />
          <Tabs.Tab index={1} label={dictionary.tabs.deliverables.label} />
        </Tabs.TabList>

        <Tabs.TabPanel index={0}>
          <ProjectPlanningLayout
            projectId={projectData.id}
            title={dictionary.tabs.timeline.title}
            theme={{ type: theme }}
          >
            <GanttView
              projectType={projectData.type.label}
              dictionary={dictionary.ganttView}
              projectId={projectData.id}
              stages={projectData.stages}
              theme={{ type: theme }}
            />
          </ProjectPlanningLayout>
        </Tabs.TabPanel>

        <Tabs.TabPanel index={1}>
          <ProjectPlanningLayout
            projectId={projectData.id}
            title={dictionary.tabs.deliverables.title}
            theme={{ type: theme }}
          >
            <DeliverablesView
              dictionary={dictionary.deliverablesView}
              theme={{ type: theme }}
              deliverables={projectData.deliverables}
            />
          </ProjectPlanningLayout>
        </Tabs.TabPanel>
      </Tabs>
    </div>
  );
}

export default ProjectDetails;
