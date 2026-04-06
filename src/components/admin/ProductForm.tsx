"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Info, Image as ImageIcon, Flame, Plus } from "lucide-react";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 md:p-12 rounded-[2.5rem] border border-border/50 shadow-2xl relative overflow-hidden transition-all duration-500 backdrop-blur-sm">
      {/* Decorative light elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <header className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-3 text-primary">
          <div className="p-2 bg-primary/10 rounded-lg">
            {productToEdit ? <Info className="w-5 h-5" /> : <Plus className="w-5 h-5 animate-pulse" />}
          </div>
          <span className="uppercase tracking-[0.4em] text-[9px] font-black">Sistema de Inventario</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
          {productToEdit ? "Redefinir Producto" : "Nueva Creación"}
        </h2>
      </header>
      
      {/* SECCIÓN 1: IDENTIDAD VISUAL */}
      <div className="space-y-5 pt-4 border-t border-border/20">
        <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">
          <ImageIcon className="w-3 h-3" /> Identidad & Multimedia
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/60 text-[10px] uppercase tracking-widest font-black ml-1">Nombre Artisanal</Label>
            <Input 
              id="name" 
              name="name" 
              defaultValue={productToEdit?.name} 
              onChange={handleNameChange}
              required 
              placeholder="Ej: Tarta Signature..."
              className="bg-background/40 border-border/40 h-11 rounded-xl focus:ring-primary/40 focus:border-primary/60 transition-all text-sm placeholder:text-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-white/60 text-[10px] uppercase tracking-widest font-black ml-1">URL de Imagen</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              defaultValue={productToEdit?.imageUrl} 
              placeholder="/images/tu-producto.png"
              className="bg-background/40 border-border/40 h-11 rounded-xl text-xs font-mono placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="space-y-2 opacity-60">
          <Label htmlFor="slug" className="text-white/40 text-[9px] uppercase tracking-widest font-bold ml-1">Ruta Permanente (Slug)</Label>
          <Input 
            id="slug" 
            value={slug}
            readOnly
            className="bg-black/20 border-transparent text-primary/70 h-9 rounded-lg cursor-not-allowed text-[10px] font-mono px-3"
          />
        </div>
      </div>

      {/* SECCIÓN 2: DATOS DEL CATÁLOGO */}
      <div className="space-y-5 pt-4 border-t border-border/20">
        <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">
          <Star className="w-3 h-3" /> Configuración de Venta
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-white/60 text-[10px] uppercase tracking-widest font-black ml-1">Precio Unitario ($)</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 text-sm font-bold">$</span>
              <Input 
                id="price" 
                name="price" 
                type="number" 
                step="0.01" 
                defaultValue={productToEdit?.price} 
                required 
                placeholder="0.00"
                className="bg-background/40 border-border/40 h-12 pl-8 rounded-xl text-primary font-bold text-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-white/60 text-[10px] uppercase tracking-widest font-black ml-1">Categoría</Label>
            <select 
              id="category" 
              name="category" 
              defaultValue={productToEdit?.category || "pasteles"} 
              className="w-full h-12 rounded-xl bg-background/40 border border-border/40 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
            >
              <option value="pasteles">Pasteles Premium</option>
              <option value="bolleria">Bollería de Autor</option>
              <option value="postres">Postres Individuales</option>
              <option value="cafe">Cafetería & Botánicos</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white/60 text-[10px] uppercase tracking-widest font-black ml-1">Descripción Sensorial</Label>
          <Textarea 
            id="description" 
            name="description" 
            defaultValue={productToEdit?.description} 
            required 
            placeholder="Narra la experiencia del producto..."
            className="bg-background/40 border-border/40 min-h-[100px] rounded-2xl p-4 focus:ring-primary/20 resize-none text-sm leading-relaxed" 
          />
        </div>
      </div>

      {/* SECCIÓN 3: ATRIBUTOS & VISIBILIDAD */}
      <div className="space-y-4 pt-4 border-t border-border/20">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Alérgenos */}
          <div className="flex-1 space-y-3">
            <Label className="text-white/40 text-[10px] uppercase tracking-widest font-bold ml-1">Alérgenos</Label>
            <div className="flex flex-wrap gap-1.5 leading-none">
              {AVAILABLE_ALLERGENS.map((allergen) => (
                <button
                  key={allergen}
                  type="button"
                  onClick={() => toggleAllergen(allergen)}
                  className={`px-2.5 py-1.5 rounded-lg text-[9px] uppercase font-black transition-all duration-300 border ${
                    selectedAllergens.includes(allergen)
                      ? "bg-primary border-primary text-white scale-105"
                      : "bg-background/20 border-border/40 text-white/30 hover:border-white/20"
                  }`}
                >
                  {allergen}
                </button>
              ))}
            </div>
          </div>

          {/* Destacado */}
          <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/20 transition-all hover:bg-primary/10">
            <div className="flex-1">
              <h4 className="text-white text-[10px] font-black uppercase tracking-widest">Destacado</h4>
              <p className="text-white/30 text-[9px] leading-tight mt-1">Mostrar en sección visual principal</p>
            </div>
            <Checkbox 
              checked={isFeatured}
              onCheckedChange={(checked: boolean | "indeterminate") => setIsFeatured(!!checked)}
              className="w-5 h-5 rounded-md border-primary data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-xs">Sincronizando...</span>
            </div>
          ) : (
            <span>{productToEdit ? "Actualizar Registro" : "Certificar Nueva Creación"}</span>
          )}
        </Button>
      </div>
    </form>
  );
}
