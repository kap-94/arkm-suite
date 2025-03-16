"use client";

import * as THREE from "three";
import React, { useRef, useState, useEffect, Suspense } from "react";
import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import classNames from "classnames/bind";
import styles from "./LiquidDistortionScene.module.scss";

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRA EL PLUGIN DE SCROLLTRIGGER DE GSAP
// ─────────────────────────────────────────────────────────────────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// VERTEX SHADER
// ─────────────────────────────────────────────────────────────────────────────
const vertexShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uSpeed;
  uniform vec2 uMouse;
  uniform float uMouseIntensity;
  uniform float uScrollProgress;
  
  varying vec2 vUv;
  varying float vDistortion;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  // Curl noise functions for fluid simulation
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
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

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    i = mod289(i);
    vec4 p = permute(
      permute(
        permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0)
        ) + i.y + vec4(0.0, i1.y, i2.y, 1.0)
      ) + i.x + vec4(0.0, i1.x, i2.x, 1.0)
    );

    // Gradients
    float n_ = 0.142857142857; // 1/7
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

    // Normalise gradients
    vec4 norm = taylorInvSqrt(
      vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3))
    );
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(
      dot(x0,x0),
      dot(x1,x1),
      dot(x2,x2),
      dot(x3,x3)
    ), 0.0);
    m = m * m;
    return 42.0 * dot(
      m*m,
      vec4(
        dot(p0,x0),
        dot(p1,x1),
        dot(p2,x2),
        dot(p3,x3)
      )
    );
  }
  
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  // Curl noise for more realistic fluid motion
  vec3 curlNoise(vec3 p) {
    const float e = 0.1;
    
    vec3 dx = vec3(e, 0.0, 0.0);
    vec3 dy = vec3(0.0, e, 0.0);
    vec3 dz = vec3(0.0, 0.0, e);
    
    vec3 p_x0 = p - dx;
    vec3 p_x1 = p + dx;
    vec3 p_y0 = p - dy;
    vec3 p_y1 = p + dy;
    vec3 p_z0 = p - dz;
    vec3 p_z1 = p + dz;
    
    float x = snoise(p_y1) - snoise(p_y0);
    float y = snoise(p_z1) - snoise(p_z0);
    float z = snoise(p_x1) - snoise(p_x0);
    
    const float divisor = 1.0 / (2.0 * e);
    return normalize(vec3(x, y, z) * divisor);
  }
  
  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Calculate mouse influence with decay
    float distanceToMouse = length(uv - uMouse);
    float mouseInfluence = smoothstep(0.8, 0.0, distanceToMouse) * uMouseIntensity;
    
    // Create fluid-like motion with curl noise
    vec3 noisePos = vec3(uv * 1.5, uTime * uSpeed);
    vec3 curlVelocity = curlNoise(noisePos);
    
    // Create layers of distortion for more complex fluid effect
    float noise1 = snoise(vec3(uv * 2.0, uTime * uSpeed * 0.5));
    float noise2 = snoise(vec3(uv * 4.0, uTime * uSpeed * 0.7 + 10.0));
    float combinedNoise = noise1 * 0.6 + noise2 * 0.4;
    
    // Apply scroll-based distortion
    float scrollDistortion = uScrollProgress * sin(uv.y * 10.0) * 0.05;
    
    // Calculate final distortion amount
    float distortionAmount = combinedNoise * uIntensity + mouseInfluence + scrollDistortion;
    
    // Apply distortion in direction of curl noise for fluid motion
    vec3 pos = position + vec3(
      curlVelocity.x * distortionAmount * 0.3,
      curlVelocity.y * distortionAmount * 0.3,
      curlVelocity.z * distortionAmount
    );
    
    // Store distortion for fragment shader
    vDistortion = distortionAmount;
    
    // Project position
    vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -modelViewPosition.xyz;
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// FRAGMENT SHADER
// ─────────────────────────────────────────────────────────────────────────────
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uNormalMap;
  uniform sampler2D uDepthMap;
  uniform sampler2D uReflectionMap;
  uniform float uTime;
  uniform float uRefractionStrength;
  uniform float uChromaticAberration;
  uniform float uFresnelPower;
  uniform vec3 uBaseColor;
  
  varying vec2 vUv;
  varying float vDistortion;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  // Fresnel approximation 
  float fresnel(vec3 viewDirection, vec3 normal, float power) {
    return pow(1.0 - clamp(dot(viewDirection, normal), 0.0, 1.0), power);
  }
  
  void main() {
    // Normalized view direction
    vec3 viewDirection = normalize(vViewPosition);
    
    // Get normal from normal map and transform to world space
    vec3 normalMap = texture2D(uNormalMap, vUv + vDistortion * 0.05).rgb * 2.0 - 1.0;
    vec3 normal = normalize(vNormal + normalMap * 0.5);
    
    // Calculate refraction
    float refractionFactor = uRefractionStrength * (1.0 + vDistortion * 2.0);
    
    // Chromatic aberration with different refraction for RGB
    vec2 refractR = vUv + normal.xy * refractionFactor * (1.0 + uChromaticAberration);
    vec2 refractG = vUv + normal.xy * refractionFactor;
    vec2 refractB = vUv + normal.xy * refractionFactor * (1.0 - uChromaticAberration);
    
    // Sample texture with chromatic aberration
    float r = texture2D(uTexture, refractR).r;
    float g = texture2D(uTexture, refractG).g;
    float b = texture2D(uTexture, refractB).b;
    vec3 refractionColor = vec3(r, g, b);
    
    // Calculate dynamic Fresnel effect
    float fresnelFactor = fresnel(viewDirection, normal, uFresnelPower);
    
    // Sample reflection map, more prominent at grazing angles due to Fresnel
    vec2 reflectionUv = vUv + normal.xy * 0.1 * fresnelFactor;
    vec3 reflectionColor = texture2D(uReflectionMap, reflectionUv).rgb;
    
    // Depth-based color adjustment
    float depth = texture2D(uDepthMap, vUv).r;
    depth = clamp(depth + vDistortion * 0.2, 0.0, 1.0);
    
    // Mix base color with refraction and reflection
    vec3 finalColor = mix(
      refractionColor,
      reflectionColor,
      fresnelFactor * 0.5 + depth * 0.2
    );
    
    // Add subtle base color tint
    finalColor = mix(finalColor, uBaseColor, 0.1 + vDistortion * 0.1);
    
    // Add subtle vignette effect
    vec2 center = vec2(0.5);
    float dist = length(vUv - center) * 1.5;
    float vignette = smoothstep(1.0, 0.4, dist);
    finalColor *= vignette;
    
    // Add subtle noise to break up banding
    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233)) * 43758.5453) * 0.005);
    finalColor += noise;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// DEFINIMOS EL CUSTOM MATERIAL
// ─────────────────────────────────────────────────────────────────────────────
const LiquidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uIntensity: 0.4,
    uSpeed: 0.3,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uMouseIntensity: 1.0,
    uScrollProgress: 0,
    uTexture: new THREE.Texture(),
    uNormalMap: new THREE.Texture(),
    uDepthMap: new THREE.Texture(),
    uReflectionMap: new THREE.Texture(),
    uRefractionStrength: 0.1,
    uChromaticAberration: 0.05,
    uFresnelPower: 2.0,
    uBaseColor: new THREE.Color("#2563eb"),
  },
  vertexShader,
  fragmentShader
);

extend({ LiquidDistortionMaterial });

// Extendemos la declaración global para que TypeScript conozca nuestras props
declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidDistortionMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial & {
          uTime: number;
          uIntensity: number;
          uSpeed: number;
          uMouse: THREE.Vector2;
          uMouseIntensity: number;
          uScrollProgress: number;
          uTexture: THREE.Texture;
          uNormalMap: THREE.Texture;
          uDepthMap: THREE.Texture;
          uReflectionMap: THREE.Texture;
          uRefractionStrength: number;
          uChromaticAberration: number;
          uFresnelPower: number;
          uBaseColor: THREE.Color;
        },
        typeof LiquidDistortionMaterial
      >;
    }
  }
}

// Componente para crear un entorno básico propio
// Esta solución evita el error de carga del HDR
function CustomEnvironment() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.5}
        color="#b9f"
      />
      <hemisphereLight args={["#4488ff", "#4422bb", 0.5]} />
    </>
  );
}

// Custom camera setup for older drei versions
function CameraSetup() {
  const { set, camera } = useThree();

  useEffect(() => {
    // Check if camera is a PerspectiveCamera
    if (camera instanceof THREE.PerspectiveCamera) {
      // Position the camera
      camera.position.set(0, 0, 3);
      camera.fov = 35;
      camera.updateProjectionMatrix();
    } else {
      // Create a new PerspectiveCamera if the default is not one
      const perspCamera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      perspCamera.position.set(0, 0, 3);

      // Make it the default camera
      set({ camera: perspCamera });
    }
  }, [camera, set]);

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// LIQUID EFFECT
// ─────────────────────────────────────────────────────────────────────────────
function LiquidEffect() {
  const materialRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();
  const [hovered, setHovered] = useState(false);

  // Cargamos la textura principal
  const [mainTexture] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064",
  ]);

  // Cargamos texturas adicionales
  const textures = useTexture({
    normalMap:
      "https://images.unsplash.com/photo-1584384689201-e0bcbe2c7f1d?q=80&w=3117&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    depthMap:
      "https://images.unsplash.com/photo-1584384689201-e0bcbe2c7f1d?q=80&w=3117&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    reflectionMap:
      "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=2127",
  });

  // Efectos de introducción y scroll
  useEffect(() => {
    if (materialRef.current && meshRef.current) {
      // Intro animation
      gsap.from(materialRef.current, {
        uIntensity: 0,
        uSpeed: 0.1,
        uRefractionStrength: 0,
        uChromaticAberration: 0,
        duration: 3.0,
        ease: "power2.out",
      });

      // ScrollTrigger
      if (typeof window !== "undefined") {
        const scrollTrigger = ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (materialRef.current) {
              materialRef.current.uScrollProgress = self.progress;
            }
          },
        });
        return () => {
          scrollTrigger.kill();
        };
      }
    }
  }, []);

  // Hover effect
  useEffect(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current, {
        uMouseIntensity: hovered ? 2.0 : 1.0,
        uRefractionStrength: hovered ? 0.15 : 0.1,
        uChromaticAberration: hovered ? 0.08 : 0.05,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [hovered]);

  // Actualizamos uniformes en cada frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();

      // Movemos el mouse suavemente
      const targetX = mouse.x * 0.5 + 0.5;
      const targetY = -mouse.y * 0.5 + 0.5;
      materialRef.current.uMouse.x +=
        (targetX - materialRef.current.uMouse.x) * 0.1;
      materialRef.current.uMouse.y +=
        (targetY - materialRef.current.uMouse.y) * 0.1;
    }

    // Rotación sutil de la malla
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.2) * 0.02;
      meshRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.3) * 0.02;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry
        args={[
          viewport.width < viewport.height ? 4 : 3,
          viewport.width < viewport.height ? 3 : 4,
          64,
          64,
        ]}
      />
      <liquidDistortionMaterial
        ref={materialRef}
        uTexture={mainTexture}
        uNormalMap={textures.normalMap}
        uDepthMap={textures.depthMap}
        uReflectionMap={textures.reflectionMap}
        transparent
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTAMOS EL COMPONENTE PRINCIPAL DE LA ESCENA
// ─────────────────────────────────────────────────────────────────────────────
export default function LiquidDistortionScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cx = classNames.bind(styles);

  // Parallax: track mouse
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  // Entry animation y fondo dinámico
  useEffect(() => {
    if (containerRef.current) {
      // Fade-in con blur
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 30,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Fondo gradiente animado
      const updateBackgroundGradient = () => {
        const time = Date.now() * 0.001;
        const hue1 = (time * 10) % 360;
        const hue2 = (hue1 + 60) % 360;
        if (containerRef.current) {
          containerRef.current.style.backgroundImage = `radial-gradient(circle at 30% 70%,
              hsla(${hue1}, 80%, 10%, 0.8),
              hsla(${hue2}, 90%, 15%, 0.6))`;
        }
      };

      const interval = setInterval(updateBackgroundGradient, 100);
      return () => clearInterval(interval);
    }
  }, []);

  // Parallax en la rotación del contenedor
  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        rotateY: mousePosition.x * 5,
        rotateX: -mousePosition.y * 5,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [mousePosition]);

  return (
    <div
      ref={containerRef}
      className={cx("liquid-distortion")}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
    >
      <div className={cx("liquid-distortion__overlay")}>
        {/* Canvas con la escena Three.js */}
        <Canvas
          camera={{ position: [0, 0, 3], fov: 35 }} // Initial camera setup for Canvas
          style={{ width: "100%", height: "100%" }}
        >
          {/* Custom camera setup that handles type checking */}
          <CameraSetup />
          <Suspense fallback={null}>
            <LiquidEffect />
            <CustomEnvironment />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
