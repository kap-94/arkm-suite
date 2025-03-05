import { DocumentationData } from "@/components/pages/DocumentationPage/types";

type SupportedLanguages = "es" | "en";

const documentationData: Record<SupportedLanguages, DocumentationData> = {
  es: {
    title: "Guías de Uso",
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
            extendedTitle: "Gestión Centralizada de Proyectos",
            extendedDescription:
              "El Resumen de Proyectos es una herramienta esencial para tener una visión general de todos tus proyectos activos en un solo lugar. Aquí podrás ver el estado actual de cada proyecto, su progreso y las tareas pendientes. Esta vista te permite identificar rápidamente qué proyectos requieren atención y cuáles están avanzando según lo planeado.",
            imageLight: "/images/arkm-dashboard-ui-light.png",
            imageDark: "/images/arkm-dashboard-ui-dark.png",
          },
          {
            title: "Métricas en Tiempo Real",
            description:
              "Monitorea el progreso de tus proyectos con métricas actualizadas en tiempo real.",
            extendedTitle: "Monitoreo y Análisis en Tiempo Real",
            extendedDescription:
              "Las Métricas en tiempo real te permiten monitorear el progreso de tus proyectos con datos actualizados. Estas métricas incluyen el porcentaje de completitud, las tareas pendientes y el tiempo estimadado para la finalización. Con esta información, podrás tomar decisiones basadas en datos y ajustar tus estrategias según sea necesario.",
            imageLight: "/images/arkm-dashboard-metrics-ui-light.png",
            imageDark: "/images/arkm-dashboard-metrics-ui-dark.png",
          },
          {
            title: "Notificaciones",
            description:
              "Mantente informado sobre actualizaciones importantes y cambios en tus proyectos.",
            extendedTitle: "Sistema de Alertas y Notificaciones",
            extendedDescription:
              "El sistema de Notificaciones te mantiene informado sobre actualizaciones importantes, cambios en los proyectos y recordatorios clave.",
            // extendedDescription:
            //   "El sistema de Notificaciones te mantiene informado sobre actualizaciones importantes, cambios en los proyectos y recordatorios clave. Puedes personalizar qué tipo de notificaciones deseas recibir y cómo deseas recibirlas (por correo electrónico, en la aplicación o ambas). Esto garantiza que nunca te pierdas información crítica.",
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
            extendedTitle: "Visión Integral del Proyecto",
            extendedDescription:
              "La Vista General del Proyecto te proporciona una visión completa de todos los aspectos clave de tu proyecto, incluyendo cronogramas, recursos asignados y objetivos. Esta herramienta te permite mantener un control centralizado y asegurar que todos los detalles estén alineados con los objetivos del proyecto.",
            imageLight: "/images/arkm-timeline-light.png",
            imageDark: "/images/arkm-timeline-dark.png",
          },
          {
            title: "Gestión de Etapas",
            description:
              "Controla y actualiza las diferentes etapas del proyecto.",
            extendedTitle: "Control de Etapas del Proyecto",
            extendedDescription:
              "La Gestión de Etapas te permite supervisar y actualizar cada fase del proyecto, desde la planificación inicial hasta la entrega final. Con esta herramienta, puedes asegurarte de que cada etapa se complete a tiempo, manteniendo un flujo de trabajo eficiente.",
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
            extendedTitle: "Organización Eficiente de Entregables",
            extendedDescription:
              "La Organización por Etapas te permite visualizar y gestionar los entregables de tu proyecto de manera estructurada. Cada etapa tiene sus propios entregables, lo que facilita el seguimiento y la entrega puntual de cada componente del proyecto.",
          },
          {
            title: "Estado de Entregables",
            description: "Monitorea el estado y progreso de cada entregable.",
            extendedTitle: "Seguimiento de Entregables",
            extendedDescription:
              "El Estado de Entregables te proporciona una visión clara del progreso de cada entregable, incluyendo su estado actual, fechas límite y responsables. Esta herramienta es esencial para garantizar que todos los entregables se completen a tiempo y cumplan con los estándares de calidad.",
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
            extendedTitle: "Previsualización en Múltiples Dispositivos",
            extendedDescription:
              "La Previsualización Múltiple te permite ver cómo se verá tu contenido en diferentes dispositivos y formatos, asegurando que esté optimizado para todas las plataformas. Esta herramienta es esencial para garantizar una experiencia de usuario consistente y de alta calidad.",
          },
          {
            title: "Comentarios y Anotaciones",
            description:
              "Agrega comentarios y sugerencias directamente sobre el contenido.",
            extendedTitle: "Colaboración en la Revisión de Contenido",
            extendedDescription:
              "Los Comentarios y Anotaciones facilitan la colaboración entre los miembros del equipo durante la revisión del contenido. Puedes agregar comentarios, sugerencias y correcciones directamente sobre el contenido, lo que agiliza el proceso de aprobación y mejora la calidad final.",
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
            extendedTitle: "Documentación de Estilos y Diseño",
            extendedDescription:
              "La Guía de Estilos proporciona una documentación detallada de todos los elementos de diseño utilizados en el proyecto, incluyendo colores, tipografía y componentes. Esta herramienta es esencial para mantener la coherencia visual en todas las partes del proyecto.",
          },
          {
            title: "Componentes",
            description: "Explora la biblioteca de componentes disponibles.",
            extendedTitle: "Biblioteca de Componentes Reutilizables",
            extendedDescription:
              "La Biblioteca de Componentes te permite explorar y utilizar componentes predefinidos en tu proyecto. Estos componentes están diseñados para ser reutilizables, lo que acelera el desarrollo y asegura la coherencia en la interfaz de usuario.",
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
      settings: {
        id: "settings",
        title: "Configuración",
        description: "Personaliza la apariencia e idioma de tu aplicación.",
        features: [
          {
            title: "Preferencias de Visualización",
            description:
              "Ajusta el tema visual de la aplicación según tus preferencias.",
            extendedTitle: "Tema de la Aplicación",
            extendedDescription:
              "Selecciona entre modo claro u oscuro para personalizar la apariencia de la interfaz y mejorar tu experiencia visual.",
          },
          {
            title: "Configuración de Idioma",
            description:
              "Establece el idioma de tu preferencia para la interfaz.",
            extendedTitle: "Preferencias de Idioma",
            extendedDescription:
              "Personaliza el idioma de la aplicación para una mejor comprensión y uso de todas las funcionalidades disponibles.",
          },
        ],
        usage: [
          {
            step: "Acceder a Configuración",
            description:
              "Haz clic en el ícono de configuración en el menú principal.",
          },
          {
            step: "Personalizar Preferencias",
            description:
              "Selecciona el tema visual y el idioma de tu preferencia desde las opciones disponibles.",
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
    title: "Client Suite Guide",
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
            extendedTitle: "Centralized Project Management",
            extendedDescription:
              "The Project Overview is an essential tool to get a general view of all your active projects in one place. Here you can see the current status of each project, its progress, and pending tasks. This view allows you to quickly identify which projects require immediate attention and which are progressing as planned.",
            imageLight: "/images/arkm-dashboard-ui-light.png",
            imageDark: "/images/arkm-dashboard-ui-dark.png",
          },
          {
            title: "Real-time Metrics",
            description:
              "Monitor your projects' progress with real-time updated metrics.",
            extendedTitle: "Real-time Monitoring and Analysis",
            extendedDescription:
              "Real-time Metrics allow you to monitor your projects' progress with instant data updates. These metrics include completion percentage, time spent, pending tasks, and estimated hours for completion. With this information, you can make data-driven decisions and adjust your strategies as needed.",
            imageLight: "/images/arkm-dashboard-metrics-ui-light.png",
            imageDark: "/images/arkm-dashboard-metrics-ui-dark.png",
          },
          {
            title: "Notifications",
            description:
              "Stay informed about important updates and changes in your projects.",
            extendedTitle: "Alerts and Notifications System",
            extendedDescription: `The Notifications system keeps you informed about important updates, project changes, and key reminders.`,
            // extendedDescription:
            //   `The Notifications system keeps you informed about important updates, project changes, and key reminders. You can customize which notifications you want to receive and how you want to receive them (via email, in-app, or both). This ensures you never miss critical information.`,
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
            extendedTitle: "Comprehensive Project Overview",
            extendedDescription:
              "The Project Overview provides a complete view of all key aspects of your project, including timelines, assigned resources, and objectives. This tool allows you to maintain centralized control and ensure all details are aligned with project goals.",
          },
          {
            title: "Stage Management",
            description: "Control and update different project stages.",
            extendedTitle: "Project Stage Control",
            extendedDescription:
              "Stage Management allows you to oversee and update each phase of the project, from initial planning to final delivery. With this tool, you can ensure each stage is completed on time and within budget, maintaining an efficient workflow.",
            imageLight: "/images/arkm-timeline-light.png",
            imageDark: "/images/arkm-timeline-dark.png",
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
            extendedTitle: "Efficient Deliverables Organization",
            extendedDescription:
              "Stage Organization allows you to view and manage project deliverables in a structured manner. Each stage has its own deliverables, making it easier to track and deliver each project component on time.",
          },
          {
            title: "Deliverable Status",
            description: "Monitor the status and progress of each deliverable.",
            extendedTitle: "Deliverables Tracking",
            extendedDescription:
              "Deliverable Status provides a clear view of the progress of each deliverable, including its current status, deadlines, and responsible parties. This tool is essential to ensure all deliverables are completed on time and meet quality standards.",
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
            extendedTitle: "Multi-Device Content Preview",
            extendedDescription:
              "Multiple Preview allows you to see how your content will look on different devices and formats, ensuring it is optimized for all platforms. This tool is essential to guarantee a consistent and high-quality user experience.",
          },
          {
            title: "Comments and Annotations",
            description:
              "Add comments and suggestions directly on the content.",
            extendedTitle: "Collaborative Content Review",
            extendedDescription:
              "Comments and Annotations facilitate collaboration among team members during content review. You can add comments, suggestions, and corrections directly on the content, speeding up the approval process and improving final quality.",
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
            extendedTitle: "Style and Design Documentation",
            extendedDescription:
              "The Style Guide provides detailed documentation of all design elements used in the project, including colors, typography, and components. This tool is essential to maintain visual consistency across all parts of the project.",
          },
          {
            title: "Components",
            description: "Explore the available component library.",
            extendedTitle: "Reusable Component Library",
            extendedDescription:
              "The Component Library allows you to explore and use predefined components in your project. These components are designed to be reusable, speeding up development and ensuring interface consistency.",
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
      settings: {
        id: "settings",
        title: "Settings",
        description: "Customize your application's appearance and language.",
        features: [
          {
            title: "Display Preferences",
            description:
              "Adjust the visual theme of the application to your preferences.",
            extendedTitle: "Application Theme",
            extendedDescription:
              "Select between light or dark mode to customize the interface appearance and enhance your visual experience.",
          },
          {
            title: "Language Settings",
            description: "Set your preferred interface language.",
            extendedTitle: "Language Preferences",
            extendedDescription:
              "Customize the application language for better understanding and use of all available features.",
          },
        ],
        usage: [
          {
            step: "Access Settings",
            description: "Click on the settings icon in the main menu.",
          },
          {
            step: "Customize Preferences",
            description:
              "Select your preferred visual theme and language from the available options.",
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
