// ModernPattern.tsx
"use client";

import React, { useEffect, useRef } from "react";

export type PatternThemeType = "light" | "dark" | "custom";

export interface PatternColors {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
}

export interface PatternTheme {
  type: PatternThemeType;
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

const defaultColors = {
  light: {
    background: "#ffffff",
    primary: "rgba(0, 0, 0, 0.07)",
    secondary: "rgba(0, 0, 0, 0.15)",
    accent: "rgba(0, 0, 0, 0.08)",
  },
  dark: {
    background: "#000000",
    primary: "rgba(255, 255, 255, 0.07)",
    secondary: "rgba(255, 255, 255, 0.15)",
    accent: "rgba(255, 255, 255, 0.08)",
  },
};

const defaultOpacity = {
  lines: 0.07,
  particles: 0.15,
  connections: 0.15,
  shapes: 0.08,
};

interface ModernPatternProps {
  theme?: PatternTheme;
}

export const ModernPattern: React.FC<ModernPatternProps> = ({
  theme = { type: "dark" },
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = getThemeColors();
    const particleCount = 50;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1,
      angle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing lines
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const yOffset = (canvas.height / 4) * i;
        ctx.moveTo(0, yOffset);
        for (let x = 0; x < canvas.width; x += 10) {
          const y = yOffset + Math.sin((x + time) * 0.02) * 20;
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw particles and connections
      particles.forEach((particle, i) => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        if (particle.x < 0 || particle.x > canvas.width)
          particle.angle = Math.PI - particle.angle;
        if (particle.y < 0 || particle.y > canvas.height)
          particle.angle = -particle.angle;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.secondary;
        ctx.fill();

        particles.slice(i + 1).forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - distance / 100) * getOpacity("connections");
            ctx.strokeStyle = `rgba(${parseInt(colors.secondary)}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = 100;
      const rotation = time * 0.0005;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = `rgba(${parseInt(colors.accent)}, ${
          getOpacity("shapes") - i * 0.02
        })`;
        ctx.lineWidth = 1;
        ctx.strokeRect(
          (-size * (1 + i * 0.5)) / 2,
          (-size * (1 + i * 0.5)) / 2,
          size * (1 + i * 0.5),
          size * (1 + i * 0.5)
        );
      }
      ctx.restore();

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(
          centerX,
          centerY,
          size * (0.8 + i * 0.3) + Math.sin(time * 0.002) * 10,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(${parseInt(colors.accent)}, ${
          getOpacity("shapes") - i * 0.02
        })`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      time += 1;
      animationFrameId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "0.75rem",
        opacity: 0.9,
      }}
    />
  );
};

export default ModernPattern;
