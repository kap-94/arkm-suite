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
  ix: number; // posición inicial X
  iy: number; // posición inicial Y
  angle: number; // ángulo actual de la órbita
  radius: number; // radio de la partícula en píxeles
  orbitRadius: number; // radio de la órbita en torno a su posición inicial
  speed: number; // velocidad de la órbita
  color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.ix = x;
    this.iy = y;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = 2 + Math.random() * 3;
    this.orbitRadius = 10 + Math.random() * 40;
    this.speed = 0.01 + Math.random() * 0.02;
    this.color = color;
  }

  update(cursor: Vector) {
    // Orbita en torno a (ix, iy)
    this.angle += this.speed;
    const swirlX = Math.cos(this.angle) * this.orbitRadius;
    const swirlY = Math.sin(this.angle) * this.orbitRadius;

    // Distorsión por cursor (fuerza de repulsión simple)
    const dx = this.x - cursor.x;
    const dy = this.y - cursor.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = 80;
    if (dist < minDist) {
      const force = (minDist - dist) / minDist;
      this.x += (dx / dist) * force * 2;
      this.y += (dy / dist) * force * 2;
    } else {
      // Retorna lentamente a su órbita
      this.x += (this.ix + swirlX - this.x) * 0.03;
      this.y += (this.iy + swirlY - this.y) * 0.03;
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

interface FooterParticlesOption1Props {
  numParticles?: number; // cuántas partículas quieres
}

export default function FooterParticlesOption1({
  numParticles = 200,
}: FooterParticlesOption1Props) {
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
      // Fondo con un ligero fade (opcional)
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        p.update(cursorRef.current);
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

      // Re-crear partículas cada vez que cambie el tamaño
      const tempParticles: Particle[] = [];
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        // Mezcla de colores al azar
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
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
