"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface CelebrationData {
  enabled: boolean;
  bannerEnabled: boolean;
  type: string;
  title: string;
  message: string;
  updatedAt?: any;
  updatedBy?: string;
}

interface CelebrationContextType {
  celebration: CelebrationData | null;
  hasSeen: boolean;
  isTestMode: boolean;
  markAsSeen: () => void;
  replay: () => void;
  setTestMode: (val: boolean) => void;
  updateCelebration: (data: Partial<CelebrationData>, ownerId: string) => Promise<void>;
}

const CelebrationContext = createContext<CelebrationContextType | undefined>(undefined);

export function CelebrationProvider({ children }: { children: React.ReactNode }) {
  const [celebration, setCelebration] = useState<CelebrationData | null>(null);
  const [hasSeen, setHasSeen] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    // Check localStorage
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem("snazzyzone_100k_seen");
      if (seen === "true") {
        setHasSeen(true);
      }
    }

    // Subscribe to Firebase doc
    const unsub = onSnapshot(doc(db, "system", "celebration"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as CelebrationData;
        
        setCelebration((prev) => {
          // If celebration was disabled, and now it's enabled, reset hasSeen so they see it again
          if (prev && !prev.enabled && data.enabled) {
            localStorage.removeItem("snazzyzone_100k_seen");
            setHasSeen(false);
          }
          return data;
        });
      } else {
        setCelebration({
          enabled: false,
          bannerEnabled: false,
          type: "100K",
          title: "100K ACHIEVED",
          message: "The milestone is finally here.",
        });
      }
    });

    return () => unsub();
  }, []);

  const markAsSeen = () => {
    localStorage.setItem("snazzyzone_100k_seen", "true");
    setHasSeen(true);
  };

  const replay = () => {
    localStorage.removeItem("snazzyzone_100k_seen");
    setHasSeen(false);
  };

  const updateCelebration = async (data: Partial<CelebrationData>, ownerId: string) => {
    await setDoc(
      doc(db, "system", "celebration"),
      {
        ...data,
        updatedAt: serverTimestamp(),
        updatedBy: ownerId,
      },
      { merge: true }
    );
  };

  return (
    <CelebrationContext.Provider
      value={{
        celebration,
        hasSeen,
        isTestMode,
        markAsSeen,
        replay,
        setTestMode: setIsTestMode,
        updateCelebration,
      }}
    >
      {children}
    </CelebrationContext.Provider>
  );
}

export function useCelebration() {
  const context = useContext(CelebrationContext);
  if (context === undefined) {
    throw new Error("useCelebration must be used within a CelebrationProvider");
  }
  return context;
}
