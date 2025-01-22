// components/GanttView/mockData.ts
import { Task } from "./types";

export const mockTasks: Task[] = [
  {
    id: "1",
    name: "Project Planning & Setup",
    startDate: "2024-03-01",
    endDate: "2024-03-05",
    progress: 100,
    assignees: [
      {
        name: "Sarah Johnson",
        avatar: "/api/placeholder/256/256",
      },
    ],
    priority: "high",
    status: "on-track",
    description:
      "Initial project setup including requirements gathering and team allocation",
    milestones: [
      {
        date: "2024-03-05",
        title: "Project Kickoff",
      },
    ],
  },
  {
    id: "2",
    name: "Design System & UI/UX",
    startDate: "2024-03-06",
    endDate: "2024-03-15",
    progress: 70,
    dependencies: ["1"],
    assignees: [
      {
        name: "Michael Chen",
        avatar: "/api/placeholder/256/256",
      },
      {
        name: "Lisa Wong",
        avatar: "/api/placeholder/256/256",
      },
    ],
    priority: "medium",
    status: "at-risk",
    description: "Create comprehensive design system and UI components",
    milestones: [
      {
        date: "2024-03-15",
        title: "Design System Complete",
      },
    ],
  },
  {
    id: "3",
    name: "Frontend Development",
    startDate: "2024-03-16",
    endDate: "2024-03-31",
    progress: 30,
    dependencies: ["2"],
    assignees: [
      {
        name: "Emily Davis",
        avatar: "/api/placeholder/256/256",
      },
      {
        name: "David Kim",
        avatar: "/api/placeholder/256/256",
      },
    ],
    priority: "high",
    status: "delayed",
    description:
      "Implement frontend components and integrate with backend APIs",
    milestones: [
      {
        date: "2024-03-25",
        title: "MVP Release",
      },
    ],
  },
  {
    id: "4",
    name: "Backend API Development",
    startDate: "2024-03-10",
    endDate: "2024-03-25",
    progress: 45,
    assignees: [
      {
        name: "Alex Thompson",
        avatar: "/api/placeholder/256/256",
      },
    ],
    priority: "high",
    status: "at-risk",
    description: "Develop and test backend API endpoints",
    milestones: [
      {
        date: "2024-03-20",
        title: "API Documentation",
      },
    ],
  },
  {
    id: "5",
    name: "Testing & QA",
    startDate: "2024-03-20",
    endDate: "2024-03-31",
    progress: 15,
    dependencies: ["3", "4"],
    assignees: [
      {
        name: "Rachel Martinez",
        avatar: "/api/placeholder/256/256",
      },
      {
        name: "Tom Wilson",
        avatar: "/api/placeholder/256/256",
      },
    ],
    priority: "medium",
    status: "on-track",
    description:
      "Comprehensive testing including unit tests, integration tests, and user acceptance testing",
    milestones: [
      {
        date: "2024-03-30",
        title: "Testing Complete",
      },
    ],
  },
];

export const mockMetrics = {
  timeSpent: {
    estimated: 160,
    actual: 145,
    breakdown: {
      design: 45,
      development: 65,
      testing: 25,
      meetings: 10,
    },
  },
  deliverables: {
    total: 12,
    completed: 8,
    onTrack: 2,
    delayed: 2,
  },
  risks: {
    total: 5,
    high: 1,
    medium: 2,
    low: 2,
    mitigated: 3,
  },
};

export const statusColorMap = {
  "on-track": {
    border: "var(--success-color)",
    background: "rgba(var(--success-color-rgb), 0.2)",
  },
  "at-risk": {
    border: "var(--warning-color)",
    background: "rgba(var(--warning-color-rgb), 0.2)",
  },
  delayed: {
    border: "var(--error-color)",
    background: "rgba(var(--error-color-rgb), 0.2)",
  },
};

export const priorityColorMap = {
  low: {
    text: "var(--success-color)",
    background: "rgba(var(--success-color-rgb), 0.1)",
  },
  medium: {
    text: "var(--warning-color)",
    background: "rgba(var(--warning-color-rgb), 0.1)",
  },
  high: {
    text: "var(--error-color)",
    background: "rgba(var(--error-color-rgb), 0.1)",
  },
};
