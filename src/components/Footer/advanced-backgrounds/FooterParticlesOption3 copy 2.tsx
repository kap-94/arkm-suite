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
  radius: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1;
    this.vy = (Math.random() - 0.5) * 1;
    this.radius = 2 + Math.random() * 2;
    this.color = color;
  }

  update(cursor: Vector, width: number, height: number) {
    // Movimiento libre
    this.x += this.vx;
    this.y += this.vy;

    // Rebote en los bordes
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Repulsión simple con el mouse
    const dx = this.x - cursor.x;
    const dy = this.y - cursor.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repelRadius = 80;
    if (dist < repelRadius) {
      const force = (repelRadius - dist) / repelRadius;
      this.vx += (dx / dist) * force * 0.2;
      this.vy += (dy / dist) * force * 0.2;
    }

    // Límite de velocidad para no “explotar”
    const speedLimit = 2;
    if (Math.abs(this.vx) > speedLimit) {
      this.vx = this.vx > 0 ? speedLimit : -speedLimit;
    }
    if (Math.abs(this.vy) > speedLimit) {
      this.vy = this.vy > 0 ? speedLimit : -speedLimit;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

interface FooterParticlesOption2Props {
  numParticles?: number;
  lineDistance?: number;
}

export default function FooterParticlesOption2({
  numParticles = 120,
  lineDistance = 100,
}: FooterParticlesOption2Props) {
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

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      // Dibujar fondo sutil
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      // Actualizar partículas
      particlesRef.current.forEach((p) =>
        p.update(cursorRef.current, width, height)
      );

      // Dibujar líneas de conexión
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < lineDistance) {
            // alpha según distancia
            const alpha = 1 - dist / lineDistance;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Dibujar partículas
      particlesRef.current.forEach((p) => p.draw(ctx));

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [width, height, lineDistance]);

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

      // *** SOLO CAMBIO DE COLORES ***
      // Usamos un arreglo con tus brand colors
      const brandColors = [
        "#6366f1", // primary-color
        "rgba(99, 102, 241, 0.9)", // primary-color-90
        "rgba(99, 102, 241, 0.8)", // primary-color-80
        "#818cf8", // primary-light
        "#4f46e5", // primary-dark
        "rgba(79, 70, 229, 0.9)", // primary-dark-90
        "rgba(79, 70, 229, 0.8)", // primary-dark-80
        "#9698fd", // indigo-light
        "#ffffff", // white-color
        "rgb(241, 228, 228)", // white-base
        "#f7f7f7", // white-light
        "#e0e0e0", // white-dark
      ];

      // Re-crear partículas
      const tempParticles: Particle[] = [];
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        // Seleccionamos un color aleatorio del arreglo brandColors
        const color =
          brandColors[Math.floor(Math.random() * brandColors.length)];
        tempParticles.push(new Particle(x, y, color));
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
