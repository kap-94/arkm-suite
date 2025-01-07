"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Language } from "@/config/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  lang: Language;
}

export function LanguageProvider({
  children,
  lang,
}: LanguageProviderProps) {
  const router = useRouter();

  const setLanguage = useCallback(
    async (newLang: Language) => {
      document.cookie = `NEXT_LOCALE=${newLang};path=/;max-age=31536000`;
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${newLang}`);
      router.push(newPath);
    },
    [router]
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