"use client";

import Image from "next/image";
import { Heart, Leaf, Star, Users } from "lucide-react";
import { getImagePath } from "@/lib/utils";

const values = [
  {
    icon: <Leaf className="w-10 h-10 text-primary" />,
    title: "Ingredientes Botánicos",
    description: "Fusionamos la repostería fina con extractos naturales de lavanda, romero y flores comestibles."
  },
  {
    icon: <Heart className="w-10 h-10 text-primary" />,
    title: "Pasión Artesanal",
    description: "Cada pieza es elaborada a mano, respetando los tiempos de horneado y fermentación natural."
  },
  {
    icon: <Star className="w-10 h-10 text-primary" />,
    title: "Calidad Premium",
    description: "Solo utilizamos materia prima seleccionada de productores locales y mantequillas de alta gama."
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Comunidad",
    description: "Creemos en el comercio justo y en crear un espacio acogedor para cada amante del dulce."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen selection:bg-primary/20">
      {/* Hero Section Expandido */}
      <section className="relative pt-48 pb-32 px-6 md:px-12 bg-background border-b border-border/40 overflow-hidden">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-10 text-center lg:text-left">
            <span className="text-secondary font-sans tracking-[0.4em] uppercase text-xs font-bold block animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Nuestra Historia
            </span>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Esencia <br /> <span className="text-primary italic animate-in fade-in zoom-in duration-1000 delay-500">Fresa & Lavanda</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              Lo que comenzó como un pequeño taller experimental en una cocina casera, se convirtió en la primera pastelería botánica dedicada a despertar los sentidos a través de contrastes únicos.
            </p>
          </div>
          <div className="flex-1 relative w-full aspect-square max-w-xl animate-in zoom-in duration-1000 delay-700">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
            <div className="relative z-10 w-full h-full border-2 border-oro/20 p-6 rounded-[3rem] rotate-3 shadow-[0_50px_100px_-20px_rgba(212,175,55,0.15)] overflow-hidden bg-background/40 backdrop-blur-sm">
              <Image 
                src={getImagePath("/fyl_logo.png")} 
                alt="FyL Logo History" 
                fill 
                className="object-contain p-12 scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl order-2 lg:order-1 border-4 border-background ring-1 ring-oro/20">
            <Image 
              src={getImagePath("/images/tarta-signature.png")} 
              alt="Pastelería en acción" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div className="space-y-12 order-1 lg:order-2">
            <div>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-8">Misión de <span className="text-primary italic">Dulzura</span></h2>
              <div className="h-1.5 w-32 bg-oro rounded-full mb-10" />
              <p className="text-xl text-muted-foreground leading-relaxed">
                Nuestra misión es elevar el estándar de la repostería local, creando no solo postres, sino experiencias sensoriales que queden grabadas en la memoria.
              </p>
            </div>
            <div className="space-y-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Combinamos técnicas francesas tradicionales con ingredientes botánicos frescos. Cada tarta, pan y café que servimos es una declaración de amor a la gastronomía consciente.
              </p>
              <div className="bg-accent/10 p-10 rounded-[2.5rem] border-l-8 border-oro italic text-foreground text-xl leading-relaxed shadow-sm">
                &quot;No solo horneamos pasteles, cultivamos memorias dulces bañadas en lavanda.&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid Expandido */}
      <section className="py-40 bg-accent/5 border-y border-border/40 px-6 md:px-12 shadow-inner">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-8">Nuestros <span className="text-oro italic">Valores</span></h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Los pilares sobre los cuales construimos cada creación en F&L.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, idx) => (
              <div key={idx} className="bg-background p-12 rounded-[2.5rem] border border-border/50 hover:border-oro/50 transition-all duration-500 group shadow-xl hover:-translate-y-2">
                <div className="mb-10 transform group-hover:scale-110 transition-transform duration-500 bg-oro/5 w-20 h-20 flex items-center justify-center rounded-2xl border border-oro/10">
                  {value.icon}
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wider">{value.title}</h4>
                <p className="text-muted-foreground leading-relaxed italic">&quot;{value.description}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="font-serif text-5xl font-bold text-white tracking-tight">¿Listo para probar la diferencia?</h2>
          <p className="text-xl text-textMuted leading-relaxed">
            Visítanos en nuestra tienda física o pide a domicilio para llevar la magia botánica a tu hogar.
          </p>
          <div className="flex justify-center">
             <Image src={getImagePath("/fyl_logo.png")} alt="Logo" width={80} height={80} className="opacity-50 grayscale" />
          </div>
        </div>
      </section>
    </main>
  );
}
