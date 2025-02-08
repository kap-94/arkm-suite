// src/services/projectService.ts
import { cache } from "react";
import { Language } from "@/lib/config/i18n";
import { Project } from "@/types/models/Project";
import { MockProjectRepository } from "@/repositories/mockProjectRepository";
import { ProjectResponse } from "@/repositories/types";
import { Content } from "@/types/models/Content";
import { ErrorDetails, errorService } from "@/services/errorService";

export interface ContentContext {
  deliverableId?: string;
  deliverableTitle?: string;
  projectId: string;
  projectSlug: string;
  projectName: string;
}

export interface ProjectRepository {
  getProjects(lang: Language): Promise<Project[]>;
  getProjectById(id: string, lang: Language): Promise<ProjectResponse | null>;
  getProjectBySlug(
    slug: string,
    lang: Language
  ): Promise<ProjectResponse | null>;
}

export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async getProjects(lang: Language = "en"): Promise<Project[]> {
    try {
      return await this.projectRepository.getProjects(lang);
    } catch (error) {
      // Aquí creamos un nuevo error en lugar de propagar el error desconocido
      throw errorService.createServerError("Failed to fetch projects", {
        lang,
      });
    }
  }

  async getProjectById(
    id: string,
    lang: Language = "en"
  ): Promise<ProjectResponse> {
    try {
      const project = await this.projectRepository.getProjectById(id, lang);
      if (!project) {
        throw errorService.createNotFoundError(
          `Project with id ${id} not found`,
          { id, lang }
        );
      }
      return project;
    } catch (error) {
      // Verificamos si es una instancia de ErrorDetails
      if (this.isErrorDetails(error)) {
        throw error;
      }
      throw errorService.createServerError(
        `Failed to fetch project with id ${id}`,
        { id, lang }
      );
    }
  }

  async getProjectBySlug(
    slug: string,
    lang: Language = "en"
  ): Promise<ProjectResponse> {
    try {
      const project = await this.projectRepository.getProjectBySlug(slug, lang);
      if (!project) {
        throw errorService.createNotFoundError(
          `Project with slug ${slug} not found`,
          { slug, lang }
        );
      }
      return project;
    } catch (error) {
      if (this.isErrorDetails(error)) {
        throw error;
      }
      throw errorService.createServerError(
        `Failed to fetch project with slug ${slug}`,
        { slug, lang }
      );
    }
  }

  async findContentInProject(
    projectSlug: string,
    contentId: string,
    lang: Language = "en"
  ): Promise<{ content: Content; context: ContentContext }> {
    try {
      const project = await this.getProjectBySlug(projectSlug, lang);

      const contentResult = await this.findContent(contentId, lang);

      if (!contentResult) {
        throw errorService.createNotFoundError(
          `Content with id ${contentId} not found`,
          {
            contentId,
            projectSlug,
            lang,
          }
        );
      }

      if (contentResult.context.projectSlug !== projectSlug) {
        throw errorService.createValidationError(
          `Content ${contentId} does not belong to project ${projectSlug}`,
          {
            contentId,
            projectSlug,
            contentProjectSlug: contentResult.context.projectSlug,
          }
        );
      }

      return contentResult;
    } catch (error) {
      if (this.isErrorDetails(error)) {
        throw error;
      }
      throw errorService.createServerError(
        `Failed to find content ${contentId} in project ${projectSlug}`,
        { contentId, projectSlug, lang }
      );
    }
  }

  // Helper method para verificar si un error es ErrorDetails
  private isErrorDetails(error: unknown): error is ErrorDetails {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "message" in error &&
      "statusCode" in error
    );
  }

  async findContent(
    contentId: string,
    lang: Language = "en",
    projectSlug?: string // Add projectSlug as an optional parameter
  ): Promise<{ content: Content; context: ContentContext } | null> {
    try {
      const projects = await this.getProjects(lang);

      for (const project of projects) {
        // If projectSlug is provided, skip projects that don't match the slug
        if (projectSlug && project.slug !== projectSlug) {
          continue;
        }

        // Check project contents first
        const projectContent = this.findContentInProjectContents(
          contentId,
          project
        );
        if (projectContent) return projectContent;

        // Then check deliverables
        const deliverableContent = this.findContentInDeliverables(
          contentId,
          project
        );

        if (deliverableContent) return deliverableContent;
      }

      return null;
    } catch (error) {
      throw errorService.createServerError(
        `Failed to find content ${contentId}`,
        { contentId, lang }
      );
    }
  }

  private findContentInProjectContents(contentId: string, project: Project) {
    if (!project.contents?.length) return null;

    const projectContent = project.contents.find(
      (content) => content.id === contentId
    );

    if (projectContent) {
      return {
        content: this.normalizeContent(
          projectContent,
          project.id,
          project.slug,
          project.name
        ),
        context: {
          projectId: project.id,
          projectSlug: project.slug,
          projectName: project.name,
        },
      };
    }

    return null;
  }

  private findContentInDeliverables(contentId: string, project: Project) {
    if (!project.deliverables?.length) return null;

    for (const deliverable of project.deliverables) {
      // Check deliverable contents
      const deliverableContent = deliverable.contents?.find(
        (content) => content.id === contentId
      );

      if (deliverableContent) {
        return {
          content: this.normalizeContent(
            deliverableContent,
            project.id,
            project.slug,
            project.name
          ),
          context: {
            deliverableId: deliverable.id,
            deliverableTitle: deliverable.title,
            projectId: project.id,
            projectSlug: project.slug,
            projectName: project.name,
          },
        };
      }

      // Check content references
      const contentReference = deliverable.contents?.find(
        (ref) => ref.id === contentId
      );

      if (contentReference) {
        const fullContent = project.contents?.find(
          (content) => content.id === contentId
        );

        if (fullContent) {
          return {
            content: this.normalizeContent(
              fullContent,
              project.id,
              project.slug,
              project.name
            ),
            context: {
              deliverableId: deliverable.id,
              deliverableTitle: deliverable.title,
              projectId: project.id,
              projectSlug: project.slug,
              projectName: project.name,
            },
          };
        }
      }
    }

    return null;
  }

  private normalizeContent(
    content: any,
    projectId: string,
    projectSlug: string,
    projectName: string
  ): Content {
    try {
      if ("url" in content) {
        // File content
        return {
          id: content.id,
          type: "file",
          title: content.title,
          description: content.description || "",
          size: content.size,
          url: content.url,
          project: {
            id: projectId,
            name: projectName,
            slug: projectSlug,
          },
          fileType: content.fileType,
          createdBy: content.createdBy,
          createdAt: content.createdAt,
          updatedAt: content.updatedAt,
          metadata: content.metadata || {},
        };
      } else {
        // Component content
        return {
          id: content.id,
          type: "component",
          title: content.title,
          description: content.description || "",
          componentType: content.componentType,
          project: {
            id: projectId,
            name: projectName,
            slug: projectSlug,
          },
          data: content.data,
          createdBy: content.createdBy,
          createdAt: content.createdAt,
          updatedAt: content.updatedAt,
          metadata: content.metadata || {},
        };
      }
    } catch (error) {
      throw errorService.createValidationError("Failed to normalize content", {
        content,
        projectId,
        projectSlug,
        projectName,
      });
    }
  }
}

// Factory function to create the service
export function createProjectService() {
  const projectRepo = new MockProjectRepository();
  return new ProjectService(projectRepo);
}

// Cached functions for direct usage
export const getProjects = cache(async (lang: Language = "en") => {
  const service = createProjectService();
  return service.getProjects(lang);
});

export const getProjectById = cache(
  async (id: string, lang: Language = "en") => {
    const service = createProjectService();
    return service.getProjectById(id, lang);
  }
);

export const getProjectBySlug = cache(
  async (slug: string, lang: Language = "en") => {
    const service = createProjectService();
    return service.getProjectBySlug(slug, lang);
  }
);

export const findContent = cache(
  async (contentId: string, lang: Language = "en", slug: string) => {
    const service = createProjectService();
    return service.findContent(contentId, lang, slug);
  }
);

export const findContentInProject = cache(
  async (projectSlug: string, contentId: string, lang: Language = "en") => {
    const service = createProjectService();
    return service.findContentInProject(projectSlug, contentId, lang);
  }
);
