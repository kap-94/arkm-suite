import { Stage, GradientVariant } from "./types";
import { hexToRgb } from "./utils";

// Define un tipo para las funciones generadoras de gradiente
type GradientGenerator = (stages: Stage[], progress: number) => string;

export const createProgressiveGradient: GradientGenerator = (
  stages,
  progress
) => {
  if (!stages.length) return "none";

  // Find current stage based on progress
  const currentStageIndex = stages.findIndex(
    (stage) => stage.threshold >= progress
  );

  // If progress is higher than all thresholds, use all stages
  const relevantStages =
    currentStageIndex === -1 ? stages : stages.slice(0, currentStageIndex + 1);

  const colorStops = relevantStages.map((stage, index) => {
    const percentage = (index / (relevantStages.length - 1)) * 100;
    return `${stage.color} ${percentage}%`;
  });

  return `linear-gradient(90deg, ${colorStops.join(", ")})`;
};

export const createThresholdGradient: GradientGenerator = (
  stages,
  progress
) => {
  if (!stages.length) return "none";

  const colorStops = stages.map(
    (stage) => `${stage.color} ${stage.threshold}%`
  );

  return `linear-gradient(90deg, ${colorStops.join(", ")})`;
};

export const createCurrentStageGradient: GradientGenerator = (
  stages,
  progress
) => {
  const currentStage =
    stages.find((stage) => stage.threshold >= progress) ||
    stages[stages.length - 1];
  const currentIndex = stages.indexOf(currentStage);
  const prevStage = stages[currentIndex - 1];

  if (!currentStage) return "none";

  if (prevStage) {
    return `linear-gradient(90deg, ${prevStage.color} 0%, ${currentStage.color} 100%)`;
  }

  return `linear-gradient(90deg, ${currentStage.color} 0%, ${currentStage.color} 100%)`;
};

export const createIntensityGradient: GradientGenerator = (
  stages,
  progress
) => {
  if (!stages.length) return "none";

  const currentStage =
    stages.find((stage) => stage.threshold >= progress) ||
    stages[stages.length - 1];
  const rgb = hexToRgb(currentStage.color || "#4d7fff");

  if (!rgb) return "none";

  return `linear-gradient(90deg,
    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 0%,
    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8) 50%,
    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1) 100%
  )`;
};

export const createAdaptiveGradient: GradientGenerator = (stages, progress) => {
  if (!stages.length) return "none";

  const currentStageIndex = stages.findIndex(
    (stage) => stage.threshold >= progress
  );
  const relevantStages = stages.slice(
    Math.max(0, currentStageIndex - 1),
    Math.min(currentStageIndex + 2, stages.length)
  );

  const colorStops = relevantStages.map((stage, index) => {
    const rgb = hexToRgb(stage.color || "#4d7fff");
    if (!rgb) return "";

    const opacity = 0.6 + index * 0.2;
    const position = (index / (relevantStages.length - 1)) * 100;

    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity}) ${position}%`;
  });

  return `linear-gradient(90deg, ${colorStops.join(", ")})`;
};

export const getProgressBarStyle = (
  stages: Stage[],
  progress: number,
  variant: GradientVariant = "progressive"
): React.CSSProperties => {
  const gradientGenerators: Record<GradientVariant, GradientGenerator> = {
    progressive: createProgressiveGradient,
    threshold: createThresholdGradient,
    current: createCurrentStageGradient,
    intensity: createIntensityGradient,
    adaptive: createAdaptiveGradient,
  };

  const generator = gradientGenerators[variant];
  const background = generator(stages, progress);

  return {
    background,
    width: `${progress}%`,
    transition: "width 0.5s ease-out, background 0.3s ease",
  };
};
