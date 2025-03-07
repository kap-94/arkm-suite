import { cache } from "react";
import { Language } from "../_lib/config/i18n";
import { NotificationType } from "../_components/NotificationItem/types";
import { MockNotificationRepository } from "../_repositories/mockNotificationRepository";
import { MockProjectRepository } from "../_repositories/mockProjectRepository";
import { Project, ProjectMetrics } from "../types/models";
import { LabeledEnum, ProjectStatus, TaskStatus } from "../types/models/Common";
import { ProjectCardItem } from "../_components/ProjectCard/types";
import { notificationTranslations } from "./notification-constants";
import { Content } from "../types/models/Content";

export interface ProjectRepository {
  getProjects(lang: Language): Promise<Project[]>;
}

export interface NotificationRepository {
  getNotificationCount(): Promise<number>;
}

// Service Class
export class DashboardService {
  constructor(
    private projectRepository: ProjectRepository,
    private notificationRepository: NotificationRepository
  ) {}

  async getProjectCards(lang: Language = "en"): Promise<ProjectCardItem[]> {
    const projects = await this.projectRepository.getProjects(lang);

    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      slug: project.slug,
      description: project.description,
      updatedAt: new Date(project.updatedAt),
      progress: project.progress,
      stages: project.stages.map((stage) => ({
        name: stage.name,
        order: stage.order,
        status: {
          value: stage.status.value as TaskStatus,
        },
      })),
      status: {
        label: project.status.label,
        value: project.status.value,
      }, // Direct mapping to enum
      type: {
        label: project.type.label,
      },
    }));
  }

  async getDashboardStats(lang: Language = "en") {
    const [projects, notificationCount] = await Promise.all([
      this.getProjectCards(lang),
      this.notificationRepository.getNotificationCount(),
    ]);

    const activeProjects = projects.filter(
      (p) => p.status.value === "inProgress"
    ).length;
    const completed = projects.filter(
      (p) => p.status.value === "completed"
    ).length;
    const overallProgress = Math.round(
      projects.reduce((acc, project) => acc + project.progress, 0) /
        projects.length
    );

    return {
      activeProjects,
      completed,
      overallProgress,
      notifications: notificationCount,
    };
  }

  async getRecentContents(lang: Language = "en"): Promise<Content[]> {
    const projects = await this.projectRepository.getProjects(lang);
    const allContents: Content[] = [];

    projects.forEach((project) => {
      // Solo obtener contents del nivel principal del proyecto
      if (project.contents) {
        project.contents.forEach((content) => {
          if (content.type === "file") {
            allContents.push({
              id: content.id,
              type: "file",
              title: content.title,
              description: content.description || "",
              size: content.size,
              url: content.url,
              project: {
                id: project.id,
                slug: project.slug,
                name: project.name,
              },
              fileType: content.fileType,
              createdBy: content.createdBy,
              createdAt: content.createdAt,
              updatedAt: content.updatedAt,
              metadata: content.metadata || {},
            });
          } else if (content.type === "component") {
            allContents.push({
              id: content.id,
              type: "component",
              title: content.title,
              description: content.description || "",
              componentType: content.componentType,
              project: {
                id: project.id,
                slug: project.slug,
                name: project.name,
              },
              data: content.data,
              createdBy: content.createdBy,
              createdAt: content.createdAt,
              updatedAt: content.updatedAt,
              metadata: content.metadata || {},
            });
          }
        });
      }
    });

    return allContents
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 5);
  }

  async getNotifications(lang: Language = "en"): Promise<NotificationType[]> {
    const projects = await this.projectRepository.getProjects(lang);
    const notifications: NotificationType[] = [];
    const t = notificationTranslations[lang];

    projects.forEach((project) => {
      // Milestone completion notifications
      project.stages?.forEach((stage) => {
        stage.milestones?.forEach((milestone) => {
          if (milestone.status.value === TaskStatus.COMPLETED) {
            notifications.push({
              id: `notif_status_${milestone.id}`,
              variant: "milestone",
              project: {
                id: project.id,
                slug: project.slug,
                name: project.name,
              },
              priority: "medium",
              read: false,
              timestamp: new Date(milestone.updatedAt),
              stageName: stage.name,
              progress: 100,
              status: "success",
              nextMilestone: `🎉 ${t.greatAchievement} ${milestone.title} ${t.completedWithImpact} ${milestone.impact}`,
            });
          }
        });

        // Stage high progress notifications
        if (stage.progress >= 75) {
          notifications.push({
            id: `notif_progress_${stage.id}`,
            variant: "progress",
            project: {
              id: project.id,
              slug: project.slug,
              name: project.name,
            },
            priority: "medium",
            read: false,
            timestamp: new Date(stage.updatedAt),
            previousProgress: stage.progress - 10,
            newProgress: stage.progress,
            stageName: stage.name,
            status: "success",
          });
        }
      });

      // Project metrics success notifications
      if (project.metrics) {
        // High completion rate celebration
        const completionRate =
          (project.metrics.tasks.completed / project.metrics.tasks.total) * 100;
        if (completionRate >= 50) {
          notifications.push({
            id: `notif_status_${project.id}_completion`,
            variant: "status",
            project: {
              id: project.id,
              slug: project.slug,
              name: project.name,
            },
            priority: "medium",
            read: false,
            timestamp: new Date(),
            previousStatus: t.inProgress,
            newStatus: t.onTrack,
            reason: `🌟 ${t.amazingProgress} ${project.metrics.tasks.completed} ${t.tasksCompletedOutOf} ${project.metrics.tasks.total}`,
          });
        }

        // Efficient time tracking celebration
        const efficiencyRate =
          (project.metrics.timeTracking.spent /
            project.metrics.timeTracking.estimated) *
          100;
        if (efficiencyRate <= 90 && project.metrics.tasks.completed > 0) {
          notifications.push({
            id: `notif_progress_${project.id}_efficiency`,
            variant: "progress",
            project: {
              id: project.id,
              slug: project.slug,
              name: project.name,
            },
            priority: "medium",
            read: false,
            timestamp: new Date(),
            previousProgress: 0,
            newProgress: Math.round(100 - efficiencyRate),
            stageName: t.teamEfficiency,
            status: "success",
          });
        }
      }

      // Team collaboration celebrations
      project.deliverables?.forEach((deliverable) => {
        if (
          deliverable.status.value === TaskStatus.COMPLETED &&
          deliverable.teamMembers.length > 1
        ) {
          const teamMembers = deliverable.teamMembers.map(
            (member) => member.name
          );
          notifications.push({
            id: `notif_team_${deliverable.id}`,
            variant: "team",
            project: {
              id: project.id,
              slug: project.slug,
              name: project.name,
            },
            priority: "medium",
            read: false,
            timestamp: new Date(deliverable.updatedAt),
            action: t.successfulCollaboration,
            members: teamMembers,
            role: t.successfulTeamDelivery,
          });
        }
      });

      // Budget efficiency celebrations
      if (project.budget) {
        project.stages.forEach((stage) => {
          const stageBudget = project.budget.breakdownByStage[stage.id];
          if (
            stageBudget &&
            stageBudget.spent <= stageBudget.allocated &&
            stage.progress === 100
          ) {
            notifications.push({
              id: `notif_milestone_${stage.id}_budget`,
              variant: "milestone",
              project: {
                id: project.id,
                slug: project.slug,
                name: project.name,
              },
              priority: "medium",
              read: false,
              timestamp: new Date(),
              stageName: stage.name,
              progress: 100,
              status: "success",
              nextMilestone: `💫 ${stage.name} ${t.completedWithinBudget} ${t.greatResourceManagement}`,
            });
          }
        });
      }
    });

    return notifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);
  }
}

// Service Factory
export function createDashboardService() {
  const projectRepo = new MockProjectRepository();
  const notificationRepo = new MockNotificationRepository();
  return new DashboardService(projectRepo, notificationRepo);
}

export const getProjectCards = cache(async (lang: Language) => {
  const service = createDashboardService();
  return service.getProjectCards(lang);
});

export const getDashboardStats = cache(async (lang: Language) => {
  const service = createDashboardService();
  return service.getDashboardStats(lang);
});

export const getRecentContents = cache(async (lang: Language) => {
  const service = createDashboardService();
  return service.getRecentContents(lang);
});

export const getDashboardNotifications = cache(async (lang: Language) => {
  const service = createDashboardService();
  return service.getNotifications(lang);
});
