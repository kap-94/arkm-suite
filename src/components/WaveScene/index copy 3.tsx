"use client";

import React, { useRef, Suspense, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import useMousePosition from "@/hooks/useMousePosition";

// Shader para crear una superficie holográfica mediante raymarching
const RaymarchedVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const RaymarchedFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uAccentColor;
  
  varying vec2 vUv;
  
  #define MAX_STEPS 100
  #define MAX_DIST 100.0
  #define SURF_DIST 0.001
  #define PI 3.14159265359
  
  // SDF primitives and operations
  float sdfSphere(vec3 p, float r) {
    return length(p) - r;
  }
  
  float sdfBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
  }
  
  float sdfTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
  }
  
  float sdfPlane(vec3 p, vec3 n, float h) {
    return dot(p, normalize(n)) + h;
  }
  
  vec2 opU(vec2 d1, vec2 d2) {
    return (d1.x < d2.x) ? d1 : d2;
  }
  
  // Rotation matrix
  mat2 rot2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }
  
  // Domain repetition
  vec3 opRep(vec3 p, vec3 c) {
    return mod(p + 0.5 * c, c) - 0.5 * c;
  }
  
  // Displacement
  vec3 opDisplace(vec3 p) {
    float d1 = sin(uTime * 0.3 + p.x * 3.0) * sin(p.z * 4.0) * 0.1;
    float d2 = sin(uTime * 0.4 + p.z * 2.0) * sin(p.x * 3.0) * 0.1;
    float d3 = sin(uTime * 0.5 + p.y * 3.0) * sin(p.x * 4.0) * 0.05;
    return p + vec3(d1, d3, d2);
  }
  
  // Scene description
  vec2 map(vec3 p) {
    // Apply subtle displacement
    vec3 q = opDisplace(p);
    
    // Animated parameters
    float wobble = sin(uTime * 0.5) * 0.1 + 0.9;
    float pulse = sin(uTime * 0.7) * 0.05 + 0.95;
    
    // Mouse influence
    vec2 mouse = uMouse * 2.0 - 1.0;
    float mouseInfluence = clamp(1.0 - length(mouse), 0.0, 1.0) * 0.2;
    
    // Base surface - a wavy plane
    float baseHeight = 0.1 + mouseInfluence;
    float wavyPlane = sdfPlane(q, vec3(0.0, 1.0, 0.0), baseHeight) + 
                     sin(q.x * 8.0 + uTime) * sin(q.z * 8.0) * 0.05 * wobble;
    
    // Create a grid of small elements on the surface
    vec3 rep = opRep(q, vec3(0.4, 1.0, 0.4));
    
    // Rotate the elements
    rep.xz = rot2D(uTime * 0.2) * rep.xz;
    
    // Create small tori that pulse
    float grid = sdfTorus(rep, vec2(0.15 * pulse, 0.03));
    
    // Add small animated details based on mouse position
    float details = sdfSphere(
      rep - vec3(mouse.x * 0.1, sin(uTime) * 0.1, mouse.y * 0.1), 
      0.05 + mouseInfluence
    );
    
    // Combine elements with material IDs
    vec2 res = vec2(wavyPlane, 1.0); // Base is material 1
    res = opU(res, vec2(grid, 2.0));     // Grid is material 2
    res = opU(res, vec2(details, 3.0));  // Details are material 3
    
    return res;
  }
  
  // Ray marching
  vec2 rayMarch(vec3 ro, vec3 rd) {
    float dO = 0.0;
    float materialID = 0.0;
    
    for(int i = 0; i < MAX_STEPS; i++) {
      vec3 p = ro + rd * dO;
      vec2 dS = map(p);
      dO += dS.x;
      materialID = dS.y;
      
      if(dO > MAX_DIST || abs(dS.x) < SURF_DIST) break;
    }
    
    return vec2(dO, materialID);
  }
  
  // Calculate normal
  vec3 getNormal(vec3 p) {
    float d = map(p).x;
    vec2 e = vec2(0.001, 0.0);
    
    vec3 n = d - vec3(
      map(p - e.xyy).x,
      map(p - e.yxy).x,
      map(p - e.yyx).x
    );
    
    return normalize(n);
  }
  
  // Main rendering function
  void main() {
    // Normalized pixel coordinates
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;
    
    // Ray origin and direction
    vec3 ro = vec3(0.0, 1.0, -2.0);
    vec3 rd = normalize(vec3(uv, 1.0));
    
    // Rotate camera based on mouse position
    vec2 mouse = uMouse * 2.0 - 1.0;
    rd.xz = rot2D(mouse.x * 0.2) * rd.xz;
    rd.yz = rot2D(mouse.y * 0.1) * rd.yz;
    
    // Ray marching
    vec2 result = rayMarch(ro, rd);
    float d = result.x;
    float materialID = result.y;
    
    // Default background color (dark with subtle gradient)
    vec3 col = mix(
      vec3(0.03, 0.03, 0.05),
      vec3(0.1, 0.1, 0.2),
      smoothstep(-1.0, 1.0, uv.y)
    );
    
    // If ray hit something
    if(d < MAX_DIST) {
      // Hit position and normal
      vec3 p = ro + rd * d;
      vec3 n = getNormal(p);
      
      // Base lighting
      vec3 lightDir = normalize(vec3(0.5, 0.8, -0.2));
      float diff = clamp(dot(n, lightDir), 0.1, 1.0);
      float fresnel = pow(1.0 - max(0.0, dot(n, -rd)), 5.0);
      
      // Material coloring based on ID
      vec3 baseColor;
      float glowIntensity = 0.0;
      
      if(materialID == 1.0) {
        // Base surface - subtle indigo with interference patterns
        float pattern = sin(p.x * 20.0 + uTime) * sin(p.z * 20.0 + uTime * 0.7) * 0.5 + 0.5;
        baseColor = mix(
          vec3(0.1, 0.1, 0.2),
          uAccentColor,
          pattern * 0.3 + 0.1
        );
        glowIntensity = 0.2;
      } 
      else if(materialID == 2.0) {
        // Grid elements - brighter accent color
        baseColor = uAccentColor * 1.2;
        glowIntensity = 0.6;
      }
      else {
        // Detail elements - brightest
        baseColor = vec3(1.0, 1.0, 1.0);
        glowIntensity = 1.0;
      }
      
      // Add lighting and effects
      col = baseColor * diff;
      
      // Add holographic glow effect
      col += baseColor * glowIntensity * (0.5 + 0.5 * sin(uTime * 2.0));
      
      // Add fresnel rim lighting
      col += mix(baseColor, vec3(1.0), 0.9) * fresnel * 0.7;
      
      // Add scan line effect
      float scanLine = sin(p.y * 50.0 + uTime * 5.0) * 0.5 + 0.5;
      col *= 0.9 + scanLine * 0.1;
    }
    
    // Post-processing
    
    // Add subtle noise
    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    col += noise * 0.02;
    
    // Vignette effect
    float vignette = smoothstep(1.0, 0.3, length(vUv - 0.5) * 1.5);
    col *= vignette;
    
    // Tone mapping and gamma correction
    col = pow(col, vec3(0.8)); // Simple gamma
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

// Crear material personalizado con shaderMaterial
const RaymarchMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uMouse: new THREE.Vector2(0.5, 0.5),
    uAccentColor: new THREE.Color("#6366F1"), // Color acento principal
  },
  RaymarchedVertexShader,
  RaymarchedFragmentShader
);

extend({ RaymarchMaterial });

// Componente para el plano con raymarching
function HolographicSurface() {
  const materialRef = useRef();
  const { x, y } = useMousePosition();

  // Configuración inicial
  const [resolution, setResolution] = useState([1920, 1080]);

  // Detectar tamaño de ventana
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setResolution([window.innerWidth, window.innerHeight]);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Actualizar uniforms en cada frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      materialRef.current.uResolution.set(...resolution);

      // Normalizar posición del mouse
      const mouseX = x / resolution[0] || 0.5;
      const mouseY = 1 - (y / resolution[1] || 0.5);
      materialRef.current.uMouse.set(mouseX, mouseY);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <raymarchMaterial ref={materialRef} />
    </mesh>
  );
}

// Componente principal
export default function WaveScene() {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 2] }}>
      <Suspense fallback={null}>
        <HolographicSurface />
      </Suspense>
    </Canvas>
  );
}
