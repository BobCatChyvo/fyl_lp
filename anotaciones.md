1. Configuración Inicial y Preparación del Entorno Next.js-Firebase

Requisitos Previos:
Proyecto Next.js existente.
Firebase CLI v12.1.0 o superior.
Proyecto Firebase configurado (fresa-lavanda).
Opcional: Facturación habilitada en Firebase para SSR completo.
Pasos de Integración:
Instalar Firebase CLI: Si no está instalado, usar npm install -g firebase-tools .
Iniciar Sesión en Firebase CLI: firebase login .
Inicializar Proyecto Firebase en Next.js:
Navegar al directorio raíz de tu proyecto Next.js.
Ejecutar firebase init hosting .
Seleccionar tu proyecto fresa-lavanda .
Cuando pregunte por el directorio público, escaneará y detectará Next.js, seleccionando _next o similar.
Asegúrate de que firebase.json se configure para frameworksBackend para habilitar el soporte de Next.js.
Instalar SDKs de Firebase:
npm install firebase firebase-admin (o yarn add firebase firebase-admin ).
Configuración de Firebase en el Código:
Crear un archivo de configuración para el SDK de cliente (ej. lib/firebase/client.js ) con las credenciales de Firebase.
Crear un archivo de configuración para el SDK de Admin (ej. lib/firebase/admin.js ) que solo se importará en el lado del servidor (API Routes, getServerSideProps ).
Advertencia: El SDK de Admin fallará si se incluye en el bundle del navegador. Referenciarlo solo dentro de getStaticProps y getStaticPaths (o getServerSideProps ).
Gestión de Entornos: Usar isSupported() para verificar la disponibilidad del SDK en diferentes entornos (cliente/servidor) si es necesario.
2. Implementación de Base de Datos: Cloud Firestore con Next.js

Modelo de Datos:
Utilizar Cloud Firestore como la base de datos principal, siguiendo la estructura de documentos y colecciones previamente definida ( /products , /users , /orders ).
Justificación: Flexibilidad, escalabilidad, consultas avanzadas y actualizaciones en tiempo real, ideal para datos de e-commerce.
Acceso a Datos en Next.js:
Renderizado del Lado del Servidor (SSR) y Generación Estática (SSG):
getServerSideProps : Ideal para datos que cambian frecuentemente o son específicos del usuario (ej. pedidos del usuario autenticado, estado de stock actual). El SDK de Admin puede usarse aquí para obtener datos de Firestore de forma segura.
// pages/products/[id].js
import { getFirestore } from 'firebase-admin/firestore'; // Importar admin SDK solo en el servidor

export async function getServerSideProps(context) {
  const db = getFirestore();
  const productId = context.params.id;
  const productRef = db.collection('products').doc(productId);
  const productDoc = await productRef.get();

  if (!productDoc.exists) {
    return { notFound: true };
  }

  const product = productDoc.data();
  return { props: { product } };
}
Expandir
getStaticProps (con revalidate ): Adecuado para datos que no cambian con mucha frecuencia, como listados de productos generales o detalles de productos, permitiendo una regeneración incremental estática. El SDK de Admin también puede usarse aquí.
// pages/products/index.js
import { getFirestore } from 'firebase-admin/firestore';

export async function getStaticProps() {
  const db = getFirestore();
  const productsRef = db.collection('products');
  const snapshot = await productsRef.get();
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return {
    props: { products },
    revalidate: 60, // Regenerar cada 60 segundos
  };
}
Expandir
API Routes (Next.js):
Para operaciones CRUD que requieren lógica de backend (ej. procesar un pedido, actualizar un producto en el panel de administración).
Utilizar el SDK de Admin para interactuar con Firestore de forma segura.
// pages/api/products.js
import { getFirestore } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  const db = getFirestore();
  if (req.method === 'POST') {
    // Lógica para crear un producto (requiere autenticación/roles)
    const newProduct = req.body;
    await db.collection('products').add(newProduct);
    res.status(201).json({ message: 'Product created' });
  } else if (req.method === 'GET') {
    const productsSnapshot = await db.collection('products').get();
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  }
  // ... otros métodos (PUT, DELETE)
}
Expandir
Cliente (CSR):
Para interacciones en tiempo real o actualizaciones dinámicas después del renderizado inicial.
Usar el SDK de cliente de Firebase Firestore.
// components/ProductList.js (ejecutado en el cliente)
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'; // SDK de cliente

function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const q = collection(db, 'products');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    });
    return () => unsubscribe();
  }, []);
  // ... renderizar productos
}
Expandir
Cloud Storage for Firebase:
Para almacenar imágenes de productos.
Subir imágenes directamente desde el cliente o a través de API Routes (para mayor control).
Guardar las URLs de descarga en Firestore junto con los datos del producto.
3. Implementación de Sistema de Roles (Administrador/Cliente) con Next.js

Componentes Clave: Firebase Authentication (SDK de cliente y Admin), Cloud Functions for Firebase, Firebase Security Rules (Firestore).
Flujo de Implementación:
Registro/Inicio de Sesión (Cliente):
Usar el SDK de cliente de firebase/auth en los componentes de Next.js para gestionar el login/registro.
Integrar con onAuthStateChanged para escuchar los cambios de autenticación y gestionar el estado del usuario.
Asignación de Roles (Cloud Functions):
Cloud Function onUserCreate : Crear una Cloud Function que se dispare cuando un nuevo usuario se registra.
Dentro de esta función, usar el SDK de Admin para llamar a admin.auth().setCustomUserClaims(uid, { role: 'customer' | 'admin' }) .
Ejemplo: (Mismo que el escenario 2, pero destacando su papel en el flujo de Next.js).
// ... (código de la Cloud Function de asignación de roles) ...
Verificación de Roles en Next.js:
getServerSideProps y API Routes:
Cuando un usuario autenticado realiza una solicitud, el token de autenticación de Firebase ( idToken ) se envía en el encabezado Authorization .
En getServerSideProps o una API Route, verificar el idToken usando admin.auth().verifyIdToken(idToken) .
El decodedToken contendrá los custom claims (ej. decodedToken.role ), permitiendo controlar el acceso a la información o renderizar condicionalmente el contenido.
Contexto de Autenticación SSR: El Firebase CLI para Hosting puede proporcionar el usuario autenticado en res.locals en getServerSideProps o el nombre de la app autenticada en __firebaseAppName en la query.
// pages/admin/dashboard.js
import { getAuth } from 'firebase-admin/auth';

export async function getServerSideProps(context) {
  const idToken = context.req.headers.authorization?.split('Bearer ')[1];
  let isAdmin = false;

  if (idToken) {
    try {
      const decodedToken = await getAuth().verifyIdToken(idToken);
      isAdmin = decodedToken.role === 'admin';
    } catch (error) {
      console.error("Error verifying ID token:", error);
    }
  }

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/login', // Redirigir si no es admin
        permanent: false,
      },
    };
  }
  return { props: {} }; // Solo si es admin
}
Expandir
Verificación de Roles en Next.js:
getServerSideProps y API Routes:
Cuando un usuario autenticado realiza una solicitud, el token de autenticación de Firebase ( idToken ) se envía en el encabezado Authorization .
En getServerSideProps o una API Route, verificar el idToken usando admin.auth().verifyIdToken(idToken) .
El decodedToken contendrá los custom claims (ej. decodedToken.role ), permitiendo controlar el acceso a la información o renderizar condicionalmente el contenido.
Contexto de Autenticación SSR: El Firebase CLI para Hosting puede proporcionar el usuario autenticado en res.locals en getServerSideProps o el nombre de la app autenticada en __firebaseAppName en la query.
// pages/admin/dashboard.js
import { getAuth } from 'firebase-admin/auth';

export async function getServerSideProps(context) {
  const idToken = context.req.headers.authorization?.split('Bearer ')[1];
  let isAdmin = false;

  if (idToken) {
    try {
      const decodedToken = await getAuth().verifyIdToken(idToken);
      isAdmin = decodedToken.role === 'admin';
    } catch (error) {
      console.error("Error verifying ID token:", error);
    }
  }

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/login', // Redirigir si no es admin
        permanent: false,
      },
    };
  }
  return { props: {} }; // Solo si es admin
}
Expandir
Firebase Security Rules (Firestore):
Complementar la lógica del backend con reglas de seguridad en Firestore que validen el request.auth.token.role para controlar el acceso directo a los datos de la base de datos.
Ejemplo: (Mismo que el escenario 2).
// ... (código de las reglas de seguridad de Firestore) ...
4. Panel de Administración con Next.js y Despliegue

Tecnologías:
Frontend: Next.js (aprovechando sus características de routing, SSR/SSG y API Routes).
UI Libraries: Integrar con librerías de UI como Material-UI, Chakra UI, Ant Design, o Tailwind CSS para construir rápidamente la interfaz del panel.
Puntos Clave de Implementación:
Estructura de Carpetas: Organizar las páginas del panel de administración en un directorio específico (ej. /pages/admin/* ) y protegerlas con la lógica de roles en getServerSideProps o middleware.ts (Next.js 12+).
API Routes para Backend de Admin: Crear API Routes (ej. /pages/api/admin/* ) para realizar operaciones privilegiadas (crear/editar productos, gestionar pedidos, ver usuarios) que solo los administradores pueden invocar. Estas rutas deben verificar el rol del usuario utilizando el idToken como se describió en el punto 3.
CRUD con Firestore: Usar los SDKs de Firebase (cliente para lecturas simples, Admin para API Routes y getServerSideProps ) para interactuar con los datos de productos, clientes y pedidos.
Carga de Imágenes: Implementar la carga de imágenes para productos utilizando Cloud Storage, ya sea directamente desde el cliente (con reglas de Storage adecuadas) o a través de una API Route que actúe como proxy.
Despliegue con Firebase Hosting:
Firebase App Hosting: Esta es la opción más recomendada para Next.js, ya que optimiza el despliegue de las aplicaciones Next.js a Firebase Hosting y Cloud Functions para el SSR.
Proceso: Una vez que tu firebase.json está configurado para frameworksBackend , simplemente ejecutar firebase deploy desplegará tu aplicación Next.js, incluyendo las funciones necesarias para getServerSideProps y API Routes.
CI/CD: Configurar integración continua/despliegue continuo (ej. GitHub Actions) para desplegar automáticamente al hacer push a la rama principal.
Siguientes Pasos Sugeridos:
¿Cómo configurar las Reglas de Seguridad de Cloud Storage para permitir a los administradores subir imágenes y a los clientes leerlas?
¿Qué estrategia usaríamos para la gestión de estados globales en el panel de administración de Next.js, considerando los datos de Firebase?
¿Cómo implementaríamos la integración con una pasarela de pagos (ej. Stripe) utilizando Cloud Functions y Next.js API Routes? 4. **Firebase Security Rules (Firestore):** * Complementar la lógica del backend con reglas de seguridad en Firestore que validen el `request.auth.token.role` para controlar el acceso directo a los datos de la base de datos. * **Ejemplo:** (Mismo que el escenario 2). firestore // ... (código de las reglas de seguridad de Firestore) ... ```
4. Panel de Administración con Next.js y Despliegue

Tecnologías:
Frontend: Next.js (aprovechando sus características de routing, SSR/SSG y API Routes).
UI Libraries: Integrar con librerías de UI como Material-UI, Chakra UI, Ant Design, o Tailwind CSS para construir rápidamente la interfaz del panel.
Puntos Clave de Implementación:
Estructura de Carpetas: Organizar las páginas del panel de administración en un directorio específico (ej. /pages/admin/* ) y protegerlas con la lógica de roles en getServerSideProps o middleware.ts (Next.js 12+).
API Routes para Backend de Admin: Crear API Routes (ej. /pages/api/admin/* ) para realizar operaciones privilegiadas (crear/editar productos, gestionar pedidos, ver usuarios) que solo los administradores pueden invocar. Estas rutas deben verificar el rol del usuario utilizando el idToken como se describió en el punto 3.
CRUD con Firestore: Usar los SDKs de Firebase (cliente para lecturas simples, Admin para API Routes y getServerSideProps ) para interactuar con los datos de productos, clientes y pedidos.
Carga de Imágenes: Implementar la carga de imágenes para productos utilizando Cloud Storage, ya sea directamente desde el cliente (con reglas de Storage adecuadas) o a través de una API Route que actúe como proxy.
Despliegue con Firebase Hosting:
Firebase App Hosting: Esta es la opción más recomendada para Next.js, ya que optimiza el despliegue de las aplicaciones Next.js a Firebase Hosting y Cloud Functions para el SSR.
Proceso: Una vez que tu firebase.json está configurado para frameworksBackend , simplemente ejecutar firebase deploy desplegará tu aplicación Next.js, incluyendo las funciones necesarias para getServerSideProps y API Routes.
CI/CD: Configurar integración continua/despliegue continuo (ej. GitHub Actions) para desplegar automáticamente al hacer push a la rama principal.
Siguientes Pasos Sugeridos:
¿Cómo implementaríamos la integración con una pasarela de pagos (ej. Stripe) utilizando Cloud Functions y Next.js API Routes?

5. Sincronización Final y Reglas de Consistencia (Abril 2026)

Estado Actual:
- Conexión Firebase: Optimizada para no fallar si faltan variables de entorno (manejo de null).
- Gestión de Auth: Centralizada en `src/lib/firebase/auth.ts` con exportación correcta desde `config.ts`.
- Validaciones del Formulario: Implementadas en el cliente para asegurar consistencia sensorial.

Reglas de Oro para Nuevos Productos:
- Categorías Oficiales: `diseños`, `bolleria`, `reposteria`, `postres`, `cafe`.
- Relato Sensorial: Debe tener entre 60 y 120 caracteres. Menos de 60 se considera insuficiente para la "experiencia FyL".
- Nombres: Máximo 3 palabras sugerido, renderizado en Serif.
- Slugs: Generados automáticamente en minúsculas y sin espacios desde el nombre.

Próximas Implementaciones:
- Carga directa a Cloudinary desde el formulario (actualmente manual vía URL).
- Gestión de inventario avanzado por categorías.
