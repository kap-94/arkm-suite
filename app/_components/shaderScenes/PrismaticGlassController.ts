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
      })
    | null;
}

// Tipo de la referencia del Mesh
type MeshRef = MutableRefObject<THREE.Mesh | null>;

class PrismaticGlassController {
  private tl: gsap.core.Timeline | null = null;
  private initialized = false;
  private meshRef: MeshRef | null = null;
  private matRef: PrismaticMatRef | null = null;
  private scrollThrottle: NodeJS.Timeout | null = null;
  private initialScale: number = 1;

  init(meshRef: MeshRef, matRef: PrismaticMatRef): void {
    if (this.initialized || typeof window === "undefined") return;
    this.meshRef = meshRef;
    this.matRef = matRef;
    this.initialized = true;

    // Store initial scale when component initializes
    if (meshRef.current) {
      this.initialScale = meshRef.current.scale.x;
    }

    this.setupScrollTrigger();
  }

  private setupScrollTrigger(): void {
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
          // ~30ms => ~33fps
          this.scrollThrottle = setTimeout(() => {
            this.onScroll(self.progress);
          }, 30);
        },
      },
    });

    // Podemos dejar un pequeño set si quisieras keyframes
    // Si no, esto ya basta para ligarlo al scroll
    this.tl?.to(this, { duration: 0.1 }, 0);
  }

  private onScroll(progress: number): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    // Actualizar uniform de scroll
    mat.uScrollProgress = progress;

    // Manipular Mesh
    if (this.meshRef?.current) {
      const mesh = this.meshRef.current;

      // Rotaciones suaves, si lo deseas
      mesh.rotation.z = progress * Math.PI * 0.25;
      mesh.rotation.x = progress * Math.PI * 0.1;
      mesh.rotation.y = progress * Math.PI * 0.15;

      // Movimiento vertical descendente mientras hacemos scroll
      const initialY = mesh.userData.initialY || 0;
      // A medida que progress aumenta, la posición Y disminuye (baja)
      mesh.position.y = initialY - progress * 1.5;

      // z
      mesh.position.z = 0.5 * Math.sin(progress * Math.PI * 0.5);

      // Hacer la imagen más pequeña cuando scrolleamos
      // Usamos el initialScale como base y lo reducimos con el progreso
      const scaleReduction = progress * 0.5; // Reducir hasta un 50% del tamaño inicial
      const newScale = this.initialScale * (1 - scaleReduction);
      mesh.scale.set(newScale, newScale, newScale);
    }

    // Ajustes suaves al shader
    // (similar a ChromaticRipple)
    const dynamicFrequency = 2.0 + Math.sin(progress * Math.PI * 2) * 2.0;
    mat.uFrequency = dynamicFrequency;

    mat.uRGBShift = 0.01 + progress * 0.06;
    const wave = Math.sin(progress * Math.PI * 4);
    mat.uAmplitude = 0.2 + wave * 0.2;
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

export default new PrismaticGlassController();
