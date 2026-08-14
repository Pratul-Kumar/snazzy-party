"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const games = [
  {
    id: "fs26",
    index: "01",
    title: "FARMING\nSIMULATOR\n2026",
    shortTitle: "FARMING SIMULATOR",
    label: "MOST PLAYED",
    desc: "Where a quick session is never actually quick.",
    envClass: "env-farm",
    accentColor: "#6F8F58",
    bgGradient: "radial-gradient(ellipse 120% 60% at 50% 80%, rgba(111,143,88,0.15) 0%, transparent 60%)",
  },
  {
    id: "cs2",
    index: "02",
    title: "CITIES:\nSKYLINES\nII",
    shortTitle: "CITIES: SKYLINES II",
    label: "",
    desc: "Build a city. Destroy traffic. Pretend it was planned.",
    envClass: "env-city",
    accentColor: "#3b82f6",
    bgGradient: "radial-gradient(ellipse 120% 60% at 50% 80%, rgba(59,130,246,0.1) 0%, transparent 60%)",
  },
  {
    id: "ml",
    index: "03",
    title: "MANOR\nLORDS",
    shortTitle: "MANOR LORDS",
    label: "",
    desc: "Build an empire. Try not to lose it.",
    envClass: "env-medieval",
    accentColor: "#92400e",
    bgGradient: "radial-gradient(ellipse 120% 60% at 50% 80%, rgba(120,53,15,0.12) 0%, transparent 60%)",
  },
  {
    id: "raft",
    index: "04",
    title: "RAFT",
    shortTitle: "RAFT",
    label: "",
    desc: "Started with a raft. Somehow still alive.",
    envClass: "env-ocean",
    accentColor: "#0ea5e9",
    bgGradient: "radial-gradient(ellipse 120% 60% at 50% 80%, rgba(14,165,233,0.1) 0%, transparent 60%)",
  },
  {
    id: "other",
    index: "05",
    title: "OTHER\nGAMES",
    shortTitle: "OTHER",
    label: "",
    desc: "The wildcards. From indie gems to unexpected diversions.",
    envClass: "",
    accentColor: "#D8B24C",
    bgGradient: "radial-gradient(ellipse 120% 60% at 50% 80%, rgba(216,178,76,0.08) 0%, transparent 60%)",
  },
];

export default function GameLibraryV3() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = games[activeIndex];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % games.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ═══ MOBILE GAME LIBRARY (< 768px) ═══ */}
      <section className="md:hidden w-full py-16 px-4">
        <div className="mb-8">
          <span className="font-gamer-mono text-[10px] tracking-[0.4em] text-[var(--muted)]">
            // GAME LIBRARY
          </span>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 hide-scrollbar">
          {games.map((game, i) => (
            <div key={game.id} className="snap-center shrink-0 w-[85vw] relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl">
              {/* Graphic */}
              <div className="absolute inset-0 z-0">
                {game.id === "fs26" && <img src="/images/game_farming.jpg" alt={game.shortTitle} className="w-full h-full object-cover" />}
                {game.id === "cs2" && <img src="/images/game_city.jpg" alt={game.shortTitle} className="w-full h-full object-cover" />}
                {game.id === "ml" && <img src="/images/game_medieval.jpg" alt={game.shortTitle} className="w-full h-full object-cover" />}
                {game.id === "raft" && <img src="/images/game_raft.jpg" alt={game.shortTitle} className="w-full h-full object-cover" />}
                {game.id === "other" && <div className="w-full h-full bg-[var(--surface)]" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-gamer-mono text-[10px] tracking-[0.3em]" style={{ color: game.accentColor }}>{game.index}</span>
                  {game.label && (
                    <span className="font-gamer-mono text-[8px] tracking-[0.2em] px-2 py-0.5 rounded-full border" style={{ borderColor: game.accentColor, color: game.accentColor }}>
                      {game.label}
                    </span>
                  )}
                </div>
                
                <h3 className="font-gamer-heading text-4xl leading-[0.9] text-white tracking-wider mb-4 whitespace-pre-line shadow-black drop-shadow-md">
                  {game.title}
                </h3>
                
                <p className="font-gamer-mono text-[9px] tracking-[0.1em] text-white/70 uppercase">
                  {game.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DESKTOP GAME LIBRARY (≥ 768px) ═══ */}
      <section ref={ref} className="hidden md:flex relative min-h-screen w-full flex-col justify-center py-20 md:py-0 overflow-hidden">
        
        {/* ═══ ENVIRONMENT BACKGROUND — shifts per game ═══ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {active.id === "fs26" && (
              <img src="/images/game_farming.jpg" alt="Farming" className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[70%] h-full object-cover object-left opacity-30 mix-blend-screen" />
            )}
            {active.id === "cs2" && (
              <img src="/images/game_city.jpg" alt="City" className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[70%] h-full object-cover object-left opacity-30 mix-blend-screen" />
            )}
            {active.id === "ml" && (
              <img src="/images/game_medieval.jpg" alt="Medieval" className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[70%] h-full object-cover object-left opacity-30 mix-blend-screen" />
            )}
            {active.id === "raft" && (
              <img src="/images/game_raft.jpg" alt="Raft" className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[70%] h-full object-cover object-left opacity-30 mix-blend-screen" />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)] z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/80 to-transparent z-10" />
            
            <div className="absolute inset-0 pointer-events-none" style={{ background: active.bgGradient }} />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <span className="font-gamer-mono text-[9px] md:text-[10px] tracking-[0.4em] text-[var(--muted)]">
              // GAME LIBRARY
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:min-h-[80vh] gap-8 md:gap-0">
            
            {/* ═══ LEFT — Selected Game (large typography, no card) ═══ */}
            <div className="flex-1 md:pr-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Game label */}
                  {active.label && (
                    <span className="font-gamer-mono text-[9px] tracking-[0.3em] block mb-4" style={{ color: active.accentColor }}>
                      {active.label}
                    </span>
                  )}

                  {/* Game title — HUGE */}
                  <h2 className="font-gamer-heading text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.85] tracking-[0.02em] text-[var(--text)] whitespace-pre-line">
                    {active.title}
                  </h2>

                  {/* Description — floating below, not in a card */}
                  <div className="mt-8 md:mt-12 mission-marker">
                    <p className="font-gamer-body text-lg md:text-xl text-[var(--muted)] max-w-lg leading-relaxed">
                      {active.desc}
                    </p>
                  </div>

                  {/* Index indicator */}
                  <div className="mt-8 flex items-center gap-3">
                    <span className="font-gamer-mono text-[10px] tracking-[0.3em]" style={{ color: active.accentColor }}>
                      {active.index}
                    </span>
                    <div className="h-[1px] w-12" style={{ backgroundColor: active.accentColor, opacity: 0.3 }} />
                    <span className="font-gamer-mono text-[10px] tracking-[0.3em] text-[var(--muted)]">
                      / 05
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ═══ RIGHT — Game Selector (vertical list, not cards) ═══ */}
            <div className="w-full md:w-64 lg:w-72 flex flex-col">
              {games.map((game, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={game.id}
                    onClick={() => setActiveIndex(i)}
                    className={`group text-left py-3 md:py-4 px-4 transition-all duration-300 border-l-2 min-h-[48px] flex items-center gap-3 ${
                      isActive 
                        ? "border-current bg-white/[0.02]" 
                        : "border-transparent hover:border-[var(--muted)]/30 opacity-40 hover:opacity-80"
                    }`}
                    style={{ borderColor: isActive ? game.accentColor : undefined }}
                  >
                    <span className={`font-gamer-mono text-[10px] tracking-[0.2em] transition-colors ${
                      isActive ? "" : "text-[var(--muted)]"
                    }`} style={{ color: isActive ? game.accentColor : undefined }}>
                      {game.index}
                    </span>
                    <span className={`font-gamer-heading text-sm tracking-wider transition-colors ${
                      isActive ? "text-[var(--text)]" : "text-[var(--muted)] group-hover:text-[var(--text)]"
                    }`}>
                      {game.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
