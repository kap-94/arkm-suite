export type PatternThemeType = "light" | "dark" | "custom";

export type PatternVariant =
  | "default"
  | "minimalGrid"
  | "flowField"
  | "concentric"
  | "minimalWaves"
  | "modernAsymmetric"
  | "minimalistFlow"
  | "professionalGrid"
  | "dynamicDots"
  | "geometricFlow"
  | "flowingCircuits"
  | "neuralNetwork"
  | "dataFlow"
  | "quantumField";

export interface PatternColors {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
}

export interface PatternTheme {
  type: PatternThemeType;
  variant?: PatternVariant;
  colors?: {
    light?: Partial<PatternColors>;
    dark?: Partial<PatternColors>;
    custom?: PatternColors;
  };
  opacity?: {
    lines?: number;
    particles?: number;
    connections?: number;
    shapes?: number;
  };
}
