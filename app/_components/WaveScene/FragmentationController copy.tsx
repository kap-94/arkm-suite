"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { MutableRefObject } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FragmentMatRef {
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
        uFragmentIntensity: number;
      })
    | null;
}

type MeshRef = MutableRefObject<THREE.Mesh | null>;

class FragmentationControllerClass {
  private tl: gsap.core.Timeline | null = null;
  private initialized = false;
  private matRef: FragmentMatRef | null = null;
  private meshRef: MeshRef | null = null;
  private throttleTimeout: NodeJS.Timeout | null = null;

  init(meshRef: MeshRef, matRef: FragmentMatRef) {
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
        scrub: 0.5,
        onUpdate: (self) => {
          if (this.throttleTimeout) clearTimeout(this.throttleTimeout);
          this.throttleTimeout = setTimeout(() => {
            this.onScroll(self.progress);
          }, 30);
        },
      },
    });

    // 0% => fragmentIntensity=0
    this.tl?.set(
      this.matRef?.current || {},
      { uFragmentIntensity: 0, uAmplitude: 0.2 },
      0
    );

    // ~25% => sube fragment + amplitude
    this.tl?.to(
      this.meshRef?.current?.position || { x: 0, y: 0, z: 0 },
      {
        x: -0.5,
        duration: 0.3,
        onUpdate: () => {
          if (this.matRef?.current) {
            this.matRef.current.uFragmentIntensity = 0.4;
            this.matRef.current.uAmplitude = 0.3;
          }
        },
      },
      0.25
    );

    // ~50% => se fragmenta mucho
    this.tl?.to(
      this.meshRef?.current?.scale || { x: 1, y: 1, z: 1 },
      {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3,
        onUpdate: () => {
          if (this.matRef?.current) {
            this.matRef.current.uFragmentIntensity = 1.0;
            this.matRef.current.uAmplitude = 0.5;
          }
        },
      },
      0.5
    );

    // ~80% => reduce fragment, baja amplitude
    this.tl?.to(
      this.meshRef?.current?.position || { x: 0, y: 0, z: 0 },
      {
        x: 0.5,
        y: 0.5,
        duration: 0.3,
        onUpdate: () => {
          if (this.matRef?.current) {
            this.matRef.current.uFragmentIntensity = 0.2;
            this.matRef.current.uAmplitude = 0.2;
          }
        },
      },
      0.8
    );
  }

  private onScroll(progress: number) {
    if (!this.matRef?.current) return;
    this.matRef.current.uScrollProgress = progress;
  }

  destroy() {
    if (this.tl) this.tl.kill();
    if (this.throttleTimeout) clearTimeout(this.throttleTimeout);
    if (typeof window !== "undefined" && ScrollTrigger) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    }
    this.initialized = false;
    this.meshRef = null;
    this.matRef = null;
  }
}

export default new FragmentationControllerClass();
