import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const FONTS = {
  SOFIA: {
    family: "sofia",
    weights: {
      light: 300,
      regular: 400,
      bold: 700,
    },
    style: "normal",
  },
  USUAL: {
    family: "usual",
    weights: {
      light: 300,
      regular: 400,
      medium: 600,
      // bold: 700,
    },
    style: "normal",
  },
} as const;
