import { ProjectLink } from "@/app/_types/dictionary/dashboard.types";
import { Stage } from "../StageProgress/types";
import { ProjectStatus, TaskStatus } from "@/app/_types/models/Common";
import { Language } from "@/app/_lib/config/i18n";

export type ThemeType = "light" | "dark" | "custom";
export interface ProjectCardDictionary {
  links: Record<string, ProjectLink>;
  labels: Record<string, string>;
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

type ProjectType = {
  label: string;
};

export interface ProjectCardStage {
  name: string;
  order: number;
  status: {
    value: TaskStatus;
  };
}

export interface ProjectCardItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  updatedAt: Date;
  progress: number;
  stages: ProjectCardStage[];
  status: {
    label: string;
    value: ProjectStatus;
  };
  type: ProjectType;
}

export interface ProjectCardProps {
  project: ProjectCardItem;
  language: Language;
  size?: "default" | "small";
  theme?: ProjectCardTheme;
  dictionary: ProjectCardDictionary;
}
