import { Project } from "@/models/project";
import { ProjectSection } from "@/types/dictionary/dashboard.types";

// Interface for the theme colors specific to DashboardProjects
export interface DashboardProjectsThemeColors {
  background: string;
  textPrimary: string;
  textSecondary: string;
  cardBackground: string;
  cardBorder: string;
  buttonBorderColor: string;
  buttonColor: string;
  buttonActiveBg: string;
  buttonActiveBorder: string;
  buttonActiveBolor: string;
  tooltipBg: string;
}

// Interface for the theme configuration
export interface DashboardProjectsTheme {
  type: "light" | "dark" | "custom";
  colors?: DashboardProjectsThemeColors;
}

// Type for the view mode
export type ViewMode = "grid" | "list";

// Main props interface for the DashboardProjects component
export interface DashboardProjectsProps {
  projects: Project[];
  dictionary: ProjectSection;
  title: string;
  theme: DashboardProjectsTheme;
  initialViewMode?: ViewMode;
  viewOptions: Record<ViewMode, string>;
  className?: string;
}

// Props for the toggle button
export interface ViewToggleButtonProps {
  viewMode: ViewMode;
  onChange: () => void;
  className?: string;
}

// Props for the projects list
export interface ProjectsListProps {
  projects: Project[];
  viewMode: ViewMode;
  theme: DashboardProjectsTheme;
}
