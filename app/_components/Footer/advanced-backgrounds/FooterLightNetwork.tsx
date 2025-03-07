"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: number[];
  pulsePhase: number;
  pulseSpeed: number;
  originX: number;
  originY: number;
}

interface Vector {
  x: number;
  y: number;
}

interface FooterLightNetworkProps {
  nodeCount?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
}

export default function FooterLightNetwork({
  nodeCount = 30,
  connectionDistance = 200,
  mouseInfluence = 80,
}: FooterLightNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const requestRef = useRef<number>();
  const cursorRef = useRef<Vector>({ x: 9999, y: 9999 });
  const activeCursorRef = useRef<boolean>(false);
  const cursorHistoryRef = useRef<Vector[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const touchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Colors
  const colors = {
    background: "#000000",
    primary: "#6366f1",
    primaryLight: "#818cf8",
    accent: "rgb(241, 228, 228)",
  };

  // Helper function to handle color opacity correctly
  const getColorWithOpacity = (color: string, opacity: number) => {
    // If it's already a hex color
    if (color.startsWith("#")) {
      return `${color}${Math.floor(opacity * 255)
        .toString(16)
        .padStart(2, "0")}`;
    }
    // If it's rgb format
    else if (color.startsWith("rgb(")) {
      // Extract r,g,b values
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const [_, r, g, b] = rgbMatch;
        return `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(2)})`;
      }
    }
    // Fallback
    return `rgba(99, 102, 241, ${opacity.toFixed(2)})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize the reactive nodes
    const initializeNodes = () => {
      const nodes: Node[] = [];

      // Create nodes in a grid-like pattern with some randomness
      const gridCols = Math.ceil(
        Math.sqrt((nodeCount * dimensions.width) / dimensions.height)
      );
      const gridRows = Math.ceil(nodeCount / gridCols);

      const cellWidth = dimensions.width / gridCols;
      const cellHeight = dimensions.height / gridRows;

      let index = 0;
      for (let row = 0; row < gridRows && index < nodeCount; row++) {
        for (let col = 0; col < gridCols && index < nodeCount; col++) {
          // Position with some randomness
          const x =
            cellWidth * col +
            cellWidth / 2 +
            (Math.random() - 0.5) * cellWidth * 0.6;
          const y =
            cellHeight * row +
            cellHeight / 2 +
            (Math.random() - 0.5) * cellHeight * 0.6;

          // Create node with premium aesthetics
          nodes.push({
            x,
            y,
            vx: 0,
            vy: 0,
            radius: 2 + Math.random() * 3,
            color:
              Math.random() > 0.7
                ? colors.primaryLight
                : Math.random() > 0.5
                ? colors.primary
                : colors.accent,
            connections: [],
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.02,
            originX: x,
            originY: y,
          });

          index++;
        }
      }

      // Calculate connections between nodes (closest 2-3 neighbors)
      for (let i = 0; i < nodes.length; i++) {
        const nodesToConnect = 2 + Math.floor(Math.random() * 2); // 2-3 connections
        const distances: { index: number; distance: number }[] = [];

        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;

          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            distances.push({ index: j, distance });
          }
        }

        // Sort by distance and select closest
        distances.sort((a, b) => a.distance - b.distance);

        for (let k = 0; k < Math.min(nodesToConnect, distances.length); k++) {
          nodes[i].connections.push(distances[k].index);
        }
      }

      nodesRef.current = nodes;
    };

    // Update cursor history for the trail effect
    const updateCursorHistory = () => {
      const cursor = cursorRef.current;

      // Add current position to history
      if (activeCursorRef.current && cursor.x < 9000) {
        cursorHistoryRef.current.push({ ...cursor });

        // Keep only the most recent positions (for trail effect)
        if (cursorHistoryRef.current.length > 10) {
          cursorHistoryRef.current.shift();
        }
      } else if (cursorHistoryRef.current.length > 0) {
        // Gradually fade out trail when cursor leaves
        cursorHistoryRef.current.shift();
      }
    };

    const drawFrame = (time: number) => {
      // Clear canvas with solid background
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Skip if no nodes yet
      if (nodesRef.current.length === 0) return;

      updateCursorHistory();

      const nodes = nodesRef.current;
      const cursor = cursorRef.current;
      const cursorHistory = cursorHistoryRef.current;

      // Update physics for each node
      nodes.forEach((node, index) => {
        // Apply mouse force if active
        if (cursor.x < 9000) {
          const dx = node.x - cursor.x;
          const dy = node.y - cursor.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist < mouseInfluence) {
            const force = (mouseInfluence - dist) / mouseInfluence;
            node.vx += (dx / dist) * force * 0.5;
            node.vy += (dy / dist) * force * 0.5;
          }
        }

        // Apply spring force back to original position
        const springFactor = 0.01;
        node.vx += (node.originX - node.x) * springFactor;
        node.vy += (node.originY - node.y) * springFactor;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Apply damping
        node.vx *= 0.94;
        node.vy *= 0.94;

        // Update pulse phase
        node.pulsePhase += node.pulseSpeed;
        if (node.pulsePhase > Math.PI * 2) {
          node.pulsePhase -= Math.PI * 2;
        }
      });

      // Render connections first (nodes will be on top)
      ctx.lineCap = "round";

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach((connIndex) => {
          const connNode = nodes[connIndex];

          // Calculate distance for opacity falloff
          const dx = connNode.x - node.x;
          const dy = connNode.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Skip if too far
          if (dist > connectionDistance) return;

          // Line opacity based on distance
          const opacity = Math.max(0, 1 - dist / connectionDistance);

          // Get pulse progress
          const pulsePos = (Math.sin(time * 0.001 + node.pulsePhase) + 1) / 2; // 0 to 1

          // Create gradient
          const gradient = ctx.createLinearGradient(
            node.x,
            node.y,
            connNode.x,
            connNode.y
          );

          // Use the helper function defined at component level

          gradient.addColorStop(
            0,
            getColorWithOpacity(node.color, opacity * 0.7)
          );
          gradient.addColorStop(
            1,
            getColorWithOpacity(connNode.color, opacity * 0.7)
          );

          // Draw the connection line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connNode.x, connNode.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Draw pulse traveling along the connection
          const pulseX = node.x + dx * pulsePos;
          const pulseY = node.y + dy * pulsePos;

          // Add subtle pulse glow
          const pulseGradient = ctx.createRadialGradient(
            pulseX,
            pulseY,
            0,
            pulseX,
            pulseY,
            10
          );

          // Use the same helper function for consistency
          pulseGradient.addColorStop(0, getColorWithOpacity(node.color, 0.4));
          pulseGradient.addColorStop(1, getColorWithOpacity(node.color, 0));

          ctx.fillStyle = pulseGradient;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 10, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        // Node glow
        const nodeGlow = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 3
        );

        nodeGlow.addColorStop(0, getColorWithOpacity(node.color, 0.6));
        nodeGlow.addColorStop(1, getColorWithOpacity(node.color, 0));

        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core of the node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw cursor effects
      if (cursorHistory.length > 0) {
        // Cursor trail
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cursorHistory[0].x, cursorHistory[0].y);

        for (let i = 1; i < cursorHistory.length; i++) {
          ctx.lineTo(cursorHistory[i].x, cursorHistory[i].y);
        }

        // Gradient stroke for trail
        const trailGradient = ctx.createLinearGradient(
          cursorHistory[0].x,
          cursorHistory[0].y,
          cursorHistory[cursorHistory.length - 1].x,
          cursorHistory[cursorHistory.length - 1].y
        );

        trailGradient.addColorStop(0, getColorWithOpacity(colors.primary, 0));
        trailGradient.addColorStop(1, getColorWithOpacity(colors.primary, 0.5));

        ctx.strokeStyle = trailGradient;
        ctx.stroke();

        // Cursor glow at current position
        const currentPos = cursorHistory[cursorHistory.length - 1];
        const cursorGlow = ctx.createRadialGradient(
          currentPos.x,
          currentPos.y,
          0,
          currentPos.x,
          currentPos.y,
          80
        );

        cursorGlow.addColorStop(0, getColorWithOpacity(colors.primary, 0.2));
        cursorGlow.addColorStop(0.5, getColorWithOpacity(colors.primary, 0.1));
        cursorGlow.addColorStop(1, getColorWithOpacity(colors.primary, 0));

        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      }

      // Add outer vignette for premium effect
      const vignetteGradient = ctx.createRadialGradient(
        dimensions.width / 2,
        dimensions.height / 2,
        0,
        dimensions.width / 2,
        dimensions.height / 2,
        Math.max(dimensions.width, dimensions.height) / 1.5
      );

      vignetteGradient.addColorStop(0, "rgba(18, 18, 18, 0)");
      vignetteGradient.addColorStop(0.8, "rgba(18, 18, 18, 0.4)");
      vignetteGradient.addColorStop(1, "rgba(18, 18, 18, 0.8)");

      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Add subtle noise texture for premium look
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * dimensions.width;
        const y = Math.random() * dimensions.height;
        const size = Math.random() * 1.5;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(drawFrame);
    };

    initializeNodes();
    requestRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [dimensions, nodeCount, connectionDistance, mouseInfluence, colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const handleResize = () => {
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      const dpi = window.devicePixelRatio || 1;

      canvas.width = w * dpi;
      canvas.height = h * dpi;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      setDimensions({ width: w, height: h });

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpi, dpi);
      }

      // Reinitialize on resize
      nodesRef.current = [];
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      activeCursorRef.current = true;

      // Clear any existing timeout
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
    };

    const onMouseEnter = () => {
      activeCursorRef.current = true;
    };

    const onMouseLeave = () => {
      // Set a timeout to gradually fade out the effect
      touchTimeout.current = setTimeout(() => {
        cursorRef.current = { x: 9999, y: 9999 };
        activeCursorRef.current = false;
        touchTimeout.current = null;
      }, 500);
    };

    // Also handle touch events for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        cursorRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
        activeCursorRef.current = true;

        // Clear any existing timeout
        if (touchTimeout.current) {
          clearTimeout(touchTimeout.current);
        }
      }
    };

    const onTouchEnd = () => {
      // Set a timeout to gradually fade out the effect
      touchTimeout.current = setTimeout(() => {
        cursorRef.current = { x: 9999, y: 9999 };
        activeCursorRef.current = false;
        touchTimeout.current = null;
      }, 500);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseenter", onMouseEnter);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);

      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cx("footer__particles-canvas")}
      aria-hidden="true"
    />
  );
}
