# Core Design Guidelines: Aura Floral Edition
*Última actualización: 2026-04-15*

Este documento es el "Escudo de Identidad" de Fresa & Lavanda. Define las reglas inquebrantables de diseño y desarrollo para garantizar que el proyecto mantenga su estatus **Premium, Editorial y Luminoso**.

---

## 🏛️ 1. Principios de Oro
1.  **Luz sobre Obscuridad:** El fondo debe evocar frescura y amplitud. El tema Aura Floral es el lienzo principal.
2.  **Jerarquía de Lujo:** Menos es más. Espaciado generoso (whitespace) para dejar respirar a los productos.
3.  **Movimiento Orgánico:** Nada debe aparecer de golpe. Toda entrada debe usar `gsap-reveal` o transiciones suaves.

---

## 🎨 2. Especificación de Glassmorphism (Crystal UI)
Para cualquier contenedor flotante (Navbar, Mega Menú, Modales), se debe usar la clase `.glass-light` con los siguientes parámetros técnicos estrictos:

*   **Fondo:** `rgba(255, 255, 255, 0.35)`
*   **Desenfoque (Blur):** `25px` (Fuerza de cristal esmerilado).
*   **Vibrancia:** `saturate(180%)` (Resalta los colores que pasan por detrás).
*   **Borde:** `1px solid rgba(255, 255, 255, 0.5)` (Efecto de filo de vidrio).
*   **Sombra:** `0 8px 32px 0 rgba(31, 38, 135, 0.07)` (Sombra neumórfica sutil).

---

## 🖋️ 3. Tipografía y Tipado
*   **Títulos (H1-H6):** `font-serif` (Playfair Display).
    *   *Regla:* Siempre usar `tracking-tight` para un look editorial de revista.
*   **Cuerpo y Acciones:** `font-sans` (Inter).
    *   *Regla (Navigation):* Los links de navegación deben ser `uppercase`, `font-black`, tamaño `9px` y `tracking-[0.3em]`.
*   **Pre-títulos:** Texto pequeño arriba de los H1 en color dorado/rose-gold con `letter-spacing` generoso.

---

## 💎 4. Paleta Cromática Técnica
No usar colores ad-hoc. Usar exclusivamente las variables de Tailwind configuradas:

| Token | Hex/RGBA | Uso |
| :--- | :--- | :--- |
| `--background` | `#F6F6FF` | Lavanda ultra suave (Lienzo). |
| `--primary` | `#CA0F14` | Rojo Fresa (Acción/CTAs). |
| `--foreground` | `#0A090D` | Obsidiana (Texto Editorial). |
| `--secondary` | `#B76E79` | Rose Gold (Detalles Metálicos). |
| `--oro` | `hsl(46, 65%, 52%)` | Acentos de Joyería. |

---

## 🛠️ 5. Reglas Técnicas de Implementación (Blindaje)
Para mantener la integridad técnica, toda nueva implementación debe seguir estas reglas:

1.  **Protección de Hidratación:** Cualquier componente que use lógica de cliente (`localStorage`, `auth state`, `window`) debe envolverse en `<StoreHydration>` o usar el hook `isMounted` para evitar desajustes visuales (FOUC).
2.  **Imágenes:** Siempre utilizar el helper `getImagePath()` para asegurar compatibilidad con el `basePath` de GitHub Pages.
3.  **Z-Indexing:**
    *   Navbar: `z-50`
    *   Mega Menú Viewport/Content: `z-[60]` ó `z-[70]`
    *   Modales: `z-[100]`
4.  **No Inline Styles:** Queda prohibido el uso de `style={{...}}` a menos que sea para valores dinámicos de GSAP. Todo debe ir vía Tailwind o `globals.css`.

---

## ⚡ 6. Movimiento (Smooth Experience)
*   **Scroll:** El `SmoothScrollProvider` basado en Lenis debe estar siempre activo en el `layout.tsx`.
*   **Transitions:** La transición de la Navbar al hacer scroll debe ser de exactamente `700ms` con `ease-in-out` para transmitir "peso" y calidad.

---
> [!IMPORTANT]
> **Criterio de Aceptación:** Si una nueva sección no se siente como una página de la revista *Vogue* o una boutique de París, el diseño debe ser rechazado y ajustado según estos lineamientos.
