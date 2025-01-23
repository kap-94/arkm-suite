import { Project } from "@/models/project";
import { ProjectLink } from "@/types/dictionary/dashboard.types";

export type ThemeType = "light" | "dark" | "custom";
export interface ProjectCardDictionary {
  links: Record<string, ProjectLink>;
}

export interface ProjectCardTheme {
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

// export type ProjectStatus = "inProgress" | "completed" | "onHold";
export type ProjectPriority = "low" | "medium" | "high";
export type ProjectSize = "default" | "small";

export interface Stage {
  name: string;
  threshold: number;
  color?: string;
}

export interface ProjectCardProps {
  project: Project;
  size?: ProjectSize;
  theme?: ProjectCardTheme;
  dictionary: ProjectCardDictionary;
}
