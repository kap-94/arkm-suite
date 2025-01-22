// types.ts
export interface Stage {
  name: string;
  threshold: number;
  color?: string;
}

export type GradientVariant =
  | "progressive"
  | "threshold"
  | "current"
  | "intensity"
  | "adaptive";

export type ProgressVariant =
  | "default"
  | "steps"
  | "timeline"
  | "ladder"
  | "diagonal"
  | "stacked";

export type LabelStyle = "default" | "pill";

export type Size = "default" | "small";

export interface StageProgressProps {
  progress: number;
  stages: Stage[];
  variant?: ProgressVariant;
  type?: string;
  labelStyle?: LabelStyle;
  size?: Size;
  gradientVariant?: GradientVariant;
}

export interface VariantProps {
  progress: number;
  stages: Stage[];
  gradientVariant?: GradientVariant;
  size?: Size;
  activeStageIndex?: number | null;
  hoveredMarker?: number | null;
  onStageHover?: (index: number | null) => void;
}
