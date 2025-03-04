"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  shaderMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import useMousePosition from "@/hooks/useMousePosition";

// Shader para cintas fluidas que reaccionan al mouse
const RibbonVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vColor;
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRibbonIndex;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  
  // Noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    // First corner
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    // Permutations
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
             
    // Gradients
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
  
  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Parámetros de onda
    float wavelength = 4.0;
    float amplitude = uAmplitude;
    float speed = 1.5;
    
    // Desfase entre cintas
    float ribbonPhase = uRibbonIndex * 0.2;
    
    // Posición base
    vec3 pos = position;
    
    // Factores para controlar la distorsión
    float mouseDistance = length(uv.x - uMouse.x);
    float mouseInfluence = smoothstep(1.0, 0.0, mouseDistance) * 0.5;
    
    // Efecto de onda principal
    float waveX = sin(pos.x * uFrequency + uTime * speed + ribbonPhase) * amplitude;
    float waveZ = cos(pos.x * uFrequency * 0.5 + uTime * speed * 0.7 + ribbonPhase) * amplitude * 0.5;
    
    // Añadir variabilidad con ruido 3D
    float noiseScale = 0.3;
    float noiseFactor = snoise(vec3(pos.x * 2.0, pos.y * 2.0, uTime * 0.1 + ribbonPhase)) * noiseScale;
    
    // Aplicar desplazamiento
    pos.y += waveX + noiseFactor;
    pos.z += waveZ + noiseFactor * 0.5;
    
    // Aplicar influencia del ratón
    pos.y += mouseInfluence * sin(uTime + pos.x * 4.0 + ribbonPhase) * 0.3;
    
    // Color variable a lo largo de la cinta
    float colorFactor = sin(uv.x * 8.0 + uTime * 0.5 + ribbonPhase) * 0.5 + 0.5;
    float heightFactor = (pos.y + 0.5) * 0.5; // Normalizar altura
    
    // Generar color mezclando tres tonos
    vec3 color1 = mix(uColorA, uColorB, colorFactor);
    vColor = mix(color1, uColorC, heightFactor);
    
    // Añadir brillo en la parte más alta de la onda
    float wavePeak = smoothstep(0.7, 1.0, abs(waveX) / amplitude);
    vColor = mix(vColor, vec3(1.0, 1.0, 1.0), wavePeak * 0.5);
    
    vPosition = pos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const RibbonFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vColor;
  
  uniform float uTime;
  uniform vec2 uMouse;
  
  void main() {
    // Factores para efectos visuales
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    float edgeFactor = pow(abs(vUv.y - 0.5) * 2.0, 2.0);
    
    // Añadir brillo en los bordes
    vec3 edgeGlow = mix(vColor, vec3(1.0), edgeFactor * 0.3);
    
    // Efecto de resplandor pulsante
    vec3 finalColor = mix(edgeGlow, vColor * 1.5, pulse * 0.2);
    
    // Opacidad variable para efectos de transparencia
    float alpha = mix(0.7, 1.0, 1.0 - edgeFactor);
    
    // Añadir brillo a lo largo del eje X para efecto de movimiento
    float xHighlight = smoothstep(0.98, 1.0, sin(vUv.x * 30.0 + uTime * 3.0) * 0.5 + 0.5);
    finalColor += vec3(0.3, 0.3, 1.0) * xHighlight;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// Crear material con shaderMaterial
const RibbonMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uRibbonIndex: 0,
    uFrequency: 2.0,
    uAmplitude: 0.2,
    uColorA: new THREE.Color("#6366F1"), // Indigo
    uColorB: new THREE.Color("#818CF8"), // Light indigo
    uColorC: new THREE.Color("#4F46E5"), // Deep indigo
  },
  RibbonVertexShader,
  RibbonFragmentShader
);

extend({ RibbonMaterial });

// Componente individual de cinta
function Ribbon({
  index,
  ribbonCount,
  frequency,
  amplitude,
  rotation,
  ...props
}) {
  const materialRef = useRef();
  const meshRef = useRef();

  // Actualizar uniforms en cada frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      materialRef.current.uRibbonIndex = index;
    }
  });

  // Geometría para la cinta
  const geometry = useMemo(() => {
    // Crear una cinta con segmentos
    const width = 4;
    const segments = 96;
    const geo = new THREE.PlaneGeometry(width, 0.05, segments, 1);

    // Rotar la geometría según el índice para distribuir las cintas
    geo.rotateX(rotation[0]);
    geo.rotateY(rotation[1]);
    geo.rotateZ(rotation[2]);

    return geo;
  }, [rotation]);

  return (
    <mesh ref={meshRef} geometry={geometry} {...props}>
      <ribbonMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uFrequency={frequency}
        uAmplitude={amplitude}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Sistema de cintas completo
function RibbonSystem({ count = 20 }) {
  const { x, y } = useMousePosition();
  const groupRef = useRef();

  // Dimensiones
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Configuraciones para cada cinta
  const ribbons = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const t = i / count;
      const phase = t * Math.PI * 2;

      return {
        index: i,
        // Posición en forma de espiral
        position: [
          Math.sin(phase) * 0.2 * (1 + t),
          (t - 0.5) * 0.3,
          Math.cos(phase) * 0.2 * (1 + t),
        ],
        // Rotación para orientar la cinta en el espacio
        rotation: [
          Math.PI / 2 + Math.sin(phase) * 0.2,
          phase,
          Math.cos(phase) * 0.1,
        ],
        frequency: 1.5 + t * 2, // Frecuencia aumenta con el índice
        amplitude: 0.15 - t * 0.05, // Amplitud disminuye con el índice
        // Diferentes colores para cada grupo de cintas
        colors: [
          i % 3 === 0 ? "#6366F1" : i % 3 === 1 ? "#818CF8" : "#4F46E5",
          i % 3 === 0 ? "#C7D2FE" : i % 3 === 1 ? "#A5B4FC" : "#818CF8",
          i % 3 === 0 ? "#4F46E5" : i % 3 === 1 ? "#6366F1" : "#4338CA",
        ],
      };
    });
  }, [count]);

  // Actualizar la posición del mouse para todas las cintas
  useFrame(() => {
    if (!groupRef.current) return;

    // Normalizar posición del ratón
    const mouseX = x / dimensions.width || 0.5;
    const mouseY = 1 - (y / dimensions.height || 0.5);

    // Actualizar el uniform de mouse para cada cinta
    groupRef.current.children.forEach((child) => {
      if (child.material && child.material.uniforms) {
        child.material.uniforms.uMouse.value.set(mouseX, mouseY);
      }
    });
  });

  // Añadir rotación al grupo completo
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {ribbons.map((ribbon, i) => (
        <Ribbon
          key={i}
          index={ribbon.index}
          position={ribbon.position}
          rotation={ribbon.rotation}
          frequency={ribbon.frequency}
          amplitude={ribbon.amplitude}
          ribbonCount={count}
        />
      ))}
    </group>
  );
}

// Componente principal
export default function WaveScene() {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 1.5] }}>
      {/* Luces */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#E0E7FF" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#6366F1" />

      {/* Sistema de cintas */}
      <RibbonSystem count={20} />

      {/* Post-procesamiento y fondo */}
      <fog attach="fog" args={["#000", 1, 2.5]} />
    </Canvas>
  );
}
