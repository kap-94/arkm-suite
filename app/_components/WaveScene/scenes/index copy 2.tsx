// "use client";

// import React, { useRef, Suspense, useMemo } from "react";
// import * as THREE from "three";
// import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
// import { shaderMaterial, useTexture, OrbitControls } from "@react-three/drei";
// import useMousePosition from "@/hooks/useMousePosition";

// // Shader para simulación de fluidos
// const FluidVertexShader = `
//   varying vec2 vUv;
//   varying vec3 vPosition;
//   uniform float uTime;

//   void main() {
//     vUv = uv;
//     vPosition = position;

//     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectedPosition = projectionMatrix * viewPosition;

//     gl_Position = projectedPosition;
//   }
// `;

// const FluidFragmentShader = `
//   uniform float uTime;
//   uniform vec2 uResolution;
//   uniform vec2 uMouse;
//   uniform vec3 uColorA;
//   uniform vec3 uColorB;
//   uniform vec3 uColorC;
//   uniform sampler2D uTexture;

//   varying vec2 vUv;
//   varying vec3 vPosition;

//   #define PI 3.14159265359

//   vec3 mod289(vec3 x) {
//     return x - floor(x * (1.0 / 289.0)) * 289.0;
//   }

//   vec4 mod289(vec4 x) {
//     return x - floor(x * (1.0 / 289.0)) * 289.0;
//   }

//   vec4 permute(vec4 x) {
//     return mod289(((x*34.0)+1.0)*x);
//   }

//   vec4 taylorInvSqrt(vec4 r) {
//     return 1.79284291400159 - 0.85373472095314 * r;
//   }

//   float snoise(vec3 v) {
//     const vec2 C = vec2(1.0/6.0, 1.0/3.0);
//     const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

//     // First corner
//     vec3 i  = floor(v + dot(v, C.yyy) );
//     vec3 x0 =   v - i + dot(i, C.xxx) ;

//     // Other corners
//     vec3 g = step(x0.yzx, x0.xyz);
//     vec3 l = 1.0 - g;
//     vec3 i1 = min( g.xyz, l.zxy );
//     vec3 i2 = max( g.xyz, l.zxy );

//     vec3 x1 = x0 - i1 + C.xxx;
//     vec3 x2 = x0 - i2 + C.yyy;
//     vec3 x3 = x0 - D.yyy;

//     // Permutations
//     i = mod289(i);
//     vec4 p = permute( permute( permute(
//                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
//              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

//     // Gradients
//     float n_ = 0.142857142857;
//     vec3  ns = n_ * D.wyz - D.xzx;

//     vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

//     vec4 x_ = floor(j * ns.z);
//     vec4 y_ = floor(j - 7.0 * x_ );

//     vec4 x = x_ *ns.x + ns.yyyy;
//     vec4 y = y_ *ns.x + ns.yyyy;
//     vec4 h = 1.0 - abs(x) - abs(y);

//     vec4 b0 = vec4( x.xy, y.xy );
//     vec4 b1 = vec4( x.zw, y.zw );

//     vec4 s0 = floor(b0)*2.0 + 1.0;
//     vec4 s1 = floor(b1)*2.0 + 1.0;
//     vec4 sh = -step(h, vec4(0.0));

//     vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//     vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

//     vec3 p0 = vec3(a0.xy,h.x);
//     vec3 p1 = vec3(a0.zw,h.y);
//     vec3 p2 = vec3(a1.xy,h.z);
//     vec3 p3 = vec3(a1.zw,h.w);

//     // Normalise gradients
//     vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
//     p0 *= norm.x;
//     p1 *= norm.y;
//     p2 *= norm.z;
//     p3 *= norm.w;

//     // Mix final noise value
//     vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//     m = m * m;
//     return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
//   }

//   void main() {
//     // Normalized mouse position
//     vec2 mousePos = uMouse / uResolution;

//     // Calculate distortion based on mouse position and simplex noise
//     float mouseDistance = length(vUv - mousePos);
//     float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance) * 0.5;

//     // Create dynamic fluid-like effect
//     float time = uTime * 0.4;
//     vec2 uv = vUv;

//     // Apply distortion based on mouse
//     uv += mouseInfluence * vec2(
//       sin(time + vUv.x * 10.0),
//       cos(time + vUv.y * 10.0)
//     );

//     // Layer multiple noise functions for a complex fluid effect
//     float noise1 = snoise(vec3(uv * 3.0, time * 0.5)) * 0.5 + 0.5;
//     float noise2 = snoise(vec3(uv * 6.0, time * 0.3)) * 0.5 + 0.5;
//     float noise3 = snoise(vec3(uv * 9.0, time * 0.7)) * 0.5 + 0.5;

//     // Combine noise layers
//     float finalNoise = noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.1;

//     // Create color gradient
//     vec3 color1 = mix(uColorA, uColorB, finalNoise);
//     vec3 color2 = mix(color1, uColorC, noise2);

//     // Add subtle texture effect
//     vec2 distortedUV = vUv + vec2(
//       0.02 * sin(vUv.y * 20.0 + time * 2.0),
//       0.02 * cos(vUv.x * 20.0 + time * 2.0)
//     );

//     vec4 textureColor = texture2D(uTexture, distortedUV);
//     vec3 finalColor = mix(color2, textureColor.rgb, 0.15);

//     // Add subtle vignette
//     float vignette = smoothstep(1.0, 0.3, length(vUv - 0.5) * 1.8);
//     finalColor *= vignette;

//     gl_FragColor = vec4(finalColor, 1.0);
//   }
// `;

// // Crear material personalizado con shaderMaterial
// const FluidShaderMaterial = shaderMaterial(
//   {
//     uTime: 0,
//     uResolution: new THREE.Vector2(1, 1),
//     uMouse: new THREE.Vector2(0.5, 0.5),
//     uColorA: new THREE.Color("#6366F1"), // Indigo
//     uColorB: new THREE.Color("#818CF8"), // Lighter indigo
//     uColorC: new THREE.Color("#4F46E5"), // Deeper indigo
//     uTexture: null,
//   },
//   FluidVertexShader,
//   FluidFragmentShader
// );

// extend({ FluidShaderMaterial });

// // Componente de plano fluido
// function FluidPlane() {
//   const materialRef = useRef();
//   const { x, y } = useMousePosition();

//   // Cargar textura para dar profundidad
//   const texture = useTexture(
//     "https://plus.unsplash.com/premium_photo-1738597453072-165b9d750e1b?q=80&w=3465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   );

//   // Configuración inicial
//   const [initialWidth, initialHeight] = useMemo(() => {
//     if (typeof window !== "undefined") {
//       return [window.innerWidth, window.innerHeight];
//     }
//     return [1920, 1080];
//   }, []);

//   // Actualizar uniforms en cada frame
//   useFrame(({ clock, size }) => {
//     if (materialRef.current) {
//       materialRef.current.uTime = clock.getElapsedTime();
//       materialRef.current.uResolution.set(size.width, size.height);

//       // Actualizar posición del mouse normalizada
//       const mouseX = x / initialWidth || 0.5;
//       const mouseY = 1 - (y / initialHeight || 0.5);
//       materialRef.current.uMouse.set(mouseX, mouseY);
//     }
//   });

//   return (
//     <mesh>
//       <planeGeometry args={[2, 2, 64, 64]} />
//       <fluidShaderMaterial ref={materialRef} uTexture={texture} transparent />
//     </mesh>
//   );
// }

// // Componente principal
// export default function WaveScene() {
//   return (
//     <Canvas camera={{ fov: 35, position: [0, 0, 2] }}>
//       <Suspense fallback={null}>
//         <FluidPlane />
//       </Suspense>
//     </Canvas>
//   );
// }
