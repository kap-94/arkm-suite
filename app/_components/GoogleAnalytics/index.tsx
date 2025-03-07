// app/_components/GoogleAnalytics.tsx
import Script from "next/script";

const GoogleAnalytics = () => {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (process.env.NODE_ENV !== "production" || !GA_TRACKING_ID) {
    // Si no está en producción o no hay ID de seguimiento, no renderiza los scripts
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
