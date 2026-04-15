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
    <Card className="overflow-hidden bg-white/70 glass-light border-accent group hover:border-primary/30 transition-all duration-700 shadow-premium relative h-full flex flex-col rounded-[2rem]">
      {/* Botón de información / cerrar descripción */}
      <button 
        onClick={() => setShowDesc(!showDesc)}
        className="absolute top-6 right-6 z-20 bg-white/40 backdrop-blur-xl p-2.5 rounded-full text-foreground hover:bg-primary hover:text-white transition-all border border-black/5 shadow-sm"
        title={showDesc ? "Cerrar descripción" : "Más información"}
      >
        {showDesc ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
      </button>

      {/* Capa de descripción (Aura Floral Edition) */}
      <div 
        className={`absolute inset-0 z-10 bg-white/95 backdrop-blur-2xl p-10 flex flex-col justify-center transition-all duration-700 ease-in-out ${
          showDesc ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <h4 className="font-serif text-3xl font-bold text-foreground mb-4">
          {product.name}
        </h4>
        <div className="h-[1px] w-12 bg-primary mb-6" />
        <p className="text-muted-foreground/80 leading-relaxed mb-8 text-sm font-medium">
          {product.description}
        </p>
        
        {product.allergens && (
          <div className="space-y-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-oro font-black">Alérgenos:</span>
            <div className="flex flex-wrap gap-2">
              {product.allergens.map((allergen) => (
                <span 
                  key={allergen} 
                  className="text-[8px] uppercase tracking-widest bg-accent/30 px-4 py-1.5 rounded-full text-foreground/60 font-bold border border-black/5"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-col gap-3">
          <Button 
            onClick={() => {
              addItem(product);
              setShowDesc(false);
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white gap-3 font-bold py-8 rounded-full shadow-premium transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest">Añadir a la orden</span>
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => setShowDesc(false)}
            className="text-foreground/40 hover:text-foreground font-black uppercase tracking-widest text-[9px] transition-colors"
          >
            Regresar
          </Button>
        </div>
      </div>

      <div className="relative aspect-square overflow-hidden shrink-0 m-4 rounded-[1.5rem]">
        <Image
          src={getImagePath(product.imageUrl)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      <CardContent className="p-8 pt-2 flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-serif text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <span className="text-primary font-bold text-lg flex items-center gap-1">
              <span className="text-[10px] opacity-40">$</span>
              {product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-[8px] text-oro uppercase tracking-[0.4em] font-black">
            {product.category}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-8 pt-0">
        <Button 
          onClick={() => addItem(product)}
          className="w-full bg-white hover:bg-primary text-primary hover:text-white border-2 border-primary/20 hover:border-primary gap-4 font-bold py-8 rounded-full transition-all active:scale-[0.98] shadow-sm uppercase tracking-widest text-[10px]"
        >
          <Plus className="w-4 h-4" />
          Añadir
        </Button>
      </CardFooter>
    </Card>
  );
}
