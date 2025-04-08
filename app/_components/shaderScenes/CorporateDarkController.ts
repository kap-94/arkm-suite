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
interface CorporateMatRef {
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

class CorporateDarkController {
  private tl: gsap.core.Timeline | null = null;
  private shaderTl: gsap.core.Timeline | null = null;
  private meshTl: gsap.core.Timeline | null = null;
  private initialized = false;
  private meshRef: MeshRef | null = null;
  private matRef: CorporateMatRef | null = null;
  private scrollThrottle: NodeJS.Timeout | null = null;
  private initialScale: number = 1;
  private initialPosition = new THREE.Vector3();
  private initialShaderState: Record<string, any> = {};
  private lastScrollDirection: "up" | "down" = "down";
  private prevScrollProgress: number = 0;
  private selectedPalette: ColorPalette;
  private colorPaletteId: number = 0;

  // Professional dark color palettes
  private readonly colorPalettes: ColorPalette[] = [
    {
      // Corporate Dark Palette
      name: "Corporate Dark",
      stages: [
        { primary: "#1A202C", secondary: "#2D3748" }, // Origin - Dark slate grays
        { primary: "#1E293B", secondary: "#334155" }, // Emergence - Slate blue
        { primary: "#1F2937", secondary: "#374151" }, // Transformation - Gray blue
        { primary: "#111827", secondary: "#4B5563" }, // Disruption - Dark indigo gray
        { primary: "#18181B", secondary: "#27272A" }, // Harmony - Dark zinc
        { primary: "#0F172A", secondary: "#1E293B" }, // Transcendence - Dark blue
      ],
    },
    {
      // Dark Elegance Palette
      name: "Dark Elegance",
      stages: [
        { primary: "#121212", secondary: "#1E1E1E" }, // Origin - Nearly black
        { primary: "#1A1A1A", secondary: "#282828" }, // Emergence - Dark grays
        { primary: "#232323", secondary: "#2E2E2E" }, // Transformation - Charcoal
        { primary: "#262626", secondary: "#333333" }, // Disruption - Dark charcoal
        { primary: "#1E1E1E", secondary: "#2A2A2A" }, // Harmony - Return to darker
        { primary: "#141414", secondary: "#212121" }, // Transcendence - Almost black
      ],
    },
  ];

  // Visual stages for professional transitions
  private readonly visualStages = [
    { position: 0.0, name: "Origin" },
    { position: 0.2, name: "Emergence" },
    { position: 0.4, name: "Transformation" },
    { position: 0.65, name: "Disruption" },
    { position: 0.85, name: "Harmony" },
    { position: 1.0, name: "Transcendence" },
  ];

  // Professional shader stages with subtle variations
  private readonly shaderStages: ShaderStage[] = [
    {
      // Origin - Initial professional state
      frequency: 1.8,
      amplitude: 0.12,
      rgbShift: 0.006,
      primaryColor: new THREE.Color("#1A202C"), // Dark slate
      secondaryColor: new THREE.Color("#2D3748"), // Dark gray blue
    },
    {
      // Emergence - Subtle professional emergence
      frequency: 2.2,
      amplitude: 0.14,
      rgbShift: 0.008,
      primaryColor: new THREE.Color("#1E293B"), // Slate blue
      secondaryColor: new THREE.Color("#334155"), // Light slate blue
    },
    {
      // Transformation - Professional transformation
      frequency: 2.6,
      amplitude: 0.16,
      rgbShift: 0.01,
      primaryColor: new THREE.Color("#1F2937"), // Gray blue
      secondaryColor: new THREE.Color("#374151"), // Light gray blue
    },
    {
      // Disruption - Professional intensity
      frequency: 3.0,
      amplitude: 0.18,
      rgbShift: 0.012,
      primaryColor: new THREE.Color("#111827"), // Dark indigo
      secondaryColor: new THREE.Color("#4B5563"), // Medium gray
    },
    {
      // Harmony - Professional balance
      frequency: 2.4,
      amplitude: 0.15,
      rgbShift: 0.009,
      primaryColor: new THREE.Color("#18181B"), // Dark zinc
      secondaryColor: new THREE.Color("#27272A"), // Medium zinc
    },
    {
      // Transcendence - Professional resolution
      frequency: 2.0,
      amplitude: 0.13,
      rgbShift: 0.007,
      primaryColor: new THREE.Color("#0F172A"), // Dark blue
      secondaryColor: new THREE.Color("#1E293B"), // Slate blue
    },
  ];

  // Professional scroll configuration
  private readonly scrollConfig = {
    // Professional vertical movement
    totalVerticalOffset: 1.3,

    // Professional motion curves
    motionCurves: [
      { start: 0.0, end: 0.2, ease: "power1.out" },
      { start: 0.2, end: 0.4, ease: "power1.inOut" },
      { start: 0.4, end: 0.65, ease: "power2.inOut" },
      { start: 0.65, end: 0.85, ease: "power2.out" },
      { start: 0.85, end: 1.0, ease: "power1.inOut" },
    ],

    // Professional scale changes
    scale: {
      min: 0.88, // Less extreme minimum for professionalism
      max: 1.0,
      easeDown: 0.3,
      easeUp: 0.7,
    },

    // Subtle professional rotation
    rotation: {
      maxAngle: 0.12, // Very subtle rotation
      frequency: 1.0,
    },

    // Professional bounce effect
    returnBounce: {
      enabled: true,
      strength: 0.12, // Very subtle bounce
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
  init(meshRef: MeshRef, matRef: CorporateMatRef): void {
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

  // Set up professional scroll behavior
  private setupScrollTrigger(): void {
    // Main timeline for scroll
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.9, // Professional smooth scrub
        onUpdate: (self) => {
          // Performance throttle
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

  // Create professional shader timeline
  private createShaderTimeline(): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    this.shaderTl = gsap.timeline({ paused: true });

    // Create professional transitions between stages
    for (let i = 0; i < this.visualStages.length - 1; i++) {
      const startStage = this.visualStages[i];
      const endStage = this.visualStages[i + 1];
      const duration = endStage.position - startStage.position;

      // Get shader configurations
      const startShader = this.shaderStages[i];
      const endShader = this.shaderStages[i + 1];

      // Get easing
      const customEase = this.scrollConfig.motionCurves[i].ease;

      // Create professional transition
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
              // Interpolate colors professionally
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

  // Create professional mesh movement timeline
  private createMeshMovementTimeline(): void {
    if (!this.meshRef?.current) return;

    this.meshTl = gsap.timeline({ paused: true });

    // Professional animation
    this.meshTl.to(
      {},
      {
        duration: 1,
        onUpdate: () => {
          if (!this.meshRef?.current) return;
          const mesh = this.meshRef.current;
          const progress = this.meshTl?.progress() || 0;

          // Apply professional movements
          this.applyProfessionalVerticalMovement(mesh, progress);
          this.applyProfessionalScaleChange(mesh, progress);
          this.applyProfessionalRotation(mesh, progress);
        },
      }
    );
  }

  // Apply professional vertical movement
  private applyProfessionalVerticalMovement(
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

    // Apply professional easing
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

    // Apply professional vertical offset
    const verticalOffset =
      this.initialPosition.y -
      overallProgress * this.scrollConfig.totalVerticalOffset;

    // Apply very subtle professional variation
    const microVariation = Math.sin(overallProgress * Math.PI * 5) * 0.01;

    // Set position with professional feel
    mesh.position.set(
      this.initialPosition.x + Math.sin(overallProgress * Math.PI) * 0.04,
      verticalOffset + microVariation,
      this.initialPosition.z
    );
  }

  // Apply professional scale changes
  private applyProfessionalScaleChange(
    mesh: THREE.Mesh,
    progress: number
  ): void {
    let scaleFactor: number;

    // Professional scale calculation
    if (progress < this.scrollConfig.scale.easeDown) {
      scaleFactor = this.scrollConfig.scale.max;
    } else if (progress < this.scrollConfig.scale.easeUp) {
      const t =
        (progress - this.scrollConfig.scale.easeDown) /
        (this.scrollConfig.scale.easeUp - this.scrollConfig.scale.easeDown);

      // Smooth professional easing
      const easeInOut = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      scaleFactor =
        this.scrollConfig.scale.max -
        (this.scrollConfig.scale.max - this.scrollConfig.scale.min) * easeInOut;
    } else {
      // Subtle increase at end for professional reveal
      const t =
        (progress - this.scrollConfig.scale.easeUp) /
        (1 - this.scrollConfig.scale.easeUp);

      scaleFactor =
        this.scrollConfig.scale.min + this.scrollConfig.scale.min * 0.05 * t;
    }

    // Apply very subtle breathing effect for professional feel
    const breathingEffect = Math.sin(progress * Math.PI * 3) * 0.01;
    scaleFactor += breathingEffect;

    // Apply scale
    const finalScale = this.initialScale * scaleFactor;
    mesh.scale.set(finalScale, finalScale, finalScale);
  }

  // Apply professional rotation
  private applyProfessionalRotation(mesh: THREE.Mesh, progress: number): void {
    // Professional subtle rotation
    const xRotation =
      Math.sin(progress * Math.PI * this.scrollConfig.rotation.frequency) *
      this.scrollConfig.rotation.maxAngle *
      0.6;

    const yRotation =
      Math.cos(
        progress * Math.PI * this.scrollConfig.rotation.frequency * 0.7
      ) *
      this.scrollConfig.rotation.maxAngle *
      0.4;

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
      this.handleReturnToStart(progress, mat);
    } else {
      // Apply professional shader effects
      this.applyProfessionalShaderEffects(mat, progress);
    }

    // Handle direction change professionally
    if (directionChanged) {
      this.handleProfessionalDirectionChange(direction, mat);
    }
  }

  // Handle professional return to start
  private handleReturnToStart(progress: number, mat: ShaderUniforms): void {
    // Normalize progress
    const returnProgress = progress / 0.05;

    // Professional interpolation to initial state
    this.interpolateToInitialState(mat, 1 - returnProgress);

    // Apply professional bounce effect
    if (this.scrollConfig.returnBounce.enabled && returnProgress < 0.2) {
      this.applyProfessionalBounce(mat, returnProgress);
    }
  }

  // Professional interpolation to initial state
  private interpolateToInitialState(mat: ShaderUniforms, factor: number): void {
    // Interpolate numeric parameters smoothly
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

    // Professionally interpolate colors
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

  // Apply professional bounce effect
  private applyProfessionalBounce(
    mat: ShaderUniforms,
    returnProgress: number
  ): void {
    // Calculate professional bounce
    const bounceFactor =
      Math.sin(returnProgress * Math.PI * 2) *
      this.scrollConfig.returnBounce.strength *
      (1 - returnProgress);

    // Apply to shader subtly
    mat.uFrequency += bounceFactor * 0.8;
    mat.uAmplitude += bounceFactor * 0.04;

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

  // Handle professional direction change
  private handleProfessionalDirectionChange(
    direction: "up" | "down",
    mat: ShaderUniforms
  ): void {
    // Subtle professional transition
    const effect = {
      frequency: direction === "up" ? 0.2 : -0.2,
      amplitude: direction === "up" ? 0.01 : -0.01,
      rgbShift: direction === "up" ? 0.001 : -0.001,
    };

    // Apply with GSAP professionally
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

  // Apply professional shader effects
  private applyProfessionalShaderEffects(mat: any, progress: number): void {
    // Very subtle professional ripple
    const ripple = Math.sin(progress * Math.PI * 2) * 0.04;
    mat.uFrequency += ripple;

    // Subtle professional pulse
    const pulse = Math.sin(progress * Math.PI * 6) * 0.01;
    mat.uAmplitude += pulse;

    // Subtle professional noise variation
    const noiseVar =
      Math.sin(progress * Math.PI * 3) * 0.005 +
      Math.cos(progress * Math.PI * 5) * 0.003;
    mat.uRGBShift += noiseVar;
  }

  // Professional linear interpolation
  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  // Clean up professionally
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

export default new CorporateDarkController();
