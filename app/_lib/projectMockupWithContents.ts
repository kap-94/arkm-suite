// import { Project } from "@/types/models";
// import {
//   Priority,
//   ProjectStatus,
//   ProjectType,
//   TaskStatus,
//   Visibility,
// } from "@/types/models/Common";

// export const projectData: Project = {
//   id: "proj_naturaldog2025",
//   name: "NaturalDog Food e-commerce platform",
//   description:
//     "Development of an e-commerce platform for NaturalDog Foods with personalized feeding plans, subscriptions, and content on natural dog nutrition.",
//   type: {
//     label: "Web Design and Development",
//     value: ProjectType.WEB_DESIGN_AND_DEVELOPMENT,
//   },
//   status: { label: "In progress", value: ProjectStatus.IN_PROGRESS },
//   priority: { label: "High", value: Priority.HIGH },
//   progress: 45,
//   startDate: "2025-01-01T00:00:00Z",
//   endDate: "2025-06-30T00:00:00Z",
//   createdAt: "2024-12-15T00:00:00Z",
//   updatedAt: "2025-01-29T10:30:00Z",
//   owner: {
//     id: "user_sarah",
//     name: "Sarah Parker",
//     email: "sarah.parker@agency.com",
//     avatar:
//       "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     role: "Project Manager",
//     createdAt: "2023-01-01T00:00:00Z",
//     updatedAt: "2025-01-29T00:00:00Z",
//   },
//   client: {
//     id: "client_naturaldog",
//     name: "NaturalDog Foods Inc.",
//     logo: "/logos/naturaldog.svg",
//     contact: {
//       email: "jessica.brown@naturaldogfoods.com",
//       phone: "+1 (555) 123-4567",
//     },
//     createdAt: "2024-12-01T00:00:00Z",
//     updatedAt: "2025-01-29T00:00:00Z",
//   },
//   teamMembers: [
//     {
//       id: "user_sarah",
//       name: "Sarah Parker",
//       email: "sarah.parker@agency.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "Project Manager",
//       createdAt: "2023-01-01T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "user_michael",
//       name: "Michael Chen",
//       email: "michael.chen@agency.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "UI/UX Lead Designer",
//       createdAt: "2023-03-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "user_emily",
//       name: "Emily Rodriguez",
//       email: "emily.rodriguez@agency.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "Frontend Developer Lead",
//       createdAt: "2023-02-01T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "user_david",
//       name: "David Kim",
//       email: "david.kim@agency.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "Backend Developer Lead",
//       createdAt: "2023-04-01T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "user_ana",
//       name: "Ana Silva",
//       email: "ana.silva@agency.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "Content Strategist",
//       createdAt: "2023-06-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "user_james",
//       name: "James Wilson",
//       email: "james.wilson@agency.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "QA Engineer",
//       createdAt: "2023-07-01T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "user_sophia",
//       name: "Sophia Lee",
//       email: "sophia.lee@agency.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "UI Designer",
//       createdAt: "2023-05-01T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//   ],
//   budget: {
//     id: "budget_naturaldog",
//     allocated: 120000,
//     spent: 45000,
//     remaining: 75000,
//     currency: "USD",
//     createdAt: "2024-12-15T00:00:00Z",
//     updatedAt: "2025-01-29T10:30:00Z",
//     breakdownByStage: {
//       stage_discovery: {
//         stage: {
//           id: "stage_discovery",
//           name: "Discovery & Strategy",
//         },
//         allocated: 15000,
//         spent: 12000,
//       },
//       stage_design: {
//         stage: {
//           id: "stage_design",
//           name: "UX/UI Design",
//         },
//         allocated: 35000,
//         spent: 20000,
//       },
//       stage_development: {
//         stage: {
//           id: "stage_development",
//           name: "Development & Integration",
//         },
//         allocated: 45000,
//         spent: 13000,
//       },
//       stage_testing: {
//         stage: {
//           id: "stage_testing",
//           name: "Testing & Quality Assurance",
//         },
//         allocated: 15000,
//         spent: 0,
//       },
//       stage_launch: {
//         stage: {
//           id: "stage_launch",
//           name: "Launch & Deployment",
//         },
//         allocated: 10000,
//         spent: 0,
//       },
//     },
//   },
//   metrics: {
//     tasks: {
//       total: 87,
//       completed: 32,
//       inProgress: 45,
//       blocked: 2,
//       overdue: 2,
//     },
//     timeTracking: {
//       estimated: 1840,
//       spent: 690,
//       remaining: 1150,
//     },
//     milestones: {
//       total: 8,
//       completed: 2,
//       upcoming: 4,
//       overdue: 0,
//     },
//   },
//   deliverables: [
//     {
//       id: "del_research_report",
//       title: "Market Research & Analysis Report",
//       description:
//         "Comprehensive market analysis including competitor research, target audience insights, and market opportunities",
//       status: {
//         label: "Completed",
//         value: TaskStatus.COMPLETED,
//       },
//       priority: { label: "High", value: Priority.HIGH },
//       stage: {
//         id: "stage_discovery",
//         name: "Discovery & Strategy",
//       },
//       assignee: {
//         id: "user_ana",
//         name: "Ana Silva",
//         email: "ana.silva@agency.com",
//         avatar:
//           "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         role: "Content Strategist",
//         createdAt: "2023-06-15T00:00:00Z",
//         updatedAt: "2025-01-29T00:00:00Z",
//       },
//       teamMembers: [
//         {
//           id: "user_ana",
//           name: "Ana Silva",
//           email: "ana.silva@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Content Strategist",
//           createdAt: "2023-06-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_sarah",
//           name: "Sarah Parker",
//           email: "sarah.parker@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Project Manager",
//           createdAt: "2023-01-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       startDate: "2025-01-01T00:00:00Z",
//       dueDate: "2025-01-15T00:00:00Z",
//       progress: 100,
//       metrics: {
//         estimatedHours: 80,
//         spentHours: 85,
//         remainingHours: 0,
//         taskTotal: 6,
//         taskCompleted: 6,
//         taskCompletedThisWeek: 2,
//       },
//       dependencies: [],
//       contents: [
//         {
//           id: "file_market_report",
//           type: "file",
//           title: "Market Analysis Report",
//           description:
//             "Complete market analysis document including competitor research",
//           size: 4500000,
//           url: "https://storage.example.com/files/market-analysis.pdf",
//           fileType: "document",
//           createdBy: {
//             id: "user_ana",
//             name: "Ana Silva",
//             email: "ana.silva@agency.com",
//             role: "Content Strategist",
//           },
//           metadata: {
//             version: "2.0",
//             tags: ["research", "final", "approved"],
//           },
//           createdAt: "2025-01-10T00:00:00Z",
//           updatedAt: "2025-01-15T00:00:00Z",
//         },
//         {
//           id: "file_market_data",
//           type: "file",
//           title: "Market Research Data",
//           description:
//             "Raw data compilation from market research including surveys",
//           size: 2800000,
//           url: "https://storage.example.com/files/market-data.xlsx",
//           fileType: "spreadsheet",
//           createdBy: {
//             id: "user_ana",
//             name: "Ana Silva",
//             email: "ana.silva@agency.com",
//             role: "Content Strategist",
//           },
//           createdAt: "2025-01-05T00:00:00Z",
//           updatedAt: "2025-01-14T00:00:00Z",
//         },
//         {
//           id: "market_research_data",
//           type: "component",
//           componentType: "market-research",
//           title: "Market Research Analysis",
//           description: "Structured market research findings and analysis",
//           createdBy: {
//             id: "user_ana",
//             name: "Ana Silva",
//             email: "ana.silva@agency.com",
//             role: "Content Strategist",
//           },
//           createdAt: "2025-01-05T00:00:00Z",
//           updatedAt: "2025-01-14T00:00:00Z",
//           data: {
//             sections: [
//               {
//                 id: "market_overview",
//                 title: "Market Overview",
//                 content: {
//                   summary:
//                     "The target market shows strong growth potential with...",
//                   keyFindings: [
//                     "85% of surveyed users expressed interest in the product",
//                     "Market size expected to grow 25% annually",
//                     "Three main competitors control 60% of market share",
//                   ],
//                   charts: [
//                     {
//                       type: "pie",
//                       data: {
//                         labels: [
//                           "Competitor A",
//                           "Competitor B",
//                           "Competitor C",
//                           "Others",
//                         ],
//                         values: [30, 20, 10, 40],
//                       },
//                       config: {
//                         title: "Market Share Distribution",
//                       },
//                     },
//                   ],
//                 },
//               },
//               {
//                 id: "competitive_analysis",
//                 title: "Competitive Analysis",
//                 content: {
//                   summary: "Current market leaders focus primarily on...",
//                   tables: [
//                     {
//                       headers: [
//                         "Competitor",
//                         "Strengths",
//                         "Weaknesses",
//                         "Market Share",
//                       ],
//                       rows: [
//                         [
//                           "Competitor A",
//                           "Brand recognition",
//                           "Limited features",
//                           "30%",
//                         ],
//                         [
//                           "Competitor B",
//                           "Technical capability",
//                           "Poor UX",
//                           "20%",
//                         ],
//                         [
//                           "Competitor C",
//                           "Customer service",
//                           "High prices",
//                           "10%",
//                         ],
//                       ],
//                       caption: "Competitor Analysis Summary",
//                     },
//                   ],
//                 },
//               },
//             ],
//             metrics: {
//               marketSize: 5000000000,
//               targetAudience: ["Small businesses", "Freelancers", "Startups"],
//               competitors: [
//                 {
//                   name: "Competitor A",
//                   strengths: ["Brand recognition", "Market presence"],
//                   weaknesses: ["Limited features", "High prices"],
//                 },
//               ],
//             },
//           },
//         },
//         {
//           id: "file_market_presentation",
//           title: "Market Analysis Presentation.pptx",
//           description: "Executive presentation of key market research findings",
//           size: 3500000,
//           url: "https://storage.example.com/files/market-presentation.pptx",
//           type: "file",
//           fileType: "document",
//           createdBy: {
//             id: "user_ana",
//             name: "Ana Silva",
//             email: "ana.silva@agency.com",
//             role: "Content Strategist",
//           },
//           metadata: {
//             version: "1.1",
//             tags: ["presentation", "executive", "final"],
//           },
//           createdAt: "2025-01-12T00:00:00Z",
//           updatedAt: "2025-01-15T00:00:00Z",
//         },
//       ],
//       tags: ["research", "analysis", "market"],
//       customFields: {
//         reviewStatus: "approved",
//         clientFeedback: "excellent",
//         presentationDate: "2025-01-16T00:00:00Z",
//       },
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-15T00:00:00Z",
//     },
//     {
//       id: "del_user_personas",
//       title: "User Personas & Journey Maps",
//       description:
//         "Detailed user personas and customer journey maps for key user segments",
//       status: {
//         label: "Completed",
//         value: TaskStatus.COMPLETED,
//       },
//       priority: { label: "High", value: Priority.HIGH },
//       stage: {
//         id: "stage_discovery",
//         name: "Discovery & Strategy",
//       },
//       assignee: {
//         id: "user_michael",
//         name: "Michael Chen",
//         email: "michael.chen@agency.com",
//         avatar:
//           "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         role: "UI/UX Lead Designer",
//         createdAt: "2023-03-15T00:00:00Z",
//         updatedAt: "2025-01-29T00:00:00Z",
//       },
//       teamMembers: [
//         {
//           id: "user_michael",
//           name: "Michael Chen",
//           email: "michael.chen@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "UI/UX Lead Designer",
//           createdAt: "2023-03-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_ana",
//           name: "Ana Silva",
//           email: "ana.silva@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Content Strategist",
//           createdAt: "2023-06-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       startDate: "2025-01-15T00:00:00Z",
//       dueDate: "2025-01-31T00:00:00Z",
//       progress: 100,
//       metrics: {
//         estimatedHours: 60,
//         spentHours: 55,
//         remainingHours: 0,
//         taskTotal: 4,
//         taskCompleted: 4,
//         taskCompletedThisWeek: 1,
//       },
//       contents: [
//         {
//           id: "file_personas",
//           type: "file",
//           title: "User Personas Document",
//           description: "Detailed user personas including demographics",
//           size: 5200000,
//           url: "https://storage.example.com/files/user-personas.pdf",
//           fileType: "document",
//           createdBy: {
//             id: "user_michael",
//             name: "Michael Chen",
//             email: "michael.chen@agency.com",
//             role: "UI/UX Lead Designer",
//           },
//           createdAt: "2025-01-25T00:00:00Z",
//           updatedAt: "2025-01-31T00:00:00Z",
//         },
//         {
//           id: "user_personas_data",
//           type: "component",
//           componentType: "user-personas",
//           title: "User Personas Data",
//           description: "Interactive user personas and journey maps",
//           createdBy: {
//             id: "user_michael",
//             name: "Michael Chen",
//             email: "michael.chen@agency.com",
//             role: "UI/UX Lead Designer",
//           },
//           data: {
//             personas: [
//               {
//                 id: "persona_1",
//                 name: "Sarah Thompson",
//                 role: "Freelance Designer",
//                 age: 28,
//                 location: "Urban",
//                 bio: "Tech-savvy creative professional...",
//                 goals: [
//                   "Streamline workflow",
//                   "Collaborate with clients efficiently",
//                   "Track project progress",
//                 ],
//                 painPoints: [
//                   "Complex project management tools",
//                   "Difficulty tracking multiple projects",
//                   "Limited budget for software",
//                 ],
//                 behaviors: {
//                   techComfort: "High",
//                   pricePreference: "Value-oriented",
//                   decisionMaking: "Research-based",
//                 },
//                 quote:
//                   "I need a tool that lets me focus on design, not management.",
//               },
//             ],
//             journeyMaps: [
//               {
//                 personaId: "persona_1",
//                 stages: [
//                   {
//                     name: "Awareness",
//                     channels: ["Social media", "Professional networks"],
//                     actions: ["Research solutions", "Read reviews"],
//                     emotions: "Frustrated with current tools",
//                     opportunities: "Target professional networks",
//                   },
//                 ],
//               },
//             ],
//           },
//           createdAt: "2025-01-25T00:00:00Z",
//           updatedAt: "2025-01-31T00:00:00Z",
//         },
//         {
//           id: "file_journey_maps",
//           title: "Customer Journey Maps.fig",
//           description: "Visual customer journey maps for each user persona",
//           size: 8500000,
//           url: "https://storage.example.com/files/journey-maps.fig",
//           type: "file",
//           fileType: "document",
//           createdBy: {
//             id: "user_michael",
//             name: "Michael Chen",
//             email: "michael.chen@agency.com",
//             role: "UI/UX Lead Designer",
//           },
//           metadata: {
//             version: "2.1",
//             tags: ["journey-maps", "figma", "final"],
//           },
//           createdAt: "2025-01-20T00:00:00Z",
//           updatedAt: "2025-01-31T00:00:00Z",
//         },
//         {
//           id: "file_research_data",
//           title: "User Research Data.xlsx",
//           description: "Compiled user research data and interview transcripts",
//           size: 3100000,
//           url: "https://storage.example.com/files/user-research-data.xlsx",
//           type: "file",
//           fileType: "document",
//           createdBy: {
//             id: "user_ana",
//             name: "Ana Silva",
//             email: "ana.silva@agency.com",
//             role: "Content Strategist",
//           },
//           metadata: {
//             version: "1.0",
//             tags: ["research", "data", "interviews"],
//           },
//           createdAt: "2025-01-18T00:00:00Z",
//           updatedAt: "2025-01-28T00:00:00Z",
//         },
//       ],
//       dependencies: [
//         {
//           id: "dep_001",
//           type: "blocked_by",
//           deliverable: {
//             id: "del_research_report",
//             name: "Market Research & Analysis Report",
//           },
//         },
//       ],
//       tags: ["user-research", "personas", "journey-maps"],
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-31T00:00:00Z",
//     },
//     {
//       id: "del_wireframes",
//       title: "Wireframes & User Flow Diagrams",
//       description:
//         "Low-fidelity wireframes and user flow diagrams for all key pages and features",
//       status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//       priority: { label: "High", value: Priority.HIGH },
//       stage: {
//         id: "stage_design",
//         name: "UX/UI Design",
//       },
//       assignee: {
//         id: "user_michael",
//         name: "Michael Chen",
//         email: "michael.chen@agency.com",
//         avatar:
//           "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         role: "UI/UX Lead Designer",
//         createdAt: "2023-03-15T00:00:00Z",
//         updatedAt: "2025-01-29T00:00:00Z",
//       },
//       teamMembers: [
//         {
//           id: "user_michael",
//           name: "Michael Chen",
//           email: "michael.chen@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "UI/UX Lead Designer",
//           createdAt: "2023-03-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_sophia",
//           name: "Sophia Lee",
//           email: "sophia.lee@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "UI Designer",
//           createdAt: "2023-05-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       startDate: "2025-02-01T00:00:00Z",
//       dueDate: "2025-02-15T00:00:00Z",
//       progress: 85,
//       metrics: {
//         estimatedHours: 100,
//         spentHours: 85,
//         remainingHours: 15,
//         taskTotal: 8,
//         taskCompleted: 7,
//         taskCompletedThisWeek: 3,
//       },
//       contents: [
//         {
//           id: "file_design_system",
//           type: "file",
//           title: "Design System",
//           description: "Master design system file including all components",
//           size: 25800000,
//           url: "https://storage.example.com/files/design-system.fig",
//           fileType: "design",
//           createdBy: {
//             id: "user_sophia",
//             name: "Sophia Lee",
//             email: "sophia.lee@agency.com",
//             role: "UI Designer",
//           },
//           createdAt: "2025-02-01T00:00:00Z",
//           updatedAt: "2025-02-12T00:00:00Z",
//         },
//         {
//           id: "design_system_config",
//           type: "component",
//           componentType: "design-system",
//           title: "Design System Configuration",
//           description: "Core design system configuration and tokens",
//           createdBy: {
//             id: "user_sophia",
//             name: "Sophia Lee",
//             email: "sophia.lee@agency.com",
//             role: "UI Designer",
//           },
//           data: {
//             theme: {
//               type: "light",
//               colors: {
//                 background: "#FFFFFF",
//                 text: "#1A1A1A",
//                 textSecondary: "#666666",
//                 border: "#E5E5E5",
//                 cardBackground: "#F5F5F5",
//                 hoverBackground: "#EAEAEA",
//               },
//             },
//             colorPalette: {
//               primary: {
//                 100: "#E6F7FF",
//                 200: "#BAE7FF",
//                 300: "#91D5FF",
//                 400: "#69C0FF",
//                 500: "#40A9FF",
//                 600: "#1890FF",
//                 700: "#096DD9",
//                 800: "#0050B3",
//                 900: "#003A8C",
//               },
//               neutral: {
//                 100: "#FFFFFF",
//                 200: "#FAFAFA",
//                 300: "#F5F5F5",
//                 400: "#E8E8E8",
//                 500: "#D9D9D9",
//                 600: "#BFBFBF",
//                 700: "#8C8C8C",
//                 800: "#595959",
//                 900: "#262626",
//               },
//             },
//             typographyStyles: [
//               {
//                 name: "heading-1",
//                 size: "2.5rem",
//                 lineHeight: "1.2",
//                 weight: 700,
//                 specs: "32px/38px",
//               },
//               {
//                 name: "heading-2",
//                 size: "2rem",
//                 lineHeight: "1.3",
//                 weight: 700,
//                 specs: "24px/31px",
//               },
//               {
//                 name: "body",
//                 size: "1rem",
//                 lineHeight: "1.5",
//                 weight: 400,
//                 specs: "16px/24px",
//               },
//             ],
//             spacingScale: [
//               {
//                 name: "xs",
//                 value: 4,
//                 description: "Extra small spacing for tight layouts",
//               },
//               {
//                 name: "sm",
//                 value: 8,
//                 description: "Small spacing for related elements",
//               },
//               {
//                 name: "md",
//                 value: 16,
//                 description: "Medium spacing for separation",
//               },
//               {
//                 name: "lg",
//                 value: 24,
//                 description: "Large spacing for distinct sections",
//               },
//               {
//                 name: "xl",
//                 value: 32,
//                 description: "Extra large spacing for major sections",
//               },
//             ],
//           },
//           createdAt: "2025-02-05T00:00:00Z",
//           updatedAt: "2025-02-10T00:00:00Z",
//         },
//       ],
//       dependencies: [
//         {
//           id: "dep_002",
//           type: "blocked_by",
//           deliverable: {
//             id: "del_user_personas",
//             name: "User Personas & Journey Maps",
//           },
//         },
//       ],
//       tags: ["wireframes", "UX", "planning"],
//       customFields: {
//         reviewStatus: "in_review",
//         stakeholderFeedback: "pending",
//         nextReviewDate: "2025-02-20T00:00:00Z",
//       },
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "del_design_system",
//       title: "Design System & Component Library",
//       description:
//         "Complete design system including components, patterns, and usage guidelines",
//       status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//       priority: { label: "High", value: Priority.HIGH },
//       stage: {
//         id: "stage_design",
//         name: "UX/UI Design",
//       },
//       assignee: {
//         id: "user_sophia",
//         name: "Sophia Lee",
//         email: "sophia.lee@agency.com",
//         avatar:
//           "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         role: "UI Designer",
//         createdAt: "2023-05-01T00:00:00Z",
//         updatedAt: "2025-01-29T00:00:00Z",
//       },
//       teamMembers: [
//         {
//           id: "user_sophia",
//           name: "Sophia Lee",
//           email: "sophia.lee@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "UI Designer",
//           createdAt: "2023-05-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_michael",
//           name: "Michael Chen",
//           email: "michael.chen@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "UI/UX Lead Designer",
//           createdAt: "2023-03-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       startDate: "2025-02-15T00:00:00Z",
//       dueDate: "2025-02-28T00:00:00Z",
//       progress: 75,
//       metrics: {
//         estimatedHours: 120,
//         spentHours: 90,
//         remainingHours: 30,
//         taskTotal: 10,
//         taskCompleted: 7,
//         taskCompletedThisWeek: 2,
//       },
//       contents: [
//         {
//           id: "file_design_system",
//           type: "file",
//           title: "Design System",
//           description: "Master design system file including all components",
//           size: 25800000,
//           url: "https://storage.example.com/files/design-system.fig",
//           fileType: "design",
//           createdBy: {
//             id: "user_sophia",
//             name: "Sophia Lee",
//             email: "sophia.lee@agency.com",
//             role: "UI Designer",
//           },
//           createdAt: "2025-02-15T00:00:00Z",
//           updatedAt: "2025-02-25T00:00:00Z",
//         },
//         {
//           id: "design_system_config",
//           type: "component",
//           componentType: "design-system",
//           title: "Design System Configuration",
//           description: "Core design system configuration and tokens",
//           createdBy: {
//             id: "user_sophia",
//             name: "Sophia Lee",
//             email: "sophia.lee@agency.com",
//             role: "UI Designer",
//           },
//           data: {
//             theme: {
//               type: "light",
//               colors: {
//                 background: "#FFFFFF",
//                 text: "#1A1A1A",
//                 textSecondary: "#666666",
//                 border: "#E5E5E5",
//                 cardBackground: "#F5F5F5",
//                 hoverBackground: "#EAEAEA",
//               },
//             },
//             colorPalette: {
//               primary: {
//                 100: "#E6F7FF",
//                 200: "#BAE7FF",
//                 300: "#91D5FF",
//                 400: "#69C0FF",
//                 500: "#40A9FF",
//                 600: "#1890FF",
//                 700: "#096DD9",
//                 800: "#0050B3",
//                 900: "#003A8C",
//               },
//               neutral: {
//                 100: "#FFFFFF",
//                 200: "#FAFAFA",
//                 300: "#F5F5F5",
//                 400: "#E8E8E8",
//                 500: "#D9D9D9",
//                 600: "#BFBFBF",
//                 700: "#8C8C8C",
//                 800: "#595959",
//                 900: "#262626",
//               },
//             },
//             typographyStyles: [
//               {
//                 name: "heading-1",
//                 size: "2.5rem",
//                 lineHeight: "1.2",
//                 weight: 700,
//                 specs: "32px/38px",
//               },
//               {
//                 name: "heading-2",
//                 size: "2rem",
//                 lineHeight: "1.3",
//                 weight: 700,
//                 specs: "24px/31px",
//               },
//               {
//                 name: "body",
//                 size: "1rem",
//                 lineHeight: "1.5",
//                 weight: 400,
//                 specs: "16px/24px",
//               },
//             ],
//             spacingScale: [
//               {
//                 name: "xs",
//                 value: 4,
//                 description: "Extra small spacing for tight layouts",
//               },
//               {
//                 name: "sm",
//                 value: 8,
//                 description: "Small spacing for related elements",
//               },
//               {
//                 name: "md",
//                 value: 16,
//                 description: "Medium spacing for separation",
//               },
//               {
//                 name: "lg",
//                 value: 24,
//                 description: "Large spacing for distinct sections",
//               },
//               {
//                 name: "xl",
//                 value: 32,
//                 description: "Extra large spacing for major sections",
//               },
//             ],
//           },
//           createdAt: "2025-02-15T00:00:00Z",
//           updatedAt: "2025-02-25T00:00:00Z",
//         },
//       ],
//       dependencies: [
//         {
//           id: "dep_003",
//           type: "relates_to",
//           deliverable: {
//             id: "del_wireframes",
//             name: "Wireframes & User Flow Diagrams",
//           },
//         },
//       ],
//       tags: ["design-system", "UI", "components"],
//       customFields: {
//         figmaLink: "https://figma.com/file/design-system",
//         version: "1.0.0",
//         status: "beta",
//       },
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "del_frontend",
//       title: "Frontend Implementation",
//       description:
//         "Complete frontend implementation including all pages and features",
//       status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//       priority: { label: "High", value: Priority.HIGH },
//       stage: {
//         id: "stage_development",
//         name: "Development & Integration",
//       },
//       assignee: {
//         id: "user_emily",
//         name: "Emily Rodriguez",
//         email: "emily.rodriguez@agency.com",
//         avatar:
//           "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         role: "Frontend Developer Lead",
//         createdAt: "2023-02-01T00:00:00Z",
//         updatedAt: "2025-01-29T00:00:00Z",
//       },
//       teamMembers: [
//         {
//           id: "user_emily",
//           name: "Emily Rodriguez",
//           email: "emily.rodriguez@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Frontend Developer Lead",
//           createdAt: "2023-02-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       startDate: "2025-03-01T00:00:00Z",
//       dueDate: "2025-05-15T00:00:00Z",
//       progress: 30,
//       metrics: {
//         estimatedHours: 400,
//         spentHours: 120,
//         remainingHours: 280,
//         taskTotal: 25,
//         taskCompleted: 8,
//         taskCompletedThisWeek: 3,
//       },
//       contents: [
//         {
//           id: "file_frontend_docs",
//           type: "file",
//           title: "Frontend Documentation",
//           description: "Technical documentation for frontend implementation",
//           size: 1200000,
//           url: "https://storage.example.com/files/frontend-docs.md",
//           fileType: "document",
//           createdBy: {
//             id: "user_emily",
//             name: "Emily Rodriguez",
//             email: "emily.rodriguez@agency.com",
//             role: "Frontend Developer Lead",
//           },
//           createdAt: "2025-03-01T00:00:00Z",
//           updatedAt: "2025-03-10T00:00:00Z",
//         },
//         {
//           id: "frontend_components_status",
//           type: "component",
//           componentType: "component-status",
//           title: "Frontend Components Status",
//           description: "Implementation status of frontend components",
//           createdBy: {
//             id: "user_emily",
//             name: "Emily Rodriguez",
//             email: "emily.rodriguez@agency.com",
//             role: "Frontend Developer Lead",
//           },
//           data: {
//             components: [
//               {
//                 name: "Button",
//                 status: "completed",
//                 coverage: 98,
//                 variants: ["primary", "secondary", "text"],
//                 documentation: true,
//                 tests: true,
//               },
//               {
//                 name: "Input",
//                 status: "in-progress",
//                 coverage: 75,
//                 variants: ["text", "number"],
//                 documentation: false,
//                 tests: true,
//               },
//             ],
//             metrics: {
//               totalComponents: 25,
//               completedComponents: 15,
//               averageCoverage: 85,
//               documentsCompleted: "60%",
//             },
//           },
//           createdAt: "2025-03-05T00:00:00Z",
//           updatedAt: "2025-03-10T00:00:00Z",
//         },
//       ],
//       dependencies: [
//         {
//           id: "dep_004",
//           type: "blocked_by",
//           deliverable: {
//             id: "del_design_system",
//             name: "Design System & Component Library",
//           },
//         },
//       ],
//       tags: ["frontend", "development"],
//       customFields: {
//         repository: "github.com/naturaldog/frontend",
//         techs: ["React", "TypeScript", "Tailwind"],
//       },
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-03-10T00:00:00Z",
//     },
//     {
//       id: "del_backend",
//       title: "Backend Implementation",
//       description:
//         "Complete backend implementation including all APIs and services",
//       status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//       priority: { label: "High", value: Priority.HIGH },
//       stage: {
//         id: "stage_development",
//         name: "Development & Integration",
//       },
//       assignee: {
//         id: "user_david",
//         name: "David Kim",
//         email: "david.kim@agency.com",
//         avatar:
//           "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         role: "Backend Developer Lead",
//         createdAt: "2023-04-01T00:00:00Z",
//         updatedAt: "2025-01-29T00:00:00Z",
//       },
//       teamMembers: [
//         {
//           id: "user_david",
//           name: "David Kim",
//           email: "david.kim@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Backend Developer Lead",
//           createdAt: "2023-04-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       startDate: "2025-03-01T00:00:00Z",
//       dueDate: "2025-05-15T00:00:00Z",
//       progress: 25,
//       metrics: {
//         estimatedHours: 350,
//         spentHours: 88,
//         remainingHours: 262,
//         taskTotal: 20,
//         taskCompleted: 5,
//         taskCompletedThisWeek: 2,
//       },
//       contents: [
//         {
//           id: "file_api_docs",
//           type: "file",
//           title: "API Documentation",
//           description: "Complete API documentation including endpoints",
//           size: 1500000,
//           url: "https://storage.example.com/files/api-docs.md",
//           fileType: "document",
//           createdBy: {
//             id: "user_david",
//             name: "David Kim",
//             email: "david.kim@agency.com",
//             role: "Backend Developer Lead",
//           },
//           createdAt: "2025-03-01T00:00:00Z",
//           updatedAt: "2025-03-10T00:00:00Z",
//         },
//         {
//           id: "api_endpoints_status",
//           type: "component",
//           componentType: "api-status",
//           title: "API Endpoints Status",
//           description: "Implementation status of API endpoints",
//           createdBy: {
//             id: "user_david",
//             name: "David Kim",
//             email: "david.kim@agency.com",
//             role: "Backend Developer Lead",
//           },
//           data: {
//             endpoints: [
//               {
//                 path: "/api/users",
//                 method: "GET",
//                 status: "completed",
//                 security: "JWT",
//                 documentation: true,
//                 tests: true,
//                 coverage: 95,
//               },
//             ],
//             metrics: {
//               totalEndpoints: 45,
//               completedEndpoints: 30,
//               averageLatency: "120ms",
//               averageCoverage: 88,
//             },
//           },
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-03-10T00:00:00Z",
//         },
//       ],
//       dependencies: [],
//       tags: ["backend", "development", "api"],
//       customFields: {
//         repository: "github.com/naturaldog/backend",
//         techs: ["Node.js", "Express", "PostgreSQL"],
//       },
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-03-10T00:00:00Z",
//     },
//     {
//       id: "del_test_reports",
//       title: "Test Reports & Documentation",
//       description:
//         "Comprehensive test reports including unit, integration, and performance test results",
//       status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//       priority: { label: "High", value: Priority.HIGH },
//       stage: {
//         id: "stage_testing",
//         name: "Testing & Quality Assurance",
//       },
//       assignee: {
//         id: "user_james",
//         name: "James Wilson",
//         email: "james.wilson@agency.com",
//         avatar:
//           "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         role: "QA Engineer",
//         createdAt: "2023-07-01T00:00:00Z",
//         updatedAt: "2025-01-29T00:00:00Z",
//       },
//       teamMembers: [
//         {
//           id: "user_james",
//           name: "James Wilson",
//           email: "james.wilson@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "QA Engineer",
//           createdAt: "2023-07-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_emily",
//           name: "Emily Rodriguez",
//           email: "emily.rodriguez@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Frontend Developer Lead",
//           createdAt: "2023-02-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       startDate: "2025-05-01T00:00:00Z",
//       dueDate: "2025-06-15T00:00:00Z",
//       progress: 0,
//       metrics: {
//         estimatedHours: 160,
//         spentHours: 0,
//         remainingHours: 160,
//         taskTotal: 12,
//         taskCompleted: 0,
//         taskCompletedThisWeek: 0,
//       },
//       contents: [
//         {
//           id: "file_test_plan",
//           type: "file",
//           title: "Testing Strategy & Plan",
//           description: "Comprehensive testing strategy including test cases",
//           size: 3200000,
//           url: "https://storage.example.com/files/test-plan.pdf",
//           fileType: "document",
//           createdBy: {
//             id: "user_james",
//             name: "James Wilson",
//             email: "james.wilson@agency.com",
//             role: "QA Engineer",
//           },
//           createdAt: "2025-05-01T00:00:00Z",
//           updatedAt: "2025-05-01T00:00:00Z",
//         },
//         {
//           id: "test_coverage_data",
//           type: "component",
//           componentType: "test-coverage",
//           title: "Test Coverage Analysis",
//           description: "Detailed test coverage and results",
//           createdBy: {
//             id: "user_james",
//             name: "James Wilson",
//             email: "james.wilson@agency.com",
//             role: "QA Engineer",
//           },
//           data: {
//             coverage: {
//               overall: 85,
//               unit: 90,
//               integration: 82,
//               e2e: 78,
//             },
//             results: {
//               total: 520,
//               passed: 495,
//               failed: 15,
//               skipped: 10,
//             },
//             critical_paths: [
//               {
//                 name: "User Authentication",
//                 coverage: 98,
//                 status: "passed",
//               },
//             ],
//           },
//           createdAt: "2025-05-02T00:00:00Z",
//           updatedAt: "2025-05-02T00:00:00Z",
//         },
//       ],
//       dependencies: [
//         {
//           id: "dep_005",
//           type: "blocked_by",
//           deliverable: {
//             id: "del_frontend",
//             name: "Frontend Implementation",
//           },
//         },
//         {
//           id: "dep_006",
//           type: "blocked_by",
//           deliverable: {
//             id: "del_backend",
//             name: "Backend Implementation",
//           },
//         },
//       ],
//       tags: ["testing", "documentation", "qa"],
//       customFields: {
//         testCoverage: "0%",
//         totalTestCases: 0,
//         passedTestCases: 0,
//       },
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "del_deployment_docs",
//       title: "Deployment Documentation",
//       description: "Complete deployment documentation and procedures",
//       status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//       priority: { label: "High", value: Priority.HIGH },
//       stage: {
//         id: "stage_launch",
//         name: "Launch & Deployment",
//       },
//       assignee: {
//         id: "user_david",
//         name: "David Kim",
//         email: "david.kim@agency.com",
//         avatar:
//           "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         role: "Backend Developer Lead",
//         createdAt: "2023-04-01T00:00:00Z",
//         updatedAt: "2025-01-29T00:00:00Z",
//       },
//       teamMembers: [
//         {
//           id: "user_david",
//           name: "David Kim",
//           email: "david.kim@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Backend Developer Lead",
//           createdAt: "2023-04-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       startDate: "2025-06-15T00:00:00Z",
//       dueDate: "2025-06-30T00:00:00Z",
//       progress: 0,
//       metrics: {
//         estimatedHours: 40,
//         spentHours: 0,
//         remainingHours: 40,
//         taskTotal: 3,
//         taskCompleted: 0,
//         taskCompletedThisWeek: 0,
//       },
//       contents: [
//         {
//           id: "file_deployment_architecture",
//           type: "file",
//           title: "Deployment Architecture",
//           description:
//             "System architecture and deployment infrastructure documentation",
//           size: 6800000,
//           url: "https://storage.example.com/files/deployment-architecture.pdf",
//           fileType: "document",
//           createdBy: {
//             id: "user_david",
//             name: "David Kim",
//             email: "david.kim@agency.com",
//             role: "Backend Developer Lead",
//           },
//           createdAt: "2025-06-15T00:00:00Z",
//           updatedAt: "2025-06-15T00:00:00Z",
//         },
//         {
//           id: "deployment_status",
//           type: "component",
//           componentType: "deployment-status",
//           title: "Deployment Status Dashboard",
//           description: "Real-time deployment status and metrics",
//           createdBy: {
//             id: "user_david",
//             name: "David Kim",
//             email: "david.kim@agency.com",
//             role: "Backend Developer Lead",
//           },
//           data: {
//             environments: [
//               {
//                 name: "production",
//                 status: "healthy",
//                 uptime: "99.98%",
//                 lastDeployment: "2025-01-28T15:30:00Z",
//                 metrics: {
//                   responseTime: "120ms",
//                   errorRate: "0.01%",
//                   cpuUsage: "45%",
//                   memoryUsage: "60%",
//                 },
//               },
//               {
//                 name: "staging",
//                 status: "healthy",
//                 uptime: "99.95%",
//                 lastDeployment: "2025-01-29T10:15:00Z",
//                 metrics: {
//                   responseTime: "100ms",
//                   errorRate: "0.05%",
//                   cpuUsage: "30%",
//                   memoryUsage: "45%",
//                 },
//               },
//             ],
//             deploymentPipeline: {
//               stages: [
//                 {
//                   name: "Build",
//                   status: "success",
//                   duration: "3m 25s",
//                   lastRun: "2025-01-29T10:00:00Z",
//                 },
//                 {
//                   name: "Test",
//                   status: "success",
//                   duration: "8m 15s",
//                   lastRun: "2025-01-29T10:03:25Z",
//                 },
//                 {
//                   name: "Deploy",
//                   status: "success",
//                   duration: "4m 30s",
//                   lastRun: "2025-01-29T10:11:40Z",
//                 },
//               ],
//               metrics: {
//                 successRate: "98%",
//                 averageDuration: "15m 30s",
//                 deploymentsToday: 3,
//               },
//             },
//             monitoring: {
//               alerts: [
//                 {
//                   severity: "low",
//                   message: "Slight increase in response time",
//                   timestamp: "2025-01-29T09:45:00Z",
//                   status: "resolved",
//                 },
//               ],
//               slos: [
//                 {
//                   name: "Availability",
//                   target: "99.9%",
//                   current: "99.95%",
//                   status: "meeting",
//                 },
//                 {
//                   name: "Latency",
//                   target: "< 200ms",
//                   current: "120ms",
//                   status: "meeting",
//                 },
//               ],
//             },
//           },
//           createdAt: "2025-06-16T00:00:00Z",
//           updatedAt: "2025-06-16T00:00:00Z",
//         },
//       ],
//       dependencies: [],
//       tags: ["deployment", "documentation", "devops"],
//       customFields: {
//         repository: "github.com/naturaldog/deployment",
//         environment: "production",
//       },
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "del_launch_checklist",
//       title: "Launch Checklist & Documentation",
//       description:
//         "Comprehensive launch checklist and verification documentation",
//       status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//       priority: { label: "High", value: Priority.HIGH },
//       stage: {
//         id: "stage_launch",
//         name: "Launch & Deployment",
//       },
//       assignee: {
//         id: "user_sarah",
//         name: "Sarah Parker",
//         email: "sarah.parker@agency.com",
//         avatar:
//           "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         role: "Project Manager",
//         createdAt: "2023-01-01T00:00:00Z",
//         updatedAt: "2025-01-29T00:00:00Z",
//       },
//       teamMembers: [
//         {
//           id: "user_sarah",
//           name: "Sarah Parker",
//           email: "sarah.parker@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Project Manager",
//           createdAt: "2023-01-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_david",
//           name: "David Kim",
//           email: "david.kim@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Backend Developer Lead",
//           createdAt: "2023-04-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       startDate: "2025-06-20T00:00:00Z",
//       dueDate: "2025-06-30T00:00:00Z",
//       progress: 0,
//       metrics: {
//         estimatedHours: 20,
//         spentHours: 0,
//         remainingHours: 20,
//         taskTotal: 2,
//         taskCompleted: 0,
//         taskCompletedThisWeek: 0,
//       },
//       contents: [
//         {
//           id: "file_launch_checklist",
//           type: "file",
//           title: "Launch Checklist & Requirements",
//           description:
//             "Comprehensive launch checklist and verification requirements",
//           size: 2800000,
//           url: "https://storage.example.com/files/launch-checklist.pdf",
//           fileType: "document",
//           createdBy: {
//             id: "user_sarah",
//             name: "Sarah Parker",
//             email: "sarah.parker@agency.com",
//             role: "Project Manager",
//           },
//           createdAt: "2025-06-20T00:00:00Z",
//           updatedAt: "2025-06-20T00:00:00Z",
//         },
//         {
//           id: "launch_status",
//           type: "component",
//           componentType: "launch-checklist",
//           title: "Launch Readiness Dashboard",
//           description: "Interactive launch checklist and status tracking",
//           createdBy: {
//             id: "user_sarah",
//             name: "Sarah Parker",
//             email: "sarah.parker@agency.com",
//             role: "Project Manager",
//           },
//           data: {
//             categories: [
//               {
//                 name: "Technical Requirements",
//                 items: [
//                   {
//                     task: "SSL Certificate Configuration",
//                     status: "completed",
//                     assignee: "David Kim",
//                     dueDate: "2025-06-25T00:00:00Z",
//                     notes: "Valid for 1 year",
//                   },
//                   {
//                     task: "Database Backup Verification",
//                     status: "in-progress",
//                     assignee: "David Kim",
//                     dueDate: "2025-06-26T00:00:00Z",
//                   },
//                   {
//                     task: "Load Testing",
//                     status: "pending",
//                     assignee: "James Wilson",
//                     dueDate: "2025-06-27T00:00:00Z",
//                   },
//                 ],
//                 progress: 33,
//               },
//               {
//                 name: "Security Requirements",
//                 items: [
//                   {
//                     task: "Security Audit",
//                     status: "in-progress",
//                     assignee: "External Vendor",
//                     dueDate: "2025-06-28T00:00:00Z",
//                   },
//                   {
//                     task: "Penetration Testing",
//                     status: "pending",
//                     assignee: "Security Team",
//                     dueDate: "2025-06-29T00:00:00Z",
//                   },
//                 ],
//                 progress: 20,
//               },
//               {
//                 name: "Business Requirements",
//                 items: [
//                   {
//                     task: "Legal Approval",
//                     status: "completed",
//                     assignee: "Legal Team",
//                     dueDate: "2025-06-25T00:00:00Z",
//                   },
//                   {
//                     task: "Marketing Materials Ready",
//                     status: "in-progress",
//                     assignee: "Marketing Team",
//                     dueDate: "2025-06-28T00:00:00Z",
//                   },
//                 ],
//                 progress: 50,
//               },
//             ],
//             overallProgress: 35,
//             criticalItems: 3,
//             completedItems: 2,
//             timeline: {
//               plannedLaunchDate: "2025-06-30T00:00:00Z",
//               estimatedLaunchDate: "2025-06-30T00:00:00Z",
//               riskLevel: "medium",
//               blockers: [],
//             },
//             approvals: [
//               {
//                 name: "Technical Sign-off",
//                 approver: "David Kim",
//                 status: "pending",
//                 requiredDate: "2025-06-29T00:00:00Z",
//               },
//               {
//                 name: "Security Sign-off",
//                 approver: "Security Lead",
//                 status: "pending",
//                 requiredDate: "2025-06-29T00:00:00Z",
//               },
//               {
//                 name: "Business Sign-off",
//                 approver: "Product Owner",
//                 status: "pending",
//                 requiredDate: "2025-06-29T00:00:00Z",
//               },
//             ],
//           },
//           createdAt: "2025-06-23T00:00:00Z",
//           updatedAt: "2025-06-23T00:00:00Z",
//         },
//       ],
//       dependencies: [
//         {
//           id: "dep_007",
//           type: "blocked_by",
//           deliverable: {
//             id: "del_deployment_docs",
//             name: "Deployment Documentation",
//           },
//         },
//       ],
//       tags: ["launch", "documentation", "checklist"],
//       customFields: {
//         verificationStatus: "pending",
//         approvalRequired: ["technical", "business", "security"],
//       },
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//   ],
//   stages: [
//     {
//       id: "stage_discovery",
//       name: "Discovery & Strategy",
//       description:
//         "Market research, user personas, competition analysis, and project planning. Define core features and content strategy.",
//       startDate: "2025-01-01T00:00:00Z",
//       endDate: "2025-01-31T00:00:00Z",
//       order: 1,
//       status: {
//         label: "Completed",
//         value: TaskStatus.COMPLETED,
//       },
//       progress: 100,
//       priority: { label: "High", value: Priority.HIGH },
//       assignees: [
//         {
//           id: "user_sarah",
//           name: "Sarah Parker",
//           email: "sarah.parker@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Project Manager",
//           createdAt: "2023-01-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_michael",
//           name: "Michael Chen",
//           email: "michael.chen@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "UI/UX Lead Designer",
//           createdAt: "2023-03-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_ana",
//           name: "Ana Silva",
//           email: "ana.silva@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Content Strategist",
//           createdAt: "2023-06-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       tasks: [
//         {
//           id: "task_market_research",
//           title: "Conduct Market Research",
//           description:
//             "Research competitors, market trends, and target audience",
//           status: {
//             label: "Completed",
//             value: TaskStatus.COMPLETED,
//           },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_ana",
//             name: "Ana Silva",
//             email: "ana.silva@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Content Strategist",
//             createdAt: "2023-06-15T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_discovery",
//             name: "Discovery & Strategy",
//           },
//           deliverable: {
//             id: "del_research_report",
//             name: "Market Research & Analysis Report",
//           },
//           startDate: "2025-01-01T00:00:00Z",
//           dueDate: "2025-01-10T00:00:00Z",
//           progress: 100,
//           estimatedHours: 40,
//           spentHours: 45,
//           dependencies: [],
//           subtasks: [
//             {
//               id: "subtask_competitor_analysis",
//               title: "Analyze top 5 competitors",
//               completed: true,
//             },
//             {
//               id: "subtask_market_trends",
//               title: "Document current market trends",
//               completed: true,
//             },
//           ],
//           tags: ["research", "analysis", "market"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-10T00:00:00Z",
//         },
//         {
//           id: "task_competitive_analysis",
//           title: "Competitive Analysis",
//           description: "Detailed analysis of direct and indirect competitors",
//           status: {
//             label: "Completed",
//             value: TaskStatus.COMPLETED,
//           },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_ana",
//             name: "Ana Silva",
//             email: "ana.silva@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Content Strategist",
//             createdAt: "2023-06-15T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_discovery",
//             name: "Discovery & Strategy",
//           },
//           deliverable: {
//             id: "del_research_report",
//             name: "Market Research & Analysis Report",
//           },
//           startDate: "2025-01-05T00:00:00Z",
//           dueDate: "2025-01-15T00:00:00Z",
//           progress: 100,
//           estimatedHours: 30,
//           spentHours: 32,
//           tags: ["research", "competitors"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-15T00:00:00Z",
//         },
//         {
//           id: "task_user_personas",
//           title: "Create User Personas",
//           description: "Develop detailed user personas based on research",
//           status: {
//             label: "Completed",
//             value: TaskStatus.COMPLETED,
//           },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_michael",
//             name: "Michael Chen",
//             email: "michael.chen@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "UI/UX Lead Designer",
//             createdAt: "2023-03-15T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_discovery",
//             name: "Discovery & Strategy",
//           },
//           deliverable: {
//             id: "del_user_personas",
//             name: "User Personas & Journey Maps",
//           },
//           startDate: "2025-01-15T00:00:00Z",
//           dueDate: "2025-01-25T00:00:00Z",
//           progress: 100,
//           estimatedHours: 35,
//           spentHours: 30,
//           tags: ["user-research", "personas"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-25T00:00:00Z",
//         },
//       ],
//       milestones: [
//         {
//           id: "milestone_discovery_complete",
//           title: "Discovery Phase Complete",
//           description:
//             "Market research finalized, user personas defined, and project scope approved by stakeholders",
//           dueDate: "2025-01-31T00:00:00Z",
//           stage: {
//             id: "stage_discovery",
//             name: "Discovery & Strategy",
//           },
//           deliverables: [
//             {
//               id: "del_research_report",
//               name: "Market Research & Analysis Report",
//             },
//             {
//               id: "del_user_personas",
//               name: "User Personas & Journey Maps",
//             },
//           ],
//           status: {
//             label: "Completed",
//             value: TaskStatus.COMPLETED,
//           },
//           progress: 100,
//           priority: { label: "High", value: Priority.HIGH },
//           criteria: [
//             "Market research report approved by stakeholders",
//             "User personas validated with client",
//             "Project scope document finalized",
//           ],
//           impact: "Establishes foundation for design and development phases",
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-31T00:00:00Z",
//         },
//       ],
//       deliverables: [
//         {
//           id: "del_research_report",
//           title: "Market Research & Analysis Report",
//           description:
//             "Comprehensive market analysis including competitor research, target audience insights, and market opportunities",
//           status: {
//             label: "Completed",
//             value: TaskStatus.COMPLETED,
//           },
//           priority: { label: "High", value: Priority.HIGH },
//           stage: {
//             id: "stage_discovery",
//             name: "Discovery & Strategy",
//           },
//           assignee: {
//             id: "user_ana",
//             name: "Ana Silva",
//             email: "ana.silva@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Content Strategist",
//             createdAt: "2023-06-15T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           teamMembers: [
//             {
//               id: "user_ana",
//               name: "Ana Silva",
//               email: "ana.silva@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "Content Strategist",
//               createdAt: "2023-06-15T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//             {
//               id: "user_sarah",
//               name: "Sarah Parker",
//               email: "sarah.parker@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "Project Manager",
//               createdAt: "2023-01-01T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           startDate: "2025-01-01T00:00:00Z",
//           dueDate: "2025-01-15T00:00:00Z",
//           progress: 100,
//           metrics: {
//             estimatedHours: 80,
//             spentHours: 85,
//             remainingHours: 0,
//             taskTotal: 6,
//             taskCompleted: 6,
//             taskCompletedThisWeek: 2,
//           },
//           dependencies: [],
//           tags: ["research", "analysis", "market"],
//           customFields: {
//             reviewStatus: "approved",
//             clientFeedback: "excellent",
//             presentationDate: "2025-01-16T00:00:00Z",
//           },
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-15T00:00:00Z",
//         },
//         {
//           id: "del_user_personas",
//           title: "User Personas & Journey Maps",
//           description:
//             "Detailed user personas and customer journey maps for key user segments",
//           status: {
//             label: "Completed",
//             value: TaskStatus.COMPLETED,
//           },
//           priority: { label: "High", value: Priority.HIGH },
//           stage: {
//             id: "stage_discovery",
//             name: "Discovery & Strategy",
//           },
//           assignee: {
//             id: "user_michael",
//             name: "Michael Chen",
//             email: "michael.chen@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "UI/UX Lead Designer",
//             createdAt: "2023-03-15T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           teamMembers: [
//             {
//               id: "user_michael",
//               name: "Michael Chen",
//               email: "michael.chen@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "UI/UX Lead Designer",
//               createdAt: "2023-03-15T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//             {
//               id: "user_ana",
//               name: "Ana Silva",
//               email: "ana.silva@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "Content Strategist",
//               createdAt: "2023-06-15T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           startDate: "2025-01-15T00:00:00Z",
//           dueDate: "2025-01-31T00:00:00Z",
//           progress: 100,
//           metrics: {
//             estimatedHours: 60,
//             spentHours: 55,
//             remainingHours: 0,
//             taskTotal: 4,
//             taskCompleted: 4,
//             taskCompletedThisWeek: 1,
//           },
//           dependencies: [
//             {
//               id: "dep_001",
//               type: "blocked_by",
//               deliverable: {
//                 id: "del_research_report",
//                 name: "Market Research & Analysis Report",
//               },
//             },
//           ],
//           tags: ["user-research", "personas", "journey-maps"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-31T00:00:00Z",
//         },
//       ],
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-31T00:00:00Z",
//     },
//     {
//       id: "stage_design",
//       name: "UX/UI Design",
//       description:
//         "Information architecture, wireframes, design system, and high-fidelity mockups for all key pages and features.",
//       startDate: "2025-02-01T00:00:00Z",
//       endDate: "2025-03-15T00:00:00Z",
//       order: 2,
//       status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//       progress: 65,
//       priority: { label: "High", value: Priority.HIGH },
//       assignees: [
//         {
//           id: "user_michael",
//           name: "Michael Chen",
//           email: "michael.chen@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "UI/UX Lead Designer",
//           createdAt: "2023-03-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_sophia",
//           name: "Sophia Lee",
//           email: "sophia.lee@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "UI Designer",
//           createdAt: "2023-05-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       dependencyStages: [
//         {
//           id: "stage_discovery",
//           name: "Discovery & Strategy",
//         },
//       ],
//       tasks: [
//         {
//           id: "task_information_architecture",
//           title: "Information Architecture",
//           description: "Create site map and user flows",
//           status: {
//             label: "Completed",
//             value: TaskStatus.COMPLETED,
//           },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_michael",
//             name: "Michael Chen",
//             email: "michael.chen@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "UI/UX Lead Designer",
//             createdAt: "2023-03-15T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_design",
//             name: "UX/UI Design",
//           },
//           deliverable: {
//             id: "del_wireframes",
//             name: "Wireframes & User Flow Diagrams",
//           },
//           startDate: "2025-02-01T00:00:00Z",
//           dueDate: "2025-02-15T00:00:00Z",
//           progress: 100,
//           estimatedHours: 40,
//           spentHours: 38,
//           dependencies: [],
//           subtasks: [
//             {
//               id: "subtask_sitemap",
//               title: "Create sitemap",
//               completed: true,
//             },
//             {
//               id: "subtask_userflows",
//               title: "Design user flows",
//               completed: true,
//             },
//           ],
//           tags: ["IA", "UX", "planning"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-02-15T00:00:00Z",
//         },
//         {
//           id: "task_wireframes",
//           title: "Create Wireframes",
//           description: "Design low-fidelity wireframes for all key pages",
//           status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_sophia",
//             name: "Sophia Lee",
//             email: "sophia.lee@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "UI Designer",
//             createdAt: "2023-05-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_design",
//             name: "UX/UI Design",
//           },
//           deliverable: {
//             id: "del_wireframes",
//             name: "Wireframes & User Flow Diagrams",
//           },
//           startDate: "2025-02-01T00:00:00Z",
//           dueDate: "2025-02-28T00:00:00Z",
//           progress: 75,
//           estimatedHours: 60,
//           spentHours: 45,
//           dependencies: [
//             {
//               id: "task_information_architecture",
//               title: "Information Architecture",
//               description: "Create site map and user flows",
//               status: {
//                 label: "Completed",
//                 value: TaskStatus.COMPLETED,
//               },
//               priority: { label: "High", value: Priority.HIGH },
//               assignee: {
//                 id: "user_michael",
//                 name: "Michael Chen",
//                 email: "michael.chen@agency.com",
//                 avatar:
//                   "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//                 role: "UI/UX Lead Designer",
//                 createdAt: "2023-03-15T00:00:00Z",
//                 updatedAt: "2025-01-29T00:00:00Z",
//               },
//               stage: {
//                 id: "stage_design",
//                 name: "UX/UI Design",
//               },
//               startDate: "2025-02-01T00:00:00Z",
//               dueDate: "2025-02-15T00:00:00Z",
//               progress: 100,
//               estimatedHours: 40,
//               spentHours: 38,
//               createdAt: "2024-12-15T00:00:00Z",
//               updatedAt: "2025-02-15T00:00:00Z",
//             },
//           ],
//           tags: ["wireframes", "UX"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-02-15T00:00:00Z",
//         },
//         {
//           id: "task_design_system",
//           title: "Design System Development",
//           description:
//             "Create comprehensive design system and component library",
//           status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_sophia",
//             name: "Sophia Lee",
//             email: "sophia.lee@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "UI Designer",
//             createdAt: "2023-05-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_design",
//             name: "UX/UI Design",
//           },
//           deliverable: {
//             id: "del_design_system",
//             name: "Design System & Component Library",
//           },
//           startDate: "2025-02-15T00:00:00Z",
//           dueDate: "2025-03-01T00:00:00Z",
//           progress: 60,
//           estimatedHours: 80,
//           spentHours: 48,
//           subtasks: [
//             {
//               id: "subtask_colors",
//               title: "Define color system",
//               completed: true,
//             },
//             {
//               id: "subtask_typography",
//               title: "Define typography system",
//               completed: true,
//             },
//             {
//               id: "subtask_components",
//               title: "Create component library",
//               completed: false,
//             },
//           ],
//           tags: ["design-system", "UI"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-02-15T00:00:00Z",
//         },
//       ],
//       milestones: [
//         {
//           id: "milestone_design_system",
//           title: "Design System Complete",
//           description:
//             "Comprehensive design system including components, guidelines, and documentation",
//           dueDate: "2025-02-28T00:00:00Z",
//           stage: {
//             id: "stage_design",
//             name: "UX/UI Design",
//           },
//           deliverables: [
//             {
//               id: "del_design_system",
//               name: "Design System & Component Library",
//             },
//           ],
//           status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//           progress: 75,
//           priority: { label: "High", value: Priority.HIGH },
//           criteria: [
//             "Color system defined and documented",
//             "Typography system completed",
//             "Component library created",
//             "Usage guidelines documented",
//             "Design tokens implemented",
//           ],
//           impact:
//             "Establishes consistent design language and accelerates UI development",
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "milestone_design_complete",
//           title: "UI Design Approval",
//           description:
//             "All UI designs approved by stakeholders and ready for development",
//           dueDate: "2025-03-15T00:00:00Z",
//           stage: {
//             id: "stage_design",
//             name: "UX/UI Design",
//           },
//           deliverables: [
//             {
//               id: "del_wireframes",
//               name: "Wireframes & User Flow Diagrams",
//             },
//             {
//               id: "del_design_system",
//               name: "Design System & Component Library",
//             },
//           ],
//           status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//           progress: 40,
//           priority: { label: "High", value: Priority.HIGH },
//           criteria: [
//             "All page designs completed",
//             "Stakeholder feedback incorporated",
//             "Design system implementation verified",
//             "Development handoff documentation prepared",
//           ],
//           impact:
//             "Enables development team to begin implementation with approved designs",
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       deliverables: [
//         {
//           id: "del_wireframes",
//           title: "Wireframes & User Flow Diagrams",
//           description:
//             "Low-fidelity wireframes and user flow diagrams for all key pages and features",
//           status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//           priority: { label: "High", value: Priority.HIGH },
//           stage: {
//             id: "stage_design",
//             name: "UX/UI Design",
//           },
//           assignee: {
//             id: "user_michael",
//             name: "Michael Chen",
//             email: "michael.chen@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "UI/UX Lead Designer",
//             createdAt: "2023-03-15T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           teamMembers: [
//             {
//               id: "user_michael",
//               name: "Michael Chen",
//               email: "michael.chen@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "UI/UX Lead Designer",
//               createdAt: "2023-03-15T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//             {
//               id: "user_sophia",
//               name: "Sophia Lee",
//               email: "sophia.lee@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "UI Designer",
//               createdAt: "2023-05-01T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           startDate: "2025-02-01T00:00:00Z",
//           dueDate: "2025-02-15T00:00:00Z",
//           progress: 85,
//           metrics: {
//             estimatedHours: 100,
//             spentHours: 85,
//             remainingHours: 15,
//             taskTotal: 8,
//             taskCompleted: 7,
//             taskCompletedThisWeek: 3,
//           },
//           dependencies: [
//             {
//               id: "dep_002",
//               type: "blocked_by",
//               deliverable: {
//                 id: "del_user_personas",
//                 name: "User Personas & Journey Maps",
//               },
//             },
//           ],
//           tags: ["wireframes", "UX", "planning"],
//           customFields: {
//             reviewStatus: "in_review",
//             stakeholderFeedback: "pending",
//             nextReviewDate: "2025-02-20T00:00:00Z",
//           },
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "del_design_system",
//           title: "Design System & Component Library",
//           description:
//             "Complete design system including components, patterns, and usage guidelines",
//           status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//           priority: { label: "High", value: Priority.HIGH },
//           stage: {
//             id: "stage_design",
//             name: "UX/UI Design",
//           },
//           assignee: {
//             id: "user_sophia",
//             name: "Sophia Lee",
//             email: "sophia.lee@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "UI Designer",
//             createdAt: "2023-05-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           teamMembers: [
//             {
//               id: "user_sophia",
//               name: "Sophia Lee",
//               email: "sophia.lee@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "UI Designer",
//               createdAt: "2023-05-01T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//             {
//               id: "user_michael",
//               name: "Michael Chen",
//               email: "michael.chen@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "UI/UX Lead Designer",
//               createdAt: "2023-03-15T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           startDate: "2025-02-15T00:00:00Z",
//           dueDate: "2025-02-28T00:00:00Z",
//           progress: 75,
//           metrics: {
//             estimatedHours: 120,
//             spentHours: 90,
//             remainingHours: 30,
//             taskTotal: 10,
//             taskCompleted: 7,
//             taskCompletedThisWeek: 2,
//           },
//           dependencies: [
//             {
//               id: "dep_003",
//               type: "relates_to",
//               deliverable: {
//                 id: "del_wireframes",
//                 name: "Wireframes & User Flow Diagrams",
//               },
//             },
//           ],
//           tags: ["design-system", "UI", "components"],
//           customFields: {
//             figmaLink: "https://figma.com/file/design-system",
//             version: "1.0.0",
//             status: "beta",
//           },
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "stage_development",
//       name: "Development & Integration",
//       description:
//         "Frontend development, backend implementation, and third-party integrations for payment, shipping, and analytics.",
//       startDate: "2025-03-01T00:00:00Z",
//       endDate: "2025-05-15T00:00:00Z",
//       status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//       progress: 30,
//       order: 3,
//       priority: { label: "High", value: Priority.HIGH },
//       assignees: [
//         {
//           id: "user_emily",
//           name: "Emily Rodriguez",
//           email: "emily.rodriguez@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Frontend Developer Lead",
//           createdAt: "2023-02-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_david",
//           name: "David Kim",
//           email: "david.kim@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Backend Developer Lead",
//           createdAt: "2023-04-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       tasks: [
//         {
//           id: "task_frontend_setup",
//           title: "Frontend Development Setup",
//           description:
//             "Initial frontend project setup and core components implementation",
//           status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_emily",
//             name: "Emily Rodriguez",
//             email: "emily.rodriguez@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Frontend Developer Lead",
//             createdAt: "2023-02-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_development",
//             name: "Development & Integration",
//           },
//           deliverable: {
//             id: "del_frontend",
//             name: "Frontend Implementation",
//           },
//           startDate: "2025-03-01T00:00:00Z",
//           dueDate: "2025-03-15T00:00:00Z",
//           progress: 60,
//           estimatedHours: 80,
//           spentHours: 48,
//           dependencies: [],
//           subtasks: [
//             {
//               id: "subtask_project_config",
//               title: "Project Configuration",
//               completed: true,
//             },
//             {
//               id: "subtask_core_components",
//               title: "Core Components Setup",
//               completed: false,
//             },
//           ],
//           tags: ["frontend", "setup", "development"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-03-10T00:00:00Z",
//         },
//         {
//           id: "task_backend_setup",
//           title: "Backend Development Setup",
//           description:
//             "Initial backend infrastructure setup and core APIs implementation",
//           status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_david",
//             name: "David Kim",
//             email: "david.kim@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Backend Developer Lead",
//             createdAt: "2023-04-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_development",
//             name: "Development & Integration",
//           },
//           deliverable: {
//             id: "del_backend",
//             name: "Backend Implementation",
//           },
//           startDate: "2025-03-01T00:00:00Z",
//           dueDate: "2025-03-15T00:00:00Z",
//           progress: 55,
//           estimatedHours: 80,
//           spentHours: 44,
//           dependencies: [],
//           subtasks: [
//             {
//               id: "subtask_api_design",
//               title: "API Design",
//               completed: true,
//             },
//             {
//               id: "subtask_database_setup",
//               title: "Database Setup",
//               completed: true,
//             },
//             {
//               id: "subtask_auth_implementation",
//               title: "Authentication Implementation",
//               completed: false,
//             },
//           ],
//           tags: ["backend", "setup", "development"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-03-10T00:00:00Z",
//         },
//         {
//           id: "task_payment_integration",
//           title: "Payment Integration",
//           description: "Implement payment gateway integration",
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_david",
//             name: "David Kim",
//             email: "david.kim@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Backend Developer Lead",
//             createdAt: "2023-04-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_development",
//             name: "Development & Integration",
//           },
//           deliverable: {
//             id: "del_integrations",
//             name: "Third-party Integrations",
//           },
//           startDate: "2025-03-15T00:00:00Z",
//           dueDate: "2025-04-15T00:00:00Z",
//           progress: 0,
//           estimatedHours: 60,
//           spentHours: 0,
//           dependencies: [
//             {
//               id: "task_backend_setup",
//               title: "Backend Development Setup",
//               description:
//                 "Initial backend infrastructure setup and core APIs implementation",
//               status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//               priority: { label: "High", value: Priority.HIGH },
//               assignee: {
//                 id: "user_david",
//                 name: "David Kim",
//                 email: "david.kim@agency.com",
//                 avatar:
//                   "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//                 role: "Backend Developer Lead",
//                 createdAt: "2023-04-01T00:00:00Z",
//                 updatedAt: "2025-01-29T00:00:00Z",
//               },
//               stage: {
//                 id: "stage_development",
//                 name: "Development & Integration",
//               },
//               startDate: "2025-03-01T00:00:00Z",
//               dueDate: "2025-03-15T00:00:00Z",
//               progress: 55,
//               estimatedHours: 80,
//               spentHours: 44,
//               createdAt: "2024-12-15T00:00:00Z",
//               updatedAt: "2025-03-10T00:00:00Z",
//             },
//           ],
//           tags: ["payment", "integration", "backend"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       milestones: [
//         {
//           id: "milestone_mvp",
//           title: "MVP Release",
//           description:
//             "Core features implemented and ready for internal testing",
//           dueDate: "2025-04-15T00:00:00Z",
//           stage: {
//             id: "stage_development",
//             name: "Development & Integration",
//           },
//           deliverables: [
//             {
//               id: "del_frontend",
//               name: "Frontend Implementation",
//             },
//             {
//               id: "del_backend",
//               name: "Backend Implementation",
//             },
//           ],
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           progress: 0,
//           priority: { label: "High", value: Priority.HIGH },
//           criteria: [
//             "Core features implemented",
//             "Basic user flows working",
//             "No critical bugs",
//             "Internal testing ready",
//           ],
//           impact:
//             "First working version of the platform for internal testing and validation",
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "milestone_beta",
//           title: "Beta Release",
//           description:
//             "Platform ready for beta testing with selected customers",
//           dueDate: "2025-05-15T00:00:00Z",
//           stage: {
//             id: "stage_development",
//             name: "Development & Integration",
//           },
//           deliverables: [
//             {
//               id: "del_frontend",
//               name: "Frontend Implementation",
//             },
//             {
//               id: "del_backend",
//               name: "Backend Implementation",
//             },
//             {
//               id: "del_integrations",
//               name: "Third-party Integrations",
//             },
//           ],
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           progress: 0,
//           priority: { label: "High", value: Priority.HIGH },
//           criteria: [
//             "All core features complete",
//             "Third-party integrations working",
//             "Performance requirements met",
//             "Beta testing plan ready",
//           ],
//           impact:
//             "Platform ready for real user testing and feedback collection",
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       deliverables: [
//         {
//           id: "del_frontend",
//           title: "Frontend Implementation",
//           description:
//             "Complete frontend implementation including all pages and features",
//           status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//           priority: { label: "High", value: Priority.HIGH },
//           stage: {
//             id: "stage_development",
//             name: "Development & Integration",
//           },
//           assignee: {
//             id: "user_emily",
//             name: "Emily Rodriguez",
//             email: "emily.rodriguez@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Frontend Developer Lead",
//             createdAt: "2023-02-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           teamMembers: [
//             {
//               id: "user_emily",
//               name: "Emily Rodriguez",
//               email: "emily.rodriguez@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "Frontend Developer Lead",
//               createdAt: "2023-02-01T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           startDate: "2025-03-01T00:00:00Z",
//           dueDate: "2025-05-15T00:00:00Z",
//           progress: 30,
//           metrics: {
//             estimatedHours: 400,
//             spentHours: 120,
//             remainingHours: 280,
//             taskTotal: 25,
//             taskCompleted: 8,
//             taskCompletedThisWeek: 3,
//           },
//           dependencies: [
//             {
//               id: "dep_004",
//               type: "blocked_by",
//               deliverable: {
//                 id: "del_design_system",
//                 name: "Design System & Component Library",
//               },
//             },
//           ],
//           tags: ["frontend", "development"],
//           customFields: {
//             repository: "github.com/naturaldog/frontend",
//             techs: ["React", "TypeScript", "Tailwind"],
//           },
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-03-10T00:00:00Z",
//         },
//         {
//           id: "del_backend",
//           title: "Backend Implementation",
//           description:
//             "Complete backend implementation including all APIs and services",
//           status: { label: "In Progress", value: TaskStatus.IN_PROGRESS },
//           priority: { label: "High", value: Priority.HIGH },
//           stage: {
//             id: "stage_development",
//             name: "Development & Integration",
//           },
//           assignee: {
//             id: "user_david",
//             name: "David Kim",
//             email: "david.kim@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Backend Developer Lead",
//             createdAt: "2023-04-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           teamMembers: [
//             {
//               id: "user_david",
//               name: "David Kim",
//               email: "david.kim@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "Backend Developer Lead",
//               createdAt: "2023-04-01T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           startDate: "2025-03-01T00:00:00Z",
//           dueDate: "2025-05-15T00:00:00Z",
//           progress: 25,
//           metrics: {
//             estimatedHours: 350,
//             spentHours: 88,
//             remainingHours: 262,
//             taskTotal: 20,
//             taskCompleted: 5,
//             taskCompletedThisWeek: 2,
//           },
//           dependencies: [],
//           tags: ["backend", "development", "api"],
//           customFields: {
//             repository: "github.com/naturaldog/backend",
//             techs: ["Node.js", "Express", "PostgreSQL"],
//           },
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-03-10T00:00:00Z",
//         },
//       ],
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "stage_testing",
//       name: "Testing & Quality Assurance",
//       description:
//         "Comprehensive testing including unit tests, integration tests, user acceptance testing, and performance optimization.",
//       startDate: "2025-05-01T00:00:00Z",
//       endDate: "2025-06-15T00:00:00Z",
//       status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//       progress: 0,
//       order: 4,
//       priority: { label: "High", value: Priority.HIGH },
//       assignees: [
//         {
//           id: "user_james",
//           name: "James Wilson",
//           email: "james.wilson@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "QA Engineer",
//           createdAt: "2023-07-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_emily",
//           name: "Emily Rodriguez",
//           email: "emily.rodriguez@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Frontend Developer Lead",
//           createdAt: "2023-02-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_david",
//           name: "David Kim",
//           email: "david.kim@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Backend Developer Lead",
//           createdAt: "2023-04-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       tasks: [
//         {
//           id: "task_unit_testing",
//           title: "Unit Testing",
//           description: "Implement comprehensive unit tests for all components",
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_james",
//             name: "James Wilson",
//             email: "james.wilson@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "QA Engineer",
//             createdAt: "2023-07-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_testing",
//             name: "Testing & Quality Assurance",
//           },
//           deliverable: {
//             id: "del_test_reports",
//             name: "Test Reports & Documentation",
//           },
//           startDate: "2025-05-01T00:00:00Z",
//           dueDate: "2025-05-15T00:00:00Z",
//           progress: 0,
//           estimatedHours: 80,
//           spentHours: 0,
//           dependencies: [],
//           subtasks: [
//             {
//               id: "subtask_frontend_unit_tests",
//               title: "Frontend Unit Tests",
//               completed: false,
//             },
//             {
//               id: "subtask_backend_unit_tests",
//               title: "Backend Unit Tests",
//               completed: false,
//             },
//           ],
//           tags: ["testing", "unit-tests", "qa"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "task_integration_testing",
//           title: "Integration Testing",
//           description: "Perform end-to-end integration testing",
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_james",
//             name: "James Wilson",
//             email: "james.wilson@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "QA Engineer",
//             createdAt: "2023-07-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_testing",
//             name: "Testing & Quality Assurance",
//           },
//           deliverable: {
//             id: "del_test_reports",
//             name: "Test Reports & Documentation",
//           },
//           startDate: "2025-05-15T00:00:00Z",
//           dueDate: "2025-05-31T00:00:00Z",
//           progress: 0,
//           estimatedHours: 60,
//           spentHours: 0,
//           dependencies: [
//             {
//               id: "task_unit_testing",
//               title: "Unit Testing",
//               description:
//                 "Implement comprehensive unit tests for all components",
//               status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//               priority: { label: "High", value: Priority.HIGH },
//               assignee: {
//                 id: "user_james",
//                 name: "James Wilson",
//                 email: "james.wilson@agency.com",
//                 avatar:
//                   "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//                 role: "QA Engineer",
//                 createdAt: "2023-07-01T00:00:00Z",
//                 updatedAt: "2025-01-29T00:00:00Z",
//               },
//               stage: {
//                 id: "stage_testing",
//                 name: "Testing & Quality Assurance",
//               },
//               startDate: "2025-05-01T00:00:00Z",
//               dueDate: "2025-05-15T00:00:00Z",
//               progress: 0,
//               estimatedHours: 80,
//               spentHours: 0,
//               createdAt: "2024-12-15T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           tags: ["testing", "integration-tests", "qa"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "task_uat",
//           title: "User Acceptance Testing",
//           description: "Conduct UAT with selected customers",
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_emily",
//             name: "Emily Rodriguez",
//             email: "emily.rodriguez@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Frontend Developer Lead",
//             createdAt: "2023-02-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_testing",
//             name: "Testing & Quality Assurance",
//           },
//           deliverable: {
//             id: "del_test_reports",
//             name: "Test Reports & Documentation",
//           },
//           startDate: "2025-06-01T00:00:00Z",
//           dueDate: "2025-06-15T00:00:00Z",
//           progress: 0,
//           estimatedHours: 40,
//           spentHours: 0,
//           dependencies: [
//             {
//               id: "task_integration_testing",
//               title: "Integration Testing",
//               description: "Perform end-to-end integration testing",
//               status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//               priority: { label: "High", value: Priority.HIGH },
//               assignee: {
//                 id: "user_james",
//                 name: "James Wilson",
//                 email: "james.wilson@agency.com",
//                 avatar:
//                   "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//                 role: "QA Engineer",
//                 createdAt: "2023-07-01T00:00:00Z",
//                 updatedAt: "2025-01-29T00:00:00Z",
//               },
//               stage: {
//                 id: "stage_testing",
//                 name: "Testing & Quality Assurance",
//               },
//               startDate: "2025-05-15T00:00:00Z",
//               dueDate: "2025-05-31T00:00:00Z",
//               progress: 0,
//               estimatedHours: 60,
//               spentHours: 0,
//               createdAt: "2024-12-15T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           tags: ["testing", "uat", "customer-feedback"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       milestones: [
//         {
//           id: "milestone_testing_complete",
//           title: "Testing Complete",
//           description: "All testing phases completed successfully",
//           dueDate: "2025-06-15T00:00:00Z",
//           stage: {
//             id: "stage_testing",
//             name: "Testing & Quality Assurance",
//           },
//           deliverables: [
//             {
//               id: "del_test_reports",
//               name: "Test Reports & Documentation",
//             },
//           ],
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           progress: 0,
//           priority: { label: "High", value: Priority.HIGH },
//           criteria: [
//             "Unit testing completed with >90% coverage",
//             "Integration tests passed",
//             "UAT completed with customer sign-off",
//             "Performance benchmarks met",
//             "All critical bugs resolved",
//           ],
//           impact: "Ensures platform stability and readiness for launch",
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       deliverables: [
//         {
//           id: "del_test_reports",
//           title: "Test Reports & Documentation",
//           description:
//             "Comprehensive test reports including unit, integration, and performance test results",
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           priority: { label: "High", value: Priority.HIGH },
//           stage: {
//             id: "stage_testing",
//             name: "Testing & Quality Assurance",
//           },
//           assignee: {
//             id: "user_james",
//             name: "James Wilson",
//             email: "james.wilson@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "QA Engineer",
//             createdAt: "2023-07-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           teamMembers: [
//             {
//               id: "user_james",
//               name: "James Wilson",
//               email: "james.wilson@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "QA Engineer",
//               createdAt: "2023-07-01T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//             {
//               id: "user_emily",
//               name: "Emily Rodriguez",
//               email: "emily.rodriguez@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "Frontend Developer Lead",
//               createdAt: "2023-02-01T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           startDate: "2025-05-01T00:00:00Z",
//           dueDate: "2025-06-15T00:00:00Z",
//           progress: 0,
//           metrics: {
//             estimatedHours: 160,
//             spentHours: 0,
//             remainingHours: 160,
//             taskTotal: 12,
//             taskCompleted: 0,
//             taskCompletedThisWeek: 0,
//           },
//           dependencies: [
//             {
//               id: "dep_005",
//               type: "blocked_by",
//               deliverable: {
//                 id: "del_frontend",
//                 name: "Frontend Implementation",
//               },
//             },
//             {
//               id: "dep_006",
//               type: "blocked_by",
//               deliverable: {
//                 id: "del_backend",
//                 name: "Backend Implementation",
//               },
//             },
//           ],
//           tags: ["testing", "documentation", "qa"],
//           customFields: {
//             testCoverage: "0%",
//             totalTestCases: 0,
//             passedTestCases: 0,
//           },
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     {
//       id: "stage_launch",
//       name: "Launch & Deployment",
//       description:
//         "Final preparations, deployment to production, and post-launch monitoring and support.",
//       startDate: "2025-06-15T00:00:00Z",
//       endDate: "2025-06-30T00:00:00Z",
//       status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//       progress: 0,
//       order: 5,
//       priority: { label: "High", value: Priority.HIGH },
//       assignees: [
//         {
//           id: "user_sarah",
//           name: "Sarah Parker",
//           email: "sarah.parker@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Project Manager",
//           createdAt: "2023-01-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_emily",
//           name: "Emily Rodriguez",
//           email: "emily.rodriguez@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Frontend Developer Lead",
//           createdAt: "2023-02-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "user_david",
//           name: "David Kim",
//           email: "david.kim@agency.com",
//           avatar:
//             "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           role: "Backend Developer Lead",
//           createdAt: "2023-04-01T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       tasks: [
//         {
//           id: "task_deployment_prep",
//           title: "Deployment Preparation",
//           description: "Prepare production environment and deployment scripts",
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_david",
//             name: "David Kim",
//             email: "david.kim@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Backend Developer Lead",
//             createdAt: "2023-04-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_launch",
//             name: "Launch & Deployment",
//           },
//           deliverable: {
//             id: "del_deployment_docs",
//             name: "Deployment Documentation",
//           },
//           startDate: "2025-06-15T00:00:00Z",
//           dueDate: "2025-06-20T00:00:00Z",
//           progress: 0,
//           estimatedHours: 20,
//           spentHours: 0,
//           dependencies: [],
//           subtasks: [
//             {
//               id: "subtask_env_setup",
//               title: "Production Environment Setup",
//               completed: false,
//             },
//             {
//               id: "subtask_deployment_scripts",
//               title: "Deployment Scripts Creation",
//               completed: false,
//             },
//           ],
//           tags: ["deployment", "devops"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "task_launch_checklist",
//           title: "Launch Checklist",
//           description: "Complete pre-launch checklist and final verifications",
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_sarah",
//             name: "Sarah Parker",
//             email: "sarah.parker@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Project Manager",
//             createdAt: "2023-01-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_launch",
//             name: "Launch & Deployment",
//           },
//           deliverable: {
//             id: "del_launch_checklist",
//             name: "Launch Checklist & Documentation",
//           },
//           startDate: "2025-06-20T00:00:00Z",
//           dueDate: "2025-06-25T00:00:00Z",
//           progress: 0,
//           estimatedHours: 16,
//           spentHours: 0,
//           dependencies: [
//             {
//               id: "task_deployment_prep",
//               title: "Deployment Preparation",
//               description:
//                 "Prepare production environment and deployment scripts",
//               status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//               priority: { label: "High", value: Priority.HIGH },
//               assignee: {
//                 id: "user_david",
//                 name: "David Kim",
//                 email: "david.kim@agency.com",
//                 avatar:
//                   "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//                 role: "Backend Developer Lead",
//                 createdAt: "2023-04-01T00:00:00Z",
//                 updatedAt: "2025-01-29T00:00:00Z",
//               },
//               stage: {
//                 id: "stage_launch",
//                 name: "Launch & Deployment",
//               },
//               startDate: "2025-06-15T00:00:00Z",
//               dueDate: "2025-06-20T00:00:00Z",
//               progress: 0,
//               estimatedHours: 20,
//               spentHours: 0,
//               createdAt: "2024-12-15T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           tags: ["launch", "verification"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "task_monitoring_setup",
//           title: "Monitoring Setup",
//           description: "Set up production monitoring and alerting",
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           priority: { label: "High", value: Priority.HIGH },
//           assignee: {
//             id: "user_david",
//             name: "David Kim",
//             email: "david.kim@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Backend Developer Lead",
//             createdAt: "2023-04-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           stage: {
//             id: "stage_launch",
//             name: "Launch & Deployment",
//           },
//           deliverable: {
//             id: "del_deployment_docs",
//             name: "Deployment Documentation",
//           },
//           startDate: "2025-06-25T00:00:00Z",
//           dueDate: "2025-06-30T00:00:00Z",
//           progress: 0,
//           estimatedHours: 24,
//           spentHours: 0,
//           dependencies: [
//             {
//               id: "task_deployment_prep",
//               title: "Deployment Preparation",
//               description:
//                 "Prepare production environment and deployment scripts",
//               status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//               priority: { label: "High", value: Priority.HIGH },
//               assignee: {
//                 id: "user_david",
//                 name: "David Kim",
//                 email: "david.kim@agency.com",
//                 avatar:
//                   "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//                 role: "Backend Developer Lead",
//                 createdAt: "2023-04-01T00:00:00Z",
//                 updatedAt: "2025-01-29T00:00:00Z",
//               },
//               stage: {
//                 id: "stage_launch",
//                 name: "Launch & Deployment",
//               },
//               startDate: "2025-06-15T00:00:00Z",
//               dueDate: "2025-06-20T00:00:00Z",
//               progress: 0,
//               estimatedHours: 20,
//               spentHours: 0,
//               createdAt: "2024-12-15T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           tags: ["monitoring", "devops"],
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       milestones: [
//         {
//           id: "milestone_launch",
//           title: "Platform Launch",
//           description: "Official platform launch and go-live",
//           dueDate: "2025-06-30T00:00:00Z",
//           stage: {
//             id: "stage_launch",
//             name: "Launch & Deployment",
//           },
//           deliverables: [
//             {
//               id: "del_deployment_docs",
//               name: "Deployment Documentation",
//             },
//             {
//               id: "del_launch_checklist",
//               name: "Launch Checklist & Documentation",
//             },
//           ],
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           progress: 0,
//           priority: { label: "High", value: Priority.HIGH },
//           criteria: [
//             "All deployment documentation completed",
//             "Launch checklist verified",
//             "Monitoring systems operational",
//             "Stakeholder approval received",
//             "Go/No-go decision confirmed",
//           ],
//           impact: "Platform goes live and becomes available to customers",
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       deliverables: [
//         {
//           id: "del_deployment_docs",
//           title: "Deployment Documentation",
//           description: "Complete deployment documentation and procedures",
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           priority: { label: "High", value: Priority.HIGH },
//           stage: {
//             id: "stage_launch",
//             name: "Launch & Deployment",
//           },
//           assignee: {
//             id: "user_david",
//             name: "David Kim",
//             email: "david.kim@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Backend Developer Lead",
//             createdAt: "2023-04-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           teamMembers: [
//             {
//               id: "user_david",
//               name: "David Kim",
//               email: "david.kim@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "Backend Developer Lead",
//               createdAt: "2023-04-01T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           startDate: "2025-06-15T00:00:00Z",
//           dueDate: "2025-06-30T00:00:00Z",
//           progress: 0,
//           metrics: {
//             estimatedHours: 40,
//             spentHours: 0,
//             remainingHours: 40,
//             taskTotal: 3,
//             taskCompleted: 0,
//             taskCompletedThisWeek: 0,
//           },
//           dependencies: [],
//           tags: ["deployment", "documentation", "devops"],
//           customFields: {
//             repository: "github.com/naturaldog/deployment",
//             environment: "production",
//           },
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//         {
//           id: "del_launch_checklist",
//           title: "Launch Checklist & Documentation",
//           description:
//             "Comprehensive launch checklist and verification documentation",
//           status: { label: "Not Started", value: TaskStatus.NOT_STARTED },
//           priority: { label: "High", value: Priority.HIGH },
//           stage: {
//             id: "stage_launch",
//             name: "Launch & Deployment",
//           },
//           assignee: {
//             id: "user_sarah",
//             name: "Sarah Parker",
//             email: "sarah.parker@agency.com",
//             avatar:
//               "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//             role: "Project Manager",
//             createdAt: "2023-01-01T00:00:00Z",
//             updatedAt: "2025-01-29T00:00:00Z",
//           },
//           teamMembers: [
//             {
//               id: "user_sarah",
//               name: "Sarah Parker",
//               email: "sarah.parker@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "Project Manager",
//               createdAt: "2023-01-01T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//             {
//               id: "user_david",
//               name: "David Kim",
//               email: "david.kim@agency.com",
//               avatar:
//                 "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//               role: "Backend Developer Lead",
//               createdAt: "2023-04-01T00:00:00Z",
//               updatedAt: "2025-01-29T00:00:00Z",
//             },
//           ],
//           startDate: "2025-06-20T00:00:00Z",
//           dueDate: "2025-06-30T00:00:00Z",
//           progress: 0,
//           metrics: {
//             estimatedHours: 20,
//             spentHours: 0,
//             remainingHours: 20,
//             taskTotal: 2,
//             taskCompleted: 0,
//             taskCompletedThisWeek: 0,
//           },
//           dependencies: [
//             {
//               id: "dep_007",
//               type: "blocked_by",
//               deliverable: {
//                 id: "del_deployment_docs",
//                 name: "Deployment Documentation",
//               },
//             },
//           ],
//           tags: ["launch", "documentation", "checklist"],
//           customFields: {
//             verificationStatus: "pending",
//             approvalRequired: ["technical", "business", "security"],
//           },
//           createdAt: "2024-12-15T00:00:00Z",
//           updatedAt: "2025-01-29T00:00:00Z",
//         },
//       ],
//       createdAt: "2024-12-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//   ],
//   recentActivities: [
//     {
//       id: "activity_01",
//       type: "deliverable_status_change",
//       description: "Market Research Report marked as completed",
//       user: {
//         id: "user_ana",
//         name: "Ana Silva",
//         email: "ana.silva@agency.com",
//         avatar:
//           "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         role: "Content Strategist",
//         createdAt: "2023-06-15T00:00:00Z",
//         updatedAt: "2025-01-29T00:00:00Z",
//       },
//       metadata: {
//         entityId: "del_research_report",
//         entityType: "deliverable",
//         changes: {
//           status: {
//             from: "inProgress",
//             to: "completed",
//           },
//         },
//       },
//       createdAt: "2025-01-15T16:00:00Z",
//       updatedAt: "2025-01-15T16:00:00Z",
//     },
//   ],
//   visibility: Visibility.Private,
// };

// export const projectListMockup = [
//   projectData,
//   {
//     ...projectData,
//     id: "proj_pixelforge-studio_1",
//     name: "PixelForge - Web Design Studio",
//     description:
//       "Design and development of a modern web studio platform with portfolio management and client collaboration tools.",
//     owner: {
//       id: "user_alex",
//       name: "Alex Johnson",
//       email: "alex.johnson@pixelforge.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "Creative Director",
//       createdAt: "2022-08-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     client: {
//       id: "client_pixelforge",
//       name: "PixelForge Studios",
//       logo: "/logos/pixelforge.svg",
//       contact: {
//         email: "contact@pixelforge.com",
//         phone: "+1 (555) 987-6543",
//       },
//       createdAt: "2023-05-10T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//   },
//   {
//     ...projectData,
//     id: "proj_codecrafters-dev_2",
//     name: "CodeCrafters - Frontend Development",
//     description:
//       "Development of a high-performance frontend framework for enterprise-level web applications and UI components.",
//     owner: {
//       id: "user_emily",
//       name: "Emily Carter",
//       email: "emily.carter@codecrafters.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "Lead Frontend Engineer",
//       createdAt: "2021-07-12T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     client: {
//       id: "client_codecrafters",
//       name: "CodeCrafters Solutions",
//       logo: "/logos/codecrafters.svg",
//       contact: {
//         email: "support@codecrafters.com",
//         phone: "+1 (555) 765-4321",
//       },
//       createdAt: "2023-09-20T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//   },
//   {
//     ...projectData,
//     id: "proj_visionaryux-design_3",
//     name: "VisionaryUX - UI/UX Design",
//     description:
//       "Creation of a cutting-edge design system with user-centered principles for SaaS platforms and mobile applications.",
//     owner: {
//       id: "user_michael",
//       name: "Michael Reynolds",
//       email: "michael.reynolds@visionaryux.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "UX Lead",
//       createdAt: "2020-04-05T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     client: {
//       id: "client_visionaryux",
//       name: "VisionaryUX Agency",
//       logo: "/logos/visionaryux.svg",
//       contact: {
//         email: "hello@visionaryux.com",
//         phone: "+1 (555) 234-5678",
//       },
//       createdAt: "2023-03-15T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//   },
//   {
//     ...projectData,
//     id: "proj_devsphere-agency_4",
//     name: "DevSphere - Full Stack Development",
//     description:
//       "Development of a scalable full-stack solution integrating cloud services, API management, and security features.",
//     owner: {
//       id: "user_david",
//       name: "David Wilson",
//       email: "david.wilson@devsphere.com",
//       avatar:
//         "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//       role: "CTO",
//       createdAt: "2019-11-30T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//     client: {
//       id: "client_devsphere",
//       name: "DevSphere Technologies",
//       logo: "/logos/devsphere.svg",
//       contact: {
//         email: "info@devsphere.com",
//         phone: "+1 (555) 876-5432",
//       },
//       createdAt: "2022-06-25T00:00:00Z",
//       updatedAt: "2025-01-29T00:00:00Z",
//     },
//   },
// ];
