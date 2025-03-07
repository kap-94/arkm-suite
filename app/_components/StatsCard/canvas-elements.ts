// Canvas illustrations for StatsCard
// export const renderActiveProjectsCanvas = (
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number
// ) => {
//   ctx.clearRect(0, 0, width, height);

//   // Draw connected hexagons representing active projects
//   const hexSize = Math.min(width, height) / 8;
//   const hexPoints = (x: number, y: number) => {
//     const points = [];
//     for (let i = 0; i < 6; i++) {
//       points.push([
//         x + hexSize * Math.cos((i * Math.PI) / 3),
//         y + hexSize * Math.sin((i * Math.PI) / 3),
//       ]);
//     }
//     return points;
//   };

//   const drawHex = (x: number, y: number, color: string) => {
//     const points = hexPoints(x, y);
//     ctx.beginPath();
//     ctx.moveTo(...points[0]);
//     points.forEach((point) => ctx.lineTo(...point));
//     ctx.closePath();
//     ctx.fillStyle = color;
//     ctx.fill();
//     ctx.strokeStyle = "#ffffff";
//     ctx.stroke();
//   };

//   const positions = [
//     [width / 2, height / 2],
//     [width / 2 - hexSize * 1.5, height / 2],
//     [width / 2 + hexSize * 1.5, height / 2],
//     [width / 2, height / 2 - hexSize * 1.5],
//     [width / 2, height / 2 + hexSize * 1.5],
//   ];

//   positions.forEach((pos, i) => {
//     drawHex(pos[0], pos[1], `rgba(99, 102, 241, ${0.5 + i * 0.1})`);
//   });
// };

// export const renderActiveProjectsNetworkCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
//     ctx.clearRect(0, 0, width, height);

//     const nodes = [
//       { x: width/2, y: height/2 },
//       { x: width/3, y: height/3 },
//       { x: width*2/3, y: height/3 },
//       { x: width/3, y: height*2/3 },
//       { x: width*2/3, y: height*2/3 },
//     ];

//     // Draw connections
//     ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
//     ctx.lineWidth = 2;
//     nodes.forEach((node, i) => {
//       nodes.forEach((targetNode, j) => {
//         if (i !== j) {
//           ctx.beginPath();
//           ctx.moveTo(node.x, node.y);
//           ctx.lineTo(targetNode.x, targetNode.y);
//           ctx.stroke();
//         }
//       });
//     });

//     // Draw nodes with pulsing animation
//     const time = Date.now() * 0.001;
//     nodes.forEach((node, i) => {
//       const pulse = Math.sin(time + i) * 0.2 + 0.8;
//       const radius = 10 * pulse;

//       // Glow effect
//       const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2);
//       gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
//       gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

//       ctx.beginPath();
//       ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
//       ctx.fillStyle = gradient;
//       ctx.fill();

//       ctx.beginPath();
//       ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
//       ctx.fillStyle = '#6366f1';
//       ctx.fill();
//     });

//     requestAnimationFrame(() => renderActiveProjectsNetworkCanvas(ctx, width, height));
//   };

// export const renderActiveProjectsCircuitCanvas = (
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number
// ) => {
//   ctx.clearRect(0, 0, width, height);

//   const gridSize = 20;
//   const dotSize = 3;
//   const time = Date.now() * 0.001;

//   // Draw grid dots
//   for (let x = gridSize; x < width; x += gridSize) {
//     for (let y = gridSize; y < height; y += gridSize) {
//       ctx.beginPath();
//       ctx.arc(x, y, dotSize, 0, Math.PI * 2);
//       ctx.fillStyle = "rgba(99, 102, 241, 0.9)";
//       ctx.fill();
//     }
//   }

//   // Draw animated circuit paths
//   const paths = [
//     [
//       [1, 1],
//       [3, 1],
//       [3, 3],
//       [5, 3],
//     ],
//     [
//       [2, 4],
//       [2, 2],
//       [4, 2],
//       [4, 4],
//     ],
//     [
//       [1, 3],
//       [4, 3],
//       [4, 5],
//     ],
//   ];

//   paths.forEach((path, i) => {
//     ctx.beginPath();
//     path.forEach((point, j) => {
//       const x = point[0] * gridSize;
//       const y = point[1] * gridSize;
//       if (j === 0) ctx.moveTo(x, y);
//       else ctx.lineTo(x, y);
//     });

//     const progress = (time + i * 0.2) % 1;
//     const gradient = ctx.createLinearGradient(0, 0, width, height);
//     gradient.addColorStop((progress + 0.5) % 1, "rgba(99, 102, 241, 0.1)");
//     gradient.addColorStop(progress, "rgba(99, 102, 241, 0.8)");
//     gradient.addColorStop((progress + 0.5) % 1, "rgba(99, 102, 241, 0.1)");

//     ctx.strokeStyle = gradient;
//     ctx.lineWidth = 3;
//     ctx.stroke();
//   });

//   requestAnimationFrame(() =>
//     renderActiveProjectsCircuitCanvas(ctx, width, height)
//   );
// };

// export const renderActiveProjectsCubeMatrix = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
//     const time = Date.now() * 0.001;
//     ctx.clearRect(0, 0, width, height);

//     const cubeSize = Math.min(width, height) / 6;
//     const offset = cubeSize * 1.5;
//     const startX = width/2 - offset;
//     const startY = height/2 - offset;

//     for(let i = 0; i < 3; i++) {
//       for(let j = 0; j < 3; j++) {
//         const x = startX + i * offset;
//         const y = startY + j * offset;
//         const rotation = time + (i + j) * Math.PI/4;

//         // 3D cube projection
//         const points = [
//           [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
//           [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
//         ].map(([px, py, pz]) => {
//           const rotX = px * Math.cos(rotation) - pz * Math.sin(rotation);
//           const rotZ = px * Math.sin(rotation) + pz * Math.cos(rotation);
//           return [
//             x + rotX * cubeSize/2,
//             y + py * cubeSize/2,
//             rotZ * cubeSize/2
//           ];
//         });

//         // Draw cube edges
//         const edges = [
//           [0,1], [1,2], [2,3], [3,0],
//           [4,5], [5,6], [6,7], [7,4],
//           [0,4], [1,5], [2,6], [3,7]
//         ];

//         edges.forEach(([a, b]) => {
//           const alpha = (points[a][2] + points[b][2] + cubeSize) / (cubeSize * 2);
//           ctx.beginPath();
//           ctx.moveTo(points[a][0], points[a][1]);
//           ctx.lineTo(points[b][0], points[b][1]);
//           ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 0.8})`;
//           ctx.lineWidth = 2;
//           ctx.stroke();
//         });
//       }
//     }

//     requestAnimationFrame(() => renderActiveProjectsCubeMatrix(ctx, width, height));
//   };

// export const renderActiveProjectsHexGrid = (
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number
// ) => {
//   ctx.clearRect(0, 0, width, height);

//   const hexRadius = Math.min(width, height) / 8;
//   const hexHeight = hexRadius * Math.sqrt(3);
//   const rows = 3;
//   const cols = 3;
//   const startX = (width - cols * hexRadius * 3) / 2;
//   const startY = (height - rows * hexHeight) / 2;

//   function drawHex(x: number, y: number, intensity: number) {
//     ctx.beginPath();
//     for (let i = 0; i < 6; i++) {
//       const angle = (i * Math.PI) / 3;
//       const px = x + hexRadius * Math.cos(angle);
//       const py = y + hexRadius * Math.sin(angle);
//       i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
//     }
//     ctx.closePath();
//     ctx.fillStyle = `rgba(99, 102, 241, ${0.2 + intensity * 0.6})`;
//     ctx.fill();
//     ctx.strokeStyle = "rgba(99, 102, 241, 0.8)";
//     ctx.lineWidth = 2;
//     ctx.stroke();
//   }

//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       const x = startX + col * hexRadius * 3;
//       const y = startY + row * hexHeight + (col % 2) * (hexHeight / 2);
//       const intensity = Math.abs(Math.sin((row + col) / 2));
//       drawHex(x, y, intensity);
//     }
//   }
// };

// export const renderActiveProjectsDNA = (
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number
// ) => {
//   const time = Date.now() * 0.001;
//   ctx.clearRect(0, 0, width, height);

//   const amplitude = height / 4;
//   const frequency = Math.PI / 30;
//   const phase = time * 2;
//   const centerY = height / 2;
//   const dots = [];

//   for (let x = 0; x < width; x += 10) {
//     const y1 = centerY + Math.sin(x * frequency + phase) * amplitude;
//     const y2 = centerY + Math.sin(x * frequency + phase + Math.PI) * amplitude;
//     dots.push({ x, y1, y2 });
//   }

//   // Draw connecting lines
//   dots.forEach((dot, i) => {
//     if (i > 0) {
//       const progress = (time + i / dots.length) % 1;
//       const gradient = ctx.createLinearGradient(dots[i - 1].x, 0, dot.x, 0);
//       gradient.addColorStop(0, "rgba(99, 102, 241, 0.2)");
//       gradient.addColorStop(progress, "rgba(99, 102, 241, 0.8)");
//       gradient.addColorStop(1, "rgba(99, 102, 241, 0.2)");

//       ctx.beginPath();
//       ctx.moveTo(dots[i - 1].x, dots[i - 1].y1);
//       ctx.lineTo(dot.x, dot.y1);
//       ctx.strokeStyle = gradient;
//       ctx.lineWidth = 2;
//       ctx.stroke();

//       ctx.beginPath();
//       ctx.moveTo(dots[i - 1].x, dots[i - 1].y2);
//       ctx.lineTo(dot.x, dot.y2);
//       ctx.strokeStyle = gradient;
//       ctx.stroke();

//       // Cross connections
//       if (i % 3 === 0) {
//         ctx.beginPath();
//         ctx.moveTo(dot.x, dot.y1);
//         ctx.lineTo(dot.x, dot.y2);
//         ctx.strokeStyle = `rgba(99, 102, 241, ${
//           0.3 + Math.sin(time + i) * 0.2
//         })`;
//         ctx.stroke();
//       }
//     }
//   });

//   // Draw nodes
//   dots.forEach((dot, i) => {
//     const pulse = Math.sin(time * 2 + i * 0.2) * 0.2 + 0.8;
//     [dot.y1, dot.y2].forEach((y) => {
//       ctx.beginPath();
//       ctx.arc(dot.x, y, 3 * pulse, 0, Math.PI * 2);
//       ctx.fillStyle = "#6366f1";
//       ctx.fill();
//     });
//   });

//   requestAnimationFrame(() => renderActiveProjectsDNA(ctx, width, height));
// };

// export const renderActiveProjectsBlueprint = (
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number
// ) => {
//   ctx.clearRect(0, 0, width, height);

//   const gridSize = 20;
//   const centerX = width / 2;
//   const centerY = height / 2;
//   const radius = Math.min(width, height) / 3;

//   // Draw grid
//   ctx.strokeStyle = "rgba(99, 102, 241, 0.2)";
//   ctx.lineWidth = 1;
//   for (let x = 0; x < width; x += gridSize) {
//     ctx.beginPath();
//     ctx.moveTo(x, 0);
//     ctx.lineTo(x, height);
//     ctx.stroke();
//   }
//   for (let y = 0; y < height; y += gridSize) {
//     ctx.beginPath();
//     ctx.moveTo(0, y);
//     ctx.lineTo(width, y);
//     ctx.stroke();
//   }

//   // Draw geometric shapes
//   ctx.strokeStyle = "rgba(99, 102, 241, 0.8)";
//   ctx.lineWidth = 2;

//   // Outer circle
//   ctx.beginPath();
//   ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
//   ctx.stroke();

//   // Inner hexagon
//   ctx.beginPath();
//   for (let i = 0; i < 6; i++) {
//     const angle = (i * Math.PI) / 3;
//     const x = centerX + radius * 0.6 * Math.cos(angle);
//     const y = centerY + radius * 0.6 * Math.sin(angle);
//     i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
//   }
//   ctx.closePath();
//   ctx.stroke();

//   // Measurement lines
//   const measurementLength = 40;
//   const angles = [
//     0,
//     Math.PI / 3,
//     (2 * Math.PI) / 3,
//     Math.PI,
//     (4 * Math.PI) / 3,
//     (5 * Math.PI) / 3,
//   ];
//   angles.forEach((angle) => {
//     const x = centerX + (radius + measurementLength) * Math.cos(angle);
//     const y = centerY + (radius + measurementLength) * Math.sin(angle);

//     ctx.beginPath();
//     ctx.moveTo(
//       centerX + radius * Math.cos(angle),
//       centerY + radius * Math.sin(angle)
//     );
//     ctx.lineTo(x, y);
//     ctx.stroke();

//     // Measurement markers
//     ctx.beginPath();
//     ctx.moveTo(x - 5, y);
//     ctx.lineTo(x + 5, y);
//     ctx.stroke();
//   });
// };

export const renderActiveProjectsIsoCubes = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  const size = Math.min(width, height) / 6;
  const startX = width / 2 - size * 1.5;
  const startY = height / 2;

  function drawIsoCube(x: number, y: number, opacity: number) {
    // Top face
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x - size, y);
    ctx.closePath();
    ctx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.5})`;
    ctx.fill();
    ctx.stroke();

    // Right face
    ctx.beginPath();
    ctx.moveTo(x + size, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x, y + size * 1.5);
    ctx.lineTo(x + size, y + size);
    ctx.closePath();
    ctx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.3})`;
    ctx.fill();
    ctx.stroke();

    // Left face
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x, y + size * 1.5);
    ctx.lineTo(x - size, y + size);
    ctx.closePath();
    ctx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.4})`;
    ctx.fill();
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(99, 102, 241, 0.8)";
  ctx.lineWidth = 2;

  // Draw grid of cubes
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const x = startX + i * size * 2;
      const y = startY + j * size * 2;
      const opacity = 0.4 + (i + j) * 0.1;
      drawIsoCube(x, y, opacity);
    }
  }
};

// export const renderActiveProjectsParticles = (
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number
// ) => {
//   let particles: Array<{
//     x: number;
//     y: number;
//     vx: number;
//     vy: number;
//     life: number;
//   }> = [];
//   const MAX_PARTICLES = 50;

//   function createParticle() {
//     const angle = Math.random() * Math.PI * 2;
//     const speed = 0.5 + Math.random();
//     return {
//       x: width / 2,
//       y: height / 2,
//       vx: Math.cos(angle) * speed,
//       vy: Math.sin(angle) * speed,
//       life: 1,
//     };
//   }

//   function animate() {
//     ctx.clearRect(0, 0, width, height);

//     // Create new particles
//     while (particles.length < MAX_PARTICLES) {
//       particles.push(createParticle());
//     }

//     // Update and draw particles
//     particles = particles.filter((p) => {
//       p.x += p.vx;
//       p.y += p.vy;
//       p.life *= 0.99;

//       // Connect nearby particles
//       particles.forEach((p2) => {
//         const dx = p2.x - p.x;
//         const dy = p2.y - p.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         if (dist < 50) {
//           ctx.beginPath();
//           ctx.moveTo(p.x, p.y);
//           ctx.lineTo(p2.x, p2.y);
//           ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 50) * 0.5})`;
//           ctx.stroke();
//         }
//       });

//       // Draw particle
//       const size = 2 + p.life * 3;
//       ctx.beginPath();
//       ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
//       ctx.fillStyle = `rgba(99, 102, 241, ${p.life})`;
//       ctx.fill();

//       return p.life > 0.1;
//     });

//     requestAnimationFrame(animate);
//   }

//   animate();
// };

export const renderActiveProjectsParticlesStatic = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  interface Particle {
    x: number;
    y: number;
    size: number;
  }

  const particles: Particle[] = [];
  const MAX_PARTICLES = 50;

  // Create fixed particles
  for (let i = 0; i < MAX_PARTICLES; i++) {
    const angle = (i / MAX_PARTICLES) * Math.PI * 2;
    const radius = (Math.random() * width) / 4;
    particles.push({
      x: width / 2 + Math.cos(angle) * radius,
      y: height / 2 + Math.sin(angle) * radius,
      size: 2 + Math.random() * 3,
    });
  }

  // Draw connections between nearby particles
  particles.forEach((p1, i) => {
    particles.forEach((p2, j) => {
      if (i < j) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 50) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 50) * 0.5})`;
          ctx.stroke();
        }
      }
    });
  });

  // Draw particles
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(99, 102, 241, 0.8)";
    ctx.fill();
  });
};

export const renderCompletedCanvas = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  // Draw checkmark with progress circle
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3;

  // Progress circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = radius / 8;
  ctx.stroke();

  // Checkmark
  ctx.beginPath();
  ctx.moveTo(centerX - radius / 2, centerY);
  ctx.lineTo(centerX - radius / 6, centerY + radius / 2);
  ctx.lineTo(centerX + radius / 2, centerY - radius / 2);
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = radius / 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
};

// export const renderCompletedFireworksCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
//     const particles: Array<{x: number, y: number, vx: number, vy: number, alpha: number, color: string}> = [];
//     const particleCount = 50;
//     const centerX = width/2;
//     const centerY = height/2;

//     function createParticles() {
//       for(let i = 0; i < particleCount; i++) {
//         const angle = (i / particleCount) * Math.PI * 2;
//         const speed = 2 + Math.random();
//         particles.push({
//           x: centerX,
//           y: centerY,
//           vx: Math.cos(angle) * speed,
//           vy: Math.sin(angle) * speed,
//           alpha: 1,
//           color: `hsl(${Math.random() * 60 + 120}, 70%, 50%)`
//         });
//       }
//     }

//     function animate() {
//       ctx.clearRect(0, 0, width, height);

//       // Update and draw particles
//       particles.forEach(particle => {
//         particle.x += particle.vx;
//         particle.y += particle.vy;
//         particle.vy += 0.1; // gravity
//         particle.alpha *= 0.98;

//         ctx.beginPath();
//         ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
//         ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
//         ctx.fill();
//       });

//       // Reset when particles fade out
//       if(particles[0].alpha <= 0.01) {
//         particles.length = 0;
//         createParticles();
//       }

//       requestAnimationFrame(animate);
//     }

//     createParticles();
//     animate();
//   };

export const renderCompletedMorphCheckCanvas = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const time = Date.now() * 0.002;
  const radius = Math.min(width, height) / 4;

  // Draw morphing outer ring
  ctx.beginPath();
  for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
    const wave = Math.sin(angle * 8 + time) * 5;
    const x = centerX + (radius + wave) * Math.cos(angle);
    const y = centerY + (radius + wave) * Math.sin(angle);
    angle === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();

  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    radius * 0.8,
    centerX,
    centerY,
    radius * 1.2
  );
  gradient.addColorStop(0, "rgba(34, 197, 94, 0.2)");
  gradient.addColorStop(0.5, "rgba(34, 197, 94, 0.4)");
  gradient.addColorStop(1, "rgba(34, 197, 94, 0)");

  ctx.fillStyle = gradient;
  ctx.fill();

  // Animated checkmark with trail effect
  const progress = (Math.sin(time) + 1) / 2;
  const trailSteps = 5;

  for (let i = 0; i < trailSteps; i++) {
    const trailProgress = (progress + i / trailSteps) % 1;
    ctx.beginPath();
    ctx.moveTo(centerX - radius / 2, centerY);
    ctx.lineTo(centerX - radius / 6, centerY + (radius / 2) * trailProgress);
    ctx.lineTo(centerX + (radius / 2) * trailProgress, centerY - radius / 2);

    ctx.strokeStyle = `rgba(34, 197, 94, ${0.3 + 0.7 * (i / trailSteps)})`;
    ctx.lineWidth = (radius / 6) * (1 - i / trailSteps);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  requestAnimationFrame(() =>
    renderCompletedMorphCheckCanvas(ctx, width, height)
  );
};

// Geometric Trophy
export const renderCompletedTrophy = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const size = Math.min(width, height) / 3;

  // Base
  ctx.beginPath();
  ctx.moveTo(centerX - size / 2, centerY + size / 2);
  ctx.lineTo(centerX + size / 2, centerY + size / 2);
  ctx.lineTo(centerX + size / 3, centerY + size / 4);
  ctx.lineTo(centerX - size / 3, centerY + size / 4);
  ctx.closePath();
  ctx.fillStyle = "rgba(34, 197, 94, 0.3)";
  ctx.fill();
  ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
  ctx.stroke();

  // Cup
  ctx.beginPath();
  ctx.moveTo(centerX - size / 3, centerY + size / 4);
  ctx.quadraticCurveTo(
    centerX - size / 3,
    centerY - size / 2,
    centerX,
    centerY - size / 2
  );
  ctx.quadraticCurveTo(
    centerX + size / 3,
    centerY - size / 2,
    centerX + size / 3,
    centerY + size / 4
  );
  ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Star
  const starSize = size / 4;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const x = centerX + Math.cos(angle) * starSize;
    const y = centerY - size / 4 + Math.sin(angle) * starSize;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(34, 197, 94, 0.6)";
  ctx.fill();
  ctx.stroke();
};

// Concentric Completion Circles
export const renderCompletedCircles = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 3;

  // Draw concentric circles
  for (let i = 5; i > 0; i--) {
    const radius = maxRadius * (i / 5);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(34, 197, 94, ${0.2 + (5 - i) * 0.15})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Draw checkmark
  ctx.beginPath();
  ctx.moveTo(centerX - maxRadius / 2, centerY);
  ctx.lineTo(centerX - maxRadius / 6, centerY + maxRadius / 3);
  ctx.lineTo(centerX + maxRadius / 2, centerY - maxRadius / 3);
  ctx.strokeStyle = "rgba(34, 197, 94, 0.9)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.stroke();
};

// Sacred Geometry Completion
export const renderCompletedGeometry = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3;

  // Draw outer circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw hexagon
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const x = centerX + radius * 0.8 * Math.cos(angle);
    const y = centerY + radius * 0.8 * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = "rgba(34, 197, 94, 0.6)";
  ctx.stroke();

  // Draw inner triangle
  ctx.beginPath();
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3 + Math.PI / 6;
    const x = centerX + radius * 0.5 * Math.cos(angle);
    const y = centerY + radius * 0.5 * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(34, 197, 94, 0.3)";
  ctx.fill();
  ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
  ctx.stroke();

  // Draw center point
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.1, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(34, 197, 94, 0.8)";
  ctx.fill();
};

// export const renderProgressCanvas = (
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number
// ) => {
//   ctx.clearRect(0, 0, width, height);

//   // Draw circular progress gauge
//   const centerX = width / 2;
//   const centerY = height / 2;
//   const radius = Math.min(width, height) / 2.5;

//   // Background arc
//   ctx.beginPath();
//   ctx.arc(centerX, centerY, radius, -Math.PI * 0.8, Math.PI * 0.8);
//   ctx.strokeStyle = "rgba(234, 179, 8, 0.2)";
//   ctx.lineWidth = radius / 4;
//   ctx.stroke();

//   // Progress arc
//   ctx.beginPath();
//   ctx.arc(centerX, centerY, radius, -Math.PI * 0.8, Math.PI * 0.3);
//   ctx.strokeStyle = "#eab308";
//   ctx.lineWidth = radius / 4;
//   ctx.stroke();

//   // Center dot
//   ctx.beginPath();
//   ctx.arc(centerX, centerY, radius / 8, 0, Math.PI * 2);
//   ctx.fillStyle = "#eab308";
//   ctx.fill();
// };

export const renderProgressCanvas = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  // Draw circular progress gauge
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3; // Reduced the radius for a smaller design

  // Background arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI * 0.75, Math.PI * 0.75); // Adjusted arc angle for sleekness
  ctx.strokeStyle = "rgba(200, 200, 200, 0.3)"; // Softer gray for a modern feel
  ctx.lineWidth = radius / 6; // Thinner stroke
  ctx.stroke();

  // Progress arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI * 0.75, Math.PI * 0.4); // Adjusted the progress angle
  ctx.strokeStyle = "#facc15"; // Bright yellow for a fresh, modern touch
  ctx.lineWidth = radius / 6; // Thinner stroke
  ctx.lineCap = "round"; // Rounded ends for elegance
  ctx.stroke();

  // Center dot
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius / 10, 0, Math.PI * 2); // Smaller dot for minimalism
  ctx.fillStyle = "#facc15";
  ctx.shadowColor = "rgba(250, 204, 21, 0.5)";
  ctx.shadowBlur = 8; // Glow effect for modern design
  ctx.fill();
};

export const renderNotificationsCanvas = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  // Draw stylized bell with rings
  const centerX = width / 2;
  const centerY = height / 2;
  const bellSize = Math.min(width, height) / 3;

  // Draw rings
  for (let i = 3; i > 0; i--) {
    ctx.beginPath();
    ctx.arc(
      centerX + bellSize / 3,
      centerY,
      bellSize * 0.4 * i,
      -Math.PI * 0.5,
      Math.PI * 0
    );
    ctx.strokeStyle = `rgba(236, 72, 153, ${0.2 * i})`;
    ctx.lineWidth = bellSize / 10;
    ctx.stroke();
  }

  // Bell shape
  ctx.beginPath();
  ctx.moveTo(centerX - bellSize / 2, centerY + bellSize / 4);
  ctx.quadraticCurveTo(
    centerX - bellSize / 2,
    centerY - bellSize / 2,
    centerX,
    centerY - bellSize / 2
  );
  ctx.quadraticCurveTo(
    centerX + bellSize / 2,
    centerY - bellSize / 2,
    centerX + bellSize / 2,
    centerY + bellSize / 4
  );
  ctx.lineTo(centerX - bellSize / 2, centerY + bellSize / 4);
  ctx.fillStyle = "#ec4899";
  ctx.fill();
};
