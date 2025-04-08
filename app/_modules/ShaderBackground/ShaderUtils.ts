// ShaderUtils.ts
// Utilidades para optimizar el rendimiento de los shaders y efectos 3D

/**
 * Función para throttle de eventos como scroll para mejorar rendimiento
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function throttled(this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      func.apply(this, args);
      lastRan = Date.now();
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Detecta si el dispositivo es de baja potencia para ajustar la calidad
 */
export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined") return false;

  // Detectar dispositivos móviles
  const isMobile: boolean =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Detectar navegadores que indican modo de ahorro de batería
  let isPowerSaveMode: boolean = false;

  try {
    isPowerSaveMode = Boolean(
      "navigator" in window &&
        "getBattery" in navigator &&
        // @ts-ignore: getBattery no está en el tipo Navigator estándar
        navigator.getBattery &&
        typeof navigator.getBattery === "function"
    );
  } catch (e) {
    isPowerSaveMode = false;
  }

  // También podemos comprobar el número de cores lógicos como indicador
  const hasLowCores: boolean = Boolean(
    navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
  );

  // Asegurarnos de que devolvemos un valor booleano
  return Boolean(isMobile || isPowerSaveMode || hasLowCores);
}

/**
 * Ajusta la calidad del renderizado según el dispositivo
 */
export function getOptimalRendererSettings() {
  const lowPower = isLowPowerDevice();

  return {
    pixelRatio: lowPower ? 1 : Math.min(2, window.devicePixelRatio || 1),
    antialias: !lowPower,
    precision: lowPower ? "lowp" : ("highp" as "lowp" | "mediump" | "highp"),
    powerPreference: "high-performance" as
      | "high-performance"
      | "low-power"
      | "default",
    preserveDrawingBuffer: false,
    meshDetail: lowPower ? 16 : 32, // Para geometrías como planos
  };
}

/**
 * Keyframes para animaciones basadas en scroll
 * Cada keyframe representa un estado específico en una posición de scroll
 */
export const storyKeyframes = [
  {
    progress: 0,
    state: "intro",
    frequency: 3.0,
    amplitude: 0.2,
    rgbShift: 0.01,
  },
  {
    progress: 0.2,
    state: "firstTransition",
    frequency: 5.0,
    amplitude: 0.4,
    rgbShift: 0.03,
  },
  {
    progress: 0.5,
    state: "midSection",
    frequency: 2.0,
    amplitude: 0.6,
    rgbShift: 0.05,
  },
  {
    progress: 0.8,
    state: "finale",
    frequency: 6.0,
    amplitude: 0.3,
    rgbShift: 0.07,
  },
];

/**
 * Interpola entre dos keyframes basado en el progreso actual
 */
export function interpolateKeyframes(progress: number) {
  // Encontrar los keyframes que rodean el progreso actual
  let lowerKeyframe = storyKeyframes[0];
  let upperKeyframe = storyKeyframes[storyKeyframes.length - 1];

  for (let i = 0; i < storyKeyframes.length - 1; i++) {
    if (
      progress >= storyKeyframes[i].progress &&
      progress < storyKeyframes[i + 1].progress
    ) {
      lowerKeyframe = storyKeyframes[i];
      upperKeyframe = storyKeyframes[i + 1];
      break;
    }
  }

  // Calcular el factor de interpolación normalizado entre los dos keyframes
  const range = upperKeyframe.progress - lowerKeyframe.progress;
  const normProgress =
    range > 0 ? (progress - lowerKeyframe.progress) / range : 0;

  // Interpolar valores
  return {
    state:
      progress >= (lowerKeyframe.progress + upperKeyframe.progress) / 2
        ? upperKeyframe.state
        : lowerKeyframe.state,
    frequency:
      lowerKeyframe.frequency +
      (upperKeyframe.frequency - lowerKeyframe.frequency) * normProgress,
    amplitude:
      lowerKeyframe.amplitude +
      (upperKeyframe.amplitude - lowerKeyframe.amplitude) * normProgress,
    rgbShift:
      lowerKeyframe.rgbShift +
      (upperKeyframe.rgbShift - lowerKeyframe.rgbShift) * normProgress,
  };
}
