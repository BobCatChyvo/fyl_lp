"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, deleteDoc, doc, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Trash2, Edit, RefreshCw } from "lucide-react";

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
        alert("Error: No hay conexión con la base de datos. Verifica tus credenciales.");
        setLoading(false);
        return;
      }

      try {
        await deleteDoc(doc(db, "products", productId));
        alert("¡Eliminado de Firebase!");
      } catch (error) {
        console.error("Error al borrar:", error);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Cargando inventario...</div>;

  return (
    <div className="bg-card rounded-[2.5rem] border border-border/40 overflow-hidden shadow-2xl backdrop-blur-md">
      <div className="p-8 border-b border-border/20 bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">Inventario Maestro</h3>
            <p className="text-[10px] text-textMuted uppercase tracking-widest mt-1">Sincronizado con Firestore Cloud</p>
          </div>
          <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-[9px] font-black text-primary uppercase tracking-tighter">Live Database</span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background/40 text-white/30 text-[9px] uppercase tracking-[0.2em] font-black">
              <th className="px-8 py-5">Producto & Identidad</th>
              <th className="px-8 py-5">Inversión ($)</th>
              <th className="px-8 py-5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {products.map((product) => (
              <tr key={product.id} className="group hover:bg-white/[0.03] transition-all duration-300">
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-white font-bold group-hover:text-primary transition-colors text-sm">{product.name}</span>
                    <span className="text-[10px] text-textMuted font-mono opacity-60 mt-1">{product.category}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-primary font-black text-lg font-mono">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    {product.isFeatured && (
                      <span className="text-[8px] text-secondary font-black uppercase tracking-widest mt-1">✨ Destacado</span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex gap-3 justify-center">
                    <button 
                      onClick={() => onEdit(product)} 
                      className="p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/10 group-hover:scale-110 active:scale-90"
                      title="Editar pieza"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)} 
                      className="p-3 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20 group-hover:scale-110 active:scale-90 shadow-lg shadow-transparent hover:shadow-red-500/10"
                      title="Retirar del catálogo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-24 px-8">
                  <div className="flex flex-col items-center gap-4 opacity-40">
                    <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-textMuted text-sm italic font-serif">
                      Aún no hay creaciones registradas en la nube. <br/>
                      Añade tu primer producto artesanal arriba.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
