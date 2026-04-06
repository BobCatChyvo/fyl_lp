import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if each variable exists and is not the string "undefined"
const configStatus = {
  apiKey: !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined",
  authDomain: !!firebaseConfig.authDomain && firebaseConfig.authDomain !== "undefined",
  projectId: !!firebaseConfig.projectId && firebaseConfig.projectId !== "undefined",
  storageBucket: !!firebaseConfig.storageBucket && firebaseConfig.storageBucket !== "undefined",
  messagingSenderId: !!firebaseConfig.messagingSenderId && firebaseConfig.messagingSenderId !== "undefined",
  appId: !!firebaseConfig.appId && firebaseConfig.appId !== "undefined",
};

const isConfigValid = configStatus.apiKey && configStatus.projectId && configStatus.appId;

// Always run this debug log in the browser to help identify issues
if (typeof window !== "undefined") {
  console.group("🔥 Firebase Initialization Debug");
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Config Valid for Init?:", isConfigValid ? "✅ YES" : "❌ NO");
  console.log("Variables Status:");
  
  Object.entries(configStatus).forEach(([key, isValid]) => {
    console.log(`  - ${key}: ${isValid ? "✅ Creado" : "❌ FALTANTE / INDEFINIDO"}`);
  });

  if (!isConfigValid) {
    if (process.env.NODE_ENV === "production") {
      console.warn("⚠️ ALERTA PRODUCCIÓN/GITHUB PAGES: Al menos una variable requerida de Firebase falta. Asegúrate de que las variables están en Github Secrets y se pasan correctamente en tu archivo .github/workflows/deploy.yml (ej. NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }} en el paso de build).");
    } else {
      console.warn("⚠️ ALERTA DESARROLLO/LOCAL: Faltan variables. Revisa tu archivo .env.local, asegúrate de que se llama .env.local y no tenga comillas incorrectas o falta de comillas. Tras guardar .env.local debes REINICIAR el servidor con Ctrl+C y correr 'npm run dev' de nuevo.");
    }
  }
  console.groupEnd();
}

const app = isConfigValid 
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)) 
  : null;

if (!app && typeof window !== "undefined") {
  console.error("❌ Firebase no se pudo inicializar debido a que faltan variables de configuración.");
}

const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;

// Analytics (Solo inicializar en el navegador)
const analytics = app && typeof window !== "undefined"
  ? isSupported().then(yes => yes ? getAnalytics(app) : null)
  : null;

import { doc, collection, setDoc } from "firebase/firestore";

// Test Connection (Costo $0 - solo para verificar configuración)
async function testFirebaseConnection() {
  if (!db) return { success: false, error: "Database not initialized" };
  try {
    const testDoc = doc(collection(db, "_test_connection"), "ping");
    await setDoc(testDoc, { 
      timestamp: new Date().toISOString(), 
      status: "ok",
      context: typeof window !== "undefined" ? "browser" : "server"
    });
    return { success: true };
  } catch (err: any) {
    console.error("Firebase Test Error:", err);
    return { success: false, error: err.message };
  }
}

export { app, auth, db, analytics, testFirebaseConnection };
