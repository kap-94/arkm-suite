"use client";

import * as THREE from "three";
import React, { useRef, useMemo, Suspense, useEffect, useState } from "react";
import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { shaderMaterial, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import classNames from "classnames/bind";
import styles from "./NeonLinesScene.module.scss";
const cx = classNames.bind(styles);

// Colores de la aplicación
const COLORS = {
  primary: "#26225F",
  secondary: "#4f46e5",
  tertiary: "#000000",
};

// Vertex shader con efecto minimalista de líneas
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;
  varying vec3 vPosition;

  // Función de ruido simplificada para rendimiento
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    return mix(
      mix(
        mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x),
        f.y
      ),
      mix(
        mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
        mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x),
        f.y
      ),
      f.z
    );
  }

  void main() {
    vUv = uv;
    
    // Crear líneas horizontales
    float linePattern = step(0.98, sin(vUv.y * 80.0)); // Líneas muy finas
    
    // Distorsión basada en el mouse
    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDistance);
    
    // Aplicar distorsión
    vec3 pos = position;
    float noiseValue = noise(vec3(vUv * uFrequency, uTime * 0.3)) * uAmplitude;
    
    // Distorsión sólo en las líneas
    float elevation = noiseValue * (linePattern * 1.0 + 0.1);
    elevation *= (1.0 + mouseInfluence * 5.0);
    
    // Aplicar desplazamiento
    pos.z += elevation;
    
    vElevation = elevation;
    vDistortion = mouseInfluence;
    vPosition = pos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader minimalista con líneas
const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uRGBShift;
  uniform vec3 uSecondaryColor;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;
  varying vec3 vPosition;
  
  void main() {
    // Patrón de líneas
    float linePattern = step(0.98, sin(vUv.y * 80.0));
    
    // Colores base basados en la textura
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Mezcla de colores minimalista
    vec3 baseColor = vec3(0.02, 0.02, 0.05); // Casi negro con tono azulado
    
    // Añadir líneas sutiles con brillo
    vec3 lineColor = mix(uSecondaryColor, uColor, sin(uTime * 0.2) * 0.5 + 0.5);
    lineColor *= 0.9 + 0.1 * sin(uTime + vUv.x * 10.0);
    
    // Color final
    vec3 finalColor = mix(baseColor, lineColor, linePattern * (0.8 + vElevation));
    
    // Añadir destello donde se hace clic con el mouse
    finalColor += vDistortion * vec3(0.6, 0.7, 1.0) * 0.7;
    
    gl_FragColor = vec4(finalColor, 0.7 + 0.3 * linePattern);
  }
`;

const NeonLinesMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 5.0,
    uAmplitude: 0.3,
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.02,
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  vertexShader,
  fragmentShader
);

extend({ NeonLinesMaterial });

// Actualizamos la declaración de tipos
declare global {
  namespace JSX {
    interface IntrinsicElements {
      neonLinesMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial & {
          uTime: number;
          uFrequency: number;
          uAmplitude: number;
          uColor: THREE.Color;
          uSecondaryColor: THREE.Color;
          uTexture: THREE.Texture;
          uRGBShift: number;
          uMouse: THREE.Vector2;
        },
        typeof NeonLinesMaterial
      >;
    }
  }
}

function FloatingImage() {
  const ref = useRef<any>(null);
  const { mouse, viewport, size } = useThree();

  useEffect(() => {
    if (ref.current) {
      // Animación inicial con más contraste
      gsap.from(ref.current, {
        uFrequency: 1.0,
        uAmplitude: 0.05,
        duration: 2,
        ease: "power3.out",
      });

      // Aumentar valores gradualmente
      gsap.to(ref.current, {
        uFrequency: 5.0,
        uAmplitude: 0.3,
        duration: 2.5,
        ease: "power2.out",
      });

      // Animación sutil continua
      gsap.to(ref.current, {
        uRGBShift: 0.04,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime();
      // Suavizar movimiento del mouse
      const mouseX = mouse.x * 0.5 + 0.5;
      const mouseY = -mouse.y * 0.5 + 0.5;
      ref.current.uMouse.x += (mouseX - ref.current.uMouse.x) * 0.1;
      ref.current.uMouse.y += (mouseY - ref.current.uMouse.y) * 0.1;
    }
  });

  // Escala adaptativa
  const baseScale = 0.45;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;

  // Geometría con subdivisiones optimizadas para líneas
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(3, 2, 1, 80); // Más subdivisiones verticales para las líneas
  }, []);

  // Posición alineada con el borde superior
  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  // Cargar textura
  const [texture, textureError] = useLoader(
    THREE.TextureLoader,
    [
      "https://images.pexels.com/photos/7233353/pexels-photo-7233353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    undefined,
    (err) => {
      console.error("Error cargando textura:", err);
    }
  );

  return (
    <mesh
      scale={[responsiveScale, responsiveScale, responsiveScale]}
      position={[0, yOffset, 0]}
    >
      <primitive object={geometry} attach="geometry" />
      <neonLinesMaterial
        ref={ref}
        uTexture={texture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function NeonLinesScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar dispositivos móviles
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Animación de entrada
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
        }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cx("container")}
      style={{
        backgroundColor: "black",
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{
          alpha: true,
          antialias: !isMobile,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 0, isMobile ? 2.8 : 2.3],
          fov: isMobile ? 36 : 32,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, Math.min(2, window.devicePixelRatio)]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <spotLight
          position={[5, 5, 5]}
          intensity={0.8}
          color={COLORS.secondary}
          distance={10}
          angle={0.4}
          penumbra={0.9}
        />
        <Suspense fallback={null}>
          <FloatingImage />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
