"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, Mesh, MathUtils } from "three";
import { useScroll, MotionValue } from "framer-motion";
import { Stars } from "@react-three/drei";

type PlanetProps = {
  scrollYProgress: MotionValue<number>;
  transitionState: React.MutableRefObject<
    "scrolling" | "idle" | "transitioning"
  >;
};

// Componente para el planeta
function Planet({ scrollYProgress, transitionState }: PlanetProps) {
  const meshRef = useRef<Mesh | null>(null);
  const cloudRef = useRef<Mesh | null>(null);
  const prevScrollRef = useRef<number>(0);
  const targetPositionRef = useRef<{ x: number; y: number; z: number }>({
    x: 0,
    y: -1.5,
    z: 0,
  });
  const currentScaleRef = useRef<number>(0.7);

  // Cargar texturas
  const [colorMap, normalMap, roughnessMap, cloudMap] = useLoader(
    TextureLoader,
    [
      "/images/home/pink-clouds.jpg",
      "/images/home/pink-smoke-texture.jpg",
      "/images/home/pink-clouds.jpg",
      "/images/home/pink-smoke-texture.jpg",
    ]
  );

  useFrame((state, delta) => {
    const scrollValue = scrollYProgress.get();
    const time = state.clock.getElapsedTime();

    // Usar el estado de transición para controlar el comportamiento
    const currentTransitionState = transitionState.current;

    // Detectar si estamos haciendo scroll o no
    const isScrolling = Math.abs(scrollValue - prevScrollRef.current) > 0.0001;
    prevScrollRef.current = scrollValue;

    if (meshRef.current) {
      // Calcular escala basada en scroll
      const scaleStart = 0.7; // Escala inicial más pequeña
      // const targetScale = scaleStart + scrollValue * 1.3; // Crece hasta 2.0x
      const targetScale = scaleStart + scrollValue;

      // Factor de suavizado diferente según el estado
      let smoothingFactor;
      switch (currentTransitionState) {
        case "scrolling":
          smoothingFactor = delta * 5; // Rápido durante scroll
          break;
        case "transitioning":
          smoothingFactor = delta * 2; // Más lento durante transición
          break;
        case "idle":
          smoothingFactor = delta * 1; // Muy lento cuando está en reposo
          break;
        default:
          smoothingFactor = delta * 3; // Valor por defecto
      }

      // Suavizar la transición de escala
      currentScaleRef.current = MathUtils.lerp(
        currentScaleRef.current,
        targetScale,
        smoothingFactor
      );

      meshRef.current.scale.setScalar(currentScaleRef.current);

      // Elevación con el scroll - posición Y final fija
      const initialY = -1.5; // Empieza más abajo
      const targetY = 0.5; // Sube hasta esta altura
      const elevationY = MathUtils.lerp(
        initialY,
        targetY,
        MathUtils.smoothstep(scrollValue, 0, 1)
      );

      // El efecto flotante solo se aplica cuando estamos scrolleando
      let floatY = 0;
      if (currentTransitionState === "scrolling") {
        const floatAmplitude = 0.1 + scrollValue * 0.15;
        const floatSpeed = 0.5;
        floatY = Math.sin(time * floatSpeed) * floatAmplitude;
      }

      // Actualizar la posición objetivo
      targetPositionRef.current.y =
        elevationY + (currentTransitionState === "scrolling" ? floatY : 0);

      // Movimiento lateral solo cuando scrolleamos
      let swayX = 0;
      if (currentTransitionState === "scrolling") {
        const swayAmplitude = 0.05 + scrollValue * 0.1;
        swayX = Math.sin(time * 0.4) * swayAmplitude;
      }

      targetPositionRef.current.x =
        currentTransitionState === "scrolling" ? swayX : 0;

      // Efecto de acercarse al observador
      targetPositionRef.current.z = scrollValue * -0.5;

      // Suavizado adaptativo según el estado de transición
      const positionLerpFactor =
        currentTransitionState === "scrolling"
          ? delta * 4
          : currentTransitionState === "transitioning"
          ? delta * 2
          : delta * 0.5;

      // Aplicar suavizado a la posición para evitar movimientos bruscos
      meshRef.current.position.x = MathUtils.lerp(
        meshRef.current.position.x,
        targetPositionRef.current.x,
        positionLerpFactor
      );

      meshRef.current.position.y = MathUtils.lerp(
        meshRef.current.position.y,
        targetPositionRef.current.y,
        positionLerpFactor
      );

      meshRef.current.position.z = MathUtils.lerp(
        meshRef.current.position.z,
        targetPositionRef.current.z,
        positionLerpFactor
      );

      // Rotación suave
      meshRef.current.rotation.y += delta * (0.1 + scrollValue * 0.2);

      // Inclinación variable - solo cuando scrolleamos
      if (currentTransitionState === "scrolling") {
        meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
      } else {
        // Volver suavemente a inclinación 0 cuando no scrolleamos
        meshRef.current.rotation.z = MathUtils.lerp(
          meshRef.current.rotation.z,
          0,
          delta * 2
        );
      }
    }

    // Nubes con rotación independiente
    if (cloudRef.current) {
      cloudRef.current.rotation.y -= delta * 0.15;

      // Nubes que se hacen más densas con elevación
      const material = cloudRef.current.material as any;
      if (material) {
        const cloudOpacityBase = 0.3;
        const cloudOpacityMax = 0.5;
        material.opacity =
          cloudOpacityBase + scrollValue * (cloudOpacityMax - cloudOpacityBase);
      }
    }
  });

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1.5} position={[3, 1, -2]} color="#ffffff" />
      <pointLight position={[-2, 1, 0]} intensity={0.3} color="#f0f0f0" />
      <pointLight position={[0, -3, 0]} intensity={0.2} color="#f8f8f8" />

      {/* Planeta */}
      <mesh ref={meshRef} position={[0, -1.5, 0]} scale={0.7}>
        {/* <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalness={0.1}
          roughness={0.8}
        /> */}

        {/* Nubes */}
        {/* <mesh ref={cloudRef}>
          <sphereGeometry args={[1.02, 64, 64]} />
          <meshStandardMaterial
            map={cloudMap}
            transparent={true}
            opacity={0.3}
            blending={2}
          />
        </mesh> */}
      </mesh>

      {/* Estrellas en el fondo */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
    </>
  );
}

export default function PlanetScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  // Ref para guardar el valor de scroll anterior
  const prevScrollValueRef = useRef<number>(0);
  // Ref para controlar la transición entre estados
  const transitionStateRef = useRef<"scrolling" | "idle" | "transitioning">(
    "idle"
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  // Usar useEffect para detectar cuando el scroll se detiene y manejar la transición
  useEffect(() => {
    // Crear un observable para el valor de scroll
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Verificar si estamos scrolleando
      const isScrolling =
        Math.abs(latest - prevScrollValueRef.current) > 0.0001;
      prevScrollValueRef.current = latest;

      if (isScrolling && transitionStateRef.current !== "scrolling") {
        transitionStateRef.current = "scrolling";
      } else if (!isScrolling && transitionStateRef.current === "scrolling") {
        // Cambiar a estado de transición
        transitionStateRef.current = "transitioning";

        // Después de un tiempo, cambiar a estado idle
        setTimeout(() => {
          transitionStateRef.current = "idle";
        }, 300); // 300ms para la transición
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div
      ref={sceneRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
        isolation: "isolate",
        transformStyle: "preserve-3d", // Importante para evitar ajustes de composición
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        dpr={[1, 2]}
        style={{
          touchAction: "none",
          willChange: "transform", // Estabiliza el canvas durante animaciones
          transformStyle: "preserve-3d", // Preserva el contexto 3D
        }}
        // Añadir legacy y flat para mejorar la estabilidad en ThreeJS
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true, // Preserva el buffer para evitar parpadeos
        }}
        // frameloop={transitionStateRef.current === "idle" ? "demand" : undefined}
      >
        <Suspense fallback={null}>
          <Planet
            scrollYProgress={scrollYProgress}
            transitionState={transitionStateRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
