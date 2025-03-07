import { GanttViewDictionary } from "../../_types/dictionary/projectDetails.types";
import { Stage } from "../../_types/models";
import { Priority, TaskStatus } from "../../_types/models/Common";

// components/GanttView/types.ts
export type ThemeType = "light" | "dark" | "custom";

export type GridStyle = "none" | "lines" | "cells";

export interface GanttTheme {
  type: ThemeType;
  colors?: {
    background?: string;
    border?: string;
    text?: string;
    secondaryText?: string;
    gradient?: string;
    hover?: string;
    stageBar?: {
      onTrack?: string;
      atRisk?: string;
      delayed?: string;
    };
    priority?: {
      low?: string;
      medium?: string;
      high?: string;
    };
    indicator?: string;
  };
}

export interface GanttStage {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies?: string[];
  priority: { label: string; value: Priority };
  status: { label: string; value: TaskStatus };
  description?: string;
  milestones?: Array<{
    dueDate: string;
    title: string;
  }>;
  assignees: Array<{
    name: string;
    avatar: string;
  }>;
}

export interface GanttViewProps {
  projectId: string;
  projectType: string;
  dictionary: GanttViewDictionary;
  stages: Stage[];
  theme?: GanttTheme;
  gridStyle?: GridStyle;
  showCurrentDay?: boolean;
  onStageClick?: (stageId: string) => void;
  onMilestoneClick?: (stageId: string, milestoneId: string) => void;
}

// Tipos auxiliares para el estado interno
export interface GanttViewState {
  selectedTask: GanttStage | null;
  showWeekends: boolean;
  view: "month" | "week";
}

export interface StagePosition {
  left: string;
  width: string;
}

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
