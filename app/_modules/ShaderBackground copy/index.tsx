"use client";

import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import ParticleFlowScene from "@/app/_components/WaveScene/ParticleFlowScene";
import NeonLinesScene from "@/app/_components/WaveScene/NeonLinesScene";

import styles from "./ShaderBackground.module.scss";
import InteractiveParticleFlux from "@/app/_components/WaveScene/InteractiveParticleFlux";
import LuminousFluxScene from "@/app/_components/WaveScene/LuminousFluxScene";
import ChromaticRippleScene from "@/app/_components/WaveScene/ChromaticRippleScene";

const cx = classNames.bind(styles);

interface ShaderBackgroundProps {
  children: React.ReactNode;
}

export const ShaderBackground = ({ children }: ShaderBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  // Efecto para medir y actualizar dimensiones
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          height: rect.height,
          width: rect.width,
        });
      }
    };

    // Actualización inicial
    updateDimensions();

    // Configurar ResizeObserver para actualizaciones con cambios de tamaño
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Manejar cambios en la ventana
    window.addEventListener("resize", updateDimensions);

    // Observer para cuando se añaden/eliminan clases o estilo
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        updateDimensions();
      });
    });

    if (containerRef.current) {
      mutationObserver.observe(containerRef.current, {
        attributes: true,
        attributeFilter: ["style", "class"],
        childList: true,
        subtree: true,
      });
    }

    // Limpiar
    return () => {
      if (containerRef.current) {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      }
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Actualizar dimensiones cuando cambia el contenido
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        height: rect.height,
        width: rect.width,
      });
    }
  }, [children]);

  return (
    <div className={cx("background-container")}>
      <div
        ref={shaderRef}
        className={cx("shader")}
        style={{
          height: `${dimensions.height}px`,
          width: `${dimensions.width}px`,
        }}
      >
        <ChromaticRippleScene />
      </div>

      <div ref={containerRef} className={cx("content")}>
        {children}
      </div>
    </div>
  );
};

export default ShaderBackground;
