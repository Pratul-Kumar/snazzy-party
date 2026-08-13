"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSubscriber } from "@/app/context/SubscriberContext";
import LiveSubscriberCount from "@/components/LiveSubscriberCount";

export default function QuestLog() {
  const { is100K } = useSubscriber();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const roadScale = useTransform(scrollYProgress, [0.2, 0.7], [0.95, 1.05]);

  return (
    <>
      {/* ═══ MOBILE 2026 QUEST SCENE (< 768px) ═══ */}
      <section className="md:hidden relative min-h-[100dvh] w-full flex flex-col justify-end pb-24 overflow-hidden pt-12">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <img 
            src="/images/quest_car.jpg" 
            alt="2026 Quest" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-transparent opacity-80" />
        </div>
        
        <div className="px-6 relative z-10 flex flex-col items-center text-center">
          <span className="font-gamer-heading text-2xl tracking-widest text-[var(--accent)] mb-2 shadow-black drop-shadow-md">
            2026
          </span>
          <span className="font-gamer-mono text-[10px] tracking-[0.4em] text-[var(--muted)] mb-8 shadow-black drop-shadow-md">
            MAIN QUEST
          </span>
          
          <h2 className="font-gamer-heading text-6xl text-white uppercase leading-none mb-6 drop-shadow-lg shadow-black">
            GET DAD<br/>A CAR
          </h2>

          <p className="font-gamer-mono text-[9px] tracking-[0.2em] text-[var(--muted)] mb-8 max-w-[250px] mx-auto uppercase shadow-black drop-shadow-md">
            "Some goals are personal."
          </p>

          <div className="font-gamer-mono text-left bg-black/60 p-6 rounded-xl border border-[var(--accent)]/30 backdrop-blur-md w-full max-w-xs">
            <pre className="text-xs leading-[1.2] mb-6 text-[var(--accent)] opacity-80">
              {`        🚗\n       ╱\n      ╱\n─────╯`}
            </pre>
            <div className="flex items-center gap-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">ROAD AHEAD</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DESKTOP QUEST LOG (≥ 768px) ═══ */}
      <section ref={ref} className="hidden md:flex relative min-h-screen w-full flex-col justify-center py-24 md:py-32 px-6">
        
        {/* ═══ ROAD ENVIRONMENT — sunset road behind the quest ═══ */}
        <div className="absolute inset-0 env-road pointer-events-none" />
        
        {/* Road visual — cinematic car driving towards horizon */}
        <motion.div 
          className="absolute right-0 bottom-0 md:-right-20 md:-bottom-10 w-[120%] md:w-[70%] h-full pointer-events-none overflow-hidden"
          style={{ scale: roadScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)] z-10" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[var(--bg)]/50 to-[var(--bg)] z-10" />
          <img 
            src="/images/quest_car.jpg" 
            alt="2026 Road"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-screen"
          />
        </motion.div>

        <div className="max-w-5xl mx-auto relative z-10 w-full">
          
          {/* ═══ QUEST LOG HEADER ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-24"
          >
            <span className="font-gamer-mono text-[9px] md:text-[10px] tracking-[0.4em] text-[var(--muted)]">
              // QUEST LOG
            </span>
          </motion.div>

          {/* ═══ MAIN QUEST — large, environmental, no card ═══ */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 md:mb-28"
          >
            <div className="mission-marker-main">
              <span className="font-gamer-mono text-[9px] tracking-[0.3em] text-[var(--accent)]">
                2026 — MAIN QUEST
              </span>
            </div>
            
            <h2 className="font-gamer-heading text-5xl sm:text-7xl md:text-8xl lg:text-[100px] tracking-[0.03em] leading-none text-[var(--text)] mt-4">
              GET DAD
            </h2>
            <h2 className="font-gamer-heading text-5xl sm:text-7xl md:text-8xl lg:text-[100px] tracking-[0.03em] leading-none text-[var(--text)]">
              A CAR
            </h2>

            {/* Road metaphor text */}
            <div className="mt-12 font-gamer-mono text-[var(--muted)] text-left w-max">
              <pre className="text-xs leading-[1.2] mb-6 text-[var(--accent)] opacity-80">
                {`        🚗\n       ╱\n      ╱\n─────╯`}
              </pre>
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-[0.3em] uppercase">ROAD AHEAD</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span className="text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══ SIDE QUESTS — minimal list, no cards ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-gamer-mono text-[9px] tracking-[0.3em] text-[var(--muted)] block mb-6">
              SIDE QUESTS
            </span>
            
            <div className="space-y-4">
              {[
                { title: "KEEP CREATING", status: "ACTIVE" },
                { title: "GROW THE CHANNELS", status: "ACTIVE" },
                { title: "REACH 100K", status: is100K ? "ACHIEVED" : "ACTIVE" },
              ].map((quest, i) => (
                <div key={i}>
                  <div className="flex items-center gap-4 group">
                    <div className={`w-1.5 h-1.5 rounded-full ${quest.status === 'ACHIEVED' ? 'bg-[var(--accent-secondary)]' : 'bg-[var(--accent-secondary)]'}`} />
                    <span className="font-gamer-heading text-sm md:text-base tracking-wider text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {quest.title}
                    </span>
                    <div className="flex-1 h-[1px] bg-[var(--muted)]/10" />
                    <span className={`font-gamer-mono text-[8px] tracking-[0.2em] ${quest.status === 'ACHIEVED' ? 'text-[var(--accent-secondary)]' : 'text-[var(--accent-secondary)]'}`}>
                      {quest.status === 'ACHIEVED' ? '✓ ACHIEVED' : '◉ ACTIVE'}
                    </span>
                  </div>
                  {quest.title === "REACH 100K" && (
                    <div className="mt-2 ml-5">
                      <LiveSubscriberCount variant="quest" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
