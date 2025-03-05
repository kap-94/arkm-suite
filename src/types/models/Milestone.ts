import {
  BaseEntity,
  EntityReference,
  ISODateString,
  LabeledEnum,
  Priority,
  TaskStatus,
} from "./Common";

/**
 * Represents a milestone in a project.
 */
export interface Milestone extends BaseEntity {
  title: string;
  description?: string;
  dueDate: ISODateString;
  stage: EntityReference;
  status: LabeledEnum<TaskStatus>;
  deliverables: EntityReference[];
  progress: number;
  priority: LabeledEnum<Priority>;
  criteria?: string[];
  impact?: string;
}
