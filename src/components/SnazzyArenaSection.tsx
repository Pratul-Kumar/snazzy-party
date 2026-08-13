"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ChallengeModal from "./ChallengeModal";
import LeaderboardModal from "./LeaderboardModal";
import { subscribeToArenaLeaderboard } from "../lib/firebase";

export default function SnazzyArenaSection() {
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [topPlayers, setTopPlayers] = useState<[string, number][]>([]);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    const unsubscribe = subscribeToArenaLeaderboard((data) => {
      // Sort players by wins
      const sorted = Object.entries(data)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 3) as [string, number][];
      
      setTopPlayers(sorted.length ? sorted : [
        ["Rahul", 48],
        ["Aman", 42],
        ["Ankit", 38]
      ]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center py-24 md:py-32">
      
      {/* ═══ ARENA GRAPHIC BACKGROUND ═══ */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <img 
          src="/images/arena_setup.jpg" 
          alt="Arena Setup"
          className="w-full h-[120%] object-cover object-center opacity-40 mix-blend-screen"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/50 to-[var(--bg)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/70 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 w-full px-6 flex flex-col md:flex-row items-center gap-16 md:gap-8">
        
        {/* ═══ LEFT — Typography & Play Action ═══ */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <div className="mission-marker-main mb-6">
            <span className="font-gamer-mono text-[9px] tracking-[0.3em] text-[#ff3366]">
              MULTIPLAYER
            </span>
          </div>
          
          <h2 className="font-gamer-heading text-5xl sm:text-7xl md:text-8xl lg:text-[100px] tracking-[0.03em] leading-none text-[var(--text)] text-[#ff3366]">
            SNAZZY
          </h2>
          <h2 className="font-gamer-heading text-5xl sm:text-7xl md:text-8xl lg:text-[100px] tracking-[0.03em] leading-none text-[var(--text)]">
            ARENA
          </h2>

          <div className="mt-8 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#ff3366] animate-pulse" />
            <span className="font-gamer-mono text-[10px] tracking-[0.3em] text-[#ff3366]">
              STATUS: ONLINE
            </span>
          </div>

          <p className="font-gamer-body text-base md:text-lg text-[var(--muted)] mt-6 max-w-sm leading-relaxed">
            Think you can beat your friend? Settle it here.
          </p>

          <button
            onClick={() => setIsChallengeOpen(true)}
            className="mt-10 bg-[#ff3366]/10 border border-[#ff3366]/30 text-[var(--text)] font-gamer-mono text-[10px] md:text-xs tracking-[0.4em] uppercase hover:bg-[#ff3366] hover:text-white transition-all duration-300 flex items-center gap-4 group px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(255,51,102,0.2)]"
          >
            <span className="text-[#ff3366] group-hover:text-white group-hover:translate-x-2 transition-all">→</span>
            [ PLAY TIC-TAC-TOE ]
          </button>
        </motion.div>

        {/* ═══ RIGHT — Cinematic Leaderboard ═══ */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-full md:w-[400px] relative"
        >
          <div className="absolute -inset-4 bg-black/40 backdrop-blur-md -z-10" />
          
          <div className="border-l border-[#ff3366]/30 pl-6 py-2">
            <h3 className="font-gamer-mono text-[10px] uppercase tracking-[0.4em] text-[#ff3366] mb-8">
              // TOP PLAYERS
            </h3>

            <div className="space-y-6">
              {topPlayers.map(([name, wins], idx) => (
                <div key={name} className="flex justify-between items-end group">
                  <div>
                    <span className="font-gamer-mono text-[8px] tracking-[0.2em] text-[#ff3366]/50 block mb-1">
                      RANK 0{idx + 1}
                    </span>
                    <span className="font-gamer-heading text-2xl text-[var(--text)] tracking-wider group-hover:text-[#ff3366] transition-colors">
                      {name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-gamer-heading text-xl text-[var(--text)] tracking-widest block leading-none">
                      {wins}
                    </span>
                    <span className="font-gamer-mono text-[7px] tracking-[0.2em] text-[var(--muted)]">
                      WINS
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsLeaderboardOpen(true)}
              className="mt-10 bg-white/5 border border-white/10 px-6 py-3 rounded-lg font-gamer-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/80 hover:bg-white/10 hover:text-white transition-all w-full text-center"
            >
              [ VIEW FULL RANKINGS ]
            </button>
          </div>
        </motion.div>
      </div>

      <ChallengeModal isOpen={isChallengeOpen} onClose={() => setIsChallengeOpen(false)} />
      <LeaderboardModal isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
    </section>
  );
}
