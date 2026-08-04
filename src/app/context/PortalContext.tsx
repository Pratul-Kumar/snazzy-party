"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface PortalContextProps {
  hasEntered: boolean;
  enterPortal: () => void;
  generateId: (prefix: string, length?: number) => string;
}

const PortalContext = createContext<PortalContextProps | undefined>(undefined);

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [hasEntered, setHasEntered] = useState(false);

  const enterPortal = () => setHasEntered(true);

  const generateId = (prefix: string, length = 5) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}${result}`;
  };

  return (
    <PortalContext.Provider value={{ hasEntered, enterPortal, generateId }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
