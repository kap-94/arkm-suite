// src/app/[lang]/layout.tsx
import { LanguageProvider } from "@/app/_context/LanguageContext";
import { languages, type Language } from "@/app/_lib/config/i18n";
import { inter } from "@/app/_lib/fonts";
import GoogleAnalytics from "@/app/_components/GoogleAnalytics";
import "@/app/_styles/globals.scss";

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

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
        <link
          rel="stylesheet"
          href="https://use.typekit.net/mke4enw.css"
          // as="style"
        />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <LanguageProvider lang={validLang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
