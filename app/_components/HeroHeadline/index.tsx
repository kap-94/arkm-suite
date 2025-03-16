"use client";

import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import gsap from "gsap";

// Componentes locales
import { FONTS } from "@/app/_lib/fonts";
import WebGLText from "@/app/_components/WebGLText";
import useMousePosition from "@/app/_hooks/useMousePosition";
import { plasmaPulseShader } from "@/app/_lib/shaders";

// Estilos
import styles from "./HeroHeadline.module.scss";

const cx = classNames.bind(styles);

// Tipado
interface HeroHeadlineProps {
  headline: {
    create: string;
    scale: string;
    transform: string;
  };
}

export const HeroHeadline = ({ headline }: HeroHeadlineProps) => {
  // Estados
  const [isHovered, setIsHovered] = useState(false);
  const [isShaderComplete, setIsShaderComplete] = useState(false);
  const [isShaderFadedOut, setIsShaderFadedOut] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  // Refs
  const textBehindRef = useRef<HTMLDivElement>(null);
  const textFrontRef = useRef<HTMLDivElement>(null);
  const textBehindBlurRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  // Posición del mouse
  const { x, y } = useMousePosition();

  // Texto principal
  const headlineText = {
    create: headline.create,
    scale: headline.scale,
    transform: headline.transform,
  };

  // Handlers para el shader de WebGLText
  const handleShaderComplete = () => setIsShaderComplete(true);
  const handleShaderFadeOut = () => setIsShaderFadedOut(true);

  // Efecto para animación de mouse en los textos
  useEffect(() => {
    if (!maskRef.current) return;

    const normalizedX = (x - window.innerWidth / 2) / (window.innerWidth / 2);
    const normalizedY = (y - window.innerHeight / 2) / (window.innerHeight / 2);
    const acceleration = (dist: number) =>
      Math.sign(dist) * Math.pow(Math.abs(dist), 1.5);

    const moveX = acceleration(normalizedX) * 30;
    const moveY = acceleration(normalizedY) * 30;

    // Determina si el mouse se está moviendo "lo suficiente"
    const movingNow = Math.abs(moveX) > 2 || Math.abs(moveY) > 2;
    setIsMouseMoving(movingNow);

    // Animaciones GSAP para el texto detrás
    gsap.to([textBehindRef.current, maskRef.current], {
      x: moveX * 0.4,
      y: moveY * 0.4,
      rotateY: moveX * 0.1,
      rotateX: -moveY * 0.1,
      z: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(textBehindBlurRef.current, {
      x: moveX * 2,
      y: moveY * 2,
      rotateY: moveX * 0.3,
      rotateX: -moveY * 0.3,
      z: 20,
      duration: 1,
      ease: "power2.out",
    });

    // Texto frontal: solo visible cuando se mueva el mouse y el shader haya hecho fade out
    if (textFrontRef.current) {
      const distance = Math.sqrt(
        normalizedX * normalizedX + normalizedY * normalizedY
      );
      const offsetAmount = Math.min(distance * 10, 5);
      const intensity = 0.5 + distance * 0.5;

      if (movingNow && isShaderFadedOut) {
        // Se muestra y anima
        gsap.to(textFrontRef.current, {
          opacity: 1,
          x: moveX * 2.5,
          y: moveY * 2.5,
          rotateY: moveX * 0.5,
          rotateX: -moveY * 0.5,
          z: 50,
          scale: 1,
          textShadow: `
            ${-offsetAmount}px 0 rgba(255,0,0,${intensity}),
            ${offsetAmount}px 0 rgba(0,255,255,${intensity})
          `,
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        // Se oculta
        gsap.to(textFrontRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  }, [x, y, isHovered, isShaderFadedOut]);

  return (
    <div className={cx("hero-headline")}>
      {/* Capas de texto detrás */}
      <div
        ref={textBehindRef}
        className={cx("hero-headline__text", "hero-headline__text--behind", {
          "hero-headline__text--visible": isShaderFadedOut,
        })}
        style={{ marginTop: 0 }}
      >
        {headlineText.create}
        <span className={cx("hero-headline__text-indent")}>
          {headlineText.scale}
        </span>
        <br />
        {headlineText.transform}
      </div>

      <div
        ref={textBehindBlurRef}
        className={cx("hero-headline__text", "hero-headline__text--blur", {
          "hero-headline__text--visible": isShaderFadedOut,
        })}
      >
        {headlineText.create}
        <span className={cx("hero-headline__text-indent")}>
          {headlineText.scale}
        </span>
        <br />
        {headlineText.transform}
      </div>

      <div
        className={cx("hero-headline__text", "hero-headline__text--main", {
          "hero-headline__text--visible": isShaderFadedOut,
        })}
      >
        {headlineText.create}
        <span className={cx("hero-headline__text-indent")}>
          {headlineText.scale}
        </span>
        <br />
        {headlineText.transform}
      </div>

      <div
        className={cx(
          "hero-headline__text",
          "hero-headline__text--white-stroke",
          {
            "hero-headline__text--visible": isShaderFadedOut,
          }
        )}
      >
        {headlineText.create}
        <span className={cx("hero-headline__text-indent")}>
          {headlineText.scale}
        </span>
        <br />
        {headlineText.transform}
      </div>

      <div
        className={cx(
          "hero-headline__text",
          "hero-headline__text--permanent-stroke",
          {
            "hero-headline__text--visible": isShaderFadedOut,
          }
        )}
      >
        {headlineText.create}
        <span className={cx("hero-headline__text-indent")}>
          {headlineText.scale}
        </span>
        <br />
        {headlineText.transform}
      </div>

      {/* Texto frontal - controlado por GSAP y su opacidad depende de isMouseMoving + isShaderFadedOut */}
      <div
        ref={textFrontRef}
        className={cx("hero-headline__text", "hero-headline__text--front")}
        style={{ opacity: 0 }} // Por defecto invisible
      >
        {headlineText.create},
        <span className={cx("hero-headline__text-indent")}>
          {headlineText.scale}
        </span>
        <br />
        {headlineText.transform}
      </div>

      {/* WebGLText (el shader que tenías originalmente con plasmaPulseShader) */}
      {/* <WebGLText
        className={cx("hero-headline__webgl-text", {
          "hero-headline__webgl-text--fade-out": isShaderComplete,
        })}
        fragmentShader={plasmaPulseShader}
        text={[
          `${headlineText.create}, ${headlineText.scale}`,
          headlineText.transform,
        ]}
        options={{
          font: {
            family: FONTS.KRANTO.family,
            weight: FONTS.KRANTO.weights.light,
            style: "normal",
          },
          fontSize: {
            min: 64, // Tamaño mínimo que coincide con el CSS clamp
            max: 142, // Tamaño máximo que coincide con el CSS clamp
            preferred: 12, // Equivalente a los preferred vw en el CSS
          },
          color: "#ffffff",
          textAlign: "center",
          textBaseline: "middle",
          scale: 2,
          lineHeight: 0.92,
          letterSpacing: "0.01em",
          textTransform: "uppercase",
          position: {
            marginTop: "0",
            marginBottom: "0",
          },
          pixelRatio:
            typeof window !== "undefined" ? window.devicePixelRatio || 2 : 2,
        }}
        onComplete={handleShaderComplete}
        onFadeComplete={handleShaderFadeOut}
        fadeOutDuration={2}
        debug={process.env.NODE_ENV === "development"}
      /> */}

      {/* Máscara que responde al hover/mouse */}
      <div
        ref={maskRef}
        className={cx("hero-headline__mask", "hero-headline__mask--neon")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cx("hero-headline__mask-text")}>
          {headlineText.create}
          <span className={cx("hero-headline__mask-text-accent")}>,</span>
          <span className={cx("hero-headline__mask-text-indent")}>
            {headlineText.scale}
          </span>
          <br />
          {headlineText.transform}
        </div>
      </div>
    </div>
  );
};

export default HeroHeadline;
