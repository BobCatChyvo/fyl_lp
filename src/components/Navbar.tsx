"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CartDrawer from "./CartDrawer";
import { getImagePath } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  


  // Efecto que oscurece el Navbar si el usuario baja
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
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
        </div>

        {/* Botón Carrito / Visor Desplegable */}
        <CartDrawer />
      </div>
    </nav>
  );
}
