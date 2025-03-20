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
import styles from "./ChromaticRippleScene.module.scss"; // Ajusta la ruta
import LiquidFlowController from "./FragmentationController";

const cx = classNames.bind(styles);

const COLORS = {
  primary: "#0077B6", // un azul marino
  secondary: "#00B4D8", // un turquesa claro
};

// ------------------------------------------------------
// Liquid Flow Shaders
// ------------------------------------------------------
const vertexShader = `
  uniform float uTime;
  uniform float uFlowIntensity;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;

  // noise placeholder
  float snoise(vec3 v){ return 0.0; }

  void main(){
    vUv=uv;

    // Desplazar la posición en Z basado en ruido y "uFlowIntensity"
    vec3 pos=position;

    float wave=sin(vUv.y*10.0 + uTime*2.0)*(uFlowIntensity*0.2);
    pos.z+= wave;

    // Pequeño "hundimiento" según scroll
    pos.y+= sin(uScrollProgress*3.14)*0.2 * uFlowIntensity;

    // Ruido extra, si deseas
    float n=snoise(vec3(vUv*5.0, uTime*0.3));
    pos.z+= n*uFlowIntensity*0.3;

    // Zoom leve con scroll
    pos.xy*= (1.0+uScrollProgress*0.2);

    // Rotación X e Y sencillas
    pos.yz = mat2(cos(uScrollProgress*0.5), -sin(uScrollProgress*0.5),
                  sin(uScrollProgress*0.5), cos(uScrollProgress*0.5)) * pos.yz;
    pos.xz = mat2(cos(uScrollProgress*0.3), -sin(uScrollProgress*0.3),
                  sin(uScrollProgress*0.3), cos(uScrollProgress*0.3)) * pos.xz;

    vElevation=n;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uSecondaryColor;
  uniform sampler2D uTexture;
  uniform float uScrollProgress;
  uniform float uFlowIntensity;
  varying vec2 vUv;
  varying float vElevation;

  // Un swirl / liquid displacement
  vec2 swirl(vec2 uv, float amount){
    // centro
    vec2 center=vec2(0.5);
    vec2 offset=uv-center;
    float r=length(offset);
    float angle=atan(offset.y,offset.x);
    angle+=r*amount;
    offset=vec2(cos(angle), sin(angle))*r;
    return center+offset;
  }

  void main(){
    // Swirl con base en uFlowIntensity
    vec2 uvSwirl=swirl(vUv, uFlowIntensity*0.3);

    // Scroll gating: cuando scroll es > 0.5, swirl se incrementa
    float swirlFactor= (uScrollProgress>0.5)? (uFlowIntensity*0.6) : (uFlowIntensity*0.3);

    uvSwirl= swirl(uvSwirl, swirlFactor);

    // Cargar la textura base
    vec4 baseColor= texture2D(uTexture, uvSwirl);

    // Mezclar con color principal
    vec3 finalColor= mix(baseColor.rgb, uColor, 0.2);

    // Añadir highlight a las partes con "vElevation" alto
    float highlight= smoothstep(0.0, 0.3, vElevation);
    finalColor= mix(finalColor, uSecondaryColor, highlight*0.2);

    // Pequeña saturación adicional con scroll
    float satFactor=1.0 + uScrollProgress*0.3;
    float avg=(finalColor.r+finalColor.g+finalColor.b)/3.0;
    finalColor= mix(vec3(avg), finalColor, satFactor);

    gl_FragColor= vec4(finalColor,1.0);
  }
`;

// ------------------------------------------------------
// Definición del Material
// ------------------------------------------------------
type LiquidFlowMaterialImpl = THREE.ShaderMaterial & {
  uTime: number;
  uFlowIntensity: number;
  uColor: THREE.Color;
  uSecondaryColor: THREE.Color;
  uTexture: THREE.Texture;
  uScrollProgress: number;
};

const LiquidFlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uFlowIntensity: 1.0,
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uScrollProgress: 0.0,
  },
  vertexShader,
  fragmentShader
);

extend({ LiquidFlowMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidFlowMaterial: ReactThreeFiber.Object3DNode<
        LiquidFlowMaterialImpl,
        typeof LiquidFlowMaterial
      >;
    }
  }
}

// ------------------------------------------------------
// Componente contenedor
// ------------------------------------------------------
function MeshWithOverlay({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

// ------------------------------------------------------
// FloatingImageLiquid
// ------------------------------------------------------
function FloatingImageLiquid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<LiquidFlowMaterialImpl>(null);
  const { clock, viewport, size } = useThree();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.initialY = meshRef.current.position.y;
    }
  }, []);

  useEffect(() => {
    if (!matRef.current) return;
    gsap.from(matRef.current, {
      uFlowIntensity: 0,
      duration: 2,
      ease: "power3.out",
    });

    // Iniciamos el scroll
    LiquidFlowController.init(meshRef, matRef);

    return () => {
      LiquidFlowController.destroy();
    };
  }, []);

  useFrame(() => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime();
    }
  });

  const geometry = useMemo(() => new THREE.PlaneGeometry(3, 2, 16, 16), []);
  const baseScale = 0.4;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;
  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  const [texture] = useLoader(THREE.TextureLoader, [
    // Usa cualquier imagen o textura interesante
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
        <liquidFlowMaterial
          ref={matRef}
          uTexture={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </MeshWithOverlay>
  );
}

// ------------------------------------------------------
// Escena principal
// ------------------------------------------------------
function LiquidFlowScene() {
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
          <FloatingImageLiquid />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(LiquidFlowScene);
