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
    <Card className="overflow-hidden bg-background border-oro/20 group hover:border-oro/50 transition-all duration-500 shadow-xl relative h-full flex flex-col rounded-xl">
      {/* Botón de información / cerrar descripción */}
      <button 
        onClick={() => setShowDesc(!showDesc)}
        className="absolute top-4 right-4 z-20 bg-background/60 backdrop-blur-md p-2 rounded-full text-oro hover:bg-oro hover:text-white transition-all border border-oro/30 shadow-sm"
        title={showDesc ? "Cerrar descripción" : "Más información"}
      >
        {showDesc ? <X className="w-5 h-5" /> : <Info className="w-5 h-5" />}
      </button>

      {/* Capa de descripción (Efecto Vanish) - Light Theme Glassmorphism */}
      <div 
        className={`absolute inset-0 z-10 bg-background/90 backdrop-blur-xl p-8 flex flex-col justify-center transition-all duration-700 ease-in-out ${
          showDesc ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <h4 className="font-serif text-2xl font-bold text-foreground mb-4 border-b border-oro/30 pb-3">
          {product.name}
        </h4>
        <p className="text-muted-foreground italic leading-relaxed mb-8 text-sm">
          &quot;{product.description}&quot;
        </p>
        
        {product.allergens && (
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-oro font-bold">Alérgenos Presentes:</span>
            <div className="flex flex-wrap gap-2">
              {product.allergens.map((allergen) => (
                <span 
                  key={allergen} 
                  className="text-[9px] uppercase tracking-widest bg-oro/5 px-3 py-1 rounded-full border border-oro/20 text-oro font-bold"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3">
          <Button 
            onClick={() => {
              addItem(product);
              setShowDesc(false);
            }}
            className="w-full bg-primary hover:bg-primary/90 text-white gap-2 font-bold py-7 rounded-full shadow-lg shadow-primary/20 glow-primary transition-transform active:scale-95"
          >
            <Plus className="w-5 h-5 transition-transform group-active:rotate-90" />
            Añadir a la orden
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => setShowDesc(false)}
            className="text-accent/60 hover:text-accent font-bold uppercase tracking-widest text-[10px] transition-colors"
          >
            Regresar
          </Button>
        </div>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden shrink-0">
        <Image
          src={getImagePath(product.imageUrl)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 image-glow"
        />
        {/* Overlay sutil rose gold */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-40" />
      </div>
      
      <CardContent className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-serif text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <span className="text-primary font-bold text-xl items-center flex gap-1 text-glow-primary">
              <span className="text-xs opacity-50">$</span>
              {product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black italic">
            {product.category}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => addItem(product)}
          className="w-full bg-background hover:bg-primary text-primary hover:text-white border-2 border-primary gap-3 font-bold py-7 rounded-full transition-all active:scale-[0.98] shadow-sm uppercase tracking-widest text-xs hover:glow-primary"
        >
          <Plus className="w-5 h-5" />
          Añadir a la orden
        </Button>
      </CardFooter>
    </Card>
  );
}
