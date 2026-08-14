"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCelebration } from "@/app/context/CelebrationContext";

export default function CareerMode() {
  const { celebration } = useCelebration();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  const levels = [
    { id: "01", title: "START", subtitle: "30 DEC 2021", desc: "Channel started.", status: "verified" as const },
    { id: "02", title: "THE JOURNEY", subtitle: "?", desc: "Still creating.", status: "unknown" as const },
    { id: "03", title: "THE GAMES", subtitle: "LIBRARY", desc: "Farming Simulator • Cities: Skylines II • Manor Lords • Raft", status: "active" as const },
    { id: "04", title: "THE CHANNELS", subtitle: "NETWORK", desc: "Snazzy Zone • Snazzy Playz • Snazzy Flux", status: "active" as const },
    { id: "05", title: "2026 BUILD", subtitle: "MAIN QUEST", desc: "Current chapter.", status: "active" as const },
    { id: "06", title: "100K", subtitle: "MILESTONE", desc: "Achieved.", status: "verified" as const },
    { id: "07", title: "200K", subtitle: "MILESTONE", desc: "The road to 200K.", status: "active" as const },
  ];

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden py-24 md:py-32 px-6">
      
      {/* Section environment */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(111,143,88,0.03)] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section header — minimal, no card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <span className="font-gamer-mono text-[9px] md:text-[10px] tracking-[0.4em] text-[var(--muted)]">
            // CAREER MODE
          </span>
          <h2 className="font-gamer-heading text-4xl md:text-6xl lg:text-7xl tracking-[0.05em] text-[var(--text)] mt-2 leading-none">
            THE JOURNEY
          </h2>
        </motion.div>

        {/* ═══ HORIZONTAL PROGRESSION LINE ═══ */}
        {/* Desktop Layout */}
        <div className="hidden md:block relative">
          <div className="relative h-[1px] bg-[var(--muted)]/10 w-full mb-4">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[var(--accent)]"
              style={{ width: lineWidth }}
            />
          </div>

          <div className="flex justify-between items-start relative">
            {levels.map((level, i) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`flex flex-col items-center text-center w-[16%] ${
                  level.status === "upcoming" || level.status === "unknown" ? "opacity-40" : ""
                }`}
              >
                {/* Marker dot */}
                <div className="relative -mt-[calc(0.5rem+1px)] mb-4">
                  {level.status === "verified" && (
                    <div className="w-3 h-3 rounded-full bg-[var(--accent-secondary)] border-2 border-[var(--bg)]" />
                  )}
                  {level.status === "active" && (
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)]" />
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-[var(--accent)] animate-ping opacity-30" />
                    </div>
                  )}
                  {level.status === "upcoming" && (
                    <div className="w-3 h-3 rounded-full border border-[var(--muted)]/30 bg-[var(--bg)]" />
                  )}
                  {level.status === "unknown" && (
                    <div className="w-3 h-3 rounded-full border border-[var(--muted)]/50 bg-[var(--bg)] flex items-center justify-center">
                      <span className="text-[6px] text-[var(--muted)]">?</span>
                    </div>
                  )}
                </div>

                <span className="font-gamer-mono text-[9px] tracking-[0.2em] text-[var(--muted)] mb-1">
                  {level.id}
                </span>
                <span className={`font-gamer-heading text-sm md:text-base tracking-wider ${
                  level.status === "active" ? "text-[var(--accent)]" : "text-[var(--text)]"
                }`}>
                  {level.title}
                </span>
                {level.subtitle && (
                  <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)] mt-1">
                    {level.subtitle}
                  </span>
                )}
                {level.desc && (
                  <span className="font-gamer-body text-[10px] md:text-xs text-[var(--muted)]/70 mt-2 max-w-[80%] leading-tight">
                    {level.desc}
                  </span>
                )}
                
                {/* Status Badges */}
                <div className="mt-2">
                  {level.status === "verified" && (
                    <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--accent-secondary)]">✓ VERIFIED</span>
                  )}
                  {level.status === "active" && (
                    <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--accent)] animate-pulse">◉ ACTIVE</span>
                  )}
                  {level.status === "upcoming" && (
                    <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)]">○ UPCOMING</span>
                  )}
                  {level.status === "unknown" && (
                    <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)]">? UNKNOWN</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout — vertical progression */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-[var(--muted)]/10">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-[var(--accent)]"
              initial={{ height: "0%" }}
              whileInView={{ height: "83%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-12">
            {levels.map((level, i) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative ${level.status === "upcoming" || level.status === "unknown" ? "opacity-50" : ""}`}
              >
                {/* Dot on the line */}
                <div className="absolute -left-[37px] top-1">
                  {level.status === "verified" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)]" />
                  )}
                  {level.status === "active" && (
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-[var(--accent)]" />
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--accent)] animate-ping opacity-30" />
                    </div>
                  )}
                  {level.status === "upcoming" && (
                    <div className="w-2.5 h-2.5 rounded-full border border-[var(--muted)]/30 bg-[var(--bg)]" />
                  )}
                  {level.status === "unknown" && (
                    <div className="w-2.5 h-2.5 rounded-full border border-[var(--muted)]/50 bg-[var(--bg)] flex items-center justify-center">
                      <span className="text-[6px] text-[var(--muted)] -ml-[1px]">?</span>
                    </div>
                  )}
                </div>

                <span className="font-gamer-mono text-[9px] tracking-[0.3em] text-[var(--muted)] block mb-1">{level.subtitle}</span>
                <h3 className={`font-gamer-heading text-xl tracking-wider leading-none mb-1 ${
                  level.status === "active" ? "text-[var(--accent)]" : "text-[var(--text)]"
                }`}>
                  {level.title}
                </h3>
                {level.desc && (
                  <p className="font-gamer-body text-xs text-[var(--muted)]/80 mt-1 mb-2 leading-snug">
                    {level.desc}
                  </p>
                )}
                
                {/* Status Badges */}
                <div className="mt-1">
                  {level.status === "verified" && (
                    <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--accent-secondary)]">✓ VERIFIED</span>
                  )}
                  {level.status === "active" && (
                    <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--accent)] animate-pulse">◉ ACTIVE</span>
                  )}
                  {level.status === "upcoming" && (
                    <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)]">○ UPCOMING</span>
                  )}
                  {level.status === "unknown" && (
                    <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[var(--muted)]">? UNKNOWN</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
