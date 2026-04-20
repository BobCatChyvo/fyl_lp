"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

import { usePathname } from "next/navigation";

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Registrar ScrollTrigger con GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Sincronizar Lenis con ScrollTrigger
    const update = (time: number) => {
      ScrollTrigger.update();
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  const isAdmin = pathname?.startsWith("/admin");
  
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
