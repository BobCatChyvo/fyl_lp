"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getImagePath } from "@/lib/utils";
import ProductGallery from "@/components/ProductGallery";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-primary/30">
      {/* Hero Section - Dark Mode Eternal */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Fondo con Optimización de Next.js */}
        <div className="absolute inset-0">
          <Image
            src={getImagePath("/images/tarta-signature.png")}
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center opacity-60 image-glow"
          />
          {/* Overlay oscuro profundo para máximo contraste con el Fresa */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-[1200px] mx-auto">
          <span className="text-secondary font-sans tracking-[0.5em] uppercase text-xs font-bold mb-6 block animate-in fade-in slide-in-from-bottom-4 duration-1000 opacity-90">
            Artesanía en cada bocado
          </span>
          <h1 className="font-serif text-7xl md:text-9xl font-bold mb-8 text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Fresa <span className="text-primary italic drop-shadow-[0_0_15px_rgba(255,51,51,0.3)]">&</span> Lavanda
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            Descubre una experiencia sensorial donde la repostería clásica se encuentra con aromas botánicos frescos sobre un lienzo de elegancia pura.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Link href="/catalog">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-lg rounded-full font-bold shadow-[0_0_20px_rgba(255,51,51,0.4)] transition-all hover:scale-105 active:scale-95">
                Explorar Catálogo
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-oro text-oro hover:bg-oro/10 px-12 py-8 text-lg rounded-full font-bold transition-all hover:scale-105 active:scale-95">
                Nuestra Historia
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator Metálico Brillante */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-80">
          <div className="w-[1px] h-16 bg-gradient-to-b from-oro via-oro to-transparent mx-auto" />
        </div>
      </section>

      {/* Featured Products Section con Ancho Expandido */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto overflow-visible">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Nuestras <span className="italic text-primary drop-shadow-[0_0_8px_rgba(255,51,51,0.2)]">Creaciones</span>
            </h2>
            <div className="h-1 w-32 bg-oro mb-8 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
            <p className="text-muted-foreground text-xl leading-relaxed">
              Explora nuestra selección exclusiva que cobra vida sobre la profundidad de la noche.
            </p>
          </div>
        </div>

        <ProductGallery featuredOnly={true} />
      </section>

      {/* Philosophy Banner - Dark Glassmorphism */}
      <section className="bg-muted/30 py-32 px-6 border-y border-white/5 text-center relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[120px] opacity-30" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[120px] opacity-30" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h3 className="font-serif text-4xl md:text-5xl text-foreground mb-10 italic leading-relaxed">
            &quot;No solo horneamos pasteles, cultivamos memorias dulces bañadas en lavanda.&quot;
          </h3>
          <p className="text-secondary font-sans tracking-[0.4em] uppercase text-xs font-bold">
            Chef Pastelero — F&L
          </p>
        </div>
      </section>


    </div>
  );
}
