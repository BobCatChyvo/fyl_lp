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
        <Link href="/" className="relative h-10 w-10 md:h-14 md:w-14 transition-transform hover:scale-110 active:scale-95">
          <Image
            src={getImagePath("/fyl_logo.png")}
            alt="FyL Logo"
            fill
            className="object-contain"
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

        <div className="flex items-center gap-6">
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
}
