import type { Metadata } from "next";
import { Inter, Rajdhani, Orbitron, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

const orbitron = Orbitron({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const oswald = Oswald({
  weight: ["200", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "SNAZZYZONE | PLAYER WORLD",
  description: "Enter the world of SnazzyZone. Explore the journey, the games, and the 2026 quest.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

import { PortalProvider } from "./context/PortalContext";
import { ShareProvider } from "./context/ShareContext";
import { UserProvider } from "./context/UserContext";
import { SubscriberProvider } from "./context/SubscriberContext";
import { Toaster } from "react-hot-toast";
import SharePopup from "@/components/SharePopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${rajdhani.variable} ${orbitron.variable} ${oswald.variable} font-sans bg-[#070807] text-[#F5F5F5] overflow-x-hidden antialiased selection:bg-[#D8B24C] selection:text-[#070807]`}>
        <ShareProvider>
          <PortalProvider>
            <UserProvider>
              <SubscriberProvider>
              {children}
              <Toaster 
                position="top-center"
                toastOptions={{
                  style: {
                    background: '#101210',
                    color: '#F5F5F5',
                    border: '1px solid #8A8F89',
                    borderRadius: '0px',
                    fontFamily: 'var(--font-rajdhani)',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }
                }}
              />
              <SharePopup />
              </SubscriberProvider>
            </UserProvider>
          </PortalProvider>
        </ShareProvider>
      </body>
    </html>
  );
}
