import { BaseEntity, UUID } from "./Common";
import { User } from "./User";

/**
 * Represents an activity in the system.
 */
export interface Activity extends BaseEntity {
  type:
    | "task_update"
    | "comment"
    | "file_upload"
    | "milestone_completed"
    | "deliverable_status_change"
    | "time_entry"
    | "budget_update";
  description: string;
  user: User;
  metadata: {
    entityId: UUID;
    entityType:
      | "task"
      | "deliverable"
      | "milestone"
      | "stage"
      | "file"
      | "comment";
    changes?: Record<string, any>;
  };
  visibility?: "team" | "client" | "public";
}
