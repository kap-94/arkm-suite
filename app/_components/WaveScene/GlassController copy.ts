// "use client";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import * as THREE from "three";
// import { MutableRefObject } from "react";

// // Registrar plugin de GSAP (solo en cliente)
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // Uniforms del shader con indexación para permitir acceso dinámico
// interface ShaderUniforms {
//   uTime: number;
//   uFrequency: number;
//   uAmplitude: number;
//   uColor: THREE.Color;
//   uSecondaryColor: THREE.Color;
//   uTexture: THREE.Texture;
//   uRGBShift: number;
//   uMouse: THREE.Vector2;
//   uScrollProgress: number;
//   [key: string]: any; // Permite acceso con índice de string
// }

// // Tipo de la referencia del material
// interface PrismaticMatRef {
//   current: (THREE.ShaderMaterial & ShaderUniforms) | null;
// }

// // Tipo de la referencia del Mesh
// type MeshRef = MutableRefObject<THREE.Mesh | null>;

// // Definición de una etapa de transición de partículas
// interface ParticleStage {
//   density: number; // Densidad de partículas (0-1)
//   speed: number; // Velocidad de movimiento
//   size: number; // Tamaño de partículas
//   turbulence: number; // Turbulencia del movimiento
//   colorIntensity: number; // Intensidad de color (0-1)
//   glow: number; // Efecto de brillo (0-1)
// }

// class PrismaticGlassController {
//   private tl: gsap.core.Timeline | null = null;
//   private shaderTl: gsap.core.Timeline | null = null;
//   private initialized = false;
//   private meshRef: MeshRef | null = null;
//   private matRef: PrismaticMatRef | null = null;
//   private scrollThrottle: NodeJS.Timeout | null = null;
//   private initialScale: number = 1;
//   private initialPosition = new THREE.Vector3();

//   // Definir etapas de efectos visuales para el scroll
//   private readonly visualStages = [
//     { position: 0.0, name: "Origin" },
//     { position: 0.2, name: "Emergence" },
//     { position: 0.4, name: "Transformation" },
//     { position: 0.65, name: "Disruption" },
//     { position: 0.85, name: "Harmony" },
//     { position: 1.0, name: "Transcendence" },
//   ];

//   // Configuraciones de shader para cada etapa visual
//   private readonly shaderStages = [
//     {
//       // Origin - Estado inicial suave
//       frequency: 2.0,
//       amplitude: 0.15,
//       rgbShift: 0.01,
//       primaryColor: new THREE.Color("#3A86FF"), // Azul claro
//       secondaryColor: new THREE.Color("#8338EC"), // Púrpura
//       shaderDensity: 1.0, // Densidad normal
//       noiseScale: 1.0, // Escala de ruido base
//       timeScale: 1.0, // Velocidad de animación normal
//     },
//     {
//       // Emergence - Emergiendo desde la nada
//       frequency: 4.0,
//       amplitude: 0.25,
//       rgbShift: 0.02,
//       primaryColor: new THREE.Color("#FF006E"), // Rosa fuerte
//       secondaryColor: new THREE.Color("#FFBE0B"), // Amarillo
//       shaderDensity: 1.3, // Más denso
//       noiseScale: 1.5, // Más detalle
//       timeScale: 1.2, // Ligeramente más rápido
//     },
//     {
//       // Transformation - Cambio radical
//       frequency: 7.0,
//       amplitude: 0.4,
//       rgbShift: 0.05,
//       primaryColor: new THREE.Color("#FB5607"), // Naranja
//       secondaryColor: new THREE.Color("#00B4D8"), // Cian
//       shaderDensity: 1.6, // Muy denso
//       noiseScale: 2.0, // Gran detalle
//       timeScale: 1.5, // Rápido
//     },
//     {
//       // Disruption - Momento caótico
//       frequency: 10.0,
//       amplitude: 0.6,
//       rgbShift: 0.08,
//       primaryColor: new THREE.Color("#E63946"), // Rojo
//       secondaryColor: new THREE.Color("#06D6A0"), // Verde brillante
//       shaderDensity: 2.0, // Extremadamente denso
//       noiseScale: 2.5, // Máximo detalle
//       timeScale: 2.0, // Muy rápido
//     },
//     {
//       // Harmony - Reconciliación, equilibrio
//       frequency: 5.0,
//       amplitude: 0.3,
//       rgbShift: 0.04,
//       primaryColor: new THREE.Color("#7209B7"), // Púrpura profundo
//       secondaryColor: new THREE.Color("#4CC9F0"), // Azul cielo
//       shaderDensity: 1.5, // Densidad moderada
//       noiseScale: 1.8, // Detalle moderado
//       timeScale: 1.3, // Velocidad moderada
//     },
//     {
//       // Transcendence - Estado final elevado
//       frequency: 3.0,
//       amplitude: 0.2,
//       rgbShift: 0.03,
//       primaryColor: new THREE.Color("#4361EE"), // Azul eléctrico
//       secondaryColor: new THREE.Color("#F72585"), // Rosa brillante
//       shaderDensity: 1.2, // Densidad suave
//       noiseScale: 1.3, // Detalle equilibrado
//       timeScale: 1.0, // Velocidad normal
//     },
//   ];

//   // Configuraciones de partículas para cada etapa visual
//   private readonly particleStages: ParticleStage[] = [
//     {
//       // Origin
//       density: 0.3,
//       speed: 0.5,
//       size: 0.8,
//       turbulence: 0.2,
//       colorIntensity: 0.6,
//       glow: 0.3,
//     },
//     {
//       // Emergence
//       density: 0.5,
//       speed: 0.8,
//       size: 1.0,
//       turbulence: 0.5,
//       colorIntensity: 0.8,
//       glow: 0.5,
//     },
//     {
//       // Transformation
//       density: 0.7,
//       speed: 1.2,
//       size: 1.2,
//       turbulence: 1.0,
//       colorIntensity: 0.9,
//       glow: 0.7,
//     },
//     {
//       // Disruption
//       density: 1.0,
//       speed: 1.8,
//       size: 1.5,
//       turbulence: 1.5,
//       colorIntensity: 1.0,
//       glow: 1.0,
//     },
//     {
//       // Harmony
//       density: 0.8,
//       speed: 1.0,
//       size: 1.3,
//       turbulence: 0.7,
//       colorIntensity: 0.85,
//       glow: 0.8,
//     },
//     {
//       // Transcendence
//       density: 0.6,
//       speed: 0.9,
//       size: 1.1,
//       turbulence: 0.4,
//       colorIntensity: 0.75,
//       glow: 0.6,
//     },
//   ];

//   init(meshRef: MeshRef, matRef: PrismaticMatRef): void {
//     if (this.initialized || typeof window === "undefined") return;
//     this.meshRef = meshRef;
//     this.matRef = matRef;
//     this.initialized = true;

//     // Almacenar escala y posición inicial
//     if (meshRef.current) {
//       this.initialScale = meshRef.current.scale.x;
//       this.initialPosition.copy(meshRef.current.position);
//     }

//     this.setupScrollTrigger();
//   }

//   private setupScrollTrigger(): void {
//     // Timeline principal para el scroll
//     this.tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: "body",
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1.2, // Más suave para transiciones de shader
//         onUpdate: (self) => {
//           if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
//           this.scrollThrottle = setTimeout(() => {
//             this.onScroll(self.progress);

//             // Actualizar posición del timeline de shaders
//             if (this.shaderTl) {
//               this.shaderTl.progress(self.progress);
//             }
//           }, 20);
//         },
//       },
//     });

//     // Timeline específico para transformaciones de shader
//     this.createShaderTimeline();
//   }

//   private createShaderTimeline(): void {
//     if (!this.matRef?.current) return;
//     const mat = this.matRef.current;

//     this.shaderTl = gsap.timeline({ paused: true });

//     // Crear transiciones entre cada etapa visual
//     for (let i = 0; i < this.visualStages.length - 1; i++) {
//       const startStage = this.visualStages[i];
//       const endStage = this.visualStages[i + 1];
//       const duration = endStage.position - startStage.position;

//       // Configuraciones de shader para esta transición
//       const startShader = this.shaderStages[i];
//       const endShader = this.shaderStages[i + 1];

//       // Crear transición entre etapas
//       this.shaderTl.to(
//         mat,
//         {
//           uFrequency: endShader.frequency,
//           uAmplitude: endShader.amplitude,
//           uRGBShift: endShader.rgbShift,
//           duration: duration,
//           ease: i === 3 ? "expo.out" : "power2.inOut", // Efecto especial para la etapa de Disruption
//           onUpdate: () => {
//             const progress =
//               (this.shaderTl?.progress() || 0 - startStage.position) / duration;
//             if (progress >= 0 && progress <= 1) {
//               // Interpolar colores
//               const color = new THREE.Color();
//               color.lerpColors(
//                 startShader.primaryColor,
//                 endShader.primaryColor,
//                 progress
//               );
//               mat.uColor = color;

//               const secondaryColor = new THREE.Color();
//               secondaryColor.lerpColors(
//                 startShader.secondaryColor,
//                 endShader.secondaryColor,
//                 progress
//               );
//               mat.uSecondaryColor = secondaryColor;
//             }
//           },
//         },
//         startStage.position
//       );
//     }
//   }

//   private onScroll(progress: number): void {
//     if (!this.matRef?.current) return;
//     const mat = this.matRef.current;

//     // Actualizar uniform de scroll
//     mat.uScrollProgress = progress;

//     if (this.meshRef?.current) {
//       const mesh = this.meshRef.current;

//       // Mantener la imagen en su lugar, NO moverla
//       mesh.position.copy(this.initialPosition);
//       mesh.scale.set(this.initialScale, this.initialScale, this.initialScale);

//       // Aplicar efectos avanzados de shader basados en el scroll
//       this.applyShaderEffects(mat, progress);

//       // Simular cambios en partículas (los efectos de partículas se logran a través de los shaders)
//       this.simulateParticleChanges(mat, progress);
//     }
//   }

//   // Aplicar efectos avanzados de shader según el progreso de scroll
//   private applyShaderEffects(mat: any, progress: number): void {
//     // Determinar la etapa visual actual y la siguiente
//     let currentStageIndex = 0;
//     for (let i = 0; i < this.visualStages.length - 1; i++) {
//       if (
//         progress >= this.visualStages[i].position &&
//         progress < this.visualStages[i + 1].position
//       ) {
//         currentStageIndex = i;
//         break;
//       }
//     }

//     const currentStage = this.visualStages[currentStageIndex];
//     const nextStage = this.visualStages[currentStageIndex + 1];
//     const currentShader = this.shaderStages[currentStageIndex];
//     const nextShader = this.shaderStages[currentStageIndex + 1];

//     // Calcular progreso normalizado dentro de la etapa actual
//     const stageProgress =
//       (progress - currentStage.position) /
//       (nextStage.position - currentStage.position);

//     // Aplicar efectos específicos de shader según la etapa
//     switch (currentStageIndex) {
//       case 0: // Origin -> Emergence
//         this.applyOriginEffects(mat, stageProgress);
//         break;
//       case 1: // Emergence -> Transformation
//         this.applyEmergenceEffects(mat, stageProgress);
//         break;
//       case 2: // Transformation -> Disruption
//         this.applyTransformationEffects(mat, stageProgress);
//         break;
//       case 3: // Disruption -> Harmony
//         this.applyDisruptionEffects(mat, stageProgress);
//         break;
//       case 4: // Harmony -> Transcendence
//         this.applyHarmonyEffects(mat, stageProgress);
//         break;
//     }

//     // Efectos universales de deformación y ondulación
//     this.applyUniversalEffects(mat, progress);
//   }

//   // Origin -> Emergence: Efecto de surgimiento gradual
//   private applyOriginEffects(mat: any, progress: number): void {
//     // Patrón de ondas circulares que emergen del centro
//     const emergenceWaves = Math.sin(progress * Math.PI * 5) * progress * 0.2;
//     mat.uFrequency += emergenceWaves;

//     // Efecto de "velo que se levanta"
//     const veilLifting = Math.pow(progress, 2) * 0.15;
//     mat.uAmplitude += veilLifting;

//     // Distorsión cromática que aumenta lentamente
//     const chromaticEmerge = Math.pow(progress, 1.5) * 0.02;
//     mat.uRGBShift += chromaticEmerge;

//     // Pulsos sutiles que aumentan en intensidad
//     const emergePulse = Math.sin(progress * Math.PI * 8) * progress * 0.1;
//     mat.uAmplitude += emergePulse;
//   }

//   // Emergence -> Transformation: Efecto de metamorfosis
//   private applyEmergenceEffects(mat: any, progress: number): void {
//     // Ondas de transformación con frecuencia aumentada
//     const transformWaves =
//       Math.sin(progress * Math.PI * 8) * 0.3 +
//       Math.cos(progress * Math.PI * 5) * 0.2;
//     mat.uFrequency += transformWaves;

//     // Amplitud creciente con pulsos
//     const growingAmplitude =
//       Math.pow(progress, 1.3) * 0.2 +
//       Math.sin(progress * Math.PI * 10) * progress * 0.15;
//     mat.uAmplitude += growingAmplitude;

//     // Distorsión cromática en aumento
//     const chromaGrowth =
//       progress * 0.03 + Math.sin(progress * Math.PI * 7) * 0.01;
//     mat.uRGBShift += chromaGrowth;

//     // Efecto de refracción que se intensifica
//     const refractionEffect = Math.pow(progress, 2) * 0.4;
//     // Si el shader tuviera un uniform de refracción:
//     // mat.uRefraction = refractionEffect;
//   }

//   // Transformation -> Disruption: Efecto de disrupción que se aproxima
//   private applyTransformationEffects(mat: any, progress: number): void {
//     // Ondas de interferencia caóticas
//     const chaosWaves = [
//       Math.sin(progress * Math.PI * 12),
//       Math.cos(progress * Math.PI * 8 + 0.4),
//       Math.sin(progress * Math.PI * 15 + 0.8),
//     ];

//     const chaosPattern =
//       (chaosWaves[0] * 0.4 + chaosWaves[1] * 0.3 + chaosWaves[2] * 0.3) * 0.5;

//     // Frecuencia que se vuelve más errática
//     mat.uFrequency += chaosPattern * 4;

//     // Amplitud con picos irregulares
//     mat.uAmplitude +=
//       Math.abs(chaosPattern) * 0.3 + Math.pow(progress, 3) * 0.2;

//     // Distorsión cromática extrema en aumento
//     mat.uRGBShift += progress * 0.05 + Math.abs(chaosPattern) * 0.02;

//     // Efecto de fractura
//     const fractureEffect = Math.pow(progress, 2) * 1.5;
//     // Si el shader tuviera un uniform de fractura:
//     // mat.uFracture = fractureEffect;

//     // Pulsos de alta frecuencia
//     const highFreqPulse = Math.sin(progress * Math.PI * 25) * progress * 0.2;
//     mat.uAmplitude += highFreqPulse;
//   }

//   // Disruption -> Harmony: Efecto de reorganización del caos
//   private applyDisruptionEffects(mat: any, progress: number): void {
//     // Ondas de caos que disminuyen
//     const fadingChaos =
//       Math.sin(progress * Math.PI * 10) * (1 - progress) * 0.4;
//     mat.uFrequency += fadingChaos;

//     // Amplitud que se organiza
//     const organizingAmplitude =
//       Math.sin(progress * Math.PI * 8) * (1 - Math.pow(progress, 2)) * 0.3;
//     mat.uAmplitude += organizingAmplitude;

//     // Distorsión cromática que decrece
//     mat.uRGBShift += (1 - progress) * 0.04;

//     // Efecto de resonancia armónica emergente
//     const harmonicResonance = Math.sin(progress * Math.PI * 4) * progress * 0.2;
//     mat.uFrequency += harmonicResonance;

//     // Pulsos que se vuelven más regulares
//     const regularizingPulse =
//       Math.sin(progress * Math.PI * (10 - progress * 5)) * 0.15;
//     mat.uAmplitude += regularizingPulse;
//   }

//   // Harmony -> Transcendence: Efecto de elevación final
//   private applyHarmonyEffects(mat: any, progress: number): void {
//     // Ondas armónicas perfectas
//     const harmonicWaves = Math.sin(progress * Math.PI * 6) * 0.2;
//     mat.uFrequency += harmonicWaves;

//     // Suave brillante pulsante
//     const gentleGlow = Math.pow(Math.sin(progress * Math.PI), 2) * 0.2;
//     mat.uAmplitude += gentleGlow;

//     // Distorsión cromática sutil y controlada
//     mat.uRGBShift += Math.sin(progress * Math.PI * 2) * 0.01;

//     // Efecto de aura que crece
//     const auraEffect = progress * 0.3;
//     // Si el shader tuviera un uniform de aura:
//     // mat.uAura = auraEffect;

//     // Destello de luz final
//     const finalGlow = Math.pow(progress, 3) * 0.25;
//     // Si el shader tuviera un uniform de brillo:
//     // mat.uGlow = finalGlow;
//   }

//   // Efectos universales aplicados en todas las etapas
//   private applyUniversalEffects(mat: any, progress: number): void {
//     // Ondulación persistente pero que varía con el scroll
//     const persistentRipple =
//       (Math.sin(progress * Math.PI * 3) * 0.3 +
//         Math.cos(progress * Math.PI * 5) * 0.2) *
//       0.1;
//     mat.uFrequency += persistentRipple;

//     // Pulso sutil continuo
//     const subtlePulse = Math.sin(progress * Math.PI * 15) * 0.05;
//     mat.uAmplitude += subtlePulse;

//     // Patrón fractal evolutivo
//     let fractalPattern = 0;
//     for (let i = 1; i <= 5; i++) {
//       fractalPattern += Math.sin(progress * Math.PI * i * 0.5) * (1 / i);
//     }
//     fractalPattern *= 0.1;

//     // Aplicar sutilmente el patrón fractal a varios parámetros
//     mat.uFrequency += fractalPattern;
//     mat.uAmplitude += fractalPattern * 0.2;
//     mat.uRGBShift += Math.abs(fractalPattern) * 0.01;

//     // Turbulencia de fondo que evoluciona con el scroll
//     const backgroundTurbulence =
//       (Math.sin(progress * Math.PI * 2.5) * 0.2 +
//         Math.cos(progress * Math.PI * 1.8) * 0.15) *
//       0.1;

//     // Si tuvieras un uniform de turbulencia:
//     // mat.uTurbulence = 0.5 + backgroundTurbulence;
//   }

//   // Simular cambios en partículas a través de efectos de shader
//   private simulateParticleChanges(mat: any, progress: number): void {
//     // Determinar qué etapas de partículas interpolar
//     let currentStageIndex = 0;
//     for (let i = 0; i < this.visualStages.length - 1; i++) {
//       if (
//         progress >= this.visualStages[i].position &&
//         progress < this.visualStages[i + 1].position
//       ) {
//         currentStageIndex = i;
//         break;
//       }
//     }

//     const currentStage = this.visualStages[currentStageIndex];
//     const nextStage = this.visualStages[currentStageIndex + 1];
//     const stageProgress =
//       (progress - currentStage.position) /
//       (nextStage.position - currentStage.position);

//     // Obtener configuraciones de partículas para interpolar
//     const startParticles = this.particleStages[currentStageIndex];
//     const endParticles = this.particleStages[currentStageIndex + 1];

//     // Calcular valores interpolados de partículas
//     const particleSettings = this.interpolateParticleSettings(
//       startParticles,
//       endParticles,
//       stageProgress
//     );

//     // Aplicar la configuración de partículas a los efectos de shader
//     this.applyParticleEffects(mat, particleSettings, progress);
//   }

//   // Interpolar entre dos configuraciones de partículas
//   private interpolateParticleSettings(
//     start: ParticleStage,
//     end: ParticleStage,
//     progress: number
//   ): ParticleStage {
//     // Función para interpolar linealmente entre dos valores
//     const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

//     return {
//       density: lerp(start.density, end.density, progress),
//       speed: lerp(start.speed, end.speed, progress),
//       size: lerp(start.size, end.size, progress),
//       turbulence: lerp(start.turbulence, end.turbulence, progress),
//       colorIntensity: lerp(start.colorIntensity, end.colorIntensity, progress),
//       glow: lerp(start.glow, end.glow, progress),
//     };
//   }

//   // Aplicar configuración de partículas a los efectos de shader
//   private applyParticleEffects(
//     mat: any,
//     particles: ParticleStage,
//     progress: number
//   ): void {
//     // La densidad de partículas afecta a la frecuencia
//     const densityFactor = particles.density * 2;
//     mat.uFrequency = mat.uFrequency * (1 + (densityFactor - 1) * 0.2);

//     // El tamaño afecta a la amplitud
//     const sizeFactor = particles.size;
//     mat.uAmplitude = mat.uAmplitude * (1 + (sizeFactor - 1) * 0.3);

//     // La velocidad afecta al factor de tiempo (aunque esto no lo aplicamos directamente aquí)
//     const speedFactor = particles.speed;
//     // Si hubiera un uniform de velocidad:
//     // mat.uSpeedFactor = speedFactor;

//     // La turbulencia agrega distorsión aleatoria
//     const turbulenceFactor = particles.turbulence;
//     mat.uRGBShift = mat.uRGBShift * (1 + (turbulenceFactor - 1) * 0.4);

//     // La intensidad de color modifica la saturación de los colores
//     const colorFactor = particles.colorIntensity;
//     mat.uColor.r = Math.min(1, mat.uColor.r * colorFactor);
//     mat.uColor.g = Math.min(1, mat.uColor.g * colorFactor);
//     mat.uColor.b = Math.min(1, mat.uColor.b * colorFactor);

//     mat.uSecondaryColor.r = Math.min(1, mat.uSecondaryColor.r * colorFactor);
//     mat.uSecondaryColor.g = Math.min(1, mat.uSecondaryColor.g * colorFactor);
//     mat.uSecondaryColor.b = Math.min(1, mat.uSecondaryColor.b * colorFactor);

//     // El brillo afecta la luminancia general
//     const glowFactor = particles.glow;
//     // Si hubiera un uniform de brillo:
//     // mat.uGlowIntensity = glowFactor;

//     // Crear efectos de movimiento de partículas
//     this.createParticleMovementEffects(mat, particles, progress);
//   }

//   // Crear efectos de movimiento de partículas a través de shaders
//   private createParticleMovementEffects(
//     mat: any,
//     particles: ParticleStage,
//     progress: number
//   ): void {
//     // Patrón de movimiento básico basado en velocidad y turbulencia
//     const movementPattern =
//       Math.sin(progress * Math.PI * 10 * particles.speed) *
//       particles.turbulence *
//       0.2;

//     // Afectar sutilmente a la frecuencia para simular movimiento de partículas
//     mat.uFrequency += movementPattern;

//     // Crear "remolinos" de partículas con diferentes velocidades
//     const swirls = [
//       Math.sin(progress * Math.PI * 5 * particles.speed),
//       Math.cos(progress * Math.PI * 7 * particles.speed + 0.4),
//       Math.sin(progress * Math.PI * 3 * particles.speed + 0.8),
//     ];

//     const swirlEffect =
//       (swirls[0] * 0.5 + swirls[1] * 0.3 + swirls[2] * 0.2) *
//       particles.turbulence *
//       0.15;

//     // Aplicar el efecto de remolino a la amplitud para simular agrupación de partículas
//     mat.uAmplitude += swirlEffect;

//     // Simular "explosiones" de partículas en puntos específicos del scroll
//     const explosionPoints = [0.25, 0.55, 0.85];
//     const explosionThreshold = 0.05;

//     let nearestExplosion = 1.0;
//     let explosionDistance = 1.0;

//     // Encontrar el punto de explosión más cercano
//     explosionPoints.forEach((point) => {
//       const distance = Math.abs(progress - point);
//       if (distance < explosionDistance) {
//         explosionDistance = distance;
//         nearestExplosion = point;
//       }
//     });

//     // Si estamos cerca de un punto de explosión
//     if (explosionDistance < explosionThreshold) {
//       const explosionIntensity = 1 - explosionDistance / explosionThreshold;
//       const explosionEffect = explosionIntensity * 0.3 * particles.density;

//       // Crear una "onda de choque" temporal
//       mat.uFrequency +=
//         explosionEffect * Math.sin(explosionDistance * Math.PI * 20) * 5;
//       mat.uAmplitude += explosionEffect * 0.4;
//       mat.uRGBShift += explosionEffect * 0.05;
//     }
//   }

//   destroy(): void {
//     if (this.tl) this.tl.kill();
//     if (this.shaderTl) this.shaderTl.kill();
//     if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
//     if (typeof window !== "undefined" && ScrollTrigger) {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     }
//     this.initialized = false;
//     this.meshRef = null;
//     this.matRef = null;
//   }
// }

// export default new PrismaticGlassController();
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

// Definición de una etapa de transición de partículas
interface ParticleStage {
  density: number; // Densidad de partículas (0-1)
  speed: number; // Velocidad de movimiento
  size: number; // Tamaño de partículas
  turbulence: number; // Turbulencia del movimiento
  colorIntensity: number; // Intensidad de color (0-1)
  glow: number; // Efecto de brillo (0-1)
}

class PrismaticGlassController {
  private tl: gsap.core.Timeline | null = null;
  private shaderTl: gsap.core.Timeline | null = null;
  private meshTl: gsap.core.Timeline | null = null;
  private initialized = false;
  private meshRef: MeshRef | null = null;
  private matRef: PrismaticMatRef | null = null;
  private scrollThrottle: NodeJS.Timeout | null = null;
  private initialScale: number = 1;
  private initialPosition = new THREE.Vector3();

  // Definir etapas de efectos visuales para el scroll
  private readonly visualStages = [
    { position: 0.0, name: "Origin" },
    { position: 0.2, name: "Emergence" },
    { position: 0.4, name: "Transformation" },
    { position: 0.65, name: "Disruption" },
    { position: 0.85, name: "Harmony" },
    { position: 1.0, name: "Transcendence" },
  ];

  // Configuraciones de shader para cada etapa visual
  private readonly shaderStages = [
    {
      // Origin - Estado inicial suave
      frequency: 2.0,
      amplitude: 0.15,
      rgbShift: 0.01,
      primaryColor: new THREE.Color("#3A86FF"), // Azul claro
      secondaryColor: new THREE.Color("#8338EC"), // Púrpura
      shaderDensity: 1.0, // Densidad normal
      noiseScale: 1.0, // Escala de ruido base
      timeScale: 1.0, // Velocidad de animación normal
    },
    {
      // Emergence - Emergiendo desde la nada
      frequency: 4.0,
      amplitude: 0.25,
      rgbShift: 0.02,
      primaryColor: new THREE.Color("#FF006E"), // Rosa fuerte
      secondaryColor: new THREE.Color("#FFBE0B"), // Amarillo
      shaderDensity: 1.3, // Más denso
      noiseScale: 1.5, // Más detalle
      timeScale: 1.2, // Ligeramente más rápido
    },
    {
      // Transformation - Cambio radical
      frequency: 7.0,
      amplitude: 0.4,
      rgbShift: 0.05,
      primaryColor: new THREE.Color("#FB5607"), // Naranja
      secondaryColor: new THREE.Color("#00B4D8"), // Cian
      shaderDensity: 1.6, // Muy denso
      noiseScale: 2.0, // Gran detalle
      timeScale: 1.5, // Rápido
    },
    {
      // Disruption - Momento caótico
      frequency: 10.0,
      amplitude: 0.6,
      rgbShift: 0.08,
      primaryColor: new THREE.Color("#E63946"), // Rojo
      secondaryColor: new THREE.Color("#06D6A0"), // Verde brillante
      shaderDensity: 2.0, // Extremadamente denso
      noiseScale: 2.5, // Máximo detalle
      timeScale: 2.0, // Muy rápido
    },
    {
      // Harmony - Reconciliación, equilibrio
      frequency: 5.0,
      amplitude: 0.3,
      rgbShift: 0.04,
      primaryColor: new THREE.Color("#7209B7"), // Púrpura profundo
      secondaryColor: new THREE.Color("#4CC9F0"), // Azul cielo
      shaderDensity: 1.5, // Densidad moderada
      noiseScale: 1.8, // Detalle moderado
      timeScale: 1.3, // Velocidad moderada
    },
    {
      // Transcendence - Estado final elevado
      frequency: 3.0,
      amplitude: 0.2,
      rgbShift: 0.03,
      primaryColor: new THREE.Color("#4361EE"), // Azul eléctrico
      secondaryColor: new THREE.Color("#F72585"), // Rosa brillante
      shaderDensity: 1.2, // Densidad suave
      noiseScale: 1.3, // Detalle equilibrado
      timeScale: 1.0, // Velocidad normal
    },
  ];

  // Configuraciones de partículas para cada etapa visual
  private readonly particleStages: ParticleStage[] = [
    {
      // Origin
      density: 0.3,
      speed: 0.5,
      size: 0.8,
      turbulence: 0.2,
      colorIntensity: 0.6,
      glow: 0.3,
    },
    {
      // Emergence
      density: 0.5,
      speed: 0.8,
      size: 1.0,
      turbulence: 0.5,
      colorIntensity: 0.8,
      glow: 0.5,
    },
    {
      // Transformation
      density: 0.7,
      speed: 1.2,
      size: 1.2,
      turbulence: 1.0,
      colorIntensity: 0.9,
      glow: 0.7,
    },
    {
      // Disruption
      density: 1.0,
      speed: 1.8,
      size: 1.5,
      turbulence: 1.5,
      colorIntensity: 1.0,
      glow: 1.0,
    },
    {
      // Harmony
      density: 0.8,
      speed: 1.0,
      size: 1.3,
      turbulence: 0.7,
      colorIntensity: 0.85,
      glow: 0.8,
    },
    {
      // Transcendence
      density: 0.6,
      speed: 0.9,
      size: 1.1,
      turbulence: 0.4,
      colorIntensity: 0.75,
      glow: 0.6,
    },
  ];

  // Configuración de desplazamiento suave optimizado para UX
  private readonly scrollConfig = {
    // Distancia total de desplazamiento vertical (múltiplo de la posición inicial)
    totalVerticalOffset: 1.8,

    // Curvas de movimiento optimizadas por etapa (valores de 0-1 que afectan la aceleración)
    motionCurves: [
      { start: 0.0, end: 0.2, ease: "power1.out" }, // Inicio suave
      { start: 0.2, end: 0.4, ease: "power1.inOut" }, // Transición suave
      { start: 0.4, end: 0.65, ease: "power2.inOut" }, // Aceleración moderada
      { start: 0.65, end: 0.85, ease: "power3.out" }, // Desaceleración suave
      { start: 0.85, end: 1.0, ease: "sine.inOut" }, // Finalización suave
    ],

    // Parámetros de escala durante el scroll
    scale: {
      min: 0.7, // Escala mínima
      max: 1.0, // Escala máxima (inicial)
      easeDown: 0.3, // Punto en el que comienza a disminuir la escala (0-1)
      easeUp: 0.7, // Punto en el que comienza a aumentar la escala (0-1)
    },

    // Parámetros de rotación sutil durante el scroll
    rotation: {
      maxAngle: 0.2, // Ángulo máximo de rotación (en radianes)
      frequency: 1.5, // Frecuencia de la oscilación
    },
  };

  init(meshRef: MeshRef, matRef: PrismaticMatRef): void {
    if (this.initialized || typeof window === "undefined") return;
    this.meshRef = meshRef;
    this.matRef = matRef;
    this.initialized = true;

    // Almacenar escala y posición inicial
    if (meshRef.current) {
      this.initialScale = meshRef.current.scale.x;
      this.initialPosition.copy(meshRef.current.position);
    }

    this.setupScrollTrigger();
  }

  private setupScrollTrigger(): void {
    // Timeline principal para el scroll
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2, // Más suave para transiciones de shader
        onUpdate: (self) => {
          if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
          this.scrollThrottle = setTimeout(() => {
            this.onScroll(self.progress);

            // Actualizar posición de los timelines
            if (this.shaderTl) {
              this.shaderTl.progress(self.progress);
            }
            if (this.meshTl) {
              this.meshTl.progress(self.progress);
            }
          }, 20);
        },
      },
    });

    // Timeline específico para transformaciones de shader
    this.createShaderTimeline();

    // Timeline para el movimiento suave de la malla
    this.createMeshMovementTimeline();
  }

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

      // Crear transición entre etapas con easing específico
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

  private createMeshMovementTimeline(): void {
    if (!this.meshRef?.current) return;
    const mesh = this.meshRef.current;

    this.meshTl = gsap.timeline({ paused: true });

    // Movimiento vertical suave de la malla con easing optimizado
    this.meshTl.to(
      {},
      {
        duration: 1, // Timeline completo
        onUpdate: () => {
          if (!this.meshRef?.current) return;
          const mesh = this.meshRef.current;
          const progress = this.meshTl?.progress() || 0;

          // Calcular desplazamiento vertical con easing personalizado
          this.applyCustomVerticalScrolling(mesh, progress);

          // Aplicar variación sutil de escala
          this.applySubtleScaleVariation(mesh, progress);

          // Aplicar rotación sutil
          this.applySubtleRotation(mesh, progress);
        },
      }
    );
  }

  // Aplicar desplazamiento vertical con curvas de easing personalizadas
  private applyCustomVerticalScrolling(
    mesh: THREE.Mesh,
    progress: number
  ): void {
    // Determinar en qué etapa de movimiento estamos
    let currentCurveIndex = 0;
    for (let i = 0; i < this.scrollConfig.motionCurves.length; i++) {
      const curve = this.scrollConfig.motionCurves[i];
      if (progress >= curve.start && progress <= curve.end) {
        currentCurveIndex = i;
        break;
      }
    }

    // Obtener la curva actual
    const currentCurve = this.scrollConfig.motionCurves[currentCurveIndex];

    // Calcular el progreso normalizado dentro de la curva actual
    const curveProgress =
      (progress - currentCurve.start) / (currentCurve.end - currentCurve.start);

    // Aplicar el easing a este segmento del movimiento
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
      case "power2.inOut":
        easedProgress =
          curveProgress < 0.5
            ? 2 * curveProgress * curveProgress
            : 1 - Math.pow(-2 * curveProgress + 2, 2) / 2;
        break;
      case "power3.out":
        easedProgress = 1 - Math.pow(1 - curveProgress, 3);
        break;
      case "sine.inOut":
        easedProgress = -(Math.cos(Math.PI * curveProgress) - 1) / 2;
        break;
      default:
        easedProgress = curveProgress;
    }

    // Calcular el progreso general del movimiento (0-1)
    const overallProgress =
      currentCurve.start +
      easedProgress * (currentCurve.end - currentCurve.start);

    // Aplicar movimiento vertical
    const verticalOffset =
      this.initialPosition.y -
      overallProgress * this.scrollConfig.totalVerticalOffset;

    // Aplicar posición con micro-variaciones para una sensación más natural
    const microVariation = Math.sin(overallProgress * Math.PI * 8) * 0.02;

    mesh.position.set(
      this.initialPosition.x + Math.sin(overallProgress * Math.PI) * 0.1,
      verticalOffset + microVariation,
      this.initialPosition.z
    );
  }

  // Aplicar variaciones sutiles de escala durante el scroll
  private applySubtleScaleVariation(mesh: THREE.Mesh, progress: number): void {
    let scaleFactor: number;

    // Disminuir tamaño gradualmente y luego aumentar ligeramente al final
    if (progress < this.scrollConfig.scale.easeDown) {
      // Mantener escala inicial al principio
      scaleFactor = this.scrollConfig.scale.max;
    } else if (progress < this.scrollConfig.scale.easeUp) {
      // Reducir escala gradualmente en la parte media
      const scaleProgress =
        (progress - this.scrollConfig.scale.easeDown) /
        (this.scrollConfig.scale.easeUp - this.scrollConfig.scale.easeDown);
      const easeInOut =
        scaleProgress < 0.5
          ? 2 * scaleProgress * scaleProgress
          : 1 - Math.pow(-2 * scaleProgress + 2, 2) / 2;

      scaleFactor =
        this.scrollConfig.scale.max -
        (this.scrollConfig.scale.max - this.scrollConfig.scale.min) * easeInOut;
    } else {
      // Aumentar ligeramente al final para dar sensación de revelación
      const scaleProgress =
        (progress - this.scrollConfig.scale.easeUp) /
        (1 - this.scrollConfig.scale.easeUp);

      const endScale =
        this.scrollConfig.scale.min +
        (this.scrollConfig.scale.max - this.scrollConfig.scale.min) * 0.3;

      scaleFactor =
        this.scrollConfig.scale.min +
        (endScale - this.scrollConfig.scale.min) *
          (1 - Math.pow(1 - scaleProgress, 3));
    }

    // Añadir una micro-respiración a la escala
    const breathingEffect = Math.sin(progress * Math.PI * 6) * 0.03;
    scaleFactor += breathingEffect;

    // Aplicar escala
    const finalScale = this.initialScale * scaleFactor;
    mesh.scale.set(finalScale, finalScale, finalScale);
  }

  // Aplicar rotación sutil durante el scroll
  private applySubtleRotation(mesh: THREE.Mesh, progress: number): void {
    // Rotación suave en Z que sigue un patrón sinusoidal
    const zRotation =
      Math.sin(progress * Math.PI * this.scrollConfig.rotation.frequency) *
      this.scrollConfig.rotation.maxAngle *
      0.5;

    // Rotación suave en X que sigue un patrón de coseno
    const xRotation =
      Math.cos(
        progress * Math.PI * this.scrollConfig.rotation.frequency * 0.7
      ) *
      this.scrollConfig.rotation.maxAngle *
      0.3;

    // Rotación suave en Y que sigue un patrón personalizado
    const yRotation =
      Math.sin(
        progress * Math.PI * this.scrollConfig.rotation.frequency * 1.3
      ) *
      this.scrollConfig.rotation.maxAngle *
      0.4;

    // Aplicar rotaciones sutiles
    mesh.rotation.set(xRotation, yRotation, zRotation);
  }

  private onScroll(progress: number): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    // Actualizar uniform de scroll
    mat.uScrollProgress = progress;

    // Aplicar efectos avanzados de shader basados en el scroll
    this.applyShaderEffects(mat, progress);

    // Simular cambios en partículas (los efectos de partículas se logran a través de los shaders)
    this.simulateParticleChanges(mat, progress);
  }

  // Aplicar efectos avanzados de shader según el progreso de scroll
  private applyShaderEffects(mat: any, progress: number): void {
    // Determinar la etapa visual actual y la siguiente
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

    const currentStage = this.visualStages[currentStageIndex];
    const nextStage = this.visualStages[currentStageIndex + 1];
    const currentShader = this.shaderStages[currentStageIndex];
    const nextShader = this.shaderStages[currentStageIndex + 1];

    // Calcular progreso normalizado dentro de la etapa actual
    const stageProgress =
      (progress - currentStage.position) /
      (nextStage.position - currentStage.position);

    // Aplicar efectos específicos de shader según la etapa
    switch (currentStageIndex) {
      case 0: // Origin -> Emergence
        this.applyOriginEffects(mat, stageProgress);
        break;
      case 1: // Emergence -> Transformation
        this.applyEmergenceEffects(mat, stageProgress);
        break;
      case 2: // Transformation -> Disruption
        this.applyTransformationEffects(mat, stageProgress);
        break;
      case 3: // Disruption -> Harmony
        this.applyDisruptionEffects(mat, stageProgress);
        break;
      case 4: // Harmony -> Transcendence
        this.applyHarmonyEffects(mat, stageProgress);
        break;
    }

    // Efectos universales de deformación y ondulación
    this.applyUniversalEffects(mat, progress);
  }

  // Origin -> Emergence: Efecto de surgimiento gradual
  private applyOriginEffects(mat: any, progress: number): void {
    // Patrón de ondas circulares que emergen del centro
    const emergenceWaves = Math.sin(progress * Math.PI * 5) * progress * 0.2;
    mat.uFrequency += emergenceWaves;

    // Efecto de "velo que se levanta"
    const veilLifting = Math.pow(progress, 2) * 0.15;
    mat.uAmplitude += veilLifting;

    // Distorsión cromática que aumenta lentamente
    const chromaticEmerge = Math.pow(progress, 1.5) * 0.02;
    mat.uRGBShift += chromaticEmerge;

    // Pulsos sutiles que aumentan en intensidad
    const emergePulse = Math.sin(progress * Math.PI * 8) * progress * 0.1;
    mat.uAmplitude += emergePulse;
  }

  // Emergence -> Transformation: Efecto de metamorfosis
  private applyEmergenceEffects(mat: any, progress: number): void {
    // Ondas de transformación con frecuencia aumentada
    const transformWaves =
      Math.sin(progress * Math.PI * 8) * 0.3 +
      Math.cos(progress * Math.PI * 5) * 0.2;
    mat.uFrequency += transformWaves;

    // Amplitud creciente con pulsos
    const growingAmplitude =
      Math.pow(progress, 1.3) * 0.2 +
      Math.sin(progress * Math.PI * 10) * progress * 0.15;
    mat.uAmplitude += growingAmplitude;

    // Distorsión cromática en aumento
    const chromaGrowth =
      progress * 0.03 + Math.sin(progress * Math.PI * 7) * 0.01;
    mat.uRGBShift += chromaGrowth;

    // Efecto de refracción que se intensifica
    const refractionEffect = Math.pow(progress, 2) * 0.4;
    // Si el shader tuviera un uniform de refracción:
    // mat.uRefraction = refractionEffect;
  }

  // Transformation -> Disruption: Efecto de disrupción que se aproxima
  private applyTransformationEffects(mat: any, progress: number): void {
    // Ondas de interferencia caóticas
    const chaosWaves = [
      Math.sin(progress * Math.PI * 12),
      Math.cos(progress * Math.PI * 8 + 0.4),
      Math.sin(progress * Math.PI * 15 + 0.8),
    ];

    const chaosPattern =
      (chaosWaves[0] * 0.4 + chaosWaves[1] * 0.3 + chaosWaves[2] * 0.3) * 0.5;

    // Frecuencia que se vuelve más errática
    mat.uFrequency += chaosPattern * 4;

    // Amplitud con picos irregulares
    mat.uAmplitude +=
      Math.abs(chaosPattern) * 0.3 + Math.pow(progress, 3) * 0.2;

    // Distorsión cromática extrema en aumento
    mat.uRGBShift += progress * 0.05 + Math.abs(chaosPattern) * 0.02;

    // Efecto de fractura
    const fractureEffect = Math.pow(progress, 2) * 1.5;
    // Si el shader tuviera un uniform de fractura:
    // mat.uFracture = fractureEffect;

    // Pulsos de alta frecuencia
    const highFreqPulse = Math.sin(progress * Math.PI * 25) * progress * 0.2;
    mat.uAmplitude += highFreqPulse;
  }

  // Disruption -> Harmony: Efecto de reorganización del caos
  private applyDisruptionEffects(mat: any, progress: number): void {
    // Ondas de caos que disminuyen
    const fadingChaos =
      Math.sin(progress * Math.PI * 10) * (1 - progress) * 0.4;
    mat.uFrequency += fadingChaos;

    // Amplitud que se organiza
    const organizingAmplitude =
      Math.sin(progress * Math.PI * 8) * (1 - Math.pow(progress, 2)) * 0.3;
    mat.uAmplitude += organizingAmplitude;

    // Distorsión cromática que decrece
    mat.uRGBShift += (1 - progress) * 0.04;

    // Efecto de resonancia armónica emergente
    const harmonicResonance = Math.sin(progress * Math.PI * 4) * progress * 0.2;
    mat.uFrequency += harmonicResonance;

    // Pulsos que se vuelven más regulares
    const regularizingPulse =
      Math.sin(progress * Math.PI * (10 - progress * 5)) * 0.15;
    mat.uAmplitude += regularizingPulse;
  }

  // Harmony -> Transcendence: Efecto de elevación final
  private applyHarmonyEffects(mat: any, progress: number): void {
    // Ondas armónicas perfectas
    const harmonicWaves = Math.sin(progress * Math.PI * 6) * 0.2;
    mat.uFrequency += harmonicWaves;

    // Suave brillante pulsante
    const gentleGlow = Math.pow(Math.sin(progress * Math.PI), 2) * 0.2;
    mat.uAmplitude += gentleGlow;

    // Distorsión cromática sutil y controlada
    mat.uRGBShift += Math.sin(progress * Math.PI * 2) * 0.01;

    // Efecto de aura que crece
    const auraEffect = progress * 0.3;
    // Si el shader tuviera un uniform de aura:
    // mat.uAura = auraEffect;

    // Destello de luz final
    const finalGlow = Math.pow(progress, 3) * 0.25;
    // Si el shader tuviera un uniform de brillo:
    // mat.uGlow = finalGlow;
  }

  // Efectos universales aplicados en todas las etapas
  private applyUniversalEffects(mat: any, progress: number): void {
    // Ondulación persistente pero que varía con el scroll
    const persistentRipple =
      (Math.sin(progress * Math.PI * 3) * 0.3 +
        Math.cos(progress * Math.PI * 5) * 0.2) *
      0.1;
    mat.uFrequency += persistentRipple;

    // Pulso sutil continuo
    const subtlePulse = Math.sin(progress * Math.PI * 15) * 0.05;
    mat.uAmplitude += subtlePulse;

    // Patrón fractal evolutivo
    let fractalPattern = 0;
    for (let i = 1; i <= 5; i++) {
      fractalPattern += Math.sin(progress * Math.PI * i * 0.5) * (1 / i);
    }
    fractalPattern *= 0.1;

    // Aplicar sutilmente el patrón fractal a varios parámetros
    mat.uFrequency += fractalPattern;
    mat.uAmplitude += fractalPattern * 0.2;
    mat.uRGBShift += Math.abs(fractalPattern) * 0.01;

    // Turbulencia de fondo que evoluciona con el scroll
    const backgroundTurbulence =
      (Math.sin(progress * Math.PI * 2.5) * 0.2 +
        Math.cos(progress * Math.PI * 1.8) * 0.15) *
      0.1;

    // Si tuvieras un uniform de turbulencia:
    // mat.uTurbulence = 0.5 + backgroundTurbulence;
  }

  // Simular cambios en partículas a través de efectos de shader
  private simulateParticleChanges(mat: any, progress: number): void {
    // Determinar qué etapas de partículas interpolar
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

    const currentStage = this.visualStages[currentStageIndex];
    const nextStage = this.visualStages[currentStageIndex + 1];
    const stageProgress =
      (progress - currentStage.position) /
      (nextStage.position - currentStage.position);

    // Obtener configuraciones de partículas para interpolar
    const startParticles = this.particleStages[currentStageIndex];
    const endParticles = this.particleStages[currentStageIndex + 1];

    // Calcular valores interpolados de partículas
    const particleSettings = this.interpolateParticleSettings(
      startParticles,
      endParticles,
      stageProgress
    );

    // Aplicar la configuración de partículas a los efectos de shader
    this.applyParticleEffects(mat, particleSettings, progress);
  }

  // Interpolar entre dos configuraciones de partículas
  private interpolateParticleSettings(
    start: ParticleStage,
    end: ParticleStage,
    progress: number
  ): ParticleStage {
    // Función para interpolar linealmente entre dos valores
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    return {
      density: lerp(start.density, end.density, progress),
      speed: lerp(start.speed, end.speed, progress),
      size: lerp(start.size, end.size, progress),
      turbulence: lerp(start.turbulence, end.turbulence, progress),
      colorIntensity: lerp(start.colorIntensity, end.colorIntensity, progress),
      glow: lerp(start.glow, end.glow, progress),
    };
  }

  // Aplicar configuración de partículas a los efectos de shader
  private applyParticleEffects(
    mat: any,
    particles: ParticleStage,
    progress: number
  ): void {
    // La densidad de partículas afecta a la frecuencia
    const densityFactor = particles.density * 2;
    mat.uFrequency = mat.uFrequency * (1 + (densityFactor - 1) * 0.2);

    // El tamaño afecta a la amplitud
    const sizeFactor = particles.size;
    mat.uAmplitude = mat.uAmplitude * (1 + (sizeFactor - 1) * 0.3);

    // La velocidad afecta al factor de tiempo (aunque esto no lo aplicamos directamente aquí)
    const speedFactor = particles.speed;
    // Si hubiera un uniform de velocidad:
    // mat.uSpeedFactor = speedFactor;

    // La turbulencia agrega distorsión aleatoria
    const turbulenceFactor = particles.turbulence;
    mat.uRGBShift = mat.uRGBShift * (1 + (turbulenceFactor - 1) * 0.4);

    // La intensidad de color modifica la saturación de los colores
    const colorFactor = particles.colorIntensity;
    mat.uColor.r = Math.min(1, mat.uColor.r * colorFactor);
    mat.uColor.g = Math.min(1, mat.uColor.g * colorFactor);
    mat.uColor.b = Math.min(1, mat.uColor.b * colorFactor);

    mat.uSecondaryColor.r = Math.min(1, mat.uSecondaryColor.r * colorFactor);
    mat.uSecondaryColor.g = Math.min(1, mat.uSecondaryColor.g * colorFactor);
    mat.uSecondaryColor.b = Math.min(1, mat.uSecondaryColor.b * colorFactor);

    // El brillo afecta la luminancia general
    const glowFactor = particles.glow;
    // Si hubiera un uniform de brillo:
    // mat.uGlowIntensity = glowFactor;

    // Crear efectos de movimiento de partículas
    this.createParticleMovementEffects(mat, particles, progress);
  }

  // Crear efectos de movimiento de partículas a través de shaders
  private createParticleMovementEffects(
    mat: any,
    particles: ParticleStage,
    progress: number
  ): void {
    // Patrón de movimiento básico basado en velocidad y turbulencia
    const movementPattern =
      Math.sin(progress * Math.PI * 10 * particles.speed) *
      particles.turbulence *
      0.2;

    // Afectar sutilmente a la frecuencia para simular movimiento de partículas
    mat.uFrequency += movementPattern;

    // Crear "remolinos" de partículas con diferentes velocidades
    const swirls = [
      Math.sin(progress * Math.PI * 5 * particles.speed),
      Math.cos(progress * Math.PI * 7 * particles.speed + 0.4),
      Math.sin(progress * Math.PI * 3 * particles.speed + 0.8),
    ];

    const swirlEffect =
      (swirls[0] * 0.5 + swirls[1] * 0.3 + swirls[2] * 0.2) *
      particles.turbulence *
      0.15;

    // Aplicar el efecto de remolino a la amplitud para simular agrupación de partículas
    mat.uAmplitude += swirlEffect;

    // Simular "explosiones" de partículas en puntos específicos del scroll
    const explosionPoints = [0.25, 0.55, 0.85];
    const explosionThreshold = 0.05;

    let nearestExplosion = 1.0;
    let explosionDistance = 1.0;

    // Encontrar el punto de explosión más cercano
    explosionPoints.forEach((point) => {
      const distance = Math.abs(progress - point);
      if (distance < explosionDistance) {
        explosionDistance = distance;
        nearestExplosion = point;
      }
    });

    // Si estamos cerca de un punto de explosión
    if (explosionDistance < explosionThreshold) {
      const explosionIntensity = 1 - explosionDistance / explosionThreshold;
      const explosionEffect = explosionIntensity * 0.3 * particles.density;

      // Crear una "onda de choque" temporal
      mat.uFrequency +=
        explosionEffect * Math.sin(explosionDistance * Math.PI * 20) * 5;
      mat.uAmplitude += explosionEffect * 0.4;
      mat.uRGBShift += explosionEffect * 0.05;
    }
  }

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

export default new PrismaticGlassController();
