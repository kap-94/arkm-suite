// Base types
export type UUID = string;
export type ISODateString = string;

// Base entity interface
export interface BaseEntity {
  readonly id: UUID;
  readonly createdAt: ISODateString;
  readonly updatedAt: ISODateString;
}

// Base interfaces for all content types
export interface BaseContent extends BaseEntity {
  type: string;
  title: string;
  description?: string;
  project: ProjectReference;
  metadata?: Record<string, any>;
  createdBy: EntityReference;
  updatedBy?: EntityReference;
}

// Utility type for labeled enums
export type LabeledEnum<T> = {
  label: string;
  value: T;
};

// Reusable interface for entities with ID and name
export interface EntityReference {
  id: string;
  name: string;
}

export interface ProjectReference extends EntityReference {
  slug: string;
}

// Common enums
export enum ProjectType {
  WEB_DESIGN = "webDesign",
  WEB_DEVELOPMENT = "webDevelopment",
  WEB_DESIGN_AND_DEVELOPMENT = "webDesignAndDevelopment",
  OTHER = "other",
}

export enum ProjectStatus {
  PENDING = "pending",
  IN_PROGRESS = "inProgress",
  COMPLETED = "completed",
  ON_HOLD = "onHold",
  CANCELLED = "cancelled",
}

export enum TaskStatus {
  NOT_STARTED = "notStarted",
  IN_PROGRESS = "inProgress",
  COMPLETED = "completed",
  BLOCKED = "blocked",
  DELAYED = "delayed",
}

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum Visibility {
  Public = "public",
  Private = "private",
  Client = "client",
}

// Theme

export interface Theme {
  type: "light" | "dark" | "custom";
  customValues?: {
    background?: string;
    border?: string;
    text?: string;
    textSecondary?: string;
  };
}
