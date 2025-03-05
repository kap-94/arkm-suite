import { BaseEntity, EntityReference, ISODateString, UUID } from "./Common";
import { User } from "./User";

/**
 * Represents a budget in a project.
 */
export interface Budget extends BaseEntity {
  allocated: number;
  spent: number;
  remaining: number;
  currency: string;
  breakdownByStage: {
    [key: string]: {
      stage: EntityReference;
      allocated: number;
      spent: number;
    };
  };
  categories?: {
    name: string;
    allocated: number;
    spent: number;
  }[];
  approvals?: {
    id: UUID;
    amount: number;
    approvedBy: User;
    approvedAt: ISODateString;
    notes?: string;
  }[];
}
