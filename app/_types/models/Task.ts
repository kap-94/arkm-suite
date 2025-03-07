import {
  BaseEntity,
  EntityReference,
  ISODateString,
  LabeledEnum,
  Priority,
  TaskStatus,
  UUID,
} from "./Common";
import { User } from "./User";

/**
 * Represents a task in a project.
 */
export interface Task extends BaseEntity {
  title: string;
  description?: string;
  status: LabeledEnum<TaskStatus>;
  priority: LabeledEnum<Priority>;
  assignee: User;
  stage: EntityReference;
  deliverable?: EntityReference;
  startDate: ISODateString;
  dueDate: ISODateString;
  progress: number;
  estimatedHours: number;
  spentHours: number;
  dependencies?: Task[];
  subtasks?: {
    id: UUID;
    title: string;
    completed: boolean;
  }[];
  tags?: string[];
}
