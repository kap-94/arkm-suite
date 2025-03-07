import { BaseEntity, UUID, ISODateString } from "./Common";

/**
 * Represents a user in the system.
 */
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

/**
 * Represents a team member in a project.
 */
export interface TeamMember {
  user: User;
  projectId: UUID;
  joinedAt: ISODateString;
  permissions: string[];
}
