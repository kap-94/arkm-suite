// services/documentationService.ts

import { DocumentationData } from "@/components/pages/DocumentationPage/types";

type SupportedLanguages = "es" | "en";

const documentationData: Record<SupportedLanguages, DocumentationData> = {
  es: {
    sections: {
      dashboard: {
        id: "dashboard",
        title: "Panel de Control",
        description:
          "Aprende a utilizar el panel de control para gestionar y monitorear tus proyectos de diseño y desarrollo web.",
        features: [
          {
            title: "Resumen de Proyectos",
            description:
              "Visualiza todos tus proyectos activos, su progreso y estados en una sola vista.",
            image: "/images/dashboard-overview.png",
          },
          {
            title: "Métricas en Tiempo Real",
            description:
              "Monitorea el progreso de tus proyectos con métricas actualizadas en tiempo real.",
          },
          {
            title: "Notificaciones",
            description:
              "Mantente informado sobre actualizaciones importantes y cambios en tus proyectos.",
          },
        ],
        usage: [
          {
            step: "Acceder al Panel",
            description:
              "Ingresa a tu cuenta para ver el panel de control personalizado.",
          },
          {
            step: "Revisar Proyectos Activos",
            description:
              "Examina el estado y progreso de todos tus proyectos en curso.",
          },
          {
            step: "Gestionar Notificaciones",
            description:
              "Revisa y gestiona las notificaciones importantes de tus proyectos.",
          },
        ],
      },
      projectDetails: {
        id: "projectDetails",
        title: "Detalles del Proyecto",
        description:
          "Explora y gestiona los detalles específicos de cada proyecto, incluyendo cronogramas, recursos y objetivos.",
        features: [
          {
            title: "Vista General del Proyecto",
            description:
              "Accede a toda la información relevante del proyecto en una vista unificada.",
          },
          {
            title: "Gestión de Etapas",
            description:
              "Controla y actualiza las diferentes etapas del proyecto.",
          },
        ],
        usage: [
          {
            step: "Seleccionar Proyecto",
            description:
              "Elige el proyecto que deseas visualizar desde el panel de control.",
          },
          {
            step: "Explorar Secciones",
            description:
              "Navega por las diferentes secciones del proyecto para ver detalles específicos.",
          },
        ],
      },
      deliverables: {
        id: "deliverables",
        title: "Entregables",
        description:
          "Gestiona y realiza seguimiento de los entregables de tu proyecto en cada etapa del desarrollo.",
        features: [
          {
            title: "Organización por Etapas",
            description:
              "Visualiza los entregables organizados por las diferentes etapas del proyecto.",
          },
          {
            title: "Estado de Entregables",
            description: "Monitorea el estado y progreso de cada entregable.",
          },
        ],
        usage: [
          {
            step: "Seleccionar Etapa",
            description:
              "Elige la etapa del proyecto para ver sus entregables específicos.",
          },
          {
            step: "Revisar Detalles",
            description: "Examina los detalles y estado de cada entregable.",
          },
        ],
      },
      contentPreview: {
        id: "contentPreview",
        title: "Vista Previa de Contenido",
        description:
          "Previsualiza y revisa diferentes tipos de contenido del proyecto antes de su aprobación final.",
        features: [
          {
            title: "Previsualización Múltiple",
            description:
              "Visualiza contenido en diferentes formatos y dispositivos.",
          },
          {
            title: "Comentarios y Anotaciones",
            description:
              "Agrega comentarios y sugerencias directamente sobre el contenido.",
          },
        ],
        usage: [
          {
            step: "Seleccionar Contenido",
            description: "Elige el contenido que deseas previsualizar.",
          },
          {
            step: "Revisar y Comentar",
            description:
              "Examina el contenido y agrega comentarios según sea necesario.",
          },
        ],
      },
      designSystem: {
        id: "designSystem",
        title: "Sistema de Diseño",
        description:
          "Explora y comprende los elementos del sistema de diseño utilizados en tu proyecto.",
        features: [
          {
            title: "Guía de Estilos",
            description:
              "Accede a la documentación completa de estilos, colores y tipografía.",
          },
          {
            title: "Componentes",
            description: "Explora la biblioteca de componentes disponibles.",
          },
        ],
        usage: [
          {
            step: "Explorar Categorías",
            description:
              "Navega por las diferentes categorías del sistema de diseño.",
          },
          {
            step: "Consultar Documentación",
            description: "Revisa la documentación detallada de cada elemento.",
          },
        ],
      },
    },
    commonLabels: {
      features: "Características",
      usage: "Cómo Usar",
      nextSteps: "Siguientes Pasos",
    },
  },
  en: {
    sections: {
      dashboard: {
        id: "dashboard",
        title: "Dashboard",
        description:
          "Learn how to use the dashboard to manage and monitor your web design and development projects.",
        features: [
          {
            title: "Project Overview",
            description:
              "View all your active projects, their progress, and status in one place.",
            image: "/images/dashboard-overview.png",
          },
          {
            title: "Real-time Metrics",
            description:
              "Monitor your projects' progress with real-time updated metrics.",
          },
          {
            title: "Notifications",
            description:
              "Stay informed about important updates and changes in your projects.",
          },
        ],
        usage: [
          {
            step: "Access Dashboard",
            description: "Log in to view your personalized dashboard.",
          },
          {
            step: "Review Active Projects",
            description:
              "Check the status and progress of all your ongoing projects.",
          },
          {
            step: "Manage Notifications",
            description: "Review and manage important project notifications.",
          },
        ],
      },
      projectDetails: {
        id: "projectDetails",
        title: "Project Details",
        description:
          "Explore and manage specific project details, including timelines, resources, and objectives.",
        features: [
          {
            title: "Project Overview",
            description:
              "Access all relevant project information in a unified view.",
          },
          {
            title: "Stage Management",
            description: "Control and update different project stages.",
          },
        ],
        usage: [
          {
            step: "Select Project",
            description:
              "Choose the project you want to view from the dashboard.",
          },
          {
            step: "Explore Sections",
            description:
              "Navigate through different project sections to view specific details.",
          },
        ],
      },
      deliverables: {
        id: "deliverables",
        title: "Deliverables",
        description:
          "Manage and track project deliverables through each development stage.",
        features: [
          {
            title: "Stage Organization",
            description:
              "View deliverables organized by different project stages.",
          },
          {
            title: "Deliverable Status",
            description: "Monitor the status and progress of each deliverable.",
          },
        ],
        usage: [
          {
            step: "Select Stage",
            description:
              "Choose the project stage to view specific deliverables.",
          },
          {
            step: "Review Details",
            description: "Examine the details and status of each deliverable.",
          },
        ],
      },
      contentPreview: {
        id: "contentPreview",
        title: "Content Preview",
        description:
          "Preview and review different types of project content before final approval.",
        features: [
          {
            title: "Multiple Preview",
            description: "View content in different formats and devices.",
          },
          {
            title: "Comments and Annotations",
            description:
              "Add comments and suggestions directly on the content.",
          },
        ],
        usage: [
          {
            step: "Select Content",
            description: "Choose the content you want to preview.",
          },
          {
            step: "Review and Comment",
            description: "Examine the content and add comments as needed.",
          },
        ],
      },
      designSystem: {
        id: "designSystem",
        title: "Design System",
        description:
          "Explore and understand the design system elements used in your project.",
        features: [
          {
            title: "Style Guide",
            description:
              "Access complete documentation of styles, colors, and typography.",
          },
          {
            title: "Components",
            description: "Explore the available component library.",
          },
        ],
        usage: [
          {
            step: "Explore Categories",
            description: "Browse through different design system categories.",
          },
          {
            step: "Check Documentation",
            description: "Review detailed documentation for each element.",
          },
        ],
      },
    },
    commonLabels: {
      features: "Features",
      usage: "How to Use",
      nextSteps: "Next Steps",
    },
  },
};

class DocumentationService {
  async getDocumentation(
    lang: SupportedLanguages = "en"
  ): Promise<DocumentationData> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return documentationData[lang];
  }

  async getSectionById(
    sectionId: string,
    lang: SupportedLanguages = "en"
  ): Promise<
    DocumentationData["sections"][keyof DocumentationData["sections"]]
  > {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const data = documentationData[lang];
    const section = data.sections[sectionId as keyof typeof data.sections];

    if (!section) {
      throw new Error(`Section ${sectionId} not found`);
    }

    return section;
  }
}

export const documentationService = new DocumentationService();
