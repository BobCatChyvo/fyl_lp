"use client";

import ProductGallery from "@/components/ProductGallery";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCategory } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import { cn } from "@/lib/utils";

const categories: { label: string; value: ProductCategory | "todas"; image: string }[] = [
  { label: "Completo", value: "todas", image: "/images/tarta-signature.png" },
  { label: "Signature", value: "signature", image: "/images/tarta-signature.png" },
  { label: "Temporada", value: "seasonal", image: "/images/pistachocitrico.png" },
  { label: "Catering", value: "catering", image: "/images/macarons.png" },
  { label: "Regalos", value: "gifts", image: "/images/hbdquemado.png" },
  { label: "Clásicos", value: "diseños", image: "/images/vintage.png" },
  { label: "Bollería", value: "bolleria", image: "/images/croissant.png" },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultCategory = (searchParams.get("category") as ProductCategory) || "todas";
  const matchedCategory = categories.some(c => c.value === defaultCategory)
    ? defaultCategory
    : "todas";

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "todas">(matchedCategory);

  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    if (categoryQuery) {
      const isVal = categories.some(c => c.value === categoryQuery);
      if (isVal) {
        setSelectedCategory(categoryQuery as ProductCategory | "todas");
      }
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setSelectedCategory(value as ProductCategory | "todas");
    if (value === "todas") {
      router.replace("/catalog", { scroll: false });
    } else {
      router.replace(`/catalog?category=${value}`, { scroll: false });
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center mb-12">
        <div className="w-full max-w-6xl overflow-x-auto py-10 no-scrollbar">
          <div className="flex gap-10 md:gap-20 px-10 min-w-max mx-auto justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleTabChange(cat.value)}
                className="group flex flex-col items-center gap-6 transition-all duration-700"
              >
                <div className={cn(
                  "relative w-16 h-16 md:w-16 md:h-16 rounded-full overflow-hidden transition-all duration-700 border border-white/5 scale-95 group-hover:scale-100",
                  selectedCategory === cat.value
                    ? "border-primary ring-4 ring-primary/5 shadow-2xl scale-110"
                    : "grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:border-primary/20"
                )}>
                  <Image
                    src={getImagePath(cat.image)}
                    alt={cat.label}
                    fill
                    className="object-cover"
                  />
                  {selectedCategory === cat.value && (
                    <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
                  )}
                </div>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-500",
                  selectedCategory === cat.value
                    ? "text-primary translate-y-0 opacity-100"
                    : "text-foreground/30 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                )}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ProductGallery categoryFilter={selectedCategory !== "todas" ? selectedCategory as ProductCategory : undefined} />
    </>
  );
}

export default function CatalogPage() {
  return (
    <main className="pt-24 pb-32 px-6 md:px-12 max-w-[1700px] mx-auto min-h-screen">
      <Suspense fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <CatalogContent />
      </Suspense>
    </main>
  );
}

