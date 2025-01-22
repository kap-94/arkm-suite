// app/dashboard/project/[id]/ProjectDetails.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Upload,
  Filter,
  Plus,
  BarChart3,
  ProjectorIcon,
  DnaIcon,
  Folder,
  FolderKanban,
  Briefcase,
  Terminal,
  Blocks,
  LayoutDashboard,
} from "lucide-react";
import classNames from "classnames/bind";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import {
  MockProjectHeader,
  MockProjectPlanning,
  MockDeliverableCard,
  MockFileCard,
} from "../mockComponents";
import styles from "./page.module.scss";
import { useSettings } from "@/context/SettingsContext";
import { PageHeader } from "@/components/PageHeader";
import { ProjectPlanning } from "@/components/ProjectPlanning";

const cx = classNames.bind(styles);

export interface Project {
  id: string;
  name: string;
  status: "In Progress" | "Completed" | "On Hold";
  lastUpdated: string;
  description: string;
  progress: number;
  deliverables: Deliverable[];
}

export interface Deliverable {
  id: string;
  name: string;
  status: "Pending" | "In Progress" | "Completed";
  progress: number;
  dueDate: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
}
interface ProjectDetailsProps {
  initialProject: Project;
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

export function ProjectDetails({ initialProject }: ProjectDetailsProps) {
  const { theme } = useSettings();

  const [projectData, setProjectData] = useState<Project>(initialProject);

  const handleAddComment = (deliverableId: string, text: string) => {
    setProjectData((prevProject) => {
      const newComment = {
        id: `c${Date.now()}`,
        text,
        author: {
          name: "John Doe",
          avatar: "/api/placeholder/256/256",
        },
        createdAt: new Date().toISOString(),
      };

      return {
        ...prevProject,
        deliverables: prevProject.deliverables.map((deliverable) =>
          deliverable.id === deliverableId
            ? {
                ...deliverable,
                comments: [...(deliverable.comments || []), newComment],
              }
            : deliverable
        ),
      };
    });
  };

  return (
    <div className={cx("project-details", `project-details--theme-${theme}`)}>
      <PageHeader
        icon={<LayoutDashboard size={22} />}
        title={"Project Details"}
        subtitle={"Details of the project"}
        theme={{ type: theme }}
      />

      <MockProjectHeader project={projectData} />
      <ProjectPlanning projectId={projectData.id} theme={{ type: theme }} />

      {/* <div className={cx("project-details__grid")}>
        <div className={cx("project-details__main")}>
          <section className={cx("project-details__deliverables", "card")}>
            <div className={cx("project-details__deliverables-header")}>
              <ThemedTypography
                variant="h4"
                className={cx("project-details__deliverables-title")}
              >
                Project Deliverables
              </ThemedTypography>
              <div className={cx("project-details__deliverables-actions")}>
                <button
                  className={cx(
                    "project-details__button",
                    "project-details__button--secondary"
                  )}
                >
                  <Filter className={cx("project-details__button-icon")} />
                  Filter
                </button>
                <button
                  className={cx(
                    "project-details__button",
                    "project-details__button--primary"
                  )}
                >
                  <Plus className={cx("project-details__button-icon")} />
                  Add Deliverable
                </button>
              </div>
            </div>
            <div className={cx("project-details__deliverables-grid")}>
              {projectData.deliverables.map((deliverable) => (
                <MockDeliverableCard
                  key={deliverable.id}
                  deliverable={deliverable}
                  onAddComment={handleAddComment}
                />
              ))}
            </div>
          </section>

          <Link
            href={`/dashboard/project/${projectData.id}/analytics`}
            className={cx("project-details__analytics-link")}
          >
            <div className={cx("project-details__analytics-content")}>
              <div className={cx("project-details__analytics-icon-wrapper")}>
                <BarChart3 className={cx("project-details__analytics-icon")} />
              </div>
              <div className={cx("project-details__analytics-text")}>
                <ThemedTypography variant="h4">View Analytics</ThemedTypography>
                <ThemedTypography variant="p2" color="secondary">
                  Access detailed project metrics and insights
                </ThemedTypography>
              </div>
            </div>
            <span className={cx("project-details__analytics-arrow")}>
              &rarr;
            </span>
          </Link>
        </div>

        <aside className={cx("project-details__sidebar")}>
          <section className={cx("project-details__files", "card")}>
            <div className={cx("project-details__files-header")}>
              <ThemedTypography
                variant="h4"
                className={cx("project-details__files-title")}
              >
                Project Files
              </ThemedTypography>
              <button
                className={cx(
                  "project-details__button",
                  "project-details__button--primary"
                )}
              >
                <Upload className={cx("project-details__button-icon")} />
                Upload
              </button>
            </div>
            <div className={cx("project-details__files-list")}>
              {recentFiles?.map((file) => (
                <MockFileCard
                  key={file.id}
                  file={file}
                  projectId={projectData.id}
                />
              ))}
            </div>
          </section>
        </aside>
      </div> */}
    </div>
  );
}
