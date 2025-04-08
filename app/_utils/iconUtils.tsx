import React from "react";
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
  Layers,
  Layers3,
} from "lucide-react";
import {
  Home,
  LayoutGrid,
  DollarSign,
  Info,
  Paintbrush,
  Code,
  ChevronDown,
  Briefcase,
  // BookOpen,
  Shield,
  Menu,
  X,
  LucideProps,
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
  layers: <Layers />,
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

// Tipo para definir nombres de iconos disponibles
export type IconName =
  | "home"
  | "features"
  | "pricing"
  | "info"
  | "design"
  | "code"
  | "dropDown"
  | "briefcase"
  | "layers"
  | "book"
  | "shield"
  | "menu"
  | "close";

// Mapeo de nombres de iconos a componentes de Lucide
const iconMap: Record<IconName, React.ComponentType<LucideProps>> = {
  home: Home,
  features: LayoutGrid,
  pricing: DollarSign,
  info: Info,
  design: Paintbrush,
  code: Code,
  layers: Layers3,
  dropDown: ChevronDown,
  briefcase: Briefcase,
  book: BookOpen,
  shield: Shield,
  menu: Menu,
  close: X,
};

/**
 * Convierte un nombre de icono en un componente de React Lucide
 * @param iconName Nombre del icono a renderizar
 * @param props Propiedades adicionales para el icono
 * @returns Componente de React con el icono solicitado o null si no existe
 */
export const createIconElement = (
  iconName: string | undefined,
  props: LucideProps = { size: 18, strokeWidth: 2 }
): React.ReactElement | undefined => {
  if (!iconName) return undefined;

  const IconComponent = iconMap[iconName as IconName];

  if (!IconComponent) {
    console.warn(`Icon '${iconName}' no encontrado en el mapeo de iconos`);
    return undefined;
  }

  return React.createElement(IconComponent, { ...props });
};
