"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";
import Delaunator from "delaunator";

const cx = classNames.bind(styles);

/**
 * Colores de marca
 */
const brandColors = ["#9698fd", "#9698fd", "#9698fd", "#9698fd"];

/** Representa cada partícula/punto en pantalla */
interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

/** Número de puntos para la animación */
const NUM_POINTS = 40;

export default function FooterParticlesFlowField() {
  // Corregimos el tipo del ref para ser HTMLCanvasElement
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const animationRef = useRef<number>();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  /**
   * Ciclo de animación principal
   */
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fondo sutil semitransparente
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Fondo suave
    ctx.fillRect(0, 0, width, height);

    // Actualizamos la posición de cada partícula
    const updated = points.map((p) => {
      let { x, y, vx, vy } = p;
      x += vx;
      y += vy;

      // Rebote suave en bordes
      if (x < 0 || x > width) vx *= -1;
      if (y < 0 || y > height) vy *= -1;

      return { ...p, x, y, vx, vy };
    });
    setPoints(updated);

    // Solo procedemos si hay suficientes puntos para la triangulación
    if (updated.length >= 3) {
      try {
        // Array de tuplas para Delaunator
        const coords: Array<[number, number]> = updated.map((pt) => [
          pt.x,
          pt.y,
        ]);
        const delaunay = Delaunator.from(coords);
        const { triangles } = delaunay;

        // Dibujamos cada triángulo
        for (let i = 0; i < triangles.length; i += 3) {
          const i0 = triangles[i];
          const i1 = triangles[i + 1];
          const i2 = triangles[i + 2];

          const p0 = updated[i0];
          const p1 = updated[i1];
          const p2 = updated[i2];

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.closePath();

          // Relleno semitransparente con el color brand de p0
          ctx.fillStyle = `${p0.color}33`; // ~20% alpha con notación hex
          ctx.fill();

          // Trazado en blanco suave
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
          ctx.stroke();
        }

        // Dibujamos cada punto
        updated.forEach((pt) => {
          ctx.save();
          ctx.fillStyle = pt.color; // color de marca
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      } catch (error) {
        console.error("Error en la triangulación:", error);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  /**
   * Ajusta el tamaño del canvas y crea las partículas
   */
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    setWidth(w);
    setHeight(h);

    const dpi = window.devicePixelRatio || 1;
    canvas.width = w * dpi;
    canvas.height = h * dpi;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpi, dpi);
    }

    // Generamos las partículas de forma aleatoria
    const temp: Point[] = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      temp.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1, // velocidad moderada
        vy: (Math.random() - 0.5) * 1,
        color: brandColors[Math.floor(Math.random() * brandColors.length)],
      });
    }
    setPoints(temp);
  };

  useEffect(() => {
    // Listener de resize
    window.addEventListener("resize", handleResize);
    // Primer setup
    handleResize();

    // Arrancamos la animación
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
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
