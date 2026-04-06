"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, onSnapshot, query, deleteDoc, doc, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Trash2, Edit, RefreshCw } from "lucide-react";
import { getImagePath } from "@/lib/utils";

interface AdminProductListProps {
  onEdit: (product: any) => void;
}

export default function AdminProductList({ onEdit }: AdminProductListProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    // Sincronización en tiempo real (Costo $0 - lecturas gratuitas moderadas)
    // Sincronización en tiempo real - Más flexible para ver productos sin fecha
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(`Firebase: Recibidos ${snapshot.docs.length} productos.`);
      const items = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Fallback para productos sin fecha si alguien los editó a mano
          createdAt: data.createdAt || { seconds: Date.now() / 1000 },
        };
      }).sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

      setProducts(items);
      setLoading(false);
    }, (err) => {
      console.error("Error al leer admin/products:", err.message);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (productId: string) => {
    if (confirm("¿Seguro que quieres borrar este producto?")) {
      if (!db) {
        console.error("Error: No hay conexión con la base de datos.");
        setLoading(false);
        return;
      }

      try {
        await deleteDoc(doc(db, "products", productId));
        console.log("¡Eliminado de Firebase!");
      } catch (error) {
        console.error("Error al borrar:", error);
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <RefreshCw className="w-8 h-8 animate-spin text-rose-500" />
      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Cargando Inventario...</span>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            <th className="px-8 py-6">Imagen</th>
            <th className="px-8 py-6">Detalles del Producto</th>
            <th className="px-8 py-6">Categoría</th>
            <th className="px-8 py-6">Precio de Venta</th>
            <th className="px-8 py-6 text-right">Acciones de Gestión</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((product) => (
            <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
              <td className="px-8 py-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl relative group-hover:border-rose-500/30 transition-all duration-500">
                  <Image 
                    src={getImagePath(product.imageUrl || "/placeholder.jpg")} 
                    alt={product.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-bold text-white/90 group-hover:text-rose-500 transition-colors">{product.name}</span>
                  {product.isFeatured && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 w-fit">
                      <div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-[8px] text-rose-500 font-extrabold uppercase tracking-widest">Destacado</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-8 py-6">
                <div className="inline-flex items-center px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    {product.category || "General"}
                  </span>
                </div>
              </td>
              <td className="px-8 py-6">
                <span className="text-base font-black text-white/80">
                  <span className="text-rose-500 mr-0.5 text-xs">$</span>
                  {Number(product.price).toFixed(2)}
                </span>
              </td>
              <td className="px-8 py-6">
                <div className="flex gap-3 justify-end">
                  <button 
                    onClick={() => onEdit(product)} 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/10 transition-all group/btn active:scale-90"
                  >
                    <Edit className="w-4 h-4 text-white/40 group-hover/btn:text-rose-500 transition-colors" />
                    <span className="text-[9px] font-black uppercase tracking-wider text-white/20 group-hover/btn:text-white">Editar</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)} 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-500/10 bg-rose-500/5 hover:bg-rose-500/20 hover:border-rose-500/40 transition-all group/del active:scale-90"
                  >
                    <Trash2 className="w-4 h-4 text-rose-500/40 group-hover/del:text-rose-500 transition-colors" />
                    <span className="text-[9px] font-black uppercase tracking-wider text-rose-500/20 group-hover/del:text-rose-500">Borrar</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="py-20 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Aún no hay productos registrados</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
