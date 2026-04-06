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

  // Si estamos en producción (GitHub Pages), e Inicia con /, y NO tiene ya el fyl_lp
  const basePath = '/fyl_lp';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Si ya tiene el basePath, o si estamos en desarrollo, Next.js lo maneja.
  // Pero para mayor seguridad en static export, lo forzamos si el entorno es producción
  if (process.env.NODE_ENV === 'production' && !cleanPath.startsWith(basePath)) {
    return `${basePath}${cleanPath}`;
  }

  return cleanPath;
}
