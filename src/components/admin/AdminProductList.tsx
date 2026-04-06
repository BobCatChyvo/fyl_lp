"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, deleteDoc, doc, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Trash2, Edit } from "lucide-react";

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
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-border">
        <h3 className="font-serif text-xl font-bold text-white">Inventario (Lectura de Firestore)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background text-textMuted text-[10px] uppercase tracking-widest">
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Precio ($)</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-white/90">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-background/20 transition-colors">
                <td className="px-6 py-4 font-bold">{product.name}</td>
                <td className="px-6 py-4 font-mono text-primary font-bold">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="px-6 py-4 flex gap-4 justify-center">
                  <button 
                    onClick={() => onEdit(product)} 
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors border border-border/50"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)} 
                    className="p-2 text-primary hover:bg-primary/20 rounded-lg transition-colors border border-primary/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-12 text-textMuted italic">
                  Aún no tienes productos. ¡Añade el primero arriba!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
