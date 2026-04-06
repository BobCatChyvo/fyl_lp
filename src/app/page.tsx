import Image from "next/image";
import Link from "next/link";
import { productsDB } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { getImagePath } from "@/lib/utils";

export default function Home() {
  const featuredProducts = productsDB.filter(p => p.isFeatured);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Fondo con Optimización de Next.js */}
        <div className="absolute inset-0">
          <Image
            src={getImagePath("/images/tarta-signature.png")}
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="text-secondary font-sans tracking-[0.3em] uppercase text-sm font-bold mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Artesanía en cada bocado
          </span>
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-8 text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Fresa <span className="text-primary italic">&</span> Lavanda
          </h1>
          <p className="text-xl md:text-2xl text-textMuted mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            Descubre una experiencia sensorial donde la repostería clásica se encuentra con aromas botánicos frescos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Link href="/catalog">
              <Button size="lg" className="bg-primary hover:bg-[hsl(347,79%,45%)] text-white px-10 py-8 text-lg rounded-full font-bold shadow-xl shadow-primary/20 transition-transform hover:scale-105">
                Explorar Catálogo
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-10 py-8 text-lg rounded-full font-bold transition-transform hover:scale-105">
                Nuestra Historia
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent mx-auto" />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Destacados del Mes
            </h2>
            <div className="h-1 w-20 bg-primary mb-6" />
            <p className="text-textMuted text-lg">
              Selección exclusiva de nuestras creaciones más queridas, preparadas con ingredientes de temporada.
            </p>
          </div>
          <Link href="/catalog">
            <Button variant="link" className="text-primary text-lg font-bold p-0 group">
              Ver todo el catálogo 
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="bg-card py-24 px-6 mt-12 border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-serif text-3xl md:text-4xl text-white mb-8 italic">
            &quot;No solo horneamos pasteles, cultivamos memorias dulces bañadas en lavanda.&quot;
          </h3>
          <p className="text-lavender font-sans tracking-widest uppercase text-sm font-bold">
            Chef Pastelero — F&L
          </p>
        </div>
      </section>
    </main>
  );
}
