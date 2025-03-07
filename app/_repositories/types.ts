// src/types/responses/ProjectResponse.ts;
import { Deliverable, Project } from "@/app/_types/models";
import { Content } from "@/app/_types/models/Content";

// Response-specific interfaces
export interface DeliverableResponse extends Omit<Deliverable, "contents"> {
  contents: Content[]; // Aquí la diferencia clave - contents completos en vez de referencias
}

export interface StageResponse {
  deliverables: Deliverable[];
}

export interface ProjectResponse extends Omit<Project, "deliverables"> {
  deliverables: DeliverableResponse[];
  // stages: StageResponse[];
}
