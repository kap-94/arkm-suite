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
interface MidnightMatRef {
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

class MidnightController {
  private tl: gsap.core.Timeline | null = null;
  private shaderTl: gsap.core.Timeline | null = null;
  private meshTl: gsap.core.Timeline | null = null;
  private initialized = false;
  private meshRef: MeshRef | null = null;
  private matRef: MidnightMatRef | null = null;
  private scrollThrottle: NodeJS.Timeout | null = null;
  private initialScale: number = 1;
  private initialPosition = new THREE.Vector3();
  private initialShaderState: Record<string, any> = {};
  private lastScrollDirection: "up" | "down" = "down";
  private prevScrollProgress: number = 0;
  private selectedPalette: ColorPalette;
  private colorPaletteId: number = 0;

  // Dark midnight color palettes
  private readonly colorPalettes: ColorPalette[] = [
    {
      // Midnight Blue Palette
      name: "Midnight Blue",
      stages: [
        { primary: "#0A0A1A", secondary: "#14213D" }, // Origin
        { primary: "#0C0C24", secondary: "#1A2649" }, // Emergence
        { primary: "#0E102E", secondary: "#1F2D59" }, // Transformation
        { primary: "#10143C", secondary: "#26346C" }, // Disruption
        { primary: "#0C0C30", secondary: "#1E2254" }, // Harmony
        { primary: "#080821", secondary: "#121440" }, // Transcendence
      ],
    },
    {
      // Dark Galaxy Palette
      name: "Dark Galaxy",
      stages: [
        { primary: "#05050F", secondary: "#0B0B1B" }, // Origin
        { primary: "#060619", secondary: "#0D0D28" }, // Emergence
        { primary: "#080823", secondary: "#12123A" }, // Transformation
        { primary: "#0A0A2D", secondary: "#16164C" }, // Disruption
        { primary: "#070725", secondary: "#13133D" }, // Harmony
        { primary: "#040417", secondary: "#0C0C2A" }, // Transcendence
      ],
    },
  ];

  // Visual stages for transitions
  private readonly visualStages = [
    { position: 0.0, name: "Origin" },
    { position: 0.2, name: "Emergence" },
    { position: 0.4, name: "Transformation" },
    { position: 0.65, name: "Disruption" },
    { position: 0.85, name: "Harmony" },
    { position: 1.0, name: "Transcendence" },
  ];

  // Midnight shader stages with subtle variations
  private readonly shaderStages: ShaderStage[] = [
    {
      // Origin
      frequency: 1.6,
      amplitude: 0.1,
      rgbShift: 0.005,
      primaryColor: new THREE.Color("#0A0A1A"), // Deep midnight blue
      secondaryColor: new THREE.Color("#14213D"), // Dark navy blue
    },
    {
      // Emergence
      frequency: 1.8,
      amplitude: 0.12,
      rgbShift: 0.007,
      primaryColor: new THREE.Color("#0C0C24"), // Dark blue
      secondaryColor: new THREE.Color("#1A2649"), // Navy blue
    },
    {
      // Transformation
      frequency: 2.0,
      amplitude: 0.14,
      rgbShift: 0.008,
      primaryColor: new THREE.Color("#0E102E"), // Deep navy
      secondaryColor: new THREE.Color("#1F2D59"), // Royal blue
    },
    {
      // Disruption
      frequency: 2.3,
      amplitude: 0.16,
      rgbShift: 0.01,
      primaryColor: new THREE.Color("#10143C"), // Deepest blue
      secondaryColor: new THREE.Color("#26346C"), // Medium blue
    },
    {
      // Harmony
      frequency: 2.0,
      amplitude: 0.13,
      rgbShift: 0.008,
      primaryColor: new THREE.Color("#0C0C30"), // Deep midnight
      secondaryColor: new THREE.Color("#1E2254"), // Dark navy
    },
    {
      // Transcendence
      frequency: 1.7,
      amplitude: 0.11,
      rgbShift: 0.006,
      primaryColor: new THREE.Color("#080821"), // Midnight blue
      secondaryColor: new THREE.Color("#121440"), // Indigo blue
    },
  ];

  // Optimized scroll configuration
  private readonly scrollConfig = {
    // Moderate vertical offset
    totalVerticalOffset: 1.4,

    // Simple motion curves for performance
    motionCurves: [
      { start: 0.0, end: 0.2, ease: "power1.out" },
      { start: 0.2, end: 0.4, ease: "power1.inOut" },
      { start: 0.4, end: 0.65, ease: "power1.inOut" },
      { start: 0.65, end: 0.85, ease: "power1.out" },
      { start: 0.85, end: 1.0, ease: "power1.inOut" },
    ],

    // Subtle scale changes
    scale: {
      min: 0.85,
      max: 1.0,
      easeDown: 0.3,
      easeUp: 0.7,
    },

    // Minimal rotation
    rotation: {
      maxAngle: 0.1,
      frequency: 0.8,
    },

    // Subtle bounce
    returnBounce: {
      enabled: true,
      strength: 0.1,
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
  init(meshRef: MeshRef, matRef: MidnightMatRef): void {
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

  // Set up optimized scroll behavior
  private setupScrollTrigger(): void {
    // Main timeline for scroll
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.9, // Smooth scrub for performance
        onUpdate: (self) => {
          // Higher throttle for better performance
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
          }, 20); // Higher throttle interval
        },
      },
    });

    // Create specific timelines
    this.createShaderTimeline();
    this.createMeshMovementTimeline();
  }

  // Create optimized shader timeline
  private createShaderTimeline(): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    this.shaderTl = gsap.timeline({ paused: true });

    // Create transitions between stages
    for (let i = 0; i < this.visualStages.length - 1; i++) {
      const startStage = this.visualStages[i];
      const endStage = this.visualStages[i + 1];
      const duration = endStage.position - startStage.position;

      // Get shader configurations
      const startShader = this.shaderStages[i];
      const endShader = this.shaderStages[i + 1];

      // Get easing
      const customEase = this.scrollConfig.motionCurves[i].ease;

      // Create transition
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
              // Interpolate colors
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

  // Create optimized mesh movement timeline
  private createMeshMovementTimeline(): void {
    if (!this.meshRef?.current) return;

    this.meshTl = gsap.timeline({ paused: true });

    // Simple animation that updates mesh properties
    this.meshTl.to(
      {},
      {
        duration: 1,
        onUpdate: () => {
          if (!this.meshRef?.current) return;
          const mesh = this.meshRef.current;
          const progress = this.meshTl?.progress() || 0;

          // Apply optimized movements
          this.applyVerticalScrolling(mesh, progress);
          this.applyScaleChange(mesh, progress);
          this.applyMinimalRotation(mesh, progress);
        },
      }
    );
  }

  // Apply optimized vertical movement
  private applyVerticalScrolling(mesh: THREE.Mesh, progress: number): void {
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

    // Apply simple easing
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
      default:
        easedProgress = curveProgress;
    }

    // Calculate overall progress
    const overallProgress =
      currentCurve.start +
      easedProgress * (currentCurve.end - currentCurve.start);

    // Apply vertical offset
    const verticalOffset =
      this.initialPosition.y -
      overallProgress * this.scrollConfig.totalVerticalOffset;

    // Set position with subtle variations
    mesh.position.set(
      this.initialPosition.x + Math.sin(overallProgress * Math.PI) * 0.04,
      verticalOffset,
      this.initialPosition.z
    );
  }

  // Apply optimized scale changes
  private applyScaleChange(mesh: THREE.Mesh, progress: number): void {
    let scaleFactor: number;

    // Simple scale calculation for performance
    if (progress < this.scrollConfig.scale.easeDown) {
      scaleFactor = this.scrollConfig.scale.max;
    } else if (progress < this.scrollConfig.scale.easeUp) {
      const t =
        (progress - this.scrollConfig.scale.easeDown) /
        (this.scrollConfig.scale.easeUp - this.scrollConfig.scale.easeDown);
      scaleFactor =
        this.scrollConfig.scale.max -
        (this.scrollConfig.scale.max - this.scrollConfig.scale.min) * t;
    } else {
      scaleFactor = this.scrollConfig.scale.min;
    }

    // Apply scale
    const finalScale = this.initialScale * scaleFactor;
    mesh.scale.set(finalScale, finalScale, finalScale);
  }

  // Apply minimal rotation
  private applyMinimalRotation(mesh: THREE.Mesh, progress: number): void {
    // Single axis rotation for better performance
    const xRotation =
      Math.sin(progress * Math.PI * this.scrollConfig.rotation.frequency) *
      this.scrollConfig.rotation.maxAngle;

    mesh.rotation.set(xRotation, 0, 0);
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
      this.handleReturnToStart(progress, mat);
    } else {
      // Apply minimal shader effects
      this.applyMinimalShaderEffects(mat, progress);
    }

    // Handle direction change
    if (directionChanged) {
      this.handleDirectionChange(direction, mat);
    }
  }

  // Handle return to start
  private handleReturnToStart(progress: number, mat: ShaderUniforms): void {
    // Normalize progress
    const returnProgress = progress / 0.05;

    // Interpolate to initial state
    this.interpolateToInitialState(mat, 1 - returnProgress);

    // Apply minimal bounce effect
    if (this.scrollConfig.returnBounce.enabled && returnProgress < 0.2) {
      this.applyMinimalBounce(mat, returnProgress);
    }
  }

  // Interpolate to initial state
  private interpolateToInitialState(mat: ShaderUniforms, factor: number): void {
    // Interpolate numeric parameters
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

    // Interpolate colors
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

  // Apply minimal bounce effect
  private applyMinimalBounce(
    mat: ShaderUniforms,
    returnProgress: number
  ): void {
    // Calculate bounce
    const bounceFactor =
      Math.sin(returnProgress * Math.PI * 2) *
      this.scrollConfig.returnBounce.strength *
      (1 - returnProgress);

    // Apply to shader
    mat.uFrequency += bounceFactor * 0.8;
    mat.uAmplitude += bounceFactor * 0.03;

    // Apply to mesh
    if (this.meshRef?.current) {
      const mesh = this.meshRef.current;
      const positionBounce = bounceFactor * 0.04;
      const scaleBounce = 1 + bounceFactor * 0.02;

      mesh.position.y += positionBounce;
      mesh.scale.set(
        this.initialScale * scaleBounce,
        this.initialScale * scaleBounce,
        this.initialScale * scaleBounce
      );
    }
  }

  // Handle direction change
  private handleDirectionChange(
    direction: "up" | "down",
    mat: ShaderUniforms
  ): void {
    // Minimal direction change effect
    const effect = {
      frequency: direction === "up" ? 0.2 : -0.2,
      amplitude: direction === "up" ? 0.01 : -0.01,
      rgbShift: direction === "up" ? 0.001 : -0.001,
    };

    // Apply with GSAP
    if (typeof window !== "undefined") {
      gsap.to(mat, {
        uFrequency: mat.uFrequency + effect.frequency * 0.1,
        uAmplitude: mat.uAmplitude + effect.amplitude * 0.1,
        duration: 0.2,
        ease: "power1.out",
        overwrite: true,
      });
    }
  }

  // Apply minimal shader effects
  private applyMinimalShaderEffects(mat: any, progress: number): void {
    // Very subtle ripple
    const ripple = Math.sin(progress * Math.PI * 2) * 0.03;
    mat.uFrequency += ripple;

    // Subtle pulse
    const pulse = Math.sin(progress * Math.PI * 6) * 0.008;
    mat.uAmplitude += pulse;
  }

  // Linear interpolation
  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  // Clean up
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

export default new MidnightController();
