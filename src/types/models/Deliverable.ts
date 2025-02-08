import {
  BaseEntity,
  EntityReference,
  ISODateString,
  LabeledEnum,
  Priority,
  ProjectReference,
  TaskStatus,
  UUID,
} from "./Common";

import { User } from "./User";

export interface CustomField {
  label: string;
  value: string;
}

/**
 * Represents a deliverable in a project.
 */
export interface Deliverable extends BaseEntity {
  title: string;
  description?: string;
  priority: LabeledEnum<Priority>;
  status: LabeledEnum<TaskStatus>;
  project: ProjectReference;
  stage: EntityReference;
  assignee: User;
  teamMembers: User[];
  startDate: ISODateString;
  dueDate: ISODateString;
  progress: number;
  metrics: {
    estimatedHours: number;
    spentHours: number;
    remainingHours: number;
    taskTotal: number;
    taskCompleted: number;
    taskCompletedThisWeek: number;
  };
  dependencies?: {
    id: UUID;
    type: "blocks" | "blocked_by" | "relates_to";
    deliverable: EntityReference;
  }[];
  contents?: EntityReference[];
  tags?: string[];
  customFields?: CustomField[];
}
