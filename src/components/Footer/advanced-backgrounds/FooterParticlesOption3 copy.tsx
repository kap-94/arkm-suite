"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

interface Vector {
  x: number;
  y: number;
}

class Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.opacity = 0.2 + Math.random() * 0.8;

    // Velocidad inicial
    this.vx = (Math.random() - 0.5) * 0.5; // horizontal leve
    this.vy = -(1 + Math.random() * 1); // sube hacia arriba
  }

  update(cursor: Vector, width: number, height: number) {
    // Efecto de flotación
    this.x += this.vx;
    this.y += this.vy;

    // Reaparece en la parte de abajo si sale por arriba
    if (this.y + this.radius < 0) {
      this.x = Math.random() * width;
      this.y = height + this.radius;
    }
    // Rebote lateral sencillo
    if (this.x < -this.radius) this.x = width + this.radius;
    if (this.x > width + this.radius) this.x = -this.radius;

    // Leve repulsión con el mouse
    const dx = this.x - cursor.x;
    const dy = this.y - cursor.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repelRadius = 60;
    if (dist < repelRadius) {
      const force = (repelRadius - dist) / repelRadius;
      this.vx += (dx / dist) * force * 0.3;
      this.vy += (dy / dist) * force * 0.3;
    }

    // Reducir velocidad gradualmente (fricción suave)
    this.vx *= 0.99;
    this.vy *= 0.99;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

interface FooterParticlesOption3Props {
  numBubbles?: number;
}

export default function FooterParticlesOption3({
  numBubbles = 80,
}: FooterParticlesOption3Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
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
      // Fondo tenue para "estela"
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      bubblesRef.current.forEach((b) => {
        b.update(cursorRef.current, width, height);
        b.draw(ctx);
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

      // Re-crear burbujas
      const tempBubbles: Bubble[] = [];
      for (let i = 0; i < numBubbles; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 8 + Math.random() * 15;
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        tempBubbles.push(new Bubble(x, y, r, color));
      }
      bubblesRef.current = tempBubbles;
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
  }, [numBubbles]);

  return (
    <canvas
      ref={canvasRef}
      className={cx("footer__particles-canvas")}
      aria-hidden="true"
    />
  );
}
