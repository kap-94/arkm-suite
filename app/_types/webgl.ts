import * as THREE from "three";

export type TextAlign = "left" | "center" | "right";
export type TextBaseline = "top" | "middle" | "bottom";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

export type FontConfig = {
  family: string;
  weight: number;
  style: string;
  size?: number;
  lineHeight?: number;
};

export interface WebGLTextOptions {
  font: FontConfig;
  pixelRatio: number;
  textAlign: TextAlign;
  textBaseline: TextBaseline;
  scale: number;
  color: string;
  textTransform: TextTransform;
  letterSpacing: string;
  lineHeight: number;
  fontSize: {
    min: number;
    max: number;
    preferred: number;
  };
  position: {
    marginTop: string | number;
    marginBottom: string | number;
  };
}

export interface WebGLTextProps {
  className?: string;
  fragmentShader?: string;
  text: string[] | string;
  options?: Partial<WebGLTextOptions>;
  onComplete?: () => void;
  onFadeComplete?: () => void;
  fadeOutDuration?: number;
  debug?: boolean;
}

export interface WebGLComponents {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  uniforms: {
    time: { value: number };
    textTexture: { value: THREE.Texture | null };
  };
  mesh: THREE.Mesh;
}

export const DEFAULT_TEXT_OPTIONS = {
  font: {
    family: "kranto-normal-semicondensed",
    weight: 300,
    style: "normal",
  },
  pixelRatio: typeof window !== "undefined" ? window.devicePixelRatio || 2 : 2,
  textAlign: "center" as TextAlign,
  textBaseline: "middle" as TextBaseline,
  scale: 2,
  color: "white",
  textTransform: "uppercase" as TextTransform,
  letterSpacing: "0.01em",
  lineHeight: 0.92,
  fontSize: {
    min: 48,
    max: 142,
    preferred: 12,
  },
  position: {
    marginTop: "0",
    marginBottom: "0",
  },
} as const;
