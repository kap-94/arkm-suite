"use client";

import React, { useEffect, useRef } from "react";
import {
  drawDefaultPattern,
  drawMinimalGridPattern,
  drawFlowFieldPattern,
  drawConcentricPattern,
  drawMinimalWavesPattern,
  drawModernAsymmetric,
  drawMinimalistFlow,
  drawProfessionalGrid,
  drawDynamicDots,
  drawGeometricFlow,
  drawFlowingCircuits,
  drawNeuralNetwork,
  drawDataFlow,
  drawQuantumField,
} from "./patternVariants";
import { PatternTheme, PatternColors } from "./types";

const defaultColors = {
  light: {
    background: "transparent",
    primary: "rgba(0, 0, 0, 0.15)",
    secondary: "rgba(0, 0, 0, 0.25)",
    accent: "rgba(0, 0, 0, 0.2)",
  },
  dark: {
    background: "transparent",
    primary: "rgba(255, 255, 255, 0.15)",
    secondary: "rgba(255, 255, 255, 0.25)",
    accent: "rgba(255, 255, 255, 0.2)",
  },
};

const defaultOpacity = {
  lines: 0.3,
  particles: 0.4,
  connections: 0.3,
  shapes: 0.35,
};

interface ModernPatternProps {
  theme?: PatternTheme;
}

export const ModernPattern: React.FC<ModernPatternProps> = ({
  theme = { type: "dark", variant: "default" },
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      angle: number;
    }>
  >([]);

  const getThemeColors = () => {
    if (theme.type === "custom" && theme.colors?.custom) {
      return theme.colors.custom;
    }

    const baseColors =
      theme.type === "light" ? defaultColors.light : defaultColors.dark;
    const themeColors = theme.colors?.[theme.type] || {};

    return {
      ...baseColors,
      ...themeColors,
    };
  };

  const getOpacity = (key: keyof typeof defaultOpacity) => {
    return theme.opacity?.[key] ?? defaultOpacity[key];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true, // Mejora el rendimiento
    });
    if (!ctx) return;

    let time = 0;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Reinicializar partículas al redimensionar
      particlesRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2,
      }));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = getThemeColors();
    const opacities = {
      lines: getOpacity("lines"),
      particles: getOpacity("particles"),
      connections: getOpacity("connections"),
      shapes: getOpacity("shapes"),
    };

    const drawParams = {
      ctx,
      canvas,
      time,
      colors,
      opacity: opacities,
      particles: particlesRef.current,
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch (theme.variant) {
        case "minimalGrid":
          drawMinimalGridPattern(drawParams);
          break;
        case "flowField":
          drawFlowFieldPattern(drawParams);
          break;
        case "concentric":
          drawConcentricPattern(drawParams);
          break;
        case "minimalWaves":
          drawMinimalWavesPattern(drawParams);
          break;
        case "modernAsymmetric":
          drawModernAsymmetric(drawParams);
          break;
        case "minimalistFlow":
          drawMinimalistFlow(drawParams);
          break;
        case "professionalGrid":
          drawProfessionalGrid(drawParams);
          break;
        case "dynamicDots":
          drawDynamicDots(drawParams);
          break;
        case "geometricFlow":
          drawGeometricFlow(drawParams);
          break;
        case "flowingCircuits":
          drawFlowingCircuits(drawParams);
          break;
        case "neuralNetwork":
          drawNeuralNetwork(drawParams);
          break;
        case "dataFlow":
          drawDataFlow(drawParams);
          break;
        case "quantumField":
          drawQuantumField(drawParams);
          break;
        default:
          drawDefaultPattern(drawParams);
          break;
      }

      drawParams.time += 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "0.75rem",
        opacity: 1,
      }}
    />
  );
};

export default ModernPattern;
