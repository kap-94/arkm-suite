// components/GanttView/GanttView.tsx
import React, { useState, useCallback } from "react";
import {
  Calendar,
  Clock,
  Users,
  AlertCircle,
  Link as LinkIcon,
  ChevronRight,
  Target,
  ArrowRight,
} from "lucide-react";
import classNames from "classnames/bind";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { GanttViewProps, Task } from "./types";
import { mockTasks } from "./mockData";
import styles from "./GanttView.module.scss";

const cx = classNames.bind(styles);

export const GanttView: React.FC<GanttViewProps> = ({
  projectId,
  theme = { type: "light" },
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showWeekends, setShowWeekends] = useState(true);
  const [view, setView] = useState<"month" | "week">("month");

  const tasks = mockTasks;
  const startDate = new Date("2024-03-01");
  const endDate = new Date("2024-03-31");
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const getTaskPosition = useCallback(
    (task: Task) => {
      const taskStart = new Date(task.startDate);
      const taskEnd = new Date(task.endDate);
      const left =
        ((taskStart.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24) /
          totalDays) *
        100;
      const width =
        ((taskEnd.getTime() - taskStart.getTime()) /
          (1000 * 60 * 60 * 24) /
          totalDays) *
        100;
      return { left: `${left}%`, width: `${width}%` };
    },
    [startDate, totalDays]
  );

  const isWeekend = (day: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day - 1);
    return [0, 6].includes(date.getDay());
  };

  const getDayLabel = (day: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day - 1);
    return date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
  };

  const totalMilestones = tasks.reduce(
    (acc, task) => acc + (task.milestones?.length || 0),
    0
  );

  const metrics = [
    {
      icon: <Calendar className={cx("gantt__metrics-icon")} />,
      label: "Start Date",
      value: "Mar 1, 2024",
    },
    {
      icon: <Calendar className={cx("gantt__metrics-icon")} />,
      label: "End Date",
      value: "Mar 31, 2024",
    },
    {
      icon: <Clock className={cx("gantt__metrics-icon")} />,
      label: "Duration",
      value: `${totalDays} days`,
    },
    {
      icon: <Target className={cx("gantt__metrics-icon")} />,
      label: "Milestones",
      value: totalMilestones,
    },
  ];

  const MetricsSection = () => {
    return (
      <div className={cx("gantt__metrics")}>
        {metrics.map((metric, index) => (
          <React.Fragment key={metric.label}>
            <div className={cx("gantt__metric")}>
              {metric.icon}
              <div className={cx("gantt__metric-data")}>
                <ThemedTypography
                  variant="p3"
                  color="secondary"
                  className={cx("gantt__metric-label")}
                >
                  {metric.label}
                </ThemedTypography>
                <ThemedTypography
                  variant="h5"
                  className={cx("gantt__metric-value")}
                >
                  {metric.value}
                </ThemedTypography>
              </div>
            </div>
            {index < metrics.length - 1 && (
              <div className={cx("gantt__metric-separator")} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className={cx("gantt", `gantt--theme-${theme.type}`)}>
      <div className={cx("gantt__header")}>
        {/* <MetricsSection/> */}

        {/* <div className={cx("gantt__metrics")}>
          {metrics.map((metric) => (
            <div key={metric.label} className={cx("gantt__metric-card")}>
              <div className={cx("gantt__metric-content")}>
                {metric.icon}
                <div>
                  <ThemedTypography variant="p2" color="secondary">
                    {metric.label}
                  </ThemedTypography>
                  <ThemedTypography variant="h4">
                    {metric.value}
                  </ThemedTypography>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        <div className={cx("gantt__controls")}>
          <div className={cx("gantt__status-legend")}>
            {[
              { label: "On Track", color: "success" },
              { label: "At Risk", color: "warning" },
              { label: "Delayed", color: "error" },
            ].map((status) => (
              <div key={status.label} className={cx("gantt__status-item")}>
                <span
                  className={cx(
                    "gantt__status-dot",
                    `gantt__status-dot--${status.color}`
                  )}
                />
                <ThemedTypography variant="p2" color="secondary">
                  {status.label}
                </ThemedTypography>
              </div>
            ))}
          </div>

          <div className={cx("gantt__view-controls")}>
            <label className={cx("gantt__checkbox")}>
              <input
                type="checkbox"
                checked={showWeekends}
                onChange={(e) => setShowWeekends(e.target.checked)}
                className={cx("gantt__checkbox-input")}
              />
              <ThemedTypography variant="p2" color="secondary">
                Show Weekends
              </ThemedTypography>
            </label>

            <select
              value={view}
              onChange={(e) => setView(e.target.value as "month" | "week")}
              className={cx("gantt__view-select")}
            >
              <option value="month">Month View</option>
              <option value="week">Week View</option>
            </select>
          </div>
        </div>
      </div>

      <div className={cx("gantt__timeline")}>
        <div className={cx("gantt__timeline-header")}>
          <div className={cx("gantt__task-column")}>
            <ThemedTypography variant="p2" color="secondary">
              Task
            </ThemedTypography>
          </div>
          <div className={cx("gantt__days-grid")}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={cx("gantt__day", {
                  "gantt__day--weekend": showWeekends && isWeekend(day),
                })}
              >
                <div className={cx("gantt__day-label")}>
                  <ThemedTypography variant="p3" color="tertiary">
                    {getDayLabel(day)}
                  </ThemedTypography>
                </div>
                <div className={cx("gantt__day-number")}>
                  <ThemedTypography variant="p3" color="secondary">
                    {day}
                  </ThemedTypography>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cx("gantt__tasks")}>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cx("gantt__task-row", {
                "gantt__task-row--selected": selectedTask?.id === task.id,
              })}
              onClick={() =>
                setSelectedTask(selectedTask?.id === task.id ? null : task)
              }
            >
              <div className={cx("gantt__task-info")}>
                <div className={cx("gantt__task-card")}>
                  <div className={cx("gantt__task-header")}>
                    <ThemedTypography variant="p1">
                      {task.name}
                    </ThemedTypography>
                    <span
                      className={cx(
                        "gantt__task-priority",
                        `gantt__task-priority--${task.priority}`
                      )}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className={cx("gantt__task-progress")}>
                    <div className={cx("gantt__progress-bar")}>
                      <div
                        className={cx("gantt__progress-fill")}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <ThemedTypography variant="p3" color="secondary">
                      {task.progress}%
                    </ThemedTypography>
                  </div>

                  {selectedTask?.id === task.id && (
                    <div className={cx("gantt__task-details")}>
                      <ThemedTypography variant="p2" color="secondary">
                        {task.description}
                      </ThemedTypography>

                      <div className={cx("gantt__task-assignees")}>
                        <div className={cx("gantt__assignee-avatars")}>
                          {task.assignees.map((assignee, index) => (
                            <img
                              key={index}
                              src={assignee.avatar}
                              alt={assignee.name}
                              className={cx("gantt__assignee-avatar")}
                            />
                          ))}
                        </div>
                        <ThemedTypography variant="p3" color="secondary">
                          {task.assignees.map((a) => a.name).join(", ")}
                        </ThemedTypography>
                      </div>

                      {/* Dependencies and Milestones sections */}
                    </div>
                  )}
                </div>
              </div>

              <div className={cx("gantt__task-timeline")}>
                <div
                  className={cx(
                    "gantt__task-bar",
                    `gantt__task-bar--${task.status}`,
                    {
                      "gantt__task-bar--selected": selectedTask?.id === task.id,
                    }
                  )}
                  style={getTaskPosition(task)}
                >
                  {/* Dependencies arrows */}
                  {/* Milestones */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
