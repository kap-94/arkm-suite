// "use client";

// import React, { useRef, useMemo, useEffect, useState } from "react";
// import * as THREE from "three";
// import { Canvas, useFrame, extend } from "@react-three/fiber";
// import {
//   shaderMaterial,
//   Text,
//   useTexture,
//   CameraShake,
//   useAspect,
//   AdaptiveDpr,
// } from "@react-three/drei";
// import useMousePosition from "@/hooks/useMousePosition";

// // Shader para flujo de código abstracto
// const CodeFlowVertexShader = `
//   varying vec2 vUv;
//   varying vec3 vPosition;

//   uniform float uTime;

//   void main() {
//     vUv = uv;
//     vPosition = position;

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const CodeFlowFragmentShader = `
//   varying vec2 vUv;
//   varying vec3 vPosition;

//   uniform float uTime;
//   uniform vec2 uResolution;
//   uniform vec2 uMouse;
//   uniform vec3 uColorA;
//   uniform vec3 uColorB;
//   uniform vec3 uColorC;
//   uniform sampler2D uDataTexture;

//   // Función de valor absoluto suavizada
//   float smoothAbs(float x, float k) {
//     return sqrt(x * x + k);
//   }

//   // Función para crear líneas con desvanecimiento suave
//   float line(vec2 uv, float speed, float height, float time) {
//     uv.y = mod(uv.y - time * speed, 1.0);

//     // Crear variación en altura de líneas
//     float lineHeight = height * (0.5 + 0.5 * sin(uv.x * 10.0));

//     // Crear líneas con desvanecimiento suave
//     return smoothstep(lineHeight, lineHeight + 0.01, uv.y) - smoothstep(lineHeight + 0.05, lineHeight + 0.06, uv.y);
//   }

//   // Función para generar caracteres de código
//   float codeChar(vec2 uv, float seed) {
//     // Crear rejilla para caracteres
//     vec2 cellUv = fract(uv * vec2(8.0, 16.0));
//     vec2 cellId = floor(uv * vec2(8.0, 16.0));

//     // Valor pseudo-aleatorio basado en posición y semilla
//     float random = fract(sin(dot(cellId, vec2(12.9898, 78.233)) + seed) * 43758.5453);

//     // Generar un carácter binario aleatorio (0 o 1)
//     return step(0.5, random);
//   }

//   // Función que emula el efecto matriz
//   float codeFlow(vec2 uv, float time, float seed) {
//     // Velocidad variable para diferentes columnas
//     float columnSpeed = 0.2 + 0.5 * fract(sin(uv.x * 32.45) * 789.43);

//     // Offset de tiempo variable para cada columna
//     float timeOffset = 2.0 * fract(sin(uv.x * 43.56) * 213.45);

//     // Ajustar UV para movimiento vertical
//     vec2 flowUV = uv;
//     flowUV.y = mod(flowUV.y - time * columnSpeed - timeOffset, 1.0);

//     // Generar caracteres en flujo
//     float charPattern = codeChar(flowUV, seed);

//     // Añadir variación de brillo/opacidad
//     float brightness = smoothstep(0.0, 0.7, flowUV.y);

//     return charPattern * brightness;
//   }

//   void main() {
//     // Coordenadas normalizadas
//     vec2 uv = vUv;

//     // Mouse normalizado
//     vec2 mouse = uMouse;

//     // Medir distancia al puntero del mouse
//     float mouseDistance = length(uv - mouse);
//     float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance);

//     // Muestrear textura de datos para variación adicional
//     vec4 dataColor = texture2D(uDataTexture, uv);

//     // Tiempo modificado por la textura de datos
//     float modifiedTime = uTime * (0.8 + 0.4 * dataColor.r);

//     // Crear múltiples capas de flujo de código con diferentes velocidades y opacidades
//     float codePattern1 = codeFlow(uv, modifiedTime, 0.0) * 0.5;
//     float codePattern2 = codeFlow(uv * 1.5, modifiedTime * 0.7, 1.0) * 0.3;
//     float codePattern3 = codeFlow(uv * 0.8, modifiedTime * 1.3, 2.0) * 0.7;

//     // Combinar patrones
//     float finalPattern = codePattern1 + codePattern2 + codePattern3;

//     // Crear líneas horizontales estilo "interfaz tecnológica"
//     float scanLine = line(vec2(uv.x, uv.y), 0.1, 0.93, modifiedTime) * 0.2;
//     float scanLine2 = line(vec2(uv.x, uv.y), 0.05, 0.85, modifiedTime * 0.7) * 0.1;

//     // Añadir líneas horizontales
//     finalPattern += scanLine + scanLine2;

//     // Mezclar colores básicos según altura
//     vec3 baseGradient = mix(uColorA, uColorB, uv.y);

//     // Añadir color de acento basado en distancia al mouse
//     vec3 colorWithAccent = mix(baseGradient, uColorC, mouseInfluence * 0.7);

//     // Color final con patrón de código
//     vec3 finalColor = mix(
//       colorWithAccent * 0.2, // Color base oscurecido
//       colorWithAccent,       // Color completo
//       finalPattern
//     );

//     // Añadir brillo donde está el mouse
//     finalColor += uColorC * mouseInfluence * 0.5;

//     // Viñeta sutil
//     float vignette = smoothstep(1.0, 0.3, length((uv - 0.5) * 1.5));
//     finalColor *= vignette;

//     gl_FragColor = vec4(finalColor, 1.0);
//   }
// `;

// // Material para el flujo de código
// const CodeFlowMaterial = shaderMaterial(
//   {
//     uTime: 0,
//     uResolution: new THREE.Vector2(1, 1),
//     uMouse: new THREE.Vector2(0.5, 0.5),
//     uColorA: new THREE.Color("#0B1026"), // Azul oscuro para base
//     uColorB: new THREE.Color("#1E3A8A"), // Azul medio para gradiente
//     uColorC: new THREE.Color("#60A5FA"), // Azul brillante para acento
//     uDataTexture: null,
//   },
//   CodeFlowVertexShader,
//   CodeFlowFragmentShader
// );

// extend({ CodeFlowMaterial });

// // Shader para elementos de UI flotantes
// const UiElementVertexShader = `
//   varying vec2 vUv;
//   attribute float index;
//   attribute float size;
//   attribute vec3 color;

//   uniform float uTime;
//   uniform vec2 uMouse;
//   uniform float uPixelRatio;

//   varying vec3 vColor;
//   varying float vIndex;
//   varying float vProgress;

//   void main() {
//     vUv = uv;
//     vColor = color;
//     vIndex = index;

//     // Calcular progreso de animación individual para cada elemento
//     float individualSpeed = 0.2 + 0.1 * mod(index, 5.0);
//     float startDelay = mod(index * 384.67, 1.0) * 2.0;
//     vProgress = clamp((uTime - startDelay) * individualSpeed, 0.0, 1.0);

//     // Calcular posición con animación
//     vec3 pos = position;

//     // Posición inicial (fuera de pantalla)
//     vec3 startPos = position + vec3(
//       5.0 + 2.0 * sin(index),
//       3.0 * cos(index * 1.4),
//       -3.0
//     );

//     // Posición final (posición original)
//     vec3 endPos = position;

//     // Curva de animación suavizada (entrada suave)
//     float easeInOut = smoothstep(0.0, 1.0, vProgress);

//     // Interpolar entre posición inicial y final
//     pos = mix(startPos, endPos, easeInOut);

//     // Añadir efecto de hover con el mouse
//     vec4 worldPos = modelMatrix * vec4(position, 1.0);
//     vec3 worldPosNorm = worldPos.xyz / worldPos.w;
//     float distToMouse = length(worldPosNorm.xy - (uMouse * 2.0 - 1.0));
//     float mouseEffect = smoothstep(0.5, 0.0, distToMouse) * 0.15 * easeInOut;

//     // Aplicar efecto de mouse
//     pos.z += mouseEffect;

//     // Aplicar modelViewMatrix después de todas las transformaciones
//     vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

//     // Tamaño variable según índice y efecto de mouse
//     float finalSize = size * (1.0 + mouseEffect * 3.0) * uPixelRatio;

//     gl_PointSize = finalSize * (1.0 / -mvPosition.z);
//     gl_Position = projectionMatrix * mvPosition;
//   }
// `;

// const UiElementFragmentShader = `
//   varying vec2 vUv;
//   varying vec3 vColor;
//   varying float vIndex;
//   varying float vProgress;

//   uniform sampler2D uShapesTexture;
//   uniform float uTime;

//   // Función para generar formas procedurales según el índice
//   vec2 getShapeUV(vec2 uv, float index) {
//     float shapeType = mod(index, 4.0);

//     if (shapeType < 1.0) {
//       // Cuadrado
//       return uv;
//     }
//     else if (shapeType < 2.0) {
//       // Círculo (distorsionamos las UV)
//       return (uv - 0.5) * 1.2 + 0.5;
//     }
//     else if (shapeType < 3.0) {
//       // Rectángulo alargado
//       return vec2(uv.x, (uv.y - 0.5) * 0.5 + 0.5);
//     }
//     else {
//       // Diamante
//       float rot = 3.14159 / 4.0;
//       mat2 rotMat = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
//       return (rotMat * (uv - 0.5)) + 0.5;
//     }
//   }

//   void main() {
//     // Obtener forma según el índice
//     vec2 shapeUV = getShapeUV(gl_PointCoord, vIndex);

//     // Simular borde con alpha
//     float distToCenter = length(shapeUV - 0.5) * 2.0;

//     // Diferentes tipos de shapes según el índice
//     float shapeType = mod(vIndex, 4.0);
//     float shape;

//     if (shapeType < 1.0) {
//       // Cuadrado con bordes redondeados
//       vec2 smoothBox = smoothstep(0.0, 0.1, shapeUV) * smoothstep(1.0, 0.9, shapeUV);
//       shape = smoothBox.x * smoothBox.y;
//     }
//     else if (shapeType < 2.0) {
//       // Círculo
//       shape = 1.0 - smoothstep(0.8, 0.95, distToCenter);
//     }
//     else if (shapeType < 3.0) {
//       // Rectángulo con línea central
//       vec2 smoothRect = smoothstep(0.0, 0.1, shapeUV) * smoothstep(1.0, 0.9, shapeUV);
//       float line = smoothstep(0.45, 0.48, shapeUV.y) * smoothstep(0.55, 0.52, shapeUV.y);
//       shape = smoothRect.x * smoothRect.y * (1.0 - line * 0.7);
//     }
//     else {
//       // Forma de diamante
//       shape = 1.0 - smoothstep(0.6, 0.9, distToCenter);
//     }

//     // Añadir borde
//     float border = smoothstep(0.8, 0.95, distToCenter) * step(distToCenter, 0.99);

//     // Pulso de animación
//     float pulse = sin(uTime * 3.0 + vIndex) * 0.5 + 0.5;

//     // Combinar color con forma y borde
//     vec3 finalColor = vColor;

//     // Añadir brillo pulsante al borde
//     finalColor += vColor * border * pulse * 0.5;

//     // Aplicar el progreso como un fade in
//     float alpha = shape * vProgress;

//     // Descartar píxeles transparentes
//     if (alpha < 0.01) discard;

//     gl_FragColor = vec4(finalColor, alpha);
//   }
// `;

// // Material para elementos de UI
// const UiElementMaterial = shaderMaterial(
//   {
//     uTime: 0,
//     uMouse: new THREE.Vector2(0.5, 0.5),
//     uPixelRatio: 1,
//     uShapesTexture: null,
//   },
//   UiElementVertexShader,
//   UiElementFragmentShader
// );

// extend({ UiElementMaterial });

// // Función para crear una textura de datos procedural
// function createDataTexture(size = 64) {
//   const data = new Uint8Array(size * size * 4);

//   for (let i = 0; i < size; i++) {
//     for (let j = 0; j < size; j++) {
//       const index = (i * size + j) * 4;

//       // Patrón de datos aleatorio pero coherente
//       const noise1 = Math.sin(i * 0.1) * Math.cos(j * 0.1) * 0.5 + 0.5;
//       const noise2 = Math.cos(i * 0.2) * Math.sin(j * 0.2) * 0.5 + 0.5;

//       data[index] = Math.floor(noise1 * 255); // R
//       data[index + 1] = Math.floor(noise2 * 255); // G
//       data[index + 2] = Math.floor(noise1 * noise2 * 255); // B
//       data[index + 3] = 255; // A
//     }
//   }

//   const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
//   texture.needsUpdate = true;

//   return texture;
// }

// // Componente de fondo con código fluyendo
// function CodeBackground() {
//   const materialRef = useRef();
//   const { x, y } = useMousePosition();
//   const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

//   // Dimensiones adaptativas
//   const size = useAspect(dimensions.width, dimensions.height);

//   // Textura de datos procedural
//   const dataTexture = useMemo(() => createDataTexture(256), []);

//   // Actualizar dimensiones en resize
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const handleResize = () => {
//         setDimensions({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         });

//         if (materialRef.current) {
//           materialRef.current.uResolution.set(
//             window.innerWidth,
//             window.innerHeight
//           );
//         }
//       };

//       handleResize();
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   // Actualizar uniforms en cada frame
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
//     <mesh position={[0, 0, -1]} scale={size}>
//       <planeGeometry args={[1, 1]} />
//       <codeFlowMaterial
//         ref={materialRef}
//         uDataTexture={dataTexture}
//         uResolution={[dimensions.width, dimensions.height]}
//       />
//     </mesh>
//   );
// }

// // Componente de elementos UI flotantes
// function FloatingUiElements({ count = 60 }) {
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

//   // Generar los elementos UI
//   const elements = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     const colors = new Float32Array(count * 3);
//     const sizes = new Float32Array(count);
//     const indices = new Float32Array(count);

//     // Colores de elementos UI
//     const uiColors = [
//       new THREE.Color("#3B82F6"), // Blue
//       new THREE.Color("#60A5FA"), // Light blue
//       new THREE.Color("#93C5FD"), // Extra light blue
//       new THREE.Color("#2563EB"), // Dark blue
//       new THREE.Color("#818CF8"), // Indigo
//     ];

//     // Distribuir elementos en una formación de "interfaz" tecnológica
//     for (let i = 0; i < count; i++) {
//       const i3 = i * 3;

//       // Posiciones
//       // Distribuir en un patrón de dashboard o UI
//       let x, y, z;

//       if (i < count * 0.3) {
//         // 30% elementos formando una rejilla ordenada (como widgets)
//         const cols = 5;
//         const rows = Math.ceil((count * 0.3) / cols);
//         const col = i % cols;
//         const row = Math.floor(i / cols);

//         x = (col / cols - 0.5) * 1.6;
//         y = (row / rows - 0.5) * 0.8;
//         z = -0.2;

//         // Tamaño más grande para estos elementos
//         sizes[i] = 30 + Math.random() * 10;
//       } else if (i < count * 0.7) {
//         // 40% formando líneas de "datos" o "estadísticas"
//         const lineIndex = Math.floor((i - count * 0.3) / 8);
//         const itemIndex = (i - count * 0.3) % 8;

//         x = (itemIndex / 8 - 0.5) * 1.8;
//         y = -0.3 + lineIndex * 0.15;
//         z = -0.1;

//         // Tamaño medio para estos elementos
//         sizes[i] = 15 + Math.random() * 10;
//       } else {
//         // 30% como elementos dispersos
//         x = (Math.random() - 0.5) * 2;
//         y = (Math.random() - 0.5) * 1.5;
//         z = 0;

//         // Tamaño pequeño para elementos dispersos
//         sizes[i] = 5 + Math.random() * 10;
//       }

//       positions[i3] = x;
//       positions[i3 + 1] = y;
//       positions[i3 + 2] = z;

//       // Color
//       const colorIndex = Math.floor(Math.random() * uiColors.length);
//       uiColors[colorIndex].toArray(colors, i3);

//       // Índice para variación visual
//       indices[i] = i;
//     }

//     return { positions, colors, sizes, indices };
//   }, [count]);

//   // Actualizar uniforms en cada frame
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
//           count={elements.positions.length / 3}
//           array={elements.positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-color"
//           count={elements.colors.length / 3}
//           array={elements.colors}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-size"
//           count={elements.sizes.length}
//           array={elements.sizes}
//           itemSize={1}
//         />
//         <bufferAttribute
//           attach="attributes-index"
//           count={elements.indices.length}
//           array={elements.indices}
//           itemSize={1}
//         />
//       </bufferGeometry>
//       <uiElementMaterial
//         ref={materialRef}
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

// // Componente principal de la escena
// export default function WaveScene() {
//   return (
//     <Canvas camera={{ fov: 50, position: [0, 0, 2] }}>
//       {/* Fondo con flujo de código */}
//       <CodeBackground />

//       {/* Elementos UI flotantes */}
//       <FloatingUiElements count={80} />

//       {/* Adaptación dinámica de resolución */}
//       <AdaptiveDpr pixelated />

//       {/* Efecto sutil de cámara temblorosa */}
//       <CameraShake
//         maxYaw={0.02}
//         maxPitch={0.02}
//         maxRoll={0.02}
//         yawFrequency={0.2}
//         pitchFrequency={0.2}
//         rollFrequency={0.3}
//       />
//     </Canvas>
//   );
// }
