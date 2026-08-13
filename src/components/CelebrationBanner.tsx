"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCelebration } from "@/app/context/CelebrationContext";
import { PartyPopper } from "lucide-react";

export default function CelebrationBanner() {
  const { celebration, replay, markAsSeen } = useCelebration();

  if (!celebration?.bannerEnabled) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="fixed top-0 left-0 right-0 z-[45] bg-[var(--accent)] text-black shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 md:py-3 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-3">
            <PartyPopper size={18} className="animate-bounce" />
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <span className="font-gamer-heading text-lg md:text-xl tracking-widest leading-none">
                🎉 100K ACHIEVED
              </span>
              <span className="font-gamer-mono text-[10px] md:text-xs tracking-[0.1em] font-semibold opacity-90 leading-none">
                SNAZZYZONE HAS DONE IT. NOW WHERE'S THE PARTY? 🍕
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              // Replay the full celebration!
              replay();
            }}
            className="w-full md:w-auto bg-black text-white px-4 py-1.5 rounded-lg font-gamer-heading tracking-widest text-sm hover:bg-black/80 transition-colors"
          >
            CELEBRATE
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
