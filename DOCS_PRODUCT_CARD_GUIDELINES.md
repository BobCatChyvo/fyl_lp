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

## 🛠️ Estructura de Datos (Referencia Técnica)
Al añadir un nuevo producto en `src/data/products.ts`, sigue esta interfaz:

```typescript
{
  id: 'unique-id',       // Identificador único (ej: p5)
  slug: 'nombre-url',    // Para futuras URLs
  name: 'Nombre Elegante',
  description: 'Relato del sabor...',
  price: 00.00,
  category: 'categoria', // pasteles | bolleria | postres | cafe
  imageUrl: '/images/test.png',
  isFeatured: true/false,
  allergens: ['Lácteos', 'Gluten']
}
```
---
*Última actualización: 4 de Abril de 2026*
