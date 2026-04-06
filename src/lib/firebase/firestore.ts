import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

// --- PRODUCTOS ---

export async function getAllProducts() {
  if (!db) return [];
  const productsCol = collection(db, "products");
  const productSnapshot = await getDocs(productsCol);
  const productList = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return productList;
}

export async function getProductById(id: string) {
  if (!db) return null;
  const productRef = doc(db, "products", id);
  const productSnap = await getDoc(productRef);
  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() };
  } else {
    return null;
  }
}

// --- PEDIDOS (ORDERS) ---

export async function createOrder(userId: string, cartItems: any[], total: number) {
  if (!db) return null;
  const orderRef = doc(collection(db, "orders"));
  const orderData = {
    userId,
    items: cartItems,
    total,
    status: "pending",
    createdAt: Timestamp.now(),
  };
  await setDoc(orderRef, orderData);
  return orderRef.id;
}

export async function getOrdersByUser(userId: string) {
  if (!db) return [];
  const ordersCol = collection(db, "orders");
  const q = query(ordersCol, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
