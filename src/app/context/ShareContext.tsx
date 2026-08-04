"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ShareContextProps {
  isShareOpen: boolean;
  openShare: () => void;
  closeShare: () => void;
}

const ShareContext = createContext<ShareContextProps | undefined>(undefined);

export function ShareProvider({ children }: { children: ReactNode }) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <ShareContext.Provider value={{ isShareOpen, openShare: () => setIsShareOpen(true), closeShare: () => setIsShareOpen(false) }}>
      {children}
    </ShareContext.Provider>
  );
}

export function useShare() {
  const context = useContext(ShareContext);
  if (!context) throw new Error("useShare must be used within ShareProvider");
  return context;
}
