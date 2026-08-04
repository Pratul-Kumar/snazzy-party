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
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

import { PortalProvider } from "./context/PortalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans noise`}>
        <PortalProvider>
          {children}
        </PortalProvider>
      </body>
    </html>
  );
}
