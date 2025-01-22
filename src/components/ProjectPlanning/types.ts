// components/ProjectPlanning/types.ts
export type ThemeType = "light" | "dark" | "custom";

export interface PlanningTheme {
  type: ThemeType;
  colors?: {
    background?: string;
    border?: string;
    text?: string;
    secondaryText?: string;
    gradient?: string;
    hover?: string;
  };
}

export interface ProjectPlanningProps {
  projectId: string;
  theme?: PlanningTheme;
  onAddTask?: () => void;
  onExport?: () => void;
  onFilter?: () => void;
}
