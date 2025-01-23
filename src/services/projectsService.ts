import { cache } from "react";
import type { Project } from "@/models/project";
import { Language } from "@/config/i18n";

export const getProjects = cache(
  async (lang: Language = "en"): Promise<Project[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    /* When ready to switch to Supabase, uncomment this:
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('projects')
    .select(...)
  if (error) throw new Error('Failed to fetch projects')
  return data
  */

    return lang === "es" ? mockProjectsES : mockProjectsEN;
  }
);

export const getProjectById = cache(
  async (id: string, lang: Language = "en"): Promise<Project | null> => {
    await new Promise((resolve) => setTimeout(resolve, 50));

    const projects = lang === "es" ? mockProjectsES : mockProjectsEN;
    const project = projects.find((p) => p.id === id);
    if (!project) return null;

    return project;
  }
);

const mockProjectsEN: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description:
      "Complete overhaul of the company's main website with modern design principles and improved user experience",
    status: { label: "In Progress", value: "inProgress" },
    progress: 75,
    lastUpdated: "2024-01-10",
    priority: { label: "High", value: "high" },
    type: {
      label: "Web Design And Development",
      value: "webDesignAndDevelopment",
    },
    client: {
      id: "client-1",
      name: "TechCorp",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Discovery", threshold: 20, completed: true },
      { name: "UX Design", threshold: 40, completed: true },
      { name: "UI Design", threshold: 60, completed: true },
      { name: "Development", threshold: 80, completed: false },
      { name: "Testing", threshold: 100, completed: false },
    ],
    teamMembers: [
      {
        id: "user-1",
        name: "Sarah Johnson",
        role: "Project Manager",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-2",
        name: "Michael Chen",
        role: "Lead Developer",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-3",
        name: "Emily Davis",
        role: "UX Designer",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 160,
        actual: 145,
        remaining: 15,
      },
      budget: {
        total: 50000,
        spent: 37500,
        remaining: 12500,
      },
      tasks: {
        total: 48,
        completed: 36,
        inProgress: 8,
        blocked: 4,
      },
    },
    nextMilestone: {
      name: "Beta Launch",
      dueDate: "2024-02-15",
      progress: 85,
    },
    recentActivities: [
      {
        id: "activity-1",
        type: "update",
        description: "Development phase 80% complete",
        timestamp: "2024-01-10T14:30:00Z",
        user: {
          name: "Michael Chen",
          avatar: "/api/placeholder/256/256",
        },
      },
      {
        id: "activity-2",
        type: "milestone",
        description: "UI Design phase completed",
        timestamp: "2024-01-09T11:20:00Z",
        user: {
          name: "Emily Davis",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description:
      "Development of a cross-platform mobile application for customer engagement and service delivery",
    status: { label: "In Progress", value: "inProgress" },
    progress: 45,
    lastUpdated: "2024-01-12",
    priority: { label: "Medium", value: "medium" },
    type: { label: "Web Development", value: "webDevelopment" },
    client: {
      id: "client-2",
      name: "ServicePro",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Security Audit", threshold: 20, completed: true },
      { name: "Protocol Design", threshold: 40, completed: true },
      { name: "Implementation", threshold: 60, completed: false },
      { name: "Testing", threshold: 80, completed: false },
      { name: "Deployment", threshold: 100, completed: false },
    ],
    teamMembers: [
      {
        id: "user-4",
        name: "David Kim",
        role: "Tech Lead",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-5",
        name: "Lisa Wong",
        role: "Mobile Developer",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-6",
        name: "Tom Wilson",
        role: "QA Engineer",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 200,
        actual: 90,
        remaining: 110,
      },
      budget: {
        total: 75000,
        spent: 33750,
        remaining: 41250,
      },
      tasks: {
        total: 60,
        completed: 27,
        inProgress: 15,
        blocked: 8,
      },
    },
    nextMilestone: {
      name: "First Internal Release",
      dueDate: "2024-03-01",
      progress: 45,
    },
    recentActivities: [
      {
        id: "activity-3",
        type: "issue",
        description: "API Integration challenges identified",
        timestamp: "2024-01-12T09:15:00Z",
        user: {
          name: "David Kim",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
  {
    id: "3",
    name: "E-commerce Integration",
    description:
      "Integration of e-commerce functionality into existing web platform with payment processing and inventory management",
    status: { label: "Completed", value: "completed" },
    progress: 100,
    lastUpdated: "2024-01-08",
    priority: { label: "High", value: "high" },
    type: { label: "Web Development", value: "webDevelopment" },

    client: {
      id: "client-3",
      name: "RetailPlus",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Market Research", threshold: 20, completed: true },
      { name: "Content Translation", threshold: 40, completed: true },
      { name: "SEO Optimization", threshold: 60, completed: true },
      { name: "Review", threshold: 80, completed: true },
      { name: "Launch", threshold: 100, completed: true },
    ],
    teamMembers: [
      {
        id: "user-7",
        name: "Rachel Martinez",
        role: "Project Manager",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-8",
        name: "Steve Johnson",
        role: "Backend Developer",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 120,
        actual: 115,
        remaining: 0,
      },
      budget: {
        total: 45000,
        spent: 43000,
        remaining: 2000,
      },
      tasks: {
        total: 40,
        completed: 40,
        inProgress: 0,
        blocked: 0,
      },
    },
    nextMilestone: {
      name: "Post-Launch Review",
      dueDate: "2024-01-20",
      progress: 100,
    },
    recentActivities: [
      {
        id: "activity-4",
        type: "completion",
        description: "Project successfully completed and deployed",
        timestamp: "2024-01-08T16:45:00Z",
        user: {
          name: "Rachel Martinez",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
  {
    id: "4",
    name: "Analytics Dashboard",
    description:
      "Development of a comprehensive analytics dashboard for real-time business intelligence",
    status: { label: "On Hold", value: "onHold" },
    progress: 30,
    lastUpdated: "2024-01-05",
    priority: { label: "Low", value: "low" },
    type: { label: "Web Development", value: "webDevelopment" },
    client: {
      id: "client-4",
      name: "DataCo",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Concept", threshold: 20, completed: true },
      { name: "Requirements", threshold: 40, completed: true },
      { name: "Design", threshold: 60, completed: false },
      { name: "Prototype", threshold: 80, completed: false },
      { name: "Approval", threshold: 100, completed: false },
    ],
    teamMembers: [
      {
        id: "user-9",
        name: "Alex Thompson",
        role: "Data Analyst",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-10",
        name: "Jessica Lee",
        role: "UI Designer",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 90,
        actual: 27,
        remaining: 63,
      },
      budget: {
        total: 35000,
        spent: 10500,
        remaining: 24500,
      },
      tasks: {
        total: 32,
        completed: 10,
        inProgress: 2,
        blocked: 20,
      },
    },
    nextMilestone: {
      name: "Client Requirements Review",
      dueDate: "2024-02-01",
      progress: 30,
    },
    recentActivities: [
      {
        id: "activity-5",
        type: "status_change",
        description: "Project put on hold pending client review",
        timestamp: "2024-01-05T10:30:00Z",
        user: {
          name: "Alex Thompson",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
];

const mockProjectsES: Project[] = [
  {
    id: "1",
    name: "Rediseño de Sitio Web",
    description:
      "Renovación completa del sitio web principal de la empresa con principios de diseño moderno y mejor experiencia de usuario",
    status: { label: "En Progreso", value: "inProgress" },
    progress: 75,
    lastUpdated: "2024-01-10",
    priority: { label: "Alta", value: "high" },
    type: {
      label: "Diseño y Desarrollo Web",
      value: "webDesignAndDevelopment",
    },
    client: {
      id: "client-1",
      name: "TechCorp",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Descubrimiento", threshold: 20, completed: true },
      { name: "Diseño UX", threshold: 40, completed: true },
      { name: "Diseño UI", threshold: 60, completed: true },
      { name: "Desarrollo", threshold: 80, completed: false },
      { name: "Pruebas", threshold: 100, completed: false },
    ],
    teamMembers: [
      {
        id: "user-1",
        name: "Sarah Johnson",
        role: "Gerente de Proyecto",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-2",
        name: "Michael Chen",
        role: "Desarrollador Principal",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-3",
        name: "Emily Davis",
        role: "Diseñadora UX",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 160,
        actual: 145,
        remaining: 15,
      },
      budget: {
        total: 50000,
        spent: 37500,
        remaining: 12500,
      },
      tasks: {
        total: 48,
        completed: 36,
        inProgress: 8,
        blocked: 4,
      },
    },
    nextMilestone: {
      name: "Lanzamiento Beta",
      dueDate: "2024-02-15",
      progress: 85,
    },
    recentActivities: [
      {
        id: "activity-1",
        type: "update",
        description: "Fase de desarrollo 80% completada",
        timestamp: "2024-01-10T14:30:00Z",
        user: {
          name: "Michael Chen",
          avatar: "/api/placeholder/256/256",
        },
      },
      {
        id: "activity-2",
        type: "milestone",
        description: "Fase de diseño UI completada",
        timestamp: "2024-01-09T11:20:00Z",
        user: {
          name: "Emily Davis",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Desarrollo de Aplicación Móvil",
    description:
      "Desarrollo de una aplicación móvil multiplataforma para participación del cliente y prestación de servicios",
    status: { label: "En Progreso", value: "inProgress" },
    progress: 45,
    lastUpdated: "2024-01-12",
    priority: { label: "Media", value: "medium" },
    type: { label: "Desarrollo Web", value: "webDevelopment" },
    client: {
      id: "client-2",
      name: "ServicePro",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Auditoría de Seguridad", threshold: 20, completed: true },
      { name: "Diseño de Protocolo", threshold: 40, completed: true },
      { name: "Implementación", threshold: 60, completed: false },
      { name: "Pruebas", threshold: 80, completed: false },
      { name: "Despliegue", threshold: 100, completed: false },
    ],
    teamMembers: [
      {
        id: "user-4",
        name: "David Kim",
        role: "Líder Técnico",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-5",
        name: "Lisa Wong",
        role: "Desarrolladora Móvil",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-6",
        name: "Tom Wilson",
        role: "Ingeniero QA",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 200,
        actual: 90,
        remaining: 110,
      },
      budget: {
        total: 75000,
        spent: 33750,
        remaining: 41250,
      },
      tasks: {
        total: 60,
        completed: 27,
        inProgress: 15,
        blocked: 8,
      },
    },
    nextMilestone: {
      name: "Primera Versión Interna",
      dueDate: "2024-03-01",
      progress: 45,
    },
    recentActivities: [
      {
        id: "activity-3",
        type: "issue",
        description: "Identificados desafíos de integración API",
        timestamp: "2024-01-12T09:15:00Z",
        user: {
          name: "David Kim",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
  {
    id: "3",
    name: "Integración E-commerce",
    description:
      "Integración de funcionalidad e-commerce en plataforma web existente con procesamiento de pagos y gestión de inventario",
    status: { label: "Completado", value: "completed" },
    progress: 100,
    lastUpdated: "2024-01-08",
    priority: { label: "Alta", value: "high" },
    type: { label: "Desarrollo Web", value: "webDevelopment" },
    client: {
      id: "client-3",
      name: "RetailPlus",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Investigación de Mercado", threshold: 20, completed: true },
      { name: "Traducción de Contenido", threshold: 40, completed: true },
      { name: "Optimización SEO", threshold: 60, completed: true },
      { name: "Revisión", threshold: 80, completed: true },
      { name: "Lanzamiento", threshold: 100, completed: true },
    ],
    teamMembers: [
      {
        id: "user-7",
        name: "Rachel Martinez",
        role: "Gerente de Proyecto",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-8",
        name: "Steve Johnson",
        role: "Desarrollador Backend",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 120,
        actual: 115,
        remaining: 0,
      },
      budget: {
        total: 45000,
        spent: 43000,
        remaining: 2000,
      },
      tasks: {
        total: 40,
        completed: 40,
        inProgress: 0,
        blocked: 0,
      },
    },
    nextMilestone: {
      name: "Revisión Post-Lanzamiento",
      dueDate: "2024-01-20",
      progress: 100,
    },
    recentActivities: [
      {
        id: "activity-4",
        type: "completion",
        description: "Proyecto completado y desplegado exitosamente",
        timestamp: "2024-01-08T16:45:00Z",
        user: {
          name: "Rachel Martinez",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
  {
    id: "4",
    name: "Panel de Analytics",
    description:
      "Desarrollo de un panel de analytics completo para inteligencia empresarial en tiempo real",
    status: { label: "En Espera", value: "onHold" },
    progress: 30,
    lastUpdated: "2024-01-05",
    priority: { label: "Baja", value: "low" },
    type: { label: "Desarrollo Web", value: "webDevelopment" },
    client: {
      id: "client-4",
      name: "DataCo",
      logo: "/api/placeholder/256/256",
    },
    stages: [
      { name: "Concepto", threshold: 20, completed: true },
      { name: "Requerimientos", threshold: 40, completed: true },
      { name: "Diseño", threshold: 60, completed: false },
      { name: "Prototipo", threshold: 80, completed: false },
      { name: "Aprobación", threshold: 100, completed: false },
    ],
    teamMembers: [
      {
        id: "user-9",
        name: "Alex Thompson",
        role: "Analista de Datos",
        avatar: "/api/placeholder/256/256",
      },
      {
        id: "user-10",
        name: "Jessica Lee",
        role: "Diseñadora UI",
        avatar: "/api/placeholder/256/256",
      },
    ],
    metrics: {
      timeSpent: {
        estimated: 90,
        actual: 27,
        remaining: 63,
      },
      budget: {
        total: 35000,
        spent: 10500,
        remaining: 24500,
      },
      tasks: {
        total: 32,
        completed: 10,
        inProgress: 2,
        blocked: 20,
      },
    },
    nextMilestone: {
      name: "Revisión de Requerimientos del Cliente",
      dueDate: "2024-02-01",
      progress: 30,
    },
    recentActivities: [
      {
        id: "activity-5",
        type: "status_change",
        description: "Proyecto en pausa pendiente de revisión del cliente",
        timestamp: "2024-01-05T10:30:00Z",
        user: {
          name: "Alex Thompson",
          avatar: "/api/placeholder/256/256",
        },
      },
    ],
  },
];
