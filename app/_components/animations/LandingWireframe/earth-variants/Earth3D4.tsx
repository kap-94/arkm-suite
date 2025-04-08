"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  Mesh,
  MathUtils,
  Color,
  BackSide,
  AdditiveBlending,
  FrontSide,
  DoubleSide,
  Vector3,
} from "three";
import { useScroll, MotionValue } from "framer-motion";
import { Stars, useTexture, Float } from "@react-three/drei";
import type { Material } from "three";

type PlanetProps = {
  scrollYProgress: MotionValue<number>;
};

type LightRayProps = {
  scrollYProgress: MotionValue<number>;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  width: number;
  height: number;
  delay: number;
};

type LightMoteProps = {
  scrollYProgress: MotionValue<number>;
  count: number;
  radius: number;
  size: number;
  color: string;
};

// Rayo de luz etérea ascendente
function LightRay({
  scrollYProgress,
  position,
  rotation,
  color,
  width,
  height,
  delay,
}: LightRayProps) {
  const rayRef = useRef<Mesh | null>(null);
  const colorObj = useMemo(() => new Color(color), [color]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() + delay;
    const scroll = Math.max(scrollYProgress.get() - 0.1, 0);

    if (rayRef.current) {
      // Altura que aumenta con el scroll
      const finalHeight = height * (1 + scroll * 2);
      rayRef.current.scale.y = finalHeight;

      // Opacidad pulsante
      const fadeSpeed = 0.5 + Math.random() * 0.5;
      const fadePower = 0.3 + Math.random() * 0.3;
      const fadeOffset = delay * 10;
      const opacity = Math.pow(
        0.5 + 0.5 * Math.sin(time * fadeSpeed + fadeOffset),
        fadePower
      );

      const material = rayRef.current.material as Material & {
        opacity: number;
      };
      if (material) {
        material.opacity = opacity * Math.min(scroll * 2, 0.7);
      }
    }
  });

  return (
    <mesh ref={rayRef} position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        color={colorObj}
        transparent={true}
        opacity={0}
        blending={AdditiveBlending}
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  );
}

// Partículas flotantes de luz que ascienden
function LightMotes({
  scrollYProgress,
  count,
  radius,
  size,
  color,
}: LightMoteProps) {
  const motesRef = useRef<any>(null);
  const colorObj = useMemo(() => new Color(color), [color]);

  // Crear las posiciones iniciales de las partículas
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const offsets = new Float32Array(count);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribución aleatoria dentro de un cilindro
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;
      const y = (Math.random() - 0.5) * 2;

      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r;

      // Offset de tiempo para inicio escalonado
      offsets[i] = Math.random() * 10;

      // Tamaños variados
      scales[i] = 0.5 + Math.random() * 0.5;
    }

    return { positions, offsets, scales };
  }, [count, radius]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const scroll = scrollYProgress.get();

    if (motesRef.current) {
      const geometry = motesRef.current.geometry;
      const positions = geometry.attributes.position.array as Float32Array;

      // Actualizar posición de cada partícula
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const offset = particlePositions.offsets[i];

        // Posición base
        let x = particlePositions.positions[i3];
        let y = particlePositions.positions[i3 + 1];
        let z = particlePositions.positions[i3 + 2];

        // Movimiento ascendente basado en scroll
        const ascendSpeed = 0.05 + Math.random() * 0.1;
        y = ((y + time * ascendSpeed * scroll) % 2) - 1;

        // Movimiento ondulante sutil
        const waveAmplitude = 0.02 * scroll;
        x += Math.sin(time * 0.5 + offset) * waveAmplitude;
        z += Math.cos(time * 0.3 + offset) * waveAmplitude;

        // Actualizar posición
        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;
      }

      geometry.attributes.position.needsUpdate = true;

      // Opacidad que aumenta con el scroll
      const material = motesRef.current.material as Material & {
        opacity: number;
        size: number;
      };
      if (material) {
        material.opacity = Math.min(scroll * 1.5, 0.7);
        material.size = size * (1 + scroll * 0.5);
      }
    }
  });

  return (
    <points ref={motesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particlePositions.positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={colorObj}
        size={size}
        sizeAttenuation={true}
        transparent={true}
        opacity={0}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Componente principal para el planeta con efecto de ascensión
function Planet({ scrollYProgress }: PlanetProps) {
  const meshRef = useRef<Mesh | null>(null);
  const cloudRef = useRef<Mesh | null>(null);
  const auraRef = useRef<Mesh | null>(null);

  // Rayos de luz configuración
  const rayCount = 12;
  const rayData = useMemo(() => {
    const rays = [];

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const radius = 1.2 + Math.random() * 0.3;

      // Posición alrededor del planeta
      const x = Math.cos(angle) * radius;
      const y = 0;
      const z = Math.sin(angle) * radius;

      // Rotación para que apunten hacia arriba pero ligeramente inclinados
      const rotX = Math.PI / 2 - Math.random() * 0.2;
      const rotY = 0;
      const rotZ = angle + Math.PI / 2;

      // Dimensiones
      const width = 0.1 + Math.random() * 0.15;
      const height = 1 + Math.random() * 1.5;

      // Color blanco con ligeras variaciones
      const brightness = 0.9 + Math.random() * 0.1;
      const color = new Color(brightness, brightness, brightness).getStyle();

      // Retraso para animación escalonada
      const delay = Math.random();

      rays.push({
        position: [x, y, z] as [number, number, number],
        rotation: [rotX, rotY, rotZ] as [number, number, number],
        width,
        height,
        color,
        delay,
      });
    }

    return rays;
  }, [rayCount]);

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

    // Planeta que se eleva con el scroll
    if (meshRef.current) {
      // Elevación elegante
      const elevationCurve = MathUtils.smoothstep(scrollValue, 0, 1);
      meshRef.current.position.y = elevationCurve * 0.8;

      // Rotación suave
      meshRef.current.rotation.y += delta * 0.1;

      // Ligera inclinación con el scroll
      meshRef.current.rotation.z = scrollValue * 0.2;

      // Brillo que aumenta con el scroll
      const material = meshRef.current.material as Material & {
        emissiveIntensity: number;
      };
      if (material) {
        material.emissiveIntensity = scrollValue * 0.3;
      }
    }

    // Nubes
    if (cloudRef.current) {
      // Rotación independiente
      cloudRef.current.rotation.y -= delta * 0.05;

      // Las nubes se hacen más tenues con el scroll
      const material = cloudRef.current.material as Material & {
        opacity: number;
      };
      if (material) {
        material.opacity = Math.max(0.3 - scrollValue * 0.1, 0.15);
      }
    }

    // Aura luminosa
    if (auraRef.current) {
      // Pulso sutil
      const pulseFreq = 0.4;
      const pulseAmp = 0.05;
      const pulse = 1 + Math.sin(time * pulseFreq) * pulseAmp;

      // La aura crece con el scroll
      const auraScale = 1.1 * (1 + scrollValue * 0.2) * pulse;
      auraRef.current.scale.set(auraScale, auraScale, auraScale);

      // Más brillo con el scroll
      const material = auraRef.current.material as Material & {
        opacity: number;
      };
      if (material) {
        material.opacity = Math.min(scrollValue * 0.5, 0.4);
      }
    }
  });

  return (
    <>
      {/* Iluminación ambiental suave */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#ffffff" />

      {/* Planeta */}
      <mesh ref={meshRef} scale={1.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalness={0.1}
          roughness={0.6}
          emissive="#ffffff"
          emissiveIntensity={0}
        />

        {/* Nubes */}
        <mesh ref={cloudRef}>
          <sphereGeometry args={[1.02, 64, 64]} />
          <meshStandardMaterial
            map={cloudMap}
            transparent={true}
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>
      </mesh>

      {/* Aura luminosa */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent={true}
          opacity={0}
          blending={AdditiveBlending}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Rayos de luz */}
      {rayData.map((ray, i) => (
        <LightRay
          key={`ray-${i}`}
          scrollYProgress={scrollYProgress}
          position={ray.position}
          rotation={ray.rotation}
          color={ray.color}
          width={ray.width}
          height={ray.height}
          delay={ray.delay}
        />
      ))}

      {/* Partículas ascendentes */}
      <LightMotes
        scrollYProgress={scrollYProgress}
        count={150}
        radius={1.5}
        size={0.03}
        color="#ffffff"
      />

      {/* Estrellas en el fondo */}
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
    </>
  );
}

export default function PlanetScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  // Configuración de scroll
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
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Planet scrollYProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
