"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { MutableRefObject } from "react";

// Registrar plugin de GSAP (solo en cliente)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Tipo de la referencia del material
interface PrismaticMatRef {
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
        uDistortion: number;
        uColorMix: number;
        uTransitionProgress: number;
        uInvert: number;
      })
    | null;
}

// Tipo de la referencia del Mesh
type MeshRef = MutableRefObject<THREE.Mesh | null>;

// Estados narrativos de la animación
type StoryPhase = "intro" | "discovery" | "transformation" | "transcendence";

class DimensionalJourneyController {
  private tl: gsap.core.Timeline | null = null;
  private initialized = false;
  private meshRef: MeshRef | null = null;
  private matRef: PrismaticMatRef | null = null;
  private scrollThrottle: NodeJS.Timeout | null = null;
  private initialScale: number = 1;
  private initialY: number = 0;
  private currentPhase: StoryPhase = "intro";

  // Puntos clave de la narrativa (en % de scroll)
  private readonly STORY_KEYPOINTS = {
    intro: { start: 0, end: 0.25 },
    discovery: { start: 0.25, end: 0.5 },
    transformation: { start: 0.5, end: 0.75 },
    transcendence: { start: 0.75, end: 1 },
  };

  // Paleta de colores para cada fase
  private readonly PHASE_COLORS = {
    intro: {
      primary: new THREE.Color("#26225F"),
      secondary: new THREE.Color("#4f46e5"),
    },
    discovery: {
      primary: new THREE.Color("#1A3A5F"),
      secondary: new THREE.Color("#43C6D8"),
    },
    transformation: {
      primary: new THREE.Color("#3B1F5F"),
      secondary: new THREE.Color("#F876DE"),
    },
    transcendence: {
      primary: new THREE.Color("#31497A"),
      secondary: new THREE.Color("#FFFFFF"),
    },
  };

  init(meshRef: MeshRef, matRef: PrismaticMatRef): void {
    if (this.initialized || typeof window === "undefined") return;
    this.meshRef = meshRef;
    this.matRef = matRef;
    this.initialized = true;

    // Store initial scale and Y position when component initializes
    if (meshRef.current) {
      this.initialScale = meshRef.current.scale.x;
      this.initialY = meshRef.current.position.y;
    }

    // Check if the shader material has all required uniforms
    if (matRef.current) {
      // Add new uniforms if they don't exist
      if (matRef.current.uniforms && !matRef.current.uniforms.uDistortion) {
        matRef.current.uniforms.uDistortion = { value: 0.0 };
      }
      if (matRef.current.uniforms && !matRef.current.uniforms.uColorMix) {
        matRef.current.uniforms.uColorMix = { value: 0.0 };
      }
      if (
        matRef.current.uniforms &&
        !matRef.current.uniforms.uTransitionProgress
      ) {
        matRef.current.uniforms.uTransitionProgress = { value: 0.0 };
      }
      if (matRef.current.uniforms && !matRef.current.uniforms.uInvert) {
        matRef.current.uniforms.uInvert = { value: 0.0 };
      }

      // Apply default values
      matRef.current.uDistortion = 0.0;
      matRef.current.uColorMix = 0.0;
      matRef.current.uTransitionProgress = 0.0;
      matRef.current.uInvert = 0.0;
    }

    this.setupScrollTrigger();
    this.setupInitialAnimation();
  }

  private setupInitialAnimation(): void {
    if (!this.matRef?.current) return;

    // Animación inicial atractiva
    gsap.fromTo(
      this.matRef.current,
      {
        uAmplitude: 0,
        uDistortion: 0,
        uRGBShift: 0,
      },
      {
        uAmplitude: 0.2,
        uDistortion: 0.1,
        uRGBShift: 0.01,
        duration: 2.5,
        ease: "elastic.out(1, 0.3)",
      }
    );

    // Pulso sutil continuo
    gsap.to(this.matRef.current, {
      uAmplitude: "+=0.05",
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }

  private setupScrollTrigger(): void {
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8, // Valor más alto para mayor suavidad
        onUpdate: (self) => {
          if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
          this.scrollThrottle = setTimeout(() => {
            this.onScroll(self.progress);
          }, 10); // Reducido a 10ms para mayor responsividad
        },
      },
    });

    // Animaciones específicas para puntos clave de la narrativa
    const timeline = this.tl;

    // INTRO: Establecer estado inicial
    timeline.set({}, {}, 0);

    // DISCOVERY: Primera transición narrativa
    timeline.to(
      {},
      {
        onStart: () => {
          if (this.meshRef?.current && this.matRef?.current) {
            gsap.to(this.matRef.current, {
              uColorMix: 0.4,
              uDistortion: 0.3,
              duration: 1.5,
              ease: "power2.inOut",
            });
          }
        },
        duration: 0.2,
      },
      this.STORY_KEYPOINTS.discovery.start
    );

    // TRANSFORMATION: Segunda transición narrativa
    timeline.to(
      {},
      {
        onStart: () => {
          if (this.meshRef?.current && this.matRef?.current) {
            gsap.to(this.matRef.current, {
              uTransitionProgress: 0.8,
              uColorMix: 0.7,
              uRGBShift: 0.05,
              duration: 1.5,
              ease: "power2.inOut",
            });
          }
        },
        duration: 0.2,
      },
      this.STORY_KEYPOINTS.transformation.start
    );

    // TRANSCENDENCE: Transición final
    timeline.to(
      {},
      {
        onStart: () => {
          if (this.meshRef?.current && this.matRef?.current) {
            gsap.to(this.matRef.current, {
              uTransitionProgress: 1,
              uInvert: 0.8,
              uRGBShift: 0.08,
              uDistortion: 0.5,
              duration: 2,
              ease: "power3.inOut",
            });
          }
        },
        duration: 0.3,
      },
      this.STORY_KEYPOINTS.transcendence.start
    );
  }

  private updateStoryPhase(progress: number): void {
    let newPhase: StoryPhase = "intro";

    // Determinar la fase actual basada en el progreso
    if (progress >= this.STORY_KEYPOINTS.transcendence.start) {
      newPhase = "transcendence";
    } else if (progress >= this.STORY_KEYPOINTS.transformation.start) {
      newPhase = "transformation";
    } else if (progress >= this.STORY_KEYPOINTS.discovery.start) {
      newPhase = "discovery";
    }

    // Solo actualizar si cambiamos de fase
    if (newPhase !== this.currentPhase) {
      this.currentPhase = newPhase;
      this.applyPhaseEffects(newPhase);
    }
  }

  private applyPhaseEffects(phase: StoryPhase): void {
    if (!this.matRef?.current) return;

    const mat = this.matRef.current;
    const colors = this.PHASE_COLORS[phase];

    // Transición de colores suave
    gsap.to(mat.uColor, {
      r: colors.primary.r,
      g: colors.primary.g,
      b: colors.primary.b,
      duration: 1.2,
      ease: "sine.inOut",
    });

    gsap.to(mat.uSecondaryColor, {
      r: colors.secondary.r,
      g: colors.secondary.g,
      b: colors.secondary.b,
      duration: 1.2,
      ease: "sine.inOut",
    });

    // Efectos específicos por fase
    switch (phase) {
      case "intro":
        gsap.to(mat, {
          uFrequency: 3.0,
          uAmplitude: 0.2,
          duration: 1.2,
          ease: "sine.out",
        });
        break;

      case "discovery":
        gsap.to(mat, {
          uFrequency: 4.0,
          uAmplitude: 0.3,
          duration: 1.2,
          ease: "sine.out",
        });
        break;

      case "transformation":
        gsap.to(mat, {
          uFrequency: 5.0,
          uAmplitude: 0.4,
          duration: 1.2,
          ease: "sine.out",
        });
        break;

      case "transcendence":
        gsap.to(mat, {
          uFrequency: 6.0,
          uAmplitude: 0.5,
          duration: 1.2,
          ease: "sine.out",
        });
        break;
    }
  }

  private onScroll(progress: number): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    // Actualizar uniform básico de progreso
    mat.uScrollProgress = progress;

    // Actualizar fase de la historia
    this.updateStoryPhase(progress);

    // Manipular Mesh con transformaciones suaves
    if (this.meshRef?.current) {
      const mesh = this.meshRef.current;

      // --- PRINCIPAL CAMBIO: REDUCCIÓN DE ESCALA PROGRESIVA ---
      // Calculamos la escala objetivo como una reducción progresiva del tamaño inicial
      const scaleReduction = progress * 0.5; // Reduce hasta el 50% del tamaño original
      const targetScale = this.initialScale * (1 - scaleReduction);

      // Actualizamos la escala del mesh
      mesh.scale.set(targetScale, targetScale, targetScale);

      // --- MOVIMIENTO DESCENDENTE PROGRESIVO ---
      // Calcula la posición Y como un descenso progresivo desde la posición inicial
      // con un movimiento ondulante suave
      const oscillation =
        Math.sin(progress * Math.PI * 3) * 0.2 * (1 - progress);
      mesh.position.y = this.initialY - progress * 2 + oscillation;

      // --- ROTACIONES Y DEMÁS TRANSFORMACIONES ---
      // Rotaciones suaves que varían según la fase
      const rotationMultiplier = 1.0 + Math.sin(progress * Math.PI) * 0.5;
      mesh.rotation.z =
        Math.sin(progress * Math.PI * 1.5) *
        Math.PI *
        0.15 *
        rotationMultiplier;
      mesh.rotation.x = progress * Math.PI * 0.1 * rotationMultiplier;
      mesh.rotation.y = Math.sin(progress * Math.PI * 2) * Math.PI * 0.15;

      // Movimiento en z - acercamiento y alejamiento narrativo
      const zMovement = Math.sin(progress * Math.PI) * 0.8;
      mesh.position.z = zMovement;

      // Distorsión sutil que aumenta durante puntos de transición
      const keyPointDist = Math.min(
        Math.abs(progress - this.STORY_KEYPOINTS.discovery.start),
        Math.abs(progress - this.STORY_KEYPOINTS.transformation.start),
        Math.abs(progress - this.STORY_KEYPOINTS.transcendence.start)
      );

      const peakTransition = 1 - Math.min(1, keyPointDist * 20); // Pico en puntos clave

      // Efectos en shader avanzados según la narrativa
      const waveIntensity = 0.2 + peakTransition * 0.4; // Mayor intensidad en transiciones
      const frequencyVariation = Math.sin(progress * Math.PI * 4) * 1.5;
      mat.uFrequency = 3.0 + frequencyVariation + progress * 3.0;
      mat.uRGBShift = 0.01 + progress * 0.07 + peakTransition * 0.05;
      mat.uAmplitude = 0.15 + waveIntensity * (0.3 + progress * 0.5);
    }
  }

  destroy(): void {
    if (this.tl) this.tl.kill();
    if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
    if (typeof window !== "undefined" && ScrollTrigger) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    }
    this.initialized = false;
    this.meshRef = null;
    this.matRef = null;
  }
}

export default new DimensionalJourneyController();
