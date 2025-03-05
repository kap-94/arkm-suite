"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

/** Utilidades simples */
const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamp?: boolean
) => {
  const newValue =
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  if (!clamp) return newValue;
  return Math.max(Math.min(newValue, outMax), outMin);
};

function interpolateColorRGB(colorA: string, colorB: string, t: number) {
  const extractRGB = (rgbStr: string) => {
    const result = rgbStr.match(/\d+/g);
    if (!result) return [0, 0, 0];
    return [parseInt(result[0]), parseInt(result[1]), parseInt(result[2])];
  };
  const [r1, g1, b1] = extractRGB(colorA);
  const [r2, g2, b2] = extractRGB(colorB);

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

/** Carga de imagen en una promesa */
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      console.log(`Imagen cargada correctamente: ${src}`);
      resolve(img);
    };
    img.onerror = (e) => {
      console.error(`Error al cargar imagen: ${src}`, e);
      reject(new Error(`No se pudo cargar ${src}`));
    };
    img.src = src;
  });
};

/** Tipos */
interface Vector {
  x: number;
  y: number;
}

/** Partícula original, con fuerza de cursor y colorA/B */
class Particle {
  x: number;
  y: number;
  ix: number;
  iy: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;

  radius: number;
  scale: number;
  colorA: string;
  colorB: string;
  finalColor: string;

  minDist: number;
  pushFactor: number;
  pullFactor: number;
  dampFactor: number;

  constructor({
    x,
    y,
    radius,
    colorA,
    colorB,
  }: {
    x: number;
    y: number;
    radius: number;
    colorA: string;
    colorB: string;
  }) {
    this.x = x;
    this.y = y;
    this.ix = x;
    this.iy = y;

    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;

    this.radius = radius;
    this.scale = 1;

    this.colorA = colorA;
    this.colorB = colorB;
    this.finalColor = colorA;

    this.minDist = randomRange(80, 160);
    this.pushFactor = randomRange(0.01, 0.02);
    this.pullFactor = randomRange(0.002, 0.006);
    this.dampFactor = randomRange(0.9, 0.95);
  }

  update(cursor: Vector) {
    // Atracción hacia la posición inicial
    let dx = this.ix - this.x;
    let dy = this.iy - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    this.ax = dx * this.pullFactor;
    this.ay = dy * this.pullFactor;

    // Escala y color final según distancia
    this.scale = mapRange(dist, 0, 200, 1, 4, true);
    const t = mapRange(dist, 0, 200, 0, 1, true);
    this.finalColor = interpolateColorRGB(this.colorA, this.colorB, t);

    // Empuje desde cursor
    dx = this.x - cursor.x;
    dy = this.y - cursor.y;
    dist = Math.sqrt(dx * dx + dy * dy);

    const distDelta = this.minDist - dist;
    if (dist < this.minDist) {
      this.ax += (dx / dist) * distDelta * this.pushFactor;
      this.ay += (dy / dist) * distDelta * this.pushFactor;
    }

    // Velocidad
    this.vx += this.ax;
    this.vy += this.ay;
    this.vx *= this.dampFactor;
    this.vy *= this.dampFactor;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.finalColor;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * this.scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

interface FooterParticlesProps {
  imageA: string;
  imageB: string;
  lineDistance?: number; // hasta qué distancia dibujamos líneas
}

export default function FooterParticlesConstellation({
  imageA,
  imageB,
  lineDistance = 60,
}: FooterParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number>();
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const isAnimatingRef = useRef<boolean>(false);

  const [imgDataA, setImgDataA] = useState<ImageData | null>(null);
  const [imgDataB, setImgDataB] = useState<ImageData | null>(null);

  // getImageData, createParticles, createTemporaryParticles (iguales a tu original)
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
    ctx.drawImage(img, 0, 0, width, height);
    return ctx.getImageData(0, 0, width, height);
  };

  const createParticles = (
    width: number,
    height: number,
    dataA: ImageData,
    dataB: ImageData
  ) => {
    const arr: Particle[] = [];
    const spacing = 15;

    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        const ix = Math.floor(x);
        const iy = Math.floor(y);
        const index = (iy * width + ix) * 4;
        if (index >= dataA.data.length) continue;

        const rA = dataA.data[index];
        const gA = dataA.data[index + 1];
        const bA = dataA.data[index + 2];
        const alphaA = dataA.data[index + 3];
        if (alphaA < 50) continue;

        const brightness = (rA + gA + bA) / 3;
        if (brightness < 5) continue;

        const rB = dataB.data[index];
        const gB = dataB.data[index + 1];
        const bB = dataB.data[index + 2];
        const colorA = `rgb(${rA}, ${gA}, ${bA})`;
        const colorB = `rgb(${rB}, ${gB}, ${bB})`;

        const radius = mapRange(brightness, 0, 255, 1.5, 5, true);
        arr.push(new Particle({ x, y, radius, colorA, colorB }));
      }
    }
    return arr;
  };

  const createTemporaryParticles = (width: number, height: number) => {
    const temp: Particle[] = [];
    const numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const colorA = `rgb(20, 50, 150)`;
      const colorB = `rgb(100, 20, 80)`;
      temp.push(new Particle({ x, y, radius: 3, colorA, colorB }));
    }
    return temp;
  };

  // Animación, agregamos la lógica para dibujar líneas entre partículas cercanas
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Actualizar cada partícula
    particles.forEach((p) => {
      p.update(cursorRef.current);
    });

    // Dibujar líneas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < lineDistance) {
          const alpha = 1 - dist / lineDistance;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Dibujar partículas
    particles.forEach((p) => {
      p.draw(ctx);
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  // Resize
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

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpi, dpi);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
    }

    // Partículas temporales mientras no tengamos data
    if (!imgDataA || !imgDataB) {
      setParticles(createTemporaryParticles(w, h));
    }

    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      requestRef.current = requestAnimationFrame(animate);
    }

    if (!imgDataA || !imgDataB) {
      try {
        const [imgA, imgB] = await Promise.all([
          loadImage(imageA),
          loadImage(imageB),
        ]);
        const dataA = getImageData(imgA, w, h);
        const dataB = getImageData(imgB, w, h);
        setImgDataA(dataA);
        setImgDataB(dataB);
        setParticles(createParticles(w, h, dataA, dataB));
      } catch (error) {
        console.error("Error cargando imágenes: ", error);
      }
    } else {
      setParticles(createParticles(w, h, imgDataA, imgDataB));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        isAnimatingRef.current = false;
      }
    };
  }, [imageA, imageB, imgDataA, imgDataB, lineDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={cx("footer__particles-canvas")}
      aria-hidden="true"
    />
  );
}
