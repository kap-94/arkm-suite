import { ButtonVariant } from "../types";

// Helper function to determine if a variant is a glassy variant
export const isGlassyVariant = (variant: ButtonVariant): boolean => {
  const glassyVariants: string[] = [
    // Prisma variants
    "prisma-multiple",
    "prisma-refraction",

    // Nebula variants
    "nebula-stardust",
    "nebula-vortex",
    "nebula-quantum",

    // Aurora variants
    "aurora-waves",
    "aurora-curtain",
    "aurora-plasma",

    // Crystal variants
    "crystal-frosted",
    "crystal-prismatic",
    "crystal-liquid",

    // Modern Glow variants
    "modern-glow",
    "modern-glow-pro",
    "modern-glow-glass",
    "modern-glow-pulse",

    // Modern Shape variants
    "modern-shape",
    "modern-shape-gradient",
    "modern-shape-texture",
    "modern-shape-bordered",

    // Rainbow variants
    "rainbow-gradient",
    "rainbow-cosmic",
    "rainbow-hologram",
    "rainbow-neon",

    // Hybrid variants
    "modern-glow-hologram",
    "modern-shape-rainbow",
    "modern-glow-cosmic",
    "modern-pulse-neon",
    "modern-shape-hologram",

    // Cosmic Aura variants
    "cosmic-aura",
    "cosmic-aura-outlined",
    "cosmic-aura-glow",
    "cosmic-aura-gradient",
    "cosmic-aura-nebula",
    "cosmic-aura-minimal",

    // Gradient Shader variants
    "gradient-neon",
    "gradient-aurora",
    "gradient-cyber",
    "gradient-holographic",
    "gradient-crystal",
  ];

  return glassyVariants.includes(variant);
};

// Helper function to determine if a variant is a gradient shader variant
export const isGradientShaderVariant = (variant: ButtonVariant): boolean => {
  return variant.startsWith("gradient-");
};
