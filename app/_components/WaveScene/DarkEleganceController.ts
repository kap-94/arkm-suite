"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { MutableRefObject } from "react";

// Register GSAP plugin (client-side only)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Shader uniforms interface
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

// Material reference type
interface EleganceMatRef {
  current: (THREE.ShaderMaterial & ShaderUniforms) | null;
}

// Mesh reference type
type MeshRef = MutableRefObject<THREE.Mesh | null>;

// Color palette definition
interface ColorPalette {
  name: string;
  stages: {
    primary: string;
    secondary: string;
  }[];
}

// Shader stage configuration
interface ShaderStage {
  frequency: number;
  amplitude: number;
  rgbShift: number;
  primaryColor: THREE.Color;
  secondaryColor: THREE.Color;
}

class DarkEleganceController {
  private tl: gsap.core.Timeline | null = null;
  private shaderTl: gsap.core.Timeline | null = null;
  private meshTl: gsap.core.Timeline | null = null;
  private initialized = false;
  private meshRef: MeshRef | null = null;
  private matRef: EleganceMatRef | null = null;
  private scrollThrottle: NodeJS.Timeout | null = null;
  private initialScale: number = 1;
  private initialPosition = new THREE.Vector3();
  private initialShaderState: Record<string, any> = {};
  private lastScrollDirection: "up" | "down" = "down";
  private prevScrollProgress: number = 0;
  private selectedPalette: ColorPalette;
  private colorPaletteId: number = 0;

  // Elegant dark color palettes
  private readonly colorPalettes: ColorPalette[] = [
    {
      // Dark Elegance Palette
      name: "Dark Elegance",
      stages: [
        { primary: "#151515", secondary: "#2A2A2A" }, // Origin - Near black to dark gray
        { primary: "#191919", secondary: "#2E2E2E" }, // Emergence - Dark grays
        { primary: "#1D1D1D", secondary: "#333333" }, // Transformation - Mid dark grays
        { primary: "#212121", secondary: "#383838" }, // Disruption - Medium grays
        { primary: "#1A1A1A", secondary: "#303030" }, // Harmony - Back to dark
        { primary: "#141414", secondary: "#282828" }, // Transcendence - Near black
      ],
    },
    {
      // Dark Charcoal Palette
      name: "Dark Charcoal",
      stages: [
        { primary: "#121212", secondary: "#242424" }, // Origin - Deep charcoal
        { primary: "#161616", secondary: "#2A2A2A" }, // Emergence - Dark charcoal
        { primary: "#1A1A1A", secondary: "#2F2F2F" }, // Transformation - Medium charcoal
        { primary: "#1E1E1E", secondary: "#353535" }, // Disruption - Light charcoal
        { primary: "#181818", secondary: "#2D2D2D" }, // Harmony - Back to mid charcoal
        { primary: "#131313", secondary: "#262626" }, // Transcendence - Deep charcoal
      ],
    },
  ];

  // Elegant visual stages
  private readonly visualStages = [
    { position: 0.0, name: "Origin" },
    { position: 0.2, name: "Emergence" },
    { position: 0.4, name: "Transformation" },
    { position: 0.65, name: "Disruption" },
    { position: 0.85, name: "Harmony" },
    { position: 1.0, name: "Transcendence" },
  ];

  // Elegant shader stages with subtle variations
  private readonly shaderStages: ShaderStage[] = [
    {
      // Origin - Initial elegance
      frequency: 1.5,
      amplitude: 0.08,
      rgbShift: 0.004,
      primaryColor: new THREE.Color("#151515"), // Near black
      secondaryColor: new THREE.Color("#2A2A2A"), // Dark gray
    },
    {
      // Emergence - Subtle emergence
      frequency: 1.6,
      amplitude: 0.09,
      rgbShift: 0.005,
      primaryColor: new THREE.Color("#191919"), // Dark gray
      secondaryColor: new THREE.Color("#2E2E2E"), // Medium dark gray
    },
    {
      // Transformation - Elegant transformation
      frequency: 1.7,
      amplitude: 0.1,
      rgbShift: 0.006,
      primaryColor: new THREE.Color("#1D1D1D"), // Medium dark gray
      secondaryColor: new THREE.Color("#333333"), // Medium gray
    },
    {
      // Disruption - Controlled disruption
      frequency: 1.8,
      amplitude: 0.11,
      rgbShift: 0.007,
      primaryColor: new THREE.Color("#212121"), // Medium gray
      secondaryColor: new THREE.Color("#383838"), // Light gray
    },
    {
      // Harmony - Elegant balance
      frequency: 1.65,
      amplitude: 0.095,
      rgbShift: 0.0055,
      primaryColor: new THREE.Color("#1A1A1A"), // Dark gray
      secondaryColor: new THREE.Color("#303030"), // Medium dark gray
    },
    {
      // Transcendence - Final elegance
      frequency: 1.55,
      amplitude: 0.085,
      rgbShift: 0.0045,
      primaryColor: new THREE.Color("#141414"), // Near black
      secondaryColor: new THREE.Color("#282828"), // Dark gray
    },
  ];

  // Elegantly optimized scroll configuration
  private readonly scrollConfig = {
    // Elegant vertical movement
    totalVerticalOffset: 1.3,

    // Elegant motion curves
    motionCurves: [
      { start: 0.0, end: 0.2, ease: "power1.out" },
      { start: 0.2, end: 0.4, ease: "power1.inOut" },
      { start: 0.4, end: 0.65, ease: "power2.inOut" },
      { start: 0.65, end: 0.85, ease: "power2.out" },
      { start: 0.85, end: 1.0, ease: "power1.inOut" },
    ],

    // Elegant scale changes
    scale: {
      min: 0.9, // Minimal scale reduction for elegance
      max: 1.0,
      easeDown: 0.3,
      easeUp: 0.7,
    },

    // Very subtle elegant rotation
    rotation: {
      maxAngle: 0.08, // Minimal rotation
      frequency: 0.8,
    },

    // Elegant bounce effect
    returnBounce: {
      enabled: true,
      strength: 0.08, // Very subtle bounce
      duration: 0.4,
    },
  };

  constructor(paletteId = 0) {
    // Select initial color palette
    this.colorPaletteId = Math.min(paletteId, this.colorPalettes.length - 1);
    this.selectedPalette = this.colorPalettes[this.colorPaletteId];
    this.applySelectedPalette();
  }

  // Apply selected palette to shader stages
  private applySelectedPalette(): void {
    for (let i = 0; i < this.visualStages.length; i++) {
      if (i < this.selectedPalette.stages.length) {
        this.shaderStages[i].primaryColor = new THREE.Color(
          this.selectedPalette.stages[i].primary
        );
        this.shaderStages[i].secondaryColor = new THREE.Color(
          this.selectedPalette.stages[i].secondary
        );
      }
    }
  }

  // Change color palette
  setColorPalette(paletteId: number): void {
    if (paletteId >= 0 && paletteId < this.colorPalettes.length) {
      this.colorPaletteId = paletteId;
      this.selectedPalette = this.colorPalettes[paletteId];
      this.applySelectedPalette();

      if (this.initialized && this.matRef?.current) {
        this.shaderTl?.kill();
        this.createShaderTimeline();
      }
    }
  }

  // Initialize controller
  init(meshRef: MeshRef, matRef: EleganceMatRef): void {
    if (this.initialized || typeof window === "undefined") return;
    this.meshRef = meshRef;
    this.matRef = matRef;
    this.initialized = true;

    // Store initial scale and position
    if (meshRef.current) {
      this.initialScale = meshRef.current.scale.x;
      this.initialPosition.copy(meshRef.current.position);
    }

    // Store initial shader state
    if (matRef.current) {
      this.saveInitialShaderState(matRef.current);
    }

    this.setupScrollTrigger();
  }

  // Save initial shader state
  private saveInitialShaderState(mat: ShaderUniforms): void {
    this.initialShaderState = {
      uFrequency: mat.uFrequency,
      uAmplitude: mat.uAmplitude,
      uRGBShift: mat.uRGBShift,
      uColor: mat.uColor.clone(),
      uSecondaryColor: mat.uSecondaryColor.clone(),
    };
  }

  // Set up elegant scroll behavior
  private setupScrollTrigger(): void {
    // Main timeline for scroll
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.9, // Elegant smooth scrub
        onUpdate: (self) => {
          // Optimized throttle
          if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
          this.scrollThrottle = setTimeout(() => {
            // Track scroll direction
            const newDirection =
              self.progress > this.prevScrollProgress ? "down" : "up";
            const directionChanged = newDirection !== this.lastScrollDirection;

            this.lastScrollDirection = newDirection;
            this.prevScrollProgress = self.progress;

            this.onScroll(self.progress, newDirection, directionChanged);

            // Update timelines
            if (this.shaderTl) {
              this.shaderTl.progress(self.progress);
            }
            if (this.meshTl) {
              this.meshTl.progress(self.progress);
            }
          }, 16); // 60fps throttle
        },
      },
    });

    // Create specific timelines
    this.createShaderTimeline();
    this.createMeshMovementTimeline();
  }

  // Create elegant shader timeline
  private createShaderTimeline(): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    this.shaderTl = gsap.timeline({ paused: true });

    // Create elegant transitions between stages
    for (let i = 0; i < this.visualStages.length - 1; i++) {
      const startStage = this.visualStages[i];
      const endStage = this.visualStages[i + 1];
      const duration = endStage.position - startStage.position;

      // Get shader configurations
      const startShader = this.shaderStages[i];
      const endShader = this.shaderStages[i + 1];

      // Get easing
      const customEase = this.scrollConfig.motionCurves[i].ease;

      // Create elegant transition
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
              // Interpolate colors elegantly
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

  // Create elegant mesh movement timeline
  private createMeshMovementTimeline(): void {
    if (!this.meshRef?.current) return;

    this.meshTl = gsap.timeline({ paused: true });

    // Elegant animation
    this.meshTl.to(
      {},
      {
        duration: 1,
        onUpdate: () => {
          if (!this.meshRef?.current) return;
          const mesh = this.meshRef.current;
          const progress = this.meshTl?.progress() || 0;

          // Apply elegant movements
          this.applyElegantVerticalMovement(mesh, progress);
          this.applyElegantScaleChange(mesh, progress);
          this.applyElegantRotation(mesh, progress);
        },
      }
    );
  }

  // Apply elegant vertical movement
  private applyElegantVerticalMovement(
    mesh: THREE.Mesh,
    progress: number
  ): void {
    // Determine current motion curve
    let currentCurveIndex = 0;
    for (let i = 0; i < this.scrollConfig.motionCurves.length; i++) {
      const curve = this.scrollConfig.motionCurves[i];
      if (progress >= curve.start && progress <= curve.end) {
        currentCurveIndex = i;
        break;
      }
    }

    // Get current curve
    const currentCurve = this.scrollConfig.motionCurves[currentCurveIndex];

    // Calculate progress within curve
    const curveProgress =
      (progress - currentCurve.start) / (currentCurve.end - currentCurve.start);

    // Apply elegant easing
    let easedProgress: number;
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
      case "power2.out":
        easedProgress = 1 - Math.pow(1 - curveProgress, 2);
        break;
      default:
        easedProgress = curveProgress;
    }

    // Calculate overall progress
    const overallProgress =
      currentCurve.start +
      easedProgress * (currentCurve.end - currentCurve.start);

    // Apply elegant vertical offset
    const verticalOffset =
      this.initialPosition.y -
      overallProgress * this.scrollConfig.totalVerticalOffset;

    // Apply very subtle elegant variation
    const microVariation = Math.sin(overallProgress * Math.PI * 4) * 0.008;

    // Set position with elegant feel
    mesh.position.set(
      this.initialPosition.x + Math.sin(overallProgress * Math.PI) * 0.03,
      verticalOffset + microVariation,
      this.initialPosition.z
    );
  }

  // Apply elegant scale changes
  private applyElegantScaleChange(mesh: THREE.Mesh, progress: number): void {
    let scaleFactor: number;

    // Elegant scale calculation
    if (progress < this.scrollConfig.scale.easeDown) {
      scaleFactor = this.scrollConfig.scale.max;
    } else if (progress < this.scrollConfig.scale.easeUp) {
      const t =
        (progress - this.scrollConfig.scale.easeDown) /
        (this.scrollConfig.scale.easeUp - this.scrollConfig.scale.easeDown);

      // Smooth elegant easing
      const easeInOut = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      scaleFactor =
        this.scrollConfig.scale.max -
        (this.scrollConfig.scale.max - this.scrollConfig.scale.min) * easeInOut;
    } else {
      // Subtle increase at end for elegant reveal
      const t =
        (progress - this.scrollConfig.scale.easeUp) /
        (1 - this.scrollConfig.scale.easeUp);

      scaleFactor =
        this.scrollConfig.scale.min + this.scrollConfig.scale.min * 0.03 * t;
    }

    // Apply very subtle breathing effect for elegance
    const breathingEffect = Math.sin(progress * Math.PI * 3) * 0.006;
    scaleFactor += breathingEffect;

    // Apply scale
    const finalScale = this.initialScale * scaleFactor;
    mesh.scale.set(finalScale, finalScale, finalScale);
  }

  // Apply elegant rotation
  private applyElegantRotation(mesh: THREE.Mesh, progress: number): void {
    // Elegant subtle rotation
    const xRotation =
      Math.sin(progress * Math.PI * this.scrollConfig.rotation.frequency) *
      this.scrollConfig.rotation.maxAngle *
      0.5;

    const yRotation =
      Math.cos(
        progress * Math.PI * this.scrollConfig.rotation.frequency * 0.6
      ) *
      this.scrollConfig.rotation.maxAngle *
      0.3;

    mesh.rotation.set(xRotation, yRotation, 0);
  }

  // Handle scroll events
  private onScroll(
    progress: number,
    direction: "up" | "down",
    directionChanged: boolean
  ): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    // Update scroll progress
    mat.uScrollProgress = progress;

    // Handle return to start
    if (direction === "up" && progress < 0.05) {
      this.handleElegantReturnToStart(progress, mat);
    } else {
      // Apply elegant shader effects
      this.applyElegantShaderEffects(mat, progress);
    }

    // Handle direction change elegantly
    if (directionChanged) {
      this.handleElegantDirectionChange(direction, mat);
    }
  }

  // Handle elegant return to start
  private handleElegantReturnToStart(
    progress: number,
    mat: ShaderUniforms
  ): void {
    // Normalize progress
    const returnProgress = progress / 0.05;

    // Elegant interpolation to initial state
    this.interpolateToInitialState(mat, 1 - returnProgress);

    // Apply elegant bounce effect
    if (this.scrollConfig.returnBounce.enabled && returnProgress < 0.2) {
      this.applyElegantBounce(mat, returnProgress);
    }
  }

  // Elegant interpolation to initial state
  private interpolateToInitialState(mat: ShaderUniforms, factor: number): void {
    // Interpolate numeric parameters elegantly
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

    // Elegantly interpolate colors
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

  // Apply elegant bounce effect
  private applyElegantBounce(
    mat: ShaderUniforms,
    returnProgress: number
  ): void {
    // Calculate elegant bounce
    const bounceFactor =
      Math.sin(returnProgress * Math.PI * 2) *
      this.scrollConfig.returnBounce.strength *
      (1 - returnProgress);

    // Apply to shader elegantly
    mat.uFrequency += bounceFactor * 0.6;
    mat.uAmplitude += bounceFactor * 0.03;

    // Apply to mesh
    if (this.meshRef?.current) {
      const mesh = this.meshRef.current;
      const positionBounce = bounceFactor * 0.03;
      const scaleBounce = 1 + bounceFactor * 0.01;

      mesh.position.y += positionBounce;
      mesh.scale.set(
        this.initialScale * scaleBounce,
        this.initialScale * scaleBounce,
        this.initialScale * scaleBounce
      );
    }
  }

  // Handle elegant direction change
  private handleElegantDirectionChange(
    direction: "up" | "down",
    mat: ShaderUniforms
  ): void {
    // Subtle elegant transition
    const effect = {
      frequency: direction === "up" ? 0.15 : -0.15,
      amplitude: direction === "up" ? 0.008 : -0.008,
      rgbShift: direction === "up" ? 0.0008 : -0.0008,
    };

    // Apply with GSAP elegantly
    if (typeof window !== "undefined") {
      gsap.to(mat, {
        uFrequency: mat.uFrequency + effect.frequency * 0.1,
        uAmplitude: mat.uAmplitude + effect.amplitude * 0.1,
        duration: 0.3,
        ease: "power1.out",
        overwrite: true,
      });
    }
  }

  // Apply elegant shader effects
  private applyElegantShaderEffects(mat: any, progress: number): void {
    // Very subtle elegant ripple
    const ripple = Math.sin(progress * Math.PI * 2) * 0.03;
    mat.uFrequency += ripple;

    // Subtle elegant pulse
    const pulse = Math.sin(progress * Math.PI * 5) * 0.007;
    mat.uAmplitude += pulse;

    // Subtle elegant color variation
    const colorVar =
      Math.sin(progress * Math.PI * 3) * 0.004 +
      Math.cos(progress * Math.PI * 4) * 0.002;
    mat.uRGBShift += colorVar;
  }

  // Elegant linear interpolation
  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  // Clean up elegantly
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

export default new DarkEleganceController();
