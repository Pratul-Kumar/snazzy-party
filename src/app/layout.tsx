import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Party Recovery Department — Official Investigation",
  description: "SnazzyZone has crossed 100K subscribers without a single party. This is the official government investigation portal.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

import { PortalProvider } from "./context/PortalContext";
import { ShareProvider } from "./context/ShareContext";
import { Toaster } from "react-hot-toast";
import SharePopup from "@/components/SharePopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans noise`}>
        <ShareProvider>
          <PortalProvider>
            {children}
            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: '#111',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  fontWeight: 'bold'
                }
              }}
            />
            <SharePopup />
          </PortalProvider>
        </ShareProvider>
      </body>
    </html>
  );
}
