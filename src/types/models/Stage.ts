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
import { Task } from "./Task";
import { Milestone } from "./Milestone";
import { Deliverable } from "./Deliverable";

/**
 * Represents a stage in a project.
 */
export interface Stage extends BaseEntity {
  name: string;
  description?: string;
  startDate: ISODateString;
  endDate: ISODateString;
  status: LabeledEnum<TaskStatus>;
  order: number;
  progress: number;
  priority: LabeledEnum<Priority>;
  assignees: EntityReference[];
  dependencyStages?: EntityReference[];
  deliverables: EntityReference[];
  tasks: Task[];
  milestones: Milestone[];
  budget?: {
    allocated: number;
    spent: number;
    currency: string;
  };
  risks?: {
    id: UUID;
    description: string;
    impact: "low" | "medium" | "high";
    mitigation: string;
  }[];
}
