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
// Ajusta la ruta al archivo SCSS donde tengas tus estilos
import styles from "./ChromaticRippleScene.module.scss";
import FragmentationController from "./FragmentationController";

const cx = classNames.bind(styles);

const COLORS = {
  primary: "#26225F",
  secondary: "#4f46e5",
};

// Vertex Shader (mismo que usas normalmente, con snoise placeholder)
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform vec2 uMouse;
  uniform float uScrollProgress;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // Placeholder
  float snoise(vec3 v){
    return 0.0;
  }

  void main(){
    vUv = uv;
    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance);

    float scrollEffect = uScrollProgress * 2.0 - 1.0;
    float scrollFrequency = uFrequency * (1.0 + scrollEffect * 0.5);

    vec3 pos = position;
    float noiseValue = snoise(vec3(vUv * scrollFrequency, uTime * 0.5)) * uAmplitude;
    noiseValue *= (1.0 + mouseInfluence * 2.0);

    pos.z += noiseValue;

    // Rotaciones
    float angleX = uScrollProgress * 0.1 * 3.14159;
    float angleY = uScrollProgress * 0.2 * 3.14159;
    float cosX = cos(angleX);
    float sinX = sin(angleX);
    float cosY = cos(angleY);
    float sinY = sin(angleY);

    float y1 = pos.y * cosX - pos.z * sinX;
    float z1 = pos.y * sinX + pos.z * cosX;
    pos.y = y1; 
    pos.z = z1;

    float x2 = pos.x * cosY + pos.z * sinY;
    float z2 = -pos.x * sinY + pos.z * cosY;
    pos.x = x2; 
    pos.z = z2;

    // Pequeño zoom
    pos.xy *= (1.0 + 0.2 * uScrollProgress);

    vElevation = noiseValue;
    vDistortion = mouseInfluence + abs(scrollEffect) * 0.3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
  }
`;

// Fragment Shader (Versión A: un solo valor random para x e y)
const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uRGBShift;
  uniform vec3 uSecondaryColor;
  uniform float uScrollProgress;
  uniform float uFragmentIntensity;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  float rand2D(vec2 p){
    return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);
  }

  vec3 rgbShift(sampler2D tex, vec2 uv, vec2 offset){
    float r = texture2D(tex, uv + offset).r;
    vec2 gb = texture2D(tex, uv).gb;
    return vec3(r, gb);
  }

  void main(){
    float shiftAmt = uRGBShift * (1.0 + vDistortion * 2.0);
    shiftAmt *= (1.0 + uScrollProgress * 2.0);

    // Definimos 10 celdas en X e Y
    float cells = 10.0;
    vec2 cellCoord = floor(vUv * cells);
    vec2 cellUV   = fract(vUv * cells);

    // random base
    float rnd = rand2D(cellCoord);

    // Versión A:
    // Aplica el mismo valor para x e y en 'offset'
    float offsetVal = (rnd - 0.5) * 0.3 * uFragmentIntensity;
    vec2 offset = vec2(offsetVal);  // <- IGUAL para x e y

    cellUV += offset;
    vec2 finalUV = (cellCoord + cellUV) / cells;

    // Shift para glitch
    vec2 shiftOffset = shiftAmt * vec2(
      cos(uTime * 0.2 + uScrollProgress * 3.14),
      sin(uTime * 0.2 + uScrollProgress * 3.14)
    );

    vec3 color = rgbShift(uTexture, finalUV, shiftOffset);

    vec3 scrollColor = mix(uColor, uSecondaryColor, uScrollProgress);
    color = mix(color, scrollColor, 0.25 + 0.25 * uScrollProgress);

    // Añadimos algo de "destello" segun elevación
    color += vElevation * uSecondaryColor * 0.2;

    // Disolver si la celda se sale mucho
    float distFromCenter = length(offset);
    float alpha = 1.0 - smoothstep(0.15, 0.3, distFromCenter);

    gl_FragColor = vec4(color, alpha);
  }
`;

// Tipo del material
type FragmentMaterialImpl = THREE.ShaderMaterial & {
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
};

// Creamos el material
const FragmentMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 3.0,
    uAmplitude: 0.2,
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.01,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uScrollProgress: 0.0,
    uFragmentIntensity: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ FragmentMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      fragmentMaterial: ReactThreeFiber.Object3DNode<
        FragmentMaterialImpl,
        typeof FragmentMaterial
      >;
    }
  }
}

function MeshWithOverlay({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

function FloatingImageFragmented() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<FragmentMaterialImpl>(null);
  const { mouse, viewport, size } = useThree();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.initialY = meshRef.current.position.y;
    }
  }, []);

  useEffect(() => {
    if (!matRef.current) return;
    // Animación inicial
    gsap.from(matRef.current, { uAmplitude: 0, duration: 2 });

    // Iniciar Scroll Controller
    FragmentationController.init(meshRef, matRef);

    return () => {
      FragmentationController.destroy();
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
        <fragmentMaterial
          ref={matRef}
          uTexture={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </MeshWithOverlay>
  );
}

function FragmentationScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
          <FloatingImageFragmented />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(FragmentationScene);
