// src/services/searchService.ts
import { Language } from "@/lib/config/i18n";
import { documentationService } from "@/services/documentationService";
import { SearchBarOption } from "@/components/SearchBar";
import { createProjectService, ProjectService } from "./projectsService";
import { SearchResult } from "@/components/SearchCard/types"; // Asegúrate de importar el tipo SearchResult

export type SearchableEntity = {
  id: string;
  type: "project" | "documentation" | "task" | "file";
  label: string;
  value: string;
  subtitle?: string;
  href?: string;
  priority?: number;
};

export class SearchService {
  private projectService: ProjectService;

  constructor() {
    this.projectService = createProjectService();
  }

  async search(query: string, lang: Language): Promise<SearchableEntity[]> {
    if (!query || query.length < 2) return [];

    const [projects, documentation] = await Promise.all([
      this.searchProjects(query, lang),
      this.searchDocumentation(query, lang),
    ]);

    return [...projects, ...documentation].sort((a, b) => {
      // Sort by priority first
      if (a.priority !== b.priority) {
        return (b.priority || 0) - (a.priority || 0);
      }
      // Then by type
      return a.type.localeCompare(b.type);
    });
  }

  private async searchProjects(
    query: string,
    lang: Language
  ): Promise<SearchableEntity[]> {
    const projects = await this.projectService.getProjects(lang);
    const normalizedQuery = query.toLowerCase();

    return projects
      .filter(
        (project) =>
          project.name.toLowerCase().includes(normalizedQuery) ||
          project.description.toLowerCase().includes(normalizedQuery) ||
          project.tags?.some((tag) =>
            tag.toLowerCase().includes(normalizedQuery)
          ) ||
          project.deliverables?.some((deliverable) =>
            deliverable.title.toLowerCase().includes(normalizedQuery)
          )
      )
      .map((project) => ({
        id: project.id,
        type: "project",
        label: project.name,
        value: project.id,
        subtitle: project.description,
        href: `/dashboard/project/${project.slug}`,
        priority: 100, // High priority for projects
      }));
  }

  private async searchDocumentation(
    query: string,
    lang: Language
  ): Promise<SearchableEntity[]> {
    const docs = await documentationService.getDocumentation(lang);
    const normalizedQuery = query.toLowerCase();
    const results: SearchableEntity[] = [];

    Object.entries(docs.sections).forEach(([sectionId, section]) => {
      if (
        section.title.toLowerCase().includes(normalizedQuery) ||
        section.description.toLowerCase().includes(normalizedQuery)
      ) {
        results.push({
          id: `doc_${sectionId}`,
          type: "documentation",
          label: section.title,
          value: sectionId,
          subtitle: section.description,
          href: `/dashboard/documentation`, // Cambia esto si necesitas una URL específica
          priority: 80, // Medium-high priority for documentation
        });
      }
    });

    return results;
  }

  // Convert SearchableEntity to SearchBarOption
  public toSearchBarOption(entity: SearchableEntity): SearchBarOption {
    return {
      id: entity.id,
      label: entity.label,
      value: entity.value,
      type: entity.type,
      subtitle: entity.subtitle,
      href: entity.href,
    };
  }

  // Convert SearchableEntity to SearchResult
  public toSearchResult(entity: SearchableEntity): SearchResult {
    return {
      slug: entity.id,
      title: entity.label,
      subtitle: entity.subtitle,
      location: entity.href || "All", // Usar href como location si existe
      relevance: entity.priority
        ? entity.priority >= 90
          ? "high"
          : entity.priority >= 70
          ? "medium"
          : "low"
        : "medium", // Convertir priority numérico a string
      type: entity.type,
      excerpt: entity.subtitle || "",
      answer: undefined, // Opcional
    };
  }
}

// Export a singleton instance
export const searchService = new SearchService();
