# Core Design Guidelines: Aura Floral Edition
*Última actualización: 2026-04-20*

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

## 🛠️ 5. Arquitectura de Página (Static Export)
Para asegurar que el sitio funcione perfectamente en GitHub Pages manteniendo dinamismo:

1.  **Split Component Pattern:** Las páginas dinámicas (ej: `[slug]`) deben ser Server Components que exporten `generateStaticParams` para pre-renderizar las rutas. El contenido interactivo debe delegarse a un `StorytellingClient` componente hermano.
2.  **Safety Checks:** Siempre validar la existencia de `db` (Firebase) antes de realizar peticiones en el cliente para evitar errores de inicialización.
3.  **URL Sync:** Los filtros de catálogo deben sincronizarse con la URL (`?category=...`) para permitir navegación directa desde el Mega Menú.

---

## ⚡ 6. Movimiento y Scroll (Aura Scroll)
*   **Scroll:** El `SmoothScrollProvider` basado en Lenis debe estar siempre activo en el `layout.tsx`.
*   **Scrollbar Global:** Se utiliza una barra de desplazamiento minimalista con color `--oro` (30% opacidad) y bordes redondeados. Nunca usar la barra por defecto del sistema.
*   **Fade Indicators:** Todo contenedor con scroll horizontal (ej: Categorías) debe incluir gradientes laterales (`from-background to-transparent`) que indiquen visualmente que hay más contenido.

---

## 📱 7. Mobile Premium Experience
1.  **Mobile Menu:** En resoluciones menores a `md`, la navegación se transfiere a un `MobileMenu` basado en el componente `Sheet` (Radix), manteniendo la estética de cristal.
2.  **Touch Targets:** Botones de acción deben tener una altura mínima de `48px` para facilitar la interacción táctil sin perder elegancia.

---

## 🧩 8. Coherencia de Categorías
Las categorías deben estar sincronizadas entre `MegaMenu`, `MobileMenu` y `CatalogPage`. Lista oficial:
*   *Signature, Temporada, Catering, Regalos, Clásicos, Bollería.*

---

> [!IMPORTANT]
> **Criterio de Aceptación:** Si una nueva sección no se siente como una página de la revista *Vogue* o una boutique de París, el diseño debe ser rechazado y ajustado según estos lineamientos.
