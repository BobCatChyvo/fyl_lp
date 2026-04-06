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
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <header className="mb-16 text-center">
        <span className="text-primary font-sans tracking-[0.3em] uppercase text-sm font-bold mb-4 block">
          Nuestro Menú Completo
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">
          Catálogo Artesanal
        </h1>
        <p className="text-textMuted text-xl max-w-2xl mx-auto leading-relaxed">
          Explora nuestra selección de repostería botánica, bollería recién horneada y café de especialidad.
        </p>
      </header>

      {/* Filtros de Categoría */}
      <div className="flex flex-wrap justify-center gap-2 mb-16 px-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 border ${
              selectedCategory === cat.value
                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                : "bg-card border-border text-textMuted hover:border-primary/50 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 opacity-50">
          <p className="text-2xl text-textMuted">No hay productos en esta categoría por el momento.</p>
        </div>
      )}
    </main>
  );
}
