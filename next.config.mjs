/** @type {import('next').NextConfig} */

// Durante `npm run dev` no queremos output:'export' porque limita el servidor
// (bloquea rutas dinámicas, API routes, etc.).
// Solo lo activamos en build (GitHub Pages).
const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  // Solo exporta a HTML estático cuando se hace `npm run build` para GitHub Pages
  ...(isExport && { output: 'export' }),

  // basePath SIEMPRE activo para que dev y producción usen el mismo prefijo:
  // http://localhost:3000/fyl_lp  ←→  https://usuario.github.io/fyl_lp
  basePath: '/fyl_lp',

  // trailingSlash evita 404s en GitHub Pages al navegar directamente a rutas
  trailingSlash: true,

  images: {
    // GitHub Pages no soporta optimización de imágenes de Next.js
    unoptimized: true,
  },
};

export default nextConfig;
