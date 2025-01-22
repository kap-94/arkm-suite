// components/GanttView/types.ts

export type ThemeType = "light" | "dark" | "custom";

export interface GanttTheme {
  type: ThemeType;
  colors?: {
    background?: string;
    border?: string;
    text?: string;
    secondaryText?: string;
    gradient?: string;
    hover?: string;
    taskBar?: {
      onTrack?: string;
      atRisk?: string;
      delayed?: string;
    };
    priority?: {
      low?: string;
      medium?: string;
      high?: string;
    };
  };
}

export interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies?: string[];
  assignees: Array<{
    name: string;
    avatar: string;
  }>;
  priority: "low" | "medium" | "high";
  status: "on-track" | "at-risk" | "delayed";
  milestones?: Array<{
    date: string;
    title: string;
  }>;
  description?: string;
}

export interface GanttViewProps {
  projectId: string;
  theme?: GanttTheme;
  onTaskClick?: (taskId: string) => void;
  onMilestoneClick?: (taskId: string, milestoneId: string) => void;
}

// Tipos auxiliares para el estado interno
export interface GanttViewState {
  selectedTask: Task | null;
  showWeekends: boolean;
  view: "month" | "week";
}

export interface TaskPosition {
  left: string;
  width: string;
}

// Tipos para los mapeos de colores
export type StatusColorMap = {
  [K in Task["status"]]: {
    border: string;
    background: string;
  };
};

export type PriorityColorMap = {
  [K in Task["priority"]]: {
    text: string;
    background: string;
  };
};

// Tipos para las métricas
export interface TimeMetrics {
  estimated: number;
  actual: number;
  breakdown: {
    design: number;
    development: number;
    testing: number;
    meetings: number;
  };
}

export interface DeliverableMetrics {
  total: number;
  completed: number;
  onTrack: number;
  delayed: number;
}

export interface RiskMetrics {
  total: number;
  high: number;
  medium: number;
  low: number;
  mitigated: number;
}

export interface GanttMetrics {
  timeSpent: TimeMetrics;
  deliverables: DeliverableMetrics;
  risks: RiskMetrics;
}
