"use client";

import React, { useEffect, useRef, useState } from "react";
import { FONTS } from "@/lib/fonts";
import { ProjectForm } from "@/components/ProjectForm";
import WebGLText from "@/components/WebGLText";
import classNames from "classnames/bind";
import Modal from "@/components/Modal";
import gsap from "gsap";
import { plasmaPulseShader } from "@/lib/shaders";
import styles from "./Hero.module.scss";
import useMousePosition from "@/hooks/useMousePosition";
import { HeroDictionary } from "@/types/dictionary/home.types";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/Button";

const cx = classNames.bind(styles);

interface HeroProps {
  dictionary: HeroDictionary;
}

export const Hero = ({ dictionary }: HeroProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isShaderComplete, setIsShaderComplete] = useState(false);
  const [isShaderFadedOut, setIsShaderFadedOut] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  const textBehindRef = useRef<HTMLDivElement>(null);
  const textFrontRef = useRef<HTMLDivElement>(null);
  const textBehindBlurRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  const { x, y } = useMousePosition();

  const headlineText = {
    create: dictionary.headline.create,
    scale: dictionary.headline.scale,
    transform: dictionary.headline.transform,
  };

  const handleShaderComplete = () => setIsShaderComplete(true);
  const handleShaderFadeOut = () => setIsShaderFadedOut(true);

  // Effect for mouse movement animations
  useEffect(() => {
    if (maskRef.current) {
      const normalizedX = (x - window.innerWidth / 2) / (window.innerWidth / 2);
      const normalizedY =
        (y - window.innerHeight / 2) / (window.innerHeight / 2);
      const acceleration = (distance: number) =>
        Math.sign(distance) * Math.pow(Math.abs(distance), 1.5);
      const moveX = acceleration(normalizedX) * 30;
      const moveY = acceleration(normalizedY) * 30;

      const isMoving = Math.abs(moveX) > 2 || Math.abs(moveY) > 2;

      // Actualizar el estado de movimiento del mouse para controlar la visibilidad del texto frontal
      setIsMouseMoving(isMoving);

      const zPosition = isMoving ? 50 : 0;
      const transitionDuration = isMoving ? 0.8 : 1.5;

      // Animate text layers
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

      if (textFrontRef.current) {
        const distance = Math.sqrt(
          normalizedX * normalizedX + normalizedY * normalizedY
        );
        const offsetAmount = Math.min(distance * 10, 5);
        const intensity = 0.5 + distance * 0.5;

        // Hacer directamente el control de visibilidad
        if (isMoving && isShaderFadedOut) {
          gsap.to(textFrontRef.current, {
            opacity: 1,
            x: moveX * 2.5,
            y: moveY * 2.5,
            rotateY: moveX * 0.5,
            rotateX: -moveY * 0.5,
            z: zPosition,
            scale: 1,
            textShadow: `
              ${-offsetAmount}px 0 rgba(255,0,0,${intensity}),
              ${offsetAmount}px 0 rgba(0,255,255,${intensity})
            `,
            color: "rgba(255, 255, 255, 0.9)",
            duration: transitionDuration,
            ease: "power2.out",
          });
        } else {
          gsap.to(textFrontRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }
    }
  }, [x, y, isHovered, isShaderFadedOut]); // Añadimos isShaderFadedOut para que el efecto se actualice cuando cambie

  return (
    <section id="home" className={cx("hero")}>
      {/* Remove the background elements that will be provided by SharedBackgroundLayout */}
      <div className={cx("hero__ambient-glow")} />
      <div className={cx("hero__grid-background")} />

      <div className={cx("hero__headline")}>
        <div
          ref={textBehindRef}
          className={cx("hero__headline-text", "hero__headline-text--behind", {
            "hero__headline-text--visible": isShaderFadedOut,
          })}
        >
          {headlineText.create},
          <span className={cx("hero__headline-text-indent")}>
            {headlineText.scale}
          </span>
          <br />
          {headlineText.transform}
        </div>

        <div
          ref={textBehindBlurRef}
          className={cx("hero__headline-text", "hero__headline-text--blur", {
            "hero__headline-text--visible": isShaderFadedOut,
          })}
        >
          {headlineText.create},
          <span className={cx("hero__headline-text-indent")}>
            {headlineText.scale}
          </span>
          <br />
          {headlineText.transform}
        </div>

        <div
          className={cx("hero__headline-text", "hero__headline-text--main", {
            "hero__headline-text--visible": isShaderFadedOut,
          })}
        >
          {headlineText.create},
          <span className={cx("hero__headline-text-indent")}>
            {headlineText.scale}
          </span>
          <br />
          {headlineText.transform}
        </div>

        <div
          className={cx(
            "hero__headline-text",
            "hero__headline-text--white-stroke",
            {
              "hero__headline-text--visible": isShaderFadedOut,
            }
          )}
        >
          {headlineText.create},
          <span className={cx("hero__headline-text-indent")}>
            {headlineText.scale}
          </span>
          <br />
          {headlineText.transform}
        </div>

        <div
          className={cx(
            "hero__headline-text",
            "hero__headline-text--permanent-stroke",
            {
              "hero__headline-text--visible": isShaderFadedOut,
            }
          )}
        >
          {headlineText.create},
          <span className={cx("hero__headline-text-indent")}>
            {headlineText.scale}
          </span>
          <br />
          {headlineText.transform}
        </div>

        {/* Texto frontal - controlado directamente con GSAP */}
        <div
          ref={textFrontRef}
          className={cx("hero__headline-text", "hero__headline-text--front", {
            "hero__headline-text--shader-complete": isShaderFadedOut,
          })}
          style={{ opacity: 0 }} // Aseguramos que empieza invisible
        >
          {headlineText.create},
          <span className={cx("hero__headline-text-indent")}>
            {headlineText.scale}
          </span>
          <br />
          {headlineText.transform}
        </div>

        <WebGLText
          className={cx("hero__webgl-text", {
            "hero__webgl-text--fade-out": isShaderComplete,
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
        />
        <div
          ref={maskRef}
          className={cx("hero__mask", "hero__mask--neon")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={cx("hero__mask-text")}>
            {headlineText.create}
            <span className={cx("hero__mask-text-accent")}>,</span>
            <span className={cx("hero__mask-text-indent")}>
              {headlineText.scale}
            </span>
            <br />
            {headlineText.transform}
          </div>
        </div>
      </div>

      <div className={cx("hero__content")}>
        <div className={cx("hero__info")}>
          <Typography
            variant="p1"
            color="secondary"
            fontWeight={300}
            fontFamily="usual"
            theme="dark"
            className={cx("hero__info-subtitle")}
          >
            {dictionary.description.subtitle}
          </Typography>

          <Typography
            variant="h4"
            color="primary"
            fontWeight={300}
            fontFamily="usual"
            theme="dark"
            className={cx("hero__info-description")}
          >
            {dictionary.description.description}
          </Typography>

          <Modal>
            <Modal.Open opens="project-form">
              <Button size="lg" className={cx("hero__cta-button")}>
                {dictionary.description.cta}
              </Button>
            </Modal.Open>
            <Modal.Window name="project-form">
              <ProjectForm />
            </Modal.Window>
          </Modal>
        </div>

        <div className={cx("hero__scroll")}>
          <Typography
            variant="p3"
            color="tertiary"
            fontWeight={300}
            theme="dark"
            className={cx("hero__scroll-text")}
          >
            {dictionary.scroll}
          </Typography>
          <div className={cx("hero__scroll-indicator")} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
