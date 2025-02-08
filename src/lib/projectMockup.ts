import { Project } from "@/types/models";
import {
  Priority,
  ProjectStatus,
  ProjectType,
  TaskStatus,
  Visibility,
} from "@/types/models/Common";

export const projectDataEN: Project = {
  id: "proj_naturaldog2025",
  name: "NaturalDog Food",
  slug: "naturaldog-food",
  description:
    "Development of an e-commerce platform for NaturalDog Foods with personalized feeding plans, subscriptions, and content on natural dog nutrition.",
  type: {
    label: "Web Design and Development",
    value: ProjectType.WEB_DESIGN_AND_DEVELOPMENT,
  },
  status: { label: "In progress", value: ProjectStatus.IN_PROGRESS },
  priority: { label: "High", value: Priority.HIGH },
  progress: 45,
  startDate: "2025-01-01T00:00:00Z",
  endDate: "2025-06-30T00:00:00Z",
  createdAt: "2024-12-15T00:00:00Z",
  updatedAt: "2025-01-29T10:30:00Z",
  owner: {
    id: "user_sarah",
    name: "Sarah Parker",
    email: "sarah.parker@agency.com",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    role: "Project Manager",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-01-29T00:00:00Z",
  },
  client: {
    id: "client_naturaldog",
    name: "NaturalDog Foods Inc.",
    logo: "/logos/naturaldog.svg",
    contact: {
      email: "jessica.brown@naturaldogfoods.com",
      phone: "+1 (555) 123-4567",
    },
    createdAt: "2024-12-01T00:00:00Z",
    updatedAt: "2025-01-29T00:00:00Z",
  },
  teamMembers: [
    {
      id: "user_sarah",
      name: "Sarah Parker",
      email: "sarah.parker@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Project Manager",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_michael",
      name: "Michael Chen",
      email: "michael.chen@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "UI/UX Lead Designer",
      createdAt: "2023-03-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_emily",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Frontend Developer Lead",
      createdAt: "2023-02-01T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_david",
      name: "David Kim",
      email: "david.kim@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Backend Developer Lead",
      createdAt: "2023-04-01T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_ana",
      name: "Ana Silva",
      email: "ana.silva@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Content Strategist",
      createdAt: "2023-06-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_james",
      name: "James Wilson",
      email: "james.wilson@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "QA Engineer",
      createdAt: "2023-07-01T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_sophia",
      name: "Sophia Lee",
      email: "sophia.lee@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "UI Designer",
      createdAt: "2023-05-01T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
  ],
  budget: {
    id: "budget_naturaldog",
    allocated: 120000,
    spent: 45000,
    remaining: 75000,
    currency: "USD",
    createdAt: "2024-12-15T00:00:00Z",
    updatedAt: "2025-01-29T10:30:00Z",
    breakdownByStage: {
      stage_discovery: {
        stage: {
          id: "stage_discovery",
          name: "Discovery & Strategy",
        },
        allocated: 15000,
        spent: 12000,
      },
      stage_design: {
        stage: {
          id: "stage_design",
          name: "UX/UI Design",
        },
        allocated: 35000,
        spent: 20000,
      },
      stage_development: {
        stage: {
          id: "stage_development",
          name: "Development & Integration",
        },
        allocated: 45000,
        spent: 13000,
      },
      stage_testing: {
        stage: {
          id: "stage_testing",
          name: "Testing & Quality Assurance",
        },
        allocated: 15000,
        spent: 0,
      },
      stage_launch: {
        stage: {
          id: "stage_launch",
          name: "Launch & Deployment",
        },
        allocated: 10000,
        spent: 0,
      },
    },
  },
  metrics: {
    tasks: {
      total: 87,
      completed: 32,
      inProgress: 45,
      blocked: 2,
      overdue: 2,
    },
    timeTracking: {
      estimated: 1840,
      spent: 690,
      remaining: 1150,
    },
    milestones: {
      total: 8,
      completed: 2,
      upcoming: 4,
      overdue: 0,
    },
  },
  contents: [
    {
      id: "design_system_config",
      type: "component",
      componentType: "design-system",
      title: "Design System",
      description: "Core design system configuration and tokens",
      createdBy: {
        id: "user_sophia",
        name: "Sophia Lee",
      },
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      data: {
        theme: {
          type: "light",
          colors: {
            background: "#FFFFFF",
            text: "#1A1A1A",
            textSecondary: "#666666",
            border: "#E5E5E5",
            cardBackground: "#F5F5F5",
            hoverBackground: "#EAEAEA",
          },
        },
        colorPalette: {
          primary: {
            label: "Primary Colors",
            // colors: {
            //   base: "#6366F1",
            //   "90": "rgba(99, 102, 241, 0.9)",
            //   "80": "rgba(99, 102, 241, 0.8)",
            //   light: "#818CF8",
            //   dark: "#4F46E5",
            //   "dark-90": "rgba(79, 70, 229, 0.9)",
            //   "dark-80": "rgba(79, 70, 229, 0.8)",
            // },
            colors: {
              base: "#6366F1",
              "90": "#7072F2",
              "80": "#7D7FF4",
              light: "#818CF8",
              dark: "#4F46E5",
              "dark-90": "#5951E6",
              "dark-80": "#6460E8",
            },
          },
          indigo: {
            label: "Indigo Colors",
            colors: {
              light: "#9698FD",
            },
          },
          neutral: {
            label: "Neutral Colors",
            colors: {
              "100": "#FFFFFF",
              "200": "#FAFAFA",
              "300": "#F5F5F5",
              "400": "#E8E8E8",
              "500": "#D9D9D9",
              "600": "#BFBFBF",
              "700": "#8C8C8C",
              "800": "#595959",
              "900": "#262626",
            },
          },
        },
        typographyStyles: [
          {
            name: "heading-1",
            variant: "h1",
            specs: "64px / 48px",
            label: "Heading 1",
            displayText: "Main Heading",
          },
          {
            name: "heading-2",
            variant: "h2",
            specs: "32px / 28px",
            label: "Heading 2",
            displayText: "Section Heading",
          },
          {
            name: "heading-3",
            variant: "h3",
            specs: "24px / 20px",
            label: "Heading 3",
            displayText: "Subsection Heading",
          },
          {
            name: "heading-4",
            variant: "h4",
            specs: "20px / 16px",
            label: "Heading 4",
            displayText: "Card Heading",
          },
          {
            name: "heading-5",
            variant: "h5",
            specs: "16px / 14px",
            label: "Heading 5",
            displayText: "Small Heading",
          },
          {
            name: "paragraph-1",
            variant: "p1",
            specs: "16px / 14px",
            label: "Paragraph 1",
            displayText: "Main paragraph text",
          },
          {
            name: "paragraph-2",
            variant: "p2",
            specs: "14px / 12px",
            label: "Paragraph 2",
            displayText: "Secondary text",
          },
          {
            name: "paragraph-3",
            variant: "p3",
            specs: "12px / 11px",
            label: "Paragraph 3",
            displayText: "Small text",
          },
          {
            name: "label",
            variant: "label",
            specs: "14px / 11px",
            label: "Label",
            displayText: "Form label text",
          },
        ],
        spacingScale: [
          {
            name: "xs",
            value: 4,
            description: "Extra small spacing for tight layouts",
            label: "Extra Small",
          },
          {
            name: "sm",
            value: 8,
            description: "Small spacing for related elements",
            label: "Small",
          },
          {
            name: "md",
            value: 16,
            description: "Medium spacing for separation",
            label: "Medium",
          },
          {
            name: "lg",
            value: 24,
            description: "Large spacing for distinct sections",
            label: "Large",
          },
          {
            name: "xl",
            value: 32,
            description: "Extra large spacing for major sections",
            label: "Extra Large",
          },
          {
            name: "xxl",
            value: 40,
            description: "Double extra large spacing",
            label: "Double Extra Large",
          },
          {
            name: "xxxl",
            value: 48,
            description: "Triple extra large spacing",
            label: "Triple Extra Large",
          },
        ],
        labels: {
          spacing: {
            title: "Spacing Scale",
            unitsLabel: "px",
          },
          typography: {
            title: "Typography",
            sampleText: "Sample Text",
          },
          colors: {
            title: "Color Palette",
            copiedText: "Copied!",
          },
          components: {
            buttons: {
              title: "Buttons",
              variants: {
                primary: "Primary Buttons",
                secondary: "Secondary Buttons",
              },
              sizes: {
                large: "Large",
                default: "Default",
                small: "Small",
              },
              states: {
                withIcon: "With Icon",
                loading: "Loading",
                disabled: "Disabled",
              },
            },
            formControls: {
              title: "Form Controls",
              labels: {
                default: "Default Input",
                withIcon: "Input with Icon",
                floating: "Floating Label",
                error: "Error State",
                disabled: "Disabled State",
              },
              placeholders: {
                default: "Enter text...",
              },
              errorMessage: "This field is required",
            },
          },
        },
      },
      createdAt: "2025-02-15T00:00:00Z",
      updatedAt: "2025-02-25T00:00:00Z",
    },
  ],
  deliverables: [
    {
      id: "del_research_report",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Market Research & Analysis Report",
      description:
        "Comprehensive market analysis including competitor research, target audience insights, and market opportunities",
      status: {
        label: "Completed",
        value: TaskStatus.COMPLETED,
      },
      priority: { label: "High", value: Priority.HIGH },
      stage: {
        id: "stage_discovery",
        name: "Discovery & Strategy",
      },
      assignee: {
        id: "user_ana",
        name: "Ana Silva",
        email: "ana.silva@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Content Strategist",
        createdAt: "2023-06-15T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_ana",
          name: "Ana Silva",
          email: "ana.silva@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Content Strategist",
          createdAt: "2023-06-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_sarah",
          name: "Sarah Parker",
          email: "sarah.parker@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Project Manager",
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-01-01T00:00:00Z",
      dueDate: "2025-01-15T00:00:00Z",
      progress: 100,
      metrics: {
        estimatedHours: 80,
        spentHours: 85,
        remainingHours: 0,
        taskTotal: 6,
        taskCompleted: 6,
        taskCompletedThisWeek: 2,
      },
      dependencies: [],
      contents: [],
      tags: ["research", "analysis", "market"],
      customFields: [
        {
          label: "Review Status",
          value: "approved",
        },
        {
          label: "Client Feedback",
          value: "excellent",
        },
        {
          label: "Presentation Date",
          value: "2025-01-16T00:00:00Z",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-15T00:00:00Z",
    },
    {
      id: "del_user_personas",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "User Personas & Journey Maps",
      description:
        "Detailed user personas and customer journey maps for key user segments",
      status: {
        label: "Completed",
        value: TaskStatus.COMPLETED,
      },
      priority: { label: "High", value: Priority.HIGH },
      stage: {
        id: "stage_discovery",
        name: "Discovery & Strategy",
      },
      assignee: {
        id: "user_michael",
        name: "Michael Chen",
        email: "michael.chen@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "UI/UX Lead Designer",
        createdAt: "2023-03-15T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_michael",
          name: "Michael Chen",
          email: "michael.chen@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "UI/UX Lead Designer",
          createdAt: "2023-03-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_ana",
          name: "Ana Silva",
          email: "ana.silva@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Content Strategist",
          createdAt: "2023-06-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-01-15T00:00:00Z",
      dueDate: "2025-01-31T00:00:00Z",
      progress: 100,
      metrics: {
        estimatedHours: 60,
        spentHours: 55,
        remainingHours: 0,
        taskTotal: 4,
        taskCompleted: 4,
        taskCompletedThisWeek: 1,
      },
      contents: [],
      dependencies: [
        {
          id: "dep_001",
          type: "blocked_by",
          deliverable: {
            id: "del_research_report",
            name: "Market Research & Analysis Report",
          },
        },
      ],
      tags: ["user-research", "personas", "journey-maps"],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-31T00:00:00Z",
    },
    {
      id: "del_wireframes",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Wireframes & User Flow Diagrams",
      description:
        "Low-fidelity wireframes and user flow diagrams for all key pages and features",
      status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
      priority: { label: "High", value: Priority.HIGH },
      stage: {
        id: "stage_design",
        name: "UX/UI Design",
      },
      assignee: {
        id: "user_michael",
        name: "Michael Chen",
        email: "michael.chen@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "UI/UX Lead Designer",
        createdAt: "2023-03-15T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_michael",
          name: "Michael Chen",
          email: "michael.chen@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "UI/UX Lead Designer",
          createdAt: "2023-03-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_sophia",
          name: "Sophia Lee",
          email: "sophia.lee@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "UI Designer",
          createdAt: "2023-05-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-02-01T00:00:00Z",
      dueDate: "2025-02-15T00:00:00Z",
      progress: 85,
      metrics: {
        estimatedHours: 100,
        spentHours: 85,
        remainingHours: 15,
        taskTotal: 8,
        taskCompleted: 7,
        taskCompletedThisWeek: 3,
      },
      contents: [],
      dependencies: [
        {
          id: "dep_002",
          type: "blocked_by",
          deliverable: {
            id: "del_user_personas",
            name: "User Personas & Journey Maps",
          },
        },
      ],
      tags: ["wireframes", "UX", "planning"],
      customFields: [
        {
          label: "Review Status",
          value: "in_review",
        },
        {
          label: "Stakeholder Feedback",
          value: "pending",
        },
        {
          label: "Next Review Date",
          value: "2025-02-20T00:00:00Z",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "del_design_system",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Design System & Component Library",
      description:
        "Complete design system including components, patterns, and usage guidelines",
      status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
      priority: { label: "High", value: Priority.HIGH },
      stage: {
        id: "stage_design",
        name: "UX/UI Design",
      },
      assignee: {
        id: "user_sophia",
        name: "Sophia Lee",
        email: "sophia.lee@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "UI Designer",
        createdAt: "2023-05-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_sophia",
          name: "Sophia Lee",
          email: "sophia.lee@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "UI Designer",
          createdAt: "2023-05-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_michael",
          name: "Michael Chen",
          email: "michael.chen@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "UI/UX Lead Designer",
          createdAt: "2023-03-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-02-15T00:00:00Z",
      dueDate: "2025-02-28T00:00:00Z",
      progress: 75,
      metrics: {
        estimatedHours: 120,
        spentHours: 90,
        remainingHours: 30,
        taskTotal: 10,
        taskCompleted: 7,
        taskCompletedThisWeek: 2,
      },
      contents: [
        {
          id: "design_system_config",
          name: "Design System Configuration",
        },
      ],
      dependencies: [
        {
          id: "dep_003",
          type: "relates_to",
          deliverable: {
            id: "del_wireframes",
            name: "Wireframes & User Flow Diagrams",
          },
        },
      ],
      tags: ["design-system", "UI", "components"],
      customFields: [
        {
          label: "Version",
          value: "1.0.0",
        },
        {
          label: "Status",
          value: "beta",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "del_frontend",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Frontend Implementation",
      description:
        "Complete frontend implementation including all pages and features",
      status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
      priority: { label: "High", value: Priority.HIGH },
      stage: {
        id: "stage_development",
        name: "Development & Integration",
      },
      assignee: {
        id: "user_emily",
        name: "Emily Rodriguez",
        email: "emily.rodriguez@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Frontend Developer Lead",
        createdAt: "2023-02-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_emily",
          name: "Emily Rodriguez",
          email: "emily.rodriguez@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Frontend Developer Lead",
          createdAt: "2023-02-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-03-01T00:00:00Z",
      dueDate: "2025-05-15T00:00:00Z",
      progress: 30,
      metrics: {
        estimatedHours: 400,
        spentHours: 120,
        remainingHours: 280,
        taskTotal: 25,
        taskCompleted: 8,
        taskCompletedThisWeek: 3,
      },
      contents: [],
      dependencies: [
        {
          id: "dep_004",
          type: "blocked_by",
          deliverable: {
            id: "del_design_system",
            name: "Design System & Component Library",
          },
        },
      ],
      tags: ["frontend", "development"],
      customFields: [
        {
          label: "Repository",
          value: "github.com/naturaldog/frontend",
        },
        {
          label: "Technologies",
          value: "React, TypeScript, Tailwind",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-03-10T00:00:00Z",
    },
    {
      id: "del_backend",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Backend Implementation",
      description:
        "Complete backend implementation including all APIs and services",
      status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
      priority: { label: "High", value: Priority.HIGH },
      stage: {
        id: "stage_development",
        name: "Development & Integration",
      },
      assignee: {
        id: "user_david",
        name: "David Kim",
        email: "david.kim@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Backend Developer Lead",
        createdAt: "2023-04-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_david",
          name: "David Kim",
          email: "david.kim@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Backend Developer Lead",
          createdAt: "2023-04-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-03-01T00:00:00Z",
      dueDate: "2025-05-15T00:00:00Z",
      progress: 25,
      metrics: {
        estimatedHours: 350,
        spentHours: 88,
        remainingHours: 262,
        taskTotal: 20,
        taskCompleted: 5,
        taskCompletedThisWeek: 2,
      },
      contents: [],
      dependencies: [],
      tags: ["backend", "development", "api"],
      customFields: [
        {
          label: "Repository",
          value: "github.com/naturaldog/backend",
        },
        {
          label: "Technologies",
          value: "Node.js, Express, PostgreSQL",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-03-10T00:00:00Z",
    },
    {
      id: "del_test_reports",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Test Reports & Documentation",
      description:
        "Comprehensive test reports including unit, integration, and performance test results",
      status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
      priority: { label: "High", value: Priority.HIGH },
      stage: {
        id: "stage_testing",
        name: "Testing & Quality Assurance",
      },
      assignee: {
        id: "user_james",
        name: "James Wilson",
        email: "james.wilson@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "QA Engineer",
        createdAt: "2023-07-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_james",
          name: "James Wilson",
          email: "james.wilson@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "QA Engineer",
          createdAt: "2023-07-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_emily",
          name: "Emily Rodriguez",
          email: "emily.rodriguez@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Frontend Developer Lead",
          createdAt: "2023-02-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-05-01T00:00:00Z",
      dueDate: "2025-06-15T00:00:00Z",
      progress: 0,
      metrics: {
        estimatedHours: 160,
        spentHours: 0,
        remainingHours: 160,
        taskTotal: 12,
        taskCompleted: 0,
        taskCompletedThisWeek: 0,
      },
      contents: [],
      dependencies: [
        {
          id: "dep_005",
          type: "blocked_by",
          deliverable: {
            id: "del_frontend",
            name: "Frontend Implementation",
          },
        },
        {
          id: "dep_006",
          type: "blocked_by",
          deliverable: {
            id: "del_backend",
            name: "Backend Implementation",
          },
        },
      ],
      tags: ["testing", "documentation", "qa"],
      customFields: [
        {
          label: "Test Coverage",
          value: "0%",
        },
        {
          label: "Total Test Cases",
          value: "0",
        },
        {
          label: "Passed Test Cases",
          value: "0",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "del_deployment_docs",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Deployment Documentation",
      description: "Complete deployment documentation and procedures",
      status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
      priority: { label: "High", value: Priority.HIGH },
      stage: {
        id: "stage_launch",
        name: "Launch & Deployment",
      },
      assignee: {
        id: "user_david",
        name: "David Kim",
        email: "david.kim@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Backend Developer Lead",
        createdAt: "2023-04-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_david",
          name: "David Kim",
          email: "david.kim@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Backend Developer Lead",
          createdAt: "2023-04-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-06-15T00:00:00Z",
      dueDate: "2025-06-30T00:00:00Z",
      progress: 0,
      metrics: {
        estimatedHours: 40,
        spentHours: 0,
        remainingHours: 40,
        taskTotal: 3,
        taskCompleted: 0,
        taskCompletedThisWeek: 0,
      },
      contents: [],
      dependencies: [],
      tags: ["deployment", "documentation", "devops"],
      customFields: [
        {
          label: "Repository",
          value: "github.com/naturaldog/deployment",
        },
        {
          label: "Environment",
          value: "production",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "del_launch_checklist",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Launch Checklist & Documentation",
      description:
        "Comprehensive launch checklist and verification documentation",
      status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
      priority: { label: "High", value: Priority.HIGH },
      stage: {
        id: "stage_launch",
        name: "Launch & Deployment",
      },
      assignee: {
        id: "user_sarah",
        name: "Sarah Parker",
        email: "sarah.parker@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Project Manager",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_sarah",
          name: "Sarah Parker",
          email: "sarah.parker@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Project Manager",
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_david",
          name: "David Kim",
          email: "david.kim@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Backend Developer Lead",
          createdAt: "2023-04-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-06-20T00:00:00Z",
      dueDate: "2025-06-30T00:00:00Z",
      progress: 0,
      metrics: {
        estimatedHours: 20,
        spentHours: 0,
        remainingHours: 20,
        taskTotal: 2,
        taskCompleted: 0,
        taskCompletedThisWeek: 0,
      },
      contents: [],
      dependencies: [
        {
          id: "dep_007",
          type: "blocked_by",
          deliverable: {
            id: "del_deployment_docs",
            name: "Deployment Documentation",
          },
        },
      ],
      tags: ["launch", "documentation", "checklist"],
      customFields: [
        {
          label: "Verification Status",
          value: "pending",
        },
        {
          label: "Required Approvals",
          value: "technical, business, security",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
  ],
  stages: [
    {
      id: "stage_discovery",
      name: "Discovery & Strategy",
      description:
        "Market research, user personas, competition analysis, and project planning. Define core features and content strategy.",
      startDate: "2025-01-01T00:00:00Z",
      endDate: "2025-01-31T00:00:00Z",
      order: 1,
      status: {
        label: "Completed",
        value: TaskStatus.COMPLETED,
      },
      progress: 100,
      priority: { label: "High", value: Priority.HIGH },
      assignees: [
        {
          id: "user_sarah",
          name: "Sarah Parker",
        },
        {
          id: "user_michael",
          name: "Michael Chen",
        },
        {
          id: "user_ana",
          name: "Ana Silva",
        },
      ],
      tasks: [
        {
          id: "task_market_research",
          title: "Conduct Market Research",
          description:
            "Research competitors, market trends, and target audience",
          status: {
            label: "Completed",
            value: TaskStatus.COMPLETED,
          },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_ana",
            name: "Ana Silva",
            email: "ana.silva@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Content Strategist",
            createdAt: "2023-06-15T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_discovery",
            name: "Discovery & Strategy",
          },
          deliverable: {
            id: "del_research_report",
            name: "Market Research & Analysis Report",
          },
          startDate: "2025-01-01T00:00:00Z",
          dueDate: "2025-01-10T00:00:00Z",
          progress: 100,
          estimatedHours: 40,
          spentHours: 45,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_competitor_analysis",
              title: "Analyze top 5 competitors",
              completed: true,
            },
            {
              id: "subtask_market_trends",
              title: "Document current market trends",
              completed: true,
            },
          ],
          tags: ["research", "analysis", "market"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-10T00:00:00Z",
        },
        {
          id: "task_competitive_analysis",
          title: "Competitive Analysis",
          description: "Detailed analysis of direct and indirect competitors",
          status: {
            label: "Completed",
            value: TaskStatus.COMPLETED,
          },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_ana",
            name: "Ana Silva",
            email: "ana.silva@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Content Strategist",
            createdAt: "2023-06-15T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_discovery",
            name: "Discovery & Strategy",
          },
          deliverable: {
            id: "del_research_report",
            name: "Market Research & Analysis Report",
          },
          startDate: "2025-01-05T00:00:00Z",
          dueDate: "2025-01-15T00:00:00Z",
          progress: 100,
          estimatedHours: 30,
          spentHours: 32,
          tags: ["research", "competitors"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-15T00:00:00Z",
        },
        {
          id: "task_user_personas",
          title: "Create User Personas",
          description: "Develop detailed user personas based on research",
          status: {
            label: "Completed",
            value: TaskStatus.COMPLETED,
          },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_michael",
            name: "Michael Chen",
            email: "michael.chen@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "UI/UX Lead Designer",
            createdAt: "2023-03-15T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_discovery",
            name: "Discovery & Strategy",
          },
          deliverable: {
            id: "del_user_personas",
            name: "User Personas & Journey Maps",
          },
          startDate: "2025-01-15T00:00:00Z",
          dueDate: "2025-01-25T00:00:00Z",
          progress: 100,
          estimatedHours: 35,
          spentHours: 30,
          tags: ["user-research", "personas"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-25T00:00:00Z",
        },
      ],
      milestones: [
        {
          id: "milestone_discovery_complete",
          title: "Discovery Phase Complete",
          description:
            "Market research finalized, user personas defined, and project scope approved by stakeholders",
          dueDate: "2025-01-31T00:00:00Z",
          stage: {
            id: "stage_discovery",
            name: "Discovery & Strategy",
          },
          deliverables: [
            {
              id: "del_research_report",
              name: "Market Research & Analysis Report",
            },
            {
              id: "del_user_personas",
              name: "User Personas & Journey Maps",
            },
          ],
          status: {
            label: "Completed",
            value: TaskStatus.COMPLETED,
          },
          progress: 100,
          priority: { label: "High", value: Priority.HIGH },
          criteria: [
            "Market research report approved by stakeholders",
            "User personas validated with client",
            "Project scope document finalized",
          ],
          impact: "Establishes foundation for design and development phases",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-31T00:00:00Z",
        },
      ],
      deliverables: [
        {
          id: "del_research_report",
          name: "Market Research & Analysis Report",
        },
        {
          id: "del_user_personas",
          name: "User Personas & Journey Maps",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T10:30:00Z",
    },
    {
      id: "stage_design",
      name: "UX/UI Design",
      description:
        "Information architecture, wireframes, design system, and high-fidelity mockups for all key pages and features.",
      startDate: "2025-02-01T00:00:00Z",
      endDate: "2025-03-15T00:00:00Z",
      order: 2,
      status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
      progress: 65,
      priority: { label: "High", value: Priority.HIGH },
      assignees: [
        {
          id: "user_michael",
          name: "Michael Chen",
        },
        {
          id: "user_sophia",
          name: "Sophia Lee",
        },
      ],
      dependencyStages: [
        {
          id: "stage_discovery",
          name: "Discovery & Strategy",
        },
      ],
      tasks: [
        {
          id: "task_information_architecture",
          title: "Information Architecture",
          description: "Create site map and user flows",
          status: {
            label: "Completed",
            value: TaskStatus.COMPLETED,
          },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_michael",
            name: "Michael Chen",
            email: "michael.chen@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "UI/UX Lead Designer",
            createdAt: "2023-03-15T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_design",
            name: "UX/UI Design",
          },
          deliverable: {
            id: "del_wireframes",
            name: "Wireframes & User Flow Diagrams",
          },
          startDate: "2025-02-01T00:00:00Z",
          dueDate: "2025-02-15T00:00:00Z",
          progress: 100,
          estimatedHours: 40,
          spentHours: 38,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_sitemap",
              title: "Create sitemap",
              completed: true,
            },
            {
              id: "subtask_userflows",
              title: "Design user flows",
              completed: true,
            },
          ],
          tags: ["IA", "UX", "planning"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-02-15T00:00:00Z",
        },
        {
          id: "task_wireframes",
          title: "Create Wireframes",
          description: "Design low-fidelity wireframes for all key pages",
          status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_sophia",
            name: "Sophia Lee",
            email: "sophia.lee@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "UI Designer",
            createdAt: "2023-05-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_design",
            name: "UX/UI Design",
          },
          deliverable: {
            id: "del_wireframes",
            name: "Wireframes & User Flow Diagrams",
          },
          startDate: "2025-02-01T00:00:00Z",
          dueDate: "2025-02-28T00:00:00Z",
          progress: 75,
          estimatedHours: 60,
          spentHours: 45,
          dependencies: [
            {
              id: "task_information_architecture",
              title: "Information Architecture",
              description: "Create site map and user flows",
              status: {
                label: "Completed",
                value: TaskStatus.COMPLETED,
              },
              priority: { label: "High", value: Priority.HIGH },
              assignee: {
                id: "user_michael",
                name: "Michael Chen",
                email: "michael.chen@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "UI/UX Lead Designer",
                createdAt: "2023-03-15T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_design",
                name: "UX/UI Design",
              },
              startDate: "2025-02-01T00:00:00Z",
              dueDate: "2025-02-15T00:00:00Z",
              progress: 100,
              estimatedHours: 40,
              spentHours: 38,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-02-15T00:00:00Z",
            },
          ],
          tags: ["wireframes", "UX"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-02-15T00:00:00Z",
        },
        {
          id: "task_design_system",
          title: "Design System Development",
          description:
            "Create comprehensive design system and component library",
          status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_sophia",
            name: "Sophia Lee",
            email: "sophia.lee@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "UI Designer",
            createdAt: "2023-05-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_design",
            name: "UX/UI Design",
          },
          deliverable: {
            id: "del_design_system",
            name: "Design System & Component Library",
          },
          startDate: "2025-02-15T00:00:00Z",
          dueDate: "2025-03-01T00:00:00Z",
          progress: 60,
          estimatedHours: 80,
          spentHours: 48,
          subtasks: [
            {
              id: "subtask_colors",
              title: "Define color system",
              completed: true,
            },
            {
              id: "subtask_typography",
              title: "Define typography system",
              completed: true,
            },
            {
              id: "subtask_components",
              title: "Create component library",
              completed: false,
            },
          ],
          tags: ["design-system", "UI"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-02-15T00:00:00Z",
        },
      ],
      milestones: [
        {
          id: "milestone_design_system",
          title: "Design System Complete",
          description:
            "Comprehensive design system including components, guidelines, and documentation",
          dueDate: "2025-02-28T00:00:00Z",
          stage: {
            id: "stage_design",
            name: "UX/UI Design",
          },
          deliverables: [
            {
              id: "del_design_system",
              name: "Design System & Component Library",
            },
          ],
          status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
          progress: 75,
          priority: { label: "High", value: Priority.HIGH },
          criteria: [
            "Color system defined and documented",
            "Typography system completed",
            "Component library created",
            "Usage guidelines documented",
            "Design tokens implemented",
          ],
          impact:
            "Establishes consistent design language and accelerates UI development",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "milestone_design_complete",
          title: "UI Design Approval",
          description:
            "All UI designs approved by stakeholders and ready for development",
          dueDate: "2025-03-15T00:00:00Z",
          stage: {
            id: "stage_design",
            name: "UX/UI Design",
          },
          deliverables: [
            {
              id: "del_wireframes",
              name: "Wireframes & User Flow Diagrams",
            },
            {
              id: "del_design_system",
              name: "Design System & Component Library",
            },
          ],
          status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
          progress: 40,
          priority: { label: "High", value: Priority.HIGH },
          criteria: [
            "All page designs completed",
            "Stakeholder feedback incorporated",
            "Design system implementation verified",
            "Development handoff documentation prepared",
          ],
          impact:
            "Enables development team to begin implementation with approved designs",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      deliverables: [
        {
          id: "del_wireframes",
          name: "Wireframes & User Flow Diagrams",
        },
        {
          id: "del_design_system",
          name: "Design System & Component Library",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T10:30:00Z",
    },
    {
      id: "stage_development",
      name: "Development & Integration",
      description:
        "Frontend development, backend implementation, and third-party integrations for payment, shipping, and analytics.",
      startDate: "2025-03-01T00:00:00Z",
      endDate: "2025-05-15T00:00:00Z",
      status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
      progress: 30,
      order: 3,
      priority: { label: "High", value: Priority.HIGH },
      assignees: [
        {
          id: "user_emily",
          name: "Emily Rodriguez",
        },
        {
          id: "user_david",
          name: "David Kim",
        },
      ],
      tasks: [
        {
          id: "task_frontend_setup",
          title: "Frontend Development Setup",
          description:
            "Initial frontend project setup and core components implementation",
          status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_emily",
            name: "Emily Rodriguez",
            email: "emily.rodriguez@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Frontend Developer Lead",
            createdAt: "2023-02-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_development",
            name: "Development & Integration",
          },
          deliverable: {
            id: "del_frontend",
            name: "Frontend Implementation",
          },
          startDate: "2025-03-01T00:00:00Z",
          dueDate: "2025-03-15T00:00:00Z",
          progress: 60,
          estimatedHours: 80,
          spentHours: 48,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_project_config",
              title: "Project Configuration",
              completed: true,
            },
            {
              id: "subtask_core_components",
              title: "Core Components Setup",
              completed: false,
            },
          ],
          tags: ["frontend", "setup", "development"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-03-10T00:00:00Z",
        },
        {
          id: "task_backend_setup",
          title: "Backend Development Setup",
          description:
            "Initial backend infrastructure setup and core APIs implementation",
          status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_david",
            name: "David Kim",
            email: "david.kim@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Backend Developer Lead",
            createdAt: "2023-04-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_development",
            name: "Development & Integration",
          },
          deliverable: {
            id: "del_backend",
            name: "Backend Implementation",
          },
          startDate: "2025-03-01T00:00:00Z",
          dueDate: "2025-03-15T00:00:00Z",
          progress: 55,
          estimatedHours: 80,
          spentHours: 44,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_api_design",
              title: "API Design",
              completed: true,
            },
            {
              id: "subtask_database_setup",
              title: "Database Setup",
              completed: true,
            },
            {
              id: "subtask_auth_implementation",
              title: "Authentication Implementation",
              completed: false,
            },
          ],
          tags: ["backend", "setup", "development"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-03-10T00:00:00Z",
        },
        {
          id: "task_payment_integration",
          title: "Payment Integration",
          description: "Implement payment gateway integration",
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_david",
            name: "David Kim",
            email: "david.kim@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Backend Developer Lead",
            createdAt: "2023-04-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_development",
            name: "Development & Integration",
          },
          deliverable: {
            id: "del_integrations",
            name: "Third-party Integrations",
          },
          startDate: "2025-03-15T00:00:00Z",
          dueDate: "2025-04-15T00:00:00Z",
          progress: 0,
          estimatedHours: 60,
          spentHours: 0,
          dependencies: [
            {
              id: "task_backend_setup",
              title: "Backend Development Setup",
              description:
                "Initial backend infrastructure setup and core APIs implementation",
              status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
              priority: { label: "High", value: Priority.HIGH },
              assignee: {
                id: "user_david",
                name: "David Kim",
                email: "david.kim@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "Backend Developer Lead",
                createdAt: "2023-04-01T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_development",
                name: "Development & Integration",
              },
              startDate: "2025-03-01T00:00:00Z",
              dueDate: "2025-03-15T00:00:00Z",
              progress: 55,
              estimatedHours: 80,
              spentHours: 44,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-03-10T00:00:00Z",
            },
          ],
          tags: ["payment", "integration", "backend"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      milestones: [
        {
          id: "milestone_mvp",
          title: "MVP Release",
          description:
            "Core features implemented and ready for internal testing",
          dueDate: "2025-04-15T00:00:00Z",
          stage: {
            id: "stage_development",
            name: "Development & Integration",
          },
          deliverables: [
            {
              id: "del_frontend",
              name: "Frontend Implementation",
            },
            {
              id: "del_backend",
              name: "Backend Implementation",
            },
          ],
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          progress: 0,
          priority: { label: "High", value: Priority.HIGH },
          criteria: [
            "Core features implemented",
            "Basic user flows working",
            "No critical bugs",
            "Internal testing ready",
          ],
          impact:
            "First working version of the platform for internal testing and validation",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "milestone_beta",
          title: "Beta Release",
          description:
            "Platform ready for beta testing with selected customers",
          dueDate: "2025-05-15T00:00:00Z",
          stage: {
            id: "stage_development",
            name: "Development & Integration",
          },
          deliverables: [
            {
              id: "del_frontend",
              name: "Frontend Implementation",
            },
            {
              id: "del_backend",
              name: "Backend Implementation",
            },
            {
              id: "del_integrations",
              name: "Third-party Integrations",
            },
          ],
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          progress: 0,
          priority: { label: "High", value: Priority.HIGH },
          criteria: [
            "All core features complete",
            "Third-party integrations working",
            "Performance requirements met",
            "Beta testing plan ready",
          ],
          impact:
            "Platform ready for real user testing and feedback collection",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      deliverables: [
        {
          id: "del_frontend",
          name: "Frontend Implementation",
        },
        {
          id: "del_backend",
          name: "Backend Implementation",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "stage_testing",
      name: "Testing & Quality Assurance",
      description:
        "Comprehensive testing including unit tests, integration tests, user acceptance testing, and performance optimization.",
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-06-15T00:00:00Z",
      status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
      progress: 0,
      order: 4,
      priority: { label: "High", value: Priority.HIGH },
      assignees: [
        {
          id: "user_james",
          name: "James Wilson",
        },
        {
          id: "user_emily",
          name: "Emily Rodriguez",
        },
        {
          id: "user_david",
          name: "David Kim",
        },
      ],
      tasks: [
        {
          id: "task_unit_testing",
          title: "Unit Testing",
          description: "Implement comprehensive unit tests for all components",
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_james",
            name: "James Wilson",
            email: "james.wilson@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "QA Engineer",
            createdAt: "2023-07-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_testing",
            name: "Testing & Quality Assurance",
          },
          deliverable: {
            id: "del_test_reports",
            name: "Test Reports & Documentation",
          },
          startDate: "2025-05-01T00:00:00Z",
          dueDate: "2025-05-15T00:00:00Z",
          progress: 0,
          estimatedHours: 80,
          spentHours: 0,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_frontend_unit_tests",
              title: "Frontend Unit Tests",
              completed: false,
            },
            {
              id: "subtask_backend_unit_tests",
              title: "Backend Unit Tests",
              completed: false,
            },
          ],
          tags: ["testing", "unit-tests", "qa"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "task_integration_testing",
          title: "Integration Testing",
          description: "Perform end-to-end integration testing",
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_james",
            name: "James Wilson",
            email: "james.wilson@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "QA Engineer",
            createdAt: "2023-07-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_testing",
            name: "Testing & Quality Assurance",
          },
          deliverable: {
            id: "del_test_reports",
            name: "Test Reports & Documentation",
          },
          startDate: "2025-05-15T00:00:00Z",
          dueDate: "2025-05-31T00:00:00Z",
          progress: 0,
          estimatedHours: 60,
          spentHours: 0,
          dependencies: [
            {
              id: "task_unit_testing",
              title: "Unit Testing",
              description:
                "Implement comprehensive unit tests for all components",
              status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
              priority: { label: "High", value: Priority.HIGH },
              assignee: {
                id: "user_james",
                name: "James Wilson",
                email: "james.wilson@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "QA Engineer",
                createdAt: "2023-07-01T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_testing",
                name: "Testing & Quality Assurance",
              },
              startDate: "2025-05-01T00:00:00Z",
              dueDate: "2025-05-15T00:00:00Z",
              progress: 0,
              estimatedHours: 80,
              spentHours: 0,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-01-29T00:00:00Z",
            },
          ],
          tags: ["testing", "integration-tests", "qa"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "task_uat",
          title: "User Acceptance Testing",
          description: "Conduct UAT with selected customers",
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_emily",
            name: "Emily Rodriguez",
            email: "emily.rodriguez@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Frontend Developer Lead",
            createdAt: "2023-02-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_testing",
            name: "Testing & Quality Assurance",
          },
          deliverable: {
            id: "del_test_reports",
            name: "Test Reports & Documentation",
          },
          startDate: "2025-06-01T00:00:00Z",
          dueDate: "2025-06-15T00:00:00Z",
          progress: 0,
          estimatedHours: 40,
          spentHours: 0,
          dependencies: [
            {
              id: "task_integration_testing",
              title: "Integration Testing",
              description: "Perform end-to-end integration testing",
              status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
              priority: { label: "High", value: Priority.HIGH },
              assignee: {
                id: "user_james",
                name: "James Wilson",
                email: "james.wilson@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "QA Engineer",
                createdAt: "2023-07-01T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_testing",
                name: "Testing & Quality Assurance",
              },
              startDate: "2025-05-15T00:00:00Z",
              dueDate: "2025-05-31T00:00:00Z",
              progress: 0,
              estimatedHours: 60,
              spentHours: 0,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-01-29T00:00:00Z",
            },
          ],
          tags: ["testing", "uat", "customer-feedback"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      milestones: [
        {
          id: "milestone_testing_complete",
          title: "Testing Complete",
          description: "All testing phases completed successfully",
          dueDate: "2025-06-15T00:00:00Z",
          stage: {
            id: "stage_testing",
            name: "Testing & Quality Assurance",
          },
          deliverables: [
            {
              id: "del_test_reports",
              name: "Test Reports & Documentation",
            },
          ],
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          progress: 0,
          priority: { label: "High", value: Priority.HIGH },
          criteria: [
            "Unit testing completed with >90% coverage",
            "Integration tests passed",
            "UAT completed with customer sign-off",
            "Performance benchmarks met",
            "All critical bugs resolved",
          ],
          impact: "Ensures platform stability and readiness for launch",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      deliverables: [
        {
          id: "del_test_reports",
          name: "Test Reports & Documentation",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "stage_launch",
      name: "Launch & Deployment",
      description:
        "Final preparations, deployment to production, and post-launch monitoring and support.",
      startDate: "2025-06-15T00:00:00Z",
      endDate: "2025-06-30T00:00:00Z",
      status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
      progress: 0,
      order: 5,
      priority: { label: "High", value: Priority.HIGH },
      assignees: [
        {
          id: "user_sarah",
          name: "Sarah Parker",
        },
        {
          id: "user_emily",
          name: "Emily Rodriguez",
        },
        {
          id: "user_david",
          name: "David Kim",
        },
      ],
      tasks: [
        {
          id: "task_deployment_prep",
          title: "Deployment Preparation",
          description: "Prepare production environment and deployment scripts",
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_david",
            name: "David Kim",
            email: "david.kim@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Backend Developer Lead",
            createdAt: "2023-04-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_launch",
            name: "Launch & Deployment",
          },
          deliverable: {
            id: "del_deployment_docs",
            name: "Deployment Documentation",
          },
          startDate: "2025-06-15T00:00:00Z",
          dueDate: "2025-06-20T00:00:00Z",
          progress: 0,
          estimatedHours: 20,
          spentHours: 0,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_env_setup",
              title: "Production Environment Setup",
              completed: false,
            },
            {
              id: "subtask_deployment_scripts",
              title: "Deployment Scripts Creation",
              completed: false,
            },
          ],
          tags: ["deployment", "devops"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "task_launch_checklist",
          title: "Launch Checklist",
          description: "Complete pre-launch checklist and final verifications",
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_sarah",
            name: "Sarah Parker",
            email: "sarah.parker@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Project Manager",
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_launch",
            name: "Launch & Deployment",
          },
          deliverable: {
            id: "del_launch_checklist",
            name: "Launch Checklist & Documentation",
          },
          startDate: "2025-06-20T00:00:00Z",
          dueDate: "2025-06-25T00:00:00Z",
          progress: 0,
          estimatedHours: 16,
          spentHours: 0,
          dependencies: [
            {
              id: "task_deployment_prep",
              title: "Deployment Preparation",
              description:
                "Prepare production environment and deployment scripts",
              status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
              priority: { label: "High", value: Priority.HIGH },
              assignee: {
                id: "user_david",
                name: "David Kim",
                email: "david.kim@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "Backend Developer Lead",
                createdAt: "2023-04-01T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_launch",
                name: "Launch & Deployment",
              },
              startDate: "2025-06-15T00:00:00Z",
              dueDate: "2025-06-20T00:00:00Z",
              progress: 0,
              estimatedHours: 20,
              spentHours: 0,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-01-29T00:00:00Z",
            },
          ],
          tags: ["launch", "verification"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "task_monitoring_setup",
          title: "Monitoring Setup",
          description: "Set up production monitoring and alerting",
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          priority: { label: "High", value: Priority.HIGH },
          assignee: {
            id: "user_david",
            name: "David Kim",
            email: "david.kim@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Backend Developer Lead",
            createdAt: "2023-04-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_launch",
            name: "Launch & Deployment",
          },
          deliverable: {
            id: "del_deployment_docs",
            name: "Deployment Documentation",
          },
          startDate: "2025-06-25T00:00:00Z",
          dueDate: "2025-06-30T00:00:00Z",
          progress: 0,
          estimatedHours: 24,
          spentHours: 0,
          dependencies: [
            {
              id: "task_deployment_prep",
              title: "Deployment Preparation",
              description:
                "Prepare production environment and deployment scripts",
              status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
              priority: { label: "High", value: Priority.HIGH },
              assignee: {
                id: "user_david",
                name: "David Kim",
                email: "david.kim@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "Backend Developer Lead",
                createdAt: "2023-04-01T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_launch",
                name: "Launch & Deployment",
              },
              startDate: "2025-06-15T00:00:00Z",
              dueDate: "2025-06-20T00:00:00Z",
              progress: 0,
              estimatedHours: 20,
              spentHours: 0,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-01-29T00:00:00Z",
            },
          ],
          tags: ["monitoring", "devops"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      milestones: [
        {
          id: "milestone_launch",
          title: "Platform Launch",
          description: "Official platform launch and go-live",
          dueDate: "2025-06-30T00:00:00Z",
          stage: {
            id: "stage_launch",
            name: "Launch & Deployment",
          },
          deliverables: [
            {
              id: "del_deployment_docs",
              name: "Deployment Documentation",
            },
            {
              id: "del_launch_checklist",
              name: "Launch Checklist & Documentation",
            },
          ],
          status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
          progress: 0,
          priority: { label: "High", value: Priority.HIGH },
          criteria: [
            "All deployment documentation completed",
            "Launch checklist verified",
            "Monitoring systems operational",
            "Stakeholder approval received",
            "Go/No-go decision confirmed",
          ],
          impact: "Platform goes live and becomes available to customers",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      deliverables: [
        {
          id: "del_deployment_docs",
          name: "Deployment Documentation",
        },
        {
          id: "del_launch_checklist",
          name: "Launch Checklist & Documentation",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
  ],
  recentActivities: [
    {
      id: "activity_01",
      type: "deliverable_status_change",
      description: "Market Research Report marked as completed",
      user: {
        id: "user_ana",
        name: "Ana Silva",
        email: "ana.silva@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Content Strategist",
        createdAt: "2023-06-15T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      metadata: {
        entityId: "del_research_report",
        entityType: "deliverable",
        changes: {
          status: {
            from: "inProgress",
            to: "completed",
          },
        },
      },
      createdAt: "2025-01-15T16:00:00Z",
      updatedAt: "2025-01-15T16:00:00Z",
    },
  ],
  visibility: Visibility.Private,
};

export const projectDataES: Project = {
  id: "proj_naturaldog2025",
  name: "NaturalDog Food",
  slug: "naturaldog-food",
  description:
    "Desarrollo de una plataforma de comercio electrónico para NaturalDog Foods con planes de alimentación personalizados, suscripciones y contenido sobre nutrición natural para perros.",
  type: {
    label: "Diseño y Desarrollo Web",
    value: ProjectType.WEB_DESIGN_AND_DEVELOPMENT,
  },
  status: { label: "En Progreso", value: ProjectStatus.IN_PROGRESS },
  priority: { label: "Alta", value: Priority.HIGH },
  progress: 45,
  startDate: "2025-01-01T00:00:00Z",
  endDate: "2025-06-30T00:00:00Z",
  createdAt: "2024-12-15T00:00:00Z",
  updatedAt: "2025-01-29T10:30:00Z",
  owner: {
    id: "user_sarah",
    name: "Sarah Parker",
    email: "sarah.parker@agency.com",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    role: "Gerente de Proyecto",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-01-29T00:00:00Z",
  },
  client: {
    id: "client_naturaldog",
    name: "NaturalDog Foods Inc.",
    logo: "/logos/naturaldog.svg",
    contact: {
      email: "jessica.brown@naturaldogfoods.com",
      phone: "+1 (555) 123-4567",
    },
    createdAt: "2024-12-01T00:00:00Z",
    updatedAt: "2025-01-29T00:00:00Z",
  },
  metrics: {
    tasks: {
      total: 87,
      completed: 32,
      inProgress: 45,
      blocked: 2,
      overdue: 2,
    },
    timeTracking: {
      estimated: 1840,
      spent: 690,
      remaining: 1150,
    },
    milestones: {
      total: 8,
      completed: 2,
      upcoming: 4,
      overdue: 0,
    },
  },
  budget: {
    id: "budget_naturaldog",
    allocated: 120000,
    spent: 45000,
    remaining: 75000,
    currency: "USD",
    createdAt: "2024-12-15T00:00:00Z",
    updatedAt: "2025-01-29T10:30:00Z",
    breakdownByStage: {
      stage_discovery: {
        stage: {
          id: "stage_discovery",
          name: "Descubrimiento y Estrategia",
        },
        allocated: 15000,
        spent: 12000,
      },
      stage_design: {
        stage: {
          id: "stage_design",
          name: "Diseño UX/UI",
        },
        allocated: 35000,
        spent: 20000,
      },
      stage_development: {
        stage: {
          id: "stage_development",
          name: "Desarrollo e Integración",
        },
        allocated: 45000,
        spent: 13000,
      },
      stage_testing: {
        stage: {
          id: "stage_testing",
          name: "Pruebas y Control de Calidad",
        },
        allocated: 15000,
        spent: 0,
      },
      stage_launch: {
        stage: {
          id: "stage_launch",
          name: "Lanzamiento y Despliegue",
        },
        allocated: 10000,
        spent: 0,
      },
    },
  },
  teamMembers: [
    {
      id: "user_sarah",
      name: "Sarah Parker",
      email: "sarah.parker@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Gerente de Proyecto",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_michael",
      name: "Michael Chen",
      email: "michael.chen@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Diseñador Líder UI/UX",
      createdAt: "2023-03-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_emily",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Líder de Desarrollo Frontend",
      createdAt: "2023-02-01T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_david",
      name: "David Kim",
      email: "david.kim@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Líder de Desarrollo Backend",
      createdAt: "2023-04-01T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_ana",
      name: "Ana Silva",
      email: "ana.silva@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Estratega de Contenido",
      createdAt: "2023-06-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_james",
      name: "James Wilson",
      email: "james.wilson@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Ingeniero de Control de Calidad",
      createdAt: "2023-07-01T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "user_sophia",
      name: "Sophia Lee",
      email: "sophia.lee@agency.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Diseñadora UI",
      createdAt: "2023-05-01T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
  ],
  contents: [
    {
      id: "design_system_config",
      type: "component",
      componentType: "design-system",
      title: "Sistema de Diseño",
      description: "Configuración central del sistema de diseño y tokens",
      createdBy: {
        id: "user_sophia",
        name: "Sophia Lee",
      },
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      data: {
        theme: {
          type: "light",
          colors: {
            background: "#FFFFFF",
            text: "#1A1A1A",
            textSecondary: "#666666",
            border: "#E5E5E5",
            cardBackground: "#F5F5F5",
            hoverBackground: "#EAEAEA",
          },
        },
        colorPalette: {
          primary: {
            label: "Colores Primarios",
            // colors: {
            //   base: "#6366F1",
            //   "90": "rgba(99, 102, 241, 0.9)",
            //   "80": "rgba(99, 102, 241, 0.8)",
            //   light: "#818CF8",
            //   dark: "#4F46E5",
            //   "dark-90": "rgba(79, 70, 229, 0.9)",
            //   "dark-80": "rgba(79, 70, 229, 0.8)",
            // },
            colors: {
              base: "#6366F1",
              "90": "#7072F2",
              "80": "#7D7FF4",
              light: "#818CF8",
              dark: "#4F46E5",
              "dark-90": "#5951E6",
              "dark-80": "#6460E8",
            },
          },
          indigo: {
            label: "Colores Índigo",
            colors: {
              light: "#9698FD",
            },
          },
          neutral: {
            label: "Colores Neutrales",
            colors: {
              "100": "#FFFFFF",
              "200": "#FAFAFA",
              "300": "#F5F5F5",
              "400": "#E8E8E8",
              "500": "#D9D9D9",
              "600": "#BFBFBF",
              "700": "#8C8C8C",
              "800": "#595959",
              "900": "#262626",
            },
          },
        },
        typographyStyles: [
          {
            name: "heading-1",
            variant: "h1",
            specs: "64px / 48px",
            label: "Encabezado 1",
            displayText: "Encabezado Principal",
          },
          {
            name: "heading-2",
            variant: "h2",
            specs: "32px / 28px",
            label: "Encabezado 2",
            displayText: "Encabezado de Sección",
          },
          {
            name: "heading-3",
            variant: "h3",
            specs: "24px / 20px",
            label: "Encabezado 3",
            displayText: "Encabezado de Subsección",
          },
          {
            name: "heading-4",
            variant: "h4",
            specs: "20px / 16px",
            label: "Encabezado 4",
            displayText: "Encabezado de Tarjeta",
          },
          {
            name: "heading-5",
            variant: "h5",
            specs: "16px / 14px",
            label: "Encabezado 5",
            displayText: "Encabezado Pequeño",
          },
          {
            name: "paragraph-1",
            variant: "p1",
            specs: "16px / 14px",
            label: "Párrafo 1",
            displayText: "Texto principal de párrafo",
          },
          {
            name: "paragraph-2",
            variant: "p2",
            specs: "14px / 12px",
            label: "Párrafo 2",
            displayText: "Texto secundario",
          },
          {
            name: "paragraph-3",
            variant: "p3",
            specs: "12px / 11px",
            label: "Párrafo 3",
            displayText: "Texto pequeño",
          },
          {
            name: "label",
            variant: "label",
            specs: "14px / 11px",
            label: "Etiqueta",
            displayText: "Texto de etiqueta de formulario",
          },
        ],
        spacingScale: [
          {
            name: "xs",
            value: 4,
            description: "Espaciado extra pequeño para diseños ajustados",
            label: "Extra Pequeño",
          },
          {
            name: "sm",
            value: 8,
            description: "Espaciado pequeño para elementos relacionados",
            label: "Pequeño",
          },
          {
            name: "md",
            value: 16,
            description: "Espaciado medio para separación",
            label: "Medio",
          },
          {
            name: "lg",
            value: 24,
            description: "Espaciado grande para secciones distintas",
            label: "Grande",
          },
          {
            name: "xl",
            value: 32,
            description: "Espaciado extra grande para secciones principales",
            label: "Extra Grande",
          },
          {
            name: "xxl",
            value: 40,
            description: "Espaciado doble extra grande",
            label: "Doble Extra Grande",
          },
          {
            name: "xxxl",
            value: 48,
            description: "Espaciado triple extra grande",
            label: "Triple Extra Grande",
          },
        ],
        labels: {
          spacing: {
            title: "Escala de Espaciado",
            unitsLabel: "px",
          },
          typography: {
            title: "Tipografía",
            sampleText: "Texto muestra",
          },
          colors: {
            title: "Paleta de Colores",
            copiedText: "¡Copiado!",
          },
          components: {
            buttons: {
              title: "Botones",
              variants: {
                primary: "Botones Primarios",
                secondary: "Botones Secundarios",
              },
              sizes: {
                large: "Grande",
                default: "Predeterminado",
                small: "Pequeño",
              },
              states: {
                withIcon: "Con Icono",
                loading: "Cargando",
                disabled: "Deshabilitado",
              },
            },
            formControls: {
              title: "Controles de Formulario",
              labels: {
                default: "Campo Predeterminado",
                withIcon: "Campo con Icono",
                floating: "Etiqueta Flotante",
                error: "Estado de Error",
                disabled: "Estado Deshabilitado",
              },
              placeholders: {
                default: "Ingrese texto...",
              },
              errorMessage: "Este campo es requerido",
            },
          },
        },
      },
      createdAt: "2025-02-15T00:00:00Z",
      updatedAt: "2025-02-25T00:00:00Z",
    },
  ],
  deliverables: [
    {
      id: "del_research_report",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Informe de Investigación de Mercado y Análisis",
      description:
        "Análisis completo del mercado incluyendo investigación de competidores, información del público objetivo y oportunidades de mercado",
      status: {
        label: "Completado",
        value: TaskStatus.COMPLETED,
      },
      priority: { label: "Alta", value: Priority.HIGH },
      stage: {
        id: "stage_discovery",
        name: "Descubrimiento y Estrategia",
      },
      assignee: {
        id: "user_ana",
        name: "Ana Silva",
        email: "ana.silva@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Estratega de Contenido",
        createdAt: "2023-06-15T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_ana",
          name: "Ana Silva",
          email: "ana.silva@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Estratega de Contenido",
          createdAt: "2023-06-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_sarah",
          name: "Sarah Parker",
          email: "sarah.parker@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Gerente de Proyecto",
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-01-01T00:00:00Z",
      dueDate: "2025-01-15T00:00:00Z",
      progress: 100,
      metrics: {
        estimatedHours: 80,
        spentHours: 85,
        remainingHours: 0,
        taskTotal: 6,
        taskCompleted: 6,
        taskCompletedThisWeek: 2,
      },
      dependencies: [],
      contents: [],
      tags: ["investigación", "análisis", "mercado"],
      customFields: [
        {
          label: "Estado de Revisión",
          value: "aprobado",
        },
        {
          label: "Retroalimentación del Cliente",
          value: "excelente",
        },
        {
          label: "Fecha de Presentación",
          value: "2025-01-16T00:00:00Z",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-15T00:00:00Z",
    },
    {
      id: "del_user_personas",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Perfiles de Usuario y Mapas de Experiencia",
      description:
        "Perfiles de usuario detallados y mapas de experiencia del cliente para segmentos clave de usuarios",
      status: {
        label: "Completado",
        value: TaskStatus.COMPLETED,
      },
      priority: { label: "Alta", value: Priority.HIGH },
      stage: {
        id: "stage_discovery",
        name: "Descubrimiento y Estrategia",
      },
      assignee: {
        id: "user_michael",
        name: "Michael Chen",
        email: "michael.chen@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Diseñador Líder UI/UX",
        createdAt: "2023-03-15T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_michael",
          name: "Michael Chen",
          email: "michael.chen@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Diseñador Líder UI/UX",
          createdAt: "2023-03-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_ana",
          name: "Ana Silva",
          email: "ana.silva@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Estratega de Contenido",
          createdAt: "2023-06-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-01-15T00:00:00Z",
      dueDate: "2025-01-31T00:00:00Z",
      progress: 100,
      metrics: {
        estimatedHours: 60,
        spentHours: 55,
        remainingHours: 0,
        taskTotal: 4,
        taskCompleted: 4,
        taskCompletedThisWeek: 1,
      },
      contents: [],
      dependencies: [
        {
          id: "dep_001",
          type: "blocked_by",
          deliverable: {
            id: "del_research_report",
            name: "Informe de Investigación de Mercado y Análisis",
          },
        },
      ],
      tags: ["investigación-usuarios", "perfiles", "mapas-experiencia"],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-31T00:00:00Z",
    },
    {
      id: "del_wireframes",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Wireframes y Diagramas de Flujo de Usuario",
      description:
        "Wireframes de baja fidelidad y diagramas de flujo de usuario para todas las páginas y funcionalidades principales",
      status: { label: "En Progreso", value: TaskStatus.IN_PROGRESS },
      priority: { label: "Alta", value: Priority.HIGH },
      stage: {
        id: "stage_design",
        name: "Diseño UX/UI",
      },
      assignee: {
        id: "user_michael",
        name: "Michael Chen",
        email: "michael.chen@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Diseñador Líder UI/UX",
        createdAt: "2023-03-15T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_michael",
          name: "Michael Chen",
          email: "michael.chen@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Diseñador Líder UI/UX",
          createdAt: "2023-03-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_sophia",
          name: "Sophia Lee",
          email: "sophia.lee@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Diseñadora UI",
          createdAt: "2023-05-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-02-01T00:00:00Z",
      dueDate: "2025-02-15T00:00:00Z",
      progress: 85,
      metrics: {
        estimatedHours: 100,
        spentHours: 85,
        remainingHours: 15,
        taskTotal: 8,
        taskCompleted: 7,
        taskCompletedThisWeek: 3,
      },
      contents: [],
      dependencies: [
        {
          id: "dep_002",
          type: "blocked_by",
          deliverable: {
            id: "del_user_personas",
            name: "Perfiles de Usuario y Mapas de Experiencia",
          },
        },
      ],
      tags: ["wireframes", "UX", "planificación"],
      customFields: [
        {
          label: "Estado de Revisión",
          value: "en_revisión",
        },
        {
          label: "Retroalimentación de Interesados",
          value: "pendiente",
        },
        {
          label: "Próxima Fecha de Revisión",
          value: "2025-02-20T00:00:00Z",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "del_design_system",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Sistema de Diseño y Biblioteca de Componentes",
      description:
        "Sistema de diseño completo incluyendo componentes, patrones y guías de uso",
      status: { label: "En Progreso", value: TaskStatus.IN_PROGRESS },
      priority: { label: "Alta", value: Priority.HIGH },
      stage: {
        id: "stage_design",
        name: "Diseño UX/UI",
      },
      assignee: {
        id: "user_sophia",
        name: "Sophia Lee",
        email: "sophia.lee@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Diseñadora UI",
        createdAt: "2023-05-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_sophia",
          name: "Sophia Lee",
          email: "sophia.lee@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Diseñadora UI",
          createdAt: "2023-05-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_michael",
          name: "Michael Chen",
          email: "michael.chen@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Diseñador Líder UI/UX",
          createdAt: "2023-03-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-02-15T00:00:00Z",
      dueDate: "2025-02-28T00:00:00Z",
      progress: 75,
      metrics: {
        estimatedHours: 120,
        spentHours: 90,
        remainingHours: 30,
        taskTotal: 10,
        taskCompleted: 7,
        taskCompletedThisWeek: 2,
      },
      contents: [
        {
          id: "design_system_config",
          name: "Configuración del Sistema de Diseño",
        },
      ],
      dependencies: [
        {
          id: "dep_003",
          type: "relates_to",
          deliverable: {
            id: "del_wireframes",
            name: "Wireframes y Diagramas de Flujo de Usuario",
          },
        },
      ],
      tags: ["sistema-diseño", "UI", "componentes"],
      customFields: [
        {
          label: "Versión",
          value: "1.0.0",
        },
        {
          label: "Estatus",
          value: "beta",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "del_frontend",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Implementación Frontend",
      description:
        "Implementación frontend completa incluyendo todas las páginas y funcionalidades",
      status: { label: "En Progreso", value: TaskStatus.IN_PROGRESS },
      priority: { label: "Alta", value: Priority.HIGH },
      stage: {
        id: "stage_development",
        name: "Desarrollo e Integración",
      },
      assignee: {
        id: "user_emily",
        name: "Emily Rodriguez",
        email: "emily.rodriguez@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Líder de Desarrollo Frontend",
        createdAt: "2023-02-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_emily",
          name: "Emily Rodriguez",
          email: "emily.rodriguez@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Líder de Desarrollo Frontend",
          createdAt: "2023-02-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-03-01T00:00:00Z",
      dueDate: "2025-05-15T00:00:00Z",
      progress: 30,
      metrics: {
        estimatedHours: 400,
        spentHours: 120,
        remainingHours: 280,
        taskTotal: 25,
        taskCompleted: 8,
        taskCompletedThisWeek: 3,
      },
      contents: [],
      dependencies: [
        {
          id: "dep_004",
          type: "blocked_by",
          deliverable: {
            id: "del_design_system",
            name: "Sistema de Diseño y Biblioteca de Componentes",
          },
        },
      ],
      tags: ["frontend", "desarrollo"],
      customFields: [
        {
          label: "Repositorio",
          value: "github.com/naturaldog/frontend",
        },
        {
          label: "Tecnologías",
          value: "React, TypeScript, Tailwind",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-03-10T00:00:00Z",
    },
    {
      id: "del_backend",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Implementación Backend",
      description:
        "Implementación backend completa incluyendo todas las APIs y servicios",
      status: { label: "En Progreso", value: TaskStatus.IN_PROGRESS },
      priority: { label: "Alta", value: Priority.HIGH },
      stage: {
        id: "stage_development",
        name: "Desarrollo e Integración",
      },
      assignee: {
        id: "user_david",
        name: "David Kim",
        email: "david.kim@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Líder de Desarrollo Backend",
        createdAt: "2023-04-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_david",
          name: "David Kim",
          email: "david.kim@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Líder de Desarrollo Backend",
          createdAt: "2023-04-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-03-01T00:00:00Z",
      dueDate: "2025-05-15T00:00:00Z",
      progress: 25,
      metrics: {
        estimatedHours: 350,
        spentHours: 88,
        remainingHours: 262,
        taskTotal: 20,
        taskCompleted: 5,
        taskCompletedThisWeek: 2,
      },
      contents: [],
      dependencies: [],
      tags: ["backend", "desarrollo", "api"],
      customFields: [
        {
          label: "Repositorio",
          value: "github.com/naturaldog/backend",
        },
        {
          label: "Tecnologías",
          value: "Node.js, Express, PostgreSQL",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-03-10T00:00:00Z",
    },
    {
      id: "del_test_reports",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Informes de Pruebas y Documentación",
      description:
        "Informes de prueba completos, incluyendo resultados de pruebas unitarias, de integración y de rendimiento",
      status: { label: "No Iniciado", value: TaskStatus.NOT_STARTED },
      priority: { label: "Alta", value: Priority.HIGH },
      stage: {
        id: "stage_testing",
        name: "Pruebas y Garantía de Calidad",
      },
      assignee: {
        id: "user_james",
        name: "James Wilson",
        email: "james.wilson@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Ingeniero de Calidad",
        createdAt: "2023-07-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_james",
          name: "James Wilson",
          email: "james.wilson@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Ingeniero de Calidad",
          createdAt: "2023-07-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_emily",
          name: "Emily Rodriguez",
          email: "emily.rodriguez@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Líder de Desarrollo Frontend",
          createdAt: "2023-02-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-05-01T00:00:00Z",
      dueDate: "2025-06-15T00:00:00Z",
      progress: 0,
      metrics: {
        estimatedHours: 160,
        spentHours: 0,
        remainingHours: 160,
        taskTotal: 12,
        taskCompleted: 0,
        taskCompletedThisWeek: 0,
      },
      contents: [],
      dependencies: [
        {
          id: "dep_005",
          type: "blocked_by",
          deliverable: {
            id: "del_frontend",
            name: "Implementación del Frontend",
          },
        },
        {
          id: "dep_006",
          type: "blocked_by",
          deliverable: {
            id: "del_backend",
            name: "Implementación del Backend",
          },
        },
      ],
      tags: ["pruebas", "documentación", "calidad"],
      customFields: [
        {
          label: "Cobertura de Pruebas",
          value: "0%",
        },
        {
          label: "Total de Casos de Prueba",
          value: "0",
        },
        {
          label: "Casos de Prueba Aprobados",
          value: "0",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "del_deployment_docs",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Documentación de Despliegue",
      description: "Documentación y procedimientos completos de despliegue",
      status: { label: "No Iniciado", value: TaskStatus.NOT_STARTED },
      priority: { label: "Alta", value: Priority.HIGH },
      stage: {
        id: "stage_launch",
        name: "Lanzamiento y Despliegue",
      },
      assignee: {
        id: "user_david",
        name: "David Kim",
        email: "david.kim@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Líder de Desarrollo Backend",
        createdAt: "2023-04-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_david",
          name: "David Kim",
          email: "david.kim@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Líder de Desarrollo Backend",
          createdAt: "2023-04-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-06-15T00:00:00Z",
      dueDate: "2025-06-30T00:00:00Z",
      progress: 0,
      metrics: {
        estimatedHours: 40,
        spentHours: 0,
        remainingHours: 40,
        taskTotal: 3,
        taskCompleted: 0,
        taskCompletedThisWeek: 0,
      },
      contents: [],
      dependencies: [],
      tags: ["despliegue", "documentación", "devops"],
      customFields: [
        {
          label: "Repositorio",
          value: "github.com/naturaldog/deployment",
        },
        {
          label: "Ambiente",
          value: "producción",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "del_launch_checklist",
      project: {
        id: "proj_naturaldog2025",
        name: "NaturalDog Food e-commerce platform",
        slug: "naturaldog-food",
      },
      title: "Lista de Verificación y Documentación de Lanzamiento",
      description:
        "Lista de verificación completa de lanzamiento y documentación de verificación",
      status: { label: "No Iniciado", value: TaskStatus.NOT_STARTED },
      priority: { label: "Alta", value: Priority.HIGH },
      stage: {
        id: "stage_launch",
        name: "Lanzamiento y Despliegue",
      },
      assignee: {
        id: "user_sarah",
        name: "Sarah Parker",
        email: "sarah.parker@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Gerente de Proyecto",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      teamMembers: [
        {
          id: "user_sarah",
          name: "Sarah Parker",
          email: "sarah.parker@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Gerente de Proyecto",
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "user_david",
          name: "David Kim",
          email: "david.kim@agency.com",
          avatar:
            "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          role: "Líder de Desarrollo Backend",
          createdAt: "2023-04-01T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      startDate: "2025-06-20T00:00:00Z",
      dueDate: "2025-06-30T00:00:00Z",
      progress: 0,
      metrics: {
        estimatedHours: 20,
        spentHours: 0,
        remainingHours: 20,
        taskTotal: 2,
        taskCompleted: 0,
        taskCompletedThisWeek: 0,
      },
      contents: [],
      dependencies: [
        {
          id: "dep_007",
          type: "blocked_by",
          deliverable: {
            id: "del_deployment_docs",
            name: "Documentación de Despliegue",
          },
        },
      ],
      tags: ["lanzamiento", "documentación", "lista de verificación"],
      customFields: [
        {
          label: "Estado de Verificación",
          value: "pendiente",
        },
        {
          label: "Aprobaciones Requeridas",
          value: "técnica, negocios, seguridad",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
  ],
  stages: [
    {
      id: "stage_discovery",
      name: "Descubrimiento y Estrategia",
      description:
        "Investigación de mercado, personas usuarias, análisis de competencia y planificación del proyecto. Definir características principales y estrategia de contenido.",
      startDate: "2025-01-01T00:00:00Z",
      endDate: "2025-01-31T00:00:00Z",
      order: 1,
      status: {
        label: "Completado",
        value: TaskStatus.COMPLETED,
      },
      progress: 100,
      priority: {
        label: "Alta",
        value: Priority.HIGH,
      },
      assignees: [
        {
          id: "user_sarah",
          name: "Sarah Parker",
        },
        {
          id: "user_michael",
          name: "Michael Chen",
        },
        {
          id: "user_ana",
          name: "Ana Silva",
        },
      ],
      tasks: [
        {
          id: "task_market_research",
          title: "Realizar Investigación de Mercado",
          description:
            "Investigar competidores, tendencias del mercado y público objetivo",
          status: {
            label: "Completado",
            value: TaskStatus.COMPLETED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_ana",
            name: "Ana Silva",
            email: "ana.silva@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Estratega de Contenido",
            createdAt: "2023-06-15T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_discovery",
            name: "Descubrimiento y Estrategia",
          },
          deliverable: {
            id: "del_research_report",
            name: "Informe de Investigación y Análisis de Mercado",
          },
          startDate: "2025-01-01T00:00:00Z",
          dueDate: "2025-01-10T00:00:00Z",
          progress: 100,
          estimatedHours: 40,
          spentHours: 45,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_competitor_analysis",
              title: "Analizar los 5 principales competidores",
              completed: true,
            },
            {
              id: "subtask_market_trends",
              title: "Documentar tendencias actuales del mercado",
              completed: true,
            },
          ],
          tags: ["investigación", "análisis", "mercado"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-10T00:00:00Z",
        },
        {
          id: "task_competitive_analysis",
          title: "Análisis Competitivo",
          description:
            "Análisis detallado de competidores directos e indirectos",
          status: {
            label: "Completado",
            value: TaskStatus.COMPLETED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_ana",
            name: "Ana Silva",
            email: "ana.silva@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Estratega de Contenido",
            createdAt: "2023-06-15T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_discovery",
            name: "Descubrimiento y Estrategia",
          },
          deliverable: {
            id: "del_research_report",
            name: "Informe de Investigación y Análisis de Mercado",
          },
          startDate: "2025-01-05T00:00:00Z",
          dueDate: "2025-01-15T00:00:00Z",
          progress: 100,
          estimatedHours: 30,
          spentHours: 32,
          tags: ["investigación", "competidores"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-15T00:00:00Z",
        },
        {
          id: "task_user_personas",
          title: "Crear Personas Usuario",
          description:
            "Desarrollar personas usuario detalladas basadas en la investigación",
          status: {
            label: "Completado",
            value: TaskStatus.COMPLETED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_michael",
            name: "Michael Chen",
            email: "michael.chen@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Diseñador Líder UI/UX",
            createdAt: "2023-03-15T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_discovery",
            name: "Descubrimiento y Estrategia",
          },
          deliverable: {
            id: "del_user_personas",
            name: "Personas Usuario y Mapas de Viaje",
          },
          startDate: "2025-01-15T00:00:00Z",
          dueDate: "2025-01-25T00:00:00Z",
          progress: 100,
          estimatedHours: 35,
          spentHours: 30,
          tags: ["investigación-usuarios", "personas"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-25T00:00:00Z",
        },
      ],
      milestones: [
        {
          id: "milestone_discovery_complete",
          title: "Fase de Descubrimiento Completada",
          description:
            "Investigación de mercado finalizada, personas usuario definidas y alcance del proyecto aprobado por los interesados",
          dueDate: "2025-01-31T00:00:00Z",
          stage: {
            id: "stage_discovery",
            name: "Descubrimiento y Estrategia",
          },
          deliverables: [
            {
              id: "del_research_report",
              name: "Informe de Investigación y Análisis de Mercado",
            },
            {
              id: "del_user_personas",
              name: "Personas Usuario y Mapas de Viaje",
            },
          ],
          status: {
            label: "Completado",
            value: TaskStatus.COMPLETED,
          },
          progress: 100,
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          criteria: [
            "Informe de investigación de mercado aprobado por los interesados",
            "Personas usuario validadas con el cliente",
            "Documento de alcance del proyecto finalizado",
          ],
          impact: "Establece la base para las fases de diseño y desarrollo",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-31T00:00:00Z",
        },
      ],
      deliverables: [
        {
          id: "del_research_report",
          name: "Informe de Investigación y Análisis de Mercado",
        },
        {
          id: "del_user_personas",
          name: "Personas Usuario y Mapas de Viaje",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T10:30:00Z",
    },
    {
      id: "stage_design",
      name: "Diseño UX/UI",
      description:
        "Arquitectura de información, wireframes, sistema de diseño y maquetas de alta fidelidad para todas las páginas y características principales.",
      startDate: "2025-02-01T00:00:00Z",
      endDate: "2025-03-15T00:00:00Z",
      order: 2,
      status: {
        label: "En Progreso",
        value: TaskStatus.IN_PROGRESS,
      },
      progress: 65,
      priority: {
        label: "Alta",
        value: Priority.HIGH,
      },
      assignees: [
        {
          id: "user_michael",
          name: "Michael Chen",
        },
        {
          id: "user_sophia",
          name: "Sophia Lee",
        },
      ],
      dependencyStages: [
        {
          id: "stage_discovery",
          name: "Descubrimiento y Estrategia",
        },
      ],
      tasks: [
        {
          id: "task_information_architecture",
          title: "Arquitectura de Información",
          description: "Crear mapa del sitio y flujos de usuario",
          status: {
            label: "Completado",
            value: TaskStatus.COMPLETED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_michael",
            name: "Michael Chen",
            email: "michael.chen@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Diseñador Líder UI/UX",
            createdAt: "2023-03-15T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_design",
            name: "Diseño UX/UI",
          },
          deliverable: {
            id: "del_wireframes",
            name: "Wireframes y Diagramas de Flujo de Usuario",
          },
          startDate: "2025-02-01T00:00:00Z",
          dueDate: "2025-02-15T00:00:00Z",
          progress: 100,
          estimatedHours: 40,
          spentHours: 38,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_sitemap",
              title: "Crear mapa del sitio",
              completed: true,
            },
            {
              id: "subtask_userflows",
              title: "Diseñar flujos de usuario",
              completed: true,
            },
          ],
          tags: ["AI", "UX", "planificación"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-02-15T00:00:00Z",
        },
        {
          id: "task_wireframes",
          title: "Crear Wireframes",
          description:
            "Diseñar wireframes de baja fidelidad para todas las páginas principales",
          status: {
            label: "En Progreso",
            value: TaskStatus.IN_PROGRESS,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_sophia",
            name: "Sophia Lee",
            email: "sophia.lee@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Diseñadora UI",
            createdAt: "2023-05-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_design",
            name: "Diseño UX/UI",
          },
          deliverable: {
            id: "del_wireframes",
            name: "Wireframes y Diagramas de Flujo de Usuario",
          },
          startDate: "2025-02-01T00:00:00Z",
          dueDate: "2025-02-28T00:00:00Z",
          progress: 75,
          estimatedHours: 60,
          spentHours: 45,
          dependencies: [
            {
              id: "task_information_architecture",
              title: "Arquitectura de Información",
              description: "Crear mapa del sitio y flujos de usuario",
              status: {
                label: "Completado",
                value: TaskStatus.COMPLETED,
              },
              priority: {
                label: "Alta",
                value: Priority.HIGH,
              },
              assignee: {
                id: "user_michael",
                name: "Michael Chen",
                email: "michael.chen@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "Diseñador Líder UI/UX",
                createdAt: "2023-03-15T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_design",
                name: "Diseño UX/UI",
              },
              startDate: "2025-02-01T00:00:00Z",
              dueDate: "2025-02-15T00:00:00Z",
              progress: 100,
              estimatedHours: 40,
              spentHours: 38,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-02-15T00:00:00Z",
            },
          ],
          tags: ["wireframes", "UX"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-02-15T00:00:00Z",
        },
        {
          id: "task_design_system",
          title: "Desarrollo del Sistema de Diseño",
          description:
            "Crear sistema de diseño integral y biblioteca de componentes",
          status: {
            label: "En Progreso",
            value: TaskStatus.IN_PROGRESS,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_sophia",
            name: "Sophia Lee",
            email: "sophia.lee@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Diseñadora UI",
            createdAt: "2023-05-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_design",
            name: "Diseño UX/UI",
          },
          deliverable: {
            id: "del_design_system",
            name: "Sistema de Diseño y Biblioteca de Componentes",
          },
          startDate: "2025-02-15T00:00:00Z",
          dueDate: "2025-03-01T00:00:00Z",
          progress: 60,
          estimatedHours: 80,
          spentHours: 48,
          subtasks: [
            {
              id: "subtask_colors",
              title: "Definir sistema de colores",
              completed: true,
            },
            {
              id: "subtask_typography",
              title: "Definir sistema tipográfico",
              completed: true,
            },
            {
              id: "subtask_components",
              title: "Crear biblioteca de componentes",
              completed: false,
            },
          ],
          tags: ["sistema-diseño", "UI"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-02-15T00:00:00Z",
        },
      ],
      milestones: [
        {
          id: "milestone_design_system",
          title: "Sistema de Diseño Completado",
          description:
            "Sistema de diseño integral incluyendo componentes, guías y documentación",
          dueDate: "2025-02-28T00:00:00Z",
          stage: {
            id: "stage_design",
            name: "Diseño UX/UI",
          },
          deliverables: [
            {
              id: "del_design_system",
              name: "Sistema de Diseño y Biblioteca de Componentes",
            },
          ],
          status: {
            label: "En Progreso",
            value: TaskStatus.IN_PROGRESS,
          },
          progress: 75,
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          criteria: [
            "Sistema de colores definido y documentado",
            "Sistema tipográfico completado",
            "Biblioteca de componentes creada",
            "Guías de uso documentadas",
            "Tokens de diseño implementados",
          ],
          impact:
            "Establece un lenguaje de diseño consistente y acelera el desarrollo de UI",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "milestone_design_complete",
          title: "Aprobación del Diseño UI",
          description:
            "Todos los diseños UI aprobados por los interesados y listos para desarrollo",
          dueDate: "2025-03-15T00:00:00Z",
          stage: {
            id: "stage_design",
            name: "Diseño UX/UI",
          },
          deliverables: [
            {
              id: "del_wireframes",
              name: "Wireframes y Diagramas de Flujo de Usuario",
            },
            {
              id: "del_design_system",
              name: "Sistema de Diseño y Biblioteca de Componentes",
            },
          ],
          status: {
            label: "En Progreso",
            value: TaskStatus.IN_PROGRESS,
          },
          progress: 40,
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          criteria: [
            "Todos los diseños de página completados",
            "Retroalimentación de interesados incorporada",
            "Implementación del sistema de diseño verificada",
            "Documentación de entrega a desarrollo preparada",
          ],
          impact:
            "Permite al equipo de desarrollo comenzar la implementación con diseños aprobados",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      deliverables: [
        {
          id: "del_wireframes",
          name: "Wireframes y Diagramas de Flujo de Usuario",
        },
        {
          id: "del_design_system",
          name: "Sistema de Diseño y Biblioteca de Componentes",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T10:30:00Z",
    },
    {
      id: "stage_development",
      name: "Desarrollo e Integración",
      description:
        "Desarrollo frontend, implementación backend e integraciones de terceros para pagos, envíos y análisis.",
      startDate: "2025-03-01T00:00:00Z",
      endDate: "2025-05-15T00:00:00Z",
      status: {
        label: "En Progreso",
        value: TaskStatus.IN_PROGRESS,
      },
      progress: 30,
      order: 3,
      priority: {
        label: "Alta",
        value: Priority.HIGH,
      },
      assignees: [
        {
          id: "user_emily",
          name: "Emily Rodriguez",
        },
        {
          id: "user_david",
          name: "David Kim",
        },
      ],
      tasks: [
        {
          id: "task_frontend_setup",
          title: "Configuración del Desarrollo Frontend",
          description:
            "Configuración inicial del proyecto frontend e implementación de componentes principales",
          status: {
            label: "En Progreso",
            value: TaskStatus.IN_PROGRESS,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_emily",
            name: "Emily Rodriguez",
            email: "emily.rodriguez@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Líder Desarrolladora Frontend",
            createdAt: "2023-02-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_development",
            name: "Desarrollo e Integración",
          },
          deliverable: {
            id: "del_frontend",
            name: "Implementación Frontend",
          },
          startDate: "2025-03-01T00:00:00Z",
          dueDate: "2025-03-15T00:00:00Z",
          progress: 60,
          estimatedHours: 80,
          spentHours: 48,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_project_config",
              title: "Configuración del Proyecto",
              completed: true,
            },
            {
              id: "subtask_core_components",
              title: "Configuración de Componentes Principales",
              completed: false,
            },
          ],
          tags: ["frontend", "configuración", "desarrollo"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-03-10T00:00:00Z",
        },
        {
          id: "task_backend_setup",
          title: "Configuración del Desarrollo Backend",
          description:
            "Configuración inicial de infraestructura backend e implementación de APIs principales",
          status: {
            label: "En Progreso",
            value: TaskStatus.IN_PROGRESS,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_david",
            name: "David Kim",
            email: "david.kim@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Líder Desarrollador Backend",
            createdAt: "2023-04-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_development",
            name: "Desarrollo e Integración",
          },
          deliverable: {
            id: "del_backend",
            name: "Implementación Backend",
          },
          startDate: "2025-03-01T00:00:00Z",
          dueDate: "2025-03-15T00:00:00Z",
          progress: 55,
          estimatedHours: 80,
          spentHours: 44,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_api_design",
              title: "Diseño de API",
              completed: true,
            },
            {
              id: "subtask_database_setup",
              title: "Configuración de Base de Datos",
              completed: true,
            },
            {
              id: "subtask_auth_implementation",
              title: "Implementación de Autenticación",
              completed: false,
            },
          ],
          tags: ["backend", "configuración", "desarrollo"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-03-10T00:00:00Z",
        },
        {
          id: "task_payment_integration",
          title: "Integración de Pagos",
          description: "Implementar integración con pasarela de pagos",
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_david",
            name: "David Kim",
            email: "david.kim@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Líder Desarrollador Backend",
            createdAt: "2023-04-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_development",
            name: "Desarrollo e Integración",
          },
          deliverable: {
            id: "del_integrations",
            name: "Integraciones con Terceros",
          },
          startDate: "2025-03-15T00:00:00Z",
          dueDate: "2025-04-15T00:00:00Z",
          progress: 0,
          estimatedHours: 60,
          spentHours: 0,
          dependencies: [
            {
              id: "task_backend_setup",
              title: "Configuración del Desarrollo Backend",
              description:
                "Configuración inicial de infraestructura backend e implementación de APIs principales",
              status: {
                label: "En Progreso",
                value: TaskStatus.IN_PROGRESS,
              },
              priority: {
                label: "Alta",
                value: Priority.HIGH,
              },
              assignee: {
                id: "user_david",
                name: "David Kim",
                email: "david.kim@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "Líder Desarrollador Backend",
                createdAt: "2023-04-01T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_development",
                name: "Desarrollo e Integración",
              },
              startDate: "2025-03-01T00:00:00Z",
              dueDate: "2025-03-15T00:00:00Z",
              progress: 55,
              estimatedHours: 80,
              spentHours: 44,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-03-10T00:00:00Z",
            },
          ],
          tags: ["pagos", "integración", "backend"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      milestones: [
        {
          id: "milestone_mvp",
          title: "Lanzamiento MVP",
          description:
            "Características principales implementadas y listas para pruebas internas",
          dueDate: "2025-04-15T00:00:00Z",
          stage: {
            id: "stage_development",
            name: "Desarrollo e Integración",
          },
          deliverables: [
            {
              id: "del_frontend",
              name: "Implementación Frontend",
            },
            {
              id: "del_backend",
              name: "Implementación Backend",
            },
          ],
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          progress: 0,
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          criteria: [
            "Características principales implementadas",
            "Flujos básicos de usuario funcionando",
            "Sin errores críticos",
            "Listo para pruebas internas",
          ],
          impact:
            "Primera versión funcional de la plataforma para pruebas internas y validación",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "milestone_beta",
          title: "Lanzamiento Beta",
          description:
            "Plataforma lista para pruebas beta con clientes seleccionados",
          dueDate: "2025-05-15T00:00:00Z",
          stage: {
            id: "stage_development",
            name: "Desarrollo e Integración",
          },
          deliverables: [
            {
              id: "del_frontend",
              name: "Implementación Frontend",
            },
            {
              id: "del_backend",
              name: "Implementación Backend",
            },
            {
              id: "del_integrations",
              name: "Integraciones con Terceros",
            },
          ],
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          progress: 0,
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          criteria: [
            "Todas las características principales completadas",
            "Integraciones con terceros funcionando",
            "Requisitos de rendimiento cumplidos",
            "Plan de pruebas beta listo",
          ],
          impact:
            "Plataforma lista para pruebas con usuarios reales y recopilación de retroalimentación",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      deliverables: [
        {
          id: "del_frontend",
          name: "Implementación Frontend",
        },
        {
          id: "del_backend",
          name: "Implementación Backend",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "stage_testing",
      name: "Pruebas y Control de Calidad",
      description:
        "Pruebas exhaustivas incluyendo pruebas unitarias, pruebas de integración, pruebas de aceptación de usuario y optimización de rendimiento.",
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-06-15T00:00:00Z",
      status: {
        label: "No Iniciado",
        value: TaskStatus.NOT_STARTED,
      },
      progress: 0,
      order: 4,
      priority: {
        label: "Alta",
        value: Priority.HIGH,
      },
      assignees: [
        {
          id: "user_james",
          name: "James Wilson",
        },
        {
          id: "user_emily",
          name: "Emily Rodriguez",
        },
        {
          id: "user_david",
          name: "David Kim",
        },
      ],
      tasks: [
        {
          id: "task_unit_testing",
          title: "Pruebas Unitarias",
          description:
            "Implementar pruebas unitarias exhaustivas para todos los componentes",
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_james",
            name: "James Wilson",
            email: "james.wilson@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Ingeniero QA",
            createdAt: "2023-07-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_testing",
            name: "Pruebas y Control de Calidad",
          },
          deliverable: {
            id: "del_test_reports",
            name: "Informes y Documentación de Pruebas",
          },
          startDate: "2025-05-01T00:00:00Z",
          dueDate: "2025-05-15T00:00:00Z",
          progress: 0,
          estimatedHours: 80,
          spentHours: 0,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_frontend_unit_tests",
              title: "Pruebas Unitarias Frontend",
              completed: false,
            },
            {
              id: "subtask_backend_unit_tests",
              title: "Pruebas Unitarias Backend",
              completed: false,
            },
          ],
          tags: ["pruebas", "pruebas-unitarias", "qa"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "task_integration_testing",
          title: "Pruebas de Integración",
          description: "Realizar pruebas de integración de extremo a extremo",
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_james",
            name: "James Wilson",
            email: "james.wilson@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Ingeniero QA",
            createdAt: "2023-07-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_testing",
            name: "Pruebas y Control de Calidad",
          },
          deliverable: {
            id: "del_test_reports",
            name: "Informes y Documentación de Pruebas",
          },
          startDate: "2025-05-15T00:00:00Z",
          dueDate: "2025-05-31T00:00:00Z",
          progress: 0,
          estimatedHours: 60,
          spentHours: 0,
          dependencies: [
            {
              id: "task_unit_testing",
              title: "Pruebas Unitarias",
              description:
                "Implementar pruebas unitarias exhaustivas para todos los componentes",
              status: {
                label: "No Iniciado",
                value: TaskStatus.NOT_STARTED,
              },
              priority: {
                label: "Alta",
                value: Priority.HIGH,
              },
              assignee: {
                id: "user_james",
                name: "James Wilson",
                email: "james.wilson@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "Ingeniero QA",
                createdAt: "2023-07-01T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_testing",
                name: "Pruebas y Control de Calidad",
              },
              startDate: "2025-05-01T00:00:00Z",
              dueDate: "2025-05-15T00:00:00Z",
              progress: 0,
              estimatedHours: 80,
              spentHours: 0,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-01-29T00:00:00Z",
            },
          ],
          tags: ["pruebas", "pruebas-integración", "qa"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "task_uat",
          title: "Pruebas de Aceptación de Usuario",
          description: "Realizar UAT con clientes seleccionados",
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_emily",
            name: "Emily Rodriguez",
            email: "emily.rodriguez@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Líder Desarrolladora Frontend",
            createdAt: "2023-02-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_testing",
            name: "Pruebas y Control de Calidad",
          },
          deliverable: {
            id: "del_test_reports",
            name: "Informes y Documentación de Pruebas",
          },
          startDate: "2025-06-01T00:00:00Z",
          dueDate: "2025-06-15T00:00:00Z",
          progress: 0,
          estimatedHours: 40,
          spentHours: 0,
          dependencies: [
            {
              id: "task_integration_testing",
              title: "Pruebas de Integración",
              description:
                "Realizar pruebas de integración de extremo a extremo",
              status: {
                label: "No Iniciado",
                value: TaskStatus.NOT_STARTED,
              },
              priority: {
                label: "Alta",
                value: Priority.HIGH,
              },
              assignee: {
                id: "user_james",
                name: "James Wilson",
                email: "james.wilson@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "Ingeniero QA",
                createdAt: "2023-07-01T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_testing",
                name: "Pruebas y Control de Calidad",
              },
              startDate: "2025-05-15T00:00:00Z",
              dueDate: "2025-05-31T00:00:00Z",
              progress: 0,
              estimatedHours: 60,
              spentHours: 0,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-01-29T00:00:00Z",
            },
          ],
          tags: ["pruebas", "uat", "retroalimentación-cliente"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      milestones: [
        {
          id: "milestone_testing_complete",
          title: "Pruebas Completadas",
          description: "Todas las fases de pruebas completadas exitosamente",
          dueDate: "2025-06-15T00:00:00Z",
          stage: {
            id: "stage_testing",
            name: "Pruebas y Control de Calidad",
          },
          deliverables: [
            {
              id: "del_test_reports",
              name: "Informes y Documentación de Pruebas",
            },
          ],
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          progress: 0,
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          criteria: [
            "Pruebas unitarias completadas con >90% de cobertura",
            "Pruebas de integración aprobadas",
            "UAT completado con aprobación del cliente",
            "Puntos de referencia de rendimiento alcanzados",
            "Todos los errores críticos resueltos",
          ],
          impact:
            "Asegura la estabilidad de la plataforma y preparación para el lanzamiento",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      deliverables: [
        {
          id: "del_test_reports",
          name: "Informes y Documentación de Pruebas",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    {
      id: "stage_launch",
      name: "Lanzamiento y Despliegue",
      description:
        "Preparaciones finales, despliegue a producción y monitoreo y soporte post-lanzamiento.",
      startDate: "2025-06-15T00:00:00Z",
      endDate: "2025-06-30T00:00:00Z",
      status: {
        label: "No Iniciado",
        value: TaskStatus.NOT_STARTED,
      },
      progress: 0,
      order: 5,
      priority: {
        label: "Alta",
        value: Priority.HIGH,
      },
      assignees: [
        {
          id: "user_sarah",
          name: "Sarah Parker",
        },
        {
          id: "user_emily",
          name: "Emily Rodriguez",
        },
        {
          id: "user_david",
          name: "David Kim",
        },
      ],
      tasks: [
        {
          id: "task_deployment_prep",
          title: "Preparación del Despliegue",
          description: "Preparar entorno de producción y scripts de despliegue",
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_david",
            name: "David Kim",
            email: "david.kim@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Líder Desarrollador Backend",
            createdAt: "2023-04-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: { id: "stage_launch", name: "Lanzamiento y Despliegue" },
          deliverable: {
            id: "del_deployment_docs",
            name: "Documentación de Despliegue",
          },
          startDate: "2025-06-15T00:00:00Z",
          dueDate: "2025-06-20T00:00:00Z",
          progress: 0,
          estimatedHours: 20,
          spentHours: 0,
          dependencies: [],
          subtasks: [
            {
              id: "subtask_env_setup",
              title: "Configuración del Entorno de Producción",
              completed: false,
            },
            {
              id: "subtask_deployment_scripts",
              title: "Creación de Scripts de Despliegue",
              completed: false,
            },
          ],
          tags: ["despliegue", "devops"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "task_launch_checklist",
          title: "Lista de Verificación de Lanzamiento",
          description:
            "Completar lista de verificación pre-lanzamiento y verificaciones finales",
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_sarah",
            name: "Sarah Parker",
            email: "sarah.parker@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Gerente de Proyecto",
            createdAt: "2023-01-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_launch",
            name: "Lanzamiento y Despliegue",
          },
          deliverable: {
            id: "del_launch_checklist",
            name: "Lista de Verificación y Documentación de Lanzamiento",
          },
          startDate: "2025-06-20T00:00:00Z",
          dueDate: "2025-06-25T00:00:00Z",
          progress: 0,
          estimatedHours: 16,
          spentHours: 0,
          dependencies: [
            {
              id: "task_deployment_prep",
              title: "Preparación del Despliegue",
              description:
                "Preparar entorno de producción y scripts de despliegue",
              status: {
                label: "No Iniciado",
                value: TaskStatus.NOT_STARTED,
              },
              priority: {
                label: "Alta",
                value: Priority.HIGH,
              },
              assignee: {
                id: "user_david",
                name: "David Kim",
                email: "david.kim@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "Líder Desarrollador Backend",
                createdAt: "2023-04-01T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_launch",
                name: "Lanzamiento y Despliegue",
              },
              startDate: "2025-06-15T00:00:00Z",
              dueDate: "2025-06-20T00:00:00Z",
              progress: 0,
              estimatedHours: 20,
              spentHours: 0,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-01-29T00:00:00Z",
            },
          ],
          tags: ["lanzamiento", "verificación"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
        {
          id: "task_monitoring_setup",
          title: "Configuración de Monitoreo",
          description: "Configurar monitoreo de producción y alertas",
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          assignee: {
            id: "user_david",
            name: "David Kim",
            email: "david.kim@agency.com",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            role: "Líder Desarrollador Backend",
            createdAt: "2023-04-01T00:00:00Z",
            updatedAt: "2025-01-29T00:00:00Z",
          },
          stage: {
            id: "stage_launch",
            name: "Lanzamiento y Despliegue",
          },
          deliverable: {
            id: "del_deployment_docs",
            name: "Documentación de Despliegue",
          },
          startDate: "2025-06-25T00:00:00Z",
          dueDate: "2025-06-30T00:00:00Z",
          progress: 0,
          estimatedHours: 24,
          spentHours: 0,
          dependencies: [
            {
              id: "task_deployment_prep",
              title: "Preparación del Despliegue",
              description:
                "Preparar entorno de producción y scripts de despliegue",
              status: {
                label: "No Iniciado",
                value: TaskStatus.NOT_STARTED,
              },
              priority: {
                label: "Alta",
                value: Priority.HIGH,
              },
              assignee: {
                id: "user_david",
                name: "David Kim",
                email: "david.kim@agency.com",
                avatar:
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                role: "Líder Desarrollador Backend",
                createdAt: "2023-04-01T00:00:00Z",
                updatedAt: "2025-01-29T00:00:00Z",
              },
              stage: {
                id: "stage_launch",
                name: "Lanzamiento y Despliegue",
              },
              startDate: "2025-06-15T00:00:00Z",
              dueDate: "2025-06-20T00:00:00Z",
              progress: 0,
              estimatedHours: 20,
              spentHours: 0,
              createdAt: "2024-12-15T00:00:00Z",
              updatedAt: "2025-01-29T00:00:00Z",
            },
          ],
          tags: ["monitoreo", "devops"],
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      milestones: [
        {
          id: "milestone_launch",
          title: "Lanzamiento de la Plataforma",
          description:
            "Lanzamiento oficial de la plataforma y puesta en marcha",
          dueDate: "2025-06-30T00:00:00Z",
          stage: {
            id: "stage_launch",
            name: "Lanzamiento y Despliegue",
          },
          deliverables: [
            {
              id: "del_deployment_docs",
              name: "Documentación de Despliegue",
            },
            {
              id: "del_launch_checklist",
              name: "Lista de Verificación y Documentación de Lanzamiento",
            },
          ],
          status: {
            label: "No Iniciado",
            value: TaskStatus.NOT_STARTED,
          },
          progress: 0,
          priority: {
            label: "Alta",
            value: Priority.HIGH,
          },
          criteria: [
            "Toda la documentación de despliegue completada",
            "Lista de verificación de lanzamiento verificada",
            "Sistemas de monitoreo operativos",
            "Aprobación de interesados recibida",
            "Decisión Go/No-go confirmada",
          ],
          impact:
            "La plataforma se pone en marcha y queda disponible para los clientes",
          createdAt: "2024-12-15T00:00:00Z",
          updatedAt: "2025-01-29T00:00:00Z",
        },
      ],
      deliverables: [
        {
          id: "del_deployment_docs",
          name: "Documentación de Despliegue",
        },
        {
          id: "del_launch_checklist",
          name: "Lista de Verificación y Documentación de Lanzamiento",
        },
      ],
      createdAt: "2024-12-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
  ],
  recentActivities: [
    {
      id: "activity_01",
      type: "deliverable_status_change",
      description:
        "Informe de investigación de mercado marcado como completado",
      user: {
        id: "user_ana",
        name: "Ana Silva",
        email: "ana.silva@agency.com",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        role: "Estratega de contenido",
        createdAt: "2023-06-15T00:00:00Z",
        updatedAt: "2025-01-29T00:00:00Z",
      },
      metadata: {
        entityId: "del_research_report",
        entityType: "deliverable",
        changes: {
          status: {
            from: "inProgress",
            to: "completed",
          },
        },
      },
      createdAt: "2025-01-15T16:00:00Z",
      updatedAt: "2025-01-15T16:00:00Z",
    },
  ],
  visibility: Visibility.Private,
};

export const projectListEN: Project[] = [
  projectDataEN,
  {
    ...projectDataEN,
    id: "proj_pixelforge-studio_1",
    name: "PixelForge",
    slug: "pixelforge-studio",
    description:
      "Design and development of a modern web studio platform with portfolio management and client collaboration tools.",
    owner: {
      id: "user_alex",
      name: "Alex Johnson",
      email: "alex.johnson@pixelforge.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Creative Director",
      createdAt: "2022-08-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    client: {
      id: "client_pixelforge",
      name: "PixelForge Studios",
      logo: "/logos/pixelforge.svg",
      contact: {
        email: "contact@pixelforge.com",
        phone: "+1 (555) 987-6543",
      },
      createdAt: "2023-05-10T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    deliverables: projectDataEN.deliverables.map((deliverable) => ({
      ...deliverable,
      project: {
        id: "proj_pixelforge-studio_1",
        name: "PixelForge",
        slug: "pixelforge-studio",
      },
    })),
    contents: projectDataEN.contents.map((content) => ({
      ...content,
      project: {
        id: "proj_pixelforge-studio_1",
        name: "PixelForge",
        slug: "pixelforge-studio",
      },
    })),
  },
  {
    ...projectDataEN,
    id: "proj_codecrafters-dev_2",
    name: "CodeCrafters",
    slug: "codecrafters-dev",
    description:
      "Development of a high-performance frontend framework for enterprise-level web applications and UI components.",
    owner: {
      id: "user_emily",
      name: "Emily Carter",
      email: "emily.carter@codecrafters.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Lead Frontend Engineer",
      createdAt: "2021-07-12T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    client: {
      id: "client_codecrafters",
      name: "CodeCrafters Solutions",
      logo: "/logos/codecrafters.svg",
      contact: {
        email: "support@codecrafters.com",
        phone: "+1 (555) 765-4321",
      },
      createdAt: "2023-09-20T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    deliverables: projectDataEN.deliverables.map((deliverable) => ({
      ...deliverable,
      project: {
        id: "proj_codecrafters-dev_2",
        name: "CodeCrafters",
        slug: "codecrafters-dev",
      },
    })),
    contents: projectDataEN.contents.map((content) => ({
      ...content,
      project: {
        id: "proj_codecrafters-dev_2",
        name: "CodeCrafters",
        slug: "codecrafters-dev",
      },
    })),
  },
  {
    ...projectDataEN,
    id: "proj_visionaryux-design_3",
    name: "VisionaryUX",
    slug: "visionaryux-design",
    description:
      "Creation of a cutting-edge design system with user-centered principles for SaaS platforms and mobile applications.",
    owner: {
      id: "user_michael",
      name: "Michael Reynolds",
      email: "michael.reynolds@visionaryux.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "UX Lead",
      createdAt: "2020-04-05T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    client: {
      id: "client_visionaryux",
      name: "VisionaryUX Agency",
      logo: "/logos/visionaryux.svg",
      contact: {
        email: "hello@visionaryux.com",
        phone: "+1 (555) 234-5678",
      },
      createdAt: "2023-03-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    deliverables: projectDataEN.deliverables.map((deliverable) => ({
      ...deliverable,
      project: {
        id: "proj_visionaryux-design_3",
        name: "VisionaryUX",
        slug: "visionaryux-design",
      },
    })),
    contents: projectDataEN.contents.map((content) => ({
      ...content,
      project: {
        id: "proj_visionaryux-design_3",
        name: "VisionaryUX",
        slug: "visionaryux-design",
      },
    })),
  },
  {
    ...projectDataEN,
    id: "proj_devsphere-agency_4",
    name: "DevSphere",
    slug: "devsphere-agency",
    description:
      "Development of a scalable full-stack solution integrating cloud services, API management, and security features.",
    owner: {
      id: "user_david",
      name: "David Wilson",
      email: "david.wilson@devsphere.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "CTO",
      createdAt: "2019-11-30T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    client: {
      id: "client_devsphere",
      name: "DevSphere Technologies",
      logo: "/logos/devsphere.svg",
      contact: {
        email: "info@devsphere.com",
        phone: "+1 (555) 876-5432",
      },
      createdAt: "2022-06-25T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    deliverables: projectDataEN.deliverables.map((deliverable) => ({
      ...deliverable,
      project: {
        id: "proj_devsphere-agency_4",
        name: "DevSphere",
        slug: "devsphere-agency",
      },
    })),
    contents: projectDataEN.contents.map((content) => ({
      ...content,
      project: {
        id: "proj_devsphere-agency_4",
        name: "DevSphere",
        slug: "devsphere-agency",
      },
    })),
  },
];

export const projectListES = [
  projectDataES,
  {
    ...projectDataES,
    id: "proj_pixelforge-studio_1",
    name: "PixelForge",
    slug: "pixelforge-studio",
    description:
      "Diseño y desarrollo de una plataforma moderna para estudios web con gestión de portafolios y herramientas de colaboración con clientes.",
    owner: {
      id: "user_alex",
      name: "Alex Johnson",
      email: "alex.johnson@pixelforge.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Director Creativo",
      createdAt: "2022-08-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    client: {
      id: "client_pixelforge",
      name: "PixelForge Studios",
      logo: "/logos/pixelforge.svg",
      contact: {
        email: "contact@pixelforge.com",
        phone: "+1 (555) 987-6543",
      },
      createdAt: "2023-05-10T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    deliverables: projectDataES.deliverables.map((deliverable) => ({
      ...deliverable,
      project: {
        id: "proj_pixelforge-studio_1",
        name: "PixelForge",
        slug: "pixelforge-studio",
      },
    })),
    contents: projectDataES.contents.map((content) => ({
      ...content,
      project: {
        id: "proj_pixelforge-studio_1",
        name: "PixelForge",
        slug: "pixelforge-studio",
      },
    })),
  },
  {
    ...projectDataES,
    id: "proj_codecrafters-dev_2",
    slug: "codecrafters-dev",
    name: "CodeCrafters",
    description:
      "Desarrollo de un framework frontend de alto rendimiento para aplicaciones web empresariales y componentes UI.",
    owner: {
      id: "user_emily",
      name: "Emily Carter",
      email: "emily.carter@codecrafters.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Ingeniera Frontend Líder",
      createdAt: "2021-07-12T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    client: {
      id: "client_codecrafters",
      name: "CodeCrafters Solutions",
      logo: "/logos/codecrafters.svg",
      contact: {
        email: "support@codecrafters.com",
        phone: "+1 (555) 765-4321",
      },
      createdAt: "2023-09-20T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    deliverables: projectDataES.deliverables.map((deliverable) => ({
      ...deliverable,
      project: {
        id: "proj_codecrafters-dev_2",
        name: "CodeCrafters",
        slug: "codecrafters-dev",
      },
    })),
    contents: projectDataES.contents.map((content) => ({
      ...content,
      project: {
        id: "proj_codecrafters-dev_2",
        name: "CodeCrafters",
        slug: "codecrafters-dev",
      },
    })),
  },
  {
    ...projectDataES,
    id: "proj_visionaryux-design_3",
    name: "VisionaryUX",
    slug: "visionaryux-design",
    description:
      "Creación de un sistema de diseño innovador con principios centrados en el usuario para plataformas SaaS y aplicaciones móviles.",
    owner: {
      id: "user_michael",
      name: "Michael Reynolds",
      email: "michael.reynolds@visionaryux.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "Líder UX",
      createdAt: "2020-04-05T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    client: {
      id: "client_visionaryux",
      name: "VisionaryUX Agency",
      logo: "/logos/visionaryux.svg",
      contact: {
        email: "hello@visionaryux.com",
        phone: "+1 (555) 234-5678",
      },
      createdAt: "2023-03-15T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    deliverables: projectDataES.deliverables.map((deliverable) => ({
      ...deliverable,
      project: {
        id: "proj_visionaryux-design_3",
        name: "VisionaryUX",
        slug: "visionaryux-design",
      },
    })),
    contents: projectDataES.contents.map((content) => ({
      ...content,
      project: {
        id: "proj_visionaryux-design_3",
        name: "VisionaryUX",
        slug: "visionaryux-design",
      },
    })),
  },
  {
    ...projectDataES,
    id: "proj_devsphere-agency_4",
    name: "DevSphere",
    slug: "devsphere-agency",
    description:
      "Desarrollo de una solución full-stack escalable integrando servicios en la nube, gestión de API y funciones de seguridad.",
    owner: {
      id: "user_david",
      name: "David Wilson",
      email: "david.wilson@devsphere.com",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      role: "CTO",
      createdAt: "2019-11-30T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    client: {
      id: "client_devsphere",
      name: "DevSphere Technologies",
      logo: "/logos/devsphere.svg",
      contact: {
        email: "info@devsphere.com",
        phone: "+1 (555) 876-5432",
      },
      createdAt: "2022-06-25T00:00:00Z",
      updatedAt: "2025-01-29T00:00:00Z",
    },
    deliverables: projectDataES.deliverables.map((deliverable) => ({
      ...deliverable,
      project: {
        id: "proj_devsphere-agency_4",
        name: "DevSphere",
        slug: "devsphere-agency",
      },
    })),
    contents: projectDataES.contents.map((content) => ({
      ...content,
      project: {
        id: "proj_devsphere-agency_4",
        name: "DevSphere",
        slug: "devsphere-agency",
      },
    })),
  },
];
