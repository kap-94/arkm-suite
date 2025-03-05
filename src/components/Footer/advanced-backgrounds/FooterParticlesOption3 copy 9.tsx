"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

interface Vector {
  x: number;
  y: number;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  shape: string; // "circle", "square", "triangle"

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.opacity = 0.2 + Math.random() * 0.6;

    // Velocidad inicial
    this.vx = (Math.random() - 0.5) * 0.7;
    this.vy = (Math.random() - 0.5) * 0.7;

    // Forma aleatoria
    const shapes = ["circle", "square", "triangle"];
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
  }

  update(cursor: Vector, width: number, height: number) {
    // Movimiento
    this.x += this.vx;
    this.y += this.vy;

    // Envolver alrededor de los bordes
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    // Interacción con el cursor
    const dx = this.x - cursor.x;
    const dy = this.y - cursor.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repelRadius = 100;

    if (dist < repelRadius) {
      const force = (repelRadius - dist) / repelRadius;
      this.vx += (dx / dist) * force * 0.5;
      this.vy += (dy / dist) * force * 0.5;
    }

    // Aplicar fricción para evitar velocidades extremas
    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;

    switch (this.shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "square":
        ctx.beginPath();
        ctx.rect(
          this.x - this.size,
          this.y - this.size,
          this.size * 2,
          this.size * 2
        );
        ctx.fill();
        break;
      case "triangle":
        const h = this.size * 1.732; // Altura de un triángulo equilátero
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x - this.size, this.y + this.size / 2);
        ctx.lineTo(this.x + this.size, this.y + this.size / 2);
        ctx.closePath();
        ctx.fill();
        break;
    }

    ctx.restore();
  }
}

interface ParticlesNetworkProps {
  numParticles?: number;
  connectionDistance?: number;
}

export default function ParticlesNetwork({
  numParticles = 60,
  connectionDistance = 100,
}: ParticlesNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawConnections = (particles: Particle[]) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.2;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = "#6366f1";
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      drawConnections(particlesRef.current);

      particlesRef.current.forEach((p) => {
        p.update(cursorRef.current, width, height);
        p.draw(ctx);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [width, height, connectionDistance]);

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
      const tempParticles: Particle[] = [];
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = 3 + Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        tempParticles.push(new Particle(x, y, size, color));
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
