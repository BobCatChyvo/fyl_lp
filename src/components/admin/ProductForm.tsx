"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Info, Image as ImageIcon, Flame, Plus, RefreshCw } from "lucide-react";

interface ProductFormProps {
  onSuccess: () => void;
  productToEdit?: any;
}

const AVAILABLE_ALLERGENS = ["Gluten", "Lácteos", "Huevo", "Frutos Secos", "Soya"];

export default function ProductForm({ onSuccess, productToEdit }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [slug, setSlug] = useState("");

  // Al editar, cargamos los estados internos
  useEffect(() => {
    if (productToEdit) {
      setIsFeatured(productToEdit.isFeatured || false);
      setSelectedAllergens(productToEdit.allergens || []);
      setSlug(productToEdit.slug || "");
    } else {
      setIsFeatured(true); // Por defecto destacados al crear
      setSelectedAllergens([]);
      setSlug("");
    }
  }, [productToEdit]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!productToEdit) {
      const newName = e.target.value;
      const newSlug = newName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(newSlug);
    }
  };

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev => 
      prev.includes(allergen) 
        ? prev.filter(a => a !== allergen) 
        : [...prev, allergen]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    if (!db) {
      alert("Error crítico: No se puede conectar con Firebase. Asegúrate de haber configurado los 'Secrets' en GitHub Settings.");
      setLoading(false);
      return;
    }

    const productData = {
      name: formData.get("name") as string,
      slug: slug || (formData.get("name") as string).toLowerCase().replace(/ /g, "-"),
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      category: formData.get("category"),
      imageUrl: formData.get("imageUrl") || "/images/tarta-signature.png",
      isFeatured: isFeatured,
      allergens: selectedAllergens,
      updatedAt: serverTimestamp(),
    };

    try {
      if (productToEdit) {
        await updateDoc(doc(db, "products", productToEdit.id), productData);
      } else {
        await addDoc(collection(db, "products"), {
          ...productData,
          createdAt: serverTimestamp(),
        });
      }
      onSuccess();
      if (!productToEdit) {
        (e.target as HTMLFormElement).reset();
        setSelectedAllergens([]);
        setIsFeatured(true);
      }
    } catch (error) {
      console.error("Error en Firebase:", error);
      alert("Error al guardar. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState<'id' | 'sales' | 'exp'>('id');

  return (
    <div className="w-full flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500/80">Registro de Producto</h2>
        </div>
        <h3 className="font-serif text-4xl font-bold tracking-tight text-white/90 leading-tight">
          {productToEdit ? "Redefinir Registro" : "Nueva Creación"}
        </h3>
      </header>

      {/* Custom Tabs Navigation */}
      <div className="flex border-b border-white/5 relative">
        {(['id', 'sales', 'exp'] as const).map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative z-10 ${
              activeTab === tab ? "text-rose-500" : "text-white/30 hover:text-white/60"
            }`}
          >
            {i + 1}. {tab === 'id' ? 'Identidad' : tab === 'sales' ? 'Ventas' : 'Experiencia'}
          </button>
        ))}
        {/* Animated underline */}
        <div 
          className="absolute bottom-0 h-[2px] bg-rose-500 transition-all duration-500 ease-out" 
          style={{ 
            width: '33.33%', 
            left: activeTab === 'id' ? '0%' : activeTab === 'sales' ? '33.33%' : '66.66%' 
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={`space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pt-4 ${activeTab !== 'id' ? 'hidden' : ''}`}>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-widest text-white/50 ml-1 flex justify-between">
                Nombre Artesanal
                <span className="text-[10px] opacity-40 font-normal normal-case">Máx 3 palabras</span>
              </Label>
              <Input 
                name="name" 
                defaultValue={productToEdit?.name}
                onChange={handleNameChange}
                className="bg-white/[0.03] border-white/5 h-14 rounded-2xl text-sm placeholder:text-white/10 focus:bg-white/[0.07] transition-all px-5"
                placeholder="Ej: Tarta Signature"
                required
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-widest text-white/50 ml-1">Cloudinary / Web URL</Label>
              <Input 
                name="imageUrl" 
                defaultValue={productToEdit?.imageUrl}
                className="bg-white/[0.03] border-white/5 h-14 rounded-2xl text-[11px] font-mono placeholder:text-white/10 focus:bg-white/[0.07] transition-all px-5"
                placeholder="https://res.cloudinary.com/..."
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[11px] font-black uppercase tracking-widest text-white/50 ml-1">Ruta Permanente (Slug)</Label>
            <div className="relative">
              <Input 
                value={slug} 
                readOnly 
                className="bg-black/40 border-white/5 text-rose-500/70 h-14 rounded-2xl text-xs font-mono px-5 cursor-not-allowed"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Info className="w-4 h-4 text-white/10" />
              </div>
            </div>
          </div>
        </div>

        <div className={`space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 ${activeTab !== 'sales' ? 'hidden' : ''}`}>
           <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/40 mb-2">
             <Star className="w-4 h-4 text-rose-500" /> Configuración de Venta
           </div>

           <div className="grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <Label className="text-[11px] font-black uppercase tracking-widest text-white/50 ml-1">Precio Unitario ($)</Label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-rose-500 text-lg font-bold">$</span>
                  <Input 
                    name="price" 
                    type="number"
                    step="0.01"
                    defaultValue={productToEdit?.price}
                    className="bg-white/[0.03] border-white/5 h-16 pl-10 rounded-2xl text-white font-bold text-xl focus:bg-white/[0.07] transition-all px-5"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-[11px] font-black uppercase tracking-widest text-white/50 ml-1">Categoría</Label>
                <div className="relative">
                  <select 
                    name="category"
                    defaultValue={productToEdit?.category || "pasteles"}
                    className="w-full h-16 rounded-2xl bg-white/[0.03] border border-white/5 px-5 text-sm text-white focus:bg-white/[0.07] outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="pasteles">Pasteles Premium</option>
                    <option value="bolleria">Bollería de Autor</option>
                    <option value="postres">Postres Individuales</option>
                    <option value="cafe">Cafetería & Botánicos</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                    <Plus className="w-4 h-4 rotate-45" />
                  </div>
                </div>
              </div>
           </div>

           <div 
             className="bg-rose-500/5 border border-rose-500/10 p-5 rounded-2xl flex items-center justify-between group hover:bg-rose-500/10 transition-all cursor-pointer" 
             onClick={(e) => {
               e.preventDefault();
               setIsFeatured(!isFeatured);
             }}
           >
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/80">Marcar como Destacado</h4>
                <p className="text-[9px] text-white/20 mt-1">Aparece en la sección visual principal</p>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox 
                  checked={isFeatured} 
                  onCheckedChange={(c) => setIsFeatured(!!c)} 
                  className="w-6 h-6 rounded-lg border-white/20 data-[state=checked]:bg-rose-500 border-none bg-white/5" 
                />
              </div>
           </div>
        </div>

        <div className={`space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 ${activeTab !== 'exp' ? 'hidden' : ''}`}>
          <div className="space-y-3">
            <Label className="text-[11px] font-black uppercase tracking-widest text-white/50 ml-1 flex justify-between">
              Descripción Sensorial
              <span className="text-[10px] opacity-40 font-normal normal-case">60 - 120 caracteres</span>
            </Label>
            <Textarea 
              name="description"
              defaultValue={productToEdit?.description}
              className="bg-white/[0.03] border-white/5 min-h-[180px] rounded-[24px] p-5 text-sm leading-relaxed placeholder:text-white/10 focus:bg-white/[0.07] transition-all resize-none shadow-inner"
              placeholder="Narra la experiencia botánica..."
              minLength={60}
              maxLength={120}
              required
            />
          </div>

          <div className="space-y-4">
            <Label className="text-[11px] font-black uppercase tracking-widest text-white/50 ml-1 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500" /> Ingredientes & Alérgenos
            </Label>
            <div className="flex flex-wrap gap-2.5">
              {AVAILABLE_ALLERGENS.map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAllergen(a)}
                  className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                    selectedAllergens.includes(a)
                      ? "bg-rose-500 border-rose-500 text-white shadow-xl shadow-rose-500/30 scale-105"
                      : "bg-white/[0.03] border-white/5 text-white/30 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col gap-4">
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-br from-rose-600 via-rose-500 to-rose-400 hover:from-rose-500 hover:to-rose-300 text-white h-16 rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-rose-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] border-none"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Sincronizando...</span>
              </div>
            ) : (productToEdit ? "Actualizar Registro" : "Certificar Nueva Creación")}
          </Button>

          <button
            type="reset"
            onClick={() => {
              setSelectedAllergens([]);
              setIsFeatured(false);
            }}
            className="w-full py-4 rounded-2xl border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white/50 hover:bg-white/[0.03] transition-all active:scale-95"
          >
            Limpiar Campos de Registro
          </button>
        </div>
      </form>
    </div>
  );
}
