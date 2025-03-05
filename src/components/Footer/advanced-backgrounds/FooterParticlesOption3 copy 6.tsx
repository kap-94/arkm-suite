"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

interface Vector {
  x: number;
  y: number;
}

interface GradientStop {
  color: string;
  position: number;
}

class GeoParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: "hexagon" | "diamond" | "cross" | "circle";
  gradientColors: GradientStop[];
  baseColor: string;
  opacity: number;
  pulseDirection: 1 | -1;
  pulseSpeed: number;

  constructor(x: number, y: number, size: number, baseColor: string) {
    this.x = x;
    this.y = y;
    this.targetX = x + (Math.random() - 0.5) * 100;
    this.targetY = y + (Math.random() - 0.5) * 100;
    this.vx = 0;
    this.vy = 0;
    this.size = size;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    this.baseColor = baseColor;
    this.opacity = 0.3 + Math.random() * 0.4;
    this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
    this.pulseSpeed = 0.005 + Math.random() * 0.01;

    // Seleccionar forma aleatoria
    const shapes: ["hexagon", "diamond", "cross", "circle"] = [
      "hexagon",
      "diamond",
      "cross",
      "circle",
    ];
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];

    // Crear variaciones de color para el gradiente
    const color = baseColor;
    this.gradientColors = [
      { color: this.adjustColor(color, 20), position: 0 },
      { color: color, position: 0.5 },
      { color: this.adjustColor(color, -20), position: 1 },
    ];
  }

  // Método para ajustar la luminosidad de un color
  adjustColor(hex: string, amount: number): string {
    // Si es rgba, convertimos a hex
    if (hex.startsWith("rgba")) {
      const rgba = hex.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
      if (rgba) {
        const [, r, g, b, a] = rgba;
        hex = `#${Number(r).toString(16).padStart(2, "0")}${Number(g)
          .toString(16)
          .padStart(2, "0")}${Number(b).toString(16).padStart(2, "0")}`;
      }
    }

    let color = hex.replace("#", "");
    if (color.length === 3) {
      color = color
        .split("")
        .map((c) => c + c)
        .join("");
    }

    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);

    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  update(cursor: Vector, width: number, height: number, time: number) {
    // Movimiento suave hacia el punto de destino
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    this.vx = dx * 0.02;
    this.vy = dy * 0.02;

    this.x += this.vx;
    this.y += this.vy;

    // Actualizar la rotación
    this.rotation += this.rotationSpeed;

    // Efecto de pulso en el tamaño
    const sizeChange =
      this.pulseDirection * this.pulseSpeed * Math.sin(time * 0.001);
    const originalSize = this.size / (0.9 + Math.sin(time * 0.001) * 0.1); // Aproximación al tamaño original
    const newSize = originalSize + sizeChange;
    this.size = newSize;

    // Si la partícula está cerca de su destino, establecer un nuevo destino
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
      this.targetX = Math.random() * width;
      this.targetY = Math.random() * height;
    }

    // Interacción con el cursor
    const cursorDx = this.x - cursor.x;
    const cursorDy = this.y - cursor.y;
    const cursorDist = Math.sqrt(cursorDx * cursorDx + cursorDy * cursorDy);
    const interactRadius = 150;

    if (cursorDist < interactRadius) {
      const force = (interactRadius - cursorDist) / interactRadius;
      this.vx += (cursorDx / cursorDist) * force * 0.5;
      this.vy += (cursorDy / cursorDist) * force * 0.5;
    }

    // Límites de la pantalla
    if (this.x < 0) this.x = 0;
    if (this.x > width) this.x = width;
    if (this.y < 0) this.y = 0;
    if (this.y > height) this.y = height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    // Crear un gradiente radial
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2);
    this.gradientColors.forEach((stop) => {
      gradient.addColorStop(stop.position, stop.color);
    });

    ctx.fillStyle = gradient;

    // Dibujar la forma según el tipo
    switch (this.shape) {
      case "hexagon":
        this.drawHexagon(ctx, this.size);
        break;
      case "diamond":
        this.drawDiamond(ctx, this.size);
        break;
      case "cross":
        this.drawCross(ctx, this.size);
        break;
      case "circle":
        this.drawCircle(ctx, this.size);
        break;
    }

    ctx.restore();
  }

  drawHexagon(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = size * Math.cos(angle);
      const y = size * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
  }

  drawDiamond(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size, 0);
    ctx.lineTo(0, size);
    ctx.lineTo(-size, 0);
    ctx.closePath();
    ctx.fill();
  }

  drawCross(ctx: CanvasRenderingContext2D, size: number) {
    const width = size * 0.4;
    ctx.fillRect(-width, -size, width * 2, size * 2);
    ctx.fillRect(-size, -width, size * 2, width * 2);
  }

  drawCircle(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

interface GeometricParticlesProps {
  numParticles?: number;
}

export default function GeometricParticles({
  numParticles = 25,
}: GeometricParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<GeoParticle[]>([]);
  const requestRef = useRef<number>();
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = (timestamp: number) => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        p.update(cursorRef.current, width, height, timestamp);
        p.draw(ctx);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [width, height]);

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

      setWidth(w);
      setHeight(h);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpi, dpi);
      }

      // Colores de la paleta
      const colors = [
        "#6366f1", // primary-color
        "#818cf8", // primary-light
        "#4f46e5", // primary-dark
        "#9698fd", // indigo-light
        "rgba(99, 102, 241, 0.9)", // primary-color-90
        "rgba(99, 102, 241, 0.8)", // primary-color-80
        "rgba(79, 70, 229, 0.9)", // primary-dark-90
        "rgba(79, 70, 229, 0.8)", // primary-dark-80
      ];

      // Crear partículas
      const tempParticles: GeoParticle[] = [];
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = 10 + Math.random() * 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        tempParticles.push(new GeoParticle(x, y, size, color));
      }
      particlesRef.current = tempParticles;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

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

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [numParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={cx("footer__particles-canvas")}
      aria-hidden="true"
    />
  );
}
