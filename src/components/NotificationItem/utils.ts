// src/components/NotificationItem/utils.ts
import { NotificationType } from "./types";

export const getNotificationContent = (notification: NotificationType) => {
  switch (notification.variant) {
    case "status":
      return `Status changed from ${notification.previousStatus} to ${
        notification.newStatus
      }${notification.reason ? ` - ${notification.reason}` : ""}`;
    case "progress":
      return `${notification.stageName} stage progress increased from ${notification.previousProgress}% to ${notification.newProgress}%`;
    case "team":
      return `Team member${
        notification.members.length > 1 ? "s" : ""
      } ${notification.members.join(", ")} ${notification.action} ${
        notification.role ? `as ${notification.role}` : ""
      }`;
    case "milestone":
      return `${notification.stageName} completed at ${notification.progress}%${
        notification.nextMilestone
          ? `. Next milestone: ${notification.nextMilestone}`
          : ""
      }`;
    case "comment":
      return `${notification.commentBy}: "${notification.commentPreview}"`;
    case "file":
      return `${notification.fileName} (${notification.fileSize}) was ${notification.action}`;
    case "mention":
      return `${notification.mentionedBy}: "${notification.context}"`;
    default:
      return "Unknown notification type";
  }
};
