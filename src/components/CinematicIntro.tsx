"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicIntro() {
  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("sz_intro_played")) {
      setShowIntro(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted || !showIntro) return;
    
    const timers = [
      setTimeout(() => setStep(1), 3000), // "30 DECEMBER 2021"
      setTimeout(() => setStep(2), 6000), // "It started with a channel."
      setTimeout(() => setStep(3), 9000), // "SNAZZYZONE"
      setTimeout(() => setStep(4), 12000), // "Still here."
      setTimeout(() => skipIntro(), 15000) // End
    ];

    return () => timers.forEach(clearTimeout);
  }, [mounted, showIntro]);

  const skipIntro = () => {
    sessionStorage.setItem("sz_intro_played", "true");
    setShowIntro(false);
  };

  if (!mounted || !showIntro) return null;

  const messages = [
    <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="text-xl md:text-2xl tracking-[0.2em] font-light text-white/80">30 DECEMBER 2021</motion.div>,
    <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="text-2xl md:text-4xl font-serif text-white/90">It started with a channel.</motion.div>,
    <motion.div key="3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 1.5 }} className="text-5xl md:text-8xl font-black tracking-tighter text-white">SNAZZYZONE</motion.div>,
    <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="text-2xl md:text-4xl italic text-white/70">Still here.</motion.div>
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] text-white">
      <AnimatePresence mode="wait">
        {messages[step]}
      </AnimatePresence>
      <button 
        onClick={skipIntro}
        className="absolute bottom-8 right-8 text-sm tracking-widest text-white/50 hover:text-white transition-colors uppercase font-mono"
      >
        [ SKIP INTRO ]
      </button>
    </div>
  );
}
