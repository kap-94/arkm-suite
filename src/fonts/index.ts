import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const FONTS = {
  KRANTO: {
    family: "kranto-normal-semicondensed",
    weights: {
      light: 300,
      regular: 400,
      bold: 700,
    },
    style: "normal",
  },
} as const;
