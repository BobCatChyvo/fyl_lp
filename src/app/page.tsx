"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getImagePath } from "@/lib/utils";
import ProductGallery from "@/components/ProductGallery";
import gsap from "gsap";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

    tl.fromTo(
      heroRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 2 }
    )
    .fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=1.2"
    )
    .fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.8"
    )
    .fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.6"
    );
  }, []);

  return (
    <div className="min-h-screen selection:bg-primary/20">
      {/* Hero Section - Aura Floral (Luminous) */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-accent/20">
        {/* Fondo Ligeramente más claro para Aura Floral */}
        <div ref={heroRef} className="absolute inset-0">
          <Image
            src={getImagePath("/images/tarta-signature.png")}
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-multiply"
          />
          {/* Gradientes sutiles para profundidad luminosa */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-[1200px] mx-auto pt-20">
          <span className="text-primary font-sans tracking-[0.6em] uppercase text-[10px] font-bold mb-6 block opacity-80 decoration-oro underline underline-offset-8">
            Alta Repostería Botánica
          </span>
          <h1 ref={titleRef} className="font-serif text-7xl md:text-[10rem] font-bold mb-8 text-foreground leading-[1] tracking-tight">
            Fresa <span className="text-primary italic font-light">&</span> Lavanda
          </h1>
          <p ref={textRef} className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            Donde la elegancia clásica se funde con la frescura de la naturaleza en una experiencia sensorial sin precedentes.
          </p>
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/catalog">
              <Button size="lg" className="bg-primary hover:bg-primary/95 text-white px-14 py-8 text-sm uppercase tracking-widest rounded-full font-bold shadow-premium transition-all hover:scale-105 active:scale-95">
                Explorar Catálogo
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-oro text-oro hover:bg-oro/5 px-14 py-8 text-sm uppercase tracking-widest rounded-full font-bold transition-all hover:scale-105 active:scale-95">
                Nuestra Historia
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator - Estilo Rose Gold */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-[0.5px] h-20 bg-gradient-to-b from-rose-gold via-rose-gold to-transparent mx-auto" />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-40 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-oro font-sans tracking-[0.3em] uppercase text-[9px] font-black mb-4 block">Selección Signature</span>
            <h2 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">
              Nuestras <span className="italic text-primary font-light">Joyas</span>
            </h2>
            <div className="h-[2px] w-24 bg-oro/40 mb-10" />
            <p className="text-muted-foreground text-xl leading-relaxed font-light">
              Descubra creaciones que celebran la armonía entre el campo y la alta cocina, diseñadas para cautivar los sentidos bajo la luz del día.
            </p>
          </div>
        </div>

        <ProductGallery featuredOnly={true} />
      </section>

      {/* Philosophy Banner - White Glassmorphism */}
      <section className="mx-6 md:mx-20 my-40 glass-light py-32 px-6 rounded-[3rem] text-center relative overflow-hidden shadow-premium">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[100px] opacity-20" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/30 rounded-full blur-[100px] opacity-30" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h3 className="font-serif text-4xl md:text-6xl text-foreground mb-12 italic leading-[1.3] font-light">
            &quot;Cada fragancia de lavanda y cada dulzor de fresa cuenta la historia de nuestra pasión por lo artesanal.&quot;
          </h3>
          <p className="text-oro font-sans tracking-[0.5em] uppercase text-[10px] font-black">
            Haute Pâtisserie — F&L
          </p>
        </div>
      </section>
    </div>
  );
}
