import { NotificationType } from "@/components/NotificationItem/types";
import { subDays, subHours, addDays } from "date-fns";

// Types definition
interface Stage {
  name: string;
  threshold: number;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "In Progress" | "Completed" | "On Hold";
  progress: number;
  lastUpdated: Date;
  team: string[];
  priority: "Low" | "Medium" | "High";
  client?: string;
  stages: Stage[];
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  timestamp: Date;
  type: "task" | "message" | "alert" | "update";
}

export interface RecentFile {
  id: string;
  name: string;
  size: string;
  type: string;
  lastModified: Date;
}
// stages: [
//   { name: "Discovery", threshold: 20, color: "#93c5fd" },
//   { name: "UX Design", threshold: 40, color: "#60a5fa" },
//   { name: "UI Design", threshold: 60, color: "#0ea5e9" },
//   { name: "Development", threshold: 80, color: "#0d9488" },
//   { name: "Testing", threshold: 100, color: "#4ade80" },
// ],

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "E-commerce Platform Redesign",
    description:
      "Comprehensive redesign of the company's online shopping platform to improve user experience and conversion rates.",
    status: "In Progress",
    progress: 100,
    lastUpdated: subDays(new Date(), 3),
    team: ["Sarah Johnson", "Mike Chen", "Emily Rodriguez"],
    priority: "High",
    client: "GlobalShop Inc.",
    stages: [
      { name: "Discovery", threshold: 20, color: "#93c5fd" },
      { name: "UX Design", threshold: 40, color: "#60a5fa" },
      { name: "UI Design", threshold: 60, color: "#4d7fff" },
      { name: "Development", threshold: 80, color: "#14b8a6" },
      { name: "Testing", threshold: 100, color: "#4ade80" },
    ],
  },
  {
    id: "proj-002",
    name: "Mobile Banking App Security Upgrade",
    description:
      "Implementing advanced security protocols and improving encryption mechanisms for the mobile banking application.",
    status: "In Progress",
    progress: 45,
    lastUpdated: subDays(new Date(), 7),
    team: ["David Kim", "Aisha Patel"],
    priority: "High",
    client: "SecureBank Ltd.",
    stages: [
      { name: "Security Audit", threshold: 20, color: "#93c5fd" },
      { name: "Protocol Design", threshold: 40, color: "#60a5fa" },
      { name: "Implementation", threshold: 60, color: "#4d7fff" },
      { name: "Testing", threshold: 80, color: "#14b8a6" },
      { name: "Deployment", threshold: 100, color: "#4ade80" },
    ],
  },
  {
    id: "proj-003",
    name: "Corporate Website Localization",
    description:
      "Translating and adapting the corporate website for key international markets, including SEO optimization.",
    status: "Completed",
    progress: 100,
    lastUpdated: subDays(new Date(), 14),
    team: ["Carlos Mendez", "Lisa Wong"],
    priority: "Medium",
    client: "GlobalTech Corporation",
    stages: [
      { name: "Market Research", threshold: 20, color: "#93c5fd" },
      { name: "Content Translation", threshold: 40, color: "#60a5fa" },
      { name: "SEO Optimization", threshold: 60, color: "#4d7fff" },
      { name: "Review", threshold: 80, color: "#14b8a6" },
      { name: "Launch", threshold: 100, color: "#4ade80" },
    ],
  },
  {
    id: "proj-004",
    name: "Internal Communication Platform",
    description:
      "Development of a new internal communication and collaboration tool for enterprise-wide deployment.",
    status: "On Hold",
    progress: 30,
    lastUpdated: subDays(new Date(), 10),
    team: ["Robert Taylor", "Anna Kowalski"],
    priority: "Low",
    client: "Internal Project",
    stages: [
      { name: "Concept", threshold: 20, color: "#93c5fd" },
      { name: "Requirements", threshold: 40, color: "#60a5fa" },
      { name: "Design", threshold: 60, color: "#4d7fff" },
      { name: "Prototype", threshold: 80, color: "#14b8a6" },
      { name: "Approval", threshold: 100, color: "#4ade80" },
    ],
  },
];

// Mock Notifications
export const notifications: NotificationType[] = [
  {
    id: "notif-001",
    variant: "progress",
    projectId: "proj-001",
    projectName: "E-commerce Platform Redesign",
    previousProgress: 80,
    newProgress: 100,
    stageName: "UI/UX phase",
    status: "success",
    priority: "medium",
    read: false,
    timestamp: subHours(new Date(), 2),
  },
  {
    id: "notif-002",
    variant: "comment",
    projectId: "proj-002",
    projectName: "Mobile Banking App",
    commentBy: "David Kim",
    commentPreview:
      "We should consider implementing biometric authentication...",
    threadId: "thread-123",
    priority: "high",
    read: false,
    timestamp: subHours(new Date(), 3),
    link: "/projects/proj-002/comments/thread-123",
  },
  {
    id: "notif-003",
    variant: "file",
    projectId: "proj-001",
    projectName: "E-commerce Platform Redesign",
    fileName: "UI-Design-V2.fig",
    fileType: "Figma",
    fileSize: "15.2 MB",
    action: "created",
    priority: "medium",
    read: true,
    timestamp: subHours(new Date(), 4),
    link: "/projects/proj-001/files/UI-Design-V2",
  },
  {
    id: "notif-004",
    variant: "mention",
    projectId: "proj-003",
    projectName: "Corporate Website Localization",
    mentionedBy: "Emily Rodriguez",
    context: "Could you review the latest translations? @YourName",
    threadId: "thread-456",
    priority: "high",
    read: false,
    timestamp: subHours(new Date(), 5),
    link: "/projects/proj-003/comments/thread-456",
  },
  {
    id: "notif-005",
    variant: "team",
    projectId: "proj-002",
    projectName: "Mobile Banking App",
    action: "joined",
    members: ["Sarah Johnson"],
    role: "UX Designer",
    priority: "low",
    read: true,
    timestamp: subDays(new Date(), 1),
  },
];
// Mock Recent Files
export const recentFiles: RecentFile[] = [
  {
    id: "file-001",
    name: "E-commerce_UX_Wireframes.sketch",
    size: "24.5 MB",
    type: "Design",
    lastModified: subHours(new Date(), 3),
  },
  {
    id: "file-002",
    name: "Security_Protocol_Draft.docx",
    size: "2.3 MB",
    type: "Document",
    lastModified: subDays(new Date(), 1),
  },
  {
    id: "file-003",
    name: "Localization_Markets_Analysis.xlsx",
    size: "5.7 MB",
    type: "Spreadsheet",
    lastModified: subDays(new Date(), 5),
  },
  {
    id: "file-004",
    name: "Communication_Platform_Specs.pdf",
    size: "12.1 MB",
    type: "Document",
    lastModified: subDays(new Date(), 2),
  },
];

// Utility function to get project statistics
export const getProjectStats = () => ({
  total: projects.length,
  inProgress: projects.filter((p) => p.status === "In Progress").length,
  completed: projects.filter((p) => p.status === "Completed").length,
  onHold: projects.filter((p) => p.status === "On Hold").length,
  highPriority: projects.filter((p) => p.priority === "High").length,
});

export const getNotificationStats = () => ({
  total: notifications.length,
  unread: notifications.filter((n) => !n.read).length,
  byVariant: {
    status: notifications.filter((n) => n.variant === "status").length,
    progress: notifications.filter((n) => n.variant === "progress").length,
    team: notifications.filter((n) => n.variant === "team").length,
    milestone: notifications.filter((n) => n.variant === "milestone").length,
  },
  byPriority: {
    high: notifications.filter((n) => n.priority === "high").length,
    medium: notifications.filter((n) => n.priority === "medium").length,
    low: notifications.filter((n) => n.priority === "low").length,
  },
});

// También podemos crear un helper para obtener estadísticas más detalladas si lo necesitas
export const getDetailedNotificationStats = () => {
  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    byStatus: {
      success: notifications.filter(
        (n) => "status" in n && n.status === "success"
      ).length,
      warning: notifications.filter(
        (n) => "status" in n && n.status === "warning"
      ).length,
      info: notifications.filter((n) => "status" in n && n.status === "info")
        .length,
      error: notifications.filter((n) => "status" in n && n.status === "error")
        .length,
    },
    byProject: {} as Record<string, number>,
  };

  // Agrupar por proyecto
  notifications.forEach((n) => {
    if (!stats.byProject[n.projectId]) {
      stats.byProject[n.projectId] = 0;
    }
    stats.byProject[n.projectId]++;
  });

  return stats;
};
