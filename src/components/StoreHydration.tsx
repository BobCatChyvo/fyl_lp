"use client";
import { useEffect, useState } from "react";

/**
 * Este componente es necesario (Hydration Fix) para usar Zustand con localStorage en Next.js.
 * Como el estado inicial en el servidor ('[]') difiere del guardado en el LocalStorage,
 * evitamos renderizar el carrito o componentes UI dependientes de él hasta que la app se hidrate.
 */
export default function StoreHydration({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Puede sustituirse con un esqueleto/spinner de carga si el UI parpadea

  return <>{children}</>;
}
