"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Language } from "@/config/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: React.ReactNode;
  lang: Language;
}

export function LanguageProvider({ children, lang }: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const setLanguage = useCallback(
    (newLang: Language) => {
      // Establecer la cookie
      document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=31536000`;

      // Obtener la ruta actual y construir la nueva ruta
      const segments = pathname.split("/");

      if (segments[1] === lang) {
        // Si el primer segmento es el idioma actual, reemplazarlo
        segments[1] = newLang;
      } else {
        // Si no, añadir el nuevo idioma al principio
        segments.splice(1, 0, newLang);
      }

      // Construir la nueva ruta
      const newPath = segments.join("/");

      // Navegar a la nueva ruta
      router.push(newPath);
    },
    [router, pathname, lang]
  );

  const value = React.useMemo(
    () => ({
      language: lang,
      setLanguage,
    }),
    [lang, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
