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

// Controlador con la escala reducida
// import PrismaticGlassController from "./FluidRippleController";
import PrismaticGlassController from "./GlassController";
// import PrismaticGlassController from "./NarrativeFlowController";
// import PrismaticGlassController from "./DimensionalTransitionController";

const cx = classNames.bind(styles);

const COLORS = {
  primary: "#26225F",
  secondary: "#4f46e5",
};

// ---------------------
// Vertex Shader
// (sin "zoom" en pos.xy)
// ---------------------
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // noise ...
  float snoise(vec3 v){
    return 0.0; // placeholder
  }

  void main(){
    vUv= uv;

    float mouseDistance= length(uMouse- vUv);
    float mouseInfluence= smoothstep(0.5,0.0,mouseDistance);

    float scrollEffect= uScrollProgress*2.0 -1.0;
    float scrollFrequency= uFrequency*(1.0+ scrollEffect*0.5);

    vec3 pos= position;

    float noiseValue= snoise(vec3(vUv* scrollFrequency, uTime*0.5 + uScrollProgress))* uAmplitude;
    noiseValue*= (1.0 + mouseInfluence*2.0);

    pos.z+= noiseValue*(1.0 + abs(scrollEffect)*0.5);

    // rotaciones
    float angleX= uScrollProgress*0.1*3.14159;
    float angleY= uScrollProgress*0.2*3.14159;
    float cosX=cos(angleX), sinX= sin(angleX);
    float cosY=cos(angleY), sinY= sin(angleY);

    float y1= pos.y*cosX -pos.z*sinX;
    float z1= pos.y*sinX +pos.z*cosX;
    pos.y= y1; pos.z= z1;

    float x2= pos.x*cosY + pos.z*sinY;
    float z2= -pos.x*sinY + pos.z*cosY;
    pos.x= x2; pos.z= z2;

    // wave horizontal
    float storyWave= sin(vUv.y*10.0 + uScrollProgress*10.0)*0.05*uScrollProgress;
    pos.x+= storyWave;

    vElevation= noiseValue;
    vDistortion= mouseInfluence + abs(scrollEffect)*0.3;

    gl_Position= projectionMatrix* modelViewMatrix* vec4(pos,1.0);
  }
`;

// ---------------------
// Fragment Shader
// (aquí el fix de "uTexture", no "tex")
// ---------------------
const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture; // OJO: sampler2D uTexture
  uniform float uRGBShift;
  uniform vec3 uSecondaryColor;
  uniform float uScrollProgress;

  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // rgbShift function
  vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset){
    float r= texture2D(textureImage, uv+ offset).r;
    vec2 gb= texture2D(textureImage, uv).gb;
    return vec3(r,gb);
  }

  void main(){
    float rgbShiftAmount= uRGBShift*(1.0+ vDistortion*2.0);
    rgbShiftAmount*= (1.0+uScrollProgress*2.0);

    vec2 offset= rgbShiftAmount* vec2(
      cos(uTime*0.2 + uScrollProgress*3.14159),
      sin(uTime*0.2 + uScrollProgress*3.14159)
    );

    vec2 animatedUV= vUv;
    animatedUV.x+= sin(vUv.y*10.0 + uTime*0.5+ uScrollProgress*3.14159)*0.02*uScrollProgress;
    animatedUV.y+= cos(vUv.x*10.0 + uTime*0.5+ uScrollProgress*3.14159)*0.02*uScrollProgress;

    // Asegurarse de llamar a "rgbShift(uTexture, ...)", no "tex"
    vec3 color= rgbShift(uTexture, animatedUV, offset);

    // Mezclar color con scroll
    vec3 scrollColor= mix(uColor, uSecondaryColor, uScrollProgress);
    color= mix(color, scrollColor, 0.25+ 0.25*uScrollProgress);

    // Destello
    color+= vElevation* uSecondaryColor* 0.2 * (0.2+ uScrollProgress*0.3);

    // Viñeta
    vec2 center= vec2(0.5,0.5);
    center.y+= uScrollProgress*0.2;
    float d= length(vUv- center);
    float vign= smoothstep(0.8- uScrollProgress*0.3, 0.2+uScrollProgress*0.3, d);
    color= mix(vec3(0.0),color,vign);

    // Flashes
    float f1= smoothstep(0.2,0.3,uScrollProgress)- smoothstep(0.3,0.4,uScrollProgress);
    float f2= smoothstep(0.6,0.7,uScrollProgress)- smoothstep(0.7,0.8,uScrollProgress);
    float flash= f1+f2;
    color+= flash* vec3(0.3,0.2,0.6);

    // halo
    float sceneTransition= smoothstep(0.45,0.55,uScrollProgress);
    float halo= sin(uScrollProgress*6.283185)*0.5+0.5;
    color+= halo*vDistortion* vec3(0.1,0.2,0.4)* sceneTransition;

    gl_FragColor= vec4(color,1.0);
  }
`;

// Tipo TS
export type PrismaticGlassMaterialImpl = THREE.ShaderMaterial & {
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

// Crear material con "shaderMaterial"
const PrismaticGlassMaterial = shaderMaterial(
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
  },
  vertexShader,
  fragmentShader
);

extend({ PrismaticGlassMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      prismaticGlassMaterial: ReactThreeFiber.Object3DNode<
        PrismaticGlassMaterialImpl,
        typeof PrismaticGlassMaterial
      >;
    }
  }
}

function MeshWithOverlay({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

function FloatingImagePrismatic() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<PrismaticGlassMaterialImpl>(null);
  const { mouse, viewport, size } = useThree();

  // Guardar posición inicial
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.initialY = meshRef.current.position.y;
    }
  }, []);

  // Montaje: init el scroll
  useEffect(() => {
    if (!matRef.current) return;
    gsap.from(matRef.current, {
      uAmplitude: 0,
      duration: 2,
      ease: "power3.out",
    });
    PrismaticGlassController.init(meshRef, matRef);

    return () => {
      PrismaticGlassController.destroy();
    };
  }, []);

  // Frame loop
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime();
      matRef.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
    }
  });

  // Geometría
  const geometry = useMemo(() => new THREE.PlaneGeometry(3, 2, 16, 16), []);
  const baseScale = 0.4;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;
  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  // Cargar textura
  const [texture] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1673526759317-be71a1243e3d?auto=format&fit=crop&w=3432&q=80",
    // "/images/home/hero-bg.svg",
  ]);

  return (
    <MeshWithOverlay>
      <mesh
        ref={meshRef}
        scale={[responsiveScale, responsiveScale, responsiveScale]}
        position={[0, yOffset, 0]}
      >
        <primitive object={geometry} attach="geometry" />
        <prismaticGlassMaterial
          ref={matRef}
          uTexture={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </MeshWithOverlay>
  );
}

function PrismaticGlass() {
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
          <FloatingImagePrismatic />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(PrismaticGlass);
