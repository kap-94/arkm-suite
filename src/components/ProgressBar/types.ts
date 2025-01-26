export interface ProgressBarTheme {
  type: "light" | "dark" | "custom";
  colors?: {
    background?: string;
    border?: string;
    track?: string;
    connector?: string;
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
  | "multi"
  | "adaptive";

export type Size = "default" | "small";

export interface ProgressBarProps {
  progress: number;
  gradientVariant?: GradientVariant;
  size?: Size;
  theme?: ProgressBarTheme;
}
