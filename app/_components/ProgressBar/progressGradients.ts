type GradientVariant =
  | "progressive"
  | "threshold"
  | "current"
  | "intensity"
  | "adaptive"
  | "multi";
type GradientStop = { color: string; position: number };
type GradientGenerator = (progress: number, color?: string) => string;

export const createMultiColorGradient = (
  progress: number,
  stops: GradientStop[]
): string => {
  if (!stops.length) return "none";

  const sortedStops = [...stops].sort((a, b) => a.position - b.position);

  const gradientStops = sortedStops.map((stop) => {
    const rgb = hexToRgb(stop.color);
    if (!rgb) return "";

    const position = (stop.position / 100) * progress;
    return `${stop.color} ${position}%`;
  });

  return `linear-gradient(90deg, ${gradientStops.join(
    ", "
  )}, transparent ${progress}%)`;
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const createProgressiveGradient: GradientGenerator = (
  progress,
  color = "#4d7fff"
) => {
  return `linear-gradient(90deg, ${color} ${progress}%, transparent ${progress}%)`;
};

export const createThresholdGradient: GradientGenerator = (
  progress,
  color = "#4d7fff"
) => {
  const steps = [0, 25, 50, 75, 100];
  const colorStops = steps.map(
    (step) => `${step <= progress ? color : "transparent"} ${step}%`
  );
  return `linear-gradient(90deg, ${colorStops.join(", ")})`;
};

export const createCurrentGradient: GradientGenerator = (
  progress,
  color = "#4d7fff"
) => {
  return `linear-gradient(90deg, ${color} 0%, ${color} ${progress}%, transparent ${progress}%)`;
};

export const createIntensityGradient: GradientGenerator = (
  progress,
  color = "#4d7fff"
) => {
  const rgb = hexToRgb(color);
  if (!rgb) return "none";

  return `linear-gradient(90deg,
    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 0%,
    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8) ${progress / 2}%,
    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1) ${progress}%,
    transparent ${progress}%
  )`;
};

export const createAdaptiveGradient: GradientGenerator = (
  progress,
  color = "#4d7fff"
) => {
  const rgb = hexToRgb(color);
  if (!rgb) return "none";

  return `linear-gradient(90deg,
    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 0%,
    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8) ${progress}%,
    rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1) ${progress}%,
    transparent ${progress}%
  )`;
};

export const getProgressBarStyle = (
  progress: number,
  colorOrStops: string | GradientStop[] = "#4d7fff",
  variant: GradientVariant = "progressive"
): React.CSSProperties => {
  const gradientGenerators: Record<GradientVariant, any> = {
    progressive: (prog: number, color: string) =>
      `linear-gradient(90deg, ${color} ${prog}%, transparent ${prog}%)`,

    threshold: (prog: number, color: string) => {
      const steps = [0, 25, 50, 75, 100];
      const colorStops = steps.map(
        (step) => `${step <= prog ? color : "transparent"} ${step}%`
      );
      return `linear-gradient(90deg, ${colorStops.join(", ")})`;
    },

    current: (prog: number, color: string) =>
      `linear-gradient(90deg, ${color} 0%, ${color} ${prog}%, transparent ${prog}%)`,

    intensity: (prog: number, color: string) => {
      const rgb = hexToRgb(color);
      if (!rgb) return "none";
      return `linear-gradient(90deg,
        rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 0%,
        rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8) ${prog / 2}%,
        rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1) ${prog}%,
        transparent ${prog}%
      )`;
    },

    adaptive: (prog: number, color: string) => {
      const rgb = hexToRgb(color);
      if (!rgb) return "none";
      return `linear-gradient(90deg,
        rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 0%,
        rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8) ${prog}%,
        rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1) ${prog}%,
        transparent ${prog}%
      )`;
    },

    multi: (prog: number, stops: GradientStop[]) => {
      if (!stops.length) return "none";
      const sortedStops = [...stops].sort((a, b) => a.position - b.position);
      const gradientStops = sortedStops.map((stop) => {
        const position = (stop.position / 100) * prog;
        return `${stop.color} ${position}%`;
      });
      return `linear-gradient(90deg, ${gradientStops.join(
        ", "
      )}, transparent ${prog}%)`;
    },
  };

  const generator = gradientGenerators[variant];
  const background = generator(progress, colorOrStops);

  return {
    background,
    width: "100%",
    transition: "background 0.3s ease",
  };
};
