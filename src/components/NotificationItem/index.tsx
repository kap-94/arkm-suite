import React from "react";
import {
  Bell,
  AlertCircle,
  Users,
  Target,
  Activity,
  MessageSquare,
  File,
  AtSign,
} from "lucide-react";
import classNames from "classnames/bind";
import { formatDistanceToNow } from "date-fns";
import styles from "./NotificationItem.module.scss";
import type { NotificationType } from "./types";
import Link from "next/link";

const cx = classNames.bind(styles);

interface NotificationItemProps {
  notification: NotificationType;
  onClick?: (id: string) => void;
}

const NotificationIcon = {
  status: AlertCircle,
  progress: Activity,
  team: Users,
  milestone: Target,
  comment: MessageSquare,
  file: File,
  mention: AtSign,
};

const variantLabels = {
  status: "Status Update",
  progress: "Progress",
  team: "Team Update",
  milestone: "Milestone",
  comment: "Comment",
  file: "File",
  mention: "Mention",
};

const getNotificationContent = (notification: NotificationType) => {
  switch (notification.variant) {
    case "status":
      return {
        title: `Project Status Updated: ${notification.projectName}`,
        description: `Status changed from ${notification.previousStatus} to ${
          notification.newStatus
        }${notification.reason ? ` - ${notification.reason}` : ""}`,
      };
    case "progress":
      return {
        title: `Progress Update: ${notification.projectName}`,
        description: `${notification.stageName} stage progress increased from ${notification.previousProgress}% to ${notification.newProgress}%`,
      };
    case "team":
      return {
        title: `Team Update: ${notification.projectName}`,
        description: `Team member${
          notification.members.length > 1 ? "s" : ""
        } ${notification.members.join(", ")} ${notification.action} ${
          notification.role ? `as ${notification.role}` : ""
        }`,
      };
    case "milestone":
      return {
        title: `Milestone: ${notification.projectName}`,
        description: `${notification.stageName} completed at ${
          notification.progress
        }%${
          notification.nextMilestone
            ? `. Next milestone: ${notification.nextMilestone}`
            : ""
        }`,
      };
    case "comment":
      return {
        title: `New Comment: ${notification.projectName}`,
        description: `${notification.commentBy}: "${notification.commentPreview}"`,
      };
    case "file":
      return {
        title: `File ${notification.action}: ${notification.projectName}`,
        description: `${notification.fileName} (${notification.fileSize}) was ${notification.action}`,
      };
    case "mention":
      return {
        title: `Mentioned in ${notification.projectName}`,
        description: `${notification.mentionedBy}: "${notification.context}"`,
      };
    default:
      return {
        title: "Notification",
        description: "Unknown notification type",
      };
  }
};
const formatTimestamp = (date: Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
}) => {
  const IconComponent = NotificationIcon[notification.variant];
  const content = getNotificationContent(notification);
  // Inicializar con un valor por defecto calculado
  const [timestamp, setTimestamp] = React.useState(() =>
    formatTimestamp(notification.timestamp)
  );

  // Actualizar el timestamp cada minuto para mantenerlo fresco
  React.useEffect(() => {
    const updateTimestamp = () => {
      setTimestamp(formatTimestamp(notification.timestamp));
    };

    const timer = setInterval(updateTimestamp, 60000); // Actualizar cada minuto

    return () => clearInterval(timer);
  }, [notification.timestamp]);

  const NotificationContent = () => (
    <div className={cx("notification-item__content")}>
      <div className={cx("notification-item__header")}>
        <h4 className={cx("notification-item__title")}>{content.title}</h4>
        <div className={cx("notification-item__variant-wrapper")}>
          <span
            className={cx(
              "notification-item__variant-label",
              `notification-item__variant-label--${notification.variant}`
            )}
          >
            <IconComponent className={cx("notification-item__variant-icon")} />
            {variantLabels[notification.variant]}
          </span>
        </div>
      </div>
      <p className={cx("notification-item__description")}>
        {content.description}
      </p>
      <div className={cx("notification-item__footer")}>
        <span className={cx("notification-item__timestamp")}>{timestamp}</span>
        <span className={cx("notification-item__separator")}>•</span>
        <span className={cx("notification-item__priority")}>
          {notification.priority}
        </span>
      </div>
    </div>
  );

  const commonClassNames = cx("notification-item", {
    [`notification-item--${notification.priority}`]: true,
    "notification-item--unread": !notification.read,
  });

  if (notification.link) {
    return (
      <Link
        href={notification.link}
        className={cx(commonClassNames, "notification-item--link")}
        onClick={(e) => {
          e.preventDefault();
          if (onClick) {
            onClick(notification.id);
          }
          window.location.href = notification.link as string;
        }}
      >
        <NotificationContent />
      </Link>
    );
  }

  return (
    <div className={commonClassNames}>
      <NotificationContent />
    </div>
  );
};

export default NotificationItem;
