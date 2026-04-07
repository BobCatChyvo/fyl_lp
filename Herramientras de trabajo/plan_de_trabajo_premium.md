# Plan de Trabajo: Transformación UX/UI Premium (Fresa & Lavanda)

Este plan detalla las etapas para elevar la experiencia de usuario de **FyL**, inspirándonos en la estructura de **Peggy Porschen** pero manteniendo nuestra identidad visual oscura y elegante. Se integrarán **GSAP** para animaciones de alto nivel y **Lenis** para un scroll suave (smooth scroll).

---

## 🏗️ Etapa 1: Cimientos Técnicos (Motion & Core)
*Objetivo: Establecer las herramientas de movimiento y optimizar la base del proyecto.*

1.  **Instalación de Dependencias:**
    - `npm install gsap @studio-freight/lenis`
2.  **Configuración de Lenis (Smooth Scroll):**
    - Crear un `SmoothScrollProvider` global para envolver la aplicación.
    - Asegurar que el scroll sea fluido en todas las vistas.
3.  **Sistema de Tokens de Animación:**
    - Definir constantes de tiempo y curvas (easings) para GSAP que den una sensación de peso y lujo.
4.  **Optimización de Assets:**
    - Revisar pesos de imágenes de alta resolución (Hero y Tartas Signature).

## 🎨 Etapa 2: Rediseño Estructural (Inspiración Peggy)
*Objetivo: Adoptar la jerarquía de Peggy Porschen bajo el estilo FyL.*

1.  **Refactorización del Navbar (Mega Menu):**
    - Crear un menú desplegable elegante que categorice: Catálogo (Cupcakes, Tartas, Individuales), Experiencias (Talleres, Catering) y Nosotros.
    - Añadir efecto "Frosted Glass" (cristal esmerilado) más refinado.
2.  **Hero Section "Cinematográfico":**
    - Implementar un efecto de **Parallax sutil** con GSAP ScrollTrigger en la imagen principal.
    - Animación de entrada de títulos por letras/palabras con `gsap.from()`.
3.  **Jerarquía Tipográfica:**
    - Aumentar el contraste entre la Serif (títulos) y Sans (descripciones).
    - Implementar el uso de itálicas decorativas para palabras con acento.

## ✨ Etapa 3: Experiencias Interactivas (GSAP Spotlight)
*Objetivo: Crear micro-interacciones que "enamoren" al usuario.*

1.  **Product Cards Luxury:**
    - Al hacer hover, implementar un **"Radial Glow"** que siga el cursor.
    - Zoom suave de la imagen y revelación de detalles con un delay elegante.
2.  **Secciones de "Scroll Reveal":**
    - Las secciones de filosofía y experiencias aparecerán con un efecto de "fade & slide" controlado por el scroll.
3.  **Elementos Orgánicos Flotantes:**
    - Añadir pequeñas hojas de lavanda o pétalos (SVG) que floten sutilmente en el fondo mediante GSAP para dar profundidad al eje Z.

## 💎 Etapa 4: Pulido Final & Performance
*Objetivo: Garantizar fluidez total y tiempos de carga óptimos.*

1.  **Preloader de Lujo:**
    - Pantalla de carga inicial con el logo de FyL animándose elegantemente mientras se hidratan los componentes.
2.  **Transiciones entre Páginas:**
    - Usar GSAP para animar la salida y entrada entre rutas (opcional, dependiendo de la estructura de Next.js).
3.  **Auditoría Mobile:**
    - Asegurar que todas las animaciones de GSAP se desactiven o simplifiquen en móviles para evitar lag en dispositivos gama media.

---

## 🚀 Próximos pasos inmediatos:
1.  Ejecutar instalación de `gsap` y `lenis`.
2.  Implementar `SmoothScrollProvider` en `layout.tsx`.
3.  Refactorizar el componente `Hero` con la primera animación de GSAP.
