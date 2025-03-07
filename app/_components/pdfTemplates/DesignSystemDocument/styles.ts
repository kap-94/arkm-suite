// styles/pdfStyles.ts
import { StyleSheet, Font } from "@react-pdf/renderer";

// Types
export type PDFTheme = "light" | "dark";
export type PDFStyleKey = keyof ReturnType<typeof createPDFStyles>;

// Font Registration
const registerFonts = () => {
  try {
    Font.register({
      family: "Inter",
      fonts: [
        {
          src: "/fonts/inter/Inter-Regular.ttf",
          fontWeight: 400,
        },
        {
          src: "/fonts/inter/Inter-Medium.ttf",
          fontWeight: 500,
        },
        {
          src: "/fonts/inter/Inter-SemiBold.ttf",
          fontWeight: 600,
        },
        {
          src: "/fonts/inter/Inter-Bold.ttf",
          fontWeight: 700,
        },
      ],
    });
  } catch (error) {
    console.warn("Error registering Inter font:", error);
    // Register system font as fallback
    // Font.register({
    //   family: "Fallback",
    //   src: {
    //     family: "Helvetica",
    //   },
    // });
  }
};

// // Typography Configuration
export const TYPOGRAPHY_CONFIG = {
  h1: { fontSize: 64, fontWeight: 700, lineHeight: 1 },
  h2: { fontSize: 32, fontWeight: 600, lineHeight: 1 },
  h3: { fontSize: 24, fontWeight: 600, lineHeight: 1.4 },
  h4: { fontSize: 20, fontWeight: 500, lineHeight: 1.5 },
  h5: { fontSize: 16, fontWeight: 600, lineHeight: 1.4 },
  p1: { fontSize: 16, fontWeight: 400, lineHeight: 1.6 },
  p2: { fontSize: 14, fontWeight: 400, lineHeight: 1.5 },
  p3: { fontSize: 12, fontWeight: 400, lineHeight: 1.4 },
  label: { fontSize: 14, fontWeight: 400, lineHeight: 1.4 },
};

// Typography Configuration
// export const TYPOGRAPHY_CONFIG = {
//   h1: { fontSize: 64, fontWeight: 700, lineHeight: 1 },
//   h2: { fontSize: 32, fontWeight: 600, lineHeight: 1 },
//   h3: { fontSize: 20, fontWeight: 500, lineHeight: 1.6 },
//   h4: { fontSize: 16, fontWeight: 500, lineHeight: 1.6 },
//   h5: { fontSize: 12, fontWeight: 500, lineHeight: 1.6 },
//   p1: { fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
//   p2: { fontSize: 12, fontWeight: 400, lineHeight: 1.6 },
//   p3: { fontSize: 11, fontWeight: 400, lineHeight: 1.6 },
//   label: { fontSize: 12, fontWeight: 400, lineHeight: 1.46 },
// };

// Color Configuration
export const COLOR_MAP = {
  light: {
    text: "#000000",
    secondary: "rgba(0, 0, 0, 0.7)",
    tertiary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.4)",
    success: "#16a34a",
    error: "#dc2626",
    warning: "#d97706",
    info: "#2563eb",
    accent: "#6366f1",
    background: "#ffffff",
  },
  dark: {
    text: "rgb(241, 228, 228)",
    secondary: "rgba(241, 228, 228, 0.9)",
    tertiary: "rgba(241, 228, 228, 0.7)",
    disabled: "rgba(241, 228, 228, 0.4)",
    success: "#22c55e",
    error: "#ef4444",
    warning: "#fbbf24",
    info: "#60a5fa",
    accent: "#6366f1",
    background: "#121212",
  },
};

// Main style creation function
export const createPDFStyles = (theme: "light" | "dark" = "light") => {
  registerFonts();
  const colors = COLOR_MAP[theme];

  return StyleSheet.create({
    // Page styles
    page: {
      fontFamily: "Inter",
      padding: 32,
      backgroundColor: colors.background,
    },

    // Cover styles
    cover: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#6366f1", // Usando $primary-color
      color: "#ffffff", // Texto blanco para contraste
    },
    coverTitle: {
      fontSize: 22,
      fontWeight: 600,
      textAlign: "left",
      marginBottom: 8,
    },
    coverSubtitle: {
      fontSize: 48,
      fontWeight: 600,
      textAlign: "left",
      marginBottom: 16,
    },
    coverProject: {
      fontSize: 18,
      fontWeight: 400,
      color: "#ffffff",
      marginBottom: 24,
    },
    coverDate: {
      fontSize: 14,
      fontWeight: 400,
      color: "#ffffff",
    },

    // Header styles
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      // paddingBottom: 12,
      // borderBottomWidth: 1,
      // borderBottomColor: colors.secondary, // Borde profesional
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: colors.secondary,
    },
    headerSubtitle: {
      fontSize: 10,
      fontWeight: 500,
      color: colors.tertiary,
    },

    // Section styles
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 500,
      color: colors.text,
      marginBottom: 32,
    },
    sectionSubtitle: {
      fontSize: 12,
      fontWeight: 600,
      color: colors.secondary,
    },
    labelText: {
      fontSize: 11,
      fontWeight: 500,
      color: colors.text,
      lineHeight: 1.5,
    },
    labelTextSecondary: {
      fontSize: 11,
      fontWeight: 500,
      color: colors.secondary,
      lineHeight: 1.5,
    },

    // Color palette styles
    colorGrid: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      width: "100%", // Ocupa el 100% del ancho
      breakInside: "avoid", // Evita que los elementos se corten entre páginas
    },
    colorRow: {
      width: "100%", // Ocupa el 100% del ancho
      marginBottom: 8,
    },
    colorItem: {
      width: "23%", // 4 columnas (100% / 4)
    },
    colorPreview: {
      height: 60,
      borderRadius: 8,
      marginBottom: 8,
    },
    colorInfo: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 2,
      gap: 4,
    },

    // Typography styles
    typographyItems: {
      marginTop: -6,
    },
    typographyItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      marginBottom: 35,
      breakInside: "avoid", // Evita que los elementos se corten entre páginas
      // height: 88,
    },
    typographyMeta: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 2,
      width: 88,
    },

    // Spacing styles

    spacingGrid: {
      marginTop: 8,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 26,
      width: "100%", // Ocupa el 100% del ancho
      breakInside: "avoid", // Evita que los elementos se corten entre páginas
    },
    spacingItem: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      width: "30%",
      marginBottom: 16,
    },
    spacingPreview: {
      height: 4,
      backgroundColor: colors.accent,
      borderRadius: 2,
      marginBottom: 8,
    },

    // Page number
    pageNumber: {
      position: "absolute",
      fontSize: 8,
      bottom: 16,
      right: 20,
      color: colors.tertiary,
    },

    // Utilities
    marginBottomMd: {
      marginBottom: 12,
    },

    // Generate typography variants
    ...Object.entries(TYPOGRAPHY_CONFIG).reduce(
      (acc, [key, config]) => ({
        ...acc,
        [key]: {
          ...config,
          color: colors.text,
        },
        [`${key}Secondary`]: {
          ...config,
          color: colors.secondary,
        },
        [`${key}Tertiary`]: {
          ...config,
          color: colors.tertiary,
        },
      }),
      {}
    ),
  });
};
