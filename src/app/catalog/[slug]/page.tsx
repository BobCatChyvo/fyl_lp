import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import ProductStorytellingClient from "@/components/ProductStorytellingClient";

// IMPORTANT: Next.js 14 requires generateStaticParams for static export of dynamic routes
export async function generateStaticParams() {
  if (!db) return [];
  try {
    const q = query(collection(db, "products"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      slug: doc.data().slug || doc.id
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default function ProductStorytellingPage({ params }: { params: { slug: string } }) {
  // We pass the slug to the Client Component which will handle the fetching 
  // (This ensures real-time updates even on static sites after hydration)
  return <ProductStorytellingClient slug={params.slug} />;
}
