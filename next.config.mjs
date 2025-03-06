// next.config.mjs - Usando sintaxis ESM
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Asegúrate de que la configuración experimental sea compatible
    experimental: {
      // Puedes descomentar esto si necesitas paquetes externos específicos
      // serverComponentsExternalPackages: [],
    },
    // Mejorar la información de depuración
    logging: {
      debug: true,
      fetches: {
        fullUrl: true,
      },
    },
  };
  
  // Usando sintaxis de exportación ESM
  export default nextConfig;