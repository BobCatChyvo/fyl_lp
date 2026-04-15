# Master Plan: Fresa & Lavanda - Aura Floral Edition (2026-04-15)

Este documento centraliza la visión estratégica, técnica y de diseño para la nueva etapa del proyecto FyL, consolidando la transición desde una estética oscura hacia la luminosidad premium de la línea **Aura Floral**.

---

## 🏛️ 1. Visión Estratégica
Transformar la presencia digital de "Fresa & Lavanda" en una boutique de lujo que combine la eficiencia de un e-commerce moderno con la elegancia editorial de una repostería de alta gama (inspiración Peggy Porschen).

*   **Identidad:** "Elegancia Botánica y Lujo Artesanal".
*   **Edición Protagonista:** **Aura Floral**. El color Obsidiana se desplaza a un rol de soporte estructural (tipografía y acentos) para dar paso a la claridad del Lavanda.

---

## 🎨 2. Sistema de Diseño (Aura Floral)

### Paleta Estratégica
*   **Lienzo (Background):** `#E6E6FA` (Lavanda) con gradientes suaves hacia blanco crema.
*   **Voz (Typography):** `#0A090D` (Obsidiana Profunda). Títulos en Serif de alto contraste para un look "Vogue/Editorial".
*   **Pulso (Action):** `#CA0F14` (Rojo Fresa). Uso vibrante y sólido en botones transaccionales (CTAs) y estados activos.
*   **Joyería (Metals):** Rose Gold, Oro y Bronce para micro-detalles, iconos y líneas de 1px.

### Componentes Clave de UI
1.  **Hero Section Cinematográfico:** Fondo luminoso, título central en Obsidiana, y una imagen "hero" con composición artística y luz lateral.
2.  **Navbar "White Glass":** Barra superior pegajosa con desenfoque de fondo (*backdrop-filter: blur*) y tipografía en Obsidiana.
3.  **Product Luxury Cards:** Tarjetas con bordes suaves, sombras flotantes y acentos metálicos en iconos de "Añadir al carrito".

---

## ⚡ 3. Estrategia de Movimiento (Motion UX)

### Tecnologías de Animación
*   **GSAP (GreenSock):** Control total de timelines de entrada, efectos parallax coordinados y animaciones de texto por palabras.
*   **Lenis:** Implementación de *Smooth Scroll* global para garantizar que cada desplazamiento por la página se sienta suave y "pesado" (sensación de lujo).

### Micro-interacciones
*   **Entrance Stagger:** Los elementos del catálogo aparecerán con un ligero retraso uno tras otro al hacer scroll.
*   **Magnetic Icons:** El cursor tendrá una interacción sutil con los iconos metálicos, atrayéndolos ligeramente al pasar cerca.
*   **Reveal Scroll:** Las secciones de texto aparecerán con un efecto de máscara (escondidas -> reveladas) mientras se desplazan hacia arriba.

---

## ✅ 5. Estado del Proyecto (Progress Status) - Última actualización: 2026-04-15

En el desarrollo de software real, este documento se conoce comúnmente como **Project Roadmap** (Hoja de Ruta), **Changelog** (Registro de Cambios) o **Implementation Plan** (Plan de Implementación). Es el "compás" del proyecto.

### 🌔 Completado (Done)
*   **Cimientos Técnicos:** Instalación de `gsap` y `lenis`.
*   **Smooth Scroll:** Implementación del `SmoothScrollProvider` global.
*   **Design System Update:** Migración de variables CSS de *Eternal Dark* a *Aura Floral*.
*   **Hero Section:** Refactorización cinematográfica con animaciones GSAP y estética luminosa.
*   **Navbar:** Actualización a estilo *White Glassmorphism* y micro-interacciones.
*   **Product Cards:** Rediseño completo bajo la línea Aura Floral (v2.0).
*   **Herramientas UI:** Instalados componentes base de *shadcn-ui* (Mega Menú, Carousel, Tabs, etc) y resolución de bugs de compilación ligados a la tipografía Playfair en CSS.
*   **Mega Menú:** Estructura técnica desplegable implementada con Radix UI en la Navbar Aura Floral.

### ⏳ Pendiente (Backlog)
- [ ] **Contenido Mega Menú:** Poblar las categorías con links reales a los filtros del catálogo (Signature, Temporada, etc).
- [ ] **Página de Catálogo:** Refactorizar la vista `/catalog` para usar el componente `Tabs` y `Select` instalados.
- [ ] **Galería Dinámica:** Implementar el `Carousel` en la página de producto individual para storytelling de lujo.
- [ ] **Optimización de Media:** Auditoría de imágenes para asegurar calidad 4K/WebP.
- [ ] **Mobile Audit:** Ajustar la suavidad de las animaciones en dispositivos móviles.
- [ ] **Página de Producto Individual:** Diseñar la vista de detalle con el enfoque de *storytelling* de lujo.
- [ ] **Configuración GitHub Actions:** Automatizar el despliegue a Pages con cada Push.

---

## 🚀 6. Próximos pasos inmediatos:
1.  Diseñar la estructura del Mega Menú (Catálogo, Talleres, Nosotros).
2.  Aplicar el sistema Aura Floral a la Galería del Catálogo.

---
*Documento generado por Antigravity para Fresa & Lavanda.*
