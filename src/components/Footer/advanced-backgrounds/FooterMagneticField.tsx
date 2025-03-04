"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Vector {
  x: number;
  y: number;
}

interface FooterMagneticFieldProps {
  lineCount?: number;
  pointsPerLine?: number;
  fieldStrength?: number;
}

export default function FooterMagneticField({
  lineCount = 28,
  pointsPerLine = 20,
  fieldStrength = 30,
}: FooterMagneticFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[][]>([]);
  const requestRef = useRef<number>();
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Colors
  const colors = {
    background: "#000000",
    primaryLine: "#6366f1",
    secondaryLine: "#818cf8",
    highlight: "rgb(241, 228, 228)",
    dark: "rgba(18, 18, 18, 0.8)",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Initialize points for field lines
    const initializePoints = () => {
      const lines: Point[][] = [];

      for (let i = 0; i < lineCount; i++) {
        const points: Point[] = [];
        const angleOffset = (Math.PI * 2 * i) / lineCount;

        // Create starting points in a circle
        const centerX = dimensions.width * 0.5;
        const centerY = dimensions.height * 0.5;
        const radius = Math.min(dimensions.width, dimensions.height) * 0.4;

        const startX = centerX + Math.cos(angleOffset) * radius;
        const startY = centerY + Math.sin(angleOffset) * radius;

        // Create points along the line
        for (let j = 0; j < pointsPerLine; j++) {
          const t = j / (pointsPerLine - 1);
          const x = startX + (centerX - startX) * t;
          const y = startY + (centerY - startY) * t;

          points.push({
            x,
            y,
            vx: 0,
            vy: 0,
          });
        }

        lines.push(points);
      }

      pointsRef.current = lines;
    };

    const drawFrame = () => {
      // Clear canvas with background
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Skip if no points yet
      if (pointsRef.current.length === 0) return;

      // Update all points
      const lines = pointsRef.current;
      const cursor = cursorRef.current;

      // Update physics for each point
      lines.forEach((line, lineIndex) => {
        line.forEach((point, pointIndex) => {
          // Skip first point to anchor the line
          if (pointIndex === 0) return;

          // Get previous point for line constraints
          const prevPoint = line[pointIndex - 1];

          // Calculate mouse repulsion force
          const dx = point.x - cursor.x;
          const dy = point.y - cursor.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          // Only apply force within certain radius
          const mouseRadius = 150;
          if (dist < mouseRadius) {
            const force = ((mouseRadius - dist) / mouseRadius) * fieldStrength;
            point.vx += (dx / dist) * force * 0.1;
            point.vy += (dy / dist) * force * 0.1;
          }

          // Calculate line constraint force
          const idealDist = 10; // Distance between points
          const lineDx = point.x - prevPoint.x;
          const lineDy = point.y - prevPoint.y;
          const lineDistSq = lineDx * lineDx + lineDy * lineDy;
          const lineDist = Math.sqrt(lineDistSq);

          // Apply constraint force
          const constraintForce = (lineDist - idealDist) * 0.03;
          const constraintDx = (lineDx / lineDist) * constraintForce;
          const constraintDy = (lineDy / lineDist) * constraintForce;

          point.vx -= constraintDx;
          point.vy -= constraintDy;

          // Apply slight attraction to original position
          const originalX =
            dimensions.width * 0.5 +
            Math.cos((Math.PI * 2 * lineIndex) / lineCount) *
              Math.min(dimensions.width, dimensions.height) *
              0.4 *
              (1 - pointIndex / pointsPerLine);

          const originalY =
            dimensions.height * 0.5 +
            Math.sin((Math.PI * 2 * lineIndex) / lineCount) *
              Math.min(dimensions.width, dimensions.height) *
              0.4 *
              (1 - pointIndex / pointsPerLine);

          point.vx += (originalX - point.x) * 0.01;
          point.vy += (originalY - point.y) * 0.01;

          // Apply velocity
          point.x += point.vx;
          point.y += point.vy;

          // Apply damping
          point.vx *= 0.94;
          point.vy *= 0.94;
        });
      });

      // Render the field lines
      lines.forEach((line, lineIndex) => {
        // Determine color based on index
        const isEven = lineIndex % 2 === 0;
        const baseColor = isEven ? colors.primaryLine : colors.secondaryLine;

        // Draw the line
        ctx.beginPath();
        line.forEach((point, pointIndex) => {
          if (pointIndex === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });

        // Apply gradient stroke
        const gradient = ctx.createLinearGradient(
          line[0].x,
          line[0].y,
          line[line.length - 1].x,
          line[line.length - 1].y
        );

        gradient.addColorStop(0, `${baseColor}40`); // Start with low opacity
        gradient.addColorStop(0.5, `${baseColor}80`); // Higher in middle
        gradient.addColorStop(1, `${baseColor}40`); // Back to low at end

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Add glow effect for certain lines
        if (lineIndex % 4 === 0) {
          ctx.strokeStyle = `${baseColor}30`;
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        // Draw points at specific intervals
        if (lineIndex % 3 === 0) {
          line.forEach((point, pointIndex) => {
            if (pointIndex % 3 === 0) {
              ctx.fillStyle = isEven
                ? colors.primaryLine
                : colors.secondaryLine;
              ctx.beginPath();
              ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }
      });

      // Create a subtle vignette effect
      const vignetteGradient = ctx.createRadialGradient(
        dimensions.width * 0.5,
        dimensions.height * 0.5,
        0,
        dimensions.width * 0.5,
        dimensions.height * 0.5,
        Math.max(dimensions.width, dimensions.height) * 0.8
      );

      vignetteGradient.addColorStop(0, "rgba(18, 18, 18, 0)");
      vignetteGradient.addColorStop(1, "rgba(18, 18, 18, 0.6)");

      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Create glow effect around cursor
      if (cursor.x < 9000) {
        // Only if cursor is in canvas
        const glowGradient = ctx.createRadialGradient(
          cursor.x,
          cursor.y,
          0,
          cursor.x,
          cursor.y,
          100
        );

        glowGradient.addColorStop(0, "rgba(99, 102, 241, 0.15)");
        glowGradient.addColorStop(0.5, "rgba(99, 102, 241, 0.05)");
        glowGradient.addColorStop(1, "rgba(99, 102, 241, 0)");

        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      }

      requestRef.current = requestAnimationFrame(drawFrame);
    };

    initializePoints();
    requestRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [dimensions, lineCount, pointsPerLine, fieldStrength, colors]);

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

      // Reinitialize points array on resize
      pointsRef.current = [];
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      cursorRef.current = { x: 9999, y: 9999 };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
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
