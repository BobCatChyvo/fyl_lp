"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CartDrawer from "./CartDrawer";
import { getImagePath } from "@/lib/utils";
import { useAuth } from "@/lib/firebase/auth";
import { ShieldCheck } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    setIsMounted(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        isScrolled
          ? "glass-light py-4 shadow-premium"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="group relative h-12 w-12 md:h-20 md:w-20 transition-all duration-700">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Image
            src={getImagePath("/fyl_logo.png")}
            alt="FyL Logo"
            fill
            className="object-contain drop-shadow-xl transition-all duration-700 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Links de Desktop Premium */}
        <div className="hidden md:flex gap-16 items-center">
          <MegaMenu />
          
          {isMounted && isAdmin && (
            <Link 
              href="/admin" 
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="tracking-widest font-sans font-black text-[9px] uppercase">Panel Control</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <CartDrawer />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
