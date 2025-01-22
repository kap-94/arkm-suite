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

export interface Notification {
  id: string;
  type: "message" | "update" | "file";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: "Design" | "Development" | "Documentation";
  url: string;
  uploadedAt: string;
  size: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "E-commerce Website Redesign",
    status: "In Progress",
    description:
      "Complete redesign of the client's e-commerce platform with modern UI/UX principles and improved performance.",
    progress: 65,
    lastUpdated: "2024-03-15",
    deliverables: [
      {
        id: "d1",
        name: "Wireframes and Mockups",
        status: "Completed",
        progress: 100,
        dueDate: "2024-02-28",
      },
      {
        id: "d2",
        name: "Homepage Implementation",
        status: "In Progress",
        progress: 75,
        dueDate: "2024-03-20",
      },
    ],
  },
];

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "update",
    title: "Project Update",
    description: "New wireframes have been uploaded for review",
    timestamp: "2024-03-15T10:30:00",
    read: false,
  },
];

export const recentFiles: ProjectFile[] = [
  {
    id: "1",
    name: "Homepage Mockup.fig",
    type: "Design",
    url: "https://images.unsplash.com/photo-1618788372246-79faff0c3742",
    uploadedAt: "2024-03-15T10:00:00",
    size: "2.5 MB",
  },
  {
    id: "2",
    name: "API Documentation.md",
    type: "Documentation",
    url: "/files/api-docs.md",
    uploadedAt: "2024-03-14T15:30:00",
    size: "156 KB",
  },
  {
    id: "3",
    name: "main.js",
    type: "Development",
    url: "/files/main.js",
    uploadedAt: "2024-03-13T09:15:00",
    size: "45 KB",
  },
];

export const projectMetrics = {
  timeSpent: {
    estimated: 160,
    actual: 145,
    breakdown: {
      design: 45,
      development: 65,
      testing: 25,
      meetings: 10,
    },
    trendsPerWeek: [
      { week: "Week 1", planned: 40, actual: 38 },
      { week: "Week 2", planned: 40, actual: 42 },
      { week: "Week 3", planned: 40, actual: 35 },
      { week: "Week 4", planned: 40, actual: 30 },
    ],
  },
  deliverables: {
    total: 12,
    completed: 8,
    onTrack: 2,
    delayed: 2,
    completionTrend: [
      { date: "2024-02-01", completed: 2 },
      { date: "2024-02-15", completed: 5 },
      { date: "2024-03-01", completed: 6 },
      { date: "2024-03-15", completed: 8 },
    ],
    categories: {
      design: { total: 4, completed: 3 },
      development: { total: 5, completed: 3 },
      testing: { total: 3, completed: 2 },
    },
  },
  siteMetrics: {
    visitors: [
      { date: "2024-02-01", value: 1200 },
      { date: "2024-02-15", value: 1800 },
      { date: "2024-03-01", value: 2200 },
      { date: "2024-03-15", value: 2800 },
    ],
    engagement: [
      { date: "2024-02-01", value: 65 },
      { date: "2024-02-15", value: 72 },
      { date: "2024-03-01", value: 78 },
      { date: "2024-03-15", value: 85 },
    ],
    performance: {
      loadTime: { current: 1.2, previous: 1.8 },
      errorRate: { current: 0.5, previous: 1.2 },
      uptime: { current: 99.9, previous: 99.5 },
    },
    userBehavior: {
      avgSessionDuration: { current: 320, previous: 280 },
      bounceRate: { current: 35, previous: 42 },
      pagesPerSession: { current: 4.2, previous: 3.8 },
    },
  },
  budget: {
    allocated: 50000,
    spent: 35000,
    forecast: 48000,
    breakdown: {
      design: 12000,
      development: 18000,
      testing: 5000,
    },
    trendsPerMonth: [
      { month: "Jan", planned: 15000, actual: 14000 },
      { month: "Feb", planned: 20000, actual: 21000 },
      { month: "Mar", planned: 15000, actual: 13000 },
    ],
  },
  risks: {
    total: 5,
    high: 1,
    medium: 2,
    low: 2,
    mitigated: 3,
    trend: [
      { date: "2024-02-01", active: 5, mitigated: 0 },
      { date: "2024-02-15", active: 4, mitigated: 1 },
      { date: "2024-03-01", active: 3, mitigated: 2 },
      { date: "2024-03-15", active: 2, mitigated: 3 },
    ],
  },
};
