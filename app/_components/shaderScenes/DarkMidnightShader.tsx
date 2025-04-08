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
import MidnightController from "./MidnightController";

const cx = classNames.bind(styles);

const COLORS = {
  primary: "#0A0A1A", // Deep midnight blue
  secondary: "#14213D", // Dark navy blue
};

// High-performance vertex shader with minimal calculations
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // Optimized noise for better performance
  float snoise(vec3 v) {
    return sin(v.x + v.z + uTime*0.15) * 0.25;
  }

  void main() {
    vUv = uv;
    
    // Simplified mouse interaction
    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDistance) * 0.3;
    
    // Optimized scroll effect
    float scrollEffect = uScrollProgress;
    float scrollFrequency = uFrequency * (1.0 + scrollEffect * 0.2);
    
    vec3 pos = position;
    
    // Optimized noise calculation
    float noiseValue = snoise(vec3(vUv * scrollFrequency, uTime * 0.2)) * uAmplitude;
    noiseValue *= (1.0 + mouseInfluence);
    
    pos.z += noiseValue * (0.6 + scrollEffect * 0.1);
    
    // Single rotation for better performance
    float angle = uScrollProgress * 0.08 * 3.14159;
    float cosA = cos(angle), sinA = sin(angle);
    
    float y1 = pos.y * cosA - pos.z * sinA;
    float z1 = pos.y * sinA + pos.z * cosA;
    pos.y = y1;
    pos.z = z1;
    
    // Minimal horizontal wave
    float wave = sin(vUv.y * 4.0 + uScrollProgress * 3.0) * 0.02 * uScrollProgress;
    pos.x += wave;
    
    vElevation = noiseValue;
    vDistortion = mouseInfluence + scrollEffect * 0.1;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Performance-optimized dark fragment shader
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
  
  // Optimized RGB shift
  vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
    float r = texture2D(textureImage, uv + offset).r;
    vec2 gb = texture2D(textureImage, uv).gb;
    return vec3(r, gb);
  }
  
  void main() {
    // Minimal RGB shift
    float rgbShiftAmount = uRGBShift * (0.5 + vDistortion * 0.5);
    rgbShiftAmount = min(rgbShiftAmount, 0.012); // Cap RGB shift
    
    vec2 offset = rgbShiftAmount * vec2(
      cos(uTime * 0.1),
      sin(uTime * 0.1)
    );
    
    // Minimal UV animation
    vec2 animatedUV = vUv;
    
    // Get base color
    vec3 color = rgbShift(uTexture, animatedUV, offset);
    
    // Darken for midnight look
    color *= 0.7;
    
    // Dark color mixing
    vec3 scrollColor = mix(uColor, uSecondaryColor, min(uScrollProgress, 0.8));
    color = mix(color, scrollColor, 0.2 + 0.1 * uScrollProgress);
    
    // Deep dark vignette
    vec2 center = vec2(0.5, 0.5);
    float d = length(vUv - center);
    float vign = smoothstep(0.7, 0.2, d);
    color = mix(vec3(0.0, 0.0, 0.01), color, vign); // Very dark blue vignette
    
    // Minimal highlights
    color += vElevation * uSecondaryColor * 0.03;
    
    // Ensure dark theme with maximum cap
    color = min(color, vec3(0.8));
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Type definition
export type MidnightMaterialImpl = THREE.ShaderMaterial & {
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
const MidnightMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 1.6,
    uAmplitude: 0.1,
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.005,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uScrollProgress: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ MidnightMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      midnightMaterial: ReactThreeFiber.Object3DNode<
        MidnightMaterialImpl,
        typeof MidnightMaterial
      >;
    }
  }
}

function MeshWithOverlay({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

function FloatingMidnight() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<MidnightMaterialImpl>(null);
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
    MidnightController.init(meshRef, matRef);

    return () => {
      MidnightController.destroy();
    };
  }, []);

  // Optimized frame loop
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime() * 0.5; // Slower time progress
      matRef.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
    }
  });

  // Optimized geometry with fewer segments
  const geometry = useMemo(() => new THREE.PlaneGeometry(3, 2, 10, 10), []);
  const baseScale = 0.4;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;
  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  // Load dark texture
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
        <midnightMaterial
          ref={matRef}
          uTexture={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </MeshWithOverlay>
  );
}

function MidnightShader() {
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

  // Quick fade in
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power1.out" }
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
          precision: "mediump", // Using mediump for better performance
        }}
        dpr={[1, isMobile ? 1.2 : 1.5]} // Lower DPR for performance
        camera={{
          position: [0, 0, isMobile ? 3 : 2.5],
          fov: isMobile ? 35 : 30,
          near: 0.1,
          far: 50, // Reduced far plane for performance
        }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.25} />{" "}
        {/* Reduced light for midnight theme */}
        <Suspense fallback={null}>
          <FloatingMidnight />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(MidnightShader);
