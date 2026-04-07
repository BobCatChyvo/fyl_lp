"use client";

import { useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import AdminProductList from "@/components/admin/AdminProductList";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { testFirebaseConnection } from "@/lib/firebase/config";
import { getImagePath } from "@/lib/utils";
import { useAuth } from "@/lib/firebase/auth";
import { LogOut, Lock } from "lucide-react";

export default function AdminPage() {
  const { user, loading, loginWithGoogle, logout, isAdmin } = useAuth();
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-white/20 animate-pulse font-black uppercase tracking-[0.5em] text-[10px]">
          Verificando Acceso...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center relative overflow-hidden">
        {/* Background Decor */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 w-full max-w-md p-8 bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[40px] text-center shadow-2xl">
          <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-rose-500/20">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          <h1 className="font-serif text-4xl font-bold mb-4 italic">Administración</h1>
          <p className="text-white/40 text-xs font-medium tracking-wide leading-relaxed mb-10 max-w-[280px] mx-auto">
            Acceso restringido para el personal de <span className="text-white">FyL Pastelería</span>. Por favor inicia sesión para continuar.
          </p>
          
          <button 
            onClick={loginWithGoogle}
            className="w-full py-5 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-3"
          >
            Iniciar Sesión con Google
          </button>
          
          <Link 
            href="/"
            className="inline-block mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors"
          >
            ← Volver a la Tienda
          </Link>
        </div>
      </main>
    );
  }

  // Si el usuario está logueado pero no es admin
  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center relative overflow-hidden">
        <div className="relative z-10 w-full max-w-md p-8 bg-rose-500/5 border border-rose-500/10 backdrop-blur-3xl rounded-[40px] text-center shadow-2xl">
          <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-rose-500/20">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-4 italic text-rose-500">Acceso Denegado</h1>
          <p className="text-white/40 text-xs font-medium tracking-wide leading-relaxed mb-10">
            El correo <span className="text-white">{user.email}</span> no tiene permisos de administrador.
          </p>
          
          <button 
            onClick={logout}
            className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all transform active:scale-95"
          >
            Cerrar Sesión e Intentar con otro
          </button>
          
          <Link 
            href="/"
            className="inline-block mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors"
          >
            ← Volver a la Tienda
          </Link>
        </div>
      </main>
    );
  }

  const handleTest = async () => {
    console.log("🔄 Iniciando prueba de conexión con Firebase...");
    const res = await testFirebaseConnection();
    if (res.success) {
      console.log("✅ Conexión con Firebase establecida exitosamente.");
    } else {
      console.error("❌ Error de conexión con Firebase:", res.error);
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
    <main className="min-h-screen bg-[#0d1117] text-white font-sans selection:bg-rose-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header Bar */}
      <nav className="relative z-30 flex items-center justify-between px-6 lg:px-10 py-6 border-b border-white/5 backdrop-blur-xl bg-black/40">
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/" className="flex items-center gap-3 relative h-8 lg:h-10 w-10 lg:w-16">
            <Image 
              src={getImagePath("/fyl_logo.png")} 
              alt="Logo" 
              fill
              className="object-contain brightness-200"
              priority
            />
          </Link>
          <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
          <span className="text-[9px] lg:text-[10px] font-black tracking-[0.4em] text-white/90 uppercase opacity-70 leading-none">
            Panel de Distribución <span className="hidden md:inline text-rose-500/50 ml-2">— ADMINISTRACIÓN CENTRAL</span>
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={logout}
            className="px-6 py-2.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all active:scale-95 flex items-center gap-2"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.3em]">Finalizar Sesión</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[calc(100vh-89px)] overflow-hidden">
        {/* Left: Product Form (Glassy Area) */}
        <div className="lg:col-span-4 p-6 lg:p-14 flex flex-col items-center justify-start border-r border-white/5 bg-black/10 overflow-y-auto max-h-[calc(100vh-89px)]">
          <div className="w-full max-w-md">
            <ProductForm 
              onSuccess={handleSuccess} 
              productToEdit={editingProduct} 
            />
            
            <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
              {editingProduct ? (
                <button 
                  onClick={() => setEditingProduct(null)}
                  className="w-full py-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/5 rotate-1 animate-in zoom-in-95"
                >
                  Cancelar Edición en Progreso
                </button>
              ) : (
                <button 
                  onClick={handleTest}
                  className="w-full py-3 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white/60 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3 h-3" /> Estado del Servidor
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Inventory Management (Solid Dark Area) */}
        <div className="lg:col-span-8 p-6 lg:p-16 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-4">
              <div>
                <h1 className="font-serif text-5xl lg:text-7xl font-bold tracking-tight mb-4 italic leading-tight">Gestión</h1>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-l border-rose-500 pl-4 py-1">Inventario Activo</h2>
              </div>
              
              <div className="flex gap-4">
                 <div className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                   <span className="text-[8px] font-black uppercase tracking-widest text-white/50">Sistema en Vivo</span>
                 </div>
              </div>
            </header>

            <div className="bg-white/[0.01] border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />
              <AdminProductList onEdit={handleEdit} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
