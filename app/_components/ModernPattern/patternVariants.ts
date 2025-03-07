import { PatternColors } from "./types";

interface DrawParams {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  time: number;
  colors: PatternColors;
  opacity: {
    lines: number;
    particles: number;
    connections: number;
    shapes: number;
  };
  particles: Array<{
    x: number;
    y: number;
    radius: number;
    speed: number;
    angle: number;
  }>;
}

export const drawDefaultPattern = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
  particles,
}: DrawParams) => {
  // Draw flowing lines
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const yOffset = (canvas.height / 4) * i;
    ctx.moveTo(0, yOffset);
    for (let x = 0; x < canvas.width; x += 10) {
      const y = yOffset + Math.sin((x + time) * 0.02) * 20;
      ctx.lineTo(x, y);
    }
  }
  ctx.strokeStyle = colors.primary;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw particles and connections
  particles.forEach((particle, i) => {
    particle.x += Math.cos(particle.angle) * particle.speed;
    particle.y += Math.sin(particle.angle) * particle.speed;

    if (particle.x < 0 || particle.x > canvas.width)
      particle.angle = Math.PI - particle.angle;
    if (particle.y < 0 || particle.y > canvas.height)
      particle.angle = -particle.angle;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = colors.secondary;
    ctx.fill();

    particles.slice(i + 1).forEach((other) => {
      const dx = other.x - particle.x;
      const dy = other.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const alpha = (1 - distance / 100) * opacity.connections;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = colors.secondary;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  });

  // Draw central patterns
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const size = Math.min(canvas.width, canvas.height) * 0.3;
  const rotation = time * 0.001;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);

  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2;
    ctx.strokeRect(
      (-size * (1 + i * 0.5)) / 2,
      (-size * (1 + i * 0.5)) / 2,
      size * (1 + i * 0.5),
      size * (1 + i * 0.5)
    );
  }
  ctx.restore();

  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    const pulseSize = size * (0.8 + i * 0.3) + Math.sin(time * 0.002) * 10;
    ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};

export const drawMinimalGridPattern = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
}: DrawParams) => {
  const gridSize = 40;
  const lineWidth = 2;

  for (let x = 0; x <= canvas.width; x += gridSize) {
    const alpha = Math.sin(time * 0.001 + x * 0.01) * opacity.lines;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += gridSize) {
    const alpha = Math.cos(time * 0.001 + y * 0.01) * opacity.lines;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
};

export const drawFlowFieldPattern = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
  particles,
}: DrawParams) => {
  particles.forEach((particle) => {
    const angle =
      (Math.sin(particle.x * 0.01 + time * 0.001) +
        Math.cos(particle.y * 0.01)) *
      Math.PI;

    particle.x += Math.cos(angle) * particle.speed;
    particle.y += Math.sin(angle) * particle.speed;

    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;

    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y);
    ctx.lineTo(
      particle.x + Math.cos(angle) * 30,
      particle.y + Math.sin(angle) * 30
    );
    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 2;
    ctx.stroke();
  });
};

export const drawConcentricPattern = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
}: DrawParams) => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.min(canvas.width, canvas.height) * 0.8;

  for (let i = 0; i < 20; i++) {
    const progress = i / 20;
    const radius = progress * maxRadius;
    const rotation = time * 0.001 + progress * Math.PI;
    const wobble = Math.sin(time * 0.002 + progress * Math.PI * 4) * 15;

    ctx.beginPath();
    for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
      const x = centerX + (radius + wobble) * Math.cos(angle + rotation);
      const y = centerY + (radius + wobble) * Math.sin(angle + rotation);

      if (angle === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};

export const drawMinimalWavesPattern = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
}: DrawParams) => {
  const waveCount = 5;
  const baseAmplitude = canvas.height * 0.08;

  for (let i = 0; i < waveCount; i++) {
    const progress = i / waveCount;
    const yOffset = canvas.height * progress;
    const frequency = 0.002 * (1 + progress);
    const amplitude = baseAmplitude * (1 - progress * 0.5);
    const timeOffset = time * (0.001 + progress * 0.001);

    ctx.beginPath();
    ctx.moveTo(0, yOffset);

    for (let x = 0; x < canvas.width; x += 2) {
      const y =
        yOffset +
        Math.sin(x * frequency + timeOffset) * amplitude +
        Math.cos(x * frequency * 0.5 - timeOffset) * amplitude * 0.5;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};

export const drawModernAsymmetric = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
  particles,
}: DrawParams) => {
  // Right-side focal point
  const focusX = canvas.width * 0.75;
  const focusY = canvas.height * 0.5;

  // Draw subtle grid lines on the left
  for (let x = 0; x < canvas.width * 0.4; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Draw dynamic curves focusing on the right side
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    const startX = canvas.width * 0.3;
    const startY = (canvas.height / 8) * i;

    ctx.moveTo(startX, startY);

    // Create a curve that intensifies towards the right
    for (let x = startX; x <= canvas.width; x += 5) {
      const distanceToFocus = Math.abs(x - focusX);
      const intensity = Math.max(0, 1 - distanceToFocus / (canvas.width * 0.3));
      const y =
        startY +
        Math.sin((x + time * 0.5) * 0.02) * 30 * intensity +
        Math.cos((x - time * 0.3) * 0.01) * 20 * intensity;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 1 + i * 0.2;
    ctx.stroke();
  }

  // Add floating particles concentrated on the right
  particles.forEach((particle, i) => {
    // Adjust particle behavior to favor the right side
    const targetX = focusX + Math.cos(time * 0.001 + i) * 100;
    const targetY = focusY + Math.sin(time * 0.001 + i) * 100;

    // Move particles towards the target area
    const dx = targetX - particle.x;
    const dy = targetY - particle.y;
    particle.x += dx * 0.02;
    particle.y += dy * 0.02;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = colors.accent;
    ctx.fill();
  });
};

export const drawMinimalistFlow = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
}: DrawParams) => {
  // Single flowing line that spans the width
  const centerY = canvas.height * 0.5;

  ctx.beginPath();
  ctx.moveTo(0, centerY);

  // Create a subtle wave that grows in amplitude towards the right
  for (let x = 0; x < canvas.width; x += 2) {
    const progress = x / canvas.width;
    const amplitude = progress * 50; // Increases towards the right
    const y =
      centerY +
      Math.sin(x * 0.01 + time * 0.001) *
        amplitude *
        Math.sin(progress * Math.PI); // Smooth fade in/out

    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = colors.primary;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Add subtle vertical accents on the right side
  const rightSection = canvas.width * 0.6;
  for (let x = rightSection; x < canvas.width; x += 30) {
    const height = (canvas.width - x) * 0.3; // Gets shorter towards the edge

    ctx.beginPath();
    ctx.moveTo(x, centerY - height);
    ctx.lineTo(x, centerY + height);
    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};

export const drawProfessionalGrid = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
}: DrawParams) => {
  // Draw subtle background grid
  const gridSize = 50;
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
  }

  ctx.globalAlpha = 1;

  // Draw dynamic geometric shapes on the right side
  const rightSection = canvas.width * 0.5;
  const centerY = canvas.height * 0.5;

  // Animated rectangles
  for (let i = 0; i < 5; i++) {
    const x = rightSection + i * canvas.width * 0.08;
    const size = 80 + Math.sin(time * 0.002 + i) * 20;

    ctx.save();
    ctx.translate(x + size / 2, centerY);
    ctx.rotate(time * 0.001 + (i * Math.PI) / 10);

    ctx.beginPath();
    ctx.rect(-size / 2, -size / 2, size, size);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }

  // Connect shapes with subtle lines
  ctx.beginPath();
  for (let x = rightSection; x < canvas.width; x += 2) {
    const y =
      centerY +
      Math.sin(x * 0.03 + time * 0.002) *
        30 *
        Math.min(1, (x - rightSection) / (canvas.width * 0.2));

    if (x === rightSection) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.strokeStyle = colors.secondary;
  ctx.lineWidth = 1;
  ctx.stroke();
};

export const drawDynamicDots = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
  particles,
}: DrawParams) => {
  // Create a gradient focus point on the right
  const gradientX = canvas.width * 0.7;
  const gradientY = canvas.height * 0.5;

  // Draw connecting lines first (background)
  particles.forEach((particle, i) => {
    // Attract particles to the right side
    const attraction = (canvas.width - particle.x) * 0.0001;
    particle.speed += attraction;

    particle.x += Math.cos(particle.angle) * particle.speed;
    particle.y += Math.sin(particle.angle) * particle.speed;

    // Boundary checks with position adjustments
    if (particle.x < 0 || particle.x > canvas.width) {
      particle.x = Math.max(canvas.width * 0.5, Math.random() * canvas.width);
      particle.speed = Math.random() * 0.5 + 0.1;
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.y = Math.random() * canvas.height;
    }

    // Draw connections with distance-based opacity
    particles.slice(i + 1).forEach((other) => {
      const dx = other.x - particle.x;
      const dy = other.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        const distanceToGradient = Math.sqrt(
          Math.pow(gradientX - particle.x, 2) +
            Math.pow(gradientY - particle.y, 2)
        );
        const gradientFactor = Math.max(
          0,
          1 - distanceToGradient / (canvas.width * 0.5)
        );
        const alpha =
          (1 - distance / 120) * opacity.connections * (0.5 + gradientFactor);

        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = colors.secondary.replace(")", `, ${alpha})`);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  });

  // Draw particles with size variation based on position
  particles.forEach((particle) => {
    const distanceToGradient = Math.sqrt(
      Math.pow(gradientX - particle.x, 2) + Math.pow(gradientY - particle.y, 2)
    );
    const sizeFactor = Math.max(
      0.5,
      1 - distanceToGradient / (canvas.width * 0.5)
    );

    ctx.beginPath();
    ctx.arc(
      particle.x,
      particle.y,
      particle.radius * sizeFactor * 2,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = colors.accent;
    ctx.fill();
  });
};

export const drawGeometricFlow = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
}: DrawParams) => {
  // Create flowing geometric patterns that intensify on the right
  const rightFocus = canvas.width * 0.7;

  // Draw background grid with varying opacity
  for (let x = 0; x < canvas.width; x += 40) {
    const progress = x / canvas.width;
    const alpha = Math.min(0.2, progress * 0.4);

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.strokeStyle = colors.primary.replace(")", `, ${alpha})`);
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Draw animated geometric shapes
  const shapeCount = 12;
  for (let i = 0; i < shapeCount; i++) {
    const progress = i / shapeCount;
    const x = progress * canvas.width;
    const size = 30 + (x / canvas.width) * 50;

    // Calculate intensity based on position
    const intensity = Math.pow(x / rightFocus, 1.5);
    const yOffset = Math.sin(time * 0.002 + i) * 50 * intensity;

    ctx.save();
    ctx.translate(x, canvas.height * 0.5 + yOffset);
    ctx.rotate(time * 0.001 * intensity + (i * Math.PI) / 6);

    // Draw multiple layers for each shape
    for (let j = 0; j < 3; j++) {
      const layerSize = size * (1 - j * 0.2);
      ctx.beginPath();
      if (i % 2 === 0) {
        ctx.rect(-layerSize / 2, -layerSize / 2, layerSize, layerSize);
      } else {
        ctx.moveTo(0, -layerSize / 2);
        ctx.lineTo(layerSize / 2, layerSize / 2);
        ctx.lineTo(-layerSize / 2, layerSize / 2);
        ctx.closePath();
      }
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1 + intensity;
      ctx.stroke();
    }

    ctx.restore();
  }
};

export const drawFlowingCircuits = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
}: DrawParams) => {
  // Create circuit-like patterns that flow towards the right
  const nodePoints: Array<{ x: number; y: number }> = [];
  const nodeCount = 15;
  const rightFocus = canvas.width * 0.7;

  // Generate node points with right-side bias
  for (let i = 0; i < nodeCount; i++) {
    const progress = i / nodeCount;
    const x = progress * canvas.width * 1.2; // Extend slightly beyond canvas
    const xVariation = Math.sin(time * 0.001 + i) * 30;
    const y = canvas.height * (0.3 + Math.random() * 0.4);

    nodePoints.push({
      x: x + xVariation,
      y: y + Math.sin(time * 0.002 + i * 2) * 20,
    });
  }

  // Draw connecting lines
  ctx.beginPath();
  nodePoints.forEach((point, i) => {
    if (i === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      const prevPoint = nodePoints[i - 1];
      const controlPoint1 = {
        x: prevPoint.x + (point.x - prevPoint.x) * 0.5,
        y: prevPoint.y,
      };
      const controlPoint2 = {
        x: prevPoint.x + (point.x - prevPoint.x) * 0.5,
        y: point.y,
      };
      ctx.bezierCurveTo(
        controlPoint1.x,
        controlPoint1.y,
        controlPoint2.x,
        controlPoint2.y,
        point.x,
        point.y
      );
    }
  });
  ctx.strokeStyle = colors.primary;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw nodes with varying sizes
  nodePoints.forEach((point, i) => {
    const progress = point.x / rightFocus;
    const size = 4 + progress * 6;

    // Main node
    ctx.beginPath();
    ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
    ctx.fillStyle = colors.accent;
    ctx.fill();

    // Pulse effect
    const pulseSize = size * (1.5 + Math.sin(time * 0.005 + i) * 0.5);
    ctx.beginPath();
    ctx.arc(point.x, point.y, pulseSize, 0, Math.PI * 2);
    ctx.strokeStyle = colors.secondary.replace(
      ")",
      `, ${0.5 - progress * 0.3})`
    );
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Add subtle vertical connections
  nodePoints.forEach((point) => {
    const progress = point.x / rightFocus;
    if (progress > 0.5) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y - 40);
      ctx.lineTo(point.x, point.y + 40);
      ctx.strokeStyle = colors.secondary.replace(")", `, ${0.2}`);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });
};
export const drawNeuralNetwork = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
  particles,
}: DrawParams) => {
  // Utility function to ensure rgba format
  const toRGBA = (color: string, alpha: number) => {
    if (color.startsWith("rgba")) {
      return color.replace(/rgba\((.+?),\s*[\d.]+\)/, `rgba($1, ${alpha})`);
    } else if (color.startsWith("rgb")) {
      return color.replace(/rgb\((.+?)\)/, `rgba($1, ${alpha})`);
    }
    // Fallback if color is not in rgb/rgba format
    return color;
  };

  // Create neural network-like visualization with focus on right side
  const nodes: Array<{
    x: number;
    y: number;
    size: number;
    connections: number[];
  }> = [];
  const layerCount = 4;
  const nodesPerLayer = [4, 6, 8, 5];

  // Generate node positions
  nodesPerLayer.forEach((count, layerIndex) => {
    const x = (canvas.width * (layerIndex + 1)) / (layerCount + 1);
    for (let i = 0; i < count; i++) {
      const y = (canvas.height * (i + 1)) / (count + 1);
      const size = 3 + (layerIndex / layerCount) * 5;
      nodes.push({
        x,
        y,
        size,
        connections: [],
      });
    }
  });

  // Draw connections with gradients and animations
  nodes.forEach((node, i) => {
    const nextLayerStart = nodesPerLayer
      .slice(0, (nodes[i].x / (canvas.width / (layerCount + 1))) | 0)
      .reduce((sum, count) => sum + count, 0);
    const nextLayerSize =
      nodesPerLayer[(nodes[i].x / (canvas.width / (layerCount + 1))) | 0] || 0;

    for (let j = nextLayerStart; j < nextLayerStart + nextLayerSize; j++) {
      if (nodes[j]) {
        const gradient = ctx.createLinearGradient(
          node.x,
          node.y,
          nodes[j].x,
          nodes[j].y
        );
        const progress = ((node.x + time * 0.5) % canvas.width) / canvas.width;

        gradient.addColorStop(0, colors.primary);
        gradient.addColorStop(progress, colors.accent);
        gradient.addColorStop(1, colors.secondary);

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  // Draw nodes with pulsing effects
  nodes.forEach((node) => {
    const pulseSize = node.size + Math.sin(time * 0.05) * 2;

    // Glow effect
    const gradient = ctx.createRadialGradient(
      node.x,
      node.y,
      0,
      node.x,
      node.y,
      pulseSize * 3
    );
    gradient.addColorStop(0, toRGBA(colors.accent, 0.3)); // Adjust alpha safely
    gradient.addColorStop(1, toRGBA(colors.accent, 0)); // Adjust alpha safely

    ctx.beginPath();
    ctx.arc(node.x, node.y, pulseSize * 3, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Core node
    ctx.beginPath();
    ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = colors.accent;
    ctx.fill();
  });
};

// Utility function to modify color opacity
const modifyColorOpacity = (color: string, opacity: number) => {
  // Si el color ya es rgba, extraemos sus componentes
  const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (rgbaMatch) {
    const [_, r, g, b] = rgbaMatch;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Si el color es rgb, lo convertimos a rgba
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Por defecto, asumimos que es un color sólido
  return color;
};

export const drawDataFlow = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
}: DrawParams) => {
  const pathCount = 8;
  const segmentLength = canvas.width / 10;

  for (let i = 0; i < pathCount; i++) {
    const yBase = (canvas.height * (i + 1)) / (pathCount + 1);
    const amplitude = 20 + i * 5;
    const frequency = 0.02 - i * 0.002;
    const speed = 0.5 + i * 0.2;

    // Draw main flow path
    ctx.beginPath();
    ctx.moveTo(0, yBase);

    for (let x = 0; x < canvas.width; x += 2) {
      const progress = x / canvas.width;
      const y =
        yBase +
        Math.sin(x * frequency + time * speed * 0.01) * amplitude * progress +
        Math.cos(x * frequency * 0.5 - time * speed * 0.005) *
          amplitude *
          0.5 *
          progress;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add data packets
    const packetCount = 3;
    for (let j = 0; j < packetCount; j++) {
      const packetProgress =
        ((time * speed * 0.1 + j * (canvas.width / packetCount)) %
          canvas.width) /
        canvas.width;
      const x = packetProgress * canvas.width;
      const y =
        yBase +
        Math.sin(x * frequency + time * speed * 0.01) *
          amplitude *
          packetProgress +
        Math.cos(x * frequency * 0.5 - time * speed * 0.005) *
          amplitude *
          0.5 *
          packetProgress;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(
        Math.atan2(
          Math.cos(x * frequency + time * speed * 0.01) * amplitude,
          segmentLength
        )
      );

      // Packet body
      ctx.beginPath();
      ctx.moveTo(-10, -10);
      ctx.lineTo(10, -10);
      ctx.lineTo(15, 0);
      ctx.lineTo(10, 10);
      ctx.lineTo(-10, 10);
      ctx.lineTo(-15, 0);
      ctx.closePath();
      ctx.fillStyle = colors.accent;
      ctx.fill();

      // Packet glow
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
      gradient.addColorStop(0, modifyColorOpacity(colors.accent, 0.3));
      gradient.addColorStop(1, modifyColorOpacity(colors.accent, 0));

      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();
    }
  }
};

export const drawQuantumField = ({
  ctx,
  canvas,
  time,
  colors,
  opacity,
  particles,
}: DrawParams) => {
  // Create quantum field-inspired effect with entangled particles

  // Draw background field lines
  for (let i = 0; i < canvas.width; i += 30) {
    const progress = i / canvas.width;
    ctx.beginPath();
    ctx.moveTo(i, 0);

    for (let y = 0; y < canvas.height; y += 2) {
      const distortion =
        Math.sin(y * 0.02 + time * 0.002) * 20 * progress +
        Math.cos(y * 0.01 - time * 0.001) * 15 * progress;
      ctx.lineTo(i + distortion, y);
    }

    ctx.strokeStyle = modifyColorOpacity(colors.primary, 0.1 + progress * 0.2);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Update and draw quantum particles
  particles.forEach((particle, i) => {
    const quantumAngle = Math.sin(time * 0.001 + particle.x * 0.01) * Math.PI;
    particle.x += Math.cos(quantumAngle) * particle.speed;
    particle.y += Math.sin(quantumAngle) * particle.speed;

    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;

    // Draw probability cloud
    const cloudSize = particle.radius * (2 + Math.sin(time * 0.05 + i) * 0.5);
    const gradient = ctx.createRadialGradient(
      particle.x,
      particle.y,
      0,
      particle.x,
      particle.y,
      cloudSize * 4
    );
    gradient.addColorStop(0, modifyColorOpacity(colors.accent, 0.4));
    gradient.addColorStop(1, modifyColorOpacity(colors.accent, 0));

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, cloudSize * 4, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw entanglement connections
    particles.slice(i + 1).forEach((other) => {
      const dx = other.x - particle.x;
      const dy = other.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const entanglementStrength = (1 - distance / 150) * opacity.connections;
        const waveOffset = Math.sin(time * 0.002 + distance * 0.05) * 5;

        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);

        const midX = (particle.x + other.x) / 2;
        const midY = (particle.y + other.y) / 2 + waveOffset;

        ctx.quadraticCurveTo(midX, midY, other.x, other.y);
        ctx.strokeStyle = modifyColorOpacity(
          colors.secondary,
          entanglementStrength
        );
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  });
};
