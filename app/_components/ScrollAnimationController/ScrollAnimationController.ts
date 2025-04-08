"use client";
// ScrollAnimationController.ts
// Controlador de animaciones basadas en scroll para la escena 3D
// Optimizado para Next.js 14 con RSC y TypeScript

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MutableRefObject } from "react";
import * as THREE from "three";

// Registrar plugins de GSAP (solo en cliente)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

type MeshRef = MutableRefObject<THREE.Mesh | null>;

interface AnimationState {
  currentState: string;
}

class ScrollAnimationController implements AnimationState {
  private timeline: gsap.core.Timeline | null = null;
  private initialized = false;
  private sceneRef: MeshRef | null = null;
  private materialRef: MaterialRef | null = null;

  public currentState: string = "intro";
  private scrollThrottleTimeout: NodeJS.Timeout | null = null;

  init(sceneRef: MeshRef, materialRef: MaterialRef): void {
    // Evitar doble inicialización
    if (typeof window === "undefined" || this.initialized) return;

    this.sceneRef = sceneRef;
    this.materialRef = materialRef;
    this.initialized = true;

    this.setupScrollTrigger();
  }

  private setupScrollTrigger(): void {
    // Timeline principal
    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (this.scrollThrottleTimeout)
            clearTimeout(this.scrollThrottleTimeout);
          // Controla la frecuencia con la que se ejecuta onScroll (a ~30ms => ~33fps)
          this.scrollThrottleTimeout = setTimeout(() => {
            this.onScroll(self.progress);
          }, 30);
        },
      },
    });

    // Keyframes de estados
    this.timeline.set(this, { currentState: "intro" }, 0);

    this.timeline.to(
      this,
      {
        currentState: "firstTransition",
        onUpdate: () => this.updateMaterialByState(),
        duration: 0.2,
      },
      0
    );

    this.timeline.to(
      this,
      {
        currentState: "midSection",
        onUpdate: () => this.updateMaterialByState(),
        duration: 0.3,
      },
      0.2
    );

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
    if (!this.materialRef?.current) return;

    const material = this.materialRef.current;
    switch (this.currentState) {
      case "intro":
        gsap.to(material, {
          uFrequency: 3.0,
          uAmplitude: 0.2,
          uRGBShift: 0.01,
          duration: 1,
          overwrite: true,
        });
        break;
      case "firstTransition":
        gsap.to(material, {
          uFrequency: 5.0,
          uAmplitude: 0.4,
          uRGBShift: 0.03,
          duration: 1,
          overwrite: true,
        });
        break;
      case "midSection":
        gsap.to(material, {
          uFrequency: 2.0,
          uAmplitude: 0.6,
          uRGBShift: 0.05,
          duration: 1,
          overwrite: true,
        });
        break;
      case "finale":
        gsap.to(material, {
          uFrequency: 6.0,
          uAmplitude: 0.3,
          uRGBShift: 0.07,
          duration: 1,
          overwrite: true,
        });
        break;
      default:
        break;
    }
  }

  private onScroll(progress: number): void {
    if (!this.materialRef?.current) return;
    const material = this.materialRef.current;

    // Actualizar uniform de scroll
    material.uScrollProgress = progress;

    // Rotación y posición del mesh
    if (this.sceneRef?.current) {
      this.sceneRef.current.rotation.z = progress * Math.PI * 0.25;

      const initialY = this.sceneRef.current.userData.initialY || 0;
      this.sceneRef.current.position.y =
        initialY + Math.sin(progress * Math.PI) * 0.5;

      this.sceneRef.current.position.z =
        0.5 * Math.sin(progress * Math.PI * 0.5);

      this.sceneRef.current.rotation.x = progress * Math.PI * 0.1;
      this.sceneRef.current.rotation.y = progress * Math.PI * 0.15;
    }

    // Ajustes suaves a los parámetros del shader
    const dynamicFrequency = 2.0 + Math.sin(progress * Math.PI * 2) * 2.0;
    material.uFrequency = dynamicFrequency;
    material.uRGBShift = 0.01 + progress * 0.06;
    const wave = Math.sin(progress * Math.PI * 4);
    material.uAmplitude = 0.2 + wave * 0.2;
  }

  destroy(): void {
    if (this.timeline) this.timeline.kill();
    if (this.scrollThrottleTimeout) clearTimeout(this.scrollThrottleTimeout);

    if (typeof window !== "undefined" && ScrollTrigger) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }

    this.initialized = false;
    this.sceneRef = null;
    this.materialRef = null;
  }
}

export default new ScrollAnimationController();
