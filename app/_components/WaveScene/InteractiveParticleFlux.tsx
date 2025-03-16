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
import styles from "./InteractiveParticleFlux.module.scss";
const cx = classNames.bind(styles);

// Colores de la aplicación
const COLORS = {
  primary: "#26225F",
  secondary: "#4f46e5",
  tertiary: "#000000",
};

// Vertex shader con efecto de desplazamiento de partículas mejorado
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
    
    // Distorsión basada en la cercanía al mouse (más intensa)
    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.6, 0.0, mouseDistance);
    
    // Patrón complejo de olas
    vec3 pos = position;
    float noiseScale = 0.9;
    float noiseTime = uTime * 0.4;
    
    // Combinamos múltiples capas de ruido para más detalle
    float noiseValue1 = snoise(vec3(vUv * uFrequency, noiseTime)) * uAmplitude;
    float noiseValue2 = snoise(vec3(vUv * uFrequency * 2.0, noiseTime * 1.5)) * uAmplitude * 0.5;
    float noiseValue = noiseValue1 + noiseValue2;
    
    // Aumentar distorsión cerca del mouse
    noiseValue *= (1.0 + mouseInfluence * 3.0);
    
    // Aplicar al eje Z con mayor intensidad
    pos.z += noiseValue;
    
    // Aplicar distorsión sutil a X e Y con mayor efecto
    pos.x += noiseValue * 0.15;
    pos.y += noiseValue * 0.15;
    
    vElevation = noiseValue;
    vDistortion = mouseInfluence;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader con efecto de separación RGB mejorado
const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uRGBShift;
  uniform vec3 uSecondaryColor;
  
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;
  
  vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
    float r = texture2D(textureImage, uv + offset).r;
    float g = texture2D(textureImage, uv + offset * 0.75).g;
    float b = texture2D(textureImage, uv).b;
    return vec3(r, g, b);
  }
  
  void main() {
    float rgbShiftAmount = uRGBShift * (1.0 + vDistortion * 3.0);
    vec2 offset = rgbShiftAmount * vec2(cos(uTime * 0.2), sin(uTime * 0.3));
    vec3 color = rgbShift(uTexture, vUv, offset);
    color = mix(color, uColor, 0.3);
    color += vElevation * uSecondaryColor * 0.25;
    color += vDistortion * vec3(0.1, 0.1, 0.2);
    vec2 center = vec2(0.5, 0.5);
    float dist = length(vUv - center);
    float vignette = smoothstep(0.85, 0.2, dist);
    vec3 blackColor = vec3(0.0, 0.0, 0.0);
    color = mix(blackColor, color, vignette);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const ParticleFlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 4.5,
    uAmplitude: 0.35,
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.02,
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
      particleFlowMaterial: ReactThreeFiber.Object3DNode<
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
        typeof ParticleFlowMaterial
      >;
    }
  }
}

function FloatingImage() {
  const ref = useRef<any>(null);
  const { mouse, viewport, size } = useThree();

  useEffect(() => {
    if (ref.current) {
      gsap.from(ref.current, {
        uFrequency: 1.0,
        uAmplitude: 0.1,
        duration: 2,
        ease: "power3.out",
      });

      gsap.to(ref.current, {
        uFrequency: 4.5,
        uAmplitude: 0.35,
        duration: 3,
        ease: "power2.out",
      });

      gsap.to(ref.current, {
        uRGBShift: 0.05,
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
      const mouseX = mouse.x * 0.5 + 0.5;
      const mouseY = -mouse.y * 0.5 + 0.5;
      ref.current.uMouse.x += (mouseX - ref.current.uMouse.x) * 0.1;
      ref.current.uMouse.y += (mouseY - ref.current.uMouse.y) * 0.1;
    }
  });

  const baseScale = 0.45;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(3, 2, 48, 48);
  }, []);

  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  const [texture, textureError] = useLoader(
    THREE.TextureLoader,
    [
      // "https://images.unsplash.com/photo-1734917141553-274732d788cb?q=80&w=3506&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // "https://plus.unsplash.com/premium_photo-1741030501566-e0183860a80f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      // "/images/shader-image.png",
      // "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=2070",
      // "https://images.pexels.com/photos/29586678/pexels-photo-29586678/free-photo-of-abstract-blue-digital-art-landscape-for-desktop.jpeg",
      // "https://images.pexels.com/photos/29506609/pexels-photo-29506609/free-photo-of-abstract-neon-light-on-dark-background.jpeg",
      // "https://images.pexels.com/photos/29506609/pexels-photo-29506609/free-photo-of-abstract-neon-light-on-dark-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // "https://images.pexels.com/photos/6985126/pexels-photo-6985126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // "https://images.pexels.com/photos/11513053/pexels-photo-11513053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // "https://images.pexels.com/photos/10837305/pexels-photo-10837305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // "https://images.pexels.com/photos/29506611/pexels-photo-29506611/free-photo-of-colorful-abstract-digital-art-with-gradients.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // "https://images.pexels.com/photos/7629313/pexels-photo-7629313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // "https://images.pexels.com/photos/7577910/pexels-photo-7577910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      // "https://images.unsplash.com/photo-1673526759327-54f1f5b27322?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      <particleFlowMaterial
        ref={ref}
        uTexture={texture}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function InteractiveParticleFlux() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
        }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cx("container")}
      style={{ backgroundColor: "black" }}
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
        <ambientLight intensity={0.6} />
        <spotLight
          position={[5, 5, 5]}
          intensity={1.0}
          color={COLORS.secondary}
          distance={8}
          angle={0.5}
          penumbra={0.8}
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
