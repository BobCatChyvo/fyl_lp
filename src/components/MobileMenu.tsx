"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getImagePath } from "@/lib/utils";
import Image from "next/image";

const categories = [
  { title: "Signature Collection", href: "/catalog?category=signature" },
  { title: "Temporada", href: "/catalog?category=seasonal" },
  { title: "Catering", href: "/catalog?category=catering" },
  { title: "Regalos", href: "/catalog?category=gifts" },
  { title: "Clásicos", href: "/catalog?category=diseños" },
  { title: "Bollería", href: "/catalog?category=bolleria" },
];

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden p-2 text-foreground/70 hover:text-primary transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="glass-light border-l border-white/20 w-[300px]">
        <SheetHeader className="mb-12 mt-6">
          <SheetTitle className="text-left">
            <Link href="/" className="relative h-32 w-32 block group">
                <Image
                    src={getImagePath("/fyl_logo.png")}
                    alt="FyL Logo"
                    fill
                    className="object-contain drop-shadow-xl transition-transform group-active:scale-90"
                />
            </Link>
          </SheetTitle>
        </SheetHeader>
        
        <nav className="flex flex-col gap-8">
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-primary/50 mb-6">Explorar Boutique</h4>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="block text-xl font-serif text-foreground hover:text-primary transition-all active:scale-95"
              >
                {cat.title}
              </Link>
            ))}
          </div>
          
          <div className="pt-8 border-t border-primary/10">
            <Link
              href="/about"
              className="text-[10px] uppercase font-black tracking-[0.3em] text-foreground/60 hover:text-primary"
            >
              Nuestra Historia
            </Link>
          </div>
        </nav>
        
        <div className="absolute bottom-10 left-6 text-[8px] uppercase tracking-[0.4em] text-oro font-black opacity-50">
          Haute Pâtisserie — F&L
        </div>
      </SheetContent>
    </Sheet>
  );
}
