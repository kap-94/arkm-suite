export type NotificationVariant =
  | "status"
  | "progress"
  | "team"
  | "milestone"
  | "comment"
  | "file"
  | "mention";

export interface BaseNotification {
  id: string;
  variant: NotificationVariant;
  projectId: string;
  projectName: string;
  priority: "low" | "medium" | "high";
  read: boolean;
  timestamp: Date;
  link?: string;
}

interface StatusNotification extends BaseNotification {
  variant: "status";
  previousStatus: string;
  newStatus: string;
  reason?: string;
}

interface ProgressNotification extends BaseNotification {
  variant: "progress";
  previousProgress: number;
  newProgress: number;
  stageName: string;
  status: "success" | "warning" | "info" | "error";
}

interface TeamNotification extends BaseNotification {
  variant: "team";
  action: string;
  members: string[];
  role?: string;
}

interface MilestoneNotification extends BaseNotification {
  variant: "milestone";
  stageName: string;
  progress: number;
  status: "success" | "warning" | "info" | "error";
  nextMilestone?: string;
}

interface CommentNotification extends BaseNotification {
  variant: "comment";
  commentBy: string;
  commentPreview: string;
  threadId: string;
}

interface FileNotification extends BaseNotification {
  variant: "file";
  fileName: string;
  fileType: string;
  fileSize: string;
  action: "created" | "updated" | "shared" | "deleted";
}

interface MentionNotification extends BaseNotification {
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
