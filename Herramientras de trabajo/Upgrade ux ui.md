# Reporte Técnico: Inspiración Peggy Porschen & Replicación "Fresa & Lavanda"

Este reporte detalla la arquitectura visual y funcional de **Peggy Porschen** y cómo podemos adaptar sus fortalezas al proyecto actual **FyL (Fresa & Lavanda)**, manteniendo nuestra estética "Dark Mode Premium".

## 1. Análisis de Referencia: Peggy Porschen

### Identidad Visual
- **Paleta de Colores:** Rosas pastel, blancos puros y acabados dorados suaves. Transmite "dulzura y feminidad".
- **Tipografía:** Serifa elegante para títulos (estilo Playfair Display) y Sans-serif geométrica para navegación y cuerpo.
- **Composición:** Mucho espacio en blanco, rejillas minimalistas y un enfoque absoluto en la fotografía de producto.

### Experiencia de Usuario (UX)
- **Navegación Intuitiva:** Categorización clara (Cupcakes, Layer Cakes, Party Cakes).
- **Sección de "Experiencias":** No solo venden productos, venden momentos (Afternoon Tea, Parlour News).
- **Mobile First:** Diseño altamente responsivo con tarjetas de producto que priorizan la imagen.

---

## 2. Propuesta de Replicación para "Fresa & Lavanda"

Adaptaremos la estructura exitosa de Peggy Porschen pero bajo la filosofía **Dark Eternal** de FyL.

### Comparativa de Diseño

| Elemento | Peggy Porschen (Referencia) | Fresa & Lavanda (Nuestra Versión) |
| :--- | :--- | :--- |
| **Fondo** | Blanco / Rosa Pastel | **Deep Background / Glassmorphism** |
| **Acento** | Rosa Vibrante | **Fresa Red (#FF3333) & Lavanda Soft** |
| **Detalles** | Flores Reales | **Botánicos / Sombras Oro Metálicas** |
| **Navbar** | Minimalista Claro | **Glassmorphism con efecto Blur & Border Oro** |

### Mejoras Técnicas Sugeridas para FyL

#### A. Refactorización del Catálogo
Replicar la rejilla de Peggy Porschen para productos, pero añadiendo efectos de **"Hover Glow"** que resalten el producto sobre el fondo oscuro.
- **Componente:** `ProductCard.tsx`
- **Efecto:** Zoom suave de la imagen + Resplandor (glow) en los bordes con color primario.

#### B. Secciones de "Experiencia FyL"
Crear bloques similares a "Parlour Experiences" pero enfocados en la botánica:
1. **Talleres de Lavanda:** Sección con parallax y tipografía serif.
2. **Catering Premium:** Tarjetas con diseño de "vidrio esmerilado".

#### C. Tipografía Dinámica
Utilizar la estructura de jerarquía de Peggy Porschen:
- **Títulos:** Serif con `italic` para palabras clave (ej: Fresa *&* Lavanda).
- **Labels:** Uppercase con `tracking-widest` para ese look de lujo.

---

## 3. Roadmap de Implementación

1.  **Fase 1: Navbar & Layout (UI)**
    - Implementar un "Mega Menu" inspirado en la categorización de Peggy.
    - Añadir micro-interacciones de scroll (ya iniciado en `Navbar.tsx`).
2.  **Fase 2: Product Gallery (UX)**
    - Mejorar `ProductGallery.tsx` con filtros suaves laterales.
    - Asegurar que las imágenes tengan el "glow" metálico detectado en el estilo de FyL.
3.  **Fase 3: Transiciones & Motion**
    - Añadir `framer-motion` para las entradas de página, emulando la fluidez de una pastelería de lujo.

---

> **Nota Final:** La clave de Peggy Porschen es la **limpieza**. En FyL, nuestra "limpieza" se traduce en un **contraste perfecto**. Mantendremos el negro profundo pero usaremos los espacios vacíos para dejar que la "Fresa" y la "Lavanda" respiren.
