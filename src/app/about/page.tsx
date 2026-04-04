"use client";

import Image from "next/image";
import { Heart, Leaf, Star, Users } from "lucide-react";

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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 bg-card border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <span className="text-secondary font-sans tracking-[0.3em] uppercase text-sm font-bold block animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Nuestra Historia
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Esencia <br /> <span className="text-primary italic">Fresa & Lavanda</span>
            </h1>
            <p className="text-xl text-textMuted max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              Lo que comenzó como un pequeño taller experimental en una cocina casera, se convirtió en la primera pastelería botánica dedicada a despertar los sentidos a través de contrastes únicos.
            </p>
          </div>
          <div className="flex-1 relative w-full aspect-square max-w-md animate-in zoom-in duration-1000 delay-500">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative z-10 w-full h-full border-4 border-primary/30 p-4 rounded-3xl rotate-3 shadow-2xl overflow-hidden bg-card/80 backdrop-blur-sm">
              <Image 
                src="/fyl_logo.png" 
                alt="FyL Logo History" 
                fill 
                className="object-contain p-8 scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl order-2 md:order-1">
            <Image 
              src="/images/tarta-signature.png" 
              alt="Pastelería en acción" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="space-y-10 order-1 md:order-2">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Misión de Dulzura</h2>
              <div className="h-1.5 w-24 bg-primary rounded-full mb-8" />
              <p className="text-lg text-textMuted leading-relaxed">
                Nuestra misión es elevar el estándar de la repostería local, creando no solo postres, sino experiencias sensoriales que queden grabadas en la memoria. Combinamos técnicas francesas tradicionales con ingredientes botánicos frescos.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-textMuted leading-relaxed">
                Cada tarta, pan y café que servimos es una declaración de amor a la gastronomía consciente. Buscamos el equilibrio perfecto entre lo dulce de la fruta y la calma de la lavanda.
              </p>
              <div className="bg-card p-8 rounded-2xl border-l-4 border-secondary italic text-white/90 text-lg">
                "No solo horneamos pasteles, cultivamos memorias dulces bañadas en lavanda."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-card/30 border-y border-border px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Nuestros Valores</h2>
            <p className="text-textMuted text-lg max-w-xl mx-auto">Los pilares sobre los cuales construimos cada creación en F&L.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, idx) => (
              <div key={idx} className="bg-card p-10 rounded-3xl border border-border hover:border-primary/50 transition-all duration-300 group shadow-lg">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{value.title}</h4>
                <p className="text-textMuted leading-relaxed">{value.description}</p>
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
             <Image src="/fyl_logo.png" alt="Logo" width={80} height={80} className="opacity-50 grayscale" />
          </div>
        </div>
      </section>
    </main>
  );
}
