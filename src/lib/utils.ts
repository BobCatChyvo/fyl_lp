import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilidad para combinar clases de Tailwind CSS de forma segura.
 * Requerida por los componentes de Shadcn UI.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utilidad para rutas de imágenes/activos estáticos.
 *
 * Next.js aplica el basePath (/fyl_lp) de forma AUTOMÁTICA cuando se usa
 * el componente <Image> de next/image y los <Link> de next/link.
 * Por eso esta función es un simple pass-through: NO añadimos el prefijo
 * manualmente para evitar rutas duplicadas como /fyl_lp/fyl_lp/imagen.png
 *
 * Si en algún momento necesitas una URL absoluta (para og:image, etc.),
 * usa process.env.NEXT_PUBLIC_SITE_URL + path directamente.
 */
export function getImagePath(path: string): string {
  if (!path) return '';
  // Las rutas absolutas (http/https) se devuelven sin cambios
  if (path.startsWith('http')) return path;
  // Garantizamos que empiece con /
  return path.startsWith('/') ? path : `/${path}`;
}
