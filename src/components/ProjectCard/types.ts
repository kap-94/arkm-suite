import { Project } from "@/models/project";

export type ThemeType = "light" | "dark" | "custom";

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

// export interface Project {
//   id: string;
//   name: string;
//   description: string;
//   // status: ProjectStatus;
//   status: string;
//   progress: number;
//   lastUpdated: Date | string;
//   team?: string[];
//   priority?: ProjectPriority;
//   client?: string;
//   stages?: Stage[];
// }

export interface ProjectCardProps {
  project: Project;
  size?: ProjectSize;
  theme?: ProjectCardTheme;
}
