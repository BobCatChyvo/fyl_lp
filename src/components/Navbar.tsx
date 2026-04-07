"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CartDrawer from "./CartDrawer";
import { getImagePath } from "@/lib/utils";
import { useAuth } from "@/lib/firebase/auth";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto que oscurece el Navbar si el usuario baja
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Si estamos en la página de administración, no mostramos el Navbar global
  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="relative h-12 w-12 md:h-16 md:w-16 transition-transform hover:scale-105">
          <Image
            src={getImagePath("/fyl_logo.png")}
            alt="FyL Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Links de Desktop */}
        <div className="hidden md:flex gap-12 items-center font-sans font-bold text-foreground/70 tracking-widest text-[10px] uppercase">
          <Link href="/catalog" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">
            Catálogo
          </Link>
          <Link href="/about" className="hover:text-secondary transition-colors border-b-2 border-transparent hover:border-secondary pb-1">
            Nosotros
          </Link>
          
          {isAdmin && (
            <Link 
              href="/admin" 
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          )}
        </div>

        {/* Botón Carrito / Visor Desplegable */}
        <CartDrawer />
      </div>
    </nav>
  );
}
