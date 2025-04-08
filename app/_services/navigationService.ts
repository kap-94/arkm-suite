import { cache } from "react";
import { Language } from "../_lib/config/i18n";
import type { LucideIcon } from "lucide-react";
import { Project } from "../_types/models/Project";
import { createProjectService } from "./projectsService";
import type { NavItem } from "../_components/Sidebar/types/sidebar.types";
import {
  LayoutDashboard,
  Layout,
  Library,
  Settings,
  Code,
  EyeIcon,
  FileText,
  Palette,
  Layers,
  Folder,
} from "lucide-react";
import { createElement } from "react";

export type NavigationIconId =
  | "overview"
  | "dashboard"
  | "projects"
  | "documentation"
  | "settings"
  | "webDesign"
  | "webDevelopment"
  | "uxResearch"
  | "contentStrategy"
  | "folder";

export const navigationIcons: Record<NavigationIconId, LucideIcon> = {
  dashboard: Layers,
  overview: Layers,
  projects: Layout,
  documentation: Library,
  settings: Settings,
  webDesign: Palette,
  webDevelopment: Code,
  uxResearch: EyeIcon,
  contentStrategy: FileText,
  folder: Folder,
};

export const iconProps = {
  main: {
    size: 24,
    strokeWidth: 1.65,
  },
  child: {
    size: 24,
    strokeWidth: 1.65,
  },
} as const;

export function createIconElement(
  id: string,
  isChild: boolean = false
): React.ReactElement | null {
  const props = isChild ? iconProps.child : iconProps.main;

  if (isValidIconId(id)) {
    return createElement(navigationIcons[id], props);
  }

  return createElement(navigationIcons.folder, props);
}

export function isValidIconId(id: string): id is NavigationIconId {
  return id in navigationIcons;
}

interface Translations {
  dashboard: {
    title: string;
    description: string;
    aria: string;
  };
  projects: {
    title: string;
    description: string;
    aria: string;
    actions: {
      create: string;
      filter: string;
      sort: string;
    };
  };
  documentation: {
    title: string;
    description: string;
    aria: string;
    actions: {
      upload: string;
      filter: string;
      sort: string;
    };
  };
  settings: {
    title: string;
    description: string;
    aria: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    dashboard: {
      title: "Control Panel",
      description: "Overview of your workspace",
      aria: "Main dashboard",
    },
    projects: {
      title: "Projects",
      description: "Manage your projects",
      aria: "Projects overview",
      actions: {
        create: "Create Project",
        filter: "Filter Projects",
        sort: "Sort Projects",
      },
    },
    documentation: {
      title: "Documentation",
      description: "Access your documentation",
      aria: "Documentation management",
      actions: {
        upload: "Upload Document",
        filter: "Filter Documentation",
        sort: "Sort Documentation",
      },
    },
    settings: {
      title: "Settings",
      description: "Configure your preferences",
      aria: "Account settings",
    },
  },
  es: {
    dashboard: {
      title: "Panel de Control",
      description: "Vista general de tu espacio de trabajo",
      aria: "Panel de Control",
    },
    projects: {
      title: "Proyectos",
      description: "Administra tus proyectos",
      aria: "Vista general de proyectos",
      actions: {
        create: "Crear Proyecto",
        filter: "Filtrar Proyectos",
        sort: "Ordenar Proyectos",
      },
    },
    documentation: {
      title: "Documentación",
      description: "Accede a la documentación del portal de cliente",
      aria: "Gestión de documentación",
      actions: {
        upload: "Subir Documentación",
        filter: "Filtrar Documentación",
        sort: "Ordenar Documentación",
      },
    },
    settings: {
      title: "Configuración",
      description: "Configura tus preferencias",
      aria: "Configuración de la cuenta",
    },
  },
};

export class NavigationService {
  constructor(private projectService = createProjectService()) {}

  generateDashboardNavigation = cache(async (lang: Language = "en") => {
    const projects = await this.projectService.getProjects(lang);

    const mainNavigation = await this.generateMainNavigation(projects, lang);
    const bottomNavigation = this.generateBottomNavigation(lang);

    return {
      mainNavigation,
      bottomNavigation,
    };
  });

  private async generateMainNavigation(
    projects: Project[],
    lang: Language
  ): Promise<NavItem[]> {
    return [
      {
        id: "dashboard",
        title: this.getTranslation("dashboard.title", lang),
        path: "/dashboard",
        icon: createIconElement("dashboard"),
        aria: this.getTranslation("dashboard.aria", lang),
        meta: {
          description: this.getTranslation("dashboard.description", lang),
        },
      },
      {
        id: "projects",
        title: this.getTranslation("projects.title", lang),
        path: "/dashboard/projects",
        icon: createIconElement("projects"),
        aria: this.getTranslation("projects.aria", lang),
        meta: {
          description: this.getTranslation("projects.description", lang),
        },
        children: await this.generateProjectChildren(projects, lang),
        actions: {
          create: this.getTranslation("projects.actions.create", lang),
          filter: this.getTranslation("projects.actions.filter", lang),
          sort: this.getTranslation("projects.actions.sort", lang),
        },
      },
      {
        id: "documents",
        title: this.getTranslation("documentation.title", lang),
        path: "/dashboard/documentation",
        icon: createIconElement("documentation"),
        aria: this.getTranslation("documentation.aria", lang),
        meta: {
          description: this.getTranslation("documentation.description", lang),
        },
        actions: {
          upload: this.getTranslation("documentation.actions.upload", lang),
          filter: this.getTranslation("documentation.actions.filter", lang),
          sort: this.getTranslation("documentation.actions.sort", lang),
        },
      },
    ];
  }

  private async generateProjectChildren(
    projects: Project[],
    lang: Language
  ): Promise<NavItem[]> {
    return projects.map((project) => ({
      id: `project-${project.id}`,
      title: project.name,
      path: `/dashboard/project/${project.slug}`,
      icon: createIconElement("folder", true),
      aria: `View project: ${project.name}`,
      meta: {
        description: project.description,
        projectId: project.id,
        status: project.status.value,
        progress: project.progress,
      },
    }));
  }

  private generateBottomNavigation(lang: Language): NavItem[] {
    return [
      {
        id: "settings",
        title: this.getTranslation("settings.title", lang),
        path: "/dashboard/settings",
        icon: createIconElement("settings"),
        aria: this.getTranslation("settings.aria", lang),
        meta: {
          description: this.getTranslation("settings.description", lang),
        },
      },
    ];
  }

  private getTranslation(key: string, lang: Language): string {
    const keys = key.split(".");
    let translation: any = translations[lang];

    for (const k of keys) {
      translation = translation?.[k];
      if (!translation) break;
    }

    return translation || key;
  }
}

export const createNavigationService = cache(() => {
  return new NavigationService();
});

export const getServerNavigation = cache(async (lang: Language) => {
  const service = createNavigationService();
  return service.generateDashboardNavigation(lang);
});
