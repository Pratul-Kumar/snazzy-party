"use client";

import { motion } from "framer-motion";

export default function CinematicFinale() {
  return (
    <footer className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col justify-between items-center px-6 py-24 border-t border-[var(--muted)] border-opacity-10 relative overflow-hidden section-premium cyber-grid scanlines">
      
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[800px] h-[800px] bg-[var(--accent)] rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl text-center z-10 gap-12 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter font-gamer-heading">
            SNAZZYZONE
          </h2>
          <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-[var(--gold)] tracking-widest font-gamer-heading">
            <span>30 DEC 2021</span>
            <span>↓</span>
            <span>2026</span>
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl md:text-4xl font-medium tracking-tight text-[var(--muted)] font-gamer-heading"
        >
          STILL PLAYING. STILL CREATING. STILL COMING BACK.
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 flex flex-col items-center gap-4 p-8 surface-glass rounded-3xl border border-[var(--muted)] border-opacity-20"
        >
          <p className="text-xl md:text-2xl font-bold tracking-widest text-[var(--text)] font-gamer-heading">
            NEXT SAVE POINT: <span className="text-[var(--accent)] animate-pulse">?</span>
          </p>
          <p className="text-sm md:text-base font-light text-[var(--muted)] font-gamer-body">
            The story isn't finished yet.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 mt-24 z-10"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm md:text-base font-medium tracking-wide font-gamer-body">
          <a href="https://www.youtube.com/@SnazzyZone" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">Snazzy Zone</a>
          <a href="https://www.youtube.com/@Snazzyplayz" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">Snazzy Playz</a>
          <a href="https://www.youtube.com/@SnazzyFlux" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">Snazzy Flux</a>
        </div>
        <div className="flex flex-col items-center justify-center text-sm md:text-base font-medium tracking-wide text-[var(--muted)] mt-4 md:mt-0 font-gamer-body">
          <span className="text-xs uppercase tracking-widest mb-1">For Promotion & Contact</span>
          <a href="mailto:asksnazzyzone@gmail.com" className="hover:text-[var(--text)] transition-colors">asksnazzyzone@gmail.com</a>
        </div>
        
        <button className="btn-accent px-8 py-4 rounded-full font-bold tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-transform bg-[var(--accent)] text-[var(--text)] shadow-lg shadow-[var(--accent)]/20 min-h-[48px] min-w-[48px] font-gamer-body">
          <span className="text-xl">🎮</span> PLAY ARENA
        </button>
      </motion.div>
    </footer>
  );
}
