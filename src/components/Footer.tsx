"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo y Branding */}
          <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
            <Link href="/" className="relative h-16 w-16 transition-transform hover:scale-105">
              <Image 
                src="/fyl_logo.png" 
                alt="Logo" 
                fill 
                className="object-contain"
              />
            </Link>
            <p className="text-textMuted max-w-xs leading-relaxed">
              Artesanía en cada bocado, fusionando la frescura de la fruta con el aroma botánico de la naturaleza.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-background border border-border text-textMuted hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background border border-border text-textMuted hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-white mb-6 uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/catalog" className="text-textMuted hover:text-primary transition-colors font-medium">Catálogo Completo</Link>
              </li>
              <li>
                <Link href="/about" className="text-textMuted hover:text-primary transition-colors font-medium">Nuestra Historia</Link>
              </li>
              <li>
                <button className="text-textMuted hover:text-primary transition-colors font-medium">Preguntas Frecuentes</button>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-white mb-6 uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-4 text-textMuted">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>CDMX, México Central</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+52 123 456 7890</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>hola@fyl.com.mx</span>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-white mb-6 uppercase tracking-wider">Horario</h4>
            <ul className="space-y-2 text-textMuted">
              <li className="flex justify-between md:justify-start gap-4">
                <span className="font-bold text-white w-20">Lun - Vie:</span>
                <span>08:00 - 20:00</span>
              </li>
              <li className="flex justify-between md:justify-start gap-4">
                <span className="font-bold text-white w-20">Sábados:</span>
                <span>09:00 - 18:00</span>
              </li>
              <li className="flex justify-between md:justify-start gap-4">
                <span className="font-bold text-white w-20">Domingos:</span>
                <span className="text-secondary italic">Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-textMuted text-sm">
            &copy; {currentYear} Fresa & Lavanda. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-xs text-textMuted/60 uppercase tracking-widest font-bold">
            <button className="hover:text-white transition-colors">Privacidad</button>
            <button className="hover:text-white transition-colors">Términos</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
