"use client";

import * as THREE from "three";
import React, {
  useRef,
  useMemo,
  Suspense,
  useEffect,
  useState,
  ReactNode,
  memo,
} from "react";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
  ReactThreeFiber,
} from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import classNames from "classnames/bind";
import styles from "./DeepSpace.module.scss";

// Registrar GSAP plugin (solo en cliente)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cx = classNames.bind(styles);

// Paleta de colores profesional
const COLORS = {
  primary: "#111827", // Azul muy oscuro
  secondary: "#1F2937", // Gris azulado oscuro
  accent: "#3B82F6", // Azul para acentos sutiles
};

// VERTEX SHADER PROFESIONAL Y SUTIL
const vertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  uniform float uDistortionFrequency;
  uniform float uDistortionStrength;
  uniform float uDepthOffset;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // Función de ruido sutil optimizada
  float noise(vec2 p) {
    return sin(p.x * 0.5 + p.y * 0.5 + uTime * 0.5) * 
           cos(p.x * 0.4 + p.y * 0.3 + uTime * 0.3) * 0.1;
  }

  void main() {
    vUv = uv;
    
    // Posición base
    vec3 pos = position;
    
    // Distorsión sutil basada en ruido
    float distortion = noise(pos.xy * uDistortionFrequency) * uDistortionStrength;
    
    // Reducir distorsión gradualmente con scroll
    distortion *= (1.0 - uScrollProgress * 0.8);
    
    // Aplicar distorsión sutil
    pos.z += distortion;
    
    // Descenso suave con aceleración controlada
    float descent = pow(uScrollProgress, 1.2) * 1.5;
    
    // Aplicar descenso y ligero desplazamiento en profundidad
    pos.y -= descent;
    pos.z += uScrollProgress * uDepthOffset;
    
    // Ligera inclinación basada en scroll
    float tiltAngle = uScrollProgress * 0.15;
    pos.z -= sin(tiltAngle) * 0.1;
    
    // Variables para fragment shader
    vElevation = distortion;
    vDistortion = abs(distortion) * 5.0;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// FRAGMENT SHADER PROFESIONAL Y SUTIL
const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uSecondaryColor;
  uniform vec3 uAccentColor;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uColorBalance;
  uniform float uScrollProgress;
  uniform float uSharpenStrength;
  uniform float uVignetteIntensity;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  void main() {
    // UVs con ligero desplazamiento basado en distorsión
    vec2 adjustedUV = vUv;
    adjustedUV.x += vDistortion * 0.01 * (1.0 - uScrollProgress * 0.5);
    
    // Color base desde textura
    vec4 texColor = texture2D(uTexture, adjustedUV);
    vec3 color = texColor.rgb;
    
    // Filtro de nitidez sutil 
    float sharpStrength = uSharpenStrength * (1.0 + uScrollProgress * 0.5);
    vec3 blurred = (
      texture2D(uTexture, adjustedUV + vec2(0.001, 0.001)).rgb + 
      texture2D(uTexture, adjustedUV + vec2(-0.001, 0.001)).rgb + 
      texture2D(uTexture, adjustedUV + vec2(0.001, -0.001)).rgb + 
      texture2D(uTexture, adjustedUV + vec2(-0.001, -0.001)).rgb
    ) * 0.25;
    color += (color - blurred) * sharpStrength;
    
    // Balance de color ajustado con scroll
    float balance = uColorBalance * (1.0 + uScrollProgress * 0.3);
    vec3 colorTint = mix(uColor, uSecondaryColor, uScrollProgress);
    color = mix(color, colorTint, balance);
    
    // Añadir sutil acento de color basado en elevación
    vec3 accentHighlight = uAccentColor * vDistortion * 1.5 * (1.0 - uScrollProgress * 0.7);
    color += accentHighlight;
    
    // Viñeta profesional que se intensifica sutilmente con scroll
    float vignetteStrength = uVignetteIntensity * (1.0 + uScrollProgress * 0.5);
    float vignette = smoothstep(0.4 - uScrollProgress * 0.1, 0.0, length(vUv - 0.5));
    color = mix(color, vec3(0.02, 0.02, 0.05), (1.0 - vignette) * vignetteStrength);
    
    // Ajuste de brillo basado en scroll (oscurecer gradualmente)
    color *= max(0.7, 1.0 - uScrollProgress * 0.4);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Tipo para el material
export type DeepSpaceMaterialImpl = THREE.ShaderMaterial & {
  uTime: number;
  uColor: THREE.Color;
  uSecondaryColor: THREE.Color;
  uAccentColor: THREE.Color;
  uTexture: THREE.Texture;
  uMouse: THREE.Vector2;
  uScrollProgress: number;
  uDistortionFrequency: number;
  uDistortionStrength: number;
  uDepthOffset: number;
  uColorBalance: number;
  uSharpenStrength: number;
  uVignetteIntensity: number;
};

// Crear material
const DeepSpaceMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uAccentColor: new THREE.Color(COLORS.accent),
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uScrollProgress: 0.0,
    uDistortionFrequency: 2.0,
    uDistortionStrength: 0.05,
    uDepthOffset: 0.2,
    uColorBalance: 0.2,
    uSharpenStrength: 0.3,
    uVignetteIntensity: 0.5,
  },
  vertexShader,
  fragmentShader
);

extend({ DeepSpaceMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      deepSpaceMaterial: ReactThreeFiber.Object3DNode<
        DeepSpaceMaterialImpl,
        typeof DeepSpaceMaterial
      >;
    }
  }
}

// CONTROLADOR PROFESIONAL CON TRANSICIONES SUAVES
class ProfessionalTransitionController {
  private tl: gsap.core.Timeline | null = null;
  private meshRef: any = null;
  private matRef: any = null;
  private initialScale: number = 1;
  private initialPosition = new THREE.Vector3();

  // Configuración profesional con valores sutiles
  private readonly config = {
    // Descenso
    descent: {
      distance: 1.5, // Distancia total de descenso
      curve: "power2.inOut", // Curva de ease para movimiento suave
      depthChange: 0.2, // Cambio de profundidad durante el descenso
    },

    // Escala
    scale: {
      start: 1.0, // Escala inicial
      end: 0.6, // Escala final (60% del original)
      easePoint: 0.6, // Punto donde la escala cambia más rápidamente
    },

    // Rotación
    rotation: {
      maxAngleX: 0.1, // Rotación sutil en X
      maxAngleY: 0.05, // Rotación muy sutil en Y
    },

    // Tiempo de transición
    timing: {
      durationFactor: 0.8, // Suavidad de las transiciones
    },

    // Efectos visuales
    visual: {
      distortionReduction: 0.8, // Reducción de distorsión con scroll
      vignetteFactor: 0.5, // Factor de viñeta
      colorBalance: 0.25, // Balance de color
    },
  };

  // Inicializar controlador
  init(meshRef: any, matRef: any): void {
    if (typeof window === "undefined") return;

    this.meshRef = meshRef;
    this.matRef = matRef;

    // Guardar escala y posición inicial
    if (meshRef.current) {
      this.initialScale = meshRef.current.scale.x;
      this.initialPosition.copy(meshRef.current.position);
    }

    // Inicializar material con valores profesionales
    if (matRef.current) {
      matRef.current.uDistortionFrequency = 2.0;
      matRef.current.uDistortionStrength = 0.05; // Distorsión muy sutil
      matRef.current.uDepthOffset = this.config.descent.depthChange;
      matRef.current.uColorBalance = this.config.visual.colorBalance;
      matRef.current.uSharpenStrength = 0.3; // Nitidez sutil
      matRef.current.uVignetteIntensity = this.config.visual.vignetteFactor;
    }

    this.setupScrollTrigger();
  }

  // Configurar ScrollTrigger
  private setupScrollTrigger(): void {
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: this.config.timing.durationFactor, // Transición suave
        onUpdate: (self) => {
          this.updateTransition(self.progress);
        },
      },
    });
  }

  // Actualizar transición
  private updateTransition(progress: number): void {
    if (!this.meshRef?.current || !this.matRef?.current) return;

    const mesh = this.meshRef.current;
    const mat = this.matRef.current;

    // Actualizar uniforms del shader
    mat.uScrollProgress = progress;

    // Aplicar descenso con curva de easing
    let easedProgress: number;
    // Convertir string de ease a función matemática simple
    if (this.config.descent.curve === "power2.inOut") {
      easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
    } else {
      easedProgress = progress;
    }

    // Descenso suave
    const descentDistance = easedProgress * this.config.descent.distance;

    // Movimiento sutil en profundidad
    const depthOffset = progress * this.config.descent.depthChange;

    // Posición actualizada
    mesh.position.set(
      this.initialPosition.x,
      this.initialPosition.y - descentDistance,
      this.initialPosition.z + depthOffset
    );

    // Rotación sutil
    const rotX = progress * this.config.rotation.maxAngleX;
    const rotY = Math.sin(progress * Math.PI) * this.config.rotation.maxAngleY;

    mesh.rotation.set(rotX, rotY, 0);

    // Escala que se reduce de forma profesional
    let scaleFactor: number;

    // Usar punto de ease para transición de escala más suave
    if (progress < this.config.scale.easePoint) {
      // Transición suave hasta el punto de ease
      const scaleProgress = progress / this.config.scale.easePoint;
      scaleFactor = this.lerp(
        this.config.scale.start,
        this.config.scale.end,
        scaleProgress * scaleProgress // Ease cuadrático para suavidad
      );
    } else {
      // Mantener escala mínima después del punto de ease
      scaleFactor = this.config.scale.end;
    }

    // Aplicar escala actualizada
    mesh.scale.set(
      this.initialScale * scaleFactor,
      this.initialScale * scaleFactor,
      this.initialScale * scaleFactor
    );

    // Reducir distorsión progresivamente
    mat.uDistortionStrength =
      0.05 * (1.0 - progress * this.config.visual.distortionReduction);

    // Ajustar viñeta
    mat.uVignetteIntensity =
      this.config.visual.vignetteFactor * (1.0 + progress * 0.3);
  }

  // Interpolación lineal
  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  // Limpiar recursos
  destroy(): void {
    if (this.tl) this.tl.kill();
    this.meshRef = null;
    this.matRef = null;
  }
}

// Instancia del controlador
const deepSpaceController = new ProfessionalTransitionController();

function MeshWithOverlay({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

function FloatingDeepSpace() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<DeepSpaceMaterialImpl>(null);
  const { mouse, viewport, size } = useThree();

  // Inicializar controlador
  useEffect(() => {
    if (!matRef.current) return;

    gsap.from(matRef.current, {
      uDistortionStrength: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    deepSpaceController.init(meshRef, matRef);

    return () => {
      deepSpaceController.destroy();
    };
  }, []);

  // Frame loop
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime() * 0.5; // Movimiento más lento para profesionalismo
      matRef.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
    }
  });

  // Geometría con menos segmentos para rendimiento
  const geometry = useMemo(() => new THREE.PlaneGeometry(3, 2, 10, 10), []);
  const baseScale = 0.4;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;
  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  // Cargar textura
  const [texture] = useLoader(THREE.TextureLoader, [
    "/images/home/gradient.jpg",
  ]);
  return (
    <MeshWithOverlay>
      <mesh
        ref={meshRef}
        scale={[responsiveScale, responsiveScale, responsiveScale]}
        position={[0, yOffset, 0]}
      >
        <primitive object={geometry} attach="geometry" />
        <deepSpaceMaterial
          ref={matRef}
          uTexture={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </MeshWithOverlay>
  );
}

function DeepSpace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fade in
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" } // Fade in más lento para profesionalismo
    );
  }, []);

  return (
    <div ref={containerRef} className={cx("container")}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{
          alpha: true,
          antialias: true, // Siempre antialias para look profesional
          preserveDrawingBuffer: false,
          powerPreference: "high-performance",
          precision: isMobile ? "mediump" : "highp",
        }}
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{
          position: [0, 0, isMobile ? 3 : 2.5],
          fov: isMobile ? 35 : 30,
          near: 0.1,
          far: 100,
        }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <FloatingDeepSpace />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(DeepSpace);
