# Guía de Contribución 🥐

¡Gracias por tu interés en contribuir a **FyL - Pastelería Premium**! Queremos mantener un código limpio, profesional y estéticamente superior.

## Flujo de Trabajo

1.  **Haz un Fork:** Si no tienes acceso directo, crea un fork del repositorio.
2.  **Crea una Rama:** Usa nombres descriptivos como `feature/nueva-funcionalidad` o `fix/correccion-de-error`.
3.  **Realiza tus Cambios:** Asegúrate de seguir los estándares de diseño y arquitectura.
4.  **Verifica tu Código:**
    *   Ejecuta `npm run lint` para verificar el estilo.
    *   Asegúrate de que el sitio cargue correctamente en `npm run dev`.
5.  **Envía un Pull Request:** Usa la plantilla de PR proporcionada.

## Estándares de Código

*   **TypeScript:** Usa tipos estrictos en la medida de lo posible.
*   **Componentes:** Los componentes deben ser pequeños, reutilizables y ubicarse en `src/components/`.
*   **Aesthetics:** Cualquier cambio visual debe mantener la identidad premium de la marca (tipografías sofisticadas, colores equilibrados y espaciado generoso).
*   **Git:** Usa mensajes de commit en español claros y concisos (ej: "Agregado componente de carrito", "Corregido bug en el login").

## Estructura del Proyecto

*   `/src/app`: Páginas y layouts (Next.js App Router).
*   `/src/components`: Componentes de UI reutilizables.
*   `/src/lib`: Utilidades y configuraciones (ej: `utils.ts` para tailwind-merge).
*   `/src/store`: Gestión de estado (Zustand).

---

Si tienes dudas, abre un Issue antes de empezar a trabajar en un cambio grande. 🧁
