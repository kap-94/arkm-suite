"use client";

import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import styles from "./ShaderBackground.module.scss";

// Carga dinámica del componente ChromaticRippleScene para evitar problemas de SSR
const ChromaticRippleScene = dynamic(
  () => import("@/app/_components/WaveScene/ChromaticRippleScene"),
  { ssr: false, loading: () => <div className="loading-shader" /> }
);

const cx = classNames.bind(styles);

interface ShaderBackgroundProps {
  children: React.ReactNode;
}

export const ShaderBackground = ({
  children,
}: ShaderBackgroundProps): JSX.Element => {
  // Usamos MutableRefObject en lugar de RefObject para permitir asignaciones
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shaderRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  // Setup IntersectionObserver para optimización y detección de visibilidad
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Combinar refs
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      // Asignar al containerRef (ahora es válido porque es MutableRefObject)
      containerRef.current = node;
      // Ref para el IntersectionObserver
      inViewRef(node);
    },
    [inViewRef]
  );

  // Efecto para medir y actualizar dimensiones
  useEffect(() => {
    // No ejecutar en SSR
    if (typeof window === "undefined") return;

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

    // Configurar el seguimiento de scroll
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcula la posición relativa del contenedor en la ventana
      const containerTopRelative = rect.top / windowHeight;
      const containerBottomRelative = rect.bottom / windowHeight;

      // Calcula el progreso del scroll basado en la posición del contenedor
      // 0 cuando el contenedor está entrando en la vista (parte superior en la parte inferior de la ventana)
      // 1 cuando el contenedor está saliendo de la vista (parte inferior en la parte superior de la ventana)
      const progress =
        1 - (containerBottomRelative - 1) / (rect.height / windowHeight);

      // Limita el progreso entre 0 y 1
      setScrollPosition(Math.max(0, Math.min(1, progress)));
    };

    // Inicializar valor de scroll
    handleScroll();

    // Añadir listener para el scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Limpiar
    return () => {
      if (containerRef.current) {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      }
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", handleScroll);
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
      {/* Capa del shader */}
      <div
        ref={shaderRef}
        className={cx("shader", { active: inView })}
        style={{
          height: `${dimensions.height}px`,
          width: `${dimensions.width}px`,
        }}
      >
        {/* Solo renderizar la escena cuando esté visible para optimizar rendimiento */}
        {inView && <ChromaticRippleScene scrollProgress={scrollPosition} />}
      </div>

      {/* Capa de contenido */}
      <div ref={setRefs} className={cx("content")}>
        {children}
      </div>
    </div>
  );
};

export default ShaderBackground;
