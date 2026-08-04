import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnazzyZone Party Recovery Department",
  description: "Official government recovery portal for SnazzyZone pending parties.",
};

import { PortalProvider } from "./context/PortalContext";
import { SecurityPopup } from "../components/SecurityPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-background text-text`}>
        <PortalProvider>
          <SecurityPopup />
          {children}
        </PortalProvider>
      </body>
    </html>
  );
}

