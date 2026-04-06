"use client";

import { useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import AdminProductList from "@/components/admin/AdminProductList";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { db, testFirebaseConnection } from "@/lib/firebase/config";

export default function AdminPage() {
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testError, setTestError] = useState<string | null>(null);

  const handleTest = async () => {
    setTestStatus('testing');
    const res = await testFirebaseConnection();
    if (res.success) {
      setTestStatus('success');
      setTimeout(() => setTestStatus('idle'), 3000);
    } else {
      setTestStatus('error');
      setTestError(res.error);
    }
  };

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
        
        {editingProduct ? (
          <Button 
            onClick={() => setEditingProduct(null)} 
            variant="outline" 
            className="border-primary text-primary"
          >
            <Plus className="w-4 h-4 mr-2 rotate-45" /> Cancelar Edición
          </Button>
        ) : (
          <Button 
            onClick={handleTest}
            disabled={testStatus === 'testing'}
            variant="outline" 
            className={`border-white/10 text-xs font-bold uppercase tracking-widest transition-all ${
              testStatus === 'success' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 
              testStatus === 'error' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'hover:bg-white/5'
            }`}
          >
            {testStatus === 'idle' && <><RefreshCw className="w-3 h-3 mr-2" /> Probar Conexión</>}
            {testStatus === 'testing' && <><RefreshCw className="w-3 h-3 mr-2 animate-spin" /> Verificando...</>}
            {testStatus === 'success' && <><CheckCircle2 className="w-3 h-3 mr-2" /> Conectado</>}
            {testStatus === 'error' && <><XCircle className="w-3 h-3 mr-2" /> Fallo (Ver Consola)</>}
          </Button>
        )}
      </div>

      {!db && (
        <div className="mb-12 p-8 bg-red-500/10 border border-red-500/30 rounded-3xl backdrop-blur-xl relative overflow-hidden group hover:border-red-500/60 transition-all duration-500">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="text-4xl">⚠️</span>
          </div>
          <h3 className="text-red-400 font-serif text-2xl font-bold mb-3">
            Base de Datos NO inicializada
          </h3>
          <p className="text-textMuted text-sm leading-relaxed mb-6 max-w-2xl">
            Firebase no ha detectado las credenciales necesarias. Esto detendrá la carga del catálogo y la gestión de productos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" /> Si estás en LOCAL
              </h4>
              <ul className="text-[11px] text-textMuted space-y-2 list-disc ml-4">
                <li>Verifica que el archivo <code className="text-primary">.env.local</code> exista en la raíz.</li>
                <li>Confirma que las llaves inicien con <code className="text-white">NEXT_PUBLIC_</code></li>
                <li><span className="text-white font-bold">REINICIA</span> el servidor (<code className="px-1 bg-white/5 rounded">npm run dev</code>).</li>
              </ul>
            </div>
            
            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20">
              <h4 className="text-primary text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" /> Si ya hiciste DEPLOY
              </h4>
              <ul className="text-[11px] text-textMuted space-y-2 list-disc ml-4">
                <li>Ve a <span className="text-white">GitHub &gt; Settings &gt; Secrets &gt; Actions</span>.</li>
                <li>Añade <span className="text-white">NEXT_PUBLIC_FIREBASE_API_KEY</span> y el resto.</li>
                <li><span className="text-white font-bold">RE-LANZA</span> el workflow en la pestaña <span className="text-white">Actions</span>.</li>
              </ul>
            </div>
          </div>
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
