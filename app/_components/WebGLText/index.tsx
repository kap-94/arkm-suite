"use client";
import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import * as THREE from "three";
import { WebGLTextRenderer } from "./WebGLTextRenderer";
import { WebGLTextProps, WebGLComponents } from "@/app/_types/webgl";
import styles from "./WebGLText.module.scss";

// ----------------------------------------
// Ajusta este valor si tu animación es más larga
// ----------------------------------------
const FRUSTUM_SIZE = 1;

// ----------------------------------------
// SHADER_DURATION es cuánto dura tu animación
// de plasma/slicing ANTES de considerarla "completada".
// Subirlo si tu shader dura 7s, 8s, etc.
// ----------------------------------------
const SHADER_DURATION = 8;

// Vertex Shader base
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader base, por si no pasas el custom
const defaultFragmentShader = `
  varying vec2 vUv;
  uniform sampler2D textTexture;
  uniform float time;
  void main() {
    vec4 textColor = texture2D(textTexture, vUv);
    gl_FragColor = textColor;
  }
`;

export const WebGLText: React.FC<WebGLTextProps> = ({
  className,
  fragmentShader = defaultFragmentShader,
  text,
  options = {},
  // Callbacks
  onComplete,
  onFadeComplete,
  // Duración del fade-out (ya NO se usa)
  fadeOutDuration = 1,
  debug = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Tiempos y animación
  const timeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();
  const hasCompletedRef = useRef<boolean>(false);

  // WebGL refs
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.OrthographicCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  // Shader uniforms
  const uniformsRef = useRef<{
    time: { value: number };
    textTexture: { value: THREE.Texture | null };
  }>();

  // ----------------------------------------
  // INICIALIZACIÓN
  // ----------------------------------------
  const initializeWebGL = async (
    container: HTMLDivElement,
    canvas: HTMLCanvasElement
  ): Promise<WebGLComponents | null> => {
    try {
      const textRenderer = new WebGLTextRenderer(options);
      const fontLoaded = await textRenderer.loadFont();

      if (!fontLoaded && debug) {
        console.warn("Font not loaded properly");
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const aspect = container.clientWidth / container.clientHeight;

      const camera = new THREE.OrthographicCamera(
        -aspect * FRUSTUM_SIZE,
        aspect * FRUSTUM_SIZE,
        FRUSTUM_SIZE,
        -FRUSTUM_SIZE,
        0.1,
        10
      );
      camera.position.z = 1;

      const geometry = new THREE.PlaneGeometry(2 * aspect, 2);
      const uniforms = {
        time: { value: timeRef.current },
        textTexture: { value: textRenderer.createTextTexture(container, text) },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        blending: THREE.NormalBlending,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      return { renderer, scene, camera, geometry, material, uniforms, mesh };
    } catch (error) {
      console.error("Error initializing WebGL:", error);
      return null;
    }
  };

  // ----------------------------------------
  // ANIMACIÓN
  // ----------------------------------------
  const animate = (components: WebGLComponents, currentTime: number) => {
    const { renderer, scene, camera, material } = components;
    if (!uniformsRef.current) return;

    if (lastTimeRef.current === 0) {
      lastTimeRef.current = currentTime;
    }

    const deltaTime = (currentTime - lastTimeRef.current) * 0.001;
    lastTimeRef.current = currentTime;
    timeRef.current += deltaTime;

    // Cuando pase el tiempo de duración del shader, invoca onComplete (solo 1 vez).
    if (
      timeRef.current >= SHADER_DURATION &&
      !hasCompletedRef.current &&
      onComplete
    ) {
      hasCompletedRef.current = true;
      onComplete();
    }

    // -------------------------------------
    // Quitar fadeOut => Forzamos la opacidad a 1 siempre
    // -------------------------------------
    material.opacity = 1.0;

    // Actualiza el uniforme time para el shader
    uniformsRef.current.time.value = timeRef.current;

    // Render
    renderer.render(scene, camera);

    // Si quieres un loop infinito, vuelve a llamar
    animationFrameRef.current = requestAnimationFrame((time) =>
      animate(components, time)
    );
  };

  // ----------------------------------------
  // USE EFFECT PRINCIPAL
  // ----------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let components: WebGLComponents | null = null;

    const handleResize = () => {
      if (
        !container ||
        !rendererRef.current ||
        !cameraRef.current ||
        !uniformsRef.current
      )
        return;

      const newAspect = container.clientWidth / container.clientHeight;

      // Update camera
      cameraRef.current.left = -newAspect * FRUSTUM_SIZE;
      cameraRef.current.right = newAspect * FRUSTUM_SIZE;
      cameraRef.current.top = FRUSTUM_SIZE;
      cameraRef.current.bottom = -FRUSTUM_SIZE;
      cameraRef.current.updateProjectionMatrix();

      // Update renderer
      rendererRef.current.setSize(
        container.clientWidth,
        container.clientHeight
      );

      // Update geometry y textura
      const textRenderer = new WebGLTextRenderer(options);
      const newTexture = textRenderer.createTextTexture(container, text);

      if (components) {
        components.geometry.dispose();
        components.mesh.geometry = new THREE.PlaneGeometry(2 * newAspect, 2);

        if (uniformsRef.current.textTexture.value) {
          uniformsRef.current.textTexture.value.dispose();
        }
        uniformsRef.current.textTexture.value = newTexture;
      }
    };

    const debouncedResize = debounce(handleResize, 100);

    const setup = async () => {
      components = await initializeWebGL(container, canvas);
      if (!components) return;

      const { renderer, scene, camera, uniforms } = components;

      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;
      uniformsRef.current = uniforms;

      window.addEventListener("resize", debouncedResize);
      animationFrameRef.current = requestAnimationFrame((time) =>
        animate(components!, time)
      );
    };

    setup();

    return () => {
      // Limpieza
      window.removeEventListener("resize", debouncedResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (components) {
        const { geometry, material } = components;
        geometry.dispose();
        material.dispose();
        if (uniformsRef.current?.textTexture.value) {
          uniformsRef.current.textTexture.value.dispose();
        }
        rendererRef.current?.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fragmentShader, text, options, onComplete, onFadeComplete, debug]);

  return (
    <div
      ref={containerRef}
      className={classNames(styles["webgl-text-container"], className)}
    >
      <canvas ref={canvasRef} className={classNames(styles["webgl-canvas"])} />
      <span className={classNames(styles["text"])}>
        {Array.isArray(text)
          ? text.map((line, index) => (
              <span key={index}>
                {line}
                {index < text.length - 1 && <br />}
              </span>
            ))
          : text}
      </span>
    </div>
  );
};

// Utility function for debouncing
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default WebGLText;
