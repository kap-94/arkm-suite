"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

interface FooterParticlesProps {
  imageA: string;
  imageB: string;
  lineDistance?: number;
}

interface Orb {
  baseX: number;
  baseY: number;
  radius: number;
  parallaxFactor: number;
  imageIndex: number; // 0 -> imageA, 1 -> imageB
}

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function FooterParticlesConstellation({
  imageA,
  imageB,
  lineDistance = 100,
}: FooterParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const [imgA, setImgA] = useState<HTMLImageElement | null>(null);
  const [imgB, setImgB] = useState<HTMLImageElement | null>(null);
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });

  // Utility to load images
  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });

  // Create orbs
  const createOrbs = (width: number, height: number) => {
    const newOrbs: Orb[] = [];
    const count = 5; // 5 large orbs
    for (let i = 0; i < count; i++) {
      newOrbs.push({
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        radius: Math.random() * 80 + 100,
        parallaxFactor: 0.02 + Math.random() * 0.03,
        imageIndex: Math.random() < 0.5 ? 0 : 1,
      });
    }
    return newOrbs;
  };

  // Create stars
  const createStars = (width: number, height: number) => {
    const newStars: Star[] = [];
    const count = 50;
    for (let i = 0; i < count; i++) {
      newStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 2 + 1,
      });
    }
    return newStars;
  };

  // Animation
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx || !imgA || !imgB) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw orbs (big image circles)
    orbs.forEach((orb) => {
      const img = orb.imageIndex === 0 ? imgA : imgB;

      // Parallax offset
      const offsetX = (cursorRef.current.x - width / 2) * orb.parallaxFactor;
      const offsetY = (cursorRef.current.y - height / 2) * orb.parallaxFactor;

      if (img) {
        const x = orb.baseX + offsetX;
        const y = orb.baseY + offsetY;
        ctx.save();
        ctx.globalAlpha = 0.15; // subtle
        ctx.beginPath();
        ctx.arc(x, y, orb.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Draw image covering the circle
        ctx.drawImage(
          img,
          x - orb.radius,
          y - orb.radius,
          orb.radius * 2,
          orb.radius * 2
        );
        ctx.restore();
      }
    });

    // Update & draw stars
    stars.forEach((star) => {
      // Move
      star.x += star.vx;
      star.y += star.vy;
      // Wrap edges
      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;
    });

    // Lines between close stars
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const s1 = stars[i];
        const s2 = stars[j];
        const dx = s1.x - s2.x;
        const dy = s1.y - s2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < lineDistance) {
          ctx.save();
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / lineDistance})`;
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Draw stars as small circles
    ctx.save();
    ctx.fillStyle = "#ffffff";
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    requestRef.current = requestAnimationFrame(animate);
  };

  // Resize
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
    if (ctx) {
      ctx.scale(dpi, dpi);
      ctx.clearRect(0, 0, w, h);
    }

    // Re-create orbs & stars
    setOrbs(createOrbs(w, h));
    setStars(createStars(w, h));
  };

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const [imageAObj, imageBObj] = await Promise.all([
          loadImage(imageA),
          loadImage(imageB),
        ]);
        if (!mounted) return;
        setImgA(imageAObj);
        setImgB(imageBObj);
        handleResize();
        requestRef.current = requestAnimationFrame(animate);
      } catch (e) {
        console.error("Error loading images", e);
      }
    };
    init();

    window.addEventListener("resize", handleResize);
    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageA, imageB]);

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
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
