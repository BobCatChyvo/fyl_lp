# Plan de Implementación: Ecosistema Firebase (F&L)

Este documento detalla la estrategia para integrar los servicios de Google Firebase en la plataforma **Fresa & Lavanda (FyL)**, transformando un sitio estático en una aplicación dinámica y gestionable.

---

## 🎯 Objetivo General
Eliminar la dependencia de código para la gestión de inventario, centralizar los activos visuales en la nube y obtener métricas precisas sobre el comportamiento de los clientes para optimizar las ventas.

---

## 🏗️ Fase 1: Infraestructura y Conectividad
*   **Creación del Proyecto:** Registro en Firebase Console y creación de aplicaciones Web y Analytics.
*   **Configuración del SDK:** Instalación de dependencias de Firebase en el entorno de Next.js.
*   **Variables de Entorno:** Gestión segura de claves de API (Secrets) para prevenir fugas de seguridad.

---

## 📦 Fase 2: Gestión de Inventario (Firestore + Storage)
*   **Migración de Datos:** Traslado del catálogo actual (`products.ts`) a colecciones de **Cloud Firestore**.
*   **Asset Management:** Almacenamiento centralizado de fotos de alta resolución en **Firebase Storage**.
*   **Actualización en Tiempo Real:** Configuración de observadores (*listeners*) para que cualquier cambio en la base de datos se refleje en la web del cliente sin necesidad de recargar.

---

## 🔐 Fase 3: Seguridad y Panel Administrativo (Auth)
*   **Firebase Authentication:** Implementación de acceso seguro mediante correo/contraseña para el administrador.
*   **Ruta Privada `/admin`:** Creación de un panel de control exclusivo para:
    *   Subir nuevos tipos de pasteles.
    *   Cambiar fotos de productos.
    *   Ajustar precios en temporadas especiales.
    *   Gestionar el stock (Disponible / Agotado).

---

## 📊 Fase 4: Inteligencia y Analítica Avanzada
*   **Google Analytics 4 (GA4):** Integración profunda para rastrear:
    *   **Conversión:** ¿Cuántas personas llegan al último paso de WhatsApp?
    *   **Popularidad:** ¿Qué categoría (Pasteles vs Café) genera más interés?
    *   **Comportamiento:** Mapas de calor sobre los botones de "Saber más".
*   **Eventos Personalizados:** Medir qué alérgenos están revisando más tus clientes para ajustar recetas.

---

## 🚀 Próximos Pasos (Hoja de Ruta)
1.  **Crear el Proyecto en Firebase Console.**
2.  **Habilitar Firestore y Storage.**
3.  **Vincular el FirebaseConfig con el entorno de desarrollo local.**

---
*Última actualización: 4 de Abril de 2026*
