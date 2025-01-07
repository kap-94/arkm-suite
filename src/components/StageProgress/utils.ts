// utils.ts
import { Stage, Size } from './types';

/**
 * Ordena los stages por threshold de menor a mayor
 */
export const sortStages = (stages: Stage[]): Stage[] => {
  return [...stages].sort((a, b) => a.threshold - b.threshold);
};

/**
 * Obtiene el tamaño del icono basado en el tamaño del componente
 */
export const getIconSize = (size: Size = 'default'): number => {
  return size === 'small' ? 22 : 26;
};

/**
 * Convierte un color hexadecimal a RGB
 */
export const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Aplica un color por defecto si no se proporciona uno
 */
export const getStageColor = (stage: Stage, index: number): string => {
  if (stage.color) return stage.color;
  
  const defaultColors = [
    '#93c5fd', // Azul claro
    '#60a5fa', // Azul medio
    '#4d7fff', // Azul
    '#14b8a6', // Verde azulado
    '#4ade80'  // Verde
  ];
  
  return defaultColors[index % defaultColors.length];
};

/**
 * Calcula el progreso actual entre dos thresholds
 */
export const calculateProgress = (
  currentProgress: number,
  startThreshold: number,
  endThreshold: number
): number => {
  const range = endThreshold - startThreshold;
  const progress = currentProgress - startThreshold;
  return Math.min(100, Math.max(0, (progress / range) * 100));
};

/**
 * Obtiene el stage actual basado en el progreso
 */
export const getCurrentStage = (stages: Stage[], progress: number): Stage => {
  const sortedStages = sortStages(stages);
  return (
    sortedStages.find(stage => stage.threshold >= progress) ||
    sortedStages[sortedStages.length - 1]
  );
};

/**
 * Verifica si un stage está completado
 */
export const isStageComplete = (stage: Stage, progress: number): boolean => {
  return progress >= stage.threshold;
};

/**
 * Verifica si un stage está activo (es el stage actual)
 */
export const isStageActive = (
  stage: Stage,
  stages: Stage[],
  progress: number
): boolean => {
  const nextStage = stages.find(s => s.threshold > stage.threshold);
  return (
    progress >= stage.threshold &&
    (!nextStage || progress < nextStage.threshold)
  );
};

/**
 * Obtiene el porcentaje completado de un stage específico
 */
export const getStageProgress = (
  stage: Stage,
  stages: Stage[],
  progress: number
): number => {
  const stageIndex = stages.indexOf(stage);
  const prevThreshold = stageIndex > 0 ? stages[stageIndex - 1].threshold : 0;
  const stageRange = stage.threshold - prevThreshold;
  const stageProgress = progress - prevThreshold;
  
  return Math.min(100, Math.max(0, (stageProgress / stageRange) * 100));
};

/**
 * Formatea el porcentaje para mostrar
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Genera un ID único para elementos que lo necesiten
 */
export const generateUniqueId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Obtiene el total de stages completados
 */
export const getCompletedStagesCount = (stages: Stage[], progress: number): number => {
  return stages.filter(stage => progress >= stage.threshold).length;
};

/**
 * Calcula el progreso total como fracción (ej: "3/5")
 */
export const getProgressFraction = (stages: Stage[], progress: number): string => {
  const completed = getCompletedStagesCount(stages, progress);
  return `${completed}/${stages.length}`;
};