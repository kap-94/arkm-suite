"use client";

// ScrollAnimationController.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MutableRefObject } from "react";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MaterialRef {
  current:
    | (THREE.ShaderMaterial & {
        uTime: number;
        uFrequency: number;
        uAmplitude: number;
        uFluidFactor: number; // NUEVO uniform
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

class ScrollAnimationController {
  private timeline: gsap.core.Timeline | null = null;
  private initialized = false;
  private sceneRef: MeshRef | null = null;
  private materialRef: MaterialRef | null = null;
  private throttleTimeout: NodeJS.Timeout | null = null;

  init(sceneRef: MeshRef, materialRef: MaterialRef) {
    if (this.initialized || typeof window === "undefined") return;
    this.sceneRef = sceneRef;
    this.materialRef = materialRef;
    this.initialized = true;

    this.setupScrollTrigger();
  }

  private setupScrollTrigger() {
    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        // Podemos usar un "ease" en los keyframes
        // Para un scroll "fluid" => la interpolación se notará suave
        onUpdate: (self) => {
          if (this.throttleTimeout) clearTimeout(this.throttleTimeout);
          this.throttleTimeout = setTimeout(() => {
            this.onScroll(self.progress);
          }, 16); // ~60fps => mas "fluid"
        },
      },
    });

    // Keyframes "fluids" con ease
    // 0% => amplitude=0.2, fluidFactor=0.0
    this.timeline?.set(this, { currentState: "intro" }, 0);

    this.timeline?.to(
      this.materialRef?.current || {},
      {
        uAmplitude: 0.2,
        uFluidFactor: 0.0,
        ease: "power2.inOut",
        duration: 0.1,
      },
      0
    );

    // 20% => amplitude=0.4, fluidFactor=0.3
    this.timeline?.to(
      this.materialRef?.current || {},
      {
        uAmplitude: 0.4,
        uFluidFactor: 0.3,
        ease: "power2.inOut",
        duration: 0.3,
      },
      0.2
    );

    // 50% => amplitude=0.7, fluidFactor=0.7
    this.timeline?.to(
      this.materialRef?.current || {},
      {
        uAmplitude: 0.7,
        uFluidFactor: 0.7,
        ease: "power2.inOut",
        duration: 0.3,
      },
      0.5
    );

    // 80% => amplitude=1.0, fluidFactor=1.0
    this.timeline?.to(
      this.materialRef?.current || {},
      {
        uAmplitude: 1.0,
        uFluidFactor: 1.0,
        ease: "power2.inOut",
        duration: 0.3,
      },
      0.8
    );
  }

  private onScroll(progress: number) {
    if (!this.materialRef?.current) return;

    // Actualizar uniform de scroll
    this.materialRef.current.uScrollProgress = progress;

    // Rotación y posición del mesh (opcional):
    if (this.sceneRef?.current) {
      // Mover algo en Y en función del scroll
      const baseY = this.sceneRef.current.userData.initialY || 0;
      this.sceneRef.current.position.y =
        baseY + Math.sin(progress * 3.14) * 0.3;

      // Rotar en z un poco
      this.sceneRef.current.rotation.z = progress * 3.14 * 0.2;
    }
  }

  destroy() {
    if (this.timeline) this.timeline.kill();
    if (this.throttleTimeout) clearTimeout(this.throttleTimeout);
    if (typeof window !== "undefined" && ScrollTrigger) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    }
    this.initialized = false;
    this.sceneRef = null;
    this.materialRef = null;
  }
}

export default new ScrollAnimationController();
