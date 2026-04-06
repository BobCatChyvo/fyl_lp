import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilidad para combinar clases de Tailwind CSS de forma segura.
 * Requerida por los componentes de Shadcn UI.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImagePath(path: string): string {
  if (!path) return '';
  // Las rutas absolutas (http/https) se devuelven sin cambios
  if (path.startsWith('http')) return path;

  // Limpiar el prefijo 'public/' si el usuario lo añadió por error
  let cleanPath = path.replace(/^public\//, '');
  
  // Aseguramos que inicie con /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  // Precalculamos el prefijo
  const basePath = '/fyl_lp';

  /**
   * NOTA SOBRE BASEPATH (/fyl_lp):
   * Aunque Next.js debería gestionar el basePath, en este entorno
   * experimental/GitHub Pages forzamos su inclusión para asegurar 
   * compatibilidad con <img>, fondos CSS y <Image /> de forma consistente.
   */
  if (cleanPath.startsWith(basePath)) return cleanPath;
  return `${basePath}${cleanPath}`;
}
