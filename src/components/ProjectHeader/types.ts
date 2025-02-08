import { ProjectStatus } from "@/types/models/Common";
import { ProjectDetailsDictionary } from "@/types/dictionary/projectDetails.types";

export interface AvailableProject {
  id: string;
  slug: string;
  name: string;
  status: {
    label: string;
    value: string;
  };
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: {
    label: string;
    value: ProjectStatus;
  };
  metrics: {
    label: string;
    value: string;
    icon: string; // Nombre del ícono
    variant: string;
  }[];
  progress: number;
  client?: {
    name: string;
  };
  owner?: {
    name: string;
  };
  startDate: string; // ISO date string
}

export interface Theme {
  type: "light" | "dark" | "custom";
  colors?: {
    background?: string;
    border?: string;
    text?: string;
    secondaryText?: string;
    gradient?: string;
    accent?: string;
    hover?: string;
  };
  glassmorphism?: {
    enabled: boolean;
    variant?: "subtle" | "medium" | "strong";
  };
}

export interface ProjectHeaderProps {
  project: Project;
  availableProjects: AvailableProject[];
  onProjectChange: (projectId: string) => void;
  dictionary: ProjectDetailsDictionary["projectHeader"];
  theme?: Theme;
  className?: string;
}
