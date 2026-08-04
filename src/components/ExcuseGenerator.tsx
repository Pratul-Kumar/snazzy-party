"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ReactTyped } from "react-typed";

const EXCUSES = [
  "I'm busy editing.",
  "Next Sunday bro.",
  "Silver Play Button first.",
  "Sponsor payment pending.",
  "My wallet is buffering.",
  "My mom said no.",
  "Budget is under maintenance.",
  "Restaurant server is down.",
  "I forgot.",
  "I thought you forgot.",
];

export default function ExcuseGenerator() {
  const [currentExcuse, setCurrentExcuse] = useState<string | null>(null);

  const generateExcuse = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ["#555555", "#ff3838"] });
    const randomExcuse = EXCUSES[Math.floor(Math.random() * EXCUSES.length)];
    setCurrentExcuse(null); // trigger re-render for animation
    setTimeout(() => setCurrentExcuse(`"${randomExcuse}"`), 50);
  };

  return (
    <section id="excuses" className="py-12">
      <div className="glass-card p-8 md:p-16 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-warning/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
        
        <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight relative z-10">
          The Automated <span className="text-accent">Excuse</span> Generator
        </h2>
        <p className="text-gray-400 mb-10 relative z-10">Simulating real SnazzyZone responses since 2020.</p>
        
        <div className="min-h-[120px] flex items-center justify-center mb-10 relative z-10">
          <AnimatePresence mode="wait">
            {currentExcuse ? (
              <motion.div
                key={currentExcuse}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="text-2xl md:text-4xl font-black text-white italic glow-text"
              >
                <ReactTyped strings={[currentExcuse]} typeSpeed={40} showCursor={false} />
              </motion.div>
            ) : (
              <div className="text-xl md:text-2xl font-medium text-gray-600 italic">
                Click the button below to generate an excuse...
              </div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={generateExcuse}
          className="relative z-10 bg-white text-black hover:bg-gray-200 font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105 active:scale-95 text-lg"
        >
          Generate Excuse
        </button>
      </div>
    </section>
  );
}
