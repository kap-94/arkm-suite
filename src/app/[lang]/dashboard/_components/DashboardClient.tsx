"use client";

import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import { Bell, FileText, Layers, Gauge, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { NotificationType } from "@/components/NotificationItem/types";
import type { ContentItemTheme } from "@/components/ContentItem/types";
import type {
  GraphConfig,
  IllustrationConfig,
} from "@/components/StatsCard/types";
import { Content } from "@/types/models/Content";
import { DashboardDictionary } from "@/types/dictionary/dashboard.types";
import { ProjectCardItem } from "@/components/ProjectCard/types";

import { useSettings } from "@/context/SettingsContext";

import {
  ActiveProjectsIllustration,
  NotificationBellIllustration,
  CompletedProjectsIllustration,
  PulseProgress,
} from "@/lib/dashboard-canvas-illustrations";

import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { PageHeader } from "@/components/PageHeader";
import { StatsCard } from "@/components/StatsCard";
import ContentItem from "@/components/ContentItem";
import { NotificationItem } from "@/components/NotificationItem";
import DashboardProjects from "@/components/DashboardProjects";

import styles from "../page.module.scss";
import { buildLocalizedPath } from "@/utils/path";

const cx = classNames.bind(styles);

interface StatsConfig {
  key: keyof DashboardStats;
  icon: LucideIcon;
  graphData?: Array<{ value: number; date: string }>;
  graphConfig?: GraphConfig;
  illustration?: IllustrationConfig;
}

interface DashboardStats {
  activeProjects: number;
  completed: number;
  overallProgress: number;
  notifications: number;
}

interface DashboardClientProps {
  projects: ProjectCardItem[];
  stats: DashboardStats;
  recentContents: Content[];
  notifications: NotificationType[];
  dictionary: {
    dict: DashboardDictionary;
  };
}

export function DashboardClient({
  dictionary,
  projects,
  stats,
  recentContents,
  notifications,
}: DashboardClientProps) {
  const { theme, language } = useSettings();
  const router = useRouter();

  const statsConfig: StatsConfig[] = [
    {
      key: "activeProjects",
      icon: FileText,
      illustration: {
        node: <ActiveProjectsIllustration color={"rgb(99, 102, 241)"} />,
        position: "background",
      },
    },
    {
      key: "completed",
      icon: CheckCircle,
      illustration: {
        node: <CompletedProjectsIllustration color={"rgb(99, 102, 241)"} />,
        position: "background",
      },
    },
    {
      key: "overallProgress",
      icon: Gauge,
      illustration: {
        node: <PulseProgress color={"rgb(99, 102, 241)"} />,
        position: "background",
      },
    },
    {
      key: "notifications",
      icon: Bell,
      illustration: {
        node: <NotificationBellIllustration color={"rgb(99, 102, 241)"} />,
        position: "background",
      },
    },
  ];

  const getStatsValue = (key: StatsConfig["key"]): number | string => {
    switch (key) {
      case "activeProjects":
        return stats.activeProjects;
      case "completed":
        return stats.completed;
      case "overallProgress":
        return `${stats.overallProgress}%`;
      case "notifications":
        return notifications.length.toString();
      default:
        return 0;
    }
  };

  const handleNotificationClick = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      switch (notification.variant) {
        // case "file":
        //   router.push(`/dashboard/project/${notification.project.slug}/files`);
        //   break;
        case "milestone":
          router.push(`/dashboard/project/${notification.project.slug}`);
          break;
        // case "status":
        //   router.push(`/dashboard/project/${notification.project.slug}/overview`);
        //   break;
        // case "team":
        //   router.push(`/dashboard/project/${notification.project.slug}/team`);
        //   break;
        default:
          router.push(`/dashboard/project/${notification.project.slug}`);
      }
    }
  };

  const handleFileClick = (projectId: string, contentId: string) => {
    router.push(
      buildLocalizedPath(
        `/dashboard/project/${projectId}/content/${contentId}`,
        language
      )
    );
  };

  const recentFileTheme: ContentItemTheme = {
    type: theme === "light" ? "custom" : "dark",
    colors:
      theme === "light"
        ? {
            background: "#ffffff",
            backgroundHover: "#f7f7f7",
            border: "rgba(0, 0, 0, 0.07)",
            text: "rgba(0, 0, 0, 0.7);",
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
          {statsConfig.map(({ key, icon, illustration }, id) => (
            <StatsCard
              key={id}
              label={dictionary.dict.stats.items[key].label}
              value={getStatsValue(key)}
              icon={icon}
              theme={{ type: theme }}
              illustration={illustration}
            />
          ))}
        </div>

        <div className={cx("dashboard__main")}>
          <DashboardProjects
            projects={projects}
            dictionary={dictionary.dict.sections.projects}
            title={dictionary.dict.sections.projects.title}
            viewOptions={dictionary.dict.sections.projects.viewOptions}
            theme={{ type: theme }}
            className={cx("dashboard__main-projects")}
          />

          <div className={cx("dashboard__main-sidebar")}>
            <section className={cx("dashboard__main-sidebar-section")}>
              <ThemedTypography
                variant="h4"
                color="primary"
                fontWeight={400}
                className={cx("dashboard__main-sidebar-section-title")}
              >
                {dictionary.dict.sections.recentFiles.title}
              </ThemedTypography>
              <div className={cx("dashboard__main-sidebar-content")}>
                {recentContents.map((content: Content) => {
                  return (
                    <ContentItem
                      key={`${content.id}_${content.project.id}`}
                      content={content}
                      onClick={() =>
                        handleFileClick(content.project.slug, content.id)
                      }
                      theme={recentFileTheme}
                    />
                  );
                })}
              </div>
            </section>

            <section className={cx("dashboard__main-sidebar-section")}>
              <ThemedTypography
                variant="h4"
                color="primary"
                fontWeight={400}
                className={cx("dashboard__main-sidebar-section-title")}
              >
                {dictionary.dict.sections.notifications.title}
              </ThemedTypography>
              <div className={cx("dashboard__main-sidebar-content")}>
                {notifications.map((notification: NotificationType) => (
                  <NotificationItem
                    key={`${notification.id}_${notification.project.id}`}
                    notification={notification}
                    onClick={handleNotificationClick}
                    theme={{ type: theme }}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
