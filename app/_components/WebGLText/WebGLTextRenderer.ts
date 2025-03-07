import * as THREE from "three";
import { WebGLTextOptions, DEFAULT_TEXT_OPTIONS } from "@/app/_types/webgl";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export class WebGLTextRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: WebGLTextOptions;

  constructor(options: DeepPartial<WebGLTextOptions> = {}) {
    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("Failed to get 2D context");
    this.ctx = ctx;

    const defaultOptions = {
      font: {
        family: DEFAULT_TEXT_OPTIONS.font.family,
        weight: DEFAULT_TEXT_OPTIONS.font.weight,
        style: DEFAULT_TEXT_OPTIONS.font.style,
      },
      pixelRatio: DEFAULT_TEXT_OPTIONS.pixelRatio,
      textAlign: DEFAULT_TEXT_OPTIONS.textAlign,
      textBaseline: DEFAULT_TEXT_OPTIONS.textBaseline,
      scale: DEFAULT_TEXT_OPTIONS.scale,
      color: DEFAULT_TEXT_OPTIONS.color,
      textTransform: DEFAULT_TEXT_OPTIONS.textTransform,
      letterSpacing: DEFAULT_TEXT_OPTIONS.letterSpacing,
      lineHeight: DEFAULT_TEXT_OPTIONS.lineHeight,
      fontSize: {
        min: DEFAULT_TEXT_OPTIONS.fontSize.min,
        max: DEFAULT_TEXT_OPTIONS.fontSize.max,
        preferred: DEFAULT_TEXT_OPTIONS.fontSize.preferred,
      },
      position: {
        marginTop: DEFAULT_TEXT_OPTIONS.position.marginTop,
        marginBottom: DEFAULT_TEXT_OPTIONS.position.marginBottom,
      },
    } as WebGLTextOptions;

    this.options = {
      ...defaultOptions,
      ...options,
      font: {
        ...defaultOptions.font,
        ...(options.font || {}),
      },
      fontSize: {
        ...defaultOptions.fontSize,
        ...(options.fontSize || {}),
      },
      position: {
        ...defaultOptions.position,
        ...(options.position || {}),
      },
    };
  }

  // Agregamos el método loadFont que faltaba
  async loadFont(): Promise<boolean> {
    try {
      // Esperar a que las fuentes del documento estén listas
      await document.fonts.ready;

      // Construir el string de la fuente
      const fontString = `${this.options.font.weight} 16px "${this.options.font.family}"`;

      // Intentar cargar la fuente específica
      await document.fonts.load(fontString);

      // Verificar si la fuente está disponible
      return document.fonts.check(fontString);
    } catch (error) {
      console.error("Error loading font:", error);
      return false;
    }
  }

  private calculateResponsiveFontSize(containerWidth: number): number {
    const { fontSize } = this.options;

    // Calcular el tamaño preferido basado en el viewport width (vw)
    const preferredSize = (containerWidth * fontSize.preferred) / 100;

    // Aplicar el clamp
    return Math.max(fontSize.min, Math.min(preferredSize, fontSize.max));
  }

  private setupContext(container: HTMLElement): void {
    const { font, textAlign, textBaseline, color, letterSpacing } =
      this.options;

    this.ctx.textRendering = "optimizeLegibility";
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = textBaseline;
    this.ctx.fillStyle = color;

    // Usar el ancho real del contenedor para el cálculo
    const fontSize = this.calculateResponsiveFontSize(container.clientWidth);

    this.ctx.font = `${font.weight} ${fontSize}px "${font.family}"`;
    // @ts-ignore
    this.ctx.letterSpacing = letterSpacing;
  }

  private setupCanvas(container: HTMLElement): {
    width: number;
    height: number;
  } {
    const width = container.clientWidth * this.options.scale;
    const height = container.clientHeight * this.options.scale;

    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.scale(this.options.scale, this.options.scale);

    return { width, height };
  }

  createTextTexture(
    container: HTMLElement,
    text: string[] | string
  ): THREE.Texture | null {
    try {
      const { width, height } = this.setupCanvas(container);
      this.setupContext(container);
      this.renderText(text, width, height, container);

      const texture = new THREE.Texture(this.canvas);
      texture.needsUpdate = true;
      return texture;
    } catch (error) {
      console.error("Error creating texture:", error);
      return null;
    }
  }

  private renderText(
    text: string[] | string,
    width: number,
    height: number,
    container: HTMLElement
  ): void {
    const lines = Array.isArray(text) ? text : [text];

    // Calcular el tamaño de fuente usando el ancho real del contenedor
    const fontSize = this.calculateResponsiveFontSize(container.clientWidth);
    const lineHeight = fontSize * this.options.lineHeight;

    const transformedLines = lines.map((line) => {
      if (typeof line !== "string") return "";

      switch (this.options.textTransform) {
        case "uppercase":
          return line.toUpperCase();
        case "lowercase":
          return line.toLowerCase();
        case "capitalize":
          return line.replace(/\b\w/g, (l) => l.toUpperCase());
        default:
          return line;
      }
    });

    const startY = height / (2 * this.options.scale);
    const totalLines = transformedLines.length;
    const totalHeight = lineHeight * (totalLines - 1);
    const verticalOffset = totalHeight / 2;

    this.ctx.clearRect(0, 0, width, height);

    transformedLines.forEach((line, index) => {
      const y = startY - verticalOffset + index * lineHeight;
      this.ctx.fillText(line, width / (2 * this.options.scale), y);
    });
  }
}
