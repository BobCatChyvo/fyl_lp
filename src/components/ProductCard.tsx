"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { getImagePath } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [showDesc, setShowDesc] = useState(false);

  return (
    <Card className="overflow-hidden bg-card border-border group hover:border-primary/50 transition-all duration-300 shadow-lg relative h-full flex flex-col">
      {/* Botón de información / cerrar descripción */}
      <button 
        onClick={() => setShowDesc(!showDesc)}
        className="absolute top-3 right-3 z-20 bg-background/80 backdrop-blur-sm p-1.5 rounded-full text-textMuted hover:text-primary transition-colors border border-border shadow-sm"
        title={showDesc ? "Cerrar descripción" : "Más información"}
      >
        {showDesc ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
      </button>

      {/* Capa de descripción (Efecto Vanish) */}
      <div 
        className={`absolute inset-0 z-10 bg-card/95 backdrop-blur-md p-6 flex flex-col justify-center transition-all duration-500 ease-in-out ${
          showDesc ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <h4 className="font-serif text-xl font-bold text-white mb-4 border-b border-primary/30 pb-2">
          {product.name}
        </h4>
        <p className="text-textMuted italic leading-relaxed mb-6">
          &quot;{product.description}&quot;
        </p>
        
        {product.allergens && (
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">Alérgenos:</span>
            <div className="flex flex-wrap gap-2">
              {product.allergens.map((allergen) => (
                <span 
                  key={allergen} 
                  className="text-[10px] uppercase tracking-wider bg-background px-2 py-0.5 rounded border border-border text-lavender"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Button 
            onClick={() => {
              addItem(product);
              setShowDesc(false);
            }}
            className="w-full bg-primary hover:bg-[hsl(347,79%,45%)] text-white gap-2 font-bold py-6 rounded-xl shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
            Añadir a la orden
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => setShowDesc(false)}
            className="text-textMuted hover:text-white"
          >
            Regresar
          </Button>
        </div>
      </div>

      <div className="relative aspect-square overflow-hidden shrink-0">
        <Image
          src={getImagePath(product.imageUrl)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
      </div>
      
      <CardContent className="p-5 flex-grow flex flex-col justify-between capitalize">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-serif text-lg font-bold text-white leading-tight">
            {product.name}
          </h3>
          <span className="text-primary font-bold text-lg whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        {/* Espaciador para mantener alineación */}
        {!showDesc && (
          <div className="h-4" /> 
        )}
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button 
          onClick={() => addItem(product)}
          className="w-full bg-primary hover:bg-[hsl(347,79%,45%)] text-white gap-2 font-bold py-6 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Añadir a la orden
        </Button>
      </CardFooter>
    </Card>
  );
}
