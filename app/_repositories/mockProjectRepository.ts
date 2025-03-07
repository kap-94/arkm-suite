import { Project } from "../_types/models/Project";
import { Language } from "../_lib/config/i18n";
import { projectListEN, projectListES } from "../_lib/projectMockup";
import { cloneDeep } from "lodash";
import { ProjectResponse, DeliverableResponse } from "./types";
import { Content } from "../_types/models/Content";

export class MockProjectRepository {
  async getProjects(lang: Language): Promise<Project[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return lang === "es" ? projectListES : projectListEN;
  }

  async getProjectById(
    id: string,
    lang: Language
  ): Promise<ProjectResponse | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const projects = lang === "es" ? projectListES : projectListEN;
    const project = projects.find((p) => p.id === id);

    if (!project) return null;
    return this.enrichProjectResponse(project);
  }

  async getProjectBySlug(
    slug: string,
    lang: Language
  ): Promise<ProjectResponse | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const projects = lang === "es" ? projectListES : projectListEN;
    const project = projects.find((p) => p.slug === slug);

    if (!project) return null;
    return this.enrichProjectResponse(project);
  }

  private enrichProjectResponse(project: Project): ProjectResponse {
    // Crear una copia profunda del proyecto
    const projectCopy = cloneDeep(project) as Project;

    // Transformar los deliverables al formato esperado
    const enrichedDeliverables: DeliverableResponse[] =
      projectCopy.deliverables.map((deliverable) => {
        // Inicializar el array de contenidos enriquecidos
        const enrichedContents: Content[] = [];

        // Procesar cada referencia de contenido si existe
        if (deliverable.contents && deliverable.contents.length > 0) {
          deliverable.contents.forEach((contentRef) => {
            // Buscar el contenido completo en el proyecto
            const fullContent = projectCopy.contents?.find(
              (c) => c.id === contentRef.id
            );

            // Si encontramos el contenido completo, lo añadimos al array
            if (fullContent) {
              enrichedContents.push(fullContent);
            }
          });
        }

        // Retornar el deliverable con sus contenidos enriquecidos
        return {
          ...deliverable,
          contents: enrichedContents,
        };
      });

    // Construir y retornar el ProjectResponse
    return {
      ...projectCopy,
      deliverables: enrichedDeliverables,
    };
  }
}
