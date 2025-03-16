"use client";

import * as THREE from "three";
import React, {
  useRef,
  useMemo,
  Suspense,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { shaderMaterial, OrbitControls, Html } from "@react-three/drei";
import { gsap } from "gsap";
import classNames from "classnames/bind";
import styles from "./ChromaticRippleScene.module.scss";
import ScrollAnimationController from "../ScrollAnimationController/ScrollAnimationController";

const cx = classNames.bind(styles);

// Colores de la aplicación
const COLORS = {
  primary: "#26225F",
  secondary: "#4f46e5",
  tertiary: "#000000",
};

// Vertex shader con efecto de desplazamiento de imagen y ondas
const vertexShader = `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform vec2 uMouse;
  uniform float uScrollProgress;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;

  vec3 mod289(vec3 x) { 
    return x - floor(x * (1.0 / 289.0)) * 289.0; 
  }
  vec4 mod289(vec4 x) { 
    return x - floor(x * (1.0 / 289.0)) * 289.0; 
  }
  vec4 permute(vec4 x) { 
    return mod289(((x*34.0)+1.0)*x); 
  }
  vec4 taylorInvSqrt(vec4 r) { 
    return 1.79284291400159 - 0.85373472095314 * r; 
  }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod289(i);
    vec4 p = permute(
      permute(
        permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0)
      ) + i.x + vec4(0.0, i1.x, i2.x, 1.0)
    );

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(
      dot(p0, p0),
      dot(p1, p1),
      dot(p2, p2),
      dot(p3, p3)
    ));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(
      0.6 - vec4(
        dot(x0, x0),
        dot(x1, x1),
        dot(x2, x2),
        dot(x3, x3)
      ), 0.0
    );
    m = m * m;
    return 42.0 * dot(m*m, vec4(
      dot(p0, x0),
      dot(p1, x1),
      dot(p2, x2),
      dot(p3, x3)
    ));
  }

  void main() {
    vUv = uv;
    float mouseDistance = length(uMouse - vUv);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance);
    float scrollEffect = uScrollProgress * 2.0 - 1.0;
    vec3 pos = position;
    float noiseScale = 0.8 + uScrollProgress * 0.5;
    float noiseTime = uTime * 0.5;
    float scrollFrequency = uFrequency * (1.0 + scrollEffect * 0.5);
    vec3 noiseInput = vec3(vUv * scrollFrequency, noiseTime + uScrollProgress);
    float noiseValue = snoise(noiseInput) * uAmplitude;
    noiseValue *= (1.0 + mouseInfluence * 2.0);
    float verticalOffset = sin(uScrollProgress * 3.14159) * 0.2;
    pos.z += noiseValue * (1.0 + abs(scrollEffect) * 0.5);
    float angleX = uScrollProgress * 0.1 * 3.14159;
    float angleY = uScrollProgress * 0.2 * 3.14159;
    float cosX = cos(angleX);
    float sinX = sin(angleX);
    pos.y = pos.y * cosX - pos.z * sinX;
    pos.z = pos.y * sinX + pos.z * cosX;
    float cosY = cos(angleY);
    float sinY = sin(angleY);
    pos.x = pos.x * cosY + pos.z * sinY;
    pos.z = -pos.x * sinY + pos.z * cosY;
    float zoom = 1.0 + uScrollProgress * 0.2;
    pos.xy *= zoom;
    pos.y += verticalOffset;
    float storyWave = sin(vUv.y * 10.0 + uScrollProgress * 10.0) * 0.05 * uScrollProgress;
    pos.x += storyWave;
    vElevation = noiseValue;
    vDistortion = mouseInfluence + abs(scrollEffect) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader con efecto RGB y viñeta
const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform float uRGBShift;
  uniform vec3 uSecondaryColor;
  uniform float uScrollProgress;
  varying vec2 vUv;
  varying float vElevation;
  varying float vDistortion;
  
  vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
    float r = texture2D(textureImage, uv + offset).r;
    vec2 gb = texture2D(textureImage, uv).gb;
    return vec3(r, gb);
  }
  
  void main() {
    float rgbShiftAmount = uRGBShift * (1.0 + vDistortion * 2.0);
    rgbShiftAmount *= (1.0 + uScrollProgress * 2.0);
    vec2 offset = rgbShiftAmount * vec2(
      cos(uTime * 0.2 + uScrollProgress * 3.14159), 
      sin(uTime * 0.2 + uScrollProgress * 3.14159)
    );
    vec2 animatedUV = vUv;
    animatedUV.x += sin(vUv.y * 10.0 + uTime * 0.5 + uScrollProgress * 3.14159) * 0.02 * uScrollProgress;
    animatedUV.y += cos(vUv.x * 10.0 + uTime * 0.5 + uScrollProgress * 3.14159) * 0.02 * uScrollProgress;
    vec3 color = rgbShift(uTexture, animatedUV, offset);
    vec3 startColor = uColor;
    vec3 endColor = uSecondaryColor;
    vec3 scrollColor = mix(startColor, endColor, uScrollProgress);
    color = mix(color, scrollColor, 0.25 + uScrollProgress * 0.25);
    vec3 highlightColor = mix(uSecondaryColor, vec3(1.0, 0.5, 0.0), uScrollProgress);
    color += vElevation * highlightColor * (0.2 + uScrollProgress * 0.3);
    vec2 center = vec2(0.5, 0.5);
    center.y += uScrollProgress * 0.2;
    float dist = length(vUv - center);
    float vignette = smoothstep(0.8 - uScrollProgress * 0.3, 0.2 + uScrollProgress * 0.3, dist);
    vec3 blackColor = vec3(0.0, 0.0, 0.0);
    color = mix(blackColor, color, vignette);
    float flashPoint1 = smoothstep(0.2, 0.3, uScrollProgress) - smoothstep(0.3, 0.4, uScrollProgress);
    float flashPoint2 = smoothstep(0.6, 0.7, uScrollProgress) - smoothstep(0.7, 0.8, uScrollProgress);
    float flashEffect = flashPoint1 + flashPoint2;
    color += flashEffect * vec3(0.3, 0.2, 0.6);
    float sceneTransition1 = smoothstep(0.45, 0.55, uScrollProgress);
    float haloEffect = sin(uScrollProgress * 6.28) * 0.5 + 0.5;
    color += haloEffect * vDistortion * vec3(0.1, 0.2, 0.4) * sceneTransition1;
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Tipo para nuestro material shader personalizado
type ChromaticRippleMaterialImpl = THREE.ShaderMaterial & {
  uTime: number;
  uFrequency: number;
  uAmplitude: number;
  uColor: THREE.Color;
  uSecondaryColor: THREE.Color;
  uTexture: THREE.Texture;
  uRGBShift: number;
  uMouse: THREE.Vector2;
  uScrollProgress: number;
};

// Crear material shader
const ChromaticRippleMaterial = shaderMaterial(
  {
    uTime: 0,
    uFrequency: 3.0,
    uAmplitude: 0.2,
    uColor: new THREE.Color(COLORS.primary),
    uSecondaryColor: new THREE.Color(COLORS.secondary),
    uTexture: new THREE.Texture(),
    uRGBShift: 0.01,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uScrollProgress: 0.0,
  },
  vertexShader,
  fragmentShader
);

// Extender Three.js con nuestro material personalizado
extend({ ChromaticRippleMaterial });

// Declaración de tipo para JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      chromaticRippleMaterial: any;
    }
  }
}

// Componente que envuelve el mesh y añade el overlay
function MeshWithOverlay({ children }: { children: ReactNode }): JSX.Element {
  return (
    <group>
      {children}
      <Html
        center
        transform
        style={{
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div className={cx("floating-image-overlay")} />
      </Html>
    </group>
  );
}

// Componente FloatingImage
function FloatingImage(): JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<ChromaticRippleMaterialImpl>(null);
  const { mouse, viewport, size } = useThree();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.initialY = meshRef.current.position.y;
    }
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      gsap.from(materialRef.current, {
        uFrequency: 0.5,
        uAmplitude: 0.05,
        duration: 2,
        ease: "power3.out",
      });
      gsap.to(materialRef.current, {
        uRGBShift: 0.03,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      ScrollAnimationController.init(meshRef, materialRef);
    }
    return () => {
      ScrollAnimationController.destroy();
    };
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      materialRef.current.uMouse.set(mouse.x * 0.5 + 0.5, -mouse.y * 0.5 + 0.5);
    }
  });

  const baseScale = 0.4;
  const responsiveScale = Math.min(1, size.width / 1200) * baseScale;
  const geometry = useMemo(() => new THREE.PlaneGeometry(3, 2, 32, 32), []);
  const yOffset = viewport.height / 2 - (2 * responsiveScale) / 2;

  const [texture] = useLoader(
    THREE.TextureLoader,
    [
      "https://images.unsplash.com/photo-1673526759317-be71a1243e3d?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    undefined,
    (err) => {
      console.error("Error cargando textura:", err);
    }
  );

  return (
    <MeshWithOverlay>
      <mesh
        ref={meshRef}
        scale={[responsiveScale, responsiveScale, responsiveScale]}
        position={[0, yOffset, 0]}
      >
        <primitive object={geometry} attach="geometry" />
        <chromaticRippleMaterial
          ref={materialRef}
          uTexture={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </MeshWithOverlay>
  );
}

// Componente principal de la escena
interface ChromaticRippleSceneProps {
  scrollProgress?: number;
}

export default function ChromaticRippleScene({
  scrollProgress = 0,
}: ChromaticRippleSceneProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
      checkIfMobile();
      window.addEventListener("resize", checkIfMobile);
      return () => window.removeEventListener("resize", checkIfMobile);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cx("container")}
      style={{ backgroundColor: "black" }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        gl={{
          alpha: true,
          antialias: !isMobile,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        camera={{
          position: [0, 0, isMobile ? 3 : 2.5],
          fov: isMobile ? 35 : 30,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, Math.min(2, window.devicePixelRatio)]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 5, 5]}
          intensity={0.8}
          color={COLORS.secondary}
        />
        <Suspense fallback={null}>
          <group>
            <FloatingImage />
          </group>
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
