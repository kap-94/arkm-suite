"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import {
  Bell,
  FileText,
  Layers,
  Grid,
  List,
  Gauge,
  CheckCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { projects, notifications, recentFiles } from "./mockData";
import type { Project } from "@/components/ProjectCard";
import type { NotificationType } from "@/components/NotificationItem/types";
import type { RecentFileType } from "@/components/RecentFile/types";
import ProjectCard from "@/components/ProjectCard";
import { PageHeader } from "@/components/PageHeader";
import { StatsCard } from "@/components/StatsCard";
import { RecentFile } from "@/components/RecentFile";
import { NotificationItem } from "@/components/NotificationItem";
import styles from "./page.module.scss";

const cx = classNames.bind(styles);

interface StatsData {
  label: string;
  value: number | string;
  icon: LucideIcon;
}

const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Función auxiliar para calcular el progreso general
  const calculateOverallProgress = () => {
    const totalProjects = projects.length;
    if (totalProjects === 0) return 0;

    const totalProgress = projects.reduce((acc, project) => {
      // Asumiendo que tienes un campo progress en tu tipo Project
      return acc + (project.progress || 0);
    }, 0);

    return Math.round(totalProgress / totalProjects);
  };

  const handleToggle = () => {
    setViewMode((current) => (current === "list" ? "grid" : "list"));
  };

  const stats: StatsData[] = [
    {
      label: "Active Projects",
      value: projects.filter((p: Project) => p.status === "In Progress").length,
      icon: FileText,
    },
    {
      label: "Completed",
      value: projects.filter((p: Project) => p.status === "Completed").length,
      icon: CheckCircle,
    },
    {
      label: "Overall Progress",
      value: `${calculateOverallProgress()}%`,
      icon: Gauge,
    },
    {
      label: "Notifications",
      value: notifications.filter((n: NotificationType) => !n.read).length,
      icon: Bell,
    },
  ];

  const handleNotificationClick = (id: string) => {
    console.log(`Notification clicked: ${id}`);
  };

  const handleFileClick = (id: string) => {
    console.log(`File clicked: ${id}`);
  };

  return (
    <div className={cx("dashboard")}>
      <PageHeader
        title="Client Suite"
        subtitle="Welcome back! Here's what's happening with your projects."
        icon={<Layers size={22} />}
      />

      <div className={cx("dashboard__container")}>
        <div className={cx("dashboard__stats")}>
          {stats.map(({ label, value, icon: Icon }) => (
            <StatsCard key={label} label={label} value={value} icon={Icon} />
          ))}
        </div>

        <div className={cx("dashboard__main")}>
          <div className={cx("dashboard__main-projects")}>
            <div className={cx("dashboard__main-projects-header")}>
              <h2 className={cx("dashboard__main-projects-title")}>
                Your Projects
              </h2>
              <button
                className={cx("dashboard__view-toggle-button", {
                  "dashboard__view-toggle-button--active": viewMode === "grid",
                })}
                onClick={handleToggle}
                title={`Switch to ${
                  viewMode === "list" ? "grid" : "list"
                } view`}
              >
                {viewMode === "list" ? <Grid size={18} /> : <List size={18} />}
              </button>
            </div>

            <div
              className={cx("dashboard__main-projects-list", {
                "dashboard__main-projects-list--grid": viewMode === "grid",
              })}
            >
              {projects.map((project: Project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  size={viewMode === "grid" ? "small" : "default"}
                />
              ))}
            </div>
          </div>

          <div className={cx("dashboard__main-sidebar")}>
            <section className={cx("dashboard__main-sidebar-section")}>
              <h2 className={cx("dashboard__main-sidebar-section-title")}>
                Recent Files
              </h2>
              <div className={cx("dashboard__main-sidebar-content")}>
                {recentFiles.map((file: RecentFileType) => (
                  <RecentFile
                    key={file.id}
                    file={file}
                    onClick={() => handleFileClick(file.id)}
                  />
                ))}
              </div>
            </section>

            <section className={cx("dashboard__main-sidebar-section")}>
              <h2 className={cx("dashboard__main-sidebar-section-title")}>
                Recent Notifications
              </h2>
              <div className={cx("dashboard__main-sidebar-content")}>
                {notifications.map((notification: NotificationType) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={handleNotificationClick}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
