"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { MutableRefObject } from "react";

// Registrar plugin de GSAP (solo en cliente)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Uniforms del shader con indexación para permitir acceso dinámico
interface ShaderUniforms {
  uTime: number;
  uFrequency: number;
  uAmplitude: number;
  uColor: THREE.Color;
  uSecondaryColor: THREE.Color;
  uTexture: THREE.Texture;
  uRGBShift: number;
  uMouse: THREE.Vector2;
  uScrollProgress: number;
  [key: string]: any; // Permite acceso con índice de string
}

// Tipo de la referencia del material
interface PrismaticMatRef {
  current: (THREE.ShaderMaterial & ShaderUniforms) | null;
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
  private initialY: number = 0;

  init(meshRef: MeshRef, matRef: PrismaticMatRef): void {
    if (this.initialized || typeof window === "undefined") return;
    this.meshRef = meshRef;
    this.matRef = matRef;
    this.initialized = true;

    // Store initial scale and position
    if (meshRef.current) {
      this.initialScale = meshRef.current.scale.x;
      this.initialY = meshRef.current.position.y;
    }

    this.setupScrollTrigger();
  }

  private setupScrollTrigger(): void {
    // Create main timeline
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8, // Increased smoothness
        onUpdate: (self) => {
          if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
          this.scrollThrottle = setTimeout(() => {
            this.onScroll(self.progress);
          }, 20); // Faster update rate
        },
      },
    });

    // Define animation keyframes for fluid ripple effect
    if (this.matRef?.current) {
      const mat = this.matRef.current;

      // Initial state
      this.tl.set(
        mat,
        {
          uFrequency: 2.0,
          uAmplitude: 0.1,
          uRGBShift: 0.005,
        },
        0
      );

      // First wave of intensity
      this.tl.to(
        mat,
        {
          uFrequency: 4.0,
          uAmplitude: 0.3,
          uRGBShift: 0.02,
          duration: 0.25,
        },
        0.2
      );

      // Calm transition
      this.tl.to(
        mat,
        {
          uFrequency: 1.5,
          uAmplitude: 0.15,
          uRGBShift: 0.01,
          duration: 0.15,
        },
        0.45
      );

      // Peak intensity
      this.tl.to(
        mat,
        {
          uFrequency: 5.0,
          uAmplitude: 0.45,
          uRGBShift: 0.07,
          duration: 0.3,
        },
        0.6
      );

      // Gentle fade to completion
      this.tl.to(
        mat,
        {
          uFrequency: 3.0,
          uAmplitude: 0.25,
          uRGBShift: 0.04,
          duration: 0.1,
        },
        0.9
      );
    }
  }

  private onScroll(progress: number): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    // Update scroll progress uniform
    mat.uScrollProgress = progress;

    // Avanzadas modificaciones de shaders basadas en scroll
    const customUniforms = this.getAdvancedShaderModulations(progress);

    // Si hay uniforms custom añadidos al shader, actualizarlos
    // Ahora TypeScript no se quejará debido a la indexación [key: string] definida en la interfaz
    for (const key in customUniforms) {
      if (key in mat) {
        mat[key] = customUniforms[key];
      }
    }

    // Manipulate Mesh
    if (this.meshRef?.current) {
      const mesh = this.meshRef.current;

      // Fluid rotation with sine waves
      mesh.rotation.z = Math.sin(progress * Math.PI) * 0.3;
      mesh.rotation.x = Math.sin(progress * Math.PI * 1.5) * 0.2;
      mesh.rotation.y = Math.cos(progress * Math.PI * 2) * 0.25;

      // Floating motion path
      mesh.position.y =
        this.initialY - progress * 1.2 + Math.sin(progress * Math.PI * 3) * 0.3;
      mesh.position.x = Math.sin(progress * Math.PI * 2) * 0.5;
      mesh.position.z = 0.2 + Math.sin(progress * Math.PI * 4) * 0.3;

      // Breathing scale effect
      const breathingEffect = Math.sin(progress * Math.PI * 5) * 0.1;
      const scaleReduction = progress * 0.4;
      const newScale =
        this.initialScale * (1 - scaleReduction) * (1 + breathingEffect);
      mesh.scale.set(newScale, newScale, newScale);
    }

    // Circular wave pattern for shader parameters
    const phaseShift = progress * Math.PI * 8;
    const dynamicFrequency =
      2.0 + Math.sin(phaseShift) * 1.5 + Math.cos(phaseShift * 0.5) * 1.0;
    const dynamicAmplitude =
      0.2 +
      Math.sin(phaseShift * 1.2) * 0.15 +
      Math.cos(phaseShift * 0.7) * 0.1;

    // Apply modulations only if not defined in the timeline
    if (
      !this.tl?.isActive() ||
      !this.tl?.getChildren().some((t) => t.targets().includes(mat))
    ) {
      mat.uFrequency = dynamicFrequency;
      mat.uAmplitude = dynamicAmplitude;
      mat.uRGBShift =
        0.01 + progress * 0.05 + Math.sin(phaseShift * 0.3) * 0.02;

      // Color modulations with ripple effect
      this.updateFluidRippleColors(mat, progress);
    }
  }

  // Método para calcular avanzadas modulaciones de shader
  private getAdvancedShaderModulations(progress: number): Record<string, any> {
    // Posiciones específicas de scroll donde ocurren "eventos" visuales
    const triggerPoints = [0.2, 0.4, 0.6, 0.8];

    // Encontrar el punto de trigger más cercano para efectos avanzados
    const nearest = triggerPoints.reduce((prev, curr) =>
      Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev
    );

    // Distancia al punto más cercano (0-0.2 máx)
    const distanceToNearest = Math.abs(nearest - progress);
    const triggerIntensity = Math.max(0, 0.1 - distanceToNearest) * 10; // 0-1

    // Calcular patrones de interferencia basados en múltiples ondas
    const interferencePattern =
      Math.sin(progress * Math.PI * 12) *
        Math.cos(progress * Math.PI * 8) *
        0.5 +
      0.5;

    // Efecto de fractal en frecuencia del shader
    let fractalFrequency = 0;
    for (let i = 1; i <= 5; i++) {
      fractalFrequency += Math.sin(progress * Math.PI * i * 2) * (1 / i);
    }
    fractalFrequency = 3.0 + fractalFrequency * 2.0;

    // Efecto de líquido turbulento
    const turbulence = {
      base: 0.2,
      noiseScale: 0.3 + Math.sin(progress * Math.PI * 3) * 0.1,
      speedFactor: 1 + progress * 3,
      waveHeight: 0.2 + Math.sin(progress * Math.PI) * 0.1,
    };

    return {
      // Valores base modificados por el scroll
      uFrequency: fractalFrequency,
      uAmplitude: 0.15 + interferencePattern * 0.25,
      uRGBShift: 0.01 + triggerIntensity * 0.05 + Math.pow(progress, 2) * 0.04,

      // Si tuvieras más uniforms específicos en tu shader:
      // uTurbulence: turbulence.base + Math.sin(progress * Math.PI * 5) * turbulence.noiseScale,
      // uDistortionSpeed: turbulence.speedFactor,
      // uWaveHeight: turbulence.waveHeight
    };
  }

  // Método para actualizar colores con efecto de ripple líquido
  private updateFluidRippleColors(mat: any, progress: number): void {
    // Color principal con transición compleja
    const t = progress * Math.PI * 2;
    const r = 0.1 + 0.4 * Math.sin(t) * Math.sin(t * 2.5);
    const g = 0.1 + 0.2 * Math.cos(t * 1.5) + 0.1 * Math.sin(t * 3.5);
    const b = 0.4 + 0.4 * Math.sin(t * 0.5) * Math.cos(t * 2);

    // Color secundario con patrón de onda complementaria
    const s = t + Math.PI / 2; // Desfase
    const sr = 0.3 + 0.4 * Math.cos(s) * Math.cos(s * 1.2);
    const sg = 0.2 + 0.3 * Math.sin(s * 1.8) + 0.2 * Math.cos(s * 3.2);
    const sb = 0.5 + 0.4 * Math.cos(s * 0.7) * Math.sin(s * 2.3);

    // Aplicar colores con transición suave
    mat.uColor.setRGB(r, g, b);
    mat.uSecondaryColor.setRGB(sr, sg, sb);

    // Podríamos añadir uniformes adicionales si el shader los soportara
    // mat.uWaveFrequency = 2.0 + Math.sin(progress * Math.PI * 8) * 1.5;
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
