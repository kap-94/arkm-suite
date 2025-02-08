// src/components/NotificationItem/types.ts
import { ProjectReference } from "@/types/models/Common";
import type { LucideIcon } from "lucide-react";

export type NotificationVariant =
  | "status"
  | "progress"
  | "team"
  | "milestone"
  | "comment"
  | "file"
  | "mention";

export type ThemeType = "light" | "dark" | "custom";

export interface NotificationTheme {
  type: ThemeType;
  colors?: {
    background?: string;
    backgroundHover?: string;
    border?: string;
    iconColor?: string;
    text?: string;
    textSecondary?: string;
    typeBackground?: string;
  };
}

export interface BaseNotification {
  id: string;
  variant: NotificationVariant;
  project: ProjectReference;
  priority: "low" | "medium" | "high";
  read: boolean;
  timestamp: Date;
  link?: string;
}

export interface StatusNotification extends BaseNotification {
  variant: "status";
  previousStatus: string;
  newStatus: string;
  reason?: string;
}

export interface ProgressNotification extends BaseNotification {
  variant: "progress";
  previousProgress: number;
  newProgress: number;
  stageName: string;
  status: "success" | "warning" | "info" | "error";
}

export interface TeamNotification extends BaseNotification {
  variant: "team";
  action: string;
  members: string[];
  role?: string;
}

export interface MilestoneNotification extends BaseNotification {
  variant: "milestone";
  stageName: string;
  progress: number;
  status: "success" | "warning" | "info" | "error";
  nextMilestone?: string;
}

export interface CommentNotification extends BaseNotification {
  variant: "comment";
  commentBy: string;
  commentPreview: string;
  threadId: string;
}

export interface FileNotification extends BaseNotification {
  variant: "file";
  fileName: string;
  fileType: string;
  fileSize: string;
  action: "created" | "updated" | "shared" | "deleted";
}

export interface MentionNotification extends BaseNotification {
  variant: "mention";
  mentionedBy: string;
  context: string;
  threadId: string;
}

export type NotificationType =
  | StatusNotification
  | ProgressNotification
  | TeamNotification
  | MilestoneNotification
  | CommentNotification
  | FileNotification
  | MentionNotification;

export interface NotificationItemProps {
  notification: NotificationType;
  onClick?: (id: string) => void;
  theme?: NotificationTheme;
  className?: string;
}
