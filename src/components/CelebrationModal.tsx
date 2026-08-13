"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useCelebration } from "@/app/context/CelebrationContext";
import { X, Share2, PartyPopper } from "lucide-react";
import { useShare } from "@/app/context/ShareContext";

export default function CelebrationModal() {
  const { celebration, hasSeen, isTestMode, markAsSeen, setTestMode } = useCelebration();
  const { openShare } = useShare();
  const [showContent, setShowContent] = useState(false);

  // Determine if we should show the modal
  const isActive = (celebration?.enabled && !hasSeen) || isTestMode;

  useEffect(() => {
    if (isActive) {
      // Sequence timing
      const timer = setTimeout(() => {
        setShowContent(true);
        triggerConfetti();
      }, 1500); // delay content so the "Achievement Unlocked" can play first

      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isActive]);

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#D8B24C', '#ffffff', '#22c55e']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#D8B24C', '#ffffff', '#22c55e']
      });
    }, 250);
  };

  const handleClose = () => {
    if (isTestMode) {
      setTestMode(false);
    } else {
      markAsSeen();
    }
  };

  const handleShare = () => {
    openShare("We did it! 100K Subscribers on SnazzyZone! 🎉", window.location.origin);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl overflow-hidden"
        >
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_50%)] opacity-10 pointer-events-none" />

          {/* Initial Achievement Notification (Small) */}
          <AnimatePresence>
            {!showContent && (
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -50, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className="absolute flex items-center gap-4 bg-[#111] border border-white/10 p-4 rounded-2xl shadow-[0_0_40px_rgba(216,178,76,0.15)]"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div>
                  <div className="font-gamer-mono text-[10px] tracking-[0.2em] text-[var(--accent)]">
                    ACHIEVEMENT UNLOCKED
                  </div>
                  <div className="font-gamer-heading text-xl tracking-wider mt-1 text-white">
                    100K SNAZZY BOIS
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Sequence */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center justify-center text-center p-6 w-full max-w-lg mx-auto"
              >
                {/* Large 100K */}
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.6, duration: 1, delay: 0.2 }}
                  className="font-gamer-heading text-8xl md:text-9xl text-[var(--accent)] tracking-tighter drop-shadow-[0_0_40px_rgba(216,178,76,0.4)]"
                  style={{ textShadow: "0 0 40px rgba(216, 178, 76, 0.4)" }}
                >
                  100K
                </motion.div>

                {/* SnazzyZone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-2 font-gamer-mono text-sm md:text-base tracking-[0.5em] text-white"
                >
                  SNAZZYZONE
                </motion.div>

                {/* 100,000 Subscribers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="mt-6 font-gamer-heading text-3xl md:text-4xl tracking-widest text-white"
                >
                  100,000 SUBSCRIBERS
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                  className="mt-8 font-gamer-body text-xl md:text-2xl text-[var(--muted)] leading-relaxed max-w-sm"
                >
                  THE MILESTONE IS REAL.
                  <br /><br />
                  <span className="text-white">NOW... WHERE'S THE PARTY? 🍕</span>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 3 }}
                  className="mt-12 flex flex-col w-full gap-4"
                >
                  <button
                    onClick={triggerConfetti}
                    className="w-full flex items-center justify-center gap-3 bg-[var(--accent)] text-black min-h-[56px] rounded-2xl font-gamer-heading text-xl tracking-widest hover:brightness-110 active:scale-95 transition-all"
                  >
                    <PartyPopper size={20} />
                    CELEBRATE
                  </button>
                  
                  <div className="flex gap-4 w-full">
                    <button
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white min-h-[56px] rounded-2xl font-gamer-heading text-lg tracking-widest transition-all"
                    >
                      <Share2 size={18} />
                      SHARE
                    </button>
                    
                    <button
                      onClick={handleClose}
                      className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:bg-white/5 text-[var(--muted)] hover:text-white min-h-[56px] rounded-2xl font-gamer-heading text-lg tracking-widest transition-all"
                    >
                      <X size={18} />
                      CLOSE
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
