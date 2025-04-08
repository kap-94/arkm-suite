"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { MutableRefObject } from "react";

// Registrar GSAP plugin (solo en cliente)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interfaces
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
  [key: string]: any;
}

interface DeepSpaceMatRef {
  current: (THREE.ShaderMaterial & ShaderUniforms) | null;
}

type MeshRef = MutableRefObject<THREE.Mesh | null>;

// Paleta de colores
interface ColorStage {
  primary: string;
  secondary: string;
}

// Configuración de shader
interface ShaderStage {
  frequency: number;
  amplitude: number;
  rgbShift: number;
  primaryColor: THREE.Color;
  secondaryColor: THREE.Color;
}

class DeepSpaceController {
  private tl: gsap.core.Timeline | null = null;
  private shaderTl: gsap.core.Timeline | null = null;
  private meshTl: gsap.core.Timeline | null = null;
  private initialized = false;
  private meshRef: MeshRef | null = null;
  private matRef: DeepSpaceMatRef | null = null;
  private scrollThrottle: NodeJS.Timeout | null = null;
  private initialScale: number = 1;
  private initialPosition = new THREE.Vector3();
  private initialShaderState: Record<string, any> = {};
  private lastScrollDirection: "up" | "down" = "down";
  private prevScrollProgress: number = 0;

  // Paleta de colores simplificada (4 etapas en lugar de 6)
  private readonly colorStages: ColorStage[] = [
    { primary: "#0F172A", secondary: "#1E293B" }, // Inicio
    { primary: "#1A1F36", secondary: "#2A3F6A" }, // Medio
    { primary: "#1F1D36", secondary: "#3F1D5F" }, // Final medio
    { primary: "#0F1F3F", secondary: "#173F5F" }, // Final
  ];

  // Etapas visuales simplificadas
  private readonly visualStages = [
    { position: 0.0, name: "Inicio" },
    { position: 0.33, name: "Transición 1" },
    { position: 0.66, name: "Transición 2" },
    { position: 1.0, name: "Final" },
  ];

  // Configuración de shader por etapa (simplificada)
  private readonly shaderStages: ShaderStage[] = [
    {
      // Inicio
      frequency: 3.0,
      amplitude: 0.15,
      rgbShift: 0.01,
      primaryColor: new THREE.Color("#0F172A"),
      secondaryColor: new THREE.Color("#1E293B"),
    },
    {
      // Transición 1
      frequency: 4.0,
      amplitude: 0.2,
      rgbShift: 0.015,
      primaryColor: new THREE.Color("#1A1F36"),
      secondaryColor: new THREE.Color("#2A3F6A"),
    },
    {
      // Transición 2
      frequency: 5.0,
      amplitude: 0.18,
      rgbShift: 0.012,
      primaryColor: new THREE.Color("#1F1D36"),
      secondaryColor: new THREE.Color("#3F1D5F"),
    },
    {
      // Final
      frequency: 2.5,
      amplitude: 0.1,
      rgbShift: 0.008,
      primaryColor: new THREE.Color("#0F1F3F"),
      secondaryColor: new THREE.Color("#173F5F"),
    },
  ];

  // Configuración de scroll simplificada
  private readonly scrollConfig = {
    // Desplazamiento vertical total
    totalVerticalOffset: 0.8,

    // Curvas de movimiento simplificadas
    motionCurves: [
      { start: 0.0, end: 0.33, ease: "power1.out" },
      { start: 0.33, end: 0.66, ease: "power1.inOut" },
      { start: 0.66, end: 1.0, ease: "power2.out" },
    ],

    // Parámetros de escala durante scroll
    scale: {
      min: 0.6, // Tamaño mínimo (60% del original)
      max: 1.0, // Tamaño inicial (100%)
      easePoint: 0.5, // Punto donde la escala cambia más rápidamente
    },

    // Rotación sutil durante scroll
    rotation: {
      maxAngle: 0.15, // Ángulo máximo de rotación (radianes)
    },

    // Rebote al volver a la posición inicial
    returnBounce: {
      enabled: true, // Habilitar efecto de rebote
      strength: 0.2, // Fuerza de rebote (0-1)
      duration: 0.4, // Duración del rebote en segundos
    },
  };

  // Inicializar controlador
  init(meshRef: MeshRef, matRef: DeepSpaceMatRef): void {
    if (this.initialized || typeof window === "undefined") return;
    this.meshRef = meshRef;
    this.matRef = matRef;
    this.initialized = true;

    // Guardar escala y posición inicial
    if (meshRef.current) {
      this.initialScale = meshRef.current.scale.x;
      this.initialPosition.copy(meshRef.current.position);
    }

    // Guardar estado inicial del shader
    if (matRef.current) {
      this.saveInitialShaderState(matRef.current);
    }

    this.setupScrollTrigger();
  }

  // Guardar estado inicial del shader
  private saveInitialShaderState(mat: ShaderUniforms): void {
    this.initialShaderState = {
      uFrequency: mat.uFrequency,
      uAmplitude: mat.uAmplitude,
      uRGBShift: mat.uRGBShift,
      uColor: mat.uColor.clone(),
      uSecondaryColor: mat.uSecondaryColor.clone(),
    };
  }

  // Configurar ScrollTrigger
  private setupScrollTrigger(): void {
    // Timeline principal para scroll
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8, // Scrub más suave
        onUpdate: (self) => {
          // Limitar actualizaciones para mejor rendimiento
          if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
          this.scrollThrottle = setTimeout(() => {
            // Detectar dirección de scroll
            const newDirection =
              self.progress > this.prevScrollProgress ? "down" : "up";
            const directionChanged = newDirection !== this.lastScrollDirection;

            this.lastScrollDirection = newDirection;
            this.prevScrollProgress = self.progress;

            this.onScroll(self.progress, newDirection, directionChanged);

            // Actualizar timelines
            if (this.shaderTl) {
              this.shaderTl.progress(self.progress);
            }
            if (this.meshTl) {
              this.meshTl.progress(self.progress);
            }
          }, 16); // ~60fps throttle para mejor rendimiento
        },
      },
    });

    // Crear timelines específicos
    this.createShaderTimeline();
    this.createMeshMovementTimeline();
  }

  // Crear timeline para transformaciones de shader
  private createShaderTimeline(): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    this.shaderTl = gsap.timeline({ paused: true });

    // Crear transiciones entre cada etapa visual
    for (let i = 0; i < this.visualStages.length - 1; i++) {
      const startStage = this.visualStages[i];
      const endStage = this.visualStages[i + 1];
      const duration = endStage.position - startStage.position;

      // Configuraciones de shader para esta transición
      const startShader = this.shaderStages[i];
      const endShader = this.shaderStages[i + 1];

      // Ease para esta etapa
      const customEase = this.scrollConfig.motionCurves[i].ease;

      this.shaderTl.to(
        mat,
        {
          uFrequency: endShader.frequency,
          uAmplitude: endShader.amplitude,
          uRGBShift: endShader.rgbShift,
          duration: duration,
          ease: customEase,
          onUpdate: () => {
            const progress =
              (this.shaderTl?.progress() || 0 - startStage.position) / duration;
            if (progress >= 0 && progress <= 1) {
              // Interpolar colores
              const color = new THREE.Color();
              color.lerpColors(
                startShader.primaryColor,
                endShader.primaryColor,
                progress
              );
              mat.uColor = color;

              const secondaryColor = new THREE.Color();
              secondaryColor.lerpColors(
                startShader.secondaryColor,
                endShader.secondaryColor,
                progress
              );
              mat.uSecondaryColor = secondaryColor;
            }
          },
        },
        startStage.position
      );
    }
  }

  // Crear timeline para movimiento de malla
  private createMeshMovementTimeline(): void {
    if (!this.meshRef?.current) return;

    this.meshTl = gsap.timeline({ paused: true });

    // Movimiento suave de la malla
    this.meshTl.to(
      {},
      {
        duration: 1, // Timeline completo
        onUpdate: () => {
          if (!this.meshRef?.current) return;
          const mesh = this.meshRef.current;
          const progress = this.meshTl?.progress() || 0;

          // Aplicar scroll vertical personalizado
          this.applyVerticalScrolling(mesh, progress);

          // Aplicar variación de escala
          this.applyScaleVariation(mesh, progress);

          // Aplicar rotación sutil
          this.applyRotation(mesh, progress);
        },
      }
    );
  }

  // Aplicar scroll vertical personalizado
  private applyVerticalScrolling(mesh: THREE.Mesh, progress: number): void {
    // Determinar en qué etapa estamos
    let currentCurveIndex = 0;
    for (let i = 0; i < this.scrollConfig.motionCurves.length; i++) {
      const curve = this.scrollConfig.motionCurves[i];
      if (progress >= curve.start && progress <= curve.end) {
        currentCurveIndex = i;
        break;
      }
    }

    // Obtener curva actual
    const currentCurve = this.scrollConfig.motionCurves[currentCurveIndex];

    // Calcular progreso normalizado dentro de la curva actual
    const curveProgress =
      (progress - currentCurve.start) / (currentCurve.end - currentCurve.start);

    // Aplicar easing a este segmento de movimiento
    let easedProgress: number;

    // Aplicar diferentes curvas de easing según la etapa
    switch (currentCurve.ease) {
      case "power1.out":
        easedProgress = 1 - Math.pow(1 - curveProgress, 1);
        break;
      case "power1.inOut":
        easedProgress =
          curveProgress < 0.5
            ? 2 * curveProgress * curveProgress
            : 1 - Math.pow(-2 * curveProgress + 2, 2) / 2;
        break;
      case "power2.out":
        easedProgress = 1 - Math.pow(1 - curveProgress, 2);
        break;
      default:
        easedProgress = curveProgress;
    }

    // Calcular progreso general del movimiento (0-1)
    const overallProgress =
      currentCurve.start +
      easedProgress * (currentCurve.end - currentCurve.start);

    // Aplicar desplazamiento vertical
    const verticalOffset =
      this.initialPosition.y +
      overallProgress * this.scrollConfig.totalVerticalOffset;

    // Establecer posición con ligero desplazamiento horizontal
    mesh.position.set(
      this.initialPosition.x + Math.sin(overallProgress * Math.PI) * 0.05,
      verticalOffset,
      this.initialPosition.z
    );
  }

  // Aplicar variación de escala durante scroll
  private applyScaleVariation(mesh: THREE.Mesh, progress: number): void {
    // Calcular factor de escala con curva cuadrática
    const easePoint = this.scrollConfig.scale.easePoint;
    const scaleFactor =
      progress < easePoint
        ? this.lerp(
            this.scrollConfig.scale.max,
            this.scrollConfig.scale.min,
            progress / easePoint
          )
        : this.scrollConfig.scale.min;

    // Aplicar escala
    const finalScale = this.initialScale * scaleFactor;
    mesh.scale.set(finalScale, finalScale, finalScale);
  }

  // Aplicar rotación sutil durante scroll
  private applyRotation(mesh: THREE.Mesh, progress: number): void {
    // Rotación suave con patrón sinusoidal
    const angle = this.scrollConfig.rotation.maxAngle;

    // Rotación X con patrón coseno
    const xRotation = Math.cos(progress * Math.PI) * angle * 0.5;

    // Rotación Y con patrón sinusoidal
    const yRotation = Math.sin(progress * Math.PI * 1.2) * angle * 0.5;

    // Rotación Z sutil
    const zRotation = Math.sin(progress * Math.PI * 0.8) * angle * 0.3;

    // Aplicar rotaciones sutiles
    mesh.rotation.set(xRotation, yRotation, zRotation);
  }

  // Manejar eventos de scroll
  private onScroll(
    progress: number,
    direction: "up" | "down",
    directionChanged: boolean
  ): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    // Actualizar progreso de scroll en uniform
    mat.uScrollProgress = progress;

    // Si estamos volviendo al inicio (scroll hacia arriba)
    if (direction === "up" && progress < 0.05) {
      this.handleReturnToStart(progress, mat);
    } else {
      // Comportamiento normal - aplicar efectos basados en progreso
      this.applyShaderEffects(mat, progress);
    }

    // Si cambió la dirección de scroll, aplicar efectos de transición
    if (directionChanged) {
      this.handleScrollDirectionChange(direction, progress, mat);
    }
  }

  // Manejar retorno suave a posición inicial
  private handleReturnToStart(progress: number, mat: ShaderUniforms): void {
    // Determinar qué tan cerca estamos del inicio (0-1, donde 0 es inicio)
    const returnProgress = progress / 0.05; // Normalizar a 0-1 en primer 5% del scroll

    // Aplicar interpolación suave entre estado actual e inicial
    this.interpolateToInitialState(mat, 1 - returnProgress);

    // Si el efecto de rebote está habilitado y estamos muy cerca del inicio
    if (this.scrollConfig.returnBounce.enabled && returnProgress < 0.2) {
      this.applyReturnBounceEffect(mat, returnProgress);
    }
  }

  // Manejar cambios en la dirección de scroll
  private handleScrollDirectionChange(
    direction: "up" | "down",
    progress: number,
    mat: ShaderUniforms
  ): void {
    // Efecto de transición sutil al cambiar dirección
    const transitionEffect = {
      frequency: direction === "up" ? 0.3 : -0.3,
      amplitude: direction === "up" ? 0.03 : -0.03,
      rgbShift: direction === "up" ? 0.003 : -0.003,
    };

    // GSAP para animación de transición suave
    if (typeof window !== "undefined") {
      gsap.to(mat, {
        uFrequency: mat.uFrequency + transitionEffect.frequency * 0.15,
        uAmplitude: mat.uAmplitude + transitionEffect.amplitude * 0.04,
        uRGBShift: mat.uRGBShift + transitionEffect.rgbShift * 0.008,
        duration: 0.25,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }

  // Interpolar suavemente al estado inicial del shader
  private interpolateToInitialState(mat: ShaderUniforms, factor: number): void {
    // Interpolar parámetros numéricos
    mat.uFrequency = this.lerp(
      mat.uFrequency,
      this.initialShaderState.uFrequency,
      factor
    );
    mat.uAmplitude = this.lerp(
      mat.uAmplitude,
      this.initialShaderState.uAmplitude,
      factor
    );
    mat.uRGBShift = this.lerp(
      mat.uRGBShift,
      this.initialShaderState.uRGBShift,
      factor
    );

    // Interpolar colores
    if (factor > 0.2) {
      const initialColor = this.initialShaderState.uColor;
      const initialSecondary = this.initialShaderState.uSecondaryColor;

      const primaryColor = new THREE.Color();
      primaryColor.r = this.lerp(mat.uColor.r, initialColor.r, factor);
      primaryColor.g = this.lerp(mat.uColor.g, initialColor.g, factor);
      primaryColor.b = this.lerp(mat.uColor.b, initialColor.b, factor);

      const secondaryColor = new THREE.Color();
      secondaryColor.r = this.lerp(
        mat.uSecondaryColor.r,
        initialSecondary.r,
        factor
      );
      secondaryColor.g = this.lerp(
        mat.uSecondaryColor.g,
        initialSecondary.g,
        factor
      );
      secondaryColor.b = this.lerp(
        mat.uSecondaryColor.b,
        initialSecondary.b,
        factor
      );

      mat.uColor = primaryColor;
      mat.uSecondaryColor = secondaryColor;
    }
  }

  // Aplicar efecto de rebote al volver al inicio
  private applyReturnBounceEffect(
    mat: ShaderUniforms,
    returnProgress: number
  ): void {
    // Calcular factor de rebote
    const bounceFactor =
      Math.sin(returnProgress * Math.PI * 2) *
      this.scrollConfig.returnBounce.strength *
      (1 - returnProgress);

    // Aplicar efecto de rebote a parámetros de shader
    mat.uFrequency += bounceFactor * 0.5;
    mat.uAmplitude += bounceFactor * 0.04;

    // Si existe la malla, aplicar un rebote físico ligero
    if (this.meshRef?.current) {
      const mesh = this.meshRef.current;
      const positionBounce = bounceFactor * 0.04;
      const scaleBounce = 1 + bounceFactor * 0.02;

      // Añadir offset de rebote a la posición
      mesh.position.y += positionBounce;

      // Ligero pulso de escala para efecto de rebote
      mesh.scale.set(
        this.initialScale * scaleBounce,
        this.initialScale * scaleBounce,
        this.initialScale * scaleBounce
      );
    }
  }

  // Aplicar efectos de shader avanzados basados en progreso de scroll
  private applyShaderEffects(mat: any, progress: number): void {
    // Determinar etapa visual actual y siguiente
    let currentStageIndex = 0;
    for (let i = 0; i < this.visualStages.length - 1; i++) {
      if (
        progress >= this.visualStages[i].position &&
        progress < this.visualStages[i + 1].position
      ) {
        currentStageIndex = i;
        break;
      }
    }

    // Obtener información de etapa actual y siguiente
    const currentStage = this.visualStages[currentStageIndex];
    const nextStage = this.visualStages[currentStageIndex + 1];

    // Calcular progreso normalizado dentro de la etapa actual
    const stageProgress =
      (progress - currentStage.position) /
      (nextStage.position - currentStage.position);

    // Aplicar efectos universales
    this.applyUniversalEffects(mat, progress);
  }

  // Efectos universales aplicados en todas las etapas
  private applyUniversalEffects(mat: any, progress: number): void {
    // Ondulación persistente que varía con scroll
    const persistentRipple =
      (Math.sin(progress * Math.PI * 2.5) * 0.2 +
        Math.cos(progress * Math.PI * 4) * 0.15) *
      0.05;
    mat.uFrequency += persistentRipple;

    // Pulso sutil continuo
    const subtlePulse = Math.sin(progress * Math.PI * 8) * 0.015;
    mat.uAmplitude += subtlePulse;

    // Patrón fractal en evolución con intensidad reducida
    let fractalPattern = 0;
    for (let i = 1; i <= 2; i++) {
      // Iteraciones reducidas para mejor rendimiento
      fractalPattern += Math.sin(progress * Math.PI * i * 0.4) * (1 / i);
    }
    fractalPattern *= 0.04;

    // Aplicar patrón fractal a varios parámetros
    mat.uFrequency += fractalPattern;
    mat.uAmplitude += fractalPattern * 0.08;
    mat.uRGBShift += Math.abs(fractalPattern) * 0.004;
  }

  // Interpolación lineal
  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  // Limpiar recursos
  destroy(): void {
    if (this.tl) this.tl.kill();
    if (this.shaderTl) this.shaderTl.kill();
    if (this.meshTl) this.meshTl.kill();
    if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
    if (typeof window !== "undefined" && ScrollTrigger) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    }
    this.initialized = false;
    this.meshRef = null;
    this.matRef = null;
  }
}

export default new DeepSpaceController();
