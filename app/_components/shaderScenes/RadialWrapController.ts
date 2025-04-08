"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MutableRefObject } from "react";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RadialWarpMaterialRef {
  current:
    | (THREE.ShaderMaterial & {
        uTime: number;
        uFrequency: number;
        uAmplitude: number;
        uRadialIntensity: number;
        uColor: THREE.Color;
        uSecondaryColor: THREE.Color;
        uTexture: THREE.Texture;
        uRGBShift: number;
        uMouse: THREE.Vector2;
        uScrollProgress: number;
      })
    | null;
}

type MeshRef = MutableRefObject<THREE.Mesh | null>;

class RadialWarpControllerClass {
  private tl: gsap.core.Timeline | null = null;
  private initialized = false;
  private meshRef: MeshRef | null = null;
  private matRef: RadialWarpMaterialRef | null = null;
  private scrollThrottle: NodeJS.Timeout | null = null;

  init(meshRef: MeshRef, matRef: RadialWarpMaterialRef) {
    if (this.initialized || typeof window === "undefined") return;
    this.meshRef = meshRef;
    this.matRef = matRef;
    this.initialized = true;

    this.setupScroll();
  }

  private setupScroll() {
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
          this.scrollThrottle = setTimeout(() => {
            this.onScroll(self.progress);
          }, 30);
        },
      },
    });

    // Keyframes creativos:
    // 0% => RadialIntensity=0.1, mesh más pequeño
    this.tl?.fromTo(
      this.meshRef?.current?.scale || { x: 1, y: 1, z: 1 },
      { x: 0.3, y: 0.3, z: 0.3 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        onUpdate: () => {
          if (this.matRef?.current) {
            this.matRef.current.uRadialIntensity = 0.1;
            this.matRef.current.uAmplitude = 0.1;
          }
        },
      },
      0
    );

    // ~30% => aumenta RadialIntensity, sube amplitude
    this.tl?.to(
      this.meshRef?.current?.position || { y: 0 },
      {
        y: 0.5,
        duration: 0.3,
        onUpdate: () => {
          if (this.matRef?.current) {
            this.matRef.current.uRadialIntensity = 0.6;
            this.matRef.current.uAmplitude = 0.3;
          }
        },
      },
      0.3
    );

    // ~60% => RadialIntensity=1.0, amplitude=0.6
    this.tl?.to(
      this.meshRef?.current?.position || { y: 0 },
      {
        y: -0.5,
        duration: 0.3,
        onUpdate: () => {
          if (this.matRef?.current) {
            this.matRef.current.uRadialIntensity = 1.0;
            this.matRef.current.uAmplitude = 0.6;
          }
        },
      },
      0.6
    );

    // ~90% => reduce un poco la intensidad
    this.tl?.to(
      this.meshRef?.current?.scale || { x: 1, y: 1, z: 1 },
      {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3,
        onUpdate: () => {
          if (this.matRef?.current) {
            this.matRef.current.uRadialIntensity = 0.5;
            this.matRef.current.uAmplitude = 0.2;
          }
        },
      },
      0.9
    );
  }

  private onScroll(progress: number) {
    if (!this.matRef?.current) return;
    this.matRef.current.uScrollProgress = progress;
  }

  destroy() {
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

// Exportar instancia
export default new RadialWarpControllerClass();
