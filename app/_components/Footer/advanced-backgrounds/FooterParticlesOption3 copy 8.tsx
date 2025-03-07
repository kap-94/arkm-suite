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

class DepthParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  gradientStops: GradientStop[];
  glowColor: string;
  glowSize: number;
  rotationAngle: number;
  rotationSpeed: number;
  pulseAmount: number;
  pulseSpeed: number;
  pulseDirection: 1 | -1;
  initialScale: number;
  floatOffset: number;
  floatSpeed: number;

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.color = color;
    this.opacity = 0.2 + Math.random() * 0.6;

    // Gradient stops para efecto de profundidad
    this.gradientStops = [
      { color: this.lightenColor(color, 20), position: 0 },
      { color: color, position: 0.5 },
      { color: this.darkenColor(color, 20), position: 1 },
    ];

    // Propiedades para glow
    this.glowColor = this.lightenColor(color, 30);
    this.glowSize = radius * (1.2 + Math.random() * 0.8);

    // Propiedades de rotación
    this.rotationAngle = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.01;

    // Propiedades para pulsar
    this.pulseAmount = 0.1 + Math.random() * 0.2;
    this.pulseSpeed = 0.005 + Math.random() * 0.01;
    this.pulseDirection = Math.random() > 0.5 ? 1 : -1;

    // Escala inicial y offset para efecto flotante
    this.initialScale = 0.8 + Math.random() * 0.4;
    this.floatOffset = Math.random() * Math.PI * 2;
    this.floatSpeed = 0.0005 + Math.random() * 0.001;
  }

  // Aclarar color para gradientes/glow
  lightenColor(color: string, amount: number): string {
    // Convierte el color a formato rgb si es rgba
    if (color.startsWith("rgba")) {
      const rgbaMatch = color.match(
        /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/
      );
      if (rgbaMatch) {
        const [, r, g, b, a] = rgbaMatch;
        color = `rgb(${r}, ${g}, ${b})`;
      }
    }

    // Convierte de rgb a hex si es necesario
    if (color.startsWith("rgb")) {
      const rgbMatch = color.match(
        /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
      );
      if (rgbMatch) {
        const [, r, g, b] = rgbMatch;
        color = `#${Number(r).toString(16).padStart(2, "0")}${Number(g)
          .toString(16)
          .padStart(2, "0")}${Number(b).toString(16).padStart(2, "0")}`;
      }
    }

    let hex = color.replace("#", "");

    // Expandir formato corto (#rgb) a formato completo (#rrggbb)
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // Convertir a componentes RGB y aclarar
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const newR = Math.min(255, r + amount);
    const newG = Math.min(255, g + amount);
    const newB = Math.min(255, b + amount);

    return `#${Math.round(newR).toString(16).padStart(2, "0")}${Math.round(newG)
      .toString(16)
      .padStart(2, "0")}${Math.round(newB).toString(16).padStart(2, "0")}`;
  }

  // Oscurecer color para gradientes/sombras
  darkenColor(color: string, amount: number): string {
    return this.lightenColor(color, -amount);
  }

  update(cursor: Vector, width: number, height: number, time: number) {
    // Generar nuevo destino aleatorio periódicamente
    if (Math.random() < 0.002) {
      this.targetX = Math.random() * width;
      this.targetY = Math.random() * height;
    }

    // Movimiento suave al destino
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    this.vx += dx * 0.002;
    this.vy += dy * 0.002;

    // Aplicar fricción para movimiento más orgánico
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Aplicar velocidad
    this.x += this.vx;
    this.y += this.vy;

    // Interacción con el cursor
    const cursorDx = this.x - cursor.x;
    const cursorDy = this.y - cursor.y;
    const cursorDist = Math.sqrt(cursorDx * cursorDx + cursorDy * cursorDy);
    const interactRadius = 120;

    if (cursorDist < interactRadius) {
      const force = (interactRadius - cursorDist) / interactRadius;
      this.vx += (cursorDx / cursorDist) * force * 0.8;
      this.vy += (cursorDy / cursorDist) * force * 0.8;
    }

    // Mantener dentro de los límites
    if (this.x < this.radius) this.x = this.radius;
    if (this.x > width - this.radius) this.x = width - this.radius;
    if (this.y < this.radius) this.y = this.radius;
    if (this.y > height - this.radius) this.y = height - this.radius;

    // Actualizar rotación
    this.rotationAngle += this.rotationSpeed;

    // Efecto de flotación usando seno
    this.y += Math.sin(time * this.floatSpeed + this.floatOffset) * 0.2;
  }

  draw(ctx: CanvasRenderingContext2D, time: number) {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    // Factor de escala para efecto de pulsación
    const pulseFactor = 1 + Math.sin(time * this.pulseSpeed) * this.pulseAmount;

    // Aplicar traslación y rotación
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotationAngle);

    // Dibujar glow (sombra exterior)
    ctx.shadowColor = this.glowColor;
    ctx.shadowBlur = this.glowSize;

    // Crear gradiente radial para efecto de profundidad
    const gradient = ctx.createRadialGradient(
      0,
      0,
      0,
      0,
      0,
      this.radius * pulseFactor
    );

    this.gradientStops.forEach((stop) => {
      gradient.addColorStop(stop.position, stop.color);
    });

    // Dibujar círculo principal con gradiente
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * pulseFactor, 0, Math.PI * 2);
    ctx.fill();

    // Añadir brillo/highlight
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(
      -this.radius * 0.3,
      -this.radius * 0.3,
      this.radius * 0.4,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.restore();
  }
}

interface DepthParticlesProps {
  numParticles?: number;
}

export default function PrimaryDepthParticles({
  numParticles = 40,
}: DepthParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<DepthParticle[]>([]);
  const requestRef = useRef<number>();
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = (timestamp: number) => {
      timeRef.current = timestamp;

      // Clear canvas with fade effect para crear "estela"
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Actualizar y dibujar partículas
      particlesRef.current.forEach((p) => {
        p.update(cursorRef.current, width, height, timestamp);
        p.draw(ctx, timestamp);
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

      // Colors based on the provided palette
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

      // Create particles
      const tempParticles: DepthParticle[] = [];
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const radius = 12 + Math.random() * 18;
        const color = colors[Math.floor(Math.random() * colors.length)];
        tempParticles.push(new DepthParticle(x, y, radius, color));
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
