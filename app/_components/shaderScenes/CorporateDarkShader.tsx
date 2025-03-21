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
import classNames from "classnames/bind";
import styles from "./ChromaticRippleScene.module.scss";

// Import controller
import CorporateDarkController from "./CorporateDarkController";

const cx = classNames.bind(styles);

const COLORS = {
  primary: "#1A202C", // Dark slate
  secondary: "#2D3748", // Dark gray blue
};

// Professional optimized vertex shader with subdued effects
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // Simplified noise for performance
  float snoise(vec3 v) {
    return (sin(v.x * 1.7 + v.y * 2.3 + v.z + uTime * 0.2) * 0.5 + 0.5) * 0.15;
  }

  void main() {
    vUv = uv;
    
    // Professional subtle mouse interaction
    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDistance) * 0.4;
    
    // Controlled scroll effects
    float scrollEffect = min(uScrollProgress, 0.8); // Cap scrolling effect
    float scrollFrequency = uFrequency * (1.0 + scrollEffect * 0.25);
    
    vec3 pos = position;
    
    // Professional subtle distortion
    float noiseValue = snoise(vec3(vUv * scrollFrequency, uTime * 0.15)) * uAmplitude;
    noiseValue *= (1.0 + mouseInfluence);
    
    pos.z += noiseValue * (0.6 + scrollEffect * 0.15);
    
    // Subtle rotation with professional feel
    float angle = uScrollProgress * 0.08 * 3.14159;
    float cosA = cos(angle), sinA = sin(angle);
    
    float y1 = pos.y * cosA - pos.z * sinA;
    float z1 = pos.y * sinA + pos.z * cosA;
    pos.y = y1;
    pos.z = z1;
    
    // Minimal wave effect
    float wave = sin(vUv.y * 4.0 + uScrollProgress * 3.0) * 0.015 * uScrollProgress;
    pos.x += wave;
    
    vElevation = noiseValue;
    vDistortion = mouseInfluence + scrollEffect * 0.08;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Corporate-appropriate fragment shader with professional dark aesthetics
const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uRGBShift;
  uniform vec3 uSecondaryColor;
  uniform float uScrollProgress;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;
  
  // Professional RGB shift
  vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
    float r = texture2D(textureImage, uv + offset).r;
    vec2 gb = texture2D(textureImage, uv).gb;
    return vec3(r, gb);
  }
  
  void main() {
    // Professional subtle RGB shift
    float rgbShiftAmount = uRGBShift * (0.6 + vDistortion * 0.6);
    rgbShiftAmount = min(rgbShiftAmount, 0.015); // Cap RGB shift for professional look
    
    vec2 offset = rgbShiftAmount * vec2(
      cos(uTime * 0.1 + uScrollProgress),
      sin(uTime * 0.1 + uScrollProgress)
    );
    
    // Minimal UV animation
    vec2 animatedUV = vUv;
    animatedUV.x += sin(vUv.y * 4.0 + uTime * 0.2) * 0.01 * uScrollProgress;
    
    // Get base color
    vec3 color = rgbShift(uTexture, animatedUV, offset);
    
    // Professional dark color treatment
    color *= 0.85; // Slightly darker
    
    // Professional color mixing with scroll
    vec3 scrollColor = mix(uColor, uSecondaryColor, min(uScrollProgress, 0.8));
    color = mix(color, scrollColor, 0.15 + 0.1 * uScrollProgress);
    
    // Professional vignette
    vec2 center = vec2(0.5, 0.5 + uScrollProgress * 0.05);
    float d = length(vUv - center);
    float vign = smoothstep(0.7, 0.15, d);
    color = mix(vec3(0.02, 0.02, 0.04), color, vign);
    
    // Very subtle highlights
    color += vElevation * uSecondaryColor * 0.03;
    
    // Ensure professional look by controlling maximum brightness
    color = min(color, vec3(0.85));
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Type definition
export type CorporateDarkMaterialImpl = THREE.ShaderMaterial & {
  uTime: number;
  uFrequency: number;
  uAmplitude: number;
  uColor: THREE.Color;
  uSecondaryColor: THREE.Color;
  uTexture: THREE.Texture;
  uRGBShift: number;
  uMouse: THREE.Vector2;
  uScrollProgress: number;
};

// Create material with shaderMaterial
const CorporateDarkMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 1.8, // Professional frequency
    uAmplitude: 0.12, // Subtle amplitude
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.006, // Very subtle RGB shift
    uMouse: new THREE.Vector2(0.5, 0.5),
    uScrollProgress: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ CorporateDarkMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      corporateDarkMaterial: ReactThreeFiber.Object3DNode<
        CorporateDarkMaterialImpl,
        typeof CorporateDarkMaterial
      >;
    }
  }
}

function MeshWithOverlay({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

function FloatingCorporateDark() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<CorporateDarkMaterialImpl>(null);
  const { mouse, viewport, size } = useThree();

  // Store initial position
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.initialY = meshRef.current.position.y;
    }
  }, []);

  // Mount: initialize with controller
  useEffect(() => {
    if (!matRef.current) return;
    gsap.from(matRef.current, {
      uAmplitude: 0,
      duration: 1.2,
      ease: "power2.out",
    });
    CorporateDarkController.init(meshRef, matRef);

    return () => {
      CorporateDarkController.destroy();
    };
  }, []);

  // Professional frame loop with optimized updates
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime() * 0.5; // Slower, more subtle time
      matRef.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
    }
  });

  // Optimized geometry
  const geometry = useMemo(() => new THREE.PlaneGeometry(3, 2, 12, 12), []);
  const baseScale = 0.4;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;
  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  // Load texture
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
        <corporateDarkMaterial
          ref={matRef}
          uTexture={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </MeshWithOverlay>
  );
}

function CorporateDark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Professional fade in
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power1.out" }
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
        dpr={[1, isMobile ? 1.2 : 1.5]} // Optimized DPR
        camera={{
          position: [0, 0, isMobile ? 3 : 2.5],
          fov: isMobile ? 35 : 30,
          near: 0.1,
          far: 50, // Reduced for performance
        }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.35} /> {/* Professional lighting */}
        <Suspense fallback={null}>
          <FloatingCorporateDark />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(CorporateDark);
