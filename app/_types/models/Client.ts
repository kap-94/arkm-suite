import { BaseEntity } from "./Common";

/**
 * Represents a client in the system.
 */
export interface Client extends BaseEntity {
  name: string;
  logo: string;
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
  industry?: string;
  website?: string;
}
