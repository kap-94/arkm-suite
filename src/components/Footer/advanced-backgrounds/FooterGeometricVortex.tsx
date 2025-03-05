"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

interface Vector {
  x: number;
  y: number;
}

interface Triangle {
  p1: Vector;
  p2: Vector;
  p3: Vector;
  vel: Vector;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  color: string;
  targetScale: number;
}

interface FooterGeometricVortexProps {
  triangleCount?: number;
  mouseInfluence?: number;
}

export default function FooterGeometricVortex({
  triangleCount = 35,
  mouseInfluence = 0.15,
}: FooterGeometricVortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trianglesRef = useRef<Triangle[]>([]);
  const requestRef = useRef<number>();
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const lastCursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const cursorVelocityRef = useRef<Vector>({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Colors
  const colors = {
    background: "#000000",
    primary: "#6366f1",
    secondary: "#818cf8",
    accent: "rgb(241, 228, 228)",
  };

  // Create triangles with specified attributes
  const createTriangle = (): Triangle => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const radius =
      Math.random() * Math.min(dimensions.width, dimensions.height) * 0.4;
    const angle = Math.random() * Math.PI * 2;

    // Position relative to center
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // Triangle size
    const scale = 10 + Math.random() * 40;

    // Random color from palette
    const colorIndex = Math.floor(Math.random() * 3);
    let color;
    if (colorIndex === 0) color = colors.primary;
    else if (colorIndex === 1) color = colors.secondary;
    else color = colors.accent;

    return {
      p1: { x: -1, y: -1 },
      p2: { x: 1, y: -1 },
      p3: { x: 0, y: 1 },
      vel: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
      },
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      scale,
      targetScale: scale,
      opacity: 0.1 + Math.random() * 0.5,
      color,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Initialize triangles
    const initializeTriangles = () => {
      const triangles: Triangle[] = [];
      for (let i = 0; i < triangleCount; i++) {
        triangles.push(createTriangle());
      }
      trianglesRef.current = triangles;
    };

    const drawFrame = (timestamp: number) => {
      // Clear canvas with background
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Skip if no triangles yet
      if (trianglesRef.current.length === 0) return;

      // Calculate cursor velocity
      const cursor = cursorRef.current;
      const lastCursor = lastCursorRef.current;
      cursorVelocityRef.current = {
        x: (cursor.x - lastCursor.x) * 0.1,
        y: (cursor.y - lastCursor.y) * 0.1,
      };
      lastCursorRef.current = { ...cursor };

      // Update and render triangles
      const triangles = trianglesRef.current;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Create vortex field vectors
      const createField = (x: number, y: number) => {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Base field is rotational around center
        let fx = -Math.sin(angle) * 0.2;
        let fy = Math.cos(angle) * 0.2;

        // Add mouse influence
        const mdx = x - cursor.x;
        const mdy = y - cursor.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mouseRadius = 200;

        if (mdist < mouseRadius) {
          const mfactor =
            ((mouseRadius - mdist) / mouseRadius) * mouseInfluence;

          // Add repulsion from mouse
          fx += (mdx / mdist) * mfactor;
          fy += (mdy / mdist) * mfactor;

          // Add influence from mouse velocity
          fx += cursorVelocityRef.current.x * mfactor * 0.2;
          fy += cursorVelocityRef.current.y * mfactor * 0.2;
        }

        return { x: fx, y: fy };
      };

      // Sort triangles by scale for proper layering
      triangles.sort((a, b) => a.scale - b.scale);

      // Update each triangle
      triangles.forEach((triangle, i) => {
        // Sample field at triangle position
        const pos = {
          x: triangle.p1.x + triangle.p2.x + triangle.p3.x / 3,
          y: triangle.p1.y + triangle.p2.y + triangle.p3.y / 3,
        };

        const field = createField(pos.x, pos.y);

        // Apply field to velocity with damping
        triangle.vel.x = triangle.vel.x * 0.95 + field.x * 0.05;
        triangle.vel.y = triangle.vel.y * 0.95 + field.y * 0.05;

        // Update rotation
        triangle.rotation += triangle.rotationSpeed;

        // Update position based on velocity
        const moveTriangle = (p: Vector) => {
          p.x += triangle.vel.x;
          p.y += triangle.vel.y;

          // Wrap around edges with damping
          const padding = triangle.scale * 3;

          if (p.x < -padding) {
            p.x = dimensions.width + padding;
            triangle.vel.x *= 0.5;
          } else if (p.x > dimensions.width + padding) {
            p.x = -padding;
            triangle.vel.x *= 0.5;
          }

          if (p.y < -padding) {
            p.y = dimensions.height + padding;
            triangle.vel.y *= 0.5;
          } else if (p.y > dimensions.height + padding) {
            p.y = -padding;
            triangle.vel.y *= 0.5;
          }
        };

        // Apply velocity to all points
        moveTriangle(triangle.p1);
        moveTriangle(triangle.p2);
        moveTriangle(triangle.p3);

        // Check if near mouse
        const triangleCenter = {
          x: (triangle.p1.x + triangle.p2.x + triangle.p3.x) / 3,
          y: (triangle.p1.y + triangle.p2.y + triangle.p3.y) / 3,
        };

        const dxMouse = triangleCenter.x - cursor.x;
        const dyMouse = triangleCenter.y - cursor.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // Scale effect when near mouse
        if (distMouse < 200) {
          triangle.targetScale = triangle.scale * 1.2;
        } else {
          triangle.targetScale = triangle.scale;
        }

        // Smoothly adjust scale
        triangle.scale = triangle.scale * 0.95 + triangle.targetScale * 0.05;

        // Draw the triangle
        ctx.save();

        // Use triangle center for transformations
        ctx.translate(triangleCenter.x, triangleCenter.y);
        ctx.rotate(triangle.rotation);
        ctx.scale(triangle.scale, triangle.scale);

        // Draw with semi-transparency
        ctx.globalAlpha = triangle.opacity;

        // Fill with color
        ctx.fillStyle = triangle.color;
        ctx.beginPath();
        ctx.moveTo(
          triangle.p1.x - triangleCenter.x,
          triangle.p1.y - triangleCenter.y
        );
        ctx.lineTo(
          triangle.p2.x - triangleCenter.x,
          triangle.p2.y - triangleCenter.y
        );
        ctx.lineTo(
          triangle.p3.x - triangleCenter.x,
          triangle.p3.y - triangleCenter.y
        );
        ctx.closePath();
        ctx.fill();

        // Add stroke for definition
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 0.05;
        ctx.stroke();

        ctx.restore();
      });

      // Add subtle radial gradient overlay
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(dimensions.width, dimensions.height) * 0.7
      );

      gradient.addColorStop(0, "rgba(18, 18, 18, 0)");
      gradient.addColorStop(1, "rgba(18, 18, 18, 0.7)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Add cursor glow
      if (cursor.x < 9000) {
        const cursorGlow = ctx.createRadialGradient(
          cursor.x,
          cursor.y,
          0,
          cursor.x,
          cursor.y,
          100
        );

        cursorGlow.addColorStop(0, "rgba(99, 102, 241, 0.2)");
        cursorGlow.addColorStop(0.5, "rgba(99, 102, 241, 0.1)");
        cursorGlow.addColorStop(1, "rgba(99, 102, 241, 0)");

        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      }

      requestRef.current = requestAnimationFrame(drawFrame);
    };

    // Initialize and start animation
    initializeTriangles();
    requestRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [dimensions, triangleCount, mouseInfluence, colors]);

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

      // Reinitialize on resize
      trianglesRef.current = [];
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
