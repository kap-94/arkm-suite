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

// Import custom controller
import DeepSpaceController from "./DeepSpaceController";

const cx = classNames.bind(styles);

const COLORS = {
  primary: "#0F172A", // Dark blue
  secondary: "#334155", // Slate gray
};

// Optimized vertex shader with reduced brightness transitions
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // Simplified noise function for better performance
  float snoise(vec3 v){
    // Simple noise approximation with better performance
    float noise = sin(v.x*1.5 + v.y*2.3 + v.z*1.7 + uTime*0.5);
    noise += cos(v.x*2.5 + v.y*1.3 + v.z*2.1 + uTime*0.7);
    return noise * 0.25;
  }

  void main(){
    vUv = uv;

    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance);

    float scrollEffect = uScrollProgress * 1.5 - 0.75; // Reduced range
    float scrollFrequency = uFrequency * (1.0 + scrollEffect * 0.4); // Less scroll impact

    vec3 pos = position;

    float noiseValue = snoise(vec3(vUv * scrollFrequency, uTime*0.3 + uScrollProgress*0.5)) * uAmplitude;
    noiseValue *= (1.0 + mouseInfluence * 1.5); // Reduced mouse influence

    pos.z += noiseValue * (0.8 + abs(scrollEffect) * 0.3); // Less z-distortion

    // Optimized rotations - fewer calculations
    float angleX = uScrollProgress * 0.08 * 3.14159;
    float angleY = uScrollProgress * 0.15 * 3.14159;
    
    // Optimized rotation calculations
    float cosX = cos(angleX), sinX = sin(angleX);
    float cosY = cos(angleY), sinY = sin(angleY);

    float y1 = pos.y * cosX - pos.z * sinX;
    float z1 = pos.y * sinX + pos.z * cosX;
    pos.y = y1; pos.z = z1;

    float x2 = pos.x * cosY + pos.z * sinY;
    float z2 = -pos.x * sinY + pos.z * cosY;
    pos.x = x2; pos.z = z2;

    // Reduced horizontal wave
    float storyWave = sin(vUv.y * 8.0 + uScrollProgress * 6.0) * 0.03 * uScrollProgress;
    pos.x += storyWave;

    vElevation = noiseValue;
    vDistortion = mouseInfluence + abs(scrollEffect) * 0.2; // Reduced distortion effect

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Optimized fragment shader with reduced brightness and darker colors
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

  // Optimized RGB shift function
  vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset){
    float r = texture2D(textureImage, uv + offset).r;
    vec2 gb = texture2D(textureImage, uv).gb;
    return vec3(r, gb);
  }

  void main(){
    // Reduced RGB shift amount
    float rgbShiftAmount = uRGBShift * (0.7 + vDistortion * 1.3);
    rgbShiftAmount *= (0.7 + uScrollProgress * 1.2); // Less extreme shift with scroll

    vec2 offset = rgbShiftAmount * vec2(
      cos(uTime * 0.15 + uScrollProgress * 2.5),
      sin(uTime * 0.15 + uScrollProgress * 2.5)
    );

    vec2 animatedUV = vUv;
    // Subtle UV animation
    animatedUV.x += sin(vUv.y * 8.0 + uTime * 0.3 + uScrollProgress * 2.5) * 0.015 * uScrollProgress;
    animatedUV.y += cos(vUv.x * 8.0 + uTime * 0.3 + uScrollProgress * 2.5) * 0.015 * uScrollProgress;

    vec3 color = rgbShift(uTexture, animatedUV, offset);

    // Darker color mixing with scroll
    vec3 scrollColor = mix(uColor, uSecondaryColor, uScrollProgress);
    color = mix(color, scrollColor, 0.2 + 0.15 * uScrollProgress); // More subtle mix

    // Reduced elevation highlights
    color += vElevation * uSecondaryColor * 0.1 * (0.1 + uScrollProgress * 0.15);

    // Darker vignette
    vec2 center = vec2(0.5, 0.5);
    center.y += uScrollProgress * 0.15;
    float d = length(vUv - center);
    float vign = smoothstep(0.75 - uScrollProgress * 0.2, 0.15 + uScrollProgress * 0.2, d);
    color = mix(vec3(0.02, 0.02, 0.04), color, vign); // Darker center for vignette

    // More subtle flashes
    float f1 = smoothstep(0.2, 0.3, uScrollProgress) - smoothstep(0.3, 0.4, uScrollProgress);
    float f2 = smoothstep(0.6, 0.7, uScrollProgress) - smoothstep(0.7, 0.8, uScrollProgress);
    float flash = (f1 + f2) * 0.5; // Reduced flash intensity
    color += flash * vec3(0.15, 0.1, 0.3); // Darker flash colors

    // Reduced halo effect
    float sceneTransition = smoothstep(0.45, 0.55, uScrollProgress);
    float halo = sin(uScrollProgress * 6.283185) * 0.3 + 0.3;
    color += halo * vDistortion * vec3(0.05, 0.08, 0.15) * sceneTransition * 0.5;

    // Guarantee minimum darkness
    color = max(color, vec3(0.02, 0.02, 0.03));

    gl_FragColor = vec4(color, 1.0);
  }
`;

// Type definition
export type DeepSpaceMaterialImpl = THREE.ShaderMaterial & {
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
const DeepSpaceMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 2.5, // Reduced from original
    uAmplitude: 0.15, // Reduced from original
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.008, // Reduced from original
    uMouse: new THREE.Vector2(0.5, 0.5),
    uScrollProgress: 0.0,
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

function MeshWithOverlay({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

function FloatingDeepSpace() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<DeepSpaceMaterialImpl>(null);
  const { mouse, viewport, size } = useThree();

  // Store initial position
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.initialY = meshRef.current.position.y;
    }
  }, []);

  // Mount: initialize scroll
  useEffect(() => {
    if (!matRef.current) return;
    gsap.from(matRef.current, {
      uAmplitude: 0,
      duration: 1.8, // Slightly faster initialization
      ease: "power2.out", // Smoother ease
    });
    DeepSpaceController.init(meshRef, matRef);

    return () => {
      DeepSpaceController.destroy();
    };
  }, []);

  // Optimized frame loop with reduced calculations
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime() * 0.8; // Slower time progression
      matRef.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
    }
  });

  // Optimized geometry with fewer segments
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

  // Detect mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Faster fade in
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
          precision: isMobile ? "mediump" : "highp", // Lower precision on mobile
        }}
        dpr={[1, isMobile ? 1.5 : 2]} // Lower DPR on mobile
        camera={{
          position: [0, 0, isMobile ? 3 : 2.5],
          fov: isMobile ? 35 : 30,
          near: 0.1,
          far: 100, // Reduced from 1000 for performance
        }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} /> {/* Reduced light intensity */}
        <Suspense fallback={null}>
          <FloatingDeepSpace />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(DeepSpace);
