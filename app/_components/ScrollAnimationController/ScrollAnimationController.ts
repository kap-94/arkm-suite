"use client";
// ScrollAnimationController.ts
// Este controlador maneja las animaciones basadas en scroll para la escena 3D
// Optimizado para Next.js 14 con RSC y TypeScript

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MutableRefObject } from "react";
import * as THREE from "three";

// Registrar plugins de GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Tipo para la referencia al material
interface MaterialRef {
  current:
    | (THREE.ShaderMaterial & {
        uTime: number;
        uFrequency: number;
        uAmplitude: number;
        uColor: THREE.Color;
        uSecondaryColor: THREE.Color;
        uTexture: THREE.Texture;
        uRGBShift: number;
        uMouse: THREE.Vector2;
        uScrollProgress: number;
      })
    | null;
}

// Tipo para la referencia al mesh
type MeshRef = MutableRefObject<THREE.Mesh | null>;

// Interfaz para el estado de animación - debe exponer exactamente las mismas propiedades
// que ScrollAnimationController usa para la animación, y con la misma visibilidad
interface AnimationState {
  currentState: string;
}

class ScrollAnimationController implements AnimationState {
  private animations: gsap.core.Timeline[] = [];
  private scrollY: number = 0;
  private isActive: boolean = false;
  private sceneRef: MeshRef | null = null;
  private materialRef: MaterialRef | null = null;
  private initialized: boolean = false;
  private timeline: gsap.core.Timeline | null = null;
  // Hacemos currentState público para que coincida con la interfaz AnimationState
  public currentState: string = "intro";
  private scrollThrottleTimeout: NodeJS.Timeout | null = null;

  init(sceneRef: MeshRef, materialRef: MaterialRef): void {
    if (typeof window === "undefined" || this.initialized) return;

    this.sceneRef = sceneRef;
    this.materialRef = materialRef;
    this.initialized = true;

    this.setupScrollTrigger();
    console.log("ScrollAnimationController initialized");
  }

  private setupScrollTrigger(): void {
    // Crear línea de tiempo principal para todas las animaciones de scroll
    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Efecto de scrubbing suave
        onUpdate: (self) => {
          // Aplicar throttling para mejorar el rendimiento
          if (this.scrollThrottleTimeout)
            clearTimeout(this.scrollThrottleTimeout);
          this.scrollThrottleTimeout = setTimeout(() => {
            this.onScroll(self.progress);
          }, 16); // 60fps aproximado
        },
      },
    });

    // Definir keyframes de animación basados en el progreso del scroll
    // Estado inicial (0% scroll)
    this.timeline.set(this, { currentState: "intro" }, 0);

    // Transición al primer keyframe (20% scroll)
    this.timeline.to(
      this,
      {
        currentState: "firstTransition",
        onUpdate: () => this.updateMaterialByState(),
        duration: 0.2,
      },
      0
    );

    // Estado intermedio (50% scroll)
    this.timeline.to(
      this,
      {
        currentState: "midSection",
        onUpdate: () => this.updateMaterialByState(),
        duration: 0.3,
      },
      0.2
    );

    // Estado final (80% scroll)
    this.timeline.to(
      this,
      {
        currentState: "finale",
        onUpdate: () => this.updateMaterialByState(),
        duration: 0.3,
      },
      0.5
    );
  }

  private updateMaterialByState(): void {
    if (!this.materialRef || !this.materialRef.current) return;

    const material = this.materialRef.current;

    switch (this.currentState) {
      case "intro":
        gsap.to(material, {
          uFrequency: 3.0,
          uAmplitude: 0.2,
          uRGBShift: 0.01,
          duration: 1,
        });
        break;

      case "firstTransition":
        gsap.to(material, {
          uFrequency: 5.0,
          uAmplitude: 0.4,
          uRGBShift: 0.03,
          duration: 1,
        });
        break;

      case "midSection":
        gsap.to(material, {
          uFrequency: 2.0,
          uAmplitude: 0.6,
          uRGBShift: 0.05,
          duration: 1,
        });
        break;

      case "finale":
        gsap.to(material, {
          uFrequency: 6.0,
          uAmplitude: 0.3,
          uRGBShift: 0.07,
          duration: 1,
        });
        break;

      default:
        break;
    }
  }

  private onScroll(progress: number): void {
    if (!this.materialRef || !this.materialRef.current) return;

    // Actualizar parámetros del material basados en el progreso del scroll (0-1)
    const material = this.materialRef.current;

    // Actualizar el uniform de progreso de scroll
    material.uScrollProgress = progress;

    // Crear efectos dinámicos basados en la posición exacta del scroll
    // Estos efectos se mezclan con las animaciones de keyframe

    // Ejemplo: rotar el mesh basado en la posición del scroll
    if (this.sceneRef && this.sceneRef.current) {
      this.sceneRef.current.rotation.z = progress * Math.PI * 0.25;

      // Añadir movimiento vertical basado en scroll
      const initialY = this.sceneRef.current.userData.initialY || 0;
      this.sceneRef.current.position.y =
        initialY + Math.sin(progress * Math.PI) * 0.5;

      // Añadir efecto de "ascenso" cuando se hace scroll
      this.sceneRef.current.position.z =
        0.5 * Math.sin(progress * Math.PI * 0.5);

      // Efecto de rotación tridimensional
      this.sceneRef.current.rotation.x = progress * Math.PI * 0.1;
      this.sceneRef.current.rotation.y = progress * Math.PI * 0.15;
    }

    // Ajustes suaves a los parámetros del shader
    // Los valores precisos varían según el porcentaje exacto de scroll
    const dynamicFrequency = 2.0 + Math.sin(progress * Math.PI * 2) * 2.0;
    material.uFrequency = dynamicFrequency;

    // Intensidad del efecto RGB shift aumenta con el scroll
    material.uRGBShift = 0.01 + progress * 0.06;

    // Crear un patrón de ondas que cambia con el scroll
    const wave = Math.sin(progress * Math.PI * 4);
    material.uAmplitude = 0.2 + wave * 0.2;
  }

  destroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }

    if (this.scrollThrottleTimeout) {
      clearTimeout(this.scrollThrottleTimeout);
    }

    if (typeof window !== "undefined" && typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }

    this.initialized = false;
    this.sceneRef = null;
    this.materialRef = null;
    console.log("ScrollAnimationController destroyed");
  }
}

// Exportar una instancia singleton
export default new ScrollAnimationController();
