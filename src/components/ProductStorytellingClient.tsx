"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Leaf, Wheat, Milk, Star } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { getImagePath } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductStorytellingClientProps {
  slug: string;
  initialProduct?: Product | null;
}

export default function ProductStorytellingClient({ slug, initialProduct }: ProductStorytellingClientProps) {
  const [product, setProduct] = useState<Product | null>(initialProduct || null);
  const [loading, setLoading] = useState(!initialProduct);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      if (initialProduct || !db) {
        if (!db) console.error("Firebase DB no inicializada en el cliente.");
        return;
      }

      try {
        const q = query(collection(db, "products"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setProduct({
            id: doc.id,
            name: data.name,
            price: Number(data.price),
            description: data.description,
            category: data.category,
            imageUrl: data.image || data.imageUrl || "/placeholder.jpg",
            slug: data.slug || doc.id,
            isFeatured: data.isFeatured || false,
            allergens: data.allergens || [],
          } as Product);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug, initialProduct]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-4xl text-foreground mb-4">Pieza no encontrada</h1>
        <p className="text-muted-foreground mb-8">Esta creación ya no está disponible en nuestro catálogo.</p>
        <Link href="/catalog">
          <Button className="rounded-full tracking-widest uppercase text-xs px-8">Volver al Catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 pb-32">
      {/* Botón de retroceso flotante */}
      <div className="fixed top-28 left-6 md:left-12 z-40">
        <Link href="/catalog">
          <button className="glass-light p-3 md:p-4 rounded-full text-foreground/70 hover:text-primary hover:scale-110 transition-all shadow-premium border border-white/50">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[1900px] mx-auto lg:p-10 xl:p-20">
        {/* Columna Izquierda: Imagen (Sticky) con Carousel */}
        <div className="w-full lg:w-[55%] relative lg:sticky lg:top-10 h-[60vh] lg:h-[80vh] overflow-hidden rounded-[3rem] lg:rounded-[5rem] shadow-2xl">
          <div className="absolute inset-0 bg-primary/5 mix-blend-multiply z-10 pointer-events-none" />

          <Carousel className="w-full h-full" opts={{ loop: true }}>
            <CarouselContent className="flex h-full ml-0">
              <CarouselItem className="relative h-full w-full pl-0 flex-shrink-0">
                <div className="relative w-full h-full">
                  <Image
                    src={getImagePath(product.imageUrl)}
                    alt={`${product.name} - Vista General`}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="relative h-full w-full pl-0 flex-shrink-0">
                <div className="relative w-full h-full">
                  <Image
                    src={getImagePath(product.imageUrl)}
                    alt={`${product.name} - Detalles`}
                    fill
                    className="object-cover object-center scale-125"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </CarouselItem>
            </CarouselContent>

            <div className="absolute bottom-10 right-10 z-30 flex gap-4">
              <CarouselPrevious className="relative bg-white/20 backdrop-blur-xl border-white/50 hover:bg-primary hover:text-white text-foreground static translate-y-0" />
              <CarouselNext className="relative bg-white/20 backdrop-blur-xl border-white/50 hover:bg-primary hover:text-white text-foreground static translate-y-0" />
            </div>
          </Carousel>

          {product.isFeatured && (
            <div className="absolute top-10 left-10 z-20 glass-light px-6 py-2 rounded-full border border-white/40 flex items-center gap-2">
              <Star className="w-3 h-3 text-oro fill-oro" />
              <span className="uppercase text-[9px] font-black tracking-[0.3em] text-foreground">Signature Piece</span>
            </div>
          )}
        </div>

        {/* Columna Derecha: Información Editorial (Zoomed Out / Breathing) */}
        <div className="w-full lg:w-[45%] px-6 md:px-16 lg:px-20 xl:px-32 pt-16 lg:pt-0 flex flex-col justify-center">
          <div className="animate-in fade-in slide-in-from-right-10 duration-1000 ease-out">
            <span className="text-oro font-sans tracking-[0.5em] uppercase text-[10px] font-black mb-8 block opacity-60">
              Colección {product.category}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl xl:text-8xl font-bold text-foreground mb-12 leading-[1.1] tracking-tighter">
              {product.name.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-primary italic font-light block" : "block"}>
                  {word}
                </span>
              ))}
            </h1>

            <div className="h-[1px] w-24 bg-primary/30 mb-12" />

            <p className="text-lg xl:text-xl text-muted-foreground/80 font-light leading-relaxed mb-16 max-w-lg">
              {product.description}
            </p>

            <div className="flex items-center gap-10 mb-16">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Precio de Boutique</span>
                <span className="text-5xl text-foreground font-serif tracking-tight">
                  <span className="text-xl text-primary/40 align-top mr-1">$</span>
                  {product.price.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => addItem(product)}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-16 py-10 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-premium transition-all hover:scale-105 active:scale-95"
            >
              Añadir a la orden
            </Button>

            {product.allergens && product.allergens.length > 0 && (
              <div className="mt-20 pt-16 border-t border-border/30">
                <h4 className="text-[9px] uppercase font-black tracking-[0.4em] text-foreground/40 mb-8">
                  Notas de Alérgenos & Composición
                </h4>
                <div className="flex flex-wrap gap-3">
                  {product.allergens.map(allergen => {
                    let Icon = Leaf;
                    const al = allergen.toLowerCase();
                    if (al.includes("gluten") || al.includes("harina") || al.includes("trigo")) Icon = Wheat;
                    if (al.includes("lugar") || al.includes("leche") || al.includes("lacteo")) Icon = Milk;

                    return (
                      <div key={allergen} className="flex items-center gap-3 bg-accent/20 px-5 py-3 rounded-xl border border-black/5 hover:border-oro/20 transition-colors group">
                        <Icon className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] uppercase tracking-widest font-black text-foreground/50">{allergen}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
