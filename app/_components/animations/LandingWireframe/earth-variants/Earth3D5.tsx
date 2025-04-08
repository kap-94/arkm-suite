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
      const scaleStart = 0.8; // Escala inicial más pequeña
      const scaleFactor = scaleStart + scrollValue * 1.5; // Crece hasta 2.3x
      meshRef.current.scale.setScalar(scaleFactor);

      // Movimiento orbital con el scroll
      const orbitRadius = 1.5; // Radio de la órbita
      const orbitProgress = scrollValue * Math.PI * 2; // Una vuelta completa

      // Posición orbital que se acerca
      meshRef.current.position.x =
        Math.cos(orbitProgress) * orbitRadius * (1 - scrollValue * 0.7);
      meshRef.current.position.z =
        Math.sin(orbitProgress) * orbitRadius * (1 - scrollValue * 0.7) -
        scrollValue * 2;

      // La altura varía en función del scroll
      meshRef.current.position.y =
        Math.sin(orbitProgress) * 0.5 - scrollValue * 0.5;

      // Rotación continua básica
      meshRef.current.rotation.y += delta * 0.2;

      // Inclinación que evoluciona con la órbita
      meshRef.current.rotation.x = Math.sin(orbitProgress) * 0.3;
      meshRef.current.rotation.z = Math.cos(orbitProgress) * 0.2;
    }

    // Nubes con rotación independiente
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.1;

      // Opacidad de nubes que varía con el scroll
      const material = cloudRef.current.material as any;
      if (material) {
        material.opacity = Math.max(0.4 - scrollValue * 0.2, 0.2);
      }
    }
  });

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1.2} position={[3, 1, -2]} color="#ffffff" />
      <pointLight position={[-2, 1, 0]} intensity={0.3} color="#f0f0f0" />
      <spotLight
        position={[0, 5, 5]}
        intensity={0.3}
        angle={0.5}
        color="#f5f5f5"
      />

      {/* Planeta */}
      <mesh ref={meshRef} scale={0.8}>
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
            opacity={0.4}
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
      textRef.current.opacity = MathUtils.lerp(
        0,
        1,
        scroll > 0.2 ? 1 : scroll * 5
      );
      textRef.current.position.y = MathUtils.lerp(-2, 2, scroll);
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, -2, -5]}
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
