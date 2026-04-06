"use client";

import Image from "next/image";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import StoreHydration from "./StoreHydration";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { getImagePath } from "@/lib/utils";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  const handleCheckout = () => {
    const link = generateWhatsAppLink();
    window.open(link, '_blank');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Usamos asChild para delegar el trigger a nuestro botón personalizado */}
        <button className="relative flex items-center justify-center p-2 rounded-full hover:bg-card transition-colors group cursor-pointer focus:outline-none">
          <ShoppingBag className="w-6 h-6 text-muted-foreground group-hover:text-white transition-colors" />
          <StoreHydration>
            {totalItems() > 0 && (
              <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background">
                {totalItems()}
              </span>
            )}
          </StoreHydration>
        </button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md bg-background border-l-border flex flex-col shadow-2xl">
        <SheetHeader className="flex flex-row items-center gap-4">
          <div className="relative h-12 w-12 flex-shrink-0">
            <Image 
              src={getImagePath("/fyl_logo.png")} 
              alt="Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <SheetTitle className="text-white font-serif text-3xl">Tu Pedido</SheetTitle>
        </SheetHeader>

        <StoreHydration>
          <div className="flex-1 overflow-y-auto py-8 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-muted-foreground opacity-60">
                <ShoppingBag className="w-20 h-20 mb-2" />
                <p className="text-lg">No has seleccionado dulzura aún</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 bg-card p-4 rounded-xl border border-border shadow-sm">
                  <div className="flex justify-between items-start w-full">
                    <h4 className="text-base font-medium text-white max-w-[80%] leading-tight">{item.name}</h4>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-1 -mr-1 -mt-1 text-muted-foreground hover:text-destructive transition-colors rounded-md"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between w-full mt-2">
                    <p className="text-lg text-primary font-bold">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-3 bg-background rounded-lg border border-border px-2 py-1 shadow-inner">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-muted-foreground hover:text-white transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-muted-foreground hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-border pt-6 pb-2 mt-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-muted-foreground font-medium text-lg uppercase tracking-wider">Subtotal</span>
              <span className="text-white font-serif text-3xl font-bold">${totalPrice().toFixed(2)}</span>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-[hsl(347,79%,45%)] text-white text-lg py-7 rounded-xl font-bold tracking-wide shadow-lg shadow-primary/25 glow-primary transition-transform active:scale-[0.98]"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              Completar Pedido
            </Button>
          </div>
        </StoreHydration>
      </SheetContent>
    </Sheet>
  );
}
