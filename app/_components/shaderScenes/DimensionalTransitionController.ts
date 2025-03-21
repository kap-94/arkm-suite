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
  private initialY: number = 0;

  // Colors for dimensional transitions
  private colorStages = [
    new THREE.Color("#26225F"), // Initial deep purple
    new THREE.Color("#1A5F7A"), // Teal transition
    new THREE.Color("#9333EA"), // Rich purple
    new THREE.Color("#4338CA"), // Deep indigo
    new THREE.Color("#0EA5E9"), // Bright blue
  ];

  // Secondary colors
  private secondaryColorStages = [
    new THREE.Color("#4f46e5"), // Initial indigo
    new THREE.Color("#10B981"), // Emerald
    new THREE.Color("#F472B6"), // Pink
    new THREE.Color("#FF6347"), // Tomato red
    new THREE.Color("#84CC16"), // Lime
  ];

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
        scrub: 1.2, // Extra smooth
        onUpdate: (self) => {
          if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
          this.scrollThrottle = setTimeout(() => {
            this.onScroll(self.progress);
          }, 25);
        },
      },
    });

    // Define color and dimension transitions
    if (this.matRef?.current) {
      const mat = this.matRef.current;

      // First Dimension (0-25%)
      this.tl.to(
        mat,
        {
          uFrequency: 2.0,
          uAmplitude: 0.15,
          uRGBShift: 0.01,
          duration: 0.25,
          onUpdate: () => {
            this.updateColors(0, 1, mat);
          },
        },
        0
      );

      // Second Dimension (25-50%)
      this.tl.to(
        mat,
        {
          uFrequency: 4.0,
          uAmplitude: 0.3,
          uRGBShift: 0.03,
          duration: 0.25,
          onUpdate: () => {
            this.updateColors(1, 2, mat);
          },
        },
        0.25
      );

      // Third Dimension (50-75%)
      this.tl.to(
        mat,
        {
          uFrequency: 6.0,
          uAmplitude: 0.4,
          uRGBShift: 0.05,
          duration: 0.25,
          onUpdate: () => {
            this.updateColors(2, 3, mat);
          },
        },
        0.5
      );

      // Final Dimension (75-100%)
      this.tl.to(
        mat,
        {
          uFrequency: 3.0,
          uAmplitude: 0.25,
          uRGBShift: 0.04,
          duration: 0.25,
          onUpdate: () => {
            this.updateColors(3, 4, mat);
          },
        },
        0.75
      );
    }
  }

  // Helper to interpolate between color stages
  private updateColors(fromIndex: number, toIndex: number, mat: any): void {
    // Get normalized progress between these two stages
    if (!this.tl) return;

    const tlProgress = this.tl.progress();
    const stageSize = 0.25; // Each stage is 25% of the timeline
    const fromPos = fromIndex * stageSize;
    const stageProgress = (tlProgress - fromPos) / stageSize;

    if (stageProgress >= 0 && stageProgress <= 1) {
      // Interpolate primary color
      const color = new THREE.Color();
      color.lerpColors(
        this.colorStages[fromIndex],
        this.colorStages[toIndex],
        stageProgress
      );
      mat.uColor = color;

      // Interpolate secondary color
      const secondaryColor = new THREE.Color();
      secondaryColor.lerpColors(
        this.secondaryColorStages[fromIndex],
        this.secondaryColorStages[toIndex],
        stageProgress
      );
      mat.uSecondaryColor = secondaryColor;
    }
  }

  private onScroll(progress: number): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    // Update scroll progress uniform
    mat.uScrollProgress = progress;

    // Manipulate Mesh for dimensional transitions
    if (this.meshRef?.current) {
      const mesh = this.meshRef.current;

      // Create more complex motion path that feels like moving through dimensions
      const dimensionPath = Math.floor(progress * 4); // 0-3 dimensions
      const dimensionProgress = (progress * 4) % 1; // Progress within current dimension

      // Different rotation patterns for each dimension
      switch (dimensionPath) {
        case 0: // First dimension - gentle rotation
          mesh.rotation.z = dimensionProgress * Math.PI * 0.2;
          mesh.rotation.x = Math.sin(dimensionProgress * Math.PI) * 0.15;
          mesh.rotation.y = dimensionProgress * Math.PI * 0.1;
          break;
        case 1: // Second dimension - faster, more chaotic
          mesh.rotation.z = Math.sin(dimensionProgress * Math.PI * 2) * 0.4;
          mesh.rotation.x = Math.cos(dimensionProgress * Math.PI * 1.5) * 0.3;
          mesh.rotation.y = Math.sin(dimensionProgress * Math.PI * 3) * 0.25;
          break;
        case 2: // Third dimension - orbital rotation
          mesh.rotation.z = Math.sin(dimensionProgress * Math.PI * 4) * 0.3;
          mesh.rotation.x = Math.cos(dimensionProgress * Math.PI * 3) * 0.35;
          mesh.rotation.y = dimensionProgress * Math.PI * 0.8;
          break;
        case 3: // Fourth dimension - stabilizing
          mesh.rotation.z = Math.sin(dimensionProgress * Math.PI * 2) * 0.2;
          mesh.rotation.x = Math.cos(dimensionProgress * Math.PI) * 0.15;
          mesh.rotation.y = Math.sin(dimensionProgress * Math.PI * 0.5) * 0.3;
          break;
      }

      // Position shifts for each dimension
      mesh.position.y = this.initialY - progress * 1.5;
      mesh.position.x = Math.sin(progress * Math.PI * 3) * 0.7;

      // Z-position creates a sense of depth through dimensions
      const zPattern = [
        Math.sin(dimensionProgress * Math.PI) * 0.2, // Dimension 1
        Math.cos(dimensionProgress * Math.PI * 2) * 0.4, // Dimension 2
        Math.sin(dimensionProgress * Math.PI * 3) * 0.5, // Dimension 3
        Math.cos(dimensionProgress * Math.PI * 0.5) * 0.3, // Dimension 4
      ];
      mesh.position.z = 0.3 + zPattern[dimensionPath];

      // Scale morphing based on dimension
      const scalePatterns = [
        this.initialScale * (1 - dimensionProgress * 0.1), // Slight shrink
        this.initialScale * (0.9 + Math.sin(dimensionProgress * Math.PI) * 0.1), // Pulsate
        this.initialScale *
          (0.8 + Math.sin(dimensionProgress * Math.PI * 2) * 0.15), // Double pulse
        this.initialScale * (0.7 + dimensionProgress * 0.2), // Grow back
      ];
      const newScale = scalePatterns[dimensionPath] * (1 - progress * 0.3);
      mesh.scale.set(newScale, newScale, newScale);
    }

    // Aplicar efectos dimensionales avanzados al shader
    this.applyDimensionalShaderEffects(mat, progress);
  }

  // Aplicar efectos dimensionales avanzados a los shaders
  private applyDimensionalShaderEffects(mat: any, progress: number): void {
    // Identificar la dimensión actual y progreso dentro de ella
    const dimensionIndex = Math.floor(progress * 4); // 0-3 (4 dimensiones)
    const dimensionProgress = (progress * 4) % 1; // Progreso dentro de la dimensión actual

    // Calcular la proximidad a los límites dimensionales (transiciones entre dimensiones)
    const transitionThreshold = 0.15; // Umbral para considerar transición entre dimensiones
    const nearTransitionStart = dimensionProgress < transitionThreshold;
    const nearTransitionEnd = dimensionProgress > 1 - transitionThreshold;
    const inTransition = nearTransitionStart || nearTransitionEnd;

    // Intensidad de la transición (0-1)
    let transitionIntensity = 0;
    if (nearTransitionStart) {
      transitionIntensity = 1 - dimensionProgress / transitionThreshold;
    } else if (nearTransitionEnd) {
      transitionIntensity =
        (dimensionProgress - (1 - transitionThreshold)) / transitionThreshold;
    }

    // Ajustes de shader específicos para cada dimensión
    const dimensionShaderEffects = [
      {
        // Dimensión 1: Espacio clásico
        frequency: 2.0 + Math.sin(dimensionProgress * Math.PI * 2) * 1.0,
        amplitude: 0.1 + dimensionProgress * 0.1,
        rgbShift: 0.005 + dimensionProgress * 0.01,
        colorModulation: this.getDimensionColorEffect(0, dimensionProgress),
      },
      {
        // Dimensión 2: Espacio cuántico
        frequency: 4.0 + Math.sin(dimensionProgress * Math.PI * 5) * 2.0,
        amplitude: 0.2 + Math.sin(dimensionProgress * Math.PI * 3) * 0.15,
        rgbShift: 0.02 + Math.sin(dimensionProgress * Math.PI * 4) * 0.02,
        colorModulation: this.getDimensionColorEffect(1, dimensionProgress),
      },
      {
        // Dimensión 3: Dimensión de alta energía
        frequency: 7.0 + Math.sin(dimensionProgress * Math.PI * 8) * 3.0,
        amplitude: 0.4 + Math.cos(dimensionProgress * Math.PI * 6) * 0.2,
        rgbShift: 0.05 + Math.sin(dimensionProgress * Math.PI * 7) * 0.03,
        colorModulation: this.getDimensionColorEffect(2, dimensionProgress),
      },
      {
        // Dimensión 4: Espacio-tiempo curvado
        frequency: 3.0 + Math.sin(dimensionProgress * Math.PI * 3) * 1.5,
        amplitude: 0.3 + Math.sin(dimensionProgress * Math.PI * 2) * 0.1,
        rgbShift: 0.03 + Math.cos(dimensionProgress * Math.PI) * 0.02,
        colorModulation: this.getDimensionColorEffect(3, dimensionProgress),
      },
    ];

    // Efecto de distorsión dimensional durante transiciones
    if (inTransition) {
      // Efecto de "rasgado" entre dimensiones
      const tearEffect =
        Math.sin(dimensionProgress * Math.PI * 20) * transitionIntensity * 0.5;

      // Distorsión de frecuencia aumentada durante transiciones
      const currentEffect = dimensionShaderEffects[dimensionIndex];

      // Aplicar distorsión especial de transición
      mat.uFrequency = currentEffect.frequency + tearEffect * 10;
      mat.uAmplitude = currentEffect.amplitude + tearEffect * 0.3;
      mat.uRGBShift = currentEffect.rgbShift + transitionIntensity * 0.1; // Efecto cromático intenso

      // Colores dimensionales
      const targetDimIndex = nearTransitionEnd
        ? (dimensionIndex + 1) % dimensionShaderEffects.length
        : (dimensionIndex - 1 + dimensionShaderEffects.length) %
          dimensionShaderEffects.length;

      // Interpolación de colores entre dimensiones
      this.interpolateDimensionalColors(
        mat,
        dimensionShaderEffects[dimensionIndex].colorModulation,
        dimensionShaderEffects[targetDimIndex].colorModulation,
        transitionIntensity
      );
    } else {
      // Comportamiento normal dentro de una dimensión
      const currentEffect = dimensionShaderEffects[dimensionIndex];

      // Aplicar parámetros de shader específicos de dimensión
      mat.uFrequency = currentEffect.frequency;
      mat.uAmplitude = currentEffect.amplitude;
      mat.uRGBShift = currentEffect.rgbShift;

      // Aplicar comportamiento de color dimensional
      const { primary, secondary } = currentEffect.colorModulation;
      mat.uColor.copy(primary);
      mat.uSecondaryColor.copy(secondary);

      // Efectos adicionales basados en el progreso dimensional
      this.applyDimensionSpecificEffects(
        mat,
        dimensionIndex,
        dimensionProgress
      );
    }
  }

  // Obtener modulación de color para una dimensión específica
  private getDimensionColorEffect(
    dimension: number,
    progress: number
  ): { primary: THREE.Color; secondary: THREE.Color } {
    // Patrones de color específicos para cada dimensión
    switch (dimension) {
      case 0: // Primera dimensión - tonos azules y púrpuras (espacio clásico)
        return {
          primary: new THREE.Color(
            0.1 + Math.sin(progress * Math.PI) * 0.05,
            0.1 + Math.sin(progress * Math.PI * 1.5) * 0.05,
            0.5 + Math.cos(progress * Math.PI * 2) * 0.2
          ),
          secondary: new THREE.Color(
            0.3 + Math.cos(progress * Math.PI * 2) * 0.1,
            0.2 + Math.sin(progress * Math.PI) * 0.1,
            0.7 + Math.sin(progress * Math.PI * 3) * 0.2
          ),
        };
      case 1: // Segunda dimensión - tonos verdes y azules (espacio cuántico)
        return {
          primary: new THREE.Color(
            0.1 + Math.sin(progress * Math.PI * 3) * 0.1,
            0.5 + Math.cos(progress * Math.PI * 2) * 0.3,
            0.4 + Math.sin(progress * Math.PI * 4) * 0.2
          ),
          secondary: new THREE.Color(
            0.2 + Math.sin(progress * Math.PI * 2) * 0.1,
            0.6 + Math.cos(progress * Math.PI * 3) * 0.2,
            0.3 + Math.sin(progress * Math.PI * 5) * 0.1
          ),
        };
      case 2: // Tercera dimensión - tonos rojos y naranjas (alta energía)
        return {
          primary: new THREE.Color(
            0.7 + Math.sin(progress * Math.PI * 5) * 0.2,
            0.3 + Math.cos(progress * Math.PI * 4) * 0.2,
            0.1 + Math.sin(progress * Math.PI * 3) * 0.1
          ),
          secondary: new THREE.Color(
            0.6 + Math.cos(progress * Math.PI * 3) * 0.3,
            0.4 + Math.sin(progress * Math.PI * 6) * 0.2,
            0.2 + Math.sin(progress * Math.PI * 2) * 0.1
          ),
        };
      case 3: // Cuarta dimensión - tonos púrpuras y magentas (espacio-tiempo curvado)
        return {
          primary: new THREE.Color(
            0.4 + Math.sin(progress * Math.PI * 2) * 0.2,
            0.1 + Math.cos(progress * Math.PI * 3) * 0.1,
            0.5 + Math.sin(progress * Math.PI * 4) * 0.3
          ),
          secondary: new THREE.Color(
            0.5 + Math.cos(progress * Math.PI * 4) * 0.2,
            0.2 + Math.sin(progress * Math.PI * 2) * 0.1,
            0.6 + Math.sin(progress * Math.PI * 3) * 0.2
          ),
        };
      default:
        return {
          primary: new THREE.Color(0.3, 0.3, 0.5),
          secondary: new THREE.Color(0.5, 0.3, 0.7),
        };
    }
  }

  // Interpolación de colores entre dimensiones durante transiciones
  private interpolateDimensionalColors(
    mat: any,
    fromColors: { primary: THREE.Color; secondary: THREE.Color },
    toColors: { primary: THREE.Color; secondary: THREE.Color },
    factor: number
  ): void {
    // Crear colores temporales para interpolación
    const primaryColor = new THREE.Color();
    const secondaryColor = new THREE.Color();

    // Interpolar entre colores de dimensiones
    primaryColor.lerpColors(fromColors.primary, toColors.primary, factor);
    secondaryColor.lerpColors(fromColors.secondary, toColors.secondary, factor);

    // Aplicar al material
    mat.uColor.copy(primaryColor);
    mat.uSecondaryColor.copy(secondaryColor);
  }

  // Aplicar efectos específicos por dimensión
  private applyDimensionSpecificEffects(
    mat: any,
    dimension: number,
    progress: number
  ): void {
    // Cada dimensión tiene efectos únicos en el shader
    switch (dimension) {
      case 0: // Primera dimensión - efecto ondulatorio suave
        // Podríamos ajustar otros uniforms si el shader los tuviera
        // mat.uWaveSpeed = 0.5 + progress * 0.5;
        // mat.uNoiseIntensity = 0.1 + Math.sin(progress * Math.PI * 2) * 0.05;
        break;
      case 1: // Segunda dimensión - efecto cuántico (patrones de interferencia)
        // Patrón de interferencia cuántica
        const quantumWave =
          Math.sin(progress * Math.PI * 10) * Math.cos(progress * Math.PI * 12);
        mat.uFrequency += quantumWave * 0.5;
        // mat.uNoiseScale = 2.0 + Math.sin(progress * Math.PI * 8) * 1.0;
        break;
      case 2: // Tercera dimensión - efecto de alta energía (turbulencia)
        // Turbulencia alta energía
        const energyFluctuation =
          Math.sin(progress * Math.PI * 15) * Math.sin(progress * Math.PI * 20);
        mat.uAmplitude += energyFluctuation * 0.15;
        // mat.uTurbulence = 0.8 + Math.sin(progress * Math.PI * 12) * 0.4;
        break;
      case 3: // Cuarta dimensión - efecto espacio-tiempo (distorsión)
        // Distorsión espacio-tiempo
        const spacetimeWarp =
          Math.sin(progress * Math.PI * 6) * Math.cos(progress * Math.PI * 4);
        mat.uRGBShift += spacetimeWarp * 0.02;
        // mat.uWarpIntensity = 0.5 + Math.sin(progress * Math.PI * 5) * 0.3;
        break;
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

export default new PrismaticGlassController();
