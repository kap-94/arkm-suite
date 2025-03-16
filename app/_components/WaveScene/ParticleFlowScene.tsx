"use client";

import * as THREE from "three";
import React, { useRef, useMemo, Suspense, useEffect } from "react";
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
import styles from "./ParticleFlowScene.module.scss";
const cx = classNames.bind(styles);

// Vertex shader con efecto de desplazamiento de partículas
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  // Función de ruido mejorada
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    // Primera esquina
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    // Otras esquinas
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    // Permutaciones
    i = mod289(i);
    vec4 p = permute(
      permute(
        permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0)
        ) + i.y + vec4(0.0, i1.y, i2.y, 1.0)
      ) + i.x + vec4(0.0, i1.x, i2.x, 1.0)
    );

    // Gradientes
    float n_ = 0.142857142857; // 1.0/7.0
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    // Normalizar gradientes
    vec4 norm = taylorInvSqrt(vec4(
      dot(p0, p0),
      dot(p1, p1),
      dot(p2, p2),
      dot(p3, p3)
    ));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Combinar el valor final de ruido
    vec4 m = max(
      0.6 - vec4(
        dot(x0, x0),
        dot(x1, x1),
        dot(x2, x2),
        dot(x3, x3)
      ), 0.0
    );
    m = m * m;
    return 42.0 * dot(m*m, vec4(
      dot(p0, x0),
      dot(p1, x1),
      dot(p2, x2),
      dot(p3, x3)
    ));
  }

  void main() {
    vUv = uv;
    
    // Distorsión basada en la cercanía al mouse
    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance);
    
    // Patrón complejo de olas
    vec3 pos = position;
    float noiseScale = 0.8;
    float noiseTime = uTime * 0.5;
    
    // Distorsión principal basada en ruido simplex 3D
    float noiseValue = snoise(vec3(vUv * uFrequency, noiseTime)) * uAmplitude;
    
    // Aumentar distorsión cerca del mouse
    noiseValue *= (1.0 + mouseInfluence * 2.0);
    
    // Aplicar al eje Z
    pos.z += noiseValue;
    
    // Aplicar distorsión sutil a X e Y
    pos.x += noiseValue * 0.1;
    pos.y += noiseValue * 0.1;
    
    vElevation = noiseValue;
    vDistortion = mouseInfluence;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader con efecto de separación RGB
const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uRGBShift;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;
  
  vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
    float r = texture2D(textureImage, uv + offset).r;
    vec2 gb = texture2D(textureImage, uv).gb;
    return vec3(r, gb);
  }
  
  void main() {
    // Cantidad de desplazamiento RGB dinámica
    float rgbShiftAmount = uRGBShift * (1.0 + vDistortion * 2.0);
    
    // Offset dinámico para el RGB shift
    vec2 offset = rgbShiftAmount * vec2(cos(uTime * 0.2), sin(uTime * 0.2));
    
    // Tomar la textura con el efecto de desplazamiento RGB
    vec3 color = rgbShift(uTexture, vUv, offset);
    
    // Ajuste de color sutil basado en elevación
    color.r += vElevation * 0.1;
    color.b -= vElevation * 0.1;
    
    // Efecto de viñeta
    vec2 center = vec2(0.5, 0.5);
    float dist = length(vUv - center);
    float vignette = smoothstep(0.8, 0.2, dist);
    
    color = mix(color * 0.7, color, vignette);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const ParticleFlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 3.0,
    uAmplitude: 0.2,
    uColor: new THREE.Color("#6366f1"),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.01,
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  vertexShader,
  fragmentShader
);

extend({ ParticleFlowMaterial });

// Actualizamos la declaración de tipos
declare global {
  namespace JSX {
    interface IntrinsicElements {
      shaderMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial & {
          uTime: number;
          uFrequency: number;
          uAmplitude: number;
          uColor: THREE.Color;
          uTexture: THREE.Texture;
          uRGBShift: number;
          uMouse: THREE.Vector2;
        },
        typeof ParticleFlowMaterial
      >;
    }
  }
}

function FloatingImage() {
  const ref = useRef<any>(null);
  const { mouse } = useThree();

  useEffect(() => {
    if (ref.current) {
      // Animación inicial
      gsap.from(ref.current, {
        uFrequency: 0.5,
        uAmplitude: 0.05,
        duration: 2,
        ease: "power3.out",
      });

      // Animación continua sutil (efecto "yoyo")
      gsap.to(ref.current, {
        uRGBShift: 0.03,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime();
      ref.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
    }
  });

  // Geometría memorizada para mejorar rendimiento
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(3, 2, 32, 32);
  }, []);

  // Cargamos la textura
  const [texture] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=2070",
  ]);

  return (
    <mesh>
      <primitive object={geometry} attach="geometry" />
      <particleFlowMaterial
        ref={ref}
        uTexture={texture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function ParticleFlowScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animación para el contenedor
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Efecto de "respiración" sutil (cambio de sombra)
      gsap.to(containerRef.current, {
        boxShadow: "0 20px 70px rgba(80, 60, 220, 0.3)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <div ref={containerRef} className={cx("container")}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        // Configuramos la cámara desde aquí
        camera={{
          position: [0, 0, 2.5],
          fov: 30,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} intensity={0.8} />
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
