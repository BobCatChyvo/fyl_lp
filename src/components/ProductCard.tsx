"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Card className="overflow-hidden bg-card border-border group hover:border-primary/50 transition-all duration-300 shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
      </div>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-bold text-white leading-tight">
            {product.name}
          </h3>
          <span className="text-primary font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-textMuted text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
        
        {product.allergens && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {product.allergens.map((allergen) => (
              <span 
                key={allergen} 
                className="text-[10px] uppercase tracking-wider bg-background px-2 py-0.5 rounded border border-border text-lavender"
              >
                {allergen}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button 
          onClick={() => addItem(product)}
          className="w-full bg-primary hover:bg-[hsl(347,79%,45%)] text-white gap-2 font-bold py-6 rounded-xl transition-all active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          Añadir a la orden
        </Button>
      </CardFooter>
    </Card>
  );
}
