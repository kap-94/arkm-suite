"use client";

import { useLayoutEffect, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Objeto para almacenar la sección activa global
// Esto permite que solo haya una sección activa a la vez entre todas las instancias
const globalState = {
  activeSectionId: null as string | null,
  lastUpdateTime: 0,
};

// Hook para detectar secciones activas durante el scroll
const useScrollActiveSection = (sectionIds: string[], offset = 100) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  // Refs para prevenir bucles de actualización
  const processingRef = useRef(false);
  const lastUpdateTimeRef = useRef(0);

  // Función para determinar si un elemento es visible en el viewport
  const isElementVisible = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const triggerPoint = viewportHeight * 0.3; // 30% del viewport

    return (
      rect.top <= triggerPoint + offset && rect.bottom >= triggerPoint - offset
    );
  };

  // Efecto para manejar el scroll y determinar la sección activa
  useLayoutEffect(() => {
    if (!sectionIds || !sectionIds.length) return;

    let animationFrameId: number | null = null;

    const handleScroll = () => {
      if (processingRef.current) return;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        processingRef.current = true;

        // Verificar si estamos en la página home
        const isHome =
          pathname === `/${pathname.split("/")[1]}` ||
          pathname === `/${pathname.split("/")[1]}/` ||
          pathname.includes("#");

        if (!isHome) {
          // No estamos en home, desactivar sección
          setActiveSection(null);
          processingRef.current = false;
          return;
        }

        let foundVisibleSection = false;
        let highestVisibilityRatio = 0;
        let mostVisibleSection: string | null = null;

        // Verificar cada sección
        for (const sectionId of sectionIds) {
          const element = document.getElementById(sectionId);
          if (!element) continue;

          if (isElementVisible(element)) {
            foundVisibleSection = true;

            // Calcular la visibilidad relativa
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const visibilityRatio = Math.min(
              1,
              Math.max(
                0,
                (viewportHeight - Math.abs(rect.top - offset)) / viewportHeight
              )
            );

            if (visibilityRatio > highestVisibilityRatio) {
              highestVisibilityRatio = visibilityRatio;
              mostVisibleSection = sectionId;
            }
          }
        }

        const now = Date.now();
        lastUpdateTimeRef.current = now;

        if (foundVisibleSection && mostVisibleSection) {
          // Actualizar el estado global con el timestamp
          globalState.activeSectionId = mostVisibleSection;
          globalState.lastUpdateTime = now;

          // Solo activar si esta sección pertenece a este hook
          if (sectionIds.includes(mostVisibleSection)) {
            setActiveSection(mostVisibleSection);
          } else {
            setActiveSection(null);
          }
        } else if (!foundVisibleSection) {
          // No hay sección visible
          if (globalState.lastUpdateTime <= lastUpdateTimeRef.current) {
            globalState.activeSectionId = null;
          }
          setActiveSection(null);
        }

        // Forzar una suscripción al estado global
        // Si otra instancia ha activado una sección que no nos pertenece, desactivamos la nuestra
        if (
          globalState.activeSectionId &&
          globalState.activeSectionId !== activeSection &&
          globalState.lastUpdateTime > lastUpdateTimeRef.current &&
          !sectionIds.includes(globalState.activeSectionId)
        ) {
          setActiveSection(null);
        }

        processingRef.current = false;
      });
    };

    // Comprobar el estado inicial
    handleScroll();

    // Añadir listener de scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Limpiar al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [sectionIds, offset, pathname, activeSection]);

  // Reset cuando cambiamos de página
  useEffect(() => {
    setActiveSection(null);
  }, [pathname]);

  // Suscribirse a cambios en el estado global
  useEffect(() => {
    const checkGlobalState = () => {
      // Si el estado global tiene una sección activa que no nos pertenece, desactivamos la nuestra
      if (
        globalState.activeSectionId &&
        activeSection !== null &&
        !sectionIds.includes(globalState.activeSectionId)
      ) {
        setActiveSection(null);
      }
    };

    // Verificar regularmente el estado global
    const intervalId = setInterval(checkGlobalState, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeSection, sectionIds]);

  return activeSection;
};

export default useScrollActiveSection;
