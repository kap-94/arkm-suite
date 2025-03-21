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
import RadialWarpController from "./RadialWrapController"; // NUEVO: nuestro scroll controller

const cx = classNames.bind(styles);

const COLORS = {
  primary: "#26225F",
  secondary: "#4f46e5",
};

// ---------------------
// Shaders (Radial Warp)
// ---------------------
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uRadialIntensity;
  uniform vec2 uMouse;
  uniform float uScrollProgress;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // Ruido simplex (pega tu implementación si la usas)
  float snoise(vec3 v){
    return 0.0; // placeholder
  }

  void main() {
    vUv = uv;

    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance);

    float scrollEffect = uScrollProgress * 2.0 - 1.0;
    float scrollFrequency = uFrequency * (1.0 + scrollEffect * 0.5);

    vec3 pos = position;
    float noiseValue = snoise(vec3(vUv * scrollFrequency, uTime*0.5)) * uAmplitude;
    noiseValue *= (1.0 + mouseInfluence*2.0);

    // Ondas radiales
    vec2 center = vec2(0.5);
    float radius = distance(vUv, center);
    float radialWave = sin(radius * 10.0 - (uTime*2.0)) 
                       * (uRadialIntensity*(1.0+abs(scrollEffect)));

    float totalDisplacement = noiseValue + radialWave * 0.3;
    pos.z += totalDisplacement;

    // Rotaciones sencillas
    float angleX = uScrollProgress * 0.1 * 3.14159;
    float angleY = uScrollProgress * 0.2 * 3.14159;
    float cosX = cos(angleX);
    float sinX = sin(angleX);
    float cosY = cos(angleY);
    float sinY = sin(angleY);

    // rotar en X
    float y1 = pos.y*cosX - pos.z*sinX;
    float z1 = pos.y*sinX + pos.z*cosX;
    pos.y = y1; pos.z = z1;

    // rotar en Y
    float x2 = pos.x*cosY + pos.z*sinY;
    float z2 = -pos.x*sinY + pos.z*cosY;
    pos.x = x2; pos.z = z2;

    // Pequeño zoom
    pos.xy *= (1.0 + uScrollProgress*0.2);

    vElevation = noiseValue;
    vDistortion = mouseInfluence + abs(scrollEffect)*0.3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uRGBShift;
  uniform vec3 uSecondaryColor;
  uniform float uScrollProgress;
  uniform float uRadialIntensity;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  vec3 rgbShift(sampler2D tex, vec2 uv, vec2 offset){
    float r = texture2D(tex, uv+offset).r;
    vec2 gb = texture2D(tex,uv).gb;
    return vec3(r,gb);
  }

  void main(){
    float rgbShiftAmount = uRGBShift*(1.0+vDistortion*2.0);
    rgbShiftAmount *= (1.0 + uScrollProgress*2.0);

    vec2 offset = rgbShiftAmount * vec2(
      cos(uTime*0.2 + uScrollProgress*3.14),
      sin(uTime*0.2 + uScrollProgress*3.14)
    );
    vec3 color = rgbShift(uTexture, vUv, offset);

    // Mezclar color base
    vec3 scrollColor = mix(uColor, uSecondaryColor, uScrollProgress);
    color = mix(color, scrollColor, 0.25 + uScrollProgress*0.25);

    // Añadir algo de elevación
    color += vElevation * uSecondaryColor * 0.2;

    // Añadir saturación si quieres (uRadialIntensity)
    color += color*(uRadialIntensity*0.1);

    gl_FragColor = vec4(color,1.0);
  }
`;

// Material
type RadialWarpMaterialImpl = THREE.ShaderMaterial & {
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
};

const RadialWarpMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 3.0,
    uAmplitude: 0.2,
    uRadialIntensity: 0.2,
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.01,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uScrollProgress: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ RadialWarpMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      radialWarpMaterial: ReactThreeFiber.Object3DNode<
        RadialWarpMaterialImpl,
        typeof RadialWarpMaterial
      >;
    }
  }
}

function MeshWithOverlay({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

function FloatingImageRadial() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<RadialWarpMaterialImpl>(null);
  const { mouse, viewport, size } = useThree();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.initialY = meshRef.current.position.y;
    }
  }, []);

  useEffect(() => {
    if (!matRef.current) return;

    gsap.from(matRef.current, {
      uAmplitude: 0,
      duration: 2,
      ease: "power3.out",
    });

    // Iniciar scroll controller local
    RadialWarpController.init(meshRef, matRef);

    return () => {
      RadialWarpController.destroy();
    };
  }, []);

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime();
      matRef.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
    }
  });

  const geometry = useMemo(() => new THREE.PlaneGeometry(3, 2, 16, 16), []);
  const baseScale = 0.4;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;
  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  const [texture] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1673526759317-be71a1243e3d?q=80&w=3432&auto=format&fit=crop",
  ]);

  return (
    <MeshWithOverlay>
      <mesh
        ref={meshRef}
        scale={[responsiveScale, responsiveScale, responsiveScale]}
        position={[0, yOffset, 0]}
      >
        <primitive object={geometry} attach="geometry" />
        <radialWarpMaterial
          ref={matRef}
          uTexture={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </MeshWithOverlay>
  );
}

function RadialWarpScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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
      { opacity: 1, duration: 1, ease: "power2.out" }
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
        }}
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, isMobile ? 3 : 2.5],
          fov: isMobile ? 35 : 30,
          near: 0.1,
          far: 1000,
        }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <FloatingImageRadial />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(RadialWarpScene);
