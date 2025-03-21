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
import DarkEleganceController from "./DarkEleganceController";

const cx = classNames.bind(styles);

const COLORS = {
  primary: "#151515", // Near black
  secondary: "#2A2A2A", // Dark gray
};

// Clean and elegant vertex shader with minimal distortion
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // Elegant simplified noise for performance
  float snoise(vec3 v) {
    return sin(v.x * 1.5 + v.y * 1.2 + v.z + uTime * 0.1) * 0.2;
  }

  void main() {
    vUv = uv;
    
    // Elegant mouse interaction
    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDistance) * 0.3;
    
    // Elegant scroll effects
    float scrollEffect = uScrollProgress * 0.8; // Reduced scroll impact
    float scrollFrequency = uFrequency * (1.0 + scrollEffect * 0.2);
    
    vec3 pos = position;
    
    // Elegant subtle distortion
    float noiseValue = snoise(vec3(vUv * scrollFrequency, uTime * 0.1)) * uAmplitude;
    noiseValue *= (1.0 + mouseInfluence);
    
    pos.z += noiseValue * (0.5 + scrollEffect * 0.1);
    
    // Elegant subtle rotation
    float angle = uScrollProgress * 0.06 * 3.14159;
    float cosA = cos(angle), sinA = sin(angle);
    
    float y1 = pos.y * cosA - pos.z * sinA;
    float z1 = pos.y * sinA + pos.z * cosA;
    pos.y = y1;
    pos.z = z1;
    
    // Elegant minimal wave
    float wave = sin(vUv.y * 3.0 + uScrollProgress * 2.0) * 0.01 * uScrollProgress;
    pos.x += wave;
    
    vElevation = noiseValue;
    vDistortion = mouseInfluence + scrollEffect * 0.06;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Elegant dark fragment shader with premium feel
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
  
  // Premium RGB shift effect
  vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
    float r = texture2D(textureImage, uv + offset).r;
    vec2 gb = texture2D(textureImage, uv).gb;
    return vec3(r, gb);
  }
  
  void main() {
    // Elegant subtle RGB shift
    float rgbShiftAmount = uRGBShift * (0.4 + vDistortion * 0.4);
    rgbShiftAmount = min(rgbShiftAmount, 0.008); // Cap RGB shift for elegance
    
    vec2 offset = rgbShiftAmount * vec2(
      cos(uTime * 0.08),
      sin(uTime * 0.08)
    );
    
    // Elegant UV animation
    vec2 animatedUV = vUv;
    
    // Get base color
    vec3 color = rgbShift(uTexture, animatedUV, offset);
    
    // Elegant dark treatment
    color *= 0.8;
    
    // Premium color mixing
    vec3 scrollColor = mix(uColor, uSecondaryColor, min(uScrollProgress * 0.8, 0.7));
    color = mix(color, scrollColor, 0.12 + 0.08 * uScrollProgress);
    
    // Elegant premium vignette
    vec2 center = vec2(0.5, 0.5);
    float d = length(vUv - center);
    float vign = smoothstep(0.7, 0.2, d);
    color = mix(vec3(0.03, 0.03, 0.03), color, vign);
    
    // Elegant subtle highlights
    color += vElevation * uSecondaryColor * 0.02;
    
    // Ensure premium look with controlled brightness
    color = min(color, vec3(0.85));
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Type definition
export type DarkEleganceMaterialImpl = THREE.ShaderMaterial & {
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
const DarkEleganceMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 1.5,
    uAmplitude: 0.08, // Reduced amplitude for elegance
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.004, // Subtle RGB shift
    uMouse: new THREE.Vector2(0.5, 0.5),
    uScrollProgress: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ DarkEleganceMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      darkEleganceMaterial: ReactThreeFiber.Object3DNode<
        DarkEleganceMaterialImpl,
        typeof DarkEleganceMaterial
      >;
    }
  }
}

function MeshWithOverlay({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

function FloatingDarkElegance() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<DarkEleganceMaterialImpl>(null);
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
      duration: 1.0, // Quick elegant fade in
      ease: "power1.out",
    });
    DarkEleganceController.init(meshRef, matRef);

    return () => {
      DarkEleganceController.destroy();
    };
  }, []);

  // Elegant frame loop
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime() * 0.4; // Slow elegant time
      matRef.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
    }
  });

  // Optimized geometry for premium performance
  const geometry = useMemo(() => new THREE.PlaneGeometry(3, 2, 12, 12), []);
  const baseScale = 0.4;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;
  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  // Load elegant texture
  const [texture] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80", // Elegant dark texture
  ]);

  return (
    <MeshWithOverlay>
      <mesh
        ref={meshRef}
        scale={[responsiveScale, responsiveScale, responsiveScale]}
        position={[0, yOffset, 0]}
      >
        <primitive object={geometry} attach="geometry" />
        <darkEleganceMaterial
          ref={matRef}
          uTexture={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </MeshWithOverlay>
  );
}

function DarkEleganceShader() {
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

  // Elegant fade in
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power1.out" }
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
        <ambientLight intensity={0.3} /> {/* Elegant lighting */}
        <Suspense fallback={null}>
          <FloatingDarkElegance />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(DarkEleganceShader);
