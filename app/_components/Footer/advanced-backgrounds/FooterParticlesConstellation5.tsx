"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

interface Vector {
  x: number;
  y: number;
}

class WaveParticle {
  x: number;
  y: number;
  radius: number;
  color: string;
  angle: number;

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.angle = Math.random() * Math.PI * 2;
  }

  update(cursor: Vector) {
    const dx = this.x - cursor.x;
    const dy = this.y - cursor.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      this.angle += 0.05;
      this.x += Math.cos(this.angle) * 0.5;
      this.y += Math.sin(this.angle) * 0.5;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

interface FooterParticlesProps {
  imageA: string;
  imageB: string;
}

export default function FooterParticlesConstellation({
  imageA,
  imageB,
}: FooterParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<WaveParticle[]>([]);
  const requestRef = useRef<number>();
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Crear gradiente de fondo
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar partículas
    particles.forEach((p) => {
      p.update(cursorRef.current);
      p.draw(ctx);
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    const dpi = window.devicePixelRatio || 1;
    canvas.width = w * dpi;
    canvas.height = h * dpi;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpi, dpi);

    // Crear partículas
    const newParticles: WaveParticle[] = [];
    const numParticles = 50; // Menos partículas para mejor rendimiento
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const radius = randomRange(2, 4);
      const color = `rgba(255, 255, 255, ${randomRange(0.5, 1)})`;
      newParticles.push(new WaveParticle(x, y, radius, color));
    }
    setParticles(newParticles);

    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousemove", onMouseMove);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
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
