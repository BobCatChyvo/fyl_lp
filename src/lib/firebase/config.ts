import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";

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

// Log de inicialización (solo en navegador)
if (typeof window !== "undefined") {
  console.group("🔥 Firebase Init");
  console.log("Config válida:", isConfigValid ? "✅" : "❌");
  if (!isConfigValid) {
    console.warn("⚠️ Faltan variables NEXT_PUBLIC_FIREBASE_*. Revisa .env.local o GitHub Secrets.");
  }
  console.groupEnd();
}

const app = isConfigValid 
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)) 
  : null;

const db = app ? getFirestore(app) : null;

if (!app && typeof window !== "undefined") {
  console.error("❌ Firebase no se pudo inicializar debido a que faltan variables de configuración.");
}

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

export { db, testFirebaseConnection };
