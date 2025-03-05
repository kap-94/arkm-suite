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

/** Partícula con efecto swirl */
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

  // Propios del swirl
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;

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

    this.orbitRadius = randomRange(5, 50);
    this.orbitAngle = Math.random() * Math.PI * 2;
    this.orbitSpeed = randomRange(0.005, 0.02);
  }

  update(cursor: Vector) {
    // Órbita en torno a (ix, iy) antes de aplicar el resto de fuerzas
    this.orbitAngle += this.orbitSpeed;
    const swirlX = this.ix + Math.cos(this.orbitAngle) * this.orbitRadius;
    const swirlY = this.iy + Math.sin(this.orbitAngle) * this.orbitRadius;

    // Fuerza de "retorno" a la posición de órbita
    let dx = swirlX - this.x;
    let dy = swirlY - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    this.ax = dx * this.pullFactor;
    this.ay = dy * this.pullFactor;

    // Escala e interpolación de color igual que en el original
    this.scale = mapRange(dist, 0, 200, 1, 4, true);
    const t = mapRange(dist, 0, 200, 0, 1, true);
    this.finalColor = interpolateColorRGB(this.colorA, this.colorB, t);

    // Empuje desde cursor (igual que original)
    dx = this.x - cursor.x;
    dy = this.y - cursor.y;
    dist = Math.sqrt(dx * dx + dy * dy);

    const distDelta = this.minDist - dist;
    if (dist < this.minDist) {
      this.ax += (dx / dist) * distDelta * this.pushFactor;
      this.ay += (dy / dist) * distDelta * this.pushFactor;
    }

    // Velocidad y amortiguamiento
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
}

export default function FooterParticlesSwirl({
  imageA,
  imageB,
}: FooterParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number>();
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const isAnimatingRef = useRef<boolean>(false);

  const [imgDataA, setImgDataA] = useState<ImageData | null>(null);
  const [imgDataB, setImgDataB] = useState<ImageData | null>(null);

  // Función para obtener ImageData
  const getImageData = (
    img: HTMLImageElement,
    width: number,
    height: number
  ): ImageData => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      throw new Error("No context for tempCanvas");
    }
    ctx.drawImage(img, 0, 0, width, height);
    return ctx.getImageData(0, 0, width, height);
  };

  // Crear partículas
  const createParticles = (
    width: number,
    height: number,
    dataA: ImageData,
    dataB: ImageData
  ): Particle[] => {
    const arr: Particle[] = [];
    const spacing = 15;

    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        const ix = Math.floor(x);
        const iy = Math.floor(y);
        const index = (iy * width + ix) * 4;

        if (index >= dataA.data.length) continue;

        const rA = dataA.data[index + 0];
        const gA = dataA.data[index + 1];
        const bA = dataA.data[index + 2];
        const alphaA = dataA.data[index + 3];
        if (alphaA < 50) continue;

        const brightness = (rA + gA + bA) / 3;
        if (brightness < 5) continue;

        const colorA = `rgb(${rA}, ${gA}, ${bA})`;

        const rB = dataB.data[index + 0];
        const gB = dataB.data[index + 1];
        const bB = dataB.data[index + 2];
        const colorB = `rgb(${rB}, ${gB}, ${bB})`;

        const radius = mapRange(brightness, 0, 255, 1.5, 5, true);

        arr.push(new Particle({ x, y, radius, colorA, colorB }));
      }
    }
    return arr;
  };

  // Partículas temporales
  const createTemporaryParticles = (
    width: number,
    height: number
  ): Particle[] => {
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

  // Animación
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update(cursorRef.current);
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

    // Mientras no tengamos ImageData, partículas temporales
    if (!imgDataA || !imgDataB) {
      setParticles(createTemporaryParticles(w, h));
    }

    // Iniciar animación si no está en marcha
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      requestRef.current = requestAnimationFrame(animate);
    }

    // Cargar imágenes si no están cargadas
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
        console.error("Error en carga de imágenes: ", error);
      }
    } else {
      // Ya tenemos datos, simplemente recreamos partículas
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
  }, [imageA, imageB, imgDataA, imgDataB]);

  return (
    <canvas
      ref={canvasRef}
      className={cx("footer__particles-canvas")}
      aria-hidden="true"
    />
  );
}
