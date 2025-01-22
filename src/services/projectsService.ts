import { cache } from "react";
import type { Project } from "@/models/project";

export const getProjects = cache(async (): Promise<Project[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  /* When ready to switch to Supabase, uncomment this:
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select(...)
  if (error) throw new Error('Failed to fetch projects')
  return data
  */

  return mockProjects;
});

export const getProjectById = cache(
  async (id: string): Promise<Project | null> => {
    await new Promise((resolve) => setTimeout(resolve, 50));

    const project = mockProjects.find((p) => p.id === id);
    if (!project) return null;

    return project;
  }
);

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description:
      "Complete overhaul of the company's main website with modern design principles and improved user experience",
    status: "inProgress",
    progress: 75,
    lastUpdated: "2024-01-10",
    priority: "high",
    type: "webDevelopment",
    client: {
      id: "client-1",
      name: "TechCorp",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Discovery", threshold: 20, completed: true },
      { name: "UX Design", threshold: 40, completed: true },
      { name: "UI Design", threshold: 60, completed: true },
      { name: "Development", threshold: 80, completed: false },
      { name: "Testing", threshold: 100, completed: false },
    ],
    teamMembers: [
      {
        id: "user-1",
        name: "Sarah Johnson",
        role: "Project Manager",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-2",
        name: "Michael Chen",
        role: "Lead Developer",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-3",
        name: "Emily Davis",
        role: "UX Designer",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 160,
        actual: 145,
        remaining: 15,
      },
      budget: {
        total: 50000,
        spent: 37500,
        remaining: 12500,
      },
      tasks: {
        total: 48,
        completed: 36,
        inProgress: 8,
        blocked: 4,
      },
    },
    nextMilestone: {
      name: "Beta Launch",
      dueDate: "2024-02-15",
      progress: 85,
    },
    recentActivities: [
      {
        id: "activity-1",
        type: "update",
        description: "Development phase 80% complete",
        timestamp: "2024-01-10T14:30:00Z",
        user: {
          name: "Michael Chen",
          avatar: "/api/placeholder/256/256",
        },
      },
      {
        id: "activity-2",
        type: "milestone",
        description: "UI Design phase completed",
        timestamp: "2024-01-09T11:20:00Z",
        user: {
          name: "Emily Davis",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description:
      "Development of a cross-platform mobile application for customer engagement and service delivery",
    status: "inProgress",
    progress: 45,
    lastUpdated: "2024-01-12",
    priority: "medium",
    type: "webDevelopment",
    client: {
      id: "client-2",
      name: "ServicePro",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Security Audit", threshold: 20, completed: true },
      { name: "Protocol Design", threshold: 40, completed: true },
      { name: "Implementation", threshold: 60, completed: false },
      { name: "Testing", threshold: 80, completed: false },
      { name: "Deployment", threshold: 100, completed: false },
    ],
    teamMembers: [
      {
        id: "user-4",
        name: "David Kim",
        role: "Tech Lead",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-5",
        name: "Lisa Wong",
        role: "Mobile Developer",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-6",
        name: "Tom Wilson",
        role: "QA Engineer",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 200,
        actual: 90,
        remaining: 110,
      },
      budget: {
        total: 75000,
        spent: 33750,
        remaining: 41250,
      },
      tasks: {
        total: 60,
        completed: 27,
        inProgress: 15,
        blocked: 8,
      },
    },
    nextMilestone: {
      name: "First Internal Release",
      dueDate: "2024-03-01",
      progress: 45,
    },
    recentActivities: [
      {
        id: "activity-3",
        type: "issue",
        description: "API Integration challenges identified",
        timestamp: "2024-01-12T09:15:00Z",
        user: {
          name: "David Kim",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
  {
    id: "3",
    name: "E-commerce Integration",
    description:
      "Integration of e-commerce functionality into existing web platform with payment processing and inventory management",
    status: "completed",
    progress: 100,
    lastUpdated: "2024-01-08",
    priority: "high",
    type: "webDevelopment",
    client: {
      id: "client-3",
      name: "RetailPlus",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Market Research", threshold: 20, completed: true },
      { name: "Content Translation", threshold: 40, completed: true },
      { name: "SEO Optimization", threshold: 60, completed: true },
      { name: "Review", threshold: 80, completed: true },
      { name: "Launch", threshold: 100, completed: true },
    ],
    teamMembers: [
      {
        id: "user-7",
        name: "Rachel Martinez",
        role: "Project Manager",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-8",
        name: "Steve Johnson",
        role: "Backend Developer",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 120,
        actual: 115,
        remaining: 0,
      },
      budget: {
        total: 45000,
        spent: 43000,
        remaining: 2000,
      },
      tasks: {
        total: 40,
        completed: 40,
        inProgress: 0,
        blocked: 0,
      },
    },
    nextMilestone: {
      name: "Post-Launch Review",
      dueDate: "2024-01-20",
      progress: 100,
    },
    recentActivities: [
      {
        id: "activity-4",
        type: "completion",
        description: "Project successfully completed and deployed",
        timestamp: "2024-01-08T16:45:00Z",
        user: {
          name: "Rachel Martinez",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
  {
    id: "4",
    name: "Analytics Dashboard",
    description:
      "Development of a comprehensive analytics dashboard for real-time business intelligence",
    status: "onHold",
    progress: 30,
    lastUpdated: "2024-01-05",
    priority: "low",
    type: "webDevelopment",
    client: {
      id: "client-4",
      name: "DataCo",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Concept", threshold: 20, completed: true },
      { name: "Requirements", threshold: 40, completed: true },
      { name: "Design", threshold: 60, completed: false },
      { name: "Prototype", threshold: 80, completed: false },
      { name: "Approval", threshold: 100, completed: false },
    ],
    teamMembers: [
      {
        id: "user-9",
        name: "Alex Thompson",
        role: "Data Analyst",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-10",
        name: "Jessica Lee",
        role: "UI Designer",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 90,
        actual: 27,
        remaining: 63,
      },
      budget: {
        total: 35000,
        spent: 10500,
        remaining: 24500,
      },
      tasks: {
        total: 32,
        completed: 10,
        inProgress: 2,
        blocked: 20,
      },
    },
    nextMilestone: {
      name: "Client Requirements Review",
      dueDate: "2024-02-01",
      progress: 30,
    },
    recentActivities: [
      {
        id: "activity-5",
        type: "status_change",
        description: "Project put on hold pending client review",
        timestamp: "2024-01-05T10:30:00Z",
        user: {
          name: "Alex Thompson",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
];
