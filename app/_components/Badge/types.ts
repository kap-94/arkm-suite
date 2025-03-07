type BadgeVariant = "status" | "tag" | "counter" | "custom";
type BadgeSize = "small" | "medium" | "large";
type BadgeStatus =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "inProgress"
  | "onHold"
  | "completed"
  | "cancelled"
  | "delayed"
  | "atRisk"
  | "notStarted";

interface BadgeTheme {
  type: "light" | "dark" | "custom";
  colors?: {
    background?: string;
    text?: string;
    border?: string;
    icon?: string;
  };
}

interface BadgeProps {
  variant?: BadgeVariant;
  status?: BadgeStatus | string;
  label: string;
  size?: BadgeSize;
  theme?: BadgeTheme;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}
