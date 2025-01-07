// src/app/[lang]/layout.tsx
import type { Metadata } from "next";
import { languages, type Language } from "@/config/i18n";
import { LanguageProvider } from "@/context/LanguageContext";
import { inter } from "@/fonts";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "@/styles/globals.scss";

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: {
    default: "ARKM Studio | Web Design & Development",
    template: "%s | ARKM Studio",
  },
  description:
    "Design and development studio specializing in creating exceptional digital experiences. We transform ideas into innovative and elegant web solutions.",
  keywords: [
    "web design",
    "web development",
    "digital agency",
    "ui/ux design",
    "frontend development",
    "backend development",
    "responsive design",
    "digital branding",
    "user experience",
    "ARKM Studio",
  ],
  authors: [{ name: "ARKM Studio" }],
  creator: "ARKM Studio",
  publisher: "ARKM Studio",
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const validLang = languages.includes(lang as Language)
    ? (lang as Language)
    : "en";

  return (
    <html lang={validLang}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mke4enw.css" />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <LanguageProvider lang={validLang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
