// src/types/project.ts
export type ProjectStatus =
  | "pending"
  | "inProgress"
  | "completed"
  | "onHold"
  | "cancelled";
export type ProjectPriority = "low" | "medium" | "high";
export type ProjectType =
  | "webDesign"
  | "webDevelopment"
  | "webDesignAndDevelopment"
  | "other";

export interface ProjectStage {
  name: string;
  threshold: number;
  completed: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface ProjectMetrics {
  timeSpent: {
    estimated: number;
    actual: number;
    remaining: number;
  };
  budget: {
    total: number;
    spent: number;
    remaining: number;
  };
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    blocked: number;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  lastUpdated: string;
  priority: ProjectPriority;
  type: ProjectType;
  client: {
    id: string;
    name: string;
    logo: string;
  };
  stages: ProjectStage[];
  teamMembers: TeamMember[];
  metrics: ProjectMetrics;
  nextMilestone?: {
    name: string;
    dueDate: string;
    progress: number;
  };
  recentActivities?: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: {
      name: string;
      avatar: string;
    };
  }[];
}
