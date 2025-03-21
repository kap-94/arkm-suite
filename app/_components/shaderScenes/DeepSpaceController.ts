"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { MutableRefObject } from "react";

// Register GSAP plugin (client-side only)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Shader uniforms with indexing to allow dynamic access
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
  [key: string]: any; // Allows access with string index
}

// Material reference type
interface DeepSpaceMatRef {
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
  noiseScale: number;
  timeScale: number;
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
  private selectedPalette: ColorPalette;
  private colorPaletteId: number = 0;

  // Dark-themed color palettes
  private readonly colorPalettes: ColorPalette[] = [
    {
      // Deep Space Palette
      name: "Deep Space",
      stages: [
        { primary: "#0F172A", secondary: "#1E293B" }, // Origin
        { primary: "#0F1A2A", secondary: "#1E3A5F" }, // Emergence
        { primary: "#1A1F36", secondary: "#2A3F6A" }, // Transformation
        { primary: "#1F1D36", secondary: "#3F1D5F" }, // Disruption
        { primary: "#1E1E3F", secondary: "#2D2D4F" }, // Harmony
        { primary: "#0F1F3F", secondary: "#173F5F" }, // Transcendence
      ],
    },
    {
      // Dark Ocean Palette
      name: "Dark Ocean",
      stages: [
        { primary: "#0A192F", secondary: "#0F2942" }, // Origin
        { primary: "#0A2331", secondary: "#0D3B47" }, // Emergence
        { primary: "#0E2A3B", secondary: "#164454" }, // Transformation
        { primary: "#15303F", secondary: "#1D4356" }, // Disruption
        { primary: "#133B4F", secondary: "#1D4E5F" }, // Harmony
        { primary: "#0E2A3B", secondary: "#144359" }, // Transcendence
      ],
    },
  ];

  // Visual stages for scroll effects
  private readonly visualStages = [
    { position: 0.0, name: "Origin" },
    { position: 0.2, name: "Emergence" },
    { position: 0.4, name: "Transformation" },
    { position: 0.65, name: "Disruption" },
    { position: 0.85, name: "Harmony" },
    { position: 1.0, name: "Transcendence" },
  ];

  // Optimized shader stages with darker colors and reduced brightness
  private readonly shaderStages: ShaderStage[] = [
    {
      // Origin - Initial subtle state
      frequency: 2.0,
      amplitude: 0.12,
      rgbShift: 0.005,
      primaryColor: new THREE.Color("#0F172A"), // Dark blue
      secondaryColor: new THREE.Color("#1E293B"), // Darker slate
      noiseScale: 0.8,
      timeScale: 0.8,
    },
    {
      // Emergence - Subtly emerging from nothing
      frequency: 3.0,
      amplitude: 0.15,
      rgbShift: 0.01,
      primaryColor: new THREE.Color("#0F1A2A"), // Deep blue
      secondaryColor: new THREE.Color("#1E3A5F"), // Deep blue-purple
      noiseScale: 1.0,
      timeScale: 0.9,
    },
    {
      // Transformation - Subtle change
      frequency: 4.0,
      amplitude: 0.22,
      rgbShift: 0.02,
      primaryColor: new THREE.Color("#1A1F36"), // Navy blue
      secondaryColor: new THREE.Color("#2A3F6A"), // Deep indigo
      noiseScale: 1.2,
      timeScale: 1.0,
    },
    {
      // Disruption - Controlled chaos
      frequency: 5.5,
      amplitude: 0.3,
      rgbShift: 0.03,
      primaryColor: new THREE.Color("#1F1D36"), // Dark purple
      secondaryColor: new THREE.Color("#3F1D5F"), // Deep purple
      noiseScale: 1.5,
      timeScale: 1.2,
    },
    {
      // Harmony - Balance
      frequency: 3.5,
      amplitude: 0.2,
      rgbShift: 0.018,
      primaryColor: new THREE.Color("#1E1E3F"), // Deep indigo
      secondaryColor: new THREE.Color("#2D2D4F"), // Dark slate blue
      noiseScale: 1.2,
      timeScale: 1.0,
    },
    {
      // Transcendence - Final elevated state
      frequency: 2.5,
      amplitude: 0.15,
      rgbShift: 0.012,
      primaryColor: new THREE.Color("#0F1F3F"), // Navy blue
      secondaryColor: new THREE.Color("#173F5F"), // Dark teal
      noiseScale: 1.0,
      timeScale: 0.9,
    },
  ];

  // Scroll configuration optimized for performance and smoother transitions
  private readonly scrollConfig = {
    // Total vertical offset for scrolling
    totalVerticalOffset: 1.5, // Reduced offset for less extreme movement

    // Motion curves optimized by stage
    motionCurves: [
      { start: 0.0, end: 0.2, ease: "power1.out" }, // Smooth start
      { start: 0.2, end: 0.4, ease: "power1.inOut" }, // Smooth transition
      { start: 0.4, end: 0.65, ease: "power2.inOut" }, // Moderate acceleration
      { start: 0.65, end: 0.85, ease: "power2.out" }, // Smooth deceleration
      { start: 0.85, end: 1.0, ease: "sine.inOut" }, // Smooth finish
    ],

    // Scale parameters during scroll
    scale: {
      min: 0.8, // Min scale
      max: 1.0, // Max scale (initial)
      easeDown: 0.3, // Point where scale starts decreasing
      easeUp: 0.7, // Point where scale starts increasing
    },

    // Subtle rotation during scroll
    rotation: {
      maxAngle: 0.15, // Max rotation angle (radians) - reduced
      frequency: 1.2, // Oscillation frequency - reduced
    },

    // Bounce when returning to initial position
    returnBounce: {
      enabled: true, // Enable bounce effect
      strength: 0.2, // Bounce strength (0-1) - reduced
      duration: 0.4, // Bounce duration in seconds - reduced
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
  init(meshRef: MeshRef, matRef: DeepSpaceMatRef): void {
    if (this.initialized || typeof window === "undefined") return;
    this.meshRef = meshRef;
    this.matRef = matRef;
    this.initialized = true;

    // Store initial scale and position
    if (meshRef.current) {
      this.initialScale = meshRef.current.scale.x;
      this.initialPosition.copy(meshRef.current.position);
    }

    // Store initial shader state for restoration
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

  // Set up scroll trigger for animations
  private setupScrollTrigger(): void {
    // Main timeline for scroll
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.0, // Slightly smoother scrub
        onUpdate: (self) => {
          // Throttle updates for better performance
          if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
          this.scrollThrottle = setTimeout(() => {
            // Detect scroll direction
            const newDirection =
              self.progress > this.prevScrollProgress ? "down" : "up";
            const directionChanged = newDirection !== this.lastScrollDirection;

            this.lastScrollDirection = newDirection;
            this.prevScrollProgress = self.progress;

            this.onScroll(self.progress, newDirection, directionChanged);

            // Update timeline positions
            if (this.shaderTl) {
              this.shaderTl.progress(self.progress);
            }
            if (this.meshTl) {
              this.meshTl.progress(self.progress);
            }
          }, 16); // ~60fps throttle for better performance
        },
      },
    });

    // Create specific timelines
    this.createShaderTimeline();
    this.createMeshMovementTimeline();
  }

  // Create timeline for shader transformations
  private createShaderTimeline(): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    this.shaderTl = gsap.timeline({ paused: true });

    // Create transitions between each visual stage
    for (let i = 0; i < this.visualStages.length - 1; i++) {
      const startStage = this.visualStages[i];
      const endStage = this.visualStages[i + 1];
      const duration = endStage.position - startStage.position;

      // Shader configurations for this transition
      const startShader = this.shaderStages[i];
      const endShader = this.shaderStages[i + 1];

      // Create transition with specific easing
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

  // Create timeline for mesh movement
  private createMeshMovementTimeline(): void {
    if (!this.meshRef?.current) return;

    this.meshTl = gsap.timeline({ paused: true });

    // Smooth vertical movement of the mesh with optimized easing
    this.meshTl.to(
      {},
      {
        duration: 1, // Complete timeline
        onUpdate: () => {
          if (!this.meshRef?.current) return;
          const mesh = this.meshRef.current;
          const progress = this.meshTl?.progress() || 0;

          // Apply custom vertical scrolling
          this.applyCustomVerticalScrolling(mesh, progress);

          // Apply subtle scale variation
          this.applySubtleScaleVariation(mesh, progress);

          // Apply subtle rotation
          this.applySubtleRotation(mesh, progress);
        },
      }
    );
  }

  // Apply custom vertical scrolling with easing curves
  private applyCustomVerticalScrolling(
    mesh: THREE.Mesh,
    progress: number
  ): void {
    // Determine which motion stage we're in
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

    // Calculate normalized progress within current curve
    const curveProgress =
      (progress - currentCurve.start) / (currentCurve.end - currentCurve.start);

    // Apply easing to this segment of movement
    let easedProgress: number;

    // Apply different easing curves based on stage
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
      case "sine.inOut":
        easedProgress = -(Math.cos(Math.PI * curveProgress) - 1) / 2;
        break;
      default:
        easedProgress = curveProgress;
    }

    // Calculate overall movement progress (0-1)
    const overallProgress =
      currentCurve.start +
      easedProgress * (currentCurve.end - currentCurve.start);

    // Apply vertical offset with smooth easing
    const verticalOffset =
      this.initialPosition.y -
      overallProgress * this.scrollConfig.totalVerticalOffset;

    // Apply subtle micro-variations for natural feel
    const microVariation = Math.sin(overallProgress * Math.PI * 6) * 0.015;

    // Set position with subtle horizontal drift
    mesh.position.set(
      this.initialPosition.x + Math.sin(overallProgress * Math.PI) * 0.08,
      verticalOffset + microVariation,
      this.initialPosition.z
    );
  }

  // Apply subtle scale variations during scroll
  private applySubtleScaleVariation(mesh: THREE.Mesh, progress: number): void {
    let scaleFactor: number;

    // Gradually decrease size then slightly increase at the end
    if (progress < this.scrollConfig.scale.easeDown) {
      // Maintain initial scale at beginning
      scaleFactor = this.scrollConfig.scale.max;
    } else if (progress < this.scrollConfig.scale.easeUp) {
      // Gradually reduce scale in middle section
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
      // Increase slightly at end for reveal sensation
      const scaleProgress =
        (progress - this.scrollConfig.scale.easeUp) /
        (1 - this.scrollConfig.scale.easeUp);

      const endScale =
        this.scrollConfig.scale.min +
        (this.scrollConfig.scale.max - this.scrollConfig.scale.min) * 0.25;

      scaleFactor =
        this.scrollConfig.scale.min +
        (endScale - this.scrollConfig.scale.min) *
          (1 - Math.pow(1 - scaleProgress, 2));
    }

    // Add subtle "breathing" to scale
    const breathingEffect = Math.sin(progress * Math.PI * 4) * 0.02;
    scaleFactor += breathingEffect;

    // Apply scale
    const finalScale = this.initialScale * scaleFactor;
    mesh.scale.set(finalScale, finalScale, finalScale);
  }

  // Apply subtle rotation during scroll
  private applySubtleRotation(mesh: THREE.Mesh, progress: number): void {
    // Smooth Z rotation with sinusoidal pattern
    const zRotation =
      Math.sin(progress * Math.PI * this.scrollConfig.rotation.frequency) *
      this.scrollConfig.rotation.maxAngle *
      0.4;

    // Smooth X rotation with cosine pattern
    const xRotation =
      Math.cos(
        progress * Math.PI * this.scrollConfig.rotation.frequency * 0.6
      ) *
      this.scrollConfig.rotation.maxAngle *
      0.25;

    // Smooth Y rotation with custom pattern
    const yRotation =
      Math.sin(
        progress * Math.PI * this.scrollConfig.rotation.frequency * 1.2
      ) *
      this.scrollConfig.rotation.maxAngle *
      0.3;

    // Apply subtle rotations
    mesh.rotation.set(xRotation, yRotation, zRotation);
  }

  // Handle scroll events
  private onScroll(
    progress: number,
    direction: "up" | "down",
    directionChanged: boolean
  ): void {
    if (!this.matRef?.current) return;
    const mat = this.matRef.current;

    // Update scroll progress uniform
    mat.uScrollProgress = progress;

    // If returning to start (scroll up)
    if (direction === "up" && progress < 0.05) {
      this.handleReturnToStart(progress, mat);
    } else {
      // Normal behavior - apply effects based on progress
      this.applyShaderEffects(mat, progress);
    }

    // If scroll direction changed, apply transition effects
    if (directionChanged) {
      this.handleScrollDirectionChange(direction, progress, mat);
    }
  }

  // Handle smooth return to initial position
  private handleReturnToStart(progress: number, mat: ShaderUniforms): void {
    // Determine how close we are to start (0-1, where 0 is start)
    const returnProgress = progress / 0.05; // Normalize to 0-1 in first 5% of scroll

    // Apply smooth interpolation between current and initial state
    this.interpolateToInitialState(mat, 1 - returnProgress);

    // If bounce effect enabled and we're very close to start
    if (this.scrollConfig.returnBounce.enabled && returnProgress < 0.2) {
      this.applyReturnBounceEffect(mat, returnProgress);
    }
  }

  // Smoothly interpolate to initial shader state
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

  // Apply bounce effect when returning to start
  private applyReturnBounceEffect(
    mat: ShaderUniforms,
    returnProgress: number
  ): void {
    // Calculate bounce factor
    const bounceFactor =
      Math.sin(returnProgress * Math.PI * 2) *
      this.scrollConfig.returnBounce.strength *
      (1 - returnProgress);

    // Apply bounce effect to shader parameters
    mat.uFrequency += bounceFactor * 1.5;
    mat.uAmplitude += bounceFactor * 0.08;

    // If mesh exists, apply slight physical bounce
    if (this.meshRef?.current) {
      const mesh = this.meshRef.current;
      const positionBounce = bounceFactor * 0.08;
      const scaleBounce = 1 + bounceFactor * 0.04;

      // Add bounce offset to position
      mesh.position.y += positionBounce;

      // Slight scale pulse for bounce effect
      mesh.scale.set(
        this.initialScale * scaleBounce,
        this.initialScale * scaleBounce,
        this.initialScale * scaleBounce
      );
    }
  }

  // Handle changes in scroll direction
  private handleScrollDirectionChange(
    direction: "up" | "down",
    progress: number,
    mat: ShaderUniforms
  ): void {
    // Subtle transition effect when changing direction
    const transitionEffect = {
      frequency: direction === "up" ? 0.6 : -0.6,
      amplitude: direction === "up" ? 0.05 : -0.05,
      rgbShift: direction === "up" ? 0.005 : -0.005,
    };

    // GSAP for smooth transition animation
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

  // Apply advanced shader effects based on scroll progress
  private applyShaderEffects(mat: any, progress: number): void {
    // Determine current visual stage and next
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

    // Get current and next stage info
    const currentStage = this.visualStages[currentStageIndex];
    const nextStage = this.visualStages[currentStageIndex + 1];

    // Calculate normalized progress within current stage
    const stageProgress =
      (progress - currentStage.position) /
      (nextStage.position - currentStage.position);

    // Apply universal effects with reduced intensity
    this.applyUniversalEffects(mat, progress);
  }

  // Universal effects applied at all stages
  private applyUniversalEffects(mat: any, progress: number): void {
    // Persistent ripple that varies with scroll
    const persistentRipple =
      (Math.sin(progress * Math.PI * 2.5) * 0.2 +
        Math.cos(progress * Math.PI * 4) * 0.15) *
      0.08;
    mat.uFrequency += persistentRipple;

    // Subtle continuous pulse
    const subtlePulse = Math.sin(progress * Math.PI * 12) * 0.025;
    mat.uAmplitude += subtlePulse;

    // Evolving fractal pattern with reduced intensity
    let fractalPattern = 0;
    for (let i = 1; i <= 3; i++) {
      // Reduced iterations for performance
      fractalPattern += Math.sin(progress * Math.PI * i * 0.4) * (1 / i);
    }
    fractalPattern *= 0.08;

    // Apply fractal pattern to various parameters
    mat.uFrequency += fractalPattern;
    mat.uAmplitude += fractalPattern * 0.15;
    mat.uRGBShift += Math.abs(fractalPattern) * 0.008;
  }

  // Linear interpolation utility
  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  // Clean up resources
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
