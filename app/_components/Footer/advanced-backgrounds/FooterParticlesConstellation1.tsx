"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

// Utilidades simplificadas para mayor rendimiento
const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamp = false
) => {
  const newValue =
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  if (!clamp) return newValue;
  return Math.max(Math.min(newValue, outMax), outMin);
};

// Interfaces
interface Vector {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  ix: number;
  iy: number;
  radius: number;
  color: string;
  opacity: number;
}

// Carga de imagen con cache
const imageCache = new Map<string, HTMLImageElement>();

const loadImage = (src: string): Promise<HTMLImageElement> => {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = (e) => {
      console.error(`Error al cargar imagen: ${src}`, e);
      reject(new Error(`No se pudo cargar ${src}`));
    };
    img.src = src;
  });
};

// Efecto de throttle para eventos
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall < limit) return;
    lastCall = now;
    return func(...args);
  };
}

// Generador de código único para Worker
const generateWorkerCode = () => {
  return `
    // Definiciones y utilidades dentro del Worker
    const randomRange = (min, max) => Math.random() * (max - min) + min;
    const mapRange = (value, inMin, inMax, outMin, outMax, clamp = false) => {
      const newValue = ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
      if (!clamp) return newValue;
      return Math.max(Math.min(newValue, outMax), outMin);
    };

    // Estado de partículas
    let particles = [];
    let cursor = { x: 9999, y: 9999 };
    let width = 0;
    let height = 0;
    let lineDistance = 60;

    // Recibir mensajes del hilo principal
    self.onmessage = function(e) {
      const { type, data } = e.data;
      
      switch (type) {
        case 'init':
          particles = data.particles;
          width = data.width;
          height = data.height;
          lineDistance = data.lineDistance || 60;
          break;
        
        case 'cursor':
          cursor = data.position;
          break;
        
        case 'resize':
          width = data.width;
          height = data.height;
          break;
          
        case 'update':
          // Actualizar y calcular partículas
          updateParticles();
          // Enviar partículas actualizadas de vuelta al hilo principal
          self.postMessage({ 
            type: 'updated', 
            data: { 
              particles,
              // Calcular conexiones
              connections: calculateConnections() 
            } 
          });
          break;
      }
    };

    // Actualizar posiciones de partículas
    function updateParticles() {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Calcular fuerzas
        let dx = p.ix - p.x;
        let dy = p.iy - p.y;
        let dist = Math.hypot(dx, dy);
        
        // Definir factores de movimiento
        const pushFactor = 0.01;
        const pullFactor = 0.002;
        const dampFactor = 0.96;
        const minDist = 100;
        
        // Fuerza de retorno a posición inicial
        let vx = dx * pullFactor;
        let vy = dy * pullFactor;
        
        // Opacidad basada en distancia
        p.opacity = mapRange(dist, 0, 100, 1, 0.3, true);
        
        // Interacción con cursor
        if (cursor.x < 9000) {
          dx = p.x - cursor.x;
          dy = p.y - cursor.y;
          dist = Math.hypot(dx, dy);
          
          if (dist < minDist) {
            const force = (minDist - dist) * pushFactor;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }
        }
        
        // Actualizar velocidad (simplificado para rendimiento)
        p.x += vx;
        p.y += vy;
        
        // Mantener dentro de los límites
        if (p.x < 0) p.x = 0;
        if (p.x > width) p.x = width;
        if (p.y < 0) p.y = 0;
        if (p.y > height) p.y = height;
      }
    }
    
    // Calcular conexiones entre partículas cercanas
    function calculateConnections() {
      const connections = [];
      const len = particles.length;
      
      // Para optimizar, solo revisamos cada 3 partículas con cada 3 partículas (1/9 de conexiones)
      for (let i = 0; i < len; i += 3) {
        for (let j = i + 3; j < len; j += 3) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);
          
          if (dist < lineDistance) {
            const alpha = 1 - dist / lineDistance;
            connections.push({
              x1: p1.x,
              y1: p1.y,
              x2: p2.x,
              y2: p2.y,
              alpha
            });
            
            // Limitar conexiones totales para mejor rendimiento
            if (connections.length > 100) break;
          }
        }
        
        // Limitar conexiones totales
        if (connections.length > 100) break;
      }
      
      return connections;
    }
  `;
};

interface FooterParticlesProps {
  imageA: string;
  imageB: string;
  lineDistance?: number;
  particleSize?: number;
  particleSpacing?: number;
}

export default function FooterParticlesConstellation({
  imageA,
  imageB,
  lineDistance = 60,
  particleSize = 1.2,
  particleSpacing = 18,
}: FooterParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const [particlesReady, setParticlesReady] = useState(false);
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const requestRef = useRef<number>();
  const particlesDataRef = useRef<{
    particles: Particle[];
    connections: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      alpha: number;
    }[];
  }>({ particles: [], connections: [] });

  // Extraer datos de imagen de manera eficiente
  const getImageData = (
    img: HTMLImageElement,
    width: number,
    height: number
  ) => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("No context for tempCanvas");

    // Escalar imagen para mejorar rendimiento
    ctx.drawImage(img, 0, 0, width, height);
    return ctx.getImageData(0, 0, width, height);
  };

  // Crear partículas optimizadas
  const createParticles = (
    width: number,
    height: number,
    dataA: ImageData,
    dataB: ImageData
  ) => {
    const arr: Particle[] = [];
    const spacing = particleSpacing;

    // Muestrear la imagen con espaciado para reducir partículas
    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        const ix = Math.floor(x);
        const iy = Math.floor(y);
        const index = (iy * width + ix) * 4;

        if (index >= dataA.data.length) continue;

        // Solo usar píxeles con suficiente alfa y brillo
        const alpha = dataA.data[index + 3];
        if (alpha < 30) continue;

        const rA = dataA.data[index];
        const gA = dataA.data[index + 1];
        const bA = dataA.data[index + 2];

        const brightness = (rA + gA + bA) / 3;
        if (brightness < 20) continue;

        // 80% de probabilidad de crear partícula para reducir densidad
        if (Math.random() > 0.8) continue;

        // Para color, mezclamos las dos imágenes
        const rB = dataB.data[index];
        const gB = dataB.data[index + 1];
        const bB = dataB.data[index + 2];

        // Generar color mezclado
        const r = Math.floor((rA + rB) / 2);
        const g = Math.floor((gA + gB) / 2);
        const b = Math.floor((bA + bB) / 2);
        const color = `rgb(${r}, ${g}, ${b})`;

        // Tamaño basado en brillo
        const radius = mapRange(brightness, 0, 255, 1, particleSize * 2, true);

        arr.push({
          x,
          y,
          ix: x,
          iy: y,
          radius,
          color,
          opacity: 1,
        });
      }
    }

    // Limitar número total de partículas
    const maxParticles = 800; // Reducido para mejor rendimiento
    if (arr.length > maxParticles) {
      // Ordenar por tamaño y tomar las más grandes
      return arr.sort((a, b) => b.radius - a.radius).slice(0, maxParticles);
    }

    return arr;
  };

  // Función para renderizar el canvas
  const renderCanvas = () => {
    const ctx = contextRef.current;
    if (!ctx) return;

    const { width, height } = dimensionsRef.current;
    const { particles, connections } = particlesDataRef.current;

    // Limpiar canvas con fade
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, width, height);

    // Dibujar conexiones
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 0.3;

    // Usar blend mode para efecto de brillo
    ctx.globalCompositeOperation = "screen";

    connections.forEach((conn) => {
      ctx.globalAlpha = conn.alpha * 0.3;
      ctx.beginPath();
      ctx.moveTo(conn.x1, conn.y1);
      ctx.lineTo(conn.x2, conn.y2);
      ctx.stroke();
    });

    // Dibujar partículas
    ctx.globalAlpha = 1;

    particles.forEach((p) => {
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Restaurar modo de composición
    ctx.globalCompositeOperation = "source-over";

    requestRef.current = requestAnimationFrame(renderCanvas);
  };

  // Iniciar worker
  const initWorker = (particles: Particle[]) => {
    // Crear blob para el worker
    const blob = new Blob([generateWorkerCode()], {
      type: "application/javascript",
    });
    const workerUrl = URL.createObjectURL(blob);

    // Crear worker
    const worker = new Worker(workerUrl);
    workerRef.current = worker;

    // Configurar listener para recibir datos del worker
    worker.onmessage = (e) => {
      const { type, data } = e.data;

      if (type === "updated") {
        particlesDataRef.current = data;

        // Si es primera vez, iniciar animación
        if (!particlesReady) {
          setParticlesReady(true);
          if (!requestRef.current) {
            requestRef.current = requestAnimationFrame(renderCanvas);
          }
        }
      }
    };

    // Inicializar worker con datos
    const { width, height } = dimensionsRef.current;
    worker.postMessage({
      type: "init",
      data: {
        particles,
        width,
        height,
        lineDistance,
      },
    });

    // Empezar bucle de actualización
    const updateLoop = () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ type: "update" });
        setTimeout(updateLoop, 1000 / 30); // 30 FPS para actualización
      }
    };

    updateLoop();

    // Limpiar URL
    URL.revokeObjectURL(workerUrl);
  };

  // Función de resize optimizada
  const handleResize = async () => {
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

    dimensionsRef.current = { width: w, height: h };

    const ctx = canvas.getContext("2d", { alpha: true });
    if (ctx) {
      ctx.scale(dpi, dpi);
      contextRef.current = ctx;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
    }

    // Actualizar dimensiones en worker
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: "resize",
        data: { width: w, height: h },
      });
    }

    // Cargar imágenes y crear partículas
    if (!particlesReady) {
      try {
        const [imgA, imgB] = await Promise.all([
          loadImage(imageA),
          loadImage(imageB),
        ]);

        const dataA = getImageData(imgA, w, h);
        const dataB = getImageData(imgB, w, h);

        const newParticles = createParticles(w, h, dataA, dataB);
        initWorker(newParticles);
      } catch (error) {
        console.error("Error cargando imágenes: ", error);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Eventos de mouse optimizados
    const onMouseMove = throttle((e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      cursorRef.current = position;

      // Enviar posición al worker
      if (workerRef.current) {
        workerRef.current.postMessage({
          type: "cursor",
          data: { position },
        });
      }
    }, 20); // Reducido a 50fps para mejor rendimiento

    const onMouseLeave = () => {
      const position = { x: 9999, y: 9999 };
      cursorRef.current = position;

      if (workerRef.current) {
        workerRef.current.postMessage({
          type: "cursor",
          data: { position },
        });
      }
    };

    // Resize handling
    const debouncedResize = throttle(() => {
      handleResize();
    }, 250);

    window.addEventListener("resize", debouncedResize);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    handleResize();

    return () => {
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      // Terminar worker
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [imageA, imageB]);

  return (
    <canvas
      ref={canvasRef}
      className={cx("footer__particles-canvas")}
      aria-hidden="true"
    />
  );
}
