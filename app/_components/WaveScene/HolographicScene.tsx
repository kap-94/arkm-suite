"use client";

import * as THREE from "three";
import React, { useRef, useEffect, useMemo, Suspense } from "react";
import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { gsap } from "gsap";
import styles from "./HolographicScene.module.scss";
import { motion } from "framer-motion";
import classNames from "classnames/bind";

/* ─────────────────────────────────────────────────────────────────────────────
   1) Interfaz para nuestro material, extendiendo ShaderMaterial
   ───────────────────────────────────────────────────────────────────────────── */
interface IHolographicMaterial extends THREE.ShaderMaterial {
  uTime: number;
  uElevation: number;
  uColor1: THREE.Color;
  uColor2: THREE.Color;
  uFrequency: number;
  uMousePosition: THREE.Vector2;
  uMouseStrength: number;
  uTexture: THREE.Texture;
  uGlowStrength: number;
  uScanLineIntensity: number;
  uGlitchIntensity: number;
}

/* ─────────────────────────────────────────────────────────────────────────────
   2) Shaders
   ───────────────────────────────────────────────────────────────────────────── */
const vertexShader = `
  uniform float uTime;
  uniform float uElevation;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uFrequency;
  uniform vec2 uMousePosition;
  uniform float uMouseStrength;
  
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // Modified 2D simplex noise
  vec2 fade(vec2 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }
  
  vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
  }
  
  float simplex2D(vec2 p) {
    vec4 Pi = floor(p.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(p.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0);
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 *
      vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00,n01), vec2(n10,n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
  }

  float gridLines(vec2 uv, float lineWidth, float cellSize) {
    vec2 grid = abs(fract(uv * cellSize - 0.5) - 0.5) / fwidth(uv * cellSize);
    float line = min(grid.x, grid.y);
    return 1.0 - min(line, 1.0);
  }
  
  void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;
    
    // Interacción con el mouse
    float mouseDistance = length(uv - uMousePosition);
    float mouseInfluence = smoothstep(0.6, 0.0, mouseDistance) * uMouseStrength;
    
    float noiseFreq = uFrequency;
    float noiseTime = uTime * 0.5;
    
    float noise1 = simplex2D(vec2(
      vUv.x * noiseFreq * 1.0,
      vUv.y * noiseFreq * 1.0 + noiseTime * 0.7
    )) * 0.6;
    float noise2 = simplex2D(vec2(
      vUv.x * noiseFreq * 2.0 + 100.0,
      vUv.y * noiseFreq * 2.0 + noiseTime * 0.5
    )) * 0.3;
    float noise3 = simplex2D(vec2(
      vUv.x * noiseFreq * 4.0 + 300.0,
      vUv.y * noiseFreq * 4.0 + noiseTime * 0.3
    )) * 0.1;
    
    float totalNoise = noise1 + noise2 + noise3;
    
    float elevation = uElevation * totalNoise + mouseInfluence * 0.5;
    float gridValue = gridLines(vUv, 0.1, 10.0 + mouseInfluence * 5.0);
    float gridElevation = gridValue * 0.1 * sin(uTime * 2.0 + mouseDistance * 10.0);
    
    vec3 newPosition = position;
    newPosition.z += elevation + gridElevation;
    
    vElevation = elevation + gridElevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uGlowStrength;
  uniform float uScanLineIntensity;
  uniform float uGlitchIntensity;
  
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x)
      + (c - a)*u.y*(1.0-u.x)
      + (d - b)*u.x*u.y;
  }
  
  void main() {
    // Gradiente holográfico
    vec3 baseColor = mix(uColor1, uColor2, vElevation * 3.0 + 0.5);
    
    // Scan lines verticales
    float scanLineValue = sin(vUv.y * 100.0 + uTime * 2.0) * 0.5 + 0.5;
    scanLineValue = pow(scanLineValue, 2.0) * uScanLineIntensity;
    
    // Scan line horizontal
    float horizontalScanLine = smoothstep(
      0.0, 0.2,
      abs(fract(vUv.y - uTime * 0.1) - 0.5)
    );
    
    // Glitch
    float glitchTime = floor(uTime * 2.0);
    float glitchSeed = random(vec2(glitchTime, glitchTime));
    float glitchOffset = step(0.95, sin(uTime * 20.0 * glitchSeed)) * 0.2 * uGlitchIntensity;
    
    vec2 glitchUv = vUv;
    if (random(vec2(glitchTime)) > 0.8) {
      float lineOffset = floor(vUv.y * 20.0) / 20.0;
      float lineNoise = step(0.5, random(vec2(lineOffset, glitchTime)));
      glitchUv.x += lineNoise * glitchOffset * sin(uTime);
    }
    
    vec4 textureColor = texture2D(uTexture, glitchUv);
    vec3 finalColor = baseColor + textureColor.rgb * 0.5;
    
    // Efecto scan line
    finalColor *= (0.8 + 0.2 * horizontalScanLine);
    finalColor *= (1.0 - scanLineValue * 0.2);
    
    // Glow
    float glow = smoothstep(0.0, 0.5, abs(vElevation)) * uGlowStrength;
    finalColor += baseColor * glow;
    
    // Resaltar borde
    float edgeFactor = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
    finalColor += uColor2 * edgeFactor * 0.5;
    
    // Viñeta
    vec2 center = vec2(0.5, 0.5);
    float dist = length(vUv - center) * 1.5;
    float vignette = smoothstep(1.0, 0.2, dist);
    finalColor *= vignette;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   3) Creamos el material y lo extendemos para usar <holographicMaterial />
   ───────────────────────────────────────────────────────────────────────────── */
const HolographicMaterial = shaderMaterial(
  {
    uTime: 0,
    uElevation: 0.3,
    uColor1: new THREE.Color("#00ffff"),
    uColor2: new THREE.Color("#ff00ff"),
    uFrequency: 4.0,
    uMousePosition: new THREE.Vector2(0.5, 0.5),
    uMouseStrength: 0,
    uTexture: new THREE.Texture(),
    uGlowStrength: 1.0,
    uScanLineIntensity: 0.3,
    uGlitchIntensity: 0.7,
  },
  vertexShader,
  fragmentShader
);

extend({ HolographicMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      holographicMaterial: ReactThreeFiber.Object3DNode<
        IHolographicMaterial,
        typeof HolographicMaterial
      >;
    }
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   4) Componente HolographicGrid - Plane con efecto holográfico
   ───────────────────────────────────────────────────────────────────────────── */
function HolographicGrid() {
  const materialRef = useRef<IHolographicMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const { size } = useThree();

  // Cargamos la textura sin usar 'texture.encoding' ni 'sRGBEncoding'
  const overlayTexture = useTexture(
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073"
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!materialRef.current) return;
      const mouseX = e.clientX / size.width;
      const mouseY = 1 - e.clientY / size.height;

      gsap.to(materialRef.current, {
        uMouseStrength: 1.0,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(materialRef.current.uMousePosition, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (!materialRef.current) return;
      gsap.to(materialRef.current, {
        uMouseStrength: 0,
        duration: 1.0,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [size]);

  // Animación inicial
  useEffect(() => {
    if (!materialRef.current) return;

    gsap.from(materialRef.current, {
      uElevation: 0,
      uGlowStrength: 0,
      uScanLineIntensity: 0,
      uGlitchIntensity: 0,
      duration: 2.0,
      ease: "power2.out",
    });

    const timeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Pulso de colores
    timeline.to(materialRef.current.uColor1, {
      r: 0.0,
      g: 1.0,
      b: 1.0,
      duration: 4.0,
    });

    timeline.to(
      materialRef.current.uColor2,
      {
        r: 1.0,
        g: 0.0,
        b: 1.0,
        duration: 4.0,
      },
      0
    );
  }, []);

  // Loop de animación
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      materialRef.current.uElevation =
        0.3 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }

    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.3) * 0.03;
      meshRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.2) * 0.03;
    }
  });

  // Ajustamos tamaño del plane
  const gridSize = useMemo(() => {
    const aspect = size.width / size.height;
    return aspect > 1 ? [4, 4 / aspect] : [4 * aspect, 4];
  }, [size]);

  return (
    <mesh ref={meshRef}>
      {/* Plane (no buffer) */}
      <planeGeometry args={[gridSize[0], gridSize[1], 32, 32]} />
      <holographicMaterial
        ref={(node) => {
          if (node) materialRef.current = node;
        }}
        uTexture={overlayTexture}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   5) Componente principal sin <Text>; solo el plane con shader holográfico
   ───────────────────────────────────────────────────────────────────────────── */
export default function HolographicScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cx = classNames.bind(styles);

  // Animación del contenedor
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={cx("holographic")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className={cx("holographic__overlay")}>
        <div className={cx("holographic__scan-line")} />
        <div className={cx("holographic__corner", "holographic__corner--tl")} />
        <div className={cx("holographic__corner", "holographic__corner--tr")} />
        <div className={cx("holographic__corner", "holographic__corner--bl")} />
        <div className={cx("holographic__corner", "holographic__corner--br")} />
      </div>

      <Canvas
        className={cx("holographic__canvas")}
        camera={{ position: [0, 0, 2.5], fov: 25 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.7} />
        <Suspense fallback={null}>
          <HolographicGrid />
          {/* Ya no tenemos <Text> */}
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
