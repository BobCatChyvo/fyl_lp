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
*   **Lienzo (Background):** `rgba(255, 255, 255, 0.35)` con **Glassmorphism Premium** (25px blur).
*   **Voz (Typography):** `#0A090D` (Obsidiana Profunda). Títulos en Serif de alto contraste para un look "Vogue/Editorial".
*   **Pulso (Action):** `#CA0F14` (Rojo Fresa). Uso vibrante y sólido en botones transaccionales (CTAs).
*   **Joyería (Metals):** Rose Gold, Oro y Bronce para micro-detalles e iconos.

### Componentes Clave de UI
1.  **Hero Section Cinematográfico:** Fondo luminoso, título central en Obsidiana, y luz lateral artística.
2.  **Navbar "Crystal Glass":** Barra superior con efecto de cristal esmerilado avanzado y desenfoque profundo.
3.  **Mega Menú Editorial:** Navegación desplegable que organiza el universo de productos con descripciones y estética limpia.

---

## ⚡ 3. Estrategia de Movimiento (Motion UX)

### Tecnologías de Animación
*   **GSAP (GreenSock):** Control de timelines y efectos parallax.
*   **Lenis:** Smooth Scroll global para una sensación de navegación "pesada" y lujosa.

---

## ✅ 4. Estado del Proyecto (Progress Status) - Última actualización: 2026-04-15

### 🌔 Completado (Done)
*   **Cimientos Técnicos:** Configuración de GSAP, Lenis y arquitectura Next.js 14.
*   **Aura Floral Design System:** Migración completa de variables CSS y tokens de diseño.
*   **Resolución de Errores Críticos:**
    *   Corrección de **Hydration Mismatch** en Navbar y Carrito (Protección vía `StoreHydration`).
    *   Fix de tipografía Playfair en compilación de producción.
    *   Optimización de **Glassmorphism** (Blur 25px + Saturación para look premium).
*   **Mega Menú:** Estructura técnica funcional con Radix UI e integración en Navbar.
*   **Herramientas UI:** Instalación de componentes de boutique (`navigation-menu`, `carousel`, `tabs`, `select`, `badge`).
*   **Validación de Despliegue:** Build estático verificado para GitHub Pages.

### ⏳ Pendiente (Backlog)
- [ ] **Boutique Interactiva (Catálogo):** Refactorizar `/catalog` usando `Tabs` y `Select` para filtrado elegante de productos.
- [ ] **Storytelling de Producto:** Implementar el `Carousel` en la vista individual para narrativa visual de lujo.
- [ ] **Contenido Mega Menú:** Vincular categorías dinámicas a filtros reales del catálogo.
- [ ] **GitHub Actions CI/CD:** Automatización del flujo de despliegue al hacer Push a `main`.
- [ ] **Optimización de Media:** Auditoría de imágenes WebP/AVIF para carga instantánea.
- [ ] **Mobile Premium Experience:** Ajuste fino de animaciones táctiles.

---

## 🚀 5. Próximos pasos inmediatos (Roadmap)
1.  **Semana 1:** Refactorización total de la página de Catálogo (UI de filtros y ordenamiento).
2.  **Semana 1:** Creación de la plantilla de Storytelling para productos individuales.
3.  **Semana 2:** Integración final de contenidos y automatización de despliegue.

---
*Documento actualizado por Antigravity - Aura Floral Edition.*
