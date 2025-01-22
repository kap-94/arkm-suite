import type { LucideIcon } from "lucide-react";

export type ThemeType = "light" | "dark" | "custom";

export interface StatsCardTheme {
  type: ThemeType;
  colors?: {
    background?: string;
    border?: string;
    iconBackground?: string;
    iconBorder?: string;
    iconColor?: string;
    text?: string;
    secondaryText?: string;
    shadow?: string;
    pattern?: string;
    overlayGradient?: string;
  };
}

export interface GraphDataPoint {
  value: number;
  date?: string;
  label?: string;
  [key: string]: any;
}

export type CurveType =
  | "basis"
  | "basisClosed"
  | "basisOpen"
  | "linear"
  | "linearClosed"
  | "natural"
  | "monotoneX"
  | "monotoneY"
  | "monotone"
  | "step"
  | "stepBefore"
  | "stepAfter";

export interface GraphConfig {
  type?: "area" | "line" | "bar";
  height?: number;
  dataKey: string;
  showDots?: boolean;
  color?: string | null;
  curveType?: CurveType;
  gradientOpacity?: {
    start: number;
    end: number;
  };
  areaProps?: Record<string, any>;
}

export interface StatsCardProps {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  className?: string;
  theme?: StatsCardTheme;
  graphData?: GraphDataPoint[];
  graphConfig?: Partial<Omit<GraphConfig, "dataKey">> & { dataKey: string };
}
