// GRUPO 1: EFECTOS HOLOGRÁFICOS

// Efecto de onda con separación cromática RGB y distorsión dinámica
export const fragmentShaderChromaticWave = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Ondas dinámicas más complejas
    float wave1 = sin(uv.x * 15.0 + time) * 0.01;
    float wave2 = cos(uv.y * 12.0 + time * 0.8) * 0.01;
    vec2 distortedUv = uv + vec2(wave1, wave2);

    // Distorsión cromática
    vec4 redChannel = texture2D(textTexture, distortedUv + vec2(0.005 * sin(time), 0.0));
    vec4 greenChannel = texture2D(textTexture, distortedUv);
    vec4 blueChannel = texture2D(textTexture, distortedUv - vec2(0.005 * sin(time), 0.0));

    if (max(max(redChannel.a, greenChannel.a), blueChannel.a) > 0.0) {
      vec3 color = vec3(redChannel.r, greenChannel.g, blueChannel.b);
      gl_FragColor = vec4(color, greenChannel.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto holográfico con ruido y scanlines
export const fragmentShaderHologramGlitch = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // Distorsión holográfica
    float noise = random(uv + time * 0.1) * 0.02;
    float scanline = sin(uv.y * 200.0 + time * 5.0) * 0.1;
    vec2 distortedUv = uv + vec2(noise + scanline * 0.02);

    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      // Colores holográficos
      vec3 color1 = vec3(0.0, 0.9, 1.0);
      vec3 color2 = vec3(1.0, 0.2, 0.8);
      float gradient = sin(uv.x * 5.0 + time) * 0.5 + 0.5;

      vec3 finalColor = mix(color1, color2, gradient);
      finalColor += vec3(scanline) * 0.1;
      finalColor *= 0.8 + noise * 2.0;

      gl_FragColor = vec4(finalColor, texColor.a * (0.8 + scanline));
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de glitch digital con RGB split y ruido
// export const fragmentShaderDigitalGlitch = `
//   uniform float time;
//   uniform sampler2D textTexture;
//   varying vec2 vUv;

//   float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
//   }

//   void main() {
//     vec2 uv = vUv;

//     // Glitch effect
//     float glitchTime = floor(time * 2.0) * 0.5;
//     float noise = random(vec2(glitchTime));

//     // RGB Split
//     float splitStrength = noise * 0.02;
//     vec2 redOffset = vec2(splitStrength, 0.0);
//     vec2 greenOffset = vec2(0.0, splitStrength);
//     vec2 blueOffset = vec2(-splitStrength, 0.0);

//     // Glitch blocks
//     float blockNoise = random(vec2(floor(uv.y * 20.0), glitchTime));
//     float blockOffset = (blockNoise - 0.5) * 0.05 * step(0.96, noise);
//     uv.x += blockOffset;

//     // Digital artifacts
//     float lineNoise = random(vec2(floor(uv.y * 50.0), glitchTime));
//     float lineOffset = (lineNoise - 0.5) * 0.01 * step(0.6, noise);
//     uv.x += lineOffset;

//     vec4 redChannel = texture2D(textTexture, uv + redOffset);
//     vec4 greenChannel = texture2D(textTexture, uv + greenOffset);
//     vec4 blueChannel = texture2D(textTexture, uv + blueOffset);

//     if (max(max(redChannel.a, greenChannel.a), blueChannel.a) > 0.0) {
//       vec3 color = vec3(redChannel.r, greenChannel.g, blueChannel.b);
//       float digitalNoise = random(uv + glitchTime) * step(0.98, noise);
//       color += vec3(digitalNoise);
//       float scanline = sin(uv.y * 100.0) * 0.1 * noise;
//       color += vec3(scanline);

//       gl_FragColor = vec4(color, greenChannel.a);
//     } else {
//       gl_FragColor = vec4(0.0);
//     }
//   }
// `;

// Efecto holográfico suave con iris
export const fragmentShaderSmoothHologram = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // Distorsión suave
    float noise = random(uv + time * 0.1) * 0.01;
    float scanline = sin(uv.y * 100.0 + time * 2.0) * 0.02;
    vec2 distortedUv = uv + vec2(noise, scanline);

    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      // Colores iridiscentes
      vec3 color1 = vec3(0.1, 0.8, 0.9);
      vec3 color2 = vec3(0.6, 0.2, 0.9);
      vec3 color3 = vec3(0.2, 0.9, 0.6);

      float t1 = sin(time + uv.x * 2.0) * 0.5 + 0.5;
      float t2 = sin(time * 1. + uv.x * 3.0) * 0.5 + 0.5;

      vec3 gradientColor = mix(mix(color1, color2, t1), color3, t2);
      vec3 finalColor = gradientColor + vec3(scanline * 0.3);

      float brightness = 0.8 + noise * 2.0;
      gl_FragColor = vec4(finalColor * brightness, texColor.a * 0.9);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de aurora boreal con movimiento fluido
export const fragmentShaderAuroraBorealis = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // Efecto aurora suave
    float aurora = sin(uv.x * 4.0 + time) * cos(uv.y * 2.0 + time * 0.5) * 0.01;
    vec2 distortedUv = uv + vec2(aurora);

    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      // Colores aurora
      vec3 color1 = vec3(0.0, 1.0, 0.5);
      vec3 color2 = vec3(0.0, 0.6, 1.0);
      vec3 color3 = vec3(0.6, 0.3, 1.0);

      float shift = sin(time * 0.5 + uv.y * 2.0) * 0.5 + 0.5;
      float shift2 = cos(time * 0.3 + uv.x * 3.0) * 0.5 + 0.5;

      vec3 auroraColor = mix(mix(color1, color2, shift), color3, shift2);
      float glow = random(uv + time * 0.1) * 0.1 + 0.9;

      gl_FragColor = vec4(auroraColor * glow, texColor.a * 0.95);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de cortes animados con transición suave
// export const fragmentShaderSliceReveal = `
//   uniform float time;
//   uniform sampler2D textTexture;
//   varying vec2 vUv;

//   void main() {
//     vec2 uv = vUv;

//     // Efecto de corte animado
//     float slices = 20.0;
//     float sliceProgress = fract(time * 0.);
//     float sliceY = floor(uv.y * slices) / slices;
//     float sliceOffset = sin(sliceY * 30.0 + time) * 0.02;

//     vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//     float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - sliceProgress) * 2.0);
//     distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//     vec4 texColor = texture2D(textTexture, distortedUv);

//     if (texColor.a > 0.0) {
//       vec3 color = vec3(0.95);
//       float slice = sin(sliceY * 6.28 + time) * 0.5 + 0.5;
//       color *= 0.9 + slice * 0.1;
//       float alpha = texColor.a * progress;

//       gl_FragColor = vec4(color, alpha);
//     } else {
//       gl_FragColor = vec4(0.0);
//     }
//   }
// `;

// export const fragmentShaderSliceReveal = `
//   uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// void main() {
//     vec2 uv = vUv;
//     float delayedTime = max(0.0, time - 2.0);
//     float totalDuration = 5.0; // Duración total del efecto después del delay
//     float fadeOutStart = 4.0; // Cuándo comenzar a desvanecer

//     // Mostrar texto estático inicial
//     if (time < 2.0) {
//         vec4 texColor = texture2D(textTexture, uv);
//         gl_FragColor = vec4(vec3(0.95), texColor.a);
//         return;
//     }

//     float normalizedTime = delayedTime / totalDuration;
//     float fadeOut = smoothstep(fadeOutStart, totalDuration, delayedTime);

//     float slices = 20.0;
//     float sliceProgress = fract(delayedTime * 0.);
//     float sliceY = floor(uv.y * slices) / slices;
//     float sliceOffset = sin(sliceY * 30.0 + delayedTime) * 0.02 * smoothstep(0.0, 0.5, delayedTime);

//     vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//     float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - sliceProgress) * 2.0);
//     distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//     vec4 texColor = texture2D(textTexture, distortedUv);

//     if (texColor.a > 0.0) {
//         vec3 color = vec3(0.95);
//         float slice = sin(sliceY * 6.28 + delayedTime) * 0.5 + 0.5;
//         color *= 0.9 + slice * 0.1;
//         float alpha = texColor.a * progress * (1.0 - fadeOut);

//         gl_FragColor = vec4(color, alpha);
//     } else {
//         gl_FragColor = vec4(0.0);
//     }

//     // Si el tiempo supera la duración total, no mostrar nada
//     if (delayedTime > totalDuration) {
//         gl_FragColor = vec4(0.0);
//     }
// }
// `;

// export const fragmentShaderSliceReveal = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 12.0;
//     float initialEffectDuration = 2.0;
//     float transitionDuration = 1.5;
//     float slicingStart = 4.0;
//     float slicingDuration = 8.0;
//     float finalFadeStart = 8.0;

//     Efecto inicial (0-2s)
//     if (time < initialEffectDuration) {
//         float noise = random(uv + time * 0.08) * 0.01;
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015;
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1;
//             gl_FragColor = vec4(baseColor * brightness, texColor.a * 0.95);
//             return;
//         }
//     }

//     Transición suave (-4s)
//     else if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
//             return;
//         }
//     }

//     Efecto slicing y fade out final
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = min(delayedTime / slicingDuration, 1.0); // Limita el progreso a 1.0

//         float slices = 20.0;
//         float sliceY = floor(uv.y * slices) / slices;
//         float sliceOffset = sin(sliceY * 30.0 + delayedTime * 3.0) * 0.02;

//         Calcula el progreso del slice sin reinicio
//         float xProgress = fract(delayedTime * 0.);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + delayedTime * 3.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;

//             Fade out más suave y continuo
//             float finalFadeProgress = smoothstep(finalFadeStart - slicingStart, totalDuration - slicingStart, delayedTime);
//             float alpha = texColor.a * (1.0 - finalFadeProgress);

//             gl_FragColor = vec4(color, alpha);
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;
export const fragmentShaderSliceReveal = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    // float totalDuration = 12.0;
    // float initialEffectDuration = 2.0;
    // float transitionDuration = 1.5;
    // float slicingStart = 4.0;
    // float slicingDuration = 6.0;
    float totalDuration = 12.0;      // Reducido de 12.0
    float initialEffectDuration = 2.0;  // Reducido de 2.0
    float transitionDuration = 1.5;     // Reducido de 1.5
    float slicingStart = 4.0;          // Reducido de 4.0
    float slicingDuration = 6.0;       // Reducido de 6.0

    // Efecto inicial mejorado (0-2s)
    if (time < initialEffectDuration) {
        float noise = random(uv + time * 0.08) * 0.01;
        float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015;
        float wave1 = sin(uv.x * 15.0 + time) * 0.01;
        float wave2 = cos(uv.y * 12.0 + time * 0.8) * 0.01;
        vec2 distortedUv = uv + vec2(wave1 + noise, wave2 + wave * sin(time));

        vec4 redChannel = texture2D(textTexture, distortedUv + vec2(0.002 * sin(time), 0.0));
        vec4 mainChannel = texture2D(textTexture, distortedUv);
        vec4 blueChannel = texture2D(textTexture, distortedUv - vec2(0.002 * sin(time), 0.0));

        if (max(max(redChannel.a, mainChannel.a), blueChannel.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1;
            vec3 finalColor = baseColor * brightness;
            finalColor.r = mix(finalColor.r, redChannel.r, 0.1);
            finalColor.b = mix(finalColor.b, blueChannel.b, 0.1);
            gl_FragColor = vec4(finalColor, mainChannel.a * 0.95);
            return;
        }
    }
    else if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
        float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
        vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
            gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
            return;
        }
    }
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.2;
        float sliceY = floor(uv.y * slices) / slices;

        // Nueva transición pixelada
        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) * 
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));
        
        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) * 
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        // Aplicar pixelado a la textura
        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

// export const fragmentShaderSliceReveal = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 12.0;
//     float initialEffectDuration = 2.0;
//     float transitionDuration = 1.5;
//     float slicingStart = 4.0;
//     float slicingDuration = 6.0;

//     // Efecto inicial mejorado (0-2s)
//     if (time < initialEffectDuration) {
//         float noise = random(uv + time * 0.08) * 0.01;
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015;
//         float wave1 = sin(uv.x * 15.0 + time) * 0.01;
//         float wave2 = cos(uv.y * 12.0 + time * 0.8) * 0.01;
//         vec2 distortedUv = uv + vec2(wave1 + noise, wave2 + wave * sin(time));

//         vec4 redChannel = texture2D(textTexture, distortedUv + vec2(0.002 * sin(time), 0.0));
//         vec4 mainChannel = texture2D(textTexture, distortedUv);
//         vec4 blueChannel = texture2D(textTexture, distortedUv - vec2(0.002 * sin(time), 0.0));

//         if (max(max(redChannel.a, mainChannel.a), blueChannel.a) > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1;
//             vec3 finalColor = baseColor * brightness;
//             finalColor.r = mix(finalColor.r, redChannel.r, 0.1);
//             finalColor.b = mix(finalColor.b, blueChannel.b, 0.1);
//             gl_FragColor = vec4(finalColor, mainChannel.a * 0.95);
//             return;
//         }
//     }
//     else if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
//             return;
//         }
//     }
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         // Nueva transición pixelada
//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) *
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));

//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         // Aplicar pixelado a la textura
//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;

// export const fragmentShaderSliceReveal = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 12.0;
//     float initialEffectDuration = 2.0;
//     float transitionDuration = 1.5;
//     float slicingStart = 4.0;
//     float slicingDuration = 6.0;

//     // Efecto inicial (0-2s)
//     if (time < initialEffectDuration) {
//         float noise = random(uv + time * 0.08) * 0.01;
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015;
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1;
//             gl_FragColor = vec4(baseColor * brightness, texColor.a * 0.95);
//             return;
//         }
//     }

//     // Transición suave (-4s)
//     else if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
//             return;
//         }
//     }

//    // Efecto slicing con fade out final
// else {
//    float delayedTime = time - slicingStart;
//    float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//    if (slicingProgress >= 1.0) {
//        gl_FragColor = vec4(0.0);
//        return;
//    }

//    float slices = 24.0;
//    float baseTime = delayedTime * 0.;
//    float sliceY = floor(uv.y * slices) / slices;
//    float sliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02 * (1.0 - slicingProgress);
//    float xProgress = baseTime - floor(baseTime);

//    vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//    float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//    distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//    vec4 texColor = texture2D(textTexture, distortedUv);

//    if (texColor.a > 0.0) {
//        vec3 color = vec3(0.95);
//        float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//        color *= 0.9 + slice * 0.1;
//        float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//        float alpha = texColor.a * progress * (1.0 - fadeOut);
//        gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//        return;
//    }
// }

//     gl_FragColor = vec4(0.0);
// }
// `;

// export const fragmentShaderSliceReveal = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 12.0;
//     float initialEffectDuration = 2.0;
//     float transitionDuration = 1.5;
//     float slicingStart = 4.0;
//     float slicingDuration = 6.0;

//     // Efecto inicial (0-2s)
//     if (time < initialEffectDuration) {
//         float noise = random(uv + time * 0.08) * 0.01;
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015;
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1;
//             gl_FragColor = vec4(baseColor * brightness, texColor.a * 0.95);
//             return;
//         }
//     }

//     // Transición suave (-4s)
//     else if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
//             return;
//         }
//     }

//    // Efecto slicing con fade out final
// else {
//    float delayedTime = time - slicingStart;
//    float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//    if (slicingProgress >= 1.0) {
//        gl_FragColor = vec4(0.0);
//        return;
//    }

//    float slices = 24.0;
//    float baseTime = delayedTime * 0.;
//    float sliceY = floor(uv.y * slices) / slices;
//    float sliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02 * (1.0 - slicingProgress);
//    float xProgress = baseTime - floor(baseTime);

//    vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//    float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//    distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//    vec4 texColor = texture2D(textTexture, distortedUv);

//    if (texColor.a > 0.0) {
//        vec3 color = vec3(0.95);
//        float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//        color *= 0.9 + slice * 0.1;
//        float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//        float alpha = texColor.a * progress * (1.0 - fadeOut);
//        gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//        return;
//    }
// }

//     gl_FragColor = vec4(0.0);
// }
// `;

// GRUPO : EFECTOS TECH Y DIGITALES

// Efecto de rejilla tecnológica con profundidad

// export const fragmentShaderSliceReveal = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 12.0;
//     float initialEffectDuration = 2.0;
//     float transitionDuration = 1.5;
//     float slicingStart = 4.0;
//     float slicingDuration = 6.0;

//     // Efecto inicial mejorado (0-2s)
//     if (time < initialEffectDuration) {
//         float noise = random(uv + time * 0.08) * 0.01;
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015;
//         float wave1 = sin(uv.x * 15.0 + time) * 0.01;
//         float wave2 = cos(uv.y * 12.0 + time * 0.8) * 0.01;
//         vec2 distortedUv = uv + vec2(wave1 + noise, wave2 + wave * sin(time));

//         vec4 redChannel = texture2D(textTexture, distortedUv + vec2(0.002 * sin(time), 0.0));
//         vec4 mainChannel = texture2D(textTexture, distortedUv);
//         vec4 blueChannel = texture2D(textTexture, distortedUv - vec2(0.002 * sin(time), 0.0));

//         if (max(max(redChannel.a, mainChannel.a), blueChannel.a) > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1;
//             vec3 finalColor = baseColor * brightness;
//             finalColor.r = mix(finalColor.r, redChannel.r, 0.1);
//             finalColor.b = mix(finalColor.b, blueChannel.b, 0.1);
//             gl_FragColor = vec4(finalColor, mainChannel.a * 0.95);
//             return;
//         }
//     }
//     else if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
//             return;
//         }
//     }
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         // Nueva transición de onda
//         float waveTransition = (1.0 - smoothstep(0.0, 0.2, slicingProgress)) *
//                               sin(uv.y * 20.0 + uv.x * 10.0 + delayedTime * 2.0);
//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(waveTransition * 0.03, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;

// export const fragmentShaderSliceReveal = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 12.0;
//     float initialEffectDuration = 2.0;
//     float transitionDuration = 1.5;
//     float slicingStart = 4.0;
//     float slicingDuration = 6.0;

//     // Efecto inicial mejorado (0-2s)
//     if (time < initialEffectDuration) {
//         float noise = random(uv + time * 0.08) * 0.01;
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015;
//         float wave1 = sin(uv.x * 15.0 + time) * 0.01;
//         float wave2 = cos(uv.y * 12.0 + time * 0.8) * 0.01;
//         vec2 distortedUv = uv + vec2(wave1 + noise, wave2 + wave * sin(time));

//         vec4 redChannel = texture2D(textTexture, distortedUv + vec2(0.002 * sin(time), 0.0));
//         vec4 mainChannel = texture2D(textTexture, distortedUv);
//         vec4 blueChannel = texture2D(textTexture, distortedUv - vec2(0.002 * sin(time), 0.0));

//         if (max(max(redChannel.a, mainChannel.a), blueChannel.a) > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1;
//             vec3 finalColor = baseColor * brightness;
//             finalColor.r = mix(finalColor.r, redChannel.r, 0.1);
//             finalColor.b = mix(finalColor.b, blueChannel.b, 0.1);
//             gl_FragColor = vec4(finalColor, mainChannel.a * 0.95);
//             return;
//         }
//     }
//     else if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
//             return;
//         }
//     }
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         // Nueva transición pixelada
//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) *
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));

//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         // Aplicar pixelado a la textura
//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;

// export const fragmentShaderSliceReveal = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 12.0;
//     float initialEffectDuration = 2.0;
//     float transitionDuration = 1.5;
//     float slicingStart = 4.0;
//     float slicingDuration = 6.0;

//     // Efecto inicial (0-2s)
//     if (time < initialEffectDuration) {
//         float noise = random(uv + time * 0.08) * 0.01;
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015;
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1;
//             gl_FragColor = vec4(baseColor * brightness, texColor.a * 0.95);
//             return;
//         }
//     }

//     // Transición suave (2-4s)
//     else if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
//             return;
//         }
//     }
//     // Efecto slicing con fade out final
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 2.0; // Increased multiplication factor
//         float sliceY = floor(uv.y * slices) / slices;
//         float sliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.2 * (1.0 - slicingProgress); // Increased offset magnitude
//         float xProgress = baseTime - floor(baseTime);

//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 1.0); // Removed multiplication by 0
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.7, 0.95, slicingProgress); // Adjusted for later fade out
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;

export const energyPulseShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 5.0;

    Efecto inicial único y continuo
    if (time < slicingStart) {
        vec2 center = vec2(0.5);
        float dist = length(uv - center);

        Un solo efecto de pulso energético
        float energyPulse = sin(dist * 20.0 - time * 3.0) * 0.5 +
                           cos(dist * 15.0 - time * 2.0) * 0.3;

        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        float effectStrength = mix(0.02, 0.0, transitionProgress);

        vec2 distortedUv = uv + normalize(uv - center) * energyPulse * effectStrength;

        vec4 mainChannel = texture2D(textTexture, distortedUv);

        if (mainChannel.a > 0.0) {
            vec3 baseColor = vec3(0.95);
            float brightness = 1.0 + energyPulse * (1.0 - transitionProgress) * 0.1;
            vec3 finalColor = baseColor * brightness;
            gl_FragColor = vec4(finalColor, mainChannel.a);
            return;
        }
    }
    El resto del shader permanece igual...
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) *
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));

        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

// export const energyPulseShader = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 8.0;
//     float initialEffectDuration = 1.5;
//     float transitionDuration = 1.0;
//     float slicingStart = 3.0;
//     float slicingDuration = 5.0;

//     // Efecto inicial único y continuo
//     if (time < slicingStart) {
//         vec2 center = vec2(0.5);
//         float dist = length(uv - center);

//         // Un solo efecto de pulso energético
//         float energyPulse = sin(dist * 20.0 - time * 3.0) * 0.5 +
//                            cos(dist * 15.0 - time * 2.0) * 0.3;

//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float effectStrength = mix(0.02, 0.0, transitionProgress);

//         vec2 distortedUv = uv + normalize(uv - center) * energyPulse * effectStrength;

//         vec4 mainChannel = texture2D(textTexture, distortedUv);

//         if (mainChannel.a > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 1.0 + energyPulse * (1.0 - transitionProgress) * 0.1;
//             vec3 finalColor = baseColor * brightness;
//             gl_FragColor = vec4(finalColor, mainChannel.a);
//             return;
//         }
//     }
//     // El resto del shader permanece igual...
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) *
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));

//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;
// export const energyPulseShader = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 8.0;
//     float initialEffectDuration = 1.5;
//     float transitionDuration = 1.0;
//     float slicingStart = 3.0;
//     float slicingDuration = 5.0;

//     // Efecto inicial único y continuo
//     if (time < slicingStart) {
//         vec2 center = vec2(0.5);
//         float dist = length(uv - center);

//         // Un solo efecto de pulso energético
//         float energyPulse = sin(dist * 20.0 - time * 3.0) * 0.5 +
//                            cos(dist * 15.0 - time * 2.0) * 0.3;

//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float effectStrength = mix(0.02, 0.0, transitionProgress);

//         vec2 distortedUv = uv + normalize(uv - center) * energyPulse * effectStrength;

//         vec4 mainChannel = texture2D(textTexture, distortedUv);

//         if (mainChannel.a > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 1.0 + energyPulse * (1.0 - transitionProgress) * 0.1;
//             vec3 finalColor = baseColor * brightness;
//             gl_FragColor = vec4(finalColor, mainChannel.a);
//             return;
//         }
//     }
//     // El resto del shader permanece igual...
//    else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         // Nueva transición pixelada
//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) *
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));

//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         // Aplicar pixelado a la textura
//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;

// export const fragmentShaderSliceReveal = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     // float totalDuration = 12.0;
//     // float initialEffectDuration = 2.0;
//     // float transitionDuration = 1.5;
//     // float slicingStart = 4.0;
//     // float slicingDuration = 6.0;
//     float totalDuration = 8.0;      // Reducido de 12.0
//     float initialEffectDuration = 1.5;  // Reducido de 2.0
//     float transitionDuration = 1.0;     // Reducido de 1.5
//     float slicingStart = 3.0;          // Reducido de 4.0
//     float slicingDuration = 4.0;       // Reducido de 6.0

//     // Efecto inicial mejorado (0-2s)
//     if (time < initialEffectDuration) {
//         float noise = random(uv + time * 0.08) * 0.01;
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015;
//         float wave1 = sin(uv.x * 15.0 + time) * 0.01;
//         float wave2 = cos(uv.y * 12.0 + time * 0.8) * 0.01;
//         vec2 distortedUv = uv + vec2(wave1 + noise, wave2 + wave * sin(time));

//         vec4 redChannel = texture2D(textTexture, distortedUv + vec2(0.002 * sin(time), 0.0));
//         vec4 mainChannel = texture2D(textTexture, distortedUv);
//         vec4 blueChannel = texture2D(textTexture, distortedUv - vec2(0.002 * sin(time), 0.0));

//         if (max(max(redChannel.a, mainChannel.a), blueChannel.a) > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1;
//             vec3 finalColor = baseColor * brightness;
//             finalColor.r = mix(finalColor.r, redChannel.r, 0.1);
//             finalColor.b = mix(finalColor.b, blueChannel.b, 0.1);
//             gl_FragColor = vec4(finalColor, mainChannel.a * 0.95);
//             return;
//         }
//     }
//     else if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
//             return;
//         }
//     }
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         // Nueva transición pixelada
//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) *
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));

//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         // Aplicar pixelado a la textura
//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;

export const cyberPulseShader = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 8.0;
//     float initialEffectDuration = 1.5;
//     float transitionDuration = 1.0;
//     float slicingStart = 3.0;
//     float slicingDuration = 4.0;

//     if (time < initialEffectDuration) {
//         vec2 center = vec2(0.5);
//         float dist = length(uv - center);
        
//         float pulse = 0.0;
//         for(float i = 1.0; i <= 3.0; i++) {
//             float speed = 1.0 + i * 0.5;
//             float scale = 1.0 / i;
//             pulse += sin(dist * 20.0 * i - time * speed) * scale;
//         }
        
//         float energyLines = sin(uv.y * 100.0 + time * 2.0) * 0.002;
//         float horizontalLines = sin(uv.x * 80.0 - time) * 0.002;
        
//         vec2 distortedUv = uv;
//         distortedUv += vec2(pulse * 0.01 + energyLines, pulse * 0.01 + horizontalLines);
        
//         vec4 mainColor = texture2D(textTexture, distortedUv);
//         vec4 offsetColor = texture2D(textTexture, distortedUv - vec2(0.002 * sin(time), 0.0));
        
//         if (max(mainColor.a, offsetColor.a) > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float edgeGlow = pow(1.0 - dist, 2.0) * 0.15;
//             float pulseBrightness = 1.0 + pulse * 0.;
            
//             vec3 finalColor = baseColor * pulseBrightness + vec3(edgeGlow);
//             finalColor += vec3(0.0, 0.0, 0.1) * sin(time * 2.0);
            
//             gl_FragColor = vec4(finalColor, mainColor.a * 0.95);
//             return;
//         }
//     }
//     else if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
//             return;
//         }
//     }
//     else {
//         // Tu efecto de slicing existente
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) * 
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));
        
//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) * 
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }`;

export const quantumWaveShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 4.0;

    if (time < initialEffectDuration) {
        // Efecto cuántico inicial
        vec2 center = vec2(0.5);
        float dist = length(uv - center);
        float angle = atan(uv.y - 0.5, uv.x - 0.5);
        
        // Patrón de interferencia cuántica
        float quantum = 0.0;
        for(float i = 1.0; i <= 4.0; i++) {
            float phase = time * (1.0 + i * 0.);
            quantum += sin(dist * 30.0 * i + phase + angle * 2.0) * (0.5 / i);
        }
        
        // Efecto de superposición
        float superposition = sin(time * 3.0 + dist * 10.0) * cos(angle * 4.0 + time);
        float waveCollapse = pow(sin(time * 2.0) * 0.5 + 0.5, 3.0);
        
        vec2 distortedUv = uv + vec2(
            quantum * cos(angle) * 0.01,
            quantum * sin(angle) * 0.01
        ) * (1.0 - waveCollapse);
        
        vec4 mainColor = texture2D(textTexture, distortedUv);
        vec4 phaseColor = texture2D(textTexture, distortedUv + vec2(quantum * 0.002));
        
        if (max(mainColor.a, phaseColor.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float energyLevel = superposition * 0.1 + quantum * 0.15;
            vec3 finalColor = baseColor + vec3(0.02, energyLevel, energyLevel * 0.5);
            float alpha = mainColor.a * (0.95 + waveCollapse * 0.05);
            gl_FragColor = vec4(finalColor, alpha);
            return;
        }
    }
    else if (time < slicingStart) {
        // Transición cuántica
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        vec2 center = vec2(0.5);
        float dist = length(uv - center);
        float angle = atan(uv.y - 0.5, uv.x - 0.5);
        
        // Colapso de onda suave
        float collapse = pow(transitionProgress, 2.0);
        float wave = sin(dist * 20.0 - time * 2.0) * (1.0 - collapse) * 0.01;
        float spiral = (angle + time) * (1.0 - collapse) * 0.005;
        
        vec2 distortedUv = uv + vec2(
            wave * cos(angle) + spiral * sin(angle),
            wave * sin(angle) - spiral * cos(angle)
        );
        
        vec4 texColor = texture2D(textTexture, distortedUv);
        
        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float glow = (1.0 - dist) * (1.0 - collapse) * 0.1;
            gl_FragColor = vec4(color + vec3(glow), texColor.a);
            return;
        }
    }
    // El resto del shader (slicing) se mantiene igual...
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) * 
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));
        
        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) * 
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

// export const electromagneticShader = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// float noise(vec2 st) {
//     vec2 i = floor(st);
//     vec2 f = fract(st);
//     float a = random(i);
//     float b = random(i + vec2(1.0, 0.0));
//     float c = random(i + vec2(0.0, 1.0));
//     float d = random(i + vec2(1.0, 1.0));
//     vec2 u = f * f * (3.0 - 2.0 * f);
//     return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 8.0;
//     float initialEffectDuration = 1.5;
//     float transitionDuration = 1.0;
//     float slicingStart = 3.0;
//     float slicingDuration = 4.0;

//     if (time < initialEffectDuration) {
//         vec2 center = vec2(0.5);
//         float dist = length(uv - center);

//         // Campo electromagnético
//         float emWave = 0.0;
//         for(float i = 1.0; i <= 3.0; i++) {
//             float wavelength = 20.0 * i;
//             float amplitude = 1.0 / i;
//             float phase = time * (.0 + i);

//             // Ondas electromagnéticas concéntricas
//             emWave += sin(dist * wavelength - phase) * amplitude;
//         }

//         // Líneas de campo magnético
//         float fieldLines = sin(atan(uv.y - 0.5, uv.x - 0.5) * 8.0 + time * 2.0);
//         float fieldStrength = pow(1.0 - dist, 2.0);

//         // Distorsión electromagnética
//         vec2 distortedUv = uv + vec2(
//             emWave * cos(fieldLines) * 0.01,
//             emWave * sin(fieldLines) * 0.01
//         ) * fieldStrength;

//         vec4 mainColor = texture2D(textTexture, distortedUv);
//         vec4 chargeColor = texture2D(textTexture, distortedUv + vec2(emWave * 0.002));

//         if (max(mainColor.a, chargeColor.a) > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float energyGlow = (emWave * 0.5 + 0.5) * fieldStrength * 0.;
//             vec3 finalColor = baseColor + vec3(energyGlow * 0.5, energyGlow, energyGlow * 1.5);

//             gl_FragColor = vec4(finalColor, mainColor.a);
//             return;
//         }
//     }
//     else if (time < slicingStart) {
//         // Transición electromagnética
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         vec2 center = vec2(0.5);
//         float dist = length(uv - center);

//         // Campo disipándose
//         float dissipation = pow(1.0 - transitionProgress, 2.0);
//         float fieldWave = sin(dist * 30.0 - time * 3.0) * dissipation;
//         float charge = noise(uv * 5.0 + time) * dissipation;

//         vec2 distortedUv = uv + vec2(
//             fieldWave * 0.01 * sin(time),
//             charge * 0.01 * cos(time)
//         );

//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float energyFade = (1.0 - dist) * dissipation * 0.1;
//             gl_FragColor = vec4(color + vec3(energyFade), texColor.a);
//             return;
//         }
//     }
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) *
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));

//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }`;

export const electromagneticShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 4.0;

    // Efecto inicial y transición (0-3s)
    if (time < slicingStart) {
        vec2 center = vec2(0.5);
        float dist = length(uv - center);
        
        // Progreso de la transición
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        
        // Campo electromagnético con intensidad variable
        float emWave = 0.0;
        for(float i = 1.0; i <= 3.0; i++) {
            float wavelength = 20.0 * i;
            float amplitude = 1.0 / i;
            float phase = time * (.0 + i);
            emWave += sin(dist * wavelength - phase) * amplitude;
        }
        
        // Líneas de campo con intensidad decreciente
        float fieldLines = sin(atan(uv.y - 0.5, uv.x - 0.5) * 8.0 + time * 2.0);
        float fieldStrength = pow(1.0 - dist, 2.0) * (1.0 - transitionProgress);
        
        // Distorsión que se reduce gradualmente
        float distortionStrength = 0.01 * (1.0 - transitionProgress);
        vec2 distortedUv = uv + vec2(
            emWave * cos(fieldLines) * distortionStrength,
            emWave * sin(fieldLines) * distortionStrength
        ) * fieldStrength;
        
        vec4 mainColor = texture2D(textTexture, distortedUv);
        vec4 chargeColor = texture2D(textTexture, distortedUv + vec2(emWave * 0.002 * (1.0 - transitionProgress)));
        
        if (max(mainColor.a, chargeColor.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float energyGlow = (emWave * 0.5 + 0.5) * fieldStrength * 0. * (1.0 - transitionProgress);
            vec3 finalColor = baseColor + vec3(energyGlow * 0.5, energyGlow, energyGlow * 1.5);
            gl_FragColor = vec4(finalColor, mainColor.a);
            return;
        }
    }
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) * 
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));
        
        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) * 
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float alpha = texColor.a * progress;
            gl_FragColor = vec4(color, alpha);
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const digitalResonanceShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 4.0;

    // Efecto inicial y transición (0-3s)
    if (time < slicingStart) {
        // Progreso de la transición
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        
        // Centro y distancias para resonancia
        vec2 center = vec2(0.5);
        float dist = length(uv - center);
        float angle = atan(uv.y - center.y, uv.x - center.x);
        
        // Patrones de resonancia digital
        float resonance = 0.0;
        for(float i = 1.0; i <= 4.0; i++) {
            float frequency = 15.0 * i;
            float speed = time * (1.5 - i * 0.);
            float amplitude = 1.0 / (i * i);
            
            // Ondas digitales con interferencia
            resonance += sin(dist * frequency + speed) * 
                        cos(angle * i * 2.0 + speed * 0.5) * 
                        amplitude;
        }
        
        // Patrón de pulso digital
        float pulse = pow(sin(time * 2.0) * 0.5 + 0.5, 2.0);
        float digitalPattern = noise(vec2(
            uv.x * 10.0 + time,
            uv.y * 10.0 - time * 0.5
        ));
        
        // Intensidad que disminuye con la transición
        float effectStrength = (1.0 - transitionProgress) * (1.0 + pulse * 0.);
        
        // Distorsión combinada
        vec2 distortedUv = uv + vec2(
            resonance * cos(angle) * 0.02,
            resonance * sin(angle) * 0.02
        ) * effectStrength;
        
        // Efecto de escaneo digital
        float scanLine = sin(uv.y * 100.0 + time * 5.0) * 0.002 * effectStrength;
        distortedUv.x += scanLine;
        
        vec4 mainColor = texture2D(textTexture, distortedUv);
        vec4 resonanceColor = texture2D(textTexture, distortedUv + vec2(resonance * 0.01) * effectStrength);
        
        if (max(mainColor.a, resonanceColor.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float digitalGlow = (resonance * 0.5 + 0.5) * (1.0 - dist) * effectStrength * 0.;
            float pulseGlow = pulse * digitalPattern * effectStrength * 0.1;
            
            vec3 finalColor = baseColor + vec3(digitalGlow + pulseGlow);
            gl_FragColor = vec4(finalColor, mainColor.a);
            return;
        }
    }
    // Efecto de slicing (manteniendo el mismo que te gustó)
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) * 
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));
        
        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) * 
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float alpha = texColor.a * progress;
            gl_FragColor = vec4(color, alpha);
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const vortexEnergyShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 4.0;

    if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        vec2 center = vec2(0.5);
        float dist = length(uv - center);
        float angle = atan(uv.y - center.y, uv.x - center.x);
        
        // Vortex principal
        float vortexSpin = angle + time * 2.0;
        float vortexPull = pow(1.0 - dist, 2.0);
        
        // Capas de energía en espiral
        float energySpiral = 0.0;
        for(float i = 1.0; i <= 3.0; i++) {
            float spiralFreq = 8.0 * i;
            float spiralSpeed = time * (1.0 + i * 0.5);
            float spiralIntensity = 1.0 / i;
            
            energySpiral += sin(vortexSpin * spiralFreq + dist * 20.0 * i - spiralSpeed) * 
                           spiralIntensity * vortexPull;
        }
        
        // Flujo de energía radial
        float radialFlow = sin(dist * 30.0 - time * 3.0) * 0.5 + 0.5;
        
        // Intensidad que disminuye con la transición
        float effectStrength = (1.0 - transitionProgress);
        
        // Distorsión combinada
        vec2 distortedUv = uv + vec2(
            cos(vortexSpin) * (energySpiral * 0.02 + radialFlow * 0.01),
            sin(vortexSpin) * (energySpiral * 0.02 + radialFlow * 0.01)
        ) * effectStrength;
        
        vec4 mainColor = texture2D(textTexture, distortedUv);
        vec4 energyColor = texture2D(textTexture, distortedUv + vec2(energySpiral * 0.005) * effectStrength);
        
        if (max(mainColor.a, energyColor.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float energyGlow = energySpiral * 0. * vortexPull * effectStrength;
            float radialGlow = radialFlow * 0.1 * effectStrength;
            
            vec3 finalColor = baseColor + vec3(energyGlow + radialGlow);
            gl_FragColor = vec4(finalColor, mainColor.a);
            return;
        }
    }
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) * 
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));
        
        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) * 
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float alpha = texColor.a * progress;
            gl_FragColor = vec4(color, alpha);
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const lightThreadsShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 4.0;

    if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        
        // Patrones de hilos de luz entrelazados
        float threads = 0.0;
        for(float i = 1.0; i <= 4.0; i++) {
            float freq = 15.0 * i;
            float speed = time * (1.0 + i * 0.);
            float phase = i * 3.14159 * 0.25;
            
            // Hilos horizontales
            threads += sin(uv.y * freq + speed + phase) * (0.5 / i);
            // Hilos verticales
            threads += cos(uv.x * freq - speed + phase) * (0.5 / i);
        }
        
        // Efecto de flujo dinámico
        float flow = noise(vec2(
            uv.x * 3.0 + time * 0.5,
            uv.y * 3.0 - time * 0.5
        ));
        
        // Intensidad que disminuye con la transición
        float effectStrength = (1.0 - transitionProgress);
        
        // Patrón de interacción de hilos
        float threadPattern = threads * flow;
        
        // Distorsión basada en los hilos
        vec2 distortedUv = uv + vec2(
            cos(threadPattern * 3.14159) * 0.02,
            sin(threadPattern * 3.14159) * 0.02
        ) * effectStrength;
        
        // Efecto de brillo de los hilos
        float threadGlow = abs(threads * 2.0) * flow;
        
        vec4 mainColor = texture2D(textTexture, distortedUv);
        vec4 glowColor = texture2D(textTexture, distortedUv + vec2(threadPattern * 0.01) * effectStrength);
        
        if (max(mainColor.a, glowColor.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float glow = threadGlow * effectStrength * 0.;
            float flowGlow = flow * effectStrength * 0.1;
            
            vec3 finalColor = baseColor + vec3(glow + flowGlow);
            gl_FragColor = vec4(finalColor, mainColor.a);
            return;
        }
    }
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) * 
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));
        
        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) * 
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float alpha = texColor.a * progress;
            gl_FragColor = vec4(color, alpha);
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const plasmaPulseShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 4.0;

    if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        vec2 center = vec2(0.5);
        float dist = length(uv - center);

        // Campo de plasma principal
        float plasma = 0.0;
        for(float i = 1.0; i <= 3.0; i++) {
            // Ondas circulares
            float circleWave = sin(dist * 20.0 * i - time * (.0 + i * 0.5));
            // Ondas horizontales
            float horizontalWave = sin(uv.x * 15.0 * i + time * (1.0 + i * 0.3));
            // Ondas verticales
            float verticalWave = cos(uv.y * 15.0 * i - time * (1.5 + i * 0.));

            plasma += (circleWave + horizontalWave + verticalWave) * (0.3 / i);
        }

        // Turbulencia del plasma
        float turbulence = noise(vec2(
            uv.x * 4.0 + time * 0.5,
            uv.y * 4.0 - time * 0.3
        ));

        // Pulsos de energía
        float pulse = pow(sin(time * 2.0) * 0.5 + 0.5, 2.0);

        // Intensidad que disminuye con la transición
        float effectStrength = (1.0 - transitionProgress);

        // Distorsión combinada
        vec2 distortedUv = uv + vec2(
            plasma * cos(turbulence * 6.28) * 0.02,
            plasma * sin(turbulence * 6.28) * 0.02
        ) * effectStrength;

        // Efecto de brillo del plasma
        vec4 mainColor = texture2D(textTexture, distortedUv);
        vec4 plasmaColor = texture2D(textTexture, distortedUv + vec2(plasma * 0.01) * effectStrength);

        if (max(mainColor.a, plasmaColor.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float plasmaGlow = abs(plasma) * effectStrength * 0.;
            float energyPulse = pulse * turbulence * effectStrength * 0.1;

            // Color final con brillo de plasma
            vec3 finalColor = baseColor + vec3(plasmaGlow + energyPulse);
            gl_FragColor = vec4(finalColor, mainColor.a);
            return;
        }
    }
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) *
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));

        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float alpha = texColor.a * progress;
            gl_FragColor = vec4(color, alpha);
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

// export const plasmaPulseShader = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// float noise(vec2 st) {
//     vec2 i = floor(st);
//     vec2 f = fract(st);
//     float a = random(i);
//     float b = random(i + vec2(1.0, 0.0));
//     float c = random(i + vec2(0.0, 1.0));
//     float d = random(i + vec2(1.0, 1.0));
//     vec2 u = f * f * (3.0 - .0 * f);
//     return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 8.0;
//     float initialEffectDuration = 1.5;
//     float transitionDuration = 1.0;
//     float slicingStart = 3.0;
//     float slicingDuration = 4.0;

//     if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         vec2 center = vec2(0.5);
//         float dist = length(uv - center);

//         // Campo de plasma principal
//         float plasma = 0.0;
//         for(float i = 1.0; i <= 3.0; i++) {
//             // Ondas circulares
//             float circleWave = sin(dist * 20.0 * i - time * (.0 + i * 0.5));
//             // Ondas horizontales
//             float horizontalWave = sin(uv.x * 15.0 * i + time * (1.0 + i * 0.3));
//             // Ondas verticales
//             float verticalWave = cos(uv.y * 15.0 * i - time * (1.5 + i * 0.2));

//             plasma += (circleWave + horizontalWave + verticalWave) * (0.3 / i);
//         }

//         // Turbulencia del plasma
//         float turbulence = noise(vec2(
//             uv.x * 4.0 + time * 0.5,
//             uv.y * 4.0 - time * 0.3
//         ));

//         // Pulsos de energía
//         float pulse = pow(sin(time * .0) * 0.5 + 0.5, 2.0);

//         // Intensidad que disminuye con la transición
//         float effectStrength = (1.0 - transitionProgress);

//         // Distorsión combinada
//         vec2 distortedUv = uv + vec2(
//             plasma * cos(turbulence * 6.28) * 0.02,
//             plasma * sin(turbulence * 6.28) * 0.02
//         ) * effectStrength;

//         // Efecto de brillo del plasma
//         vec4 mainColor = texture2D(textTexture, distortedUv);
//         vec4 plasmaColor = texture2D(textTexture, distortedUv + vec2(plasma * 0.01) * effectStrength);

//         if (max(mainColor.a, plasmaColor.a) > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float plasmaGlow = abs(plasma) * effectStrength * 0.2;
//             float energyPulse = pulse * turbulence * effectStrength * 0.1;

//             // Color final con brillo de plasma
//             vec3 finalColor = baseColor + vec3(plasmaGlow + energyPulse);
//             gl_FragColor = vec4(finalColor, mainColor.a);
//             return;
//         }
//     }
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.2;
//         float sliceY = floor(uv.y * slices) / slices;

//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) *
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));

//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * .0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float alpha = texColor.a * progress;
//             gl_FragColor = vec4(color, alpha);
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;

export const digitalRainShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float digitalNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 4.0;

    if (time < initialEffectDuration) {
        // Digital rain effect
        float rainSpeed = time * 2.0;
        float rainColumn = floor(uv.x * 20.0) / 20.0;
        float rainOffset = random(vec2(rainColumn, 0.0)) * 2.0;
        float rainDrop = fract(uv.y * 2.0 - rainSpeed - rainOffset);
        
        // Matriz digital
        float matrix = digitalNoise(vec2(
            uv.x * 20.0,
            uv.y * 20.0 + time
        ));
        
        vec2 distortedUv = uv + vec2(
            sin(matrix * 6.28) * 0.01,
            rainDrop * 0.005
        );
        
        vec4 mainColor = texture2D(textTexture, distortedUv);
        vec4 glowColor = texture2D(textTexture, distortedUv + vec2(0.002));
        
        if (max(mainColor.a, glowColor.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float digitalGlow = matrix * 0. * (1.0 - rainDrop);
            vec3 finalColor = baseColor + vec3(0.0, digitalGlow * 0.1, 0.0);
            
            gl_FragColor = vec4(finalColor, mainColor.a);
            return;
        }
    }
 else {
        // Tu efecto de slicing existente
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) * 
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));
        
        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) * 
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
`;

export const plasmaWaveShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 5.0;

    // Efecto continuo de plasma
    if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);

        // Plasma suave
        float plasma = sin(uv.x * 10.0 + time * 2.0) *
                      cos(uv.y * 8.0 - time) +
                      sin((uv.x + uv.y) * 5.0 + time * 1.5);

        plasma *= (1.0 - transitionProgress) * 0.015; // Suavizar transición

        vec2 distortedUv = uv + vec2(plasma);
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 baseColor = vec3(0.95);
            float brightness = 1.0 + plasma * 5.0 * (1.0 - transitionProgress);
            gl_FragColor = vec4(baseColor * brightness, texColor.a);
            return;
        }
    }

    // El resto del shader permanece igual para mantener el efecto de slicing...
     else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) *
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));

        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }
    }
    // else {
    //     float delayedTime = time - slicingStart;
    //     float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

    //     if (slicingProgress >= 1.0) {
    //         gl_FragColor = vec4(0.0);
    //         return;
    //     }

    //     float slices = 24.0;
    //     float baseTime = delayedTime * 0.;
    //     float sliceY = floor(uv.y * slices) / slices;

    //     float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
    //     vec2 pixelated = floor(uv / pixelSize) * pixelSize;
    //     float pixelNoise = random(pixelated + delayedTime) *
    //                       (1.0 - smoothstep(0.0, 0.3, slicingProgress));

    //     float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
    //     float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
    //     float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
    //                        (1.0 - slicingProgress);

    //     float xProgress = fract(baseTime);
    //     vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
    //     float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
    //     distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

    //     vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
    //     vec4 texColor = texture2D(textTexture, finalUv);

    //     if (texColor.a > 0.0) {
    //         vec3 color = vec3(0.95);
    //         float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
    //         color *= 0.9 + slice * 0.1;
    //         float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
    //         float alpha = texColor.a * progress * (1.0 - fadeOut);
    //         gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
    //         return;
    //     }
    // }

    gl_FragColor = vec4(0.0);
}
`;

export const glitchWaveShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 5.0;

    // Efecto continuo de onda glitch
    if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);

        // Onda base
        float wave = sin(uv.y * 20.0 + time * 2.0) * cos(uv.x * 15.0 - time);

        // Glitch sutil
        float glitchIntensity = step(0.97, random(vec2(floor(time * 10.0))));
        float glitchOffset = random(vec2(floor(uv.y * 10.0), time)) * 2.0 - 1.0;

        vec2 distortedUv = uv;
        distortedUv.x += wave * 0.01 * (1.0 - transitionProgress);
        distortedUv.x += glitchOffset * glitchIntensity * 0.02 * (1.0 - transitionProgress);

        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 baseColor = vec3(0.95);
            float glitchColor = 1.0 + (glitchOffset * glitchIntensity * 0.1);
            vec3 finalColor = baseColor * glitchColor;
            gl_FragColor = vec4(finalColor, texColor.a);
            return;
        }
    }

    // Mantener el efecto de slicing igual...
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) *
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));

        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

// export const quantumWaveShader = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 8.0;
//     float initialEffectDuration = 1.5;
//     float transitionDuration = 1.0;
//     float slicingStart = 3.0;
//     float slicingDuration = 5.0;

//     // Efecto continuo de onda cuántica
//     if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);

//         // Patrón de interferencia cuántica
//         vec2 p = uv * 2.0 - 1.0;
//         float r = length(p);
//         float theta = atan(p.y, p.x);

//         float wave1 = sin(r * 20.0 - time * 2.0) * 0.5 + 0.5;
//         float wave2 = cos(theta * 5.0 + time) * 0.5 + 0.5;
//         float interference = wave1 * wave2;

//         vec2 distortedUv = uv + vec2(
//             cos(theta) * interference * 0.01,
//             sin(theta) * interference * 0.01
//         ) * (1.0 - transitionProgress);

//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 1.0 + interference * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(baseColor * brightness, texColor.a);
//             return;
//         }
//     }

//     // Mantener el efecto de slicing igual...
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) *
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));

//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;

// export const digitalRainShader = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 8.0;
//     float initialEffectDuration = 1.5;
//     float transitionDuration = 1.0;
//     float slicingStart = 3.0;
//     float slicingDuration = 5.0;

//     // Efecto continuo de lluvia digital
//     if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);

//         // Efecto de caída
//         float rain = step(0.98, random(vec2(floor(uv.x * 20.0), floor((uv.y + time * 0.5) * 20.0))));
//         float trails = rain * (1.0 - fract((uv.y + time * 0.5) * 20.0));

//         vec2 rainOffset = vec2(0.0, trails * 0.02 * (1.0 - transitionProgress));
//         vec2 distortedUv = uv + rainOffset;

//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float brightness = 1.0 + trails * (1.0 - transitionProgress);
//             gl_FragColor = vec4(baseColor * brightness, texColor.a);
//             return;
//         }
//     }

//     // Mantener el efecto de slicing igual...
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) *
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));

//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;

export const dnaHelixShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 5.0;

    if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);

        // Patrón de doble hélice
        float helixA = sin(uv.y * 15.0 + time * 2.0) * cos(time) * 0.3;
        float helixB = sin(uv.y * 15.0 + time * 2.0 + 3.14) * cos(time) * 0.3;

        // Conexiones entre hélices
        float connections = sin(uv.y * 30.0 + time) * 0.1;

        // Movimiento espiral
        vec2 spiral = vec2(
            sin(uv.y * 8.0 + time) * helixA,
            cos(uv.x * 8.0 + time) * helixB
        ) * (1.0 - transitionProgress) * 0.02;

        vec2 distortedUv = uv + spiral;
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 baseColor = vec3(0.95);
            float dnaGlow = (sin(uv.y * 20.0 + time * 3.0) * 0.5 + 0.5) *
                           (1.0 - transitionProgress) * 0.15;
            vec3 finalColor = baseColor + vec3(dnaGlow);
            gl_FragColor = vec4(finalColor, texColor.a);
            return;
        }
    }
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) *
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));

        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const vortexFractalShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 5.0;

    if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);

        // Centro del vórtice
        vec2 center = vec2(0.5);
        vec2 p = uv - center;
        float radius = length(p);
        float angle = atan(p.y, p.x);

        // Patrón fractal
        float fractalPattern = 0.0;
        float scale = 1.0;
        for(float i = 0.0; i < 3.0; i++) {
            float offset = time * (0.5 - i * 0.);
            fractalPattern += sin(radius * 10.0 * scale + offset) *
                            cos(angle * 3.0 * scale + offset) * (0.5 / scale);
            scale *= 1.5;
        }

        // Movimiento de vórtice
        vec2 vortex = vec2(
            cos(angle + fractalPattern + time) * radius,
            sin(angle + fractalPattern + time) * radius
        ) * (1.0 - transitionProgress) * 0.03;

        vec2 distortedUv = uv + vortex;
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 baseColor = vec3(0.95);
            float fractalglow = (fractalPattern * 0.5 + 0.5) *
                              (1.0 - transitionProgress) * 0.;
            vec3 finalColor = baseColor + vec3(fractalglow);
            gl_FragColor = vec4(finalColor, texColor.a);
            return;
        }
    }
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) *
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));

        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const auroraShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 5.0;

    if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);

        // Efecto Aurora
        float auroraWave = 0.0;
        for(float i = 1.0; i <= 3.0; i++) {
            float phase = time * (1.0 + i * 0.);
            auroraWave += sin(uv.y * 8.0 * i + phase + uv.x * 5.0) *
                         cos(uv.x * 4.0 * i - phase) * (0.3 / i);
        }

        // Movimiento fluido
        vec2 auroraOffset = vec2(
            sin(uv.y * 3.0 + time + auroraWave) * 0.02,
            cos(uv.x * 4.0 + time + auroraWave) * 0.01
        ) * (1.0 - transitionProgress);

        vec2 distortedUv = uv + auroraOffset;
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 baseColor = vec3(0.95);
            float auroraGlow = (auroraWave * 0.5 + 0.5) * (1.0 - transitionProgress) * 0.;
            vec3 finalColor = baseColor + vec3(auroraGlow);
            gl_FragColor = vec4(finalColor, texColor.a);
            return;
        }
    }
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) *
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));

        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const circuitFlowShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 8.0;
    float initialEffectDuration = 1.5;
    float transitionDuration = 1.0;
    float slicingStart = 3.0;
    float slicingDuration = 5.0;

    // Efecto inicial: Circuit Flow (0-1.5s)
    if (time < initialEffectDuration) {
        // Patrones de circuito
        float circuit1 = step(0.4, fract(uv.x * 10.0 - time));
        float circuit2 = step(0.6, fract(uv.y * 8.0 + time * 0.5));

        // Flujo de datos
        float flow = sin(uv.x * 20.0 + time * 3.0) * cos(uv.y * 15.0 - time * 2.0);
        float pulsePattern = sin(uv.y * 30.0 + flow + time * 4.0) * 0.5 + 0.5;

        vec2 distortedUv = uv;
        distortedUv.x += sin(uv.y * 8.0 + time * 2.0) * 0.01 * circuit1;
        distortedUv.y += cos(uv.x * 6.0 - time * 1.5) * 0.01 * circuit2;

        vec4 mainChannel = texture2D(textTexture, distortedUv);
        vec4 flowChannel = texture2D(textTexture, distortedUv + vec2(0.002 * flow));

        if (max(mainChannel.a, flowChannel.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float circuitGlow = pulsePattern * 0.15;
            vec3 finalColor = baseColor + vec3(0.0, circuitGlow, circuitGlow * 0.5);
            gl_FragColor = vec4(finalColor, mainChannel.a * 0.95);
            return;
        }
    }
    // Mantener el resto igual que el shader original...
    else if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
        float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
        vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
            gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
            return;
        }
    }
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
        vec2 pixelated = floor(uv / pixelSize) * pixelSize;
        float pixelNoise = random(pixelated + delayedTime) *
                          (1.0 - smoothstep(0.0, 0.3, slicingProgress));

        float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
        float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
        float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
        vec4 texColor = texture2D(textTexture, finalUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + slice * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

// export const energyPulseShader = `
// uniform float time;
// uniform sampler2D textTexture;
// varying vec2 vUv;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// void main() {
//     vec2 uv = vUv;
//     float totalDuration = 8.0;        // Reducido de 12.0
//     float initialEffectDuration = 1.5; // Reducido de 2.0
//     float transitionDuration = 1.0;    // Reducido de 1.5
//     float slicingStart = 3.0;         // Reducido de 4.0
//     float slicingDuration = 5.0;      // Reducido de 6.0

//     // Efecto inicial: Energy Pulse (0-1.5s)
//     if (time < initialEffectDuration) {
//         // Crear un efecto de pulso de energía desde el centro
//         vec2 center = vec2(0.5);
//         float dist = length(uv - center);

//         // Múltiples anillos de energía
//         float rings = sin(dist * 20.0 - time * 4.0) * 0.5 +
//                      sin(dist * 10.0 - time * 2.0) * 0.3;

//         // Pulso radial
//         float pulse = exp(-dist * 4.0) * sin(time * 3.0) * 0.02;

//         vec2 distortedUv = uv + normalize(uv - center) * (rings * 0.01 + pulse);

//         // Separación de canales para efecto cromático
//         vec4 redChannel = texture2D(textTexture, distortedUv + vec2(0.002, 0.0));
//         vec4 mainChannel = texture2D(textTexture, distortedUv);
//         vec4 blueChannel = texture2D(textTexture, distortedUv - vec2(0.002, 0.0));

//         if (max(max(redChannel.a, mainChannel.a), blueChannel.a) > 0.0) {
//             vec3 baseColor = vec3(0.95);
//             float energyGlow = (1.0 + sin(time * 5.0)) * 0.5;
//             vec3 finalColor = baseColor * (1.0 + rings * 0.1 + energyGlow * 0.1);
//             gl_FragColor = vec4(finalColor, mainChannel.a * 0.95);
//             return;
//         }
//     }
//     // La transición y el efecto slicing permanecen igual
//     else if (time < slicingStart) {
//         float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
//         float noise = random(uv + time * 0.08) * 0.01 * (1.0 - transitionProgress);
//         float wave = sin(uv.y * 50.0 + time * 1.5) * 0.015 * (1.0 - transitionProgress);
//         vec2 distortedUv = uv + vec2(noise + wave * sin(time), wave);
//         vec4 texColor = texture2D(textTexture, distortedUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1 * (1.0 - transitionProgress);
//             gl_FragColor = vec4(color * (0.9 + brightness * 0.1), texColor.a);
//             return;
//         }
//     }
//     else {
//         float delayedTime = time - slicingStart;
//         float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

//         if (slicingProgress >= 1.0) {
//             gl_FragColor = vec4(0.0);
//             return;
//         }

//         float slices = 24.0;
//         float baseTime = delayedTime * 0.;
//         float sliceY = floor(uv.y * slices) / slices;

//         float pixelSize = mix(0.0, 0.05, (1.0 - smoothstep(0.0, 0.2, slicingProgress)));
//         vec2 pixelated = floor(uv / pixelSize) * pixelSize;
//         float pixelNoise = random(pixelated + delayedTime) *
//                           (1.0 - smoothstep(0.0, 0.3, slicingProgress));

//         float sliceIntensity = smoothstep(0.0, 0.3, slicingProgress);
//         float normalSliceOffset = sin(sliceY * 30.0 + baseTime * 6.28) * 0.02;
//         float sliceOffset = mix(pixelNoise * 0.02, normalSliceOffset, sliceIntensity) *
//                            (1.0 - slicingProgress);

//         float xProgress = fract(baseTime);
//         vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
//         float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
//         distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

//         vec2 finalUv = mix(pixelated, distortedUv, sliceIntensity);
//         vec4 texColor = texture2D(textTexture, finalUv);

//         if (texColor.a > 0.0) {
//             vec3 color = vec3(0.95);
//             float slice = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
//             color *= 0.9 + slice * 0.1;
//             float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
//             float alpha = texColor.a * progress * (1.0 - fadeOut);
//             gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
//             return;
//         }
//     }

//     gl_FragColor = vec4(0.0);
// }
// `;

export const holographicRippleShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 12.0;
    float initialEffectDuration = 2.0;
    float transitionDuration = 1.5;
    float slicingStart = 4.0;
    float slicingDuration = 6.0;

    // Efecto inicial (0-2s): Ondas holográficas
    if (time < initialEffectDuration) {
        vec2 center = vec2(0.5);
        float dist = length(uv - center);
        float ripple = sin(dist * 30.0 - time * 3.0) * 0.015;
        vec2 distortedUv = uv + normalize(uv - center) * ripple;

        // Separación cromática para efecto holográfico
        vec4 redChannel = texture2D(textTexture, distortedUv + vec2(0.003, 0.0));
        vec4 greenChannel = texture2D(textTexture, distortedUv);
        vec4 blueChannel = texture2D(textTexture, distortedUv - vec2(0.003, 0.0));

        if (max(max(redChannel.a, greenChannel.a), blueChannel.a) > 0.0) {
            float holoPulse = sin(time * 2.0) * 0.5 + 0.5;
            vec3 holoColor = mix(
                vec3(0.95),
                vec3(redChannel.r * 1., greenChannel.g, blueChannel.b * 1.1),
                holoPulse * 0.3
            );
            gl_FragColor = vec4(holoColor, greenChannel.a * 0.95);
            return;
        }
    }
    // Transición (-4s): Descomposición espectral
    else if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        float spectrum = sin(uv.x * 20.0 + uv.y * 10.0 + time);
        float chromatic = mix(0.0, 0.01, spectrum * (1.0 - transitionProgress));

        vec2 distortedUv = uv + vec2(chromatic * sin(time), chromatic * cos(time));
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float prism = sin(uv.y * 10.0 + time) * 0.5 + 0.5;
            color *= 1.0 + prism * (1.0 - transitionProgress) * 0.1;
            gl_FragColor = vec4(color, texColor.a);
            return;
        }
    }
    // Efecto final (4s+): Slice con destello holográfico
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float holoGlow = pow(sin(sliceY * 3.14 + delayedTime), 3.0) * 0.5;
        float rainbowEffect = sin(delayedTime + sliceY * 10.0) * 0.5 + 0.5;

        float sliceOffset = mix(holoGlow, 0.02, slicingProgress) * (1.0 - slicingProgress);
        vec2 rainbowOffset = vec2(sin(delayedTime + uv.y * 5.0), cos(delayedTime + uv.x * 5.0)) * 0.002;

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0) + rainbowOffset * (1.0 - slicingProgress);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            color += vec3(0.05 * rainbowEffect, 0.02 * rainbowEffect, 0.08 * rainbowEffect);
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const quantumDistortionShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 12.0;
    float initialEffectDuration = 2.0;
    float transitionDuration = 1.5;
    float slicingStart = 4.0;
    float slicingDuration = 6.0;

    // Efecto inicial (0-2s): Partículas cuánticas
    if (time < initialEffectDuration) {
        float particles = 0.0;
        for(float i = 0.0; i < 3.0; i++) {
            particles += sin(uv.x * 20.0 * i + time) * sin(uv.y * 15.0 + time + i);
        }
        vec2 distortedUv = uv + vec2(particles) * 0.01;

        vec4 mainChannel = texture2D(textTexture, distortedUv);
        vec4 quantumShift = texture2D(textTexture, distortedUv + vec2(particles * 0.02));

        if (max(mainChannel.a, quantumShift.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float quantumFlux = sin(particles * 5.0 + time * 3.0) * 0.5 + 0.5;
            vec3 finalColor = mix(baseColor, vec3(0.95, 0.98, 1.0), quantumFlux * 0.);
            gl_FragColor = vec4(finalColor, mainChannel.a * 0.95);
            return;
        }
    }
    // Transición (-4s): Tunelización cuántica
    else if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        float tunnel = length(vec2(
            sin(uv.x * 6.28 + time),
            cos(uv.y * 6.28 + time)
        ));
        float vortex = mix(0.0, 0.1, tunnel * (1.0 - transitionProgress));

        vec2 distortedUv = uv + vec2(cos(tunnel * 10.0), sin(tunnel * 10.0)) * vortex;
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float energyPulse = sin(tunnel * 20.0 + time * 2.0) * 0.5 + 0.5;
            color *= 1.0 + energyPulse * 0.1 * (1.0 - transitionProgress);
            gl_FragColor = vec4(color, texColor.a);
            return;
        }
    }
    // Efecto final (4s+): Slice con fluctuaciones cuánticas
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float quantumNoise = random(sliceY + delayedTime * vec2(0.1));
        float fluctuation = sin(quantumNoise * 10.0 + delayedTime) * 0.03;

        float sliceOffset = mix(fluctuation, fluctuation * 0.5, slicingProgress) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, quantumNoise * 0.01 * (1.0 - slicingProgress));
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float quantumEffect = sin(sliceY * 8.0 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + quantumEffect * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const dataStreamShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 12.0;
    float initialEffectDuration = 2.0;
    float transitionDuration = 1.5;
    float slicingStart = 4.0;
    float slicingDuration = 6.0;

    // Efecto inicial (0-2s): Flujo de datos binarios
    if (time < initialEffectDuration) {
        float dataStream = 0.0;
        for(float i = 1.0; i < 4.0; i++) {
            dataStream += step(0.5, random(vec2(floor(uv.y * 20.0 * i), floor(time * 5.0))));
        }
        vec2 distortedUv = uv + vec2(dataStream * 0.02 * sin(time), 0.0);

        vec4 texColor = texture2D(textTexture, distortedUv);
        vec4 dataShift = texture2D(textTexture, distortedUv + vec2(0.02 * dataStream, 0.0));

        if (max(texColor.a, dataShift.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float dataPulse = sin(uv.y * 50.0 + time * 3.0) * 0.5 + 0.5;
            vec3 finalColor = mix(baseColor, vec3(1.0), dataStream * dataPulse * 0.);
            gl_FragColor = vec4(finalColor, texColor.a * 0.95);
            return;
        }
    }
    // Transición (-4s): Compilación de datos
    else if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        float dataBlocks = floor(uv.x * 10.0) + floor(uv.y * 10.0);
        float compilation = random(vec2(dataBlocks, time)) * (1.0 - transitionProgress);

        vec2 distortedUv = uv + vec2(compilation * 0.02);
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float dataNoise = random(vec2(dataBlocks, floor(time * 10.0))) * 0.1;
            color *= 1.0 + dataNoise * (1.0 - transitionProgress);
            gl_FragColor = vec4(color, texColor.a);
            return;
        }
    }
    // Efecto final (4s+): Slice con rastro de datos
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float dataTrail = sin(sliceY * 20.0 + delayedTime * 4.0) * 0.03;
        float binaryPulse = step(0.7, random(vec2(sliceY, floor(delayedTime * 10.0))));

        float sliceOffset = mix(dataTrail, binaryPulse * 0.02, slicingProgress) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float dataEffect = sin(sliceY * 10.0 + baseTime * 5.0) * 0.5 + 0.5;
            color *= 0.9 + dataEffect * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const energyWaveShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 12.0;
    float initialEffectDuration = 2.0;
    float transitionDuration = 1.5;
    float slicingStart = 4.0;
    float slicingDuration = 6.0;

    // Efecto inicial (0-2s): Ondas de energía pulsante
    if (time < initialEffectDuration) {
        float energy = sin(length(uv - vec2(0.5)) * 20.0 - time * 2.0);
        float pulse = sin(time * 3.0) * 0.5 + 0.5;
        vec2 distortedUv = uv + vec2(energy * pulse * 0.02);

        vec4 mainChannel = texture2D(textTexture, distortedUv);
        vec4 energyShift = texture2D(textTexture, distortedUv + vec2(energy * 0.01));

        if (max(mainChannel.a, energyShift.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float energyGlow = energy * 0.5 + 0.5;
            vec3 finalColor = mix(baseColor, vec3(1.0), energyGlow * pulse * 0.);
            gl_FragColor = vec4(finalColor, mainChannel.a * 0.95);
            return;
        }
    }
    // Transición (-4s): Campo de energía
    else if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);
        float field = sin(uv.x * 15.0 + uv.y * 10.0 + time);
        float energyField = smoothstep(-1.0, 1.0, field) * (1.0 - transitionProgress);

        vec2 distortedUv = uv + vec2(cos(field) * energyField * 0.02);
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float fieldPulse = sin(field * 5.0 + time * 2.0) * 0.5 + 0.5;
            color *= 1.0 + fieldPulse * 0.1 * (1.0 - transitionProgress);
            gl_FragColor = vec4(color, texColor.a);
            return;
        }
    }
    // Efecto final (4s+): Slice con rastro de energía
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float energyTrail = sin(sliceY * 8.0 + delayedTime * 2.0) * 0.04;
        float resonance = pow(sin(delayedTime + sliceY * 5.0), 2.0);

        float sliceOffset = mix(energyTrail, resonance * 0.03, slicingProgress) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float energyEffect = sin(sliceY * 6.0 + baseTime * 3.0) * 0.5 + 0.5;
                       color *= 0.9 + energyEffect * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const neoTechShader = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float totalDuration = 12.0;
    float initialEffectDuration = 2.0;
    float transitionDuration = 1.5;
    float slicingStart = 4.0;
    float slicingDuration = 6.0;

    // Efecto inicial (0-2s): Scanlines y Glitch
    if (time < initialEffectDuration) {
        float scanline = sin(uv.y * 120.0 + time * 2.0) * 0.02;
        float glitch = step(0.98, random(vec2(floor(time * 20.0)))) * random(uv) * 0.1;
        vec2 distortedUv = uv + vec2(scanline + glitch, scanline * 0.5);

        vec4 mainChannel = texture2D(textTexture, distortedUv);
        vec4 glitchChannel = texture2D(textTexture, distortedUv + vec2(glitch * 0.05, 0.0));

        if (max(mainChannel.a, glitchChannel.a) > 0.0) {
            vec3 baseColor = vec3(0.95);
            float brightness = 0.9 + sin(uv.y * 4.0 + time * 2.0) * 0.1;
            vec3 glitchColor = vec3(0.2, 0.8, 1.0);
            vec3 finalColor = mix(baseColor * brightness, glitchColor, glitch * 0.5);
            gl_FragColor = vec4(finalColor, mainChannel.a * 0.95);
            return;
        }
    }
    // Transición (-4s): Disolución digital
    else if (time < slicingStart) {
        float transitionProgress = smoothstep(initialEffectDuration, initialEffectDuration + transitionDuration, time);

        float hexSize = mix(0.02, 0.2, transitionProgress);
        vec2 hexUv = floor(uv / hexSize) * hexSize;
        float hexNoise = random(hexUv + time) * (1.0 - transitionProgress);

        vec2 distortedUv = uv + vec2(hexNoise * 0.02);
        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float digitalNoise = random(hexUv + time) * 0.1 * (1.0 - transitionProgress);
            color += vec3(digitalNoise);
            gl_FragColor = vec4(color, texColor.a);
            return;
        }
    }
    // Efecto final (4s+): Slice con rastro digital
    else {
        float delayedTime = time - slicingStart;
        float slicingProgress = clamp(delayedTime / slicingDuration, 0.0, 1.0);

        if (slicingProgress >= 1.0) {
            gl_FragColor = vec4(0.0);
            return;
        }

        float slices = 24.0;
        float baseTime = delayedTime * 0.;
        float sliceY = floor(uv.y * slices) / slices;

        float trailEffect = sin(sliceY * 10.0 + delayedTime * 3.0) * 0.05;
        float digitalTrail = smoothstep(0.0, 1.0, fract(uv.x - delayedTime * 0.5));

        float sliceOffset = mix(trailEffect, digitalTrail * 0.03, slicingProgress) *
                           (1.0 - slicingProgress);

        float xProgress = fract(baseTime);
        vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
        float progress = smoothstep(0.0, 1.0, (uv.x + sliceY - xProgress) * 2.0);
        distortedUv.x = mix(uv.x - 0.1, distortedUv.x, progress);

        vec4 texColor = texture2D(textTexture, distortedUv);

        if (texColor.a > 0.0) {
            vec3 color = vec3(0.95);
            float digitalEffect = sin(sliceY * 6.28 + baseTime * 4.0) * 0.5 + 0.5;
            color *= 0.9 + digitalEffect * 0.1;
            float fadeOut = smoothstep(0.5, 0.95, slicingProgress);
            float alpha = texColor.a * progress * (1.0 - fadeOut);
            gl_FragColor = vec4(color, alpha * (1.0 - slicingProgress * 0.5));
            return;
        }
    }

    gl_FragColor = vec4(0.0);
}
`;

export const fragmentShaderTechGrid = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float grid(vec2 uv, float size) {
    vec2 grid = fract(uv * size);
    return step(0.95, max(grid.x, grid.y));
  }

  void main() {
    vec2 uv = vUv;
    vec4 texColor = texture2D(textTexture, uv);

    if (texColor.a > 0.0) {
      vec3 indigoMain = vec3(0.506, 0.549, 0.973);
      vec3 indigoLight = vec3(0.729, 0.757, 0.992);
      vec3 indigoDark = vec3(0.353, 0.396, 0.918);

      // Multiple grid layers
      float grid1 = grid(uv + time * 0.1, 30.0);
      float grid2 = grid(uv - time * 0.05, 15.0);

      float depth = length(uv - 0.5);
      vec3 baseColor = mix(indigoMain, indigoDark, depth * 0.5);

      vec3 finalColor = mix(baseColor, indigoLight, (grid1 + grid2) * 0.5);
      finalColor += indigoLight * pow(1.0 - depth, 4.0) * 0.;

      gl_FragColor = vec4(finalColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// GRUPO 3: EFECTOS DE ENERGÍA Y PLASMA
// Efecto de campo cuántico con partículas dinámicas
export const fragmentShaderQuantumField = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float quantum(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    vec4 texColor = texture2D(textTexture, uv);

    if (texColor.a > 0.0) {
      float q1 = quantum(uv + time * 0.1);
      float q2 = quantum(uv * 2.0 - time * 0.);
      float qField = pow(q1 * q2, 2.0);

      float wave = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 - time);

      vec3 state1 = vec3(0.0, 0.7, 1.0);
      vec3 state2 = vec3(1.0, 0.0, 0.7);
      vec3 superposition = vec3(0.7, 1.0, 0.0);

      vec3 finalColor = mix(state1, state2, qField);
      finalColor = mix(finalColor, superposition, abs(wave) * 0.5);
      finalColor += vec3(pow(qField, 8.0));

      gl_FragColor = vec4(finalColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de cristal iridiscente con reflejos dinámicos
export const fragmentShaderIridescentCrystal = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  vec3 iridescent(float angle) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * angle + d));
  }

  void main() {
    vec2 uv = vUv;
    vec4 texColor = texture2D(textTexture, uv);

    if (texColor.a > 0.0) {
      float angle1 = atan(uv.y - 0.5, uv.x - 0.5);
      float angle2 = length(uv - 0.5);

      vec3 color1 = iridescent(angle1 * 0.1 + time * 0.1);
      vec3 color2 = iridescent(angle2 * 0. - time * 0.05);

      float facet = pow(sin(angle1 * 8.0) * cos(angle2 * 10.0), 2.0);

      vec3 finalColor = mix(color1, color2, facet);
      finalColor += vec3(pow(facet, 5.0));

      gl_FragColor = vec4(finalColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de Matrix con caracteres cayendo
export const fragmentShaderMatrixRain = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    float rain = floor(uv.y * 50.0) / 50.0;
    float dropSpeed = mod(time + rain * 2.0, 1.0);
    float verticalShift = dropSpeed * 0.1;

    vec2 rainUv = vec2(uv.x, mod(uv.y + verticalShift, 1.0));
    vec4 texColor = texture2D(textTexture, rainUv);

    if (texColor.a > 0.0) {
      float digit = random(vec2(rain, floor(time * 5.0)));
      float brightness = (1.0 - dropSpeed) * 1.;

      vec3 matrixGreen = vec3(0.0, 0.8, 0.);
      vec3 brightGreen = vec3(0.4, 1.0, 0.4);

      vec3 finalColor = mix(matrixGreen, brightGreen, digit * brightness);
      finalColor *= 0.8 + random(uv * time) * 0.4;

      gl_FragColor = vec4(finalColor, texColor.a * brightness);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de portal con vórtice energético
export const fragmentShaderVoidPortal = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    float dist = length(uv - 0.5);
    float spiral = sin(dist * 20.0 - time * 2.0) * 0.5 + 0.5;
    vec2 distortedUv = uv + vec2(cos(angle), sin(angle)) * spiral * 0.02;

    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      vec3 purple = vec3(0.5, 0.0, 1.0);
      vec3 darkBlue = vec3(0.0, 0.0, 0.3);
      float vortex = sin(dist * 10.0 - time) * 0.5 + 0.5;

      vec3 finalColor = mix(purple, darkBlue, vortex + spiral);
      finalColor += noise(uv * time) * 0.1;

      gl_FragColor = vec4(finalColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de circuito de neón pulsante
export const fragmentShaderNeonCircuit = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float circuit(vec2 uv, float scale) {
    vec2 p = fract(uv * scale);
    float h = step(0.9, p.x) + step(0.9, p.y);
    float c = step(0.8, max(abs(p.x - 0.5), abs(p.y - 0.5)));
    return max(h, c);
  }

  void main() {
    vec2 uv = vUv;
    vec4 texColor = texture2D(textTexture, uv);

    if (texColor.a > 0.0) {
      float c1 = circuit(uv + time * 0.1, 20.0);
      float c2 = circuit(uv - time * 0.05, 10.0);

      float energy = sin(uv.x * 10.0 + time) * sin(uv.y * 8.0) * 0.5 + 0.5;

      vec3 neon1 = vec3(0.0, 1.0, 0.8);
      vec3 neon2 = vec3(0.8, 0.0, 1.0);
      vec3 dark = vec3(0.1, 0.1, 0.);

      vec3 finalColor = dark;
      finalColor = mix(finalColor, neon1, c1 * 0.8);
      finalColor = mix(finalColor, neon2, c2 * 0.6);
      finalColor += neon1 * energy * 0.3;

      float pulse = sin(time * 3.0) * 0.5 + 0.5;
      finalColor *= 0.8 + pulse * 0.4;

      gl_FragColor = vec4(finalColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de runas místicas brillantes
export const fragmentShaderMysticRunes = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float rune(vec2 p, float size) {
    vec2 grid = fract(p * size);
    float r = length(grid - 0.5);
    return smoothstep(0.4, 0.35, r);
  }

  void main() {
    vec2 uv = vUv;
    vec4 texColor = texture2D(textTexture, uv);

    if (texColor.a > 0.0) {
      float r1 = rune(uv + time * 0.1, 8.0);
      float r2 = rune((uv + 0.5) * 1. - time * 0.05, 6.0);
      float runePattern = max(r1, r2);

      vec3 runeColor1 = vec3(0.7, 0.3, 1.0);
      vec3 runeColor2 = vec3(0.3, 0.7, 1.0);
      vec3 glowColor = vec3(1.0, 0.8, 0.4);

      vec3 finalColor = mix(runeColor1, runeColor2, runePattern);

      float glow = sin(time + uv.x * 6.28318) * 0.5 + 0.5;
      finalColor += glowColor * glow * runePattern * 0.5;

      gl_FragColor = vec4(finalColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de frecuencia con ondas dinámicas
export const fragmentShaderFrequencyWaves = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec4 texColor = texture2D(textTexture, uv);

    if (texColor.a > 0.0) {
      float freq = 0.0;
      for(float i = 1.0; i <= 5.0; i++) {
        float phase = time * (0.5 + i * 0.);
        freq += sin(uv.x * 40.0 * i + phase) * (1.0 / i);
      }
      freq = freq * 0.25 + 0.5;

      vec3 color1 = vec3(0.2, 0.5, 1.0);
      vec3 color2 = vec3(0.9, 0.2, 0.5);
      vec3 finalColor = mix(color1, color2, freq);

      float wave = sin(uv.y * 100.0 + time * 5.0) * 0.5 + 0.5;
      finalColor *= 0.8 + wave * 0.;

      gl_FragColor = vec4(finalColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de ADN con doble hélice animada
export const fragmentShaderDNAHelix = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Parámetros de la hélice
    float helixFreq = 4.0;
    float helixSpeed = 2.0;
    float helixWidth = 0.005;

    // Calcular posición en la hélice
    float helix1 = sin(uv.x * helixFreq * 3.14 + time * helixSpeed);
    float helix2 = sin(uv.x * helixFreq * 3.14 + time * helixSpeed + 3.14);

    // Distorsión basada en la hélice
    vec2 distortion = vec2(
      sin(uv.y * 10.0 + time) * helixWidth,
      (helix1 + helix2) * helixWidth
    );

    vec2 distortedUv = uv + distortion;
    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      vec3 baseColor = vec3(0.95);
      float helixGlow = abs(helix1) * 0.5 + abs(helix2) * 0.5;
      baseColor *= 0.95 + helixGlow * 0.05;

      float connections = smoothstep(0.4, 0.6, abs(sin(uv.x * helixFreq * 6.28)));
      baseColor *= 0.97 + connections * 0.03;

      gl_FragColor = vec4(baseColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de partículas magnéticas
export const fragmentShaderMagneticParticles = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // Campo magnético
    float angle = atan(uv.y - 0.5, uv.x - 0.5);
    float dist = length(uv - 0.5);

    // Distorsión magnética
    float magnetism = sin(dist * 8.0 - time) * 0.003;
    vec2 magnetic = vec2(cos(angle), sin(angle)) * magnetism;

    vec2 distortedUv = uv + magnetic;
    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      // Partículas magnéticas
      float particles = random(uv + time * 0.1);
      particles = smoothstep(0.8, 0.9, particles);

      vec3 baseColor = vec3(0.95);
      baseColor *= 0.9 + particles * 0.1;

      // Brillo en los bordes
      float edge = 1.0 - dist * 2.0;
      baseColor *= 0.9 + edge * 0.1;

      gl_FragColor = vec4(baseColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de interferencia dinámica
export const fragmentShaderInterference = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Patrones de interferencia
    float pattern1 = sin(uv.x * 40.0 + time * 2.0);
    float pattern2 = sin(uv.y * 40.0 - time * 1.5);
    float pattern3 = sin((uv.x + uv.y) * 30.0 + time);

    // Combinación de patrones
    float interference = (pattern1 + pattern2 + pattern3) / 3.0;

    // Distorsión basada en interferencia
    vec2 distortion = vec2(
      cos(interference * 3.14) * 0.003,
      sin(interference * 3.14) * 0.003
    );

    vec2 distortedUv = uv + distortion;
    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      vec3 color1 = vec3(0.95, 0.97, 1.0);
      vec3 color2 = vec3(0.9, 0.92, 1.0);

      vec3 finalColor = mix(color1, color2, interference * 0.5 + 0.5);
      float highlight = smoothstep(0.7, 1.0, abs(interference));
      finalColor *= 1.0 + highlight * 0.1;

      gl_FragColor = vec4(finalColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto de rejilla morfológica
export const fragmentShaderMorphGrid = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(443.897, 441.423, 437.195));
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.xx + p3.yz) * p3.zy);
  }

  void main() {
    vec2 uv = vUv;

    // Grid morphing
    float gridSize = 20.0;
    vec2 gridUv = fract(uv * gridSize) - 0.5;
    vec2 gridId = floor(uv * gridSize);

    // Animación de grid
    vec2 noise = hash22(gridId) - 0.5;
    float timeScale = time * 0.5;
    vec2 offset = vec2(
      sin(timeScale + noise.x * 6.28) * 0.02,
      cos(timeScale + noise.y * 6.28) * 0.02
    );

    vec2 distortedUv = uv + offset * smoothstep(0.2, 0.0, length(gridUv));
    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      vec3 baseColor = vec3(0.95);
      float cellIntensity = length(noise) * sin(time + noise.x * 10.0) * 0.5 + 0.5;
      baseColor *= 0.9 + cellIntensity * 0.1;

      float gridLine = smoothstep(0.45, 0.48, abs(gridUv.x)) +
                      smoothstep(0.45, 0.48, abs(gridUv.y));
      baseColor *= 1.0 - gridLine * 0.1;

      gl_FragColor = vec4(baseColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

// Efecto prismático con dispersión de luz
export const fragmentShaderPrism = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Efecto prisma sutil
    float prismStrength = 0.002;
    vec2 redOffset = vec2(sin(time + uv.y) * prismStrength, 0.0);
    vec2 greenOffset = vec2(sin(time * 1.1 + uv.y) * prismStrength * 0.5, 0.0);
    vec2 blueOffset = vec2(sin(time * 0.9 + uv.y) * prismStrength * -1.0, 0.0);

    vec4 redChannel = texture2D(textTexture, uv + redOffset);
    vec4 greenChannel = texture2D(textTexture, uv + greenOffset);
    vec4 blueChannel = texture2D(textTexture, uv + blueOffset);

    if (max(max(redChannel.a, greenChannel.a), blueChannel.a) > 0.0) {
      vec3 baseColor = vec3(
        redChannel.r * 1.,
        greenChannel.g * 1.1,
        blueChannel.b * 1.3
      );

      float crystal = sin(time * 2.0 + uv.x * 10.0) * 0.1 + 0.9;
      vec3 finalColor = clamp(baseColor * crystal, 0.0, 1.0);

      gl_FragColor = vec4(finalColor, greenChannel.a * 0.9);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

export const hologramWhiteIndigo = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float scanline = sin(uv.y * 100.0 + time * 2.0) * 0.02;
    vec2 distortedUv = uv + vec2(0.0, scanline);

    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      vec3 color1 = vec3(1.0, 1.0, 1.0);
      vec3 color2 = vec3(0.39, 0.40, 0.95);
      float t = sin(time + uv.x * 3.0) * 0.5 + 0.5;
      vec3 finalColor = mix(color1, color2, t);
      gl_FragColor = vec4(finalColor, texColor.a * 0.9);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

export const hologramPulse = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float pulse = sin(time * 2.0) * 0.5 + 0.5;
    vec2 distortedUv = uv + vec2(0.0, pulse * 0.01);

    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      vec3 white = vec3(1.0);
      vec3 indigo = vec3(0.39, 0.40, 0.95);
      vec3 finalColor = mix(indigo, white, pulse);
      gl_FragColor = vec4(finalColor, texColor.a);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

export const hologramGlitch = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float noise = random(uv + time) * 0.02;
    vec2 distortedUv = uv + vec2(noise);

    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      vec3 white = vec3(1.0);
      vec3 indigo = vec3(0.39, 0.40, 0.95);
      float t = sin(time * 3.0 + uv.y * 10.0) * 0.5 + 0.5;
      vec3 finalColor = mix(white, indigo, t);
      gl_FragColor = vec4(finalColor, texColor.a * 0.95);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

export const hologramWave = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float wave = sin(uv.x * 10.0 + time * 2.0) * sin(uv.y * 8.0 + time) * 0.01;
    vec2 distortedUv = uv + vec2(wave);

    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      vec3 white = vec3(1.0);
      vec3 indigo = vec3(0.39, 0.40, 0.95);
      float t = sin(time + uv.x * 5.0) * 0.5 + 0.5;
      vec3 finalColor = mix(indigo, white, t);
      gl_FragColor = vec4(finalColor, texColor.a * 0.85);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

export const hologramRipple = `
  uniform float time;
  uniform sampler2D textTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float dist = length(uv - vec2(0.5));
    float ripple = sin(dist * 20.0 - time * 3.0) * 0.01;
    vec2 distortedUv = uv + vec2(ripple);

    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
      vec3 white = vec3(1.0);
      vec3 indigo = vec3(0.39, 0.40, 0.95);
      float t = sin(time * 2.0 + dist * 5.0) * 0.5 + 0.5;
      vec3 finalColor = mix(white, indigo, t);
      gl_FragColor = vec4(finalColor, texColor.a * 0.9);
    } else {
      gl_FragColor = vec4(0.0);
    }
  }
`;

export const cleanSliceEffect = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    float delayedTime = max(0.0, time - 2.0);

    if (time < 2.0) {
        vec4 texColor = texture2D(textTexture, uv);
        gl_FragColor = vec4(vec3(0.95), texColor.a);
        return;
    }

    float slices = 15.0;
    float sliceY = floor(uv.y * slices) / slices;
    float sliceOffset = sin(sliceY * 20.0 + delayedTime * 2.0) * 0.03;
    float delay = sliceY * 0.3;
    float animationProgress = smoothstep(0.0, 1.0, delayedTime - delay);

    vec2 distortedUv = uv + vec2(sliceOffset * animationProgress, 0.0);
    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
        vec3 color = vec3(0.95);
        float brightness = 0.9 + sin(sliceY * 6.28 + delayedTime * 3.0) * 0.1;
        gl_FragColor = vec4(color * brightness, texColor.a);
    } else {
        gl_FragColor = vec4(0.0);
    }
}`;

export const wavyRevealEffect = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    float delayedTime = max(0.0, time - 2.0);

    if (time < 2.0) {
        vec4 texColor = texture2D(textTexture, uv);
        gl_FragColor = vec4(vec3(0.95), texColor.a);
        return;
    }

    float wave = sin(uv.y * 10.0 + delayedTime * 3.0) * 0.02;
    float progress = smoothstep(0.0, 1.0, delayedTime);
    vec2 distortedUv = uv + vec2(wave * progress, 0.0);

    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
        vec3 color = vec3(0.95);
        float brightness = 0.9 + sin(uv.y * 5.0 + delayedTime * 2.0) * 0.1;
        gl_FragColor = vec4(color * brightness, texColor.a);
    } else {
        gl_FragColor = vec4(0.0);
    }
}`;

export const elegantSliceEffect = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    float delayedTime = max(0.0, time - 2.0);

    if (time < 2.0) {
        vec4 texColor = texture2D(textTexture, uv);
        gl_FragColor = vec4(vec3(0.95), texColor.a);
        return;
    }

    float slices = 20.0;
    float sliceY = floor(uv.y * slices) / slices;
    float slicePhase = delayedTime * 2.0 + sliceY * 10.0;
    float sliceOffset = sin(slicePhase) * 0.02 * smoothstep(0.0, 0.5, delayedTime);

    vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
        vec3 color = vec3(0.95);
        float brightness = 0.95 + sin(sliceY * 6.28 + delayedTime) * 0.05;
        gl_FragColor = vec4(color * brightness, texColor.a);
    } else {
        gl_FragColor = vec4(0.0);
    }
}`;

export const smoothSliceEffect = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    float delayedTime = max(0.0, time - 2.0);

    if (time < 2.0) {
        vec4 texColor = texture2D(textTexture, uv);
        gl_FragColor = vec4(vec3(0.95), texColor.a);
        return;
    }

    float slices = 12.0;
    float sliceY = floor(uv.y * slices) / slices;
    float sliceProgress = smoothstep(0.0, 1.0, delayedTime - sliceY * 0.);
    float sliceOffset = sin(sliceY * 15.0 + delayedTime * 3.0) * 0.02 * sliceProgress;

    vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
        vec3 color = vec3(0.95);
        float brightness = 0.9 + sin(sliceY * 3.14 + delayedTime * 2.0) * 0.1;
        gl_FragColor = vec4(color * brightness, texColor.a);
    } else {
        gl_FragColor = vec4(0.0);
    }
}`;

export const glitchSliceEffect = `
uniform float time;
uniform sampler2D textTexture;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    float delayedTime = max(0.0, time - 2.0);

    if (time < 2.0) {
        vec4 texColor = texture2D(textTexture, uv);
        gl_FragColor = vec4(vec3(0.95), texColor.a);
        return;
    }

    float slices = 25.0;
    float sliceY = floor(uv.y * slices) / slices;
    float glitchStr = smoothstep(0.0, 0.5, delayedTime) * 0.03;
    float sliceOffset = sin(sliceY * 40.0 + delayedTime * 4.0) * glitchStr;
    float glitchTime = floor(delayedTime * 8.0) * 0.125;
    sliceOffset *= step(0.95, fract(glitchTime + sliceY * 2.0));

    vec2 distortedUv = uv + vec2(sliceOffset, 0.0);
    vec4 texColor = texture2D(textTexture, distortedUv);

    if (texColor.a > 0.0) {
        vec3 color = vec3(0.95);
        float brightness = 0.9 + sin(sliceY * 8.0 + delayedTime * 5.0) * 0.1;
        gl_FragColor = vec4(color * brightness, texColor.a);
    } else {
        gl_FragColor = vec4(0.0);
    }
}`;
