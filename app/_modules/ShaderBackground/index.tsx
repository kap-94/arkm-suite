"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames/bind";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import styles from "./ShaderBackground.module.scss";
import ParallaxDepthScene from "@/app/_components/WaveScene/ParallaxDepthScene";
// import FragmentationScene from "@/app/_components/WaveScene/FragmentationScene copy 2";
import FragmentationScene from "@/app/_components/WaveScene/FragmentationScene copy";
import PrismaticGlass from "@/app/_components/WaveScene/PrismaticGlass";
import DeepSpaceShader from "@/app/_components/WaveScene/DeepSpaceShader";
import MinimalNoirShader from "@/app/_components/WaveScene/MinimalNoirShader";
import CorporateDarkShader from "@/app/_components/WaveScene/CorporateDarkShader";
import DarkEleganceShader from "@/app/_components/WaveScene/DarkEleganceShader";
import DarkMidnightShader from "@/app/_components/WaveScene/DarkMidnightShader";
// import FragmentationScene from "@/app/_components/WaveScene/FragmentationScene";

const cx = classNames.bind(styles);

// Carga dinámica del componente Three.js para evitar SSR
const ChromaticRippleScene = dynamic(
  () => import("@/app/_components/WaveScene/ChromaticRippleScene"),
  { ssr: false, loading: () => <div className={cx("loading-shader")} /> }
);

interface ShaderBackgroundProps {
  children: React.ReactNode;
}

export const ShaderBackground = ({ children }: ShaderBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shaderRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  // IntersectionObserver para render condicional de la escena
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Combinar refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ height: rect.height, width: rect.width });
      }
    };

    updateDimensions();

    // Observador de resize
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={cx("background-container")}>
      {/* Shader layer */}
      <div
        ref={shaderRef}
        className={cx("shader", { active: inView })}
        style={{
          height: `${dimensions.height}px`,
          width: `${dimensions.width}px`,
        }}
      >
        {/* {inView && <ChromaticRippleScene />} */}
        {/* {inView && <ParallaxDepthScene />} */}
        {/* {inView && <FragmentationScene />} */}
        {/* {inView && <MinimalNoirShader />} */}
        {/* {inView && <PrismaticGlass />} */}
        {/* {inView && <DarkEleganceShader />} */}
        {/* {inView && <DarkMidnightShader />} */}
        {inView && <CorporateDarkShader />}
        {/* {inView && <DeepSpaceShader />} */}
      </div>

      {/* Content layer */}
      <div ref={setRefs} className={cx("content")}>
        {children}
      </div>
    </div>
  );
};

export default ShaderBackground;
