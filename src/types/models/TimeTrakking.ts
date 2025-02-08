import { BaseEntity, ISODateString } from "./Common";
import { Deliverable } from "./Deliverable";
import { Task } from "./Task";
import { User } from "./User";

export namespace TimeTracking {
  /**
   * Represents a time entry logged by a user.
   */
  export interface TimeEntry extends BaseEntity {
    user: User;
    deliverable: Deliverable;
    task?: Task;
    date: ISODateString;
    hours: number;
    description?: string;
    category?: string;
    billable: boolean;
  }

  /**
   * Represents time tracking summary for a project.
   */
  export interface ProjectTimeTracking {
    estimated: number;
    spent: number;
    remaining: number;
  }

  /**
   * Represents time tracking summary for a deliverable.
   */
  export interface DeliverableTimeTracking extends BaseEntity {
    deliverable: Deliverable;
    summary: {
      estimated: number;
      spent: number;
      remaining: number;
      billable: number;
      nonBillable: number;
    };
    entries: TimeEntry[];
  }
}
