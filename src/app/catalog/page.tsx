"use client";

import { productsDB } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { ProductCategory } from "@/types";

const categories: { label: string; value: ProductCategory | "todas" }[] = [
  { label: "Todas las piezas", value: "todas" },
  { label: "Pasteles", value: "pasteles" },
  { label: "Bollería", value: "bolleria" },
  { label: "Postres", value: "postres" },
  { label: "Café", value: "cafe" },
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "todas">("todas");

  const filteredProducts = selectedCategory === "todas" 
    ? productsDB 
    : productsDB.filter(p => p.category === selectedCategory);

  return (
    <main className="pt-40 pb-32 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
      <header className="mb-20 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
        <span className="text-secondary font-sans tracking-[0.4em] uppercase text-xs font-bold mb-6 block animate-in fade-in slide-in-from-bottom-4 duration-700">
          Nuestro Menú Completo
        </span>
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-foreground mb-8">
          Catálogo <span className="text-primary italic">Artesanal</span>
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Explora nuestra selección de repostería botánica, bollería recién horneada y café de especialidad.
        </p>
        <div className="h-1 w-24 bg-oro mx-auto mt-10 rounded-full" />
      </header>

      {/* Filtros de Categoría Rediseñados */}
      <div className="flex flex-wrap justify-center gap-4 mb-24 px-4 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-10 py-4 rounded-full font-bold transition-all duration-500 border-2 uppercase tracking-widest text-[10px] ${
              selectedCategory === cat.value
                ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105"
                : "bg-background border-border/50 text-muted-foreground hover:border-oro/50 hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Productos Expandido */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-40 bg-accent/10 rounded-[3rem] border border-dashed border-border/50">
          <p className="text-2xl text-muted-foreground italic font-serif">No hay piezas en esta categoría por el momento.</p>
        </div>
      )}
    </main>
  );
}
