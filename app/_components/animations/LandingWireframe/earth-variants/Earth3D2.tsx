"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  Mesh,
  MathUtils,
  Color,
  AdditiveBlending,
  DoubleSide,
  Vector3,
  SphereGeometry,
} from "three";
import { useScroll, MotionValue } from "framer-motion";
import { Stars, Text, Ring, Trail } from "@react-three/drei";
import type { Material } from "three";

type PlanetProps = {
  scrollYProgress: MotionValue<number>;
};

type ScrollTextProps = {
  scrollYProgress: MotionValue<number>;
};

type AccretionDiskProps = {
  scrollYProgress: MotionValue<number>;
};

type GravitationalLensProps = {
  scrollYProgress: MotionValue<number>;
};

// Disco de acreción alrededor del agujero negro
function AccretionDisk({ scrollYProgress }: AccretionDiskProps) {
  const ringRef = useRef<Mesh | null>(null);
  const particlesRef = useRef<any[]>([]);
  const particleCount = 20;

  // Inicializar refs para partículas
  useMemo(() => {
    particlesRef.current = Array(particleCount)
      .fill(0)
      .map(() => React.createRef<Mesh>());
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const scroll = scrollYProgress.get();

    // Disco principal
    if (ringRef.current) {
      // Rotación más rápida con scroll
      ringRef.current.rotation.z = time * (0.1 + scroll * 0.3);

      // Escala creciente
      const scale = 1.2 + scroll * 3;
      ringRef.current.scale.set(scale, scale, 1);

      // El disco se inclina con el scroll
      ringRef.current.rotation.x = MathUtils.degToRad(20 + scroll * 40);

      // Colores más intensos
      const material = ringRef.current.material as Material & {
        opacity: number;
      };
      if (material) {
        material.opacity = Math.min(scroll * 1.2, 0.8);
      }
    }

    // Partículas del disco
    particlesRef.current.forEach((particleRefObj, i) => {
      const particleRef = particleRefObj.current;
      if (particleRef) {
        const index = i / particleCount;
        const angle = index * Math.PI * 2 + time * (0.1 + index * 0.2);
        const radius = 1.2 + index * 2 + scroll * 2;

        // Posición en espiral
        particleRef.position.x = Math.cos(angle) * radius;
        particleRef.position.y = Math.sin(angle) * radius;

        // El disco se inclina, igual que el anillo principal
        particleRef.position.z =
          Math.sin(angle * 0.5) *
          0.1 *
          radius *
          Math.sin(MathUtils.degToRad(scroll * 40));

        // Velocidad que aumenta al acercarse al centro
        const sizeFactor = 1 - index * 0.5; // Más grande cerca del centro
        const size = (0.1 + scroll * 0.2) * sizeFactor;
        particleRef.scale.set(size, size, size);

        // Colores más intensos cerca del centro
        const material = particleRef.material as Material & {
          opacity: number;
          color: Color;
        };
        if (material) {
          material.opacity = Math.min(scroll * 1.5 * (1 - index * 0.5), 1);

          // Cambia de amarillo a rojo según aceleración
          const hue = 0.1 - (1 - index) * 0.1;
          const saturation = 0.8;
          const lightness = 0.5 + index * 0.3;
          material.color.setHSL(hue, saturation, lightness);
        }
      }
    });
  });

  return (
    <>
      {/* Disco principal */}
      <mesh ref={ringRef} rotation={[MathUtils.degToRad(20), 0, 0]}>
        <ringGeometry args={[1, 3, 64]} />
        <meshBasicMaterial
          color="#ffcc33"
          side={DoubleSide}
          transparent={true}
          opacity={0}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Partículas del disco */}
      {Array(particleCount)
        .fill(0)
        .map((_, i) => (
          <mesh key={`particle-${i}`} ref={particlesRef.current[i]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial
              color="#ffaa33"
              transparent={true}
              opacity={0}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        ))}
    </>
  );
}

// Efecto de lente gravitacional
function GravitationalLens({ scrollYProgress }: GravitationalLensProps) {
  const lensRef = useRef<Mesh | null>(null);
  const blackHoleRef = useRef<Mesh | null>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const scroll = scrollYProgress.get();

    // Efecto de lente
    if (lensRef.current) {
      // Crece con el scroll
      const scale = Math.max(0, scroll - 0.3) * 5;
      lensRef.current.scale.set(scale, scale, scale);

      // Pulso
      lensRef.current.position.z = Math.sin(time) * 0.1;

      // Opacidad
      const material = lensRef.current.material as Material & {
        opacity: number;
      };
      if (material) {
        material.opacity = Math.min(Math.max(0, scroll - 0.3) * 1.5, 0.7);
      }
    }

    // Agujero negro central
    if (blackHoleRef.current) {
      // Crece lentamente con el scroll
      const scale = 0.1 + scroll * 1.5;
      blackHoleRef.current.scale.set(scale, scale, scale);

      // Rotación
      blackHoleRef.current.rotation.z = time * 0.2;
    }
  });

  return (
    <>
      {/* Lente gravitacional */}
      <mesh ref={lensRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent={true}
          opacity={0}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Agujero negro central */}
      <mesh ref={blackHoleRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#000000" transparent={false} />
      </mesh>
    </>
  );
}

// Componente para el planeta con efecto agujero negro
function Planet({ scrollYProgress }: PlanetProps) {
  const meshRef = useRef<Mesh | null>(null);
  const cloudRef = useRef<Mesh | null>(null);
  const streamerRefs = useRef<React.RefObject<Mesh | null>[]>([]);

  // Número de líneas de materia estelar
  const numStreamers = 8;

  // Inicializar refs para streamers
  useMemo(() => {
    streamerRefs.current = Array(numStreamers)
      .fill(0)
      .map(() => React.createRef<Mesh | null>());
  }, []);

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

    // Planeta principal - se deforma y espiraliza hacia el centro
    if (meshRef.current) {
      // Rotación que aumenta con el scroll
      meshRef.current.rotation.y += delta * (0.1 + scrollValue * 0.5);

      // Movimiento espiral hacia el centro
      if (scrollValue > 0.2) {
        const spiralFactor = Math.min((scrollValue - 0.2) * 3, 1);
        const spiralRadius = Math.max(2 - spiralFactor * 2, 0);
        const spiralAngle = time * 2 * spiralFactor;

        // Posición espiral
        meshRef.current.position.x = Math.cos(spiralAngle) * spiralRadius;
        meshRef.current.position.y = Math.sin(spiralAngle) * spiralRadius;
        meshRef.current.position.z = -spiralFactor * 2; // Se acerca al observador

        // Estiramiento por fuerzas de marea
        const stretchFactor = 1 + spiralFactor * 2;
        const squishFactor = 1 - spiralFactor * 0.5;

        // Calcular vector de dirección hacia el centro
        const direction = new Vector3(0, 0, 0)
          .sub(meshRef.current.position)
          .normalize();

        // Aplicar deformación en dirección al centro
        meshRef.current.scale.x = 1.5 * squishFactor;
        meshRef.current.scale.y = 1.5 * squishFactor;
        meshRef.current.scale.z = 1.5 * squishFactor;

        // Rotación para que el planeta siempre "mire" hacia el centro
        if (spiralFactor > 0.1) {
          meshRef.current.lookAt(0, 0, 0);
        }

        // Opacidad - se desvanece al acercarse demasiado
        const material = meshRef.current.material as Material & {
          opacity: number;
          emissiveIntensity: number;
        };

        if (material) {
          if (spiralFactor > 0.7) {
            material.opacity = Math.max(1 - (spiralFactor - 0.7) * 3, 0);
          }

          // Calor por fricción
          material.emissiveIntensity = spiralFactor * 0.5;
        }
      }
    }

    // Nubes
    if (cloudRef.current) {
      cloudRef.current.rotation.y -= delta * (0.15 + scrollValue * 0.3);

      // Las nubes se desvanecen más rápido
      const material = cloudRef.current.material as Material & {
        opacity: number;
      };
      if (material) {
        material.opacity = Math.max(0.3 - scrollValue * 1, 0);
      }

      // Las nubes siguen al planeta
      if (meshRef.current) {
        cloudRef.current.position.copy(meshRef.current.position);
      }
    }

    // Líneas de materia estelar
    streamerRefs.current.forEach((streamerRefObj, index) => {
      const streamerRef = streamerRefObj.current;
      if (streamerRef && scrollValue > 0.2 && meshRef.current) {
        const angle = (Math.PI * 2 * index) / numStreamers;
        const streamerLength = 0.5 + scrollValue * 2;

        // Punto de inicio: en el planeta
        const planetPos = meshRef.current.position.clone();
        const dirToCenter = new Vector3(0, 0, 0).sub(planetPos).normalize();

        // Posición en el perímetro del planeta
        const planetRadius = 1.5 * (1 - scrollValue * 0.3);
        const startPos = planetPos
          .clone()
          .add(
            new Vector3(
              Math.cos(angle) * planetRadius,
              Math.sin(angle) * planetRadius,
              0
            ).applyQuaternion(meshRef.current.quaternion)
          );

        // Punto de inicio de la línea
        streamerRef.position.copy(startPos);

        // Orientación hacia el centro
        streamerRef.lookAt(0, 0, 0);

        // Longitud de la línea, aumenta con el scroll
        streamerRef.scale.x = streamerLength;
        streamerRef.scale.y = 0.05 + scrollValue * 0.1;

        // Color y opacidad
        const material = streamerRef.material as Material & {
          opacity: number;
          color: Color;
        };

        if (material) {
          material.opacity = Math.min((scrollValue - 0.2) * 2, 0.8);

          // Colores de materia estelar caliente
          const heat = Math.random() * 0.1; // variación aleatoria para efecto de parpadeo
          material.color.setHSL(0.05 + heat, 0.8, 0.5 + heat);
        }
      }
    });
  });

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 5, 10]} intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={1.0} color="#ffaa00" />

      {/* Planeta */}
      <mesh ref={meshRef} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalness={0.1}
          roughness={0.4}
          emissive="#ff9933"
          emissiveIntensity={0}
          transparent={true}
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

      {/* Líneas de materia estelar */}
      {Array(numStreamers)
        .fill(0)
        .map((_, index) => (
          <mesh
            key={`streamer-${index}`}
            ref={streamerRefs.current[index] as React.RefObject<Mesh>}
          >
            <planeGeometry args={[1, 0.05]} />
            <meshBasicMaterial
              color="#ffaa33"
              transparent={true}
              opacity={0}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        ))}

      {/* Disco de acreción */}
      <AccretionDisk scrollYProgress={scrollYProgress} />

      {/* Efecto de lente gravitacional */}
      <GravitationalLens scrollYProgress={scrollYProgress} />

      {/* Estrellas en el fondo */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
    </>
  );
}

// Texto (vacío como en tu ejemplo)
function ScrollText({ scrollYProgress }: ScrollTextProps) {
  return <></>;
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
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Planet scrollYProgress={scrollYProgress} />
          <ScrollText scrollYProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
