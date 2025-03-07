import { NotificationType } from "./types";
import type { Language } from "../../_lib/config/i18n";

const translations = {
  en: {
    statusChanged: "Status changed from",
    to: "to",
    stageProgress: "stage progress increased from",
    teamMember: "Team member",
    teamMembers: "Team members",
    as: "as",
    completed: "completed at",
    nextMilestone: "Next milestone",
    fileSize: "file size",
    was: "was",
    unknown: "Unknown notification type",
  },
  es: {
    statusChanged: "Estado cambió de",
    to: "a",
    stageProgress: "progreso de etapa aumentó de",
    teamMember: "Miembro del equipo",
    teamMembers: "Miembros del equipo",
    as: "como",
    completed: "completado al",
    nextMilestone: "Siguiente hito",
    fileSize: "tamaño de archivo",
    was: "fue",
    unknown: "Tipo de notificación desconocido",
  },
};

export const getNotificationContent = (
  notification: NotificationType,
  lang: Language = "en"
) => {
  const t = translations[lang];

  switch (notification.variant) {
    case "status":
      return `${t.statusChanged} ${notification.previousStatus} ${t.to} ${
        notification.newStatus
      }${notification.reason ? ` - ${notification.reason}` : ""}`;

    case "progress":
      return `${notification.stageName} ${t.stageProgress} ${notification.previousProgress}% ${t.to} ${notification.newProgress}%`;

    case "team":
      return `${
        notification.members.length > 1 ? t.teamMembers : t.teamMember
      } ${notification.members.join(", ")} ${notification.action} ${
        notification.role ? `${t.as} ${notification.role}` : ""
      }`;

    case "milestone":
      return `${notification.stageName} ${t.completed} ${notification.progress}%`;

    case "comment":
      return `${notification.commentBy}: "${notification.commentPreview}"`;

    case "file":
      return `${notification.fileName} (${notification.fileSize}) ${t.was} ${notification.action}`;

    case "mention":
      return `${notification.mentionedBy}: "${notification.context}"`;

    default:
      return t.unknown;
  }
};
