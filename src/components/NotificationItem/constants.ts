// src/components/NotificationItem/constants.ts
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
import type { NotificationType } from "./types";

export const NotificationIcon: Record<
  NotificationType["variant"],
  React.ElementType
> = {
  status: AlertCircle,
  progress: Activity,
  team: Users,
  milestone: Target,
  comment: MessageSquare,
  file: File,
  mention: AtSign,
};

export const variantLabels: Record<NotificationType["variant"], string> = {
  status: "Status Update",
  progress: "Progress",
  team: "Team Update",
  milestone: "Milestone",
  comment: "Comment",
  file: "File",
  mention: "Mention",
};
