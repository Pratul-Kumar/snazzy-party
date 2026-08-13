"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useCelebration } from "@/app/context/CelebrationContext";
import { X, Share2, Volume2, VolumeX, AlertTriangle } from "lucide-react";
import { useShare } from "@/app/context/ShareContext";

export default function CelebrationModal() {
  const { celebration, hasSeen, isTestMode, markAsSeen, setTestMode } = useCelebration();
  const { openShare } = useShare();
  
  const [stage, setStage] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isActive = (celebration?.enabled && !hasSeen) || isTestMode;

  useEffect(() => {
    const saved = localStorage.getItem("snazzyzone_celebration_sound");
    if (saved !== null) {
      setSoundEnabled(saved === "true");
    }
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("snazzyzone_celebration_sound", String(next));
    if (audioRef.current && !next) {
      audioRef.current.pause();
    }
  };

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#D8B24C', '#ffffff', '#22c55e'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#D8B24C', '#ffffff', '#22c55e'] });
    }, 250);
  };

  const continueSequence = () => {
    triggerConfetti();
    setStage(4);
    setTimeout(() => setStage(5), 2000);
    setTimeout(() => setStage(6), 4000);
  };

  const tryPlaySoundAndContinue = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().then(() => {
        continueSequence();
      }).catch(err => {
        if (err.name === 'NotAllowedError') {
          setAutoplayBlocked(true);
        } else {
          continueSequence();
        }
      });
    } else {
      continueSequence();
    }
  };

  useEffect(() => {
    if (isActive) {
      setStage(1); 
      const t1 = setTimeout(() => setStage(2), 2000); 
      const t2 = setTimeout(() => {
        setStage(3);
        tryPlaySoundAndContinue();
      }, 4000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      setStage(0);
      setAutoplayBlocked(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const handleManualStart = () => {
    setAutoplayBlocked(false);
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    continueSequence();
  };

  const handleClose = () => {
    if (isTestMode) setTestMode(false);
    else markAsSeen();
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
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-3xl overflow-y-auto p-4 md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_50%)] opacity-10 pointer-events-none" />
          
          <audio ref={audioRef} src="/audio/100k-band-baja.mp3" preload="auto" />

          {/* Sound Toggle */}
          <button 
            onClick={toggleSound}
            className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* Top Notifications */}
          <div className="absolute top-8 left-0 right-0 flex flex-col items-center gap-2 z-40 pointer-events-none">
            <AnimatePresence>
              {stage >= 1 && (
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-black/50 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md text-xs font-gamer-mono text-white tracking-[0.2em]"
                >
                  SYSTEM: <span className="text-[var(--accent)] font-bold">100K DETECTED</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {stage >= 1 && (
                <motion.div
                  initial={{ y: -20, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                  className="flex items-center gap-3 bg-[#111] border border-white/10 px-6 py-3 rounded-2xl shadow-[0_0_40px_rgba(216,178,76,0.15)] mt-2"
                >
                  <div className="text-2xl">🎉</div>
                  <div className="font-gamer-mono text-[10px] tracking-[0.2em] text-[var(--accent)]">
                    ACHIEVEMENT UNLOCKED
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-lg mt-16 md:mt-0">
            
            {/* Band Baja Graphic (Appears on top on mobile) */}
            <AnimatePresence>
              {stage >= 3 && !autoplayBlocked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                  className="mb-8 relative"
                >
                  <div className="absolute inset-0 bg-gold/20 blur-[50px] rounded-full pointer-events-none" />
                  <div className="relative bg-[#111] border border-gold/30 p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4">
                    <div className="flex gap-4 text-4xl md:text-5xl items-end">
                      <motion.div animate={{ rotate: [-5, 5, -5], y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>🎺</motion.div>
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} className="text-5xl md:text-6xl">🥁</motion.div>
                      <motion.div animate={{ rotate: [5, -5, 5], y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>🎺</motion.div>
                    </div>
                    <div className="font-gamer-heading text-xl text-gold tracking-widest bg-gold/10 px-4 py-1 rounded-full border border-gold/20">
                      BAND BAJA DEPLOYED
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 100K Text */}
            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.6, duration: 1 }}
                  className="font-gamer-heading text-8xl md:text-9xl text-[var(--accent)] tracking-tighter drop-shadow-[0_0_40px_rgba(216,178,76,0.4)]"
                  style={{ textShadow: "0 0 40px rgba(216, 178, 76, 0.4)" }}
                >
                  100K
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-2 font-gamer-mono text-sm md:text-base tracking-[0.5em] text-white"
                >
                  SNAZZYZONE
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-6 font-gamer-heading text-3xl md:text-4xl tracking-widest text-white"
                >
                  100,000 SUBSCRIBERS
                </motion.div>
              )}
            </AnimatePresence>

            {/* Autoplay Blocked state */}
            <AnimatePresence>
              {autoplayBlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 w-full"
                >
                  <button
                    onClick={handleManualStart}
                    className="w-full flex items-center justify-center gap-3 bg-[var(--accent)] text-black min-h-[64px] rounded-2xl font-gamer-heading text-xl md:text-2xl tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(216,178,76,0.5)] animate-pulse"
                  >
                    <Volume2 size={24} />
                    TAP TO START BAND BAJA
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Follow up copy */}
            <AnimatePresence>
              {stage >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex flex-col gap-2 font-gamer-body text-xl md:text-2xl text-[var(--muted)]"
                >
                  <span className="text-white">🥁 BAND BAJA AAGYA.</span>
                  <span className="text-white">100K HO GAYA.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {stage >= 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="mt-6 font-gamer-heading text-3xl md:text-4xl text-white tracking-wider"
                >
                  AB PARTY KAHAAN HAI, BHAI? 🍕😂
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons and Status */}
            <AnimatePresence>
              {stage >= 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 flex flex-col w-full gap-4 pb-8"
                >
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl mb-4">
                    <div className="flex items-center justify-center gap-2 text-red-500 font-gamer-mono text-sm tracking-widest">
                      <AlertTriangle size={16} />
                      PARTY STATUS: <span className="font-bold">STILL PENDING</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-2 bg-[var(--accent)] text-black min-h-[56px] rounded-2xl font-gamer-heading text-lg tracking-widest hover:brightness-110 active:scale-95 transition-all"
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
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
