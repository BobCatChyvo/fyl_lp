"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

export default function ProductGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    // Consulta en tiempo real a la colección "products"
    const q = query(collection(db, "products"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          // Mapeamos los datos de Firebase a nuestro tipo Product
          // Si te falta algún campo en Firebase, le ponemos un valor por defecto
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
      
      setProducts(items);
      setLoading(false);
    }, (error) => {
      console.error("Error al leer productos de Firestore:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-card/50 rounded-3xl border border-dashed border-border">
        <p className="text-textMuted text-lg italic">
          Aún no hay productos en el catálogo de Firestore.
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
