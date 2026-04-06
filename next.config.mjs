/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/fyl_lp',
  images: {
    // GitHub Pages no soporta la optimización de imágenes nativa de Next.js
    unoptimized: true,
  },
};

export default nextConfig;
