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
  Users,
  Folder,
  BarChart,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import type { ReactNode } from "react";

export const ICON_MAP: Record<string, ReactNode> = {
  user: <User />,
  settings: <Settings />,
  logout: <LogOut />,
  bell: <Bell />,
  mail: <Mail />,
  home: <HomeIcon />,
  file: <FileText />,
  calendar: <Calendar />,
  book: <BookOpen />,
  help: <HelpCircle />,
  alert: <AlertCircle />,
  users: <Users />,
  folder: <Folder />,
  barChart: <BarChart />,
  password: <Lock />,
  showPassword: <Eye />,
  hidePassword: <EyeOff />,
};

export const getIconComponent = (
  iconName: string | undefined
): ReactNode | undefined => {
  if (!iconName) return undefined;
  return ICON_MAP[iconName];
};
