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

const isConfigValid = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined";

// Debug para verificar que las variables carguen (Solo verás la máscara en consola por seguridad)
if (typeof window !== "undefined") {
  console.log("Firebase Config Status:", {
    hasApiKey: !!firebaseConfig.apiKey,
    projectId: firebaseConfig.projectId,
    isConfigValid: isConfigValid,
    isProduction: process.env.NODE_ENV === "production"
  });
}

const app = isConfigValid 
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)) 
  : null;

if (!app && typeof window !== "undefined") {
  const isProd = process.env.NODE_ENV === "production";
  console.error("Firebase no se pudo inicializar.");
  if (isProd) {
    console.error("⚠️ PRODUCCIÓN: Asegúrate de configurar GitHub Secrets (NEXT_PUBLIC_FIREBASE_*) en tu repositorio.");
  } else {
    console.error("⚠️ DESARROLLO: Revisa tu .env.local y REINICIA el servidor (npm run dev).");
  }
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
