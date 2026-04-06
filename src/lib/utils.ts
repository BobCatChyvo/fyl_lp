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
 * Utilidad para manejar rutas de imágenes y activos estáticos con el basePath.
 * Añade el prefijo del repositorio (/fyl_lp) siempre, ya que está configurado
 * en next.config.mjs para todos los entornos.
 */
export function getImagePath(path: string): string {
  if (!path) return '';
  
  // Si la ruta ya es absoluta (http...) no hacemos nada
  if (path.startsWith('http')) return path;
  
  // El basePath está configurado en next.config.mjs
  const prefix = '/fyl_lp';
  
  // Nos aseguramos de que la ruta empiece con /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Si por alguna razón la ruta ya incluye el prefijo, no lo duplicamos
  if (cleanPath.startsWith(prefix)) return cleanPath;
  
  return `${prefix}${cleanPath}`;
}
