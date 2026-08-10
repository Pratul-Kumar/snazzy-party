"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useUser } from "@/app/context/UserContext";

export default function LevelUpAnimation() {
  const [levelData, setLevelData] = useState<{ level: number; title: string } | null>(null);
  const { isOwner } = useUser();

  useEffect(() => {
    const handleLevelUp = (e: any) => {
      setLevelData(e.detail);
      
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#ffd700", "#ff3b30", "#ffffff"],
      });

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        setLevelData(null);
      }, 4000);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("levelUp", handleLevelUp);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("levelUp", handleLevelUp);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {levelData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setLevelData(null)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="surface p-10 rounded-[32px] text-center max-w-sm w-full border border-gold/30 shadow-[0_0_50px_rgba(255,215,0,0.1)] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gold/5 animate-pulse" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-2">
                {isOwner ? "👑 OWNER LEVEL UP" : "🎉 LEVEL UP!"}
              </h2>
              <div className="text-6xl font-black text-gold my-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                {levelData.level}
              </div>
              <p className="text-sm font-bold tracking-[0.2em] uppercase text-white mb-6">
                {levelData.title}
              </p>
              <p className="text-muted italic">
                {isOwner ? `"Boss is cooking."` : `"Bro is getting serious."`}
              </p>
              
              <button 
                onClick={() => setLevelData(null)}
                className="mt-8 w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform"
              >
                CONTINUE
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
