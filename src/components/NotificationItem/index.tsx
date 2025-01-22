// src/components/NotificationItem/NotificationItem.tsx
import React from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { formatDistanceToNow } from "date-fns";
import { NotificationIcon, variantLabels } from "./constants";
import { getNotificationContent } from "./utils";
import { NotificationItemProps, NotificationTheme } from "./types";
import styles from "./NotificationItem.module.scss";

export const defaultTheme: NotificationTheme = {
  type: "dark",
  colors: {
    background: "rgba(241, 228, 228, 0.02)",
    backgroundHover: "rgba(241, 228, 228, 0.05)",
    border: "rgba(241, 228, 228, 0.05)",
    iconColor: "rgb(241, 228, 228)",
    text: "rgb(241, 228, 228)",
    textSecondary: "rgba(241, 228, 228, 0.65)",
    typeBackground: "rgba(241, 228, 228, 0.05)",
  },
};

const variantColors = {
  status: {
    background: "#f3f4f6",
    text: "#374151",
  },
  progress: {
    background: "#d1fae5",
    text: "#064e3b",
  },
  team: {
    background: "#fef3c7",
    text: "#854d0e",
  },
  milestone: {
    background: "#ddd6fe",
    text: "#5b21b6",
  },
  comment: {
    background: "#e0f2fe",
    text: "#075985",
  },
  file: {
    background: "#f1f5f9",
    text: "#334155",
  },
  mention: {
    background: "#fae8ff",
    text: "#86198f",
  },
};

const cx = classNames.bind(styles);

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
  theme = defaultTheme,
  className,
}) => {
  const IconComponent = NotificationIcon[notification.variant];
  const content = getNotificationContent(notification);
  const [timestamp, setTimestamp] = React.useState(() =>
    formatDistanceToNow(notification.timestamp, { addSuffix: true })
  );

  React.useEffect(() => {
    const updateTimestamp = () => {
      setTimestamp(
        formatDistanceToNow(notification.timestamp, { addSuffix: true })
      );
    };
    const timer = setInterval(updateTimestamp, 60000);
    return () => clearInterval(timer);
  }, [notification.timestamp]);

  const variantStyle = variantColors[notification.variant];

  const NotificationContent = () => (
    <div className={cx("notification__content")}>
      <div className={cx("notification__header")}>
        <ThemedTypography
          variant="p2"
          fontWeight={600}
          className={cx("notification__title")}
          noWrap
        >
          {notification.projectName}
        </ThemedTypography>
        <div className={cx("notification__badge-wrapper")}>
          <span
            className={cx(
              "notification__badge",
              `notification__badge--${notification.variant}`
            )}
            style={{
              backgroundColor: variantStyle.background,
              color: variantStyle.text,
            }}
          >
            <IconComponent
              className={cx("notification__badge-icon")}
              style={{ color: variantStyle.text }}
            />
            <ThemedTypography
              variant="p3"
              className={cx("notification__badge-text")}
              textTransform="uppercase"
              style={{ color: variantStyle.text }}
            >
              {variantLabels[notification.variant]}
            </ThemedTypography>
          </span>
        </div>
      </div>
      <ThemedTypography
        variant="p3"
        color="secondary"
        className={cx("notification__description")}
      >
        {content}
      </ThemedTypography>
      <div className={cx("notification__meta")}>
        <ThemedTypography
          variant="p3"
          className={cx("notification__timestamp")}
        >
          {timestamp}
        </ThemedTypography>
        <span className={cx("notification__separator")}>•</span>
        <ThemedTypography
          variant="p3"
          className={cx(
            "notification__priority",
            `notification__priority--${notification.priority}`
          )}
        >
          {notification.priority}
        </ThemedTypography>
      </div>
    </div>
  );

  const commonClassNames = cx(
    "notification",
    className,
    `notification--theme-${theme.type}`,
    {
      "notification--unread": !notification.read,
    }
  );

  const customStyles =
    theme.type === "custom"
      ? ({
          "--notification-background": theme.colors?.background,
          "--notification-background-hover": theme.colors?.backgroundHover,
          "--notification-border": theme.colors?.border,
          "--notification-icon-color": theme.colors?.iconColor,
          "--notification-text": theme.colors?.text,
          "--notification-text-secondary": theme.colors?.textSecondary,
          "--notification-type-background": theme.colors?.typeBackground,
        } as React.CSSProperties)
      : undefined;

  if (notification.link) {
    return (
      <Link
        href={notification.link}
        className={cx(commonClassNames, "notification--link")}
        style={customStyles}
        onClick={(e) => {
          e.preventDefault();
          onClick?.(notification.id);
          window.location.href = notification.link as string;
        }}
      >
        <NotificationContent />
      </Link>
    );
  }

  return (
    <div
      className={commonClassNames}
      style={customStyles}
      onClick={() => onClick?.(notification.id)}
    >
      <NotificationContent />
    </div>
  );
};

export default NotificationItem;
