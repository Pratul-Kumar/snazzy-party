"use client";

import { useEffect, useState } from "react";
import { subscribeToExcuses, trackGeneratedExcuse } from "../lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const ALL_EXCUSES = [
  "Busy Editing", "Next Sunday", "Silver Play Button First", "Budget Updating", 
  "Restaurant Server Down", "Mom Said No", "Wallet Loading", "Internet Lag", 
  "Waiting For 200K", "I Forgot", "I Thought You Forgot", "My Squad Was Offline", 
  "Tournament Season", "Dog ate my wallet", "Bank holiday", "Stuck in traffic"
];

export default function ExcuseHallOfFame() {
  const [excuses, setExcuses] = useState<Record<string, number>>({});
  const [generating, setGenerating] = useState(false);
  const [recentExcuse, setRecentExcuse] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToExcuses((data) => {
      setExcuses(data);
    });
    return () => unsubscribe();
  }, []);

  // Sort and get top 3
  const topExcuses = Object.entries(excuses)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const generateExcuse = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 600));
    const random = ALL_EXCUSES[Math.floor(Math.random() * ALL_EXCUSES.length)];
    setRecentExcuse(random);
    await trackGeneratedExcuse(random);
    setGenerating(false);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <section className="section-premium">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-8 uppercase tracking-tight">
          Top Excuses 🏆
        </h2>

        <div className="space-y-4 mb-10">
          {topExcuses.map(([excuse, count], index) => {
            const medals = ["🥇", "🥈", "🥉"];
            return (
              <motion.div
                key={excuse}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="surface p-4 sm:p-5 flex items-center gap-4"
              >
                <div className="text-3xl">{medals[index]}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-black text-white">{excuse}</h4>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-accent">{count}</div>
                  <div className="text-[10px] font-bold uppercase text-muted tracking-widest">Times Used</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="surface p-8 text-center border border-dashed border-white/20">
          <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Today's Excuse</p>
          
          <AnimatePresence mode="wait">
            {generating ? (
              <motion.div key="loading" exit={{ opacity: 0 }} className="h-12 flex items-center justify-center">
                <span className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
              </motion.div>
            ) : recentExcuse ? (
              <motion.div key={recentExcuse} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-12 flex items-center justify-center">
                <p className="text-xl font-black text-white">"{recentExcuse}"</p>
              </motion.div>
            ) : (
              <div className="h-12 flex items-center justify-center">
                <p className="text-sm font-medium text-muted">Generate a random excuse</p>
              </div>
            )}
          </AnimatePresence>

          <button 
            onClick={generateExcuse}
            disabled={generating}
            className="mt-6 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-widest transition-colors w-full active:scale-95"
          >
            Generate Excuse
          </button>
        </div>
      </div>
    </section>
  );
}
