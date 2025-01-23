import {
  User,
  Settings,
  LogOut,
  Bell,
  Mail,
  HomeIcon,
  FileText,
  Calendar,
  BookOpen,
  HelpCircle,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  user: User,
  settings: Settings,
  logout: LogOut,
  bell: Bell,
  mail: Mail,
  home: HomeIcon,
  file: FileText,
  calendar: Calendar,
  book: BookOpen,
  help: HelpCircle,
  alert: AlertCircle,
};

export const getIconComponent = (
  iconName: string | undefined
): LucideIcon | undefined => {
  if (!iconName) return undefined;
  return ICON_MAP[iconName.toLowerCase()];
};
