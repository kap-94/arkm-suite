import {
  BaseEntity,
  EntityReference,
  ISODateString,
  LabeledEnum,
  Priority,
  ProjectStatus,
  ProjectType,
  UUID,
  Visibility,
} from "./Common";
import { Activity } from "./Activity";
import { Budget } from "./Budget";
import { Client } from "./Client";
import { Deliverable } from "./Deliverable";
import { Milestone } from "./Milestone";
import { Stage } from "./Stage";
import { User } from "./User";
import { ComponentContent, DesignSystemContent } from "./ComponentContent";
import { FileContent } from "./FileContent";

/**
 * Represents project metrics.
 */
export interface ProjectMetrics {
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    blocked: number;
    overdue: number;
  };
  timeTracking: {
    estimated: number;
    spent: number;
    remaining: number;
  };
  milestones: {
    total: number;
    completed: number;
    upcoming: number;
    overdue: number;
  };
  performance?: {
    velocityAverage: number;
    burndownIndex: number;
    teamUtilization: number;
  };
  quality?: {
    bugs: number;
    criticalIssues: number;
    testCoverage: number;
  };
}

type Contents = (FileContent | DesignSystemContent | ComponentContent)[];
/**
 * Represents a project in the system.
 */
export interface Project extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  type: LabeledEnum<ProjectType>;
  status: LabeledEnum<ProjectStatus>;
  priority: LabeledEnum<Priority>;
  progress: number;
  startDate: ISODateString;
  endDate: ISODateString;
  owner: User;
  client: Client;
  teamMembers: User[];
  budget: Budget;
  stages: Stage[];
  contents: Contents | [];
  deliverables: Deliverable[];
  metrics: ProjectMetrics;
  recentActivities: Activity[];
  nextMilestone?: Milestone;
  tags?: string[];
  customFields?: {
    label: string;
    value: string;
  }[];
  visibility: Visibility;
  settings?: {
    timeTracking: boolean;
    clientAccess: boolean;
    notificationPreferences: Record<string, boolean>;
  };
}
