// src/app/[lang]/auth/layout.tsx
import { Metadata } from "next";

interface AuthLayoutWrapperProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    // Prevenir indexación por buscadores
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    // Remover metadatos innecesarios
    title: null,
    description: null,

    // Remover metadata social
    alternates: {
      canonical: null,
    },

    // Headers de seguridad
    other: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "same-origin",
    },
  };
}

export default function AuthLayoutWrapper({
  children,
  params,
}: AuthLayoutWrapperProps) {
  return <>{children}</>;
}
