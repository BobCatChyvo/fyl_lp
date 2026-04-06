import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Force rebuild

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "FyL | Pastelería Premium & Artesanal",
  description: "Descubre una experiencia sensorial donde la repostería clásica se encuentra con aromas botánicos frescos. Fresa & Lavanda, Focus Your Life.",
  openGraph: {
    title: "FyL | Pastelería Premium",
    description: "Repostería de alta gama con ingredientes botánicos.",
    url: "https://bobcatchyvo.github.io/fyl_lp",
    siteName: "FyL Pastelería",
    images: [
      {
        url: "/images/tarta-signature.png",
        width: 1200,
        height: 630,
        alt: "FyL Premium Cake",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FyL | Pastelería Premium",
    description: "Repostería de alta gama con ingredientes botánicos.",
    images: ["/images/tarta-signature.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground min-h-screen flex flex-col relative`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
