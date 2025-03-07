// "use client";

// import React, { useRef, useMemo, useEffect, useState } from "react";
// import * as THREE from "three";
// import { Canvas, useFrame, extend } from "@react-three/fiber";
// import { shaderMaterial, Points, AdaptiveDpr } from "@react-three/drei";
// import useMousePosition from "@/hooks/useMousePosition";

// // Shader para la rejilla interactiva que representa tecnología y diseño
// const GridVertexShader = `
//   varying vec2 vUv;
//   varying float vElevation;

//   uniform float uTime;
//   uniform vec2 uMouse;
//   uniform float uElevationScale;
//   uniform float uGridScale;
//   uniform float uWaveSpeed;

//   // Función de ruido mejorada
//   vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//   vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//   vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

//   float snoise(vec2 v) {
//     const vec4 C = vec4(0.211324865405187, 0.366025403784439,
//              -0.577350269189626, 0.024390243902439);
//     vec2 i  = floor(v + dot(v, C.yy));
//     vec2 x0 = v -   i + dot(i, C.xx);
//     vec2 i1;
//     i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
//     vec4 x12 = x0.xyxy + C.xxzz;
//     x12.xy -= i1;
//     i = mod289(i);
//     vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
//     + i.x + vec3(0.0, i1.x, 1.0));
//     vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
//       dot(x12.zw, x12.zw)), 0.0);
//     m = m*m;
//     m = m*m;
//     vec3 x = 2.0 * fract(p * C.www) - 1.0;
//     vec3 h = abs(x) - 0.5;
//     vec3 ox = floor(x + 0.5);
//     vec3 a0 = x - ox;
//     m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
//     vec3 g;
//     g.x = a0.x * x0.x + h.x * x0.y;
//     g.yz = a0.yz * x12.xz + h.yz * x12.yw;
//     return 130.0 * dot(m, g);
//   }

//   void main() {
//     vUv = uv;

//     // Efecto de onda con distorsión de posición basada en el ratón
//     float mouseDistance = length(uv - uMouse);
//     float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance);

//     // Combinamos múltiples capas de ruido para crear textura
//     float noiseFreq1 = uGridScale;
//     float noiseFreq2 = uGridScale * 2.0;
//     float noiseTime = uTime * uWaveSpeed;

//     float noiseValue =
//         snoise(vec2(position.x * noiseFreq1, position.y * noiseFreq1 + noiseTime * 0.1)) * 0.5 +
//         snoise(vec2(position.x * noiseFreq2, position.y * noiseFreq2 + noiseTime * 0.2)) * 0.25;

//     // Influencia del ratón en el patrón
//     float mouseWave = sin(mouseDistance * 15.0 - uTime * 3.0) * mouseInfluence * 0.5;

//     // Elevación final
//     float elevation = noiseValue * uElevationScale + mouseWave;

//     // Guardamos la elevación para el fragment shader
//     vElevation = elevation;

//     // Aplicamos la elevación solo en el eje Z
//     vec3 newPosition = position + vec3(0.0, 0.0, elevation);

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
//   }
// `;

// const GridFragmentShader = `
//   varying vec2 vUv;
//   varying float vElevation;

//   uniform float uTime;
//   uniform vec3 uLowColor;
//   uniform vec3 uHighColor;
//   uniform vec3 uAccentColor;
//   uniform vec2 uMouse;

//   void main() {
//     // Efecto de grid digital
//     vec2 gridUv = fract(vUv * 40.0);
//     float gridLine = step(0.95, max(gridUv.x, gridUv.y));

//     // Creamos líneas más finas para un efecto más digital
//     vec2 smallGridUv = fract(vUv * 100.0);
//     float smallGridLine = step(0.97, max(smallGridUv.x, smallGridUv.y)) * 0.5;

//     // Efecto de contorno de elevación
//     float elevationLine = step(0.1, abs(fract(vElevation * 5.0) - 0.5)) * 0.05;

//     // Color base basado en la elevación
//     vec3 baseColor = mix(uLowColor, uHighColor, vElevation * 0.5 + 0.5);

//     // Factor de interactividad con el mouse
//     float mouseDistance = length(vUv - uMouse);
//     float mouseGlow = smoothstep(0.5, 0.0, mouseDistance) * 0.8;

//     // Añade glow alrededor del cursor
//     baseColor = mix(baseColor, uAccentColor, mouseGlow);

//     // Aplica líneas de grid
//     baseColor += vec3(gridLine + smallGridLine + elevationLine) * 0.15;

//     // Efecto de scan line pasando lentamente
//     float scanLine = step(0.98, sin(vUv.y * 100.0 - uTime * 0.5));
//     baseColor += scanLine * 0.1 * (1.0 - mouseGlow);

//     // Añade un sutil efecto de borde a toda la superficie
//     float edge = smoothstep(0.5, 0.48, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
//     baseColor += edge * 0.1;

//     // Efecto de viñeta para dar más profundidad
//     float vignette = smoothstep(1.0, 0.5, length((vUv - 0.5) * vec2(1.2, 1.4)));
//     baseColor *= vignette;

//     gl_FragColor = vec4(baseColor, 1.0);
//   }
// `;

// // Material para la rejilla
// const GridMaterial = shaderMaterial(
//   {
//     uTime: 0,
//     uMouse: new THREE.Vector2(0.5, 0.5),
//     uElevationScale: 0.1,
//     uGridScale: 5.0,
//     uWaveSpeed: 0.5,
//     uLowColor: new THREE.Color("#121235"),
//     uHighColor: new THREE.Color("#3949AB"),
//     uAccentColor: new THREE.Color("#5C6BC0"),
//   },
//   GridVertexShader,
//   GridFragmentShader
// );

// extend({ GridMaterial });

// // Shader para partículas que representan la conectividad y la innovación
// const DotsVertexShader = `
//   attribute float size;
//   attribute vec3 color;

//   varying vec3 vColor;

//   uniform float uTime;
//   uniform float uPixelRatio;
//   uniform vec2 uMouse;

//   void main() {
//     vColor = color;

//     // Posición base
//     vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

//     // Calcular distancia al mouse en espacio de modelo
//     vec4 modelMouse = vec4(uMouse.x - 0.5, uMouse.y - 0.5, 0.0, 0.0) * 2.0;
//     float distToMouse = length(position - modelMouse.xyz);

//     // Efecto de partículas moviéndose hacia el mouse
//     float mouseAttractionFactor = smoothstep(1.0, 0.0, distToMouse) * 0.2;
//     vec3 dir = normalize(modelMouse.xyz - position);

//     // Modificar posición basada en tiempo y distancia al mouse
//     mvPosition.xyz += dir * mouseAttractionFactor;

//     // Tamaño de partícula responsivo y afectado por la proximidad al mouse
//     gl_PointSize = size * (1.0 + mouseAttractionFactor * 2.0) * uPixelRatio;
//     gl_PointSize *= (10.0 / -mvPosition.z);

//     gl_Position = projectionMatrix * mvPosition;
//   }
// `;

// const DotsFragmentShader = `
//   varying vec3 vColor;

//   void main() {
//     // Forma de partícula circular con bordes suaves
//     float distToCenter = length(gl_PointCoord - vec2(0.5));
//     float alpha = 1.0 - smoothstep(0.4, 0.5, distToCenter);

//     // Añadir glow suave
//     vec3 finalColor = vColor;
//     finalColor += vColor * 0.5 * (1.0 - distToCenter * 2.0);

//     if (alpha < 0.01) discard;

//     gl_FragColor = vec4(finalColor, alpha);
//   }
// `;

// // Material para los puntos
// const DotsMaterial = shaderMaterial(
//   {
//     uTime: 0,
//     uPixelRatio: 1,
//     uMouse: new THREE.Vector2(0.5, 0.5),
//   },
//   DotsVertexShader,
//   DotsFragmentShader
// );

// extend({ DotsMaterial });

// // Componente de grid tecnológico
// function TechGrid() {
//   const materialRef = useRef();
//   const { x, y } = useMousePosition();
//   const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

//   // Actualizar dimensiones en resize
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const handleResize = () => {
//         setDimensions({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         });
//       };

//       handleResize();
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   // Animación y actualización de uniforms
//   useFrame(({ clock }) => {
//     if (materialRef.current) {
//       // Actualizar tiempo
//       materialRef.current.uTime = clock.getElapsedTime();

//       // Normalizar posición del mouse
//       const mouseX = x / dimensions.width || 0.5;
//       const mouseY = 1 - (y / dimensions.height || 0.5);
//       materialRef.current.uMouse.set(mouseX, mouseY);
//     }
//   });

//   return (
//     <mesh rotation={[-Math.PI * 0.05, 0, 0]} position={[0, -0.2, 0]}>
//       <planeGeometry args={[4, 2, 120, 60]} />
//       <gridMaterial
//         ref={materialRef}
//         uElevationScale={0.08}
//         uGridScale={3.0}
//         uWaveSpeed={0.8}
//         side={THREE.DoubleSide}
//       />
//     </mesh>
//   );
// }

// // Componente de partículas flotantes que representan datos
// function FloatingParticles({ count = 200 }) {
//   const materialRef = useRef();
//   const { x, y } = useMousePosition();
//   const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

//   // Actualizar dimensiones en resize
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const handleResize = () => {
//         setDimensions({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         });

//         if (materialRef.current) {
//           materialRef.current.uPixelRatio = window.devicePixelRatio;
//         }
//       };

//       handleResize();
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   // Crear partículas con distribución estratégica
//   const particles = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     const colors = new Float32Array(count * 3);
//     const sizes = new Float32Array(count);

//     const color1 = new THREE.Color("#4FC3F7");
//     const color2 = new THREE.Color("#3949AB");
//     const color3 = new THREE.Color("#5C6BC0");

//     for (let i = 0; i < count; i++) {
//       const i3 = i * 3;

//       // Distribución en forma de nube enfocada en el centro
//       let x, y, z;

//       // 70% de las partículas en una distribución centrada
//       if (i < count * 0.7) {
//         const theta = 2 * Math.PI * Math.random();
//         const radius = Math.pow(Math.random(), 0.5) * 1.5; // Distribución radial

//         x = Math.cos(theta) * radius;
//         y = (Math.random() - 0.5) * 0.8;
//         z = Math.sin(theta) * radius;
//       }
//       // 30% distribuidas en un volumen mayor para dar profundidad
//       else {
//         x = (Math.random() - 0.5) * 4;
//         y = (Math.random() - 0.5) * 1.5;
//         z = (Math.random() - 0.5) * 3;
//       }

//       positions[i3] = x;
//       positions[i3 + 1] = y;
//       positions[i3 + 2] = z;

//       // Asignar colores según posición
//       let distFromCenter = Math.sqrt(x * x + y * y + z * z);
//       if (distFromCenter < 0.5) {
//         color1.toArray(colors, i3);
//       } else if (distFromCenter < 1.0) {
//         color2.toArray(colors, i3);
//       } else {
//         color3.toArray(colors, i3);
//       }

//       // Tamaños variados con énfasis en el centro
//       sizes[i] = Math.random() * 5 + (distFromCenter < 0.8 ? 5 : 2);
//     }

//     return { positions, colors, sizes };
//   }, [count]);

//   // Animación y actualización de uniforms
//   useFrame(({ clock }) => {
//     if (materialRef.current) {
//       materialRef.current.uTime = clock.getElapsedTime();

//       // Normalizar posición del mouse
//       const mouseX = x / dimensions.width || 0.5;
//       const mouseY = 1 - (y / dimensions.height || 0.5);
//       materialRef.current.uMouse.set(mouseX, mouseY);
//     }
//   });

//   return (
//     <points>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={particles.positions.length / 3}
//           array={particles.positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-color"
//           count={particles.colors.length / 3}
//           array={particles.colors}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-size"
//           count={particles.sizes.length}
//           array={particles.sizes}
//           itemSize={1}
//         />
//       </bufferGeometry>
//       <dotsMaterial
//         ref={materialRef}
//         vertexColors
//         transparent
//         depthWrite={false}
//         blending={THREE.AdditiveBlending}
//         uPixelRatio={
//           typeof window !== "undefined" ? window.devicePixelRatio : 1
//         }
//       />
//     </points>
//   );
// }

// // Componente escena principal
// export default function WaveScene() {
//   return (
//     <Canvas camera={{ fov: 45, position: [0, 0, 2.5] }}>
//       {/* Superficie tecnológica con grid */}
//       <TechGrid />

//       {/* Partículas flotantes */}
//       <FloatingParticles count={250} />

//       {/* Adaptación dinámica de resolución para mejor rendimiento */}
//       <AdaptiveDpr pixelated />

//       {/* Luz ambiente suave */}
//       <ambientLight intensity={0.4} />

//       {/* Luces direccionales para dar dimensión */}
//       <directionalLight position={[5, 5, 5]} intensity={0.5} color="#FFFFFF" />
//       <directionalLight
//         position={[-5, -5, 5]}
//         intensity={0.3}
//         color="#A5B4FC"
//       />
//     </Canvas>
//   );
// }
