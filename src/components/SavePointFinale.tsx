"use client";

import { motion } from "framer-motion";

export default function SavePointFinale() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden px-6">
      
      {/* Warm glow from center */}
      <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[var(--accent)] blur-[150px] opacity-[0.03] pointer-events-none" />

      {/* ═══ SAVE POINT ═══ */}
      <div className="min-h-[50vh] flex flex-col items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-gamer-mono text-[9px] tracking-[0.4em] text-[var(--muted)] block mb-6">
            ◆ SAVE POINT
          </span>

          <div className="flex items-center justify-center gap-4 font-gamer-mono text-[10px] md:text-xs tracking-[0.2em] text-[var(--muted)] mb-8">
            <span>30.12.2021</span>
            <span className="text-[var(--accent)]">→</span>
            <span className="text-[var(--accent)]">2026</span>
          </div>
        </motion.div>
      </div>

      {/* ═══ END OF SESSION ═══ */}
      <div className="min-h-[40vh] flex flex-col items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <span className="font-gamer-mono text-[8px] tracking-[0.4em] text-[var(--muted)]/40 block mb-8">
            END OF SESSION
          </span>

          <h2 className="font-gamer-heading text-4xl md:text-6xl tracking-[0.08em] text-[var(--text)] mb-4">
            SNAZZYZONE
          </h2>

          <div className="space-y-1 mb-12">
            <p className="font-gamer-body text-sm md:text-base text-[var(--muted)] tracking-wider">
              STILL PLAYING.
            </p>
            <p className="font-gamer-body text-sm md:text-base text-[var(--muted)] tracking-wider">
              STILL CREATING.
            </p>
            <p className="font-gamer-body text-sm md:text-base text-[var(--muted)] tracking-wider">
              STILL COMING BACK.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ═══ CHANNELS ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-6 md:gap-8 py-8 font-gamer-mono text-[9px] tracking-[0.2em]"
      >
        <a href="https://www.youtube.com/@SnazzyZone" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors min-h-[44px] flex items-center">
          SNAZZY ZONE
        </a>
        <span className="text-[var(--muted)]/20">·</span>
        <a href="https://www.youtube.com/@Snazzyplayz" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors min-h-[44px] flex items-center">
          SNAZZY PLAYZ
        </a>
        <span className="text-[var(--muted)]/20">·</span>
        <a href="https://www.youtube.com/@SnazzyFlux" target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors min-h-[44px] flex items-center">
          SNAZZY FLUX
        </a>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-6"
      >
        <span className="font-gamer-mono text-[7px] tracking-[0.3em] text-[var(--muted)]/30 block mb-1">CONTACT</span>
        <a href="mailto:asksnazzyzone@gmail.com" className="font-gamer-mono text-[9px] tracking-[0.15em] text-[var(--muted)]/60 hover:text-[var(--accent)] transition-colors">
          asksnazzyzone@gmail.com
        </a>
      </motion.div>

      {/* ═══ THIN SEPARATOR ═══ */}
      <div className="w-16 h-[1px] bg-[var(--muted)]/10 mx-auto my-8" />

      {/* ═══ DEVELOPER CREDIT ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-12 pb-20"
      >
        <span className="font-gamer-mono text-[7px] tracking-[0.4em] text-[var(--muted)]/25 block mb-3">
          DEVELOPED BY
        </span>
        <span className="font-gamer-heading text-[10px] tracking-[0.1em] text-[var(--muted)]/50 block">
          PRATUL KUMAR
        </span>
        <span className="font-gamer-mono text-[7px] tracking-[0.3em] text-[var(--muted)]/25 block mt-1 mb-4">
          AI/ML ENGINEER
        </span>
        <a 
          href="https://pratulk.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)]/30 hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1 min-h-[44px]"
        >
          VISIT PORTFOLIO ↗
        </a>
      </motion.div>

      {/* Continue button — floating */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-20 right-6 z-30 font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)]/40 hover:text-[var(--accent)] transition-colors"
      >
        ↑
      </motion.button>
    </section>
  );
}
