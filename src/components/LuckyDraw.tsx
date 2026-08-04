"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const REWARDS = [
  "🍕 One Pizza",
  "💀 Another Excuse",
  "🍗 One Biryani",
  "💀 Another Excuse",
  "🎂 Cake",
  "😂 Nothing",
  "💀 Another Excuse",
  "💀 Another Excuse",
];

export default function LuckyDraw() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = async () => {
    setSpinning(true);
    setResult(null);
    
    // Fake spin delay
    await new Promise(r => setTimeout(r, 2000));
    
    // 80% chance to land on "Another Excuse" or "Nothing"
    const isTroll = Math.random() < 0.8;
    const finalResult = isTroll 
      ? (Math.random() < 0.5 ? "💀 Another Excuse" : "😂 Nothing")
      : REWARDS[Math.floor(Math.random() * REWARDS.length)];

    setResult(finalResult);
    setSpinning(false);

    if (finalResult.includes("Excuse") || finalResult.includes("Nothing")) {
      // Sad confetti?
      confetti({ particleCount: 30, spread: 100, origin: { y: 0.7 }, colors: ["#555", "#333"] });
    } else {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
    }
  };

  return (
    <section className="section-premium !py-12">
      <div className="w-full max-w-md mx-auto text-center">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Lucky Draw 🎁</h2>
        <p className="text-sm font-bold text-muted mb-8">Can you win a free meal?</p>

        <div className="surface p-8 relative overflow-hidden mb-6">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
          
          <div className="h-20 flex items-center justify-center border-y-2 border-white/5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {spinning ? (
                <motion.div
                  key="spinning"
                  animate={{ y: [0, -400] }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                  className="absolute flex flex-col gap-4 text-2xl font-black text-white/50"
                >
                  {REWARDS.map((r, i) => <div key={i}>{r}</div>)}
                  {REWARDS.map((r, i) => <div key={i+"dup"}>{r}</div>)}
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-2xl font-black ${result.includes('Excuse') || result.includes('Nothing') ? 'text-red-500' : 'text-gold'}`}
                >
                  {result}
                </motion.div>
              ) : (
                <div className="text-2xl font-black text-muted">???</div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="bg-gold text-black w-full py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:scale-100"
        >
          {spinning ? "SPINNING..." : "TRY YOUR LUCK"}
        </button>
      </div>
    </section>
  );
}
