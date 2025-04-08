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

const COLORS = {
  primary: "#0F172A", // Dark blue
  secondary: "#334155", // Slate gray
  accent: "#9C27B0", // Accent color (purple)
};

// VERTEX SHADER CON DESCENSO EN ESPIRAL
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  uniform float uSpiralIntensity;
  uniform float uSpiralFrequency;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;
  varying float vSpiralFactor;

  void main() {
    vUv = uv;
    
    // Influencia del mouse
    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance) * 0.5;
    
    // Posición base
    vec3 pos = position;
    
    // Calcular factor de espiral
    float spiralFactor = uScrollProgress * uSpiralIntensity;
    float spiralAngle = uScrollProgress * uSpiralFrequency * 3.14159 * 2.0;
    
    // Distorsión que se reduce con scroll
    float distortion = sin(pos.x * uFrequency + uTime) * 
                       cos(pos.y * uFrequency + uTime) * 
                       uAmplitude * (1.0 - uScrollProgress * 0.7);
    
    // Aplicar distorsión
    pos.z += distortion;
    
    // Descenso con movimiento en espiral
    float descentAmount = uScrollProgress * 2.0; // Cantidad de descenso
    
    // Movimiento en espiral (radio se reduce gradualmente)
    float spiralRadius = (1.0 - uScrollProgress * 0.7) * spiralFactor;
    float spiralX = cos(spiralAngle) * spiralRadius;
    float spiralZ = sin(spiralAngle) * spiralRadius;
    
    // Aplicar descenso y espiral
    pos.y -= descentAmount;
    pos.x += spiralX;
    pos.z += spiralZ;
    
    // También rotar el objeto mientras desciende en espiral
    float rotAngle = uScrollProgress * 3.14159 * 2.0;
    float cosA = cos(rotAngle), sinA = sin(rotAngle);
    
    // Rotación en Y (giro)
    float x1 = pos.x * cosA - pos.z * sinA;
    float z1 = pos.x * sinA + pos.z * cosA;
    pos.x = x1; pos.z = z1;
    
    // Ligera inclinación hacia el centro de la espiral
    float tiltAngle = spiralRadius * 0.5;
    pos.z -= tiltAngle;
    
    // Datos para fragment shader
    vElevation = distortion;
    vDistortion = mouseInfluence + abs(spiralFactor);
    vSpiralFactor = spiralFactor;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// FRAGMENT SHADER CON DESCENSO EN ESPIRAL
const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uSecondaryColor;
  uniform vec3 uAccentColor;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uRGBShift;
  uniform float uScrollProgress;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;
  varying float vSpiralFactor;
  
  // RGB shift con 3 canales separados
  vec3 tripleShift(sampler2D tex, vec2 uv, vec2 r_offset, vec2 g_offset, vec2 b_offset) {
    float r = texture2D(tex, uv + r_offset).r;
    float g = texture2D(tex, uv + g_offset).g;
    float b = texture2D(tex, uv + b_offset).b;
    return vec3(r, g, b);
  }
  
  void main() {
    // Calcular offsets dinámicos para RGB shift
    float baseShift = uRGBShift * (1.0 + uScrollProgress + vSpiralFactor * 0.5);
    
    // Diferentes direcciones para cada canal
    vec2 r_offset = baseShift * vec2(cos(uTime * 0.2), sin(uTime * 0.1));
    vec2 g_offset = baseShift * 0.8 * vec2(cos(uTime * 0.15 + 1.0), sin(uTime * 0.2 + 0.5));
    vec2 b_offset = baseShift * 0.6 * vec2(cos(uTime * 0.1 + 2.0), sin(uTime * 0.15 + 1.0));
    
    // UV animados en espiral
    vec2 animatedUV = vUv;
    float spiralUVIntensity = 0.02 * uScrollProgress;
    float spiralT = uTime * 0.2 - uScrollProgress * 5.0; // Tiempo para espiral UV
    
    // Distorsión UV en forma de espiral
    float spiralUVAngle = length(vUv - 0.5) * 10.0 - spiralT;
    animatedUV.x += cos(spiralUVAngle) * spiralUVIntensity;
    animatedUV.y += sin(spiralUVAngle) * spiralUVIntensity;
    
    // Color base con triple RGB shift
    vec3 color = tripleShift(uTexture, animatedUV, r_offset, g_offset, b_offset);
    
    // Mezcla de 3 colores basada en scroll y spiral
    vec3 colorMix = mix(
      mix(uColor, uSecondaryColor, uScrollProgress), 
      uAccentColor, 
      sin(uScrollProgress * 3.14159) * 0.5
    );
    
    // Aplicar mezcla de colores
    color = mix(color, colorMix, 0.3 + vSpiralFactor * 0.4);
    
    // Efecto de velocidad/motion blur
    float speed = uScrollProgress * (1.0 + vSpiralFactor);
    color = mix(
      color,
      vec3(0.1, 0.05, 0.2), 
      smoothstep(0.0, 1.0, speed * 0.3) * smoothstep(1.0, 0.0, vUv.y)
    );
    
    // Brillo basado en espiral
    float glow = sin(vSpiralFactor * 10.0 + uTime) * 0.5 + 0.5;
    color += glow * uAccentColor * 0.15 * uScrollProgress;
    
    // Viñeta dinámica que sigue el movimiento espiral
    float vign = smoothstep(0.7, 0.1, length(vUv - 0.5) * (1.0 + vSpiralFactor));
    color = mix(vec3(0.01, 0.01, 0.05), color, vign);
    
    // Añadir rastro de estrellas/partículas en la trayectoria espiral
    float stars = max(0.0, sin(vUv.x * 50.0 + vUv.y * 30.0 + uTime * 2.0) - 0.97);
    stars *= uScrollProgress * vSpiralFactor;
    color += stars * vec3(0.5, 0.3, 0.9);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Tipo para el material
export type DeepSpaceMaterialImpl = THREE.ShaderMaterial & {
  uTime: number;
  uFrequency: number;
  uAmplitude: number;
  uColor: THREE.Color;
  uSecondaryColor: THREE.Color;
  uAccentColor: THREE.Color;
  uTexture: THREE.Texture;
  uRGBShift: number;
  uMouse: THREE.Vector2;
  uScrollProgress: number;
  uSpiralIntensity: number;
  uSpiralFrequency: number;
};

// Crear material
const DeepSpaceMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 3.0,
    uAmplitude: 0.15,
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uAccentColor: new THREE.Color(COLORS.accent),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.01,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uScrollProgress: 0.0,
    uSpiralIntensity: 0.5,
    uSpiralFrequency: 2.0,
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

// CONTROLADOR CON DESCENSO EN ESPIRAL
class SpiralDescentController {
  private tl: gsap.core.Timeline | null = null;
  private meshRef: any = null;
  private matRef: any = null;
  private initialScale: number = 1;
  private initialPosition = new THREE.Vector3();

  // Configuración de descenso en espiral
  private readonly spiralConfig = {
    // Parámetros de espiral
    spiral: {
      initialRadius: 0.5, // Radio inicial de la espiral
      finalRadius: 0.1, // Radio final (más cerrado)
      totalRotations: 1.5, // Cantidad de rotaciones completas
      verticalDistance: 2.5, // Distancia vertical total
    },

    // Velocidad
    speed: {
      initial: 1.0, // Velocidad inicial
      acceleration: 1.2, // Aceleración
    },

    // Escala
    scale: {
      start: 1.0, // Escala inicial
      end: 0.3, // Escala final (30% del tamaño original)
      pulsation: 0.1, // Pulsación durante el descenso
    },

    // Rotación
    rotation: {
      selfRotation: 2.0, // Rotación sobre sí mismo
      tiltTowardCenter: 0.3, // Inclinación hacia el centro
    },

    // Efectos visuales
    visualEffects: {
      trailLength: 0.3, // Longitud del rastro
      glowIntensity: 0.4, // Intensidad del brillo
      colorIntensity: 0.7, // Intensidad de colores
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

    this.setupScrollTrigger();
  }

  // Configurar ScrollTrigger
  private setupScrollTrigger(): void {
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          this.updateSpiralMotion(self.progress);
        },
      },
    });
  }

  // Actualizar movimiento en espiral
  private updateSpiralMotion(progress: number): void {
    if (!this.meshRef?.current || !this.matRef?.current) return;

    const mesh = this.meshRef.current;
    const mat = this.matRef.current;

    // Actualizar uniforms de shader
    mat.uScrollProgress = progress;

    // Calcular parámetros de espiral
    const spiralConfig = this.spiralConfig.spiral;
    const rotations = spiralConfig.totalRotations;

    // Ángulo de la espiral
    const angle = progress * Math.PI * 2 * rotations;

    // Radio que se reduce gradualmente
    const radius = this.lerp(
      spiralConfig.initialRadius,
      spiralConfig.finalRadius,
      progress
    );

    // Posición en espiral
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = -progress * spiralConfig.verticalDistance; // Descenso

    // Aplicar posición
    mesh.position.set(
      this.initialPosition.x + x,
      this.initialPosition.y + y,
      this.initialPosition.z + z
    );

    // Rotación hacia el centro de la espiral
    const centerX = 0;
    const centerZ = 0;

    // Vector desde la posición actual al centro
    const dirX = centerX - x;
    const dirZ = centerZ - z;

    // Calcular ángulo hacia el centro
    const targetAngle = Math.atan2(dirZ, dirX);

    // Rotación propia + rotación hacia el centro
    const selfRotation =
      progress * this.spiralConfig.rotation.selfRotation * Math.PI * 2;
    const tiltAmount = this.spiralConfig.rotation.tiltTowardCenter;

    // Aplicar rotaciones
    mesh.rotation.y = targetAngle + selfRotation;
    mesh.rotation.x = Math.sin(angle) * tiltAmount;
    mesh.rotation.z = Math.cos(angle) * tiltAmount;

    // Escala fluctuante durante el descenso
    const baseScale = this.lerp(
      this.spiralConfig.scale.start,
      this.spiralConfig.scale.end,
      progress
    );

    // Añadir pulsación a la escala
    const pulseFactor =
      Math.sin(progress * Math.PI * 8) *
      this.spiralConfig.scale.pulsation *
      progress;

    // Escala final
    const finalScale = baseScale + pulseFactor;
    mesh.scale.set(
      this.initialScale * finalScale,
      this.initialScale * finalScale,
      this.initialScale * finalScale
    );

    // Actualizar otros uniforms
    mat.uSpiralIntensity = 0.5 + progress * 0.5;
    mat.uSpiralFrequency = 2.0 + progress * 3.0;

    // Aumentar RGB shift durante descenso
    mat.uRGBShift = 0.01 + progress * 0.02;
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
const deepSpaceController = new SpiralDescentController();

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
      uAmplitude: 0,
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
      matRef.current.uTime = clock.getElapsedTime() * 0.8;
      matRef.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
    }
  });

  // Geometría con menos segmentos
  const geometry = useMemo(() => new THREE.PlaneGeometry(3, 2, 10, 10), []);
  const baseScale = 0.4;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;
  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  // Cargar textura
  const [texture] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1673526759317-be71a1243e3d?auto=format&fit=crop&w=3432&q=80",
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
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className={cx("container")}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{
          alpha: true,
          antialias: !isMobile,
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
