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
          ? "bg-background/90 backdrop-blur-md border-b border-border py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
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
        <div className="hidden md:flex gap-8 items-center font-sans font-medium text-textMuted">
          <Link href="/catalog" className="hover:text-primary transition-colors">
            Catálogo
          </Link>
          <Link href="/about" className="hover:text-secondary transition-colors">
            Nosotros
          </Link>
        </div>

        {/* Botón Carrito / Visor Desplegable */}
        <CartDrawer />
      </div>
    </nav>
  );
}
