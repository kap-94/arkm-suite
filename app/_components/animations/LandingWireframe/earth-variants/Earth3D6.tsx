"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, MathUtils, Color, AdditiveBlending } from "three";
import { useScroll, MotionValue } from "framer-motion";
import { Stars, Text, Torus } from "@react-three/drei";
import type { BufferGeometry, Material, Object3DEventMap } from "three";

type PlanetProps = {
  scrollYProgress: MotionValue<number>;
};

type ScrollTextProps = {
  scrollYProgress: MotionValue<number>;
};

type PortalRingProps = {
  scrollYProgress: MotionValue<number>;
  radius: number;
  thickness: number;
  color: string;
  speed: number;
  delay: number;
};

// Anillos de portal
function PortalRing({
  scrollYProgress,
  radius,
  thickness,
  color,
  speed,
  delay,
}: PortalRingProps) {
  // Corrección de tipado: useRef<Mesh | null>(null)
  const ringRef = useRef<Mesh | null>(null);
  const colorObj = useMemo(() => new Color(color), [color]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const scroll = scrollYProgress.get();

    if (ringRef.current) {
      // Animación de rotación
      ringRef.current.rotation.z = time * speed + delay;

      // Animación de escala basada en scroll
      const pulseEffect = Math.sin(time * 3 + delay) * 0.05;
      const scaleBase = 0.1 + scroll * 1.2; // Comienza pequeño y crece con el scroll
      ringRef.current.scale.set(
        scaleBase + pulseEffect,
        scaleBase + pulseEffect,
        1
      );

      // Opacidad
      const material = ringRef.current.material as Material & {
        opacity: number;
      };
      material.opacity = Math.min(scroll * 1.5, 0.9);
    }
  });

  return (
    <Torus ref={ringRef} args={[radius, thickness, 64, 64]}>
      <meshBasicMaterial
        color={colorObj}
        transparent={true}
        opacity={0}
        blending={AdditiveBlending}
        toneMapped={false}
      />
    </Torus>
  );
}

// Componente para el planeta con efecto portal
function Planet({ scrollYProgress }: PlanetProps) {
  // Corrección de tipado para todos los refs
  const meshRef = useRef<Mesh | null>(null);
  const portalRef = useRef<Mesh | null>(null);
  const flareRef = useRef<Mesh | null>(null);
  const cloudRef = useRef<Mesh | null>(null);

  // Array de refs para las líneas de energía
  const numEnergyLines = 12;
  const energyLineRefs = useRef<React.RefObject<Mesh | null>[]>([]);

  // Inicializar refs para líneas de energía
  useMemo(() => {
    energyLineRefs.current = Array(numEnergyLines)
      .fill(0)
      .map(() => React.createRef<Mesh | null>());
  }, []);

  // Cargar texturas
  const [colorMap, normalMap, roughnessMap, cloudMap, portalMap] = useLoader(
    TextureLoader,
    [
      "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1668671070647-60485da16f26?q=80&w=3436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ]
  );

  useFrame((state, delta) => {
    const scrollValue = scrollYProgress.get();
    const time = state.clock.getElapsedTime();

    // Planeta principal
    if (meshRef.current) {
      // Rotación base que aumenta con el scroll para dar efecto de absorción
      const rotationSpeed = 0.1 + scrollValue * 0.5; // Aumenta la velocidad de rotación con scroll
      meshRef.current.rotation.y += delta * rotationSpeed;

      // Añade rotación en X y Z para efecto de absorción
      meshRef.current.rotation.x = scrollValue * Math.PI * 0.2;
      meshRef.current.rotation.z = scrollValue * Math.PI * 0.1;

      // Movimiento hacia el centro del vórtex
      meshRef.current.position.z = -scrollValue * 2; // Se mueve hacia el portal (Z negativo)

      // Deformación con scroll - se aplana
      meshRef.current.scale.x = 1.8 * (1 - scrollValue * 0.3); // Se hace más pequeño en X
      meshRef.current.scale.y = 1.8 * (1 - scrollValue * 0.3); // Se hace más pequeño en Y
      meshRef.current.scale.z = 1.8 * (1 - scrollValue * 0.7); // Se hace más pequeño en Z pero más rápido

      // Sin cambio de color a azul
      const material = meshRef.current.material as Material & {
        emissive: Color;
        emissiveIntensity: number;
        opacity: number;
      };

      // En lugar de hacerlo azul, lo hacemos brillar con su propio color
      if (material && scrollValue > 0.4) {
        material.emissiveIntensity = Math.max((scrollValue - 0.4) * 2, 0);
        // Reducimos la opacidad para dar efecto de absorción
        material.opacity = Math.max(1 - scrollValue * 0.8, 0.2);
      }
    }

    // Nubes
    if (cloudRef.current) {
      // Rotación más rápida de nubes con scroll
      cloudRef.current.rotation.y -= delta * (0.15 + scrollValue * 0.3);

      // Las nubes se desvanecen más rápido con el scroll
      const material = cloudRef.current.material as Material & {
        opacity: number;
      };
      if (material) {
        material.opacity = Math.max(0.3 - scrollValue * 0.8, 0);
      }
    }

    // Portal central - aparece con el scroll
    if (portalRef.current) {
      // Escala de crecimiento - crece más rápido
      const portalScale = Math.max(scrollValue - 0.2, 0) * 3;
      portalRef.current.scale.set(portalScale, portalScale, portalScale);

      // Rotación más rápida
      portalRef.current.rotation.z += delta * (0.2 + scrollValue * 0.3);

      // Opacidad
      const material = portalRef.current.material as Material & {
        opacity: number;
      };
      if (material) {
        material.opacity = Math.min(Math.max((scrollValue - 0.2) * 2.5, 0), 1);
      }
    }

    // Destello central - más intenso
    if (flareRef.current) {
      const flareScale = Math.max(scrollValue - 0.3, 0) * 5; // Más grande
      const pulseFactor = 1 + Math.sin(time * 5) * 0.3; // Pulso más pronunciado
      flareRef.current.scale.set(
        flareScale * pulseFactor,
        flareScale * pulseFactor,
        flareScale * pulseFactor
      );

      const material = flareRef.current.material as Material & {
        opacity: number;
      };
      if (material) {
        material.opacity = Math.min(Math.max((scrollValue - 0.3) * 2, 0), 0.9);
      }
    }

    // Líneas de energía
    energyLineRefs.current.forEach((lineRefObj, index) => {
      const lineRef = lineRefObj.current;
      if (lineRef && scrollValue > 0.3) {
        // Aparecen más pronto
        const angle = (Math.PI * 2 * index) / numEnergyLines;
        const startRadius = 0.5 + Math.sin(time * 3 + index) * 0.1;
        const endRadius = 1.8 + Math.cos(time * 2 + index) * 0.2;

        // Calcula posiciones
        lineRef.position.x = Math.cos(angle + time * 0.5) * startRadius;
        lineRef.position.y = Math.sin(angle + time * 0.5) * startRadius;
        lineRef.position.z = Math.sin(time + index) * 0.1; // Ligero movimiento en Z

        // Escala (longitud) - líneas más largas
        lineRef.scale.x = (endRadius - startRadius) * (1 + scrollValue);
        lineRef.scale.y = 0.05 + Math.sin(time * 10 + index) * 0.02;

        // Rotación para apuntar hacia afuera
        lineRef.rotation.z = angle + time * 0.5;

        // Opacidad
        const material = lineRef.material as Material & { opacity: number };
        if (material) {
          material.opacity = Math.min(
            Math.max((scrollValue - 0.3) * 2, 0),
            0.7
          );
        }
      }
    });
  });

  // Colores neutros para el portal (menos azules)
  const portalColor = "#ffffff";
  const ringColors = ["#f0f0f0", "#e0e0e0", "#d8d8d8"];

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 0, 2]} intensity={2} color="#ffffff" />
      <pointLight position={[0, 0, -3]} intensity={1} color="#ffffff" />

      {/* Planeta */}
      <mesh ref={meshRef} scale={1.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalness={0.05}
          roughness={0.2}
          emissive="#ffffff"
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

      {/* Portal central */}
      <mesh ref={portalRef} position={[0, 0, 0]} scale={0.1}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial
          map={portalMap}
          color={portalColor}
          transparent={true}
          opacity={0}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Destello central */}
      <mesh ref={flareRef} position={[0, 0, 0]} scale={0.1}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent={true}
          opacity={0}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Líneas de energía que salen del centro */}
      {Array(numEnergyLines)
        .fill(0)
        .map((_, index) => (
          <mesh
            key={`line-${index}`}
            ref={energyLineRefs.current[index] as React.RefObject<Mesh>}
            position={[0, 0, 0]}
          >
            <planeGeometry args={[1, 0.05]} />
            <meshBasicMaterial
              color={new Color("#ffffff").offsetHSL(0, 0, -index * 0.03)}
              transparent={true}
              opacity={0}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        ))}

      {/* Anillos del portal - colores neutros */}
      <PortalRing
        scrollYProgress={scrollYProgress}
        radius={2}
        thickness={0.1}
        color={ringColors[0]}
        speed={0.3}
        delay={0}
      />
      <PortalRing
        scrollYProgress={scrollYProgress}
        radius={1.7}
        thickness={0.08}
        color={ringColors[1]}
        speed={-0.4}
        delay={1}
      />
      <PortalRing
        scrollYProgress={scrollYProgress}
        radius={1.4}
        thickness={0.05}
        color={ringColors[2]}
        speed={0.5}
        delay={2}
      />

      {/* Estrellas en el fondo */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
    </>
  );
}

// Texto que cambia con el scroll
function ScrollText({ scrollYProgress }: ScrollTextProps) {
  const textRef = useRef<any>(null);
  const portalTextRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const scroll = scrollYProgress.get();
    const time = clock.getElapsedTime();

    // Primer texto
    if (textRef.current) {
      // Opacidad: desaparece al hacer scroll
      textRef.current.opacity = MathUtils.lerp(1, 0, Math.min(scroll * 2, 1));

      // Posición
      textRef.current.position.y = MathUtils.lerp(
        -2,
        0,
        Math.min(scroll * 3, 1)
      );

      // Escala
      const scale = 1 - scroll * 0.8;
      textRef.current.scale.set(scale, scale, scale);
    }

    // Texto del portal
    if (portalTextRef.current) {
      // Solo aparece después de cierto scroll
      portalTextRef.current.opacity = MathUtils.lerp(
        0,
        1,
        Math.max(Math.min((scroll - 0.5) * 3, 1), 0)
      );

      // Efecto vibrante
      const vibration = scroll > 0.6 ? Math.sin(time * 20) * 0.01 : 0;
      portalTextRef.current.position.x = vibration;

      // Escala pulsante
      const pulse = scroll > 0.6 ? 1 + Math.sin(time * 3) * 0.05 : 1;
      portalTextRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <>
      {/* Comentados para que no aparezcan textos, como en tu ejemplo */}
      {/* <Text
        ref={textRef}
        position={[0, -2, -5]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        PLANETA
      </Text>

      <Text
        ref={portalTextRef}
        position={[0, 0, -4]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        toneMapped={false}
      >
        PORTAL
      </Text> */}
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
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Planet scrollYProgress={scrollYProgress} />
          <ScrollText scrollYProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
