import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://bobcatchyvo.github.io/fyl_lp"),
  title: "FyL | Pastelería Premium & Artesanal",
  description: "Descubre una experiencia sensorial donde la repostería clásica se encuentra con aromas botánicos frescos. Fresa & Lavanda, Focus Your Life.",
  openGraph: {
    title: "FyL | Pastelería Premium",
    description: "Repostería de alta gama con ingredientes botánicos.",
    url: "https://bobcatchyvo.github.io/fyl_lp",
    siteName: "FyL Pastelería",
    images: [
      {
        url: "/fyl_lp/images/tarta-signature.png",
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
    images: ["/fyl_lp/images/tarta-signature.png"],
  },
  icons: {
    icon: "/fyl_lp/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground min-h-screen flex flex-col relative antialiased`} suppressHydrationWarning>
        <SmoothScrollProvider>
          <Navbar />
          <main className="animate-fade-in flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
