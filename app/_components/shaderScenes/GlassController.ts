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

// Definición de configuración de shader
interface ShaderStage {
  frequency: number;
  amplitude: number;
  rgbShift: number;
  primaryColor: THREE.Color; // Añadida propiedad que faltaba
  secondaryColor: THREE.Color; // Añadida propiedad que faltaba
  shaderDensity: number;
  noiseScale: number;
  timeScale: number;
}

// Definición de paleta de colores
interface ColorPalette {
  name: string;
  stages: {
    primary: string;
    secondary: string;
  }[];
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
  private initialShaderState: Record<string, any> = {};
  private lastScrollDirection: "up" | "down" = "down";
  private prevScrollProgress: number = 0;
  private selectedPalette: ColorPalette;

  // ID de la paleta de colores seleccionada (puede cambiarse dinámicamente)
  private colorPaletteId: number = 0;

  // Opciones de paletas de colores
  // private readonly colorPalettes: ColorPalette[] = [
  //   {
  //     // Paleta 1: Cosmic Journey
  //     name: "Cosmic Journey",
  //     stages: [
  //       { primary: "#3A86FF", secondary: "#8338EC" }, // Origin
  //       { primary: "#FF006E", secondary: "#FFBE0B" }, // Emergence
  //       { primary: "#FB5607", secondary: "#00B4D8" }, // Transformation
  //       { primary: "#E63946", secondary: "#06D6A0" }, // Disruption
  //       { primary: "#7209B7", secondary: "#4CC9F0" }, // Harmony
  //       { primary: "#4361EE", secondary: "#F72585" }, // Transcendence
  //     ],
  //   },
  //   {
  //     // Paleta 2: Northern Lights
  //     name: "Northern Lights",
  //     stages: [
  //       { primary: "#0A2463", secondary: "#3E92CC" }, // Origin
  //       { primary: "#1E5F74", secondary: "#73D2DE" }, // Emergence
  //       { primary: "#037971", secondary: "#A9FBC3" }, // Transformation
  //       { primary: "#01A7C2", secondary: "#FCDE9C" }, // Disruption
  //       { primary: "#0B7189", secondary: "#66C3FF" }, // Harmony
  //       { primary: "#293241", secondary: "#98DFEA" }, // Transcendence
  //     ],
  //   },
  //   {
  //     // Paleta 3: Sunset Vibes
  //     name: "Sunset Vibes",
  //     stages: [
  //       { primary: "#03071E", secondary: "#370617" }, // Origin
  //       { primary: "#6A040F", secondary: "#9D0208" }, // Emergence
  //       { primary: "#DC2F02", secondary: "#F48C06" }, // Transformation
  //       { primary: "#FAA307", secondary: "#FFBA08" }, // Disruption
  //       { primary: "#D00000", secondary: "#FFDD00" }, // Harmony
  //       { primary: "#370617", secondary: "#F8961E" }, // Transcendence
  //     ],
  //   },
  //   {
  //     // Paleta 4: Cyberpunk
  //     name: "Cyberpunk",
  //     stages: [
  //       { primary: "#2B0B3F", secondary: "#5643CC" }, // Origin
  //       { primary: "#7C3AED", secondary: "#3BCEAC" }, // Emergence
  //       { primary: "#EE4266", secondary: "#00FFFF" }, // Transformation
  //       { primary: "#FF00FF", secondary: "#00FF9F" }, // Disruption
  //       { primary: "#390099", secondary: "#9E0059" }, // Harmony
  //       { primary: "#1E0A3C", secondary: "#7B2CBF" }, // Transcendence
  //     ],
  //   },
  //   {
  //     // Paleta 5: Forest Dream
  //     name: "Forest Dream",
  //     stages: [
  //       { primary: "#1A281F", secondary: "#466060" }, // Origin
  //       { primary: "#5F7470", secondary: "#A9C5A0" }, // Emergence
  //       { primary: "#75704E", secondary: "#4A6C6F" }, // Transformation
  //       { primary: "#95A3A4", secondary: "#528C8A" }, // Disruption
  //       { primary: "#2A5459", secondary: "#87A878" }, // Harmony
  //       { primary: "#1E352F", secondary: "#55868C" }, // Transcendence
  //     ],
  //   },
  // ];

  private readonly colorPalettes: ColorPalette[] = [
    {
      // Paleta 1: Dark Cosmic Journey
      name: "Dark Cosmic Journey",
      stages: [
        { primary: "#1A1A2E", secondary: "#16213E" }, // Origin
        { primary: "#0F3460", secondary: "#1F4068" }, // Emergence
        { primary: "#1B1B2F", secondary: "#1F1D2B" }, // Transformation
        { primary: "#2C2C54", secondary: "#40407A" }, // Disruption
        { primary: "#2D132C", secondary: "#801336" }, // Harmony
        { primary: "#1E1E2C", secondary: "#2D2D44" }, // Transcendence
      ],
    },
    {
      // Paleta 2: Dark Northern Lights
      name: "Dark Northern Lights",
      stages: [
        { primary: "#0A192F", secondary: "#172A3A" }, // Origin
        { primary: "#1E2A3A", secondary: "#2C3E50" }, // Emergence
        { primary: "#1B263B", secondary: "#2C3E50" }, // Transformation
        { primary: "#2C3E50", secondary: "#34495E" }, // Disruption
        { primary: "#1C2833", secondary: "#2C3E50" }, // Harmony
        { primary: "#1B2631", secondary: "#2C3E50" }, // Transcendence
      ],
    },
    {
      // Paleta 3: Dark Sunset Vibes
      name: "Dark Sunset Vibes",
      stages: [
        { primary: "#1C0C28", secondary: "#2D1A3B" }, // Origin
        { primary: "#3D2B56", secondary: "#4E3D6A" }, // Emergence
        { primary: "#5A4A6A", secondary: "#6B5B7B" }, // Transformation
        { primary: "#7A6A8A", secondary: "#8B7B9A" }, // Disruption
        { primary: "#9A8AAA", secondary: "#AB9BBA" }, // Harmony
        { primary: "#BAABCA", secondary: "#CBBCDA" }, // Transcendence
      ],
    },
    {
      // Paleta 4: Dark Cyberpunk
      name: "Dark Cyberpunk",
      stages: [
        { primary: "#1A1A2E", secondary: "#16213E" }, // Origin
        { primary: "#1F1D2B", secondary: "#2D2D44" }, // Emergence
        { primary: "#2C2C54", secondary: "#40407A" }, // Transformation
        { primary: "#2D132C", secondary: "#801336" }, // Disruption
        { primary: "#1E1E2C", secondary: "#2D2D44" }, // Harmony
        { primary: "#1A1A2E", secondary: "#16213E" }, // Transcendence
      ],
    },
    {
      // Paleta 5: Dark Forest Dream
      name: "Dark Forest Dream",
      stages: [
        { primary: "#1A281F", secondary: "#1E352F" }, // Origin
        { primary: "#2A5459", secondary: "#1E352F" }, // Emergence
        { primary: "#1E352F", secondary: "#2A5459" }, // Transformation
        { primary: "#2A5459", secondary: "#1E352F" }, // Disruption
        { primary: "#1E352F", secondary: "#2A5459" }, // Harmony
        { primary: "#2A5459", secondary: "#1E352F" }, // Transcendence
      ],
    },
  ];

  // Definir etapas de efectos visuales para el scroll
  private readonly visualStages = [
    { position: 0.0, name: "Origin" },
    { position: 0.2, name: "Emergence" },
    { position: 0.4, name: "Transformation" },
    { position: 0.65, name: "Disruption" },
    { position: 0.85, name: "Harmony" },
    { position: 1.0, name: "Transcendence" },
  ];

  // // Configuraciones de shader para cada etapa visual
  // private readonly shaderStages: ShaderStage[] = [
  //   {
  //     // Origin - Estado inicial suave
  //     frequency: 2.0,
  //     amplitude: 0.15,
  //     rgbShift: 0.01,
  //     primaryColor: new THREE.Color("#3A86FF"), // Azul claro (inicializado)
  //     secondaryColor: new THREE.Color("#8338EC"), // Púrpura (inicializado)
  //     shaderDensity: 1.0, // Densidad normal
  //     noiseScale: 1.0, // Escala de ruido base
  //     timeScale: 1.0, // Velocidad de animación normal
  //   },
  //   {
  //     // Emergence - Emergiendo desde la nada
  //     frequency: 4.0,
  //     amplitude: 0.25,
  //     rgbShift: 0.02,
  //     primaryColor: new THREE.Color("#FF006E"), // Rosa fuerte
  //     secondaryColor: new THREE.Color("#FFBE0B"), // Amarillo
  //     shaderDensity: 1.3, // Más denso
  //     noiseScale: 1.5, // Más detalle
  //     timeScale: 1.2, // Ligeramente más rápido
  //   },
  //   {
  //     // Transformation - Cambio radical
  //     frequency: 7.0,
  //     amplitude: 0.4,
  //     rgbShift: 0.05,
  //     primaryColor: new THREE.Color("#FB5607"), // Naranja
  //     secondaryColor: new THREE.Color("#00B4D8"), // Cian
  //     shaderDensity: 1.6, // Muy denso
  //     noiseScale: 2.0, // Gran detalle
  //     timeScale: 1.5, // Rápido
  //   },
  //   {
  //     // Disruption - Momento caótico
  //     frequency: 10.0,
  //     amplitude: 0.6,
  //     rgbShift: 0.08,
  //     primaryColor: new THREE.Color("#E63946"), // Rojo
  //     secondaryColor: new THREE.Color("#06D6A0"), // Verde brillante
  //     shaderDensity: 2.0, // Extremadamente denso
  //     noiseScale: 2.5, // Máximo detalle
  //     timeScale: 2.0, // Muy rápido
  //   },
  //   {
  //     // Harmony - Reconciliación, equilibrio
  //     frequency: 5.0,
  //     amplitude: 0.3,
  //     rgbShift: 0.04,
  //     primaryColor: new THREE.Color("#7209B7"), // Púrpura profundo
  //     secondaryColor: new THREE.Color("#4CC9F0"), // Azul cielo
  //     shaderDensity: 1.5, // Densidad moderada
  //     noiseScale: 1.8, // Detalle moderado
  //     timeScale: 1.3, // Velocidad moderada
  //   },
  //   {
  //     // Transcendence - Estado final elevado
  //     frequency: 3.0,
  //     amplitude: 0.2,
  //     rgbShift: 0.03,
  //     primaryColor: new THREE.Color("#4361EE"), // Azul eléctrico
  //     secondaryColor: new THREE.Color("#F72585"), // Rosa brillante
  //     shaderDensity: 1.2, // Densidad suave
  //     noiseScale: 1.3, // Detalle equilibrado
  //     timeScale: 1.0, // Velocidad normal
  //   },
  // ];
  // Configuraciones de shader para cada etapa visual
  private readonly shaderStages: ShaderStage[] = [
    {
      // Origin - Estado inicial suave
      frequency: 2.0,
      amplitude: 0.15,
      rgbShift: 0.01,
      primaryColor: new THREE.Color("#27408B"), // Azul oscuro
      secondaryColor: new THREE.Color("#4B0082"), // Púrpura oscuro
      shaderDensity: 1.0, // Densidad normal
      noiseScale: 1.0, // Escala de ruido base
      timeScale: 1.0, // Velocidad de animación normal
    },
    {
      // Emergence - Emergiendo desde la nada
      frequency: 4.0,
      amplitude: 0.25,
      rgbShift: 0.02,
      primaryColor: new THREE.Color("#99004C"), // Rosa oscuro
      secondaryColor: new THREE.Color("#A67C00"), // Amarillo oscuro / dorado
      shaderDensity: 1.3, // Más denso
      noiseScale: 1.5, // Más detalle
      timeScale: 1.2, // Ligeramente más rápido
    },
    {
      // Transformation - Cambio radical
      frequency: 7.0,
      amplitude: 0.4,
      rgbShift: 0.05,
      primaryColor: new THREE.Color("#B34704"), // Naranja oscuro
      secondaryColor: new THREE.Color("#007B96"), // Cian oscuro
      shaderDensity: 1.6, // Muy denso
      noiseScale: 2.0, // Gran detalle
      timeScale: 1.5, // Rápido
    },
    {
      // Disruption - Momento caótico
      frequency: 10.0,
      amplitude: 0.6,
      rgbShift: 0.08,
      primaryColor: new THREE.Color("#8B1A1A"), // Rojo oscuro
      secondaryColor: new THREE.Color("#027A60"), // Verde oscuro
      shaderDensity: 2.0, // Extremadamente denso
      noiseScale: 2.5, // Máximo detalle
      timeScale: 2.0, // Muy rápido
    },
    {
      // Harmony - Reconciliación, equilibrio
      frequency: 5.0,
      amplitude: 0.3,
      rgbShift: 0.04,
      primaryColor: new THREE.Color("#4E077A"), // Púrpura profundo oscuro
      secondaryColor: new THREE.Color("#2C7DA0"), // Azul cielo oscuro
      shaderDensity: 1.5, // Densidad moderada
      noiseScale: 1.8, // Detalle moderado
      timeScale: 1.3, // Velocidad moderada
    },
    {
      // Transcendence - Estado final elevado
      frequency: 3.0,
      amplitude: 0.2,
      rgbShift: 0.03,
      primaryColor: new THREE.Color("#2C3E8A"), // Azul eléctrico oscuro
      secondaryColor: new THREE.Color("#A01C47"), // Rosa oscuro
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

    // Rebote en el regreso a la posición inicial
    returnBounce: {
      enabled: true, // Habilitar efecto de rebote
      strength: 0.3, // Intensidad del rebote (0-1)
      duration: 0.5, // Duración del rebote en segundos
    },
  };

  constructor(paletteId = 0) {
    // Seleccionar la paleta de colores inicial
    this.colorPaletteId = Math.min(paletteId, this.colorPalettes.length - 1);
    this.selectedPalette = this.colorPalettes[this.colorPaletteId];

    // Aplicar paleta seleccionada a los shaderStages
    this.applySelectedPalette();
  }

  // Método para cambiar la paleta de colores
  setColorPalette(paletteId: number): void {
    if (paletteId >= 0 && paletteId < this.colorPalettes.length) {
      this.colorPaletteId = paletteId;
      this.selectedPalette = this.colorPalettes[paletteId];
      this.applySelectedPalette();

      // Si ya está inicializado, actualiza el shader
      if (this.initialized && this.matRef?.current) {
        // Recrear el timeline de shader con la nueva paleta
        this.shaderTl?.kill();
        this.createShaderTimeline();
      }
    }
  }

  // Aplicar la paleta seleccionada a los shaderStages
  private applySelectedPalette(): void {
    // Asegurarse de que las etapas tengan los colores de la paleta seleccionada
    for (let i = 0; i < this.visualStages.length; i++) {
      if (i < this.selectedPalette.stages.length) {
        // Agregar colores de la paleta seleccionada a shaderStages
        this.shaderStages[i].primaryColor = new THREE.Color(
          this.selectedPalette.stages[i].primary
        );
        this.shaderStages[i].secondaryColor = new THREE.Color(
          this.selectedPalette.stages[i].secondary
        );
      }
    }
  }

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

    // Almacenar estado inicial del shader para restaurarlo al regresar
    if (matRef.current) {
      this.saveInitialShaderState(matRef.current);
    }

    this.setupScrollTrigger();
  }

  // Guardar el estado inicial del shader para poder restaurarlo al regresar a la posición inicial
  private saveInitialShaderState(mat: ShaderUniforms): void {
    this.initialShaderState = {
      uFrequency: mat.uFrequency,
      uAmplitude: mat.uAmplitude,
      uRGBShift: mat.uRGBShift,
      uColor: mat.uColor.clone(),
      uSecondaryColor: mat.uSecondaryColor.clone(),
    };
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
            // Detectar dirección de scroll
            const newDirection =
              self.progress > this.prevScrollProgress ? "down" : "up";
            const directionChanged = newDirection !== this.lastScrollDirection;

            this.lastScrollDirection = newDirection;
            this.prevScrollProgress = self.progress;

            this.onScroll(self.progress, newDirection, directionChanged);

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

  private onScroll(
    progress: number,
    direction: "up" | "down",
    directionChanged: boolean
  ): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    // Actualizar uniform de scroll
    mat.uScrollProgress = progress;

    // Si estamos volviendo al inicio (scroll hacia arriba)
    if (direction === "up" && progress < 0.05) {
      this.handleReturnToStart(progress, mat);
    } else {
      // Comportamiento normal - aplicar efectos según el progreso
      this.applyShaderEffects(mat, progress);
      this.simulateParticleChanges(mat, progress);
    }

    // Si se cambió la dirección del scroll, aplicar posibles efectos de transición
    if (directionChanged) {
      this.handleScrollDirectionChange(direction, progress, mat);
    }
  }

  // Manejar el regreso fluido a la posición inicial
  private handleReturnToStart(progress: number, mat: ShaderUniforms): void {
    // Determinar qué tan cerca estamos del inicio (0-1, donde 0 es el inicio)
    const returnProgress = progress / 0.05; // Normalizar a 0-1 en el primer 5% del scroll

    // Aplicar interpolación suave entre el estado actual y el inicial
    this.interpolateToInitialState(mat, 1 - returnProgress);

    // Si está activado el efecto de rebote y estamos muy cerca del inicio
    if (this.scrollConfig.returnBounce.enabled && returnProgress < 0.2) {
      this.applyReturnBounceEffect(mat, returnProgress);
    }
  }

  // Interpolar suavemente hacia el estado inicial del shader
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
      // Solo interpolar colores si estamos cerca del inicio para evitar parpadeos
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

  // Aplicar efecto de rebote al regresar al inicio
  private applyReturnBounceEffect(
    mat: ShaderUniforms,
    returnProgress: number
  ): void {
    // Calcular factor de rebote (seno que aumenta cerca del inicio)
    const bounceFactor =
      Math.sin(returnProgress * Math.PI * 2) *
      this.scrollConfig.returnBounce.strength *
      (1 - returnProgress);

    // Aplicar efecto de rebote a los parámetros de shader
    mat.uFrequency += bounceFactor * 2.0;
    mat.uAmplitude += bounceFactor * 0.1;

    // Si hay un mesh, aplicar ligero rebote físico
    if (this.meshRef?.current) {
      const mesh = this.meshRef.current;
      const positionBounce = bounceFactor * 0.1;
      const scaleBounce = 1 + bounceFactor * 0.05;

      // Añadir offset de rebote a la posición
      mesh.position.y += positionBounce;

      // Ligera pulsación de escala para efecto de rebote
      mesh.scale.set(
        this.initialScale * scaleBounce,
        this.initialScale * scaleBounce,
        this.initialScale * scaleBounce
      );
    }
  }

  // Manejar cambios en la dirección del scroll
  private handleScrollDirectionChange(
    direction: "up" | "down",
    progress: number,
    mat: ShaderUniforms
  ): void {
    // Efecto de transición sutil al cambiar dirección
    const transitionEffect = {
      frequency: direction === "up" ? 1.0 : -1.0,
      amplitude: direction === "up" ? 0.1 : -0.1,
      rgbShift: direction === "up" ? 0.01 : -0.01,
    };

    // GSAP para animación suave de transición
    if (typeof window !== "undefined") {
      gsap.to(mat, {
        uFrequency: mat.uFrequency + transitionEffect.frequency * 0.2,
        uAmplitude: mat.uAmplitude + transitionEffect.amplitude * 0.05,
        uRGBShift: mat.uRGBShift + transitionEffect.rgbShift * 0.01,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    }
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
    // Ondas de transformación con ligeros ajustes en frecuencia
    const transformWaves =
      Math.sin(progress * Math.PI * 9) * 0.35 +
      Math.cos(progress * Math.PI * 4.5) * 0.25;
    mat.uFrequency += transformWaves;

    // Amplitud creciente con un poco más de fuerza
    const growingAmplitude =
      Math.pow(progress, 1.4) * 0.25 +
      Math.sin(progress * Math.PI * 11) * progress * 0.18;
    mat.uAmplitude += growingAmplitude;

    // Aumento de distorsión cromática ligeramente mayor
    const chromaGrowth =
      progress * 0.035 + Math.sin(progress * Math.PI * 7.5) * 0.015;
    mat.uRGBShift += chromaGrowth;

    // Efecto de refracción (sin cambios)
    // const refractionEffect = Math.pow(progress, 2) * 0.4;
    // mat.uRefraction = refractionEffect;
  }

  // Transformation -> Disruption: Efecto de disrupción que se aproxima
  private applyTransformationEffects(mat: any, progress: number): void {
    // Ondas caóticas atenuadas
    const chaosWaves = [
      Math.sin(progress * Math.PI * 12) * 0.9,
      Math.cos(progress * Math.PI * 8 + 0.4) * 0.9,
      Math.sin(progress * Math.PI * 15 + 0.8) * 0.9,
    ];
    const chaosPattern =
      (chaosWaves[0] * 0.35 + chaosWaves[1] * 0.25 + chaosWaves[2] * 0.25) *
      0.4;
    mat.uFrequency += chaosPattern * 3;
    mat.uAmplitude +=
      Math.abs(chaosPattern) * 0.25 + Math.pow(progress, 3) * 0.15;
    mat.uRGBShift += progress * 0.04 + Math.abs(chaosPattern) * 0.015;

    // Pulsos de alta frecuencia con intensidad reducida
    const highFreqPulse = Math.sin(progress * Math.PI * 25) * progress * 0.15;
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

  // Versión Alternativa 1 para applyHarmonyEffects
  private applyHarmonyEffects(mat: any, progress: number): void {
    // Ondas armónicas con un multiplicador ligeramente reducido
    const harmonicWaves = Math.sin(progress * Math.PI * 6) * 0.15;
    mat.uFrequency += harmonicWaves;

    // Brillo muy sutil: reduciendo considerablemente el brillo (gentleGlow)
    const gentleGlow = Math.pow(Math.sin(progress * Math.PI), 2) * 0.05;
    mat.uAmplitude += gentleGlow;

    // Distorsión cromática sutil (sin cambios)
    mat.uRGBShift += Math.sin(progress * Math.PI * 2) * 0.01;

    // Si usas efectos de aura o destellos, los reducimos para oscurecer
    const auraEffect = progress * 0.2; // reducida de 0.3
    const finalGlow = Math.pow(progress, 3) * 0.15; // reducida de 0.25
    // Si cuentas con estos uniforms:
    // mat.uAura = auraEffect;
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

    // Pulso sutil continuo (ajustado para reducir la luz)
    const subtlePulse = Math.sin(progress * Math.PI * 15) * 0.03; // Antes: * 0.05
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

  // Utilidad para interpolación lineal
  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
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
