import type { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type ThemeType = "light" | "dark" | "custom";
export type IllustrationPosition = "top" | "bottom" | "background";

export interface IllustrationConfig {
  node: ReactNode;
  position?: IllustrationPosition;
  className?: string;
}

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

export interface BaseGraphConfig {
  height?: number;
  dataKey: string;
  color?: string | null;
  curveType?: CurveType;
  isAnimationActive?: boolean;
  animationDuration?: number;
}

export interface AreaGraphConfig extends BaseGraphConfig {
  type: "area";
  gradientOpacity?: {
    start: number;
    end: number;
  };
  areaProps?: {
    strokeWidth?: number;
    stroke?: string;
    fill?: string;
    fillOpacity?: number;
    activeDot?: boolean | object;
  };
}

export interface LineGraphConfig extends BaseGraphConfig {
  type: "line";
  showDots?: boolean;
  lineProps?: {
    strokeWidth?: number;
    stroke?: string;
    strokeDasharray?: string;
    dot?: boolean | object;
    activeDot?: boolean | object;
  };
}

export interface BarGraphConfig extends BaseGraphConfig {
  type: "bar";
  barProps?: {
    fill?: string;
    fillOpacity?: number;
    stroke?: string;
    strokeWidth?: number;
    radius?: [number, number, number, number];
    maxBarSize?: number;
    minBarSize?: number;
    background?: boolean;
    stackId?: string;
  };
}

export type GraphConfig = AreaGraphConfig | LineGraphConfig | BarGraphConfig;
export interface StatsCardProps {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  className?: string;
  theme?: StatsCardTheme;
  graphData?: GraphDataPoint[];
  graphConfig?: GraphConfig;
  illustration?: IllustrationConfig;
}
