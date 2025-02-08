export const renderConnectionSphere = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3;
  const numPoints = 30;
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius * 0.6;
    points.push({ x, y });
  }

  ctx.strokeStyle = "rgba(99, 102, 241, 0.6)";
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      ctx.beginPath();
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(points[j].x, points[j].y);
      ctx.stroke();
    }
  }

  ctx.fillStyle = "rgba(99, 102, 241, 1)";
  for (const point of points) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
};

export const renderIsoHexGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  const size = Math.min(width, height) / 12;
  const cols = Math.ceil(width / (size * 1.5));
  const rows = Math.ceil(height / (size * 1.3));

  function drawHex(x: number, y: number, opacity: number) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
    ctx.fill();
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(99, 102, 241, 0.8)";
  ctx.lineWidth = 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * size * 1.5;
      const y = row * size * 1.3 + (col % 2 ? size * 0.65 : 0);
      const opacity = 0.3 + (row + col) * 0.02;
      drawHex(x, y, opacity);
    }
  }
};

export const renderWaveIsoCubes = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  const size = Math.min(width, height) / 10;
  const cols = Math.ceil(width / (size * 2));
  const rows = Math.ceil(height / (size * 2));

  function drawIsoCube(x: number, y: number, opacity: number) {
    ctx.strokeStyle = `rgba(99, 102, 241, 0.8)`;
    ctx.lineWidth = 2;

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

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * size * 2 + (row % 2 ? size : 0);
      const y = row * size * 1.5;
      const opacity = 0.4 + Math.sin((col + row) * 0.5) * 0.2;
      drawIsoCube(x, y, opacity);
    }
  }
};

export const renderPerspectiveLines = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  const lines = 10;
  const startX = width * 0.3;
  const endX = width;

  ctx.strokeStyle = "rgba(99, 102, 241, 0.6)";
  ctx.lineWidth = 2;

  for (let i = 0; i < lines; i++) {
    const y = (height / (lines - 1)) * i;
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, height / 2);
    ctx.stroke();
  }
};

export const renderFloatingCircles = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  const circles = [
    { x: width * 0.75, y: height * 0.3, r: width * 0.08, opacity: 0.3 },
    { x: width * 0.85, y: height * 0.6, r: width * 0.05, opacity: 0.5 },
    { x: width * 0.65, y: height * 0.8, r: width * 0.1, opacity: 0.2 },
  ];

  ctx.fillStyle = "rgba(99, 102, 241, 1)";

  circles.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.globalAlpha = circle.opacity;
    ctx.fill();
  });

  ctx.globalAlpha = 1; // Reset opacity
};

export const renderStackedRectangles = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  const rectangles = [
    {
      x: width * 0.55,
      y: height * 0.2,
      w: width * 0.3,
      h: height * 0.15,
      opacity: 0.3,
    },
    {
      x: width * 0.6,
      y: height * 0.4,
      w: width * 0.25,
      h: height * 0.12,
      opacity: 0.5,
    },
    {
      x: width * 0.65,
      y: height * 0.6,
      w: width * 0.2,
      h: height * 0.1,
      opacity: 0.7,
    },
  ];

  ctx.fillStyle = "rgba(99, 102, 241, 1)";

  rectangles.forEach((rect) => {
    ctx.beginPath();
    ctx.globalAlpha = rect.opacity;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  });

  ctx.globalAlpha = 1; // Reset opacity
};

// export const renderSmoothWaves = (
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number
// ) => {
//   ctx.clearRect(0, 0, width, height);
//   const numWaves = 5;
//   const amplitude = height / 8;
//   const frequency = 0.02;

//   for (let i = 0; i < numWaves; i++) {
//     ctx.beginPath();
//     ctx.moveTo(0, height / 2);
//     for (let x = 0; x < width; x++) {
//       const y = height / 2 + Math.sin(x * frequency + i) * amplitude;
//       ctx.lineTo(x, y);
//     }
//     ctx.strokeStyle = `rgba(99, 102, 241, ${0.3 + i * 0.1})`;
//     ctx.lineWidth = 2;
//     ctx.stroke();
//   }
// };

export const renderSmoothWaves = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);
  const numWaves = 5;
  const amplitude = height / 8;
  const frequency = 0.02;

  // Crear degradado para opacidad progresiva
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, "rgba(99, 102, 241, 0.1)"); // Lado izquierdo (transparente)
  gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.3)");
  gradient.addColorStop(1, "rgba(99, 102, 241, 0.4)"); // Lado derecho (más visible)

  for (let i = 0; i < numWaves; i++) {
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (let x = 0; x < width; x++) {
      const y = height / 2 + Math.sin(x * frequency + i) * amplitude;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};

// export const renderConnectedDots = (
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number
// ) => {
//   ctx.clearRect(0, 0, width, height);

//   const numDots = 20;
//   const dots = Array.from({ length: numDots }, () => ({
//     x: Math.random() * width,
//     y: Math.random() * height,
//   }));

//   ctx.strokeStyle = "rgba(99, 102, 241, 0.3)";

//   dots.forEach((dot, i) => {
//     for (let j = i + 1; j < dots.length; j++) {
//       const dist = Math.hypot(dot.x - dots[j].x, dot.y - dots[j].y);
//       if (dist < 150) {
//         ctx.beginPath();
//         ctx.moveTo(dot.x, dot.y);
//         ctx.lineTo(dots[j].x, dots[j].y);
//         ctx.stroke();
//       }
//     }
//   });

//   ctx.fillStyle = "rgba(99, 102, 241, 0.8)";
//   dots.forEach((dot) => {
//     ctx.beginPath();
//     ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
//     ctx.fill();
//   });
// };

export const renderConnectedDots = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  const numDots = 40; // Más puntos para una red más densa
  const maxDistance = 140; // Distancia máxima para conectar
  const dots = Array.from({ length: numDots }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
  }));

  // console.log("Puntos generados:", JSON.stringify(dots, null, 2)); // Imprimir puntos en consola

  // Crear degradado para las líneas
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(99, 102, 241, 0.1)");
  gradient.addColorStop(1, "rgba(99, 102, 241, 0.6)");

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 1;

  // Dibujar líneas de conexión
  dots.forEach((dot, i) => {
    for (let j = i + 1; j < dots.length; j++) {
      const dist = Math.hypot(dot.x - dots[j].x, dot.y - dots[j].y);
      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  });

  // Dibujar puntos muy pequeños
  ctx.fillStyle = "rgba(99, 102, 241, 0.5)";
  dots.forEach((dot) => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2); // Tamaño mínimo
    ctx.fill();
  });
};

export const renderExpandingCircles = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2;
  const numCircles = 6;

  for (let i = 0; i < numCircles; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, (i / numCircles) * maxRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 + i * 0.1})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};

// export const renderGridConnections = (
//     ctx: CanvasRenderingContext2D,
//     width: number,
//     height: number
//   ) => {
//     ctx.clearRect(0, 0, width, height);

//     const spacing = 50; // Espaciado entre puntos
//     const cols = Math.floor(width / spacing);
//     const rows = Math.floor(height / spacing);
//     const dots: { x: number; y: number }[] = [];

//     // Crear la cuadrícula de puntos
//     for (let i = 0; i <= cols; i++) {
//       for (let j = 0; j <= rows; j++) {
//         dots.push({ x: i * spacing, y: j * spacing });
//       }
//     }

//     // Conectar puntos cercanos
//     ctx.strokeStyle = "rgba(99, 102, 241, 0.4)";
//     ctx.lineWidth = 1;

//     dots.forEach((dot) => {
//       dots.forEach((neighbor) => {
//         const dx = Math.abs(dot.x - neighbor.x);
//         const dy = Math.abs(dot.y - neighbor.y);

//         if ((dx === spacing && dy === 0) || (dx === 0 && dy === spacing) || (dx === spacing && dy === spacing)) {
//           ctx.beginPath();
//           ctx.moveTo(dot.x, dot.y);
//           ctx.lineTo(neighbor.x, neighbor.y);
//           ctx.stroke();
//         }
//       });
//     });

//     // Dibujar los puntos pequeños
//     ctx.fillStyle = "rgba(99, 102, 241, 0.6)";
//     dots.forEach((dot) => {
//       ctx.beginPath();
//       ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
//       ctx.fill();
//     });
//   };

export const renderHexagonalGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);

  const hexSize = 40; // Tamaño del hexágono
  const rows = Math.ceil(height / (hexSize * 1.5));
  const cols = Math.ceil(width / (hexSize * 1.75));
  const dots: { x: number; y: number }[] = [];

  // Crear la malla hexagonal
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * hexSize * 1.75 + (row % 2 === 0 ? 0 : hexSize * 0.875);
      const y = row * hexSize * 1.5;
      dots.push({ x, y });
    }
  }

  // Conectar puntos vecinos
  ctx.strokeStyle = "rgba(99, 102, 241, 0.5)";
  ctx.lineWidth = 1;

  dots.forEach((dot, i) => {
    dots.forEach((neighbor) => {
      const dist = Math.hypot(dot.x - neighbor.x, dot.y - neighbor.y);
      if (dist < hexSize * 2) {
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(neighbor.x, neighbor.y);
        ctx.stroke();
      }
    });
  });

  // Dibujar los puntos pequeños
  ctx.fillStyle = "rgba(99, 102, 241, 0.6)";
  dots.forEach((dot) => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });
};
