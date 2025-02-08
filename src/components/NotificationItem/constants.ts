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
import type { Language } from "@/lib/config/i18n";

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

type VariantLabels = Record<NotificationType["variant"], string>;

const variantLabelsByLanguage: Record<Language, VariantLabels> = {
  en: {
    status: "Status Update",
    progress: "Progress",
    team: "Team Update",
    milestone: "Milestone",
    comment: "Comment",
    file: "File",
    mention: "Mention",
  },
  es: {
    status: "Actualización de Estado",
    progress: "Progreso",
    team: "Actualización de Equipo",
    milestone: "Hito",
    comment: "Comentario",
    file: "Archivo",
    mention: "Mención",
  },
};

export const getVariantLabel = (
  variant: NotificationType["variant"],
  language: Language = "en"
): string => {
  return variantLabelsByLanguage[language][variant];
};

export const variantColors = {
  status: {
    background: "#f3f4f6",
    text: "#374151",
  },
  progress: {
    background: "#ddd6fe",
    text: "#064e3b",
  },
  team: {
    background: "#fef3c7",
    text: "#854d0e",
  },
  milestone: {
    background: "#d1fae5",
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
