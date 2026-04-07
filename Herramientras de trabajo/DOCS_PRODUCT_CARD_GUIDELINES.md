# Guía de Contenido: Tarjetas de Producto (F&L)

Esta ficha técnica define los estándares de calidad y contenido para cada producto nuevo que se añada al catálogo de **Fresa & Lavanda (FyL)**. El objetivo es mantener una estética premium y prolija en todas las categorías.

## 🖼️ 1. Estándares Visuales (Imagen)
Cada producto DEBE tener una imagen representativa que cumpla con:
- **Relación de Aspecto:** 1:1 (Cuadrada). Esto asegura que el grid del catálogo sea perfectamente simétrico.
- **Calidad:** Alta resolución, preferiblemente con desenfoque de fondo (bokeh) para destacar el producto.
- **Composición:** Iluminación cálida y natural, resaltando texturas y colores botánicos (pasteles, lavanda, frutas).
- **Ruta de Archivo:** `/public/images/[nombre-producto].png`.

## ✍️ 2. Título y Nomenclatura
Un título prolijo debe ser:
- **Conciso:** Máximo 2-3 palabras (ej. "Tarta Signature", "Croissant Clásico").
- **Tipografía:** Se renderiza automáticamente en fuente **Serif** para denotar elegancia.
- **Formato:** Primera letra de cada palabra en mayúscula.

## 📜 3. Descripción Narrativa (Efecto Vanish)
La descripción solo aparece al interactuar. Debe seguir un tono evocativo:
- **Tono:** Poético y botánico. No solo digas qué es, describe qué se siente.
- **Límite:** Entre 60 y 120 caracteres para que el panel de descripción sea legible pero no abrumador.
- **Ejemplo:** *"Nuestra especialidad. Un suave bizcocho empapado con infusión de lavanda fresca y un corazón de mermelada rústica de fresas."*

## 🏷️ 4. Alérgenos y Especificaciones
Es obligatorio listar los alérgenos críticos para la seguridad del cliente:
- Se muestran en etiquetas pequeñas (`badges`) al final del panel de descripción.
- **Categorías Estándar:** Glúten, Lácteos, Huevo, Frutos Secos (Almendras, Nueces), etc.

## 💰 5. Parámetros de Precio
- El precio debe especificarse en formato numérico (float).
- La interfaz añade automáticamente el símbolo `$` y formatea (`.toFixed(2)`).

---

## 🛠️ Estructura de Datos (Referencia Técnica en Firestore)
Los productos se gestionan desde el **Panel de Administración** y se almacenan en la colección `products` de Firestore. La interfaz (`src/types/index.ts`) y el formulario aseguran la siguiente estructura:

```typescript
{
  id: string;            // Generado por Firestore
  slug: string;          // Generado automáticamente en minúsculas (ej: tarta-signature)
  name: string;          // Nombre artesanal (Mínimo 3 caracteres)
  description: string;   // Descripción Sensorial (Mínimo 60, Máximo 120 caracteres)
  price: number;         // Valor numérico (ej: 12.50)
  category: string;      // diseños | bolleria | reposteria | postres | cafe
  imageUrl: string;      // URL de Cloudinary o ruta /images/ (Debe ser HTTPS)
  isFeatured: boolean;   // Define si aparece en la galería destacada
  allergens: string[];   // Lista de alérgenos seleccionados
  createdAt: Timestamp;  // Fecha de creación de la pieza
  updatedAt: Timestamp;  // Última modificación sincronizada
}
```

## ✅ Validación de Calidad (Reglas del Sistema)
El sistema denegará la creación de una pieza si no cumple con:
1. **Nombre Artesanal:** Obligatorio y conciso (máximo 3 palabras sugerido).
2. **Descripción Mínima:** Si el relato tiene menos de **60 caracteres**, el sistema indicará cuántos faltan para completar la experiencia sensorial.
3. **Imágenes:** Solo se aceptan URLs válidas (HTTPS) o rutas locales verificadas.
4. **Categorías:** Debes asignar una de las secciones oficiales (Diseños, Repostería, Bollería, etc.).

---
*Última actualización: 6 de Abril de 2026 - Sincronización con Firebase v2*
