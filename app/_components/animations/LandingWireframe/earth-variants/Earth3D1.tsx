"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, MathUtils } from "three";
import { useScroll, MotionValue } from "framer-motion";
import { Stars, Text } from "@react-three/drei";

type PlanetProps = {
  scrollYProgress: MotionValue<number>;
};

type ScrollTextProps = {
  scrollYProgress: MotionValue<number>;
};

// Componente para el planeta
function Planet({ scrollYProgress }: PlanetProps) {
  const meshRef = useRef<Mesh | null>(null);
  const cloudRef = useRef<Mesh | null>(null);

  // Cargar texturas
  const [colorMap, normalMap, roughnessMap, cloudMap] = useLoader(
    TextureLoader,
    [
      "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ]
  );

  useFrame((state, delta) => {
    const scrollValue = scrollYProgress.get();
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Empieza pequeño y crece con el scroll
      const scaleStart = 0.6; // Escala inicial más pequeña
      const scaleFactor = scaleStart + scrollValue * 1.6; // Crece hasta 2.2x
      meshRef.current.scale.setScalar(scaleFactor);

      // Movimiento en espiral logarítmica que se acerca
      const spiralA = 0.15; // Factor de espiral
      const spiralB = 1.0; // Expansión de espiral

      // Ángulo de la espiral que aumenta con el scroll
      const maxRotations = 1.5; // Número máximo de rotaciones
      const theta = scrollValue * Math.PI * 2 * maxRotations;

      // Radio de la espiral que decrece con scroll (aproximación)
      const startRadius = 4; // Radio inicial (lejos)
      const endRadius = 0.5; // Radio final (cerca)
      const radius =
        startRadius - (startRadius - endRadius) * Math.pow(scrollValue, 0.7);

      // Coordenadas espirales
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius * 0.5; // Espiral elíptica (más plana)
      const z = -2 - (10 - 2) * (1 - scrollValue); // Se acerca desde lejos

      meshRef.current.position.set(x, y, z);

      // Rotación que siempre mira hacia el centro
      meshRef.current.rotation.y += delta * 0.2;

      // Inclinación que cambia con la posición en la espiral
      meshRef.current.rotation.x = Math.sin(theta * 0.5) * 0.2;
      meshRef.current.rotation.z = Math.cos(theta * 0.5) * 0.1;

      // Orientación que sigue la tangente de la espiral (opcional)
      if (scrollValue > 0.1) {
        const tangentAngle = theta + Math.PI / 2;
        meshRef.current.rotation.y = tangentAngle + Math.PI;
      }
    }

    // Nubes con rotación independiente
    if (cloudRef.current) {
      cloudRef.current.rotation.y -= delta * 0.1;

      // Nubes que varían con la velocidad de aproximación
      const scrollSpeed = 0;
      const prevScrollValue = scrollSpeed;
      const currentScrollSpeed = Math.abs(scrollValue - prevScrollValue) * 100;

      // Efecto visual en las nubes según velocidad
      const material = cloudRef.current.material as any;
      if (material) {
        // Nubes más densas al acercarse al final
        material.opacity = 0.3 + scrollValue * 0.2;
      }
    }
  });

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1.5} position={[3, 1, -2]} color="#ffffff" />
      <pointLight position={[-2, 1, 0]} intensity={0.3} color="#f0f0f0" />
      <spotLight
        position={[0, 5, 5]}
        intensity={0.3}
        angle={0.5}
        color="#f5f5f5"
      />

      {/* Planeta */}
      <mesh ref={meshRef} position={[4, 0, -10]} scale={0.6}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalness={0.1}
          roughness={0.8}
        />

        {/* Nubes */}
        <mesh ref={cloudRef}>
          <sphereGeometry args={[1.02, 64, 64]} />
          <meshStandardMaterial
            map={cloudMap}
            transparent={true}
            opacity={0.3}
            blending={2}
          />
        </mesh>
      </mesh>

      {/* Estrellas en el fondo */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
    </>
  );
}

// Texto que aparece con el scroll
function ScrollText({ scrollYProgress }: ScrollTextProps) {
  const textRef = useRef<any>(null);

  useFrame(() => {
    const scroll = scrollYProgress.get();
    if (textRef.current) {
      // Aparición gradual
      textRef.current.opacity = MathUtils.lerp(
        0,
        1,
        scroll > 0.4 ? 1 : scroll * 2.5
      );

      // Texto que sigue al planeta pero se mantiene más centrado
      const textX = Math.cos(scroll * Math.PI * 2 * 1.5) * 2;
      const textY = Math.sin(scroll * Math.PI * 2 * 1.5) * 1;

      textRef.current.position.x = textX * 0.3; // Reducimos la amplitud del movimiento
      textRef.current.position.y = textY * 0.3 - 1; // Mantenemos texto abajo

      // Rotación sutil que acompaña el movimiento
      textRef.current.rotation.z = Math.sin(scroll * Math.PI) * 0.1;
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, -1, -5]}
      fontSize={0.5}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
    >
      PLANETA
    </Text>
  );
}

export default function PlanetScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={sceneRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Planet scrollYProgress={scrollYProgress} />
          <ScrollText scrollYProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
