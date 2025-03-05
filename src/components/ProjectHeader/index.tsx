"use client";

import React, { useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import { useRouter } from "next/navigation";
import {
  Users,
  Clock,
  Target,
  GitPullRequest,
  TrendingUp,
  ChevronDown,
  Pause,
  XCircle,
  LoaderCircle,
  CheckCircle,
} from "lucide-react";
import type { ProjectHeaderProps } from "./types";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { Dropdown, type Option } from "@/components/Dropdown";
import Badge from "@/components/Badge";
import { renderConnectedDots } from "./canvas-elements";
import styles from "./ProjectHeader.module.scss";

const cx = classNames.bind(styles);

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  availableProjects,
  onProjectChange,
  dictionary,
  theme = { type: "light" },
  className,
}) => {
  const router = useRouter();
  const {
    id,
    name,
    description,
    metrics = [],
    status,
    progress = 0,
    client,
    owner,
  } = project;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (theme.type === "dark" && canvasRef.current) {
      const canvas = canvasRef.current;
      const parent = canvas.parentElement;

      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }

      const ctx = canvas.getContext("2d");
      if (ctx) {
        renderConnectedDots(ctx, canvas.width, canvas.height);
      }
    }
  }, []);

  const getGlassmorphismClass = () => {
    if (!theme.glassmorphism?.enabled) return "";
    const variant = theme.glassmorphism.variant || "subtle";
    return `project-header__main--glass-${variant}`;
  };

  const getStatusIcon = (statusValue: string) => {
    const statusIcons = {
      inProgress: <LoaderCircle color="#9698fd" />,
      onHold: <Pause color="#808080" />,
      completed: <CheckCircle color="#2ECC71" />,
      cancelled: <XCircle color="#E74C3C" />,
    };

    return statusIcons[statusValue as keyof typeof statusIcons] || null;
  };

  const projectOptions = useMemo<Option[]>(
    () =>
      availableProjects.map((project) => ({
        value: project.slug,
        label: (
          <div className={cx("project-header__dropdown-item")}>
            <div className={cx("project-header__dropdown-item-content")}>
              <ThemedTypography variant="p2" color="secondary">
                {project.name}
              </ThemedTypography>
            </div>
          </div>
        ),
      })),
    [availableProjects]
  );

  const selectedProject: Option = useMemo(
    () => ({
      value: id,
      label: (
        <div className={cx("project-header__dropdown-selected")}>
          <ThemedTypography variant="p2" fontWeight={400} color="secondary">
            {dictionary.group.label}
          </ThemedTypography>
        </div>
      ),
    }),
    [id, dictionary]
  );

  const handleProjectChange = (option: Option) => {
    onProjectChange(option.value);
  };

  return (
    <div
      className={cx(
        "project-header",
        `project-header--theme-${theme.type}`,
        className
      )}
      style={
        {
          "--project-header-background": theme.colors?.background,
          "--project-header-border": theme.colors?.border,
          "--project-header-text": theme.colors?.text,
          "--project-header-secondary-text": theme.colors?.secondaryText,
          "--project-header-gradient": theme.colors?.gradient,
          "--project-header-accent": theme.colors?.accent,
          "--project-header-hover": theme.colors?.hover,
        } as React.CSSProperties
      }
    >
      {theme.type === "dark" && (
        <canvas ref={canvasRef} className={cx("project-header__canvas")} />
      )}

      <div className={cx("project-header__main", getGlassmorphismClass())}>
        <div className={cx("project-header__content")}>
          <div className={cx("project-header__header")}>
            <div className={cx("project-header__title-group")}>
              <div className={cx("project-header__title-section")}>
                <div className={cx("project-header__title-wrapper")}>
                  <ThemedTypography
                    variant="h4"
                    className={cx("project-header__title")}
                    fontWeight={400}
                    noWrap
                  >
                    {name}
                  </ThemedTypography>
                  <div className={cx("project-header__status")}>
                    <div className={cx("project-header__status-icon")}>
                      {getStatusIcon(status.value)}
                    </div>
                    <Badge
                      variant="status"
                      status={status.value}
                      label={status.label}
                      size="small"
                      theme={{ type: "dark" }}
                      className={cx("project-header__status-badge")}
                    />
                  </div>
                </div>
                <div className={cx("project-header__subtitle")}>
                  {client && owner && (
                    <ThemedTypography
                      variant="p2"
                      color="tertiary"
                      fontWeight={300}
                      className={cx("project-header__divider")}
                    >
                      •
                    </ThemedTypography>
                  )}
                  {client && (
                    <ThemedTypography
                      variant="p2"
                      color="tertiary"
                      className={cx("project-header__client")}
                      fontWeight={300}
                    >
                      {client.name}
                    </ThemedTypography>
                  )}
                  {client && owner && (
                    <ThemedTypography
                      variant="p2"
                      color="tertiary"
                      fontWeight={300}
                      className={cx("project-header__divider")}
                    >
                      •
                    </ThemedTypography>
                  )}
                  {owner && (
                    <ThemedTypography
                      variant="p2"
                      color="tertiary"
                      fontWeight={300}
                      className={cx("project-header__owner")}
                    >
                      {dictionary.owner.label.replace("{{name}}", owner.name)}
                    </ThemedTypography>
                  )}
                </div>
              </div>

              <div className={cx("project-header__actions")}>
                <Dropdown
                  options={projectOptions}
                  selected={selectedProject}
                  onSelectedChange={handleProjectChange}
                  theme={{
                    type: theme.type,
                    customValues: {
                      border:
                        theme.type === "dark"
                          ? "rgba(241, 228, 228, .085)"
                          : "",
                      text:
                        theme.type === "dark" ? "rgba(241, 228, 228, .85)" : "",
                    },
                  }}
                  icon={<ChevronDown size={18} />}
                  id="project-selector"
                  variant="filter"
                  className={cx("project-header__dropdown")}
                  closeOnScroll
                />
              </div>
            </div>

            <div className={cx("project-header__info")}>
              <ThemedTypography
                variant="p1"
                fontWeight={300}
                className={cx("project-header__description")}
              >
                {description}
              </ThemedTypography>
              <div className={cx("project-header__progress-wrapper")}>
                <div className={cx("project-header__progress-text")}>
                  <ThemedTypography variant="p2" fontWeight={500}>
                    {dictionary.progress.label}
                  </ThemedTypography>
                  <ThemedTypography
                    variant="p2"
                    fontWeight={500}
                    className={cx("project-header__progress-percentage")}
                  >
                    {dictionary.progress.percentage.replace(
                      "{{value}}",
                      progress.toString()
                    )}
                  </ThemedTypography>
                </div>
                <div className={cx("project-header__progress-trend")}>
                  <TrendingUp className={cx("project-header__trend-icon")} />
                  <ThemedTypography variant="p3" color="primary">
                    {dictionary.progress.trend}
                  </ThemedTypography>
                </div>
              </div>
            </div>
          </div>

          {/* Renderizado de las métricas */}
          <div className={cx("project-header__metrics")}>
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={cx(
                  "project-header__metric",
                  `project-header__metric--${metric.variant}`
                )}
              >
                {metric.icon === "Clock" && (
                  <Clock
                    strokeWidth={1.8}
                    className={cx("project-header__metric-icon")}
                  />
                )}
                {metric.icon === "GitPullRequest" && (
                  <GitPullRequest
                    strokeWidth={1.8}
                    className={cx("project-header__metric-icon")}
                  />
                )}
                {metric.icon === "Target" && (
                  <Target
                    strokeWidth={1.8}
                    className={cx("project-header__metric-icon")}
                  />
                )}
                {metric.icon === "Users" && (
                  <Users
                    strokeWidth={1.8}
                    className={cx("project-header__metric-icon")}
                  />
                )}
                <div className={cx("project-header__metric-content")}>
                  <ThemedTypography
                    variant="p3"
                    color="secondary"
                    fontWeight={500}
                    className={cx("project-header__metric-label")}
                    noWrap
                  >
                    {metric.label}
                  </ThemedTypography>
                  <ThemedTypography
                    variant="p2"
                    color="secondary"
                    className={cx("project-header__metric-value")}
                    noWrap
                    fontWeight={500}
                  >
                    {metric.value.toLowerCase()}
                  </ThemedTypography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
