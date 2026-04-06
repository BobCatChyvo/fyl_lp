"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import ProductCard from "./ProductCard";
import { Product, ProductCategory } from "@/types";

interface ProductGalleryProps {
  categoryFilter?: ProductCategory;
  featuredOnly?: boolean;
}

export default function ProductGallery({ categoryFilter, featuredOnly }: ProductGalleryProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      console.error("Firebase DB no inicializada. Revisa tus variables de entorno.");
      setError("No se pudo conectar con la base de datos. Verifica la configuración de Firebase.");
      setLoading(false);
      return;
    }

    try {
      // Consulta en tiempo real a la colección "products"
      let q = query(collection(db, "products"));
      
      // Aplicar filtros si existen
      if (categoryFilter) {
        // Nota: Si usas múltiples campos de filtro + orderBy, FireStore podría requerir un índice manual
        q = query(collection(db, "products"), where("category", "==", categoryFilter));
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "Sin nombre",
            price: Number(data.price) || 0,
            description: data.description || "",
            category: data.category || "pasteles",
            imageUrl: data.image || data.imageUrl || "/placeholder.jpg",
            slug: data.slug || doc.id,
            isFeatured: data.isFeatured || false,
            allergens: data.allergens || [],
          } as Product;
        });
        
        // Si pedimos solo destacados, filtramos en el cliente para evitar problemas de índices complejos en Firebase
        const finalItems = featuredOnly 
          ? items.filter(p => p.isFeatured) 
          : items;

        setProducts(finalItems);
        setLoading(false);
        setError(null);
      }, (err) => {
        console.error("Error al leer productos de Firestore:", err);
        setError(`Error de Firestore: ${err.message}`);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err: any) {
      console.error("Error al configurar onSnapshot:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [categoryFilter, featuredOnly]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-500/5 rounded-3xl border border-dashed border-red-500/20">
        <p className="text-red-400 font-bold mb-2">⚠️ Error de Conexión</p>
        <p className="text-textMuted text-sm italic max-w-md mx-auto">
          {error}. <br/>
          Si estás en producción, asegúrate que las variables NEXT_PUBLIC_FIREBASE_* estén configuradas en GitHub Secrets.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-card/50 rounded-[3rem] border border-dashed border-border/20 animate-pulse">
        <p className="text-textMuted text-lg italic font-serif">
          {categoryFilter 
            ? `No hemos encontrado piezas en la categoría "${categoryFilter}" por ahora.`
            : "Aún no hay productos en el catálogo de Firestore."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 py-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
