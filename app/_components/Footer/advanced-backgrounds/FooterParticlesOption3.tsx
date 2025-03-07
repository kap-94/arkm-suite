"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

interface Vector {
  x: number;
  y: number;
}

// class Particle {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   size: number;
//   color: string;
//   opacity: number;
//   shape: string; // Nuevas formas: "sphere", "cube", "pyramid"

//   constructor(x: number, y: number, size: number, color: string) {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.color = color;
//     this.opacity = 0.3 + Math.random() * 0.6;

//     // Velocidad inicial (reducida para movimiento más lento)
//     this.vx = (Math.random() - 0.5) * 0.3;
//     this.vy = (Math.random() - 0.5) * 0.3;

//     // Nuevas formas más profesionales
//     const shapes = ["sphere", "cube", "pyramid"];
//     this.shape = shapes[Math.floor(Math.random() * shapes.length)];
//   }

//   // Método update que faltaba
//   update(cursor: Vector, width: number, height: number) {
//     // Actualizar posición
//     this.x += this.vx;
//     this.y += this.vy;

//     // Rebote en los bordes
//     if (this.x > width - this.size || this.x < this.size) {
//       this.vx = -this.vx;
//     }
//     if (this.y > height - this.size || this.y < this.size) {
//       this.vy = -this.vy;
//     }

//     // Interacción con el cursor
//     const dx = cursor.x - this.x;
//     const dy = cursor.y - this.y;
//     const distance = Math.sqrt(dx * dx + dy * dy);
//     const maxDistance = 150;

//     if (distance < maxDistance) {
//       // Calcular fuerza de repulsión inversamente proporcional a la distancia
//       const force = (maxDistance - distance) / maxDistance;
//       const directionX = dx / distance || 0;
//       const directionY = dy / distance || 0;

//       // Aplicar fuerza de repulsión (reducida para movimiento más lento)
//       this.vx -= directionX * force * 0.2;
//       this.vy -= directionY * force * 0.2;
//     }

//     // Limitar velocidad máxima (reducida para movimiento más lento)
//     const maxSpeed = 0.8;
//     const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
//     if (speed > maxSpeed) {
//       this.vx = (this.vx / speed) * maxSpeed;
//       this.vy = (this.vy / speed) * maxSpeed;
//     }
//   }

//   draw(ctx: CanvasRenderingContext2D) {
//     ctx.save();
//     ctx.globalAlpha = this.opacity;

//     // Crear un gradiente para simular profundidad 3D
//     const gradient = ctx.createLinearGradient(
//       this.x - this.size,
//       this.y - this.size,
//       this.x + this.size,
//       this.y + this.size
//     );
//     gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
//     gradient.addColorStop(1, this.color);

//     ctx.fillStyle = gradient;
//     ctx.shadowColor = "rgba(99, 102, 241, 0.5)";
//     ctx.shadowBlur = 10;

//     switch (this.shape) {
//       case "sphere": // Esfera con degradado suave
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//         break;

//       case "cube": // Cubo con perspectiva isométrica
//         ctx.beginPath();
//         ctx.moveTo(this.x, this.y - this.size); // Punto superior
//         ctx.lineTo(this.x + this.size, this.y - this.size / 2); // Lado derecho
//         ctx.lineTo(this.x + this.size, this.y + this.size / 2); // Parte inferior derecha
//         ctx.lineTo(this.x, this.y + this.size); // Punto inferior
//         ctx.lineTo(this.x - this.size, this.y + this.size / 2); // Parte inferior izquierda
//         ctx.lineTo(this.x - this.size, this.y - this.size / 2); // Lado izquierdo
//         ctx.closePath();
//         ctx.fill();
//         break;

//       case "pyramid": // Pirámide con efecto de profundidad
//         ctx.beginPath();
//         ctx.moveTo(this.x, this.y - this.size); // Punta superior
//         ctx.lineTo(this.x - this.size, this.y + this.size); // Lado izquierdo
//         ctx.lineTo(this.x + this.size, this.y + this.size); // Lado derecho
//         ctx.closePath();
//         ctx.fill();

//         // Sombreado lateral
//         ctx.beginPath();
//         ctx.moveTo(this.x, this.y - this.size);
//         ctx.lineTo(this.x + this.size, this.y + this.size);
//         ctx.lineTo(this.x, this.y + this.size / 2);
//         ctx.closePath();
//         ctx.fillStyle = "rgba(99, 102, 241, 0.5)";
//         ctx.fill();
//         break;
//     }

//     ctx.restore();
//   }
// }

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  shape: string;
  uniqueParam: number;
  pulseSpeed: number;
  phase: number;

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.opacity = 0.3 + Math.random() * 0.6;
    this.uniqueParam = Math.random(); // Parámetro aleatorio para variaciones
    this.pulseSpeed = 0.02 + Math.random() * 0.04; // Velocidad de pulsación
    this.phase = Math.random() * Math.PI * 2; // Fase inicial aleatoria

    // Velocidad inicial (reducida para movimiento más lento)
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;

    // Formas abstractas minimalistas
    const shapes = ["blob", "liquid", "nebula"];
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
  }

  // Método update (mantiene la misma funcionalidad)
  update(cursor: Vector, width: number, height: number) {
    // Actualizar posición
    this.x += this.vx;
    this.y += this.vy;

    // Actualizar fase para animación de pulsación
    this.phase += this.pulseSpeed;
    if (this.phase > Math.PI * 2) {
      this.phase -= Math.PI * 2;
    }

    // Rebote en los bordes
    if (this.x > width - this.size || this.x < this.size) {
      this.vx = -this.vx;
    }
    if (this.y > height - this.size || this.y < this.size) {
      this.vy = -this.vy;
    }

    // Interacción con el cursor
    const dx = cursor.x - this.x;
    const dy = cursor.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 150;

    if (distance < maxDistance) {
      // Calcular fuerza de repulsión inversamente proporcional a la distancia
      const force = (maxDistance - distance) / maxDistance;
      const directionX = dx / distance || 0;
      const directionY = dy / distance || 0;

      // Aplicar fuerza de repulsión (reducida para movimiento más lento)
      this.vx -= directionX * force * 0.2;
      this.vy -= directionY * force * 0.2;
    }

    // Limitar velocidad máxima (reducida para movimiento más lento)
    const maxSpeed = 0.8;
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    // Factor de pulsación que varía con el tiempo
    const pulseFactor = 0.85 + 0.15 * Math.sin(this.phase);

    // Crear un gradiente para simular profundidad 3D (manteniendo los colores originales)
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * pulseFactor
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    gradient.addColorStop(0.6, this.color);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(99, 102, 241, 0.5)";
    ctx.shadowBlur = 10;

    switch (this.shape) {
      case "blob":
        // Forma orgánica tipo "blob" con curvas suaves
        ctx.beginPath();

        // Usamos curvas bezier para crear una forma orgánica con solo 4 puntos de control
        const amplitude = this.size * 0.3 * this.uniqueParam;
        const baseSize = this.size * pulseFactor;

        // Crear 4 puntos de control con variaciones sutiles
        const cp1x = this.x + baseSize * Math.cos(this.phase);
        const cp1y = this.y + baseSize * Math.sin(this.phase) - amplitude;

        const cp2x =
          this.x + baseSize * Math.cos(this.phase + Math.PI / 2) + amplitude;
        const cp2y = this.y + baseSize * Math.sin(this.phase + Math.PI / 2);

        const cp3x =
          this.x + baseSize * Math.cos(this.phase + Math.PI) - amplitude * 0.5;
        const cp3y =
          this.y + baseSize * Math.sin(this.phase + Math.PI) + amplitude;

        const cp4x = this.x + baseSize * Math.cos(this.phase + Math.PI * 1.5);
        const cp4y = this.y + baseSize * Math.sin(this.phase + Math.PI * 1.5);

        // Dibujar usando curvas bezier para conectar los puntos
        ctx.moveTo(cp1x, cp1y);
        ctx.bezierCurveTo(
          cp1x + amplitude,
          cp1y + amplitude,
          cp2x - amplitude,
          cp2y - amplitude,
          cp2x,
          cp2y
        );
        ctx.bezierCurveTo(
          cp2x + amplitude,
          cp2y + amplitude,
          cp3x + amplitude,
          cp3y - amplitude,
          cp3x,
          cp3y
        );
        ctx.bezierCurveTo(
          cp3x - amplitude,
          cp3y + amplitude,
          cp4x + amplitude,
          cp4y + amplitude,
          cp4x,
          cp4y
        );
        ctx.bezierCurveTo(
          cp4x - amplitude,
          cp4y - amplitude,
          cp1x - amplitude,
          cp1y + amplitude,
          cp1x,
          cp1y
        );

        ctx.closePath();
        ctx.fill();
        break;

      case "liquid":
        // Forma líquida minimalista con efecto de fluidez
        ctx.beginPath();

        // Dibujar forma de gota con una sola curva
        const dropWidth = this.size * 0.7 * pulseFactor;
        const dropHeight = this.size * 1.2 * pulseFactor;
        const skew = this.uniqueParam * 0.4 - 0.2; // Entre -0.2 y 0.2

        ctx.ellipse(
          this.x,
          this.y,
          dropWidth,
          dropHeight,
          this.phase * 0.2, // Rotación lenta
          0,
          Math.PI * 2
        );

        // Añadir un pequeño círculo secundario para efecto de gota o burbuja
        if (this.uniqueParam > 0.7) {
          const bubbleSize = this.size * 0.3 * pulseFactor;
          const bubbleX = this.x + this.size * 0.5 * Math.cos(this.phase * 2);
          const bubbleY = this.y + this.size * 0.5 * Math.sin(this.phase * 2);

          ctx.moveTo(bubbleX + bubbleSize, bubbleY);
          ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
        }

        ctx.fill();
        break;

      case "nebula":
        // Nebulosa etérea con forma ambigua
        ctx.beginPath();

        // Creamos dos o tres círculos superpuestos con diferentes tamaños
        // para crear un efecto de nebulosa o nube abstracta
        const mainRadius = this.size * pulseFactor;
        ctx.arc(this.x, this.y, mainRadius, 0, Math.PI * 2);
        ctx.fill();

        // Cambiar a un estilo semitransparente para las capas superpuestas
        ctx.globalAlpha = 0.6 * this.opacity;

        // Círculo secundario con desplazamiento
        const offsetX = this.uniqueParam * mainRadius * 0.7;
        const offsetY = (1 - this.uniqueParam) * mainRadius * 0.7;
        ctx.beginPath();
        ctx.arc(
          this.x + offsetX * Math.cos(this.phase),
          this.y + offsetY * Math.sin(this.phase),
          mainRadius * 0.8,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Tercer círculo más pequeño
        ctx.globalAlpha = 0.4 * this.opacity;
        ctx.beginPath();
        ctx.arc(
          this.x - offsetX * Math.sin(this.phase * 0.7),
          this.y - offsetY * Math.cos(this.phase * 0.7),
          mainRadius * 0.5,
          0,
          Math.PI * 2
        );
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
