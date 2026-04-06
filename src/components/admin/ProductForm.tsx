"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Info, Image as ImageIcon, Flame } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="space-y-8 bg-card p-10 rounded-[2.5rem] border border-border shadow-2xl relative overflow-hidden transition-all duration-500">
      {/* Luces decorativas de fondo */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <header className="space-y-2">
        <div className="flex items-center gap-3 text-primary mb-2">
          {productToEdit ? <Info className="w-6 h-6" /> : <Flame className="w-6 h-6 animate-pulse" />}
          <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Panel de Control Premium</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
          {productToEdit ? "Editar Creación" : "Nueva Obra Maestra"}
        </h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/70 text-xs uppercase tracking-widest font-bold">Nombre del Producto *</Label>
            <Input 
              id="name" 
              name="name" 
              defaultValue={productToEdit?.name} 
              onChange={handleNameChange}
              required 
              placeholder="Ej: Tarta Signature..."
              className="bg-background/50 border-border/50 h-12 rounded-xl focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-white/70 text-xs uppercase tracking-widest font-bold">URL Identificadora (Slug)</Label>
            <Input 
              id="slug" 
              value={slug}
              readOnly
              className="bg-background/30 border-border/20 text-textMuted h-10 rounded-xl cursor-not-allowed text-xs font-mono"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-white/70 text-xs uppercase tracking-widest font-bold">Precio Unitario ($) *</Label>
            <Input 
              id="price" 
              name="price" 
              type="number" 
              step="0.01" 
              defaultValue={productToEdit?.price} 
              required 
              placeholder="0.00"
              className="bg-background/50 border-border/50 h-12 rounded-xl text-primary font-bold text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-white/70 text-xs uppercase tracking-widest font-bold">Categoría *</Label>
            <select 
              id="category" 
              name="category" 
              defaultValue={productToEdit?.category || "pasteles"} 
              className="w-full h-12 rounded-xl bg-background/50 border border-border/50 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="pasteles">Pasteles Premium</option>
              <option value="bolleria">Bollería de Autor</option>
              <option value="postres">Postres Individuales</option>
              <option value="cafe">Cafetería & Botánicos</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-white/70 text-xs uppercase tracking-widest font-bold">Relato / Descripción *</Label>
        <Textarea 
          id="description" 
          name="description" 
          defaultValue={productToEdit?.description} 
          required 
          placeholder="Describe la experiencia sensorial..."
          className="bg-background/50 border-border/50 min-h-[120px] rounded-2xl p-4 focus:ring-primary resize-none" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-white/70 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
          <ImageIcon className="w-3 h-3" /> URL de la Imagen
        </Label>
        <Input 
          id="imageUrl" 
          name="imageUrl" 
          defaultValue={productToEdit?.imageUrl} 
          placeholder="/images/tu-producto.png"
          className="bg-background/50 border-border/50 h-11 rounded-xl text-sm italic"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start py-4 border-y border-border/30">
        {/* Alérgenos */}
        <div className="space-y-4">
          <Label className="text-white/70 text-xs uppercase tracking-widest font-bold">Alérgenos Presentes</Label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_ALLERGENS.map((allergen) => (
              <button
                key={allergen}
                type="button"
                onClick={() => toggleAllergen(allergen)}
                className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold border transition-all ${
                  selectedAllergens.includes(allergen)
                    ? "bg-primary border-primary text-white scale-105 shadow-lg shadow-primary/20"
                    : "bg-background border-border text-textMuted hover:border-primary/50"
                }`}
              >
                {allergen}
              </button>
            ))}
          </div>
        </div>

        {/* Destacado */}
        <div className="flex items-center gap-4 bg-background/30 p-6 rounded-2xl border border-border/50 h-full group hover:border-primary/30 transition-all">
          <div className={`p-3 rounded-xl transition-colors ${isFeatured ? "bg-primary/20 text-primary" : "bg-white/5 text-textMuted"}`}>
            <Star className={`w-6 h-6 ${isFeatured ? "fill-current" : ""}`} />
          </div>
          <div className="flex-1">
            <h4 className="text-white text-sm font-bold">Producto en Portada</h4>
            <p className="text-textMuted text-[10px]">Aparecerá en la sección Home</p>
          </div>
          <Checkbox 
            checked={isFeatured}
            onCheckedChange={(checked: boolean | "indeterminate") => setIsFeatured(!!checked)}
            className="w-6 h-6 rounded-md border-primary data-[state=checked]:bg-primary"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-primary hover:bg-[hsl(347,79%,45%)] text-white h-16 rounded-[1.25rem] font-bold text-lg shadow-2xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Sincronizando con Firebase...</span>
          </div>
        ) : (
          productToEdit ? "Guardar Cambios de Autor" : "Certificar Nueva Creación"
        )}
      </Button>
    </form>
  );
}
