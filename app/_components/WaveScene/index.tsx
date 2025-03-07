"use client";

import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useLoader,
} from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

// Definir los shaders como cadenas de texto
const vertexShader = `
  varying vec2 vUv;
  varying float vWave;
  uniform float uTime;
  
  // Función de ruido simple (puedes ajustar o reemplazar con alguna implementación propia)
  float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    float noiseFreq = 2.0;
    float noiseAmp = 0.4;
    
    // Ejemplo simple de "ruido" usando sin
    float noise = sin(pos.x * noiseFreq + uTime) * noiseAmp;
    pos.z += noise;
    vWave = pos.z;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform sampler2D uTexture;
  
  varying vec2 vUv;
  varying float vWave;
  
  void main() {
    float wave = vWave * 0.2;
    vec3 textureColor = texture2D(uTexture, vUv + wave).rgb;
    gl_FragColor = vec4(textureColor, 1.0);
  }
`;

// Crear el material personalizado sin babel-plugin-glsl
const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("hotpink"),
    uTexture: new THREE.Texture(),
  },
  vertexShader,
  fragmentShader
);

extend({ WaveShaderMaterial });

// Declarar el elemento JSX para que reconozca las propiedades personalizadas del material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial & {
          uTime: number;
          uColor: THREE.Color | string;
          uTexture: THREE.Texture;
        },
        typeof WaveShaderMaterial
      >;
    }
  }
}

function Wave() {
  const ref = useRef<any>(null);

  // Animar el tiempo en cada frame
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime();
    }
  });

  // Cargar la textura (asegúrate de tener un enlace o una imagen local)
  const [image] = useLoader(THREE.TextureLoader, [
    "https://plus.unsplash.com/premium_photo-1738597453072-165b9d750e1b?q=80&w=3465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);

  return (
    <mesh>
      {/* Usamos planeGeometry en lugar de planeBufferGeometry */}
      <planeGeometry args={[2, 2.5, 16, 16]} />
      <waveShaderMaterial uColor="hotpink" uTexture={image} ref={ref} />
    </mesh>
  );
}

export default function WaveScene() {
  return (
    <Canvas
      camera={{ fov: 12, position: [0, 0, 5] }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>
  );
}
