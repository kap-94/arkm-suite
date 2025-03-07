export type ThemeType = "light" | "dark" | "custom";

export interface StageProgressTheme {
  type: "light" | "dark" | "custom";
  colors?: {
    background?: string;
    border?: string;
    track?: string;
    connector?: string;
    timelineCircle?: string;
    timelineMarker?: string;
    progress?: string[];
  };
}

export interface Stage {
  name: string;
  threshold: number;
  completed: boolean;
  color?: string;
}

export type GradientVariant =
  | "progressive"
  | "threshold"
  | "current"
  | "intensity"
  | "adaptive";

export type ProgressVariant = "timeline";

export type LabelStyle = "default" | "pill";
export type Size = "default" | "small";

export interface StageProgressProps {
  progress: number;
  stages: Stage[];
  variant?: ProgressVariant;
  type?: string;
  labelStyle?: LabelStyle;
  size?: Size;
  theme?: StageProgressTheme;
  gradientVariant?: GradientVariant;
}

export interface VariantProps {
  type?: string;
  progress: number;
  stages: Stage[];
  gradientVariant?: GradientVariant;
  size?: Size;
  theme?: StageProgressTheme;
  activeStageIndex?: number | null;
  hoveredMarker?: number | null;
  onStageHover?: (index: number | null) => void;
}
