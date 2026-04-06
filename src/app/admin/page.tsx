"use client";

import { useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import AdminProductList from "@/components/admin/AdminProductList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { db } from "@/lib/firebase/config";

export default function AdminPage() {
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    // Hacemos scroll hacia arriba para que el admin vea el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuccess = () => {
    setEditingProduct(null);
  };

  return (
    <main className="min-h-screen bg-background py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
        <div className="max-w-xl">
          <span className="text-primary font-sans tracking-[0.3em] uppercase text-xs font-bold mb-4 block">
            ADMINISTRACIÓN (Costo $0)
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Gestión de Datos
          </h1>
          <p className="text-textMuted text-base leading-relaxed max-w-lg">
            Control total sobre el inventario en tiempo real. Modifica precios, nombres y descripciones con efecto inmediato en el catálogo.
          </p>
        </div>
        
        {editingProduct && (
          <Button 
            onClick={() => setEditingProduct(null)} 
            variant="outline" 
            className="border-primary text-primary"
          >
            <Plus className="w-4 h-4 mr-2 rotate-45" /> Cancelar Edición
          </Button>
        )}
      </div>

      {!db && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          ⚠️ Error: No se ha podido inicializar la base de datos. Verifica tus variables de entorno de Firebase.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 sticky top-32 h-fit">
          <ProductForm 
            onSuccess={handleSuccess} 
            productToEdit={editingProduct} 
          />
        </div>

        <div className="lg:col-span-7">
          <AdminProductList onEdit={handleEdit} />
          <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-2xl">
            <h4 className="text-primary font-bold mb-2">💡 Nota de Configuración:</h4>
            <p className="text-xs text-textMuted leading-relaxed">
              Si no ves tus productos o recibes errores de conexión, recuerda que debes agregar tus variables de Firebase en 
              <span className="text-white font-mono mx-1">Settings &gt; Secrets and variables &gt; Actions</span> de tu repositorio en GitHub.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
