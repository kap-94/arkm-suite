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
  private narrativeTl: gsap.core.Timeline | null = null;
  private initialized = false;
  private meshRef: MeshRef | null = null;
  private matRef: PrismaticMatRef | null = null;
  private scrollThrottle: NodeJS.Timeout | null = null;
  private initialScale: number = 1;
  private initialY: number = 0;

  // Narrative transition markers
  private readonly INTRO = 0;
  private readonly RISING_ACTION = 0.3;
  private readonly CLIMAX = 0.6;
  private readonly RESOLUTION = 0.85;
  private readonly EPILOGUE = 1.0;

  // Effect parameters for each narrative stage
  private narrativeStages = [
    {
      // INTRO: Calm, gentle beginning
      frequency: 2.0,
      amplitude: 0.1,
      rgbShift: 0.005,
      primaryColor: new THREE.Color("#3B82F6"), // Blue
      secondaryColor: new THREE.Color("#4F46E5"), // Indigo
      rotationSpeed: 0.1,
      pulseFrequency: 1,
    },
    {
      // RISING_ACTION: Building tension
      frequency: 4.0,
      amplitude: 0.25,
      rgbShift: 0.02,
      primaryColor: new THREE.Color("#8B5CF6"), // Purple
      secondaryColor: new THREE.Color("#EC4899"), // Pink
      rotationSpeed: 0.3,
      pulseFrequency: 2,
    },
    {
      // CLIMAX: Intense peak
      frequency: 8.0,
      amplitude: 0.5,
      rgbShift: 0.08,
      primaryColor: new THREE.Color("#EF4444"), // Red
      secondaryColor: new THREE.Color("#F59E0B"), // Amber
      rotationSpeed: 0.6,
      pulseFrequency: 4,
    },
    {
      // RESOLUTION: Calming down
      frequency: 3.0,
      amplitude: 0.2,
      rgbShift: 0.03,
      primaryColor: new THREE.Color("#10B981"), // Emerald
      secondaryColor: new THREE.Color("#06B6D4"), // Cyan
      rotationSpeed: 0.2,
      pulseFrequency: 2,
    },
    {
      // EPILOGUE: Serene ending
      frequency: 1.5,
      amplitude: 0.05,
      rgbShift: 0.01,
      primaryColor: new THREE.Color("#6366F1"), // Indigo
      secondaryColor: new THREE.Color("#8B5CF6"), // Purple
      rotationSpeed: 0.05,
      pulseFrequency: 0.5,
    },
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
    // Main scroll timeline
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
          this.scrollThrottle = setTimeout(() => {
            this.onScroll(self.progress);

            // Update our narrative timeline position
            if (this.narrativeTl) {
              this.narrativeTl.progress(self.progress);
            }
          }, 25);
        },
      },
    });

    // Narrative timeline for visual storytelling
    this.createNarrativeTimeline();
  }

  private createNarrativeTimeline(): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    this.narrativeTl = gsap.timeline({ paused: true });

    // INTRO: Calm, gentle beginning
    this.narrativeTl.to(
      mat,
      {
        uFrequency: this.narrativeStages[0].frequency,
        uAmplitude: this.narrativeStages[0].amplitude,
        uRGBShift: this.narrativeStages[0].rgbShift,
        duration: this.RISING_ACTION,
        ease: "sine.inOut",
        onUpdate: () => {
          mat.uColor.set(this.narrativeStages[0].primaryColor);
          mat.uSecondaryColor.set(this.narrativeStages[0].secondaryColor);
        },
      },
      0
    );

    // RISING_ACTION: Building tension
    this.narrativeTl.to(
      mat,
      {
        uFrequency: this.narrativeStages[1].frequency,
        uAmplitude: this.narrativeStages[1].amplitude,
        uRGBShift: this.narrativeStages[1].rgbShift,
        duration: this.CLIMAX - this.RISING_ACTION,
        ease: "power2.in",
        onUpdate: () => {
          const progress =
            (this.narrativeTl?.progress() || 0 - this.RISING_ACTION) /
            (this.CLIMAX - this.RISING_ACTION);
          if (progress >= 0 && progress <= 1) {
            const color = new THREE.Color();
            color.lerpColors(
              this.narrativeStages[0].primaryColor,
              this.narrativeStages[1].primaryColor,
              progress
            );
            mat.uColor = color;

            const secondaryColor = new THREE.Color();
            secondaryColor.lerpColors(
              this.narrativeStages[0].secondaryColor,
              this.narrativeStages[1].secondaryColor,
              progress
            );
            mat.uSecondaryColor = secondaryColor;
          }
        },
      },
      this.RISING_ACTION
    );

    // CLIMAX: Intense peak with dramatic effects
    this.narrativeTl.to(
      mat,
      {
        uFrequency: this.narrativeStages[2].frequency,
        uAmplitude: this.narrativeStages[2].amplitude,
        uRGBShift: this.narrativeStages[2].rgbShift,
        duration: this.RESOLUTION - this.CLIMAX,
        ease: "expo.out",
        onUpdate: () => {
          const progress =
            (this.narrativeTl?.progress() || 0 - this.CLIMAX) /
            (this.RESOLUTION - this.CLIMAX);
          if (progress >= 0 && progress <= 1) {
            const color = new THREE.Color();
            color.lerpColors(
              this.narrativeStages[1].primaryColor,
              this.narrativeStages[2].primaryColor,
              progress
            );
            mat.uColor = color;

            const secondaryColor = new THREE.Color();
            secondaryColor.lerpColors(
              this.narrativeStages[1].secondaryColor,
              this.narrativeStages[2].secondaryColor,
              progress
            );
            mat.uSecondaryColor = secondaryColor;
          }
        },
      },
      this.CLIMAX
    );

    // RESOLUTION: Calming down, finding balance
    this.narrativeTl.to(
      mat,
      {
        uFrequency: this.narrativeStages[3].frequency,
        uAmplitude: this.narrativeStages[3].amplitude,
        uRGBShift: this.narrativeStages[3].rgbShift,
        duration: this.EPILOGUE - this.RESOLUTION,
        ease: "sine.inOut",
        onUpdate: () => {
          const progress =
            (this.narrativeTl?.progress() || 0 - this.RESOLUTION) /
            (this.EPILOGUE - this.RESOLUTION);
          if (progress >= 0 && progress <= 1) {
            const color = new THREE.Color();
            color.lerpColors(
              this.narrativeStages[2].primaryColor,
              this.narrativeStages[3].primaryColor,
              progress
            );
            mat.uColor = color;

            const secondaryColor = new THREE.Color();
            secondaryColor.lerpColors(
              this.narrativeStages[2].secondaryColor,
              this.narrativeStages[3].secondaryColor,
              progress
            );
            mat.uSecondaryColor = secondaryColor;
          }
        },
      },
      this.RESOLUTION
    );

    // Final transition to EPILOGUE
    this.narrativeTl.to(
      mat,
      {
        uFrequency: this.narrativeStages[4].frequency,
        uAmplitude: this.narrativeStages[4].amplitude,
        uRGBShift: this.narrativeStages[4].rgbShift,
        duration: 0.15,
        ease: "power1.out",
        onUpdate: () => {
          const progress =
            (this.narrativeTl?.progress() || 0 - this.RESOLUTION) /
            (1 - this.RESOLUTION);
          if (progress >= 0 && progress <= 1) {
            const color = new THREE.Color();
            color.lerpColors(
              this.narrativeStages[3].primaryColor,
              this.narrativeStages[4].primaryColor,
              progress
            );
            mat.uColor = color;

            const secondaryColor = new THREE.Color();
            secondaryColor.lerpColors(
              this.narrativeStages[3].secondaryColor,
              this.narrativeStages[4].secondaryColor,
              progress
            );
            mat.uSecondaryColor = secondaryColor;
          }
        },
      },
      this.EPILOGUE - 0.15
    );
  }

  private onScroll(progress: number): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    // Update scroll progress uniform
    mat.uScrollProgress = progress;

    // Manipulate Mesh based on narrative stage
    if (this.meshRef?.current) {
      const mesh = this.meshRef.current;

      // Determine current narrative stage
      let stage = 0;
      if (progress < this.RISING_ACTION) {
        stage = 0; // INTRO
      } else if (progress < this.CLIMAX) {
        stage = 1; // RISING_ACTION
      } else if (progress < this.RESOLUTION) {
        stage = 2; // CLIMAX
      } else if (progress < this.EPILOGUE) {
        stage = 3; // RESOLUTION
      } else {
        stage = 4; // EPILOGUE
      }

      // Get relevant stage parameters
      const stageConfig = this.narrativeStages[stage];

      // Aplicar modulaciones avanzadas al shader basadas en la narrativa
      this.applyNarrativeShaderEffects(mat, progress, stage);

      // Rotation behavior based on narrative stage
      const rotationFactor = stageConfig.rotationSpeed;

      if (stage === 2) {
        // CLIMAX - more dramatic movement
        // Chaotic climax rotations with quick shifts
        mesh.rotation.z = Math.sin(progress * Math.PI * 8) * 0.5;
        mesh.rotation.x = Math.cos(progress * Math.PI * 6) * 0.4;
        mesh.rotation.y = Math.sin(progress * Math.PI * 10) * 0.6;

        // Dramatic camera shake effect
        const shake = Math.random() * 0.05;
        mesh.position.x = Math.sin(progress * Math.PI * 5) * 0.8 + shake;
        mesh.position.y = this.initialY - progress * 2.0 + shake;
        mesh.position.z = 0.5 + Math.cos(progress * Math.PI * 7) * 0.6 + shake;

        // Pulse scaling dramatically
        const pulseScale =
          Math.sin(progress * Math.PI * stageConfig.pulseFrequency * 5) * 0.2;
        mesh.scale.set(
          this.initialScale * (0.8 + pulseScale),
          this.initialScale * (0.8 + pulseScale),
          this.initialScale * (0.8 + pulseScale)
        );
      } else {
        // Normal narrative stage rotations
        mesh.rotation.z = Math.sin(progress * Math.PI * 3) * rotationFactor;
        mesh.rotation.x =
          Math.cos(progress * Math.PI * 2) * rotationFactor * 0.7;
        mesh.rotation.y =
          Math.sin(progress * Math.PI * 4) * rotationFactor * 0.5;

        // Smooth position changes
        mesh.position.x = Math.sin(progress * Math.PI * 2) * 0.3 * (stage + 1);
        mesh.position.y = this.initialY - progress * 1.5;

        // Z-position narrative path
        const narrativeZPath = [
          Math.sin(progress * Math.PI) * 0.2, // INTRO - gentle movement
          Math.sin(progress * Math.PI * 3) * 0.3, // RISING_ACTION - more pronounced
          0, // CLIMAX is handled separately above
          Math.cos(progress * Math.PI * 2) * 0.4, // RESOLUTION - calming oscillation
          Math.sin(progress * Math.PI * 0.5) * 0.1, // EPILOGUE - subtle final movement
        ];

        // Use correct z-path for current stage
        if (stage !== 2) {
          // Not CLIMAX
          mesh.position.z = 0.3 + narrativeZPath[stage];
        }

        // Narrative-based scale changes
        const baseShrink = 1 - progress * 0.4;
        const pulseFactor =
          Math.sin(progress * Math.PI * stageConfig.pulseFrequency) * 0.1;
        const newScale = this.initialScale * baseShrink * (1 + pulseFactor);
        mesh.scale.set(newScale, newScale, newScale);
      }

      // Apply custom shader modulation based on narrative moments
      if (!this.narrativeTl?.isActive()) {
        // Only apply these if timeline isn't controlling them directly

        // Create narrative moment highlights
        const storyBeats = [0.15, 0.35, 0.55, 0.75, 0.95]; // Key moments
        let nearestBeat = 0;
        let beatDistance = 1.0;

        // Find closest narrative beat
        storyBeats.forEach((beat) => {
          const distance = Math.abs(progress - beat);
          if (distance < beatDistance) {
            beatDistance = distance;
            nearestBeat = beat;
          }
        });

        // Emphasize shader parameters near key narrative beats
        const beatInfluence = Math.max(0, 0.1 - beatDistance * 2) * 10; // 0-1 intensity
        if (beatInfluence > 0) {
          // Create "moment" effect by briefly heightening parameters
          mat.uFrequency += beatInfluence * 3.0;
          mat.uAmplitude += beatInfluence * 0.3;
          mat.uRGBShift += beatInfluence * 0.03;
        }
      }
    }
  }

  // Método para aplicar efectos avanzados de shader según etapa narrativa
  private applyNarrativeShaderEffects(
    mat: any,
    progress: number,
    narrativeStage: number
  ): void {
    // Calcular patrones de shader basados en la etapa narrativa
    const stageConfig = this.narrativeStages[narrativeStage];

    // Mapear etapas narrativas a patrones visuales específicos en shaders
    switch (narrativeStage) {
      case 0: // INTRO - Emergencia suave desde la oscuridad
        this.applyIntroShaderEffect(mat, progress);
        break;

      case 1: // RISING_ACTION - Aumento gradual de complejidad
        this.applyRisingActionShaderEffect(mat, progress);
        break;

      case 2: // CLIMAX - Efectos visuales intensos y caóticos
        this.applyClimaxShaderEffect(mat, progress);
        break;

      case 3: // RESOLUTION - Estabilización y claridad
        this.applyResolutionShaderEffect(mat, progress);
        break;

      case 4: // EPILOGUE - Desvanecimiento elegante
        this.applyEpilogueShaderEffect(mat, progress);
        break;
    }

    // Efectos universales basados en el progreso general
    this.applyUniversalShaderEffects(mat, progress);
  }

  // INTRO - Emergencia suave
  private applyIntroShaderEffect(mat: any, progress: number): void {
    // Normalizar el progreso dentro de esta etapa narrativa
    const normalizedProgress = progress / this.RISING_ACTION;

    // Efecto de emergencia desde la oscuridad
    const emergence = Math.pow(normalizedProgress, 2); // Curva cuadrática para emergencia no lineal

    // Oscilación sutil para crear un efecto etéreo
    const subtleWave =
      Math.sin(normalizedProgress * Math.PI * 10) * 0.05 * normalizedProgress;

    // Modificaciones avanzadas de shader para la introducción
    mat.uFrequency = 1.5 + emergence * 1.0 + subtleWave;
    mat.uAmplitude = 0.05 + emergence * 0.1;
    mat.uRGBShift = 0.005 + emergence * 0.01;

    // Efecto de velo inicial que se disipa
    // Si el shader tuviera más uniformes, podríamos hacer:
    // mat.uVeilOpacity = 1.0 - Math.pow(normalizedProgress, 1.5);
    // mat.uShadowIntensity = 0.7 - normalizedProgress * 0.5;

    // Patrón de ondas que se forma lentamente
    const formingPattern =
      normalizedProgress *
      (0.2 + Math.sin(normalizedProgress * Math.PI * 8) * 0.1);
    mat.uAmplitude += formingPattern;
  }

  // RISING_ACTION - Aumento de tensión
  private applyRisingActionShaderEffect(mat: any, progress: number): void {
    // Normalizar el progreso dentro de esta etapa
    const stageStart = this.RISING_ACTION;
    const stageEnd = this.CLIMAX;
    const normalizedProgress =
      (progress - stageStart) / (stageEnd - stageStart);

    // Aumento de tensión con frecuencia creciente
    const tensionRise = Math.pow(normalizedProgress, 1.5) * 2.0; // Curva para tensión creciente

    // Pulsaciones que aumentan en frecuencia e intensidad
    const pulseSpeed = 2.0 + normalizedProgress * 6.0; // De 2 a 8 Hz
    const pulseDepth = 0.1 + normalizedProgress * 0.2; // Aumenta con el progreso
    const pulseEffect =
      Math.sin(normalizedProgress * Math.PI * pulseSpeed) * pulseDepth;

    // Distorsión cromática que crece gradualmente
    const chromaGrowth = Math.pow(normalizedProgress, 2) * 0.03;

    // Modificaciones avanzadas de shader
    mat.uFrequency = 3.0 + tensionRise + pulseEffect * 3.0;
    mat.uAmplitude = 0.15 + normalizedProgress * 0.2 + pulseEffect;
    mat.uRGBShift = 0.01 + chromaGrowth + pulseEffect * 0.02;

    // Patrones de interferencia que crecen en complejidad
    // Si el shader tuviera más uniformes:
    // mat.uInterferencePattern = normalizedProgress * 0.7;
    // mat.uWaveTurbulence = 0.2 + normalizedProgress * 0.5;

    // Efecto de aceleración temporal
    const timeAcceleration = Math.pow(normalizedProgress, 3) * 2.0;
    // mat.uTimeScale = 1.0 + timeAcceleration;
  }

  // CLIMAX - Caos visual controlado
  private applyClimaxShaderEffect(mat: any, progress: number): void {
    // Normalizar el progreso dentro del clímax
    const stageStart = this.CLIMAX;
    const stageEnd = this.RESOLUTION;
    const normalizedProgress =
      (progress - stageStart) / (stageEnd - stageStart);

    // Onda de choque que se expande y reverbera
    const shockwave = [
      Math.sin(normalizedProgress * Math.PI * 12),
      Math.sin(normalizedProgress * Math.PI * 8 + 0.3),
      Math.sin(normalizedProgress * Math.PI * 5 + 0.7),
    ];

    // Promedio de las ondas para crear un patrón complejo
    const combinedShockwave = (shockwave[0] + shockwave[1] + shockwave[2]) / 3;

    // Distorsión máxima en el punto medio del clímax
    const peakDistortion = Math.sin(normalizedProgress * Math.PI) * 0.8; // Máximo en el medio

    // Pulsos de alta frecuencia
    const highFreqPulse = Math.sin(normalizedProgress * Math.PI * 20) * 0.3;

    // Modificaciones de shader dramáticas
    mat.uFrequency = 7.0 + combinedShockwave * 4.0 + highFreqPulse * 2.0;
    mat.uAmplitude = 0.4 + peakDistortion * 0.3 + Math.abs(highFreqPulse) * 0.2;
    mat.uRGBShift =
      0.06 + peakDistortion * 0.05 + Math.abs(combinedShockwave) * 0.03;

    // Efectos avanzados específicos para el clímax
    // Si el shader tuviera más uniformes:
    // mat.uChaosLevel = 0.8 + combinedShockwave * 0.2;
    // mat.uDistortionField = peakDistortion;
    // mat.uHighlightFlash = Math.pow(Math.sin(normalizedProgress * Math.PI * 15) * 0.5 + 0.5, 2);

    // Colores de alta energía con transiciones pulsantes
    const energyPulse = Math.sin(normalizedProgress * Math.PI * 8) * 0.2;

    // Modificar los colores existentes con mayor intensidad
    mat.uColor.r += combinedShockwave * 0.2 + energyPulse;
    mat.uColor.g += highFreqPulse * 0.15;
    mat.uColor.b += peakDistortion * 0.25;

    mat.uSecondaryColor.r += highFreqPulse * 0.2;
    mat.uSecondaryColor.g += combinedShockwave * 0.15;
    mat.uSecondaryColor.b += energyPulse * 0.25;
  }

  // RESOLUTION - Estabilización visual
  private applyResolutionShaderEffect(mat: any, progress: number): void {
    // Normalizar el progreso dentro de la resolución
    const stageStart = this.RESOLUTION;
    const stageEnd = this.EPILOGUE;
    const normalizedProgress =
      (progress - stageStart) / (stageEnd - stageStart);

    // Decaimiento gradual de la turbulencia
    const turbulenceDecay = (1 - Math.pow(normalizedProgress, 1.3)) * 0.8;

    // Ondas que se van suavizando
    const calmingWaves =
      Math.sin(normalizedProgress * Math.PI * (7 - normalizedProgress * 4)) *
      (0.3 - normalizedProgress * 0.2);

    // Reverberaciones del clímax que van desapareciendo
    const echoes =
      Math.sin(normalizedProgress * Math.PI * 15) *
      Math.pow(1 - normalizedProgress, 2) *
      0.2;

    // Armonización visual - tendiendo a patrones más ordenados
    const harmonization = normalizedProgress * 0.4;

    // Modificaciones de shader para la resolución
    mat.uFrequency = 4.0 - normalizedProgress * 1.5 + calmingWaves + echoes;
    mat.uAmplitude = 0.25 * turbulenceDecay + echoes * 0.5;
    mat.uRGBShift =
      0.04 * (1 - normalizedProgress * 0.5) + Math.abs(echoes) * 0.02;

    // Efectos de estabilización adicionales
    // Si el shader tuviera más uniformes:
    // mat.uOrderFactor = harmonization;
    // mat.uResonanceDecay = 1.0 - normalizedProgress * 0.7;
    // mat.uClarityIncrease = normalizedProgress * 0.6;

    // Transición de color hacia tonos más claros y armoniosos
    const clarityShift = normalizedProgress * 0.3;
    mat.uColor.r += clarityShift * 0.2;
    mat.uColor.g += clarityShift * 0.3;
    mat.uColor.b += clarityShift * 0.4;

    mat.uSecondaryColor.r += clarityShift * 0.1;
    mat.uSecondaryColor.g += clarityShift * 0.4;
    mat.uSecondaryColor.b += clarityShift * 0.3;
  }

  // EPILOGUE - Desvanecimiento final
  private applyEpilogueShaderEffect(mat: any, progress: number): void {
    // Normalizar el progreso en el epílogo
    const stageStart = this.EPILOGUE;
    const normalizedProgress = (progress - stageStart) / (1 - stageStart);

    // Cierre circular que completa el viaje narrativo
    const circularClosure = Math.sin(normalizedProgress * Math.PI) * 0.5;

    // Último destello sutil antes del fin
    const finalGlow =
      Math.pow(Math.sin(normalizedProgress * Math.PI * 0.5), 2) * 0.3;

    // Ondulación final muy suave
    const gentleWave =
      Math.sin(normalizedProgress * Math.PI * 3) *
      0.1 *
      (1 - normalizedProgress);

    // Modificaciones finales de shader
    mat.uFrequency = 2.0 + circularClosure + gentleWave;
    mat.uAmplitude = 0.1 + finalGlow * 0.15;
    mat.uRGBShift = 0.01 + finalGlow * 0.02;

    // Efectos adicionales de cierre
    // Si el shader tuviera más uniformes:
    // mat.uFinalGlow = finalGlow;
    // mat.uResolution = 0.8 + normalizedProgress * 0.2;
    // mat.uVeilOpacity = normalizedProgress * 0.4; // Velo semi-transparente que cierra

    // Transición final de color - más luminoso y etéreo
    const etherealShift = Math.pow(normalizedProgress, 2) * 0.4;
    mat.uColor.r += etherealShift * 0.2;
    mat.uColor.g += etherealShift * 0.2;
    mat.uColor.b += etherealShift * 0.4;

    mat.uSecondaryColor.r += etherealShift * 0.3;
    mat.uSecondaryColor.g += etherealShift * 0.3;
    mat.uSecondaryColor.b += etherealShift * 0.5;
  }

  // Efectos universales aplicados en todas las etapas narrativas
  private applyUniversalShaderEffects(mat: any, progress: number): void {
    // Patrón de ondas armónicas que evoluciona a lo largo de toda la narrativa
    const harmonicPattern = [
      Math.sin(progress * Math.PI * 2),
      Math.sin(progress * Math.PI * 3 + 0.4),
      Math.sin(progress * Math.PI * 5 + 0.8),
    ];

    // Combinación de patrones para crear un efecto orgánico
    const organicMovement =
      (harmonicPattern[0] * 0.6 +
        harmonicPattern[1] * 0.3 +
        harmonicPattern[2] * 0.1) *
      0.15;

    // Modulación sutil adicional
    mat.uFrequency += organicMovement;
    mat.uAmplitude += Math.abs(organicMovement) * 0.1;

    // Pulsaciones periódicas sutiles a lo largo de toda la experiencia
    const subtlePulse = Math.sin(progress * Math.PI * 15) * 0.05;
    mat.uAmplitude += subtlePulse;

    // Patrones fractales que evolucionan lentamente
    let fractalPattern = 0;
    for (let i = 1; i <= 4; i++) {
      fractalPattern += Math.sin(progress * Math.PI * i) * (1 / i);
    }
    fractalPattern *= 0.08;

    // Aplicar sutilmente el patrón fractal
    mat.uRGBShift += Math.abs(fractalPattern) * 0.01;

    // Saturación de color que evoluciona
    const saturationWave = Math.sin(progress * Math.PI * 2) * 0.1;
    // Si el shader tuviera más uniformes:
    // mat.uSaturation = 1.0 + saturationWave;
    // mat.uVibrance = 0.5 + Math.sin(progress * Math.PI * 3) * 0.2;
  }

  destroy(): void {
    if (this.tl) this.tl.kill();
    if (this.narrativeTl) this.narrativeTl.kill();
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
