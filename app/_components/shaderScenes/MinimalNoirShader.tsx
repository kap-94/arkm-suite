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
import MinimalNoirController from "./MinimalNoirController";

const cx = classNames.bind(styles);

const COLORS = {
  primary: "#121212", // Nearly black
  secondary: "#2C2C2C", // Dark gray
};

// Extremely optimized vertex shader with minimal computations
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // Ultra-simplified noise function for maximum performance
  float snoise(vec3 v) {
    return sin(v.x + v.y + v.z) * 0.25;
  }

  void main() {
    vUv = uv;
    
    // Simple mouse interaction with limited influence
    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDistance) * 0.5;
    
    // Simplified scroll effect
    float scrollEffect = uScrollProgress;
    float scrollFrequency = uFrequency * (1.0 + scrollEffect * 0.3);
    
    vec3 pos = position;
    
    // Reduced noise calculation
    float noiseValue = snoise(vec3(vUv * scrollFrequency, uTime * 0.2)) * uAmplitude;
    noiseValue *= (1.0 + mouseInfluence);
    
    pos.z += noiseValue * (0.7 + scrollEffect * 0.2);
    
    // Simplified rotation for better performance
    float angle = uScrollProgress * 0.1 * 3.14159;
    float cosA = cos(angle), sinA = sin(angle);
    
    // Apply only one simple rotation
    float y1 = pos.y * cosA - pos.z * sinA;
    float z1 = pos.y * sinA + pos.z * cosA;
    pos.y = y1;
    pos.z = z1;
    
    // Minimal wave effect
    float wave = sin(vUv.y * 5.0 + uScrollProgress * 6.0) * 0.02 * uScrollProgress;
    pos.x += wave;
    
    vElevation = noiseValue;
    vDistortion = mouseInfluence + scrollEffect * 0.1;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Minimalist fragment shader with dark, noir aesthetics
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
  
  // Simplified RGB shift function
  vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
    float r = texture2D(textureImage, uv + offset).r;
    vec2 gb = texture2D(textureImage, uv).gb;
    return vec3(r, gb);
  }
  
  void main() {
    // Minimal RGB shift
    float rgbShiftAmount = uRGBShift * (0.5 + vDistortion);
    
    vec2 offset = rgbShiftAmount * vec2(
      cos(uTime * 0.1),
      sin(uTime * 0.1)
    );
    
    // Minimal UV animation
    vec2 animatedUV = vUv;
    
    // Get base color
    vec3 color = rgbShift(uTexture, animatedUV, offset);
    
    // Mute overall brightness
    color *= 0.8;
    
    // Add noir effect - desaturate and darken
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    vec3 grayscale = vec3(luminance);
    color = mix(grayscale, color, 0.3); // Low saturation
    
    // Subtle color mix with scroll
    vec3 scrollColor = mix(uColor, uSecondaryColor, uScrollProgress);
    color = mix(color, scrollColor, 0.15 + 0.1 * uScrollProgress);
    
    // Dark vignette 
    vec2 center = vec2(0.5, 0.5);
    float d = length(vUv - center);
    float vign = smoothstep(0.7, 0.2, d);
    color = mix(vec3(0.0), color, vign);
    
    // Very subtle highlights based on elevation
    color += vElevation * uSecondaryColor * 0.04;
    
    // Control maximum brightness
    color = min(color, vec3(0.9));
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Type definition
export type MinimalNoirMaterialImpl = THREE.ShaderMaterial & {
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
const MinimalNoirMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 1.5, // Lower frequency
    uAmplitude: 0.1, // Lower amplitude
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.004, // Minimal RGB shift
    uMouse: new THREE.Vector2(0.5, 0.5),
    uScrollProgress: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ MinimalNoirMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      minimalNoirMaterial: ReactThreeFiber.Object3DNode<
        MinimalNoirMaterialImpl,
        typeof MinimalNoirMaterial
      >;
    }
  }
}

function MeshWithOverlay({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

function FloatingMinimalNoir() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<MinimalNoirMaterialImpl>(null);
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
      duration: 1.5,
      ease: "power2.out",
    });
    MinimalNoirController.init(meshRef, matRef);

    return () => {
      MinimalNoirController.destroy();
    };
  }, []);

  // Very optimized frame loop with minimal updates
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime() * 0.6; // Slower time
      // Update mouse only every second frame for performance
      if (Math.floor(clock.getElapsedTime() * 30) % 2 === 0) {
        matRef.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
      }
    }
  });

  // Lower poly geometry for performance
  const geometry = useMemo(() => new THREE.PlaneGeometry(3, 2, 10, 10), []);
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
        <minimalNoirMaterial
          ref={matRef}
          uTexture={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </MeshWithOverlay>
  );
}

function MinimalNoir() {
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
          precision: "mediump", // Using mediump for all devices for consistency and performance
        }}
        dpr={[1, isMobile ? 1.2 : 1.5]} // Lower DPR for performance
        camera={{
          position: [0, 0, isMobile ? 3 : 2.5],
          fov: isMobile ? 35 : 30,
          near: 0.1,
          far: 50, // Much reduced far plane for performance
        }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.3} /> {/* Reduced light intensity */}
        <Suspense fallback={null}>
          <FloatingMinimalNoir />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(MinimalNoir);
