"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameLoaderProps {
  onComplete: () => void;
}

const PROGRESS_BARS = [
  "Mounting World Engine",
  "Loading Player Profile",
  "Syncing Quests",
  "Connecting to Arena"
];

export function GameLoader({ onComplete }: GameLoaderProps) {
  const [phase, setPhase] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const loaded = sessionStorage.getItem('sz_loaded');
    if (loaded) {
      // Short boot for returning visitors
      setPhase(6); 
      const timer = setTimeout(() => {
        handleComplete();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Full cinematic boot sequence
      setPhase(0);
      
      const timings = [
        1000, // Phase 0 -> 1: Init -> Logo
        1500, // Phase 1 -> 2: Logo -> Date
        2000, // Phase 2 -> 3: Date -> Journey
        2000, // Phase 3 -> 4: Journey -> Status
        2000, // Phase 4 -> 5: Status -> Quest
        2000, // Phase 5 -> 6: Quest -> Loading Bars
      ];

      let currentPhase = 0;
      const advancePhase = () => {
        if (currentPhase < timings.length) {
          const timeout = setTimeout(() => {
            currentPhase++;
            setPhase(prev => {
              if (prev < 6) return prev + 1;
              return prev;
            });
            advancePhase();
          }, timings[currentPhase]);
          return () => clearTimeout(timeout);
        } else {
          // Reached phase 6, wait a bit then complete
          setTimeout(() => {
            handleComplete();
          }, 1500);
        }
      };
      
      const cleanup = advancePhase();
      return cleanup;
    }
  }, []);

  const handleComplete = () => {
    setSkip(true);
    setTimeout(() => {
      sessionStorage.setItem('sz_loaded', 'true');
      onComplete();
    }, 800); // Wait for transition
  };

  const handleSkip = () => {
    if (phase < 6) {
      setPhase(6);
      setTimeout(handleComplete, 1200);
    }
  };

  if (!isMounted) return null;
  if (phase === -1 && sessionStorage.getItem('sz_loaded')) return null;

  return (
    <AnimatePresence>
      {!skip && (
        <motion.div 
          className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center overflow-hidden font-gamer-mono"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Film Grain & Scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay z-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />
          <div className="absolute inset-0 pointer-events-none z-0" 
            style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px' }} 
          />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.8)_100%)] z-0" />

          {/* Skip Button */}
          {phase < 6 && (
            <button 
              onClick={handleSkip}
              className="absolute top-6 right-6 z-50 text-[10px] tracking-[0.3em] text-[var(--muted)] hover:text-white transition-colors uppercase p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              [ SKIP ]
            </button>
          )}

          <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6 text-center">
            
            <AnimatePresence mode="wait">
              {/* PHASE 0: INITIALIZING */}
              {phase === 0 && (
                <motion.div
                  key="phase-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[10px] tracking-[0.3em] text-[var(--muted)] mb-2 uppercase">SNAZZYZONE SYSTEM</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs tracking-[0.2em] text-[var(--text)] uppercase">INITIALIZING</span>
                    <motion.div 
                      className="w-2 h-4 bg-[var(--text)]"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              )}

              {/* PHASE 1: LOGO */}
              {phase === 1 && (
                <motion.div
                  key="phase-1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <motion.img 
                    src="/logo.jpg" 
                    alt="Logo"
                    className="w-16 h-16 rounded-full mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  />
                  <h1 className="font-gamer-heading text-4xl text-[var(--text)] tracking-widest mb-3" style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>
                    SNAZZYZONE
                  </h1>
                  <span className="text-[9px] tracking-[0.4em] text-[var(--muted)] uppercase">PLAYER WORLD</span>
                </motion.div>
              )}

              {/* PHASE 2: ORIGIN */}
              {phase === 2 && (
                <motion.div
                  key="phase-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <span className="font-gamer-heading text-3xl text-[var(--text)] tracking-wider mb-6">30 DECEMBER 2021</span>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xs tracking-[0.2em] text-[var(--muted)] uppercase mb-4"
                  >
                    A CHANNEL WAS STARTED.
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-xs tracking-[0.2em] text-[var(--text)] uppercase"
                  >
                    THE JOURNEY BEGAN.
                  </motion.div>
                </motion.div>
              )}

              {/* PHASE 3: STORY */}
              {phase === 3 && (
                <motion.div
                  key="phase-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center max-w-sm"
                >
                  <div className="flex flex-col gap-4 mb-8">
                    <span className="text-xs tracking-[0.2em] text-[var(--muted)] uppercase">SOME DAYS: UPLOAD.</span>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-xs tracking-[0.2em] text-[var(--muted)] uppercase"
                    >
                      SOME DAYS: PAUSE.
                    </motion.span>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                    className="font-gamer-heading text-3xl text-[#ff3366] tracking-wider leading-tight uppercase"
                  >
                    BUT THE GAME<br/>WASN'T OVER.
                  </motion.div>
                </motion.div>
              )}

              {/* PHASE 4: STATUS */}
              {phase === 4 && (
                <motion.div
                  key="phase-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[10px] tracking-[0.3em] text-[var(--muted)] mb-2 uppercase">PLAYER STATUS</span>
                  <span className="font-gamer-heading text-4xl text-[var(--text)] tracking-wider mb-8 uppercase">STILL HERE.</span>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex flex-col items-center mt-6"
                  >
                    <span className="text-[10px] tracking-[0.3em] text-[var(--muted)] mb-2 uppercase">CURRENT ERA</span>
                    <span className="font-gamer-heading text-3xl text-[var(--accent)] tracking-widest uppercase">2026</span>
                  </motion.div>
                </motion.div>
              )}

              {/* PHASE 5: QUEST */}
              {phase === 5 && (
                <motion.div
                  key="phase-5"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center bg-black/40 p-8 border border-[var(--accent)]/20 w-full"
                >
                  <span className="text-[9px] tracking-[0.4em] text-[var(--muted)] mb-6 uppercase">CURRENT QUEST</span>
                  <span className="text-4xl mb-4">🚗</span>
                  <span className="font-gamer-heading text-3xl text-[var(--text)] tracking-wider mb-8 uppercase text-center">GET DAD<br/>A CAR</span>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] tracking-[0.3em] text-[var(--muted)] uppercase">QUEST STATUS</span>
                    <span className="text-[10px] tracking-[0.3em] text-[var(--accent)] flex items-center gap-2 uppercase">
                      <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                      ACTIVE
                    </span>
                  </div>
                </motion.div>
              )}

              {/* PHASE 6: FINAL PROGRESS */}
              {phase === 6 && (
                <motion.div
                  key="phase-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center w-full"
                >
                  <h1 className="font-gamer-heading text-5xl md:text-7xl text-[var(--text)] tracking-widest mb-12 uppercase">
                    SNAZZYZONE
                  </h1>

                  <div className="w-full max-w-xs space-y-4 mb-16">
                    {PROGRESS_BARS.map((label, i) => (
                      <div key={label} className="w-full">
                        <div className="flex justify-between mb-1">
                          <span className="text-[8px] tracking-[0.2em] text-[var(--muted)] uppercase">{label}</span>
                          <span className="text-[8px] tracking-[0.2em] text-[var(--text)] uppercase">OK</span>
                        </div>
                        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                          <motion.div 
                            className="absolute left-0 top-0 bottom-0 bg-[var(--text)]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-[8px] tracking-[0.2em] text-[var(--accent)] uppercase">ARENA</span>
                        <span className="text-[8px] tracking-[0.2em] text-[var(--accent)] uppercase animate-pulse">READY</span>
                      </div>
                      <div className="w-full h-[2px] bg-[var(--accent)]" />
                    </div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-col items-center"
                  >
                    <span className="font-gamer-heading text-2xl text-[var(--text)] tracking-widest uppercase animate-pulse">
                      WORLD READY
                    </span>
                    <span className="text-[9px] tracking-[0.4em] text-[var(--muted)] mt-4 uppercase">
                      [ ENTER WORLD ]
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
