"use client";

import React from "react";
import classNames from "classnames/bind";
import { Bell, FileText, Layers, Gauge, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NotificationType } from "@/components/NotificationItem/types";
import type {
  RecentFileType,
  RecentFileTheme,
} from "@/components/RecentFile/types";
import type {
  CommonDictionary,
  DashboardDictionaryOld,
} from "@/types/dictionary";
import type { StatsCardTheme, GraphConfig } from "@/components/StatsCard/types";
import { PageHeader } from "@/components/PageHeader";
import { notifications, recentFiles } from "./mockData";
import { StatsCard } from "@/components/StatsCard";
import { useSettings } from "@/context/SettingsContext";
import { RecentFile } from "@/components/RecentFile";
import { NotificationItem } from "@/components/NotificationItem";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import DashboardProjects from "@/components/DashboardProjects";
import { Project } from "@/models/project";
import { DashboardDictionary } from "@/types/dictionary/dashboard.types";
import styles from "./page.module.scss";

const cx = classNames.bind(styles);

interface StatsConfig {
  key: keyof DashboardDictionaryOld["stats"];
  icon: LucideIcon;
  graphData?: Array<{ value: number }>;
  graphConfig?: GraphConfig;
}

interface DashboardClientProps {
  projects: Project[];
  dictionary: {
    dashboardOld: DashboardDictionaryOld;
    dict: DashboardDictionary;
    common: CommonDictionary;
  };
}

const themeColors = {
  light: {
    activeProjects: "#22c55e", // green
    completed: "#6366f1", // indigo
    overallProgress: "#eab308", // yellow
    notifications: "#ec4899", // pink
  },
  dark: {
    activeProjects: "#4ade80", // lighter green
    completed: "#818cf8", // lighter indigo
    overallProgress: "#facc15", // lighter yellow
    notifications: "#f472b6", // lighter pink
  },
  custom: {
    activeProjects: "var(--stats-active-projects-color)",
    completed: "var(--stats-completed-color)",
    overallProgress: "var(--stats-progress-color)",
    notifications: "var(--stats-notifications-color)",
  },
};

export function DashboardClient({
  dictionary,
  projects,
}: DashboardClientProps) {
  const { theme } = useSettings();

  const projectsList = projects;
  const calculateOverallProgress = () => {
    const totalProjects = projectsList.length;
    if (totalProjects === 0) return 0;

    const totalProgress = projectsList.reduce((acc, project) => {
      return acc + (project.progress || 0);
    }, 0);

    return Math.round(totalProgress / totalProjects);
  };

  const generateMockData = (key: StatsConfig["key"], days: number = 7) => {
    const values = [];
    let baseValue = 0;

    switch (key) {
      case "activeProjects":
        baseValue = projectsList.filter(
          (p) => p.status === "inProgress"
        ).length;
        break;
      case "completed":
        baseValue = projectsList.filter((p) => p.status === "completed").length;
        break;
      case "overallProgress":
        baseValue = calculateOverallProgress();
        break;
      case "notifications":
        baseValue = notifications.length;
        break;
    }

    let currentValue = baseValue;
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));

      let trend: number;
      if (key === "overallProgress") {
        // Progreso siempre creciente suavemente
        trend = (i / days) * 0.1;
      } else if (key === "completed") {
        // Patrón escalonado para proyectos completados
        trend = Math.floor(i / 2) * 0.15;
      } else if (key === "activeProjects") {
        // Fluctuación suave para proyectos activos
        trend = Math.sin(i / 2) * 0.15;
      } else {
        // Patrón más aleatorio para notificaciones
        trend = (Math.random() - 0.5) * 0.2;
      }

      const variance = Math.random() * 0.1 - 0.05;
      const value = Math.max(
        0,
        Math.round(currentValue * (1 + trend + variance))
      );

      values.push({
        value,
        date: date.toISOString().split("T")[0],
      });

      currentValue = value;
    }

    return values;
  };

  const statsConfig: StatsConfig[] = [
    {
      key: "activeProjects",
      icon: FileText,
      graphData: generateMockData("activeProjects", 14),
      graphConfig: {
        dataKey: "value",
        height: 48,
        showDots: true,
        color: themeColors[theme].activeProjects,
        curveType: "stepAfter",
        gradientOpacity: { start: 0.3, end: 0.05 },
        areaProps: {
          strokeWidth: 2,
        },
      },
    },
    {
      key: "completed",
      icon: CheckCircle,
      graphData: generateMockData("completed", 14),
      graphConfig: {
        dataKey: "value",
        height: 48,
        color: themeColors[theme].completed,
        curveType: "stepAfter",
        gradientOpacity: { start: 0.25, end: 0 },
        areaProps: {
          strokeWidth: 2,
        },
      },
    },
    {
      key: "overallProgress",
      icon: Gauge,
      graphData: generateMockData("overallProgress", 14),
      graphConfig: {
        dataKey: "value",
        height: 48,
        color: themeColors[theme].overallProgress,
        curveType: "monotone",
        gradientOpacity: { start: 0.2, end: 0 },
        areaProps: {
          strokeWidth: 3,
        },
      },
    },
    {
      key: "notifications",
      icon: Bell,
      graphData: generateMockData("notifications", 7),
      graphConfig: {
        dataKey: "value",
        height: 48,
        color: themeColors[theme].notifications,
        curveType: "basis",
        showDots: false,
        gradientOpacity: { start: 0.15, end: 0 },
      },
    },
  ];

  const getStatsValue = (key: StatsConfig["key"]): number | string => {
    switch (key) {
      case "activeProjects":
        return projectsList.filter((p) => p.status === "inProgress").length;
      case "completed":
        return projectsList.filter((p) => p.status === "completed").length;
      case "overallProgress":
        return `${calculateOverallProgress()}%`;
      case "notifications":
        return notifications.length.toString();
      default:
        return 0;
    }
  };

  const handleNotificationClick = (id: string) => {
    console.log(`Notification clicked: ${id}`);
  };

  const handleFileClick = (id: string) => {
    console.log(`File clicked: ${id}`);
  };

  const cardTheme: StatsCardTheme = {
    type: theme,
  };

  const recentFileTheme: RecentFileTheme = {
    type: theme,
    colors:
      theme === "custom"
        ? {
            background: "var(--recent-file-background)",
            backgroundHover: "var(--recent-file-background-hover)",
            border: "var(--recent-file-border)",
            iconColor: "var(--recent-file-icon-color)",
            text: "var(--recent-file-text)",
            textSecondary: "var(--recent-file-text-secondary)",
            typeBackground: "var(--recent-file-type-background)",
          }
        : undefined,
  };

  return (
    <div className={cx("dashboard", `dashboard--theme-${theme}`)}>
      <PageHeader
        title={dictionary.dict.header.title}
        subtitle={dictionary.dict.header.subtitle}
        icon={<Layers size={22} />}
        theme={{ type: theme }}
      />

      <div className={cx("dashboard__container")}>
        <div className={cx("dashboard__stats")}>
          {statsConfig.map(({ key, icon, graphData, graphConfig }) => (
            <StatsCard
              key={key}
              label={dictionary.dict.stats.items[key].label}
              value={getStatsValue(key)}
              icon={icon}
              theme={cardTheme}
              graphData={graphData}
              graphConfig={graphConfig}
            />
          ))}
        </div>

        <div className={cx("dashboard__main")}>
          <DashboardProjects
            projects={projectsList}
            title={dictionary.dict.sections.projects.title}
            theme={{ type: theme }}
            className={cx("dashboard__main-projects")}
          />

          <div className={cx("dashboard__main-sidebar")}>
            <section className={cx("dashboard__main-sidebar-section")}>
              <ThemedTypography
                variant="h4"
                className={cx("dashboard__main-sidebar-section-title")}
              >
                {dictionary.dict.sections.recentFiles.title}
              </ThemedTypography>
              <div className={cx("dashboard__main-sidebar-content")}>
                {recentFiles.map((file: RecentFileType) => (
                  <RecentFile
                    key={file.id}
                    file={file}
                    onClick={() => handleFileClick(file.id)}
                    theme={recentFileTheme}
                  />
                ))}
              </div>
            </section>

            <section className={cx("dashboard__main-sidebar-section")}>
              <ThemedTypography
                variant="h4"
                className={cx("dashboard__main-sidebar-section-title")}
              >
                {dictionary.dict.sections.notifications.title}
              </ThemedTypography>
              <div className={cx("dashboard__main-sidebar-content")}>
                {notifications.map((notification: NotificationType) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={handleNotificationClick}
                    theme={{ type: theme }}
                  />
                ))}
                {/* {notifications.map((notification: NotificationType) => (
                  <NotificationItemOld
                    key={notification.id}
                    notification={notification}
                    onClick={handleNotificationClick}
                  />
                ))} */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardClient;
