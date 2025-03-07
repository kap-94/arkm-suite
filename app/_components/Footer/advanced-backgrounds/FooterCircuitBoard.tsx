"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

interface FooterLiquidWaveGridProps {
  cellSize?: number;
  amplitude?: number;
  speed?: number;
  noiseScale?: number;
}

export default function FooterLiquidWaveGrid({
  cellSize = 30,
  amplitude = 15,
  speed = 1.0,
  noiseScale = 0.01,
}: FooterLiquidWaveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Color palette based on your specified colors
  const colors = {
    background: "#121212",
    primary: "#6366f1",
    secondary: "#818cf8",
    accent: "rgb(241, 228, 228)",
  };

  // Simplex noise implementation (simplified for this example)
  const simplex = {
    seed: Math.random() * 1000,
    noise2D: (x: number, y: number): number => {
      // Simple noise function that mimics simplex noise behavior
      // This is a simplified version for demo purposes
      const dot = x * 12.9898 + y * 78.233;
      const noise = (Math.sin(dot) * 43758.5453) % 1;
      const n1 =
        Math.sin(x * noiseScale + y * noiseScale * 0.8 + simplex.seed) * 0.5 +
        0.5;
      const n2 =
        Math.sin(
          x * noiseScale * 1.4 + y * noiseScale * 1.3 + simplex.seed + 100
        ) *
          0.5 +
        0.5;
      return (n1 + n2) * 0.5;
    },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (time: number) => {
      const t = time * 0.001 * speed;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Fill background
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Number of cells based on dimensions
      const numX = Math.ceil(dimensions.width / cellSize) + 2;
      const numY = Math.ceil(dimensions.height / cellSize) + 2;

      // Draw flowing wave grid
      for (let y = 0; y < numY; y++) {
        for (let x = 0; x < numX; x++) {
          const posX = x * cellSize - cellSize;
          const posY = y * cellSize - cellSize;

          // Generate noise for this position and time
          const noise = simplex.noise2D(x * 0.1, y * 0.1 + t * 0.2);
          const noise2 = simplex.noise2D(x * 0.2 + 100, y * 0.15 + t * 0.1);

          // Calculate wave offset
          const offsetX = Math.sin(y * 0.2 + t + noise * 5) * amplitude;
          const offsetY = Math.cos(x * 0.2 + t * 0.7 + noise2 * 5) * amplitude;

          // Determine cell color based on position and noise
          const colorChoice = (x + y) % 3;
          let cellColor;

          if (colorChoice === 0) {
            // Primary color with noise-based opacity
            const opacity = 0.05 + noise * 0.2;
            cellColor = `${colors.primary}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`;
          } else if (colorChoice === 1) {
            // Secondary color with noise-based opacity
            const opacity = 0.05 + noise2 * 0.15;
            cellColor = `${colors.secondary}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`;
          } else {
            // Accent color for highlights
            const opacity = 0.01 + noise * noise2 * 0.08;
            cellColor = `rgba(241, 228, 228, ${opacity})`;
          }

          // Draw liquid cell (rounded rectangle)
          const size = cellSize * (0.3 + noise * 0.4);
          const cornerRadius = size * 0.4;

          ctx.fillStyle = cellColor;

          // Draw special cells with unique styles
          if (noise > 0.7 && noise2 > 0.6) {
            // Draw circle for special emphasis
            ctx.beginPath();
            ctx.arc(
              posX + cellSize / 2 + offsetX,
              posY + cellSize / 2 + offsetY,
              size / 2,
              0,
              Math.PI * 2
            );
            ctx.fill();

            // Add glow effect
            const gradient = ctx.createRadialGradient(
              posX + cellSize / 2 + offsetX,
              posY + cellSize / 2 + offsetY,
              size / 4,
              posX + cellSize / 2 + offsetX,
              posY + cellSize / 2 + offsetY,
              size
            );

            gradient.addColorStop(0, `${colors.primary}40`);
            gradient.addColorStop(1, "rgba(99, 102, 241, 0)");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(
              posX + cellSize / 2 + offsetX,
              posY + cellSize / 2 + offsetY,
              size,
              0,
              Math.PI * 2
            );
            ctx.fill();
          } else {
            // Draw rounded rectangle for normal cells
            ctx.beginPath();
            ctx.moveTo(posX + offsetX + cornerRadius, posY + offsetY);
            ctx.lineTo(posX + offsetX + size - cornerRadius, posY + offsetY);
            ctx.arcTo(
              posX + offsetX + size,
              posY + offsetY,
              posX + offsetX + size,
              posY + offsetY + cornerRadius,
              cornerRadius
            );
            ctx.lineTo(
              posX + offsetX + size,
              posY + offsetY + size - cornerRadius
            );
            ctx.arcTo(
              posX + offsetX + size,
              posY + offsetY + size,
              posX + offsetX + size - cornerRadius,
              posY + offsetY + size,
              cornerRadius
            );
            ctx.lineTo(posX + offsetX + cornerRadius, posY + offsetY + size);
            ctx.arcTo(
              posX + offsetX,
              posY + offsetY + size,
              posX + offsetX,
              posY + offsetY + size - cornerRadius,
              cornerRadius
            );
            ctx.lineTo(posX + offsetX, posY + offsetY + cornerRadius);
            ctx.arcTo(
              posX + offsetX,
              posY + offsetY,
              posX + offsetX + cornerRadius,
              posY + offsetY,
              cornerRadius
            );
            ctx.closePath();
            ctx.fill();
          }
        }
      }

      // Add floating light streaks
      ctx.strokeStyle = `${colors.accent}20`; // Very light opacity
      ctx.lineWidth = 1;

      for (let i = 0; i < 5; i++) {
        const startX =
          Math.sin(t * 0.3 + i * 2) * dimensions.width * 0.5 +
          dimensions.width * 0.5;
        const startY =
          Math.sin(t * 0.2 + i) * dimensions.height * 0.3 +
          dimensions.height * 0.5;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // Create bezier curve for light streak
        const cp1x = startX + Math.sin(t * 0.5 + i) * 200;
        const cp1y = startY + Math.cos(t * 0.4 + i) * 100;
        const cp2x = startX + Math.cos(t * 0.6 + i) * 300;
        const cp2y = startY + Math.sin(t * 0.3 + i) * 200;
        const endX = startX + Math.cos(t * 0.2 + i) * 400;
        const endY = startY + Math.sin(t * 0.7 + i) * 300;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.stroke();
      }

      // Add subtle overlay gradient
      const overlay = ctx.createLinearGradient(0, 0, 0, dimensions.height);
      overlay.addColorStop(0, "rgba(18, 18, 18, 0.4)");
      overlay.addColorStop(0.6, "rgba(18, 18, 18, 0)");
      overlay.addColorStop(1, "rgba(18, 18, 18, 0.6)");

      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      requestRef.current = requestAnimationFrame(drawFrame);
    };

    requestRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [dimensions, cellSize, amplitude, speed, noiseScale, colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const handleResize = () => {
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      const dpi = window.devicePixelRatio || 1;

      canvas.width = w * dpi;
      canvas.height = h * dpi;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      setDimensions({ width: w, height: h });

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpi, dpi);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cx("footer__particles-canvas")}
      aria-hidden="true"
    />
  );
}
