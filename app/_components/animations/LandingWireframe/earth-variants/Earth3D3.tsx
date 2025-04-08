// "use client";

// import React, { Suspense, useRef, useMemo } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import {
//   TextureLoader,
//   Mesh,
//   MathUtils,
//   Color,
//   AdditiveBlending,
//   DoubleSide,
//   Vector3,
//   ShaderMaterial,
//   BackSide,
//   IcosahedronGeometry,
// } from "three";
// import { useScroll, MotionValue } from "framer-motion";
// import { Stars, Text, Icosahedron, useTexture } from "@react-three/drei";
// import type { Material } from "three";

// type PlanetProps = {
//   scrollYProgress: MotionValue<number>;
// };

// type EnergyFieldProps = {
//   scrollYProgress: MotionValue<number>;
// };

// type EnergyNodeProps = {
//   scrollYProgress: MotionValue<number>;
//   position: [number, number, number];
//   size: number;
//   color: string;
//   pulseSpeed: number;
//   orbitSpeed: number;
//   delay: number;
// };

// type EnergyLineProps = {
//   scrollYProgress: MotionValue<number>;
//   startRef: React.RefObject<Mesh | null>;
//   endRef: React.RefObject<Mesh | null>;
//   width: number;
//   color: string;
//   pulseFactor: number;
//   pulseSpeed: number;
//   delay: number;
// };

// // Nodo de energía flotante
// function EnergyNode({
//   scrollYProgress,
//   position,
//   size,
//   color,
//   pulseSpeed,
//   orbitSpeed,
//   delay,
// }: EnergyNodeProps) {
//   const nodeRef = useRef<Mesh | null>(null);
//   const initialPos = useMemo(() => new Vector3(...position), [position]);

//   useFrame(({ clock }) => {
//     const time = clock.getElapsedTime() + delay;
//     const scroll = scrollYProgress.get();

//     if (nodeRef.current) {
//       // Movimiento orbital alrededor del planeta
//       const orbitRadius = initialPos.length() + Math.sin(time * 0.5) * 0.2;
//       const orbitAngle = time * orbitSpeed;

//       // Posición orbital
//       const x = Math.cos(orbitAngle) * orbitRadius * initialPos.x;
//       const y = Math.sin(orbitAngle) * orbitRadius * initialPos.y;
//       const z = initialPos.z + Math.cos(time * 0.3) * 0.1;

//       // Aplicar posición
//       nodeRef.current.position.set(x, y, z);

//       // Escala pulsante que aumenta con el scroll
//       const pulseScale = size * (1 + Math.sin(time * pulseSpeed) * 0.2);
//       const scrollScale = 1 + scroll * 2;
//       nodeRef.current.scale.set(
//         pulseScale * scrollScale,
//         pulseScale * scrollScale,
//         pulseScale * scrollScale
//       );

//       // Rotación
//       nodeRef.current.rotation.x = time * 0.5;
//       nodeRef.current.rotation.y = time * 0.3;

//       // Opacidad y color
//       const material = nodeRef.current.material as Material & {
//         opacity: number;
//         emissiveIntensity: number;
//       };

//       if (material) {
//         material.opacity = Math.min(scroll * 2, 0.9);
//         material.emissiveIntensity = 1 + scroll * 2;
//       }
//     }
//   });

//   return (
//     <mesh ref={nodeRef} position={position}>
//       <icosahedronGeometry args={[size, 1]} />
//       <meshStandardMaterial
//         color={color}
//         emissive={color}
//         emissiveIntensity={1}
//         transparent={true}
//         opacity={0}
//         metalness={0.2}
//         roughness={0.3}
//         toneMapped={false}
//       />
//     </mesh>
//   );
// }

// // Línea de energía entre dos nodos
// function EnergyLine({
//   scrollYProgress,
//   startRef,
//   endRef,
//   width,
//   color,
//   pulseFactor,
//   pulseSpeed,
//   delay,
// }: EnergyLineProps) {
//   const lineRef = useRef<Mesh | null>(null);
//   const colorObj = useMemo(() => new Color(color), [color]);

//   useFrame(({ clock }) => {
//     const time = clock.getElapsedTime() + delay;
//     const scroll = scrollYProgress.get();

//     if (lineRef.current && startRef.current && endRef.current) {
//       // Puntos de inicio y fin
//       const startPos = startRef.current.position.clone();
//       const endPos = endRef.current.position.clone();

//       // Colocar línea en el punto medio
//       const midPoint = startPos.clone().add(endPos).multiplyScalar(0.5);
//       lineRef.current.position.copy(midPoint);

//       // Orientar hacia el punto final
//       lineRef.current.lookAt(endPos);

//       // Escalar para cubrir distancia
//       const distance = startPos.distanceTo(endPos);
//       lineRef.current.scale.set(
//         distance,
//         width * (1 + Math.sin(time * pulseSpeed) * pulseFactor),
//         width * (1 + Math.sin(time * pulseSpeed) * pulseFactor)
//       );

//       // Opacidad basada en scroll
//       const material = lineRef.current.material as Material & {
//         opacity: number;
//       };
//       if (material) {
//         material.opacity = Math.min(scroll * 1.5, 0.7);
//       }
//     }
//   });

//   return (
//     <mesh ref={lineRef}>
//       <cylinderGeometry args={[1, 1, 1, 8, 1, true]} />
//       <meshBasicMaterial
//         color={colorObj}
//         transparent={true}
//         opacity={0}
//         blending={AdditiveBlending}
//         side={DoubleSide}
//         toneMapped={false}
//       />
//     </mesh>
//   );
// }

// // Campo de energía alrededor del planeta
// function EnergyField({ scrollYProgress }: EnergyFieldProps) {
//   const fieldRef = useRef<Mesh | null>(null);
//   const nodeRefs = useRef<React.RefObject<Mesh | null>[]>([]);
//   const nodeCount = 8;

//   // Parámetros para los nodos
//   const nodeData = useMemo(() => {
//     const data = [];

//     for (let i = 0; i < nodeCount; i++) {
//       // Posiciones distribuidas alrededor del planeta
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.random() * Math.PI;
//       const radius = 2 + Math.random() * 0.5;

//       const x = radius * Math.sin(phi) * Math.cos(theta);
//       const y = radius * Math.sin(phi) * Math.sin(theta);
//       const z = radius * Math.cos(phi);

//       // Colores en tonos cálidos (amarillos, naranjas)
//       const hue = 0.08 + Math.random() * 0.05;
//       const saturation = 0.7 + Math.random() * 0.3;
//       const lightness = 0.5 + Math.random() * 0.3;

//       const color = new Color().setHSL(hue, saturation, lightness).getStyle();

//       // Tamaño y velocidades
//       const size = 0.1 + Math.random() * 0.15;
//       const pulseSpeed = 0.5 + Math.random() * 1.5;
//       const orbitSpeed = 0.1 + Math.random() * 0.3;

//       // Retraso para que no pulsen sincronizadamente
//       const delay = Math.random() * 10;

//       data.push({
//         position: [x, y, z] as [number, number, number],
//         size,
//         color,
//         pulseSpeed,
//         orbitSpeed,
//         delay,
//       });
//     }

//     return data;
//   }, [nodeCount]);

//   // Inicializar refs para nodos
//   useMemo(() => {
//     nodeRefs.current = Array(nodeCount)
//       .fill(0)
//       .map(() => React.createRef<Mesh | null>());
//   }, []);

//   // Conexiones entre nodos - no todos los nodos están conectados
//   const connections = useMemo(() => {
//     const lines = [];
//     const maxConnections = nodeCount * 1.5; // Más conexiones que nodos

//     // Crear conexiones aleatorias entre nodos
//     for (let i = 0; i < maxConnections; i++) {
//       const startIndex = Math.floor(Math.random() * nodeCount);
//       let endIndex;

//       // Asegurarse de que no se conecte consigo mismo
//       do {
//         endIndex = Math.floor(Math.random() * nodeCount);
//       } while (endIndex === startIndex);

//       // Parámetros de la línea
//       const width = 0.02 + Math.random() * 0.03;
//       const color = new Color()
//         .setHSL(0.08 + Math.random() * 0.05, 0.7, 0.6)
//         .getStyle();

//       const pulseFactor = 0.1 + Math.random() * 0.2;
//       const pulseSpeed = 0.5 + Math.random() * 1.5;
//       const delay = Math.random() * 10;

//       lines.push({
//         startIndex,
//         endIndex,
//         width,
//         color,
//         pulseFactor,
//         pulseSpeed,
//         delay,
//       });
//     }

//     return lines;
//   }, [nodeCount]);

//   useFrame(({ clock }) => {
//     const time = clock.getElapsedTime();
//     const scroll = scrollYProgress.get();

//     // Campo de energía principal
//     if (fieldRef.current) {
//       // Pulso suave
//       const pulse = 1 + Math.sin(time * 0.2) * 0.05;

//       // Escala que aumenta con el scroll
//       const scale = 2 + scroll * 3;
//       fieldRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);

//       // Rotación lenta
//       fieldRef.current.rotation.y = time * 0.05;
//       fieldRef.current.rotation.z = Math.sin(time * 0.1) * 0.1;

//       // Opacidad
//       const material = fieldRef.current.material as Material & {
//         opacity: number;
//       };
//       if (material) {
//         material.opacity = Math.min(scroll * 0.4, 0.4);
//       }
//     }
//   });

//   return (
//     <>
//       {/* Campo de energía esférico */}
//       <mesh ref={fieldRef}>
//         <sphereGeometry args={[1, 32, 32]} />
//         <meshBasicMaterial
//           color="#ffcc66"
//           transparent={true}
//           opacity={0}
//           side={BackSide}
//           blending={AdditiveBlending}
//           toneMapped={false}
//         />
//       </mesh>

//       {/* Nodos de energía */}
//       {nodeData.map((node, i) => (
//         <EnergyNode
//           key={`node-${i}`}
//           ref={nodeRefs.current[i] as React.RefObject<Mesh>}
//           scrollYProgress={scrollYProgress}
//           position={node.position}
//           size={node.size}
//           color={node.color}
//           pulseSpeed={node.pulseSpeed}
//           orbitSpeed={node.orbitSpeed}
//           delay={node.delay}
//         />
//       ))}

//       {/* Líneas de conexión entre nodos */}
//       {connections.map((conn, i) => (
//         <EnergyLine
//           key={`line-${i}`}
//           scrollYProgress={scrollYProgress}
//           startRef={nodeRefs.current[conn.startIndex] as React.RefObject<Mesh>}
//           endRef={nodeRefs.current[conn.endIndex] as React.RefObject<Mesh>}
//           width={conn.width}
//           color={conn.color}
//           pulseFactor={conn.pulseFactor}
//           pulseSpeed={conn.pulseSpeed}
//           delay={conn.delay}
//         />
//       ))}
//     </>
//   );
// }

// // Componente principal para el planeta con campo de energía
// function Planet({ scrollYProgress }: PlanetProps) {
//   const meshRef = useRef<Mesh | null>(null);
//   const cloudRef = useRef<Mesh | null>(null);
//   const auraRef = useRef<Mesh | null>(null);

//   // Cargar texturas
//   const [colorMap, normalMap, roughnessMap, cloudMap] = useLoader(
//     TextureLoader,
//     [
//       "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     ]
//   );

//   useFrame((state, delta) => {
//     const scrollValue = scrollYProgress.get();
//     const time = state.clock.getElapsedTime();

//     // Planeta principal - vibra con energía
//     if (meshRef.current) {
//       // Rotación lenta
//       meshRef.current.rotation.y += delta * 0.1;

//       // Vibración sutil que aumenta con el scroll
//       const vibrationAmplitude = scrollValue * 0.03;
//       meshRef.current.position.x = Math.sin(time * 10) * vibrationAmplitude;
//       meshRef.current.position.y = Math.cos(time * 12) * vibrationAmplitude;

//       // Pulso que aumenta con el scroll
//       const pulseFrequency = 1 + scrollValue * 3;
//       const pulseAmount = 0.05 * scrollValue;
//       const pulse = 1 + Math.sin(time * pulseFrequency) * pulseAmount;
//       meshRef.current.scale.set(1.5 * pulse, 1.5 * pulse, 1.5 * pulse);

//       // Planeta más brillante con el scroll
//       const material = meshRef.current.material as Material & {
//         emissiveIntensity: number;
//       };

//       if (material) {
//         material.emissiveIntensity = scrollValue * 0.5;
//       }
//     }

//     // Nubes
//     if (cloudRef.current) {
//       // Rotación independiente
//       cloudRef.current.rotation.y -= delta * 0.15;

//       // Opacidad - las nubes se hacen más translúcidas
//       const material = cloudRef.current.material as Material & {
//         opacity: number;
//       };
//       if (material) {
//         material.opacity = Math.max(0.3 - scrollValue * 0.2, 0.1);
//       }
//     }

//     // Aura energética
//     if (auraRef.current) {
//       // Pulso rápido que aumenta con el scroll
//       const auralPulseFrequency = 2 + scrollValue * 5;
//       const auralPulse = 1 + Math.sin(time * auralPulseFrequency) * 0.1;

//       // Escala que aumenta con el scroll
//       const auraScale = 1.2 + scrollValue;
//       auraRef.current.scale.set(
//         1.5 * auraScale * auralPulse,
//         1.5 * auraScale * auralPulse,
//         1.5 * auraScale * auralPulse
//       );

//       // Opacidad
//       const material = auraRef.current.material as Material & {
//         opacity: number;
//       };
//       if (material) {
//         material.opacity = Math.min(scrollValue * 0.7, 0.7);
//       }
//     }
//   });

//   return (
//     <>
//       {/* Iluminación */}
//       <ambientLight intensity={0.4} />
//       <pointLight position={[10, 5, 10]} intensity={0.6} />
//       <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffcc66" />

//       {/* Planeta */}
//       <mesh ref={meshRef} scale={1.5}>
//         <sphereGeometry args={[1, 64, 64]} />
//         <meshStandardMaterial
//           map={colorMap}
//           normalMap={normalMap}
//           roughnessMap={roughnessMap}
//           metalness={0.1}
//           roughness={0.4}
//           emissive="#ffcc66"
//           emissiveIntensity={0}
//         />

//         {/* Nubes */}
//         <mesh ref={cloudRef}>
//           <sphereGeometry args={[1.02, 64, 64]} />
//           <meshStandardMaterial
//             map={cloudMap}
//             transparent={true}
//             opacity={0.3}
//             blending={2}
//           />
//         </mesh>
//       </mesh>

//       {/* Aura de energía cercana */}
//       <mesh ref={auraRef}>
//         <sphereGeometry args={[1.1, 32, 32]} />
//         <meshBasicMaterial
//           color="#ffcc66"
//           transparent={true}
//           opacity={0}
//           blending={AdditiveBlending}
//           side={BackSide}
//           toneMapped={false}
//         />
//       </mesh>

//       {/* Campo de energía extendido */}
//       <EnergyField scrollYProgress={scrollYProgress} />

//       {/* Estrellas en el fondo */}
//       <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
//     </>
//   );
// }

// // Texto (vacío como en tu ejemplo)
// function ScrollText() {
//   return <></>;
// }

// export default function PlanetScene() {
//   const sceneRef = useRef<HTMLDivElement>(null);

//   // Configuración de scroll
//   const { scrollYProgress } = useScroll({
//     target: sceneRef,
//     offset: ["start end", "end start"],
//   });

//   return (
//     <div
//       ref={sceneRef}
//       style={{
//         width: "100%",
//         height: "100%",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
//         <Suspense fallback={null}>
//           <Planet scrollYProgress={scrollYProgress} />
//           <ScrollText scrollYProgress={scrollYProgress} />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }
