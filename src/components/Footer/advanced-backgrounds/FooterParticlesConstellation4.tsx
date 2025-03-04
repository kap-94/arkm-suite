"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

interface FooterParticlesProps {
  imageA: string;
  imageB: string;
}

/**
 * This component slices each image into horizontal strips and draws each strip
 * at a varying horizontal offset. Over time, it animates these offsets using a sine wave.
 * We also layer both images (A & B) for a blended, surreal effect.
 */
export default function FooterParticlesConstellation({
  imageA,
  imageB,
}: FooterParticlesProps) {
  // We only animate on the client side to avoid SSR mismatches.
  const [hasMounted, setHasMounted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const timeRef = useRef(0);

  const [imgA, setImgA] = useState<HTMLImageElement | null>(null);
  const [imgB, setImgB] = useState<HTMLImageElement | null>(null);

  // Utility to load image in the browser
  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });

  /**
   * Main animation loop:
   *  1. Clear the canvas.
   *  2. Draw the slices for image A with a wave offset in x.
   *  3. Draw the slices for image B with a different wave offset & alpha for a blended effect.
   */
  const animate = () => {
    if (!hasMounted || !canvasRef.current || !imgA || !imgB) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    const { width, height } = canvas;
    // Increment time
    timeRef.current += 0.015; // tweak for speed
    const time = timeRef.current;

    // Clear
    ctx.clearRect(0, 0, width, height);

    /**
     * We'll slice each image into horizontal strips.
     * Try adjusting `slices` to get more or fewer strips.
     */
    const slices = 20;
    const sliceHeight = height / slices;

    // DRAW IMAGE A slices
    for (let i = 0; i < slices; i++) {
      const sy = (imgA.height / slices) * i; // source Y in image A
      const sh = imgA.height / slices; // source slice height

      const dy = sliceHeight * i; // dest Y in canvas
      const dh = sliceHeight; // dest slice height

      // Horizontal wave offset for image A
      const wave = Math.sin(time + i * 0.5) * 40; // amplitude=40 (adjust as you like)
      const dx = wave; // shift entire strip in x

      // drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
      ctx.drawImage(imgA, 0, sy, imgA.width, sh, dx, dy, width, dh);
    }

    // DRAW IMAGE B slices on top, with partial transparency & inverted wave
    ctx.globalAlpha = 0.4; // blending factor for B
    for (let i = 0; i < slices; i++) {
      const sy = (imgB.height / slices) * i;
      const sh = imgB.height / slices;

      const dy = sliceHeight * i;
      const dh = sliceHeight;

      // A different wave offset for image B
      const wave = Math.sin(time + i * 0.3 + Math.PI) * 50; // slightly different amplitude
      const dx = wave;

      ctx.drawImage(imgB, 0, sy, imgB.width, sh, dx, dy, width, dh);
    }
    // Reset alpha
    ctx.globalAlpha = 1.0;

    requestRef.current = requestAnimationFrame(animate);
  };

  // Resize & init canvas
  const handleResize = () => {
    if (!canvasRef.current) return;
    const parent = canvasRef.current.parentElement;
    if (!parent) return;

    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    const dpi = window.devicePixelRatio || 1;
    canvasRef.current.width = w * dpi;
    canvasRef.current.height = h * dpi;
    canvasRef.current.style.width = `${w}px`;
    canvasRef.current.style.height = `${h}px`;

    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      ctx.scale(dpi, dpi);
    }
  };

  // We only do real work on the client
  useEffect(() => {
    setHasMounted(typeof window !== "undefined");
  }, []);

  // Load images + start animation
  useEffect(() => {
    if (!hasMounted) return;

    let mounted = true;
    (async () => {
      try {
        const [imageAObj, imageBObj] = await Promise.all([
          loadImage(imageA),
          loadImage(imageB),
        ]);
        if (!mounted) return;
        setImgA(imageAObj);
        setImgB(imageBObj);

        // Resize once images are loaded
        handleResize();
        // Start the loop
        requestRef.current = requestAnimationFrame(animate);
      } catch (err) {
        console.error("Error loading images", err);
      }
    })();

    window.addEventListener("resize", handleResize);
    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMounted, imageA, imageB]);

  // Before the client has mounted, return a stable placeholder
  // to avoid SSR mismatch
  if (!hasMounted) {
    return (
      <div style={{ width: "100%", height: "100%", background: "#000" }} />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={cx("footer__particles-canvas")}
      aria-hidden="true"
    />
  );
}
