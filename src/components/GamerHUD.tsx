"use client";

import { motion } from "framer-motion";
import { useCelebration } from "@/app/context/CelebrationContext";

interface GamerHUDProps {
  playerName?: string;
  onOpenMenu: () => void;
}

export default function GamerHUD({ playerName = "VISITOR", onOpenMenu }: GamerHUDProps) {
  const { celebration, hasSeen, replay } = useCelebration();
  return (
    <div className="fixed inset-0 z-40 pointer-events-none p-4 md:p-6 no-select">
      
      {/* ═══ TOP LEFT — Logo + Identity ═══ */}
      <a 
        href="https://www.youtube.com/@SnazzyZone" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-start gap-3 pointer-events-auto cursor-pointer group hover:opacity-80 hover:scale-105 transition-all duration-300"
      >
        {/* Real logo */}
        <img 
          src="/logo.jpg" 
          alt="SnazzyZone" 
          className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[var(--accent)]/30 opacity-90 mt-0.5 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-shadow"
        />
        <div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-gamer-mono text-[8px] md:text-[9px] tracking-[0.3em] text-[var(--accent)] group-hover:text-white transition-colors">
              LIVE
            </span>
          </div>
          <h1 className="font-gamer-heading text-base md:text-lg tracking-[0.12em] text-[var(--text)] leading-none mt-0.5">
            SNAZZYZONE
          </h1>
          <span className="font-gamer-mono text-[7px] md:text-[8px] tracking-[0.2em] text-[var(--muted)] block mt-0.5">
            PLAYER WORLD · 01
          </span>
        </div>
      </a>

      {/* ═══ TOP RIGHT — Player Info & Replay ═══ */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 text-right flex flex-col items-end">
        <div>
          <span className="font-gamer-mono text-[7px] md:text-[8px] tracking-[0.25em] text-[var(--muted)] block">
            PLAYER
          </span>
          <span className="font-gamer-heading text-xs md:text-sm tracking-wider text-[var(--text)] block leading-tight">
            {playerName}
          </span>
          <span className="font-gamer-mono text-[7px] md:text-[8px] tracking-[0.2em] text-[var(--accent)] block mt-0.5">
            LVL 01
          </span>
        </div>
        
        {celebration?.enabled === true && hasSeen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={replay}
            className="mt-4 pointer-events-auto flex items-center gap-2 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] px-3 py-1.5 rounded-lg transition-colors"
          >
            <span className="text-sm">🏆</span>
            <span className="font-gamer-mono text-[8px] tracking-[0.2em] font-bold">100K</span>
          </motion.button>
        )}
      </div>

      {/* ═══ BOTTOM LEFT — Mission Status ═══ */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-[var(--accent-secondary)]" />
          <span className="font-gamer-mono text-[7px] md:text-[8px] tracking-[0.25em] text-[var(--muted)]">
            MISSION
          </span>
        </div>
        <span className="font-gamer-mono text-[8px] md:text-[9px] tracking-[0.2em] text-[var(--accent-secondary)] block mt-0.5">
          ACTIVE
        </span>
      </div>

      {/* ═══ BOTTOM RIGHT — Menu Button ═══ */}
      <motion.button 
        onClick={onOpenMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto absolute bottom-4 right-4 md:bottom-6 md:right-6 
          font-gamer-mono text-[8px] md:text-[10px] tracking-[0.3em] text-[var(--muted)] 
          hover:text-[var(--accent)] transition-colors duration-300
          border border-[var(--muted)]/15 hover:border-[var(--accent)]/30
          px-3 py-1.5 md:px-4 md:py-2
          min-w-[48px] min-h-[48px] flex items-center justify-center
          bg-[var(--bg)]/20 backdrop-blur-sm"
      >
        [ MENU ]
      </motion.button>

      {/* ═══ CORNER MARKS — Camera frame ═══ */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--accent)]/15 pointer-events-none hidden md:block" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--accent)]/15 pointer-events-none hidden md:block" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[var(--accent)]/15 pointer-events-none hidden md:block" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--accent)]/15 pointer-events-none hidden md:block" />

      {/* ═══ THIN TOP LINE — subtle frame ═══ */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/10 to-transparent pointer-events-none" />
    </div>
  );
}
