"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { getImagePath } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Ocultar Footer en la consola de administración
  if (pathname === "/admin") return null;

  return (
    <footer className="bg-background border-t border-border/50 mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Logo y Branding */}
          <div className="flex flex-col gap-8 items-center md:items-start text-center md:text-left">
            <Link href="/" className="relative h-20 w-20 transition-transform hover:scale-105">
              <Image 
                src={getImagePath("/fyl_logo.png")} 
                alt="Logo" 
                fill 
                className="object-contain"
              />
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed italic">
              Artesanía en cada bocado, fusionando la frescura de la fruta con el aroma botánico de la naturaleza.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 rounded-full bg-oro/10 border border-oro/20 text-oro hover:bg-oro hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-oro/10 border border-oro/20 text-oro hover:bg-oro hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos con Oro */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-oro mb-8 uppercase tracking-[0.2em]">Explorar</h4>
            <ul className="space-y-5">
              <li>
                <Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">Catálogo Completo</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">Nuestra Historia</Link>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">Preguntas Frecuentes</button>
              </li>
            </ul>
          </div>

          {/* Contacto con Rose Gold */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-oro mb-8 uppercase tracking-[0.2em]">Contacto</h4>
            <ul className="space-y-5 text-muted-foreground">
              <li className="flex items-center justify-center md:justify-start gap-4">
                <div className="p-2 rounded-lg bg-oro/10 text-oro">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">CDMX, México Central</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4">
                <div className="p-2 rounded-lg bg-oro/10 text-oro">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">+52 123 456 7890</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4">
                <div className="p-2 rounded-lg bg-oro/10 text-oro">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">hola@fyl.com.mx</span>
              </li>
            </ul>
          </div>

          {/* Horario con Platino */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-oro mb-8 uppercase tracking-[0.2em]">Horario</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex justify-between md:justify-start gap-4 border-b border-border/30 pb-2">
                <span className="font-bold text-foreground w-24 text-[10px] uppercase">Lun - Vie:</span>
                <span className="text-sm">08:00 - 20:00</span>
              </li>
              <li className="flex justify-between md:justify-start gap-4 border-b border-border/30 pb-2">
                <span className="font-bold text-foreground w-24 text-[10px] uppercase">Sábados:</span>
                <span className="text-sm">09:00 - 18:00</span>
              </li>
              <li className="flex justify-between md:justify-start gap-4 pb-2">
                <span className="font-bold text-foreground w-24 text-[10px] uppercase">Domingos:</span>
                <span className="text-secondary italic font-bold text-sm">Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra Inferior en Platino */}
        <div className="border-t border-border/50 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            &copy; {currentYear} Fresa & Lavanda. Todos los derechos reservados.
          </p>
          <div className="flex gap-10 text-[10px] text-muted-foreground/60 uppercase tracking-[0.3em] font-bold">
            <button className="hover:text-primary transition-colors">Privacidad</button>
            <button className="hover:text-primary transition-colors">Términos</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
