"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const channels = [
  { 
    index: "01", 
    name: "SNAZZY\nZONE", 
    shortName: "SNAZZY ZONE",
    desc: "MAIN CHANNEL", 
    sub: "Gaming. Experiments. The main journey.",
    url: "https://www.youtube.com/@SnazzyZone",
    color: "#D8B24C",
    bgGradient: "radial-gradient(ellipse 100% 60% at 50% 80%, rgba(216,178,76,0.08) 0%, transparent 50%)",
  },
  { 
    index: "02", 
    name: "SNAZZY\nPLAYZ", 
    shortName: "SNAZZY PLAYZ",
    desc: "GAMING",
    sub: "Gameplay focused content.",
    url: "https://www.youtube.com/@Snazzyplayz",
    color: "#6F8F58",
    bgGradient: "radial-gradient(ellipse 100% 60% at 50% 80%, rgba(111,143,88,0.08) 0%, transparent 50%)",
  },
  { 
    index: "03", 
    name: "SNAZZY\nFLUX", 
    shortName: "SNAZZY FLUX",
    desc: "EXPERIMENTS",
    sub: "Another part of the content ecosystem.",
    url: "https://www.youtube.com/@SnazzyFlux",
    color: "#0ea5e9",
    bgGradient: "radial-gradient(ellipse 100% 60% at 50% 80%, rgba(14,165,233,0.06) 0%, transparent 50%)",
  },
];

export default function ChannelStation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = channels[activeIndex];

  return (
    <>
      {/* ═══ MOBILE CHANNEL HUB (< 768px) ═══ */}
      <section className="md:hidden w-full py-16 px-4">
        <div className="mb-8">
          <span className="font-gamer-mono text-[10px] tracking-[0.4em] text-[var(--muted)]">
            // CHANNEL HUB
          </span>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 hide-scrollbar">
          {channels.map((ch, i) => (
            <div key={ch.index} className="snap-center shrink-0 w-[85vw] relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl flex flex-col p-6">
              <div className="absolute inset-0 pointer-events-none -z-10">
                <img 
                  src="/images/hub_setup.jpg" 
                  alt="Creator Hub"
                  className="w-full h-full object-cover opacity-20 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-[var(--bg)]/40" />
                <div className="absolute inset-0" style={{ background: ch.bgGradient }} />
              </div>

              <div className="flex items-center gap-3 mb-auto">
                <span className="font-gamer-mono text-[10px] tracking-[0.3em]" style={{ color: ch.color }}>{ch.index}</span>
                <span className="font-gamer-mono text-[8px] tracking-[0.2em] px-2 py-0.5 rounded-full border" style={{ borderColor: ch.color, color: ch.color }}>
                  {ch.desc}
                </span>
              </div>

              <h2 className="font-gamer-heading text-6xl text-white tracking-wider leading-[0.85] mb-4 drop-shadow-md whitespace-pre-line mt-4">
                {ch.name}
              </h2>

              <p className="font-gamer-mono text-[10px] tracking-[0.1em] text-white/70 uppercase mb-8">
                {ch.sub}
              </p>

              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
                  <span className="font-gamer-mono text-[9px] tracking-[0.2em] text-[var(--accent-secondary)]">ONLINE</span>
                </div>
                <a 
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors font-gamer-mono text-[10px] tracking-[0.3em] text-center block"
                  style={{ color: ch.color }}
                >
                  [ VISIT CHANNEL ]
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DESKTOP CHANNEL STATION (≥ 768px) ═══ */}
      <section className="hidden md:flex relative min-h-screen w-full overflow-hidden flex-col justify-center py-24 px-6">
        
        {/* Environment shift per channel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            <img 
              src="/images/hub_setup.jpg" 
              alt="Creator Hub"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full md:w-[70%] h-full object-cover object-right opacity-25 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)] z-10" />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--bg)] via-[var(--bg)]/80 to-transparent z-10" />
            
            <div className="absolute inset-0 pointer-events-none" style={{ background: active.bgGradient }} />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-20"
          >
            <span className="font-gamer-mono text-[9px] md:text-[10px] tracking-[0.4em] text-[var(--muted)]">
              // CHANNEL HUB
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-0">
            
            {/* ═══ LEFT — Active Channel Display ═══ */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Channel number */}
                  <span className="font-gamer-mono text-[10px] tracking-[0.3em] block mb-2" style={{ color: active.color }}>
                    CHANNEL {active.index} / 03
                  </span>

                  {/* Channel name — HUGE */}
                  <h2 className="font-gamer-heading text-6xl sm:text-8xl md:text-9xl lg:text-[130px] leading-[0.82] tracking-[0.02em] text-[var(--text)] whitespace-pre-line">
                    {active.name}
                  </h2>

                  {/* Channel type */}
                  <div className="mt-6 mission-marker">
                    <span className="font-gamer-heading text-base md:text-lg tracking-wider text-[var(--muted)]">
                      {active.desc}
                    </span>
                    <p className="font-gamer-body text-sm text-[var(--muted)]/60 mt-1">
                      {active.sub}
                    </p>
                  </div>

                  {/* Status + CTA */}
                  <div className="mt-8 flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
                      <span className="font-gamer-mono text-[9px] tracking-[0.2em] text-[var(--accent-secondary)]">
                        ONLINE
                      </span>
                    </div>

                    <a 
                      href={active.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-gamer-mono text-[10px] tracking-[0.2em] border-b border-current pb-0.5 transition-colors duration-300 hover:text-[var(--text)] min-h-[48px] flex items-center"
                      style={{ color: active.color }}
                    >
                      [ VISIT CHANNEL ]
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ═══ RIGHT — Channel Selector ═══ */}
            <div className="w-full md:w-56 flex flex-col">
              {channels.map((ch, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={ch.index}
                    onClick={() => setActiveIndex(i)}
                    className={`text-left py-3 md:py-4 px-4 border-l-2 transition-all duration-300 min-h-[48px] flex items-center gap-3 ${
                      isActive 
                        ? "border-current bg-white/[0.02]" 
                        : "border-transparent hover:border-[var(--muted)]/30 opacity-40 hover:opacity-80"
                    }`}
                    style={{ borderColor: isActive ? ch.color : undefined }}
                  >
                    <span className="font-gamer-mono text-[10px] tracking-[0.2em]" style={{ color: isActive ? ch.color : "var(--muted)" }}>
                      {ch.index}
                    </span>
                    <span className={`font-gamer-heading text-sm tracking-wider ${isActive ? "text-[var(--text)]" : "text-[var(--muted)]"}`}>
                      {ch.shortName}
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
