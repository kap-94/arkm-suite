import { BaseEntity } from "./Common";
import { User } from "./User";
import { Deliverable } from "./Deliverable";

/**
 * Represents a comment in the system.
 */
export interface Comment extends BaseEntity {
  text: string;
  author: User;
  deliverable: Deliverable;
  parentComment?: Comment;
  mentions?: User[];
  attachments?: File[];
  reactions?: {
    type: string;
    users: User[];
  }[];
}
