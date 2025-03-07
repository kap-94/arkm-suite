"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

interface Vector {
  x: number;
  y: number;
}

class FlowParticle {
  x: number;
  y: number;
  speed: number;
  angle: number;
  size: number;
  color: string;
  opacity: number;
  history: { x: number; y: number }[];
  historyLength: number;

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.opacity = 0.3 + Math.random() * 0.5;
    this.speed = 0.5 + Math.random() * 1.5;
    this.angle = Math.random() * Math.PI * 2;
    this.history = [];
    this.historyLength = 5 + Math.floor(Math.random() * 10); // Longitud de la estela
  }

  update(cursor: Vector, width: number, height: number, time: number) {
    // Guardar posición actual en el historial
    this.history.push({ x: this.x, y: this.y });
    if (this.history.length > this.historyLength) {
      this.history.shift();
    }

    // Movimiento de flujo con efecto de campo de flujo (Flow Field)
    const noiseScale = 0.005;
    const noiseX =
      Math.sin(this.x * noiseScale + time * 0.0005) *
      Math.cos(this.y * noiseScale + time * 0.0005);
    const noiseY =
      Math.sin(this.y * noiseScale - time * 0.0005) *
      Math.cos(this.x * noiseScale + time * 0.0005);

    this.angle += noiseX * noiseY * 0.1;

    // Aplicar movimiento
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Interacción con el cursor
    const dx = this.x - cursor.x;
    const dy = this.y - cursor.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const attractRadius = 120;

    if (dist < attractRadius) {
      const force = (attractRadius - dist) / attractRadius;
      this.x += (cursor.x - this.x) * force * 0.02;
      this.y += (cursor.y - this.y) * force * 0.02;
    }

    // Volver a entrar en pantalla si sale
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Dibujar la estela
    if (this.history.length > 1) {
      ctx.save();
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.history[0].x, this.history[0].y);

      for (let i = 1; i < this.history.length; i++) {
        const point = this.history[i];
        const prevPoint = this.history[i - 1];
        const opacity = (i / this.history.length) * this.opacity;

        ctx.globalAlpha = opacity;
        ctx.lineTo(point.x, point.y);
      }

      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.restore();
    }

    // Dibujar la partícula
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

interface FlowParticlesProps {
  numParticles?: number;
}

export default function FlowParticles({
  numParticles = 50,
}: FlowParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FlowParticle[]>([]);
  const requestRef = useRef<number>();
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const timeRef = useRef<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = (timestamp: number) => {
      timeRef.current = timestamp;
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
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
        ctx.lineWidth = 2;
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
      const tempParticles: FlowParticle[] = [];
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = 2 + Math.random() * 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        tempParticles.push(new FlowParticle(x, y, size, color));
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
